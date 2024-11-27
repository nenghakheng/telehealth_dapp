/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Add paths to your React files
  ],
  theme: {
    extend: {
      colors: {
        // Example: custom colors
        primary: "#1D4ED8",
        secondary: "#9333EA",
      },
    },
  },
  plugins: [],
};
