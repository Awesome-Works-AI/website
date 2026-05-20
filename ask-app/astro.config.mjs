// @ts-check
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

// Ask landing is a sub-app of awesomeworks.ai, deployed under /ask/.
// Output gets merged into the parent website's dist/ during CI.
export default defineConfig({
  site: "https://awesomeworks.ai",
  base: "/ask",
  output: "static",
  compressHTML: true,
  trailingSlash: "ignore",
  build: {
    inlineStylesheets: "auto",
  },
  integrations: [
    tailwind(),
    sitemap(),
  ],
  vite: {
    build: {
      cssMinify: "lightningcss",
    },
  },
});
