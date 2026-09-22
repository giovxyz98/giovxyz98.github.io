/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html', './progetti/*.html', './assets/app.js'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#05080d',
          900: '#070c14',
          800: '#0b121c',
          700: '#101a26',
          600: '#16222f',
        },
        mint: {
          200: '#c8ffe9',
          300: '#8ff5cf',
          400: '#4be8b0',
          500: '#2fe6b4',
          600: '#1fb98f',
          700: '#158a6c',
        },
        lime: {
          300: '#e4ff9e',
          400: '#c8f76a',
          500: '#a8e83e',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(75,232,176,0.15), 0 0 40px -8px rgba(47,230,180,0.35)',
        'glow-lg': '0 0 0 1px rgba(75,232,176,0.18), 0 20px 70px -15px rgba(47,230,180,0.45)',
        card: '0 1px 0 0 rgba(255,255,255,0.04) inset, 0 20px 50px -20px rgba(0,0,0,0.6)',
      },
      backgroundImage: {
        'grid-fade': 'linear-gradient(to bottom, transparent, #05080d 90%)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: 0.55, transform: 'scale(1)' },
          '50%': { opacity: 1, transform: 'scale(1.04)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'fade-up': {
          '0%': { opacity: 0, transform: 'translateY(24px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
        marquee: 'marquee 28s linear infinite',
        blink: 'blink 1s step-end infinite',
      },
    },
  },
  plugins: [],
};
