/** @type {import('tailwindcss').Config} */
import { Config } from "tailwindcss";

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
      animation: {
        "left-right": "animationLeftRight 2s ease-in-out infinite",
        "right-left": "animationRightLeft 2s ease-in-out infinite",
        "left-right-3s": "animationLeftRight 3s ease-in-out infinite",
        "right-left-4s": "animationLeftRight 4s ease-in-out infinite",
      },
      screens: {
        'sm': '760px', //0
        'small': '1180px', // 1
      },
      keyframes: {
        animationLeftRight: {
          "0%": { transform: "translateX(0px)" },
          "50%": { transform: "translateX(1000px)" },
          "100%": { transform: "translateX(0px)" },
        },
        animationRightLeft: {
          "0%": { transform: "translateX(0px)" },
          "50%": { transform: "translateX(-1000px)" },
          "100%": { transform: "translateX(0px)" },
        },
      },
    },
  },
  plugins: [],
  future: {
    disableColorOpacityUtilitiesByDefault: false, // Ensures CSS vars are generated
  },
}

