/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: {
    content: [
      './pages/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
      './app/**/*.{js,ts,jsx,tsx}',
    ],
  },
  theme: {
    extend: {
      backgroundColor: {
        '2D3E50': '#2D3E50',
        '44A1C8': '#44A1C8',
        darkBlue: '#2D3E50',
        skyBlue: '#44A1C8',
        color4: "#3E8C84"
      },
      textColor: {
        '2D3E50': '#2D3E50',
        darkBlue: '#2D3E50',
        skyBlue: '#44A1C8',
        lighterDarkBlue: '#59788E',
        txtcolor: '#BDF2F2'
      },
       colors: {
        btncolor: '#293C40'
       
      }
    },
  },
  plugins: [],
}
