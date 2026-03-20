import React, { useRef, useEffect } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from 'framer-motion';
import { useLang } from '../App';

// ==============================================================================
// 1. CONSTANTS & LUXURY ASSETS
// ==============================================================================
const IMAGES = {
  hero: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=2000&q=90', // Elegant minimal interior
  craft1: 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?w=1200&q=85',
  craft2: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?w=1200&q=85',
  gallery: [
    { src: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1400&q=85', title: 'Living', subtitle: 'غرفة المعيشة' },
    { src: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1400&q=85', title: 'Bedroom', subtitle: 'غرفة النوم' },
    { src: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=1400&q=85', title: 'Dining', subtitle: 'غرفة الطعام' },
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
    <section ref={ref} className="relative h-[200vh] bg-[#0A0908]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">
        <motion.div className="absolute inset-0 w-full h-full" style={{ y: imgY }}>
          <img src={IMAGES.hero} className="w-full h-full object-cover scale-105" alt="Hero" />
        </motion.div>
        <motion.div className="absolute inset-0 bg-black" style={{ opacity: overlayOpacity }} />
        <motion.div
          className="relative z-10 flex flex-col items-center justify-center pointer-events-none w-full px-6"
          style={{ y: textY, opacity: textOpacity }}
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }}
            className="text-[#C5A87C] text-[10px] uppercase tracking-[0.4em] mb-6 font-sans"
          >
            {ar ? 'فـورسـت إيــدج الـريـاض' : 'Forest Edge Riyadh'}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-white text-[clamp(2.5rem,6vw,6rem)] font-serif tracking-tight leading-[1.1] text-center max-w-5xl"
          >
            {ar ? <>فخامة صاغتها<br />الأيـدي والـخـشـب.</> : <>Elegance Forged<br />In Wood.</>}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1 }}
            className="absolute bottom-[-15vh] w-[1px] h-24 bg-gradient-to-b from-[#C5A87C] to-transparent"
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
    <section ref={ref} className="relative h-[300vh] bg-[#F7F5F0]">
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
        <motion.div className="flex w-[300vw] h-full" style={{ x }}>
          {/* Panel 1 */}
          <div className="w-[100vw] h-full flex flex-col md:flex-row items-center justify-center px-12 md:px-24 gap-12">
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="w-[90%] max-w-[500px] aspect-[4/5] overflow-hidden rounded-sm shadow-2xl relative group">
                <img src={IMAGES.craft1} className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105" alt="Craft" />
              </div>
            </div>
            <div className="w-full md:w-1/2 flex flex-col items-start pt-10 md:pt-0">
              <p className="text-[#C5A87C] tracking-[0.3em] text-[10px] uppercase mb-4 font-sans">01. {ar ? 'الطريقة' : 'The Method'}</p>
              <h2 className="text-4xl md:text-6xl font-serif text-[#222222] mb-6 leading-tight">{ar ? <>حـرفـة<br />تـوارثـتهـا الأجـيـال</> : <>Hand Carved<br />Heritage.</>}</h2>
              <p className="text-[#222]/60 max-w-sm text-base leading-relaxed font-sans">
                {ar ? 'السرعة تنتمي للآلات. نحن نمنح حرفيينا الوقت. الوقت لفهم عروق الخشب، الوقت لتشكيل المفاصل، والوقت لإتقان اللمسات النهائية.' : 'Speed belongs to machines. We give our master artisans time. Time to understand the grain, time to shape the joints, time to perfect the finish.'}
              </p>
            </div>
          </div>
          {/* Panel 2 */}
          <div className="w-[100vw] h-full flex flex-col md:flex-row-reverse items-center justify-center px-12 md:px-24 gap-12">
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="w-[90%] max-w-[500px] aspect-[4/5] overflow-hidden rounded-sm shadow-2xl relative group">
                <img src={IMAGES.craft2} className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105" alt="Materials" />
              </div>
            </div>
            <div className="w-full md:w-1/2 flex flex-col items-start md:items-end text-left md:text-right pt-10 md:pt-0">
              <p className="text-[#C5A87C] tracking-[0.3em] text-[10px] uppercase mb-4 font-sans">02. {ar ? 'المادة' : 'The Material'}</p>
              <h2 className="text-4xl md:text-6xl font-serif text-[#222222] mb-6 leading-tight">{ar ? <>خشب صلب<br />فـقـط.</> : <>Solid Woods<br />Only.</>}</h2>
              <p className="text-[#222]/60 max-w-sm text-base leading-relaxed font-sans">
                {ar ? 'لا قشور. لا اختصارات. نحن نحصل فقط على أجود أنواع الأخشاب الصلبة المستدامة من جميع أنحاء العالم.' : 'No veneers. No shortcuts. We source only the finest, most sustainable solid hardwoods from around the globe.'}
              </p>
            </div>
          </div>
          {/* Panel 3 */}
          <div className="w-[100vw] h-full flex items-center justify-center flex-col px-12">
            <h2 className="text-5xl md:text-8xl font-serif text-[#222222] text-center mb-8">
              {ar ? <>صُـمـمـت<br />لـتـبقـى أجيالاً.</> : <>Designed For<br />Generations.</>}
            </h2>
            <div className="w-[1px] h-32 bg-[#C5A87C]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ==============================================================================
// 5. SCENE: HIGH-VELOCITY GALLERY
// ==============================================================================
const Card = ({ item, i, progress, total }: any) => {
  const targetScale = 1 - ((total - i) * 0.05);
  const scale = useTransform(progress, [0, 1], [1, targetScale]);
  const yImage = useTransform(progress, [0, 1], ['0%', '15%']);

  return (
    <div className="h-screen w-full flex items-center justify-center sticky top-0">
      <motion.div
        className="relative w-[90vw] md:w-[70vw] max-h-[80vh] aspect-[16/9] md:aspect-[21/9] rounded-lg overflow-hidden shadow-2xl origin-top"
        style={{ scale, top: `calc(-10vh + ${i * 40}px)` }}
      >
        <motion.img
          src={item.src} className="absolute w-full h-[130%] object-cover top-[-15%]"
          style={{ y: yImage }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
          <div>
            <p className="text-[#C5A87C] text-[10px] uppercase tracking-widest mb-1 font-sans">{item.subtitle}</p>
            <h3 className="text-white text-3xl md:text-5xl font-serif">{item.title}</h3>
          </div>
          <div className="text-white/30 font-serif text-2xl">0{i + 1}</div>
        </div>
      </motion.div>
    </div>
  );
};

const SceneGallery = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({ target: container, offset: ['start start', 'end end'] });
  return (
    <section ref={container} className="relative bg-[#0A0908] pb-[10vh]">
      {IMAGES.gallery.map((item, i) => (
        <Card key={i} item={item} i={i} progress={scrollYProgress} total={IMAGES.gallery.length} />
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
    <div className="antialiased selection:bg-[#C5A87C] selection:text-[#0A0908] bg-[#0A0908]">
      <SceneReveal lang={lang} />
      <SceneCraft lang={lang} />
      <SceneGallery />
    </div>
  );
};

export default Services;
