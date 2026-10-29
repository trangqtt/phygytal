/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      "space-grotesk": ["var(--font-spaceGrotesk)"],
    },
    extend: {
      backgroundImage: {
        "body": "url('https://assets.nomion.io/nomion-website/bg-nomion.webp')",
        "body-mobile": "url('https://assets.nomion.io/nomion-website/bg-nomion-mobile.webp')",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-1": "radial-gradient(50% 50% at 50% 50%, #2478FF 0%, rgba(26, 78, 161, 0.00) 100%)",
        "gradient-blue": "radial-gradient(50% 50% at 50% 50%, #1A5AC0 -80%, rgba(26, 78, 162, 0) 100%)",
        "gradient-blue-mobile": "radial-gradient(50% 50% at 50% 50%, #1A5AC0 20%, rgba(26, 78, 162, 0) 100%)",
        "gradient-black": "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.42) 75.13%, #000 100%)",
      },
      colors: {
        "gray-transparent": "rgba(0, 20, 41, 0.40)",
        "gray-transparent-2": "rgba(0, 20, 41, 0.65)",
        "opacity-white": "rgba(255, 255, 255, 0.1)",
        "opacity-white-hover": "rgba(255, 255, 255, 0.2)"
      },
      borderRadius: {
        '6xl': '104px',
        '4xl': '35px'
      },
      boxShadow: {
        'white-alpha': '0px 2.85714px 15.71429px -8.57143px #FFF inset',
      },
      backdropBlur: {
        '1.5xl': '30px',
      },
      spacing: {
        '55': '220px',
        '86': '344px',
        '112.5': '450px'
      },
      aspectRatio: {
        'mobile': '9 / 16',
      },
    },
    colors: {
      'black-alpha': 'rgba(0, 0, 0, 0.5)',
      'red-alpha': 'rgba(255, 17, 60, 0.3)',
      white: "#F0F0F0",
      black: "#000000",
      darkgrey: "#454545",
      lightgrey: "#BFBFBF",
      lesslightgrey: "#595959",
      semiblack: "#1F1F1F",
      neutral: "#d9d9d9",
      'red':"#ff113c",
      'N9':'#262626',
    },
  },
  plugins: [],
};
