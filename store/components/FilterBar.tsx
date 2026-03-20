import React from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { useLang } from '../../App';

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating';

interface FilterBarProps {
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  productCount: number;
}

interface Category {
  id: string;
  en: string;
  ar: string;
}

const categories: Category[] = [
  { id: 'all', en: 'All Pieces', ar: 'جميع القطع' },
  { id: 'tables', en: 'Tables', ar: 'الطاولات' },
  { id: 'chairs', en: 'Chairs', ar: 'الكراسي' },
  { id: 'storage', en: 'Storage', ar: 'التخزين' },
  { id: 'office', en: 'Office', ar: 'المكاتب' },
  { id: 'outdoor', en: 'Outdoor', ar: 'الخارجي' },
  { id: 'bedroom', en: 'Bedroom', ar: 'غرفة النوم' },
];

interface SortChoice {
  value: SortOption;
  en: string;
  ar: string;
}

const sortOptions: SortChoice[] = [
  { value: 'featured', en: 'Featured', ar: 'المميز' },
  { value: 'price-asc', en: 'Price: Low to High', ar: 'السعر: من الأقل للأعلى' },
  { value: 'price-desc', en: 'Price: High to Low', ar: 'السعر: من الأعلى للأقل' },
  { value: 'rating', en: 'Top Rated', ar: 'الأعلى تقييماً' },
];

export const FilterBar: React.FC<FilterBarProps> = ({
  activeCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  productCount,
}) => {
  const { lang } = useLang();
  const isRtl = lang === 'ar';

  return (
    <div
      className="bg-white border-b border-zinc-100 sticky top-20 z-30 shadow-sm"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div className="max-w-[1200px] mx-auto px-6 py-4">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          {/* Category Pills - Horizontally scrollable on mobile */}
          <div className="flex-grow overflow-x-auto scrollbar-hide">
            <div className="flex items-center gap-2 min-w-max">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => onCategoryChange(cat.id)}
                  className={`px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                    activeCategory === cat.id
                      ? 'bg-brand-green text-white shadow-md shadow-brand-green/20'
                      : 'bg-zinc-50 text-zinc-500 hover:bg-zinc-100 hover:text-brand-charcoal'
                  }`}
                >
                  {cat[lang]}
                </button>
              ))}
            </div>
          </div>

          {/* Right side: count + sort */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <span className="text-zinc-400 text-sm whitespace-nowrap">
              {productCount} {isRtl ? 'قطعة' : 'pieces'}
            </span>

            <div className="flex items-center gap-2 bg-zinc-50 rounded-xl px-3 py-2">
              <SlidersHorizontal size={14} className="text-zinc-400" />
              <select
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value as SortOption)}
                className="bg-transparent text-sm text-brand-charcoal font-medium focus:outline-none cursor-pointer"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt[lang]}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
