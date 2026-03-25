import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../store/context/LangContext';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

// =========================================
// ANIMATION VARIANTS
// =========================================
const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

/* --- Project Card with Parallax --- */
const ProjectCard = ({ project, index, lang }: any) => {
   const ar = lang === 'ar';
   const cardRef = useRef(null);
   const { scrollYProgress } = useScroll({ target: cardRef, offset: ["start end", "end start"] });
   const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

   return (
      <motion.div 
         ref={cardRef}
         variants={fadeUp} 
         className={`group relative ${project.span}`}
      >
         <div className={`w-full overflow-hidden bg-[#F4F1EE] relative ${project.aspect} ${project.rounded} border-2 border-white shadow-2xl`}>
            <motion.img
               style={{ y }}
               src={project.img}
               alt={project.title}
               className="w-full h-[130%] object-cover absolute top-0 left-0 transition-transform duration-[2.5s] ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-[#2A1B14]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-center justify-center">
               <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-100 shadow-2xl">
                  <ArrowUpRight size={24} className={`text-[#2A1B14] ${ar ? '-scale-x-100' : ''}`} />
               </div>
            </div>
         </div>

         <div className={`mt-10 flex flex-col md:flex-row md:items-end justify-between gap-6 px-4 ${ar ? 'text-right' : 'text-left'}`}>
            <div className="flex-1">
                <div className={`flex items-center gap-3 mb-3 ${ar ? 'flex-row-reverse' : ''}`}>
                   <span className="text-[#C5A059] text-[10px] font-black uppercase tracking-[0.3em] font-sans">{project.type}</span>
                   <span className="w-8 h-[1px] bg-[#C5A059]/30"></span>
                   <span className="text-[#2A1B14]/40 text-[9px] font-black font-mono">ID_{String(index + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-black text-[#2A1B14] group-hover:text-[#C5A059] transition-colors duration-500 tracking-tighter uppercase leading-[1]">
                   {ar ? project.titleAr : project.title}
                </h3>
            </div>
            <div className="md:text-right shrink-0">
                <p className="text-[#2A1B14]/60 font-black text-[10px] border border-[#C5A059]/30 px-5 py-2.5 rounded-full inline-block font-sans bg-white shadow-sm uppercase tracking-widest">
                   {ar ? project.locAr : project.loc}
                </p>
            </div>
         </div>
      </motion.div>
   );
};

export const Portfolio: React.FC = () => {
   const { lang } = useLang();
   const ar = lang === 'ar';

   useEffect(() => {
      window.scrollTo(0, 0);
   }, []);

    const projects = [
       { id: 1, title: "Royal Suite Renovation", titleAr: "ترميم الجناح الملكي", loc: "Riyadh", locAr: "الرياض", img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2000&q=90", type: ar ? "سكني" : "RESIDENTIAL", span: "col-span-1 md:col-span-12", aspect: "aspect-[4/3] md:aspect-[16/7.5]", rounded: "rounded-[2rem] md:rounded-[2.5rem]" },
       { id: 2, title: "Luxury Villa Woodworks", titleAr: "أعمال خشبية لفيلا فاخرة", loc: "Jeddah", locAr: "جدة", img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1400&q=90", type: ar ? "خاص" : "PRIVATE", span: "col-span-1 md:col-span-7", aspect: "aspect-[4/5] md:aspect-[4/3.2]", rounded: "rounded-[2rem]" },
       { id: 3, title: "Corporate HQ", titleAr: "المقر الرئيسي للشركة", loc: "Dubai", locAr: "دبي", img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=90", type: ar ? "تجاري" : "COMMERCIAL", span: "col-span-1 md:col-span-5", aspect: "aspect-[4/5] md:aspect-[3/3.8]", rounded: "rounded-[2rem]" },
       { id: 4, title: "Private Majlis", titleAr: "مجلس خاص مخصص", loc: "Dammam", locAr: "الدمام", img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1800&q=90", type: ar ? "مخصص" : "BESPOKE", span: "col-span-1 md:col-span-10 md:col-start-2", aspect: "aspect-[4/3] md:aspect-[16/8.5]", rounded: "rounded-[2rem] md:rounded-[2.5rem]" },
    ];

   const filters = ar 
      ? ['كل الأعمال', 'سكني', 'تجاري', 'مخصص']
      : ['ALL WORKS', 'RESIDENTIAL', 'COMMERCIAL', 'BESPOKE'];
   
   const [activeFilter, setActiveFilter] = useState(filters[0]);

   return (
      <div className="bg-[#FDFCFB] min-h-screen pb-48 antialiased selection:bg-[#C5A059] selection:text-white">
         {/* Header Area */}
         <div className="px-6 relative overflow-hidden">
            <div className="absolute top-10 left-[10%] w-[500px] h-[500px] bg-[#F4F1EE] rounded-full filter blur-[120px] opacity-80 -z-10" />
            <div className="absolute bottom-0 right-[5%] w-[400px] h-[400px] bg-[#C5A059]/5 rounded-full filter blur-[100px] opacity-60 -z-10" />
            
            <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="container mx-auto max-w-[1240px] pt-32 pb-24 text-center md:text-left rtl:md:text-right">
               <motion.div variants={fadeUp} className="inline-flex items-center gap-3 mb-8">
                  <div className="w-2.5 h-2.5 bg-[#C5A059] rounded-full animate-pulse"></div>
                  <span className="text-[10px] font-black tracking-[0.4em] uppercase text-[#C5A059] font-sans">ARCHIVE 2026</span>
               </motion.div>
               
               <div className="flex flex-col md:flex-row justify-between items-end gap-10">
                  <motion.h1 variants={fadeUp} className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-[#2A1B14] leading-[1] uppercase">
                     {ar ? 'أعمالـنـا' : 'OUR'} <br/>
                     <span className="italic font-light text-[#C5A059]">{ar ? 'المنجزة' : 'PROJECTS'}</span>
                  </motion.h1>
                  
                  <motion.div variants={fadeUp} className="max-w-md md:pb-8 text-center md:text-left rtl:md:text-right">
                     <p className="text-[#2A1B14]/40 text-lg font-bold leading-relaxed font-sans uppercase tracking-tight">
                        {ar 
                           ? 'مجموعة مختارة بعناية من أفضل أعمالنا المعمارية وتصميماتنا الداخلية الفاخرة في المنطقة.'
                           : 'A meticulously curated selection of our finest architectural and interior creations across the Middle East.'}
                     </p>
                  </motion.div>
               </div>
            </motion.div>
         </div>

         {/* System Filters */}
         <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 1 }}
            className="container mx-auto px-6 max-w-[1240px] mb-24"
         >
            <div className="flex flex-wrap gap-4 border-b border-[#2A1B14]/5 pb-10">
               {filters.map((filter, idx) => (
                  <button 
                     key={idx} 
                     onClick={() => setActiveFilter(filter)}
                     className={`text-[10px] font-black uppercase tracking-[0.2em] px-8 py-4 rounded-full transition-all duration-500 font-sans shadow-sm ${activeFilter === filter ? 'bg-[#2A1B14] text-white' : 'bg-white text-[#2A1B14]/40 hover:text-[#2A1B14] hover:bg-[#F4F1EE]'}`}
                  >
                     {filter}
                  </button>
               ))}
            </div>
         </motion.div>

         {/* The Editorial Grid */}
         <div className="container mx-auto px-6 max-w-[1240px]">
            <div className={`grid grid-cols-1 md:grid-cols-12 gap-y-32 md:gap-x-12 lg:gap-x-16`}>
               {projects.map((project, idx) => (
                  <ProjectCard key={project.id} project={project} index={idx} lang={lang} />
               ))}
            </div>
         </div>

         {/* Call to Action */}
         <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="container mx-auto px-6 max-w-[1100px] text-center mt-48"
         >
            <div className="bg-[#2A1B14] p-12 md:p-24 rounded-[3rem] shadow-2xl relative overflow-hidden group">
               <div className="absolute inset-0 bg-gradient-to-br from-[#C5A059]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
               <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-12 leading-[1] tracking-tighter uppercase relative z-10">
                  {ar ? <>هل أنت جاهز لبدء <br/><span className="italic text-[#C5A059]">مشروعك الخاص؟</span></> : <>READY TO START <br/><span className="italic text-[#C5A059]">YOUR LEGACY?</span></>}
               </h2>
               <Link to="/contact" className="inline-flex items-center gap-6 bg-[#C5A059] text-white px-12 py-6 rounded-full hover:bg-white hover:text-[#2A1B14] transition-all duration-700 shadow-2xl group relative z-10">
                  <span className="text-[11px] font-black uppercase tracking-[0.2em] font-sans">{ar ? 'تواصل معنا الآن' : 'INITIATE DIALOGUE'}</span>
                  <ArrowRight size={20} className="group-hover:translate-x-3 transition-transform rtl:group-hover:-translate-x-3" />
               </Link>
            </div>
         </motion.div>
      </div>
   );
};

export default Portfolio;
