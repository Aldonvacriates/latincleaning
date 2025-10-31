import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './public/**/*.html',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#a8cde7',
        navy: '#1e293b',
        accent1: '#f48fb1',
        accent2: '#90caf9',
        accent3: '#ffb74d',
      },
      boxShadow: {
        card: '0 6px 18px rgba(2, 6, 23, 0.06)',
      },
      borderRadius: {
        xl: '1rem',
      },
    },
  },
  // Enable Tailwind preflight now that legacy CSS is removed
  // (remove this block entirely to use defaults)
  // corePlugins: { preflight: true },
  plugins: [],
}

export default config
