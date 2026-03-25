import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../store/context/LangContext';
import { ArrowRight, ArrowUpRight, Play } from 'lucide-react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

/* ─── Reveal hook ─── */
const useReveal = (threshold = 0.15) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: `-${Math.round((1 - threshold) * 100)}px 0px` as any });
    return { ref, isInView };
};

/* ─── Animated counter ─── */
const Counter = ({ to, duration = 2 }: { to: number; duration?: number }) => {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true });
    useEffect(() => {
        if (!inView) return;
        let start = 0;
        const step = to / (duration * 60);
        const timer = setInterval(() => {
            start += step;
            if (start >= to) { setCount(to); clearInterval(timer); }
            else setCount(Math.floor(start));
        }, 1000 / 60);
        return () => clearInterval(timer);
    }, [inView, to, duration]);
    return <span ref={ref}>{count}</span>;
};

/* ═══════════════════════════════════════════════════════
   HERO — Light Architectural with parallax
   ═══════════════════════════════════════════════════════ */
const HeroLight = ({ lang }: { lang: string }) => {
    const ar = lang === 'ar';
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
    const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);

    const containerVariants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.12 } },
    };
    const itemVariants = {
        hidden: { opacity: 0, y: 32 },
        visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
    };

    return (
        <section ref={heroRef} className="min-h-screen bg-[#FDFCFB] overflow-hidden relative flex items-center pt-24 md:pt-32">
            {/* Ambient glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C5A059]/5 rounded-full filter blur-[120px] translate-x-[30%] -translate-y-[30%] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#2A1B14]/5 rounded-full filter blur-[100px] -translate-x-[30%] translate-y-[30%] pointer-events-none" />

            <div className="max-w-[1240px] mx-auto px-6 md:px-10 w-full relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Left text */}
                    <motion.div variants={containerVariants} initial="hidden" animate="visible">
                        <motion.div variants={itemVariants} className="mb-6 md:mb-8">
                            <span className="inline-flex items-center border-2 border-[#2A1B14]/10 rounded-full px-6 py-2.5 gap-3 font-sans text-[10px] font-black tracking-[0.3em] uppercase text-[#C5A059] bg-white/60 backdrop-blur-md shadow-sm">
                                <span className="w-2 h-2 bg-[#C5A059] rounded-full animate-pulse" />
                                {ar ? 'فـورسـت إيــدج · ندرة الخشب' : 'FOREST EDGE · WOOD RARITY'}
                            </span>
                        </motion.div>

                        <motion.h1 variants={itemVariants} className="font-black text-5xl md:text-6xl lg:text-7xl leading-[1] tracking-tighter text-[#2A1B14] mb-8 uppercase">
                            {ar ? (
                                <>صناعة<br /><span className="italic font-light text-[#C5A059]">الفخامة</span><br />للأجيال.</>
                            ) : (
                                <>Crafting<br /><span className="italic font-light text-[#C5A059]">Legacy</span><br />For Ages.</>
                            )}
                        </motion.h1>

                        <motion.p variants={itemVariants} className="font-sans text-base md:text-lg font-bold text-[#2A1B14]/40 leading-relaxed max-w-lg mb-10 uppercase tracking-tight">
                            {ar
                                ? 'نبتكر أثاثاً يجمع بين الجمال المعماري والراحة المطلقة. قطع مصممة بعناية فائقة لتصبح إرثاً غنياً في مساحتك.'
                                : 'We create furniture that merges architectural beauty with absolute comfort. Meticulously designed pieces meant to become a heritage within your space.'}
                        </motion.p>

                        <motion.div variants={itemVariants} className="flex flex-wrap gap-6 items-center">
                            <Link to="/store" className="group flex items-center gap-6 bg-[#2A1B14] text-white px-10 py-5 rounded-full font-sans text-xs font-black tracking-[0.3em] uppercase transition-all duration-700 hover:bg-[#C5A059] shadow-2xl">
                                <span>{ar ? 'استكشف المجموعة' : 'EXPLORE COLLECTION'}</span>
                                <ArrowRight size={20} className={`transition-transform duration-500 group-hover:translate-x-2 ${ar ? 'rotate-180 group-hover:-translate-x-2' : ''}`} />
                            </Link>

                            <button className="group flex items-center gap-5 font-sans text-[11px] font-black tracking-[0.2em] uppercase text-[#2A1B14] hover:text-[#C5A059] transition-all duration-500">
                                <div className="w-14 h-14 rounded-full border-2 border-[#2A1B14]/10 flex items-center justify-center transition-all duration-500 group-hover:bg-[#C5A059] group-hover:border-[#C5A059] group-hover:text-white shadow-sm">
                                    <Play fill="currentColor" size={16} className={`${ar ? 'mr-1' : 'ml-1'}`} />
                                </div>
                                <span>{ar ? 'شاهد الفيلم' : 'PLAY FILM'}</span>
                            </button>
                        </motion.div>

                        {/* Stats row */}
                        <motion.div variants={itemVariants} className="flex gap-10 mt-12 pt-10 border-t border-[#2A1B14]/5">
                            {[
                                { n: 450, suffix: '+', label: ar ? 'مشروع مكتمل' : 'PROJECTS DONE' },
                                { n: 26, suffix: '', label: ar ? 'سنة خبرة' : 'YEARS CRAFT' },
                                { n: 100, suffix: '%', label: ar ? 'جودة صلبة' : 'SOLID QUALITY' },
                            ].map(s => (
                                <div key={s.label}>
                                    <div className="font-black text-3xl md:text-4xl text-[#2A1B14] leading-none tracking-tighter">
                                        <Counter to={s.n} />{s.suffix}
                                    </div>
                                    <div className="font-sans text-[9px] font-black tracking-[0.3em] uppercase text-[#C5A059] mt-2">{s.label}</div>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Right images with parallax */}
                    <div className="relative pb-10 lg:pb-16 hidden lg:block">
                        <motion.div style={{ y: imgY }}
                            initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}>
                            <div className="aspect-[10/12] rounded-[64px_24px_24px_24px] overflow-hidden shadow-2xl border-4 border-white">
                                <img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=90&w=1200"
                                     alt="Interior" className="w-full h-full object-cover transition-transform duration-[2.5s] hover:scale-110" />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                            className={`absolute bottom-[-20px] ${ar ? 'right-[-40px]' : 'left-[-40px]'} w-[60%] animate-float`}>
                            <div className="aspect-square rounded-[24px_24px_56px_24px] overflow-hidden border-4 border-white shadow-2xl">
                                <img src="https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&q=90&w=800"
                                     alt="Detail" className="w-full h-full object-cover transition-transform duration-[2.5s] hover:scale-110" />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            className={`absolute top-10 ${ar ? 'left-[-15px]' : 'right-[-15px]'} bg-[#2A1B14] text-white p-6 rounded-xl shadow-2xl border border-[#C5A059]/20 backdrop-blur-md`}>
                            <div className="font-sans text-[8px] font-black tracking-[0.3em] uppercase text-[#C5A059] mb-2">
                                {ar ? 'المجموعة المميزة' : 'FEATURED PIECE'}
                            </div>
                            <div className="font-black text-lg text-white tracking-tighter uppercase mb-1">
                                {ar ? 'أريكة كلاود' : 'CLOUD SOFA'}
                            </div>
                            <div className="font-sans text-xs font-black text-[#C5A059]">SAR 12,800</div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-30">
                <span className="font-sans text-[10px] font-black tracking-[0.4em] uppercase text-[#2A1B14] vertical-rl">SCROLL</span>
                <motion.div
                    animate={{ scaleY: [1, 0.3, 1] }}
                    transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                    className="w-[2px] h-12 bg-gradient-to-b from-[#2A1B14] to-transparent origin-top" />
            </div>
        </section>
    );
};

/* ─── MARQUEE ─── */
const MarqueeStrip = ({ lang }: { lang: string }) => {
    const ar = lang === 'ar';
    const items = ar
        ? ['حرفية استثنائية', '✦', 'مواد طبيعية', '✦', 'تصميم خالد', '✦', 'جودة لا مثيل', '✦', 'مساحات حيّة', '✦', 'إرث راقٍ', '✦']
        : ['EXCEPTIONAL CRAFT', '✦', 'NATURAL MATERIALS', '✦', 'TIMELESS DESIGN', '✦', 'UNMATCHED QUALITY', '✦', 'LIVING SPACES', '✦', 'REFINED HERITAGE', '✦'];
    const doubled = [...items, ...items, ...items];

    return (
        <div className="border-y-2 border-[#2A1B14]/5 bg-[#2A1B14] py-8 overflow-hidden">
            <div className="flex w-max animate-marquee hover:[animation-play-state:paused] font-sans">
                {doubled.map((item, i) => (
                    <span key={i} className={`text-[11px] font-black tracking-[0.4em] uppercase px-12 whitespace-nowrap ${item === '✦' ? 'text-[#C5A059]' : 'text-white/60'}`}>
                        {item}
                    </span>
                ))}
            </div>
        </div>
    );
};

/* ─── FEATURES ─── */
const RefinedFeatures = ({ lang }: { lang: string }) => {
    const ar = lang === 'ar';
    const { ref, isInView } = useReveal();

    const features = [
        { num: '01', en: 'Balance', ar: 'التوازن', den: 'Achieving exceptional harmony between space, light, and material in every design.', dar: 'تحقيق التناغم الاستثنائي بين المساحة، الضوء، والمادة في كل تصميم.' },
        { num: '02', en: 'Craftsmanship', ar: 'الحرفية', den: 'Traditional joinery methods fused with modern engineering for enduring results.', dar: 'أساليب نجارة تقليدية تمتزج مع الهندسة الحديثة لنتائج تدوم طويلاً.' },
        { num: '03', en: 'Authenticity', ar: 'الأصالة', den: 'Absolute commitment to 100% natural materials without any compromise on quality.', dar: 'التزام تام باستخدام مواد طبيعية 100٪ بدون مساومات على الجودة.' },
    ];

    return (
        <section ref={ref} className="py-24 md:py-32 bg-white">
            <div className="max-w-[1240px] mx-auto px-6 md:px-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-12 lg:gap-20">
                    {features.map((f, i) => (
                        <motion.div key={f.num} 
                            className="group pt-12 border-t-2 border-[#2A1B14]/5 hover:border-[#C5A059] transition-colors duration-700 cursor-default"
                            initial={{ opacity: 0, y: 24 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: i * 0.12, duration: 1, ease: [0.22, 1, 0.36, 1] }}>
                            <div className="font-black text-[12px] text-[#C5A059] opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 mb-4">0{i+1}</div>
                            <h3 className="font-black text-2xl text-[#2A1B14] mb-4 tracking-tighter uppercase transition-colors duration-500 group-hover:text-[#C5A059]">
                                {ar ? f.ar : f.en}
                            </h3>
                            <p className="font-sans text-[15px] font-bold text-[#2A1B14]/30 leading-relaxed uppercase tracking-tight">
                                {ar ? f.dar : f.den}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

/* ─── SHOWCASE ─── */
const ElegantShowcase = ({ lang }: { lang: string }) => {
    const ar = lang === 'ar';
    const { ref, isInView } = useReveal();

    return (
        <section ref={ref} className="py-24 md:py-40 bg-[#F4F1EE]">
            <div className="max-w-[1240px] mx-auto px-6 md:px-10">

                <motion.div initial={{ opacity: 0, y: 32 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center mb-24 md:mb-32">
                    <span className="font-sans text-[10px] font-black tracking-[0.4em] uppercase text-[#C5A059] block mb-4">
                        {ar ? 'صياغة الهدوء' : 'CRAFTING TRANQUILITY'}
                    </span>
                    <h2 className="font-black text-5xl md:text-6xl lg:text-7xl text-[#2A1B14] mb-8 leading-[1] tracking-tighter uppercase">
                        {ar ? 'المجموعة الجديدة' : 'NEW COLLECTION'}
                    </h2>
                    <p className="font-sans text-base md:text-lg font-bold text-[#2A1B14]/30 leading-relaxed max-w-xl mx-auto uppercase tracking-tighter">
                        {ar
                            ? 'تشكيلاتنا الجديدة تصبغ المساحات بهدوء الطبيعة، معتمدة على لوحة ألوان ترابية وأنسجة ناعمة.'
                            : "Our new collections imbue spaces with nature's calm, relying on an earthy palette and soft textures."}
                    </p>
                </motion.div>

                <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">
                    <motion.div initial={{ opacity: 0, y: 50 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.15, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                        className="w-full lg:w-[42%]">
                        <div className="group relative aspect-[10/13] rounded-[80px_24px_24px_24px] overflow-hidden bg-white mb-8 border-4 border-white shadow-2xl">
                            <img src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=90&w=1000"
                                 className="w-full h-full object-cover transition-transform duration-[3s] hover:scale-110" alt="Luxury Bedroom" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#2A1B14]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col justify-end p-10">
                                <div className="translate-y-8 group-hover:translate-y-0 transition-all duration-700 ease-out font-sans">
                                    <div className="text-[9px] font-black tracking-[0.3em] uppercase text-[#C5A059] mb-3">{ar ? 'إضاءة' : 'LIGHTING'}</div>
                                    <div className="font-black text-3xl text-white tracking-tighter uppercase">{ar ? 'مصباح آرك' : 'THE ARC LAMP'}</div>
                                </div>
                            </div>
                        </div>
                        <div className={`flex justify-between items-baseline px-2 ${ar ? 'flex-row-reverse' : ''}`}>
                            <div className="text-2xl font-black text-[#2A1B14] tracking-tighter uppercase">{ar ? 'مصباح آرك' : 'THE ARC LAMP'}</div>
                            <div className="font-black text-lg text-[#C5A059]">SAR 3,890</div>
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 50 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.3, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                        className="w-full lg:flex-1 flex flex-col gap-10 lg:pt-24">
                        <div className="group relative aspect-[16/9.5] rounded-[24px_24px_80px_24px] overflow-hidden bg-white shadow-2xl border-4 border-white">
                            <img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=90&w=1200"
                                 className="w-full h-full object-cover transition-transform duration-[3s] hover:scale-110" alt="Luxury Interior" />
                            <div className="absolute inset-0 bg-[#2A1B14]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-center justify-center">
                                <Link to="/store" className="font-sans text-[10px] font-black tracking-[0.3em] uppercase text-white border-2 border-white/60 px-8 py-3 rounded-full hover:bg-white hover:text-[#2A1B14] transition-all duration-500 shadow-2xl">
                                    {ar ? 'عرض التفاصيل' : 'VIEW DETAILS'}
                                </Link>
                            </div>
                        </div>

                        <div className="bg-white p-10 md:p-12 rounded-[24px_24px_64px_24px] border border-[#2A1B14]/5 shadow-2xl flex flex-col md:flex-row justify-between items-center gap-8">
                            <div className={`${ar ? 'text-right' : 'text-left'}`}>
                                <div className="font-sans text-[9px] font-black tracking-[0.3em] uppercase text-[#C5A059] mb-3">{ar ? 'معيشة' : 'LIVING'}</div>
                                <div className="font-black text-3xl text-[#2A1B14] mb-3 tracking-tighter uppercase">{ar ? 'أريكة كلاود' : 'CLOUD SERIES'}</div>
                                <div className="font-sans text-[13px] font-bold text-[#2A1B14]/30 uppercase tracking-tight leading-relaxed">{ar ? 'شكل عضوي مع راحة مطلقة.' : 'ORGANIC FORM MEETS ABSOLUTE COMFORT.'}</div>
                            </div>
                            <Link to="/store" className={`w-16 h-16 rounded-2xl border-2 border-[#2A1B14]/5 flex items-center justify-center text-[#2A1B14] hover:bg-[#C5A059] hover:border-[#C5A059] hover:text-white transition-all duration-700 shadow-sm shrink-0 ${ar ? 'rotate-180' : ''}`}>
                                <ArrowRight size={24} />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

/* ─── HORIZONTAL SCROLL ─── */
const HorizontalShowcase = ({ lang }: { lang: string }) => {
    const ar = lang === 'ar';
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: targetRef, offset: ['start start', 'end end'] });

    const x = useTransform(scrollYProgress, [0, 1], ar ? ['0%', '64%'] : ['0%', '-64%']);

    const galleryItems = [
        { id: 1, title: ar ? 'الهدوء الشمالي' : 'NORDIC CALM', category: ar ? 'تصميم' : 'INTERIOR', img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=90&w=1200', year: '2026' },
        { id: 2, title: ar ? 'دقة الرخام' : 'MARBLE PRECISION', category: ar ? 'مواد' : 'MATERIALS', img: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?auto=format&fit=crop&q=90&w=1200', year: '2026' },
        { id: 3, title: ar ? 'تناغم الضوء' : 'LIGHT HARMONY', category: ar ? 'الأتيليه' : 'ATELIER', img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=90&w=1200', year: '2025' },
        { id: 4, title: ar ? 'الدفء الطبيعي' : 'NATURAL WARMTH', category: ar ? 'مجموعة' : 'COLLECTION', img: 'https://images.unsplash.com/photo-1616594039964-408e490051e0?auto=format&fit=crop&q=90&w=1200', year: '2025' },
    ];

    return (
        <div ref={targetRef} className="relative h-[300vh] bg-[#2A1B14]">
            <div className="sticky top-0 h-screen overflow-hidden flex items-center">
                <motion.div style={{ x }} className="flex gap-16 px-12 md:px-24 will-change-transform">
                    {/* Title Part */}
                    <div className="min-w-[400px] md:min-w-[500px] flex flex-col justify-center">
                        <div className="w-12 h-[2px] bg-[#C5A059] mb-10" />
                        <span className="font-sans text-[10px] font-black tracking-[0.4em] uppercase text-[#C5A059] mb-4">
                            {ar ? 'معرض الأعمال' : 'VISUAL GALLERY'}
                        </span>
                        <h2 className="font-black text-5xl md:text-6xl lg:text-7xl text-white leading-[1] mb-10 tracking-tighter uppercase">
                            {ar ? <>رحلة<br /><span className="italic font-light text-[#C5A059]">بصرية</span></> : <>VISUAL<br /><span className="italic font-light text-[#C5A059]">JOURNEY</span></>}
                        </h2>
                        <p className="font-sans text-base font-bold text-white/30 leading-relaxed max-w-sm uppercase tracking-tight">
                            {ar ? 'مجموعة مختارة من أعمالنا المميزة التي تعيد تعريف المساحات.' : 'A CURATED SELECTION OF OUR FINEST WORKS ACROSS THE REGION.'}
                        </p>
                    </div>

                    {/* Gallery Cards */}
                    {galleryItems.map((item, i) => (
                        <div key={item.id} className="w-[300px] md:w-[500px] shrink-0">
                            <div className="group relative aspect-[3/4.2] rounded-[64px_12px_12px_12px] overflow-hidden bg-white/5 border-2 border-white/10">
                                <img src={item.img} className="w-full h-full object-cover opacity-60 transition-all duration-[1.5s] group-hover:opacity-100 group-hover:scale-110" alt={item.title} />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#2A1B14] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col justify-end p-10">
                                    <div className="flex justify-between items-end gap-8 translate-y-8 group-hover:translate-y-0 transition-all duration-1000 ease-out">
                                        <div className="font-sans text-start">
                                            <div className="text-[9px] font-black tracking-[0.3em] uppercase text-[#C5A059] mb-3">{item.category} · {item.year}</div>
                                            <div className="font-black text-3xl text-white tracking-tighter uppercase">{item.title}</div>
                                        </div>
                                        <div className="w-14 h-14 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-[#C5A059] transition-all duration-500 cursor-pointer shadow-2xl">
                                            <ArrowUpRight size={24} className={ar ? '-scale-x-100' : ''} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

/* ─── TESTIMONIAL ─── */
const Testimonial = ({ lang }: { lang: string }) => {
    const ar = lang === 'ar';
    const { ref, isInView } = useReveal();

    return (
        <section ref={ref} className="py-24 md:py-48 bg-[#F4F1EE] relative overflow-hidden text-center">
            <span className={`absolute top-0 ${ar ? 'right-20' : 'left-20'} font-black text-[300px] md:text-[500px] leading-none text-[#2A1B14]/5 select-none pointer-events-none italic tracking-tighter`}>
                "
            </span>

            <motion.div initial={{ opacity: 0, y: 50 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-3xl mx-auto px-6 relative z-10">
                <div className="w-12 h-[2px] bg-[#C5A059] mx-auto mb-12" />
                <blockquote className="font-black text-3xl md:text-5xl lg:text-5xl italic text-[#2A1B14] leading-[1] tracking-tighter mb-16 uppercase">
                    {ar
                        ? '"كل قطعة في منزلنا من فورست إيدج تحكي قصة. لا أستطيع تخيل مساحتنا دون هذه التحف الرائعة."'
                        : '"EVERY PIECE IN OUR HOME FROM FOREST EDGE TELLS A STORY. I CANNOT IMAGINE OUR SPACE WITHOUT THESE TREASURES."'}
                </blockquote>
                <div className="flex items-center justify-center gap-6">
                    <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-[#C5A059] shadow-2xl">
                        <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200" 
                             className="w-full h-full object-cover" alt="Sarah" />
                    </div>
                    <div className={`${ar ? 'text-right' : 'text-left'}`}>
                        <div className="font-black text-xl text-[#2A1B14] uppercase tracking-tighter leading-tight">Sarah Al-Mansouri</div>
                        <div className="font-sans text-[11px] font-black tracking-[0.3em] uppercase text-[#C5A059] mt-2">
                            {ar ? 'دبي، الإمارات العربية المتحدة' : 'DUBAI, UAE'}
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

/* ─── MAIN ─── */
export const Home: React.FC = () => {
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
        <div className="w-full min-h-screen bg-[#FDFCFB] selection:bg-[#C5A059] selection:text-white antialiased">
            {/* Local Styles for special effects */}
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
                    transition: opacity 0.5s;
                }
                @media (max-width: 1024px) { #cursor-glow { display: none; } }
                .vertical-rl { writing-mode: vertical-rl; }
            `}</style>

            <div id="cursor-glow" ref={cursorRef} />

            <main>
                <HeroLight lang={lang} />
                <MarqueeStrip lang={lang} />
                <RefinedFeatures lang={lang} />
                <ElegantShowcase lang={lang} />
                <HorizontalShowcase lang={lang} />
                <Testimonial lang={lang} />
            </main>
        </div>
    );
}

export default Home;
