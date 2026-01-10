import React from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../App';
import { translations } from '../content/translations';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { Testimonials } from '../components/Testimonials';
import { StatsSection } from '../components/StatsSection';

export const Home: React.FC = () => {
    const { lang } = useLang();
    const t = translations[lang];
    const Chevron = lang === 'ar' ? ChevronLeft : ChevronRight;

    return (
        <div className="overflow-hidden bg-brand-white">

            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-6 pt-20">
                <div className="max-w-4xl z-10 animate-fade-up">
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-brand-charcoal mb-8 leading-[1.1]">
                        {t.hero.title}
                    </h1>
                    <p className="text-lg md:text-2xl text-brand-charcoal/70 font-medium max-w-2xl mx-auto mb-10 leading-relaxed">
                        {t.hero.subtitle}
                    </p>
                    <div className="flex items-center justify-center gap-6">
                        <Link
                            to="/products"
                            className="bg-brand-green text-white px-10 py-4 rounded-full hover:bg-brand-greenHover transition-all text-sm font-semibold tracking-wide shadow-lg shadow-brand-green/20"
                        >
                            {t.nav.products}
                        </Link>
                        <Link
                            to="/about"
                            className="text-brand-charcoal hover:text-brand-green px-6 py-4 transition-all text-sm font-semibold flex items-center gap-2 group"
                        >
                            {t.nav.about} <Chevron size={16} className="text-brand-wood group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>

                {/* Cinematic Hero Image */}
                <div className="mt-20 w-full max-w-[1400px] h-[50vh] md:h-[65vh] overflow-hidden rounded-[2rem] shadow-2xl mx-auto relative animate-fade-in delay-500 opacity-0 bg-zinc-100">
                    <img
                        src="https://images.unsplash.com/photo-1618506469810-282bef2b30b3?auto=format&fit=crop&w=2000&q=90"
                        alt="Luxury Office Interior"
                        className="w-full h-full object-cover animate-scale-slow"
                    />
                </div>
            </section>

            {/* Bento Grid */}
            <section className="py-32 px-6">
                <div className="max-w-[1200px] mx-auto">
                    <div className="mb-20 text-center">
                        <span className="text-brand-wood font-bold uppercase tracking-widest text-xs mb-3 block">Excellence</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-brand-charcoal mb-4">{t.services.title}</h2>
                        <div className="w-16 h-1 bg-brand-wood mx-auto rounded-full mt-6"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-[450px]">

                        {/* Feature 1: Manufacturing - Large */}
                        <div className="lg:col-span-2 row-span-1 relative overflow-hidden rounded-[2rem] group shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer">
                            <img
                                src="https://images.unsplash.com/photo-1617104424032-b9bd6972d0e4?auto=format&fit=crop&w=1200&q=80"
                                alt="Manufacturing"
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-12 flex flex-col justify-end">
                                <h3 className="text-white text-3xl font-bold mb-3">{t.services.items[0].title}</h3>
                                <p className="text-zinc-200 text-lg">{t.services.items[0].description}</p>
                            </div>
                        </div>

                        {/* Feature 2: Dark Card (Green) - Restoration */}
                        <div className="bg-brand-green rounded-[2rem] p-10 flex flex-col justify-between group hover:translate-y-[-5px] transition-all duration-500 relative overflow-hidden shadow-lg">
                            <div className="z-10 relative">
                                <h3 className="text-white text-2xl font-bold mb-4">{t.services.items[4].title}</h3>
                                <p className="text-emerald-100/80 text-sm leading-relaxed mb-8">{t.services.items[4].description}</p>
                                <Link to="/services" className="text-brand-wood text-sm font-bold hover:text-white flex items-center gap-2 uppercase tracking-wider">
                                    Details <Chevron size={14} />
                                </Link>
                            </div>
                            <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-emerald-900/50 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
                        </div>

                        {/* Feature 3: White Card - Projects */}
                        <div className="bg-white border border-zinc-100 rounded-[2rem] p-10 flex flex-col justify-between group hover:shadow-xl transition-all duration-500">
                            <div>
                                <span className="text-brand-wood text-xs font-bold uppercase tracking-wider mb-3 block">Engineering</span>
                                <h3 className="text-brand-charcoal text-2xl font-bold mb-4">{t.services.items[5].title}</h3>
                                <p className="text-zinc-500 text-sm leading-relaxed">{t.services.items[5].description}</p>
                            </div>
                            <div className="w-full h-36 rounded-xl overflow-hidden mt-6 relative">
                                <img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=80" className="w-full h-full object-cover" alt="Blueprints" />
                            </div>
                        </div>

                        {/* Feature 4: Interiors - Light Wood Bg */}
                        <div className="lg:col-span-2 bg-[#F9F6F0] rounded-[2rem] p-10 flex flex-col md:flex-row items-center gap-12 group hover:shadow-xl transition-all duration-500">
                            <div className="md:w-1/2">
                                <h3 className="text-brand-charcoal text-3xl font-bold mb-4">{t.services.items[1].title}</h3>
                                <p className="text-brand-charcoal/70 text-lg leading-relaxed mb-8">
                                    Transforming spaces with custom cabinetry, paneling, and intricate moulding work.
                                </p>
                                <Link to="/portfolio" className="bg-brand-charcoal text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-black transition-colors shadow-md">
                                    View Portfolio
                                </Link>
                            </div>
                            <div className="md:w-1/2 h-full w-full rounded-xl overflow-hidden shadow-sm">
                                <img
                                    src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80"
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                    alt="Interiors"
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Featured Product Section */}
            <section className="bg-white py-32 border-t border-zinc-100">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center gap-20">
                        <div className="md:w-1/2">
                            <span className="text-brand-wood font-bold tracking-widest text-xs uppercase mb-4 block">New Collection</span>
                            <h2 className="text-5xl md:text-6xl font-bold text-brand-charcoal mb-8">The Executive Suite.</h2>
                            <p className="text-xl text-zinc-500 font-medium mb-10 leading-relaxed">
                                Crafted from premium Mahogany with leather inlays. Designed for leadership.
                            </p>
                            <Link to="/products" className="text-brand-green text-lg font-semibold hover:text-brand-greenHover flex items-center gap-2">
                                View Details <Chevron size={20} />
                            </Link>
                        </div>
                        <div className="md:w-1/2 relative group">
                            <div className="absolute -inset-4 bg-brand-wood/20 rounded-[2.5rem] rotate-2 transition-transform duration-500 group-hover:rotate-0"></div>
                            <img
                                src="https://images.unsplash.com/photo-1520032525096-7bd04a94b561?auto=format&fit=crop&w=1200&q=80"
                                className="w-full relative rounded-[2rem] shadow-2xl z-10"
                                alt="Executive Desk"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <StatsSection lang={lang} />

            {/* Testimonials Section */}
            <Testimonials lang={lang} />

        </div>
    );
};
