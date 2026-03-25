import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, MapPin, Phone, ArrowRight, Box } from 'lucide-react';
import { useLang } from '../App';

export const Footer: React.FC = () => {
    const { lang } = useLang();
    const ar = lang === 'ar';

    const footerLinks = {
        shop: [
            { nameEn: 'All Products', nameAr: 'جميع المنتجات', path: '/store' },
            { nameEn: 'Special Collections', nameAr: 'مجموعات خاصة', path: '/products' },
            { nameEn: 'New Arrivals', nameAr: 'وصل حديثاً', path: '/store' },
        ],
        services: [
            { nameEn: 'Interior Design', nameAr: 'التصميم الداخلي', path: '/services' },
            { nameEn: 'Custom Furniture', nameAr: 'أثاث مخصص', path: '/services' },
            { nameEn: 'Installation', nameAr: 'التركيب الميداني', path: '/services' },
        ],
        support: [
            { nameEn: 'Track Order', nameAr: 'تتبع الطلب', path: '/track' },
            { nameEn: 'Contact Us', nameAr: 'تواصل معنا', path: '/contact' },
            { nameEn: 'About Us', nameAr: 'من نحن', path: '/about' },
        ]
    };

    return (
        <footer className="bg-ikea-gray/30 pt-40 pb-20 border-t border-ikea-gray text-start" dir={ar ? 'rtl' : 'ltr'}>
            <div className="container mx-auto px-6 md:px-12 max-w-[1440px]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-32">
                    
                    {/* Brand Meta */}
                    <div className="space-y-10">
                        <Link to="/" className="flex items-center gap-3">
                           <div className="bg-ikea-blue text-ikea-yellow px-4 py-2 font-black text-2xl skew-x-[-6deg]">
                              <span className="skew-x-[6deg] inline-block">FE</span>
                           </div>
                           <span className="text-2xl font-black tracking-tighter text-ikea-black uppercase">
                              Forest <span className="opacity-30">Edge</span>
                           </span>
                        </Link>
                        <p className="text-ikea-darkGray font-medium leading-relaxed opacity-60 text-lg">
                           {ar 
                             ? 'نحن نهندس مساحات تدمج بين الجمال والوظيفة، لتقديم تجربة معيشية استثنائية.' 
                             : 'Architecting spaces that merge aesthetics with functionality to deliver an exceptional domestic experience.'}
                        </p>
                        <div className="flex gap-6">
                           {[Instagram, Facebook, Youtube, Twitter].map((Icon, i) => (
                              <button key={i} className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-ikea-blue hover:bg-ikea-blue hover:text-white transition-all shadow-sm">
                                 <Icon size={20} />
                              </button>
                           ))}
                        </div>
                    </div>

                    {/* Link Columns */}
                    {[
                        { title: ar ? 'المتجر' : 'REPOSITORY', links: footerLinks.shop },
                        { title: ar ? 'الخدمات' : 'SERVICES', links: footerLinks.services },
                        { title: ar ? 'الدعم' : 'SUPPORT', links: footerLinks.support }
                    ].map((col, i) => (
                        <div key={i} className="space-y-8">
                            <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-ikea-blue">{col.title}</h4>
                            <ul className="space-y-4">
                                {col.links.map((link, j) => (
                                    <li key={j}>
                                        <Link to={link.path} className="text-lg font-black text-ikea-black hover:text-ikea-blue transition-colors uppercase tracking-tight">
                                           {ar ? link.nameAr : link.nameEn}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="border-t border-ikea-gray pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
                   <div className="flex items-center gap-4 text-ikea-darkGray text-[10px] font-black uppercase tracking-widest">
                      <Box size={24} className="text-ikea-blue" />
                      © 2024 FOREST EDGE INDUSTRIAL SYSTEMS
                   </div>
                   <div className="flex gap-10">
                      <button className="text-[10px] font-black uppercase tracking-widest hover:text-ikea-blue transition-colors">Privacy Protocol</button>
                      <button className="text-[10px] font-black uppercase tracking-widest hover:text-ikea-blue transition-colors">Operational Terms</button>
                   </div>
                </div>
            </div>
        </footer>
    );
};
