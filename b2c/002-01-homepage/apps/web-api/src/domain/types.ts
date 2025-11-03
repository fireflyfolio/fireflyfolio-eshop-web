export type Locale = 'fr' | 'en';

export interface Category {
  id: string;
  slug: string;
  name: Record<Locale, string>;
  imageUrl: string;
}

export interface Product {
  id: string;
  slug: string;
  title: Record<Locale, string>;
  priceCents: number;
  images: string[];
  categories: string[]; // category ids
  brand?: string;
  rating?: number; // 0..5
  tags?: string[];
}

export type StaticSlug = 'terms' | 'privacy' | 'cookies' | 'about';
export interface StaticPage {
  slug: StaticSlug;
  title: Record<Locale, string>;
  html: Record<Locale, string>;
}
