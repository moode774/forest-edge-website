import React, { useEffect, useRef, useState } from 'react';

interface Stat {
    number: number;
    suffix: string;
    label: string;
    labelAr: string;
}

const stats: Stat[] = [
    { number: 500, suffix: '+', label: 'Projects Completed', labelAr: 'مشروع مكتمل' },
    { number: 25, suffix: '+', label: 'Years Experience', labelAr: 'سنة خبرة' },
    { number: 300, suffix: '+', label: 'Happy Clients', labelAr: 'عميل سعيد' },
    { number: 50, suffix: '+', label: 'Expert Craftsmen', labelAr: 'حرفي خبير' }
];

const useCountUp = (end: number, duration: number = 2000, isVisible: boolean) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isVisible) return;

        let startTime: number;
        let animationFrame: number;

        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);

            setCount(Math.floor(progress * end));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [end, duration, isVisible]);

    return count;
};

export const StatsSection: React.FC<{ lang: 'en' | 'ar' }> = ({ lang }) => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.3 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className="py-24 bg-brand-charcoal relative overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-wood rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-green rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-6 max-w-[1200px] relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                    {stats.map((stat, index) => (
                        <StatCard
                            key={index}
                            stat={stat}
                            lang={lang}
                            isVisible={isVisible}
                            delay={index * 100}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

const StatCard: React.FC<{
    stat: Stat;
    lang: 'en' | 'ar';
    isVisible: boolean;
    delay: number;
}> = ({ stat, lang, isVisible, delay }) => {
    const count = useCountUp(stat.number, 2000, isVisible);

    return (
        <div
            className="text-center transform transition-all duration-700"
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: `${delay}ms`
            }}
        >
            <div className="mb-4">
                <span className="text-5xl md:text-6xl font-bold text-white block">
                    {count}{stat.suffix}
                </span>
            </div>
            <p className="text-brand-wood font-medium text-sm md:text-base uppercase tracking-wider">
                {lang === 'ar' ? stat.labelAr : stat.label}
            </p>
        </div>
    );
};
