import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, query, orderBy, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { AdminLayout } from './AdminLayout';
import { ChevronDown, ChevronUp, Search, Filter, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const STATUSES = ['confirmed', 'processing', 'shipped', 'delivered'] as const;
type Status = typeof STATUSES[number];

const statusColor: Record<Status, string> = {
  confirmed:  'bg-blue-50 text-blue-600 border-blue-100',
  processing: 'bg-amber-50 text-amber-600 border-amber-100',
  shipped:    'bg-purple-50 text-purple-600 border-purple-100',
  delivered:  'bg-green-50 text-green-600 border-green-100',
};

const OrderRow: React.FC<{ order: any }> = ({ order }) => {
  const [expanded, setExpanded] = useState(false);
  const [status, setStatus] = useState<Status>(order.status || 'confirmed');
  const [saving, setSaving] = useState(false);

  const handleStatusChange = async (newStatus: Status) => {
    setSaving(true);
    setStatus(newStatus);
    try {
      await updateDoc(doc(db, 'orders', order.id), { status: newStatus });
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="border-b border-[#282828]/5 last:border-0">
      {/* Row */}
      <button
        onClick={() => setExpanded(e => !e)}
        className="w-full flex items-center gap-4 px-6 py-4 hover:bg-[#FDFCFB] transition-colors text-left"
      >
        <span className="text-xs font-bold text-[#282828] f-sans w-28 flex-shrink-0 tracking-wide">{order.id}</span>
        <span className="text-sm text-[#282828] f-sans flex-grow min-w-0 truncate">{order.customer?.name || '—'}</span>
        <span className="text-sm font-bold text-[#282828] f-sans w-32 flex-shrink-0 text-right">{(order.total || 0).toLocaleString()} SAR</span>
        <span className={`text-[9px] font-bold uppercase tracking-widest px-2.5 py-1.5 rounded-full border f-sans flex-shrink-0 ${statusColor[status]}`}>
          {status}
        </span>
        <span className="text-xs text-[#737373] f-sans w-24 flex-shrink-0 text-right hidden md:block">
          {new Date(order.date).toLocaleDateString('en-SA')}
        </span>
        <span className="text-[#737373] flex-shrink-0">
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </span>
      </button>

      {/* Expanded Detail */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

              {/* Change Status */}
              <div className="bg-[#F5F2EE] rounded-2xl p-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#282828] mb-4 f-sans">Update Status</p>
                <div className="space-y-2">
                  {STATUSES.map(s => (
                    <button
                      key={s}
                      onClick={() => handleStatusChange(s)}
                      disabled={saving}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border-2 transition-all text-[11px] font-bold uppercase tracking-widest f-sans ${
                        status === s
                          ? `${statusColor[s]} border-current`
                          : 'border-transparent text-[#737373] hover:bg-white'
                      }`}
                    >
                      {s}
                      {status === s && <div className="w-2 h-2 rounded-full bg-current" />}
                    </button>
                  ))}
                </div>
                {saving && (
                  <div className="flex items-center gap-2 mt-3 text-[#8A7A6B] text-xs f-sans">
                    <RefreshCw size={12} className="animate-spin" /> Saving...
                  </div>
                )}
              </div>

              {/* Customer Info */}
              <div className="bg-[#F5F2EE] rounded-2xl p-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#282828] mb-4 f-sans">Customer</p>
                <div className="space-y-2 text-sm f-sans text-[#737373]">
                  <p><span className="text-[#282828] font-bold">Name:</span> {order.customer?.name}</p>
                  <p><span className="text-[#282828] font-bold">Phone:</span> {order.customer?.phone}</p>
                  {order.customer?.email && <p><span className="text-[#282828] font-bold">Email:</span> {order.customer?.email}</p>}
                  <p><span className="text-[#282828] font-bold">City:</span> {order.customer?.city}</p>
                  <p><span className="text-[#282828] font-bold">Address:</span> {order.customer?.address}</p>
                  {order.customer?.notes && <p><span className="text-[#282828] font-bold">Notes:</span> {order.customer?.notes}</p>}
                </div>
              </div>

              {/* Items + Total */}
              <div className="bg-[#F5F2EE] rounded-2xl p-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#282828] mb-4 f-sans">Items</p>
                <div className="space-y-3">
                  {(order.items || []).map((item: any, i: number) => (
                    <div key={i} className="flex items-center gap-3">
                      {item.product?.images?.[0] && (
                        <img src={item.product.images[0]} alt="" className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                      )}
                      <div className="min-w-0 flex-grow">
                        <p className="text-xs font-bold text-[#282828] truncate f-sans">
                          {item.product?.name?.en || item.product?.name || '—'}
                        </p>
                        <p className="text-[10px] text-[#737373] f-sans">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-xs font-bold text-[#282828] f-sans flex-shrink-0">
                        {((item.product?.price || 0) * item.quantity).toLocaleString()} SAR
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-[#282828]/10 space-y-1 text-xs f-sans text-[#737373]">
                  <div className="flex justify-between"><span>Subtotal</span><span>{(order.subtotal || 0).toLocaleString()} SAR</span></div>
                  <div className="flex justify-between"><span>Delivery</span><span>{order.delivery === 0 ? 'Free' : `${order.delivery} SAR`}</span></div>
                  <div className="flex justify-between text-[#282828] font-bold text-sm pt-1 border-t border-[#282828]/10">
                    <span>Total</span><span>{(order.total || 0).toLocaleString()} SAR</span>
                  </div>
                  <div className="flex justify-between pt-1"><span>Payment</span><span className="uppercase font-bold">{order.paymentMethod}</span></div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const AdminOrders: React.FC = () => {
  const [orders,  setOrders]  = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search,  setSearch]  = useState('');
  const [filter,  setFilter]  = useState<Status | 'all'>('all');

  useEffect(() => {
    const unsub = onSnapshot(
      query(collection(db, 'orders'), orderBy('date', 'desc')),
      snap => { setOrders(snap.docs.map(d => ({ id: d.id, ...d.data() }))); setLoading(false); },
      () => setLoading(false)
    );
    return () => unsub();
  }, []);

  const filtered = orders.filter(o => {
    const matchSearch = !search || o.id.toLowerCase().includes(search.toLowerCase()) || o.customer?.name?.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || o.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <AdminLayout>
      <div className="p-6 md:p-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-serif text-[#282828] text-3xl">Orders</h1>
            <p className="text-[#737373] text-sm mt-1 f-sans">{orders.length} total orders</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#737373]" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by order ID or customer name..."
              className="w-full pl-11 pr-4 py-3 bg-white border border-[#282828]/10 rounded-xl text-sm text-[#282828] focus:outline-none focus:border-[#8A7A6B] transition-colors f-sans"
            />
          </div>
          <div className="flex items-center gap-2 bg-white border border-[#282828]/10 rounded-xl px-4 py-3">
            <Filter size={14} className="text-[#737373]" />
            <select
              value={filter}
              onChange={e => setFilter(e.target.value as any)}
              className="bg-transparent text-sm text-[#282828] focus:outline-none f-sans cursor-pointer"
            >
              <option value="all">All Statuses</option>
              {STATUSES.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#282828]/5 overflow-hidden">
          {/* Table Header */}
          <div className="hidden md:flex items-center gap-4 px-6 py-4 border-b border-[#282828]/5 bg-[#FDFCFB]">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#737373] f-sans w-28">Order ID</span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#737373] f-sans flex-grow">Customer</span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#737373] f-sans w-32 text-right">Total</span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#737373] f-sans w-24">Status</span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#737373] f-sans w-24 text-right hidden md:block">Date</span>
            <span className="w-4" />
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-24">
              <div className="w-8 h-8 rounded-full border-2 border-[#8A7A6B]/30 border-t-[#8A7A6B] animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-[#737373] font-serif text-xl">{search || filter !== 'all' ? 'No matching orders' : 'No orders yet'}</p>
            </div>
          ) : (
            filtered.map(order => <OrderRow key={order.id} order={order} />)
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminOrders;
