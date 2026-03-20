import React from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../App';
import { translations } from '../content/translations';
import { Instagram, Twitter, Facebook } from 'lucide-react';

export const Footer: React.FC = () => {
    const { lang } = useLang();
    const t = translations[lang];
    const ar = lang === 'ar';

    const navLinks = [
        { label: t.nav.home, path: '/' },
        { label: t.nav.products, path: '/products' },
        { label: t.nav.services, path: '/services' },
        { label: t.nav.portfolio, path: '/portfolio' },
        { label: t.nav.about, path: '/about' },
    ];

    const storeLinks = [
        { label: ar ? 'المتجر' : 'Store', path: '/store' },
        { label: ar ? 'طلباتي' : 'My Orders', path: '/orders' },
        { label: ar ? 'تتبع الطلب' : 'Track Order', path: '/track' },
        { label: ar ? 'الدفع' : 'Checkout', path: '/checkout' },
    ];

    return (
        <footer className="bg-white border-t border-[#282828]/5 pt-24 pb-12 f-sans" dir={ar ? 'rtl' : 'ltr'}>
            <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                <div className="flex flex-col md:flex-row justify-between items-start mb-20 gap-12">
                    <div className="max-w-md">
                        <Link to="/" className="text-3xl md:text-4xl font-serif text-[#282828] mb-6 tracking-wider inline-block">
                            FOREST<span className="italic font-light text-[#8A7A6B]">Edge</span>
                        </Link>
                        <p className="text-[#737373] text-lg font-light leading-relaxed">
                            {t.footer?.desc || (ar ? 'فورست إيدج تمثل نقطة التقاء الطبيعة مع الحرفية الفاخرة.' : 'Forest Edge defines the intersection of nature and luxury craftsmanship.')}
                        </p>
                    </div>
                    <div className="flex flex-col items-start md:items-end">
                        <h3 className="text-[#282828] font-serif text-2xl md:text-3xl mb-6 italic">
                            {ar ? 'لنتواصل معاً' : "Let's create together."}
                        </h3>
                        <Link to="/contact" className="group flex items-center gap-4 text-[#282828] text-xl border-b border-[#282828]/20 pb-2 hover:border-[#8A7A6B] hover:text-[#8A7A6B] transition-all duration-300">
                            <span className="text-[11px] font-bold uppercase tracking-[0.2em]">{t.nav.contact}</span>
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 border-t border-[#282828]/5 pt-16 mb-16">
                    <div>
                        <h4 className="text-[#282828] font-bold uppercase text-[10px] tracking-[0.2em] mb-8">{ar ? 'القائمة' : 'Menu'}</h4>
                        <ul className="space-y-4 font-light text-[#737373] text-sm">
                            {navLinks.slice(0, 3).map(l => (
                                <li key={l.path}><Link to={l.path} className="hover:text-[#8A7A6B] transition-colors">{l.label}</Link></li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-[#282828] font-bold uppercase text-[10px] tracking-[0.2em] mb-8">{ar ? 'المجموعة' : 'Collection'}</h4>
                        <ul className="space-y-4 font-light text-[#737373] text-sm">
                            {navLinks.slice(2, 5).map(l => (
                                <li key={l.path}><Link to={l.path} className="hover:text-[#8A7A6B] transition-colors">{l.label}</Link></li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-[#282828] font-bold uppercase text-[10px] tracking-[0.2em] mb-8">{ar ? 'المتجر' : 'Shop'}</h4>
                        <ul className="space-y-4 font-light text-[#737373] text-sm">
                            {storeLinks.map(l => (
                                <li key={l.path}><Link to={l.path} className="hover:text-[#8A7A6B] transition-colors">{l.label}</Link></li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-[#282828] font-bold uppercase text-[10px] tracking-[0.2em] mb-8">{ar ? 'تواصل معنا' : 'Connect'}</h4>
                        <ul className="space-y-4 font-light text-[#737373] text-sm mb-6">
                            <li>{ar ? 'الرياض، شارع العليا' : 'Riyadh, Olaya Street'}</li>
                            <li>+966 50 000 0000</li>
                        </ul>
                        <div className="flex gap-4 text-[#737373]">
                            <Instagram size={18} className="hover:text-[#8A7A6B] cursor-pointer transition-colors" />
                            <Twitter size={18} className="hover:text-[#8A7A6B] cursor-pointer transition-colors" />
                            <Facebook size={18} className="hover:text-[#8A7A6B] cursor-pointer transition-colors" />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center text-[10px] font-bold tracking-[0.2em] uppercase text-[#A3A3A3] pt-8">
                    <p>&copy; {new Date().getFullYear()} Forest Edge. {t.footer?.rights || (ar ? 'جميع الحقوق محفوظة.' : 'All Rights Reserved.')}</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <span className="hover:text-[#282828] cursor-pointer transition-colors">{ar ? 'الخصوصية' : 'Privacy'}</span>
                        <span className="hover:text-[#282828] cursor-pointer transition-colors">{ar ? 'الشروط' : 'Terms'}</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};
