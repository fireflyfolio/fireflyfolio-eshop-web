import { Category, StaticPage, StaticSlug } from '../../domain/types.js';

export interface CategoryRepository {
  list(): Category[];
  pageBySlug(slug: StaticSlug): StaticPage | undefined;
}
