export default async function Home() {
  const base = process.env.INTERNAL_WEB_API_URL || 'http://web-api:3001';
  const res = await fetch(`${base}/status`, { cache: 'no-store' });
  const data = await res.text();
  return (
    <main className="min-h-screen grid place-items-center">
      <div className="p-6 rounded-xl shadow bg-white">
        <h1 className="text-2xl font-bold">B2C Frontend</h1>
        <p className="mt-2 text-gray-600">API says:</p>
        <p className="mt-4 font-mono">{data}</p>
      </div>
    </main>
  );
}
