# Metyra landing

Astro 5 + Tailwind 4 landing dla Metyra. PL primary (`/`), EN secondary (`/en/`).

## Status

Lokalny dev — bez deploymentu. Pre-MVP, discovery phase.

## Stack

- **Astro 5** static site generator
- **Tailwind 4** styling via `@tailwindcss/vite`
- **TypeScript strict**
- **i18n**: built-in Astro i18n, defaultLocale=`pl`, locales=`pl|en`, `prefixDefaultLocale=false`

## Run locally

```bash
cd landing
npm install
npm run dev          # http://localhost:4321
```

## Build & preview

```bash
npm run build        # → dist/
npm run preview      # serve dist/ at http://localhost:4321
npm run check        # astro check (TS + Astro diagnostics)
```

## Struktura

```
landing/
├── astro.config.mjs           # i18n config (pl default, en under /en/)
├── tsconfig.json              # strict + path alias ~/* → src/*
├── public/
│   └── favicon.svg            # m glyph in emerald on navy
└── src/
    ├── styles/global.css      # @theme tokens (ink/emerald/amber palette)
    ├── i18n/
    │   ├── ui.ts              # single source of truth for all copy (PL+EN)
    │   └── utils.ts           # getLangFromUrl, useTranslations, getAltLangPath
    ├── layouts/
    │   └── BaseLayout.astro   # html shell, header, footer
    ├── components/
    │   ├── Header.astro       # sticky nav + lang switch + CTA
    │   ├── FoundingBanner.astro    # pre-MVP "5 founding customers" announcement
    │   ├── Hero.astro              # H1 + 2 CTAs + grid bg
    │   ├── FeatureGrid.astro       # 3×2 feature cards (Mimica pattern)
    │   ├── EnemyFrame.astro        # "Manualny pakiet zarządczy to przeszłość" + 6 enemies
    │   ├── ProductSplit.astro      # text + visual mock split (reusable, 3 visuals)
    │   ├── SuiteSection.astro      # wraps 3 ProductSplits (Board Pack / Q&A / KSeF)
    │   ├── StatsStrip.astro        # 3-column stats
    │   ├── IcpSection.astro        # 4-card ICP (size/stack/persona/industry)
    │   ├── PilotCta.astro          # mid-page founding program CTA
    │   ├── Faq.astro               # 6-question accordion
    │   ├── About.astro             # founder bio
    │   ├── FinalCta.astro          # bottom CTA banner with mailto:
    │   └── Footer.astro            # 3-column footer
    └── pages/
        ├── index.astro        # PL homepage (`/`)
        └── en/index.astro     # EN homepage (`/en/`)
```

## Brand tokens

Zdefiniowane w `src/styles/global.css` via `@theme`:

- **ink-50 … ink-950** — neutralny zimny scale (background + text)
- **emerald-400/500/600/700** — primary accent (CTA, focus, signals)
- **amber-400/500** — emphasis (alerts, KSeF warnings)
- **font-sans / font-display** — Inter / system

Inspiracja palety: dark navy bazowy + emerald accent + amber dla warnings. Świadomie różnicuje się od Mimicy (navy + cyan).

## Dodawanie nowego copy

1. Otwórz `src/i18n/ui.ts`
2. Dodaj klucz w **OBU** lokalizacjach (`pl` i `en`)
3. W komponencie: `import { getLangFromUrl, useTranslations } from "~/i18n/utils"` + `const t = useTranslations(lang)` + `{t("twoj.klucz")}`
4. TS sam ostrzeże o brakujących kluczach (`UiKey` union type)

## Dodawanie nowej strony

1. Stwórz `src/pages/<slug>.astro` (PL) i `src/pages/en/<slug>.astro` (EN)
2. Każda używa `BaseLayout` + komponentów z `src/components/`
3. `getAltLangPath()` w utils zwróci poprawny target dla lang switcher

## Mimica patterns użyte (z `../inspiration/mimica-product/`)

- Single-CTA hero (`05-component-patterns.md` C1)
- Feature card grid 3×2 (C2)
- Product split text+visual (C3)
- Stats strip 3-column (C4)
- CTA banner mid + final (C6)
- Section divider rytmu (C9)
- Enemy framing ("old way vs new") z homepage Mimicy

## Czego nie ma jeszcze

- ❌ Realne customer logos (pre-launch — używamy founding program zamiast)
- ❌ Realne testimonials (post-discovery interviews dodamy)
- ❌ Pricing page (po validation)
- ❌ Resources / blog (po MVP)
- ❌ Calendly embed (na razie `mailto:` final CTA)
- ❌ Cookie banner / GDPR (przed publicznym deploymentem)
- ❌ Analytics (Plausible/Umami po deploymencie)
- ❌ Form handler dla pilota (na razie mailto)
