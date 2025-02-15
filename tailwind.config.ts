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

        primary: "#27445D",     // color superior
        secondary: "#497D74",   //color intermedio
        accent: "#71BBB2",      // otro color intermedio
        neutral: "#EFE9D5",     // color claro
        "primary-hover": "#1d3347",
      },
    },
  },
  plugins: [],
} satisfies Config;
