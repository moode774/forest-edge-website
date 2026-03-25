import { StoreProduct } from '../types/storeTypes';

export const storeProducts: StoreProduct[] = [
  {
    id: 'p1',
    name: { en: 'VANTAGE WALNUT DESK', ar: 'مكتب فانتاج من الجوز' },
    description: { 
        en: 'A high-performance executive desk crafted from solid deep walnut with integrated cable management.', 
        ar: 'مكتب تنفيذي عالي الأداء مصنوع من خشب الجوز العميق مع نظام إدارة الكابلات المدمج.' 
    },
    price: 4500,
    category: 'office',
    images: ['https://images.unsplash.com/photo-1518455027359-f3f816b1a22a?auto=format&fit=crop&q=80&w=800'],
    featured: true,
    sku: 'FE-O-001'
  },
  {
    id: 'p2',
    name: { en: 'ZENITH OAK DINING TABLE', ar: 'طاولة طعام زينيث من البلوط' },
    description: { 
        en: 'Minimalist industrial dining table with golden oak finish and steel structural anchors.', 
        ar: 'طاولة طعام صناعية بسيطة بلمسة من البلوط الذهبي وركائز هيكلية من الصلب.' 
    },
    price: 3200,
    category: 'tables',
    images: ['https://images.unsplash.com/photo-1577147448621-179100e3b8ac?auto=format&fit=crop&q=80&w=800'],
    featured: true,
    sku: 'FE-T-002'
  },
  {
    id: 'p3',
    name: { en: 'INDUSTRIAL ARCHIVE CHAIR', ar: 'كرسي الأرشيف الصناعي' },
    description: { 
        en: 'Ergonomic task chair with leather upholstery and cast iron swivel mechanism.', 
        ar: 'كرسي مهام مريح مع تنجيد من الجلد وآلية دوران من الحديد الزهر.' 
    },
    price: 1850,
    category: 'chairs',
    images: ['https://images.unsplash.com/photo-1580480055273-228ff5388ef8?auto=format&fit=crop&q=80&w=800'],
    featured: false,
    sku: 'FE-C-003'
  },
  {
    id: 'p4',
    name: { en: 'MONOLITH STORAGE UNIT', ar: 'وحدة تخزين مونوليث' },
    description: { 
        en: 'Heavy-duty storage solution with modular walnut shelving and magnetic closures.', 
        ar: 'حل تخزين شديد التحمل مع رفوف جوز معيارية وإغلاقات مغناطيسية.' 
    },
    price: 2600,
    category: 'storage',
    images: ['https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=800'],
    featured: false,
    sku: 'FE-S-004'
  },
  {
    id: 'p5',
    name: { en: 'ECLIPSE LOUNGE CHAIR', ar: 'كرسي الكسوف المريح' },
    description: { 
        en: 'Sculptured lounge chair designed for maximum comfort in luxury residential spaces.', 
        ar: 'كرسي استرخاء منحوت مصمم لتوفير أقصى درجات الراحة في المساحات السكنية الفاخرة.' 
    },
    price: 3800,
    category: 'chairs',
    images: ['https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=800'],
    featured: true,
    sku: 'FE-C-005'
  },
  {
    id: 'p6',
    name: { en: 'QUARTZ WORKSTATION', ar: 'محطة عمل كوارتز' },
    description: { 
        en: 'Compact professional workstation featuring golden oak and matte black frames.', 
        ar: 'محطة عمل احترافية مدمجة تتميز بالبلوط الذهبي وإطارات سوداء غير لامعة.' 
    },
    price: 2100,
    category: 'office',
    images: ['https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&q=80&w=800'],
    featured: false,
    sku: 'FE-O-006'
  },
  {
    id: 'p7',
    name: { en: 'HORIZON COFFEE TABLE', ar: 'طاولة قهوة الأفق' },
    description: { 
        en: 'Low-profile coffee table with walnut grain patterns and glass overlay.', 
        ar: 'طاولة قهوة منخفضة بلمسات خشب الجوز وطبقة زجاجية.' 
    },
    price: 1400,
    category: 'tables',
    images: ['https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80&w=800'],
    featured: false,
    sku: 'FE-T-007'
  },
  {
    id: 'p8',
    name: { en: 'TITAN BOOKSHELF', ar: 'رف كتب تيتان' },
    description: { 
        en: 'Grand architectural bookshelf spanning 2.4 meters with reinforced oak supports.', 
        ar: 'رف كتب معماري ضخم بطول 2.4 متر مع دعامات بلوط معززة.' 
    },
    price: 5200,
    category: 'storage',
    images: ['https://images.unsplash.com/photo-1594620302200-9a7621.auto=format&fit=crop&q=80&w=800'],
    featured: true,
    sku: 'FE-S-008'
  }
];
