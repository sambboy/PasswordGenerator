/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: "#ffff",
      black: "#00000",
      green: '#a3ffae',
      yellow: '#f8cb63',
      orange: '#fb7a56',
      red: '#f74b4b',
      gray: {
        dark: '#e7e6eb',
        darker: '#807c92',
      },
      mainBg: {
        dark: '#24232b',
        darker: '#131219',
      }
    },
    fontFamily: {
      'jetBrains': ['JetBrains Mono', 'monospace'],
    }
  },
  plugins: [],
}

