import React, { useState, useEffect } from 'react';
import { 
  Search, Eye, Printer, Truck, CheckCircle2, 
  MapPin, Phone, User, Calendar, SlidersHorizontal, ArrowUpRight
} from 'lucide-react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../../firebase';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const statusConfig = {
  confirmed: { color: '#3B82F6', text: 'CONFIRMED', bg: 'rgba(59, 130, 246, 0.1)' },
  processing: { color: '#F59E0B', text: 'PROCESSING', bg: 'rgba(245, 158, 11, 0.1)' },
  shipped: { color: '#8B5CF6', text: 'SHIPPED', bg: 'rgba(139, 92, 246, 0.1)' },
  delivered: { color: '#10B981', text: 'DELIVERED', bg: 'rgba(16, 185, 129, 0.1)' },
};

const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'orders'), orderBy('date', 'desc'));
    const unsub = onSnapshot(q, snap => {
      setOrders(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });
    return () => unsub();
  }, []);

  return (
    <div className="p-8 md:p-12 space-y-12 text-start f-sans">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
         <div className="space-y-4">
            <div className="bg-ikea-yellow inline-block px-4 py-1.5 skew-x-[-4deg]">
              <span className="text-ikea-blue text-[11px] font-black uppercase tracking-[0.4em] skew-x-[4deg] inline-block">DEPLOYMENT LOGISTICS</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-ikea-black tracking-tighter uppercase">Order Command</h1>
         </div>
         <div className="bg-ikea-gray px-6 py-4 rounded-2xl border border-ikea-gray flex items-center gap-4">
            <Calendar size={18} className="text-ikea-blue" />
            <span className="text-[11px] font-black uppercase tracking-widest text-ikea-darkGray">Operational Queue: {orders.length} ACTIVE</span>
         </div>
      </header>

      <div className="relative group">
         <Search size={22} className="absolute left-10 top-1/2 -translate-y-1/2 text-ikea-darkGray opacity-40" />
         <input 
            type="text" 
            placeholder="Filter by Order ID, Customer, or Status..." 
            className="w-full bg-white border-4 border-ikea-gray rounded-[2.5rem] py-8 pl-24 pr-12 text-xl font-black outline-none focus:border-ikea-blue transition-all"
         />
      </div>

      <main>
         {loading ? (
            <div className="py-40 flex justify-center"><div className="w-12 h-12 border-4 border-ikea-gray border-t-ikea-blue rounded-full animate-spin" /></div>
         ) : (
            <div className="bg-white rounded-[3.5rem] border border-ikea-gray overflow-hidden shadow-2xl">
               <table className="w-full text-start">
                  <thead className="bg-ikea-gray/30 border-b border-ikea-gray">
                     <tr className="text-[10px] font-black text-ikea-blue uppercase tracking-widest">
                        <th className="px-10 py-6">ORD-IDENTIFIER</th>
                        <th className="px-10 py-6">RECIPIENT</th>
                        <th className="px-10 py-6">LOGISTICS STATUS</th>
                        <th className="px-10 py-6">TOTAL VALUE</th>
                        <th className="px-10 py-6 text-center">COMMAND</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-ikea-gray/50">
                     {orders.map((o) => {
                        const s = (statusConfig as any)[o.status || 'confirmed'] || statusConfig.confirmed;
                        return (
                           <tr key={o.id} className="hover:bg-ikea-gray/10 transition-colors group">
                              <td className="px-10 py-8">
                                 <p className="font-black text-sm text-ikea-blue flex items-center gap-2">#{o.id.toUpperCase()} <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" /></p>
                                 <p className="text-[10px] font-bold text-ikea-darkGray opacity-60 mt-1 uppercase">Captured: {new Date(o.date).toLocaleDateString()}</p>
                              </td>
                              <td className="px-10 py-8">
                                 <div className="space-y-1">
                                    <p className="font-black text-sm uppercase tracking-tight">{o.customer?.name}</p>
                                    <div className="flex items-center gap-4 text-xs font-bold text-ikea-darkGray opacity-60">
                                       <span className="flex items-center gap-1"><MapPin size={10} /> {o.customer?.city}</span>
                                       <span className="flex items-center gap-1"><Phone size={10} /> {o.customer?.phone}</span>
                                    </div>
                                 </div>
                              </td>
                              <td className="px-10 py-8">
                                 <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-current" style={{ color: s.color, backgroundColor: s.bg }}>
                                    <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
                                    <span className="text-[10px] font-black uppercase tracking-widest">{s.text}</span>
                                 </div>
                              </td>
                              <td className="px-10 py-8">
                                 <p className="text-xl font-black text-ikea-black tracking-tighter">{o.total?.toLocaleString()} <span className="text-xs font-normal opacity-60">SAR</span></p>
                              </td>
                              <td className="px-10 py-8">
                                 <div className="flex justify-center gap-3">
                                    <Link to={`/admin/invoice/${o.id}`} className="p-4 rounded-xl bg-ikea-gray hover:bg-ikea-blue hover:text-white transition-all shadow-sm"><Eye size={18} /></Link>
                                    <button onClick={() => window.print()} className="p-4 rounded-xl bg-ikea-gray hover:bg-ikea-black hover:text-white transition-all shadow-sm"><Printer size={18} /></button>
                                 </div>
                              </td>
                           </tr>
                        );
                     })}
                  </tbody>
               </table>
            </div>
         )}
      </main>
    </div>
  );
};

export default AdminOrders;
