import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft, CheckCircle2, CreditCard, Truck,
  ShieldCheck, ChevronRight, Package, User, Building2,
  Eye, EyeOff, Mail, Lock
} from 'lucide-react';
import {
  onAuthStateChanged, signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from 'firebase/auth';
import { auth } from '../firebase';
import { useStore } from '../store/context/StoreContext';
import { useLang } from '../App';
import { translations } from '../content/translations';
import { motion } from 'framer-motion';
import { Order, OrderCustomer } from '../store/types/storeTypes';

export const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { lang } = useLang();
  const t = translations[lang] || {};
  const ct = t.cart || {};
  const { cart, cartTotal, placeOrder } = useStore();

  const isRtl = lang === 'ar';

  // ── Auth state ──
  const [user, setUser] = useState<any>(null);
  const [step, setStep] = useState<number | null>(null); // null = checking auth

  // ── Auth form ──
  const [authMode, setAuthMode] = useState<'signin' | 'register'>('signin');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const [showPass, setShowPass] = useState(false);

  // ── Order form ──
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<Order['paymentMethod']>('cash');
  const [orderError, setOrderError] = useState('');
  const [customerType, setCustomerType] = useState<'individual' | 'company'>('individual');
  const [form, setForm] = useState({
    name: '', phone: '', address: '', city: '',
    notes: '', email: '', companyName: '', vatNumber: ''
  });

  const delivery = cartTotal >= 500 ? 0 : 150;
  const total = cartTotal + delivery;

  // ── Auth check on mount ──
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, u => {
      setUser(u);
      setStep(current => {
        if (current === null) return u ? 1 : 0;
        if (current === 0 && u) return 1;
        return current;
      });
      if (u?.email) {
        setForm(f => ({ ...f, email: u.email! }));
      }
    });
    return () => unsub();
  }, []);

  // ── Redirect if cart empty ──
  useEffect(() => {
    if (cart.length === 0 && !placedOrder && step !== null) {
      navigate('/store');
    }
  }, [cart.length, placedOrder, step, navigate]);

  // ── Auth handlers ──
  const handleSignIn = async () => {
    setAuthLoading(true);
    setAuthError('');
    try {
      await signInWithEmailAndPassword(auth, authEmail, authPassword);
    } catch (err: any) {
      const code = err.code;
      if (code === 'auth/wrong-password' || code === 'auth/invalid-credential') {
        setAuthError(isRtl ? 'كلمة المرور غير صحيحة.' : 'Incorrect password. Please try again.');
      } else if (code === 'auth/user-not-found') {
        setAuthError(isRtl ? 'لا يوجد حساب بهذا الإيميل.' : 'No account found with this email.');
      } else if (code === 'auth/invalid-email') {
        setAuthError(isRtl ? 'صيغة الإيميل غير صحيحة.' : 'Invalid email address.');
      } else {
        setAuthError(isRtl ? 'تعذر تسجيل الدخول. حاول مرة أخرى.' : 'Sign in failed. Please try again.');
      }
    } finally {
      setAuthLoading(false);
    }
  };

  const handleRegister = async () => {
    setAuthLoading(true);
    setAuthError('');
    try {
      await createUserWithEmailAndPassword(auth, authEmail, authPassword);
    } catch (err: any) {
      const code = err.code;
      if (code === 'auth/email-already-in-use') {
        setAuthError(isRtl ? 'هذا الإيميل مستخدم. سجل دخولك.' : 'Email already in use. Please sign in.');
        setAuthMode('signin');
      } else if (code === 'auth/weak-password') {
        setAuthError(isRtl ? 'كلمة المرور يجب أن تكون ٦ أحرف أو أكثر.' : 'Password must be at least 6 characters.');
      } else if (code === 'auth/invalid-email') {
        setAuthError(isRtl ? 'صيغة الإيميل غير صحيحة.' : 'Invalid email address.');
      } else {
        setAuthError(isRtl ? 'تعذر إنشاء الحساب. حاول مرة أخرى.' : 'Registration failed. Please try again.');
      }
    } finally {
      setAuthLoading(false);
    }
  };

  // ── Place order ──
  const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setOrderError('');
    setStep(3);
    try {
      const customer: OrderCustomer = {
        name: form.name,
        email: form.email || user?.email || '',
        phone: form.phone,
        address: form.address,
        city: form.city,
        notes: form.notes,
        type: customerType,
        companyName: customerType === 'company' ? form.companyName : undefined,
        vatNumber: customerType === 'company' ? form.vatNumber : undefined,
      };
      const order = await placeOrder(customer, paymentMethod);
      setPlacedOrder(order);
    } catch (err: any) {
      console.error('Order failed:', err);
      setStep(2);
      setOrderError(
        isRtl
          ? 'تعذر حفظ الطلب. تحقق من اتصالك وحاول مرة أخرى.'
          : 'Could not save your order. Check your connection and try again.'
      );
    }
  };

  // ── Loading (auth check) ──
  if (step === null) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-2 border-[#8A7A6B]/30 border-t-[#8A7A6B] animate-spin" />
      </div>
    );
  }

  // ── Success screen ──
  if (placedOrder) {
    return (
      <div className="min-h-[85vh] flex flex-col items-center justify-center px-6 text-center f-sans" dir={isRtl ? 'rtl' : 'ltr'}>
        <motion.div
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 18 }}
          className="w-28 h-28 bg-[#8A7A6B]/10 rounded-full flex items-center justify-center mb-8 text-[#8A7A6B]"
        >
          <CheckCircle2 size={56} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="space-y-4 mb-10"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-[#282828]">
            {isRtl ? 'تم استلام طلبك!' : 'Order Confirmed!'}
          </h2>
          <p className="text-[#737373] max-w-md mx-auto leading-relaxed">
            {isRtl
              ? 'شكراً لتسوقك مع فورست إيدج. سنتواصل معك قريباً لتأكيد التوصيل.'
              : 'Thank you for shopping with Forest Edge. We will contact you shortly to confirm delivery.'}
          </p>
          <div className="inline-flex items-center gap-2 bg-[#F5F2EE] px-5 py-3 rounded-full">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#737373]">
              {isRtl ? 'رقم الطلب:' : 'Order ID:'}
            </span>
            <span className="font-bold text-[#282828] f-sans tracking-wide">{placedOrder.id}</span>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <Link
            to="/orders"
            className="flex items-center gap-2 bg-[#282828] text-white px-10 py-4 rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-[#8A7A6B] transition-colors"
          >
            <Package size={14} />
            {isRtl ? 'تتبع طلبي' : 'Track My Order'}
          </Link>
          <button
            onClick={() => navigate('/store')}
            className="text-[#737373] text-[11px] font-bold uppercase tracking-widest hover:text-[#282828] transition-colors"
          >
            {isRtl ? 'مواصلة التسوق' : 'Continue Shopping'}
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-20 f-sans" dir={isRtl ? 'rtl' : 'ltr'}>
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-[#737373] text-[10px] uppercase tracking-widest hover:text-[#282828] transition-colors mb-12 font-bold"
      >
        <ArrowLeft size={14} className={isRtl ? 'rotate-180' : ''} />
        {isRtl ? 'الرجوع' : 'Back'}
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

        {/* ─── LEFT ─── */}
        <div className="lg:col-span-7">

          {/* Step indicator (only for steps 1-3) */}
          {step >= 1 && (
            <div className="flex items-center gap-8 mb-12 border-b border-[#1C1C1A]/5 pb-6">
              {[
                { n: 1, en: 'Shipping', ar: 'الشحن' },
                { n: 2, en: 'Payment', ar: 'الدفع' },
                { n: 3, en: 'Confirm', ar: 'التأكيد' },
              ].map((s) => (
                <div key={s.n} className={`flex items-center gap-3 transition-colors ${step >= s.n ? 'text-[#282828]' : 'text-[#737373]/30'}`}>
                  <span className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-[10px] font-bold transition-all ${
                    step > s.n ? 'border-[#8A7A6B] bg-[#8A7A6B] text-white'
                    : step === s.n ? 'border-[#282828] bg-[#282828] text-white'
                    : 'border-[#1C1C1A]/10 text-[#737373]/30'
                  }`}>
                    {step > s.n ? '✓' : s.n}
                  </span>
                  <span className="text-[10px] uppercase tracking-widest font-bold hidden sm:block">
                    {isRtl ? s.ar : s.en}
                  </span>
                  {s.n < 3 && <ChevronRight size={12} className={`text-[#737373]/20 ${isRtl ? 'rotate-180' : ''}`} />}
                </div>
              ))}
            </div>
          )}

          <form onSubmit={handleOrder} className="space-y-12">

            {/* ── STEP 0: Auth ── */}
            {step === 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#8A7A6B] block mb-3">
                    {isRtl ? 'الخطوة الأولى' : 'Step One'}
                  </span>
                  <h3 className="text-3xl font-serif text-[#282828]">
                    {isRtl ? 'سجّل دخولك للمتابعة' : 'Sign in to continue'}
                  </h3>
                  <p className="text-[#737373] text-sm mt-2 leading-relaxed">
                    {isRtl
                      ? 'حسابك يتيح لك تتبع طلباتك من أي جهاز في أي وقت.'
                      : 'Your account lets you track your orders from any device, anytime.'}
                  </p>
                </div>

                {/* Mode toggle */}
                <div className="flex gap-1 bg-[#F5F2EE] rounded-full p-1 w-fit">
                  {[
                    { key: 'signin', en: 'Sign In', ar: 'تسجيل الدخول' },
                    { key: 'register', en: 'Create Account', ar: 'إنشاء حساب' },
                  ].map(m => (
                    <button
                      key={m.key}
                      type="button"
                      onClick={() => { setAuthMode(m.key as any); setAuthError(''); }}
                      className={`px-5 py-2 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all ${
                        authMode === m.key
                          ? 'bg-[#282828] text-white shadow'
                          : 'text-[#737373] hover:text-[#282828]'
                      }`}
                    >
                      {isRtl ? m.ar : m.en}
                    </button>
                  ))}
                </div>

                {/* Error */}
                {authError && (
                  <div className="bg-red-50 border border-red-100 text-red-600 rounded-xl px-4 py-3 text-sm f-sans">
                    {authError}
                  </div>
                )}

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-[#737373] font-bold block">
                    {isRtl ? 'البريد الإلكتروني' : 'Email Address'} *
                  </label>
                  <div className="relative">
                    <Mail size={15} className={`absolute top-1/2 -translate-y-1/2 text-[#737373] ${isRtl ? 'right-0' : 'left-0'}`} />
                    <input
                      type="email" required
                      value={authEmail}
                      onChange={e => setAuthEmail(e.target.value)}
                      className={`w-full bg-transparent border-b border-[#1C1C1A]/10 py-3 focus:outline-none focus:border-[#8A7A6B] transition-colors text-[#282828] ${isRtl ? 'pr-6' : 'pl-6'}`}
                      placeholder="email@example.com"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-[#737373] font-bold block">
                    {isRtl ? 'كلمة المرور' : 'Password'} *
                    {authMode === 'register' && (
                      <span className="normal-case tracking-normal font-normal text-[#737373]/70 ml-2">
                        {isRtl ? '(٦ أحرف على الأقل)' : '(min. 6 characters)'}
                      </span>
                    )}
                  </label>
                  <div className="relative">
                    <Lock size={15} className={`absolute top-1/2 -translate-y-1/2 text-[#737373] ${isRtl ? 'right-0' : 'left-0'}`} />
                    <input
                      type={showPass ? 'text' : 'password'} required
                      value={authPassword}
                      onChange={e => setAuthPassword(e.target.value)}
                      className={`w-full bg-transparent border-b border-[#1C1C1A]/10 py-3 focus:outline-none focus:border-[#8A7A6B] transition-colors text-[#282828] ${isRtl ? 'pr-6 pl-8' : 'pl-6 pr-8'}`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(s => !s)}
                      className={`absolute top-1/2 -translate-y-1/2 text-[#737373] hover:text-[#282828] ${isRtl ? 'left-0' : 'right-0'}`}
                    >
                      {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="button"
                  onClick={authMode === 'signin' ? handleSignIn : handleRegister}
                  disabled={authLoading || !authEmail || !authPassword}
                  className="flex items-center gap-3 bg-[#282828] text-white px-10 py-4 rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-[#8A7A6B] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {authLoading ? (
                    <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  ) : null}
                  {authMode === 'signin'
                    ? (isRtl ? 'تسجيل الدخول والمتابعة' : 'Sign In & Continue')
                    : (isRtl ? 'إنشاء حساب والمتابعة' : 'Create Account & Continue')}
                  <ChevronRight size={14} className={isRtl ? 'rotate-180' : ''} />
                </button>
              </motion.div>
            )}

            {/* ── STEP 1: Shipping ── */}
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-serif text-[#282828]">
                    {isRtl ? 'معلومات التوصيل' : 'Delivery Information'}
                  </h3>
                  <span className="text-[10px] text-[#737373] f-sans">
                    {user?.email}
                  </span>
                </div>

                {/* Customer type */}
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-widest text-[#737373] font-bold block">
                    {isRtl ? 'نوع العميل' : 'Customer Type'}
                  </label>
                  <div className="flex gap-3">
                    {[
                      { key: 'individual', en: 'Individual', ar: 'فرد', icon: User },
                      { key: 'company', en: 'Company', ar: 'شركة', icon: Building2 },
                    ].map(t => {
                      const Icon = t.icon;
                      return (
                        <button
                          key={t.key}
                          type="button"
                          onClick={() => setCustomerType(t.key as any)}
                          className={`flex items-center gap-2 px-5 py-3 rounded-full text-[11px] font-bold uppercase tracking-widest border-2 transition-all ${
                            customerType === t.key
                              ? 'border-[#282828] bg-[#282828] text-white'
                              : 'border-[#1C1C1A]/10 text-[#737373] hover:border-[#8A7A6B]/50'
                          }`}
                        >
                          <Icon size={13} />
                          {isRtl ? t.ar : t.en}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Company fields (shown only if company) */}
                  {customerType === 'company' && (
                    <>
                      <div className="md:col-span-2 space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-[#737373] font-bold block">
                          {isRtl ? 'اسم الشركة' : 'Company Name'} *
                        </label>
                        <input
                          type="text" required
                          value={form.companyName}
                          onChange={e => setForm(f => ({ ...f, companyName: e.target.value }))}
                          className="w-full bg-transparent border-b border-[#1C1C1A]/10 py-3 focus:outline-none focus:border-[#8A7A6B] transition-colors text-[#282828]"
                          placeholder={isRtl ? 'شركة فورست للأثاث المحدودة' : 'Forest Furniture Co. Ltd.'}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-[#737373] font-bold block">
                          {isRtl ? 'الرقم الضريبي (اختياري)' : 'VAT Number (optional)'}
                        </label>
                        <input
                          type="text"
                          value={form.vatNumber}
                          onChange={e => setForm(f => ({ ...f, vatNumber: e.target.value }))}
                          className="w-full bg-transparent border-b border-[#1C1C1A]/10 py-3 focus:outline-none focus:border-[#8A7A6B] transition-colors text-[#282828]"
                          placeholder="300XXXXXXXXX"
                        />
                      </div>
                    </>
                  )}

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-[#737373] font-bold block">
                      {isRtl ? 'الاسم بالكامل' : 'Full Name'} *
                    </label>
                    <input
                      type="text" required
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      className="w-full bg-transparent border-b border-[#1C1C1A]/10 py-3 focus:outline-none focus:border-[#8A7A6B] transition-colors text-[#282828]"
                      placeholder={isRtl ? 'محمد الأحمد' : 'John Smith'}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-[#737373] font-bold block">
                      {isRtl ? 'رقم الهاتف' : 'Phone Number'} *
                    </label>
                    <input
                      type="tel" required
                      value={form.phone}
                      onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                      className="w-full bg-transparent border-b border-[#1C1C1A]/10 py-3 focus:outline-none focus:border-[#8A7A6B] transition-colors text-[#282828]"
                      placeholder="+966 5X XXX XXXX"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-[#737373] font-bold block">
                      {isRtl ? 'البريد الإلكتروني' : 'Email Address'}
                    </label>
                    <input
                      type="email"
                      value={form.email || user?.email || ''}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      className="w-full bg-transparent border-b border-[#1C1C1A]/10 py-3 focus:outline-none focus:border-[#8A7A6B] transition-colors text-[#282828]"
                      placeholder="email@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-[#737373] font-bold block">
                      {isRtl ? 'المدينة' : 'City'} *
                    </label>
                    <input
                      type="text" required
                      value={form.city}
                      onChange={e => setForm(f => ({ ...f, city: e.target.value }))}
                      className="w-full bg-transparent border-b border-[#1C1C1A]/10 py-3 focus:outline-none focus:border-[#8A7A6B] transition-colors text-[#282828]"
                      placeholder={isRtl ? 'الرياض' : 'Riyadh'}
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-[#737373] font-bold block">
                      {isRtl ? 'العنوان التفصيلي' : 'Full Address'} *
                    </label>
                    <input
                      type="text" required
                      value={form.address}
                      onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
                      className="w-full bg-transparent border-b border-[#1C1C1A]/10 py-3 focus:outline-none focus:border-[#8A7A6B] transition-colors text-[#282828]"
                      placeholder={isRtl ? 'شارع العليا، حي الروضة، مبنى ٤٢' : 'Olaya Street, Al Rawdah, Building 42'}
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-[#737373] font-bold block">
                      {isRtl ? 'ملاحظات إضافية' : 'Order Notes'}
                    </label>
                    <textarea
                      rows={3}
                      value={form.notes}
                      onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                      className="w-full bg-transparent border-b border-[#1C1C1A]/10 py-3 focus:outline-none focus:border-[#8A7A6B] transition-colors resize-none text-[#282828]"
                      placeholder={isRtl ? 'أي تعليمات خاصة للتوصيل...' : 'Any special delivery instructions...'}
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const ok = form.name && form.phone && form.address && form.city;
                    const companyOk = customerType === 'company' ? Boolean(form.companyName) : true;
                    if (ok && companyOk) setStep(2);
                  }}
                  className="flex items-center gap-3 bg-[#282828] text-white px-10 py-4 rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-[#8A7A6B] transition-colors group"
                >
                  {isRtl ? 'متابعة للدفع' : 'Proceed to Payment'}
                  <ChevronRight size={14} className={`group-hover:translate-x-1 transition-transform ${isRtl ? 'rotate-180' : ''}`} />
                </button>
              </motion.div>
            )}

            {/* ── STEP 2: Payment ── */}
            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                <h3 className="text-2xl font-serif text-[#282828]">
                  {isRtl ? 'طريقة الدفع' : 'Payment Method'}
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      id: 'cash' as const,
                      en: 'Cash on Delivery', ar: 'الدفع عند الاستلام',
                      icon: <Truck size={20} />,
                      subEn: 'Pay when your order arrives',
                      subAr: 'ادفع عند وصول طلبك',
                      disabled: false,
                    },
                    {
                      id: 'card' as const,
                      en: 'Credit / Debit Card', ar: 'بطاقة ائتمانية',
                      icon: <CreditCard size={20} />,
                      subEn: 'Coming soon',
                      subAr: 'قريباً',
                      disabled: true,
                    },
                    {
                      id: 'bank' as const,
                      en: 'Bank Transfer', ar: 'تحويل بنكي',
                      icon: <ShieldCheck size={20} />,
                      subEn: 'IBAN transfer — contact us for details',
                      subAr: 'تحويل عبر الآيبان — تواصل معنا للتفاصيل',
                      disabled: false,
                    },
                  ].map((m) => (
                    <label
                      key={m.id}
                      className={`flex items-center justify-between p-6 rounded-2xl border-2 transition-all cursor-pointer ${
                        m.disabled
                          ? 'opacity-35 cursor-not-allowed border-[#1C1C1A]/5'
                          : paymentMethod === m.id
                          ? 'border-[#8A7A6B] bg-[#8A7A6B]/5'
                          : 'border-[#1C1C1A]/8 hover:border-[#8A7A6B]/50'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`${paymentMethod === m.id ? 'text-[#8A7A6B]' : 'text-[#737373]'}`}>
                          {m.icon}
                        </div>
                        <div>
                          <span className="text-sm font-bold text-[#282828] block">
                            {isRtl ? m.ar : m.en}
                          </span>
                          <span className="text-xs text-[#737373]">
                            {isRtl ? m.subAr : m.subEn}
                          </span>
                        </div>
                      </div>
                      {!m.disabled && (
                        <input
                          type="radio" name="payment"
                          checked={paymentMethod === m.id}
                          onChange={() => setPaymentMethod(m.id)}
                          className="accent-[#8A7A6B] w-5 h-5"
                        />
                      )}
                    </label>
                  ))}
                </div>
                {orderError && (
                  <div className="bg-red-50 border border-red-100 text-red-600 rounded-xl px-4 py-3 text-sm f-sans">
                    {orderError}
                  </div>
                )}
                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-[10px] uppercase tracking-widest text-[#737373] hover:text-[#282828] font-bold"
                  >
                    {isRtl ? 'تعديل الشحن' : 'Edit Shipping'}
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-3 bg-[#282828] text-white px-10 py-4 rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-[#8A7A6B] transition-colors group"
                  >
                    {isRtl ? 'تأكيد الطلب' : 'Confirm Order'}
                    <ShieldCheck size={14} className="group-hover:scale-110 transition-transform" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* ── STEP 3: Processing ── */}
            {step === 3 && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center py-20 text-center gap-6">
                <div className="w-16 h-16 rounded-full border-4 border-[#8A7A6B]/20 border-t-[#8A7A6B] animate-spin" />
                <p className="text-[#282828] font-serif text-2xl">
                  {isRtl ? 'جاري تأكيد طلبك...' : 'Confirming your order...'}
                </p>
              </motion.div>
            )}
          </form>
        </div>

        {/* ─── RIGHT: Order Summary ─── */}
        <div className="lg:col-span-5">
          <div className="bg-[#F5F2EE] rounded-[2rem] p-10 sticky top-32">
            <h4 className="text-xl font-serif text-[#282828] mb-8">
              {isRtl ? 'ملخص الطلب' : 'Order Summary'}
            </h4>
            <div className="space-y-5 mb-8 max-h-[320px] overflow-y-auto">
              {cart.map((item) => (
                <div key={item.product.id} className="flex gap-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-white border border-[#1C1C1A]/5 flex-shrink-0">
                    <img src={item.product.images[0]} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0 flex-grow">
                    <p className="text-sm font-serif truncate text-[#282828]">
                      {item.product.name[lang]}
                    </p>
                    <p className="text-[10px] text-[#737373] uppercase tracking-widest mt-1">
                      {isRtl ? 'الكمية:' : 'QTY:'} {item.quantity}
                    </p>
                  </div>
                  <p className="text-sm font-bold text-[#282828] flex-shrink-0">
                    {(item.product.price * item.quantity).toLocaleString()} SAR
                  </p>
                </div>
              ))}
            </div>
            <div className="space-y-4 pt-8 border-t border-[#1C1C1A]/10 text-[10px] font-bold uppercase tracking-[0.15em] text-[#737373]">
              <div className="flex justify-between">
                <span>{ct.subtotal || (isRtl ? 'المجموع الفرعي' : 'Subtotal')}</span>
                <span>{cartTotal.toLocaleString()} SAR</span>
              </div>
              <div className="flex justify-between">
                <span>{ct.delivery || (isRtl ? 'التوصيل' : 'Delivery')}</span>
                <span className={delivery === 0 ? 'text-[#8A7A6B]' : ''}>
                  {delivery === 0 ? (ct.free || (isRtl ? 'مجاني' : 'Free')) : `${delivery} SAR`}
                </span>
              </div>
              <div className="flex justify-between text-[#282828] text-lg font-serif pt-4 normal-case tracking-normal">
                <span>{ct.total || (isRtl ? 'الإجمالي' : 'Total')}</span>
                <span>{total.toLocaleString()} SAR</span>
              </div>
            </div>
            {cartTotal < 500 && (
              <div className="mt-6 bg-white/80 rounded-xl px-4 py-3 text-[10px] text-[#8A7A6B] font-bold uppercase tracking-widest">
                {isRtl
                  ? `أضف ${(500 - cartTotal).toLocaleString()} ريال للشحن المجاني`
                  : `Add ${(500 - cartTotal).toLocaleString()} SAR for free shipping`}
              </div>
            )}
            {cartTotal >= 500 && (
              <div className="mt-6 bg-[#8A7A6B]/10 rounded-xl px-4 py-3 text-[10px] text-[#8A7A6B] font-bold uppercase tracking-widest">
                {isRtl ? '✓ التوصيل مجاني' : '✓ Free Shipping Included'}
              </div>
            )}
            <div className="mt-8 flex items-center gap-3 text-[9px] text-[#8A7A6B] uppercase tracking-widest font-bold">
              <ShieldCheck size={14} />
              {isRtl ? 'نظام دفع آمن ومحمي' : 'Secure Checkout System'}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Checkout;
