# ask-app — landing only

Sub-app deployed under `awesomeworks.ai/ask/`.

This is the marketing landing only (ported from `repos/ask/landing/`). The full Ask
application (backend, frontend, KSeF integration) is **not** included here and remains
offline.

## URL layout

- `awesomeworks.ai/ask/` — Ask landing PL (default)
- `awesomeworks.ai/ask/privacy` — Polityka prywatności
- `awesomeworks.ai/ask/terms` — Regulamin

## Local dev

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Output lands in `dist/`, which the parent `deploy.yml` merges into the root site's
`dist/ask/`.
