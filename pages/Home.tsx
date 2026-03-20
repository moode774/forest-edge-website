import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../App';
import { translations } from '../content/translations';
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
            <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-radial-gradient from-[#EDE8DF] to-transparent opacity-70 translate-x-[30%] -translate-y-[30%]" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-radial-gradient from-[#EDE8DF] to-transparent opacity-55 -translate-x-[30%] translate-y-[30%]" />

            <div className="max-w-[1360px] mx-auto px-6 md:px-10 w-full relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Left text */}
                    <motion.div variants={containerVariants} initial="hidden" animate="visible">
                        <motion.div variants={itemVariants} className="mb-6 md:mb-8">
                            <span className="inline-flex items-center border border-[#1C1C1A]/10 rounded-full px-4 py-1.5 gap-2 font-sans text-[10px] tracking-[0.2em] uppercase text-[#8A7A6B] bg-white/60 backdrop-blur-sm">
                                <span className="w-1.5 h-1.5 bg-[#8A7A6B] rounded-full animate-pulse" />
                                {ar ? 'تصميم داخلي نقي · ١٩٩٨' : 'Pure Interior Design · 1998'}
                            </span>
                        </motion.div>

                        <motion.h1 variants={itemVariants} className="font-serif text-5xl md:text-7xl lg:text-8xl font-light leading-[1.02] tracking-tight text-[#282828] mb-6 md:mb-8">
                            {ar ? (
                                <>الارتقاء<br /><em className="italic font-light text-[#8A7A6B]">بالمعيشة</em><br />اليومية.</>
                            ) : (
                                <>Elevating<br /><em className="italic font-light text-[#8A7A6B]">Everyday</em><br />Living.</>
                            )}
                        </motion.h1>

                        <motion.p variants={itemVariants} className="font-sans text-base md:text-lg font-light text-[#737373] leading-relaxed max-w-lg mb-10 md:mb-12">
                            {ar
                                ? 'نبتكر أثاثاً يجمع بين الجمال المعماري والراحة المطلقة. قطع مصممة بعناية فائقة لتصبح إرثاً غنياً في مساحتك.'
                                : 'We create furniture that merges architectural beauty with absolute comfort. Meticulously designed pieces meant to become a heritage within your space.'}
                        </motion.p>

                        <motion.div variants={itemVariants} className="flex flex-wrap gap-5 items-center">
                            <Link to="/products" className="group flex items-center gap-4 bg-[#282828] text-white px-8 py-4 rounded-sm font-sans text-xs font-bold tracking-[0.2em] uppercase transition-all duration-500 hover:bg-[#8A7A6B]">
                                <span>{ar ? 'استكشف المجموعة' : 'Explore Collection'}</span>
                                <ArrowRight size={16} className={`transition-transform duration-300 group-hover:translate-x-1 ${ar ? 'rotate-180' : ''}`} />
                            </Link>

                            <button className="group flex items-center gap-4 font-sans text-[11px] font-bold tracking-[0.15em] uppercase text-[#282828] hover:text-[#8A7A6B] transition-colors">
                                <div className="w-12 h-12 rounded-full border border-[#282828]/20 flex items-center justify-center transition-all duration-400 group-hover:bg-[#8A7A6B] group-hover:border-[#8A7A6B] group-hover:text-white">
                                    <Play fill="currentColor" size={14} className="ml-1" />
                                </div>
                                <span>{ar ? 'شاهد الفيلم' : 'Play Video'}</span>
                            </button>
                        </motion.div>

                        {/* Stats row */}
                        <motion.div variants={itemVariants} className="flex gap-10 mt-12 md:mt-16 pt-8 md:pt-10 border-t border-[#1C1C1A]/10">
                            {[
                                { n: 340, suffix: '+', label: ar ? 'مشروع مكتمل' : 'Projects Done' },
                                { n: 12, suffix: '', label: ar ? 'سنة خبرة' : 'Years Craft' },
                                { n: 98, suffix: '%', label: ar ? 'رضا العملاء' : 'Client Satisfaction' },
                            ].map(s => (
                                <div key={s.label}>
                                    <div className="font-serif text-3xl md:text-4xl font-light text-[#282828] leading-none">
                                        <Counter to={s.n} />{s.suffix}
                                    </div>
                                    <div className="font-sans text-[10px] tracking-[0.18em] uppercase text-[#737373] mt-2">{s.label}</div>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Right images with parallax */}
                    <div className="relative pb-10 lg:pb-16 hidden lg:block">
                        <motion.div style={{ y: imgY }}
                            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}>
                            <div className="aspect-[4/5] rounded-[120px_8px_8px_8px] overflow-hidden shadow-2xl">
                                <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=900" 
                                     alt="Interior" className="w-full h-full object-cover transition-transform duration-[2.5s] hover:scale-105" />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                            className={`absolute bottom-[-20px] ${ar ? 'right-[-40px]' : 'left-[-40px]'} w-[58%] animate-float`}>
                            <div className="aspect-square rounded-[8px_8px_40px_8px] overflow-hidden border-8 border-white shadow-xl">
                                <img src="https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&q=80&w=600" 
                                     alt="Detail" className="w-full h-full object-cover transition-transform duration-[2.5s] hover:scale-105" />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            className={`absolute top-10 ${ar ? 'left-[-20px]' : 'right-[-20px]'} bg-[#282828] text-white p-5 rounded-sm shadow-2xl`}>
                            <div className="font-sans text-[9px] tracking-[0.24em] uppercase text-[#B09A86] mb-1">
                                {ar ? 'المميز' : 'Featured'}
                            </div>
                            <div className="font-serif text-base font-light text-white">
                                {ar ? 'أريكة الغيمة' : 'Cloud Sofa'}
                            </div>
                            <div className="font-sans text-[12px] text-[#B09A86] mt-1">$12,800</div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
                <span className="font-sans text-[9px] tracking-[0.28em] uppercase text-[#282828] [writing-mode:vertical-rl]">Scroll</span>
                <motion.div
                    animate={{ scaleY: [1, 0.3, 1] }}
                    transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                    className="w-[1px] h-10 bg-gradient-to-b from-[#282828] to-transparent origin-top" />
            </div>
        </section>
    );
};

/* ─── MARQUEE ─── */
const MarqueeStrip = ({ lang }: { lang: string }) => {
    const ar = lang === 'ar';
    const items = ar
        ? ['حرفية استثنائية', '✦', 'مواد طبيعية', '✦', 'تصميم خالد', '✦', 'جودة لا مثيل', '✦', 'مساحات حيّة', '✦', 'إرث راقٍ', '✦']
        : ['Exceptional Craft', '✦', 'Natural Materials', '✦', 'Timeless Design', '✦', 'Unmatched Quality', '✦', 'Living Spaces', '✦', 'Refined Heritage', '✦'];
    const doubled = [...items, ...items, ...items];

    return (
        <div className="border-y border-[#1C1C1A]/10 bg-[#F5F2EE] py-4 overflow-hidden">
            <div className="flex w-max animate-marquee hover:[animation-play-state:paused] font-sans">
                {doubled.map((item, i) => (
                    <span key={i} className={`text-[10px] tracking-[0.22em] uppercase px-6 whitespace-nowrap ${item === '✦' ? 'text-[#8A7A6B]' : 'text-[#737373]'}`}>
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
            <div className="max-w-[1360px] mx-auto px-6 md:px-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-16 lg:gap-24">
                    {features.map((f, i) => (
                        <motion.div key={f.num} 
                            className="group pt-8 border-t border-[#1C1C1A]/10 hover:border-[#8A7A6B] transition-colors duration-500 cursor-default"
                            initial={{ opacity: 0, y: 24 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: i * 0.12, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
                            <div className="font-serif text-[13px] italic text-[#B09A86] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-400 mb-4">{f.num}</div>
                            <h3 className="font-serif text-2xl font-light text-[#282828] mb-4 tracking-tight">
                                {ar ? f.ar : f.en}
                            </h3>
                            <p className="font-sans text-sm font-light text-[#737373] leading-relaxed">
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
        <section ref={ref} className="py-32 md:py-40 bg-[#F5F2EE]">
            <div className="max-w-[1260px] mx-auto px-6 md:px-10">

                <motion.div initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center mb-20 md:mb-24">
                    <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#8A7A6B] block mb-4">
                        {ar ? 'صياغة الهدوء' : 'Crafting Tranquility'}
                    </span>
                    <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl font-light text-[#282828] mb-6 leading-none tracking-tight">
                        {ar ? 'المجموعة الجديدة' : 'New Collection'}
                    </h2>
                    <p className="font-sans text-sm md:text-base font-light text-[#737373] leading-relaxed max-w-lg mx-auto">
                        {ar
                            ? 'تشكيلاتنا الجديدة تصبغ المساحات بهدوء الطبيعة، معتمدة على لوحة ألوان ترابية وأنسجة ناعمة.'
                            : "Our new collections imbue spaces with nature's calm, relying on an earthy palette and soft textures."}
                    </p>
                </motion.div>

                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
                    <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.15, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className="w-full lg:w-[42%]">
                        <div className="group relative aspect-[3/4] rounded-[180px_8px_8px_8px] overflow-hidden bg-white mb-6">
                            <img src="https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&q=80&w=900" 
                                 className="w-full h-full object-cover transition-transform duration-[2.5s] hover:scale-105" alt="Arc Floor Lamp" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 font-sans">
                                    <div className="text-[9px] tracking-[0.24em] uppercase text-[#B09A86] mb-2">{ar ? 'إضاءة' : 'Lighting'}</div>
                                    <div className="font-serif text-xl font-light text-white">{ar ? 'مصباح آرك' : 'The Arc Floor Lamp'}</div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between items-baseline px-2 font-serif">
                            <div className="text-xl font-light text-[#282828]">{ar ? 'مصباح آرك' : 'The Arc Floor Lamp'}</div>
                            <div className="font-sans text-sm font-medium text-[#8A7A6B]">$890</div>
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.28, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className="w-full lg:flex-1 flex flex-col gap-8 lg:pt-20">
                        <div className="group relative aspect-[4/3] rounded-[8px_8px_60px_8px] overflow-hidden bg-white shadow-lg">
                            <img src="https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?auto=format&fit=crop&q=80&w=900" 
                                 className="w-full h-full object-cover transition-transform duration-[2.5s] hover:scale-105" alt="Showcase" />
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                                <Link to="/products" className="font-sans text-[10px] tracking-[0.22em] uppercase text-white border border-white/60 px-8 py-3 rounded-sm hover:bg-white hover:text-[#282828] transition-all duration-300">
                                    {ar ? 'عرض التفاصيل' : 'View Details'}
                                </Link>
                            </div>
                        </div>

                        <div className="bg-white p-8 md:p-10 rounded-[8px_8px_40px_8px] border border-[#1C1C1A]/5 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
                            <div className="text-center md:text-left rtl:md:text-right">
                                <div className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#8A7A6B] mb-2">{ar ? 'معيشة' : 'Living'}</div>
                                <div className="font-serif text-2xl font-light text-[#282828] mb-2">{ar ? 'أريكة كلاود' : 'Cloud Sofa Series'}</div>
                                <div className="font-sans text-sm font-light text-[#737373]">{ar ? 'شكل عضوي مع راحة مطلقة.' : 'Organic form meets absolute comfort.'}</div>
                            </div>
                            <Link to="/products" className="w-14 h-14 rounded-full border border-[#282828]/10 flex items-center justify-center text-[#282828] hover:bg-[#8A7A6B] hover:border-[#8A7A6B] hover:text-white transition-all duration-400 shrink-0">
                                <ArrowRight size={20} className={ar ? 'rotate-180' : ''} />
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

    const x = useTransform(scrollYProgress, [0, 1], ar ? ['0%', '58%'] : ['0%', '-58%']);

    const galleryItems = [
        { id: 1, title: ar ? 'الهدوء الشمالي' : 'Nordic Calm', category: ar ? 'تصميم' : 'Interior', img: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=1000', year: '2024' },
        { id: 2, title: ar ? 'دقة الرخام' : 'Marble Precision', category: ar ? 'مواد' : 'Materials', img: 'https://images.unsplash.com/photo-1581428982868-e410dd047a90?q=80&w=1000', year: '2024' },
        { id: 3, title: ar ? 'تناغم الضوء' : 'Light Harmony', category: ar ? 'الأتيليه' : 'Atelier', img: 'https://images.unsplash.com/photo-1507473885765-e6ed657f782c?q=80&w=1000', year: '2023' },
        { id: 4, title: ar ? 'الدفء الطبيعي' : 'Natural Warmth', category: ar ? 'مجموعة' : 'Collection', img: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=1000', year: '2023' },
    ];

    return (
        <div ref={targetRef} className="relative h-[280vh] bg-[#282828]">
            <div className="sticky top-0 h-screen overflow-hidden flex items-center">
                <motion.div style={{ x }} className="flex gap-8 px-10 md:px-20 will-change-transform">
                    {/* Title Part */}
                    <div className="min-w-[320px] md:min-w-[420px] flex flex-col justify-center">
                        <div className="w-10 h-[1px] bg-[#8A7A6B] mb-8" />
                        <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#B09A86] mb-4">
                            {ar ? 'معرض الأعمال' : 'Visual Gallery'}
                        </span>
                        <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl font-light text-white leading-none mb-8 tracking-tight">
                            {ar ? <>رحلة<br /><em className="italic text-[#B09A86]">بصرية</em></> : <>Visual<br /><em className="italic text-[#B09A86]">Journey</em></>}
                        </h2>
                        <p className="font-sans text-sm font-light text-white/40 leading-relaxed max-w-[280px]">
                            {ar ? 'مجموعة مختارة من أعمالنا المميزة' : 'A curated selection of our finest works across the years.'}
                        </p>
                    </div>

                    {/* Gallery Cards */}
                    {galleryItems.map((item, i) => (
                        <div key={item.id} className="w-[300px] md:w-[450px] shrink-0">
                            <div className="group relative aspect-[3/4] rounded-[80px_4px_4px_4px] overflow-hidden bg-white/5">
                                <img src={item.img} className="w-full h-full object-cover opacity-60 transition-all duration-700 group-hover:opacity-100 group-hover:scale-105" alt={item.title} />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                                    <div className="flex justify-between items-end gap-5 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                        <div className="font-sans">
                                            <div className="text-[9px] tracking-[0.24em] uppercase text-[#B09A86] mb-1">{item.category} · {item.year}</div>
                                            <div className="font-serif text-2xl font-light text-white">{item.title}</div>
                                        </div>
                                        <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-[#8A7A6B] transition-colors cursor-pointer">
                                            <ArrowUpRight size={20} className={ar ? '-scale-x-100' : ''} />
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
        <section ref={ref} className="py-24 md:py-32 bg-[#F5F2EE] relative overflow-hidden text-center overflow-hidden">
            <span className="absolute top-0 left-1/2 -translate-x-1/2 font-serif text-[200px] md:text-[300px] leading-none text-[#1C1C1A]/5 select-none pointer-events-none italic">
                &ldquo;
            </span>

            <motion.div initial={{ opacity: 0, y: 32 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-3xl mx-auto px-6 relative z-10">
                <div className="w-10 h-[1px] bg-[#8A7A6B] mx-auto mb-10" />
                <blockquote className="font-serif text-2xl md:text-3xl lg:text-4xl italic font-light text-[#282828] leading-relaxed mb-12">
                    {ar
                        ? '"كل قطعة في منزلنا من فورست إيدج تحكي قصة. لا أستطيع تخيل مساحتنا دون هذه التحف الرائعة."'
                        : '"Every piece in our home from ForestEdge tells a story. I cannot imagine our space without these extraordinary treasures."'}
                </blockquote>
                <div className="flex items-center justify-center gap-4">
                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#B09A86]">
                        <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200" 
                             className="w-full h-full object-cover" alt="Sarah" />
                    </div>
                    <div className={ar ? 'text-right' : 'text-left'}>
                        <div className="font-sans text-sm font-bold text-[#282828]">Sarah Al-Mansouri</div>
                        <div className="font-sans text-[10px] tracking-[0.16em] uppercase text-[#8A7A6B] mt-1">
                            {ar ? 'دبي، الإمارات' : 'Dubai, UAE'}
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
        window.addEventListener('mousemove', onMouseMove);
        return () => window.removeEventListener('mousemove', onMouseMove);
    }, [onMouseMove]);

    return (
        <div className="w-full min-h-screen bg-[#FDFCFB]">
            {/* Local Styles for special effects */}
            <style>{`
                .animate-marquee {
                    animation: marquee 30s linear infinite;
                }
                @keyframes marquee {
                    from { transform: translateX(0); }
                    to { transform: translateX(-33.33%); }
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