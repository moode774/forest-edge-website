import React from 'react';

export type Language = 'en' | 'ar';

export interface TranslationStructure {
  nav: {
    home: string;
    about: string;
    services: string;
    products: string;
    portfolio: string;
    contact: string;
    experience: string;
  };
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  about: {
    title: string;
    description: string;
    valuesTitle: string;
    values: { title: string; desc: string }[];
    materialsTitle: string;
    materialsDesc: string;
    materialsList: string[];
  };
  services: {
    title: string;
    items: {
      title: string;
      description: string;
      features: string[];
    }[];
  };
  products: {
    title: string;
    categories: { id: string; label: string }[];
  };
  portfolio: {
    title: string;
  };
  contact: {
    title: string;
    subtitle: string;
    form: {
      name: string;
      email: string;
      phone: string;
      message: string;
      submit: string;
    };
    info: {
      address: string;
      phone: string;
      email: string;
      hours: string;
    };
  };
  footer: {
    desc: string;
    quickLinks: string;
    rights: string;
  };
  cart: {
    title: string;
    empty: string;
    emptyDesc: string;
    browse: string;
    subtotal: string;
    delivery: string;
    free: string;
    total: string;
    checkout: string;
    continue: string;
    freeNotice: string;
    freeIncluded: string;
  };
}

export interface ProductItem {
  id: number;
  title: { en: string; ar: string };
  category: string;
  image: string;
}

export interface ServiceItem {
  id: string;
  icon: React.ElementType;
  title: { en: string; ar: string };
  desc: { en: string; ar: string };
  details: { en: string[]; ar: string[] };
}