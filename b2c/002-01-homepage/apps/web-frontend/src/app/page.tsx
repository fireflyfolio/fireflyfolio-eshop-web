import { Carousel } from '../ui/Carousel';

async function getCategories() {
  const res = await fetch(`${process.env.PUBLIC_WEB_API_URL}/categories`, { next: { revalidate: 60 } });
  return res.json() as Promise<Array<{ slug: string; name: { fr: string; en: string }; imageUrl: string }>>;
}

export default async function HomePage() {
  const cats = await getCategories();
  const slides = cats.map(c => ({ image: c.imageUrl, href: `/catalog?category=${c.slug}`, alt: c.name.fr }));
  return (
    <div>
      <Carousel slides={slides} />
      <section className="mx-auto max-w-7xl px-4 py-8">
        <h2 className="text-xl font-semibold mb-4">Catégories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {cats.map(c => (
            <a key={c.slug} href={`/catalogue?category=${c.slug}`} className="border rounded-lg overflow-hidden">
              <img src={c.imageUrl} alt={c.name.fr} className="w-full aspect-[4/3] object-cover" />
              <div className="p-3">{c.name.fr}</div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
