import { API_URL } from '@/lib/env';

async function getPage() {
  const r = await fetch(`${API_URL}/pages/terms`, { next: { revalidate: 3600 } });
  if (!r.ok) throw new Error(`Failed to load terms: ${r.status}`);
  return r.json() as Promise<{ title: Record<string,string>; html: Record<string,string> }>;
}

export default async function Terms() {
  const page = await getPage();
  const title = page.title?.en ?? page.title?.fr ?? 'Terms';
  const html = page.html?.en ?? page.html?.fr ?? '<p>—</p>';
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-semibold mb-6">{title}</h1>
      <article dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
