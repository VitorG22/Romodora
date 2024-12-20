/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'lagun':{
          200:"#a3c3bc",
          300:"#b9dfff",
          500:"#00d67d",
          600:"#035e49",
          900:"#042121",
          950:"#030e0e",
        }
      }
    },
  },
  plugins: [],
}

