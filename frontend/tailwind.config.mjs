/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
        backdropBlur: {
            xs: '2px',
            md: '10px', // For a subtle blur
        },
        colors: {
            background: "var(--background)",
            foreground: "var(--foreground)",
        },
    },
  },

  plugins: [
    // Adding the scrollbar-hide plugin
    require("tailwind-scrollbar-hide"),
  ],
};
