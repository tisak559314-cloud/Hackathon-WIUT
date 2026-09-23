/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        prophesee: {
          bg: '#080c14',
          dark: '#0c121e',
          card: '#121a2a',
          surface: '#182236',
          border: '#1f2d45',
          blue: '#0693e3',
          lightblue: '#2ea3f2',
          cyan: '#00e5ff',
          neon: '#407ec9',
          amber: '#fcb900',
          orange: '#ff6900',
          emerald: '#00d084',
          textMuted: '#8d9bb0',
          textDim: '#57657d',
        }
      },
      fontFamily: {
        sans: ['Montserrat', 'Open Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'Courier New', 'monospace'],
      },
      keyframes: {
        'marquee': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.05)' },
        },
        'scanline': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        }
      },
      animation: {
        'marquee': 'marquee 35s linear infinite',
        'marquee-reverse': 'marquee-reverse 35s linear infinite',
        'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
        'scanline': 'scanline 3s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
