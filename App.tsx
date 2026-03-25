import React, { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MasterLayout } from './components/MasterLayout';
import { StoreProvider } from './store/context/StoreContext';

// Pages
import { Home } from './pages/Home';
import Store from './pages/Store';
import { ProductDetail } from './pages/ProductDetail';
import Cart from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { TrackOrder } from './pages/TrackOrder';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Portfolio } from './pages/Portfolio';
import { Services } from './pages/Services';
import { Orders } from './pages/Orders';
import { Invoice } from './pages/Invoice';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/Dashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminCustomers from './pages/admin/AdminCustomers';

// Components
import { CartDrawer } from './store/components/CartDrawer';

import { LangProvider } from './store/context/LangContext';

// --- LOADING SCREEN COMPONENT ---
const LoadingScreen: React.FC<{ isExiting: boolean; isVisible: boolean }> = ({ isExiting, isVisible }) => {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setPercent(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 20);
    return () => clearInterval(interval);
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-all duration-1000 ease-[cubic-bezier(0.85,0,0.15,1)]
      ${isExiting ? '-translate-y-full' : 'translate-y-0'}`}
      style={{ backgroundColor: '#2A1B14' }}
    >
      <div className={`flex flex-col items-center transition-all duration-700 ${isExiting ? 'opacity-0 scale-90' : 'opacity-100 scale-100'}`}>
        <div className="bg-[#C5A059] px-10 py-5 shadow-2xl skew-x-[-4deg] mb-12 transform hover:scale-105 transition-transform cursor-wait">
           <h1 className="text-5xl md:text-7xl font-black text-[#2A1B14] tracking-tighter leading-none skew-x-[4deg]">
             FOREST <span className="opacity-30 text-black">EDGE</span>
           </h1>
        </div>

        <div className="relative flex flex-col items-center">
          <div className="text-[10rem] md:text-[14rem] font-black text-white/10 select-none leading-none tracking-tighter">
            {percent}
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-[11px] font-black uppercase tracking-[0.5em] text-[#C5A059] mt-4">
              Synchronizing Experience
            </p>
          </div>
        </div>
      </div>

      <div className={`w-full max-w-xs transition-opacity duration-500 mt-12 ${isExiting ? 'opacity-0' : 'opacity-100'}`}>
        <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#C5A059] transition-all duration-300 ease-out shadow-[0_0_15px_rgba(197,160,89,0.5)]"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </div>
  );
};

// --- MAIN APP COMPONENT ---
const App: React.FC = () => {
  const [lang, setLang] = useState<'en' | 'ar'>(() => {
    const saved = localStorage.getItem('fe_lang');
    return (saved as 'en' | 'ar') || 'ar';
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  return (
    <LangProvider>
      <StoreProvider>
        <LoadingScreen isVisible={isLoading} isExiting={isExiting} />
        <CartDrawer />
        <Router>
          <MasterLayout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/store" element={<Store />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/track" element={<TrackOrder />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/services" element={<Services />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/invoice/:id" element={<Invoice />} />
              
              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/products" element={<AdminProducts />} />
              <Route path="/admin/orders" element={<AdminOrders />} />
              <Route path="/admin/customers" element={<AdminCustomers />} />
              
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </MasterLayout>
        </Router>
      </StoreProvider>
    </LangProvider>
  );
};

export default App;
