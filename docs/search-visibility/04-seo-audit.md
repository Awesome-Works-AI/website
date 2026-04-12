# SEO Audit — website — 2026-04-12

**Scope:** repo `website`; worktree `/home/deploy/repos/worktrees/website/search-visibility-baseline-audit`; branch `feature/search-visibility-baseline-audit`; URLs `https://awesomeworks.ai/`, `https://awesomeworks.ai/en/`, `https://awesomeworks.ai/pl/`, `https://awesomeworks.ai/robots.txt`, `https://awesomeworks.ai/sitemap-index.xml`, `https://awesomeworks.ai/sitemap-0.xml`
**Canonical output path:** `docs/search-visibility/04-seo-audit.md`
**Methodology:** `.github/copilot-instructions.md` + repo docs + scoped repo files + rendered HTML + public SEO surfaces

## Executive summary
- The main technical blocker is English URL duplication: `/` and `/en/` both resolve as indexable English homepages, use different canonicals, and both appear in the sitemap alternates. This can split signals and weakens hreflang clarity.
- Crawlability is otherwise healthy: `robots.txt` allows crawling, the sitemap is exposed, pages render full HTML content, and localized pages include canonical plus alternate links.
- Metadata and content intent are internally inconsistent. Repo docs still describe an AI automation/company landing, while the live surface is a founder-led delivery page focused on workflow, handoffs, and software delivery.
- Structured data is conservative and mostly aligned with visible content, but the visible FAQ section is not exposed as FAQ schema on the audited pages.
- Discoverability is shallow. The live homepage link graph is mostly section anchors plus external product links, with little same-domain crawlable depth from the audited pages.

## Strengths already present
- `public/robots.txt` and the live `robots.txt` both allow crawling and declare `https://awesomeworks.ai/sitemap-index.xml`.
- `astro.config.mjs` is configured with `site`, i18n locales, and sitemap generation; the live site exposes both `sitemap-index.xml` and `sitemap-0.xml`.
- `src/layouts/base.astro` outputs canonical, localized alternate links, Open Graph/Twitter metadata, and `Organization` JSON-LD on the audited pages.
- The live HTML contains substantial server-rendered copy, a single visible `h1`, localized page variants, and a visible founder story that supports real-world experience claims.
- The current schema does not appear to invent reviews, FAQs, authorship, or other unsupported claims.

## Findings by category

### 1. Crawl / index / canonical / hreflang
- **Evidence:**
  - `docs/company-landing-guide/03-seo-and-metadata.md` specifies `Root / → 302 redirect do /en/`.
  - `astro.config.mjs` sets `prefixDefaultLocale: true` and `redirectToDefaultLocale: false`.
  - `src/pages/index.astro` and `src/pages/en/index.astro` both render the English homepage.
  - Live `https://awesomeworks.ai/` returns `200`, renders English HTML, and self-canonicalizes to `https://awesomeworks.ai/`.
  - Live `https://awesomeworks.ai/en/` returns `200`, renders the same English page shape, and self-canonicalizes to `https://awesomeworks.ai/en/`.
  - Live `sitemap-0.xml` includes both `/` and `/en/`, and for each URL outputs two `hreflang="en"` alternates: one for `/` and one for `/en/`.
- **Risk:**
  - Duplicate English entry points can split indexing, linking, and canonical signals.
  - Hreflang clusters are less clear because one language has two competing URLs.
- **Affected URLs:**
  - `https://awesomeworks.ai/`
  - `https://awesomeworks.ai/en/`
  - `https://awesomeworks.ai/pl/`
  - `https://awesomeworks.ai/sitemap-0.xml`

### 2. Metadata and snippet quality
- **Evidence:**
  - `docs/content.md` defines homepage SEO around “AI Automation for Business” and business outcome language.
  - Live EN title is `Rafał Łazicki — workflow, handoffs, and software delivery`; live PL title is `Rafał Łazicki — workflow, handoffy i software delivery`.
  - Live EN `h1` is `Shorten the path from decision to deployment.` and live PL `h1` is `Skróć drogę od decyzji do wdrożenia.`
  - The title and description communicate a founder/service profile, but do not surface the older repo-documented “AI automation for business” angle or a crisp audience label in the snippet itself.
- **Risk:**
  - Snippets are readable but can underperform on non-brand queries because the promise, audience, and offer category are not explicit enough.
  - Repo doc drift makes future metadata changes harder to validate against a stable intent.
- **Affected URLs:**
  - `https://awesomeworks.ai/`
  - `https://awesomeworks.ai/en/`
  - `https://awesomeworks.ai/pl/`

### 3. Structured data coverage
- **Evidence:**
  - `src/layouts/base.astro` only emits `FAQPage` JSON-LD when `includeFaqSchema` is true.
  - `src/pages/index.astro`, `src/pages/en/index.astro`, and `src/pages/pl/index.astro` do not pass `includeFaqSchema`.
  - Live `/`, `/en/`, and `/pl/` contain visible FAQ sections, but the live HTML does not contain `FAQPage` JSON-LD.
  - The existing `Organization` JSON-LD is broadly aligned with visible content and avoids fake review/FAQ claims.
- **Risk:**
  - The pages miss supported structured data coverage for content already visible on-page.
  - This is not an indexing blocker, but it leaves valid structured signals unused.
- **Affected URLs:**
  - `https://awesomeworks.ai/`
  - `https://awesomeworks.ai/en/`
  - `https://awesomeworks.ai/pl/`

### 4. Internal linking and discoverability
- **Evidence:**
  - Live internal href inventory on `/` and `/en/` is limited to `#work`, `#process`, `#faq`, `#socials`, `#story`, `#contact`, and the locale switch to `/pl/`; `/pl/` mirrors the same pattern.
  - Product proof links go outward to subdomains and other hosts rather than to same-domain crawlable routes.
  - `src/data/personal-home.ts` already contains story route values such as `/en/story` and `/pl/story`, but the audited homepages do not expose same-domain crawlable deep links in the live href inventory.
- **Risk:**
  - Search crawlers get a shallow same-domain graph from the homepage.
  - Deep intent pages, if they exist or are planned, receive less internal discovery support than they should.
- **Affected URLs:**
  - `https://awesomeworks.ai/`
  - `https://awesomeworks.ai/en/`
  - `https://awesomeworks.ai/pl/`

### 5. Content depth and intent coverage
- **Evidence:**
  - `docs/content.md` describes a different homepage angle than the live site.
  - The live homepage is rich in founder story and delivery philosophy, but the search intent coverage for explicit service categories remains broad rather than segmented.
  - The strongest business-offer proof currently sits in product cards and story sections rather than in a clearer homepage search-intent structure.
- **Risk:**
  - The site can be understandable to humans while still being ambiguous to search engines about whether the primary intent is personal brand, software consultancy, AI implementation, or product studio.
  - Content expansion becomes harder because the repo lacks a single stable intent baseline.
- **Affected URLs:**
  - `https://awesomeworks.ai/`
  - `https://awesomeworks.ai/en/`
  - `https://awesomeworks.ai/pl/`
  - `docs/content.md`
  - `docs/company-landing-guide/03-seo-and-metadata.md`

### 6. E-E-A-T signals
- **Evidence:**
  - The live pages visibly show founder identity, experience narrative, education, and links to public social profiles.
  - `src/layouts/base.astro` outputs `Organization` JSON-LD, but does not include `sameAs` even though public social profiles are visible on-page and defined in `src/data/personal-home.ts`.
  - The live homepage link inventory does not expose a same-domain about/legal/contact route from the audited pages; this is a gap in trust-path discoverability, not proof that such routes do not exist elsewhere.
- **Risk:**
  - Entity consolidation is weaker than it needs to be.
  - Brand/trust signals exist, but they are not fully connected across schema and crawlable on-site paths.
- **Affected URLs:**
  - `https://awesomeworks.ai/`
  - `https://awesomeworks.ai/en/`
  - `https://awesomeworks.ai/pl/`

### 7. Page experience dependencies
- **Evidence:**
  - Live EN HTML is ~40.4 KB and PL HTML is ~40.6 KB before asset loading.
  - Live pages load one stylesheet and three inline scripts; no blocking technical rendering issue was observed in rendered HTML.
  - Live HTML shows 5 `<img>` tags on EN/PL pages; 4 of 5 are missing explicit `width` and `height`.
  - `src/components/products.astro` renders decorative product logos without intrinsic dimensions.
- **Risk:**
  - Missing intrinsic image dimensions can contribute to layout instability and weaker page-experience metrics.
  - No direct CWV dataset is available in the repo or the audited surfaces, so outcome severity beyond this dependency remains a measurement gap.
- **Affected URLs:**
  - `https://awesomeworks.ai/`
  - `https://awesomeworks.ai/en/`
  - `https://awesomeworks.ai/pl/`

## Prioritized recommendation matrix
| ID | Priority | Effort | Recommendation | Why it matters | Exact file targets | Immediate validation | Delayed outcome measurement |
|---|---|---|---|---|---|---|---|
| SEO-01 | P0 | M | Consolidate the English homepage to one canonical URL. Follow the repo SEO guide by making `/` a temporary redirect to `/en/`, or otherwise remove `/` as a separate indexable English variant and fix sitemap alternates accordingly. | Removes duplicate-English canonical competition and makes hreflang clusters cleaner. | `astro.config.mjs`, `src/pages/index.astro`, `src/layouts/base.astro`, `public-surface/no-file` | `curl -I https://awesomeworks.ai/` shows the intended redirect behavior; `/en/` is the only English homepage in rendered HTML and sitemap alternates; no page keeps competing canonicals. | Google Search Console: compare indexed page set, duplicate/canonical reports, and branded/non-branded impression consolidation for `/` vs `/en/`. |
| SEO-02 | P1 | S | Rewrite localized `title`, `description`, and social description so the snippet states the chosen audience and offer more explicitly, while staying aligned with visible copy. | Improves snippet clarity for non-brand discovery and reduces ambiguity between founder page vs service landing intent. | `src/data/personal-home.ts` | Inspect rendered `<title>`, `<meta name="description">`, `og:description`, and `twitter:description` on `/en/` and `/pl/`; verify copy matches visible page positioning. | Search Console: monitor CTR and query mix for homepage impressions after recrawl. |
| SEO-03 | P1 | S | Enable FAQ schema only for pages that visibly render the FAQ section. | Adds valid structured data coverage without inventing unsupported content. | `src/pages/index.astro`, `src/pages/en/index.astro`, `src/pages/pl/index.astro`, `src/layouts/base.astro` | View source or Rich Results Test confirms `FAQPage` JSON-LD on the pages that show the FAQ; questions and answers match visible copy exactly. | Search Console rich result reporting and FAQ-rich-result eligibility over time. |
| SEO-04 | P1 | M | Add same-domain crawlable links from the homepage to owned deeper routes already implied by the content model (for example story/about or other owned detail pages), instead of relying almost entirely on hash anchors and external destinations. | Gives crawlers a stronger internal graph and helps distribute discovery beyond a single long page. | `src/data/personal-home.ts`, `src/components/hero.astro`, `src/components/closing.astro`, `src/components/nav.astro`, `src/components/story-content.astro` | Live href inventory on `/en/` and `/pl/` includes at least one same-domain non-hash route beyond the locale switch; links are crawlable in rendered HTML. | Search Console: monitor crawl/discovery of the linked routes and internal-link reports after recrawl. |
| SEO-05 | P1 | M | Reconcile repo SEO/content docs with the live homepage positioning, then tighten the homepage copy so the primary search intent is explicit and stable across docs and implementation. | Prevents ongoing intent drift and makes future SEO work auditable against one consistent baseline. | `docs/content.md`, `docs/company-landing-guide/03-seo-and-metadata.md`, `src/data/personal-home.ts` | Repo docs and live metadata/copy describe the same ICP, offer, and homepage role; no conflicting homepage SEO baseline remains in scoped docs. | Future content planning quality: track whether new pages, metadata, and internal links stay consistent with the chosen homepage intent. |
| SEO-06 | P1 | S | Add `sameAs` to the `Organization` JSON-LD using only social profiles already visible on the page. | Strengthens entity consistency without adding unverifiable claims. | `src/layouts/base.astro`, `src/data/personal-home.ts` | View source confirms `sameAs` entries match visible profile links on the audited pages. | Branded search and knowledge-panel/entity consistency checks over time. |
| SEO-07 | P2 | S | Add explicit `width` and `height` to decorative product/logo images that currently rely only on CSS sizing. | Reduces layout-shift risk and improves page-experience resilience. | `src/components/products.astro` | Rendered HTML shows intrinsic dimensions on the product/logo `<img>` elements; Lighthouse no longer flags those images for missing dimensions. | PageSpeed Insights / CrUX: monitor CLS trend after deployment. |

## Validation checklist
- **Rendered HTML:**
  - Confirm only the intended English homepage variant is indexable.
  - Confirm updated titles, descriptions, and on-page copy render in `/en/` and `/pl/`.
  - Confirm new same-domain internal links are present in raw HTML, not injected only after interaction.
- **Canonical / hreflang:**
  - Verify `/en/` and `/pl/` self-canonicalize.
  - Verify `/` follows the chosen consolidation pattern.
  - Verify alternate links form one clean EN/PL cluster without duplicate English targets.
- **Robots / sitemap:**
  - Recheck `https://awesomeworks.ai/robots.txt`.
  - Recheck `https://awesomeworks.ai/sitemap-index.xml` and `https://awesomeworks.ai/sitemap-0.xml` for the final canonical URL set and alternate links.
- **Rich Results Test:**
  - Validate `Organization` JSON-LD.
  - Validate `FAQPage` only on pages that visibly contain the FAQ.
- **URL Inspection / equivalent:**
  - Inspect `/en/` and `/pl/` after deployment.
  - If `/` is redirected, inspect `/` and verify Google sees the redirect target as intended.
