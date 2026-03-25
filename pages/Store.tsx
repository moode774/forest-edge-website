import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, Package, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLang } from '../store/context/LangContext';
import { ProductCard } from '../store/components/ProductCard';
import { useStore } from '../store/context/StoreContext';

const CATEGORIES = [
  { id: 'all', en: 'All Collection', ar: 'كل المجموعة' },
  { id: 'tables', en: 'Tables', ar: 'طاولات' },
  { id: 'chairs', en: 'Chairs', ar: 'كراسي' },
  { id: 'storage', en: 'Storage', ar: 'تخزين' },
  { id: 'office', en: 'Office', ar: 'مكاتب' },
  { id: 'outdoor', en: 'Outdoor', ar: 'خارجي' },
  { id: 'bedroom', en: 'Bedroom', ar: 'غرف نوم' },
];

export const Store: React.FC = () => {
  const { lang } = useLang();
  const { products, productsLoading } = useStore();
  const ar = lang === 'ar';

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'newest'>('featured');
  const [isSortOpen, setIsSortOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) => {
          const nameEn = p.name?.en || p.name || '';
          const nameAr = p.name?.ar || '';
          const descEn = p.description?.en || p.description || '';
          const descAr = p.description?.ar || '';
          return nameEn.toLowerCase().includes(query) || 
                 nameAr.toLowerCase().includes(query) ||
                 descEn.toLowerCase().includes(query) ||
                 descAr.toLowerCase().includes(query);
        }
      );
    }

    if (activeCategory !== 'all') {
      result = result.filter((p) => p.category === activeCategory);
    }

    switch (sortBy) {
      case 'price-asc': return result.sort((a, b) => a.price - b.price);
      case 'price-desc': return result.sort((a, b) => b.price - a.price);
      case 'newest': return result.sort((a, b) => (b.id > a.id ? 1 : -1));
      default: return result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
  }, [searchQuery, activeCategory, sortBy, products]);

  const sortOptions = [
    { value: 'featured', en: 'Featured', ar: 'المميزة' },
    { value: 'newest', en: 'Newest Arrivals', ar: 'الأحدث' },
    { value: 'price-asc', en: 'Price: Low to High', ar: 'السعر: من الأقل للأعلى' },
    { value: 'price-desc', en: 'Price: High to Low', ar: 'السعر: من الأعلى للأقل' },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 f-sans selection:bg-ikea-yellow selection:text-ikea-blue" dir={ar ? 'rtl' : 'ltr'}>
      <header className="bg-white border-b border-ikea-gray pt-32 pb-16 text-start">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="w-full md:w-auto">
              <div className="bg-ikea-blue inline-block px-4 py-1.5 mb-4 skew-x-[-4deg]">
                 <span className="text-white text-[10px] font-black uppercase tracking-[0.4em] skew-x-[4deg] inline-block">PRODUCTION CATALOG</span>
              </div>
              <h1 className="text-5xl md:text-8xl font-black text-ikea-black tracking-tighter uppercase leading-[0.8]">
                {ar ? 'المتجر' : 'Store'}
              </h1>
            </div>
            <Link to="/track" className="flex items-center gap-4 text-[11px] font-black uppercase tracking-widest text-ikea-blue border-b-4 border-ikea-yellow pb-2 hover:opacity-70 transition-opacity">
              <Package size={18} /> {ar ? 'تتبع الطلب' : 'TRACK ARCHIVE'}
            </Link>
          </div>

          <div className="relative w-full max-w-4xl group">
            <Search className={`absolute top-1/2 -translate-y-1/2 w-6 h-6 text-ikea-darkGray opacity-40 group-focus-within:opacity-100 transition-opacity ${ar ? 'right-0' : 'left-0'}`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={ar ? 'ابحث عن منتج، تصميم، أو فئة...' : 'Search for units, designs, or categories...'}
              className={`w-full bg-transparent border-b-4 border-ikea-gray py-8 text-2xl md:text-4xl font-black focus:outline-none focus:border-ikea-blue transition-colors placeholder:text-ikea-gray ${ar ? 'pr-12 pl-4' : 'pl-12 pr-4'}`}
            />
          </div>
        </div>
      </header>

      <section className="bg-white sticky top-0 z-40 border-b border-ikea-gray shadow-sm">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="flex overflow-x-auto hide-scrollbar py-8 gap-10">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`whitespace-nowrap text-[11px] font-black uppercase tracking-[0.2em] transition-all relative pb-2 ${
                  activeCategory === cat.id ? 'text-ikea-blue' : 'text-ikea-darkGray opacity-40 hover:opacity-100'
                }`}
              >
                {ar ? cat.ar : cat.en}
                {activeCategory === cat.id && (
                  <motion.div layoutId="activeCategory" className="absolute left-0 right-0 -bottom-1 h-1 bg-ikea-yellow" />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-6 md:px-12 py-12 flex justify-between items-center">
          <div className="text-[11px] font-black uppercase tracking-widest text-ikea-darkGray opacity-40">
             {productsLoading ? (ar ? 'جاري التحميل...' : 'SYNCING...') : (<span>{filteredProducts.length} {ar ? 'وحدة مكتشفة' : 'UNITS DETECTED'}</span>)}
          </div>
          <div className="relative">
            <button onClick={() => setIsSortOpen(!isSortOpen)} className="flex items-center gap-4 text-[11px] font-black uppercase tracking-widest text-ikea-blue hover:text-ikea-black transition-colors">
              <SlidersHorizontal size={16} /> {ar ? 'ترتيب' : 'SORT'} <ChevronDown size={14} className={`transition-transform duration-500 ${isSortOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {isSortOpen && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className={`absolute top-full mt-6 w-64 bg-white border-4 border-ikea-gray rounded-[2rem] shadow-2xl z-50 p-4 ${ar ? 'left-0' : 'right-0'}`}>
                  {sortOptions.map((opt) => (
                    <button key={opt.value} onClick={() => { setSortBy(opt.value as any); setIsSortOpen(false); }} className={`w-full text-start px-6 py-4 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${sortBy === opt.value ? 'bg-ikea-blue text-white' : 'text-ikea-darkGray hover:bg-ikea-gray'}`}>
                      {ar ? opt.ar : opt.en}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-6 md:px-12 pb-40">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <AnimatePresence>
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </AnimatePresence>
        </div>
      </section>
    </div>
  );
};

export default Store;