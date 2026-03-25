import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { auth, db } from '../firebase';
import {
  Package, ChevronDown, ChevronUp, ShoppingBag,
  CheckCircle2, Clock, Truck, MapPin, ArrowRight,
  FileText, Wifi, LogOut, User
} from 'lucide-react';
import { useLang } from '../store/context/LangContext';

const statusConfig = {
  confirmed: { color: 'bg-ikea-blue text-white', icon: CheckCircle2, en: 'Confirmed', ar: 'مؤكد' },
  processing: { color: 'bg-ikea-yellow text-ikea-blue', icon: Clock, en: 'Processing', ar: 'قيد التجهيز' },
  shipped: { color: 'bg-ikea-blue text-white', icon: Truck, en: 'Shipped', ar: 'تم الشحن' },
  delivered: { color: 'bg-green-600 text-white', icon: MapPin, en: 'Delivered', ar: 'تم التوصيل' },
};

const HeadphonesContact = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 14c0-4.4 3.6-8 8-8s8 3.6 8 8" /><path d="M21 14v1a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-1" /><path d="M16 14h2a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-1a2 2 0 0 1 2-2z" /><path d="M6 14h2a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-1a2 2 0 0 1 2-2z" />
  </svg>
);

const OrderCard: React.FC<{ order: any; lang: 'en' | 'ar' }> = ({ order, lang }) => {
  const [expanded, setExpanded] = useState(false);
  const ar = lang === 'ar';
  const status = statusConfig[order.status as keyof typeof statusConfig] || statusConfig.confirmed;
  const StatusIcon = status.icon;

  const dateStr = new Date(order.date).toLocaleDateString(ar ? 'ar-SA' : 'en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <motion.div
      layout
      className="bg-white rounded-[2rem] border border-ikea-gray overflow-hidden shadow-sm hover:shadow-md transition-shadow mb-6"
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex flex-col md:flex-row md:items-center justify-between gap-6 p-8 hover:bg-ikea-gray/20 transition-colors"
      >
        <div className="flex items-start gap-6">
          <div className="w-14 h-14 rounded-2xl bg-ikea-gray flex items-center justify-center text-ikea-blue flex-shrink-0">
            <Package size={28} />
          </div>
          <div className="text-start">
            <p className="text-[11px] font-black uppercase tracking-widest text-ikea-darkGray mb-1">{ar ? 'معرف الطلب' : 'ORDER ID'}</p>
            <p className="font-black text-ikea-black text-xl tracking-tight">{order.id}</p>
            <p className="text-ikea-darkGray text-sm font-medium mt-1">{dateStr}</p>
          </div>
        </div>

        <div className="flex items-center gap-6 flex-wrap md:flex-nowrap w-full md:w-auto justify-between md:justify-end">
          <span className={`inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full ${status.color}`}>
            <StatusIcon size={12} />
            {ar ? status.ar : status.en}
          </span>
          <p className="text-2xl font-black text-ikea-black tracking-tighter">
            <span className="text-sm font-normal mr-1">{ar ? 'ر.س' : 'SAR'}</span>
            {(order.total || 0).toLocaleString()}
          </p>
          <div className={`p-3 rounded-full bg-ikea-gray text-ikea-black transition-transform ${expanded ? 'rotate-180' : ''}`}>
             <ChevronDown size={20} />
          </div>
        </div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-ikea-gray/10"
          >
            <div className="p-8 space-y-8 border-t border-ikea-gray">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="bg-white rounded-3xl p-8 border border-ikea-gray">
                  <h4 className="text-[11px] font-black uppercase tracking-widest text-ikea-darkGray mb-6">{ar ? 'المنتجات' : 'ITEMS'}</h4>
                  <div className="space-y-4">
                    {order.items?.map((item: any, i: number) => (
                      <div key={i} className="flex justify-between items-center py-2 border-b border-ikea-gray last:border-0">
                        <div className="flex items-center gap-4">
                           <div className="w-12 h-12 bg-ikea-gray rounded-xl overflow-hidden p-2">
                             <img src={item.product?.images?.[0]} className="w-full h-full object-contain" alt="" />
                           </div>
                           <div>
                              <p className="font-bold text-ikea-black text-sm">{item.product?.name?.[lang] || item.product?.name?.en}</p>
                              <p className="text-xs text-ikea-darkGray">{ar ? 'الكمية' : 'Qty'}: {item.quantity}</p>
                           </div>
                        </div>
                        <p className="font-black text-sm">{(item.product?.price * item.quantity).toLocaleString()} SAR</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-ikea-blue text-white rounded-3xl p-8 flex flex-col justify-between">
                   <div>
                      <h4 className="text-[11px] font-black uppercase tracking-widest text-ikea-yellow mb-4">{ar ? 'التوصيل' : 'SHIPPING'}</h4>
                      <p className="font-bold text-lg mb-1">{order.customer?.name}</p>
                      <p className="opacity-70 text-sm leading-relaxed">{order.customer?.address}, {order.customer?.city}</p>
                      <p className="opacity-70 text-sm mt-1">{order.customer?.phone}</p>
                   </div>
                   <div className="mt-8 flex gap-4">
                      <Link to={`/invoice/${order.id}`} className="flex-1 bg-white text-ikea-blue py-3 rounded-full text-[11px] font-black uppercase text-center hover:bg-ikea-yellow transition-colors">
                        {ar ? 'الفاتورة' : 'Invoice'}
                      </Link>
                      <Link to="/track" className="flex-1 bg-white/10 text-white border border-white/20 py-3 rounded-full text-[11px] font-black uppercase text-center hover:bg-white/20 transition-colors">
                        {ar ? 'تتبع' : 'Track'}
                      </Link>
                   </div>
                </div>
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
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubAuth = auth.onAuthStateChanged(u => {
      setUser(u);
      if (u) {
        const q = query(collection(db, 'orders'), where('userId', '==', u.uid));
        const unsubOrders = onSnapshot(q, snap => {
          const fetched = snap.docs.map(d => ({ id: d.id, ...d.data() }));
          fetched.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
          setOrders(fetched);
          setLoading(false);
        });
        return () => unsubOrders();
      } else {
        setLoading(false);
      }
    });
    return () => unsubAuth();
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-white flex items-center justify-center">
       <div className="w-12 h-12 border-4 border-ikea-gray border-t-ikea-blue rounded-full animate-spin" />
    </div>
  );

  if (!user) return (
    <div className="min-h-screen bg-ikea-gray/30 flex items-center justify-center px-6">
       <div className="max-w-md w-full bg-white rounded-[3rem] p-12 text-center shadow-2xl">
          <div className="w-20 h-20 bg-ikea-gray rounded-full flex items-center justify-center mx-auto mb-8 text-ikea-blue/20">
             <User size={40} />
          </div>
          <h2 className="text-3xl font-black text-ikea-black mb-4 tracking-tighter">{ar ? 'سجل الدخول' : 'Access Your Orders'}</h2>
          <p className="text-ikea-darkGray mb-10 leading-relaxed font-medium">
             {ar ? 'يرجى تسجيل الدخول لعرض تاريخ طلباتك وتتبع شحناتك الحالية.' : 'Please authenticate to view your complete order history and monitor active shipments.'}
          </p>
          <button className="w-full bg-ikea-blue text-white py-5 rounded-full font-black uppercase tracking-widest hover:bg-[#00478b] transition-all shadow-xl">
            {ar ? 'تسجيل الدخول' : 'AUTHENTICATE'}
          </button>
       </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white f-sans" dir={ar ? 'rtl' : 'ltr'}>
       <header className="bg-ikea-gray/30 pt-32 pb-20 md:pt-48 md:pb-40 px-6 md:px-12">
          <div className="container mx-auto max-w-[1440px]">
             <span className="bg-ikea-blue text-white px-4 py-1.5 text-[11px] font-black uppercase tracking-widest mb-8 inline-block">
               {ar ? 'الأرشيف' : 'ORDER ARCHIVE'}
             </span>
             <h1 className="text-6xl md:text-9xl font-black text-ikea-black tracking-tighter leading-[0.85] mb-12">
               {ar ? <>سجل<br /><span className="text-ikea-blue">طلباتك</span></> : <>YOUR ORDER<br /><span className="text-ikea-blue">HISTORY</span></>}
             </h1>
          </div>
       </header>

       <main className="container mx-auto max-w-[1200px] px-6 py-24">
          {orders.length === 0 ? (
             <div className="text-center py-32 bg-ikea-gray/20 rounded-[4rem] border-4 border-dashed border-ikea-gray">
                <ShoppingBag size={64} className="mx-auto mb-8 text-ikea-darkGray opacity-20" />
                <h3 className="text-3xl font-black text-ikea-black tracking-tighter mb-4">{ar ? 'لا يوجد طلبات سابقة' : 'NO ORDERS YET'}</h3>
                <Link to="/store" className="text-ikea-blue font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2 hover:gap-4 transition-all">
                  {ar ? 'ابدأ التسوق الآن' : 'START SHOPPING NOW'} <ArrowRight size={20} className={ar ? 'rotate-180' : ''} />
                </Link>
             </div>
          ) : (
             <div className="grid grid-cols-1 gap-6">
                {orders.map(o => <OrderCard key={o.id} order={o} lang={lang} />)}
             </div>
          )}
       </main>

       {/* Support Section */}
       <section className="bg-ikea-black text-white py-32 mt-24">
          <div className="container mx-auto px-6 max-w-4xl text-center">
             <div className="w-16 h-16 bg-ikea-yellow rounded-full flex items-center justify-center text-ikea-blue mx-auto mb-10 shadow-2xl">
                <HeadphonesContact size={32} />
             </div>
             <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 leading-none">
                {ar ? 'هل تحتاج لمساعدة في طلبك؟' : 'NEED HELP WITH AN ORDER?'}
             </h2>
             <p className="text-white/60 text-lg mb-12 leading-relaxed font-medium">
                {ar ? 'مركز الدعم الفني لدينا جاهز لمساعدتك في أي استفسار يخص الشحن أو الجودة.' : 'Our strategic support center is standing by to assist with logistics or quality assurance inquiries.'}
             </p>
             <Link to="/contact" className="inline-flex items-center gap-4 bg-white text-ikea-blue px-12 py-5 rounded-full font-black uppercase tracking-widest hover:bg-ikea-yellow transition-all">
                {ar ? 'تواصل مع الدعم' : 'CONTACT SUPPORT'} <Wifi size={18} />
             </Link>
          </div>
       </section>
    </div>
  );
};

export default Orders;
