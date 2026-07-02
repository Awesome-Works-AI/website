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
      customPages: [
        "https://awesomeworks.ai/awesomebot/",
        "https://awesomeworks.ai/awesomebot/en/",
        "https://awesomeworks.ai/metyra/",
        "https://awesomeworks.ai/metyra/en/",
        "https://awesomeworks.ai/ask/",
      ],
    }),
  ],
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
