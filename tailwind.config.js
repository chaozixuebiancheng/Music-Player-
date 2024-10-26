/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        float: 'float 4s ease-in-out infinite',
      },
      spacing: {
        '16': '4rem', // 64px
        '112': '28rem'      // 456px
      }
    },
  },
  plugins: [],
}
