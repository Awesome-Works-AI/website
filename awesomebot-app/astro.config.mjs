import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// AwesomeBot is a sub-app of awesomeworks.ai, deployed under /awesomebot/.
// Output gets merged into the parent website's dist/ during CI.
export default defineConfig({
  site: 'https://awesomeworks.ai',
  base: '/awesomebot',
  output: 'static',
  trailingSlash: 'ignore',
  i18n: {
    defaultLocale: 'pl',
    locales: ['pl', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
