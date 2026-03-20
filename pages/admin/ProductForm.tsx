import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { AdminLayout } from './AdminLayout';
import {
  Save, ArrowLeft, Plus, Trash2, Star,
  Image as ImageIcon, Globe, Package, AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORIES = ['office', 'tables', 'seating', 'bedroom', 'storage', 'lighting', 'decor'];

const generateId = () => {
  return `prod-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
};

/* ─── Bilingual field helper ─── */
const BiField: React.FC<{
  label: string;
  enVal: string; arVal: string;
  onEnChange: (v: string) => void; onArChange: (v: string) => void;
  type?: 'input' | 'textarea';
  placeholder?: { en: string; ar: string };
  required?: boolean;
}> = ({ label, enVal, arVal, onEnChange, onArChange, type = 'input', placeholder, required }) => {
  const base = 'w-full bg-[#FDFCFB] border border-[#282828]/10 rounded-xl px-4 py-3 text-sm text-[#282828] focus:outline-none focus:border-[#8A7A6B] transition-colors f-sans resize-none';
  return (
    <div>
      <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#737373] mb-2 block f-sans">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <div className="flex items-center gap-1.5 mb-1.5">
            <Globe size={11} className="text-[#8A7A6B]" />
            <span className="text-[9px] font-bold uppercase tracking-widest text-[#8A7A6B] f-sans">English</span>
          </div>
          {type === 'textarea' ? (
            <textarea rows={3} value={enVal} onChange={e => onEnChange(e.target.value)}
              placeholder={placeholder?.en} className={base} />
          ) : (
            <input type="text" value={enVal} onChange={e => onEnChange(e.target.value)}
              placeholder={placeholder?.en} className={base} />
          )}
        </div>
        <div>
          <div className="flex items-center gap-1.5 mb-1.5">
            <Globe size={11} className="text-[#8A7A6B]" />
            <span className="text-[9px] font-bold uppercase tracking-widest text-[#8A7A6B] f-sans">عربي</span>
          </div>
          {type === 'textarea' ? (
            <textarea rows={3} value={arVal} onChange={e => onArChange(e.target.value)}
              placeholder={placeholder?.ar} dir="rtl" className={`${base} text-right`} />
          ) : (
            <input type="text" value={arVal} onChange={e => onArChange(e.target.value)}
              placeholder={placeholder?.ar} dir="rtl" className={`${base} text-right`} />
          )}
        </div>
      </div>
    </div>
  );
};

/* ─── Section wrapper ─── */
const Section: React.FC<{ title: string; icon: React.ElementType; children: React.ReactNode }> = ({ title, icon: Icon, children }) => (
  <div className="bg-white rounded-2xl border border-[#282828]/5 shadow-sm overflow-hidden">
    <div className="px-6 py-4 border-b border-[#282828]/5 flex items-center gap-3">
      <div className="w-8 h-8 bg-[#F5F2EE] rounded-lg flex items-center justify-center">
        <Icon size={15} className="text-[#8A7A6B]" />
      </div>
      <h3 className="font-serif text-[#282828] text-base">{title}</h3>
    </div>
    <div className="p-6 space-y-5">{children}</div>
  </div>
);

/* ─── Toggle ─── */
const Toggle: React.FC<{ label: string; desc: string; value: boolean; onChange: (v: boolean) => void }> = ({ label, desc, value, onChange }) => (
  <div className="flex items-center justify-between">
    <div>
      <p className="text-sm font-bold text-[#282828] f-sans">{label}</p>
      <p className="text-xs text-[#737373] f-sans mt-0.5">{desc}</p>
    </div>
    <button
      type="button"
      onClick={() => onChange(!value)}
      className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${value ? 'bg-[#8A7A6B]' : 'bg-[#282828]/10'}`}
    >
      <motion.div
        animate={{ x: value ? 24 : 2 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
      />
    </button>
  </div>
);

/* ══════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════ */
export const ProductForm: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  /* ── Form state ── */
  const [nameEn, setNameEn]       = useState('');
  const [nameAr, setNameAr]       = useState('');
  const [category, setCategory]   = useState('office');
  const [price, setPrice]         = useState('');
  const [origPrice, setOrigPrice] = useState('');
  const [images, setImages]       = useState<string[]>(['', '', '', '']);
  const [shortEn, setShortEn]     = useState('');
  const [shortAr, setShortAr]     = useState('');
  const [descEn, setDescEn]       = useState('');
  const [descAr, setDescAr]       = useState('');
  const [matsEn, setMatsEn]       = useState('');   // comma-separated
  const [matsAr, setMatsAr]       = useState('');
  const [dimEn, setDimEn]         = useState('');
  const [dimAr, setDimAr]         = useState('');
  const [badgeEn, setBadgeEn]     = useState('');
  const [badgeAr, setBadgeAr]     = useState('');
  const [rating, setRating]       = useState('4.8');
  const [reviews, setReviews]     = useState('0');
  const [inStock, setInStock]     = useState(true);
  const [featured, setFeatured]   = useState(false);

  /* ── UI state ── */
  const [loading,  setLoading]  = useState(isEdit);
  const [saving,   setSaving]   = useState(false);
  const [errors,   setErrors]   = useState<string[]>([]);

  /* ── Load product for edit ── */
  useEffect(() => {
    if (!isEdit || !id) return;
    (async () => {
      try {
        const snap = await getDoc(doc(db, 'products', id));
        if (!snap.exists()) { navigate('/admin/products'); return; }
        const p = snap.data();
        setNameEn(p.name?.en || '');
        setNameAr(p.name?.ar || '');
        setCategory(p.category || 'office');
        setPrice(String(p.price || ''));
        setOrigPrice(p.originalPrice ? String(p.originalPrice) : '');
        setImages([
          p.images?.[0] || '', p.images?.[1] || '',
          p.images?.[2] || '', p.images?.[3] || '',
        ]);
        setShortEn(p.shortDesc?.en || '');
        setShortAr(p.shortDesc?.ar || '');
        setDescEn(p.description?.en || '');
        setDescAr(p.description?.ar || '');
        setMatsEn((p.materials?.en || []).join(', '));
        setMatsAr((p.materials?.ar || []).join(', '));
        setDimEn(p.dimensions?.en || '');
        setDimAr(p.dimensions?.ar || '');
        setBadgeEn(p.badge?.en || '');
        setBadgeAr(p.badge?.ar || '');
        setRating(String(p.rating || '4.8'));
        setReviews(String(p.reviews || '0'));
        setInStock(p.inStock !== false);
        setFeatured(Boolean(p.featured));
      } finally {
        setLoading(false);
      }
    })();
  }, [id, isEdit, navigate]);

  /* ── Validate ── */
  const validate = (): boolean => {
    const errs: string[] = [];
    if (!nameEn.trim()) errs.push('Product name (English) is required');
    if (!nameAr.trim()) errs.push('Product name (Arabic) is required');
    if (!price || isNaN(Number(price)) || Number(price) <= 0) errs.push('Valid price is required');
    if (images.filter(u => u.trim()).length === 0) errs.push('At least one product image URL is required');
    if (!shortEn.trim()) errs.push('Short description (English) is required');
    if (!descEn.trim()) errs.push('Full description (English) is required');
    setErrors(errs);
    return errs.length === 0;
  };

  /* ── Submit ── */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }

    setSaving(true);
    try {
      const data = {
        name: { en: nameEn.trim(), ar: nameAr.trim() },
        category: category.toLowerCase(),
        price: Number(price),
        originalPrice: origPrice && !isNaN(Number(origPrice)) ? Number(origPrice) : null,
        images: images.filter(u => u.trim()),
        shortDesc: { en: shortEn.trim(), ar: shortAr.trim() },
        description: { en: descEn.trim(), ar: descAr.trim() },
        materials: {
          en: matsEn.split(',').map(s => s.trim()).filter(Boolean),
          ar: matsAr.split(',').map(s => s.trim()).filter(Boolean),
        },
        dimensions: { en: dimEn.trim(), ar: dimAr.trim() },
        badge: badgeEn.trim() ? { en: badgeEn.trim(), ar: badgeAr.trim() } : null,
        rating: parseFloat(rating) || 4.8,
        reviews: parseInt(reviews) || 0,
        inStock,
        featured,
      };

      if (isEdit && id) {
        await updateDoc(doc(db, 'products', id), data);
      } else {
        const newId = generateId();
        await setDoc(doc(db, 'products', newId), data);
      }

      navigate('/admin/products');
    } catch (err) {
      console.error(err);
      setErrors(['Failed to save product. Please try again.']);
      setSaving(false);
    }
  };

  const inputCls = 'w-full bg-[#FDFCFB] border border-[#282828]/10 rounded-xl px-4 py-3 text-sm text-[#282828] focus:outline-none focus:border-[#8A7A6B] transition-colors f-sans';

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center py-48">
          <div className="w-10 h-10 rounded-full border-2 border-[#8A7A6B]/30 border-t-[#8A7A6B] animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <form onSubmit={handleSubmit}>
        <div className="p-6 md:p-10 max-w-5xl">

          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <button
              type="button"
              onClick={() => navigate('/admin/products')}
              className="w-10 h-10 bg-white rounded-xl border border-[#282828]/10 flex items-center justify-center text-[#737373] hover:text-[#282828] hover:border-[#8A7A6B] transition-all shadow-sm"
            >
              <ArrowLeft size={16} />
            </button>
            <div>
              <h1 className="font-serif text-[#282828] text-3xl">
                {isEdit ? 'Edit Product' : 'New Product'}
              </h1>
              <p className="text-[#737373] text-sm mt-0.5 f-sans">
                {isEdit ? `Editing: ${nameEn || id}` : 'Fill in the product details below'}
              </p>
            </div>
          </div>

          {/* Errors */}
          <AnimatePresence>
            {errors.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="bg-red-50 border border-red-100 rounded-2xl p-5 mb-6"
              >
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle size={16} className="text-red-500" />
                  <p className="text-sm font-bold text-red-600 f-sans">Please fix the following:</p>
                </div>
                <ul className="space-y-1">
                  {errors.map((e, i) => (
                    <li key={i} className="text-sm text-red-500 f-sans flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-red-400" /> {e}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-6">

            {/* ── Basic Info ── */}
            <Section title="Basic Information" icon={Package}>
              <BiField
                label="Product Name" required
                enVal={nameEn} arVal={nameAr}
                onEnChange={setNameEn} onArChange={setNameAr}
                placeholder={{ en: 'e.g. The Executive Desk', ar: 'مثال: المكتب التنفيذي' }}
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Category */}
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#737373] mb-2 block f-sans">
                    Category <span className="text-red-400">*</span>
                  </label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className={inputCls + ' cursor-pointer'}
                  >
                    {CATEGORIES.map(c => (
                      <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                    ))}
                  </select>
                </div>

                {/* Price */}
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#737373] mb-2 block f-sans">
                    Price (SAR) <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="number" min="0" step="1"
                    value={price} onChange={e => setPrice(e.target.value)}
                    placeholder="e.g. 4800"
                    className={inputCls}
                  />
                </div>

                {/* Original Price */}
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#737373] mb-2 block f-sans">
                    Original Price (SAR)
                  </label>
                  <input
                    type="number" min="0" step="1"
                    value={origPrice} onChange={e => setOrigPrice(e.target.value)}
                    placeholder="Optional — shows discount"
                    className={inputCls}
                  />
                </div>
              </div>

              {/* Rating / Reviews */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#737373] mb-2 block f-sans">
                    Rating (0–5)
                  </label>
                  <div className="relative">
                    <Star size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-amber-400" fill="#FBBF24" />
                    <input
                      type="number" min="0" max="5" step="0.1"
                      value={rating} onChange={e => setRating(e.target.value)}
                      className={inputCls + ' pl-9'}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#737373] mb-2 block f-sans">
                    Number of Reviews
                  </label>
                  <input
                    type="number" min="0" step="1"
                    value={reviews} onChange={e => setReviews(e.target.value)}
                    className={inputCls}
                  />
                </div>
              </div>
            </Section>

            {/* ── Images ── */}
            <Section title="Product Images" icon={ImageIcon}>
              <p className="text-xs text-[#737373] f-sans -mt-2">
                Paste image URLs (Unsplash, CDN, etc.). First image is the main display image.
              </p>
              <div className="space-y-3">
                {images.map((url, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#F5F2EE] border border-[#282828]/5 flex items-center justify-center flex-shrink-0 overflow-hidden">
                      {url.trim() ? (
                        <img src={url} alt="" className="w-full h-full object-cover" onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                      ) : (
                        <ImageIcon size={14} className="text-[#282828]/20" />
                      )}
                    </div>
                    <input
                      type="url"
                      value={url}
                      onChange={e => {
                        const arr = [...images];
                        arr[i] = e.target.value;
                        setImages(arr);
                      }}
                      placeholder={i === 0 ? 'Main image URL (required)' : `Image ${i + 1} URL (optional)`}
                      className={`${inputCls} flex-grow`}
                    />
                    {i > 0 && url.trim() && (
                      <button
                        type="button"
                        onClick={() => { const arr = [...images]; arr[i] = ''; setImages(arr); }}
                        className="w-8 h-8 rounded-lg bg-red-50 text-red-400 hover:bg-red-100 flex items-center justify-center transition-colors flex-shrink-0"
                      >
                        <Trash2 size={13} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </Section>

            {/* ── Descriptions ── */}
            <Section title="Descriptions" icon={Globe}>
              <BiField
                label="Short Description" required
                type="input"
                enVal={shortEn} arVal={shortAr}
                onEnChange={setShortEn} onArChange={setShortAr}
                placeholder={{ en: 'One-line summary for product cards', ar: 'ملخص قصير للبطاقة' }}
              />
              <BiField
                label="Full Description"
                type="textarea"
                enVal={descEn} arVal={descAr}
                onEnChange={setDescEn} onArChange={setDescAr}
                placeholder={{ en: 'Detailed description shown on product page...', ar: 'وصف تفصيلي يظهر في صفحة المنتج...' }}
              />
            </Section>

            {/* ── Details ── */}
            <Section title="Materials & Dimensions" icon={Package}>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#737373] mb-2 block f-sans">
                  Materials <span className="text-[#737373]/60 font-normal normal-case tracking-normal text-[9px]">(comma-separated)</span>
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <Globe size={11} className="text-[#8A7A6B]" />
                      <span className="text-[9px] font-bold uppercase tracking-widest text-[#8A7A6B] f-sans">English</span>
                    </div>
                    <input
                      type="text" value={matsEn} onChange={e => setMatsEn(e.target.value)}
                      placeholder="Solid Walnut, Brass Hardware, Danish Oil"
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <Globe size={11} className="text-[#8A7A6B]" />
                      <span className="text-[9px] font-bold uppercase tracking-widest text-[#8A7A6B] f-sans">عربي</span>
                    </div>
                    <input
                      type="text" value={matsAr} onChange={e => setMatsAr(e.target.value)}
                      placeholder="خشب الجوز, إكسسوارات نحاسية"
                      dir="rtl" className={`${inputCls} text-right`}
                    />
                  </div>
                </div>
              </div>

              <BiField
                label="Dimensions"
                enVal={dimEn} arVal={dimAr}
                onEnChange={setDimEn} onArChange={setDimAr}
                placeholder={{ en: '180cm × 90cm × 76cm', ar: '١٨٠سم × ٩٠سم × ٧٦سم' }}
              />
            </Section>

            {/* ── Badge ── */}
            <Section title="Badge & Status" icon={Star}>
              <BiField
                label="Badge Text (optional)"
                enVal={badgeEn} arVal={badgeAr}
                onEnChange={setBadgeEn} onArChange={setBadgeAr}
                placeholder={{ en: 'e.g. Best Seller, New, Sale', ar: 'مثال: الأكثر مبيعاً، جديد' }}
              />

              <div className="pt-2 space-y-4 border-t border-[#282828]/5">
                <Toggle
                  label="In Stock"
                  desc="Mark as available for purchase"
                  value={inStock}
                  onChange={setInStock}
                />
                <Toggle
                  label="Featured Product"
                  desc="Appears in featured sections on the store homepage"
                  value={featured}
                  onChange={setFeatured}
                />
              </div>
            </Section>

          </div>

          {/* ── Submit ── */}
          <div className="flex items-center gap-4 mt-8">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2.5 bg-[#282828] text-white px-8 py-3.5 rounded-xl text-[11px] font-bold uppercase tracking-widest hover:bg-[#8A7A6B] transition-all f-sans disabled:opacity-50"
            >
              {saving ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Save size={14} />
              )}
              {saving ? 'Saving...' : isEdit ? 'Save Changes' : 'Create Product'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/products')}
              className="px-6 py-3.5 rounded-xl border border-[#282828]/10 text-[#282828] text-[11px] font-bold uppercase tracking-widest hover:bg-[#F5F2EE] transition-colors f-sans"
            >
              Cancel
            </button>
          </div>

        </div>
      </form>
    </AdminLayout>
  );
};

export default ProductForm;
