/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#00A9FF',
        'secondary': '#89CFF0',
        'accent': '#A0E9FF',
        'light-bg': '#CDF5FD',
        'dark-bg': '#080808',
        'dark-surface': '#121212',
        'light-text': '#000000',
        'dark-text': '#FFFFFF',
      }
    },
  },
  plugins: [],
}
