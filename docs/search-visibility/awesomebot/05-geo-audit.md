# GEO Audit — website / AwesomeBot sub-app — 2026-07-02

**Scope:** repo `website` (Awesome-Works-AI/website); worktree `/home/raff/projects/awesomeworks/worktrees/website/awesomebot-search-visibility`; branch `docs/awesomebot-search-visibility` (base `origin/main` @ `c497b80`); audited surface = AwesomeBot sub-app only (`awesomebot-app/`); URLs `https://awesomeworks.ai/awesomebot/` (PL, default), `https://awesomeworks.ai/awesomebot/en/` (EN), `https://awesomeworks.ai/robots.txt`, `https://awesomeworks.ai/sitemap-index.xml`, `https://awesomeworks.ai/sitemap-0.xml`
**Canonical output path:** `docs/search-visibility/awesomebot/05-geo-audit.md` (namespaced deliberately — `docs/search-visibility/04-*.md` / `05-*.md` are the main-page baseline and stay untouched)
**Methodology:** `.github/copilot-instructions.md` + main-page baseline (`docs/search-visibility/04-seo-audit.md`, `05-geo-audit.md`, `07-implementation-decisions.md`) + `awesomebot-app/` source + live rendered HTML (`curl`, 2026-07-02) + `robots.txt` + sitemap inspection + parent-homepage link/entity-graph inspection

---

## Executive summary

- **Retrieval access is fully open and content is fully server-rendered.** The domain-wide `User-agent: * / Allow: /` covers `/awesomebot/*`; both pages return HTTP 200 with ~63 KB of complete HTML, no `meta robots`, no `X-Robots-Tag`, no JS-gated copy. All AI retrieval bots can fetch and read everything.
- **The sub-app is invisible to the sitemap.** `sitemap-0.xml` lists only `/en/` and `/pl/` — the parent build generates the sitemap and the sub-app dist is merged in afterwards, so `/awesomebot/` and `/awesomebot/en/` are discoverable only via three internal links per locale on the homepage carousel. Indexed + snippet-eligible pages are the prerequisite for Google AI features, so this is the top retrievability gap (cross-listed with the parallel `04-seo-audit.md`).
- **The single biggest extractability defect is the segment-spliced H1.** Both segment variants (medical/estate) live in the DOM and are switched by CSS via `html[data-segment]`. In raw-text ingestion the H1 reads *"Rejestracja, która Biuro zarządcy, które odbiera zawsze odbiera zawsze."* — a garbled, unquotable headline for any engine that ingests HTML as continuous text. The splice risk is concentrated in the H1; other segment pairs are complete standalone phrases.
- **The page has no visible definition sentence.** The crisp definition ("AwesomeBot odbiera telefony, SMS-y i e-maile 24/7, rozpoznaje sprawy, nadaje priorytety i przygotowuje odpowiedzi. Wszystko wychodzące zatwierdza człowiek.") exists only in `<meta name="description">` and JSON-LD — it never appears in visible body copy. The closest visible candidates (footer tagline, pillars heading) omit either the product name or the audience.
- **Structured data is truthful but thin, and the visible FAQ (7 Q&A) has no `FAQPage` JSON-LD** — the same omission the main-page baseline flagged and has since fixed on `/pl/` and `/en/`. The `SoftwareApplication` node lacks a stable `@id`, `offers` (despite fully visible PLN pricing), and audience typing.
- **Proof is the dominant off-site dependency.** The page is honest ("Wdrożenia pilotażowe", demo "startuje wkrótce") but carries zero outcome data, client names, testimonials, or independent mentions. The generic-sounding brand name "AwesomeBot" has a real collision/disambiguation risk that on-site copy alone cannot resolve.

---

## Strengths already present

- **Full SSR extractability:** all copy — hero, problem, pillars, process, use cases, trust, pricing, FAQ, footer — is present in the raw HTML response. No image-locked claims (`<img>` count in body: 0; the orb is pure CSS).
- **Clean canonical + hreflang cluster:** PL self-canonicalizes to `/awesomebot/`, EN to `/awesomebot/en/`, reciprocal `hreflang` pair plus `x-default` → PL. No dual-URL duplication of one language (the failure mode the main page had at baseline).
- **Entity-graph join with the parent site:** the sub-app's `Organization` stub uses `@id: https://awesomeworks.ai/#organization` — the same `@id` under which the parent homepage now emits a rich `Organization` (with `sameAs`, `founder`) and a `Person` node for Rafał Łazicki. The product's `provider` reference resolves into an already-corroborated entity graph.
- **`SoftwareApplication` JSON-LD exists at all** — the product is machine-declared as a product, with truthful `applicationCategory: BusinessApplication` and locale-correct `inLanguage`.
- **Quote-ready pricing in plain text:** three plans with exact prices (499 / 1499 / od 2499 zł/mc), per-plan fit ranges ("Dla 1–20 rozmów dziennie" etc.) and feature lists — one of the most extractable pricing surfaces an answer engine can ask for, reinforced by FAQ q7 ("Plany zaczynają się od 499 zł miesięcznie…").
- **7 visible FAQ Q&A pairs in `<details>/<summary>`** with specific, honest, self-contained answers (human-approval invariant, Polish voice, number porting, deployment path, price anchor). Directly mappable to `FAQPage` schema.
- **A consistent, attributable safety invariant** repeated across hero stats, pillars, trust section, FAQ and footer: "Wszystko wychodzące zatwierdza człowiek" / "Everything outbound is approved by a human". This is a crisp differentiator claim engines can quote without hedging.
- **Legal entity anchor in visible copy:** `Awesome Works AI · NIP: 5223202536 · Warszawa` in the footer — machine-verifiable corroboration of the provider entity (NIP resolves in public registries).
- **Honest claims discipline:** no invented reviews, ratings, client logos or outcome numbers; the phone demo is explicitly labeled "startuje wkrótce"; mock UI content (hero status log, floating chips, orb) is `aria-hidden="true"` and the triage card carries a visible caption ("Tak wygląda sprawa gotowa do decyzji") framing it as an illustration.
- **Internal corroboration from the parent homepage:** 3 links per locale to the sub-app plus a plain-text role sentence ("Siedem produktów AI — CallWise, AwesomeBot, … recepcja …") and an audience-labeled carousel card ("Dla Klinik i zarządców nieruchomości — AwesomeBot").

---

## Findings by category

### 1. AI crawler access and control map

Basis: live `https://awesomeworks.ai/robots.txt` (fetched 2026-07-02): `User-agent: * / Allow: /` + sitemap declaration only. No per-bot rules. No `<meta name="robots">` in either page's rendered HTML; no `X-Robots-Tag` in HTTP response headers (GitHub Pages). Controls are domain-wide — the sub-app cannot diverge from them and inherits the decisions documented in the main-page baseline (`docs/search-visibility/05-geo-audit.md`, finding 1).

| Surface / bot | Role | Current state | Risk / implication |
|---|---|---|---|
| Google AI features | indexed + snippet-eligible prerequisite | Crawl allowed; pages 200, no noindex/nosnippet; **but `/awesomebot/*` absent from sitemap** — discovery depends solely on homepage internal links | Prerequisite weakened, not broken. Until the URLs are in the sitemap and confirmed indexed, inclusion in Google AI surfaces is fragile. See finding 1a + GEO-01. |
| Google-Extended | training control | Not opted out (no rule) | Domain-level business decision, unchanged since baseline; documented there. No retrieval impact. |
| Claude-SearchBot | search / retrieval | Allowed (wildcard) | Correct for answer inclusion in Claude search. |
| Claude-User | user-triggered retrieval | Allowed | Correct; pages fetchable when a user asks Claude about the site. |
| ClaudeBot | training / general crawl role per source | Not opted out | Content reachable for Anthropic training pipelines; same domain-level decision as baseline. |
| OAI-SearchBot | search retrieval | Allowed | Correct for ChatGPT search answer inclusion. |
| GPTBot | training | Not opted out | Same domain-level training decision as baseline. |
| ChatGPT-User | user-triggered fetch | Allowed | Correct. |
| PerplexityBot | search / retrieval (citation-oriented surface) | Allowed (wildcard) | Correct; Perplexity remains a valid GEO test target. |

**Training vs retrieval split:** unchanged from the domain baseline — all training controls opted in by default, all retrieval controls open. No new action for the sub-app; the training-opt-out question stays a domain-level decision, not an AwesomeBot task.

**1a. Sitemap coverage gap (retrievability).** `sitemap-0.xml` contains exactly two URLs (`/en/`, `/pl/`). Root cause in repo: the sitemap is generated by the parent build (`astro.config.mjs` → `@astrojs/sitemap` over parent pages only), while `awesomebot-app` has no sitemap integration and its dist is copied into `dist/awesomebot/` afterwards (`.github/workflows/deploy.yml`, lines 75–87). Retrieval bots that seed from sitemaps, and Google indexing as the AI-features prerequisite, see no declared entry for the sub-app. Internal links exist (3 per locale from the homepage), so this is a slowdown/fragility, not a block.

### 2. Entity clarity findings

- **Product entity is declared but not anchored.** The `SoftwareApplication` node has no `@id`, and its `url` is the per-locale canonical — so PL and EN pages emit two disconnected product nodes (`.../awesomebot/` and `.../awesomebot/en/`) instead of one product entity with two language pages. A stable `@id` (e.g. `https://awesomeworks.ai/awesomebot/#software`) shared by both locales would let engines merge them.
- **Provider entity resolves well.** `provider: { "@id": "https://awesomeworks.ai/#organization" }` joins the parent homepage's rich `Organization` graph (with `sameAs`, `founder` → `Person` `@id: …#rafal-lazicki`). The sub-app's local `Organization` stub carries `name`, `legalName`, `email`, address — enough to stand alone if an engine does not join cross-page graphs.
- **No visible definition block.** Nowhere in the rendered body does a sentence of the form "AwesomeBot to AI recepcja 24/7 dla placówek medycznych i zarządców nieruchomości, która …" appear. The `<title>` names product + category + audience; the meta description defines behavior; the footer tagline ("AI recepcja 24/7 — odbiera, rozumie i przygotowuje odpowiedzi…") omits the product name; the pillars heading ("Co robi AwesomeBot") names the product but not the category. Engines extracting a first-sentence definition from visible text have nothing clean to take. (Definitional-first-sentence preference is a synthesis-backed hypothesis, not a proven engine rule.)
- **Brand-name collision risk.** "AwesomeBot" is a generic-sounding compound; unrelated bots and tools plausibly share the name. On-page disambiguators that exist: title pairing (product + category + audience), provider entity join, NIP, `og:site_name: AwesomeBot`. Missing: any off-site surface that ties the name to this product (see finding 6). Queries for the bare name may return or blend unrelated entities — this is a disambiguation dependency the repo can only partially fix.
- **Two-audience entity framing is coherent.** "One product, two segments" is legible: segment toggle labels, dual problem cards, dual use-case sections with clear H2s ("Placówki medyczne", "Zarządcy nieruchomości"). An engine asked "for whom?" finds both audiences in extractable headings.

### 3. Extractability findings

- **H1 segment splice (top defect).** `Hero.astro` (lines 88–93) renders four spans inside one `<h1>`: `pre.med`, `pre.est`, then `accent.med`, `accent.est`. CSS (`global.css` lines 74–80) hides the inactive segment via `display:none` keyed on `html[data-segment]`, which is set by inline JS (default: medical). Consequences by ingestion mode:
  - raw HTML text (no CSS/JS — typical for retrieval-bot text extraction): *"Rejestracja, która Biuro zarządcy, które odbiera zawsze odbiera zawsze."* — garbled;
  - rendered with CSS+JS (Googlebot-style): one clean variant (medical by default);
  - accessibility tree: same as rendered.
  The splice is **word-level inside one sentence**, unlike every other segment pair on the page (problem subs, pillar examples, use-case items, FAQ q1/q6), which are complete standalone phrases per span — those degrade to "both variants listed", which stays readable. Fix shape: make each segment span a complete standalone sentence (each span carries its full H1 including the accent), so worst-case raw text yields two intact sentences instead of one spliced one.
- **Dual-segment DOM duplication is otherwise acceptable.** 23 `seg-med` + 23 `seg-est` spans; both variants are legitimate visible content (user-switchable), so their presence in HTML is not cloaking and mostly *adds* extractable coverage (both ICPs on one URL).
- **FAQ is HTML-extractable:** `<details>/<summary>` with full text in markup, first item open. Q1 and Q6 have segment-variant wordings — both variants present in DOM.
- **Pricing, process, trust sections are list/heading-structured** with short scannable claims — good for block-level extraction.
- **Mock/demo content is partially fenced:** hero status log and floating chips are `aria-hidden="true"`; the triage card (fictional SMS "…mam jutro o 9:00 USG…" + fictional reply draft) is *not* aria-hidden but carries the visible caption "Tak wygląda sprawa gotowa do decyzji". Raw-text ingestion still sees all of it; risk of an engine quoting fictional case content as fact is low-to-moderate and mitigated by the caption.
- **No content is image-locked.** Zero `<img>` in body; every claim exists as text.

### 4. Citation readiness findings

**High citation readiness (already present):**

| Block | Location | Why it's citable |
|---|---|---|
| Meta-description definition (PL/EN) | `awesomebot-app/src/i18n/ui.ts` `meta.description` | Complete subject–verb definition incl. human-approval invariant — but only in `<head>`, not visible body (see finding 2) |
| FAQ answers q1–q7 | `ui.ts` `faq.*` | Self-contained, specific, honest; price anchor in q7; safety invariant in q1/q4 |
| Pricing plans + fit ranges | `ui.ts` `pricing.*` | Exact PLN figures + volume fits ("1–20 rozmów dziennie") — rare, unambiguous facts |
| Human-approval invariant | hero stats, pillars p3, trust i1–i4, FAQ, footer tagline | Repeated verbatim-adjacent across sections; crisp differentiator |
| Capability microclaims | `hero.stat1–3` (24/7, "2 gotowe drafty na sprawę", "100% akcji w audycie") | Short, specific, attributable product-mechanics claims |
| Legal identity | `footer.legal` (NIP, Warszawa) | Externally verifiable |

**Low citation readiness (gaps):**

| Block | Gap |
|---|---|
| H1 | Garbled in raw-text ingestion (finding 3); even rendered, "Rejestracja, która odbiera zawsze" is evocative rather than definitional |
| "40–60 zgłoszeń dziennie" (`problem.item1.est`) | Unattributed statistic — plausible persona copy, no source; engines may quote it as a product claim about the market. Either attribute it or keep it clearly as problem framing |
| Outcome proof | None: no client names, testimonials, pilot results, response-time/pickup-rate deltas. "Wdrożenia pilotażowe · bez zobowiązań" honestly signals pre-proof stage |
| Triage/chips mock content | Fictional; quotable-as-fact risk (mitigated, see finding 3) |
| CTA copy ("Posłuchaj, jak brzmi Twoja nowa recepcja") | Marketing voice, not citable — fine, but it is the closing block engines see |

### 5. Structured data alignment with visible content

| Schema type | Expected (from visible content) | Actual (live JSON-LD, both locales) | Gap |
|---|---|---|---|
| `Organization` | AwesomeWorks / Awesome Works AI, Warszawa, email, NIP visible in footer | Present (stub): name, legalName, url, email, address; `@id` joins parent graph | Aligned. Optional: `vatID`/`taxID` from the visible NIP; `sameAs` lives on the parent's node under the same `@id` |
| `SoftwareApplication` | AwesomeBot, business app, PL/EN, provider AwesomeWorks, three priced plans, feature pillars, two audiences | Present: name, applicationCategory, operatingSystem, url (per-locale), inLanguage, description, provider ref | **No stable `@id`** (locale nodes don't merge); **no `offers`** despite fully visible pricing; no `audience`; no `featureList` |
| `FAQPage` | 7 visible Q&A pairs (q1/q6 segment-variant) | **Not present** | Same class of omission the main page had at baseline (now fixed there — parent pages emit `FAQPage`). Segment nuance: q1/q6 variants both exist in HTML; schema must either include both variants as separate questions or pick the default-segment wording — never invent a third wording |
| `Offer` / `UnitPriceSpecification` | 499 / 1499 / od 2499 zł/mc visible | Not present | Only add if it mirrors visible pricing exactly (incl. "od" as `minPrice` semantics) |
| `BreadcrumbList` | parent site → AwesomeBot relation visible via nav/footer links | Not present | Optional, low priority |

All schema present is truthful; gaps are omissions, not fabrication. Consistent with the no-schema-absolutism guardrail: schema here is supportive — the visible definition sentence (GEO-02) matters at least as much as any of these additions.

### 6. Off-site dependency findings

| Off-site surface | Current state | GEO implication |
|---|---|---|
| Parent homepage `awesomeworks.ai` | Links + names AwesomeBot with role and audience (portfolio carousel, "Siedem produktów" list) | Only existing corroboration surface; same-domain, so it disambiguates but does not independently corroborate |
| Product social profiles / directories | None found on-page; no `sameAs` targets exist for the product | **Dependency:** nothing off-site ties the name "AwesomeBot" to this product. Brand-collision queries ("AwesomeBot opinie", "what is AwesomeBot") have no independent source to converge on |
| Independent mentions (PL medical / property-management verticals) | Not referenced anywhere; existence unknown from this audit | **Dependency + hypothesis:** answer inclusion for competitive category queries ("AI recepcja dla przychodni") likely requires at least some independent evidence trail; unverifiable from repo |
| Demo phone number (live voice agent) | "Demo telefoniczne startuje wkrótce" — not yet live | Once live, a working PL voice demo is itself citable proof ("answers a real number in natural Polish") — currently a stated capability without a public verification path |
| Founder/domain entity graph (LinkedIn, GitHub etc.) | Exists at domain level (parent `Organization.sameAs`, `Person` schema) | Inherited strength; corroborates the *provider*, not the *product* |

**Off-site gap statement:** the strongest levers that cannot be fixed in this repo are (a) independent mentions tying "AwesomeBot" + "AwesomeWorks" + category together, and (b) real pilot proof. Both are named as dependencies, not repo tasks.

### 7. Prompt-source gap map

| Query / prompt | Best current source URL | What the page provides | Missing proof or extract |
|---|---|---|---|
| "Co to jest AwesomeBot?" | `https://awesomeworks.ai/awesomebot/` | Title + meta definition; pillars; FAQ | Visible definition sentence; sitemap entry; off-site disambiguation vs unrelated "awesome bots" |
| "AI recepcja dla przychodni / kliniki po polsku" | `/awesomebot/` | Category phrase in title; medical problem/use-case sections; Polish-voice pillar + FAQ q2 | Category phrase in visible body copy; indexation confidence; independent mentions; outcome proof |
| "Automatyczna obsługa zgłoszeń dla zarządcy nieruchomości" | `/awesomebot/` | Estate segment: problem cards, use cases, triage example | Estate copy is CSS-hidden behind default-medical rendering for rendering engines (raw text has it); no proof block |
| "Ile kosztuje AI recepcja? / AwesomeBot cennik" | `/awesomebot/` | Full visible pricing + FAQ q7 | `offers` in schema; sitemap entry. Otherwise strongest query fit on the page |
| "Czy AI może odbierać telefony w przychodni bez ryzyka błędnych odpowiedzi?" | `/awesomebot/` | Trust section + FAQ q1/q4 (human-approval invariant) | `FAQPage` schema; citable third-party validation of the safety model |
| "Voice AI mówiący po polsku dla firm" | `/awesomebot/` | Pillar p4 + FAQ q2 (one paragraph each) | Thin coverage; live demo number as verifiable proof |
| "AwesomeBot opinie / reviews / alternatives" | none | Nothing | Entirely off-site dependency (mentions, listings, testimonials) |
| "What is AwesomeBot?" (EN) | `/awesomebot/en/` | EN mirror of the above | Same gaps as PL; EN page also absent from sitemap |

---

## Prioritized recommendation matrix

| ID | Priority | Effort | Recommendation | Exact file targets | Measurement hook | Experiment hook | Notes / dependencies |
|---|---|---|---|---|---|---|---|
| GEO-01 | P0 | S | Get `/awesomebot/` and `/awesomebot/en/` into the domain sitemap. Simplest repo-shape-compatible fix: add both URLs via `sitemap({ customPages: [...] })` in the parent config (sub-app builds separately, so parent-side declaration is the one place that survives the dist merge). | `astro.config.mjs` (parent), cross-check `.github/workflows/deploy.yml` | `curl https://awesomeworks.ai/sitemap-0.xml` lists both URLs; GSC URL Inspection shows both indexed | After indexation confirmed, re-run the prompt set below and compare citation frequency vs pre-fix baseline | Cross-listed with `docs/search-visibility/awesomebot/04-seo-audit.md` (parallel SEO audit); on-site clarity prerequisite for Google AI features |
| GEO-02 | P0 | S | Add one visible definition sentence naming product + category + audience + invariant, e.g. PL: "AwesomeBot to AI recepcja 24/7 dla placówek medycznych i zarządców nieruchomości — odbiera telefony, SMS-y i e-maile, a wszystko wychodzące zatwierdza człowiek." Best placement: intro line under `pillars.heading` or above the hero micro-line; EN mirror. Segment-neutral wording — do not splice. | `awesomebot-app/src/i18n/ui.ts`, `awesomebot-app/src/components/Pillars.astro` (or `Hero.astro`) | Rendered HTML of both locales contains the sentence in visible body text (not only `<head>`) | Ask "Co to jest AwesomeBot?" / "What is AwesomeBot?" on ChatGPT search, Claude, Perplexity before/after; log whether the returned definition matches the new sentence | On-site clarity. Definitional-first-sentence benefit is a synthesis hypothesis — that is exactly why it carries the experiment hook |
| GEO-03 | P1 | M | Eliminate the word-level segment splice in the H1: make each segment span a complete standalone sentence (each variant carries its full headline incl. accent), so raw-text ingestion degrades to two intact sentences instead of one garbled one. Sweep remaining `seg-med`/`seg-est` pairs to confirm none splice mid-sentence (audit found only the H1). | `awesomebot-app/src/components/Hero.astro` (lines 88–93), `awesomebot-app/src/i18n/ui.ts` (`hero.h1.*` keys) | `curl -s https://awesomeworks.ai/awesomebot/ \| python3 -c "..."` text-extraction of `<h1>` yields grammatical sentence(s); rendered page unchanged per segment | Compare which H1 string engines quote for brand queries before/after; flag any pre-fix answers quoting the spliced string as evidence of raw-text ingestion | On-site clarity. Hypothesis-driven: affects raw-text ingesting engines; CSS-rendering crawlers already see one clean variant |
| GEO-04 | P1 | S | Emit `FAQPage` JSON-LD mirroring the 7 visible Q&A. Source the schema from the same `ui.ts` keys `Faq.astro` renders (extract the shared items list so component and schema cannot drift). For q1/q6 include both segment variants as separate questions (both are visible, user-reachable content) — never a third wording. | `awesomebot-app/src/layouts/BaseLayout.astro`, `awesomebot-app/src/components/Faq.astro` (extract shared items), `awesomebot-app/src/i18n/ui.ts` (read-only source) | Rich Results Test validates `FAQPage` on both locales; schema text matches rendered copy exactly | Track whether FAQ-shaped prompts ("czy AI odpowie pacjentowi coś głupiego…", "ile kosztuje…") start returning the FAQ answers verbatim | Schema is supportive, not a universal lever; visible FAQ already extractable — this closes the machine-readable half |
| GEO-05 | P1 | S | Strengthen the `SoftwareApplication` node: stable `@id` (`https://awesomeworks.ai/awesomebot/#software`) shared by both locales; `offers` mirroring the three visible plans (499/1499 PLN exact, plan 3 as `minPrice: 2499`); `audience` (medical facilities, property managers); optional `featureList` from pillar titles. Claims strictly limited to visible copy. | `awesomebot-app/src/layouts/BaseLayout.astro` | View-source on both locales shows one shared `@id`; Rich Results / Schema validator passes; offer prices match rendered pricing exactly | Monitor pricing-intent prompts ("AwesomeBot cennik", "ile kosztuje AI recepcja") for price accuracy in answers before/after | No schema absolutism: pair with GEO-02; do not add ratings/reviews (none exist) |
| GEO-06 | P2 | S | Reduce fictional-quote risk from the triage mock: keep the visible caption, and add an explicit "Przykład" / "Example" marker into the card's text flow (e.g. in `triage.header`: "Triage · przykładowa sprawa #124"). Chips and status log are already `aria-hidden`. | `awesomebot-app/src/i18n/ui.ts` (`triage.header`, `triage.caption`), `awesomebot-app/src/components/TriageCard.astro` | Rendered card text contains the example marker in both locales | Spot-check whether any engine answer quotes triage SMS/draft content as factual product behavior; expect zero occurrences | Low-probability risk; cheap insurance |
| GEO-07 | P2 | L | Add an outcome-anchored proof block once the first pilots produce real data (pickup rate, response-time delta, cases/day handled, named or anonymized pilot client). No invented numbers; until proof exists this is blocked. | `awesomebot-app/src/i18n/ui.ts` + new proof section component (`awesomebot-app/src/components/`), partially `off-site/no-file` (proof must exist first) | At least one numeric/named outcome claim visible in rendered HTML with attribution | Prompt set "AwesomeBot wyniki / czy AI recepcja działa" — check whether the claim is cited | Dependency: real pilot results. The current "Wdrożenia pilotażowe" honesty is correct until then |
| GEO-08 | P2 | L | Build off-site corroboration for the product entity: tie "AwesomeBot" + "AwesomeWorks" + category together in independent surfaces (LinkedIn founder posts linking the URL, vertical communities for PL clinics/property managers, directory listings, the live demo phone number as public proof). Then wire resulting profile URLs into `sameAs` on the `SoftwareApplication`. | `off-site/no-file` (follow-up repo task: `sameAs` in `awesomebot-app/src/layouts/BaseLayout.astro` once targets exist) | Periodic mention count (manual search or Ahrefs-class tooling); brand-collision check: does "AwesomeBot" + qualifier resolve to this product in engine answers | Hypothesis: off-site mentions raise answer-inclusion confidence for non-brand category queries; measure category-prompt citation rate over 60–90 days | Explicit off-site dependency, not a repo fix; brand-name collision makes this heavier than usual |

---

## Experiment handoff

### Candidate prompt sets for `llm-flow-tester`

Run against ChatGPT search, Claude web search, Perplexity, and (where observable) Google AI features — **before** and **after** GEO-01/02/04/05 deploy; 3 runs per prompt per engine; log (a) is `awesomeworks.ai/awesomebot/` cited, (b) is the product attributed to AwesomeWorks, (c) which text block is quoted/paraphrased, (d) for the bare-brand prompts: does the answer confuse an unrelated "AwesomeBot".

| # | Prompt | Tests | Baseline expectation |
|---|---|---|---|
| 1 | "Co to jest AwesomeBot?" | definition extraction + brand disambiguation | Unknown; collision risk with unrelated bots |
| 2 | "What is AwesomeBot by AwesomeWorks?" | qualified-brand entity resolution | Should resolve post-GEO-02/05 |
| 3 | "AI recepcja 24/7 dla przychodni — jakie są opcje w Polsce?" | category answer inclusion (medical) | Likely absent pre-fix (no sitemap entry, no off-site proof) |
| 4 | "Jak zautomatyzować obsługę zgłoszeń jako zarządca nieruchomości?" | category answer inclusion (estate) + hidden-segment extraction | Unknown; estate copy CSS-hidden in rendered mode |
| 5 | "Ile kosztuje AwesomeBot?" | pricing extraction accuracy | Page has strongest possible source; test exact-figure fidelity |
| 6 | "Czy AI recepcja może odpowiedzieć pacjentowi coś błędnego?" | FAQ/trust invariant quoting | Tests whether q1/q4 text surfaces without schema (pre-GEO-04) vs with |
| 7 | "Does AwesomeBot really speak Polish on the phone?" | EN page retrieval + capability claim | Tests EN mirror + Claude-User/ChatGPT-User style fetch |
| 8 | "AwesomeBot opinie" | off-site dependency null-check | Expected: no source; tracks GEO-08 over time |

Segment-control note: prompts 3 and 4 intentionally split by segment — the toggle means one URL serves both ICPs, so per-segment prompts are the only way to see whether the dual-DOM strategy costs or gains inclusion.

### Methodology questions for `eval-architect`

1. **Segment confound:** the page serves two ICPs from one URL with CSS-switched variants. How do we score answers that mix medical and estate framing — error, acceptable blend, or evidence of raw-text (both-variant) ingestion? Can answer wording be used as an ingestion-mode probe (spliced-H1 quotes = raw text; medical-only = rendered)?
2. **Brand-collision scoring:** for bare "AwesomeBot" prompts, what rubric separates (a) our product cited correctly, (b) unrelated entity returned, (c) blended/hallucinated hybrid? Disambiguation rate should be a first-class metric, not folded into citation rate.
3. **Recrawl window:** GEO-01 (sitemap) and GEO-02/04/05 (content/schema) will deploy close together; what minimum window and what prompt-set split lets us attribute change to indexation vs content, given engines recrawl on their own schedules?
4. **PL-language surface coverage:** most target prompts are Polish. Are the engines' PL answer surfaces stable enough for before/after comparison, or do we need an EN-prompt control set to separate language-surface noise from real change?
5. **Hold-out set:** which prompts should we *not* optimize copy against (hold-outs) so post-fix improvements aren't overfitted to the exact wording of the test set?
