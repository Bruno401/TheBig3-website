import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          white:          '#FFFFFF',
          paper:          '#FAF8FC',
          border:         '#EAE3F1',
          ink:            '#120E1E',
          purple:         '#7562AB',
          'purple-light': '#A392C6',
          lavender:       '#E4D8EB',
          'ink-muted':    '#6B6678',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans:    ['var(--font-primary)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono:    ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      fontSize: {
        'display-xl': ['clamp(3rem, 8vw, 6rem)',     { lineHeight: '1.0', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(2rem, 5vw, 4rem)',     { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(1.5rem, 3vw, 2.5rem)', { lineHeight: '1.2', letterSpacing: '-0.015em' }],
        'body-xl':    ['1.25rem',                    { lineHeight: '1.7' }],
        'body-lg':    ['1.125rem',                   { lineHeight: '1.7' }],
        'body-md':    ['1rem',                       { lineHeight: '1.7' }],
        'body-sm':    ['0.875rem',                   { lineHeight: '1.5' }],
        'label':      ['0.75rem',                    { lineHeight: '1.4', letterSpacing: '0.08em' }],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1.5rem',
          md: '2rem',
          lg: '4rem',
          xl: '6rem',
        },
      },
    },
  },
  plugins: [],
}

export default config
