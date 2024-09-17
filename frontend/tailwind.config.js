/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        dancing: ["Dancing Script", ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        xxs: "10 rem", // Custom font size
      },
    },
  },
  plugins: [],
};
