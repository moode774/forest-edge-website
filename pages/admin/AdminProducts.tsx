import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import { AdminLayout } from './AdminLayout';
import { Plus, Pencil, Trash2, Search, Star, AlertTriangle, Package } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
export const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [search,   setSearch]   = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [toast,    setToast]    = useState('');

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'products'), snap => {
      setProducts(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    }, () => setLoading(false));
    return () => unsub();
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'products', id));
      showToast('🗑️ Product deleted');
    } catch {
      showToast('❌ Delete failed');
    } finally {
      setDeleteId(null);
    }
  };

  const filtered = products.filter(p =>
    !search ||
    p.name?.en?.toLowerCase().includes(search.toLowerCase()) ||
    p.name?.ar?.includes(search) ||
    p.category?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="p-6 md:p-10">

        {/* Toast */}
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              className="fixed top-6 right-6 z-50 bg-[#1C1C1A] text-white px-5 py-3.5 rounded-xl shadow-2xl text-sm f-sans font-medium"
            >
              {toast}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Delete Confirm Modal */}
        <AnimatePresence>
          {deleteId && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
              onClick={() => setDeleteId(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl"
                onClick={e => e.stopPropagation()}
              >
                <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-5">
                  <AlertTriangle size={20} className="text-red-500" />
                </div>
                <h3 className="font-serif text-[#282828] text-xl text-center mb-2">Delete Product?</h3>
                <p className="text-[#737373] text-sm text-center mb-7 f-sans">This action cannot be undone.</p>
                <div className="flex gap-3">
                  <button onClick={() => setDeleteId(null)} className="flex-1 py-3 rounded-xl border border-[#282828]/10 text-[#282828] text-sm font-bold f-sans hover:bg-[#F5F2EE] transition-colors">
                    Cancel
                  </button>
                  <button onClick={() => handleDelete(deleteId)} className="flex-1 py-3 rounded-xl bg-red-500 text-white text-sm font-bold f-sans hover:bg-red-600 transition-colors">
                    Delete
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-serif text-[#282828] text-3xl">Products</h1>
            <p className="text-[#737373] text-sm mt-1 f-sans">{products.length} products in database</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/admin/products/new"
              className="flex items-center gap-2 bg-[#282828] text-white px-5 py-3 rounded-xl text-[11px] font-bold uppercase tracking-widest hover:bg-[#8A7A6B] transition-all f-sans"
            >
              <Plus size={14} />
              Add Product
            </Link>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#737373]" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-11 pr-4 py-3 bg-white border border-[#282828]/10 rounded-xl text-sm text-[#282828] focus:outline-none focus:border-[#8A7A6B] transition-colors f-sans max-w-md"
          />
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-32">
            <div className="w-10 h-10 rounded-full border-2 border-[#8A7A6B]/30 border-t-[#8A7A6B] animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-2xl border border-[#282828]/5">
            <p className="font-serif text-[#282828] text-2xl mb-3">{search ? 'No results found' : 'No products yet'}</p>
            {!search && (
              <p className="text-[#737373] text-sm f-sans mb-6">
                Add your first product using the button above.
              </p>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#282828]/5 group"
              >
                {/* Image */}
                <div className="relative h-48 bg-[#F5F2EE] overflow-hidden">
                  {product.images?.[0] ? (
                    <img
                      src={product.images[0]}
                      alt={product.name?.en}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#282828]/20">
                      <Package size={32} />
                    </div>
                  )}
                  {/* Actions Overlay */}
                  <div className="absolute inset-0 bg-[#1C1C1A]/0 group-hover:bg-[#1C1C1A]/40 transition-all duration-300 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
                    <Link
                      to={`/admin/products/edit/${product.id}`}
                      className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#8A7A6B] hover:text-white transition-colors text-[#282828]"
                    >
                      <Pencil size={14} />
                    </Link>
                    <button
                      onClick={() => setDeleteId(product.id)}
                      className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-500 hover:text-white transition-colors text-[#282828]"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    {product.featured && (
                      <span className="flex items-center gap-1 bg-amber-400 text-white text-[9px] font-bold px-2 py-1 rounded-full f-sans uppercase tracking-wide">
                        <Star size={9} fill="white" /> Featured
                      </span>
                    )}
                    {!product.inStock && (
                      <span className="bg-red-500 text-white text-[9px] font-bold px-2 py-1 rounded-full f-sans uppercase tracking-wide">
                        Out of Stock
                      </span>
                    )}
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-[#8A7A6B] f-sans">{product.category}</span>
                  <h3 className="text-[#282828] font-serif text-base leading-tight mt-1 mb-2 truncate">
                    {product.name?.en || product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-[#282828] font-bold f-sans">{(product.price || 0).toLocaleString()} SAR</span>
                    <Link
                      to={`/admin/products/edit/${product.id}`}
                      className="text-[10px] font-bold uppercase tracking-widest text-[#8A7A6B] hover:text-[#282828] transition-colors f-sans flex items-center gap-1"
                    >
                      Edit <Pencil size={10} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminProducts;
