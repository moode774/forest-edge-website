import React, { useEffect } from 'react';
import { useLang } from '../store/context/LangContext';
import { Ruler, Layers, Zap, Heart, ArrowRight, Box } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const SectionHeader = ({ badge, title, ar }: { badge: string; title: string | React.ReactNode; ar: boolean }) => (
  <div className="mb-20">
    <div className="bg-ikea-blue inline-block px-4 py-1.5 mb-8 skew-x-[-4deg]">
       <span className="text-white text-[11px] font-black uppercase tracking-[0.4em] skew-x-[4deg] inline-block">
         {badge}
       </span>
    </div>
    <h2 className="text-5xl md:text-8xl font-black text-ikea-black tracking-tighter leading-[0.85]">
      {title}
    </h2>
  </div>
);

export const About: React.FC = () => {
  const { lang } = useLang();
  const ar = lang === 'ar';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full min-h-screen bg-white f-sans overflow-hidden" dir={ar ? 'rtl' : 'ltr'}>
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-40 overflow-hidden bg-ikea-gray/30">
        <div className="container mx-auto px-6 max-w-[1400px] grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: ar ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            <div className="bg-ikea-yellow text-ikea-blue inline-block px-10 py-5 mb-12 skew-x-[-4deg] shadow-2xl">
               <span className="font-black uppercase tracking-[0.5em] text-[14px] skew-x-[4deg]">
                  {ar ? 'تراثنا الصناعي' : 'INDUSTRIAL HERITAGE'}
               </span>
            </div>
            <h1 className="text-6xl md:text-[9.5rem] font-black text-ikea-black tracking-tighter leading-[0.8] mb-12">
               {ar ? <>هندسة<br /><span className="text-ikea-blue">التميز</span></> : <>CRAFTING<br /><span className="text-ikea-blue">LEGACY</span></>}
            </h1>
            <p className="text-ikea-darkGray text-xl md:text-2xl font-medium max-w-xl leading-relaxed opacity-60">
              {ar 
                ? 'منذ عام ١٩٩٨، نقوم بتحويل المواد الخام إلى قطع فنية تخدم أجيالاً. رؤيتنا هي دمج الدقة الهندسية مع الجودة الخالدة.' 
                : 'Since 1998, we have been transforming raw materials into artisanal landmarks. Our vision is to merge industrial precision with timeless quality.'}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/5] md:aspect-square rounded-[4rem] overflow-hidden shadow-2xl border-8 border-white group">
              <img 
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200" 
                alt="" 
                className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 md:bottom-20 md:-left-20 bg-ikea-blue text-white p-12 rounded-[2.5rem] shadow-2xl z-20 skew-x-[-4deg]">
              <div className="skew-x-[4deg]">
                 <span className="text-6xl font-black tracking-tighter block mb-2 text-ikea-yellow">25Y+</span>
                 <span className="text-[12px] font-black uppercase tracking-[0.3em] opacity-80">
                   {ar ? 'من الريادة في التصميم' : 'DESIGN DOMINANCE'}
                 </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-40 bg-white">
        <div className="container mx-auto px-6 max-w-[1400px]">
          <SectionHeader 
            badge={ar ? 'مبادئنا الهندسية' : 'OPERATIONAL PRINCIPLES'} 
            title={ar ? <>نكرس جهودنا<br />للكمال</> : <>DEDICATED TO<br />ABSOLUTE PERFECTION</>} 
            ar={ar}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: Ruler, tEn: 'PRECISION', tAr: 'الدقة المتناهية', dEn: 'Millimeter-perfect engineering ensures every unit integrates seamlessly into your environment.', dAr: 'هندسة دقيقة حتى المليمتر تضمن تكامل كل قطعة بسلاسة في مساحتك.' },
              { icon: Layers, tEn: 'MATERIALITY', tAr: 'أصالة المواد', dEn: 'We source only verified sustainable hardwoods and industrial-grade metals.', dAr: 'نستخدم فقط الأخشاب الصلبة المستدامة المعتمدة والمعادن ذات الجودة الصناعية.' },
              { icon: Zap, tEn: 'INNOVATION', tAr: 'الابتكار الهيكلي', dEn: 'Advanced manufacturing protocols fused with traditional artisanal finish.', dAr: 'بروتوكولات تصنيع متقدمة تندمج مع اللمسات الحرفية التقليدية.' }
            ].map((v, i) => (
              <div 
                key={i}
                className="bg-ikea-gray rounded-[3rem] p-12 border border-ikea-gray hover:bg-white hover:shadow-2xl transition-all group"
              >
                <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-ikea-blue mb-10 shadow-sm group-hover:bg-ikea-blue group-hover:text-white transition-colors">
                  <v.icon size={40} />
                </div>
                <h3 className="text-3xl font-black text-ikea-black mb-6 tracking-tight uppercase">{ar ? v.tAr : v.tEn}</h3>
                <p className="text-lg font-medium text-ikea-darkGray opacity-60 group-hover:opacity-100 transition-opacity leading-relaxed">{ar ? v.dAr : v.dEn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ikea-blue py-40 md:py-60 relative overflow-hidden text-white flex flex-col items-center text-center">
         <div className="w-24 h-24 bg-ikea-yellow rounded-full flex items-center justify-center text-ikea-blue mb-16 shadow-2xl">
            <Heart size={48} fill="currentColor" />
         </div>
         <h2 className="text-5xl md:text-9xl font-black tracking-tighter leading-[0.85] mb-20 italic container px-6">
           {ar 
             ? '“هدفنا ليس مجرد بيع الأثاث، بل هندسة الراحة في كل زاوية من حياتك.”' 
             : '“OUR OBJECTIVE IS NOT MERELY COMMERCE; IT IS TO ARCHITECT COMFORT IN EVERY VECTOR OF YOUR LIFE.”'}
         </h2>
      </section>

      <section className="py-40 bg-white text-center">
          <h2 className="text-5xl md:text-8xl font-black text-ikea-black tracking-tighter leading-none mb-16">
            {ar ? <>جاهز لتجربة<br /><span className="text-ikea-blue">الفرق؟</span></> : <>READY TO FEEL<br /><span className="text-ikea-blue">THE DIFFERENCE?</span></>}
          </h2>
          <Link 
            to="/store" 
            className="inline-flex items-center gap-6 bg-ikea-blue text-white px-16 py-8 rounded-full text-[15px] font-black uppercase tracking-widest hover:bg-[#00478b] transition-all shadow-2xl"
          >
            {ar ? 'تصفح المجموعة الكاملة' : 'ACCESS FULL COLLECTION'}
            <ArrowRight size={24} className={ar ? 'rotate-180' : ''} />
          </Link>
      </section>
    </div>
  );
};

export default About;
