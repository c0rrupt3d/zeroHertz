/** @type {import('tailwindcss').Config} */

import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "selector",
  theme: {
    extend: {
      transitionTimingFunction: {
        default: "cubic-bezier(0.455, 0.03, 0.515, 0.955)",
      },
      transitionProperty: {
        padding: "padding",
      },
      transitionDuration: {
        0: "0ms",
      },
      screens: {
        xs: "475px",
        ...defaultTheme.screens,
        betterhover: { raw: "(hover: hover)" },
      },
      boxShadow: {
        glass: "0 4px 30px rgba(0, 0, 0, 0.1)",
      },
      animation: {
        playing: "flow 16s ease infinite",
        swipeText: "marquee 16s linear infinite",
        wiggly: "wiggle 0.15s linear 4",
        pingSlow: "ping 2s ease-out infinite",
        spinSlow: "spin 3s linear infinite",
      },
      keyframes: {
        flow: {
          "0%": {
            backgroundPosition: "left center",
            backgroundSize: "400% 400%",
          },
          "50%": {
            backgroundPosition: "right center",
            backgroundSize: "200% 200%",
          },
          "100%": {
            backgroundPosition: "left center",
            backgroundSize: "400% 400%",
          },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "50%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0%)" },
        },
        wiggle: {
          "0%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(8deg)" },
          "50%": { transform: "rotate(0eg)" },
          "75%": { transform: "rotate(-8deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
      },
      fontFamily: {
        sans: ["Quicksand", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
