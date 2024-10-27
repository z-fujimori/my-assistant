/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "dark":"#382933",
        "darkGreen":"#3B5249",
        "mintGreen":"#519872",
        "base":"#A4B494"
      },
    },
  },
  plugins: [],
}

