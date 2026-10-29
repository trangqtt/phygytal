/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        "black-0.1": "rgba(0, 0, 0, 0.1)",
        "black-0.5": "rgba(0, 0, 0, 0.5)",
        "n0": "rgba(255, 255, 255, 1)",
        "n2": "rgba(245, 245, 245, 1)",
        "n3": "rgba(240, 240, 240, 1)",
        "n4": "rgba(217, 217, 217, 1)",
        "n5": "rgba(191, 191, 191, 1)",
        "n6": "rgba(140, 140, 140, 1)",
        "n7": "rgba(89, 89, 89, 1)",
        "n8": "rgba(69, 69, 69, 1)",
        "n9": "rgba(38, 38, 38, 1)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      spacing: {
        "9.5": "38px",
        15: "60px",
        18: "72px",
        20: "80px",
        22: "88px",
        25: "100px",
        45: "180px",
        50: "200px",
        70: "280px",
        "77.5": "310px",
        90: "360px",
        100: "400px",
        114: "455px",
        137: "548px",
        360: "1440px",
      },
      height: {
        "svh-100": "100svh",
      },
      maxWidth: {
        "2xl": "1440px",
      },
      boxShadow: {
        "product-card": "0px 4px 20px 0px rgba(0, 0, 0, 0.1)"
      },
      backgroundImage: {
        "banner-overlay": "linear-gradient(180deg, rgba(0, 0, 0, 0.05) 0%, rgba(0, 0, 0, 0.1) 60.86%, #000000 100%)",
        "full-banner-overlay": "linear-gradient(180deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.6) 19.34%, rgba(0, 0, 0, 0.4) 36.24%, rgba(0, 0, 0, 0.4) 58.09%, #000000 100%)",
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
}