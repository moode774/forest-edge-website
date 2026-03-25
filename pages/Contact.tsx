import React, { useEffect } from 'react';
import { useLang } from '../store/context/LangContext';
import { MapPin, Phone, Mail, Send, Globe, ArrowRight, Box } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Contact: React.FC = () => {
   const { lang } = useLang();
   const ar = lang === 'ar';

   useEffect(() => {
      window.scrollTo(0, 0);
   }, []);

   return (
      <div className="bg-white min-h-screen f-sans overflow-hidden" dir={ar ? 'rtl' : 'ltr'}>
         <header className="bg-ikea-gray/30 pt-32 pb-20 md:pt-48 md:pb-40 px-6 md:px-12 relative overflow-hidden">
            <div className="container mx-auto px-6 max-w-[1440px] relative z-10 text-start">
               <div className="bg-ikea-blue inline-block px-4 py-1.5 mb-8 skew-x-[-4deg]">
                 <span className="text-white text-[11px] font-black uppercase tracking-[0.4em] skew-x-[4deg] inline-block">
                   {ar ? 'تواصل العمليات' : 'OPERATIONAL HUB'}
                 </span>
               </div>
               <h1 className="text-6xl md:text-[9rem] font-black text-ikea-black tracking-tighter leading-[0.8] mb-12">
                 {ar ? <>نحن في<br /><span className="text-ikea-blue">خدمتك</span></> : <>READY FOR<br /><span className="text-ikea-blue">DEPLOYMENT</span></>}
               </h1>
            </div>
         </header>

         <main className="container mx-auto px-6 max-w-[1440px] py-32">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_580px] gap-24 items-start">
               <div className="space-y-20 text-start">
                  <h2 className="text-5xl md:text-7xl font-black text-ikea-black tracking-tighter mb-6">
                     {ar ? 'إرسال طلب استشارة' : 'CONSULTATION REQUEST'}
                  </h2>
                  <form className="space-y-12" onSubmit={(e) => e.preventDefault()}>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <input type="text" placeholder={ar ? 'الاسم' : 'NAME'} className="w-full bg-ikea-gray rounded-2xl py-6 px-10 text-lg font-black outline-none" />
                        <input type="email" placeholder={ar ? 'البريد' : 'EMAIL'} className="w-full bg-ikea-gray rounded-2xl py-6 px-10 text-lg font-black outline-none" />
                     </div>
                     <textarea rows={6} className="w-full bg-ikea-gray rounded-[2rem] py-8 px-10 text-lg font-black outline-none resize-none" placeholder={ar ? 'أخبرنا المزيد...' : 'DESCRIBE YOUR VISION...'} />
                     <button className="bg-ikea-blue text-white px-20 py-8 rounded-full text-[15px] font-black uppercase tracking-widest hover:bg-[#00478b] transition-all flex items-center justify-center gap-4">
                        {ar ? 'إرسال' : 'SUMBIT'} <Send size={24} />
                     </button>
                  </form>
               </div>

               <aside className="space-y-12">
                  <div className="bg-ikea-black text-white rounded-[4rem] p-12 md:p-16 space-y-16">
                     <h3 className="text-3xl font-black tracking-tight mb-12 underline decoration-ikea-yellow decoration-8 underline-offset-8">{ar ? 'قنوات الاتصال' : 'COMM CHANNELS'}</h3>
                     <div className="flex gap-8">
                        <div className="w-16 h-16 rounded-3xl bg-white/10 flex items-center justify-center text-ikea-yellow"><Phone size={32} /></div>
                        <div><span className="block text-white/40 text-[11px] mb-2">PHONE</span><span className="text-3xl font-black">+966 50 000 0000</span></div>
                     </div>
                     <div className="flex gap-8">
                        <div className="w-16 h-16 rounded-3xl bg-white/10 flex items-center justify-center text-ikea-yellow"><Mail size={32} /></div>
                        <div><span className="block text-white/40 text-[11px] mb-2">EMAIL</span><span className="text-2xl font-black uppercase">HQ@FORESTEDGE.COM</span></div>
                     </div>
                  </div>
                  <div className="bg-ikea-gray rounded-[3rem] p-12 text-start">
                     <h3 className="text-3xl font-black text-ikea-black mb-8">{ar ? 'المقر الرئيسي' : 'HEADQUARTERS'}</h3>
                     <div className="flex gap-6 items-start text-ikea-darkGray mb-12">
                        <MapPin size={32} className="text-ikea-blue" />
                        <span>{ar ? 'الرياض، حي الملقا' : 'RIYADH, AL MALQA'}</span>
                     </div>
                     <button className="w-full bg-white border-4 border-ikea-blue text-ikea-blue py-6 rounded-full font-black flex items-center justify-center gap-4">
                        {ar ? 'موقعنا' : 'FIND US'} <Globe size={24} />
                     </button>
                  </div>
               </aside>
            </div>
         </main>
      </div>
   );
};

export default Contact;
