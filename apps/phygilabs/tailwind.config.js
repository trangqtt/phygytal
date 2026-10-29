/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      "work-sans": ["work-sans"],
      "space-grotesk": ["var(--font-spaceGrotesk)"],
    },

    extend: {
      maxWidth: {
        content: "675px",
      },
      textColor: {
        secondary: "#7C7C7C",
        primary: "#FCB415",
        blue: "#041e42",
      },
      animation: {
        bounce: "bounce 1s infinite",
      },
      fontSize: {},
      backgroundColor: {
        blue: "#041e42",
        mediumBlue: "rgba(4, 30, 66, 0.9)",
        softBlue: "rgba(4, 30, 66, 0.5)"
      }
    },
    colors: {
      "black-alpha": "rgba(0, 0, 0, 0.5)",
      "red-alpha": "rgba(255, 17, 60, 0.3)",
      white: "#F0F0F0",
      black: "#000000",
      darkgrey: "#454545",
      lightgrey: "#BFBFBF",
      lesslightgrey: "#595959",
      semiblack: "#1F1F1F",
      neutral: "#d9d9d9",
      red: "#ff113c",
      N9: "#262626",
      blue: "#041e42",
      "opacity-white": "rgba(255, 255, 255, 0.1)",
      "opacity-white-hover": "rgba(255, 255, 255, 0.2)"
    },
  },
  plugins: [],
};
