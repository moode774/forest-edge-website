import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  collection, query, where, getDocs,
  doc, getDoc, onSnapshot
} from 'firebase/firestore';
import { db } from '../firebase';
import {
  Search, Package, CheckCircle2, Clock, Truck, MapPin,
  FileText, ChevronDown, ChevronUp, Phone, Hash, ArrowRight
} from 'lucide-react';
import { useLang } from '../App';

const statusConfig = {
  confirmed: { color: 'bg-blue-50 text-blue-600 border-blue-100', icon: CheckCircle2, en: 'Confirmed', ar: 'مؤكد' },
  processing: { color: 'bg-amber-50 text-amber-600 border-amber-100', icon: Clock, en: 'Processing', ar: 'قيد التجهيز' },
  shipped: { color: 'bg-purple-50 text-purple-600 border-purple-100', icon: Truck, en: 'Shipped', ar: 'تم الشحن' },
  delivered: { color: 'bg-green-50 text-green-600 border-green-100', icon: MapPin, en: 'Delivered', ar: 'تم التوصيل' },
};
const timelineSteps = ['confirmed', 'processing', 'shipped', 'delivered'] as const;

const TrackCard: React.FC<{ order: any; lang: 'en' | 'ar' }> = ({ order, lang }) => {
  const [expanded, setExpanded] = useState(true);
  const ar = lang === 'ar';
  const statusKey = (order.status || 'confirmed') as keyof typeof statusConfig;
  const status = statusConfig[statusKey] || statusConfig.confirmed;
  const StatusIcon = status.icon;
  const currentStep = timelineSteps.indexOf(statusKey as typeof timelineSteps[number]);

  const dateStr = new Date(order.date).toLocaleDateString(ar ? 'ar-SA' : 'en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  const paymentLabel = (pm: string) => {
    if (pm === 'cash') return ar ? 'الدفع عند الاستلام' : 'Cash on Delivery';
    if (pm === 'card') return ar ? 'بطاقة ائتمان' : 'Credit Card';
    return ar ? 'تحويل بنكي' : 'Bank Transfer';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-[2rem] overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.08)] border border-[#282828]/5"
    >
      {/* Header */}
      <button
        onClick={() => setExpanded(e => !e)}
        className="w-full text-left flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 md:p-8 hover:bg-[#FDFCFB] transition-colors"
      >
        <div className="flex items-center gap-5">
          <div className="w-12 h-12 rounded-full bg-[#F5F2EE] flex items-center justify-center flex-shrink-0">
            <Package size={20} className="text-[#8A7A6B]" />
          </div>
          <div dir={ar ? 'rtl' : 'ltr'}>
            <p className="font-bold text-[#282828] f-sans text-base tracking-wide">{order.id}</p>
            <p className="text-[#737373] text-xs f-sans mt-0.5">{dateStr}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 flex-wrap">
          <span className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border f-sans ${status.color}`}>
            <StatusIcon size={12} />
            {ar ? status.ar : status.en}
          </span>
          <span className="text-[#282828] font-bold font-serif text-lg">
            {(order.total || 0).toLocaleString()} SAR
          </span>
          <div className="text-[#737373]">
            {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </div>
        </div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="border-t border-[#282828]/5 px-6 md:px-8 pb-8 pt-6 space-y-8" dir={ar ? 'rtl' : 'ltr'}>

              {/* Timeline */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#282828] mb-5">
                  {ar ? 'تتبع الشحنة' : 'Shipment Tracking'}
                </p>
                <div className="flex items-start relative">
                  {timelineSteps.map((step, i) => {
                    const s = statusConfig[step];
                    const SIcon = s.icon;
                    const done = i <= currentStep;
                    const active = i === currentStep;
                    return (
                      <div key={step} className="flex-1 flex flex-col items-center relative">
                        {i < timelineSteps.length - 1 && (
                          <div className={`absolute top-4 left-1/2 w-full h-[2px] ${done && i < currentStep ? 'bg-[#8A7A6B]' : 'bg-[#282828]/10'}`} />
                        )}
                        <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                          active ? 'border-[#8A7A6B] bg-[#8A7A6B] text-white scale-125 shadow-lg shadow-[#8A7A6B]/40'
                            : done ? 'border-[#8A7A6B] bg-[#8A7A6B]/10 text-[#8A7A6B]'
                            : 'border-[#282828]/10 bg-white text-[#282828]/20'
                        }`}>
                          <SIcon size={14} />
                        </div>
                        <p className={`mt-2 text-[9px] font-bold uppercase tracking-widest text-center leading-tight ${
                          active ? 'text-[#8A7A6B]' : done ? 'text-[#282828]/60' : 'text-[#282828]/20'
                        }`}>
                          {ar ? s.ar : s.en}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Items */}
              {(order.items || []).length > 0 && (
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#282828] mb-4">
                    {ar ? 'المنتجات المطلوبة' : 'Ordered Items'}
                  </p>
                  <div className="space-y-3">
                    {order.items.map((item: any, idx: number) => (
                      <div key={idx} className="flex gap-4 items-center bg-[#FDFCFB] rounded-xl p-3 border border-[#282828]/5">
                        <div className="w-14 h-14 rounded-lg overflow-hidden bg-[#F5F2EE] flex-shrink-0">
                          {item.product?.images?.[0] && (
                            <img src={item.product.images[0]} alt="" className="w-full h-full object-cover" />
                          )}
                        </div>
                        <div className="flex-grow min-w-0">
                          <p className="text-[#282828] font-serif text-sm truncate">
                            {item.product?.name?.[lang] || item.product?.name?.en}
                          </p>
                          <p className="text-[#737373] text-xs f-sans mt-0.5">
                            {ar ? 'الكمية' : 'Qty'}: {item.quantity}
                          </p>
                        </div>
                        <p className="text-[#282828] font-bold f-sans text-sm flex-shrink-0">
                          {((item.product?.price || 0) * item.quantity).toLocaleString()} SAR
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Bottom info row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#F5F2EE] rounded-xl p-4">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-[#737373] mb-2 f-sans">
                    {ar ? 'العميل' : 'Customer'}
                  </p>
                  <p className="text-[#282828] font-bold f-sans text-sm">{order.customer?.name}</p>
                  <p className="text-[#737373] text-xs f-sans mt-0.5">{order.customer?.phone}</p>
                </div>
                <div className="bg-[#F5F2EE] rounded-xl p-4">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-[#737373] mb-2 f-sans">
                    {ar ? 'طريقة الدفع' : 'Payment'}
                  </p>
                  <p className="text-[#282828] font-bold f-sans text-sm">{paymentLabel(order.paymentMethod)}</p>
                  <p className="text-[#737373] text-xs f-sans mt-0.5">
                    {order.paymentMethod === 'cash'
                      ? (ar ? 'يُدفع عند التسليم' : 'Collected on delivery')
                      : (ar ? 'مدفوع' : 'Pre-paid')}
                  </p>
                </div>
                <div className="bg-[#F5F2EE] rounded-xl p-4">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-[#737373] mb-2 f-sans">
                    {ar ? 'المبلغ الإجمالي' : 'Total Amount'}
                  </p>
                  <p className="text-[#282828] font-serif text-xl font-bold">{(order.total || 0).toLocaleString()} SAR</p>
                  <p className="text-[#737373] text-xs f-sans mt-0.5">
                    {ar ? 'شامل التوصيل' : 'Including delivery'}
                  </p>
                </div>
              </div>

              {/* Invoice button */}
              <div className="flex justify-end">
                <Link
                  to={`/invoice/${order.id}`}
                  className="inline-flex items-center gap-2 bg-[#282828] text-white px-6 py-3 rounded-xl text-[11px] font-bold uppercase tracking-widest hover:bg-[#8A7A6B] transition-all f-sans"
                >
                  <FileText size={13} />
                  {ar ? 'عرض الفاتورة' : 'View Invoice'}
                </Link>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ══════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════ */
export const TrackOrder: React.FC = () => {
  const { lang } = useLang();
  const ar = lang === 'ar';

  const [mode, setMode] = useState<'id' | 'phone'>('id');
  const [input, setInput] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [searching, setSearching] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState('');

  // Store unsub to cancel previous listener
  const unsubRef = React.useRef<(() => void) | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const val = input.trim();
    if (!val) return;

    // Cancel any previous listener
    if (unsubRef.current) { unsubRef.current(); unsubRef.current = null; }

    setSearching(true);
    setSearched(false);
    setError('');
    setResults([]);

    try {
      if (mode === 'id') {
        // Real-time listener for a single order
        const unsub = onSnapshot(doc(db, 'orders', val), snap => {
          if (snap.exists()) {
            setResults([{ id: snap.id, ...snap.data() }]);
          } else {
            setResults([]);
          }
          setSearching(false);
          setSearched(true);
        }, () => {
          setError(ar ? 'حدث خطأ أثناء البحث' : 'Search failed. Please try again.');
          setSearching(false);
          setSearched(true);
        });
        unsubRef.current = unsub;
      } else {
        // Real-time listener for all orders by phone
        const q = query(collection(db, 'orders'), where('customer.phone', '==', val));
        const unsub = onSnapshot(q, snap => {
          const fetched = snap.docs.map(d => ({ id: d.id, ...d.data() }));
          fetched.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
          setResults(fetched);
          setSearching(false);
          setSearched(true);
        }, () => {
          setError(ar ? 'حدث خطأ أثناء البحث' : 'Search failed. Please try again.');
          setSearching(false);
          setSearched(true);
        });
        unsubRef.current = unsub;
      }
    } catch {
      setError(ar ? 'حدث خطأ' : 'An error occurred');
      setSearching(false);
      setSearched(true);
    }
  };

  // Cleanup on unmount
  React.useEffect(() => {
    return () => { if (unsubRef.current) unsubRef.current(); };
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFCFB]" dir={ar ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="bg-white border-b border-[#282828]/5">
        <div className="max-w-[800px] mx-auto px-6 md:px-12 py-16 md:py-20">
          <span className="text-[#8A7A6B] text-[10px] font-bold uppercase tracking-[0.3em] block mb-4 f-sans">
            {ar ? 'خدمة العملاء' : 'Customer Service'}
          </span>
          <h1 className="font-serif text-[#282828] text-4xl md:text-5xl leading-tight">
            {ar ? 'تتبع طلبك' : 'Track Your Order'}
          </h1>
          <p className="text-[#737373] text-lg mt-4 f-sans font-light">
            {ar
              ? 'أدخل رقم الطلب أو رقم هاتفك للاطلاع على حالة شحنتك في الوقت الفعلي'
              : 'Enter your order number or phone to see your shipment status in real-time'}
          </p>
        </div>
      </div>

      <div className="max-w-[800px] mx-auto px-6 md:px-12 py-16">

        {/* Search Card */}
        <div className="bg-white rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.08)] border border-[#282828]/5 p-8 mb-10">

          {/* Mode Toggle */}
          <div className="flex gap-2 mb-8 bg-[#F5F2EE] rounded-2xl p-1.5">
            {([
              { key: 'id', icon: Hash, en: 'Order Number', ar: 'رقم الطلب' },
              { key: 'phone', icon: Phone, en: 'Phone Number', ar: 'رقم الهاتف' },
            ] as const).map(tab => (
              <button
                key={tab.key}
                onClick={() => { setMode(tab.key); setResults([]); setSearched(false); setInput(''); if (unsubRef.current) { unsubRef.current(); unsubRef.current = null; } }}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all f-sans ${
                  mode === tab.key
                    ? 'bg-white text-[#282828] shadow-sm'
                    : 'text-[#737373] hover:text-[#282828]'
                }`}
              >
                <tab.icon size={14} />
                {ar ? tab.ar : tab.en}
              </button>
            ))}
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch}>
            <div className="relative mb-4">
              <Search size={18} className={`absolute top-1/2 -translate-y-1/2 text-[#737373] ${ar ? 'right-4' : 'left-4'}`} />
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder={mode === 'id'
                  ? (ar ? 'مثال: FE-2026-1234' : 'e.g. FE-2026-1234')
                  : (ar ? 'مثال: 0501234567' : 'e.g. +966501234567')}
                className={`w-full bg-[#FDFCFB] border border-[#282828]/10 rounded-2xl py-4 text-base text-[#282828] focus:outline-none focus:border-[#8A7A6B] transition-colors f-sans ${ar ? 'pr-12 pl-4 text-right' : 'pl-12 pr-4'}`}
                dir={ar ? 'rtl' : 'ltr'}
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm f-sans mb-4">{error}</p>
            )}

            <button
              type="submit"
              disabled={searching || !input.trim()}
              className="w-full bg-[#282828] text-white py-4 rounded-2xl text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#8A7A6B] transition-all f-sans disabled:opacity-50 flex items-center justify-center gap-3"
            >
              {searching ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Search size={15} />
              )}
              {searching ? (ar ? 'جارٍ البحث...' : 'Searching...') : (ar ? 'بحث' : 'Search')}
            </button>
          </form>
        </div>

        {/* Results */}
        <AnimatePresence>
          {searched && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              {results.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-3xl border border-[#282828]/5">
                  <div className="w-16 h-16 rounded-full bg-[#F5F2EE] flex items-center justify-center mx-auto mb-6">
                    <Package size={28} className="text-[#8A7A6B]/40" />
                  </div>
                  <h3 className="font-serif text-[#282828] text-2xl mb-3">
                    {ar ? 'لم يتم العثور على طلب' : 'No order found'}
                  </h3>
                  <p className="text-[#737373] text-sm f-sans max-w-xs mx-auto">
                    {mode === 'id'
                      ? (ar ? 'تأكد من رقم الطلب وحاول مجدداً' : 'Check the order number and try again')
                      : (ar ? 'تأكد من رقم الهاتف المستخدم عند الطلب' : 'Make sure you entered the phone used when ordering')}
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <p className="text-[#282828] font-bold f-sans">
                      {results.length === 1
                        ? (ar ? 'تم العثور على طلب' : 'Order found')
                        : (ar ? `تم العثور على ${results.length} طلبات` : `${results.length} orders found`)}
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-xs text-[#737373] f-sans">
                        {ar ? 'متزامن مباشرةً' : 'Live updates'}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-5">
                    {results.map((order: any) => (
                      <TrackCard key={order.id} order={order} lang={lang} />
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Help section */}
        {!searched && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="text-center"
          >
            <p className="text-[#737373] text-sm f-sans mb-6">
              {ar ? 'تجد رقم الطلب في رسالة تأكيد الطلب الخاصة بك' : 'Your order number is in your order confirmation message'}
            </p>
            <div className="flex items-center justify-center gap-3">
              <Link to="/store" className="inline-flex items-center gap-2 text-[#8A7A6B] text-[11px] font-bold uppercase tracking-widest hover:text-[#282828] transition-colors f-sans">
                <ArrowRight size={13} className={ar ? 'rotate-180' : ''} />
                {ar ? 'تصفح المتجر' : 'Browse Store'}
              </Link>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
};

export default TrackOrder;
