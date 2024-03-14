/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "selector", // Or media, class is replaced by selector since v3.4.1
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
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
