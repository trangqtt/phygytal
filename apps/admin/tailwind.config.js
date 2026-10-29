/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        danger: '#FF2D2E',
        'black-pure-color': '#262626',
        'black-20': 'rgba(0, 0, 0, 0.2)',
        'gray-primary': '#8C8C8C',
        'blue-primary-50': 'rgba(227, 241, 255, 1)',
        'blue-primary-500': 'rgba(0, 128, 255, 1)',
        'blue-icon-edit': 'rgba(100, 178, 255, 1)',
        // primary color
        'primary-1': '#CFE2FC',
        'primary-2': '#90BCF8',
        'primary-3': '#5B9BF4',
        'primary-4': '#2D7FF1',
        'primary-5': '#0F69E6',
        'primary-6': '#0B4DA8',
        'primary-7': '#08387B',
        'primary-8': '#06295A',
        'primary-9': '#041E42',
        'primary-10': '#02152E',
        // danger color
        'danger-1': '#FFD6D7',
        'danger-2': '#FF8A8B',
        'danger-3': '#FF6B6C',
        'danger-4': '#FF4C4D',
        'danger-5': '#FF2D2E',
        'danger-6': '#D32526',
        'danger-7': '#C02223',
        'danger-8': '#AF1F20',
        'danger-9': '#9F1C1D',
        // info color
        'info-1': '#BFD5FF',
        'info-2': '#85AEFF',
        'info-3': '#528CFF',
        'info-4': '#266FFF',
        'info-5': '#0056FF',
        'info-6': '#0049D9',
        'info-7': '#003EB8',
        'info-8': '#00359C',
        'info-9': '#002D85',
        // warning color
        'warning-1': '#FDECC4',
        'warning-2': '#FBDA8B',
        'warning-3': '#F9CB5A',
        'warning-4': '#F8BE2F',
        'warning-5': '#F7B20A',
        'warning-6': '#D49807',
        'warning-7': '#B48106',
        'warning-8': '#996E05',
        'warning-9': '#825E04',
        // success color
        'success-1': '#E2FFE0',
        'success-2': '#C7FFC5',
        'success-3': '#A4FFA1',
        'success-4': '#81FF7E',
        'success-5': '#5EFF5A',
        'success-6': '#55E852',
        'success-7': '#4DD34B',
        'success-8': '#46C044',
        'success-9': '#389A37',
        // neutral color
        'neutral-1': '#FCFCFC',
        'neutral-2': '#F5F5F5',
        'neutral-3': '#F0F0F0',
        'neutral-4': '#D9D9D9',
        'neutral-5': '#BFBFBF',
        'neutral-6': '#8C8C8C',
        'neutral-7': '#595959',
        'neutral-8': '#454545',
        'neutral-9': '#262626',
        'neutral-10': '#1F1F1F',
        'neutral-11': '#111111',
        'neutral-12': '#0A0A0A',
      },
      fontSize: {
        h1: "4rem",
        h2: "3rem",
        h3: "2.5rem",
        h4: "2rem",
        h5: "1.5rem",
        h6: "1.25rem",
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      spacing: {
        75: '300px',
      },
      boxShadow: {
        'gray-lg': '0px 0px 12px 0px rgba(0, 0, 0, 0.06)'
      }
    },
    fontFamily: {
      poppins: ['Poppins', 'sans-serif'],
    },
  },
  plugins: [],
};
