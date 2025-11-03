export default function ProductCard({ product }: { product: any }) {
  return (
    <a href={`/produit/${product.slug}`} className="block border rounded-lg overflow-hidden focus:outline-none focus:ring">
      <img src={product.images[0]} alt={product.title.fr} className="w-full aspect-square object-cover" />
      <div className="p-3">
        <div className="text-sm line-clamp-2">{product.title.fr}</div>
        <div className="mt-1 font-semibold">{(product.priceCents / 100).toFixed(2)} €</div>
      </div>
    </a>
  );
}
