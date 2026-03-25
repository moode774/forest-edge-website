import React, { useEffect } from 'react';
import { useLang } from '../store/context/LangContext';
import { ArrowRight, LayoutGrid, Box } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const Products: React.FC = () => {
    const { lang } = useLang();
    const ar = lang === 'ar';

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const productCategories = [
        { id: 1, title: ar ? 'سلسلة المعيشة' : 'RESIDENTIAL CORE', img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800', count: '45 Units' },
        { id: 2, title: ar ? 'حلول المكاتب' : 'INDUSTRIAL OFFICE', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800', count: '32 Units' },
        { id: 3, title: ar ? 'المجموعات الفاخرة' : 'EBONY ARCHIVE', img: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&q=80&w=800', count: '18 Units' },
    ];

    return (
        <div className="bg-white f-sans min-h-screen pb-32 overflow-hidden" dir={ar ? 'rtl' : 'ltr'}>
            <header className="bg-ikea-gray/30 pt-32 pb-20 md:pt-48 md:pb-40 px-6 md:px-12 relative overflow-hidden text-start">
               <div className="container mx-auto px-6 max-w-[1440px] relative z-10">
                  <div className="bg-ikea-blue inline-block px-4 py-1.5 mb-8 skew-x-[-4deg]">
                    <span className="text-white text-[11px] font-black uppercase tracking-[0.4em] skew-x-[4deg] inline-block">PRODUCTION</span>
                  </div>
                  <h1 className="text-6xl md:text-[9rem] font-black text-ikea-black tracking-tighter leading-[0.8] mb-12 uppercase">
                    {ar ? <>فهرس<br /><span className="text-ikea-blue">المنتجات</span></> : <>PRODUCT<br /><span className="text-ikea-blue">INVENTORY</span></>}
                  </h1>
               </div>
            </header>

            <main className="container mx-auto px-6 max-w-[1440px] py-24">
               <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                  {productCategories.map((cat, i) => (
                     <motion.div 
                        key={cat.id} 
                        initial={{ opacity: 0, scale: 0.95 }} 
                        whileInView={{ opacity: 1, scale: 1 }} 
                        className="group cursor-pointer text-start"
                     >
                        <div className="aspect-[3/4] rounded-[3rem] overflow-hidden bg-ikea-gray mb-10 border-4 border-ikea-gray shadow-xl relative">
                           <img src={cat.img} className="w-full h-full object-cover transition-transform duration-[4s] group-hover:scale-110" alt="" />
                           <div className="absolute inset-0 bg-ikea-blue/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                           <div className="absolute bottom-10 left-10 text-white z-20">
                              <p className="text-[11px] font-black uppercase tracking-widest bg-ikea-blue px-4 py-1.5 rounded-full inline-block mb-2">{cat.count}</p>
                              <h3 className="text-4xl font-black tracking-tighter uppercase leading-none">{cat.title}</h3>
                           </div>
                        </div>
                        <Link to="/store" className="flex items-center gap-4 text-ikea-blue font-black tracking-widest text-[13px] hover:gap-6 transition-all uppercase">
                           {ar ? 'عرض المجموعة' : 'EXPLORE COLLECTION'} <ArrowRight size={20} className={ar ? 'rotate-180' : ''} />
                        </Link>
                     </motion.div>
                  ))}
               </div>
            </main>
        </div>
    );
};

export default Products;
