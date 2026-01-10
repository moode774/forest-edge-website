import React from 'react';

const partners = [
    "https://logo.clearbit.com/microsoft.com",
    "https://logo.clearbit.com/samsung.com",
    "https://logo.clearbit.com/hilton.com",
    "https://logo.clearbit.com/marriott.com",
    "https://logo.clearbit.com/hyatt.com",
    "https://logo.clearbit.com/ikea.com"
];

export const PartnersSection: React.FC<{ lang: 'en' | 'ar' }> = ({ lang }) => {
    return (
        <section className="py-20 bg-white border-y border-zinc-100">
            <div className="container mx-auto px-6 max-w-[1200px]">
                <div className="text-center mb-12">
                    <span className="text-xs font-bold text-brand-wood uppercase tracking-widest">
                        {lang === 'ar' ? 'شركاؤنا' : 'Trusted By'}
                    </span>
                </div>

                {/* Logo Carousel */}
                <div className="relative overflow-hidden">
                    <div className="flex animate-scroll-partners gap-16 items-center justify-around opacity-40 hover:opacity-60 transition-opacity duration-300">
                        {[...partners, ...partners].map((logo, index) => (
                            <div
                                key={index}
                                className="flex-shrink-0 w-32 h-16 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300"
                            >
                                <img
                                    src={logo}
                                    alt={`Partner ${index + 1}`}
                                    className="max-w-full max-h-full object-contain"
                                    onError={(e) => {
                                        e.currentTarget.src = 'https://via.placeholder.com/120x60/DCC7A1/2F2F2F?text=Partner';
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
        @keyframes scroll-partners {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll-partners {
          animation: scroll-partners 30s linear infinite;
        }
        .animate-scroll-partners:hover {
          animation-play-state: paused;
        }
      `}</style>
        </section>
    );
};
