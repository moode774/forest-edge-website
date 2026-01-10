import React from 'react';
import { useLang } from '../App';
import { translations } from '../content/translations';
import { MapPin, Phone, Mail } from 'lucide-react';

export const Contact: React.FC = () => {
  const { lang } = useLang();
  const t = translations[lang].contact;

  return (
    <div className="min-h-screen bg-brand-white">
      <div className="container mx-auto px-6 max-w-[1000px] py-20">
        
        <div className="text-center mb-20">
           <h1 className="text-5xl font-bold text-brand-charcoal mb-4">{t.title}</h1>
           <p className="text-xl text-zinc-500">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          
          {/* Info Side */}
          <div className="space-y-12">
             <div>
                <h3 className="text-brand-charcoal text-xl font-bold mb-8 uppercase tracking-widest text-xs">Contact Details</h3>
                <div className="space-y-8">
                   <div className="flex gap-6">
                      <div className="w-12 h-12 rounded-full bg-brand-green/10 flex items-center justify-center flex-shrink-0 text-brand-green">
                         <MapPin size={20} />
                      </div>
                      <div>
                         <p className="text-xs font-bold text-brand-wood uppercase tracking-wider mb-2">Office</p>
                         <p className="text-brand-charcoal font-medium leading-relaxed">{t.info.address}</p>
                      </div>
                   </div>

                   <div className="flex gap-6">
                      <div className="w-12 h-12 rounded-full bg-brand-green/10 flex items-center justify-center flex-shrink-0 text-brand-green">
                         <Phone size={20} />
                      </div>
                      <div>
                         <p className="text-xs font-bold text-brand-wood uppercase tracking-wider mb-2">Phone</p>
                         <p dir="ltr" className="text-brand-charcoal font-medium">{t.info.phone}</p>
                      </div>
                   </div>

                   <div className="flex gap-6">
                      <div className="w-12 h-12 rounded-full bg-brand-green/10 flex items-center justify-center flex-shrink-0 text-brand-green">
                         <Mail size={20} />
                      </div>
                      <div>
                         <p className="text-xs font-bold text-brand-wood uppercase tracking-wider mb-2">Email</p>
                         <p className="text-brand-charcoal font-medium">{t.info.email}</p>
                      </div>
                   </div>
                </div>
             </div>
             
             <div className="p-8 bg-[#F9F6F0] rounded-3xl border border-brand-wood/20">
                <h4 className="font-bold text-brand-charcoal mb-2">Opening Hours</h4>
                <p className="text-zinc-600">{t.info.hours}</p>
             </div>
          </div>

          {/* Form Side */}
          <div className="bg-white">
             <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-6">
                   <div className="space-y-2">
                     <label className="text-xs font-bold text-brand-charcoal uppercase tracking-wide ml-1">{t.form.name}</label>
                     <input type="text" className="w-full bg-white border border-zinc-200 rounded-lg px-4 py-4 focus:outline-none focus:ring-1 focus:ring-brand-green focus:border-brand-green transition-all" />
                   </div>
                   <div className="space-y-2">
                     <label className="text-xs font-bold text-brand-charcoal uppercase tracking-wide ml-1">{t.form.phone}</label>
                     <input type="tel" className="w-full bg-white border border-zinc-200 rounded-lg px-4 py-4 focus:outline-none focus:ring-1 focus:ring-brand-green focus:border-brand-green transition-all" />
                   </div>
                </div>
                <div className="space-y-2">
                   <label className="text-xs font-bold text-brand-charcoal uppercase tracking-wide ml-1">{t.form.email}</label>
                   <input type="email" className="w-full bg-white border border-zinc-200 rounded-lg px-4 py-4 focus:outline-none focus:ring-1 focus:ring-brand-green focus:border-brand-green transition-all" />
                </div>
                <div className="space-y-2">
                   <label className="text-xs font-bold text-brand-charcoal uppercase tracking-wide ml-1">{t.form.message}</label>
                   <textarea rows={5} className="w-full bg-white border border-zinc-200 rounded-lg px-4 py-4 focus:outline-none focus:ring-1 focus:ring-brand-green focus:border-brand-green transition-all resize-none"></textarea>
                </div>

                <button className="w-full bg-brand-green text-white px-8 py-5 rounded-xl hover:bg-brand-greenHover transition-all flex items-center justify-center gap-2 font-bold text-sm tracking-wide shadow-lg shadow-brand-green/20">
                   {t.form.submit}
                </button>
             </form>
          </div>
        </div>
      </div>
    </div>
  );
};