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
      filter: (page) => page !== "https://awesomeworks.ai/",
      // Sub-apps build separately and their dist is merged into dist/ in CI,
      // after this sitemap is generated — so their pages must be declared here.
      // (the product lives on its own domain odbiera.ai — it now
      // publishes its own sitemap, so it's no longer declared here.)
      customPages: [
        "https://awesomeworks.ai/metyra/",
        "https://awesomeworks.ai/metyra/en/",
        "https://awesomeworks.ai/ask/",
      ],
    }),
  ],
  // The product now lives at odbiera.ai — 301-style redirects preserve the old
  // /awesomebot/* subpath URLs (incl. the legal pages).
  redirects: {
    "/awesomebot": "https://odbiera.ai/",
    "/awesomebot/": "https://odbiera.ai/",
    "/awesomebot/en": "https://odbiera.ai/en/",
    "/awesomebot/en/": "https://odbiera.ai/en/",
    "/awesomebot/regulamin": "https://odbiera.ai/regulamin",
    "/awesomebot/prywatnosc": "https://odbiera.ai/prywatnosc",
    "/awesomebot/podprocesorzy": "https://odbiera.ai/podprocesorzy",
    "/awesomebot/en/terms": "https://odbiera.ai/en/terms",
    "/awesomebot/en/privacy": "https://odbiera.ai/en/privacy",
    "/awesomebot/en/subprocessors": "https://odbiera.ai/en/subprocessors",
  },
  i18n: {
    defaultLocale: "en",
    locales: ["en", "pl"],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },
  vite: {
    build: {
      cssMinify: true,
    },
    server: {
      allowedHosts: [".ts.net"],
    },
  },
});
