export default async function Home() {
  const base = process.env.INTERNAL_API_URL || 'http://api:3001';
  const res = await fetch(`${base}/status`, { cache: 'no-store' });
  const data = await res.text();

  return (
    <main className="min-h-screen grid place-items-center bg-gray-50">
      <div className="p-8 rounded-2xl shadow bg-white">
        <h1 className="text-2xl font-bold">Frontend ↔ Backend Check</h1>
        <p className="mt-2 text-gray-600">API says:</p>
        <p className="mt-4 text-lg font-mono">{data}</p>
      </div>
    </main>
  );
}
