import ProductCard from '@/ui/ProductCard';
import { API_URL } from '@/lib/env';

function toURLSearchParams(obj: Record<string, unknown>) {
  const usp = new URLSearchParams();

  for (const [k, v] of Object.entries(obj)) {
    if (v == null) continue;

    if (Array.isArray(v)) {
      for (const item of v) usp.append(k, String(item));
    } else {
      usp.set(k, String(v));
    }
  }

  return usp;
}

async function getProducts(sp: Record<string, unknown>) {
  const url = new URL(`${API_URL}/products`);
  const usp = toURLSearchParams(sp);

  // Optionnel: garde seulement les clés autorisées
  const allowed = ['q','category','brand','minPrice','maxPrice','minRating','sort','page','pageSize'];
   for (const [k,v] of usp) if (!allowed.includes(k)) usp.delete(k);

  url.search = usp.toString();
  const res = await fetch(url.toString(), { next: { revalidate: 30 } });

  if (!res.ok) throw new Error(`Failed to load products: ${res.status}`);

  return res.json() as Promise<{ items: any[]; total: number; page: number; pageSize: number }>;
}

export default async function CataloguePage({ searchParams }: { searchParams: Promise<Record<string, unknown>>;}) {
  const sp = await searchParams;

  const data = await getProducts(sp);
  const nPages = Math.max(1, Math.ceil(data.total / data.pageSize));
  const page = Number((sp as any).page ?? 1);

  // Helpers pour générer les liens de pagination sans spread d’un proxy
  const baseUsp = toURLSearchParams(sp);

  const hrefWith = (patch: Record<string, unknown>) => {
    const usp = new URLSearchParams(baseUsp);
    for (const [k, v] of Object.entries(patch)) {
      if (v == null) usp.delete(k);
      else usp.set(k, String(v));
    }
    return `?${usp.toString()}`;
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 grid grid-cols-12 gap-6">
      <aside className="col-span-12 md:col-span-3">
        <form className="space-y-4" method="get">
          <fieldset className="border rounded p-3">
            <legend className="font-medium">Search</legend>
            <input
              name="q"
              defaultValue={(sp as any).q as string | undefined}
              placeholder="Search…"
              className="w-full border rounded px-3 py-2"
            />
          </fieldset>
          <fieldset className="border rounded p-3">
            <legend className="font-medium">Sort</legend>
            <select
              name="sort"
              defaultValue={(sp as any).sort as string | undefined}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Default</option>
              <option value="price_asc">Price ↑</option>
              <option value="price_desc">Price ↓</option>
              <option value="popular">Popular</option>
              <option value="new">New</option>
            </select>
          </fieldset>
          <button className="px-3 py-2 border rounded">Apply</button>
        </form>
      </aside>

      <main className="col-span-12 md:col-span-9">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {data.items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        <nav className="mt-6 flex items-center justify-center gap-2" aria-label="Pagination">
          <a
            className={`px-3 py-2 border rounded ${page <= 1 ? 'opacity-50 pointer-events-none' : ''}`}
            href={hrefWith({ page: Math.max(1, page - 1) })}
          >
            Previous
          </a>

          {Array.from({ length: nPages }).slice(0, 6).map((_, i) => {
            const p = i + 1;
            return (
              <a
                key={p}
                aria-current={p === page ? 'page' : undefined}
                className={`px-3 py-2 border rounded ${p === page ? 'bg-neutral-100' : ''}`}
                href={hrefWith({ page: p })}
              >
                {p}
              </a>
            );
          })}

          <a
            className={`px-3 py-2 border rounded ${page >= nPages ? 'opacity-50 pointer-events-none' : ''}`}
            href={hrefWith({ page: Math.min(nPages, page + 1) })}
          >
            Next
          </a>
        </nav>
      </main>
    </div>
  );
}
