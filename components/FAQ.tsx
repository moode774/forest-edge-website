import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
    question: string;
    questionAr: string;
    answer: string;
    answerAr: string;
}

const faqData: FAQItem[] = [
    {
        question: "What types of wood do you use?",
        questionAr: "ما أنواع الخشب التي تستخدمونها؟",
        answer: "We work with premium hardwoods including Mahogany, Oak, Walnut, Cherry, and Teak. All our wood is sustainably sourced and carefully selected for quality.",
        answerAr: "نعمل مع أخشاب صلبة فاخرة تشمل الماهوجني والبلوط والجوز والكرز والتيك. جميع أخشابنا مستدامة ومختارة بعناية للجودة."
    },
    {
        question: "Do you offer custom designs?",
        questionAr: "هل تقدمون تصاميم مخصصة؟",
        answer: "Yes! We specialize in custom furniture design. Our team works closely with you to create pieces that perfectly match your vision and space requirements.",
        answerAr: "نعم! نحن متخصصون في تصميم الأثاث المخصص. يعمل فريقنا معك عن كثب لإنشاء قطع تتناسب تماماً مع رؤيتك ومتطلبات مساحتك."
    },
    {
        question: "What is the typical lead time for projects?",
        questionAr: "ما هو الوقت المعتاد لإنجاز المشاريع؟",
        answer: "Lead times vary depending on project complexity. Standard pieces take 4-6 weeks, while custom projects typically require 8-12 weeks from design approval to delivery.",
        answerAr: "تختلف أوقات التسليم حسب تعقيد المشروع. القطع القياسية تستغرق 4-6 أسابيع، بينما المشاريع المخصصة تتطلب عادة 8-12 أسبوعاً من الموافقة على التصميم حتى التسليم."
    },
    {
        question: "Do you provide installation services?",
        questionAr: "هل تقدمون خدمات التركيب؟",
        answer: "Absolutely. We provide professional installation services for all our furniture. Our expert team ensures perfect placement and assembly.",
        answerAr: "بالتأكيد. نقدم خدمات تركيب احترافية لجميع أثاثنا. يضمن فريقنا الخبير الوضع والتجميع المثالي."
    },
    {
        question: "What warranty do you offer?",
        questionAr: "ما هي الضمانات التي تقدمونها؟",
        answer: "All our furniture comes with a 5-year warranty covering craftsmanship and materials. We stand behind the quality of our work.",
        answerAr: "جميع أثاثنا يأتي مع ضمان 5 سنوات يغطي الحرفية والمواد. نحن نقف وراء جودة عملنا."
    }
];

export const FAQ: React.FC<{ lang: 'en' | 'ar' }> = ({ lang }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-32 bg-white">
            <div className="container mx-auto px-6 max-w-[900px]">
                <div className="text-center mb-16">
                    <span className="text-brand-wood font-bold uppercase tracking-widest text-xs mb-3 block">
                        {lang === 'ar' ? 'الأسئلة الشائعة' : 'FAQ'}
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-brand-charcoal mb-4">
                        {lang === 'ar' ? 'أسئلة متكررة' : 'Frequently Asked Questions'}
                    </h2>
                    <div className="w-16 h-1 bg-brand-wood mx-auto rounded-full mt-6"></div>
                </div>

                <div className="space-y-4">
                    {faqData.map((item, index) => (
                        <div
                            key={index}
                            className="bg-zinc-50 rounded-2xl overflow-hidden border border-zinc-100 hover:border-brand-wood/30 transition-all duration-300"
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-zinc-100/50 transition-colors"
                            >
                                <h3 className="text-lg font-bold text-brand-charcoal pr-4">
                                    {lang === 'ar' ? item.questionAr : item.question}
                                </h3>
                                <ChevronDown
                                    size={24}
                                    className={`text-brand-green flex-shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''
                                        }`}
                                />
                            </button>

                            <div
                                className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                    }`}
                            >
                                <div className="px-8 pb-6 pt-2">
                                    <p className="text-zinc-600 leading-relaxed">
                                        {lang === 'ar' ? item.answerAr : item.answer}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
