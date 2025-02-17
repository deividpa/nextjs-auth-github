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

        primary: "#0d1b2a",     // color superior
        secondary: "#735751",   //color intermedio
        accent: "#a99985",      // otro color intermedio
        neutral: "#dad2bc",     // color claro
        "primary-hover": "#1d3347",
      },
    },
  },
  plugins: [],
} satisfies Config;
