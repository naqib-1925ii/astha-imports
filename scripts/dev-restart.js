const { spawn, exec } = require('child_process');
const http = require('http');

const HOST = process.env.VITE_HOST || 'localhost';
const PORT = process.env.VITE_PORT || 5173;
const HEALTH_PATH = '/';

let child = null;
let consecutiveFailures = 0;
const FAILURE_THRESHOLD = 3; // after 3 failed checks, restart
const CHECK_INTERVAL_MS = 5000;

function start() {
  console.log('Starting Vite dev server...');
  child = spawn(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['run', 'dev', '--', '--host', HOST], { stdio: 'inherit', shell: false });

  child.on('exit', (code, signal) => {
    console.log(`Vite exited with code=${code} signal=${signal}. Restarting in 2s...`);
    setTimeout(start, 2000);
  });

  child.on('error', (err) => {
    console.error('Failed to start Vite dev server:', err);
    setTimeout(start, 5000);
  });

  // start health checks
  consecutiveFailures = 0;
  setTimeout(healthCheckLoop, 2000);
}

function healthCheckLoop() {
  const opts = {
    hostname: HOST,
    port: PORT,
    path: HEALTH_PATH,
    method: 'GET',
    timeout: 3000,
  };

  const req = http.request(opts, (res) => {
    if (res.statusCode && res.statusCode >= 200 && res.statusCode < 500) {
      // healthy
      consecutiveFailures = 0;
    } else {
      consecutiveFailures++;
      console.warn(`Health check returned status ${res.statusCode} (${consecutiveFailures}/${FAILURE_THRESHOLD})`);
    }
    res.resume();
    scheduleNextCheck();
  });

  req.on('error', (err) => {
    consecutiveFailures++;
    console.warn(`Health check error: ${err.message} (${consecutiveFailures}/${FAILURE_THRESHOLD})`);
    scheduleNextCheck();
  });

  req.on('timeout', () => {
    req.destroy(new Error('timeout'));
  });

  req.end();
}

function scheduleNextCheck() {
  if (consecutiveFailures >= FAILURE_THRESHOLD) {
    console.error('Vite appears unhealthy — restarting process.');
    try {
      if (child) child.kill('SIGINT');
    } catch (e) {
      console.error('Failed to kill child process:', e);
    }
    // child exit handler will restart
    return;
  }
  setTimeout(healthCheckLoop, CHECK_INTERVAL_MS);
}

start();
