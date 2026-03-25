import React, { useEffect } from 'react';
import { useLang } from '../store/context/LangContext';
import { Ruler, Hammer, ShieldCheck, Box, ArrowRight, Truck, PencilRuler, Wrench } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const Services: React.FC = () => {
    const { lang } = useLang();
    const ar = lang === 'ar';

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const services = [
        { icon: PencilRuler, title: ar ? 'تصميم داخلي مخصص' : 'BESPOKE INTERIORS', desc: ar ? 'حلول تصميم شاملة لمساحاتكم التجارية والسكنية.' : 'Comprehensive design solutions for commercial and residential sectors.' },
        { icon: Hammer, title: ar ? 'تصنيع الأثاث' : 'PRECISION MANUFACTURING', desc: ar ? 'تصنيع يدوي باستخدام أجود أنواع الأخشاب والمعادن.' : 'Handcrafted units using premium hardwoods and industrial metals.' },
        { icon: Truck, title: ar ? 'التركيب واللوجستيات' : 'INSTALLATION & LOGISTICS', desc: ar ? 'نظام توصيل دقيق وتركيب احترافي في الموقع.' : 'Precision delivery systems and professional on-site assembly.' },
        { icon: Wrench, title: ar ? 'الصيانة والترميم' : 'MAINTENANCE & RESTORE', desc: ar ? 'خدمات صيانة دورية للحفاظ على جودة الأثاث.' : 'Strategic maintenance protocols to ensure longevity and quality.' },
    ];

    return (
        <div className="bg-white f-sans min-h-screen pb-32 overflow-hidden" dir={ar ? 'rtl' : 'ltr'}>
            <header className="bg-ikea-gray/30 pt-32 pb-20 md:pt-48 md:pb-40 px-6 md:px-12 relative overflow-hidden text-start">
               <div className="container mx-auto px-6 max-w-[1440px] relative z-10">
                  <div className="bg-ikea-blue inline-block px-4 py-1.5 mb-8 skew-x-[-4deg]">
                    <span className="text-white text-[11px] font-black uppercase tracking-[0.4em] skew-x-[4deg] inline-block">CAPABILITIES</span>
                  </div>
                  <h1 className="text-6xl md:text-[9rem] font-black text-ikea-black tracking-tighter leading-[0.8] mb-12 uppercase">
                    {ar ? <>خدمات<br /><span className="text-ikea-blue">العمليات</span></> : <>OPERATIONAL<br /><span className="text-ikea-blue">SERVICES</span></>}
                  </h1>
               </div>
            </header>

            <main className="container mx-auto px-6 max-w-[1240px] py-32">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {services.map((service, i) => (
                     <motion.div 
                        key={i} 
                        initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }} 
                        whileInView={{ opacity: 1, x: 0 }} 
                        className="bg-ikea-gray rounded-[3rem] p-12 hover:bg-white hover:shadow-2xl transition-all border border-ikea-gray group text-start"
                     >
                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-ikea-blue mb-10 group-hover:bg-ikea-blue group-hover:text-white transition-colors shadow-sm">
                           <service.icon size={32} />
                        </div>
                        <h3 className="text-3xl font-black text-ikea-black mb-6 tracking-tight uppercase">{service.title}</h3>
                        <p className="text-lg font-medium text-ikea-darkGray opacity-60 leading-relaxed mb-10 group-hover:opacity-100 transition-opacity">{service.desc}</p>
                        <Link to="/contact" className="inline-flex items-center gap-4 text-ikea-blue font-black uppercase tracking-widest text-[11px] hover:gap-6 transition-all underline decoration-8 underline-offset-8 decoration-ikea-gray">
                           {ar ? 'استفسار عن الخدمة' : 'INITIATE REQUEST'} <ArrowRight size={18} className={ar ? 'rotate-180' : ''} />
                        </Link>
                     </motion.div>
                  ))}
               </div>
            </main>
        </div>
    );
};

export default Services;
