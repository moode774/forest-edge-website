import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useStore } from '../store/context/StoreContext';
import { useLang } from '../store/context/LangContext';
import { 
  ShoppingBag, ArrowLeft, CreditCard, Truck, 
  ShieldCheck, Lock, ChevronRight, Package,
  MapPin, Phone, User, CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../firebase';

export const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { cart, total, clearCart } = useStore();
  const { lang } = useLang();
  const ar = lang === 'ar';
  
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [orderComplete, setOrderComplete] = useState<string | null>(null);

  // Form States
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');

  if (cart.length === 0 && !orderComplete) {
     return (
        <div className="min-h-screen bg-ikea-gray/20 flex items-center justify-center p-6">
           <div className="bg-white rounded-[3rem] p-12 text-center max-w-lg shadow-2xl">
              <ShoppingBag size={64} className="mx-auto mb-8 text-ikea-darkGray opacity-20" />
              <h2 className="text-3xl font-black mb-10 tracking-tighter uppercase">{ar ? 'سلة التسوق فارغة' : 'CART IS EMPTY'}</h2>
              <Link to="/store" className="bg-ikea-blue text-white px-12 py-5 rounded-full font-black uppercase tracking-widest hover:bg-[#00478b] transition-all">
                {ar ? 'ابدأ التسوق' : 'START SHOPPING'}
              </Link>
           </div>
        </div>
     );
  }

  const handlePlaceOrder = async () => {
    setLoading(true);
    try {
      const orderData = {
        userId: auth.currentUser?.uid || 'guest',
        items: cart.map(item => ({
          productId: item.product.id,
          quantity: item.quantity,
          product: {
            name: item.product.name,
            price: item.product.price,
            images: item.product.images
          }
        })),
        total: total,
        status: 'confirmed',
        date: new Date().toISOString(),
        createdAt: serverTimestamp(),
        customer: { name, address, city, phone }
      };

      const docRef = await addDoc(collection(db, 'orders'), orderData);
      setOrderComplete(docRef.id);
      clearCart();
    } catch (err) {
      console.error(err);
      alert(ar ? 'حدث خطأ أثناء إتمام الطلب' : 'Order deployment failed');
    } finally {
      setLoading(false);
    }
  };

  if (orderComplete) {
    return (
       <div className="min-h-screen bg-white f-sans flex items-center justify-center p-6 text-center">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="max-w-2xl">
             <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-10 shadow-xl border-4 border-white">
                <CheckCircle2 size={48} />
             </div>
             <h1 className="text-5xl md:text-7xl font-black text-ikea-black tracking-tighter mb-6 uppercase">{ar ? 'تم تأكيد الطلب' : 'ORDER CONFIRMED'}</h1>
             <p className="text-xl text-ikea-darkGray mb-12 font-medium">
               {ar ? `تم استلام طلبك رقم ${orderComplete} بنجاح. سنقوم بمعالجته قريباً.` : `Strategic deployment initiated. Your order ID ${orderComplete} is now in queue.`}
             </p>
             <div className="flex flex-col md:flex-row gap-6 justify-center">
                <Link to="/track" className="bg-ikea-blue text-white px-12 py-5 rounded-full font-black uppercase tracking-widest shadow-xl">{ar ? 'تتبع الطلب' : 'TRACK SHIPMENT'}</Link>
                <Link to="/" className="bg-ikea-gray text-ikea-black px-12 py-5 rounded-full font-black uppercase tracking-widest">{ar ? 'الرئيسية' : 'RETURN HOME'}</Link>
             </div>
          </motion.div>
       </div>
    );
  }

  return (
    <div className="min-h-screen bg-white f-sans pb-32" dir={ar ? 'rtl' : 'ltr'}>
       <header className="bg-ikea-gray/30 pt-32 pb-20 px-6 md:px-12 text-start">
          <div className="container mx-auto max-w-[1440px]">
             <span className="text-ikea-blue font-black uppercase tracking-widest text-[11px] mb-8 block">LOGISTICS CHECKOUT</span>
             <h1 className="text-5xl md:text-8xl font-black text-ikea-black tracking-tighter leading-none uppercase">
                {ar ? 'إتمام الشراء' : 'FINALIZE ORDER'}
             </h1>
          </div>
       </header>

       <main className="container mx-auto px-6 max-w-[1440px] py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_450px] gap-20">
             
             {/* Left: Interactive Form */}
             <div className="space-y-12">
                <div className="flex gap-4 mb-20">
                   {[1, 2, 3].map(s => (
                      <div key={s} className={`h-2 flex-1 rounded-full transition-all duration-700 ${step >= s ? 'bg-ikea-blue' : 'bg-ikea-gray'}`} />
                   ))}
                </div>

                <AnimatePresence mode="wait">
                   {step === 1 && (
                      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10 text-start">
                         <h2 className="text-4xl font-black tracking-tighter uppercase">{ar ? 'معلومات التوصيل' : 'DELIVERY PROTOCOL'}</h2>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                               <label className="text-[10px] font-black text-ikea-darkGray uppercase tracking-widest ml-4">Full Name</label>
                               <div className="relative"><User className="absolute left-6 top-1/2 -translate-y-1/2 text-ikea-darkGray" /><input value={name} onChange={e => setName(e.target.value)} type="text" className="w-full bg-ikea-gray py-6 pl-16 pr-8 rounded-2xl outline-none font-black" /></div>
                            </div>
                            <div className="space-y-4">
                               <label className="text-[10px] font-black text-ikea-darkGray uppercase tracking-widest ml-4">Phone Number</label>
                               <div className="relative"><Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-ikea-darkGray" /><input value={phone} onChange={e => setPhone(e.target.value)} type="text" className="w-full bg-ikea-gray py-6 pl-16 pr-8 rounded-2xl outline-none font-black" /></div>
                            </div>
                         </div>
                         <div className="space-y-4">
                            <label className="text-[10px] font-black text-ikea-darkGray uppercase tracking-widest ml-4">City / Area</label>
                            <div className="relative"><MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-ikea-darkGray" /><input value={city} onChange={e => setCity(e.target.value)} type="text" className="w-full bg-ikea-gray py-6 pl-16 pr-8 rounded-2xl outline-none font-black" /></div>
                         </div>
                         <div className="space-y-4">
                            <label className="text-[10px] font-black text-ikea-darkGray uppercase tracking-widest ml-4">Physical Address</label>
                            <textarea value={address} onChange={e => setAddress(e.target.value)} rows={4} className="w-full bg-ikea-gray py-8 px-10 rounded-[2rem] outline-none font-black resize-none" />
                         </div>
                         <button onClick={() => setStep(2)} disabled={!name || !phone || !address} className="bg-ikea-blue text-white px-16 py-6 rounded-full font-black uppercase tracking-widest hover:bg-[#00478b] disabled:opacity-30 flex items-center gap-4 group">
                           {ar ? 'التالي' : 'CONTINUE'} <ChevronRight className="group-hover:translate-x-2 transition-transform" />
                         </button>
                      </motion.div>
                   )}

                   {step === 2 && (
                      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10 text-start">
                         <h2 className="text-4xl font-black tracking-tighter uppercase">{ar ? 'طريقة الدفع' : 'SETTLEMENT METHOD'}</h2>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <button className="p-10 rounded-[2rem] border-4 border-ikea-blue bg-white flex flex-col items-center gap-6 shadow-xl">
                               <CreditCard size={48} className="text-ikea-blue" />
                               <span className="font-black uppercase tracking-widest text-sm">{ar ? 'بطاقة بنكية' : 'BANK CARD'}</span>
                            </button>
                            <button className="p-10 rounded-[2rem] border-4 border-ikea-gray bg-ikea-gray/20 flex flex-col items-center gap-6 opacity-40">
                               <MapPin size={48} />
                               <span className="font-black uppercase tracking-widest text-sm">{ar ? 'دفع عند الاستلام' : 'COD (INACTIVE)'}</span>
                            </button>
                         </div>
                         <div className="flex gap-6">
                           <button onClick={() => setStep(1)} className="bg-ikea-gray text-ikea-black px-12 py-6 rounded-full font-black uppercase">{ar ? 'رجوع' : 'BACK'}</button>
                           <button onClick={() => setStep(3)} className="bg-ikea-blue text-white px-16 py-6 rounded-full font-black uppercase tracking-widest shadow-xl">{ar ? 'التالي' : 'CONTINUE'}</button>
                         </div>
                      </motion.div>
                   )}

                   {step === 3 && (
                      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-10 text-start">
                         <h2 className="text-4xl font-black tracking-tighter uppercase">{ar ? 'مراجعة نهائية' : 'FINAL VALIDATION'}</h2>
                         <div className="bg-ikea-gray/30 p-10 rounded-[3rem] border border-ikea-gray space-y-6">
                            <div className="flex justify-between border-b border-ikea-gray pb-4"><span>DESTINATION</span><span className="font-black">{city}, {address}</span></div>
                            <div className="flex justify-between border-b border-ikea-gray pb-4"><span>RECIPIENT</span><span className="font-black">{name}</span></div>
                            <div className="flex justify-between border-b border-ikea-gray pb-4"><span>PAYMENT</span><span className="font-black">BANK CARD</span></div>
                            <div className="flex justify-between text-2xl font-black pt-4 text-ikea-blue"><span>TOTAL AMOUNT</span><span>{total.toLocaleString()} SAR</span></div>
                         </div>
                         <div className="flex gap-6">
                           <button onClick={() => setStep(2)} className="bg-ikea-gray text-ikea-black px-12 py-6 rounded-full font-black uppercase">{ar ? 'رجوع' : 'BACK'}</button>
                           <button onClick={handlePlaceOrder} disabled={loading} className="flex-1 bg-green-600 text-white py-6 rounded-full font-black uppercase tracking-widest hover:bg-green-700 shadow-2xl flex items-center justify-center gap-4">
                              {loading ? <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" /> : <ShieldCheck size={24} />}
                              {ar ? 'تأكيد الطلب' : 'AUTHORIZE PAYMENT'}
                           </button>
                         </div>
                      </motion.div>
                   )}
                </AnimatePresence>
             </div>

             {/* Right: Order Summary */}
             <aside className="space-y-8">
                <div className="bg-ikea-gray/30 rounded-[3rem] p-10 border border-ikea-gray sticky top-40 text-start">
                   <h3 className="text-[11px] font-black uppercase tracking-widest text-ikea-darkGray mb-8">INVENTORY SCAN</h3>
                   <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                      {cart.map((item, i) => (
                         <div key={i} className="flex gap-4 items-center bg-white p-4 rounded-2xl border border-ikea-gray">
                            <div className="w-16 h-16 bg-ikea-gray rounded-xl overflow-hidden p-2 flex-shrink-0"><img src={item.product.images?.[0]} className="w-full h-full object-contain" alt="" /></div>
                            <div className="flex-1">
                               <p className="font-black text-sm uppercase leading-tight">{item.product.name?.[lang] || item.product.name?.en}</p>
                               <p className="text-xs text-ikea-darkGray font-bold mt-1">QTY: {item.quantity} × {item.product.price?.toLocaleString()} SAR</p>
                            </div>
                         </div>
                      ))}
                   </div>
                   <div className="mt-10 pt-10 border-t border-ikea-gray space-y-4">
                      <div className="flex justify-between text-sm"><span>SUBTOTAL</span><span className="font-black">{total.toLocaleString()} SAR</span></div>
                      <div className="flex justify-between text-sm"><span>LOGISTICS FEE</span><span className="font-black text-green-600">FREE</span></div>
                      <div className="flex justify-between text-2xl font-black text-ikea-blue pt-4 border-t-4 border-white"><span>TOTAL</span><span>{total.toLocaleString()} SAR</span></div>
                   </div>
                </div>
                <div className="flex items-center gap-4 p-6 bg-green-50 text-green-700 rounded-3xl border border-green-100 italic text-sm">
                   <Lock size={18} /> Secure Industrial Gateway Encrypted
                </div>
             </aside>

          </div>
       </main>
    </div>
  );
};

export default Checkout;
