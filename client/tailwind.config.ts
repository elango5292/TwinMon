import type { Config } from "tailwindcss";

const config: Config = {
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
      variants: {
        extend: {
          boxShadow: ['hover'],
        },
      },
      boxShadow: {
        custom: '0px 2px 10.600000381469727px 0 rgba(172,191,213,0.4)',
      },
    },
  },
  plugins: [],
};
export default config;
