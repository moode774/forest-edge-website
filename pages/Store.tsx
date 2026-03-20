import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Sparkles, Star, ArrowRight, Package } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLang } from '../App';
import { FilterBar, SortOption } from '../store/components/FilterBar';
import { ProductCard } from '../store/components/ProductCard';
import { useStore } from '../store/context/StoreContext';

export const Store: React.FC = () => {
  const { lang } = useLang();
  const { cartCount, setCartOpen, products, productsLoading } = useStore();
  const ar = lang === 'ar';

  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState<SortOption>('featured');

  const filtered = useMemo(() => {
    let list = activeCategory === 'all'
      ? products
      : products.filter(p => p.category === activeCategory);

    switch (sortBy) {
      case 'price-asc':  return [...list].sort((a, b) => a.price - b.price);
      case 'price-desc': return [...list].sort((a, b) => b.price - a.price);
      case 'rating':     return [...list].sort((a, b) => (b.rating || 0) - (a.rating || 0));
      default:           return [...list].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
  }, [activeCategory, sortBy, products]);

  const featured = products.filter(p => p.featured).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#FDFCFB] f-sans" dir={ar ? 'rtl' : 'ltr'}>

      {/* ─── HERO BANNER ─── */}
      <section className="relative h-[72vh] min-h-[520px] overflow-hidden flex items-end">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1800&q=80"
            alt="Store hero"
            className="w-full h-full object-cover scale-105"
            style={{ animation: 'heroZoom 20s ease-in-out infinite alternate' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1A]/80 via-[#1C1C1A]/30 to-transparent" />
        </div>

        <style>{`
          @keyframes heroZoom {
            from { transform: scale(1.05); }
            to   { transform: scale(1.15); }
          }
        `}</style>

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 pb-16 md:pb-24">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-flex items-center gap-2 text-[#DCC7A1] text-[10px] font-bold uppercase tracking-[0.3em] mb-5">
              <Sparkles size={12} />
              {ar ? 'المتجر الفاخر' : 'Luxury Store'}
            </span>
            <h1 className="font-serif text-white text-5xl md:text-7xl leading-none mb-6">
              {ar ? (
                <>اكتشف<br /><span className="italic font-light text-[#DCC7A1]">مجموعتنا</span></>
              ) : (
                <>Discover<br /><span className="italic font-light text-[#DCC7A1]">Our Collection</span></>
              )}
            </h1>
            <p className="text-white/70 text-lg max-w-xl f-sans font-light leading-relaxed">
              {ar
                ? 'قطع أثاث مصنوعة يدوياً من أجود الخامات، تجمع بين الفخامة الخالدة والوظائف العصرية.'
                : 'Handcrafted furniture from the finest materials — where timeless luxury meets modern function.'}
            </p>
            <div className="flex items-center gap-5 mt-10">
              <button
                onClick={() => setCartOpen(true)}
                className="relative flex items-center gap-3 bg-white text-[#282828] px-8 py-4 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#8A7A6B] hover:text-white transition-all duration-300 shadow-xl"
              >
                <ShoppingBag size={16} />
                {ar ? 'سلة التسوق' : 'My Cart'}
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#8A7A6B] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
              <Link
                to="/orders"
                className="flex items-center gap-2 text-white/80 hover:text-white text-[11px] font-bold uppercase tracking-[0.2em] transition-colors"
              >
                <Package size={14} />
                {ar ? 'طلباتي' : 'My Orders'}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── FEATURED STRIP ─── */}
      <section className="border-b border-[#282828]/5 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-10">
          <div className="flex items-center gap-3 mb-8">
            <Star size={14} className="text-[#8A7A6B]" fill="currentColor" />
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#8A7A6B]">
              {ar ? 'القطع المميزة' : 'Featured Pieces'}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featured.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to={`/store/product/${product.id}`}
                  className="group relative overflow-hidden rounded-2xl h-52 flex items-end block"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name[lang]}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1A]/70 to-transparent" />
                  <div className="relative z-10 p-5 w-full flex items-end justify-between">
                    <div>
                      <p className="text-white/60 text-[9px] uppercase tracking-widest font-bold mb-1">{product.category}</p>
                      <h3 className="text-white font-serif text-lg leading-tight">{product.name[lang]}</h3>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-[#DCC7A1] font-bold text-sm f-sans">{product.price.toLocaleString()} SAR</span>
                      <ArrowRight size={16} className={`text-white/60 group-hover:text-white transition-colors ${ar ? 'rotate-180' : ''}`} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FILTER BAR ─── */}
      <FilterBar
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        sortBy={sortBy}
        onSortChange={setSortBy}
        productCount={filtered.length}
      />

      {/* ─── PRODUCT GRID ─── */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-12 py-16">
        {productsLoading ? (
          <div className="flex items-center justify-center py-32">
            <div className="w-10 h-10 rounded-full border-2 border-[#8A7A6B]/30 border-t-[#8A7A6B] animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-32">
            <p className="text-[#737373] text-lg font-serif italic">
              {ar ? 'لا توجد منتجات في هذا التصنيف' : 'No products found in this category'}
            </p>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>

      {/* ─── TRUST BADGES ─── */}
      <section className="border-t border-[#282828]/5 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: '🪵', en: 'Premium Wood', ar: 'خشب فاخر', sub: { en: 'Sourced from certified forests', ar: 'من غابات معتمدة' } },
              { icon: '✋', en: 'Handcrafted', ar: 'صناعة يدوية', sub: { en: 'By master craftsmen', ar: 'بأيدي حرفيين متمرسين' } },
              { icon: '🚚', en: 'White-Glove Delivery', ar: 'توصيل فاخر', sub: { en: 'Installation included', ar: 'يشمل التركيب' } },
              { icon: '🛡️', en: '5-Year Warranty', ar: 'ضمان ٥ سنوات', sub: { en: 'On all our pieces', ar: 'على جميع قطعنا' } },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex flex-col items-center text-center gap-3"
              >
                <span className="text-4xl">{item.icon}</span>
                <div>
                  <p className="text-[#282828] font-bold text-sm uppercase tracking-widest">{ar ? item.ar : item.en}</p>
                  <p className="text-[#737373] text-xs mt-1">{ar ? item.sub.ar : item.sub.en}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Store;
