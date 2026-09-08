import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: "#101114",
          light: "#181A1F",
          border: "#262930",
        },
        paper: {
          DEFAULT: "#F5F1E8",
          dark: "#EADFC9",
          card: "#FCFAF6",
          border: "#E2D9C8",
        },
        coral: {
          DEFAULT: "#FF5C5C",
          hover: "#FF4040",
          glow: "rgba(255, 92, 92, 0.2)",
        },
        lime: {
          DEFAULT: "#C8F56A",
          dark: "#A3D936",
          glow: "rgba(200, 245, 106, 0.2)",
        },
        cobalt: {
          DEFAULT: "#4969FF",
          hover: "#3352FF",
          glow: "rgba(73, 105, 255, 0.2)",
        },
        ink: {
          DEFAULT: "#202228",
          muted: "#3A3D46",
        },
        fog: {
          DEFAULT: "#A8A7A1",
          light: "#D4D3CC",
        },
        violet: {
          DEFAULT: "#A99BFF",
          glow: "rgba(169, 155, 255, 0.2)",
        },
      },
      fontFamily: {
        mono: ["JetBrains Mono", "Geist Mono", "Fira Code", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
