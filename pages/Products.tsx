import React, { useState } from 'react';
import { useLang } from '../App';
import { translations } from '../content/translations';
import { ProductItem } from '../types';

const generateProducts = (): ProductItem[] => [
  { 
    id: 1, 
    category: 'tables', 
    title: { en: "Grand Oak Dining Table", ar: "طاولة طعام سنديان ملكية" }, 
    image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80"
  },
  { 
    id: 2, 
    category: 'chairs', 
    title: { en: "Velvet Armchair", ar: "كرسي مخملي" }, 
    image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?auto=format&fit=crop&w=800&q=80"
  },
  { 
    id: 3, 
    category: 'storage', 
    title: { en: "Classic Credenza", ar: "خزانة بوفيه كلاسيك" }, 
    image: "https://images.unsplash.com/photo-1595515106969-1ce29569ff53?auto=format&fit=crop&w=800&q=80"
  },
  { 
    id: 4, 
    category: 'office', 
    title: { en: "Executive Mahogany Desk", ar: "مكتب تنفيذي ماهوجني" }, 
    image: "https://images.unsplash.com/photo-1520032525096-7bd04a94b561?auto=format&fit=crop&w=800&q=80"
  },
  { 
    id: 5, 
    category: 'tables', 
    title: { en: "Marble Top Coffee Table", ar: "طاولة قهوة سطح رخامي" }, 
    image: "https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=800&q=80"
  },
  { 
    id: 6, 
    category: 'outdoor', 
    title: { en: "Teak Pergola System", ar: "نظام برجولا خشب تيك" }, 
    image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=800&q=80"
  },
  { 
    id: 7, 
    category: 'storage', 
    title: { en: "Wall Unit 4-Door", ar: "وحدة جدارية ٤ أبواب" }, 
    image: "https://images.unsplash.com/photo-1595846519845-68e298c2edd8?auto=format&fit=crop&w=800&q=80"
  },
  { 
    id: 8, 
    category: 'chairs', 
    title: { en: "Dining Chair No-Arm", ar: "كرسي طعام بدون ذراع" }, 
    image: "https://images.unsplash.com/photo-1503602642458-232111445840?auto=format&fit=crop&w=800&q=80"
  },
];

export const Products: React.FC = () => {
  const { lang } = useLang();
  const t = translations[lang].products;
  const [activeCategory, setActiveCategory] = useState('all');
  const products = generateProducts();

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="bg-brand-white min-h-screen pb-20">
      <div className="container mx-auto px-6 py-20">
        <h1 className="text-4xl md:text-6xl font-bold text-brand-charcoal text-center mb-16 tracking-tight">
          {t.title}
        </h1>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-20">
          {t.categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 border ${
                activeCategory === cat.id
                  ? 'bg-brand-green border-brand-green text-white shadow-lg shadow-brand-green/20'
                  : 'bg-transparent border-zinc-200 text-zinc-500 hover:border-brand-wood hover:text-brand-wood'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-[2rem] overflow-hidden group hover:shadow-2xl transition-all duration-500 cursor-pointer p-4 border border-zinc-100 hover:border-brand-wood/30">
              <div className="h-72 rounded-[1.5rem] overflow-hidden mb-6 bg-zinc-50 relative">
                <img 
                  src={product.image} 
                  alt={product.title[lang]} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="px-2 pb-4 text-center">
                <span className="text-[10px] font-bold text-brand-wood uppercase tracking-widest mb-2 block">
                  {t.categories.find(c => c.id === product.category)?.label}
                </span>
                <h3 className="text-lg font-bold text-brand-charcoal">{product.title[lang]}</h3>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
           <div className="text-center text-zinc-400 py-20 font-medium">No products found.</div>
        )}
      </div>
    </div>
  );
};