import React, { useState, useEffect, createContext, useContext } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { Products } from './pages/Products';
import { Portfolio } from './pages/Portfolio';
import { Contact } from './pages/Contact';
import { Language } from './types';
import { LoadingScreen } from './components/LoadingScreen';

// Language Context
interface LangContextType {
  lang: Language;
  toggleLang: () => void;
}

export const LangContext = createContext<LangContextType>({ lang: 'en', toggleLang: () => { } });
export const useLang = () => useContext(LangContext);

// Scroll to top component
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('ar'); // Default to Arabic as per region probability or make it 'en'
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
      <LoadingScreen isLoading={isLoading} />
      <Router>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/products" element={<Products />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Layout>
      </Router>
    </LangContext.Provider>
  );
};

export default App;