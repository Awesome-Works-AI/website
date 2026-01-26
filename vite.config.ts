import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Generate 404.html for GitHub Pages SPA support
    rollupOptions: {
      input: {
        main: './index.html',
      },
    },
  },
})
