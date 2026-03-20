import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  collection, addDoc, getDocs, doc, updateDoc,
  query, orderBy, onSnapshot, setDoc
} from 'firebase/firestore';
import { db } from '../../firebase';
import { CartItem, Order, OrderCustomer, StoreProduct } from '../types/storeTypes';

interface StoreContextType {
  cart: CartItem[];
  orders: Order[];
  products: StoreProduct[];
  productsLoading: boolean;
  cartOpen: boolean;
  addToCart: (product: StoreProduct, qty?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQty: (productId: string, qty: number) => void;
  clearCart: () => void;
  setCartOpen: (open: boolean) => void;
  placeOrder: (customer: OrderCustomer, paymentMethod: Order['paymentMethod']) => Promise<Order>;
  cartCount: number;
  cartTotal: number;
}

const StoreContext = createContext<StoreContextType | null>(null);

export const useStore = () => {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
};

const ORDERS_KEY = 'fe_orders';

const generateOrderId = (): string => {
  const suffix = Math.floor(1000 + Math.random() * 9000);
  return `FE-2026-${suffix}`;
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<StoreProduct[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const stored = localStorage.getItem(ORDERS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch { return []; }
  });
  const [cartOpen, setCartOpen] = useState(false);

  // ── Load products from Firestore (real-time) ──
  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'products'), (snap) => {
      const fetched: StoreProduct[] = snap.docs.map(d => ({
        id: d.id,
        ...(d.data() as Omit<StoreProduct, 'id'>),
      }));
      setProducts(fetched);
      setProductsLoading(false);
    }, () => {
      setProductsLoading(false);
    });
    return () => unsub();
  }, []);

  // ── Persist orders to localStorage ──
  useEffect(() => {
    try { localStorage.setItem(ORDERS_KEY, JSON.stringify(orders)); } catch { }
  }, [orders]);

  const addToCart = useCallback((product: StoreProduct, qty: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + qty } : item
        );
      }
      return [...prev, { product, quantity: qty }];
    });
    setCartOpen(true);
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  }, []);

  const updateQty = useCallback((productId: string, qty: number) => {
    if (qty <= 0) {
      setCart((prev) => prev.filter((item) => item.product.id !== productId));
    } else {
      setCart((prev) =>
        prev.map((item) => item.product.id === productId ? { ...item, quantity: qty } : item)
      );
    }
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const placeOrder = useCallback(async (
    customer: OrderCustomer,
    paymentMethod: Order['paymentMethod']
  ): Promise<Order> => {
    const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const delivery = subtotal >= 500 ? 0 : 150;
    const total = subtotal + delivery;
    const orderId = generateOrderId();

    const order: Order = {
      id: orderId,
      date: new Date().toISOString(),
      items: [...cart],
      subtotal,
      delivery,
      total,
      status: 'confirmed',
      customer,
      paymentMethod,
    };

    // Save customer identity for cross-browser tracking
    try {
      localStorage.setItem('fe_customer_phone', customer.phone);
    } catch {}

    // Save to Firestore
    try {
      await setDoc(doc(db, 'orders', orderId), {
        ...order,
        // Convert items to plain objects for Firestore
        items: order.items.map(item => ({
          quantity: item.quantity,
          product: {
            id: item.product.id,
            name: item.product.name,
            price: item.product.price,
            images: item.product.images,
            category: item.product.category,
          }
        }))
      });
    } catch (err) {
      console.error('Failed to save order to Firestore:', err);
    }

    setOrders((prev) => [order, ...prev]);
    setCart([]);
    setCartOpen(false);
    return order;
  }, [cart]);

  return (
    <StoreContext.Provider value={{
      cart, orders, products, productsLoading,
      cartOpen, addToCart, removeFromCart, updateQty,
      clearCart, setCartOpen, placeOrder, cartCount, cartTotal,
    }}>
      {children}
    </StoreContext.Provider>
  );
};
