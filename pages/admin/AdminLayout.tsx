import React from 'react';
import { 
  BarChart3, Users, Package, ShoppingCart, 
  Settings, LogOut, Search, Bell, Menu, ShieldCheck
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { motion } from 'framer-motion';

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/admin/login');
  };

  const navItems = [
    { icon: BarChart3, label: 'DASHBOARD', path: '/admin/dashboard' },
    { icon: Package, label: 'INVENTORY', path: '/admin/products' },
    { icon: ShoppingCart, label: 'LOGISTICS', path: '/admin/orders' },
    { icon: Users, label: 'HUMAN CAPITAL', path: '/admin/customers' },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 flex f-sans">
      {/* Sidebar */}
      <aside className="w-80 bg-ikea-black text-white flex flex-col p-10 fixed h-full z-50">
        <div className="flex items-center gap-4 mb-20 px-4">
           <div className="bg-ikea-blue text-ikea-yellow px-4 py-2 font-black text-2xl skew-x-[-6deg]">
              <span className="skew-x-[6deg] inline-block">FE</span>
           </div>
           <span className="text-xl font-black tracking-tighter uppercase">Operations</span>
        </div>

        <nav className="flex-grow space-y-4">
          {navItems.map((item) => (
            <Link 
              key={item.path} 
              to={item.path}
              className={`flex items-center gap-6 px-8 py-6 rounded-[2rem] transition-all group ${pathname === item.path ? 'bg-ikea-blue text-white shadow-xl shadow-ikea-blue/20' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
            >
              <item.icon size={22} className={`${pathname === item.path ? 'scale-110' : 'group-hover:scale-110'} transition-transform`} />
              <span className="text-[11px] font-black uppercase tracking-[0.2em]">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="pt-10 border-t border-white/10 space-y-4">
           <button className="flex items-center gap-6 px-8 py-4 text-white/40 hover:text-white w-full transition-colors">
              <Settings size={20} />
              <span className="text-[11px] font-black uppercase tracking-[0.2em]">Config</span>
           </button>
           <button onClick={handleLogout} className="flex items-center gap-6 px-8 py-4 text-red-400 hover:text-red-300 w-full transition-colors">
              <LogOut size={20} />
              <span className="text-[11px] font-black uppercase tracking-[0.2em]">Terminate</span>
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-80 bg-neutral-50 min-h-screen">
         <header className="h-28 bg-white border-b border-ikea-gray px-12 flex items-center justify-between sticky top-0 z-40">
            <div className="flex items-center gap-6 flex-1 max-w-xl bg-ikea-gray/50 rounded-2xl px-6 py-3 border border-ikea-gray group">
               <Search size={18} className="text-ikea-darkGray opacity-40 group-focus-within:opacity-100" />
               <input type="text" placeholder="Global System Search..." className="bg-transparent border-none outline-none font-black text-sm w-full" />
            </div>
            <div className="flex items-center gap-10">
               <button className="relative text-ikea-black hover:text-ikea-blue transition-colors">
                  <Bell size={24} />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-4 border-white" />
               </button>
               <div className="flex items-center gap-6 pl-10 border-l border-ikea-gray">
                  <div className="text-right hidden md:block">
                     <p className="text-[10px] font-black uppercase tracking-widest text-ikea-darkGray">COMMANDER</p>
                     <p className="text-sm font-black text-ikea-black uppercase">Root Operator</p>
                  </div>
                  <div className="w-14 h-14 bg-ikea-blue text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-lg shadow-ikea-blue/20">A</div>
               </div>
            </div>
         </header>
         <div className="p-0">
            {children}
         </div>
         <div className="p-10 text-center">
            <p className="text-[9px] font-black text-ikea-darkGray/30 uppercase tracking-[0.5em] flex items-center justify-center gap-4">
               <ShieldCheck size={14} /> SECURE INDUSTRIAL ENVIRONMENT V4.2
            </p>
         </div>
      </main>
    </div>
  );
};

export default AdminLayout;
