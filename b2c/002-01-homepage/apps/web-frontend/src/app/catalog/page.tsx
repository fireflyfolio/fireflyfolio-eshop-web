import { API_URL } from '@/lib/env';
import ProductCard from '@/ui/ProductCard';

async function getProducts(searchParams: Record<string, string | undefined>) {
  const url = new URL(`${API_URL}/products`);
  Object.entries(searchParams).forEach(([k, v]) => v && url.searchParams.set(k, v));
  const res = await fetch(url.toString(), { next: { revalidate: 30 } });
  return res.json() as Promise<{ items: any[]; total: number; page: number; pageSize: number }>;
}

export default async function CataloguePage({ searchParams }: { searchParams: Record<string, string | undefined> }) {
  const data = await getProducts(searchParams);
  const nPages = Math.max(1, Math.ceil(data.total / data.pageSize));
  const page = Number(searchParams.page ?? 1);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 grid grid-cols-12 gap-6">
      <aside className="col-span-12 md:col-span-3">
        <form className="space-y-4" method="get">
          <fieldset className="border rounded p-3">
            <legend className="font-medium">Recherche</legend>
            <input name="q" defaultValue={searchParams.q} placeholder="Rechercher..." className="w-full border rounded px-3 py-2" />
          </fieldset>
          <fieldset className="border rounded p-3">
            <legend className="font-medium">Tri</legend>
            <select name="sort" defaultValue={searchParams.sort} className="w-full border rounded px-3 py-2">
              <option value="">Par défaut</option>
              <option value="price_asc">Prix ↑</option>
              <option value="price_desc">Prix ↓</option>
              <option value="popular">Populaire</option>
              <option value="new">Nouveautés</option>
            </select>
          </fieldset>
          <button className="px-3 py-2 border rounded">Appliquer</button>
        </form>
      </aside>
      <main className="col-span-12 md:col-span-9">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {data.items.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
        <nav className="mt-6 flex items-center justify-center gap-2" aria-label="Pagination">
          <a className={`px-3 py-2 border rounded ${page <= 1 ? 'opacity-50 pointer-events-none' : ''}`} href={`?${new URLSearchParams({ ...searchParams, page: String(Math.max(1, page - 1)) } as any)}`}>
            Précédent
          </a>
          {Array.from({ length: nPages }).slice(0, 6).map((_, i) => {
            const p = i + 1;
            return (
              <a key={p} aria-current={p === page ? 'page' : undefined} className={`px-3 py-2 border rounded ${p === page ? 'bg-neutral-100' : ''}`} href={`?${new URLSearchParams({ ...searchParams, page: String(p) } as any)}`}>{p}</a>
            );
          })}
          <a className={`px-3 py-2 border rounded ${page >= nPages ? 'opacity-50 pointer-events-none' : ''}`} href={`?${new URLSearchParams({ ...searchParams, page: String(Math.min(nPages, page + 1)) } as any)}`}>
            Suivant
          </a>
        </nav>
      </main>
    </div>
  );
}
