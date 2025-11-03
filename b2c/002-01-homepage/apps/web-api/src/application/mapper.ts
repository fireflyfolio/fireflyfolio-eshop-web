import { Product, Locale, StaticPage } from '../domain/types';

export const priceToNumber = (cents: number) => Math.round(cents) / 100;

export function localizeTitle(p: Product, locale: Locale) {
  return {
    ...p,
    title: p.title[locale] ?? p.title.fr
  } as any;
}

export function localizePage(page: StaticPage, locale: Locale) {
  return {
    slug: page.slug,
    title: page.title[locale] ?? page.title.fr,
    html: page.html[locale] ?? page.html.fr
  };
}
