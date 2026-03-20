import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import {
  LayoutDashboard, Package, ShoppingBag,
  LogOut, Menu, X, ChevronRight, Home
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AdminLayoutProps { children: React.ReactNode; }

const navItems = [
  { path: '/admin',          label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { path: '/admin/orders',   label: 'Orders',    icon: ShoppingBag,     exact: false },
  { path: '/admin/products', label: 'Products',  icon: Package,         exact: false },
];

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const location  = useLocation();
  const navigate  = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/admin/login');
  };

  const isActive = (item: typeof navItems[0]) =>
    item.exact ? location.pathname === item.path : location.pathname.startsWith(item.path);

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className={`flex items-center border-b border-white/5 h-16 px-4 ${collapsed ? 'justify-center' : 'justify-between'}`}>
        {!collapsed && (
          <Link to="/admin" className="block">
            <span className="text-lg font-serif text-white tracking-widest">
              FOREST<span className="italic font-light text-[#8A7A6B]">Edge</span>
            </span>
            <span className="text-[9px] text-[#8A7A6B] block uppercase tracking-[0.3em] font-sans font-bold leading-none mt-0.5">
              Admin
            </span>
          </Link>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 items-center justify-center text-white/50 hover:text-white transition-all"
        >
          {collapsed ? <ChevronRight size={14} /> : <X size={14} />}
        </button>
      </div>

      {/* Nav Items */}
      <nav className="flex-grow py-6 px-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item);
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group ${
                active
                  ? 'bg-[#8A7A6B] text-white shadow-lg shadow-[#8A7A6B]/20'
                  : 'text-white/40 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon size={18} className="flex-shrink-0" />
              {!collapsed && (
                <span className="text-[11px] font-bold uppercase tracking-[0.15em] font-sans whitespace-nowrap">
                  {item.label}
                </span>
              )}
              {active && !collapsed && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white/60" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="border-t border-white/5 p-3 space-y-1">
        <Link
          to="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-3 rounded-xl text-white/30 hover:text-white hover:bg-white/5 transition-all"
        >
          <Home size={18} className="flex-shrink-0" />
          {!collapsed && (
            <span className="text-[11px] font-bold uppercase tracking-[0.15em] font-sans">View Site</span>
          )}
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-all"
        >
          <LogOut size={18} className="flex-shrink-0" />
          {!collapsed && (
            <span className="text-[11px] font-bold uppercase tracking-[0.15em] font-sans">Logout</span>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F5F2EE] flex" dir="ltr">

      {/* Desktop Sidebar */}
      <aside className={`hidden lg:flex flex-col flex-shrink-0 bg-[#1C1C1A] min-h-screen transition-all duration-300 ${collapsed ? 'w-16' : 'w-60'}`}>
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed left-0 top-0 h-full w-64 bg-[#1C1C1A] z-50 lg:hidden"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="flex-grow flex flex-col min-w-0">
        {/* Mobile topbar */}
        <div className="lg:hidden flex items-center justify-between px-4 py-4 bg-white border-b border-[#282828]/5 sticky top-0 z-30">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 text-[#282828] hover:text-[#8A7A6B] transition-colors"
          >
            <Menu size={22} />
          </button>
          <span className="font-serif text-[#282828] text-lg">
            FOREST<span className="italic text-[#8A7A6B] font-light">Edge</span>
          </span>
          <div className="w-8" />
        </div>

        <main className="flex-grow overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
