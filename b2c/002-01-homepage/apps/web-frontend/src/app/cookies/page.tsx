async function getPage() {
  const r = await fetch(`${process.env.PUBLIC_WEB_API_URL}/pages/privacy`, { next: { revalidate: 3600 } });
  return r.json();
}

export default async function Privacy() {
  const page = await getPage();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-semibold mb-6">{page.title.fr}</h1>
      <article dangerouslySetInnerHTML={{ __html: page.html.fr }} />
    </div>
  );
}
