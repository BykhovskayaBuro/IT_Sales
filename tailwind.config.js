/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.html"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        mainColor: "#8A33FD",
        bgColor: "#3C4242",
        modal: "#f2f2f2",
      },
      padding: {
        big: "50px",
      },
      screens: {
        sm: "480px",
        md: "768px",
        lg: "1028px",
        xl: "1440px",
      },
      rotate: {
        minus45: "-45deg",
      },
      spacing: {
        minus5: "-5px",
      },
    },
  },
  plugins: [],
};
