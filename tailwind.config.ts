import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        galmuri: ["Galmuri9", "sans-serif"],
      },
      dropShadow: {
        custom: "0 4px 4px rgba(0, 0, 0, 0.25)",
      },
    },
  },
  plugins: [],
} satisfies Config;
