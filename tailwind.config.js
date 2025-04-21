/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  important: true,
  theme: {
    extend: {
      colors: {
        background: '#F6F6F6',
        superClear: '#FFFFFF',
        primary: '#4DE686',
        darkPrimary: '#072D2E',
        lightShapes: '#F0F0F0',
        textPrimary: '#000000',
        textSecoundary: '#6C6C6C',
        disabled: '#D9D9D9',
        selection: '#F7C35F',
        selectionBG: '#EA6F39',
        highlight: '#52D3FF',
        accent: '#F0A9F9'
      },
    },
    screens: {
      'sm': '760px', //0
      'small': '1180px', // 1
    },
  },
  plugins: [],
}

