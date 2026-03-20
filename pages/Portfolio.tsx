import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../App';
import { translations } from '../content/translations';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

/* =========================================
   ANIMATION VARIANTS
   ========================================= */
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
   const cardRef = useRef(null);
   const { scrollYProgress } = useScroll({ target: cardRef, offset: ["start end", "end start"] });
   const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

   return (
      <motion.div 
         ref={cardRef}
         variants={fadeUp} 
         className={`group relative ${project.span}`}
      >
         <div className={`w-full overflow-hidden bg-[#F5F2EE] relative ${project.aspect} ${project.rounded}`}>
            <motion.img
               style={{ y }}
               src={project.img}
               alt={project.title}
               className="w-full h-[120%] object-cover absolute top-0 left-0 transition-transform duration-[2s] ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
               <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                  <ArrowUpRight size={28} className={`text-[#282828] ${lang === 'ar' ? '-scale-x-100' : ''}`} />
               </div>
            </div>
         </div>

         <div className="mt-8 flex flex-col md:flex-row md:items-end justify-between gap-4 px-2">
            <div>
               <div className="flex items-center gap-4 mb-3">
                  <span className="text-[#8A7A6B] text-[10px] font-bold uppercase tracking-[0.2em] font-sans">{project.type}</span>
                  <span className="w-8 h-[1px] bg-[#8A7A6B]/50"></span>
                  <span className="text-[#737373] text-[10px] font-mono">PRJ_{String(index + 1).padStart(2, '0')}</span>
               </div>
               <h3 className="text-3xl md:text-4xl font-serif text-[#282828] group-hover:text-[#8A7A6B] transition-colors duration-300">
                  {project.title}
               </h3>
            </div>
            <div className="md:text-right">
               <p className="text-[#737373] font-medium text-sm border border-[#282828]/10 px-4 py-2 rounded-full inline-block font-sans">
                  {project.loc}
               </p>
            </div>
         </div>
      </motion.div>
   );
};

export const Portfolio: React.FC = () => {
   const { lang } = useLang();
   const t = translations[lang] || {};
   const portfolioT = t.portfolio || { title: 'Our Portfolio' };
   const [activeFilter, setActiveFilter] = useState(lang === 'ar' ? 'كل الأعمال' : 'All Works');

   useEffect(() => {
      window.scrollTo(0, 0);
   }, []);

   const projects = [
      { id: 1, title: "Royal Suite Renovation", loc: "Riyadh", img: "https://images.unsplash.com/photo-1616594039964-408e490051e0?auto=format&fit=crop&w=1600&q=80", type: "Residential", span: "col-span-1 md:col-span-12", aspect: "aspect-[4/3] md:aspect-[21/9]", rounded: "rounded-[2rem] md:rounded-[3rem]" },
      { id: 2, title: "Luxury Villa Woodworks", loc: "Jeddah", img: "https://images.unsplash.com/photo-1600596542815-6ad4c1277855?auto=format&fit=crop&w=1200&q=80", type: "Private", span: "col-span-1 md:col-span-7", aspect: "aspect-[4/5] md:aspect-[4/3]", rounded: "rounded-[2rem]" },
      { id: 3, title: "Corporate HQ", loc: "Dubai", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80", type: "Commercial", span: "col-span-1 md:col-span-5", aspect: "aspect-[4/5] md:aspect-[3/4]", rounded: "rounded-[2rem]" },
      { id: 4, title: "Private Majlis", loc: "Dammam", img: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=1400&q=80", type: "Bespoke", span: "col-span-1 md:col-span-10 md:col-start-2", aspect: "aspect-[4/3] md:aspect-[16/9]", rounded: "rounded-[2rem] md:rounded-[3rem]" },
   ];

   const filters = lang === 'ar' 
      ? ['كل الأعمال', 'سكني', 'تجاري', 'مخصص']
      : ['All Works', 'Residential', 'Commercial', 'Bespoke'];

   return (
      <div className="bg-[#FDFCFB] min-h-screen pb-32">
         {/* Header Area */}
         <div className="px-6 relative">
            <div className="absolute top-10 left-[10%] w-[300px] h-[300px] bg-[#F5F2EE] rounded-full filter blur-[100px] opacity-60 -z-10" />
            
            <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="container mx-auto max-w-[1400px] pt-24 pb-20 text-center md:text-left rtl:md:text-right">
               <motion.div variants={fadeUp} className="inline-flex items-center gap-3 mb-8">
                  <div className="w-2 h-2 bg-[#8A7A6B] rounded-full animate-pulse"></div>
                  <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#8A7A6B] font-sans">Archive</span>
               </motion.div>
               
               <div className="flex flex-col md:flex-row justify-between items-end gap-10">
                  <motion.h1 variants={fadeUp} className="text-6xl md:text-8xl lg:text-[7.5rem] font-serif tracking-tight text-[#282828] leading-[0.9]">
                     {portfolioT.title.split(' ')[0]} <br/>
                     <span className="italic font-light text-[#8A7A6B]">{portfolioT.title.split(' ').slice(1).join(' ')}</span>
                  </motion.h1>
                  
                  <motion.div variants={fadeUp} className="max-w-xs md:pb-6 text-center md:text-left rtl:md:text-right">
                     <p className="text-[#737373] text-lg font-light leading-relaxed font-sans">
                        {lang === 'ar' 
                           ? 'مجموعة مختارة بعناية من أفضل أعمالنا المعمارية وتصميماتنا الداخلية في المنطقة.'
                           : 'A carefully curated selection of our finest architectural and interior creations across the region.'}
                     </p>
                  </motion.div>
               </div>
            </motion.div>
         </div>

         {/* System Filters */}
         <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 1 }}
            className="container mx-auto px-6 max-w-[1400px] mb-20"
         >
            <div className="flex flex-wrap gap-4 border-b border-[#282828]/10 pb-8">
               {filters.map((filter, idx) => (
                  <button 
                     key={idx} 
                     onClick={() => setActiveFilter(filter)}
                     className={`text-[10px] font-bold uppercase tracking-[0.2em] px-8 py-3.5 rounded-full transition-all duration-300 font-sans ${activeFilter === filter ? 'bg-[#282828] text-white' : 'bg-transparent text-[#737373] hover:text-[#282828] hover:bg-[#F5F2EE]'}`}
                  >
                     {filter}
                  </button>
               ))}
            </div>
         </motion.div>

         {/* The Editorial Grid */}
         <div className="container mx-auto px-6 max-w-[1400px]">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-y-32 md:gap-x-12 lg:gap-x-20">
               {projects.map((project, idx) => (
                  <ProjectCard key={project.id} project={project} index={idx} lang={lang} />
               ))}
            </div>
         </div>

         {/* Call to Action */}
         <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="container mx-auto px-6 max-w-[1000px] text-center mt-48"
         >
            <h2 className="text-4xl md:text-7xl font-serif text-[#282828] mb-12 leading-tight">
               {lang === 'ar' ? <>هل أنت جاهز لبدء <br/><span className="italic text-[#8A7A6B]">مشروعك الخاص؟</span></> : <>Ready to start <br/><span className="italic text-[#8A7A6B]">your project?</span></>}
            </h2>
            <Link to="/contact" className="inline-flex items-center gap-5 bg-[#282828] text-white px-12 py-6 rounded-full hover:bg-[#8A7A6B] transition-all duration-500 shadow-2xl group">
               <span className="text-[11px] font-bold uppercase tracking-[0.25em] font-sans">{lang === 'ar' ? 'تواصل معنا' : 'Get in Touch'}</span>
               <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform rtl:group-hover:-translate-x-2" />
            </Link>
         </motion.div>
      </div>
   );
};

export default Portfolio;