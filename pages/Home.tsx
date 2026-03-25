import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../store/context/LangContext';
import { ArrowRight, Box, Ruler, Hammer, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export const Home: React.FC = () => {
    const { lang } = useLang();
    const ar = lang === 'ar';

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-white f-sans overflow-hidden" dir={ar ? 'rtl' : 'ltr'}>
            
            {/* ── Dynamic Brand Hero ── */}
            <section className="relative min-h-[90vh] flex items-center bg-ikea-blue text-white pt-24">
               <div className="container mx-auto px-6 max-w-[1400px] grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                  <div className="text-start relative z-10">
                     <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-ikea-yellow text-ikea-blue inline-block px-10 py-5 mb-10 skew-x-[-4deg] shadow-2xl"
                     >
                        <span className="font-black uppercase tracking-[0.5em] text-[14px] skew-x-[4deg]">
                           {ar ? 'قصة علامتنا التجارية' : 'THE BRAND MANUAL'}
                        </span>
                     </motion.div>
                     <motion.h1 
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.85] mb-12"
                     >
                        {ar ? <>هندسة<br /><span className="text-ikea-yellow font-black uppercase skew-x-[-10deg] inline-block">الرفاهية.</span></> : <>ENGINEERING<br /><span className="text-ikea-yellow font-black uppercase skew-x-[-10deg] inline-block">LUXURY.</span></>}
                     </motion.h1>
                     <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-xl md:text-2xl font-medium leading-relaxed opacity-60 max-w-xl mb-12"
                     >
                        {ar 
                          ? 'في فـورسـت إيـدج، نحن لا نصنع الأثاث فحسب، بل نبني بيئات تعزز جودة الحياة من خلال التصميم الوظيفي والدقة الهندسية.' 
                          : 'At Forest Edge, we don’t just manufacture furniture; we architect environments that enhance life through functional design and industrial precision.'}
                     </motion.p>
                     <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="flex flex-wrap gap-6"
                     >
                        <Link to="/store" className="bg-white text-ikea-blue px-12 py-6 rounded-full text-[14px] font-black uppercase tracking-widest hover:bg-ikea-yellow transition-all shadow-2xl flex items-center gap-4">
                           {ar ? 'تفضل بزيارة المتجر' : 'ACCESS STOREFRONT'} <ArrowRight size={20} className={ar ? 'rotate-180' : ''} />
                        </Link>
                        <Link to="/portfolio" className="bg-transparent border-4 border-white/20 text-white px-12 py-6 rounded-full text-[14px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                           {ar ? 'سجل المشاريع' : 'PROJECT REGISTRY'}
                        </Link>
                     </motion.div>
                  </div>
                  
                  <div className="relative hidden lg:block">
                     <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="relative z-10 rounded-[4rem] overflow-hidden shadow-2xl border-8 border-white/10 transform rotate-3 group"
                     >
                        <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=900" 
                             className="w-full h-full object-cover transition-transform duration-[4s] group-hover:scale-110" alt="" />
                     </motion.div>
                     <div className="absolute -top-20 -left-20 w-80 h-80 bg-ikea-yellow rounded-full blur-[120px] opacity-20" />
                  </div>
               </div>
               
               <div className="absolute top-0 right-0 p-24 opacity-5 pointer-events-none">
                  <Box size={600} className="rotate-12" />
               </div>
            </section>

            {/* ── Strategic Core Pillars ── */}
            <section className="py-40 bg-white">
               <div className="container mx-auto px-6 max-w-[1440px]">
                  <div className="text-center mb-24">
                     <p className="text-ikea-blue font-black uppercase tracking-[0.4em] text-[11px] mb-6">OUR DNA</p>
                     <h2 className="text-5xl md:text-[8rem] font-black text-ikea-black tracking-tighter leading-none">
                        {ar ? <>مبادئنا <span className="text-ikea-blue">الأساسية.</span></> : <>STRATEGIC <span className="text-ikea-blue">PILLARS.</span></>}
                     </h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                     {[
                        { icon: Ruler, title: ar ? 'التصميم الذكي' : 'INTELLIGENT DESIGN', desc: ar ? 'كل قطعة مصممة لتحقيق التوازن المثالي بين الجمال والوظيفة.' : 'Every unit is optimized for the perfect equilibrium between aesthetics and utility.' },
                        { icon: Hammer, title: ar ? 'جودة لا تضاهى' : 'UNMATCHED QUALITY', desc: ar ? 'نستخدم أفضل المواد الطبيعية مع تقنيات تصنيع متقدمة.' : 'Employing premium natural resources with advanced manufacturing protocols.' },
                        { icon: ShieldCheck, title: ar ? 'الالتزام والشفافية' : 'INTEGRITY & TRUST', desc: ar ? 'علاقاتنا مع عملائنا مبنية على الثقة المتبادلة والنتائج الملموسة.' : 'Founding our client relationships on absolute transparency and verified results.' },
                     ].map((p, i) => (
                        <motion.div 
                           key={i}
                           initial={{ opacity: 0, y: 20 }}
                           whileInView={{ opacity: 1, y: 0 }}
                           viewport={{ once: true }}
                           transition={{ delay: i * 0.2 }}
                           className="bg-ikea-gray rounded-[3rem] p-12 border border-ikea-gray hover:bg-white hover:shadow-2xl transition-all group"
                        >
                           <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-ikea-blue mb-8 group-hover:bg-ikea-blue group-hover:text-white transition-colors shadow-sm">
                              <p.icon size={32} />
                           </div>
                           <h3 className="text-2xl font-black text-ikea-black mb-4 uppercase tracking-tighter">{p.title}</h3>
                           <p className="text-ikea-darkGray font-medium leading-relaxed opacity-60 group-hover:opacity-100 transition-opacity">{p.desc}</p>
                        </motion.div>
                     ))}
                  </div>
               </div>
            </section>

            {/* ── Brand Commitment ── */}
            <section className="bg-ikea-black text-white py-40 overflow-hidden relative">
                <div className="container mx-auto px-6 max-w-5xl text-center relative z-10">
                   <h2 className="text-4xl md:text-7xl font-black tracking-tighter leading-tight mb-12">
                      {ar 
                         ? '“نحن نعيد تعريف الطريقة التي يتفاعل بها الناس مع مساحاتهم الخاصة.”' 
                         : '“WE ARE REDEFINING THE WAY PEOPLE INTERACT WITH THEIR DOMESTIC ENVIRONMENTS.”'}
                   </h2>
                   <div className="w-20 h-2 bg-ikea-yellow mx-auto rounded-full" />
                </div>
                <div className="absolute inset-0 opacity-5 flex items-center justify-center pointer-events-none">
                   <Box size={1000} className="rotate-45" />
                </div>
            </section>
        </div>
    );
};

export default Home;
