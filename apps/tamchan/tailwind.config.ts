import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "lost-type": ["var(--font-lostType)"],
        "beau-sans": ["var(--font-btBeausans)"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-linear":
          "linear-gradient(270deg, #000 0%, rgba(0, 0, 0, 0.00) 100%)",
      },
      colors: {
        secondary: "#ECE7D6",
        primary: "#DFB82E",
        blue: "#041e42",
        neutral: "#8C8C8C",
      },
    },
  },
  plugins: [],
};
export default config;
