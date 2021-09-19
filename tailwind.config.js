const colors = require('tailwindcss/colors')
module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        mobile: "420px",
        lgmobile: "500px",
        tablet: "700px",
        laptop: "1024px",
        desktop: "1280px",
      },
      backgroundColor: {
        primary: '#1A1B1F',
        secondary: '#ffffff',
        grayish: colors.gray
      },
      textColor: {
        primary: colors.white,
        secondary: colors.gray
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
}
