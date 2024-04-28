import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'text': '#27272a',
        'text-secondary':'#a1a1aa',
        'yellowgreen': '#C8DF52',
        'secondary': '#f9f9f9',
        'primary': '#BACC81',
        'border':'#EEEDE7',
        'inputBorder':'#E4E4E4',
      },
    },
  },
  plugins: [],
};
export default config;

