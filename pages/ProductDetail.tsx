import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useStore } from '../store/context/StoreContext';
import { useLang } from '../store/context/LangContext';
import { ShoppingCart, ArrowLeft, Shield, Truck, RotateCcw, Box, Plus, Minus, Star, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addToCart } = useStore();
  const { lang } = useLang();
  const ar = lang === 'ar';
  
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [isAdding, setIsAdding] = useState(false);

  const product = products.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-ikea-gray/20">
       <div className="bg-white rounded-[3rem] p-12 text-center max-w-lg shadow-2xl">
          <Box size={64} className="mx-auto mb-8 text-ikea-darkGray opacity-20" />
          <h2 className="text-3xl font-black mb-10 tracking-tighter uppercase">{ar ? 'المنتج غير موجود' : 'LOGISTICS ERROR: UNIT NOT FOUND'}</h2>
          <Link to="/store" className="bg-ikea-blue text-white px-12 py-5 rounded-full font-black uppercase tracking-widest hover:bg-[#00478b] transition-all">
            {ar ? 'عودة للمتجر' : 'RETURN TO REPOSITORY'}
          </Link>
       </div>
    </div>
  );

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product, quantity);
    setTimeout(() => setIsAdding(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white f-sans pb-32" dir={ar ? 'rtl' : 'ltr'}>
      <nav className="fixed top-[72px] md:top-[80px] left-0 w-full bg-white/80 backdrop-blur-xl z-30 border-b border-ikea-gray px-6 py-4">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-ikea-blue font-black uppercase text-[11px] hover:gap-4 transition-all">
            <ArrowLeft size={18} className={ar ? 'rotate-180' : ''} /> {ar ? 'رجوع' : 'BACK TO ARCHIVE'}
          </button>
          <div className="hidden md:flex gap-4">
            <span className="text-[10px] font-black uppercase tracking-widest text-ikea-darkGray">REF: {product.sku || 'FE-9902'}</span>
            <div className="w-1 h-3 bg-ikea-gray rounded-full" />
            <span className="text-[10px] font-black uppercase tracking-widest text-ikea-blue">CATEGORY: {product.category?.en?.toUpperCase()}</span>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-6 max-w-[1440px] pt-48">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          
          {/* Visual Assets */}
          <div className="space-y-8 text-start">
            <motion.div 
              layoutId={`img-${product.id}`}
              className="aspect-[4/3] bg-ikea-gray rounded-[3rem] overflow-hidden border-4 border-ikea-gray shadow-2xl"
            >
              <img 
                src={product.images?.[activeImage] || 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200'} 
                alt="" 
                className="w-full h-full object-cover"
              />
            </motion.div>
            <div className="grid grid-cols-4 gap-6">
               {(product.images || [1,2,3,4]).map((img: any, i: number) => (
                  <button 
                    key={i} 
                    onClick={() => setActiveImage(i)}
                    className={`aspect-square rounded-2xl overflow-hidden border-4 transition-all ${activeImage === i ? 'border-ikea-blue shadow-lg scale-105' : 'border-transparent opacity-60 hover:opacity-100'}`}
                  >
                    <img src={typeof img === 'string' ? img : 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=300'} className="w-full h-full object-cover" alt="" />
                  </button>
               ))}
            </div>
          </div>

          {/* Operational Details */}
          <div className="text-start space-y-12">
            <div>
               <div className="flex items-center gap-4 mb-6">
                  <div className="bg-ikea-yellow text-ikea-blue px-3 py-1 text-[11px] font-black uppercase tracking-widest rounded-lg">NEW ARRIVAL</div>
                  <div className="flex text-ikea-yellow"><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /></div>
               </div>
               <h1 className="text-5xl md:text-8xl font-black text-ikea-black tracking-tighter leading-none mb-6 uppercase">
                 {product.name?.[lang] || product.name?.en}
               </h1>
               <p className="text-3xl md:text-5xl font-black text-ikea-blue tracking-tighter">
                 <span className="text-xl md:text-2xl font-normal mr-2">{ar ? 'ر.س' : 'SAR'}</span>
                 {product.price?.toLocaleString()}
               </p>
            </div>

            <div className="bg-ikea-gray p-10 rounded-[2.5rem] border border-ikea-gray">
               <h4 className="text-[11px] font-black uppercase tracking-widest text-ikea-darkGray mb-6">{ar ? 'تعديل الكمية' : 'ADJUST QUANTITY'}</h4>
               <div className="flex items-center gap-10">
                  <div className="flex items-center bg-white rounded-full p-2 border-2 border-ikea-gray">
                    <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-14 h-14 flex items-center justify-center rounded-full hover:bg-ikea-gray text-ikea-black transition-colors"><Minus size={24} /></button>
                    <span className="w-16 text-center text-2xl font-black">{quantity}</span>
                    <button onClick={() => setQuantity(q => q + 1)} className="w-14 h-14 flex items-center justify-center rounded-full hover:bg-ikea-gray text-ikea-black transition-colors"><Plus size={24} /></button>
                  </div>
                  <button 
                    onClick={handleAddToCart}
                    disabled={isAdding}
                    className={`flex-1 py-6 rounded-full text-[14px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-4 shadow-xl ${isAdding ? 'bg-green-600 text-white' : 'bg-ikea-blue text-white hover:bg-[#00478b]'}`}
                  >
                    {isAdding ? <Box className="animate-bounce" /> : <ShoppingCart size={20} />}
                    {isAdding ? (ar ? 'تمت الإضافة' : 'ADDED TO INVENTORY') : (ar ? 'إضافة للسلة' : 'ADD TO CART')}
                  </button>
               </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-[11px] font-black uppercase tracking-widest text-ikea-darkGray border-b border-ikea-gray pb-4">SPECIFICATIONS</h3>
              <p className="text-lg text-ikea-darkGray leading-relaxed font-medium opacity-80">
                {product.description?.[lang] || product.description?.en}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-10">
                 <div className="flex items-start gap-4 p-6 bg-ikea-gray/30 rounded-3xl">
                    <Shield size={24} className="text-ikea-blue" />
                    <div><span className="block text-[10px] font-black text-ikea-darkGray">WARRANTY</span><span className="text-sm font-bold">10 YEARS</span></div>
                 </div>
                 <div className="flex items-start gap-4 p-6 bg-ikea-gray/30 rounded-3xl">
                    <Truck size={24} className="text-ikea-blue" />
                    <div><span className="block text-[10px] font-black text-ikea-darkGray">DELIVERY</span><span className="text-sm font-bold">EXPRESS</span></div>
                 </div>
                 <div className="flex items-start gap-4 p-6 bg-ikea-gray/30 rounded-3xl">
                    <RotateCcw size={24} className="text-ikea-blue" />
                    <div><span className="block text-[10px] font-black text-ikea-darkGray">RETURNS</span><span className="text-sm font-bold">365 DAYS</span></div>
                 </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      <section className="mt-40 bg-ikea-gray/20 py-32 border-t border-ikea-gray">
          <div className="container mx-auto px-6 max-w-[1440px] text-start">
             <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-12 uppercase">{ar ? 'منتجات مشابهة' : 'RELATED INVENTORY'}</h2>
             <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                {products.filter(p => p.id !== id).slice(0, 4).map(p => (
                   <Link key={p.id} to={`/product/${p.id}`} className="group">
                      <div className="aspect-square bg-white rounded-[2rem] overflow-hidden border border-ikea-gray p-8 mb-6 relative shadow-sm hover:shadow-xl transition-all">
                         <img src={p.images?.[0]} className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110" alt="" />
                         <div className="absolute top-6 left-6 bg-ikea-blue text-white px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">VIEW DEPLOYMENT</div>
                      </div>
                      <h3 className="font-black text-ikea-black text-lg mb-1 uppercase tracking-tight">{p.name?.[lang] || p.name?.en}</h3>
                      <p className="font-bold text-ikea-blue">{p.price?.toLocaleString()} SAR</p>
                   </Link>
                ))}
             </div>
          </div>
      </section>
    </div>
  );
};

export default ProductDetail;
