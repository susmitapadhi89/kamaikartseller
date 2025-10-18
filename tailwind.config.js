/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],

  theme: {
    extend: {
      colors: {
        primary: "#1E40AF", // Blue
        secondary: "#F59E0B", // Amber
        green: "#00f329ff",
        link: "#2563EB", // Link color
        danger: "#DC2626", // Red
        background: "#f6f6f7ff", // Light gray
        fontcolourwhite: "rgba(255, 255, 255, 1)", // Light gray
        fontcolourblack: "#000000ff",
        fontcolourgray: "#242424ff", // Gray
        fontcolourlightgray: "#9CA3AF", // Light gray
      },
      fontSize: {
        xxs: "0.70rem", // extra small
        xs: "0.75rem", // small
        sm: "0.875rem", // normal small
        base: "1rem", // default
        lg: "1.125rem", // large
        xl: "1.25rem", // extra large
        "2xl": "1.5rem", // bigger
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
      },

      backgroundImage: {
        sidebarbg: "linear-gradient(to bottom, #111827, #1f2937)",
        showdetailbg: "linear-gradient(to bottom, #1f2937, #111827)",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        heading: ["Poppins", "sans-serif"],
      },
      borderRadius: {
        xl: "1rem",
        xxl: "2rem",
      },
      spacing: {
        128: "32rem",
        144: "36rem",
      },
    },
  },
  plugins: [],
};
