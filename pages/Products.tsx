import React, { useState } from 'react';
import { useLang } from '../App';
import { translations } from '../content/translations';
import { ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import { useStore } from '../store/context/StoreContext';
import { ProductCard } from '../store/components/ProductCard';

/* =========================================
   ANIMATION VARIANTS
   ========================================= */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

/* =========================================
   MAIN PAGE COMPONENT
   ========================================= */
export const Products: React.FC = () => {
  const { lang } = useLang();
  const t = translations[lang];
  const productsT = t.products;
  const [activeCategory, setActiveCategory] = useState('all');
  const { products, productsLoading } = useStore();

  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="overflow-hidden bg-[#FDFCFB]">
      {/* --- MAIN CONTENT --- */}
      <main className="flex-grow pt-32 md:pt-40 relative">

        {/* Header Area */}
        <section className="relative w-full px-6 mb-16">
          <div className="absolute top-0 right-[10%] w-[400px] h-[400px] bg-[#F5F2EE] rounded-full filter blur-[120px] opacity-60 -z-10" />
          <div className="max-w-[1400px] mx-auto pt-10 pb-16 text-center md:text-left rtl:md:text-right relative">

            <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="flex flex-col md:flex-row justify-between items-end gap-10">
              <div className="text-left rtl:text-right w-full">
                <motion.div variants={fadeUp} className="inline-flex items-center gap-3 mb-6">
                  <span className="w-8 h-[1px] bg-[#8A7A6B]"></span>
                  <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#8A7A6B]">
                    {lang === 'ar' ? 'اختيارنا المنسق' : 'Curated Selection'}
                  </span>
                </motion.div>
                <motion.h1 variants={fadeUp} className="text-6xl md:text-8xl font-serif tracking-tight text-[#282828] leading-[0.9]">
                  {lang === 'ar' ? <>المجموعة <br /><span className="italic font-light text-[#8A7A6B]">الحصرية.</span></> : <>The Master<br /><span className="italic font-light text-[#8A7A6B]">Collection.</span></>}
                </motion.h1>
              </div>

              <motion.div variants={fadeUp} className="flex items-center gap-4 bg-white/60 backdrop-blur-md px-6 py-4 rounded-2xl shadow-sm border border-[#282828]/5 shrink-0">
                <ShoppingBag size={20} className="text-[#8A7A6B]" />
                <div className="text-left rtl:text-right">
                  <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#737373] mb-1">
                    {lang === 'ar' ? 'حالة المخزون' : 'Inventory Status'}
                  </p>
                  <p className="text-sm font-serif text-[#282828]">
                    {products.length} {lang === 'ar' ? 'قطعة متوفرة' : 'Pieces Available'}
                  </p>
                </div>
              </motion.div>
            </motion.div>

          </div>
        </section>

        <div className="bg-[#FDFCFB] min-h-screen pb-32">
          <div className="container mx-auto px-6 max-w-[1400px]">

            {/* Premium Filter Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 1 }}
              className="flex flex-wrap justify-center md:justify-start gap-3 md:gap-6 mb-20 border-b border-[#282828]/10 pb-6"
            >
              <button
                onClick={() => setActiveCategory('all')}
                className={`text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] px-6 py-3 rounded-full transition-all duration-300 ${activeCategory === 'all' ? 'bg-[#282828] text-white shadow-lg' : 'bg-transparent text-[#737373] hover:text-[#282828] hover:bg-[#F5F2EE]'}`}
              >
                {lang === 'ar' ? 'الكل' : 'All'}
              </button>
              {productsT.categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] px-6 py-3 rounded-full transition-all duration-300 ${activeCategory === cat.id ? 'bg-[#282828] text-white shadow-lg' : 'bg-transparent text-[#737373] hover:text-[#282828] hover:bg-[#F5F2EE]'}`}
                >
                  {cat.label}
                </button>
              ))}
            </motion.div>

            {/* Product Grid */}
            {productsLoading ? (
              <div className="flex items-center justify-center py-32">
                <div className="w-10 h-10 rounded-full border-2 border-[#8A7A6B]/30 border-t-[#8A7A6B] animate-spin" />
              </div>
            ) : (
              <>
                <motion.div
                  key={activeCategory}
                  initial="hidden" animate="visible" variants={staggerContainer}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                >
                  {filteredProducts.map((product) => (
                    <motion.div variants={fadeUp} key={product.id}>
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </motion.div>

                {filteredProducts.length === 0 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-32">
                    <p className="text-2xl font-serif text-[#737373] italic">
                      {lang === 'ar' ? 'لا توجد منتجات في هذا القسم حالياً.' : 'No pieces found in this collection currently.'}
                    </p>
                  </motion.div>
                )}
              </>
            )}

          </div>
        </div>
      </main>
    </div>
  );
};

export default Products;