# GEO Audit — website (awesomeworks.ai) — 2026-04-12

**Scope:** repo `website`; worktree `/home/deploy/repos/worktrees/website/search-visibility-baseline-audit`; branch `feature/search-visibility-baseline-audit`; URLs `https://awesomeworks.ai/`, `https://awesomeworks.ai/en/`, `https://awesomeworks.ai/pl/`, `https://awesomeworks.ai/robots.txt`, `https://awesomeworks.ai/sitemap-index.xml`, `https://awesomeworks.ai/sitemap-0.xml`
**Canonical output path:** `docs/search-visibility/05-geo-audit.md`
**Methodology:** `.github/copilot-instructions.md` + `docs/search-visibility/04-seo-audit.md` + `docs/content.md` + `docs/company-landing-guide/03-seo-and-metadata.md` + scoped repo files + live rendered HTML (`curl`) + `robots.txt` + sitemap inspection

---

## Executive summary

- All crawlers — including AI training bots (GPTBot, Google-Extended, ClaudeBot) and AI retrieval/search bots (Claude-SearchBot, Claude-User, OAI-SearchBot, ChatGPT-User) — are allowed by an unrestricted `User-agent: *` rule. There are no per-bot training opt-outs. This is not a blocker but is an undocumented business decision.
- The most significant GEO gap is missing entity schema: `Organization` JSON-LD has no `sameAs` despite four social profiles being visible on-page, and there is no `Person` schema for Rafał Łazicki despite him being the primary named entity on the site. AI answer engines cannot confidently link the founder's name to the domain without that corroboration.
- `FAQPage` JSON-LD is absent on all three audited pages even though the `Questions` component renders a visible FAQ section on each. The FAQ copy is already Q&A-structured and quote-ready; the schema hook exists in `base.astro` (`includeFaqSchema` prop) but is never activated.
- The dual-English URL problem (`/` and `/en/` each returning 200 with different canonicals) carries over into sitemap hreflang clusters, where both pages emit two `hreflang="en"` alternates. This is the top SEO issue from `04-seo-audit.md` and is equally a GEO issue: retrieval crawlers may index the same English content twice under different URLs, fragment entity signals, and reduce citation consistency.
- The live page is text-rich, fully server-rendered, and crawlable. The founder story, bottleneck descriptions, and FAQ Q&A pairs are strong raw material for citation. The gap is not content depth but structured extractability and entity disambiguation.

---

## Strengths already present

- `public/robots.txt` is minimal and permissive: `User-agent: * / Allow: /`. All AI retrieval bots can reach all pages. No accidental blocks.
- `sitemap-index.xml` is declared in `robots.txt` and exposes three pages (`/`, `/en/`, `/pl/`). Sitemap is reachable.
- `src/layouts/base.astro` emits server-rendered `Organization` JSON-LD on every page. Schema is aligned with visible content (no invented reviews, ratings, or FAQs).
- Pages render full HTML server-side (Astro static output). Content is present in the raw response body — not dependent on JavaScript execution for crawlability.
- All three pages have correct `<link rel="canonical">` self-references and well-formed `hreflang` pairs (EN ↔ PL + x-default to `/en/`), modulo the `/` duplicate issue.
- The founder photo (`/rafal.jpeg`) has explicit `width="720" height="900"` and `alt="Rafał Łazicki"`. The most important named entity image has intrinsic dimensions and alt text.
- FAQ copy (6 Q&A pairs per locale, visible in `src/data/personal-home.ts` lines 204–237 and 482–515) is already answer-formatted and factually specific. It is the single strongest citation-ready block on the site.
- Founder story section contains attributable, verifiable claims: WAT (Warsaw Military University of Technology), Data Science degree, backend engineering, DevOps, RAG systems, agentic systems — all checkable off-site.
- Social profiles (`github.com/Raff-dev`, `x.com/awesomeworksai`, `linkedin.com/in/rlazicki`, `instagram.com/awesomeworksai`) are visible on-page and canonically defined in `src/data/personal-home.ts` (top of file). These are off-site corroboration surfaces already in existence.

---

## Findings by category

### 1. AI crawler access and control map

Basis: live `https://awesomeworks.ai/robots.txt` fetched 2026-04-12; no `X-Robots-Tag` headers detected in live HTTP responses; no `<meta name="robots">` tags in rendered HTML.

| Surface / bot | Role | Current state | Risk / implication |
|---|---|---|---|
| Google (Googlebot) | Search index prerequisite for Google AI features | Allowed; pages indexed (HTTP 200, no noindex, sitemap present) | None — access is correct |
| Google AI features (SGE/AI Overviews) | Grounded answer surface; uses indexed + snippet-eligible pages | Allowed by default via Googlebot access | Snippet eligibility is intact; no `nosnippet` or `data-nosnippet` detected |
| Google-Extended | **Training control** — opt-out available | **Not opted out** — `User-agent: Google-Extended` rule absent from `robots.txt` | Business decision; content may be used in Google training corpora. No functional impact on search or answer inclusion. Should be documented as an explicit choice. |
| GPTBot | **Training control** — opt-out available | **Not opted out** — no `User-agent: GPTBot` rule | Same as above for OpenAI training. Content may appear in future model training data. |
| ClaudeBot | **Training / general crawl** (Anthropic's general-purpose bot) | **Not opted out** | Content reachable for Anthropic training pipelines. |
| OAI-SearchBot | **Search / retrieval** — powers ChatGPT search and Bing AI | Allowed (no disallow rule) | Correct for answer inclusion in ChatGPT search. Pages are indexable. |
| ChatGPT-User | **User-triggered retrieval** — fetch on user prompt | Allowed | Correct. Pages will be fetched when a user asks ChatGPT to look up the site. |
| Claude-SearchBot | **Search / retrieval** — powers Claude's web search feature | Allowed | Correct for answer inclusion in Claude. |
| Claude-User | **User-triggered retrieval** | Allowed | Correct. Pages will be fetched when a user asks Claude to access the site. |
| Perplexity (PerplexityBot) | **Search / retrieval** — powers Perplexity AI answers | Allowed (wildcard rule covers it) | Correct for Perplexity answer inclusion. |

**Summary of training vs retrieval distinction:**  
Training controls (Google-Extended, GPTBot, ClaudeBot) are all opted-in by default (no disallow). This is not an error — it is the current default — but it has not been documented as an intentional decision. Retrieval/search controls for all major AI search surfaces are correctly open.

**No corrective action required for retrieval access.** The training opt-out question is a product/legal decision, not a GEO blocker.

---

### 2. Entity clarity findings

**Entity 1 — Person: Rafał Łazicki**
- The site is structurally a personal brand page for a named founder. "Rafał Łazicki" appears in the page `<title>`, the `<h1>` area (eyebrow), the founder photo `alt` attribute, story section headings, and product attribution.
- **Gap:** No `Person` JSON-LD schema. An AI answer engine asked "Who is Rafał Łazicki?" has no machine-readable entity block to parse. It must infer identity, role, and credentials from prose — which is possible but less reliable than structured data.
- The story section provides: degree (Data Science, WAT Warsaw), career arc (backend → DevOps → RAG → agentic systems), pivot point (2022, GPT-3.5), and current focus (delivery systems, agentic harnesses). This is extractable but not schema-anchored.
- `src/data/personal-home.ts` defines `linkedinUrl = "https://linkedin.com/in/rlazicki"` and `githubUrl = "https://github.com/Raff-dev"`. These are the two strongest corroboration URLs for a `Person` schema `sameAs` array.

**Entity 2 — Organization: AwesomeWorks**
- `Organization` JSON-LD is present and accurate: `name: "AwesomeWorks"`, `url: "https://awesomeworks.ai/"`, `foundingDate: "2021"`, `addressLocality: "Warsaw"`, `email: "hello@awesomeworks.ai"`.
- **Gap:** `sameAs` array is absent from the emitted JSON-LD (the `organizationJsonLd` object in `src/layouts/base.astro` has no `sameAs` field). The guide `docs/company-landing-guide/03-seo-and-metadata.md` shows the pattern with example social URLs, but it was not wired up.
- Four social profile URLs are already defined in `src/data/personal-home.ts` and are visible on-page: GitHub, X (`x.com/awesomeworksai`), LinkedIn (`linkedin.com/in/rlazicki`), Instagram (`instagram.com/awesomeworksai`). These could be passed into the Organization `sameAs` immediately without inventing new claims.
- **Dual-entity ambiguity:** The page is titled with the person's name ("Rafał Łazicki — workflow, handoffs…") but the schema declares an `Organization` named "AwesomeWorks". An AI engine asked about either entity may receive inconsistent attribution — the page HTML signals "person" while the schema signals "organization". Adding a `Person` schema that `memberOf` the `Organization` would resolve this.

---

### 3. Extractability findings

**What works:**
- The page is fully server-rendered. All copy (H1, bottleneck items, product cards, FAQ Q&A, founder story) is present in the raw HTML response with no JS gating.
- H1 (`"Shorten the path from decision to deployment."` / `"Skróć drogę od decyzji do wdrożenia."`) is a clean, attributable one-line claim.
- FAQ section: 6 Q&A pairs per locale, rendered as `<details>`/`<summary>` elements with visible text. The Q&A format maps directly to `FAQPage`/`Question`/`Answer` schema.
- Product section: Each product has a `<h3>` name, label, and short description. CallWise has two bullet-point capability statements.

**Gaps:**
- `FAQPage` schema: `base.astro` has the `faqJsonLd` construction and the `includeFaqSchema` prop, but `src/pages/index.astro`, `src/pages/en/index.astro`, and `src/pages/pl/index.astro` all omit `includeFaqSchema` (it defaults to `false`). The FAQ is visible and machine-parseable in HTML but not structured as JSON-LD. This is the single fastest win in this audit.
- Product descriptions in `src/data/personal-home.ts` are short (1–2 bullets for CallWise; 1 sentence for others). They are extractable but too brief to serve as standalone answer blocks. The `note: "B2B · zamknięty dostęp"` (closed access) label for CallWise is honest but limits citation value.
- No definition block: the page has no single clearly demarcated paragraph that opens with `"AwesomeWorks is…"` or `"Rafał Łazicki is…"` before branching into narrative. AI engines often prefer explicit first-sentence definitions. This is a hypothesis (not a proven engine requirement) based on observed citation patterns.
- The bottleneck section is formatted as card-style items with labels and short copy, not as numbered lists or definition blocks. It is extractable but the framing is more persuasive than definitional.

---

### 4. Citation readiness findings

**High citation readiness (already present):**
| Block | Location | Why it's citable |
|---|---|---|
| FAQ Q&A pairs (EN + PL) | `src/data/personal-home.ts` lines 482–515 / 204–237 | Already Q&A format; factually specific; unambiguous attribution |
| H1 headline | All three pages | Short, attributable, no hedging |
| Founder credentials | Story section (WAT, Data Science, backend, DevOps, AI pivot 2022) | Verifiable off-site claims |
| Product names + one-sentence descriptions | Products section | Name + brief proof is extractable |

**Low citation readiness (gaps):**
| Block | Gap |
|---|---|
| Hero subtitle / eyebrow | Colloquial ("delivery systems", "I remove bottlenecks in scoping…") — informative but imprecise as a citable definition |
| Bottleneck cards | Persuasive copy, not evidence-backed claims. No numbers, outcomes, or before/after data. |
| Closing CTA section | Marketing copy ("Show me where delivery is stuck today") — not citable |
| Social section title | `"See my socials here."` / `"Zobacz moje sociale tutaj."` — filler, not citable |
| Organization description (in JSON-LD) | Uses the page `description` meta: `"I help product teams shorten the path from decisions and scope to deployment."` — workable but phrased in first person, which is weaker for third-party citation |

**Missing proof types that would increase citation depth (hypothesis):**
- No outcome data (e.g., delivery time reduction, client count, project scale). The older `docs/content.md` contained "Save 20+ hours weekly" and "40% cost reduction" but these were removed in the live pivot. Their absence is intentional but reduces quote-ready evidence.
- No named client proof or testimonials on the live page.
- No publication or press appearances referenced on the page.

---

### 5. Structured data alignment with visible content

| Schema type | Expected (from visible content) | Actual (from live HTML JSON-LD) | Gap |
|---|---|---|---|
| `Organization` | AwesomeWorks, Warsaw, 2021, email, socials | Present — name, url, logo, description, foundingDate, address, contactPoint | **Missing `sameAs`** |
| `Person` | Rafał Łazicki, founder, Data Science / WAT, delivery systems | **Not present** | **Entire `Person` schema absent** |
| `FAQPage` | 6 Q&A pairs per locale, visible in all three pages | **Not present** (hook exists in `base.astro`, flag not passed by any page) | **Flag `includeFaqSchema` not set on any page** |
| `WebSite` | awesomeworks.ai | Not present | Optional; low priority |

All schema that is present is aligned with visible content. No false or unsupported claims detected. The gaps are omission, not fabrication.

---

### 6. Off-site dependency findings

| Off-site surface | Current state | GEO implication |
|---|---|---|
| LinkedIn `linkedin.com/in/rlazicki` | Exists, visible on-page, linked in `socials.astro` | Primary off-site corroboration for Rafał Łazicki as a Person entity. Absence of `sameAs` in schema means the link is not machine-declared. |
| GitHub `github.com/Raff-dev` | Exists, public, visible on-page | Technical credibility signal; contributes to real-world experience (E-E-A-T). Not machine-declared. |
| X `x.com/awesomeworksai` | Exists, linked on-page | Brand presence; low citation weight on its own |
| Instagram `instagram.com/awesomeworksai` | Exists, linked on-page | Weak citation surface; appropriate for social discovery only |
| Product subdomains (`callwise.awesomeworks.ai`, `course.awesomeworks.ai`, `ask.awesomeworks.ai`) | Exist (linked from products section with `target="_blank"`) | These are external to the audited pages' same-domain graph. If those pages have their own entity schemas, they could corroborate AwesomeWorks as an entity. Out of scope here. |
| Press / independent mentions | Not referenced anywhere on the live page | **Dependency:** AI answer confidence for competitive queries ("best AI delivery consultant Poland") depends on independent off-site citations. The on-site surface cannot substitute for this. Off-site presence is an unverified hypothesis — actual status requires external tooling (Ahrefs, Semrush, Moz). |

**Off-site gap statement:** The strongest GEO lever that cannot be addressed on-site is independent third-party mention — blog posts, interviews, case studies, community references, or press. Based on available evidence, none are referenced on the live page. Whether they exist off-site is unknown from this audit. *This is a dependency, not a confirmed finding.*

---

### 7. Prompt-source gap map

| Query / prompt | Best current source URL | What the page provides | What is missing for a strong AI answer |
|---|---|---|---|
| "Who is Rafał Łazicki?" | `https://awesomeworks.ai/en/` | Name, role, credentials (WAT, Data Science), career arc, social links | `Person` JSON-LD; no `sameAs`; no third-party corroboration links |
| "What is AwesomeWorks AI?" | `https://awesomeworks.ai/en/` | Organization name, founding 2021, Warsaw, services described | `sameAs` in Organization schema; crisp definitional opening sentence |
| "What does AwesomeWorks do for product teams?" | `https://awesomeworks.ai/en/` | Hero, bottleneck section, FAQ answers | FAQ schema; explicit service category label (consulting? agency? SaaS?) |
| "What is CallWise?" | `https://awesomeworks.ai/en/` (products section) | Name, 2 bullets, "B2B · closed access" label | Dedicated landing page on `callwise.awesomeworks.ai`; no `Product` or `SoftwareApplication` schema on the homepage |
| "AI delivery consulting Warsaw" | `https://awesomeworks.ai/en/` | Broadly relevant copy | Explicit service-category language in H1 or description; off-site citations |
| "Rafał Łazicki LinkedIn / GitHub" | Off-site (LinkedIn/GitHub) | Social links visible on `/en/` socials section | `sameAs` linking the domain to those profiles in schema |

---

## Prioritized recommendation matrix

| ID | Priority | Effort | Recommendation | Exact file targets | Measurement hook | Experiment hook | Notes / dependencies |
|---|---|---|---|---|---|---|---|
| GEO-01 | P0 | S | Enable `FAQPage` JSON-LD on all three pages that render the FAQ section. Pass `includeFaqSchema={true}` to `<Base>` in each page file. The FAQ data is already structured in `personal-home.ts` and the schema builder is already in `base.astro` — this is a one-prop change per file. | `src/pages/index.astro`, `src/pages/en/index.astro`, `src/pages/pl/index.astro` | View source / Rich Results Test confirms `FAQPage` JSON-LD present on all three pages; questions and answers match visible copy exactly. | A/B not needed — this is schema alignment, not a ranking experiment. Monitor Google Search Console rich result eligibility and FAQ feature appearance after recrawl. | Ensure FAQ Q&A text in schema matches visible rendered text exactly (no truncation, no HTML tags in `Answer.text`). |
| GEO-02 | P0 | S | Add `sameAs` to `Organization` JSON-LD using the four social profile URLs already defined in `personal-home.ts` top-of-file constants. Wire `xUrl`, `linkedinUrl`, `githubUrl`, `instagramUrl` into the `organizationJsonLd.sameAs` array in `base.astro`. | `src/layouts/base.astro`, `src/data/personal-home.ts` (read-only source; values already defined) | View source on `/en/` confirms `"sameAs": ["https://x.com/awesomeworksai", "https://linkedin.com/in/rlazicki", "https://github.com/Raff-dev", "https://instagram.com/awesomeworksai"]` in Organization JSON-LD. | Hypothesis: adding `sameAs` improves entity co-reference in AI answers for "AwesomeWorks" and "Rafał Łazicki" queries. Test by monitoring whether brand queries in ChatGPT search / Perplexity return more accurate attribution over 30 days. | Only include profiles that are active and publicly accessible. Verify each URL resolves before deploying. |
| GEO-03 | P0 | M | Add a `Person` JSON-LD schema for Rafał Łazicki. Emit it alongside `Organization` on pages where the founder's name appears in the `<h1>` / eyebrow (all three audited pages). Include: `name`, `jobTitle` ("Founder & Delivery Systems"), `url` (canonical page URL), `alumniOf` (WAT / Warsaw Military University of Technology, Data Science), `knowsAbout` (AI delivery systems, agentic workflows, internal tooling), `sameAs` (LinkedIn, GitHub). Add a `"founder"` or `"member"` link between `Organization` and `Person`. | `src/layouts/base.astro` (add `personJsonLd` object and conditional emit when `locale` is set), `src/data/personal-home.ts` (read existing constant URLs) | View source on `/en/` and `/pl/` confirms `Person` JSON-LD present; `sameAs` URLs match visible social links; Rich Results Test validates schema without errors. | Hypothesis: `Person` schema improves AI answer attribution for "Who is Rafał Łazicki?" queries. Monitor AI answer inclusion via manual spot-checks of ChatGPT, Perplexity, and Claude Web Search for ["Rafał Łazicki", "awesomeworks.ai founder"] over 30–60 days post-deploy. | Keep schema claims strictly within what is visible on the page. Do not add `award`, `affiliation`, or outcome claims not visible in the rendered copy. |
| GEO-04 | P1 | S | Add a short explicit definition sentence at the start of the hero subtitle or as a new `about-entity` paragraph, following the pattern: `"Rafał Łazicki is a [role] who helps [target audience] [outcome], operating through AwesomeWorks (awesomeworks.ai)."` This gives AI retrieval systems a clean first-sentence extract for entity definitions. | `src/data/personal-home.ts` (hero subtitle fields for `en` and `pl`) | On live `/en/`, the first paragraph visible below H1 contains an explicit subject-verb-object definition sentence. Test by querying an AI search engine for "Who is Rafał Łazicki?" and checking if the returned snippet uses the new definition sentence. | Hypothesis: a definitional first sentence improves citation frequency and attribution accuracy in AI answers. Requires comparison of AI snippet before/after deployment. | Do not pad the visible copy with SEO filler. The sentence should read naturally to humans. Keep it under 2 lines. |
| GEO-05 | P1 | S | Fix the dual-English URL issue: consolidate `src/pages/index.astro` to either redirect to `/en/` or be removed as a standalone indexable page. This also fixes the sitemap hreflang duplicate (`hreflang="en"` appearing twice per URL cluster). Inherits from `04-seo-audit.md` SEO-01, now flagged here as a GEO issue because retrieval crawlers may index and cache two versions of the same English page with different canonical URLs, fragmenting citation signals. | `astro.config.mjs`, `src/pages/index.astro`, `src/layouts/base.astro` | `https://awesomeworks.ai/` returns a redirect or has a canonical pointing to `/en/`; sitemap-0.xml contains exactly one `hreflang="en"` alternate per URL cluster. | Monitor whether AI search tools consolidate English content attribution to one URL after fix. | Cross-listed with SEO-01 in `04-seo-audit.md`. Priority remains P0 from a pure SEO standpoint; here it is P1 as a GEO amplifier (the SEO fix is a prerequisite). |
| GEO-06 | P1 | S | Add a `WebSite` JSON-LD schema with `name: "AwesomeWorks"` and `url: "https://awesomeworks.ai"`. This anchors the domain as a named entity independently of the `Organization` type. | `src/layouts/base.astro` | View source confirms `"@type": "WebSite"` JSON-LD present on all pages. | Low-signal experiment. Monitor branded search appearance. | Optional per GEO best practices; `Organization` + `Person` are higher priority. |
| GEO-07 | P2 | L | Add at least one outcome-anchored proof statement to the homepage copy — a specific, citable claim backed by delivered work (e.g., a project metric, a delivery timeline, a team size served). Avoid fabricating numbers; use only claims backed by real projects. This addresses the current absence of evidence-backed proof in the bottleneck/hero sections. | `src/data/personal-home.ts` (bottlenecks or hero subtitle), `src/components/story-content.astro` (story panels) | At least one visible numeric or named-outcome claim appears in rendered HTML of `/en/`. Spot-check whether AI answers for "AwesomeWorks delivery results" include the claim. | Off-site dependency: real proof from delivered projects must exist before this can be written. Do not add invented metrics. |
| GEO-08 | P2 | L | Seek off-site corroboration: press mentions, community posts, conference talks, or case study features that link back to `awesomeworks.ai` or name Rafał Łazicki. This cannot be implemented via repo changes. Naming it here as an explicit dependency because on-site entity schema alone is insufficient for competitive AI answer inclusion without independent third-party signals. | `off-site/no-file` | Measure by periodic off-site mention count (Ahrefs, Semrush, or manual search); track whether AI answers cite awesomeworks.ai as a source in relevant queries. | Off-site publication is out of scope for this repo. The recommendation is a strategic dependency, not a code task. This is an explicit hypothesis: off-site mentions improve AI answer confidence for non-brand queries. |

---

## Experiment handoff

### Candidate prompt sets for `llm-flow-tester`

These prompts should be run against ChatGPT Web Search, Perplexity, and Claude Web Search **before** and **after** deploying GEO-01, GEO-02, and GEO-03:

| Prompt | Expected surface to test | Baseline status |
|---|---|---|
| `"Who is Rafał Łazicki?"` | Person entity recognition, sameAs attribution | Likely: partial prose extract from page; no schema citation |
| `"What is AwesomeWorks AI?"` | Organization entity description | Likely: description meta paraphrase |
| `"What does AwesomeWorks do for product teams?"` | Service category, offer clarity | Unknown; depends on query rewriting |
| `"What is the difference between consulting and implementation at AwesomeWorks?"` | FAQ answer extraction (Q2 in FAQ) | Tests whether FAQ text appears in AI answer without schema |
| `"awesomeworks.ai founder background"` | Person + Organization co-reference | Unknown |
| `"Rafał Łazicki delivery systems Warsaw"` | Entity + location + specialization | Unknown |

Run each prompt 3× on each engine. Log: (a) whether awesomeworks.ai is cited, (b) whether the answer is attributed to Rafał or AwesomeWorks by name, (c) which specific text block is quoted or paraphrased.

### Methodology questions for `eval-architect`

1. **Overfitting risk:** If we add `Person` and `sameAs` schema and run the same prompts again, how do we distinguish schema-driven improvement from recrawl timing noise? What control prompt set can verify signal vs. noise?
2. **Citation source reliability:** When an AI search engine returns a paraphrase of the FAQ answer, how do we confirm it came from the JSON-LD schema vs. the visible HTML? Is there a detectable signal?
3. **Before/after baseline:** Given that retrieval bots cache pages on their own schedules, what minimum time window is needed after deploy before post-deploy prompt tests are valid?
4. **Multi-engine consistency:** Should we treat ChatGPT, Perplexity, and Claude as independent evaluation systems (requiring agreement) or as corroborating signals? What threshold of agreement counts as a GEO win?
