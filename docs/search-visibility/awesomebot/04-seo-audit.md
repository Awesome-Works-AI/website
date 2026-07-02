# SEO Audit — website / AwesomeBot sub-app — 2026-07-02

**Scope:** repo `website` (sub-app `awesomebot-app/` only); worktree `/home/raff/projects/awesomeworks/worktrees/website/awesomebot-search-visibility`; branch `docs/awesomebot-search-visibility` (base `origin/main` @ `c497b80`); URLs `https://awesomeworks.ai/awesomebot/`, `https://awesomeworks.ai/awesomebot/en/`, `https://awesomeworks.ai/robots.txt`, `https://awesomeworks.ai/sitemap-index.xml`, `https://awesomeworks.ai/sitemap-0.xml`
**Canonical output path:** `docs/search-visibility/awesomebot/04-seo-audit.md`
**Methodology:** `.github/copilot-instructions.md` + baseline audits (`docs/search-visibility/04-seo-audit.md`, `05-geo-audit.md`, `07-implementation-decisions.md`) + `docs/company-landing-guide/03-seo-and-metadata.md` + scoped repo files (`awesomebot-app/`, `.github/workflows/deploy.yml`, root `astro.config.mjs`) + rendered live HTML (`curl`) + public SEO surfaces

This audit covers the AwesomeBot sub-app only. The `docs/search-visibility/04-*.md` and `05-*.md` files are the main-site baseline and remain authoritative for `awesomeworks.ai/`, `/en/`, `/pl/`.

## Executive summary

- The single technical blocker is sitemap coverage: `/awesomebot/` and `/awesomebot/en/` are absent from `sitemap-0.xml`. The sitemap is generated only by the root site's `@astrojs/sitemap` build; the sub-app dist is merged afterwards in CI and ships no sitemap of its own. Discovery currently depends entirely on three portfolio-carousel links per locale on the parent homepage.
- Everything else at the crawl/canonical layer is healthy: self-referencing canonicals with trailing-slash normalization, a clean two-way PL/EN hreflang cluster, correct `301` hygiene for slashless and HTTP variants, and permissive `robots.txt`.
- Snippet surfaces have two gaps: no `og:image`/`twitter:image` at all, and a PL `<title>` at 79 characters that truncates in SERPs before the second audience segment is stated.
- The `<h1>` ships both industry-segment variants concatenated in raw HTML (`Rejestracja, któraBiuro zarządcy, które odbiera zawszeodbiera zawsze.`) and contains no product or category term. Rendering crawlers see only the medical variant (CSS hides the other), but raw-text extraction is garbled and the page's strongest heading carries no search intent.
- Structured data is honest but underpowered: `SoftwareApplication` has no stable `@id` (each locale declares a separate product entity) and no offer data despite fully visible three-tier pricing; the visible FAQ has no `FAQPage` JSON-LD.
- Content architecture serves two distinct intents (medical clinics, property managers) from one URL via a CSS toggle. Acceptable for launch; a limit on segment-query visibility as the product matures.

## Strengths already present

- `robots.txt` allows all crawling and declares the sitemap index; live `/awesomebot/` and `/awesomebot/en/` return `200` with full server-rendered copy (~63 KB HTML, 1 `h1`, 10 `h2`, 17 `h3`).
- Canonicals self-reference with a normalized trailing slash (`awesomebot-app/src/layouts/BaseLayout.astro` appends `/` so canonical matches hreflang URLs); `?segment=` query variants canonicalize to the clean URL because the canonical is built from the pathname only.
- hreflang cluster is clean and reciprocal on both pages: `pl` → `/awesomebot/`, `en` → `/awesomebot/en/`, `x-default` → `/awesomebot/` (deliberate: PL is the default locale and primary market per `awesomebot-app/src/i18n/ui.ts`).
- Redirect hygiene is correct on GitHub Pages: `/awesomebot` → `301` → `/awesomebot/`, `/awesomebot/en` → `301` → `/awesomebot/en/`, `http://` → `301` → `https://` with HSTS.
- `html lang`, `og:locale`, and JSON-LD `inLanguage` are all locale-correct; titles and descriptions are unique per locale; descriptions are within limits (PL 155, EN 148 chars).
- The `Organization` JSON-LD node reuses the parent site's entity `@id` (`https://awesomeworks.ai/#organization`), keeping one org entity across the domain, with legal name, email, and Warsaw address matching the visible footer (`Awesome Works AI · NIP: 5223202536 · Warszawa`).
- No fake schema anywhere: no invented reviews, ratings, FAQs, or authorship.
- Internal linking from the parent works both ways: live `/en/` and `/pl/` homepages each contain three links to the corresponding AwesomeBot locale (portfolio carousel, PR #49, deployed); the sub-app footer links back to `https://awesomeworks.ai`.
- Page-experience baseline is strong: zero `<img>` tags (the hero is a CSS orb), one stylesheet (55.9 KB), three small scripts, self-hosted Inter Variable with `font-display: swap` — no third-party font or tracker requests.
- The segment toggle is search-safe, not cloaking: both segment copy variants live in the served DOM and are switched by `html[data-segment]` CSS; the no-JS fallback deterministically shows the medical variant.

## Findings by category

### 1. Crawl / index / canonical / hreflang
- Evidence:
  - Live `sitemap-index.xml` references only `sitemap-0.xml`; `sitemap-0.xml` contains exactly two URLs: `https://awesomeworks.ai/en/` and `https://awesomeworks.ai/pl/`. No `awesomebot` URL appears.
  - Root `astro.config.mjs` runs `@astrojs/sitemap` over the root site's pages only. `.github/workflows/deploy.yml` builds `awesomebot-app` separately and copies its dist into `dist/awesomebot/` after the root build, so the sub-app's pages can never enter the generated sitemap. `awesomebot-app/astro.config.mjs` has no sitemap integration.
  - `robots.txt` allows all user agents and declares `Sitemap: https://awesomeworks.ai/sitemap-index.xml`.
  - Canonicals: `/awesomebot/` self-canonicalizes to `https://awesomeworks.ai/awesomebot/`; `/awesomebot/en/` to `https://awesomeworks.ai/awesomebot/en/`. `/awesomebot/index.html` returns `200` but carries the clean canonical.
  - hreflang on both pages: `pl` + `en` + `x-default` = PL URL. This diverges from the main site's convention (x-default = EN per `docs/company-landing-guide/03-seo-and-metadata.md`) but is deliberate for a Poland-first product and is internally consistent.
  - No `noindex` anywhere; slashless and HTTP variants `301` correctly.
- Risk:
  - Without sitemap coverage, indexing of two brand-new URLs depends solely on the parent homepage carousel links. Discovery is likely but slower and less observable; Search Console gets no sitemap-level signal for the sub-app.
  - The x-default divergence is an accepted-state decision, not a defect — but it should stay documented so a future "consistency cleanup" does not flip it accidentally.
- Affected URLs:
  - `https://awesomeworks.ai/awesomebot/`
  - `https://awesomeworks.ai/awesomebot/en/`
  - `https://awesomeworks.ai/sitemap-index.xml`
  - `https://awesomeworks.ai/sitemap-0.xml`

### 2. Metadata and snippet quality
- Evidence:
  - PL title (79 chars): `AwesomeBot — AI recepcja 24/7 dla placówek medycznych i zarządców nieruchomości`. EN title (65 chars): `AwesomeBot — 24/7 AI front desk for clinics and property managers`. SERP display cuts at roughly 55–60 characters, so the PL title truncates around "placówek medycznych…" — the property-manager segment never renders in the snippet title.
  - Descriptions are strong: benefit-led, within length limits, and match visible copy (24/7 answering, triage, human approval).
  - Open Graph carries title, description, type, url, site_name, and locale — but there is **no `og:image`** and **no `twitter:image`**; `twitter:card` is `summary` (`awesomebot-app/src/layouts/BaseLayout.astro`). `awesomebot-app/public/` contains only `favicon.svg`.
  - `docs/company-landing-guide/03-seo-and-metadata.md` sets the domain standard: 1200×630 OG image, `summary_large_image`.
- Risk:
  - Shares on LinkedIn/X/Slack/Messenger render as bare-text cards, weakening the highest-probability early acquisition channel for a new product page.
  - PL title truncation hides half of the audience targeting from the snippet; Google may also rewrite over-long titles unpredictably.
- Affected URLs:
  - `https://awesomeworks.ai/awesomebot/`
  - `https://awesomeworks.ai/awesomebot/en/`

### 3. Structured data coverage
- Evidence:
  - `awesomebot-app/src/layouts/BaseLayout.astro` emits an `@graph` with `Organization` (stable `@id`, consistent with parent) and `SoftwareApplication` (name, `applicationCategory: BusinessApplication`, `operatingSystem: Web`, `url` = per-locale canonical, `inLanguage`, description, `provider` → org `@id`).
  - `SoftwareApplication` has **no `@id`**, and its `url` differs per locale, so PL and EN pages declare what parsers may treat as two separate product entities.
  - The pricing section visibly renders three plans (499 zł / 1499 zł / od 2499 zł per month), but the schema carries no offer data. Google's `SoftwareApplication` rich-result eligibility requires `offers` or `aggregateRating`.
  - The FAQ section visibly renders 7 Q/A pairs (with med/est variants for Q1 and Q6, both present in the DOM), but no `FAQPage` JSON-LD is emitted.
  - Nothing in the schema invents invisible facts — current coverage is safe, just incomplete.
- Risk:
  - Split product entity weakens cross-locale consolidation of the AwesomeBot entity.
  - Missing offers forgoes rich-result eligibility that visible content already supports.
  - FAQ coverage is a small, fully supported win left unused (note: FAQ rich results are restricted to well-known authoritative sites since 2023, so treat this as machine-understanding hygiene, not a SERP-feature play).
- Affected URLs:
  - `https://awesomeworks.ai/awesomebot/`
  - `https://awesomeworks.ai/awesomebot/en/`

### 4. Internal linking and discoverability
- Evidence:
  - Live parent homepages link to the sub-app: `/en/` contains 3× `href="/awesomebot/en/"`, `/pl/` contains 3× `href="/awesomebot/"` (portfolio carousel card).
  - Sub-app internal href inventory: 6 hash anchors (`#problem`, `#produkt`, `#jak-dziala`, `#dla-kogo`, `#cennik`, `#faq`) + `#umow-rozmowe`, the PL/EN locale switch pair, two footer links to `https://awesomeworks.ai`, Calendly, and `mailto:` links.
  - There are no same-domain deep routes under `/awesomebot/` — it is a single page per locale by design.
- Risk:
  - The crawl graph is intentionally shallow; fine for a landing, but every future content asset (segment pages, FAQ permalinks, case studies) currently has no internal-link scaffold to plug into.
  - Combined with the sitemap gap (finding 1), the parent carousel is a single point of discovery.
- Affected URLs:
  - `https://awesomeworks.ai/awesomebot/`
  - `https://awesomeworks.ai/awesomebot/en/`

### 5. Content depth and intent coverage
- Evidence:
  - Raw `<h1>` text on the PL page extracts as `Rejestracja, któraBiuro zarządcy, które odbiera zawszeodbiera zawsze.` and on EN as `The front desk thatThe property desk that always picks upalways picks up.` — both segment variants are inline inside one `h1` with no separating whitespace (`awesomebot-app/src/components/Hero.astro`, `.seg-med`/`.seg-est` spans hidden via `display:none` in `awesomebot-app/src/styles/global.css`).
  - After CSS rendering, the visible H1 is coherent (`Rejestracja, która odbiera zawsze.`) — but it contains no product name and no category term (no "AI", no "recepcja AI", no "front desk AI").
  - The page serves two distinct search intents from one URL: medical front desk ("AI recepcja dla przychodni") and property management ("obsługa zgłoszeń dla zarządcy nieruchomości"), toggled client-side. All copy for both segments is server-rendered, which is the right call against cloaking, but the inactive segment's copy is CSS-hidden and correspondingly devalued.
  - Copy depth is otherwise substantial and people-first: problem framing, four product pillars, four-step process, per-segment use cases, trust/control section, transparent pricing, 7-question FAQ.
- Risk:
  - Non-rendering parsers and text extractors read a garbled H1 — the single strongest on-page heading.
  - Category queries in either segment resolve against a page whose title/H1 must split relevance between two verticals; as segment marketing matures, one URL will cap per-segment rankings.
- Affected URLs:
  - `https://awesomeworks.ai/awesomebot/`
  - `https://awesomeworks.ai/awesomebot/en/`

### 6. E-E-A-T signals
- Evidence:
  - Visible legal identity in the footer: `Awesome Works AI · NIP: 5223202536 · Warszawa`, contact email, and two links to the parent brand site.
  - `Organization` JSON-LD mirrors those facts and shares the parent entity `@id` — good entity continuity between the product page and the company site.
  - There is no privacy policy, terms, or data-handling page linked anywhere on the sub-app, and the parent homepage exposes no legal route either (per the baseline audit).
  - The hero phone-demo form is currently front-end only (no data leaves the page, per `Hero.astro` comments) — so no live data-collection gap today.
  - Trust claims on-page (human approval, audit trail, undo) are product-capability claims, not fabricated social proof. No fake testimonials or logos.
- Risk:
  - For a product sold into medical clinics, an absent privacy/legal surface is a trust-path gap for both users and quality raters.
  - The moment the phone-demo form starts collecting real phone numbers, a privacy notice stops being an SEO nicety and becomes a legal prerequisite (GDPR) — sequence the page before wiring the backend.
- Affected URLs:
  - `https://awesomeworks.ai/awesomebot/`
  - `https://awesomeworks.ai/awesomebot/en/`

### 7. Page experience dependencies
- Evidence:
  - Zero `<img>` elements — hero visual is CSS; no image CLS/LCP risk. Likely LCP element is the H1 text block.
  - One stylesheet (55.9 KB), three scripts: an inline pre-paint segment initializer (prevents skin-flash and CLS on segment restore), the toggle module, and the demo-form module. No third-party requests.
  - Inter Variable is self-hosted with `font-display: swap`; the latin subset woff2 is not preloaded, so a brief FOUT on first visit is possible.
  - HTTPS + HSTS via GitHub Pages; `compressHTML` off in the sub-app config (root site has it on) — HTML is 63 KB uncompressed, trivial after gzip.
  - No CrUX/field data exists yet for these URLs (new sub-path) — outcome severity is a measurement gap, not a finding.
- Risk:
  - Minimal. Font preload and decorative-animation costs are the only tuning levers, and neither is a ranking blocker.
- Affected URLs:
  - `https://awesomeworks.ai/awesomebot/`
  - `https://awesomeworks.ai/awesomebot/en/`

## Prioritized recommendation matrix

| ID | Priority | Effort | Recommendation | Why it matters | Exact file targets | Immediate validation | Delayed outcome measurement |
|---|---|---|---|---|---|---|---|
| SEO-01 | P0 | S | Add `https://awesomeworks.ai/awesomebot/` and `https://awesomeworks.ai/awesomebot/en/` to the domain sitemap. Simplest path: `customPages` in the root site's sitemap integration (also fixes the same gap for `/metyra/` and `/ask/` if desired). Alternative: give `awesomebot-app` its own `@astrojs/sitemap` and add a second `Sitemap:` line to `public/robots.txt`. | The sub-app has zero sitemap coverage; discovery of two new URLs rests entirely on three homepage carousel links, and Search Console gets no sitemap signal. | `astro.config.mjs` (root, `customPages`), alternatively `awesomebot-app/astro.config.mjs` + `public/robots.txt` | After deploy: `curl https://awesomeworks.ai/sitemap-0.xml` lists both URLs (or the new sub-app sitemap resolves `200` and is declared in `robots.txt`); sitemap index still valid XML. | GSC: submit sitemap, watch both URLs move to "Indexed" in page indexing; URL Inspection confirms sitemap-listed status. |
| SEO-02 | P1 | M | Ship an OG image (1200×630, per the domain guide) and upgrade the card: `og:image` with absolute URL, `og:image:width/height`, `twitter:card` → `summary_large_image`, `twitter:image`. Per-locale variants optional. | Every social/dark-social share currently renders a bare text card; this is the highest-probability early traffic channel for a new product landing. | `awesomebot-app/public/og-image.png` (new asset), `awesomebot-app/src/layouts/BaseLayout.astro` | View source on both URLs shows absolute `og:image` returning `200`; LinkedIn Post Inspector / X card validator render the image. | Referral CTR from social channels; impressions on shared-link surfaces. |
| SEO-03 | P1 | M | Rework the H1 so each locale ships one stable, readable heading that names the category (e.g. product + "AI recepcja 24/7" / "24/7 AI front desk"), and move the med/est phrasing swap out of the `h1` (or restructure so raw text extraction stays grammatical). Copy direction needs Rafał's sign-off — treat like Decision C in `07-implementation-decisions.md`. | Raw H1 text is currently a garbled concatenation of both segment variants, and the strongest on-page heading carries zero search intent. | `awesomebot-app/src/components/Hero.astro`, `awesomebot-app/src/i18n/ui.ts` | `curl` + text extraction of both URLs yields one grammatical H1 containing the category term; segment toggle still switches visible phrasing without layout breakage. | GSC: query mix — watch non-brand category queries ("ai recepcja", "ai front desk") begin generating impressions for the sub-app URLs. |
| SEO-04 | P1 | S | Strengthen `SoftwareApplication`: add a stable `@id` (e.g. `https://awesomeworks.ai/awesomebot/#software`) shared by both locales, and add `offers` as an `AggregateOffer` (`lowPrice: 499`, `highPrice: 2499`, `priceCurrency: PLN`) mirroring the visible pricing section only. | One consolidated product entity across locales; `offers` unlocks the rich-result eligibility that `SoftwareApplication` requires (offers or rating) — using only facts already on-page. | `awesomebot-app/src/layouts/BaseLayout.astro` | Rich Results Test passes on both URLs; every schema price value matches the visible pricing cards exactly. | GSC search appearance reports; SERP snippet appearance for product queries over time. |
| SEO-05 | P2 | S | Emit `FAQPage` JSON-LD built from the visible FAQ strings (use the always-visible questions plus the default-segment variants; answers must match DOM copy verbatim). | Supported structured-data coverage for content already on-page; helps machine understanding. FAQ rich results are restricted post-2023, so expect comprehension value, not SERP features. | `awesomebot-app/src/layouts/BaseLayout.astro` (schema assembly), `awesomebot-app/src/i18n/ui.ts` (source strings) | Rich Results Test validates `FAQPage`; every `Question`/`Answer` string is findable in the rendered DOM. | None promised — monitor GSC enhancements report for informational value only. |
| SEO-06 | P2 | S | Shorten/front-load the PL title to ~55–60 chars so the value proposition survives truncation (e.g. lead with product + "AI recepcja 24/7", decide which audience label makes the cut); check the EN title (65 chars) with the same rule. | The PL snippet title currently truncates before the property-manager segment; over-long titles also invite SERP rewrites. | `awesomebot-app/src/i18n/ui.ts` (`meta.title` PL/EN) | Rendered `<title>` length ≤ ~60 chars; wording still matches on-page positioning. | GSC: CTR trend for the PL URL's impressions after recrawl. |
| SEO-07 | P2 | S | When the main site ships its approved `Organization.sameAs` fix (per `07-implementation-decisions.md`), mirror the same `sameAs` array in the sub-app's Organization node — keeping the shared `@id` — so both surfaces describe one identical org entity. | Entity consistency across the domain; the sub-app currently carries a thinner copy of the org node than the parent's approved target state. | `awesomebot-app/src/layouts/BaseLayout.astro` | JSON-LD on both awesomebot URLs shows the same `@id` and `sameAs` values as the parent homepage org node. | Branded-search / knowledge-panel consistency checks over time. |
| SEO-08 | P2 | L | Plan dedicated per-segment routes (e.g. `/awesomebot/medyczna/` + `/awesomebot/nieruchomosci/` with EN equivalents) once segment marketing matures: full-page variants with their own titles, H1s, canonicals, hreflang, and internal links from the toggle/nav/footer. This is a content-architecture decision, not a quick fix. | One URL cannot fully rank for two distinct verticals; hidden-variant copy is devalued. Dedicated URLs give each intent an indexable target and a place for segment-specific proof. | New files under `awesomebot-app/src/pages/` (+ `en/`), `awesomebot-app/src/components/Nav.astro`, `awesomebot-app/src/components/Footer.astro`, `awesomebot-app/src/components/SegmentToggle.astro`, `astro.config.mjs` (root, sitemap `customPages`) | New routes return `200`, self-canonicalize, appear in the sitemap and in crawlable internal links; no duplicate-content overlap with the hub page's canonical strategy. | GSC: per-route impressions and rankings on segment queries ("ai recepcja przychodnia", "zgłoszenia zarządca nieruchomości") over subsequent months. |
| SEO-09 | P2 | M | Add a crawlable privacy/legal surface before the phone-demo form starts collecting real numbers: either a privacy page in the sub-app or a footer link to a parent-domain legal page (coordinate with the main site, which also lacks one). | Trust-path gap for a medical-adjacent product; becomes a GDPR prerequisite the moment the demo form goes live with a backend. | `awesomebot-app/src/components/Footer.astro`, new page under `awesomebot-app/src/pages/` or parent-repo equivalent (`src/pages/…` — coordinate with main-site owners) | Footer on both locales renders a crawlable legal link resolving `200`; page content matches actual data practices. | Qualitative: trust-driven conversion signals; compliance readiness review before demo-form backend launch. |

## Validation checklist

- **Rendered HTML:**
  - `curl` both URLs after each change; confirm titles, descriptions, OG/Twitter tags, and the reworked H1 render server-side (no JS-injected metadata).
  - Confirm both segment variants remain in the served DOM (no cloaking regressions) and the no-JS default still resolves to a coherent page.
- **Canonical / hreflang:**
  - `/awesomebot/` and `/awesomebot/en/` self-canonicalize with trailing slash.
  - hreflang stays reciprocal: `pl` ↔ `en` + `x-default` → PL on both pages; `?segment=` URLs keep canonicalizing to the clean path.
  - Slashless variants keep returning `301` to the slashed URL.
- **Robots / sitemap:**
  - `https://awesomeworks.ai/robots.txt` still allows crawling and declares every sitemap in play.
  - `https://awesomeworks.ai/sitemap-index.xml` + `sitemap-0.xml` (or the new sub-app sitemap) list both awesomebot URLs exactly once, with `200` responses.
- **Rich Results Test:**
  - Validate `Organization` + `SoftwareApplication` (with `@id` and `AggregateOffer`) on both URLs; prices must match visible pricing cards.
  - Validate `FAQPage` only if/when SEO-05 ships; Q/A text must match DOM copy verbatim.
- **URL Inspection / equivalent:**
  - Inspect `/awesomebot/` and `/awesomebot/en/` in Search Console after the sitemap fix deploys; confirm "Sitemaps: listed" and eventual "Indexed" status.
  - Re-inspect after SEO-02/SEO-03 deploys to confirm Google renders the updated head and H1.
