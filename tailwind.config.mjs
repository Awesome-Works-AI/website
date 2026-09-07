/** @type {import('tailwindcss').Config} */
// Brutal-block tokens: warm paper ground, near-black ink, one cobalt accent,
// white for raised blocks. Four colors, no tints, no gradients.
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        offwhite: "#F2F2EE",
        ink: "#0A0A0A",
        cobalt: "#0038FF",
      },
      fontFamily: {
        sans: ["Archivo", "system-ui", "Segoe UI", "Roboto", "sans-serif"],
        display: ['"Archivo Black"', "Archivo", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
