import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Plus } from 'lucide-react';
import { useLang } from '../context/LangContext';
import { useStore } from '../context/StoreContext';
import { motion } from 'framer-motion';

export const ProductCard: React.FC<{ product: any }> = ({ product }) => {
    const { lang } = useLang();
    const { addToCart } = useStore();
    const ar = lang === 'ar';

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative bg-white border border-ikea-gray rounded-[2rem] p-6 hover:shadow-2xl transition-all duration-500 overflow-hidden text-start"
        >
            <Link to={`/product/${product.id}`} className="block aspect-square bg-ikea-gray rounded-2xl overflow-hidden mb-8 relative">
                <img 
                    src={product.images?.[0] || 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800'} 
                    className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110" 
                    alt={product.name?.[lang] || product.name?.en} 
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest text-ikea-blue shadow-sm">
                   {product.category?.toUpperCase() || 'CORE'}
                </div>
            </Link>

            <div className="space-y-2 mb-8">
               <div className="flex items-center gap-1 text-ikea-yellow mb-2">
                  <Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" />
               </div>
               <Link to={`/product/${product.id}`} className="block">
                  <h3 className="text-xl font-black text-ikea-black tracking-tighter uppercase leading-tight group-hover:text-ikea-blue transition-colors">
                     {product.name?.[lang] || product.name?.en}
                  </h3>
               </Link>
               <p className="text-2xl font-black text-ikea-blue tracking-tighter">
                  <span className="text-sm font-normal mr-1">SAR</span>
                  {product.price?.toLocaleString()}
               </p>
            </div>

            <button 
                onClick={(e) => { e.preventDefault(); addToCart(product); }}
                className="w-full bg-ikea-gray text-ikea-black font-black uppercase tracking-widest text-[11px] py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-ikea-blue hover:text-white transition-all shadow-sm"
            >
                <Plus size={16} /> {ar ? 'إضافة للسلة' : 'ADD TO REPOSITORY'}
            </button>
        </motion.div>
    );
};
