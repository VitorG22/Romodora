/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'romo':{
          50:'#ffffff',
          100:'#e0e0e0',
          200:'#bfbfbf',
          300:'#353a3e',
          400:'#222526',
          500:'#1a1a1a',
          950:"#101010",
        }
      }
    },
  },
  plugins: [],
}

