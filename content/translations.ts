import { TranslationStructure } from '../types';

export const translations: Record<'en' | 'ar', TranslationStructure> = {
  en: {
    nav: {
      home: "Home",
      about: "About Us",
      services: "Services",
      products: "Catalog",
      portfolio: "Portfolio",
      contact: "Contact",
      experience: "Experience",
    },
    hero: {
      title: "Crafting Timeless Elegance",
      subtitle: "Where nature's finest materials meet master craftsmanship to create bespoke luxury furniture and interiors.",
      cta: "Explore Our Collection",
    },
    about: {
      title: "Our Legacy of Excellence",
      description: "At Forest Edge, we don't just make furniture; we curate environments. With decades of experience in luxury carpentry, we merge traditional woodworking techniques with modern precision. Our mission is to transform raw, high-quality wood into masterpieces that define your space.",
      valuesTitle: "Our Values",
      values: [
        { title: "Precision", desc: "Every cut, joint, and finish is executed with mathematical accuracy." },
        { title: "Quality", desc: "We source only the finest Solid Woods, Veneers, and MDF." },
        { title: "Innovation", desc: "Merging classic aesthetics with contemporary functionality." },
      ],
      materialsTitle: "Premium Materials",
      materialsDesc: "We specialize in a wide array of wood types to match any drawing or design requirement.",
      materialsList: ["Solid Oak, Walnut, Mahogany", "High-Grade MDF", "Premium Natural Veneers", "Intricate Mouldings"],
    },
    services: {
      title: "Our Expertise",
      items: [
        {
          title: "Luxury Furniture Manufacturing",
          description: "Bespoke pieces designed for comfort and grandeur.",
          features: ["Dining Tables & Chairs", "Console & Coffee Tables", "Buffets & Credenzas"],
        },
        {
          title: "Interior Woodwork",
          description: "Complete architectural woodworking solutions.",
          features: ["Wall Paneling", "Custom Cabinetry", "Moulding & Trim"],
        },
        {
          title: "Classic & Luxury Desks",
          description: "Statement pieces for executive offices.",
          features: ["Solid Wood Desks", "Leather Inlay Work", "Hidden Tech Integration"],
        },
        {
          title: "Outdoor Solutions",
          description: "Weather-resistant beauty for your exterior.",
          features: ["Garden Fences", "Pergolas", "Decking"],
        },
        {
          title: "Restoration & Repair",
          description: "Breathing new life into cherished pieces.",
          features: ["Cut Repair & Recut", "Hinge & Mirror Fixing", "Color Changing & Refinishing"],
        },
        {
          title: "Custom Project Execution",
          description: "Bringing technical drawings to reality.",
          features: ["As Per Shop Drawing", "Turnkey Execution", "Site Installation"],
        },
      ],
    },
    products: {
      title: "Our Collection",
      categories: [
        { id: 'all', label: 'All' },
        { id: 'tables', label: 'Tables' },
        { id: 'chairs', label: 'Chairs' },
        { id: 'storage', label: 'Storage' },
        { id: 'office', label: 'Office' },
        { id: 'outdoor', label: 'Outdoor' },
      ],
    },
    portfolio: {
      title: "Featured Projects",
    },
    contact: {
      title: "Get in Touch",
      subtitle: "Let us bring your vision to life. Contact us for quotes or consultations.",
      form: {
        name: "Your Name",
        email: "Email Address",
        phone: "Phone Number",
        message: "How can we help?",
        submit: "Send Request",
      },
      info: {
        address: "123 Industrial District, Woodwork Ave.",
        phone: "+966 50 000 0000",
        email: "info@forestedge.com",
        hours: "Sat - Thu: 8:00 AM - 6:00 PM",
      },
    },
    footer: {
      desc: "Forest Edge defines the intersection of nature and luxury craftsmanship.",
      quickLinks: "Quick Links",
      rights: "All Rights Reserved © Forest Edge",
    },
    cart: {
      title: "Your Cart",
      empty: "Your cart is empty",
      emptyDesc: "Discover our luxury furniture collection and add your favourite pieces",
      browse: "Browse Store",
      subtotal: "Subtotal",
      delivery: "Delivery",
      free: "Free",
      total: "Total",
      checkout: "Proceed to Checkout",
      continue: "Continue Shopping",
      freeNotice: "Add {amount} SAR more for free delivery",
      freeIncluded: "Free delivery included",
    },
  },
  ar: {
    nav: {
      home: "الرئيسية",
      about: "من نحن",
      services: "خدماتنا",
      products: "المنتجات",
      portfolio: "أعمالنا",
      contact: "تواصل معنا",
      experience: "التجربة",
    },
    hero: {
      title: "نصنع الأناقة الخالدة",
      subtitle: "حيث تلتقي أجود خامات الطبيعة مع براعة الحرفيين لابتكار أثاث فاخر وديكورات داخلية استثنائية.",
      cta: "تصفح مجموعتنا",
    },
    about: {
      title: "إرث من التميز",
      description: "في Forest Edge، نحن لا نصنع الأثاث فحسب؛ بل نصمم بيئات متكاملة. بخبرة عقود في النجارة الفاخرة، نمزج بين التقنيات التقليدية والدقة الحديثة. مهمتنا هي تحويل الخشب الخام عالي الجودة إلى تحف فنية تحدد معالم مساحتك.",
      valuesTitle: "قيمنا",
      values: [
        { title: "الدقة", desc: "يتم تنفيذ كل قطعة وكل مفصل بدقة متناهية." },
        { title: "الجودة", desc: "نستخدم فقط أجود أنواع الخشب الصلب والقشرة والـ MDF." },
        { title: "الابتكار", desc: "الدمج بين الجماليات الكلاسيكية والوظائف المعاصرة." },
      ],
      materialsTitle: "خامات فاخرة",
      materialsDesc: "نحن متخصصون في مجموعة واسعة من أنواع الخشب لتتناسب مع أي مخطط أو تصميم.",
      materialsList: ["خشب صلب (سنديان، جوز، ماهوجني)", "MDF عالي الجودة", "قشرة طبيعية فاخرة", "أعمال القوالب والزخارف"],
    },
    services: {
      title: "خبراتنا",
      items: [
        {
          title: "تصنيع الأثاث الفاخر",
          description: "قطع مفصلة خصيصاً للفخامة والراحة.",
          features: ["طاولات ومقاعد الطعام", "طاولات القهوة والكونسول", "البوفيهات والخزائن"],
        },
        {
          title: "الأعمال الخشبية الداخلية",
          description: "حلول معمارية خشبية متكاملة.",
          features: ["تكسية الجدران", "خزائن مخصصة", "قوالب وإطارات"],
        },
        {
          title: "المكاتب الكلاسيكية والفاخرة",
          description: "قطع فنية للمكاتب التنفيذية.",
          features: ["مكاتب خشب صلب", "تطعيم بالجلد", "دمج التقنيات الحديثة"],
        },
        {
          title: "الأعمال الخارجية",
          description: "جمال مقاوم للعوامل الجوية لمساحاتك الخارجية.",
          features: ["أسوار الحدائق", "البرجولات والمظلات", "الأرضيات الخشبية"],
        },
        {
          title: "الترميم والإصلاح",
          description: "إعادة الحياة للقطع الثمينة.",
          features: ["إصلاح القطوع وتعديل المقاسات", "إصلاح المفصلات والمرايا", "تغيير الألوان وإعادة الطلاء"],
        },
        {
          title: "تنفيذ المشاريع الخاصة",
          description: "تحويل المخططات الفنية إلى واقع ملموس.",
          features: ["التنفيذ حسب المخططات", "مشاريع تسليم مفتاح", "التركيب في الموقع"],
        },
      ],
    },
    products: {
      title: "المجموعة",
      categories: [
        { id: 'all', label: 'الكل' },
        { id: 'tables', label: 'طاولات' },
        { id: 'chairs', label: 'كراسي' },
        { id: 'storage', label: 'خزائن' },
        { id: 'office', label: 'مكاتب' },
        { id: 'outdoor', label: 'خارجي' },
      ],
    },
    portfolio: {
      title: "مشاريع مميزة",
    },
    contact: {
      title: "اتصل بنا",
      subtitle: "دعنا نحول رؤيتك إلى واقع. تواصل معنا لطلب عرض سعر أو استشارة.",
      form: {
        name: "الاسم",
        email: "البريد الإلكتروني",
        phone: "رقم الهاتف",
        message: "كيف يمكننا مساعدتك؟",
        submit: "إرسال الطلب",
      },
      info: {
        address: "١٢٣ المنطقة الصناعية، شارع الأعمال الخشبية",
        phone: "٠٠٠٠ ٠٠٠ ٥٠ ٩٦٦+",
        email: "info@forestedge.com",
        hours: "السبت - الخميس: ٨:٠٠ ص - ٦:٠٠ م",
      },
    },
    footer: {
      desc: "فورست إيدج تمثل نقطة التقاء الطبيعة مع الحرفية الفاخرة.",
      quickLinks: "روابط سريعة",
      rights: "جميع الحقوق محفوظة © Forest Edge",
    },
    cart: {
      title: "سلة المشتريات",
      empty: "سلتك فارغة",
      emptyDesc: "اكتشف مجموعتنا من الأثاث الفاخر وأضف قطعك المفضلة",
      browse: "تصفح المتجر",
      subtotal: "المجموع الفرعي",
      delivery: "التوصيل",
      free: "مجاني",
      total: "الإجمالي",
      checkout: "متابعة الطلب",
      continue: "مواصلة التسوق",
      freeNotice: "أضف {amount} SAR للحصول على شحن مجاني",
      freeIncluded: "يشمل شحن مجاني",
    },
  },
};