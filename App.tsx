import React, { useState, useEffect, createContext, useContext } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { Products } from './pages/Products';
import { Portfolio } from './pages/Portfolio';
import { Contact } from './pages/Contact';
import { ScrollDemo } from './pages/ScrollDemo';
import { Checkout } from './pages/Checkout';
import { Store } from './pages/Store';
import { ProductDetail } from './pages/ProductDetail';
import { Orders } from './pages/Orders';
import { TrackOrder } from './pages/TrackOrder';
import { Invoice } from './pages/Invoice';
import { AdminLogin } from './pages/admin/AdminLogin';
import { Dashboard } from './pages/admin/Dashboard';
import { AdminOrders } from './pages/admin/AdminOrders';
import { AdminProducts } from './pages/admin/AdminProducts';
import { ProductForm } from './pages/admin/ProductForm';
import { Language } from './types';
import { StoreProvider } from './store/context/StoreContext';
import { CartDrawer } from './store/components/CartDrawer';
import { MasterLayout } from './components/MasterLayout';


// Language Context
interface LangContextType {
  lang: Language;
  toggleLang: () => void;
}

export const LangContext = createContext<LangContextType>({ lang: 'en', toggleLang: () => { } });
export const useLang = () => useContext(LangContext);

// Admin Auth Guard
const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authed, setAuthed] = useState<boolean | null>(null);
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => setAuthed(Boolean(user)));
    return () => unsub();
  }, []);
  if (authed === null) {
    return (
      <div className="min-h-screen bg-[#1C1C1A] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#8A7A6B]/30 border-t-[#8A7A6B] animate-spin" />
      </div>
    );
  }
  return authed ? <>{children}</> : <Navigate to="/admin/login" replace />;
};

// Scroll to top component
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// --- LOADING SCREEN COMPONENT ---
interface LoadingScreenProps {
  isLoading: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ isLoading }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    if (percent < 100) {
      const timer = setTimeout(() => {
        setPercent((prev) => Math.min(prev + Math.floor(Math.random() * 10) + 5, 100));
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [percent]);

  useEffect(() => {
    if (!isLoading) {
      setPercent(100);
      const exitTimer = setTimeout(() => {
        setIsExiting(true);
      }, 500);

      const removeTimer = setTimeout(() => {
        setIsVisible(false);
      }, 1500);

      return () => {
        clearTimeout(exitTimer);
        clearTimeout(removeTimer);
      };
    }
  }, [isLoading]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-between py-12 px-6 transition-all duration-[1000ms] ease-[cubic-bezier(0.76,0,0.24,1)]
      ${isExiting ? '-translate-y-full rounded-b-[50%]' : 'translate-y-0'}`}
      style={{ backgroundColor: '#F9F7F4' }}
    >
      <div className={`w-full flex justify-between items-start transition-opacity duration-500 ${isExiting ? 'opacity-0' : 'opacity-100'}`}>
        <span className="font-serif text-[#65523C] text-xs tracking-[0.2em] uppercase">Est. 2024</span>
        <span className="font-serif text-[#65523C] text-xs tracking-[0.2em] uppercase">Riyadh</span>
      </div>

      <div className={`flex flex-col items-center justify-center transition-all duration-700 ${isExiting ? 'opacity-0 scale-90' : 'opacity-100 scale-100'}`}>
        <div className="mb-8 relative">
          <img
            src="https://i.imgur.com/Cp8AbcG.png"
            alt="Forest Edge"
            className="h-12 md:h-16 w-auto object-contain brightness-0 opacity-80"
          />
        </div>

        <div className="relative">
          <h1 className="text-[8rem] md:text-[12rem] leading-none font-serif text-[#65523C] opacity-20 select-none">
            {percent}
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-sm font-medium tracking-[0.3em] text-[#1A1A1A] uppercase mt-2">
              Loading Experience
            </p>
          </div>
        </div>
      </div>

      <div className={`w-full max-w-md transition-opacity duration-500 ${isExiting ? 'opacity-0' : 'opacity-100'}`}>
        <div className="h-[1px] w-full bg-[#65523C]/20 overflow-hidden">
          <div
            className="h-full bg-[#65523C] transition-all duration-300 ease-out"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </div>
  );
};

// --- MAIN APP COMPONENT ---
const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const [isLoading, setIsLoading] = useState(true);

  const toggleLang = () => {
    setLang((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <LangContext.Provider value={{ lang, toggleLang }}>
      <StoreProvider>
        <LoadingScreen isLoading={isLoading} />
        <Router>
          <ScrollToTop />
          <CartDrawer />
          <Routes>
            {/* ── Standalone routes (outside MasterLayout) ── */}
            <Route path="/invoice/:orderId" element={<Invoice />} />

            {/* ── Admin routes (outside MasterLayout) ── */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminRoute><Dashboard /></AdminRoute>} />
            <Route path="/admin/orders" element={<AdminRoute><AdminOrders /></AdminRoute>} />
            <Route path="/admin/products" element={<AdminRoute><AdminProducts /></AdminRoute>} />
            <Route path="/admin/products/new" element={<AdminRoute><ProductForm /></AdminRoute>} />
            <Route path="/admin/products/edit/:id" element={<AdminRoute><ProductForm /></AdminRoute>} />

            {/* ── Public routes (inside MasterLayout) ── */}
            <Route path="/*" element={
              <MasterLayout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/portfolio" element={<Portfolio />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/store" element={<Store />} />
                  <Route path="/store/product/:id" element={<ProductDetail />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/track" element={<TrackOrder />} />
                  <Route path="/scroll-demo" element={<ScrollDemo />} />
                </Routes>
              </MasterLayout>
            } />
          </Routes>
        </Router>
      </StoreProvider>
    </LangContext.Provider>
  );
};

export default App;