import { Product } from '../../domain/types';

export interface ListParams {
  q?: string;
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number; // 0..5
  sort?: 'price_asc' | 'price_desc' | 'new' | 'popular';
  page: number;
  pageSize: number;
}

export interface ProductRepository {
  search(params: ListParams): { items: Product[]; total: number };
  bySlug(slug: string): Product | undefined;
}
