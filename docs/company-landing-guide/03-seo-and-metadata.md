# 03 — SEO & Metadata for Company Landing Page

Praktyki SEO techniczne, structured data, meta tagi, i18n — wzorowane na sprawdzonym setupie CallWise, ale z JSON-LD odpowiednim dla firmy i founder-led homepage (`Organization` + `Person` zamiast `SoftwareApplication`).

---

## 1. HTML Head — Complete Template

```astro
---
// base.astro
const siteBase = "https://awesomeworks.ai";
const canonicalUrl = new URL(Astro.url.pathname, siteBase);
const altUrl = new URL(`/${altLocale}/`, siteBase);
const defaultUrl = new URL("/en/", siteBase);
const ogImage = new URL("/og-image.png", siteBase).href;
const resolvedSocialDescription = socialDescription ?? description;
---

<head>
  <!-- Core -->
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="generator" content={Astro.generator} />
  <meta name="theme-color" content="#0a0a12" />

  <!-- Title & Description -->
  <title>{title}</title>
  <meta name="description" content={description} />

  <!-- Canonical & hreflang -->
  <link rel="canonical" href={canonicalUrl.href} />
  <link rel="alternate" hreflang={locale} href={canonicalUrl.href} />
  <link rel="alternate" hreflang={altLocale} href={altUrl.href} />
  <link rel="alternate" hreflang="x-default" href={defaultUrl.href} />

  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="AwesomeWorks" />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={resolvedSocialDescription} />
  <meta property="og:image" content={ogImage} />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:url" content={canonicalUrl.href} />
  <meta property="og:locale" content={locale === "en" ? "en_US" : "pl_PL"} />
  <meta property="og:locale:alternate" content={locale === "en" ? "pl_PL" : "en_US"} />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={resolvedSocialDescription} />
  <meta name="twitter:image" content={ogImage} />

  <!-- Favicon -->
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png" />
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

  <!-- Structured Data -->
  <script type="application/ld+json" set:html={JSON.stringify(organizationJsonLd)} />
  <script type="application/ld+json" set:html={JSON.stringify(personJsonLd)} />
  <script type="application/ld+json" set:html={JSON.stringify(faqJsonLd)} />
</head>
```

---

## 2. Structured Data (JSON-LD)

### 2.1 Organization — Główny schema firmy

CallWise używa `SoftwareApplication`. Firma potrzebuje `Organization`:

```typescript
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "AwesomeWorks",
  url: siteBase,
  logo: new URL("/logo.png", siteBase).href,
  image: new URL("/og-image.png", siteBase).href,
  description: description,
  foundingDate: "2021",
  // Jeśli macie adres
  address: {
    "@type": "PostalAddress",
    addressLocality: "Warsaw",
    addressCountry: "PL",
  },
  "@id": new URL("#organization", siteBase).href,
  sameAs: [
    "https://linkedin.com/in/rlazicki",
    "https://github.com/Raff-dev",
    "https://x.com/awesomeworksai",
    "https://instagram.com/awesomeworksai",
  ],
  founder: {
    "@id": new URL("#rafal-lazicki", siteBase).href,
  },
  // Contact
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: "hello@awesomeworks.ai",
    availableLanguage: ["English", "Polish"],
  },
};
```

### 2.2 Person — Founder entity

```typescript
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": new URL("#rafal-lazicki", siteBase).href,
  name: "Rafał Łazicki",
  url: canonicalUrl.href,
  image: new URL("/rafal.jpeg", siteBase).href,
  jobTitle: "Founder",
  sameAs: [
    "https://linkedin.com/in/rlazicki",
    "https://github.com/Raff-dev",
  ],
  worksFor: {
    "@id": new URL("#organization", siteBase).href,
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Military University of Technology",
  },
  knowsAbout: [
    "AI delivery systems",
    "workflow design",
    "handoffs",
    "internal tooling",
    "backend engineering",
    "DevOps",
    "RAG systems",
  ],
};
```

### 2.3 FAQPage — Identyczny pattern jak CallWise

```typescript
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: i.faq.items.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};
```

### 2.4 WebSite (opcjonalnie — dla sitelink searchbox)

```typescript
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "AwesomeWorks",
  url: siteBase,
  inLanguage: ["en", "pl"],
};
```

### 2.5 BreadcrumbList (na podstronach)

```typescript
const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteBase },
    { "@type": "ListItem", position: 2, name: "Privacy Policy", item: `${siteBase}/en/privacy` },
  ],
};
```

---

## 3. Title & Meta Description — Wzorce

### Title format

```
Primary intent — Person/Brand name
```

**Przykłady:**
- **Homepage EN:** `Rafał Łazicki — AI delivery systems for product teams`
- **Homepage PL:** `Rafał Łazicki — AI delivery systems dla zespołów produktowych`
- **Privacy EN:** `Privacy Policy — AwesomeWorks`
- **Blog post:** `How We Built X in 3 Weeks — AwesomeWorks`

**Reguły:**
- Max 60 znaków (cięcie w SERP)
- Dla founder-led homepage najpierw osoba, potem definicja oferty
- Unikaj ogólników typu "AI automation for business"

### Meta description

- Max 155 znaków
- Zawiera: co robicie + dla kogo + CTA
- Unikaj: "Welcome to...", "We are a company that..."

**Przykłady:**

```
EN: "I help product teams shorten the path from decisions and scope to deployment. I design workflows, handoffs, and internal tooling for AI-native execution."

PL: "Pomagam zespołom produktowym skrócić drogę od decyzji i scope'u do wdrożenia. Projektuję workflow, handoffy i internal tooling dla AI-native execution."
```

---

## 4. i18n / Multilanguage SEO

### 4.1 Hreflang — identyczny pattern jak CallWise

```html
<link rel="canonical" href="https://awesomeworks.ai/en/" />
<link rel="alternate" hreflang="en" href="https://awesomeworks.ai/en/" />
<link rel="alternate" hreflang="pl" href="https://awesomeworks.ai/pl/" />
<link rel="alternate" hreflang="x-default" href="https://awesomeworks.ai/en/" />
```

**Reguły:**
- Każda strona ma canonical + oba hreflang + x-default
- `x-default` = EN (domyślny język)
- Root `/` nie powinien być indeksowalną kopią EN homepage
- Na obecnym deployu GitHub Pages użyj HTML redirect (`meta refresh` + canonical do `/en/` + `noindex`) i wyklucz `/` z sitemap
- Jeśli hosting przejdzie na SSR/edge, preferuj prawdziwy `302` do `/en/`

### 4.2 Astro i18n config

```javascript
// astro.config.mjs
export default defineConfig({
  site: "https://awesomeworks.ai",
  i18n: {
    defaultLocale: "en",
    locales: ["en", "pl"],
    routing: { prefixDefaultLocale: true },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: "en",
        locales: { en: "en", pl: "pl" },
      },
      filter: (page) => page !== "https://awesomeworks.ai/",
    }),
  ],
});
```

### 4.3 Sitemap

`@astrojs/sitemap` automatycznie generuje `/sitemap-index.xml` z hreflang alternates. Jeśli root `/` jest tylko redirect page, wyklucz go przez `filter()`.

**Weryfikacja:** Po buildzie sprawdź `dist/sitemap-index.xml` czy zawiera obie wersje językowe z poprawnym `hreflang`.

---

## 5. OG Image — Wytyczne

- Rozmiar: **1200×630px** (standard OG)
- Format: PNG (lepsza jakość) lub WebP (mniejszy rozmiar)
- Zawartość: Logo + brand name + tagline na ciemnym tle z gradient mesh
- Tekst czytelny w miniaturce (min 32px font effectively)
- Osobne OG image per język: `og-image-en.png`, `og-image-pl.png`

**CallWise pattern:**
```typescript
const ogImageAbsolute = new URL(
  locale === "pl" ? "/og-image-pl.png" : "/og-image-en.png",
  siteBase
).href;
```

---

## 6. Technical SEO Checklist

### Crawlability

- [ ] `robots.txt` pozwala crawlowanie `/en/` i `/pl/`
- [ ] Brak `noindex` na stronie głównej
- [ ] Sitemap submitted w Google Search Console
- [ ] Każda strona ma unikalny `<title>` i `<meta description>`
- [ ] Brak duplikatów treści (canonical tags)

### Performance (wpływa na ranking)

- [ ] Lighthouse Performance ≥ 90
- [ ] Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1
- [ ] Wszystkie obrazy z `width` i `height` atrybutami (no CLS)
- [ ] Font preloaded lub CSS-only fallback

### Accessibility (wpływa na UX signals)

- [ ] Wszystkie `<img>` mają `alt` text
- [ ] Heading hierarchy: jeden `h1` per strona, potem `h2`, `h3`
- [ ] Kontrast tekstu ≥ 4.5:1 (WCAG AA)
- [ ] Interaktywne elementy mają `focus-visible` style
- [ ] Skip-to-content link (opcjonalnie)

### Content

- [ ] H1 na homepage zawiera primary keyword
- [ ] H2 na każdej sekcji zawiera secondary keywords
- [ ] Wewnętrzne linki między sekcjami (anchor links w nav)
- [ ] Footer ma linki do legal pages
- [ ] FAQ sekcja z FAQ structured data

---

## 7. Monitoring

| Narzędzie | Cel | Częstotliwość |
|---|---|---|
| Google Search Console | Indexing, queries, CTR | Tygodniowo |
| PageSpeed Insights | Core Web Vitals | Po każdym deploymencie |
| Schema Markup Validator | Structured data testing | Po zmianach JSON-LD |
| Ahrefs / SEMrush (opcjonalnie) | Keyword ranking | Miesięcznie |
| Lighthouse CI | Automated perf checks | CI pipeline |

---

## 8. robots.txt

```
User-agent: *
Allow: /

Sitemap: https://awesomeworks.ai/sitemap-index.xml
```

Umieść w `public/robots.txt` — Astro skopiuje do `dist/`.
