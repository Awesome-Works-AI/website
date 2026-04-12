# Search visibility implementation decisions — review draft

Ten dokument jest **review surface przed wdrożeniem fixów** z:

- `docs/search-visibility/04-seo-audit.md`
- `docs/search-visibility/05-geo-audit.md`

Cel: oddzielić rzeczy, które można wdrożyć od razu, od rzeczy, które wymagają decyzji Rafała przed zmianą meta tagów, copy i canonical strategy.

## 1. Mój rekomendowany pakiet zmian

### Wdrożyć od razu

1. **FAQ schema**
   - włączyć `FAQPage` JSON-LD na `/`, `/en/`, `/pl`
   - zmiana techniczna, bez zmiany message

2. **`Organization.sameAs`**
   - dodać `sameAs` do `Organization` JSON-LD z już widocznych profili:
     - `https://github.com/Raff-dev`
     - `https://x.com/awesomeworksai`
     - `https://linkedin.com/in/rlazicki`
     - `https://instagram.com/awesomeworksai`

3. **Image dimensions**
   - dodać brakujące `width` / `height` na dekoracyjnych logo/obrazach w sekcji produktów

### Wdrożyć po akceptacji decyzji

1. **Canonical home strategy**
   - **proponuję:** `/` -> `/en/` i tylko `/en/` jako angielski homepage

2. **Meta direction i snippet direction**
   - **proponuję:** utrzymać founder-led / delivery-systems direction, ale zrobić ją bardziej explicit dla wyszukiwarki

3. **`Person` JSON-LD dla Rafała**
   - **proponuję:** wersję richer-but-safe, opartą wyłącznie o rzeczy już widoczne na stronie

4. **Docs alignment**
   - **proponuję:** zaktualizować `docs/content.md` i `docs/company-landing-guide/03-seo-and-metadata.md` dopiero po akceptacji direction, najlepiej w tym samym PR co code fix albo w bezpośrednim follow-up PR

## 2. Decyzje do podjęcia

## Decision A — które URL ma być canonical dla EN homepage?

### Current state

- repo ma:
  - `src/pages/index.astro`
  - `src/pages/en/index.astro`
  - `src/pages/pl/index.astro`
- live `/` i `/en/` zwracają 200
- oba są angielską wersją homepage
- oba mają osobne canonicale
- sitemap / hreflang cluster przez to jest brudny

### Opcje

#### Option A — **RECOMMENDED**

- `https://awesomeworks.ai/` robi `302` do `https://awesomeworks.ai/en/`
- `https://awesomeworks.ai/en/` zostaje jedynym angielskim homepage

**Dlaczego to polecam:**

- repo docs już wcześniej szły w tym kierunku
- i18n model z `prefixDefaultLocale: true` lepiej pasuje do jawnego `/en/`
- czyści duplicate-English problem najprostszą logiką
- upraszcza SEO i GEO attribution do jednego EN URL

**Pliki do zmiany:**

- `src/pages/index.astro`
- ewentualnie `astro.config.mjs` jeśli routing będzie wymagał korekty

#### Option B

- `https://awesomeworks.ai/` zostaje canonical EN homepage
- `/en/` przestaje być osobnym indexable entrypointem

**Dlaczego tego teraz nie rekomenduję:**

- byłby to ruch przeciwny do obecnego i18n shape repo
- większe ryzyko, że część istniejących założeń i future locale routing znów się rozjadą

## Decision B — jaki direction ma mieć metadata i snippet?

### Current state

Obecne meta copy:

| Locale | Field | Current |
|---|---|---|
| PL | `title` | `Rafał Łazicki — workflow, handoffy i software delivery` |
| PL | `description` | `Pomagam zespołom produktowym skrócić drogę od decyzji i scope'u do wdrożenia. Workflow, handoffy, internal tooling i AI-native execution.` |
| PL | `socialDescription` | `Workflow, handoffy i internal tooling, które skracają drogę od decyzji do wdrożenia.` |
| EN | `title` | `Rafał Łazicki — workflow, handoffs, and software delivery` |
| EN | `description` | `I help product teams shorten the path from decisions and scope to deployment. Workflow design, handoffs, internal tooling, and AI-native execution.` |
| EN | `socialDescription` | `Workflow, handoffs, and internal tooling that shorten the path from decisions to deployment.` |

### Mój rekomendowany direction

Nie skręcałbym w stronę generycznego **“AI automation for business”**.

Zostawiłbym:

- founder-led identity,
- delivery / workflow / handoffs,
- AI-native execution,

ale zrobiłbym to **bardziej explicit pod search/snippet**.

### Proponowane meta copy do review

#### PL

```ts
title: "Rafał Łazicki — AI delivery systems dla zespołów produktowych"
description:
  "Pomagam zespołom produktowym skrócić drogę od decyzji i scope'u do wdrożenia. Projektuję workflow, handoffy i internal tooling dla AI-native execution."
socialDescription:
  "AI delivery systems: workflow, handoffy i internal tooling dla zespołów produktowych."
```

#### EN

```ts
title: "Rafał Łazicki — AI delivery systems for product teams"
description:
  "I help product teams shorten the path from decisions and scope to deployment. I design workflows, handoffs, and internal tooling for AI-native execution."
socialDescription:
  "AI delivery systems: workflows, handoffs, and internal tooling for product teams."
```

### Dlaczego to polecam

- dalej brzmi jak obecna strona, a nie jak pivot na nowy positioning
- dodaje bardziej explicit category signal (`AI delivery systems`)
- zostawia founder-led framing zamiast zamieniać stronę w generyczny “AI agency” page

### Plik do zmiany

- `src/data/personal-home.ts`

## Decision C — czy dodać definicyjne zdanie w hero?

### Problem

Strona ma dobry narrative, ale brakuje jednego bardzo prostego zdania typu:

- kto to jest,
- dla kogo pracuje,
- jaki outcome daje.

To pomaga i dla snippet clarity, i dla GEO entity extraction.

### Mój recommendation

Tak — dodać **jedno krótkie zdanie definicyjne**, ale bez SEO-filleru.

### Draft do review

#### PL

`Rafał Łazicki projektuje AI-native workflow i handoffy, które skracają drogę od decyzji do wdrożenia.`

#### EN

`Rafał Łazicki designs AI-native workflows and handoffs that shorten the path from decisions to deployment.`

### Gdzie to wstawić

- najlepiej jako pierwsze zdanie `hero.subtitle`
- alternatywnie jako osobny krótki paragraph pod hero

### Plik do zmiany

- `src/data/personal-home.ts`

## Decision D — jaki zakres ma mieć `Person` JSON-LD?

### Minimal version

```json
{
  "@type": "Person",
  "name": "Rafał Łazicki",
  "url": "https://awesomeworks.ai/en/",
  "jobTitle": "Founder, AwesomeWorks",
  "sameAs": [
    "https://linkedin.com/in/rlazicki",
    "https://github.com/Raff-dev"
  ]
}
```

### Recommended version

```json
{
  "@type": "Person",
  "name": "Rafał Łazicki",
  "url": "https://awesomeworks.ai/en/",
  "image": "https://awesomeworks.ai/rafal.jpeg",
  "jobTitle": "Founder, AwesomeWorks",
  "sameAs": [
    "https://linkedin.com/in/rlazicki",
    "https://github.com/Raff-dev"
  ],
  "alumniOf": {
    "@type": "CollegeOrUniversity",
    "name": "Warsaw Military University of Technology"
  },
  "knowsAbout": [
    "AI delivery systems",
    "workflow design",
    "handoffs",
    "internal tooling",
    "backend engineering",
    "DevOps"
  ]
}
```

### Mój recommendation

Brałbym **recommended version**, ale tylko na polach, które już są obronione przez visible copy.

### Pliki do zmiany

- `src/layouts/base.astro`
- ewentualnie `src/data/personal-home.ts` jeśli chcemy trzymać część entity data w jednym miejscu

## Decision E — czy robić docs alignment w tym samym ruchu?

### Current drift

Stare docs nadal mocniej sugerują inny angle niż obecna live strona.

Dotyczy to głównie:

- `docs/content.md`
- `docs/company-landing-guide/03-seo-and-metadata.md`

### Mój recommendation

- **jeśli akceptujesz Decision B:** update docs zrobić od razu przy wdrożeniu meta/copy direction
- **jeśli direction jeszcze się może zmienić:** docs zostawić na follow-up PR

W praktyce:

- safe schema fixes można wdrożyć bez ruszania docs,
- meta / copy / positioning lepiej nie wdrażać bez późniejszego docs sync.

## 3. Rzeczy, których nie proponuję pakować do pierwszego fix PR

1. **Nowe internal routes**
   - `storyHref` istnieje w data layer (`/en/story`, `/pl/story`),
   - ale repo nie ma realnych page files pod te ścieżki,
   - więc to jest osobny scope, nie “quick fix”.

2. **Outcome-proof claims**
   - to wymaga twardych, prawdziwych danych,
   - nie chciałbym tego robić bez osobnego proof pass.

3. **Off-site corroboration**
   - ważne dla GEO,
   - ale to nie jest task do tego repo.

## 4. Mój finalny recommendation

Gdybym miał to domknąć po swojemu, zrobiłbym tak:

1. wdrożyć od razu:
   - `FAQPage`
   - `Organization.sameAs`
   - image dimensions
2. jako główną decyzję przyjąć:
   - `/` -> `/en/`
3. metadata i hero doprecyzować w kierunku:
   - founder-led
   - delivery systems
   - AI-native execution
   - explicit audience = product teams
4. dodać richer-but-safe `Person` JSON-LD
5. docs alignment zrobić zaraz po zatwierdzeniu direction

## 5. Exact review checklist for Rafal

Do zatwierdzenia:

- [ ] Option A czy Option B dla `/` vs `/en/`
- [ ] czy proponowany meta direction jest właściwy
- [ ] czy proponowane drafty `title` / `description` / `socialDescription` są OK
- [ ] czy dodać definicyjne zdanie w hero
- [ ] czy iść w richer `Person` schema
- [ ] czy docs sync robić w tym samym PR co code changes
