import React, { useEffect } from 'react';
import { useLang } from '../App';
import { translations } from '../content/translations';
import { ArrowRight, MapPin, Phone, Mail, Globe, Send } from 'lucide-react';
import { motion } from 'framer-motion';

/* =========================================
   ANIMATION VARIANTS
   ========================================= */
const fadeUp = {
   hidden: { opacity: 0, y: 40 },
   visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
   hidden: { opacity: 0 },
   visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

/* =========================================
   MAIN PAGE COMPONENT
   ========================================= */
export const Contact: React.FC = () => {
   const { lang } = useLang();
   const t = translations[lang] || {};
   const contactT = t.contact || { subtitle: 'Get in touch with us', info: {}, form: {} };

   useEffect(() => {
      window.scrollTo(0, 0);
   }, []);

   const dir = lang === 'ar' ? 'rtl' : 'ltr';

   return (
      <div className="bg-[#FDFCFB] min-h-screen pb-20 relative">
         {/* Architectural Background Pattern */}
         <div className="absolute top-0 right-0 w-1/2 h-[600px] bg-[#F5F2EE] rounded-bl-[150px] -z-10 opacity-70" />
         
         <div className="container mx-auto px-6 max-w-[1200px] relative z-10 pt-20">
            <motion.div
               initial="hidden" animate="visible" variants={staggerContainer}
               className="text-center mb-24 lg:mb-32"
            >
               <motion.div variants={fadeUp} className="inline-flex items-center gap-3 mb-6 px-4 py-2 rounded-full border border-black/5 bg-white shadow-sm font-sans">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-[#8A7A6B]">Secure Channel Active</span>
               </motion.div>
               <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl lg:text-8xl font-serif text-[#282828] mb-6 leading-tight">
                  {lang === 'ar' ? <>ابدأ المحادثة <br /><span className="italic text-[#8A7A6B]">الآن.</span></> : <>Initiate <br /><span className="italic text-[#8A7A6B]">Dialogue.</span></>}
               </motion.h1>
               <motion.p variants={fadeUp} className="text-lg md:text-xl text-[#737373] font-light max-w-2xl mx-auto font-sans">
                  {contactT.subtitle}
               </motion.p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
               {/* Left Side: Info Cards */}
               <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="lg:col-span-5 space-y-6">
                  {/* Location Card */}
                  <motion.div variants={fadeUp} className="group relative bg-white/60 backdrop-blur-xl p-8 rounded-[2rem] border border-white shadow-[0_20px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2">
                     <div className="absolute top-8 right-8 text-[#8A7A6B] opacity-20 group-hover:opacity-100 transition-opacity">
                        <Globe size={40} strokeWidth={1} />
                     </div>
                     <div className="w-14 h-14 rounded-full bg-[#282828] text-white flex items-center justify-center mb-6">
                        <MapPin size={20} />
                     </div>
                     <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#8A7A6B] mb-2 font-sans">Headquarters</h3>
                     <p className="text-xl font-serif text-[#282828] mb-2">{contactT.info?.address}</p>
                     <p className="text-[10px] font-mono text-[#737373]">LAT: 24.7136° N, LONG: 46.6753° E</p>
                  </motion.div>

                  {/* Contact Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                     <motion.div variants={fadeUp} className="bg-white/60 backdrop-blur-xl p-8 rounded-[2rem] border border-white shadow-[0_20px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] transition-all duration-500">
                        <Phone size={24} className="text-[#282828] mb-6" strokeWidth={1.5} />
                        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#8A7A6B] mb-2 font-sans">Direct Line</h3>
                        <p dir="ltr" className="text-lg font-serif text-[#282828]">{contactT.info?.phone}</p>
                     </motion.div>
                     <motion.div variants={fadeUp} className="bg-white/60 backdrop-blur-xl p-8 rounded-[2rem] border border-white shadow-[0_20px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] transition-all duration-500">
                        <Mail size={24} className="text-[#282828] mb-6" strokeWidth={1.5} />
                        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#8A7A6B] mb-2 font-sans">Electronic Mail</h3>
                        <p className="text-sm font-serif text-[#282828]">{contactT.info?.email}</p>
                     </motion.div>
                  </div>
               </motion.div>

               {/* Right Side: Form */}
               <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.2, delay: 0.4 }} className="lg:col-span-7">
                  <div className="bg-[#282828] p-10 md:p-16 rounded-[3rem] shadow-2xl text-white relative overflow-hidden">
                     <div className="absolute top-0 right-0 w-64 h-64 bg-[#8A7A6B] rounded-full filter blur-[100px] opacity-20 translate-x-1/2 -translate-y-1/2" />
                     <h3 className="text-3xl font-serif mb-12 relative z-10">{lang === 'ar' ? 'أرسل استفسارك' : 'Send an Inquiry'}</h3>
                     <form className="space-y-10 relative z-10 font-sans" onSubmit={(e) => e.preventDefault()}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                           <div className="relative group">
                              <input type="text" id="name" className="w-full bg-transparent border-b border-white/20 py-4 text-white focus:outline-none focus:border-transparent peer" placeholder=" " required />
                              <label htmlFor="name" className="absolute left-0 top-4 text-white/50 text-sm transition-all duration-300 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-[#8A7A6B] peer-focus:uppercase peer-focus:tracking-widest peer-valid:-top-4 peer-valid:text-[10px] peer-valid:text-[#8A7A6B] peer-valid:uppercase peer-valid:tracking-widest">
                                 {contactT.form?.name}
                              </label>
                              <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#8A7A6B] transition-all duration-500 peer-focus:w-full" />
                           </div>
                           <div className="relative group">
                              <input type="tel" id="phone" className="w-full bg-transparent border-b border-white/20 py-4 text-white focus:outline-none focus:border-transparent peer" placeholder=" " required />
                              <label htmlFor="phone" className="absolute left-0 top-4 text-white/50 text-sm transition-all duration-300 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-[#8A7A6B] peer-focus:uppercase peer-focus:tracking-widest peer-valid:-top-4 peer-valid:text-[10px] peer-valid:text-[#8A7A6B] peer-valid:uppercase peer-valid:tracking-widest">
                                 {contactT.form?.phone}
                              </label>
                              <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#8A7A6B] transition-all duration-500 peer-focus:w-full" />
                           </div>
                        </div>
                        <div className="relative group">
                           <input type="email" id="email" className="w-full bg-transparent border-b border-white/20 py-4 text-white focus:outline-none focus:border-transparent peer" placeholder=" " required />
                           <label htmlFor="email" className="absolute left-0 top-4 text-white/50 text-sm transition-all duration-300 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-[#8A7A6B] peer-focus:uppercase peer-focus:tracking-widest peer-valid:-top-4 peer-valid:text-[10px] peer-valid:text-[#8A7A6B] peer-valid:uppercase peer-valid:tracking-widest">
                              {contactT.form?.email}
                           </label>
                           <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#8A7A6B] transition-all duration-500 peer-focus:w-full" />
                        </div>
                        <div className="relative group pt-4">
                           <textarea id="message" rows={4} className="w-full bg-transparent border-b border-white/20 py-4 text-white focus:outline-none focus:border-transparent peer resize-none" placeholder=" " required></textarea>
                           <label htmlFor="message" className="absolute left-0 top-8 text-white/50 text-sm transition-all duration-300 peer-focus:top-0 peer-focus:text-[10px] peer-focus:text-[#8A7A6B] peer-focus:uppercase peer-focus:tracking-widest peer-valid:top-0 peer-valid:text-[10px] peer-valid:text-[#8A7A6B] peer-valid:uppercase peer-valid:tracking-widest">
                              {contactT.form?.message}
                           </label>
                           <div className="absolute bottom-1 left-0 w-0 h-[1px] bg-[#8A7A6B] transition-all duration-500 peer-focus:w-full" />
                        </div>
                        <button className="group mt-8 w-full bg-white text-[#282828] px-8 py-5 rounded-full hover:bg-[#8A7A6B] hover:text-white transition-all duration-500 flex items-center justify-center gap-4 overflow-hidden relative">
                           <span className="relative z-10 font-bold text-[11px] uppercase tracking-[0.2em]">{contactT.form?.submit}</span>
                           <Send size={16} className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </button>
                     </form>
                  </div>
               </motion.div>
            </div>
         </div>
      </div>
   );
};

export default Contact;