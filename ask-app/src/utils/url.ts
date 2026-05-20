// Astro's BASE_URL ends with "/" per spec (e.g. "/ask/").
const BASE: string = import.meta.env.BASE_URL ?? "/";

/** Prefix an absolute path with the configured base ("/ask/foo" instead of "/foo"). */
export function withBase(path: string): string {
  if (BASE === "/" || BASE === "") return path;
  const trimmedBase = BASE.replace(/\/$/, "");
  if (path === "/") return `${trimmedBase}/`;
  return `${trimmedBase}${path.startsWith("/") ? path : `/${path}`}`;
}
