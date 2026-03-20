import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLang } from '../App';
import { translations } from '../content/translations';
import { Menu, X, ShoppingBag, Package } from 'lucide-react';
import { useStore } from '../store/context/StoreContext';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar: React.FC = () => {
    const { lang, toggleLang } = useLang();
    const { cartCount, setCartOpen } = useStore();
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    
    const ar = lang === 'ar';
    const t = translations[lang];

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    const navItems = [
        { label: t.nav.home, path: '/' },
        { label: t.nav.about, path: '/about' },
        { label: t.nav.services, path: '/services' },
        { label: t.nav.products, path: '/products' },
        { label: t.nav.portfolio, path: '/portfolio' },
    ];

    return (
        <>
            <nav className={`fixed top-0 w-full z-50 transition-all duration-500 f-sans ${
                scrolled || isOpen ? 'bg-white/90 backdrop-blur-md py-4 shadow-sm border-b border-black/5' : 'bg-transparent py-6 md:py-8 border-transparent'
            }`} dir={ar ? 'rtl' : 'ltr'}>
                <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
                    
                    {/* Brand */}
                    <Link to="/" className="z-50 text-2xl font-serif tracking-widest text-[#282828]">
                        FOREST<span className="italic font-light text-[#8A7A6B]">Edge</span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex items-center gap-10">
                        {navItems.map((item) => (
                            <Link 
                                key={item.path} 
                                to={item.path} 
                                className={`relative text-[11px] font-bold tracking-[0.2em] uppercase transition-colors group ${
                                    location.pathname === item.path ? 'text-[#8A7A6B]' : 'text-[#737373] hover:text-[#282828]'
                                }`}
                            >
                                {item.label}
                                <span className={`absolute -bottom-2 left-0 h-[1px] bg-[#8A7A6B] transition-all duration-300 ${
                                    location.pathname === item.path ? 'w-full' : 'w-0 group-hover:w-full'
                                }`}></span>
                            </Link>
                        ))}
                    </div>

                    {/* Right Actions */}
                    <div className="hidden md:flex items-center gap-5 lg:gap-6">

                        {/* Store CTA Button */}
                        <Link
                            to="/store"
                            className={`relative flex items-center gap-2 text-[10px] font-bold px-6 py-2.5 rounded-full transition-all duration-300 uppercase tracking-[0.15em] border ${
                                location.pathname === '/store' || location.pathname.startsWith('/store/')
                                    ? 'bg-[#8A7A6B] text-white border-[#8A7A6B] shadow-md'
                                    : 'bg-transparent text-[#282828] border-[#282828]/20 hover:bg-[#282828] hover:text-white hover:border-[#282828]'
                            }`}
                        >
                            <ShoppingBag size={13} />
                            {ar ? 'المتجر' : 'Store'}
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-[#8A7A6B] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white shadow-sm">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        {/* Orders Link */}
                        <Link
                            to="/orders"
                            className={`relative p-2 transition-colors group ${
                                location.pathname === '/orders' ? 'text-[#8A7A6B]' : 'text-[#282828] hover:text-[#8A7A6B]'
                            }`}
                            aria-label="My Orders"
                            title={ar ? 'طلباتي' : 'My Orders'}
                        >
                            <Package size={20} className="group-hover:scale-110 transition-transform" />
                        </Link>

                        {/* Language Toggle */}
                        <button
                            onClick={toggleLang}
                            className="text-[11px] font-bold text-[#282828] hover:text-[#8A7A6B] transition-colors uppercase tracking-[0.2em] min-w-[30px]"
                        >
                            {ar ? 'EN' : 'AR'}
                        </button>

                        {/* Contact CTA */}
                        <Link
                            to="/contact"
                            className="bg-[#282828] text-white text-[10px] font-bold px-8 py-3 rounded-full hover:bg-[#8A7A6B] transition-all duration-300 uppercase tracking-[0.2em] shadow-sm"
                        >
                            {t.nav.contact}
                        </Link>
                    </div>

                    {/* Mobile menu toggle */}
                    <div className="flex items-center gap-3 md:hidden">
                        {/* Store button mobile */}
                        <Link
                            to="/store"
                            className="relative flex items-center gap-1.5 bg-[#282828] text-white text-[9px] font-bold px-4 py-2 rounded-full uppercase tracking-widest"
                        >
                            <ShoppingBag size={12} />
                            {ar ? 'المتجر' : 'Store'}
                            {cartCount > 0 && (
                                <span className="absolute -top-1.5 -right-1.5 bg-[#8A7A6B] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                        <button
                            className="z-50 text-[#282828] p-2"
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label={isOpen ? "Close menu" : "Open menu"}
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div 
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="absolute top-full left-0 w-full bg-white border-b border-black/5 shadow-xl md:hidden overflow-hidden"
                        >
                            <div className="flex flex-col p-8 gap-6">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        className={`text-2xl font-serif ${
                                            location.pathname === item.path ? 'text-[#8A7A6B]' : 'text-[#282828]'
                                        }`}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {item.label}
                                    </Link>
                                ))}

                                <div className="h-[1px] bg-black/5 w-full" />

                                {/* Store & Orders */}
                                <Link
                                    to="/store"
                                    className="flex items-center gap-3 text-xl font-serif text-[#8A7A6B]"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <ShoppingBag size={20} />
                                    {ar ? 'المتجر' : 'Store'}
                                    {cartCount > 0 && (
                                        <span className="bg-[#8A7A6B] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center f-sans">
                                            {cartCount}
                                        </span>
                                    )}
                                </Link>
                                <Link
                                    to="/orders"
                                    className="flex items-center gap-3 text-xl font-serif text-[#282828]"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <Package size={20} />
                                    {ar ? 'طلباتي' : 'My Orders'}
                                </Link>

                                <div className="h-[1px] bg-black/5 w-full" />

                                <div className="flex items-center justify-between">
                                    <button
                                        onClick={toggleLang}
                                        className="text-sm font-bold text-[#8A7A6B] uppercase tracking-widest"
                                    >
                                        {ar ? 'English' : 'العربية'}
                                    </button>
                                    <Link
                                        to="/contact"
                                        className="bg-[#8A7A6B] text-white px-6 py-2 rounded-full text-sm font-bold uppercase tracking-widest"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {t.nav.contact}
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </>
    );
};
