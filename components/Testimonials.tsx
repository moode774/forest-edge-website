import React from 'react';
import { Star } from 'lucide-react';

interface Testimonial {
    id: number;
    name: string;
    nameAr: string;
    role: string;
    roleAr: string;
    text: string;
    textAr: string;
    rating: number;
    image: string;
}

const testimonials: Testimonial[] = [
    {
        id: 1,
        name: "Mohammed Al-Rashid",
        nameAr: "محمد الراشد",
        role: "CEO, Al-Rashid Group",
        roleAr: "المدير التنفيذي، مجموعة الراشد",
        text: "Forest Edge transformed our corporate headquarters with exceptional craftsmanship. Every detail exceeded our expectations.",
        textAr: "حولت فورست إيدج مقرنا الرئيسي بحرفية استثنائية. كل التفاصيل فاقت توقعاتنا.",
        rating: 5,
        image: "https://i.pravatar.cc/150?img=12"
    },
    {
        id: 2,
        name: "Sarah Al-Mansour",
        nameAr: "سارة المنصور",
        role: "Interior Designer",
        roleAr: "مصممة داخلية",
        text: "Working with Forest Edge is always a pleasure. Their attention to detail and commitment to quality is unmatched.",
        textAr: "العمل مع فورست إيدج دائماً ممتع. اهتمامهم بالتفاصيل والتزامهم بالجودة لا مثيل له.",
        rating: 5,
        image: "https://i.pravatar.cc/150?img=47"
    },
    {
        id: 3,
        name: "Ahmed Al-Fahad",
        nameAr: "أحمد الفهد",
        role: "Villa Owner",
        roleAr: "مالك فيلا",
        text: "The custom furniture pieces they created for our villa are true works of art. Highly recommended!",
        textAr: "قطع الأثاث المخصصة التي صنعوها لفيلتنا هي أعمال فنية حقيقية. أنصح بهم بشدة!",
        rating: 5,
        image: "https://i.pravatar.cc/150?img=33"
    }
];

export const Testimonials: React.FC<{ lang: 'en' | 'ar' }> = ({ lang }) => {
    const [activeIndex, setActiveIndex] = React.useState(0);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="py-32 bg-[#F9F6F0] relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-wood to-transparent opacity-30"></div>

            <div className="container mx-auto px-6 max-w-[1100px]">
                <div className="text-center mb-16">
                    <span className="text-brand-wood font-bold uppercase tracking-widest text-xs mb-3 block">
                        {lang === 'ar' ? 'آراء العملاء' : 'Testimonials'}
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-brand-charcoal mb-4">
                        {lang === 'ar' ? 'ماذا يقول عملاؤنا' : 'What Our Clients Say'}
                    </h2>
                    <div className="w-16 h-1 bg-brand-wood mx-auto rounded-full mt-6"></div>
                </div>

                {/* Testimonial Cards */}
                <div className="relative h-[400px] md:h-[350px]">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={testimonial.id}
                            className={`absolute inset-0 transition-all duration-700 ${index === activeIndex
                                    ? 'opacity-100 translate-y-0 scale-100'
                                    : 'opacity-0 translate-y-8 scale-95 pointer-events-none'
                                }`}
                        >
                            <div className="bg-white rounded-[2rem] p-10 md:p-12 shadow-lg max-w-4xl mx-auto">
                                {/* Stars */}
                                <div className="flex justify-center gap-1 mb-8">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} size={20} className="fill-brand-green text-brand-green" />
                                    ))}
                                </div>

                                {/* Quote */}
                                <p className="text-xl md:text-2xl text-brand-charcoal text-center leading-relaxed mb-10 font-light">
                                    "{lang === 'ar' ? testimonial.textAr : testimonial.text}"
                                </p>

                                {/* Author */}
                                <div className="flex items-center justify-center gap-4">
                                    <img
                                        src={testimonial.image}
                                        alt={lang === 'ar' ? testimonial.nameAr : testimonial.name}
                                        className="w-16 h-16 rounded-full object-cover ring-2 ring-brand-wood/20"
                                    />
                                    <div className="text-center md:text-left">
                                        <h4 className="font-bold text-brand-charcoal">
                                            {lang === 'ar' ? testimonial.nameAr : testimonial.name}
                                        </h4>
                                        <p className="text-sm text-zinc-500">
                                            {lang === 'ar' ? testimonial.roleAr : testimonial.role}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Dots Navigation */}
                <div className="flex justify-center gap-3 mt-8">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveIndex(index)}
                            className={`transition-all duration-300 rounded-full ${index === activeIndex
                                    ? 'w-8 h-2 bg-brand-green'
                                    : 'w-2 h-2 bg-zinc-300 hover:bg-zinc-400'
                                }`}
                            aria-label={`Go to testimonial ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};
