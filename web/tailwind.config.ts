import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/franchise-onboarding/**/*.{ts,tsx}",
    "./app/franchise-dashboard/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
