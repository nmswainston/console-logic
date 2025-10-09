/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          600: '#00FF88',
          700: '#5CFFBF',
        },
        surface: '#161B22',
        ink: '#F0F6FC',
        amber: '#FFDD57',
        cyan: '#00E5FF',
        'cl-bg': 'var(--cl-bg)',
        'cl-surface': 'var(--cl-surface)',
        'cl-ink': 'var(--cl-ink)',
        'cl-primary': 'var(--cl-primary)',
        'cl-primary-muted': 'var(--cl-primary-muted)',
        'cl-amber': 'var(--cl-amber)',
        'cl-cyan': 'var(--cl-cyan)',
      },
      fontFamily: {
        sans: ['Urbanist', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
}
