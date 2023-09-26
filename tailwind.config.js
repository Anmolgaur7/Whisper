/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'chatbg': "url('../src/images/peakpx.jpg')",
      }
    },
  },
  plugins: [],
}

