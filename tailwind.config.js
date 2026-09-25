/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Prompt', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
        },
        jabb: {
          primary: '#1e293b',
          accent: '#0284c7',
          highlight: '#059669',
          warning: '#f59e0b',
          danger: '#ef4444',
          surface: '#ffffff',
          bg: '#f8fafc',
        }
      },
      boxShadow: {
        'soft': '0 2px 10px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.02)',
        'card': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'highlight': '0 0 0 2px rgba(16, 185, 129, 0.25)',
      }
    },
  },
  plugins: [],
}
