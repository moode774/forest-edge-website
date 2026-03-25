import React, { useState, useEffect } from 'react';
import { useLang } from '../store/context/LangContext';
import { ArrowUpRight, LayoutGrid, Box } from 'lucide-react';
import { motion } from 'framer-motion';

export const Portfolio: React.FC = () => {
   const { lang } = useLang();
   const ar = lang === 'ar';
   const [activeFilter, setActiveFilter] = useState(ar ? 'الكل' : 'All');

   useEffect(() => {
      window.scrollTo(0, 0);
   }, []);

   const filters = ar ? ['الكل', 'سكني', 'تجاري', 'مخصص'] : ['All', 'Residential', 'Commercial', 'Bespoke'];
   const projects = [
      { id: 1, title: ar ? "تجديد الجناح الملكي" : "ROYAL SUITE RECON", loc: "RIYADH", img: "https://images.unsplash.com/photo-1616594039964-408e490051e0?auto=format&fit=crop&w=1600&q=80", type: ar ? "سكني" : "Residential" },
      { id: 2, title: ar ? "أعمال خشبية لفيلا فاخرة" : "LUXURY VILLA ARCHIVE", loc: "JEDDAH", img: "https://images.unsplash.com/photo-1600596542815-6ad4c1277855?auto=format&fit=crop&w=1200&q=80", type: ar ? "سكني" : "Residential" },
      { id: 3, title: ar ? "المقر الرئيسي للشركة" : "CORPORATE TERMINAL", loc: "DUBAI", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80", type: ar ? "تجاري" : "Commercial" },
      { id: 4, title: ar ? "مجلس خاص" : "PRIVATE MAJLIS UNIT", loc: "DAMMAM", img: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=1400&q=80", type: ar ? "مخصص" : "Bespoke" },
   ];

   const filteredProjects = activeFilter === (ar ? 'الكل' : 'All') ? projects : projects.filter(p => p.type === activeFilter);

   return (
      <div className="bg-white min-h-screen pb-32 f-sans overflow-hidden" dir={ar ? 'rtl' : 'ltr'}>
         <header className="bg-ikea-gray/30 pt-32 pb-20 md:pt-48 md:pb-40 px-6 md:px-12 relative overflow-hidden">
            <div className="container mx-auto px-6 max-w-[1440px] relative z-10 text-start">
               <div className="bg-ikea-blue inline-block px-4 py-1.5 mb-8 skew-x-[-4deg]">
                 <span className="text-white text-[11px] font-black uppercase tracking-[0.4em] skew-x-[4deg] inline-block">
                   {ar ? 'سجل الإنجازات' : 'PROJECT ARCHIVE'}
                 </span>
               </div>
               <h1 className="text-6xl md:text-[9rem] font-black text-ikea-black tracking-tighter leading-[0.8] mb-12">
                 {ar ? <>معرض<br /><span className="text-ikea-blue">المشاريع</span></> : <>VISUAL<br /><span className="text-ikea-blue">INVENTORY</span></>}
               </h1>
            </div>
         </header>

         <div className="sticky top-[72px] md:top-[80px] z-30 bg-white/80 backdrop-blur-xl border-b border-ikea-gray px-6 md:px-12 py-6">
            <div className="max-w-[1440px] mx-auto flex flex-wrap items-center justify-between gap-8">
               <div className="flex gap-3 overflow-x-auto scrollbar-hide py-2">
                  {filters.map((f, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveFilter(f)}
                      className={`px-10 py-4 rounded-full text-[13px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap shadow-sm ${
                        activeFilter === f ? 'bg-ikea-blue text-white' : 'bg-ikea-gray text-ikea-darkGray hover:bg-white'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
               </div>
               <div className="hidden md:flex items-center gap-6 text-end">
                  <p className="text-[10px] font-black text-ikea-blue uppercase tracking-widest">{filteredProjects.length} UNITS</p>
                  <LayoutGrid size={24} className="text-ikea-blue" />
               </div>
            </div>
         </div>

         <main className="container mx-auto px-6 max-w-[1440px] py-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-32">
               {filteredProjects.map((project, idx) => (
                  <motion.div 
                    key={project.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <div className="aspect-[16/10] bg-ikea-gray rounded-[3rem] overflow-hidden relative shadow-2xl border-4 border-ikea-gray">
                       <img src={project.img} alt="" className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110" />
                       <div className="absolute top-10 left-10 md:top-12 md:left-12 bg-white/95 backdrop-blur-md px-6 py-3 rounded-2xl shadow-xl skew-x-[-6deg]">
                          <span className="text-[12px] font-black uppercase tracking-[0.3em] text-ikea-blue skew-x-[6deg] inline-block">{project.type}</span>
                       </div>
                    </div>
                    <div className="mt-12 flex items-start justify-between gap-10 text-start">
                       <div>
                          <h3 className="text-4xl md:text-5xl font-black text-ikea-black tracking-tighter mb-4 group-hover:text-ikea-blue transition-colors uppercase leading-none">{project.title}</h3>
                          <p className="text-ikea-darkGray font-black uppercase tracking-[0.4em] text-[11px] opacity-60">{project.loc} // SECTOR {idx + 10}</p>
                       </div>
                       <div className="w-20 h-20 bg-ikea-gray rounded-full flex items-center justify-center text-ikea-black group-hover:bg-ikea-blue group-hover:text-white transition-all transform group-hover:rotate-45 shadow-xl flex-shrink-0">
                          <ArrowUpRight size={32} />
                       </div>
                    </div>
                  </motion.div>
               ))}
            </div>
         </main>
      </div>
   );
};

export default Portfolio;
