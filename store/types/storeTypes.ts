export interface StoreProduct {
  id: string;
  name: { en: string; ar: string };
  category: string;
  price: number;
  originalPrice?: number;
  images: string[];
  description: { en: string; ar: string };
  shortDesc: { en: string; ar: string };
  materials: { en: string[]; ar: string[] };
  dimensions: { en: string; ar: string };
  inStock: boolean;
  featured: boolean;
  badge?: { en: string; ar: string };
  rating: number;
  reviews: number;
  sku?: string;
}

export interface CartItem {
  product: StoreProduct;
  quantity: number;
}

export interface OrderCustomer {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  notes: string;
  type: 'individual' | 'company';
  companyName?: string;
  vatNumber?: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  delivery: number;
  total: number;
  status: 'confirmed' | 'processing' | 'shipped' | 'delivered';
  customer: OrderCustomer;
  paymentMethod: 'cash' | 'card' | 'bank';
  userId?: string;
  userEmail?: string;
}

export interface Customer {
  id: string;               // Firebase UID
  type: 'individual' | 'company';
  name: string;
  email: string;
  phone: string;
  companyName?: string;
  vatNumber?: string;
  city?: string;
  address?: string;
  totalOrders: number;
  totalSpent: number;
  createdAt: string;
  lastOrderAt: string;
}
