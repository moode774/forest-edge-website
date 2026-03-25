import React, { useRef, useEffect } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from 'framer-motion';
import { useLang } from '../store/context/LangContext';

// ==============================================================================
// 1. CONSTANTS & LUXURY ASSETS
// ==============================================================================
const IMAGES = {
  hero: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=95&w=2400',
  craft1: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=90&w=1400',
  craft2: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?auto=format&fit=crop&q=90&w=1400',
  gallery: [
    { src: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=90&w=1800', title: 'Living', subtitle: 'غرفة المعيشة', enSubtitle: 'LIVING SPACES' },
    { src: 'https://images.unsplash.com/photo-1616594039964-408e490051e0?auto=format&fit=crop&q=90&w=1800', title: 'Bedroom', subtitle: 'غرفة النوم', enSubtitle: 'RESTFUL SANCTUARY' },
    { src: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&q=90&w=1800', title: 'Dining', subtitle: 'غرفة الطعام', enSubtitle: 'CULINARY ELEGANCE' },
  ]
};

// ==============================================================================
// 3. SCENE: THE REVEAL
// ==============================================================================
const SceneReveal = ({ lang }: { lang: string }) => {
  const ar = lang === 'ar';
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const smooth = useSpring(scrollYProgress, { stiffness: 400, damping: 60 });

  const imgY = useTransform(smooth, [0, 1], ['0%', '30%']);
  const overlayOpacity = useTransform(smooth, [0, 0.8], [0.3, 0.9]);
  const textY = useTransform(smooth, [0, 0.5], ['0%', '-50%']);
  const textOpacity = useTransform(smooth, [0, 0.4], [1, 0]);

  return (
    <section ref={ref} className="relative h-[200vh] bg-[#2A1B14]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">
        <motion.div className="absolute inset-0 w-full h-full" style={{ y: imgY }}>
          <img src={IMAGES.hero} className="w-full h-full object-cover scale-105" alt="Hero" />
        </motion.div>
        <motion.div className="absolute inset-0 bg-[#2A1B14]" style={{ opacity: overlayOpacity }} />
        <motion.div
          className="relative z-10 flex flex-col items-center justify-center pointer-events-none w-full px-6"
          style={{ y: textY, opacity: textOpacity }}
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }}
            className="text-[#C5A059] text-[10px] uppercase tracking-[0.4em] mb-6 font-sans font-black"
          >
            {ar ? 'فـورسـت إيــدج الـريـاض' : 'FOREST EDGE RIYADH'}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-white text-[clamp(2.5rem,4vw,4.5rem)] font-black tracking-tighter leading-[1] text-center max-w-4xl uppercase"
          >
            {ar ? <>فخامة صاغتها<br />الأيـدي والـخـشـب.</> : <>Elegance Forged<br />In Wood.</>}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1 }}
            className="absolute bottom-[-15vh] w-[2px] h-32 bg-gradient-to-b from-[#C5A059] to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
};

// ==============================================================================
// 4. SCENE: THE CRAFT
// ==============================================================================
const SceneCraft = ({ lang }: { lang: string }) => {
  const ar = lang === 'ar';
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const smoothX = useSpring(scrollYProgress, { stiffness: 300, damping: 50 });
  const x = useTransform(smoothX, [0, 1], ar ? ['0%', '66.66%'] : ['0%', '-66.66%']);

  return (
    <section ref={ref} className="relative h-[300vh] bg-[#F4F1EE]">
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
        <motion.div className="flex w-[300vw] h-full" style={{ x }}>
          {/* Panel 1 */}
          <div className="w-[100vw] h-full flex flex-col md:flex-row items-center justify-center px-12 md:px-24 gap-12 lg:gap-32">
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="w-[85%] max-w-[480px] aspect-[10/12.5] overflow-hidden rounded-[1.5rem] shadow-2xl relative group border-4 border-white">
                <img src={IMAGES.craft1} className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110" alt="Craft" />
              </div>
            </div>
            <div className="w-full md:w-1/2 flex flex-col items-start pt-10 md:pt-0 text-start">
              <p className="text-[#C5A059] tracking-[0.4em] text-[10px] uppercase mb-5 font-black">01. {ar ? 'الطريقة' : 'THE METHOD'}</p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#2A1B14] mb-6 leading-[1] tracking-tighter uppercase">{ar ? <>حـرفـة<br />تـوارثـتهـا الأجـيـال</> : <>Hand Carved<br />Heritage.</>}</h2>
              <p className="text-[#2A1B14]/40 max-w-sm text-base leading-relaxed font-bold uppercase tracking-tight">
                {ar ? 'السرعة تنتمي للآلات. نحن نمنح حرفيينا الوقت. الوقت لفهم عروق الخشب، الوقت لتشكيل المفاصل، والوقت لإتقان اللمسات النهائية.' : 'Speed belongs to machines. We give our master artisans time. Time to understand the grain, time to shape the joints, and time to perfect the finish.'}
              </p>
            </div>
          </div>
          {/* Panel 2 */}
          <div className="w-[100vw] h-full flex flex-col md:flex-row-reverse items-center justify-center px-12 md:px-24 gap-12 lg:gap-32">
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="w-[85%] max-w-[480px] aspect-[10/12.5] overflow-hidden rounded-[1.5rem] shadow-2xl relative group border-4 border-white">
                <img src={IMAGES.craft2} className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110" alt="Materials" />
              </div>
            </div>
            <div className={`w-full md:w-1/2 flex flex-col ${ar ? 'items-end text-end' : 'items-start text-start'} pt-10 md:pt-0`}>
              <p className="text-[#C5A059] tracking-[0.4em] text-[10px] uppercase mb-5 font-black">02. {ar ? 'المادة' : 'THE MATERIAL'}</p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#2A1B14] mb-6 leading-[1] tracking-tighter uppercase">{ar ? <>خشب صلب<br />فـقـط.</> : <>Solid Woods<br />Only.</>}</h2>
              <p className="text-[#2A1B14]/40 max-w-sm text-base leading-relaxed font-bold uppercase tracking-tight">
                {ar ? 'لا قشور. لا اختصارات. نحن نحصل فقط على أجود أنواع الأخشاب الصلبة المستدامة من جميع أنحاء العالم.' : 'No veneers. No shortcuts. We source only the finest, most sustainable solid hardwoods from around the globe.'}
              </p>
            </div>
          </div>
          {/* Panel 3 */}
          <div className="w-[100vw] h-full flex items-center justify-center flex-col px-12">
            <h2 className="text-5xl md:text-7xl lg:text-9xl font-black text-[#2A1B14] text-center mb-10 tracking-tighter leading-[0.9] uppercase">
              {ar ? <>صُـمـمـت<br />لـتـبقـى أجيالاً.</> : <>DESIGNED FOR<br />GENERATIONS.</>}
            </h2>
            <div className="w-[1px] h-32 bg-[#C5A059]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ==============================================================================
// 5. SCENE: HIGH-VELOCITY GALLERY
// ==============================================================================
const Card = ({ item, i, progress, total, lang }: any) => {
  const ar = lang === 'ar';
  const targetScale = 1 - ((total - i) * 0.05);
  const scale = useTransform(progress, [0, 1], [1, targetScale]);
  const yImage = useTransform(progress, [0, 1], ['0%', '15%']);

  return (
    <div className="h-screen w-full flex items-center justify-center sticky top-0">
      <motion.div
        className="relative w-[90vw] md:w-[75vw] max-h-[80vh] aspect-[16/8.5] md:aspect-[21/9] rounded-[2rem] overflow-hidden shadow-2xl origin-top border-2 border-white/10"
        style={{ scale, top: `calc(-8vh + ${i * 40}px)` }}
      >
        <motion.img
          src={item.src} className="absolute w-full h-[140%] object-cover top-[-20%]"
          style={{ y: yImage }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2A1B14] via-transparent to-transparent" />
        <div className={`absolute bottom-10 ${ar ? 'right-10 left-10' : 'left-10 right-10'} flex justify-between items-end`}>
          <div className="text-start">
            <p className="text-[#C5A059] text-[10px] uppercase tracking-[0.3em] mb-2 font-black">{ar ? item.subtitle : item.enSubtitle}</p>
            <h3 className="text-white text-4xl md:text-6xl font-black tracking-tighter uppercase">{ar ? item.subtitle : item.title}</h3>
          </div>
          <div className="text-[#C5A059] font-black text-6xl md:text-8xl opacity-20 leading-none select-none">0{i + 1}</div>
        </div>
      </motion.div>
    </div>
  );
};

const SceneGallery = ({ lang }: { lang: string }) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({ target: container, offset: ['start start', 'end end'] });
  return (
    <section ref={container} className="relative bg-[#2A1B14] pb-[20vh]">
      {IMAGES.gallery.map((item, i) => (
        <Card key={i} item={item} i={i} progress={scrollYProgress} total={IMAGES.gallery.length} lang={lang} />
      ))}
    </section>
  );
};

// ==============================================================================
// 7. ROOT COMPONENT
// ==============================================================================
export const Services: React.FC = () => {
  const { lang } = useLang();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="antialiased selection:bg-[#C5A059] selection:text-white bg-[#2A1B14] f-sans">
      <SceneReveal lang={lang} />
      <SceneCraft lang={lang} />
      <SceneGallery lang={lang} />
    </div>
  );
};

export default Services;
