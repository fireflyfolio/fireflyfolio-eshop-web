async function getPage(slug: 'terms' | 'privacy' | 'cookies' | 'about') {
  const res = await fetch(`${process.env.PUBLIC_WEB_API_URL}/pages/${slug}`, { next: { revalidate: 3600 } });
  return res.json();
}

export default async function Page() {
  const slug = ("REPLACE_ME" as any);
  return null;
}
