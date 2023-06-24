/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'Arial', 'sans-serif'],
        serif: ['Merriweather', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}

