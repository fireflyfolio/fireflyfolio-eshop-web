import { Category, StaticPage, StaticSlug } from '@domain/types';

export interface CategoryRepository {
  list(): Category[];
  pageBySlug(slug: StaticSlug): StaticPage | undefined;
}
