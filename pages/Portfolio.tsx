import React from 'react';
import { useLang } from '../App';
import { translations } from '../content/translations';

export const Portfolio: React.FC = () => {
  const { lang } = useLang();
  const t = translations[lang].portfolio;

  const projects = [
    { 
      id: 1, 
      title: "Royal Suite Renovation", 
      loc: "Riyadh", 
      img: "https://images.unsplash.com/photo-1616594039964-408e490051e0?auto=format&fit=crop&w=1200&q=80", 
      type: "Residential" 
    },
    { 
      id: 2, 
      title: "Luxury Villa Woodworks", 
      loc: "Jeddah", 
      img: "https://images.unsplash.com/photo-1600596542815-6ad4c1277855?auto=format&fit=crop&w=1200&q=80", 
      type: "Private" 
    },
    { 
      id: 3, 
      title: "Corporate HQ Boardroom", 
      loc: "Dubai", 
      img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80", 
      type: "Commercial" 
    },
    { 
      id: 4, 
      title: "Private Majlis", 
      loc: "Dammam", 
      img: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=1200&q=80", 
      type: "Bespoke" 
    },
  ];

  return (
    <div className="bg-brand-white min-h-screen pb-20">
       <div className="pt-24 pb-20 px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-brand-charcoal mb-6">{t.title}</h1>
          <p className="text-zinc-500 text-xl max-w-2xl mx-auto">A selection of our finest work across the region.</p>
       </div>
      
      <div className="container mx-auto px-6 max-w-[1200px]">
        <div className="grid grid-cols-1 gap-16">
          {projects.map((project, idx) => (
            <div key={project.id} className="group relative">
               <div className="w-full aspect-video md:aspect-[21/9] rounded-[2.5rem] overflow-hidden bg-zinc-100 shadow-sm group-hover:shadow-2xl transition-all duration-500">
                  <img 
                    src={project.img} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                  />
               </div>
               <div className="mt-8 flex justify-between items-end px-4">
                  <div>
                     <span className="text-brand-wood text-xs font-bold uppercase tracking-widest mb-2 block">{project.type}</span>
                     <h3 className="text-3xl font-bold text-brand-charcoal">{project.title}</h3>
                  </div>
                  <div className="text-right">
                     <p className="text-zinc-400 font-medium">{project.loc}</p>
                  </div>
               </div>
               <div className="w-full h-[1px] bg-zinc-100 mt-8"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};