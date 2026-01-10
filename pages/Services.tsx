import React from 'react';
import { useLang } from '../App';
import { translations } from '../content/translations';
import { Check } from 'lucide-react';
import { FAQ } from '../components/FAQ';

export const Services: React.FC = () => {
  const { lang } = useLang();
  const t = translations[lang].services;

  const serviceImages = [
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1628624747186-a941c476b7ef?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
  ];

  return (
    <div className="bg-brand-white min-h-screen">

      {/* Header */}
      <div className="pt-24 pb-24 text-center px-6 bg-[#F9F6F0]">
        <h1 className="text-5xl md:text-6xl font-bold text-brand-charcoal mb-6">{t.title}</h1>
        <p className="text-xl text-zinc-500 max-w-2xl mx-auto">Comprehensive solutions for residential and commercial spaces.</p>
      </div>

      <div className="container mx-auto px-6 max-w-[1200px] py-32">
        <div className="space-y-32">
          {t.items.map((service, idx) => (
            <div key={idx} className={`flex flex-col ${idx % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-20 items-center`}>

              {/* Image Side */}
              <div className="md:w-1/2 w-full">
                <div className="aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl relative group">
                  <img
                    src={serviceImages[idx]}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Decorative Border */}
                  <div className="absolute inset-4 border border-white/20 rounded-[1.5rem] pointer-events-none"></div>
                </div>
              </div>

              {/* Content Side */}
              <div className="md:w-1/2 w-full">
                <div className="w-12 h-1 bg-brand-wood mb-8"></div>
                <h2 className="text-3xl md:text-4xl font-bold text-brand-charcoal mb-6">{service.title}</h2>
                <p className="text-zinc-500 text-lg mb-10 leading-relaxed">{service.description}</p>

                <div className="bg-zinc-50 p-8 rounded-2xl border border-zinc-100">
                  <h3 className="text-xs font-bold text-brand-wood uppercase tracking-widest mb-6">Features</h3>
                  <div className="grid grid-cols-1 gap-4">
                    {service.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-4">
                        <div className="w-6 h-6 rounded-full bg-brand-green flex items-center justify-center text-white flex-shrink-0">
                          <Check size={14} strokeWidth={3} />
                        </div>
                        <span className="text-brand-charcoal font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <FAQ lang={lang} />
    </div>
  );
};