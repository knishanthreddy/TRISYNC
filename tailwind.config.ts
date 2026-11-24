import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        trisync: {
          ivory: {
            DEFAULT: "#F5F1E8",
            light: "#FAF8F4",
            dark: "#ECE6D8",
          },
          forest: {
            DEFAULT: "#183C32",
            deep: "#112C25",
            light: "#255346",
            glow: "rgba(24, 60, 50, 0.12)",
          },
          teal: {
            DEFAULT: "#46C5B0",
            hover: "#3BB3A0",
            light: "#E3FAF5",
            glow: "rgba(70, 197, 176, 0.2)",
          },
          terracotta: {
            DEFAULT: "#ED805A",
            hover: "#E06D46",
            light: "#FDF1EC",
            glow: "rgba(237, 128, 90, 0.2)",
          },
          lavender: {
            DEFAULT: "#B9A5DF",
            hover: "#A690D4",
            light: "#F4F0FA",
            glow: "rgba(185, 165, 223, 0.2)",
          },
          charcoal: {
            DEFAULT: "#222624",
            muted: "#3E4542",
            soft: "#66706B",
          },
          sage: {
            DEFAULT: "#A9B9A4",
            light: "#EEF3ED",
            dark: "#8CA086",
          },
        },
        // Dimension-specific semantic mappings
        dimension: {
          physical: {
            primary: "#183C32",
            accent: "#A9B9A4",
            surface: "#EEF3ED",
            border: "rgba(24, 60, 50, 0.15)",
          },
          mental: {
            primary: "#7B59BA",
            accent: "#B9A5DF",
            surface: "#F4F0FA",
            border: "rgba(185, 165, 223, 0.3)",
          },
          digital: {
            primary: "#1A8A7A",
            accent: "#46C5B0",
            secondary: "#ED805A",
            surface: "#E3FAF5",
            border: "rgba(70, 197, 176, 0.25)",
          },
        },
      },
      fontFamily: {
        sans: [
          "var(--font-sans)",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Inter",
          "sans-serif",
        ],
        display: [
          "var(--font-display)",
          "var(--font-sans)",
          "-apple-system",
          "BlinkMacSystemFont",
          "sans-serif",
        ],
      },
      borderRadius: {
        "2xs": "4px",
        xs: "6px",
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "20px",
        "2xl": "24px",
        "3xl": "32px",
      },
      boxShadow: {
        subtle: "0 1px 3px rgba(34, 38, 36, 0.04), 0 1px 2px rgba(34, 38, 36, 0.02)",
        soft: "0 4px 12px -2px rgba(34, 38, 36, 0.05), 0 2px 6px -1px rgba(34, 38, 36, 0.03)",
        elevated: "0 12px 28px -4px rgba(34, 38, 36, 0.08), 0 4px 10px -2px rgba(34, 38, 36, 0.04)",
        floating: "0 20px 40px -8px rgba(24, 60, 50, 0.12)",
        innerGlow: "inset 0 1px 1px 0 rgba(255, 255, 255, 0.6)",
      },
    },
  },
  plugins: [],
};

export default config;
