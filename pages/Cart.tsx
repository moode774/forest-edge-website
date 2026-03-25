import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../store/context/StoreContext';
import { useLang } from '../store/context/LangContext';
import { 
  ShoppingBag, Trash2, Plus, Minus, 
  ArrowRight, ShieldCheck, Truck, RotateCcw, Box
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Cart: React.FC = () => {
  const { cart, total, updateQty, removeFromCart } = useStore();
  const { lang } = useLang();
  const ar = lang === 'ar';
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-neutral-100 flex flex-col items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[3rem] p-12 text-center max-w-lg shadow-2xl border-4 border-ikea-gray"
        >
          <div className="w-24 h-24 bg-ikea-gray rounded-full flex items-center justify-center mx-auto mb-10 text-ikea-blue/20">
             <ShoppingBag size={48} />
          </div>
          <h2 className="text-4xl font-black mb-6 tracking-tighter uppercase text-ikea-black">{ar ? 'سلة التسوق فارغة' : 'CART REPOSITORY EMPTY'}</h2>
          <p className="text-ikea-darkGray mb-12 font-medium leading-relaxed">
             {ar ? 'يبدو أنك لم تضف أي قطع لمجموعتك بعد. استكشف تصاميمنا الحصرية الآن.' : 'Your strategic inventory is currently unpopulated. Explore our exclusive architectural collections to begin.'}
          </p>
          <Link to="/store" className="inline-flex items-center gap-4 bg-ikea-blue text-white px-12 py-5 rounded-full font-black uppercase tracking-widest hover:bg-ikea-black transition-all shadow-xl">
             {ar ? 'ابدأ التسوق' : 'ACCESS STORE'} <ArrowRight size={20} className={ar ? 'rotate-180' : ''} />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white f-sans pb-32" dir={ar ? 'rtl' : 'ltr'}>
      <header className="bg-ikea-gray/30 pt-32 pb-20 md:pt-48 md:pb-40 px-6 md:px-12 relative overflow-hidden text-start">
         <div className="container mx-auto px-6 max-w-[1440px] relative z-10">
            <div className="bg-ikea-blue inline-block px-4 py-1.5 mb-8 skew-x-[-4deg]">
              <span className="text-white text-[11px] font-black uppercase tracking-[0.4em] skew-x-[4deg] inline-block">INVENTORY REVIEW</span>
            </div>
            <h1 className="text-6xl md:text-[9rem] font-black text-ikea-black tracking-tighter leading-[0.8] mb-12 uppercase">
              {ar ? <>سلة<br /><span className="text-ikea-blue">المشتريات</span></> : <>YOUR SHOPPING<br /><span className="text-ikea-blue">REPOSITORY</span></>}
            </h1>
         </div>
      </header>

      <main className="container mx-auto px-6 max-w-[1440px] py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_450px] gap-20 items-start">
          
          <div className="space-y-6">
            <AnimatePresence>
              {cart.map((item) => (
                <motion.div 
                   key={item.product.id}
                   layout
                   initial={{ opacity: 0, x: -20 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, scale: 0.95 }}
                   className="bg-white rounded-[2.5rem] border-4 border-ikea-gray p-8 flex flex-col md:flex-row items-center gap-10 shadow-sm hover:shadow-md transition-shadow group"
                >
                  <div className="w-40 h-40 bg-ikea-gray rounded-3xl overflow-hidden p-4 flex-shrink-0 relative">
                     <img src={item.product.images?.[0]} className="w-full h-full object-contain" alt="" />
                     <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black shadow-sm">×{item.quantity}</div>
                  </div>

                  <div className="flex-grow text-start">
                    <div className="flex justify-between items-start mb-4">
                       <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-ikea-blue mb-1">
                             {typeof item.product.category === 'object' ? (ar ? item.product.category.ar : item.product.category.en) : item.product.category}
                          </p>
                          <h3 className="text-2xl font-black text-ikea-black tracking-tighter uppercase">
                             {typeof item.product.name === 'object' ? (ar ? item.product.name.ar : item.product.name.en) : item.product.name}
                          </h3>
                       </div>
                       <button onClick={() => removeFromCart(item.product.id)} className="text-ikea-darkGray/40 hover:text-red-500 transition-colors">
                          <Trash2 size={24} />
                       </button>
                    </div>
                    
                    <div className="flex flex-wrap items-center justify-between gap-8 mt-10">
                       <div className="flex items-center bg-ikea-gray rounded-full p-2 border border-ikea-gray">
                          <button onClick={() => updateQty(item.product.id, item.quantity - 1)} className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-ikea-black hover:bg-ikea-blue hover:text-white transition-all shadow-sm"><Minus size={18} /></button>
                          <span className="w-12 text-center font-black text-lg">{item.quantity}</span>
                          <button onClick={() => updateQty(item.product.id, item.quantity + 1)} className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-ikea-black hover:bg-ikea-blue hover:text-white transition-all shadow-sm"><Plus size={18} /></button>
                       </div>
                       <p className="text-3xl font-black text-ikea-blue tracking-tighter">
                          <span className="text-sm font-normal mr-1">SAR</span>
                          {(item.product.price * item.quantity).toLocaleString()}
                       </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <aside className="space-y-8 sticky top-40">
            <div className="bg-ikea-black text-white rounded-[3.5rem] p-12 shadow-2xl relative overflow-hidden">
               <h2 className="text-3xl font-black tracking-tighter mb-12 uppercase">{ar ? 'ملخص القيمة' : 'FINANCIAL SUMMARY'}</h2>
               <div className="space-y-6 mb-12 relative z-10">
                  <div className="flex justify-between opacity-60 text-lg uppercase tracking-tight"><span>Subtotal</span><span>{total.toLocaleString()} SAR</span></div>
                  <div className="flex justify-between opacity-60 text-lg uppercase tracking-tight"><span>Logistics</span><span className="text-green-400">FREE</span></div>
                  <div className="pt-8 border-t border-white/10 flex justify-between items-end">
                     <span className="font-black opacity-30 text-[11px] mb-2 tracking-widest uppercase">Total Amount</span>
                     <span className="text-5xl font-black tracking-tighter text-ikea-yellow">{total.toLocaleString()} <span className="text-xl">SAR</span></span>
                  </div>
               </div>
               <button 
                  onClick={() => navigate('/checkout')}
                  className="w-full bg-ikea-yellow text-ikea-blue py-6 rounded-full font-black uppercase tracking-widest hover:scale-[1.02] transition-all shadow-xl flex items-center justify-center gap-4 group"
               >
                  {ar ? 'إتمام الشراء' : 'PROCEED TO CHECKOUT'} <ArrowRight size={24} className={ar ? 'rotate-180' : ''} />
               </button>
               <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none rotate-12"><Box size={200} /></div>
            </div>

            <div className="bg-ikea-gray rounded-[2.5rem] p-10 space-y-8 text-start">
               <div className="flex gap-6 items-center">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-ikea-blue"><ShieldCheck size={28} /></div>
                  <p className="text-sm font-bold leading-tight">Secured Industrial Transaction Protocol Active</p>
               </div>
               <div className="flex gap-6 items-center">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-ikea-blue"><Truck size={28} /></div>
                  <p className="text-sm font-bold leading-tight">Priority Express Deployment to Your Coordinate</p>
               </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default Cart;
