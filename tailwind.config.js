/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#F5E6C5",
        magic: {
          DEFAULT: "#6E3FB0",
          deep: "#4A267A",
          light: "#9B6FD1",
        },
      },
      fontFamily: {
        display: ['"Patrick Hand"', '"Comic Sans MS"', "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
