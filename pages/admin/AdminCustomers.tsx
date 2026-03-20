import React, { useState, useEffect } from 'react';
import { AdminLayout } from './AdminLayout';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, Building2, User, Search, ChevronDown, ChevronUp,
  Phone, Mail, MapPin, Package, TrendingUp, Calendar,
  Receipt
} from 'lucide-react';
import { Customer } from '../../store/types/storeTypes';

export const AdminCustomers: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'individual' | 'company'>('all');
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'customers'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, snap => {
      setCustomers(snap.docs.map(d => ({ id: d.id, ...d.data() } as Customer)));
      setLoading(false);
    }, (err) => {
      console.error('Firestore customers error:', err.code, err.message);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const filtered = customers.filter(c => {
    if (filter !== 'all' && c.type !== filter) return false;
    if (!search) return true;
    const s = search.toLowerCase();
    return (
      c.name?.toLowerCase().includes(s) ||
      c.email?.toLowerCase().includes(s) ||
      c.phone?.includes(s) ||
      c.companyName?.toLowerCase().includes(s) ||
      c.city?.toLowerCase().includes(s)
    );
  });

  const stats = {
    total: customers.length,
    companies: customers.filter(c => c.type === 'company').length,
    individuals: customers.filter(c => c.type === 'individual').length,
    totalRevenue: customers.reduce((s, c) => s + (c.totalSpent || 0), 0),
  };

  return (
    <AdminLayout>
      <div className="p-6 lg:p-10 space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-serif text-[#282828]">Customers</h1>
          <p className="text-[#737373] text-sm f-sans mt-1">
            {customers.length} registered customers · live sync
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Customers', value: stats.total, icon: Users, color: 'text-blue-500 bg-blue-50' },
            { label: 'Companies', value: stats.companies, icon: Building2, color: 'text-purple-500 bg-purple-50' },
            { label: 'Individuals', value: stats.individuals, icon: User, color: 'text-green-500 bg-green-50' },
            {
              label: 'Total Revenue',
              value: `${stats.totalRevenue.toLocaleString()} SAR`,
              icon: TrendingUp,
              color: 'text-[#8A7A6B] bg-[#8A7A6B]/10',
            },
          ].map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="bg-white rounded-2xl p-5 border border-[#282828]/5 shadow-sm">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color}`}>
                  <Icon size={18} />
                </div>
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#737373] mb-1 f-sans">{s.label}</p>
                <p className="text-2xl font-serif text-[#282828]">{s.value}</p>
              </div>
            );
          })}
        </div>

        {/* Filters + Search */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#737373]" />
            <input
              type="text"
              placeholder="Search by name, email, phone, company..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#282828]/10 bg-white text-sm text-[#282828] focus:outline-none focus:border-[#8A7A6B] f-sans"
            />
          </div>
          <div className="flex gap-2 flex-shrink-0">
            {(['all', 'individual', 'company'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-3 rounded-xl text-[11px] font-bold uppercase tracking-widest f-sans transition-all whitespace-nowrap ${
                  filter === f
                    ? 'bg-[#282828] text-white'
                    : 'bg-white border border-[#282828]/10 text-[#737373] hover:text-[#282828]'
                }`}
              >
                {f === 'all' ? 'All' : f === 'individual' ? 'Individuals' : 'Companies'}
              </button>
            ))}
          </div>
        </div>

        {/* Customer List */}
        {loading ? (
          <div className="flex items-center justify-center py-32">
            <div className="w-8 h-8 rounded-full border-2 border-[#8A7A6B]/30 border-t-[#8A7A6B] animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-[#737373] f-sans">
            <Users size={40} className="mx-auto mb-4 opacity-20" />
            <p className="text-sm">No customers found</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map(customer => (
              <motion.div
                key={customer.id}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl border border-[#282828]/5 shadow-sm overflow-hidden"
              >
                {/* Row */}
                <button
                  onClick={() => setExpanded(expanded === customer.id ? null : customer.id)}
                  className="w-full flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 md:p-6 text-left hover:bg-[#FDFCFB] transition-colors"
                >
                  <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <div className={`w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 ${
                      customer.type === 'company'
                        ? 'bg-purple-50 text-purple-600'
                        : 'bg-blue-50 text-blue-600'
                    }`}>
                      {customer.type === 'company' ? <Building2 size={18} /> : <User size={18} />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-[#282828] f-sans text-sm">{customer.name}</span>
                        {customer.type === 'company' && (
                          <span className="text-[9px] font-bold uppercase tracking-widest bg-purple-50 text-purple-600 px-2 py-0.5 rounded-full">
                            Company
                          </span>
                        )}
                      </div>
                      {customer.companyName && (
                        <p className="text-xs text-[#8A7A6B] f-sans font-medium mt-0.5">{customer.companyName}</p>
                      )}
                      <p className="text-xs text-[#737373] f-sans mt-0.5">{customer.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 flex-wrap">
                    <div className="text-center">
                      <p className="text-[9px] text-[#737373] font-bold uppercase tracking-widest f-sans">Orders</p>
                      <p className="text-[#282828] font-serif text-xl">{customer.totalOrders || 0}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[9px] text-[#737373] font-bold uppercase tracking-widest f-sans">Total Spent</p>
                      <p className="text-[#282828] font-serif text-xl">
                        {(customer.totalSpent || 0).toLocaleString()}
                        <span className="text-xs text-[#8A7A6B] ml-1">SAR</span>
                      </p>
                    </div>
                    <div className="text-center hidden md:block">
                      <p className="text-[9px] text-[#737373] font-bold uppercase tracking-widest f-sans">City</p>
                      <p className="text-[#282828] text-sm font-bold f-sans">{customer.city || '—'}</p>
                    </div>
                    <div className="text-[#737373]">
                      {expanded === customer.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                  </div>
                </button>

                {/* Expanded details */}
                <AnimatePresence>
                  {expanded === customer.id && (
                    <motion.div
                      key="expanded"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-[#282828]/5 p-5 md:p-6 grid grid-cols-1 md:grid-cols-3 gap-6">

                        {/* Contact */}
                        <div className="space-y-3">
                          <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#737373] f-sans">Contact</p>
                          <div className="space-y-2">
                            <div className="flex items-center gap-3 text-sm text-[#282828] f-sans">
                              <Phone size={14} className="text-[#8A7A6B] flex-shrink-0" />
                              {customer.phone || '—'}
                            </div>
                            <div className="flex items-center gap-3 text-sm text-[#282828] f-sans break-all">
                              <Mail size={14} className="text-[#8A7A6B] flex-shrink-0" />
                              {customer.email || '—'}
                            </div>
                            {customer.city && (
                              <div className="flex items-center gap-3 text-sm text-[#282828] f-sans">
                                <MapPin size={14} className="text-[#8A7A6B] flex-shrink-0" />
                                {customer.address ? `${customer.address}, ` : ''}{customer.city}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Company details */}
                        {customer.type === 'company' ? (
                          <div className="space-y-3">
                            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#737373] f-sans">Company Details</p>
                            <div className="space-y-2 f-sans text-sm">
                              <div className="flex items-start gap-3">
                                <Building2 size={14} className="text-[#8A7A6B] flex-shrink-0 mt-0.5" />
                                <div>
                                  <p className="text-[#737373] text-[10px] uppercase tracking-widest font-bold">Company Name</p>
                                  <p className="text-[#282828]">{customer.companyName || '—'}</p>
                                </div>
                              </div>
                              <div className="flex items-start gap-3">
                                <Receipt size={14} className="text-[#8A7A6B] flex-shrink-0 mt-0.5" />
                                <div>
                                  <p className="text-[#737373] text-[10px] uppercase tracking-widest font-bold">VAT Number</p>
                                  <p className="text-[#282828]">{customer.vatNumber || '—'}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#737373] f-sans">Customer Type</p>
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                                <User size={14} />
                              </div>
                              <span className="text-sm text-[#282828] f-sans font-bold">Individual</span>
                            </div>
                          </div>
                        )}

                        {/* Activity */}
                        <div className="space-y-3">
                          <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#737373] f-sans">Activity</p>
                          <div className="space-y-2 f-sans text-sm text-[#282828]">
                            <div className="flex items-center gap-3">
                              <Package size={14} className="text-[#8A7A6B] flex-shrink-0" />
                              <span>
                                {customer.totalOrders} {customer.totalOrders === 1 ? 'order' : 'orders'} ·{' '}
                                {(customer.totalSpent || 0).toLocaleString()} SAR
                              </span>
                            </div>
                            <div className="flex items-center gap-3">
                              <Calendar size={14} className="text-[#8A7A6B] flex-shrink-0" />
                              <span>
                                Joined{' '}
                                {customer.createdAt
                                  ? new Date(customer.createdAt).toLocaleDateString('en-US', {
                                      month: 'short', year: 'numeric'
                                    })
                                  : '—'}
                              </span>
                            </div>
                            {customer.lastOrderAt && (
                              <div className="flex items-center gap-3 text-[#737373]">
                                <TrendingUp size={14} className="flex-shrink-0" />
                                <span>
                                  Last order:{' '}
                                  {new Date(customer.lastOrderAt).toLocaleDateString('en-US', {
                                    month: 'short', day: 'numeric', year: 'numeric'
                                  })}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminCustomers;
