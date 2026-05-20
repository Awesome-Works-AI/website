import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Metyra is a sub-app of awesomeworks.ai, deployed under /metyra/.
// Output gets merged into the parent website's dist/ during CI.
export default defineConfig({
  site: 'https://awesomeworks.ai',
  base: '/metyra',
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
    server: {
      // Dev only — proxy /api/poc → local FastAPI on :8100.
      // In production the frontend calls PUBLIC_METYRA_API_BASE directly (set via env).
      proxy: {
        '/api/poc': {
          target: 'http://127.0.0.1:8100',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/poc/, '/api'),
          configure: (proxy) => {
            proxy.on('proxyRes', (proxyRes) => {
              proxyRes.headers['cache-control'] = 'no-cache, no-transform';
            });
          },
        },
      },
    },
  },
});
