export type Locale = "pl" | "en";

export function getLocaleFromUrl(url: URL): Locale {
  const [, locale] = url.pathname.split("/");
  if (locale === "pl") return "pl";
  return "en";
}

export function getLocalePath(locale: Locale, path: string = "/"): string {
  return `/${locale}${path}`;
}
