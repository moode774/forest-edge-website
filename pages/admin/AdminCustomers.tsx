import React, { useState, useEffect } from 'react';
import { 
  Users, Search, Mail, Phone, MapPin, 
  History, Star, ChevronRight, SlidersHorizontal, ArrowUpRight
} from 'lucide-react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../../firebase';
import { motion, AnimatePresence } from 'framer-motion';

const AdminCustomers: React.FC = () => {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'orders'), orderBy('date', 'desc'));
    const unsub = onSnapshot(q, snap => {
      // Aggregate customers from orders (simplified for demo)
      const custMap = new Map();
      snap.docs.forEach(d => {
        const data = d.data();
        if (data.customer?.phone) {
          const c = data.customer;
          if (!custMap.has(c.phone)) {
            custMap.set(c.phone, { ...c, totalSpent: 0, orderCount: 0 });
          }
          const curr = custMap.get(c.phone);
          curr.totalSpent += data.total || 0;
          curr.orderCount += 1;
        }
      });
      setCustomers(Array.from(custMap.values()));
      setLoading(false);
    });
    return () => unsub();
  }, []);

  return (
    <div className="p-8 md:p-12 space-y-12 text-start f-sans">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
         <div className="space-y-4">
            <div className="bg-ikea-blue inline-block px-4 py-1.5 skew-x-[-4deg]">
              <span className="text-white text-[11px] font-black uppercase tracking-[0.4em] skew-x-[4deg] inline-block">HUMAN CAPITAL RELATIONS</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-ikea-black tracking-tighter uppercase">Customer Directory</h1>
         </div>
         <div className="bg-ikea-gray px-6 py-4 rounded-2xl border border-ikea-gray flex items-center gap-4">
            <Users size={18} className="text-ikea-blue" />
            <span className="text-[11px] font-black uppercase tracking-widest text-ikea-darkGray">Archive: {customers.length} RECORDS</span>
         </div>
      </header>

      <div className="relative group">
         <Search size={22} className="absolute left-10 top-1/2 -translate-y-1/2 text-ikea-darkGray opacity-40" />
         <input 
            type="text" 
            placeholder="Search by Name, Contact, or Location..." 
            className="w-full bg-white border-4 border-ikea-gray rounded-[2.5rem] py-8 pl-24 pr-12 text-xl font-black outline-none focus:border-ikea-blue transition-all"
         />
      </div>

      <main>
         {loading ? (
            <div className="py-40 flex justify-center"><div className="w-12 h-12 border-4 border-ikea-gray border-t-ikea-blue rounded-full animate-spin" /></div>
         ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {customers.map((c, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-[3rem] border border-ikea-gray p-10 shadow-sm hover:shadow-2xl transition-all group relative overflow-hidden"
                  >
                     <div className="absolute top-0 right-0 p-8 opacity-5 text-ikea-blue group-hover:scale-125 transition-transform"><Users size={120} /></div>
                     <div className="flex items-center gap-6 mb-10 relative z-10">
                        <div className="w-16 h-16 bg-ikea-gray rounded-2xl flex items-center justify-center text-ikea-blue text-2xl font-black shadow-sm group-hover:bg-ikea-blue group-hover:text-white transition-colors">{c.name?.[0]}</div>
                        <div>
                           <h3 className="text-2xl font-black text-ikea-black uppercase tracking-tighter leading-none mb-1">{c.name}</h3>
                           <p className="text-[10px] font-bold text-ikea-darkGray opacity-60 uppercase">{c.city}, KSA</p>
                        </div>
                     </div>
                     <div className="space-y-4 mb-10 relative z-10">
                        <div className="flex items-center gap-4 text-sm font-bold text-ikea-darkGray"><Phone size={16} /> {c.phone}</div>
                        {c.email && <div className="flex items-center gap-4 text-sm font-bold text-ikea-darkGray"><Mail size={16} /> {c.email}</div>}
                        <div className="flex items-center gap-4 text-sm font-bold text-ikea-darkGray"><MapPin size={16} /> {c.address}</div>
                     </div>
                     <div className="grid grid-cols-2 gap-4 pt-8 border-t border-ikea-gray relative z-10">
                        <div className="bg-ikea-gray/30 p-4 rounded-xl">
                           <p className="text-[9px] font-black uppercase tracking-widest opacity-40 mb-1">Total Deployments</p>
                           <p className="font-black text-xl">{c.orderCount} UNITS</p>
                        </div>
                        <div className="bg-ikea-gray/30 p-4 rounded-xl">
                           <p className="text-[9px] font-black uppercase tracking-widest opacity-40 mb-1">Total Value</p>
                           <p className="font-black text-xl">{c.totalSpent.toLocaleString()} <span className="text-[10px]">SAR</span></p>
                        </div>
                     </div>
                  </motion.div>
               ))}
            </div>
         )}
      </main>
    </div>
  );
};

export default AdminCustomers;
