import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLang } from '../store/context/LangContext';
import { translations } from '../content/translations';
import { Menu, X } from 'lucide-react';
import { BackToTop } from './BackToTop';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { lang, toggleLang } = useLang();
  const t = translations[lang].nav;
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { path: '/', label: t.home },
    { path: '/services', label: t.services },
    { path: '/products', label: t.products },
    { path: '/portfolio', label: t.portfolio },
    { path: '/about', label: t.about },
  ];

  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  return (
    <div className={`min-h-screen flex flex-col font-${lang === 'ar' ? 'arabic' : 'sans'} bg-brand-white text-brand-charcoal`} dir={dir}>

      {/* Navbar */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled || mobileMenuOpen
          ? 'bg-white/80 backdrop-blur-md border-b border-brand-wood/20'
          : 'bg-transparent border-transparent'
          }`}
      >
        <div className="max-w-[1200px] mx-auto px-6 h-16 md:h-20 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="z-50 relative flex items-center">
            <img
              src="https://i.imgur.com/Cp8AbcG.png"
              alt="Forest Edge"
              className="h-10 md:h-12 w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-sm font-medium text-brand-charcoal hover:text-brand-wood transition-colors tracking-wide"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={toggleLang}
              className="text-xs font-semibold text-brand-charcoal hover:text-brand-wood transition-colors uppercase tracking-widest"
            >
              {lang === 'en' ? 'AR' : 'EN'}
            </button>
            <Link
              to="/contact"
              className="bg-brand-green text-white text-xs px-6 py-2.5 rounded-full hover:bg-brand-greenHover transition-all duration-300 shadow-sm"
            >
              {t.contact}
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden z-50 text-brand-charcoal"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 bg-white z-40 flex flex-col pt-24 px-8 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${mobileMenuOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible'}`}>
          <div className="flex flex-col gap-6">
            {navLinks.map((link, idx) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-2xl font-semibold text-brand-charcoal border-b border-zinc-100 pb-4"
                style={{ transitionDelay: `${idx * 50}ms` }}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/contact" className="text-2xl font-semibold text-brand-green pb-4">{t.contact}</Link>
            <button onClick={toggleLang} className="text-sm font-bold text-brand-wood text-start mt-4 uppercase tracking-widest">
              {lang === 'en' ? 'العربية' : 'English'}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white text-zinc-500 text-sm py-20 border-t border-brand-wood/20">
        <div className="max-w-[980px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-1 md:col-span-2">
              <img src="https://i.imgur.com/Cp8AbcG.png" alt="Forest Edge" className="h-10 w-auto mb-6 object-contain" />
              <p className="max-w-xs leading-relaxed text-brand-charcoal/80">{translations[lang].footer.desc}</p>
            </div>
            <div>
              <h4 className="text-brand-charcoal font-bold mb-4 uppercase text-xs tracking-widest">Discover</h4>
              <ul className="space-y-3">
                <li><Link to="/products" className="hover:text-brand-green transition-colors">Catalog</Link></li>
                <li><Link to="/services" className="hover:text-brand-green transition-colors">Services</Link></li>
                <li><Link to="/portfolio" className="hover:text-brand-green transition-colors">Portfolio</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-brand-charcoal font-bold mb-4 uppercase text-xs tracking-widest">Company</h4>
              <ul className="space-y-3">
                <li><Link to="/about" className="hover:text-brand-green transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-brand-green transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-brand-wood/10 flex flex-col md:flex-row justify-between items-center text-xs">
            <p>{translations[lang].footer.rights}</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <span className="cursor-pointer hover:text-brand-charcoal">Privacy Policy</span>
              <span className="cursor-pointer hover:text-brand-charcoal">Terms of Use</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <BackToTop />
    </div>
  );
};