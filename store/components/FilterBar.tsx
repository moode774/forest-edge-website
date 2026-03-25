import React from 'react';
import { useLang } from '../context/LangContext';
import { SlidersHorizontal, ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FilterBarProps {
    categories: any[];
    activeCategory: string;
    onCategoryChange: (id: string) => void;
    sortBy: string;
    onSortChange: (val: any) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({ 
    categories, activeCategory, onCategoryChange, sortBy, onSortChange 
}) => {
    const { lang } = useLang();
    const ar = lang === 'ar';
    const [isSortOpen, setIsSortOpen] = React.useState(false);

    const sortOptions = [
        { id: 'featured', en: 'Featured', ar: 'المميزة' },
        { id: 'newest', en: 'Newest', ar: 'الأحدث' },
        { id: 'price-asc', en: 'Price: Low-High', ar: 'السعر: من الأقل' },
        { id: 'price-desc', en: 'Price: High-Low', ar: 'السعر: من الأعلى' },
    ];

    return (
        <div className="flex flex-col md:flex-row justify-between items-center gap-10 py-12 border-y border-ikea-gray mb-16 px-4" dir={ar ? 'rtl' : 'ltr'}>
            
            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-8">
                {categories.map((cat) => (
                    <button 
                        key={cat.id} 
                        onClick={() => onCategoryChange(cat.id)}
                        className={`text-[11px] font-black uppercase tracking-[0.2em] py-2 px-1 relative transition-all ${activeCategory === cat.id ? 'text-ikea-blue' : 'text-ikea-darkGray opacity-40 hover:opacity-100'}`}
                    >
                        {ar ? cat.ar : cat.en}
                        {activeCategory === cat.id && (
                            <motion.div layoutId="filter-underline" className="absolute -bottom-1 left-0 w-full h-0.5 bg-ikea-blue" />
                        )}
                    </button>
                ))}
            </div>

            {/* Sort Dropdown */}
            <div className="relative min-w-[240px]">
                <button 
                    onClick={() => setIsSortOpen(!isSortOpen)}
                    className="w-full flex items-center justify-between bg-ikea-gray px-8 py-4 rounded-full text-[11px] font-black uppercase tracking-widest border border-ikea-gray hover:border-ikea-blue transition-all"
                >
                    <span className="flex items-center gap-3"><SlidersHorizontal size={14} /> {ar ? 'ترتيب حسب' : 'SORT BY'}</span>
                    <ChevronDown size={16} className={`transition-transform duration-500 ${isSortOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                    {isSortOpen && (
                        <motion.div 
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute mt-4 w-full bg-white rounded-[2rem] shadow-2xl border border-ikea-gray p-4 z-50 overflow-hidden"
                        >
                            {sortOptions.map((opt) => (
                                <button 
                                    key={opt.id}
                                    onClick={() => { onSortChange(opt.id); setIsSortOpen(false); }}
                                    className={`w-full text-start px-6 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-between transition-all ${sortBy === opt.id ? 'bg-ikea-blue text-white' : 'text-ikea-darkGray hover:bg-ikea-gray'}`}
                                >
                                    {ar ? opt.ar : opt.en}
                                    {sortBy === opt.id && <Check size={14} />}
                                </button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
