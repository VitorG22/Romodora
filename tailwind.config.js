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

      // colors:{
      //   'romo':{
      //     50:'#e2e2e2',
      //     100:'#414B4D',
      //     200:'#3B444B',
      //     300:'#343839',
      //     400:'#232C2B',
      //     500:'#0D1112',
      //     950:"#0a0e15",
      //   }
      // }

      // colors: {
      //   'romo':{
      //     'black':{
      //       100:'#0A0E15',
      //       90: '#212631',
      //       80: '#373F4E',
      //       70: '#4E576A',
      //       60: '#667085'
      //     },
      //     'white':{
      //       100: '#ffffff',
      //       90:'#f0f1f5',
      //       80:'#e0e4eb',
      //       70: '#d1d6e0',
      //       60: '#bfc6d4',
      //     },
      //     'text':{
      //       'primary':'#ffffff',
      //       'secondary': '#e0e4eb',
      //       'reverse': '#0a0e15'
      //     }
      //   }
      // }
      
      // colors: {
      //   'lagun':{
      //     200:"#a3c3bc",
      //     300:"#b9dfff",
      //     500:"#00d67d",
      //     600:"#035e49",
      //     900:"#042121",
      //     950:"#030e0e",
      //   }
      // }
    },
  },
  plugins: [],
}

