import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../../firebase';
import { AdminLayout } from './AdminLayout';
import {
  ShoppingBag, Package, DollarSign, Clock,
  TrendingUp, ArrowRight, CheckCircle2, Truck
} from 'lucide-react';
import { motion } from 'framer-motion';

const statusColor: Record<string, string> = {
  confirmed:  'bg-blue-50 text-blue-600 border-blue-100',
  processing: 'bg-amber-50 text-amber-600 border-amber-100',
  shipped:    'bg-purple-50 text-purple-600 border-purple-100',
  delivered:  'bg-green-50 text-green-600 border-green-100',
};

export const Dashboard: React.FC = () => {
  const [orders,   setOrders]   = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    const unsubOrders = onSnapshot(
      query(collection(db, 'orders'), orderBy('date', 'desc')),
      snap => { setOrders(snap.docs.map(d => ({ id: d.id, ...d.data() }))); setLoading(false); },
      () => setLoading(false)
    );
    const unsubProducts = onSnapshot(
      collection(db, 'products'),
      snap => setProducts(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    );
    return () => { unsubOrders(); unsubProducts(); };
  }, []);

  const totalRevenue   = orders.reduce((s, o) => s + (o.total || 0), 0);
  const pendingOrders  = orders.filter(o => o.status !== 'delivered').length;
  const deliveredCount = orders.filter(o => o.status === 'delivered').length;

  const stats = [
    { label: 'Total Orders',  value: orders.length,                  icon: ShoppingBag,  color: 'bg-blue-50',   iconColor: 'text-blue-500'   },
    { label: 'Total Revenue', value: `${totalRevenue.toLocaleString()} SAR`, icon: DollarSign, color: 'bg-green-50',  iconColor: 'text-green-500'  },
    { label: 'Products',      value: products.length,                icon: Package,      color: 'bg-purple-50', iconColor: 'text-purple-500' },
    { label: 'Pending',       value: pendingOrders,                  icon: Clock,        color: 'bg-amber-50',  iconColor: 'text-amber-500'  },
  ];

  return (
    <AdminLayout>
      <div className="p-6 md:p-10 max-w-[1400px]">

        {/* Header */}
        <div className="mb-10">
          <h1 className="font-serif text-[#282828] text-3xl md:text-4xl">Dashboard</h1>
          <p className="text-[#737373] text-sm mt-1 f-sans">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-40">
            <div className="w-10 h-10 rounded-full border-2 border-[#8A7A6B]/30 border-t-[#8A7A6B] animate-spin" />
          </div>
        ) : (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
              {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 }}
                    className="bg-white rounded-2xl p-6 shadow-sm border border-[#282828]/5"
                  >
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 ${stat.color}`}>
                      <Icon size={20} className={stat.iconColor} />
                    </div>
                    <p className="text-2xl font-bold text-[#282828] font-serif">{stat.value}</p>
                    <p className="text-[10px] text-[#737373] uppercase tracking-[0.2em] font-bold mt-1 f-sans">{stat.label}</p>
                  </motion.div>
                );
              })}
            </div>

            {/* Two Columns */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

              {/* Recent Orders Table */}
              <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-[#282828]/5 overflow-hidden">
                <div className="px-6 py-5 border-b border-[#282828]/5 flex items-center justify-between">
                  <h2 className="font-serif text-[#282828] text-xl">Recent Orders</h2>
                  <Link to="/admin/orders" className="flex items-center gap-1 text-[#8A7A6B] text-[10px] font-bold uppercase tracking-widest hover:text-[#282828] transition-colors f-sans">
                    View All <ArrowRight size={12} />
                  </Link>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#282828]/5">
                        {['Order ID','Customer','Total','Status'].map(h => (
                          <th key={h} className="px-5 py-3.5 text-left text-[10px] font-bold uppercase tracking-[0.15em] text-[#737373] f-sans">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {orders.slice(0, 7).map((order) => (
                        <tr key={order.id} className="border-b border-[#282828]/3 hover:bg-[#FDFCFB] transition-colors">
                          <td className="px-5 py-4 text-xs font-bold text-[#282828] f-sans tracking-wide">{order.id}</td>
                          <td className="px-5 py-4 text-sm text-[#282828] f-sans">{order.customer?.name || '—'}</td>
                          <td className="px-5 py-4 text-sm font-bold text-[#282828] f-sans">{(order.total || 0).toLocaleString()} SAR</td>
                          <td className="px-5 py-4">
                            <span className={`text-[9px] font-bold uppercase tracking-widest px-2.5 py-1.5 rounded-full border f-sans ${statusColor[order.status] || statusColor.confirmed}`}>
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {orders.length === 0 && (
                    <div className="text-center py-16">
                      <ShoppingBag size={28} className="mx-auto mb-3 text-[#282828]/10" />
                      <p className="text-[#737373] text-sm f-sans">No orders yet</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Right: Summary Cards */}
              <div className="space-y-5">
                {/* Order Status Summary */}
                <div className="bg-white rounded-2xl shadow-sm border border-[#282828]/5 p-6">
                  <h3 className="font-serif text-[#282828] text-lg mb-5">Order Status</h3>
                  <div className="space-y-3">
                    {[
                      { label: 'Confirmed',  count: orders.filter(o=>o.status==='confirmed').length,  icon: CheckCircle2, color: 'text-blue-500'   },
                      { label: 'Processing', count: orders.filter(o=>o.status==='processing').length, icon: Clock,        color: 'text-amber-500'  },
                      { label: 'Shipped',    count: orders.filter(o=>o.status==='shipped').length,    icon: Truck,        color: 'text-purple-500' },
                      { label: 'Delivered',  count: deliveredCount,                                   icon: CheckCircle2, color: 'text-green-500'  },
                    ].map((s, i) => {
                      const Icon = s.icon;
                      const pct = orders.length ? Math.round((s.count / orders.length) * 100) : 0;
                      return (
                        <div key={i}>
                          <div className="flex items-center justify-between mb-1.5">
                            <div className="flex items-center gap-2">
                              <Icon size={14} className={s.color} />
                              <span className="text-xs text-[#282828] font-bold f-sans">{s.label}</span>
                            </div>
                            <span className="text-xs text-[#737373] f-sans">{s.count}</span>
                          </div>
                          <div className="h-1.5 bg-[#F5F2EE] rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }} animate={{ width: `${pct}%` }}
                              transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
                              className="h-full bg-[#8A7A6B] rounded-full"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Quick Links */}
                <div className="bg-[#1C1C1A] rounded-2xl p-6 text-white">
                  <h3 className="font-serif text-white text-lg mb-5">Quick Actions</h3>
                  <div className="space-y-3">
                    <Link to="/admin/products/new" className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group">
                      <div className="flex items-center gap-3">
                        <Package size={16} className="text-[#8A7A6B]" />
                        <span className="text-[11px] font-bold uppercase tracking-widest f-sans">Add Product</span>
                      </div>
                      <ArrowRight size={14} className="text-white/30 group-hover:text-white/60 transition-colors" />
                    </Link>
                    <Link to="/admin/orders" className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group">
                      <div className="flex items-center gap-3">
                        <ShoppingBag size={16} className="text-[#8A7A6B]" />
                        <span className="text-[11px] font-bold uppercase tracking-widest f-sans">Manage Orders</span>
                      </div>
                      <ArrowRight size={14} className="text-white/30 group-hover:text-white/60 transition-colors" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
