import React from 'react';
import { useLang } from '../App';
import { translations } from '../content/translations';
import { Layers, PenTool, Ruler, Zap } from 'lucide-react';

export const About: React.FC = () => {
  const { lang } = useLang();
  const t = translations[lang].about;

  return (
    <div className="bg-brand-white min-h-screen pb-20 pt-10">
      
      {/* Header */}
      <div className="container mx-auto px-6 max-w-[900px] text-center mb-24">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-brand-charcoal mb-8">{t.title}</h1>
        <p className="text-xl md:text-2xl text-zinc-500 leading-relaxed font-light">
          {t.description}
        </p>
      </div>

      {/* Hero Image */}
      <div className="container mx-auto px-6 max-w-[1300px] mb-32">
         <div className="w-full h-[500px] md:h-[700px] rounded-[3rem] overflow-hidden shadow-2xl relative group">
            <img 
              src="https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&w=1600&q=80" 
              alt="Craftsman" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-[2s]"
            />
            <div className="absolute inset-0 bg-black/20"></div>
         </div>
      </div>

      {/* Values */}
      <div className="bg-[#F9F6F0] py-32 relative overflow-hidden">
        {/* Decorative Wood Line */}
        <div className="absolute top-0 left-0 w-full h-2 bg-brand-wood/30"></div>
        
        <div className="container mx-auto px-6 max-w-[1100px]">
          <h2 className="text-4xl font-bold text-brand-charcoal text-center mb-20">{t.valuesTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {t.values.map((val, idx) => (
              <div key={idx} className="flex flex-col items-center text-center group">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-brand-green shadow-md mb-8 group-hover:scale-110 transition-transform duration-300 ring-1 ring-brand-wood/20">
                  {idx === 0 ? <Ruler size={32} strokeWidth={1.5} /> : idx === 1 ? <Layers size={32} strokeWidth={1.5} /> : <Zap size={32} strokeWidth={1.5} />}
                </div>
                <h3 className="text-xl font-bold text-brand-charcoal mb-4">{val.title}</h3>
                <p className="text-zinc-500 leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Materials */}
      <div className="container mx-auto px-6 max-w-[1200px] py-32">
           <div className="flex flex-col md:flex-row gap-20 items-center">
              <div className="md:w-1/2">
                 <span className="text-brand-wood font-bold uppercase tracking-widest text-xs mb-3 block">Raw Materials</span>
                 <h2 className="text-4xl font-bold text-brand-charcoal mb-8">{t.materialsTitle}</h2>
                 <p className="text-zinc-500 text-lg mb-10 leading-relaxed">{t.materialsDesc}</p>
                 <div className="space-y-8">
                   {t.materialsList.map((mat, idx) => (
                     <div key={idx} className="flex items-center gap-6 group cursor-default">
                       <span className="text-sm font-bold text-brand-wood border border-brand-wood rounded-full w-8 h-8 flex items-center justify-center">{idx+1}</span>
                       <span className="text-xl text-brand-charcoal font-medium group-hover:text-brand-green transition-colors">{mat}</span>
                     </div>
                   ))}
                 </div>
              </div>
              <div className="md:w-1/2 grid grid-cols-2 gap-6">
                 <img 
                    src="https://images.unsplash.com/photo-1542823617-668a6239433e?auto=format&fit=crop&w=800&q=80" 
                    className="rounded-2xl w-full h-80 object-cover shadow-lg" 
                    alt="Wood Texture" 
                 />
                 <img 
                    src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80" 
                    className="rounded-2xl w-full h-80 object-cover mt-12 shadow-lg" 
                    alt="Solid Wood" 
                 />
              </div>
           </div>
      </div>
    </div>
  );
};