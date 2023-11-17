/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}", 
    "./src/components/**/*.{js,jsx,ts,tsx}", 
    "./src/contexts/**/*.{js,jsx,ts,tsx}", 
    "./src/screens/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    // fontFamily: {
    //   "bebas-neue": ["./assets/fonts/BebasNeueRegular.ttf"]
    // },
    extend: {
      colors: {
        arbor: {
          bg: '#E5F0FF',
          yellow: "#ebe378",
          blue: "#212697",
          grey: "#5a5a5b"
        }
      }
    },
  },
  plugins: [],
}

