/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: "#F1ECE3",
        sandstone: "#E1D8CA",
        charcoal: "#1D1C19",
        terracotta: "#A65338",
        umber: "#755644",
        olive: "#74705E",
      },
      fontFamily: {
        sans: ["'DM Sans'", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        display: ["'Manrope'", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        serif: ["'Instrument Serif'", "Georgia", "serif"],
        mono: ["'JetBrains Mono'", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      fontSize: {
        hero: ["clamp(3.5rem, 10vw, 8rem)", { lineHeight: "0.88", letterSpacing: "-0.04em" }],
        chapter: ["clamp(2.5rem, 5vw, 5rem)", { lineHeight: "1.05" }],
        project: ["clamp(1.75rem, 3.5vw, 3.25rem)", { lineHeight: "1.08" }],
        section: ["clamp(1.25rem, 2.5vw, 2rem)", { lineHeight: "1.15" }],
      },
      letterSpacing: {
        tighter: "-0.04em",
        tight: "-0.02em",
        widest: "0.2em",
        extreme: "0.35em",
      },
      transitionTimingFunction: {
        'brutal': 'cubic-bezier(0.16, 1, 0.3, 1)',
      }
    },
  },
  plugins: [],
}
