import React from 'react';
import { 
  X, ShoppingBag, Trash2, Plus, Minus, 
  ArrowRight, ShieldCheck, Truck, RotateCcw, Box
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useLang } from '../context/LangContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export const CartDrawer: React.FC = () => {
    const { cart, cartOpen, setCartOpen, updateQty, removeFromCart, cartTotal } = useStore();
    const { lang } = useLang();
    const ar = lang === 'ar';
    const navigate = useNavigate();

    return (
        <AnimatePresence>
            {cartOpen && (
                <>
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setCartOpen(false)}
                        className="fixed inset-0 bg-ikea-black/40 backdrop-blur-sm z-[200]"
                    />
                    <motion.div 
                        initial={{ x: ar ? '-100%' : '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: ar ? '-100%' : '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className={`fixed top-0 ${ar ? 'left-0' : 'right-0'} h-full w-full max-w-lg bg-white shadow-2xl z-[300] flex flex-col f-sans`}
                        dir={ar ? 'rtl' : 'ltr'}
                    >
                        <header className="p-10 border-b border-ikea-gray flex items-center justify-between text-start">
                            <div className="flex items-center gap-4">
                                <div className="bg-ikea-blue text-white p-3 rounded-xl"><ShoppingBag size={24} /></div>
                                <div>
                                    <h2 className="text-2xl font-black tracking-tighter uppercase">{ar ? 'سلة التسوق' : 'REPOSITORY'}</h2>
                                    <p className="text-[10px] font-bold text-ikea-darkGray opacity-60 uppercase">{cart.length} ACTIVE UNITS</p>
                                </div>
                            </div>
                            <button onClick={() => setCartOpen(false)} className="p-4 hover:bg-ikea-gray rounded-full transition-all text-ikea-darkGray"><X size={32} /></button>
                        </header>

                        <main className="flex-1 overflow-y-auto p-10 custom-scrollbar text-start">
                            {cart.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center opacity-20">
                                    <Box size={80} className="mb-8" />
                                    <p className="text-xl font-black uppercase tracking-widest">{ar ? 'السلة فارغة' : 'NO UNITS DETECTED'}</p>
                                </div>
                            ) : (
                                <div className="space-y-8">
                                    {cart.map((item) => (
                                        <div key={item.product.id} className="flex gap-6 items-center group">
                                            <div className="w-24 h-24 bg-ikea-gray rounded-2xl overflow-hidden p-3 flex-shrink-0">
                                                <img src={item.product.images?.[0]} className="w-full h-full object-contain" alt="" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start mb-2">
                                                    <h3 className="font-black text-sm uppercase tracking-tight leading-tight">{item.product.name?.[lang] || item.product.name?.en}</h3>
                                                    <button onClick={() => removeFromCart(item.product.id)} className="text-ikea-darkGray/40 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                                                </div>
                                                <div className="flex justify-between items-center mt-4">
                                                    <div className="flex items-center bg-ikea-gray rounded-full p-1 border border-ikea-gray">
                                                        <button onClick={() => updateQty(item.product.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center rounded-full bg-white hover:bg-ikea-blue hover:text-white transition-all shadow-sm"><Minus size={14} /></button>
                                                        <span className="w-8 text-center font-black text-xs">{item.quantity}</span>
                                                        <button onClick={() => updateQty(item.product.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center rounded-full bg-white hover:bg-ikea-blue hover:text-white transition-all shadow-sm"><Plus size={14} /></button>
                                                    </div>
                                                    <p className="font-black text-ikea-blue text-sm">{(item.product.price * item.quantity).toLocaleString()} SAR</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </main>

                        <footer className="p-10 border-t border-ikea-gray space-y-8 bg-ikea-gray/20">
                            <div className="space-y-4">
                                <div className="flex justify-between text-sm opacity-60 font-medium uppercase tracking-widest"><span>Subtotal</span><span>{cartTotal.toLocaleString()} SAR</span></div>
                                <div className="flex justify-between items-end">
                                    <span className="text-[11px] font-black uppercase tracking-[0.4em] text-ikea-blue">Net Total</span>
                                    <span className="text-4xl font-black tracking-tighter">{cartTotal.toLocaleString()} SAR</span>
                                </div>
                            </div>
                            <button 
                                onClick={() => { setCartOpen(false); navigate('/checkout'); }}
                                disabled={cart.length === 0}
                                className="w-full bg-ikea-blue text-white py-6 rounded-full font-black uppercase tracking-widest hover:bg-[#00478b] transition-all shadow-xl flex items-center justify-center gap-4 disabled:opacity-30 group"
                            >
                                {ar ? 'إتمام الشراء' : 'PROCEED TO CHECKOUT'} <ArrowRight size={22} className={ar ? 'rotate-180' : 'group-hover:translate-x-2 transition-transform'} />
                            </button>
                        </footer>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
