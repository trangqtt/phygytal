const { blackA } = require('@radix-ui/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(white 0deg, transparent 180deg)",
      },
      fontFamily: {
        svnPoppins: ['var(--font-svnPoppins)'],
      },
    },
    colors: {
      'black-alpha': 'rgba(0, 0, 0, 0.5)',
      'black-alpha-.3': 'rgba(0, 0, 0, 0.3)',
      'black-alpha-.5': 'rgba(0, 0, 0, 0.5)',
      'black-alpha-.7': 'rgba(0, 0, 0, 0.7)',
      'black-alpha-.8': 'rgba(0, 0, 0, 0.8)',
      white: "#F0F0F0",
      'white-important': "rgba(255, 255, 255, 1) !important",
      black: "#000000",
      darkgrey: "#454545",
      lightgrey: "#BFBFBF",
      lesslightgrey: "#595959",
      semiblack: "#1F1F1F",
      neutral: "#d9d9d9",
      red:'#ff113c',
      'red-light': 'rgba(255, 224, 225, 1)',
      'red-medium': 'rgba(227, 33, 41, 1)',
      'red-bold': '#BD1723',
      'neutral-4': 'rgba(217, 217, 217, 1)',
      'neutral-5': 'rgba(191, 191, 191, 1)',
      'neutral-6': 'rgba(140, 140, 140, 1)',
      ...blackA,
    },
    aspectRatio:{
      '9/16': '9 / 16',
    },
    animation: {
      'rotate': 'rotate 2.5s linear infinite',
      'rotate-1': 'rotate 1s linear infinite',
      'ping': 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
      'bounce': 'bounce 1s infinite',
    },
    keyframes: {
      rotate: {
        '0%': {
          transform: 'rotate(0deg)',
        },
        '100%': {
          transform: 'rotate(360deg)',
        },
      },
      ping: {
        '75%': {
          transform: 'scale(2)',
          opacity: 0
        },
        '100%': {
          transform: 'scale(2)',
          opacity: 0
        }
      },
      bounce: {
        '0%, 100%': {
          transform: 'translateY(-25%)',
          animationTimingFunction: 'cubic-bezier(0.8,0,1,1)'
        },
        '50%': {
          transform: 'none',
          animationTimingFunction: 'cubic-bezier(0,0,0.2,1)'
        }
      }
    }
  },
  plugins: [],
};
