import React, { useState } from 'react';
import { 
  X, Upload, Image as ImageIcon, Save, 
  Trash2, Plus, ArrowRight, ShieldCheck, Box
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductFormProps {
  product?: any;
  onClose: () => void;
  onSave: (data: any) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onClose, onSave }) => {
  const [formData, setFormData] = useState(product || {
    name: { en: '', ar: '' },
    description: { en: '', ar: '' },
    price: 0,
    category: 'tables',
    images: [],
    featured: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-ikea-black/80 backdrop-blur-xl flex justify-end"
    >
      <motion.div 
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        className="w-full max-w-4xl bg-white h-full overflow-y-auto p-12 f-sans"
      >
        <header className="flex justify-between items-center mb-16">
           <div>
              <div className="bg-ikea-blue inline-block px-4 py-1.5 skew-x-[-4deg] mb-4">
                 <span className="text-white text-[10px] font-black uppercase tracking-[0.4em] skew-x-[4deg] inline-block">SPECIFICATION ENTRY</span>
              </div>
              <h2 className="text-4xl font-black text-ikea-black tracking-tighter uppercase">{product ? 'Modify Deployment' : 'New Unit Entry'}</h2>
           </div>
           <button onClick={onClose} className="p-4 hover:bg-ikea-gray rounded-full transition-all text-ikea-darkGray"><X size={32} /></button>
        </header>

        <form onSubmit={handleSubmit} className="space-y-12 text-start">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-4">
                 <label className="text-[10px] font-black text-ikea-darkGray uppercase tracking-widest ml-4">Product Name (EN)</label>
                 <input 
                    type="text" 
                    value={formData.name.en}
                    onChange={e => setFormData({ ...formData, name: { ...formData.name, en: e.target.value }})}
                    className="w-full bg-ikea-gray py-6 px-10 rounded-2xl outline-none font-black"
                 />
              </div>
              <div className="space-y-4">
                 <label className="text-[10px] font-black text-ikea-darkGray uppercase tracking-widest ml-4">الإسم بالعربي (AR)</label>
                 <input 
                    type="text" 
                    dir="rtl"
                    value={formData.name.ar}
                    onChange={e => setFormData({ ...formData, name: { ...formData.name, ar: e.target.value }})}
                    className="w-full bg-ikea-gray py-6 px-10 rounded-2xl outline-none font-black f-sans"
                 />
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-4">
                 <label className="text-[10px] font-black text-ikea-darkGray uppercase tracking-widest ml-4">Unit Value (SAR)</label>
                 <input 
                    type="number" 
                    value={formData.price}
                    onChange={e => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full bg-ikea-gray py-6 px-10 rounded-2xl outline-none font-black text-ikea-blue text-2xl"
                 />
              </div>
              <div className="space-y-4">
                 <label className="text-[10px] font-black text-ikea-darkGray uppercase tracking-widest ml-4">Category Classification</label>
                 <select 
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-ikea-gray py-6 px-10 rounded-2xl outline-none font-black appearance-none"
                 >
                    <option value="tables">TABLES</option>
                    <option value="chairs">CHAIRS</option>
                    <option value="storage">STORAGE</option>
                    <option value="office">OFFICE</option>
                 </select>
              </div>
           </div>

           <div className="space-y-10">
              <label className="text-[10px] font-black text-ikea-darkGray uppercase tracking-widest ml-4">Visual Assets</label>
              <div className="grid grid-cols-4 gap-6">
                 {formData.images.map((img: string, i: number) => (
                    <div key={i} className="aspect-square bg-ikea-gray rounded-2xl overflow-hidden relative group">
                       <img src={img} className="w-full h-full object-cover" alt="" />
                       <button className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={14} /></button>
                    </div>
                 ))}
                 <button type="button" className="aspect-square border-4 border-dashed border-ikea-gray rounded-2xl flex flex-col items-center justify-center gap-4 text-ikea-darkGray hover:border-ikea-blue hover:text-ikea-blue transition-all group">
                    <Plus size={32} className="group-hover:scale-110 transition-transform" />
                    <span className="text-[9px] font-black uppercase tracking-widest">ADD MEDIA</span>
                 </button>
              </div>
           </div>

           <div className="pt-12 border-t border-ikea-gray flex gap-6">
              <button type="button" onClick={onClose} className="px-12 py-6 rounded-full font-black uppercase text-ikea-darkGray hover:bg-ikea-gray transition-all">Cancel</button>
              <button type="submit" className="flex-1 bg-ikea-blue text-white py-6 rounded-full font-black uppercase tracking-widest hover:bg-[#00478b] transition-all flex items-center justify-center gap-4 shadow-xl">
                 <ShieldCheck size={20} /> AUTHORIZE CHANGES
              </button>
           </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default ProductForm;
