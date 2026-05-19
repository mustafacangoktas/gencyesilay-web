import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', 'node_modules/preline/dist/*.js'],
  theme: {
    extend: {
      colors: {
        // Deep, professional emerald — "Corporate Trust"
        yesilay: {
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981',
          600: '#059669', // primary brand emerald
          700: '#047857', // hover / focus
          800: '#065F46',
          900: '#064E3B',
          950: '#022C22',
        },
        kurumsal: {
          // Sophisticated warm greige — never pure white as page bg
          bg: '#F4F5F1',
          'bg-alt': '#EDEEE8',
          surface: '#FFFFFF', // pure white reserved for cards / surfaces
          text: '#475569',
          'text-muted': '#64748B',
          heading: '#0F172A',
          border: '#E5E7EB',
          'border-soft': '#EEF0EC',
        },
      },
      fontFamily: {
        // Geometric sans for UI / body
        sans: ['var(--font-montserrat)', 'Montserrat', 'system-ui', 'sans-serif'],
        // Modern serif for institutional headings
        serif: ['var(--font-noto-serif)', '"Noto Serif"', 'Georgia', 'serif'],
        display: ['var(--font-noto-serif)', '"Noto Serif"', 'Georgia', 'serif'],
      },
      boxShadow: {
        'card-soft': '0 1px 2px rgba(15,23,42,0.04), 0 8px 24px -12px rgba(15,23,42,0.10)',
        'card-lift': '0 2px 4px rgba(15,23,42,0.05), 0 20px 40px -20px rgba(15,23,42,0.18)',
        pill: '0 1px 1px rgba(255,255,255,0.35) inset, 0 6px 16px -6px rgba(5,150,105,0.45), 0 2px 4px rgba(15,23,42,0.10)',
        'pill-dark':
          '0 1px 1px rgba(255,255,255,0.06) inset, 0 8px 18px -8px rgba(0,0,0,0.55), 0 2px 4px rgba(15,23,42,0.22)',
        'focus-glow': '0 0 0 4px rgba(5,150,105,0.14)',
      },
    },
  },
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('preline/plugin'),
  ],
}

export default config
