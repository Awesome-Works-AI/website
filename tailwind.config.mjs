/** @type {import('tailwindcss').Config} */
// "Blueprint noc" tokens: one dark engineering ground (#070D26), one electric
// accent (#3B82FF, deep #0046C7 reserved for button gradients), text as
// white at fixed opacities. Type: Space Grotesk (display/body) + IBM Plex
// Mono (labels, eyebrows, nav, trust).
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        night: "#070D26",
        primary: {
          DEFAULT: "#3B82FF",
          deep: "#0046C7",
        },
        danger: "#FF6B6B",
      },
      fontFamily: {
        sans: ['"Space Grotesk Variable"', '"Space Grotesk"', "system-ui", "Segoe UI", "Roboto", "sans-serif"],
        mono: ['"IBM Plex Mono"', "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
    },
  },
  plugins: [],
};
