import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { collection, query, where, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { Search, Package, CheckCircle2, Clock, Truck, MapPin, FileText, ChevronDown, Phone, Hash, ArrowRight } from 'lucide-react';
import { useLang } from '../store/context/LangContext';

const statusConfig = {
  confirmed: { color: 'bg-ikea-blue text-white shadow-lg', icon: CheckCircle2, en: 'Confirmed', ar: 'مؤكد' },
  processing: { color: 'bg-ikea-yellow text-ikea-blue shadow-lg', icon: Clock, en: 'Processing', ar: 'قيد التجهيز' },
  shipped: { color: 'bg-ikea-blue text-white shadow-lg', icon: Truck, en: 'Shipped', ar: 'تم الشحن' },
  delivered: { color: 'bg-green-600 text-white shadow-lg', icon: MapPin, en: 'Delivered', ar: 'تم التوصيل' },
};
const timelineSteps = ['confirmed', 'processing', 'shipped', 'delivered'] as const;

const TrackCard: React.FC<{ order: any; lang: 'en' | 'ar' }> = ({ order, lang }) => {
  const [expanded, setExpanded] = useState(true);
  const ar = lang === 'ar';
  const statusKey = (order.status || 'confirmed') as keyof typeof statusConfig;
  const status = statusConfig[statusKey] || statusConfig.confirmed;
  const currentStep = timelineSteps.indexOf(statusKey as typeof timelineSteps[number]);

  return (
    <motion.div layout className="bg-white rounded-[3rem] overflow-hidden border border-ikea-gray shadow-sm mb-8">
      <button onClick={() => setExpanded(e => !e)} className="w-full flex flex-col md:flex-row md:items-center justify-between gap-6 p-8 hover:bg-ikea-gray/20 transition-colors">
        <div className="flex items-start gap-6">
          <div className="w-14 h-14 rounded-2xl bg-ikea-gray flex items-center justify-center text-ikea-blue flex-shrink-0"><Package size={28} /></div>
          <div className="text-start">
            <p className="text-[11px] font-black uppercase tracking-widest text-ikea-darkGray">{ar ? 'رقم الطلب' : 'ORDER ID'}</p>
            <p className="font-black text-ikea-black text-xl">{order.id}</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
           <span className={`inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full ${status.color}`}>
             {ar ? status.ar : status.en}
           </span>
           <div className={`p-3 rounded-full bg-ikea-gray transition-transform ${expanded ? 'rotate-180' : ''}`}><ChevronDown size={20} /></div>
        </div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="overflow-hidden bg-ikea-gray/10 px-8 pb-10 pt-4 space-y-12">
              <div className="bg-white rounded-3xl p-8 border border-ikea-gray text-center">
                <h4 className="text-[11px] font-black uppercase tracking-widest text-ikea-darkGray mb-10">{ar ? 'تتبع الشحنة' : 'SHIPMENT TRACKING'}</h4>
                <div className="flex items-start relative max-w-2xl mx-auto">
                   <div className="absolute top-5 left-0 w-full h-1 bg-ikea-gray rounded-full" />
                   <div className="absolute top-5 left-0 h-1 bg-ikea-blue rounded-full transition-all duration-1000" style={{ width: `${(currentStep / (timelineSteps.length - 1)) * 100}%`, [ar ? 'right' : 'left']: 0 }} />
                   {timelineSteps.map((step, i) => {
                     const s = statusConfig[step];
                     const done = i <= currentStep;
                     return (
                       <div key={step} className="flex-1 flex flex-col items-center relative z-10">
                         <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 transition-all duration-500 ${i <= currentStep ? 'bg-ikea-blue border-ikea-blue text-white' : 'bg-white border-ikea-gray text-ikea-darkGray'}`}>
                           {done ? <CheckCircle2 size={18} /> : <div className="w-2 h-2 rounded-full bg-ikea-gray" />}
                         </div>
                         <p className="mt-4 text-[10px] font-black uppercase tracking-widest">{ar ? s.ar : s.en}</p>
                       </div>
                     );
                   })}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white rounded-3xl p-8 border border-ikea-gray">
                   <h4 className="text-[11px] font-black uppercase tracking-widest text-ikea-darkGray mb-6">{ar ? 'محتويات الطلب' : 'ORDER CONTENTS'}</h4>
                   {(order.items || []).map((item: any, i: number) => (
                      <div key={i} className="flex gap-4 py-2 border-b border-ikea-gray last:border-0 text-start">
                         <img src={item.product?.images?.[0]} className="w-12 h-12 rounded-lg object-contain bg-ikea-gray p-1" alt="" />
                         <div><p className="font-bold text-sm">{item.product?.name?.[lang] || item.product?.name?.en}</p><p className="text-xs">QTY: {item.quantity}</p></div>
                      </div>
                   ))}
                </div>
                <div className="bg-ikea-blue text-white rounded-3xl p-8 flex flex-col justify-between text-start">
                   <h4 className="text-[11px] font-black uppercase tracking-widest text-ikea-yellow mb-6">{ar ? 'وجهة التوصيل' : 'DESTINATION'}</h4>
                   <p className="font-black text-lg">{order.customer?.name}</p>
                   <p className="opacity-70 text-sm">{order.customer?.address}, {order.customer?.city}</p>
                   <Link to={`/invoice/${order.id}`} className="mt-8 bg-white text-ikea-blue py-4 rounded-full text-center font-black uppercase text-[11px]">{ar ? 'الفاتورة' : 'INVOICE'}</Link>
                </div>
              </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const TrackOrder: React.FC = () => {
  const { lang } = useLang();
  const ar = lang === 'ar';
  const [mode, setMode] = useState<'id' | 'phone'>('id');
  const [input, setInput] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [searching, setSearching] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState('');
  const unsubRef = useRef<(() => void) | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const val = input.trim();
    if (!val) return;
    if (unsubRef.current) { unsubRef.current(); unsubRef.current = null; }
    setSearching(true); setSearched(false); setError(''); setResults([]);
    try {
      if (mode === 'id') {
        const unsub = onSnapshot(doc(db, 'orders', val), snap => {
          setResults(snap.exists() ? [{ id: snap.id, ...snap.data() }] : []);
          setSearching(false); setSearched(true);
        }, () => { setError(ar ? 'رقم الطلب غير صحيح' : 'Invalid ID'); setSearching(false); setSearched(true); });
        unsubRef.current = unsub;
      } else {
        const q = query(collection(db, 'orders'), where('customer.phone', '==', val));
        const unsub = onSnapshot(q, snap => {
          const fetched = snap.docs.map(d => ({ id: d.id, ...d.data() }));
          fetched.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
          setResults(fetched); setSearching(false); setSearched(true);
        }, () => { setError(ar ? 'خطأ في البحث' : 'Search failed'); setSearching(false); setSearched(true); });
        unsubRef.current = unsub;
      }
    } catch { setError(ar ? 'خطأ في الاتصال' : 'Connection error'); setSearching(false); setSearched(true); }
  };

  useEffect(() => { return () => { if (unsubRef.current) unsubRef.current(); }; }, []);

  return (
    <div className="min-h-screen bg-white f-sans" dir={ar ? 'rtl' : 'ltr'}>
       <header className="bg-ikea-gray/30 pt-32 pb-20 md:pt-48 md:pb-40 px-6 md:px-12 relative overflow-hidden text-start">
           <div className="container mx-auto max-w-[1440px] relative z-10">
              <span className="bg-ikea-blue text-white px-4 py-1.5 text-[11px] font-black uppercase tracking-widest mb-8 inline-block">TRACKING</span>
              <h1 className="text-6xl md:text-[9rem] font-black text-ikea-black tracking-tighter leading-[0.8] mb-12">
                {ar ? <>تتبع<br /><span className="text-ikea-blue font-black uppercase skew-x-[-10deg] inline-block">شحنتك</span></> : <>TRACK YOUR<br /><span className="text-ikea-blue font-black uppercase skew-x-[-10deg] inline-block">SHIPMENT</span></>}
              </h1>
           </div>
       </header>

       <main className="container mx-auto px-6 max-w-[1440px] py-24">
         <div className="grid grid-cols-1 lg:grid-cols-[1fr_500px] gap-20 items-start">
            <div className="space-y-12">
               <div className="bg-white rounded-[3rem] border-4 border-ikea-gray p-10 md:p-16 shadow-2xl">
                  <div className="flex gap-4 mb-12 bg-ikea-gray p-2 rounded-2xl">
                     {(['id', 'phone'] as const).map(m => (
                        <button key={m} onClick={() => { setMode(m); setInput(''); setResults([]); setSearched(false); }} className={`flex-1 py-4 rounded-xl text-[12px] font-black uppercase tracking-widest transition-all ${mode === m ? 'bg-ikea-blue text-white shadow-lg' : 'text-ikea-darkGray hover:bg-white'}`}>
                           {m === 'id' ? (ar ? 'رقم الطلب' : 'ORDER ID') : (ar ? 'الهاتف' : 'PHONE')}
                        </button>
                     ))}
                  </div>
                  <form onSubmit={handleSearch} className="space-y-8">
                     <div className="relative">
                        <div className="absolute top-1/2 -translate-y-1/2 left-6 text-ikea-darkGray">{mode === 'id' ? <Hash size={24} /> : <Phone size={24} />}</div>
                        <input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder={mode === 'id' ? 'FE-2024-XXXX' : '05XXXXXXXX'} className="w-full bg-ikea-gray rounded-2xl py-6 pl-16 pr-8 text-xl font-black outline-none" />
                     </div>
                     <button type="submit" disabled={searching || !input.trim()} className="w-full bg-ikea-blue text-white py-6 rounded-full text-[14px] font-black uppercase tracking-widest hover:bg-[#00478b] transition-all flex items-center justify-center gap-4">
                        {searching ? <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" /> : <Search size={20} />}
                        {searching ? (ar ? 'جاري البحث...' : 'LOCATING...') : (ar ? 'بدء التتبع' : 'INITIALIZE')}
                     </button>
                  </form>
               </div>
               {searched && (
                 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                   {results.length === 0 ? <div className="bg-ikea-gray/30 rounded-[3rem] p-16 text-center border-2 border-dashed border-ikea-gray"><h3 className="text-3xl font-black">NOT FOUND</h3></div> : results.map(order => <TrackCard key={order.id} order={order} lang={lang} />)}
                 </motion.div>
               )}
            </div>
            <aside className="bg-ikea-black text-white rounded-[3rem] p-12 text-start">
               <h3 className="text-3xl font-black tracking-tight mb-8">Support Portal</h3>
               <p className="text-lg opacity-60 mb-10">Experiencing tracking anomalies? Our support architects are available for intervention.</p>
               <Link to="/contact" className="flex items-center justify-between bg-white/10 p-6 rounded-2xl hover:bg-ikea-yellow hover:text-ikea-blue transition-all font-black uppercase tracking-widest text-sm underline-offset-4 decoration-ikea-yellow">Open Support Ticket <ArrowRight size={24} className={ar ? 'rotate-180' : ''} /></Link>
            </aside>
         </div>
       </main>
    </div>
  );
};

export default TrackOrder;
