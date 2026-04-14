import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        terracotta: {
          50:  "#fdf1ee",
          100: "#fbe0d9",
          200: "#f7c1b3",
          300: "#f09b87",
          400: "#E07A5F",
          500: "#d55d40",
          600: "#C45E43",
          700: "#a34535",
          800: "#8B3A28",
          900: "#72301f",
        },
        sand: {
          50:  "#fdf9f0",
          100: "#F5E6C8",
          200: "#EDD9A3",
          300: "#e0c47a",
          400: "#C9A96E",
          500: "#b38a50",
          600: "#9a7040",
          700: "#7d5733",
          800: "#67452c",
          900: "#553927",
        },
        turkana: {
          blue:  "#1B4F72",
          deep:  "#0D2B3E",
          light: "#2980B9",
          pale:  "#AED6F1",
        },
        accent: {
          orange: "#F4A261",
          ember:  "#E76F51",
          gold:   "#F6C544",
        },
      },
      fontFamily: {
        outfit: ["var(--font-outfit)", "sans-serif"],
        inter:  ["var(--font-inter)", "sans-serif"],
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(135deg, #0D2B3E 0%, #1B4F72 50%, #8B3A28 100%)",
        "cta-gradient":  "linear-gradient(135deg, #E07A5F 0%, #C45E43 100%)",
        "warm-gradient": "linear-gradient(135deg, #F5E6C8 0%, #EDD9A3 100%)",
      },
      animation: {
        "fade-in":      "fadeIn 0.6s ease-out",
        "slide-up":     "slideUp 0.5s ease-out",
        "slide-down":   "slideDown 0.3s ease-out",
        "pulse-slow":   "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float":        "float 6s ease-in-out infinite",
        "counter":      "counter 1s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%":   { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%":   { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-10px)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
