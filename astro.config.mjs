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
      // (AwesomeBot moved to its own subdomain awesomebot.awesomeworks.ai — it now
      // publishes its own sitemap, so it's no longer declared here.)
      customPages: [
        "https://awesomeworks.ai/metyra/",
        "https://awesomeworks.ai/metyra/en/",
        "https://awesomeworks.ai/ask/",
      ],
    }),
  ],
  // AwesomeBot moved from this subpath to awesomebot.awesomeworks.ai — 301-style
  // redirects preserve the old /awesomebot/* URLs (incl. the legal pages).
  redirects: {
    "/awesomebot": "https://awesomebot.awesomeworks.ai/",
    "/awesomebot/": "https://awesomebot.awesomeworks.ai/",
    "/awesomebot/en": "https://awesomebot.awesomeworks.ai/en/",
    "/awesomebot/en/": "https://awesomebot.awesomeworks.ai/en/",
    "/awesomebot/regulamin": "https://awesomebot.awesomeworks.ai/regulamin",
    "/awesomebot/prywatnosc": "https://awesomebot.awesomeworks.ai/prywatnosc",
    "/awesomebot/podprocesorzy": "https://awesomebot.awesomeworks.ai/podprocesorzy",
    "/awesomebot/en/terms": "https://awesomebot.awesomeworks.ai/en/terms",
    "/awesomebot/en/privacy": "https://awesomebot.awesomeworks.ai/en/privacy",
    "/awesomebot/en/subprocessors": "https://awesomebot.awesomeworks.ai/en/subprocessors",
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
