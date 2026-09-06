/** @type {import('tailwindcss').Config} */
// Brand family tokens (shared with odbiera.ai): electric blue on offwhite,
// navy ink, band tints for diagonal stripes. One palette for every page.
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        offwhite: "#F6F8FF",
        ink: "#010933",
        muted: "#4A5478",
        primary: {
          DEFAULT: "#005BFC",
          bright: "#3B82FF",
          deep: "#0046C7",
        },
        dark: "#010933",
        band: {
          DEFAULT: "#E7EEFF",
          strong: "#9DBCFF",
        },
        danger: "#B91C1C",
      },
      fontFamily: {
        sans: ['"Inter Variable"', "Inter", "system-ui", "Segoe UI", "Roboto", "sans-serif"],
        mono: ['"IBM Plex Mono"', "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
    },
  },
  plugins: [],
};
