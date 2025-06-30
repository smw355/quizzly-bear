/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom bear-themed colors
        honey: {
          100: '#fef7e7',
          200: '#fcefcf',
          300: '#f9e3a3',
          400: '#f6d477',
          500: '#f2c94c',
          600: '#d4a842',
          700: '#b58936',
          800: '#976a2a',
          900: '#794c1e',
        },
        forest: {
          100: '#f0f4f1',
          200: '#e1e9e3',
          300: '#c3d3c7',
          400: '#a5bdab',
          500: '#87a78f',
          600: '#6d8d75',
          700: '#54735b',
          800: '#3b5941',
          900: '#223f27',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
      },
    },
  },
  plugins: [],
}