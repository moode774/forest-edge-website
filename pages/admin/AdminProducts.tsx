import React, { useState, useEffect } from 'react';
import { 
  Plus, Search, Edit2, Trash2, Globe, 
  Package, LayoutGrid, List, SlidersHorizontal, ArrowUpRight
} from 'lucide-react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../../firebase';
import { motion, AnimatePresence } from 'framer-motion';

const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'grid' | 'list'>('list');

  useEffect(() => {
    const q = query(collection(db, 'products'), orderBy('category'));
    const unsub = onSnapshot(q, snap => {
      setProducts(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });
    return () => unsub();
  }, []);

  return (
    <div className="p-8 md:p-12 space-y-12 text-start f-sans">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
         <div className="space-y-4">
            <div className="bg-ikea-blue inline-block px-4 py-1.5 skew-x-[-4deg]">
              <span className="text-white text-[11px] font-black uppercase tracking-[0.4em] skew-x-[4deg] inline-block">PRODUCTION INVENTORY</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-ikea-black tracking-tighter uppercase">Product Registry</h1>
         </div>
         <div className="flex gap-4">
            <div className="bg-ikea-gray rounded-2xl flex p-1 border border-ikea-gray">
               <button onClick={() => setView('grid')} className={`p-3 rounded-xl transition-all ${view === 'grid' ? 'bg-white shadow-md text-ikea-blue' : 'text-ikea-darkGray hover:text-ikea-blue'}`}><LayoutGrid size={20} /></button>
               <button onClick={() => setView('list')} className={`p-3 rounded-xl transition-all ${view === 'list' ? 'bg-white shadow-md text-ikea-blue' : 'text-ikea-darkGray hover:text-ikea-blue'}`}><List size={20} /></button>
            </div>
            <button className="bg-ikea-blue text-white px-10 py-5 rounded-full font-black uppercase tracking-widest hover:bg-[#00478b] transition-all flex items-center gap-4 shadow-xl shadow-ikea-blue/10">
               <Plus size={20} /> CREATE ENTRY
            </button>
         </div>
      </header>

      <div className="relative group">
         <Search size={22} className="absolute left-10 top-1/2 -translate-y-1/2 text-ikea-darkGray opacity-40 group-focus-within:opacity-100 transition-opacity" />
         <input 
            type="text" 
            placeholder="Search by ID, Name or Category..." 
            className="w-full bg-white border-4 border-ikea-gray rounded-[2.5rem] py-8 pl-24 pr-12 text-xl font-black outline-none focus:border-ikea-blue transition-all"
         />
         <div className="absolute right-10 top-1/2 -translate-y-1/2 flex items-center gap-6">
            <span className="text-[11px] font-black text-ikea-darkGray uppercase tracking-widest opacity-40">{products.length} UNITS TRACKED</span>
            <SlidersHorizontal size={24} className="text-ikea-blue cursor-pointer" />
         </div>
      </div>

      <main>
         {loading ? (
            <div className="py-40 flex justify-center"><div className="w-12 h-12 border-4 border-ikea-gray border-t-ikea-blue rounded-full animate-spin" /></div>
         ) : view === 'list' ? (
            <div className="bg-white rounded-[3.5rem] border border-ikea-gray overflow-hidden shadow-2xl">
               <table className="w-full text-start">
                  <thead className="bg-ikea-gray/30 border-b border-ikea-gray">
                     <tr className="text-[10px] font-black text-ikea-blue uppercase tracking-widest">
                        <th className="px-10 py-6">IDENTIFIER</th>
                        <th className="px-10 py-6">PRODUCT DESIGN</th>
                        <th className="px-10 py-6">CATEGORY</th>
                        <th className="px-10 py-6">UNIT VALUE</th>
                        <th className="px-10 py-6 text-center">ACTION</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-ikea-gray/50">
                     {products.map((p, i) => (
                        <tr key={p.id} className="hover:bg-ikea-gray/10 transition-colors group">
                           <td className="px-10 py-8 font-black text-sm text-ikea-blue">#{p.id.slice(0, 8).toUpperCase()}</td>
                           <td className="px-10 py-8">
                              <div className="flex items-center gap-6">
                                 <div className="w-16 h-16 bg-ikea-gray rounded-2xl overflow-hidden p-2 flex-shrink-0 group-hover:scale-110 transition-transform">
                                    <img src={p.images?.[0]} className="w-full h-full object-contain" alt="" />
                                 </div>
                                 <div>
                                    <p className="font-black text-lg uppercase tracking-tight leading-none mb-1">{p.name?.en || p.name}</p>
                                    <p className="text-[10px] font-bold text-ikea-darkGray uppercase opacity-60">Status: Deployed</p>
                                 </div>
                              </div>
                           </td>
                           <td className="px-10 py-8 text-[11px] font-black uppercase tracking-widest text-ikea-darkGray opacity-60">{p.category?.toUpperCase() || 'CORE'}</td>
                           <td className="px-10 py-8">
                              <p className="text-xl font-black text-ikea-black tracking-tighter">{p.price?.toLocaleString()} <span className="text-xs font-normal opacity-60">SAR</span></p>
                           </td>
                           <td className="px-10 py-8">
                              <div className="flex justify-center gap-3">
                                 <button className="p-4 rounded-xl hover:bg-ikea-blue hover:text-white transition-all shadow-sm"><Edit2 size={18} /></button>
                                 <button className="p-4 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm"><Trash2 size={18} /></button>
                              </div>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
               {products.map(p => (
                  <div key={p.id} className="bg-white rounded-[3rem] border border-ikea-gray p-8 shadow-sm hover:shadow-2xl transition-all group overflow-hidden relative">
                     <div className="aspect-square bg-ikea-gray rounded-3xl overflow-hidden p-6 mb-8 group-hover:scale-105 transition-transform duration-500">
                        <img src={p.images?.[0]} className="w-full h-full object-contain" alt="" />
                     </div>
                     <p className="text-[10px] font-black uppercase tracking-widest text-ikea-blue mb-4">IDENTIFIER: #{p.id.slice(0, 6)}</p>
                     <h3 className="text-xl font-black text-ikea-black uppercase tracking-tighter mb-4 leading-none">{p.name?.en || p.name}</h3>
                     <div className="flex justify-between items-end pt-4 border-t border-ikea-gray">
                        <p className="text-2xl font-black text-ikea-blue tracking-tighter">{p.price?.toLocaleString()} SAR</p>
                        <button className="p-3 bg-ikea-gray rounded-xl hover:bg-ikea-blue hover:text-white transition-all"><ArrowUpRight size={20} /></button>
                     </div>
                  </div>
               ))}
            </div>
         )}
      </main>
    </div>
  );
};

export default AdminProducts;
