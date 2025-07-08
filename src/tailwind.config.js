/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lightBg: '#f9fafb',
        lightSurface: '#ffffff',
        lightText: '#22223b',
        darkBg: '#181926',
        darkSurface: '#23243a',
        darkText: '#f4f4f5',
        primary: '#06b6d4',
        accent: '#a855f7',
        neutral: '#94a3b8',
        success: '#22c55e',
        warning: '#fbbf24',
        danger: '#ef4444',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        heading: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl: '1rem',
      },
      boxShadow: {
        soft: '0 1px 4px 0 rgba(0,0,0,0.04)',
      },
    },
  },
  plugins: [],
};