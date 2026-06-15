import { useState, useEffect, useRef, FormEvent } from 'react';
import logo from './assets/logo.png';
import pro1 from './assets/pro1.jpg';
import pro2 from './assets/pro2.jpg';
import pro3 from './assets/pro3.jpeg';
import pro4 from './assets/pro4.png';
import pro5 from './assets/pro5.png';
import why0 from './assets/why0.png';
import why1 from './assets/why1.png';
import why2 from './assets/why2.png';
import {
  Star, CheckCircle, ShieldCheck, Truck, RotateCcw, Phone, MapPin,
  MessageCircle, Facebook, ChevronDown, ChevronUp, Package, Instagram,
  Clock, X, Menu,
} from 'lucide-react';

declare global {
  interface Window {
    fbq: any;
  }
}

function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() ?? null;
  return null;
}

export {};

const PRODUCT_IMAGES = [pro1, pro2, pro3, why0, pro4, pro5, why1, why2];

const REVIEWS = [
  { name: 'Rahima Begum', city: 'Dhaka', rating: 5, text: 'অসাধারণ পণ্য! মান অনেক ভালো এবং দ্রুত ডেলিভারি পেয়েছি। আবার অর্ডার করবো।', date: '২ দিন আগে' },
  { name: 'Karim Hossain', city: 'Chittagong', rating: 5, text: 'দাম এবং মান দুটোই চমৎকার। Cash on Delivery সুবিধা পেয়ে অনেক উপকার হলো।', date: '৫ দিন আগে' },
  { name: 'Nusrat Jahan', city: 'Sylhet', rating: 4, text: 'পণ্যটি দেখতে ও ব্যবহারে খুবই সুন্দর। প্যাকেজিং ছিল অনেক সাবধানী।', date: '১ সপ্তাহ আগে' },
  { name: 'Mohammad Ali', city: 'Rajshahi', rating: 5, text: 'Astha Imports থেকে এটি দ্বিতীয়বার কিনলাম। প্রতিবারই সন্তুষ্ট হয়েছি।', date: '২ সপ্তাহ আগে' },
  { name: 'Fatema Khatun', city: 'Khulna', rating: 5, text: 'অরিজিনাল পণ্য পেয়েছি। দাম অনেক কম ছিল তুলনামূলকভাবে। সার্ভিস ছিল দারুণ।', date: '৩ সপ্তাহ আগে' },
];

const FAQS = [
  { q: 'ডেলিভারি কতদিনে পাবো?', a: 'ঢাকার মধ্যে ১-২ কার্যদিবস এবং ঢাকার বাইরে ২-৪ কার্যদিবসের মধ্যে ডেলিভারি পাবেন।' },
  { q: 'Cash on Delivery কি সব এলাকায় পাওয়া যায়?', a: 'হ্যাঁ, আমরা সারা বাংলাদেশে Cash on Delivery সুবিধা প্রদান করি।' },
  { q: 'পণ্য ফেরত দেওয়া যাবে?', a: 'পণ্য পাওয়ার পর ৭ দিনের মধ্যে যদি কোনো সমস্যা থাকে তাহলে আমরা বিনামূল্যে পণ্য পরিবর্তন বা রিফান্ড দেবো।' },
  { q: 'পণ্যটি কি অরিজিনাল?', a: 'আমরা শুধুমাত্র ১০০% অরিজিনাল ও মানসম্পন্ন পণ্য বিক্রি করি। প্রতিটি পণ্যে গুণমান নিশ্চিত করা হয়।' },
  { q: 'অর্ডার কনফার্ম হবে কীভাবে?', a: 'অর্ডার দেওয়ার পর আমাদের টিম ফোনে কল করে অর্ডার কনফার্ম করবে।' },
];

const CITIES = [
  'ঢাকা', 'গাজীপুর', 'নারায়ণগঞ্জ', 'নরসিংদী', 'মুন্সীগঞ্জ', 'মানিকগঞ্জ', 'টাঙ্গাইল', 'কিশোরগঞ্জ', 'ফরিদপুর', 'রাজবাড়ী',
  'গোপালগঞ্জ', 'মাদারীপুর', 'শরীয়তপুর',

  'চট্টগ্রাম', 'কক্সবাজার', 'কুমিল্লা', 'ফেনী', 'নোয়াখালী', 'লক্ষ্মীপুর', 'চাঁদপুর', 'ব্রাহ্মণবাড়িয়া', 'খাগড়াছড়ি', 'রাঙ্গামাটি',
  'বান্দরবান',

  'সিলেট', 'সুনামগঞ্জ', 'মৌলভীবাজার', 'হবিগঞ্জ',

  'রাজশাহী', 'নওগাঁ', 'নাটোর', 'পাবনা', 'বগুড়া', 'চাঁপাইনবাবগঞ্জ', 'জয়পুরহাট', 'সিরাজগঞ্জ',

  'খুলনা', 'বাগেরহাট', 'যশোর', 'সাতক্ষীরা', 'নড়াইল', 'মাগুরা', 'ঝিনাইদহ', 'কুষ্টিয়া', 'চুয়াডাঙ্গা', 'মেহেরপুর',

  'বরিশাল', 'ভোলা', 'পটুয়াখালী', 'বরগুনা', 'ঝালকাঠি', 'পিরোজপুর',

  'রংপুর', 'দিনাজপুর', 'গাইবান্ধা', 'কুড়িগ্রাম', 'লালমনিরহাট', 'নীলফামারী', 'ঠাকুরগাঁও', 'পঞ্চগড়',

  'ময়মনসিংহ', 'জামালপুর', 'শেরপুর', 'নেত্রকোনা'
].sort();

const getDeliveryCharge = (city: string, quantity: number): number => {
  if (!city) return 0;
  const isChittagong = city === 'চট্টগ্রাম';

  if (quantity >= 1 && quantity <= 3) {
    return isChittagong ? 80 : 150;
  } else if (quantity >= 4) {
    return isChittagong ? 60 : 120;
  }
  return 0;
};

const PRODUCT_PRICE = 999;

type FormData = {
  name: string;
  phone: string;
  city: string;
  address: string;
};

// ValidationErrors type removed — not used anymore

type OrderFormProps = {
  compact?: boolean;
  submitted: boolean;
  submitError: string;
  phoneError: string;
  formData: FormData;
  quantity: number;
  submitting: boolean;
  deliveryCharge: number;
  totalPrice: number;
  onFieldChange: (field: keyof FormData, value: string) => void;
  onQuantityChange: (newQty: number) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
};

const OrderForm = ({
  compact = false,
  submitted,
  submitError,
  phoneError,
  formData,
  quantity,
  submitting,
  deliveryCharge,
  totalPrice,
  onFieldChange,
  onQuantityChange,
  handleSubmit,
}: OrderFormProps) => (
  <div className={compact ? '' : 'bg-white rounded-2xl shadow-2xl p-6 md:p-8 border border-gray-100'}>
    {!compact && (
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-1">আপনার পার্সোনাল কুলিং পার্টনার এখনই অর্ডার করুন!</h3>
        <p className="text-gray-500 text-sm">Cash on Delivery | সারা বাংলাদেশে ডেলিভারি</p>
      </div>
    )}

    {submitted ? (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h4 className="text-xl font-bold text-gray-900 mb-2">ধন্যবাদ!</h4>
        <p className="text-gray-600">আপনার অর্ডার গ্রহণ করা হয়েছে।</p>
        <p className="text-gray-500 text-sm mt-1">Thank you! Your order has been received.</p>
        <p className="text-gray-500 text-sm mt-3">আমাদের টিম শীঘ্রই আপনাকে কল করবে।</p>
      </div>
    ) : (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            পূর্ণ নাম <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={e => onFieldChange('name', e.target.value)}
            placeholder="আপনার পূর্ণ নাম"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900 placeholder-gray-400 transition"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            ফোন নম্বর <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            inputMode="numeric"
            pattern="[0-9]*"
            required
            value={formData.phone}
            onChange={e => onFieldChange('phone', e.target.value)}
            placeholder="01XXXXXXXXX"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900 placeholder-gray-400 transition"
          />
          {phoneError && (
            <p className="text-red-500 text-xs mt-2">{phoneError}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            শহর / জেলা <span className="text-red-500">*</span>
          </label>
          <select
            required
            value={formData.city}
            onChange={e => onFieldChange('city', e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900 bg-white transition"
          >
            <option value="">শহর/জেলা নির্বাচন করুন</option>
            {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            সম্পূর্ণ ঠিকানা <span className="text-red-500">*</span>
          </label>
          <textarea
            required
            value={formData.address}
            onChange={e => onFieldChange('address', e.target.value)}
            placeholder="বাড়ি নং, রাস্তা, এলাকা..."
            rows={3}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900 placeholder-gray-400 transition resize-none"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">পরিমাণ</label>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
              className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 font-bold transition"
            >
              −
            </button>
            <span className="w-12 text-center font-bold text-lg text-gray-900">{quantity}</span>
            <button
              type="button"
              onClick={() => onQuantityChange(quantity + 1)}
              className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 font-bold transition"
            >
              +
            </button>
            <span className="text-gray-500 text-sm">পিস</span>
          </div>
        </div>

        {formData.city && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">পণ্যের দাম ({quantity} × ৳{PRODUCT_PRICE})</span>
              <span className="font-semibold text-gray-900">৳{PRODUCT_PRICE * quantity}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">ডেলিভারি চার্জ</span>
              <span className="font-semibold text-gray-900">৳{deliveryCharge}</span>
            </div>
            <div className="border-t border-blue-200 pt-2 flex items-center justify-between">
              <span className="font-semibold text-gray-900">সর্বমোট দাম</span>
              <span className="text-lg font-bold text-blue-600">৳{totalPrice}</span>
            </div>
          </div>
        )}

        {submitError && (
          <p className="text-red-500 text-sm bg-red-50 px-4 py-3 rounded-xl">{submitError}</p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl transition-all duration-200 text-lg shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {submitting ? (
            <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <Package className="w-5 h-5" />
              অর্ডার কনফার্ম করুন
            </>
          )}
        </button>

        <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
          <ShieldCheck className="w-4 h-4 text-green-500" />
          <span>ক্যাশ অন ডেলিভারি | নিরাপদ অর্ডার</span>
        </div>
      </form>
    )}
  </div>
);

export default function App() {

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [formData, setFormData] = useState({ name: '', phone: '', city: '', address: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const orderFormRef = useRef<HTMLDivElement>(null);

  const handleFieldChange = (field: keyof FormData, value: string) => {
    if (field === 'phone') {
      // convert Bangla digits to Latin digits
      const bnMap: Record<string, string> = { '০':'0','১':'1','২':'2','৩':'3','৪':'4','৫':'5','৬':'6','৭':'7','৮':'8','৯':'9' };
      const converted = value.replace(/[০১২৩৪৫৬৭৮৯]/g, (m) => bnMap[m]);

      // strip all non-digit characters
      const digitsOnly = converted.replace(/\D/g, '');

      // normalize cases like 8801xxxxxxxxx or +8801xxxxxxxxx -> take last 11 digits if they look like a local BD number
      let normalized = digitsOnly;
      if (digitsOnly.length > 11) {
        const last11 = digitsOnly.slice(-11);
        if (last11.startsWith('01')) {
          normalized = last11;
        }
      }

      setFormData(prev => ({ ...prev, phone: normalized }));

      // validate: must be exactly 11 digits and start with '01' (Bangladesh mobile)
      if (normalized.length < 11) {
        setPhoneError('ফোন নম্বর ১১ সংখ্যার হওয়া উচিত');
      } else if (normalized.length > 11) {
        setPhoneError('অবৈধ ফোন নম্বর');
      } else if (!normalized.startsWith('01')) {
        setPhoneError('অবৈধ বাংলাদেশি ফোন নম্বর');
      } else {
        setPhoneError('');
      }

      return;
    }

    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const deliveryCharge = getDeliveryCharge(formData.city, quantity);
  const totalPrice = (PRODUCT_PRICE * quantity) + deliveryCharge;

  useEffect(() => {
   window.fbq?.('track', 'ViewContent');
  }, []);

  const scrollToOrder = () => {
    orderFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.fbq?.('track', 'InitiateCheckout');
    setMobileMenuOpen(false);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError('');

    // Prevent submit if phone validation failed
    if (phoneError) {
      setSubmitError('ফোন নম্বর সঠিক নয় — অনুগ্রহ করে ঠিক করুন।');
      setSubmitting(false);
      return;
    }
    if (!formData.phone || formData.phone.length !== 11 || !formData.phone.startsWith('01')) {
      setSubmitError('ফোন নম্বর ১১ সংখ্যার ও বাংলাদেশের মোবাইল নম্বর হওয়া উচিত।');
      setSubmitting(false);
      return;
    }

    const eventId = `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const payload = {
     name: formData.name,
     phone: formData.phone,
     city: formData.city,
     address: formData.address,
     quantity: String(quantity),
     total_price: totalPrice,
     fbc: getCookie('_fbc'),
     fbp: getCookie('_fbp'),
     user_agent: navigator.userAgent,
     event_id: eventId,
     };
    
    
     try {await fetch('https://script.google.com/macros/s/AKfycbzv9MJswOCkemV_NT9UxlYFoOWzD0ia0-CzdZVWqUt1dM3Bl11X_FjSTKd4OuiY_t8g/exec',
     {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
     }
    );

  window.fbq?.('track', 'Lead', {
  value: totalPrice,
  currency: 'BDT'
  }, {
  eventID: eventId
  });
  
  setSubmitted(true);

} catch {
  setSubmitError('কিছু একটা সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
} finally {
  setSubmitting(false);
}
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-white flex items-center justify-center shadow-sm">
              <img src={logo} alt="Astha Imports" className="w-full h-full object-cover rounded-full" />
            </div>
            <div>
              <div className="font-bold text-gray-900 text-lg leading-tight">Astha Imports</div>
              <div className="text-xs text-gray-400 leading-tight hidden sm:block">আস্থা ইম্পোর্টস</div>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
            <a href="#features" className="hover:text-red-600 transition">বৈশিষ্ট্য</a>
            <a href="#reviews" className="hover:text-red-600 transition">রিভিউ</a>
            <a href="#faq" className="hover:text-red-600 transition">FAQ</a>
            <a href="#contact" className="hover:text-red-600 transition">যোগাযোগ</a>
          </nav>
          <div className="flex items-center gap-3">
            <button
              onClick={scrollToOrder}
              className="bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition"
            >
              অর্ডার করুন
            </button>
            <button
              className="md:hidden p-2 text-gray-500 hover:text-gray-900"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 py-3 flex flex-col gap-3 text-sm text-gray-700">
            <a href="#features" onClick={() => setMobileMenuOpen(false)} className="py-1">বৈশিষ্ট্য</a>
            <a href="#reviews" onClick={() => setMobileMenuOpen(false)} className="py-1">রিভিউ</a>
            <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="py-1">FAQ</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="py-1">যোগাযোগ</a>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="bg-white pt-8 pb-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            {/* Image Gallery */}
            <div className="space-y-3">
              <div className="relative rounded-2xl overflow-hidden bg-gray-100 aspect-square">
                <img
                  src={PRODUCT_IMAGES[selectedImage]}
                  alt="Product"
                  className="w-full h-full object-cover transition-all duration-300"
                />
                {/* Removed promotional badges as requested */}
              </div>
              <div className="grid grid-cols-4 gap-2">
                {PRODUCT_IMAGES.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`rounded-xl overflow-hidden aspect-square border-2 transition-all ${
                      selectedImage === i ? 'border-red-500 shadow-md' : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-5">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-amber-100 text-amber-700 text-xs font-semibold px-3 py-1 rounded-full">
                    সীমিত সময়ের অফার
                  </span>
                  <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                    স্টকে আছে
                  </span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                 Premium Portable Turbo Mini Fan – গরমকে বলুন গুডবাই!
                </h1>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map(s => (
                      <Star key={s} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">(৪৮৭+ রিভিউ)</span>
                </div>
              </div>

              <div className="flex items-end gap-3">
                <span className="text-4xl font-extrabold text-red-600">৳৯৯৯</span>
                <div>
                  <span className="text-xl text-gray-400 line-through">৳১,৩৯৯</span>
                  <span className="ml-2 text-sm bg-red-100 text-red-600 font-bold px-2 py-0.5 rounded">৪০% ছাড়</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 bg-green-50 rounded-xl p-3">
                  <Truck className="w-5 h-5 text-green-600 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-green-800">ক্যাশ অন ডেলিভারি</p>
                    <p className="text-xs text-green-600">পণ্য পেয়ে টাকা দিন</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-blue-50 rounded-xl p-3">
                  <RotateCcw className="w-5 h-5 text-blue-600 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-blue-800">৭ দিনের রিটার্ন</p>
                    <p className="text-xs text-blue-600">সমস্যায় ফেরত দিন</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-amber-50 rounded-xl p-3">
                  <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-amber-800">১০০% অরিজিনাল</p>
                    <p className="text-xs text-amber-600">গুণমান নিশ্চিত</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-rose-50 rounded-xl p-3">
                  <Clock className="w-5 h-5 text-rose-600 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-rose-800">দ্রুত ডেলিভারি</p>
                    <p className="text-xs text-rose-600">১-৩ কার্যদিবস</p>
                  </div>
                </div>
              </div>

              <button
                onClick={scrollToOrder}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl text-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <Package className="w-5 h-5" />
                এখনই অর্ডার করুন
              </button>

              <p className="text-center text-xs text-gray-400">
                ইতোমধ্যে ২,৩০০+ জন অর্ডার করেছেন
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
         
          <div className="grid md:grid-cols-1 gap-3">
            <div className="bg-gray-50 rounded-2xl p-6 space-y-4 border border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900">✨ প্রধান বৈশিষ্ট্যসমূহ</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li><strong>3600mAh Rechargeable Battery</strong> – একবার চার্জে ৪-১০ ঘণ্টা পর্যন্ত ব্যবহার করা যায় (স্পিড সেটিং অনুযায়ী)।</li>
                    <li><strong>13000 RPM Turbo Airflow</strong> – ছোট সাইজ হলেও শক্তিশালী টার্বো মোটরের কারণে ঝড়ের মতো বাতাস দেয়।</li>
                    <li><strong>৫টি স্পিড মোড</strong> – আপনার প্রয়োজন মতো বাতাসের স্পিড কন্ট্রোল করুন।</li>
                    <li><strong>Smart Digital Display</strong> – ব্যাটারির চার্জ ও স্পিড সহজেই দেখা যায়।</li>
                    <li><strong>3-in-1 Multi-Use Design</strong> – Handheld Fan, Desk Fan, Neck Hanging Fan।</li>
                    <li><strong>Foldable & Adjustable Stand</strong> – ডেস্কে রাখা যায়, সহজে ভাঁজ করে ব্যাগেও বহন করা যায়।</li>
                    <li><strong>USB Type-C Charging</strong> – পাওয়ার ব্যাংক, ল্যাপটপ বা মোবাইল অ্যাডাপ্টার দিয়ে সহজেই চার্জ করুন।</li>
                    <li><strong>Low Noise Operation</strong> – শান্ত পরিবেশে কাজ বা পড়াশোনার সময়ও ব্যবহার উপযোগী।</li>
                    <li><strong>Premium Color</strong> – হোয়াইট, ব্ল্যাক ও গ্রিন।</li>
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-2xl p-6 space-y-4 border border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900">📦 প্যাকেজে যা থাকছে</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>১টি Portable Turbo Mini Fan</li>
                    <li>১টি USB Type-C Charging Cable</li>
                    <li>১টি Anti-loss fabric lanyard</li>
                  </ul>
                </div>
            
          </div>
        </div>
      </section>

      {/* Why Buy From Us */}
      <section className="py-16 bg-gradient-to-br from-red-600 to-red-700 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">কেন আমাদের কাছ থেকে কিনবেন?</h2>
            <p className="text-red-100 max-w-xl mx-auto">আমরা শুধু পণ্য বিক্রি করি না, আমরা আপনার সন্তুষ্টি নিশ্চিত করি।</p>
          </div>
          <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur rounded-3xl p-8 sm:p-10 border border-white/20 shadow-xl">
            <ul className="space-y-4 text-left text-white">
              <li className="flex items-start gap-3">
                <span className="mt-1 text-2xl">✅</span>
                <span className="leading-relaxed">আমরা কোনো কপি বা নিম্নমানের পণ্য বিক্রি করি না।</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-2xl">✅</span>
                <span className="leading-relaxed">আমাদের প্রতিটি ফ্যানে রয়েছে আসল 3600mAh ব্যাটারি ও শক্তিশালী Turbo Motor।</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-2xl">✅</span>
                <span className="leading-relaxed">100% Original Quality নিশ্চিত করে পণ্য আপনার হাতে পৌঁছে দেওয়া হয়।</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-2xl">✅</span>
                <span className="leading-relaxed">বর্তমানে বাজারে 600mAh, 1200mAh বা 1800mAh ব্যাটারির অনেক নিম্নমানের কপি পণ্য পাওয়া যায়, যেগুলোর কুলিং পারফরম্যান্স ও ব্যাটারি ব্যাকআপ খুবই সীমিত।</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-2xl">✅</span>
                <span className="leading-relaxed">পণ্যের ছবিতেই Original এবং Copy Version-এর পার্থক্য স্পষ্টভাবে দেখানো হয়েছে, যাতে আপনি সহজেই সঠিক পণ্যটি নির্বাচন করতে পারেন।</span>
              </li>
            </ul>
            <div className="mt-8 rounded-3xl bg-white/10 border border-red-300/40 p-6">
              <p className="text-lg font-semibold text-red-100">⚠️ নকল থেকে সাবধান! প্লাস্টিকের জালি ও নিম্নমানের কপি পণ্য কিনে প্রতারিত হবেন না।</p>
              <p className="mt-4 text-white font-semibold">💪 অরিজিনাল স্টীলের জালি, উন্নত মানের ব্যাটারি এবং শক্তিশালী পারফরম্যান্সের জন্য আমাদের Original Turbo Fan বেছে নিন।</p>
            </div>
          </div>
        </div>
      </section>

      {/* Important Notes Section */}
      <section className="py-16 bg-amber-50 border-t border-amber-200">
        <div className="max-w-s mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">⚠️ গুরুত্বপূর্ণ নোটিশ</h2>
          </div>
          <div className="space-y-4 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-6 border-l-4 border-amber-500 shadow-sm">
              <div className="flex gap-4">
                <div className="text-2xl">🔸</div>
                <div>
                  <p className="text-gray-700 leading-relaxed">
                    <span className="font-semibold text-red-700">পণ্যের রং:</span> এই পণ্যের রং নির্দিষ্ট নয়। স্টকে যা উপলব্ধ আছে, সেই অনুযায়ী রং প্রদান করা হবে।
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 border-l-4 border-amber-500 shadow-sm">
              <div className="flex gap-4">
                <div className="text-2xl">🔸</div>
                <div>
                  <p className="text-gray-700 leading-relaxed">
                    <span className="font-semibold text-gray-900">রিটার্ন নীতি:</span> ছবি এবং বর্ণনার সাথে পণ্যের মিল থাকা সত্যেও আপনি পণ্য গ্রহন করতে না চাইলে ডেলিভারি চার্জ ডেলিভারি ম্যানকে প্রদান করে রিটার্ন করতে পারবেন।
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 border-l-4 border-amber-500 shadow-sm">
              <div className="flex gap-4">
                <div className="text-2xl">🔹</div>
                <div>
                  <p className="text-gray-700 leading-relaxed">
                    <span className="font-semibold text-gray-900">প্যাকেজিং সতর্কতা:</span> পণ্য ডেলিভারি নেওয়ার সময় ডেলিভারি ম্যান সামনে থাকা অবস্থায় বক্স খুলে দেখে নেওয়ার সময় এমনভাবে প্যাকেজিং খোলা যাবে না যাতে রিটার্ন করার সুযোগ না থাকে।
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 border-l-4 border-amber-500 shadow-sm">
              <div className="flex gap-4">
                <div className="text-2xl">🔹</div>
                <div>
                  <p className="text-gray-700 leading-relaxed">
                    <span className="font-semibold text-red-700">বিশেষ দ্রষ্টব্য:</span> ১০০% শিওর না হয়ে অযথা অর্ডার করবেন না। অর্ডার কনফার্ম করার পর পণ্যটি রিসিভ না করলে আইন অনুযায়ী পদক্ষেপ নেওয়া হবে। আপনার দেওয়া মিথ্যা তথ্য ও ফেক অর্ডার ব্যবসায়িক ক্ষতি করে। আপনার বিরুদ্ধে ডিজিটাল নিরাপত্তা আইন অনুযায়ী পদক্ষেপ নেওয়া হবে।
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Description + Order Form */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">

            {/* Delivery Charges Section */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-s mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">ডেলিভারি চার্জ</h2>
            <p className="text-gray-500">পরিমাণ এবং এলাকার উপর ভিত্তি করে চার্জ নির্ধারিত হয়</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Chittagong */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border border-blue-200">
              <div className="flex items-center gap-3 mb-6">
                <MapPin className="w-6 h-6 text-blue-600" />
                <h3 className="text-xl font-bold text-gray-900">চট্টগ্রাম শহর</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between bg-white rounded-lg p-4">
                  <span className="text-gray-700">১-৩ পণ্য</span>
                  <span className="font-bold text-blue-600 text-lg">৳৮০</span>
                </div>
                <div className="flex items-center justify-between bg-white rounded-lg p-4">
                  <span className="text-gray-700">৪+ পণ্য</span>
                  <span className="font-bold text-blue-600 text-lg">৳৬০</span>
                </div>
              </div>
            </div>

            {/* Other Cities */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8 border border-orange-200">
              <div className="flex items-center gap-1 mb-6">
                <MapPin className="w-6 h-6 text-orange-600" />
                <h3 className="text-xl font-bold text-gray-900">অন্যান্য এলাকা</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between bg-white rounded-lg p-4">
                  <span className="text-gray-700">১-৩ পণ্য</span>
                  <span className="font-bold text-orange-600 text-lg">৳১৫০</span>
                </div>
                <div className="flex items-center justify-between bg-white rounded-lg p-4">
                  <span className="text-gray-700">৪+ পণ্য</span>
                  <span className="font-bold text-orange-600 text-lg">৳১২০</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-200">
            <p className="text-gray-700 text-center"><span className="font-semibold">নোট:</span> সমস্ত ডেলিভারি ২-৪ কার্যদিবসের মধ্যে নিশ্চিত করা হয়। ঢাকায় পরদিনেই পণ্য পাওয়া যায়।</p>
          </div>
        </div>
      </section>

            {/* Order Form */}
            <div ref={orderFormRef} id="order-form">
              <OrderForm
                submitted={submitted}
                submitError={submitError}
                phoneError={phoneError}
                formData={formData}
                quantity={quantity}
                submitting={submitting}
                deliveryCharge={deliveryCharge}
                totalPrice={totalPrice}
                onFieldChange={handleFieldChange}
                onQuantityChange={setQuantity}
                handleSubmit={handleSubmit}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section id="reviews" className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">গ্রাহকদের মতামত</h2>
            <div className="flex items-center justify-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map(s => (
                  <Star key={s} className="w-5 h-5 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <span className="font-bold text-gray-900">৪.৯</span>
              <span className="text-gray-500">(৪৮৭+ রিভিউ)</span>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {REVIEWS.map((review, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-red-600 font-bold text-sm">{review.name[0]}</span>
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{review.name}</p>
                      <p className="text-gray-400 text-xs flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {review.city}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400">{review.date}</span>
                </div>
                <div className="flex mb-3">
                  {[1, 2, 3, 4, 5].map(s => (
                    <Star key={s} className={`w-4 h-4 ${s <= review.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`} />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{review.text}</p>
                <div className="mt-3 flex items-center gap-1 text-xs text-green-600">
                  <CheckCircle className="w-3 h-3" />
                  <span>যাচাইকৃত ক্রেতা</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button
              onClick={scrollToOrder}
              className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 rounded-xl transition shadow-lg hover:shadow-xl"
            >
              আমিও অর্ডার করতে চাই
            </button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">সাধারণ প্রশ্নোত্তর</h2>
            <p className="text-gray-500">আপনার মনে যদি কোনো প্রশ্ন থাকে, এখানে উত্তর খুঁজে পাবেন।</p>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="border border-gray-200 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition"
                >
                  <span className="font-semibold text-gray-900 pr-4">{faq.q}</span>
                  {openFaq === i
                    ? <ChevronUp className="w-5 h-5 text-red-500 shrink-0" />
                    : <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
                  }
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-4 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">যোগাযোগ করুন</h2>
            <p className="text-gray-500">যেকোনো প্রশ্ন বা সাহায্যের জন্য আমাদের সাথে যোগাযোগ করুন।</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <a
              href="https://wa.me/8801967838738"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition text-center group"
            >
              <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition">
                <MessageCircle className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">WhatsApp</h3>
              <p className="text-gray-500 text-sm">01967838738</p>
              <p className="text-green-600 text-xs mt-2">সকাল ৯টা – রাত ১০টা</p>
            </a>

            <a
              href="https://www.facebook.com/asthaimports"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition text-center group"
            >
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition">
                <Facebook className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Facebook Page</h3>
              <p className="text-gray-500 text-sm">Astha Imports</p>
              <p className="text-blue-600 text-xs mt-2">মেসেজ করুন</p>
            </a>

            <a
              href="https://www.instagram.com/asthaimports"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition text-center group"
            >
              <div className="w-14 h-14 bg-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-pink-200 transition">
                <Instagram className="w-7 h-7 text-pink-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Instagram</h3>
              <p className="text-gray-500 text-sm">@asthaimports</p>
              <p className="text-pink-600 text-xs mt-2">ফলো করুন</p>
            </a>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
              <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Phone className="w-7 h-7 text-red-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">ফোন করুন</h3>
              <p className="text-gray-500 text-sm">01967838738</p>
              <p className="text-red-600 text-xs mt-2">সকাল ৯টা – রাত ১০টা</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg overflow-hidden bg-white flex items-center justify-center shadow-sm">
              <img src={logo} alt="Astha Imports" className="w-full h-full object-cover" />
            </div>
            <span className="text-white font-bold text-lg">Astha Imports</span>
          </div>
          <p className="text-sm mb-2">আস্থার সাথে কিনুন, নিশ্চিন্তে থাকুন।</p>
          <div className="flex items-center justify-center gap-4 text-xs mb-4">
            <span>ক্যাশ অন ডেলিভারি</span>
            <span>•</span>
            <span>৭ দিনের রিটার্ন</span>
            <span>•</span>
            <span>১০০% অরিজিনাল</span>
          </div>
          <p className="text-xs text-gray-600">© 2025 Astha Imports. সর্বস্বত্ব সংরক্ষিত।</p>
        </div>
      </footer>

      {/* Floating Buttons */}
      <div className="fixed bottom-6 right-4 flex flex-col gap-3 z-50">
        <a
          href="https://www.instagram.com/asthaimports"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-500 hover:opacity-90 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
          title="Instagram"
        >
          <Instagram className="w-5 h-5" />
        </a>
        <a
          href="https://www.facebook.com/asthaimports"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
          title="Facebook Page"
        >
          <Facebook className="w-5 h-5" />
        </a>
        <a
          href="https://wa.me/8801967838738"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
          title="WhatsApp"
        >
          <MessageCircle className="w-5 h-5" />
        </a>
      </div>

    </div>
  );
}
