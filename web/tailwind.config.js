/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#127DA1',
          light: '#EBF5F8',
        },
        secondary: '#4DD9C0',
        success: '#1FAD7D',
        warning: '#F8A007',
        danger: '#FF3636',
        eligible: '#2BAE66',
        page: '#EEF2F6',
        screen: '#F2F2F7',
        drawer: {
          bg: '#141E29',
          surface: '#1E2D3D',
        },
        score: {
          high: '#22C55E',
          medium: '#F59E0B',
          low: '#EF4444',
        },
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
