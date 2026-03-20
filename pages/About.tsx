import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../App';
import { translations } from '../content/translations';
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
const Hero = ({ lang, t }: { lang: string; t: any }) => {
  const ar = lang === 'ar';
  const aboutT = t.about || {};
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  const iv = { hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } } };

  return (
    <section ref={heroRef} className="min-h-screen bg-[#FDFCFB] overflow-hidden relative flex items-center pt-24 md:pt-32">
      {/* Ambient glows */}
      <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-radial-gradient from-[#EDE8DF] to-transparent opacity-70 translate-x-[30%] -translate-y-[30%] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-radial-gradient from-[#EDE8DF] to-transparent opacity-50 -translate-x-[30%] translate-y-[30%] pointer-events-none" />
      {/* Grid texture */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(28,28,26,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(28,28,26,0.025)_1px,transparent_1px)] bg-[length:80px_80px] pointer-events-none" />

      <div className="max-w-[1380px] mx-auto px-6 md:px-10 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left text */}
          <motion.div initial="hidden" animate="visible" transition={{ staggerChildren: 0.11 }}>
            <motion.div variants={iv} className="mb-8">
              <span className="inline-flex items-center border border-[#1C1C1A]/10 rounded-full px-4 py-1.5 gap-2 font-sans text-[10px] tracking-[0.2em] uppercase text-[#8A7A6B] bg-white/60 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 bg-[#8A7A6B] rounded-full animate-pulse" />
                {ar ? 'قصتنا · منذ ١٩٩٨' : 'Our Story · Since 1998'}
              </span>
            </motion.div>

            <motion.h1 variants={iv} className="font-serif text-5xl md:text-7xl font-light leading-[1.03] tracking-tight text-[#282828] mb-8">
              {aboutT.title
                ? aboutT.title
                : ar
                  ? <>حرفة<br /><em className="italic font-light text-[#8A7A6B]">تُورث</em><br />لا تُنسى.</>
                  : <>A craft<br /><em className="italic font-light text-[#8A7A6B]">inherited,</em><br />not forgotten.</>}
            </motion.h1>

            <motion.p variants={iv} className="font-sans text-base font-light text-[#737373] leading-relaxed max-w-lg mb-12">
              {aboutT.description || (ar
                ? 'منذ عام 1998، نصنع أثاثاً يجمع بين الجمال المعماري والراحة المطلقة — قطع مصممة لتبقى.'
                : 'Since 1998, we create furniture that merges architectural beauty with absolute comfort — pieces designed to last.')}
            </motion.p>

            {/* Stats */}
            <motion.div variants={iv} className="flex flex-wrap gap-10 pt-10 border-t border-[#1C1C1A]/10">
              {[{ n: 26, s: '', l: ar ? 'سنة' : 'Years' }, { n: 340, s: '+', l: ar ? 'مشروع' : 'Projects' }, { n: 12, s: '', l: ar ? 'دولة' : 'Countries' }, { n: 98, s: '%', l: ar ? 'رضا' : 'Satisfaction' }].map(s => (
                <div key={s.l}>
                  <div className="font-serif text-3xl font-light text-[#282828] leading-none"><Counter to={s.n} />{s.s}</div>
                  <div className="font-sans text-[9px] tracking-[0.2em] uppercase text-[#737373] mt-1.5">{s.l}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right image */}
          <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative">
            <div className={`overflow-hidden aspect-[4/5] shadow-2xl ${ar ? 'rounded-[120px_8px_8px_8px]' : 'rounded-[8px_120px_8px_8px]'}`}>
              <motion.img
                src="https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=85&w=1000"
                alt="Craftsman"
                style={{ y: imgY }}
                className="w-full h-full object-cover" />
            </div>

            {/* Floating quote badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: .8, ease: [0.22, 1, 0.36, 1] }}
              className={`absolute bottom-[-28px] ${ar ? 'right-[-36px]' : 'left-[-36px]'} bg-[#282828] text-white p-6 md:p-8 max-w-[230px] shadow-2xl animate-float`}>
              <div className="font-serif text-sm italic font-light font-light leading-relaxed text-white mb-3">
                {ar ? '"نصنع ما يبقى بعد زمنه"' : '"We build what outlasts its time"'}
              </div>
              <div className="font-sans text-[9px] tracking-[0.24em] uppercase text-[#B09A86]">
                {ar ? 'المؤسس' : 'Founder'}
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
    : ['Exceptional Craft', '✦', 'Natural Materials', '✦', 'Timeless Design', '✦', 'Uncompromising Quality', '✦', 'Refined Heritage', '✦'];
  const doubled = [...items, ...items];
  return (
    <div className="border-y border-[#1C1C1A]/10 bg-[#F5F2EE] py-4 overflow-hidden">
      <div className="flex w-max animate-marquee font-sans">
        {doubled.map((item, i) => (
          <span key={i} className={`text-[10px] tracking-[0.22em] uppercase px-6 whitespace-nowrap ${item === '✦' ? 'text-[#8A7A6B]' : 'text-[#737373]'}`}>{item}</span>
        ))}
      </div>
    </div>
  );
};

/* ─── VALUES ─── */
const Values = ({ lang, t }: { lang: string; t: any }) => {
  const ar = lang === 'ar';
  const { ref, isInView } = useReveal();
  const icons = [<Ruler size={24} strokeWidth={1.5} />, <Layers size={24} strokeWidth={1.5} />, <Zap size={24} strokeWidth={1.5} />];

  const fallbackVals = ar
    ? [{ title: 'التوازن', desc: 'تناغم استثنائي بين المساحة والضوء والمادة في كل قطعة.' }, { title: 'الحرفية', desc: 'أساليب نجارة تقليدية ممزوجة بالهندسة الحديثة لنتائج تدوم.' }, { title: 'الأصالة', desc: 'التزام تام بالمواد الطبيعية 100٪ بدون أي تنازلات.' }]
    : [{ title: 'Balance', desc: 'Exceptional harmony between space, light, and material in every design.' }, { title: 'Craftsmanship', desc: 'Traditional joinery methods fused with modern engineering for enduring results.' }, { title: 'Authenticity', desc: 'Absolute commitment to 100% natural materials without compromise.' }];

  const vals = t.about?.values || fallbackVals;
  const sectionTitle = t.about?.valuesTitle || (ar ? 'قيمنا' : 'Our Values');

  return (
    <section ref={ref} className="py-24 md:py-32 bg-white">
      <div className="max-w-[1380px] mx-auto px-6 md:px-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: .8, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-5 mb-16 md:mb-20">
          <div className="w-8 h-[1px] bg-[#8A7A6B]" />
          <span className="font-sans text-[10px] tracking-[0.32em] uppercase text-[#8A7A6B]">{sectionTitle}</span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {vals.map((v: any, i: number) => (
            <motion.div key={i} 
              className="pt-10 border-t border-[#1C1C1A]/10 hover:border-[#8A7A6B] transition-colors duration-500 cursor-default"
              initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.13, duration: .9, ease: [0.22, 1, 0.36, 1] }}>
              <div className="w-14 h-14 border border-[#1C1C1A]/10 flex items-center justify-center mb-8 text-[#8A7A6B] transition-all duration-400 group-hover:bg-[#282828] group-hover:text-white group-hover:border-[#282828]">{icons[i]}</div>
              <h3 className="font-serif text-2xl font-light text-[#282828] mb-4">{v.title}</h3>
              <p className="font-sans text-sm font-light text-[#737373] leading-relaxed">{v.desc}</p>
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
    <section ref={ref} className="bg-[#282828] py-24 md:py-32 px-6 relative overflow-hidden">
      <div className={`font-serif absolute top-[-80px] ${ar ? 'right-10' : 'left-10'} text-[380px] font-light text-white/5 leading-none select-none pointer-events-none`}>"</div>
      <motion.div initial={{ opacity: 0, y: 28 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-3xl mx-auto text-center relative z-10">
        <div className="w-8 h-[1px] bg-[#8A7A6B] mx-auto mb-10" />
        <blockquote className="font-serif text-2xl md:text-3xl lg:text-4xl italic font-light text-white leading-relaxed mb-10">
          {ar
            ? '"الأثاث الحقيقي لا يُصنع فقط من الخشب — بل من الوقت والصبر والحب."'
            : '"True furniture is not made merely from wood — but from time, patience, and love."'}
        </blockquote>
        <div className="font-sans text-[10px] tracking-[0.26em] uppercase text-[#B09A86]">
          {ar ? 'سليم العمري — مؤسس فورست إيدج' : 'Salim Al-Omari — Founder, ForestEdge'}
        </div>
      </motion.div>
    </section>
  );
};

/* ─── MATERIALS ─── */
const Materials = ({ lang, t }: { lang: string; t: any }) => {
  const ar = lang === 'ar';
  const { ref, isInView } = useReveal();

  const fallbackMats = ar
    ? ['بلوط أمريكي مُعالَج بالبخار', 'رخام كرارا الإيطالي', 'نحاس مصقول يدوياً', 'جلد سافيانو الطبيعي', 'خشب الجوز الفرنسي']
    : ['Steam-treated American Oak', 'Italian Carrara Marble', 'Hand-burnished Brass', 'Natural Saffiano Leather', 'French Walnut'];

  const mats: string[] = t.about?.materialsList || fallbackMats;
  const matsTitle = t.about?.materialsTitle || (ar ? 'المواد الخام' : 'Raw Materials');

  return (
    <section ref={ref} className="py-24 md:py-32 bg-[#F5F2EE]">
      <div className="max-w-[1380px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: .8, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-4 mb-6">
              <div className="w-8 h-[1px] bg-[#8A7A6B]" />
              <span className="font-sans text-[10px] tracking-[0.32em] uppercase text-[#8A7A6B]">{matsTitle}</span>
            </motion.div>

            <motion.h2 initial={{ opacity: 0, y: 22 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: .1, duration: .9, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-3xl md:text-5xl font-light text-[#282828] leading-tight mb-8">
              {ar
                ? <>مواد تحكي <em className="italic font-light text-[#8A7A6B]">قصة</em> من تلقاء نفسها.</>
                : <>Materials that tell a <em className="italic font-light text-[#8A7A6B]">story</em> of their own.</>}
            </motion.h2>

            <div className="flex flex-col border-t border-[#1C1C1A]/10 mt-10">
              {mats.map((m: string, i: number) => (
                <motion.div key={i} 
                  className="flex items-center gap-5 py-5 border-b border-[#1C1C1A]/10 hover:pl-4 transition-all duration-300 group cursor-default"
                  initial={{ opacity: 0, x: ar ? 18 : -18 }} animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: .1 * i + .25, duration: .7, ease: [0.22, 1, 0.36, 1] }}>
                  <div className="w-8 h-8 rounded-full border border-[#1C1C1A]/10 flex items-center justify-center font-sans text-[11px] text-[#8A7A6B] group-hover:bg-[#8A7A6B] group-hover:text-white group-hover:border-[#8A7A6B] transition-all duration-400">0{i + 1}</div>
                  <span className="font-sans text-sm text-[#282828]">{m}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div initial={{ opacity: 0, y: 36 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: .22, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-2 gap-4">
            <div className="overflow-hidden aspect-[3/4] rounded-[80px_4px_4px_4px] shadow-lg">
              <img src="https://images.unsplash.com/photo-1542823617-668a6239433e?auto=format&fit=crop&q=80&w=700" alt="Wood" className="w-full h-full object-cover transition-transform duration-1000 hover:scale-110" />
            </div>
            <div className="overflow-hidden aspect-[3/4] rounded-[4px_4px_80px_4px] shadow-lg mt-12">
              <img src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=700" alt="Material" className="w-full h-full object-cover transition-transform duration-1000 hover:scale-110" />
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
    const t = translations[lang] || {};
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
        <div className="w-full min-h-screen bg-[#FDFCFB]">
            <style>{`
                .animate-marquee {
                    animation: marquee 30s linear infinite;
                }
                @keyframes marquee {
                    from { transform: translateX(0); }
                    to { transform: translateX(-50%); }
                }
                .animate-float {
                    animation: float 4s ease-in-out infinite;
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                #cursor-glow {
                    position: fixed; width: 300px; height: 300px;
                    border-radius: 50%; pointer-events: none; z-index: 9999;
                    background: radial-gradient(circle, rgba(138,122,107,0.06) 0%, transparent 70%);
                    transform: translate(-50%, -50%);
                    transition: opacity 0.3s;
                }
                @media (max-width: 768px) { #cursor-glow { display: none; } }
            `}</style>

            <div id="cursor-glow" ref={cursorRef} />

            <main>
                <Hero lang={lang} t={t} />
                <MarqueeStrip lang={lang} />
                <Values lang={lang} t={t} />
                <DarkQuote lang={lang} />
                <Materials lang={lang} t={t} />
            </main>
        </div>
    );
}

export default About;