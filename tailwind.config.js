export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'Poppins': ['Poppins', 'sans-serif'],
      'Nunito': ['Nunito', 'sans-serif']

    },
    extend: {
      boxShadow: {
        'heroButton': '8px 8px 0px #000000',
        'heroBox': '5px 4px 0px #000000',
      },

    },
  },
  plugins: [],
}
