import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, ShoppingCart, Package, Shield, Truck,
  ChevronLeft, ChevronRight, Minus, Plus, Check
} from 'lucide-react';
import { useLang } from '../App';
import { useStore } from '../store/context/StoreContext';
import { ProductCard } from '../store/components/ProductCard';

const StarRow: React.FC<{ rating: number; reviews: number }> = ({ rating, reviews }) => (
  <div className="flex items-center gap-2">
    <div className="flex">
      {[1, 2, 3, 4, 5].map(s => (
        <span key={s} className={`text-base ${s <= Math.round(rating) ? 'text-amber-400' : 'text-[#282828]/10'}`}>★</span>
      ))}
    </div>
    <span className="text-[#737373] text-xs f-sans">{rating.toFixed(1)} ({reviews})</span>
  </div>
);

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { lang } = useLang();
  const { addToCart, products, productsLoading } = useStore();
  const ar = lang === 'ar';

  const product = products.find(p => p.id === id);
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveImg(0);
    setQty(1);
    setAdded(false);
  }, [id]);

  const related = products
    .filter(p => p.id !== id && p.category === product?.category)
    .slice(0, 4);

  if (productsLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-2 border-[#8A7A6B]/30 border-t-[#8A7A6B] animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
        <p className="font-serif text-3xl text-[#282828] mb-4">{ar ? 'المنتج غير موجود' : 'Product Not Found'}</p>
        <button onClick={() => navigate('/store')} className="text-[#8A7A6B] text-sm uppercase tracking-widest font-bold hover:underline f-sans">
          {ar ? 'العودة للمتجر' : 'Back to Store'}
        </button>
      </div>
    );
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] f-sans" dir={ar ? 'rtl' : 'ltr'}>
      {/* Breadcrumb */}
      <div className="border-b border-[#282828]/5 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-4 flex items-center gap-3 text-[10px] uppercase tracking-widest text-[#737373] font-bold">
          <Link to="/" className="hover:text-[#282828] transition-colors">{ar ? 'الرئيسية' : 'Home'}</Link>
          <span>/</span>
          <Link to="/store" className="hover:text-[#282828] transition-colors">{ar ? 'المتجر' : 'Store'}</Link>
          <span>/</span>
          <span className="text-[#282828] truncate max-w-[200px]">{product.name[lang]}</span>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-12 md:py-20">
        {/* Back */}
        <button
          onClick={() => navigate('/store')}
          className="flex items-center gap-2 text-[#737373] text-[10px] uppercase tracking-widest hover:text-[#282828] transition-colors mb-12 font-bold"
        >
          <ArrowLeft size={14} className={ar ? 'rotate-180' : ''} />
          {ar ? 'العودة للمتجر' : 'Back to Store'}
        </button>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-start">
          {/* ─── LEFT: Image Gallery ─── */}
          <div className="space-y-4 sticky top-28">
            {/* Main Image */}
            <div className="relative overflow-hidden rounded-[2rem] bg-[#F5F2EE] aspect-[4/3]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImg}
                  src={product.images[activeImg]}
                  alt={product.name[lang]}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4 }}
                />
              </AnimatePresence>

              {/* Badge */}
              {product.badge && (
                <div className="absolute top-5 left-5 z-10">
                  <span className="bg-[#DCC7A1] text-[#282828] text-xs font-bold px-3 py-1.5 rounded-full">
                    {product.badge[lang]}
                  </span>
                </div>
              )}

              {/* Out of Stock */}
              {!product.inStock && (
                <div className="absolute inset-0 bg-[#1C1C1A]/60 flex items-center justify-center rounded-[2rem] backdrop-blur-sm">
                  <span className="text-white font-bold uppercase tracking-widest text-sm border border-white/30 px-6 py-3 rounded-full">
                    {ar ? 'غير متوفر' : 'Out of Stock'}
                  </span>
                </div>
              )}

              {/* Image Nav Arrows */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImg(i => (i === 0 ? product.images.length - 1 : i - 1))}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                  >
                    <ChevronLeft size={18} className="text-[#282828]" />
                  </button>
                  <button
                    onClick={() => setActiveImg(i => (i === product.images.length - 1 ? 0 : i + 1))}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                  >
                    <ChevronRight size={18} className="text-[#282828]" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 flex-shrink-0 ${
                      activeImg === i ? 'border-[#8A7A6B] shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ─── RIGHT: Product Info ─── */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            {/* Category */}
            <span className="text-[#8A7A6B] text-[10px] font-bold uppercase tracking-[0.25em]">
              {product.category}
            </span>

            {/* Name */}
            <h1 className="font-serif text-[#282828] text-4xl md:text-5xl leading-tight mt-3 mb-4">
              {product.name[lang]}
            </h1>

            {/* Rating */}
            <StarRow rating={product.rating} reviews={product.reviews} />

            {/* Price */}
            <div className="flex items-baseline gap-4 mt-6 mb-8">
              <span className="text-[#282828] font-bold text-3xl font-serif">
                {product.price.toLocaleString()} SAR
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-[#737373] text-lg line-through f-sans">
                    {product.originalPrice.toLocaleString()} SAR
                  </span>
                  <span className="bg-red-50 text-red-500 text-xs font-bold px-2.5 py-1 rounded-full f-sans">
                    {discount}% {ar ? 'خصم' : 'OFF'}
                  </span>
                </>
              )}
            </div>

            {/* Short Desc */}
            <p className="text-[#737373] text-base leading-relaxed mb-8">
              {product.description[lang]}
            </p>

            {/* Divider */}
            <div className="h-[1px] bg-[#282828]/5 mb-8" />

            {/* Materials */}
            <div className="mb-6">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#282828] mb-3">
                {ar ? 'الخامات' : 'Materials'}
              </h4>
              <div className="flex flex-wrap gap-2">
                {product.materials[lang].map((m, i) => (
                  <span key={i} className="bg-[#F5F2EE] text-[#737373] text-xs px-3 py-1.5 rounded-full f-sans font-medium">
                    {m}
                  </span>
                ))}
              </div>
            </div>

            {/* Dimensions */}
            <div className="mb-8">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#282828] mb-2">
                {ar ? 'الأبعاد' : 'Dimensions'}
              </h4>
              <p className="text-[#737373] text-sm f-sans">{product.dimensions[lang]}</p>
            </div>

            {/* Divider */}
            <div className="h-[1px] bg-[#282828]/5 mb-8" />

            {/* Quantity + Add to Cart */}
            {product.inStock && (
              <div className="space-y-4">
                <div className="flex items-center gap-6">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#282828] mb-3">
                      {ar ? 'الكمية' : 'Quantity'}
                    </p>
                    <div className="flex items-center gap-0 border border-[#282828]/10 rounded-full overflow-hidden">
                      <button
                        onClick={() => setQty(q => Math.max(1, q - 1))}
                        className="w-12 h-12 flex items-center justify-center text-[#282828] hover:bg-[#F5F2EE] transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-10 text-center font-bold text-[#282828] f-sans">{qty}</span>
                      <button
                        onClick={() => setQty(q => q + 1)}
                        className="w-12 h-12 flex items-center justify-center text-[#282828] hover:bg-[#F5F2EE] transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                  <div className="flex-grow">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#282828] mb-3">
                      {ar ? 'الإجمالي' : 'Subtotal'}
                    </p>
                    <p className="text-[#8A7A6B] font-bold text-xl font-serif">
                      {(product.price * qty).toLocaleString()} SAR
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  className={`w-full flex items-center justify-center gap-3 py-5 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300 shadow-lg ${
                    added
                      ? 'bg-[#4CAF50] text-white'
                      : 'bg-[#282828] text-white hover:bg-[#8A7A6B]'
                  }`}
                >
                  <AnimatePresence mode="wait">
                    {added ? (
                      <motion.span key="added" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} className="flex items-center gap-2">
                        <Check size={16} />
                        {ar ? 'تمت الإضافة للسلة!' : 'Added to Cart!'}
                      </motion.span>
                    ) : (
                      <motion.span key="add" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} className="flex items-center gap-2">
                        <ShoppingCart size={16} />
                        {ar ? 'أضف للسلة' : 'Add to Cart'}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>

                <Link
                  to="/checkout"
                  onClick={() => addToCart(product, qty)}
                  className="w-full flex items-center justify-center gap-3 py-4 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] border border-[#282828]/15 text-[#282828] hover:border-[#8A7A6B] hover:text-[#8A7A6B] transition-all duration-300"
                >
                  {ar ? 'اطلب الآن مباشرة' : 'Buy Now'}
                </Link>
              </div>
            )}

            {!product.inStock && (
              <div className="bg-[#F5F2EE] rounded-2xl px-6 py-5 text-center">
                <p className="text-[#737373] text-sm font-bold uppercase tracking-widest">
                  {ar ? 'هذا المنتج متاح بالطلب المسبق' : 'This product is available by special order'}
                </p>
                <Link to="/contact" className="text-[#8A7A6B] text-xs font-bold uppercase tracking-widest hover:underline mt-2 inline-block">
                  {ar ? 'تواصل معنا' : 'Contact Us'}
                </Link>
              </div>
            )}

            {/* Trust Badges */}
            <div className="mt-8 pt-8 border-t border-[#282828]/5 grid grid-cols-3 gap-4">
              {[
                { icon: <Truck size={16} />, en: 'White-Glove Delivery', ar: 'توصيل مميز' },
                { icon: <Shield size={16} />, en: '5-Year Warranty', ar: 'ضمان ٥ سنوات' },
                { icon: <Package size={16} />, en: 'Secure Packaging', ar: 'تغليف آمن' },
              ].map((b, i) => (
                <div key={i} className="flex flex-col items-center text-center gap-2 text-[#8A7A6B]">
                  {b.icon}
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#737373]">
                    {ar ? b.ar : b.en}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ─── RELATED PRODUCTS ─── */}
        {related.length > 0 && (
          <section className="mt-32 border-t border-[#282828]/5 pt-16">
            <div className="flex items-center justify-between mb-10">
              <h2 className="font-serif text-[#282828] text-3xl">
                {ar ? 'قطع مشابهة' : 'Related Pieces'}
              </h2>
              <Link
                to="/store"
                className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8A7A6B] hover:text-[#282828] transition-colors flex items-center gap-2"
              >
                {ar ? 'عرض الكل' : 'View All'}
                <ArrowLeft size={12} className={ar ? '' : 'rotate-180'} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p, i) => (
                <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                  <ProductCard product={p} />
                </motion.div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
