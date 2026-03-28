/** @type {import('tailwindcss').Config} */
// TODO Need to put here app colors constants but do it after finishing unit and integration tests
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      transformOrigin: {
        center: "center",
      },
    },
  },
  plugins: [],
};
