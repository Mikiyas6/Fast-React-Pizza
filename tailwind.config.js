/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line
export default {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", // Adjust paths as needed
  ],
  theme: {
    fontFamily: { sans: "Roboto Mono, monospace" },
    extend: { height: { screen: "100dvh" } },
  },
  plugins: [],
};
