const defaultTheme = require("tailwindcss/defaultTheme");
const allColors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: { ...allColors },
      fontFamily: {
        archivo: ["Archivo", ...defaultTheme.fontFamily["sans"]],
      },
    },
  },
  plugins: [],
};
