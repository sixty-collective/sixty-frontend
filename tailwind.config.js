const colors = require("tailwindcss/colors")

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        neutral: colors.neutral,
        primary: colors.sky,
        black: "#1B1B1B",
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        xs: "1rem",
        sm: "2rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
}
