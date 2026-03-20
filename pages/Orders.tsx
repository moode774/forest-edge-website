import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import {
  Package, ChevronDown, ChevronUp, ShoppingBag,
  CheckCircle2, Clock, Truck, MapPin, ArrowRight,
  FileText, Search, Wifi
} from 'lucide-react';
import { useLang } from '../App';

const statusConfig = {
  confirmed: {
    color: 'bg-blue-50 text-blue-600 border-blue-100',
    icon: CheckCircle2,
    en: 'Confirmed', ar: 'مؤكد',
  },
  processing: {
    color: 'bg-amber-50 text-amber-600 border-amber-100',
    icon: Clock,
    en: 'Processing', ar: 'قيد التجهيز',
  },
  shipped: {
    color: 'bg-purple-50 text-purple-600 border-purple-100',
    icon: Truck,
    en: 'Shipped', ar: 'تم الشحن',
  },
  delivered: {
    color: 'bg-green-50 text-green-600 border-green-100',
    icon: MapPin,
    en: 'Delivered', ar: 'تم التوصيل',
  },
};

const timelineSteps = ['confirmed', 'processing', 'shipped', 'delivered'] as const;

const OrderCard: React.FC<{ order: any; lang: 'en' | 'ar' }> = ({ order, lang }) => {
  const [expanded, setExpanded] = useState(false);
  const ar = lang === 'ar';
  const statusKey = (order.status || 'confirmed') as keyof typeof statusConfig;
  const status = statusConfig[statusKey] || statusConfig.confirmed;
  const StatusIcon = status.icon;
  const currentStep = timelineSteps.indexOf(statusKey as typeof timelineSteps[number]);

  const dateStr = new Date(order.date).toLocaleDateString(ar ? 'ar-SA' : 'en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  const paymentLabel = (pm: string) => {
    if (pm === 'cash') return ar ? 'عند الاستلام' : 'Cash on Delivery';
    if (pm === 'card') return ar ? 'بطاقة ائتمان' : 'Credit Card';
    return ar ? 'تحويل بنكي' : 'Bank Transfer';
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-[2rem] overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-[#282828]/5"
    >
      {/* Order Header */}
      <button
        onClick={() => setExpanded(e => !e)}
        className="w-full text-left flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 md:p-8 hover:bg-[#FDFCFB] transition-colors"
      >
        <div className="flex items-center gap-5">
          <div className="w-12 h-12 rounded-full bg-[#F5F2EE] flex items-center justify-center flex-shrink-0">
            <Package size={20} className="text-[#8A7A6B]" />
          </div>
          <div className="text-left" dir={ar ? 'rtl' : 'ltr'}>
            <p className="font-bold text-[#282828] f-sans text-sm tracking-wide">{order.id}</p>
            <p className="text-[#737373] text-xs f-sans mt-0.5">{dateStr}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 flex-wrap">
          <span className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border f-sans ${status.color}`}>
            <StatusIcon size={12} />
            {ar ? status.ar : status.en}
          </span>
          <span className="text-[#737373] text-xs f-sans font-medium">
            {order.items?.length || 0} {ar ? 'قطعة' : 'items'}
          </span>
          <span className="text-[#282828] font-bold font-serif text-lg">
            {(order.total || 0).toLocaleString()} SAR
          </span>
          <div className="text-[#737373]">
            {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </div>
        </div>
      </button>

      {/* Expanded Details */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            key="details"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="border-t border-[#282828]/5 px-6 md:px-8 pb-8 pt-6 space-y-8" dir={ar ? 'rtl' : 'ltr'}>

              {/* Progress Timeline */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#282828] mb-5">
                  {ar ? 'حالة الطلب' : 'Order Status'}
                </p>
                <div className="flex items-start relative">
                  {timelineSteps.map((step, i) => {
                    const s = statusConfig[step];
                    const StepIcon = s.icon;
                    const done = i <= currentStep;
                    const active = i === currentStep;
                    return (
                      <div key={step} className="flex-1 flex flex-col items-center relative">
                        {i < timelineSteps.length - 1 && (
                          <div className={`absolute top-4 left-1/2 w-full h-[2px] ${done && i < currentStep ? 'bg-[#8A7A6B]' : 'bg-[#282828]/10'}`} />
                        )}
                        <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                          active ? 'border-[#8A7A6B] bg-[#8A7A6B] text-white scale-110 shadow-lg shadow-[#8A7A6B]/30'
                            : done ? 'border-[#8A7A6B] bg-[#8A7A6B]/10 text-[#8A7A6B]'
                            : 'border-[#282828]/10 bg-white text-[#282828]/20'
                        }`}>
                          <StepIcon size={14} />
                        </div>
                        <p className={`mt-2 text-[9px] font-bold uppercase tracking-widest text-center ${
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
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#282828] mb-4">
                  {ar ? 'المنتجات' : 'Items'}
                </p>
                <div className="space-y-4">
                  {(order.items || []).map((item: any, idx: number) => (
                    <div key={idx} className="flex gap-4 items-center">
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#F5F2EE] flex-shrink-0 border border-[#282828]/5">
                        {item.product?.images?.[0] && (
                          <img src={item.product.images[0]} alt="" className="w-full h-full object-cover" />
                        )}
                      </div>
                      <div className="flex-grow min-w-0">
                        <p className="text-[#282828] font-serif text-sm truncate">
                          {item.product?.name?.[lang] || item.product?.name?.en || item.product?.name}
                        </p>
                        <p className="text-[#737373] text-xs f-sans mt-0.5 uppercase tracking-widest">
                          {ar ? 'الكمية' : 'QTY'}: {item.quantity}
                        </p>
                      </div>
                      <p className="text-[#282828] font-bold f-sans text-sm flex-shrink-0">
                        {((item.product?.price || 0) * item.quantity).toLocaleString()} SAR
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Two-col: Customer + Summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#F5F2EE] rounded-2xl p-6">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#282828] mb-4">
                    {ar ? 'معلومات التوصيل' : 'Delivery Info'}
                  </p>
                  <div className="space-y-2 text-[#737373] text-sm f-sans">
                    <p><span className="font-bold text-[#282828]">{ar ? 'الاسم:' : 'Name:'}</span> {order.customer?.name}</p>
                    <p><span className="font-bold text-[#282828]">{ar ? 'الهاتف:' : 'Phone:'}</span> {order.customer?.phone}</p>
                    <p><span className="font-bold text-[#282828]">{ar ? 'العنوان:' : 'Address:'}</span> {order.customer?.address}, {order.customer?.city}</p>
                    {order.customer?.notes && (
                      <p><span className="font-bold text-[#282828]">{ar ? 'ملاحظات:' : 'Notes:'}</span> {order.customer.notes}</p>
                    )}
                  </div>
                </div>

                <div className="bg-[#F5F2EE] rounded-2xl p-6">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#282828] mb-4">
                    {ar ? 'ملخص المبالغ' : 'Price Summary'}
                  </p>
                  <div className="space-y-2 text-sm f-sans">
                    <div className="flex justify-between text-[#737373]">
                      <span>{ar ? 'المجموع الفرعي' : 'Subtotal'}</span>
                      <span>{(order.subtotal || 0).toLocaleString()} SAR</span>
                    </div>
                    <div className="flex justify-between text-[#737373]">
                      <span>{ar ? 'التوصيل' : 'Delivery'}</span>
                      <span className={order.delivery === 0 ? 'text-[#8A7A6B] font-bold' : ''}>
                        {order.delivery === 0 ? (ar ? 'مجاني' : 'Free') : `${order.delivery} SAR`}
                      </span>
                    </div>
                    <div className="flex justify-between text-[#282828] font-bold text-base font-serif pt-2 border-t border-[#282828]/10 mt-2">
                      <span>{ar ? 'الإجمالي' : 'Total'}</span>
                      <span>{(order.total || 0).toLocaleString()} SAR</span>
                    </div>
                    <div className="flex justify-between text-[#737373] text-xs pt-1">
                      <span>{ar ? 'طريقة الدفع' : 'Payment'}</span>
                      <span className="font-bold text-[#282828]">{paymentLabel(order.paymentMethod)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Invoice link */}
              <div className="flex justify-end">
                <Link
                  to={`/invoice/${order.id}`}
                  className="inline-flex items-center gap-2 bg-[#282828] text-white px-6 py-3 rounded-xl text-[11px] font-bold uppercase tracking-widest hover:bg-[#8A7A6B] transition-all f-sans"
                >
                  <FileText size={13} />
                  {ar ? 'طباعة الفاتورة' : 'Print Invoice'}
                </Link>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const Orders: React.FC = () => {
  const { lang } = useLang();
  const ar = lang === 'ar';
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const phone = localStorage.getItem('fe_customer_phone');

  useEffect(() => {
    if (!phone) {
      setLoading(false);
      return;
    }
    // Real-time listener — status changes from admin appear instantly
    const q = query(collection(db, 'orders'), where('customer.phone', '==', phone));
    const unsub = onSnapshot(q, snap => {
      const fetched = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      fetched.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setOrders(fetched);
      setLoading(false);
    }, () => setLoading(false));
    return () => unsub();
  }, [phone]);

  return (
    <div className="min-h-screen bg-[#FDFCFB] f-sans" dir={ar ? 'rtl' : 'ltr'}>
      {/* Page Header */}
      <div className="bg-white border-b border-[#282828]/5">
        <div className="max-w-[1100px] mx-auto px-6 md:px-12 py-16 md:py-20">
          <span className="text-[#8A7A6B] text-[10px] font-bold uppercase tracking-[0.3em] block mb-4">
            {ar ? 'حسابي' : 'My Account'}
          </span>
          <h1 className="font-serif text-[#282828] text-4xl md:text-5xl leading-tight">
            {ar ? 'طلباتي' : 'My Orders'}
          </h1>
          <p className="text-[#737373] text-lg mt-4 f-sans font-light">
            {ar
              ? 'تتبع جميع طلباتك ومشترياتك من فورست إيدج — تتحدث تلقائياً'
              : 'Track all your orders from Forest Edge — updates automatically in real-time'}
          </p>

          {/* Real-time badge */}
          <div className="flex items-center gap-2 mt-4">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-[#737373] f-sans">
              {ar ? 'متزامن مباشرةً مع النظام' : 'Live sync — status updates appear instantly'}
            </span>
            <Wifi size={12} className="text-green-400" />
          </div>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-6 md:px-12 py-16">

        {loading ? (
          <div className="flex items-center justify-center py-40">
            <div className="w-10 h-10 rounded-full border-2 border-[#8A7A6B]/30 border-t-[#8A7A6B] animate-spin" />
          </div>
        ) : !phone ? (
          /* No phone stored — customer visited from a different browser */
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-center py-24"
          >
            <div className="w-24 h-24 rounded-full bg-[#F5F2EE] flex items-center justify-center mx-auto mb-8">
              <Search size={36} className="text-[#8A7A6B]/40" />
            </div>
            <h3 className="font-serif text-[#282828] text-3xl mb-4">
              {ar ? 'تتبع طلبك' : 'Track your order'}
            </h3>
            <p className="text-[#737373] text-base f-sans max-w-md mx-auto leading-relaxed mb-10">
              {ar
                ? 'لم يتم العثور على طلبات من هذا المتصفح. أدخل رقم الطلب أو رقم الهاتف للبحث.'
                : 'No orders found from this browser. Enter your order number or phone to look up your order.'}
            </p>
            <Link
              to="/track"
              className="inline-flex items-center gap-3 bg-[#282828] text-white px-10 py-4 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#8A7A6B] transition-all f-sans"
            >
              <Search size={14} />
              {ar ? 'ابحث عن طلبك' : 'Find My Order'}
            </Link>
          </motion.div>
        ) : orders.length === 0 ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-center py-28"
          >
            <div className="w-24 h-24 rounded-full bg-[#F5F2EE] flex items-center justify-center mx-auto mb-8">
              <ShoppingBag size={36} className="text-[#8A7A6B]/40" />
            </div>
            <h3 className="font-serif text-[#282828] text-3xl mb-4">
              {ar ? 'لا توجد طلبات بعد' : 'No orders yet'}
            </h3>
            <p className="text-[#737373] text-base f-sans max-w-md mx-auto leading-relaxed mb-10">
              {ar
                ? 'ابدأ تسوقك من مجموعتنا الفاخرة'
                : 'Start shopping our luxury collection of furniture and décor'}
            </p>
            <Link
              to="/store"
              className="inline-flex items-center gap-3 bg-[#282828] text-white px-10 py-4 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#8A7A6B] transition-all f-sans"
            >
              <ShoppingBag size={14} />
              {ar ? 'تصفح المتجر' : 'Browse Store'}
              <ArrowRight size={14} className={ar ? 'rotate-180' : ''} />
            </Link>
          </motion.div>
        ) : (
          <>
            {/* Stats Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {[
                { label: { en: 'Total Orders', ar: 'إجمالي الطلبات' }, value: orders.length, unit: '' },
                { label: { en: 'Total Spent', ar: 'إجمالي الإنفاق' }, value: orders.reduce((s: number, o: any) => s + (o.total || 0), 0).toLocaleString(), unit: 'SAR' },
                { label: { en: 'Delivered', ar: 'تم التوصيل' }, value: orders.filter((o: any) => o.status === 'delivered').length, unit: '' },
                { label: { en: 'In Progress', ar: 'قيد التنفيذ' }, value: orders.filter((o: any) => o.status !== 'delivered').length, unit: '' },
              ].map((stat, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="bg-white rounded-2xl p-5 border border-[#282828]/5 shadow-sm"
                >
                  <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#737373] mb-2 f-sans">
                    {ar ? stat.label.ar : stat.label.en}
                  </p>
                  <p className="font-serif text-[#282828] text-2xl">
                    {stat.value}
                    {stat.unit && <span className="text-sm text-[#8A7A6B] f-sans font-bold ml-1">{stat.unit}</span>}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Orders List */}
            <div className="space-y-5">
              {orders.map((order: any) => (
                <OrderCard key={order.id} order={order} lang={lang} />
              ))}
            </div>

            {/* Track from another browser */}
            <div className="mt-12 bg-[#F5F2EE] rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-[#282828] font-bold f-sans text-sm">
                  {ar ? 'هل تستخدم متصفحاً آخر؟' : 'Using a different device or browser?'}
                </p>
                <p className="text-[#737373] text-xs f-sans mt-1">
                  {ar ? 'يمكنك البحث عن طلبك بأي رقم طلب أو رقم هاتف' : 'Look up any order by order number or phone number'}
                </p>
              </div>
              <Link
                to="/track"
                className="flex items-center gap-2 bg-[#282828] text-white px-6 py-3 rounded-xl text-[11px] font-bold uppercase tracking-widest hover:bg-[#8A7A6B] transition-all f-sans whitespace-nowrap"
              >
                <Search size={13} />
                {ar ? 'بحث عن طلب' : 'Track an Order'}
              </Link>
            </div>

            {/* Continue Shopping */}
            <div className="text-center mt-10">
              <Link to="/store"
                className="inline-flex items-center gap-3 text-[#8A7A6B] text-[11px] font-bold uppercase tracking-[0.2em] hover:text-[#282828] transition-colors f-sans"
              >
                <ShoppingBag size={14} />
                {ar ? 'مواصلة التسوق' : 'Continue Shopping'}
                <ArrowRight size={14} className={ar ? 'rotate-180' : ''} />
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Orders;
