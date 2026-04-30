import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/franchise-onboarding/**/*.{ts,tsx}",
    "./app/franchise-dashboard/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        setCongratsBackdropIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        setCongratsModalIn: {
          from: { opacity: "0", transform: "scale(0.94) translateY(16px)" },
          to: { opacity: "1", transform: "scale(1) translateY(0)" },
        },
      },
      animation: {
        "set-congrats-backdrop": "setCongratsBackdropIn 0.32s ease-out forwards",
        "set-congrats-modal": "setCongratsModalIn 0.42s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
    },
  },
  plugins: [],
};

export default config;
