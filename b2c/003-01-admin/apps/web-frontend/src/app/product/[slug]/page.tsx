// src/app/product/[slug]/page.tsx
import { API_URL } from '@/lib/env';

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // ✅ déplier le Promise

  const res = await fetch(`${API_URL}/products/${encodeURIComponent(slug)}`, {
    next: { revalidate: 60 },
  });

  if (res.status === 404) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10">
        Product not found.
      </div>
    );
  }

  if (!res.ok) {
    throw new Error(`Failed to load product: ${res.status}`);
  }

  const p = await res.json();

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="grid grid-cols-12 gap-6">
        <section className="col-span-12 md:col-span-6">
          <div className="grid grid-cols-5 gap-2">
            <img
              src={p.images[0]}
              alt={p.title?.en ?? p.title?.fr ?? p.slug}
              className="col-span-5 aspect-square object-cover rounded"
            />
            {p.images.slice(1, 5).map((u: string, i: number) => (
              <img key={i} src={u} alt="" className="aspect-square object-cover rounded" />
            ))}
          </div>
        </section>

        <section className="col-span-12 md:col-span-6">
          <h1 className="text-2xl font-semibold">
            {p.title?.en ?? p.title?.fr ?? 'Product'}
          </h1>
          <div className="mt-3 text-3xl font-bold">
            {(p.priceCents / 100).toFixed(2)} €
          </div>

          <div className="mt-6 border rounded p-4 text-sm text-neutral-700">
            <h2 className="font-medium mb-2">Information</h2>
            <p>(placeholder)</p>
          </div>
        </section>
      </div>
    </div>
  );
}
