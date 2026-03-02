# System Design: AwesomeWorks Company Landing Page — Astro Rebuild

**Date:** 2025-01-20
**Author:** AI Architect
**Status:** Ready for implementation
**Stack:** Astro 5 + Tailwind CSS 3.4 + TypeScript
**Deployment:** GitHub Pages (static SSG) via GitHub Actions
**Domain:** awesomeworks.ai (CNAME)

---

## 1. Executive Summary

Rebuild the AwesomeWorks company website from React/Vite to Astro SSG, following patterns established in the CallWise product landing page. The site is dark-mode-first, glassmorphism-styled, bilingual (PL + EN), and targets Lighthouse ≥ 95 with zero framework JS.

**Key decisions:**
- Sections: Hero, Services, Why AI, Process, Founder, Products (CallWise), FAQ, Final CTA, Contact, Footer
- Colors: Indigo (#6366F1) primary + Emerald (#10B981) accent — differentiated from CallWise purple
- Contact form: Native HTML `<form>` submitting to web3forms API (zero JS overhead)
- No React islands needed — entire site is pure Astro components + vanilla JS

---

## 2. Color System

Adapt CallWise's HSL custom property system, replacing purple (270°) with indigo (239°).

### CSS Custom Properties

```css
:root {
  --background: 240 20% 97%;
  --foreground: 240 25% 10%;
  --card: 0 0% 100%;
  --primary: 239 84% 67%;       /* #6366F1 — indigo-500 */
  --primary-hover: 239 84% 60%;
  --secondary: 240 25% 95%;
  --accent: 160 59% 52%;        /* #10B981 — emerald-500 */
  --muted: 240 15% 93%;
  --muted-foreground: 240 10% 45%;
  --border: 240 20% 92%;
  --ring: 239 84% 67%;
  --radius: 0.75rem;
}

.dark {
  --background: 240 30% 4%;     /* #0F0F1A approx */
  --foreground: 240 5% 95%;
  --card: 240 20% 8%;
  --primary: 239 84% 72%;       /* lighter indigo for dark */
  --primary-hover: 239 84% 78%;
  --secondary: 240 15% 12%;
  --accent: 160 59% 57%;        /* lighter emerald for dark */
  --muted: 240 15% 14%;
  --muted-foreground: 240 10% 60%;
  --border: 240 15% 16%;
  --ring: 239 84% 72%;
}
```

### Gradient Replacements

| CallWise pattern | AwesomeWorks replacement |
|---|---|
| `from-purple-600 to-violet-600` | `from-indigo-600 to-indigo-400` |
| `shadow-purple-500/25` | `shadow-indigo-500/25` |
| `.text-gradient` purple hues | `from-indigo-400 via-indigo-300 to-emerald-400` |
| `gradient-mesh` 270° hues | 239° (indigo) + 160° (emerald) radial gradients |

### Gradient Mesh Background

```css
.gradient-mesh {
  background-image:
    radial-gradient(at 20% 20%, hsl(239 84% 67% / 0.06) 0px, transparent 60%),
    radial-gradient(at 80% 40%, hsl(160 59% 52% / 0.04) 0px, transparent 60%);
}

.gradient-mesh-strong {
  background-image:
    radial-gradient(at 30% 30%, hsl(239 84% 67% / 0.15) 0px, transparent 50%),
    radial-gradient(at 70% 60%, hsl(160 59% 52% / 0.08) 0px, transparent 50%),
    radial-gradient(at 50% 80%, hsl(239 60% 55% / 0.06) 0px, transparent 50%);
}
```

### Glass Morphism

Identical to CallWise — dark-mode-first:

```css
.glass {
  background: hsl(var(--card) / 0.6);
  backdrop-filter: blur(16px);
  border: 1px solid hsl(var(--border) / 0.5);
}

/* Dark mode glass (default) */
.dark .glass,
.glass-dark {
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(255, 255, 255, 0.06);
}

.glass-subtle {
  background: rgba(255, 255, 255, 0.02);
  border-color: rgba(255, 255, 255, 0.04);
}
```

---

## 3. Typography

**Font:** Inter Variable (self-hosted via `@fontsource-variable/inter`)

| Element | Size | Weight | Line height |
|---|---|---|---|
| H1 (Hero) | `text-4xl sm:text-5xl lg:text-6xl` | 800 | 1.1 |
| H2 (Section) | `text-3xl sm:text-4xl` | 700 | 1.2 |
| H3 (Card) | `text-lg sm:text-xl` | 600 | 1.3 |
| Body | `text-base` (16px) | 400 | 1.6 → `leading-relaxed` |
| Small / Micro | `text-sm` (14px) | 400 | 1.5 |
| CTA button | `text-sm font-semibold` | 600 | — |

---

## 4. Page Structure & Section Order

```
┌─ Nav (fixed, glass, z-50) ──────────────────────┐
│  Logo    Services  Process  About  Products  CTA │
└──────────────────────────────────────────────────┘

┌─ Hero ───────────────────────────────────────────┐
│  H1: "Oszczędź czas i pieniądze dzięki AI"      │
│  Subtitle + 2 CTAs + microcopy                   │
│  gradient-mesh-strong background                  │
└──────────────────────────────────────────────────┘

┌─ Services (Benefits) ────────────────────────────┐
│  H2 + subtitle                                    │
│  4 glass cards in 2×2 grid (icon + title + desc) │
└──────────────────────────────────────────────────┘

┌─ Why AI ─────────────────────────────────────────┐
│  H2 + 4 minimal cards (icon + title + 1-liner)   │
│  2×2 grid, glass-subtle                           │
└──────────────────────────────────────────────────┘

┌─ Process (How We Work) ──────────────────────────┐
│  H2 + 4 numbered steps                           │
│  Horizontal timeline (desktop), vertical (mobile) │
│  Step badge + icon + title + description          │
└──────────────────────────────────────────────────┘

┌─ Founder (About) ────────────────────────────────┐
│  H2 + photo + bio text                           │
│  Split layout: image left, text right             │
└──────────────────────────────────────────────────┘

┌─ Products (CallWise) ────────────────────────────┐
│  H2 + subtitle                                    │
│  Single glass card: logo + tagline + desc + CTA   │
│  Indigo glow effect                               │
└──────────────────────────────────────────────────┘

┌─ FAQ ────────────────────────────────────────────┐
│  H2 + <details> accordion                        │
│  6 questions, glass cards, plus-icon rotation     │
└──────────────────────────────────────────────────┘

┌─ Final CTA ──────────────────────────────────────┐
│  H2 + subtitle + 2 CTAs                          │
│  gradient-mesh-strong background                  │
└──────────────────────────────────────────────────┘

┌─ Contact ────────────────────────────────────────┐
│  H2 + subtitle + email + Calendly link            │
│  Native HTML form (web3forms)                     │
└──────────────────────────────────────────────────┘

┌─ Footer ─────────────────────────────────────────┐
│  3-col: Brand+tagline | Links | Legal            │
│  Bottom bar: copyright                            │
└──────────────────────────────────────────────────┘
```

---

## 5. Component Specifications

### 5.1 Nav (`nav.astro`)

Copy from CallWise, adapt:

```astro
---
import { t, type Locale } from "@/i18n/utils";
interface Props { locale: Locale; }
const { locale } = Astro.props;
const i = t(locale);
---
```

- **Position:** `fixed top-0 z-50 w-full`
- **Glass:** `bg-background/80 backdrop-blur-xl border-b border-white/[0.06]`
- **Desktop links:** Services, Process, About, Products, Contact
- **CTA button:** `bg-gradient-to-r from-indigo-600 to-indigo-400` → scrolls to Contact or Calendly
- **Mobile:** Hamburger → dropdown panel, `backdrop-blur-xl`
- **Language picker:** Flag emoji + locale name, links to `/{otherLocale}/`

### 5.2 Hero (`hero.astro`)

```
┌──────────────────────────────────────────────────┐
│           gradient-mesh-strong bg                 │
│                                                   │
│       Oszczędź czas i pieniądze                  │
│       dzięki AI                    ← text-gradient│
│                                                   │
│  Zautomatyzuj rutynowe zadania, obsługuj         │
│  klientów 24/7 i skaluj biznes bez zatrudniania. │
│                                                   │
│  [Bezpłatna konsultacja]  [Zobacz korzyści]      │
│   Odpowiedź w 24h · Bez zobowiązań              │
│                                                   │
└──────────────────────────────────────────────────┘
```

- **Padding:** `pt-32 pb-20 sm:pt-40 sm:pb-28`
- **H1:** 2 lines. Line 1 plain, line 2 `.text-gradient` (indigo→emerald)
- **Subtitle:** `text-lg text-muted-foreground max-w-2xl mx-auto`
- **Primary CTA:** gradient button → scrolls to `#contact` section
- **Secondary CTA:** ghost button → scrolls to `#services`
- **Microcopy:** `text-xs text-muted-foreground` under buttons

### 5.3 Services (`services.astro`)

Reuses CallWise `benefits.astro` grid pattern.

```
grid gap-6 sm:grid-cols-2
```

4 cards, each:
```html
<div class="animate-on-scroll glass rounded-2xl p-6 transition-all hover:border-primary/20"
     style={`transition-delay: ${idx * 80}ms`}>
  <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
    <!-- Inline SVG icon -->
  </div>
  <h3 class="mb-2 text-lg font-semibold text-foreground">{card.title}</h3>
  <p class="text-sm leading-relaxed text-muted-foreground">{card.description}</p>
</div>
```

**Cards from content.md:**
1. Znajdź ukryte oszczędności (Search icon)
2. Obsługuj klientów 24/7 (MessageCircle icon)
3. Uwolnij czas zespołu (Clock icon)
4. Koniec z powtarzalną pracą (Zap icon)

### 5.4 Why AI (`why-ai.astro`)

Similar grid pattern but more compact — 4 cards, minimal:

```html
<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
  <div class="glass-subtle rounded-xl p-5 text-center animate-on-scroll">
    <div class="mb-3 text-3xl">⏱️</div>
    <h3 class="mb-1 text-base font-semibold">{item.title}</h3>
    <p class="text-xs text-muted-foreground">{item.description}</p>
  </div>
</div>
```

**Items from content.md:**
1. Oszczędność czasu
2. Redukcja kosztów
3. Skalowalność
4. Jakość

### 5.5 Process (`process.astro`)

Copy CallWise `how-it-works.astro` pattern — 4 steps.

Desktop: horizontal timeline with dashed connecting line.
Mobile: vertical stack.

Each step:
```html
<div class="flex flex-col items-center text-center animate-on-scroll">
  <span class="rounded-full bg-primary/10 px-3 py-0.5 text-xs font-semibold text-primary uppercase">
    Krok {step.number}
  </span>
  <div class="mt-3 flex h-14 w-14 items-center justify-center rounded-full border border-primary/20 bg-primary/5">
    <!-- Icon SVG -->
  </div>
  <h3 class="mt-3 text-lg font-semibold">{step.title}</h3>
  <p class="mt-1 text-sm text-muted-foreground max-w-xs">{step.description}</p>
</div>
```

**Steps from content.md:**
1. Rozmowa — "Poznajemy Twój biznes i wyzwania. Bez zobowiązań."
2. Propozycja — "Przygotowujemy rozwiązanie szyte na miarę z jasną wyceną."
3. Realizacja — "Budujemy, testujemy, wdrażamy. Jesteś na bieżąco."
4. Wsparcie — "Po wdrożeniu nie zostawiamy Cię samego."

### 5.6 Founder (`founder.astro`)

Split layout — replaces the generic "Team" section with a personal founder section.

```
┌──────────────────────────────────────────────────┐
│  ┌──────────┐  ┌───────────────────────────────┐ │
│  │          │  │ H2: Founder                   │ │
│  │  Photo   │  │                               │ │
│  │  (round) │  │ "Cześć! Jestem założycielem   │ │
│  │          │  │  Awesome Works AI."            │ │
│  │          │  │                               │ │
│  │          │  │ Experience paragraph           │ │
│  │          │  │ Description paragraph          │ │
│  │          │  │                               │ │
│  │          │  │ ~ Rafał Łazicki               │ │
│  └──────────┘  └───────────────────────────────┘ │
└──────────────────────────────────────────────────┘
```

- Photo: `public/filip.jpeg` (existing asset, rename to `rafal.jpeg` or keep)
- Layout: `grid md:grid-cols-[280px_1fr] gap-8 items-center`
- Photo styling: `rounded-2xl border-2 border-white/[0.06] object-cover`
- Signature: `text-muted-foreground italic`

### 5.7 Products (`products.astro`)

Glass card with CallWise branding — centered, single card.

```html
<section id="products" class="py-20 sm:py-28">
  <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
    <h2 class="text-center text-3xl sm:text-4xl font-bold">{i.products.title}</h2>
    <p class="mt-3 text-center text-muted-foreground">{i.products.subtitle}</p>

    <div class="mx-auto mt-12 max-w-lg">
      <div class="glass rounded-2xl p-8 text-center relative overflow-hidden
                  shadow-[0_0_60px_-12px_hsl(239_84%_67%/0.3)]">
        <!-- CallWise logo SVG -->
        <div class="mb-4">...</div>
        <p class="text-lg font-semibold text-gradient">{i.products.callwise.tagline}</p>
        <p class="mt-3 text-sm text-muted-foreground leading-relaxed">
          {i.products.callwise.description}
        </p>
        <a href="https://callwise.awesomeworks.ai"
           class="mt-6 inline-flex items-center gap-2 rounded-full
                  bg-gradient-to-r from-indigo-600 to-indigo-400
                  px-6 py-2.5 text-sm font-semibold text-white
                  shadow-lg shadow-indigo-500/25
                  transition-all hover:brightness-110">
          {i.products.callwise.cta}
          <svg>→</svg>
        </a>
        <p class="mt-3 text-xs text-muted-foreground">{i.products.callwise.microcopy}</p>
      </div>
    </div>
  </div>
</section>
```

### 5.8 FAQ (`faq.astro`)

Copy CallWise pattern exactly — `<details>` with glassmorphism.

```html
<div class="mx-auto max-w-3xl space-y-3">
  {i.faq.items.map((item) => (
    <details class="group glass rounded-xl">
      <summary class="flex cursor-pointer items-center justify-between p-5
                      text-sm font-semibold text-foreground">
        {item.q}
        <span class="ml-4 flex h-6 w-6 items-center justify-center rounded-full
                     bg-primary/10 text-primary transition-transform
                     group-open:rotate-45">+</span>
      </summary>
      <div class="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">
        {item.a}
      </div>
    </details>
  ))}
</div>
```

**FAQ items (to add to i18n):**

| PL | EN |
|---|---|
| Na jakie projekty się specjalizujecie? | What types of projects do you specialize in? |
| Ile kosztuje typowy projekt? | How much does a typical project cost? |
| Jak długo trwa realizacja? | How long does a project take? |
| Czy oferujecie wsparcie po wdrożeniu? | Do you offer post-launch support? |
| Jakie technologie używacie? | What technologies do you use? |
| Jak zacząć współpracę? | How do I get started? |

**Answers should follow the copywriting guide:** concrete numbers, widełki, end with CTA.

### 5.9 Final CTA (`final-cta.astro`)

Copy CallWise pattern — gradient mesh strong background, centered.

```html
<section class="relative py-20 sm:py-28 overflow-hidden">
  <div class="absolute inset-0 gradient-mesh-strong"></div>
  <div class="relative mx-auto max-w-3xl px-4 text-center">
    <h2 class="text-3xl sm:text-4xl font-bold">{i.final_cta.title}</h2>
    <p class="mt-4 text-lg text-muted-foreground">{i.final_cta.subtitle}</p>
    <div class="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
      <a href="#contact" class="...gradient-button...">{i.final_cta.cta_primary}</a>
      <a href="https://calendly.com/hello-awesomeworks/30min"
         class="...ghost-button...">{i.final_cta.cta_secondary}</a>
    </div>
  </div>
</section>
```

**Content:**
- PL: "Ile możesz zaoszczędzić?" / "Porozmawiajmy o Twoich procesach..."
- EN: "How much can you save?" / "Let's talk about your processes..."

### 5.10 Contact (`contact.astro`)

```
┌──────────────────────────────────────────────────┐
│  H2: Kontakt                                      │
│  Subtitle                                         │
│                                                    │
│  ┌─ Info ──────────┐  ┌─ Form ─────────────────┐ │
│  │ ✉ Email link    │  │ Name                    │ │
│  │ 📅 Calendly link│  │ Email                   │ │
│  │                  │  │ Message                 │ │
│  │ Testimonial      │  │ [Submit]                │ │
│  └──────────────────┘  └────────────────────────┘ │
└──────────────────────────────────────────────────┘
```

- **Layout:** `grid md:grid-cols-2 gap-8`
- **Form:** Native `<form action="https://api.web3forms.com/submit" method="POST">`
  - Hidden input: `access_key = 96db43d4-48ed-482a-9186-a1527a1b7833`
  - Hidden input: `redirect = /en/` (or `/pl/`)
  - Fields: name, email, message — all required, native browser validation
  - Submit button: gradient, full-width
- **Zero JavaScript** — form submits via standard POST, web3forms handles redirect
- **Email:** `hello@awesomeworks.ai` — `<a href="mailto:...">`
- **Calendly:** `https://calendly.com/hello-awesomeworks/30min` — external link

### 5.11 Footer (`footer.astro`)

3-column grid (simpler than CallWise 4-col — fewer pages):

| Brand | Navigation | Legal |
|---|---|---|
| Logo + tagline | Services, Process, About, Products, Contact | Privacy Policy, Terms |
| Social links | | |

Bottom bar: `© 2026 Awesome Works AI. All rights reserved.`

---

## 6. File Architecture

```
src/
├── components/
│   ├── nav.astro
│   ├── hero.astro
│   ├── services.astro
│   ├── why-ai.astro
│   ├── process.astro
│   ├── founder.astro
│   ├── products.astro
│   ├── faq.astro
│   ├── final-cta.astro
│   ├── contact.astro
│   ├── footer.astro
│   └── language-picker.astro
├── layouts/
│   ├── base.astro
│   └── legal.astro
├── pages/
│   ├── index.astro            → 302 redirect to /en/
│   ├── en/
│   │   ├── index.astro
│   │   ├── privacy.astro
│   │   └── terms.astro
│   └── pl/
│       ├── index.astro
│       ├── privacy.astro
│       └── terms.astro
├── i18n/
│   ├── utils.ts
│   ├── en.json
│   └── pl.json
├── styles/
│   └── globals.css
└── assets/
    └── (images)
public/
├── CNAME                      → awesomeworks.ai
├── favicon.svg
├── favicon-32x32.png
├── apple-touch-icon.png
├── og-image-en.png
├── og-image-pl.png
├── rafal.jpeg                 → founder photo
├── robots.txt
└── site.webmanifest
```

---

## 7. i18n JSON Structure

```json
{
  "meta": {
    "title": "Awesome Works AI — Więcej czasu, mniej kosztów | Automatyzacja AI",
    "description": "Oszczędź 20+ godzin tygodniowo..."
  },
  "nav": {
    "services": "Korzyści",
    "process": "Jak działamy",
    "about": "O nas",
    "products": "Produkty",
    "contact": "Kontakt",
    "cta": "Porozmawiajmy"
  },
  "hero": {
    "title_line1": "Oszczędź czas i pieniądze",
    "title_line2": "dzięki AI",
    "subtitle": "Zautomatyzuj rutynowe zadania, obsługuj klientów 24/7 i skaluj biznes bez zatrudniania. Konkretne wyniki w tygodniach, nie miesiącach.",
    "cta_primary": "Bezpłatna konsultacja",
    "cta_secondary": "Zobacz korzyści",
    "cta_micro": "Odpowiedź w 24h · Bez zobowiązań"
  },
  "services": {
    "title": "Jakie korzyści zyskasz?",
    "subtitle": "Sprawdź, jak AI może zwiększyć Twoje przychody i zredukować koszty",
    "cards": [
      {
        "icon": "search",
        "title": "Znajdź ukryte oszczędności",
        "description": "Dowiedz się, gdzie Twoja firma traci czas i pieniądze. Otrzymasz mapę procesów do automatyzacji z oszacowaniem ROI — zanim wydasz złotówkę."
      },
      {
        "icon": "message-circle",
        "title": "Obsługuj klientów 24/7",
        "description": "Nie trać leadów przez brak odpowiedzi. Twoi klienci dostaną pomoc natychmiast, o każdej porze — a Twój zespół zajmie się ważniejszymi sprawami."
      },
      {
        "icon": "clock",
        "title": "Uwolnij czas zespołu",
        "description": "Raporty, analizy, zarządzanie danymi — niech AI to robi. Twoi ludzie skupią się na strategii i rozwoju, nie na żmudnych zadaniach."
      },
      {
        "icon": "zap",
        "title": "Koniec z powtarzalną pracą",
        "description": "Dokumenty, maile, wprowadzanie danych — wszystko dzieje się automatycznie. Zero błędów, zero nudnych zadań, więcej czasu na to, co ważne."
      }
    ]
  },
  "why_ai": {
    "title": "Dlaczego AI?",
    "items": [
      { "emoji": "⏱️", "title": "Oszczędność czasu", "description": "Automatyzuj powtarzalne zadania i skup się na tym, co naprawdę ważne." },
      { "emoji": "💰", "title": "Redukcja kosztów", "description": "AI pracuje 24/7 bez urlopów, zwolnień i nadgodzin." },
      { "emoji": "📈", "title": "Skalowalność", "description": "Obsłuż 10x więcej klientów bez zatrudniania 10x więcej ludzi." },
      { "emoji": "✅", "title": "Jakość", "description": "AI nie ma gorszych dni. Stała, przewidywalna jakość." }
    ]
  },
  "process": {
    "title": "Jak działamy",
    "steps": [
      { "number": "1", "title": "Rozmowa", "description": "Poznajemy Twój biznes i wyzwania. Bez zobowiązań." },
      { "number": "2", "title": "Propozycja", "description": "Przygotowujemy rozwiązanie szyte na miarę z jasną wyceną." },
      { "number": "3", "title": "Realizacja", "description": "Budujemy, testujemy, wdrażamy. Jesteś na bieżąco." },
      { "number": "4", "title": "Wsparcie", "description": "Po wdrożeniu nie zostawiamy Cię samego." }
    ]
  },
  "founder": {
    "title": "Founder",
    "intro": "Cześć! Jestem założycielem Awesome Works AI.",
    "experience": "Od 6 lat działam w branży technologicznej, a od ponad 3 lat specjalizuję się w Generative AI.",
    "description": "Tworzę systemy, które usprawniają pracę firm — automatyzują rutynowe zadania, zwiększają efektywność i redukują koszty operacyjne.",
    "signature": "~ Rafał Łazicki"
  },
  "products": {
    "title": "Nasze produkty",
    "subtitle": "Gotowe rozwiązania, które możesz wdrożyć od razu",
    "callwise": {
      "tagline": "Każda rozmowa oceniona. Każdy handlowiec lepszy.",
      "description": "AI analizuje 100% rozmów sprzedażowych i pokazuje, co odróżnia najlepszych od reszty. Twój zespół uczy się szybciej, zamyka więcej deali.",
      "cta": "Wypróbuj za darmo",
      "microcopy": "5 rozmów za darmo · Bez karty"
    }
  },
  "faq": {
    "title": "Najczęstsze pytania",
    "items": [
      {
        "q": "Na jakie projekty się specjalizujecie?",
        "a": "Specjalizujemy się w rozwiązaniach AI i automatyzacji: chatboty, analiza rozmów, automatyzacja procesów, systemy rekomendacji. Jeśli Twój problem można rozwiązać z AI — porozmawiajmy."
      },
      {
        "q": "Ile kosztuje typowy projekt?",
        "a": "Od 15 000 zł za proste automatyzacje do 150 000+ zł za platformy enterprise. Dokładną wycenę dostajesz po bezpłatnej konsultacji discovery — zwykle w ciągu 5 dni roboczych."
      },
      {
        "q": "Jak długo trwa realizacja?",
        "a": "MVP w 4-6 tygodni, pełny produkt w 2-4 miesiące. Zależy od złożoności — konkretny harmonogram ustalamy po discovery call."
      },
      {
        "q": "Czy oferujecie wsparcie po wdrożeniu?",
        "a": "Tak. Po launchu oferujemy pakiety maintenance i rozwoju. Nie zostawiamy klientów po wdrożeniu."
      },
      {
        "q": "Jakie technologie używacie?",
        "a": "Python, TypeScript, React, Astro, OpenAI, Anthropic, LangChain, RAG pipelines, cloud-native (AWS/GCP). Dobieramy stack do potrzeb projektu."
      },
      {
        "q": "Jak zacząć współpracę?",
        "a": "Umów bezpłatną konsultację przez formularz lub Calendly. Na 30-minutowej rozmowie poznamy Twoje potrzeby i zaproponujemy kierunek. Bez zobowiązań."
      }
    ]
  },
  "final_cta": {
    "title": "Ile możesz zaoszczędzić?",
    "subtitle": "Porozmawiajmy o Twoich procesach. Pokażemy konkretne liczby — ile czasu i pieniędzy możesz odzyskać. Bez zobowiązań.",
    "cta_primary": "Sprawdź za darmo",
    "cta_secondary": "Umów spotkanie"
  },
  "contact": {
    "title": "Kontakt",
    "subtitle": "Napisz do nas lub umów się na rozmowę",
    "email_label": "Email",
    "calendly_label": "Umów spotkanie w kalendarzu",
    "testimonial": "Pierwsza konsultacja jest bezpłatna. Porozmawiajmy o Twoich potrzebach bez zobowiązań.",
    "form_title": "Zostaw do siebie kontakt – odezwiemy się w 24h!",
    "form_name": "Imię",
    "form_email": "Email",
    "form_message": "Wiadomość",
    "form_submit": "Wyślij wiadomość",
    "form_success": "Dzięki! Odezwiemy się wkrótce."
  },
  "footer": {
    "tagline": "Więcej czasu, mniej kosztów, lepsze wyniki",
    "nav_links": {
      "services": "Korzyści",
      "process": "Jak działamy",
      "about": "O nas",
      "products": "Produkty",
      "contact": "Kontakt"
    },
    "legal_links": {
      "privacy": "Polityka prywatności",
      "terms": "Regulamin"
    },
    "copyright": "© 2026 Awesome Works AI. Wszelkie prawa zastrzeżone."
  }
}
```

English JSON: mirror structure with content from docs/content.md English section.

---

## 8. Astro Configuration

### `astro.config.mjs`

```javascript
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://awesomeworks.ai",
  output: "static",
  compressHTML: true,
  build: {
    inlineStylesheets: "auto",
  },
  integrations: [
    tailwind(),
    sitemap({
      i18n: {
        defaultLocale: "en",
        locales: { en: "en", pl: "pl" },
      },
    }),
  ],
  i18n: {
    defaultLocale: "en",
    locales: ["en", "pl"],
    routing: { prefixDefaultLocale: true },
  },
  vite: {
    build: {
      cssMinify: "lightningcss",
    },
  },
});
```

### `tailwind.config.mjs`

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: "hsl(var(--primary))",
        "primary-hover": "hsl(var(--primary-hover))",
        secondary: "hsl(var(--secondary))",
        accent: "hsl(var(--accent))",
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        card: "hsl(var(--card))",
        border: "hsl(var(--border))",
        ring: "hsl(var(--ring))",
      },
      fontFamily: {
        sans: ["Inter Variable", "Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "var(--radius)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
```

### `package.json` (dependencies)

```json
{
  "name": "awesomeworks-website",
  "type": "module",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview"
  },
  "dependencies": {
    "astro": "^5.3.0",
    "@astrojs/tailwind": "^6.0.0",
    "@astrojs/sitemap": "^4.0.0",
    "@fontsource-variable/inter": "^5.0.0",
    "tailwindcss": "^3.4.0"
  }
}
```

**No React needed.** All components are pure `.astro`.

---

## 9. GitHub Pages Deployment

### `.github/workflows/deploy.yml`

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install dependencies
        run: npm install

      - name: Build Astro
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: dist/

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### CNAME

Place `CNAME` file in `public/` with content `awesomeworks.ai` — Astro copies it to `dist/`.

---

## 10. SEO & Structured Data

### JSON-LD: Organization

```typescript
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "AwesomeWorks",
  url: "https://awesomeworks.ai",
  logo: "https://awesomeworks.ai/logo.png",
  description: i.meta.description,
  foundingDate: "2021",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Warsaw",
    addressCountry: "PL",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: "hello@awesomeworks.ai",
    availableLanguage: ["English", "Polish"],
  },
};
```

### JSON-LD: FAQPage

Generated from `i.faq.items` — identical to CallWise pattern.

### Meta tags

- Title: `{i.meta.title}` (max 60 chars)
- Description: `{i.meta.description}` (max 155 chars)
- Canonical + hreflang (en, pl, x-default=en)
- OG image per locale: `/og-image-en.png`, `/og-image-pl.png`

---

## 11. Animations

Identical to CallWise — IntersectionObserver in `base.astro` `<script>`:

```javascript
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
);
document.querySelectorAll(".animate-on-scroll").forEach((el) => observer.observe(el));
```

CSS:
```css
.animate-on-scroll {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}
.animate-on-scroll.visible {
  opacity: 1;
  transform: translateY(0);
}
```

Staggered delay via inline `style="transition-delay: ${idx * 80}ms"` on grid cards.

---

## 12. Responsive Breakpoints

| Viewport | Breakpoint | Layout |
|---|---|---|
| Mobile | < 768px | Single column, hamburger nav, `px-4` |
| Tablet | 768px–1024px | 2 columns grid, desktop nav |
| Desktop | > 1024px | Full layout, 3+ columns where applicable |

All sections use `mx-auto max-w-6xl px-4 sm:px-6 lg:px-8` for consistent containment.

---

## 13. Performance Budget

| Metric | Target |
|---|---|
| Lighthouse Performance | ≥ 95 |
| LCP | < 1.5s |
| CLS | 0.00 |
| Total JS | < 2 kB (vanilla only) |
| Total CSS | < 15 kB (Tailwind purged) |
| HTML per page | < 30 kB |

---

## 14. Migration Checklist

1. [ ] Initialize Astro project (`npm create astro@latest`)
2. [ ] Copy `globals.css` from CallWise, replace purple→indigo colors
3. [ ] Copy `tailwind.config.mjs`, update colors
4. [ ] Copy `i18n/utils.ts` from CallWise
5. [ ] Create `pl.json` and `en.json` per Section 7 structure
6. [ ] Create `base.astro` layout (SEO, fonts, OG, scroll observer)
7. [ ] Build each component in order: nav → hero → services → why-ai → process → founder → products → faq → final-cta → contact → footer
8. [ ] Create page compositions (`/en/index.astro`, `/pl/index.astro`)
9. [ ] Create redirect (`/index.astro` → 302 → `/en/`)
10. [ ] Copy `CNAME` to `public/`
11. [ ] Copy/create favicon assets
12. [ ] Add `robots.txt` and verify sitemap generation
13. [ ] Create `.github/workflows/deploy.yml`
14. [ ] Build & test locally (`npm run build && npm run preview`)
15. [ ] Lighthouse audit (target ≥ 95)
16. [ ] Deploy to GH Pages

---

## 15. What's NOT Included (Future Additions)

- **Case Studies / Portfolio** — add when real projects can be showcased
- **Testimonials** — add when client quotes are available
- **Blog** — separate Astro content collection, future phase
- **Cookie consent** — add if analytics are implemented
- **Analytics** — lazy-loaded after first interaction when ready
- **Privacy Policy / Terms** — legal pages exist in structure, content TBD
