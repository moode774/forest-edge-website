import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Eye } from 'lucide-react';
import { StoreProduct } from '../types/storeTypes';
import { useStore } from '../context/StoreContext';
import { useLang } from '../../App';

interface ProductCardProps {
  product: StoreProduct;
}

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`text-sm ${
            star <= Math.round(rating) ? 'text-amber-400' : 'text-zinc-200'
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { lang } = useLang();
  const { addToCart } = useStore();

  const name = product.name[lang];
  const shortDesc = product.shortDesc[lang];
  const badge = product.badge?.[lang];

  return (
    <div className="group relative bg-white rounded-[2rem] overflow-hidden shadow-[0_4px_24px_rgba(107,68,35,0.08)] hover:shadow-[0_16px_48px_rgba(107,68,35,0.18)] transition-all duration-500 hover:-translate-y-2 flex flex-col">
      {/* Image Container */}
      <div className="relative overflow-hidden h-64 bg-zinc-50">
        <img
          src={product.images[0]}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Badge */}
        {badge && (
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-brand-wood text-brand-charcoal text-xs font-bold px-3 py-1.5 rounded-full tracking-wide shadow-sm">
              {badge}
            </span>
          </div>
        )}

        {/* Out of Stock Overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-brand-charcoal/60 flex items-center justify-center backdrop-blur-sm">
            <span className="text-white font-semibold text-sm tracking-widest uppercase px-4 py-2 border border-white/40 rounded-full">
              {lang === 'ar' ? 'غير متوفر' : 'Out of Stock'}
            </span>
          </div>
        )}

        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-brand-charcoal/0 group-hover:bg-brand-charcoal/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <Link
            to={`/store/product/${product.id}`}
            className="bg-white text-brand-charcoal text-xs font-semibold px-5 py-2.5 rounded-full flex items-center gap-2 shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
          >
            <Eye size={14} />
            {lang === 'ar' ? 'عرض التفاصيل' : 'Quick View'}
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Category */}
        <span className="text-xs font-semibold text-brand-wood uppercase tracking-widest mb-2">
          {product.category}
        </span>

        {/* Name */}
        <h3 className="text-brand-charcoal font-bold text-lg leading-tight mb-2 line-clamp-1">
          {name}
        </h3>

        {/* Short Description */}
        <p className="text-zinc-500 text-sm leading-relaxed mb-3 line-clamp-2 flex-grow">
          {shortDesc}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <StarRating rating={product.rating} />
          <span className="text-xs text-zinc-400">
            {product.rating.toFixed(1)} ({product.reviews} {lang === 'ar' ? 'تقييم' : 'reviews'})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-3 mb-5">
          <span className="text-brand-green font-bold text-xl">
            {product.price.toLocaleString()} SAR
          </span>
          {product.originalPrice && (
            <span className="text-zinc-400 text-sm line-through">
              {product.originalPrice.toLocaleString()} SAR
            </span>
          )}
          {product.originalPrice && (
            <span className="bg-red-50 text-red-500 text-xs font-bold px-2 py-0.5 rounded-full">
              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% {lang === 'ar' ? 'خصم' : 'OFF'}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={() => addToCart(product, 1)}
            disabled={!product.inStock}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
              product.inStock
                ? 'bg-brand-green text-white hover:bg-brand-greenHover shadow-sm hover:shadow-md active:scale-95'
                : 'bg-zinc-100 text-zinc-400 cursor-not-allowed'
            }`}
          >
            <ShoppingCart size={16} />
            {lang === 'ar' ? 'أضف للسلة' : 'Add to Cart'}
          </button>
          <Link
            to={`/store/product/${product.id}`}
            className="px-4 py-3 rounded-xl border-2 border-brand-wood/40 text-brand-charcoal hover:border-brand-green hover:text-brand-green transition-all duration-300 flex items-center justify-center"
          >
            <Eye size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};
