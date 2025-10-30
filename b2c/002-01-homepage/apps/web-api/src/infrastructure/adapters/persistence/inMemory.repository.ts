import { Category, Product, StaticPage } from '../../../domain/types.js';
import { ProductRepository, ListParams } from '../../../application/ports/ProductRepository.js';
import { CategoryRepository } from '../../../application/ports/CategoryRepository.js';

const categories: Category[] = [
  { id: 'cat-books', slug: 'livres', name: { fr: 'Livres', en: 'Books' }, imageUrl: 'https://picsum.photos/seed/books/1200/600' },
  { id: 'cat-games', slug: 'jeux-videos', name: { fr: 'Jeux vidéo', en: 'Video Games' }, imageUrl: 'https://picsum.photos/seed/games/1200/600' },
  { id: 'cat-music', slug: 'musiques', name: { fr: 'Musiques', en: 'Music' }, imageUrl: 'https://picsum.photos/seed/music/1200/600' },
  { id: 'cat-videos', slug: 'videos', name: { fr: 'Vidéos', en: 'Videos' }, imageUrl: 'https://picsum.photos/seed/videos/1200/600' }
];

const products: Product[] = Array.from({ length: 32 }).map((_, i) => {
  const cat = categories[i % categories.length];
  const price = 999 + (i % 12) * 123;
  const brand = ['Acme', 'Kenshi', 'Lyra', 'Naru'][i % 4];
  const rating = (i % 5) + 1;
  return {
    id: `p-${i + 1}`,
    slug: `produit-${i + 1}`,
    title: { fr: `Produit ${i + 1} – ${cat.name.fr}`, en: `Product ${i + 1} – ${cat.name.en}` },
    priceCents: price,
    images: [
      `https://picsum.photos/seed/p${i + 1}a/800/800`,
      `https://picsum.photos/seed/p${i + 1}b/800/800`,
      `https://picsum.photos/seed/p${i + 1}c/800/800`
    ],
    categories: [cat.id], brand, rating, tags: [cat.slug, brand.toLowerCase()]
  };
});

const staticPages: StaticPage[] = [
  { slug: 'gcu', title: { fr: "Conditions d'utilisation et de vente", en: 'Conditions of Use & Sale' }, html: { fr: '<p>Texte CGU (exemple).</p>', en: '<p>Terms (sample).</p>' } },
  { slug: 'privacy', title: { fr: 'Confidentialité', en: 'Privacy Notice' }, html: { fr: '<p>Politique de confidentialité.</p>', en: '<p>Privacy policy.</p>' } },
  { slug: 'cookie', title: { fr: 'Cookies', en: 'Cookies Notice' }, html: { fr: '<p>Politique cookies.</p>', en: '<p>Cookies policy.</p>' } },
  { slug: 'about', title: { fr: 'À propos', en: 'About' }, html: { fr: '<p>À propos de eShop.</p>', en: '<p>About eShop.</p>' } }
];

export class InMemoryProductRepository implements ProductRepository {
  search(p: ListParams) {
    let list = [...products];

    if (p.q) { const q = p.q.toLowerCase(); list = list.filter(pr => pr.title.fr.toLowerCase().includes(q) || pr.title.en.toLowerCase().includes(q)); }
    if (p.category) { const cat = categories.find(c => c.slug === p.category || c.id === p.category); if (cat) list = list.filter(pr => pr.categories.includes(cat.id)); }
    if (p.brand) list = list.filter(pr => (pr.brand ?? '').toLowerCase() === p.brand!.toLowerCase());
    if (p.minPrice !== undefined) list = list.filter(pr => pr.priceCents >= Math.round(p.minPrice! * 100));
    if (p.maxPrice !== undefined) list = list.filter(pr => pr.priceCents <= Math.round(p.maxPrice! * 100));
    if (p.minRating !== undefined) list = list.filter(pr => (pr.rating ?? 0) >= p.minRating!);

    switch (p.sort) {
      case 'price_asc': list.sort((a, b) => a.priceCents - b.priceCents); break;
      case 'price_desc': list.sort((a, b) => b.priceCents - a.priceCents); break;
      case 'popular': list.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0)); break;
      case 'new': default: list.sort((a, b) => a.slug.localeCompare(b.slug));
    }

    const total = list.length;
    const start = (p.page - 1) * p.pageSize;
    const items = list.slice(start, start + p.pageSize);

    return { items, total };
  }

  bySlug(slug: string) { return products.find(p => p.slug === slug); }
}

export class InMemoryCategoryRepository implements CategoryRepository {
  list() { return categories; }
  pageBySlug(slug: string) { return staticPages.find(p => p.slug === slug); }
}
