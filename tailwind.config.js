const defaultTheme = require("tailwindcss/defaultTheme");
const allColors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    colors: allColors,

    extend: {
      fontFamily: {
        archivo: ["Archivo", ...defaultTheme.fontFamily["sans"]],
      },
    },
  },
  plugins: [],
};
