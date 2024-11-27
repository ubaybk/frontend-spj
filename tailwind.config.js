/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'], // Tambahkan font Poppins
      },
      colors:{
        bgPrimary: "#00ffff"
      }
    },
  },
  plugins: [],
}