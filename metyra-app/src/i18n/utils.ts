import { ui, defaultLang, type Lang, type UiKey } from './ui';

/**
 * Astro's configured base path (e.g. `/metyra/` when this app is mounted under awesomeworks.ai/metyra).
 * `import.meta.env.BASE_URL` always ends with `/` per Astro spec.
 */
const BASE: string = import.meta.env.BASE_URL ?? '/';

function stripBase(pathname: string): string {
  if (BASE === '/' || BASE === '') return pathname;
  const trimmed = BASE.replace(/\/$/, ''); // "/metyra"
  if (pathname === trimmed) return '/';
  if (pathname.startsWith(trimmed + '/')) return pathname.slice(trimmed.length);
  return pathname;
}

function withBase(path: string): string {
  if (BASE === '/' || BASE === '') return path;
  const trimmedBase = BASE.replace(/\/$/, ''); // "/metyra"
  if (path === '/') return trimmedBase + '/';
  return trimmedBase + path;
}

export function getLangFromUrl(url: URL): Lang {
  const stripped = stripBase(url.pathname);
  const [, lang] = stripped.split('/');
  if (lang === 'en') return 'en';
  return defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: UiKey): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}

export function getLocalizedPath(path: string, lang: Lang): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  const localized = lang === defaultLang
    ? (clean === '/' ? '/' : clean)
    : (clean === '/' ? '/en/' : `/en${clean}`);
  return withBase(localized);
}

export function getAltLangPath(currentPath: string, targetLang: Lang): string {
  const stripped = stripBase(currentPath);
  const withoutEnPrefix = stripped.replace(/^\/en(\/|$)/, '/');
  return getLocalizedPath(withoutEnPrefix, targetLang);
}
