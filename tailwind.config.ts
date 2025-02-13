import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#1E293B",
        textPrimary: "#F1F5F9",
        primary: "#3B82F6",
        primaryHover: "#2563EB",
        secondary: "#64748B",
        secondaryHover: "#475569",
        border: "#94A3B8",
        error: "#EF4444",
      },
    },
  },
  plugins: [],
} satisfies Config;
