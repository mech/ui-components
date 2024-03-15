/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "selector", // Or media, class is replaced by selector since v3.4.1
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./examples/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 300ms cubic-bezier(0.87, 0, 0.13, 1)",
        "accordion-up": "accordion-up 300ms cubic-bezier(0.87, 0, 0.13, 1)",
      },
    },
    // colors: {
    //   background: "hsl(var(--background) / <alpha-value>)",
    //   foreground: "hsl(var(--foreground) / <alpha-value>)",
    //   primary: {
    //     DEFAULT: "hsl(var(--primary) / <alpha-value>)",
    //     foreground: "hsl(var(--primary-foreground) / <alpha-value>)",
    //   },
    //   secondary: {
    //     DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
    //     foreground: "hsl(var(--secondary-foreground) / <alpha-value>)",
    //   },
    //   destructive: {
    //     DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
    //     foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
    //   },
    // },
  },
  plugins: [require("tailwindcss-animate")],
};
