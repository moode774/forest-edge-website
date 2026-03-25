import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, User, Search, Globe, Box } from 'lucide-react';
import { useStore } from '../store/context/StoreContext';
import { useLang } from '../store/context/LangContext';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { cart, toggleCart } = useStore();
    const { lang, setLang } = useLang();
    const { pathname } = useLocation();
    const ar = lang === 'ar';

    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { nameEn: 'STORE', nameAr: 'المتجر', path: '/store' },
        { nameEn: 'SERVICES', nameAr: 'الخدمات', path: '/services' },
        { nameEn: 'PORTFOLIO', nameAr: 'المشاريع', path: '/portfolio' },
        { nameEn: 'ABOUT', nameAr: 'عن الشركة', path: '/about' },
        { nameEn: 'TRACK', nameAr: 'التتبع', path: '/track' },
    ];

    return (
        <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${isScrolled ? 'bg-white/80 backdrop-blur-xl py-4 shadow-sm' : 'bg-transparent py-8'}`}>
            <div className="container mx-auto px-6 md:px-12 max-w-[1440px] flex items-center justify-between">
                
                {/* Branding */}
                <Link to="/" className="group flex items-center gap-3">
                   <div className="bg-ikea-blue text-ikea-yellow px-4 py-2 font-black text-2xl skew-x-[-6deg] group-hover:scale-110 transition-transform shadow-xl">
                      <span className="skew-x-[6deg] inline-block">FE</span>
                   </div>
                   <span className={`text-2xl font-black tracking-tighter transition-colors ${isScrolled ? 'text-ikea-black' : 'text-ikea-black'} hidden md:block uppercase`}>
                      Forest <span className="opacity-30">Edge</span>
                   </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden lg:flex items-center gap-10">
                    {navLinks.map((link) => (
                        <Link 
                            key={link.path} 
                            to={link.path}
                            className={`text-[11px] font-black uppercase tracking-[0.2em] transition-all relative group ${pathname === link.path ? 'text-ikea-blue' : 'text-ikea-darkGray hover:text-ikea-blue'}`}
                        >
                            {ar ? link.nameAr : link.nameEn}
                            <span className={`absolute -bottom-2 left-0 w-0 h-0.5 bg-ikea-blue transition-all group-hover:w-full ${pathname === link.path ? 'w-full' : ''}`} />
                        </Link>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4 md:gap-8">
                    <button onClick={() => setLang(ar ? 'en' : 'ar')} className="hidden sm:flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-ikea-darkGray hover:text-ikea-blue transition-colors">
                       <Globe size={18} /> {ar ? 'ENGLISH' : 'العربية'}
                    </button>
                    
                    <Link to="/orders" className="text-ikea-darkGray hover:text-ikea-blue transition-colors">
                       <User size={22} />
                    </Link>

                    <button 
                       onClick={toggleCart} 
                       className="relative bg-ikea-blue text-white p-3 md:px-6 md:py-3 rounded-full flex items-center gap-3 hover:bg-[#00478b] transition-all shadow-xl group"
                    >
                        <ShoppingCart size={20} className="group-hover:rotate-12 transition-transform" />
                        <span className="text-[11px] font-black hidden md:block uppercase tracking-widest">{ar ? 'السلة' : 'CART'}</span>
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-ikea-yellow text-ikea-blue text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                                {cartCount}
                            </span>
                        )}
                    </button>

                    <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden text-ikea-black">
                        <Menu size={28} />
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div 
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed inset-0 bg-white z-[200] flex flex-col p-12 overflow-y-auto"
                    >
                        <div className="flex justify-between items-center mb-20">
                           <div className="bg-ikea-blue text-ikea-yellow px-4 py-2 font-black text-2xl skew-x-[-6deg]">
                              <span className="skew-x-[6deg] inline-block">FE</span>
                           </div>
                           <button onClick={() => setIsMobileMenuOpen(false)} className="text-ikea-black p-4"><X size={40} /></button>
                        </div>

                        <div className="flex flex-col gap-8">
                           {navLinks.map((link) => (
                              <Link 
                                 key={link.path} 
                                 to={link.path} 
                                 onClick={() => setIsMobileMenuOpen(false)}
                                 className="text-5xl font-black tracking-tighter text-ikea-black hover:text-ikea-blue transition-colors uppercase leading-none"
                              >
                                 {ar ? link.nameAr : link.nameEn}
                              </Link>
                           ))}
                        </div>

                        <div className="mt-auto pt-20 border-t border-ikea-gray flex flex-col gap-8">
                           <button onClick={() => { setLang(ar ? 'en' : 'ar'); setIsMobileMenuOpen(false); }} className="flex items-center gap-4 text-xl font-black uppercase tracking-widest text-ikea-blue">
                              <Globe size={24} /> {ar ? 'Switch to English' : 'تغيير للغة العربية'}
                           </button>
                           <p className="text-[10px] font-black text-ikea-darkGray tracking-[0.5em]">FOREST EDGE INDUSTRIAL SYSTEMS</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};
