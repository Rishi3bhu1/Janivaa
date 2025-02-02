/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        HennyPenny:['Henny Penny','serif'],
        imperialScript:["Imperial Script","sans-serif"],
      },
    },
  },
  plugins: [],
}

