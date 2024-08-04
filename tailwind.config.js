/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        "custom-br": "0px 0px 8px 8px",
      },
      colors: {
        independence: "#494E6E",
        charcoal: "#373B53",
        gray: "#888EB0",
        violetsBlue: "#7C5DFA",
        semiVioletsBlue: "#9277FF",
        yankeesBlue: "#1E2139",
        semiYankeesBlue: "#252945",
        lavender: "#DFE3FA",
        ube: "#7E88C3",
        chineesBlack: "#0C0E16",
        fireOpal: "#EC5757",
        pink: "#FF9797",
        gostWhite: "#F8F8FB",
        eerieBlack: "#141625",
      },
    },
  },
  plugins: [],
};
