import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLang } from '../store/context/LangContext';
import { ArrowRight, ArrowUpRight, Layers, Ruler, Zap } from 'lucide-react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

/* ─── Reveal hook ─── */
const useReveal = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-70px 0px' });
  return { ref, isInView };
};

/* ─── Counter ─── */
const Counter = ({ to, duration = 2 }: { to: number; duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let s = 0;
    const step = to / (duration * 60);
    const timer = setInterval(() => {
      s += step;
      if (s >= to) { setCount(to); clearInterval(timer); }
      else setCount(Math.floor(s));
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [inView, to, duration]);
  return <span ref={ref}>{count}</span>;
};

/* ═══════════════════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════════════════ */
const Hero = ({ lang }: { lang: string }) => {
  const ar = lang === 'ar';
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '24%']);

  const iv = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } } };

  return (
    <section ref={heroRef} className="min-h-screen bg-[#FDFCFB] overflow-hidden relative flex items-center pt-24 md:pt-32">
      {/* Ambient glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C5A059]/5 rounded-full filter blur-[120px] translate-x-[30%] -translate-y-[30%] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#2A1B14]/5 rounded-full filter blur-[100px] -translate-x-[30%] translate-y-[30%] pointer-events-none" />
      {/* Grid texture */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(42,27,20,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(42,27,20,0.03)_1px,transparent_1px)] bg-[length:100px_100px] pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-6 md:px-12 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">

          {/* Left text */}
          <motion.div initial="hidden" animate="visible" transition={{ staggerChildren: 0.15 }}>
            <motion.div variants={iv} className="mb-8">
              <span className="inline-flex items-center border-2 border-[#2A1B14]/10 rounded-full px-6 py-2.5 gap-3 font-sans text-[10px] font-black tracking-[0.3em] uppercase text-[#C5A059] bg-white/60 backdrop-blur-md shadow-sm">
                <span className="w-2 h-2 bg-[#C5A059] rounded-full animate-pulse" />
                {ar ? 'قصتنا الهندسية · منذ ١٩٩٨' : 'ENGINEERING SUCCESS · SINCE 1998'}
              </span>
            </motion.div>

            <motion.h1 variants={iv} className="font-black text-5xl md:text-6xl lg:text-7xl leading-[1] tracking-tighter text-[#2A1B14] mb-10 uppercase">
              {ar
                ? <>حرفة<br /><span className="italic font-light text-[#C5A059]">تُورث</span><br />للأبد.</>
                : <>A CRAFT<br /><span className="italic font-light text-[#C5A059]">INHERITED,</span><br />BY DESIGN.</>}
            </motion.h1>

            <motion.p variants={iv} className="font-sans text-lg font-bold text-[#2A1B14]/40 leading-relaxed max-w-lg mb-12 uppercase tracking-tight">
              {ar
                ? 'منذ عام 1998، نصنع في فورست إيدج قطعاً تتجاوز حدود الزمن، مجمعين بين الهندسة الدقيقة والجمال الطبيعي للأخشاب الصلبة.'
                : 'SINCE 1998, FOREST EDGE HAS CRAFTED PIECES THAT TRANSCEND TIME, MERGING PRECISION ENGINEERING WITH THE NATURAL MAJESTY OF SOLID WOODS.'}
            </motion.p>

            {/* Stats */}
            <motion.div variants={iv} className="flex flex-wrap gap-10 pt-10 border-t border-[#2A1B14]/5">
              {[{ n: 26, s: '', l: ar ? 'سنة خبرة' : 'YEARS EXP' }, { n: 450, s: '+', l: ar ? 'مشروع منفذ' : 'PROJECTS' }, { n: 100, s: '%', l: ar ? 'جودة صلبة' : 'SOLID QUALITY' }].map(s => (
                <div key={s.l}>
                  <div className="font-black text-3xl md:text-4xl text-[#2A1B14] leading-none tracking-tighter"><Counter to={s.n} />{s.s}</div>
                  <div className="font-sans text-[9px] font-black tracking-[0.3em] uppercase text-[#C5A059] mt-2">{s.l}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right image */}
          <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative">
            <div className={`overflow-hidden aspect-[10/12.5] shadow-2xl border-4 border-white ${ar ? 'rounded-[80px_24px_24px_24px]' : 'rounded-[24px_80px_24px_24px]'}`}>
              <motion.img
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=90&w=1400"
                alt="Craftsman"
                style={{ y: imgY }}
                className="w-full h-full object-cover" />
            </div>

            {/* Floating quote badge */}
            <motion.div
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className={`absolute bottom-[-30px] ${ar ? 'right-[-30px]' : 'left-[-30px]'} bg-[#2A1B14] text-white p-8 md:p-10 max-w-[240px] shadow-2xl animate-float border-2 border-[#C5A059]/20`}>
              <div className="font-black text-base italic leading-tight text-white mb-4 uppercase tracking-tighter">
                {ar ? '"نصنع ما يبقى بعد زمنه"' : '"WE BUILD WHAT OUTLASTS ITS TIME"'}
              </div>
              <div className="font-sans text-[10px] font-black tracking-[0.3em] uppercase text-[#C5A059]">
                {ar ? 'المؤسس' : 'FOUNDER'}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* ─── MARQUEE ─── */
const MarqueeStrip = ({ lang }: { lang: string }) => {
  const ar = lang === 'ar';
  const items = ar
    ? ['حرفية استثنائية', '✦', 'مواد طبيعية', '✦', 'تصميم خالد', '✦', 'جودة بلا تنازلات', '✦', 'إرث راقٍ', '✦']
    : ['EXCEPTIONAL CRAFT', '✦', 'NATURAL MATERIALS', '✦', 'TIMELESS DESIGN', '✦', 'SOLID QUALITY', '✦', 'REFINED HERITAGE', '✦'];
  const doubled = [...items, ...items, ...items];
  return (
    <div className="border-y-2 border-[#2A1B14]/5 bg-[#2A1B14] py-8 overflow-hidden">
      <div className="flex w-max animate-marquee font-sans">
        {doubled.map((item, i) => (
          <span key={i} className={`text-[11px] font-black tracking-[0.4em] uppercase px-12 whitespace-nowrap ${item === '✦' ? 'text-[#C5A059]' : 'text-white/60'}`}>{item}</span>
        ))}
      </div>
    </div>
  );
};

/* ─── VALUES ─── */
const Values = ({ lang }: { lang: string }) => {
  const ar = lang === 'ar';
  const { ref, isInView } = useReveal();
  const vals = ar
    ? [{ title: 'التوازن', desc: 'تناغم استثنائي بين المساحة والضوء والمادة في كل قطعة نصممها.' }, { title: 'الهندسة', desc: 'أساليب نجارة تقليدية ممزوجة بالهندسة الحديثة لنتائج تدوم طويلاً.' }, { title: 'الأصالة', desc: 'التزام تام بالمواد الطبيعية 100٪ بدون أي تنازلات في الجودة.' }]
    : [{ title: 'BALANCE', desc: 'EXCEPTIONAL HARMONY BETWEEN SPACE, LIGHT, AND MATERIAL IN EVERY DESIGN.' }, { title: 'ENGINEERING', desc: 'TRADITIONAL JOINERY METHODS FUSED WITH MODERN ENGINEERING FOR ENDURING RESULTS.' }, { title: 'AUTHENTICITY', desc: 'ABSOLUTE COMMITMENT TO 100% NATURAL MATERIALS WITHOUT COMPROMISE.' }];

  const icons = [<Ruler size={24} strokeWidth={2.5} />, <Layers size={24} strokeWidth={2.5} />, <Zap size={24} strokeWidth={2.5} />];

  return (
    <section ref={ref} className="py-24 md:py-32 bg-white overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-6 md:px-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: .8, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-6 mb-24 lg:mb-32">
          <div className="w-12 h-[2px] bg-[#C5A059]" />
          <span className="font-sans text-[11px] font-black tracking-[0.5em] uppercase text-[#C5A059]">{ar ? 'قيمنا الهندسية' : 'OUR CORE VALUES'}</span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24">
          {vals.map((v: any, i: number) => (
            <motion.div key={i} 
              className="group pt-12 border-t-2 border-[#2A1B14]/5 hover:border-[#C5A059] transition-colors duration-700 cursor-default"
              initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 1, ease: [0.22, 1, 0.36, 1] }}>
              <div className="w-16 h-16 border border-[#2A1B14]/5 flex items-center justify-center mb-8 text-[#C5A059] transition-all duration-500 group-hover:bg-[#2A1B14] group-hover:text-white group-hover:border-[#2A1B14] shadow-sm rounded-xl">{icons[i]}</div>
              <h3 className="font-black text-2xl text-[#2A1B14] mb-4 tracking-tighter uppercase">{v.title}</h3>
              <p className="font-sans text-[15px] font-bold text-[#2A1B14]/30 leading-relaxed uppercase tracking-tight">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── DARK QUOTE ─── */
const DarkQuote = ({ lang }: { lang: string }) => {
  const ar = lang === 'ar';
  const { ref, isInView } = useReveal();
  return (
    <section ref={ref} className="bg-[#2A1B14] py-32 md:py-48 px-6 relative overflow-hidden text-center">
      <div className={`absolute top-[-50px] ${ar ? 'right-20' : 'left-20'} text-[300px] font-black text-white/5 leading-none select-none pointer-events-none tracking-tighter`}>"</div>
      <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-4xl mx-auto relative z-10">
        <div className="w-12 h-[2px] bg-[#C5A059] mx-auto mb-16" />
        <blockquote className="font-black text-3xl md:text-5xl lg:text-6xl italic text-white leading-[1] tracking-tighter mb-16 uppercase">
          {ar
            ? '"الأثاث الحقيقي لا يُصنع فقط من الخشب — بل من الوقت والصبر والحب."'
            : '"TRUE FURNITURE IS NOT MADE MERELY FROM WOOD — BUT FROM TIME, PATIENCE, AND LOVE."'}
        </blockquote>
        <div className="font-sans text-[12px] font-black tracking-[0.4em] uppercase text-[#C5A059]">
          {ar ? 'سليم العمري — مؤسس فورست إيدج' : 'SALIM AL-OMARI — FOUNDER, FOREST EDGE'}
        </div>
      </motion.div>
    </section>
  );
};

/* ─── MATERIALS ─── */
const Materials = ({ lang }: { lang: string }) => {
  const ar = lang === 'ar';
  const { ref, isInView } = useReveal();

  const mats = ar
    ? ['بلوط أمريكي مُعالَج بالبخار', 'رخام كرارا الإيطالي', 'نحاس مصقول يدوياً', 'جلد سافيانو الطبيعي', 'خشب الجوز الفرنسي']
    : ['STEAM-TREATED AMERICAN OAK', 'ITALIAN CARRARA MARBLE', 'HAND-BURNISHED BRASS', 'NATURAL SAFFIANO LEATHER', 'FRENCH WALNUT'];

  return (
    <section ref={ref} className="py-24 md:py-32 bg-[#F4F1EE]">
      <div className="max-w-[1240px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-center">
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: .8, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-6 mb-10">
              <div className="w-12 h-[2px] bg-[#C5A059]" />
              <span className="font-sans text-[11px] font-black tracking-[0.5em] uppercase text-[#C5A059]">{ar ? 'المواد الخام' : 'RAW MATERIALS'}</span>
            </motion.div>

            <motion.h2 initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: .1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="font-black text-4xl md:text-5xl lg:text-6xl text-[#2A1B14] leading-[1] tracking-tighter mb-12 uppercase">
              {ar
                ? <>مواد تحكي <span className="italic font-light text-[#C5A059]">قصة</span> هندسية.</>
                : <>MATERIALS THAT TELL A <span className="italic font-light text-[#C5A059]">LEGACY.</span></>}
            </motion.h2>

            <div className="flex flex-col border-t-2 border-[#2A1B14]/5 mt-12">
              {mats.map((m: string, i: number) => (
                <motion.div key={i} 
                  className={`flex items-center gap-8 py-8 border-b-2 border-[#2A1B14]/5 transition-all duration-500 group cursor-default ${ar ? 'hover:pr-6' : 'hover:pl-6'}`}
                  initial={{ opacity: 0, x: ar ? 30 : -30 }} animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: .1 * i + .3, duration: .8, ease: [0.22, 1, 0.36, 1] }}>
                  <div className="w-10 h-10 rounded-full border border-[#2A1B14]/5 flex items-center justify-center font-black text-[12px] text-[#C5A059] group-hover:bg-[#C5A059] group-hover:text-white group-hover:border-[#C5A059] transition-all duration-500 shadow-sm bg-white">0{i + 1}</div>
                  <span className="font-black text-lg text-[#2A1B14] tracking-tight uppercase">{m}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div initial={{ opacity: 0, y: 50 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: .3, duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-2 gap-6 relative">
            <div className="overflow-hidden aspect-[10/12.5] rounded-[64px_8px_8px_8px] shadow-2xl border-4 border-white">
              <img src="https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=90&w=800" alt="Luxury Chair" className="w-full h-full object-cover transition-transform duration-[2s] hover:scale-110" />
            </div>
            <div className="overflow-hidden aspect-[10/12.5] rounded-[8px_8px_64px_8px] shadow-2xl border-4 border-white mt-16">
              <img src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=90&w=800" alt="Luxury Bedroom" className="w-full h-full object-cover transition-transform duration-[2s] hover:scale-110" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* ─── MAIN ─── */
export const About: React.FC = () => {
    const { lang } = useLang();
    const cursorRef = useRef<HTMLDivElement>(null);

    const onMouseMove = useCallback((e: MouseEvent) => {
        if (cursorRef.current) {
            cursorRef.current.style.left = e.clientX + 'px';
            cursorRef.current.style.top = e.clientY + 'px';
        }
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
        window.addEventListener('mousemove', onMouseMove);
        return () => window.removeEventListener('mousemove', onMouseMove);
    }, [onMouseMove]);

    return (
        <div className="w-full min-h-screen bg-[#FDFCFB] antialiased selection:bg-[#C5A059] selection:text-white overflow-hidden">
            <style>{`
                .animate-marquee {
                    animation: marquee 40s linear infinite;
                }
                @keyframes marquee {
                    from { transform: translateX(0); }
                    to { transform: translateX(-33.33%); }
                }
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0) rotate(0deg); }
                    50% { transform: translateY(-15px) rotate(1deg); }
                }
                #cursor-glow {
                    position: fixed; width: 400px; height: 400px;
                    border-radius: 50%; pointer-events: none; z-index: 9999;
                    background: radial-gradient(circle, rgba(197,160,89,0.08) 0%, transparent 70%);
                    transform: translate(-50%, -50%);
                    transition: opacity 0.5s ease;
                }
                @media (max-width: 1024px) { #cursor-glow { display: none; } }
            `}</style>

            <div id="cursor-glow" ref={cursorRef} />

            <main>
                <Hero lang={lang} />
                <MarqueeStrip lang={lang} />
                <Values lang={lang} />
                <DarkQuote lang={lang} />
                <Materials lang={lang} />
            </main>
        </div>
    );
}

export default About;
