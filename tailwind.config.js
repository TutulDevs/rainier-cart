/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    extend: {
      height: {
        header: "64px",
      },
      width: {
        cardContainer: "calc(100% - 384px)",
      },
      minHeight: {
        main: "calc(100vh - 64px)",
      },
    },
  },
  plugins: [],
};
