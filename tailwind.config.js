const plugin = require("tailwindcss/plugin");
const { blackA, mauve, violet, indigo, purple } = require("@radix-ui/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ...blackA,
        ...mauve,
        ...violet,
        ...purple,
        ...indigo,
        main: "#1a1a1a",
        org: "#ff5001",
      },
      keyframes: {
        bounce: {
          from: { transform: "translateY(-25%)" },
          via: { transform: "translateY(0)" },
          to: { transform: "translateY(-25%)" },
        },
        slideDownAndFade: {
          from: { opacity: "0", transform: "translateY(-2px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(-50%)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          from: { opacity: "0", transform: "translateY(50%)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideDrawer: {
          from: { opacity: "0", transform: "translateX(-50%)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        slideEndDrawer: {
          from: { opacity: "0", transform: "translateX(50%)" },
          to: { opacity: "1", transform: "translateX(100%)" },
        },
        enterFromRight: {
          from: { opacity: "0", transform: "translateX(200px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        scaling: {
          from: { transform: "scale(50%)" },
          to: { transform: "scale(100%)" },
        },
        enterFromLeft: {
          from: { opacity: "0", transform: "translateX(-200px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        enterFromBottom: {
          from: { opacity: "0", transform: "translateY(-200px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        exitToRight: {
          from: { opacity: "1", transform: "translateX(0)" },
          to: { opacity: "0", transform: "translateX(200px)" },
        },
        exitToLeft: {
          from: { opacity: "1", transform: "translateX(0)" },
          to: { opacity: "0", transform: "translateX(-200px)" },
        },
        exitToBottom: {
          from: { opacity: "0", transform: "translateY(200px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          from: { opacity: "0", transform: "rotateX(-10deg) scale(0.9)" },
          to: { opacity: "1", transform: "rotateX(0deg) scale(1)" },
        },
        scaleOut: {
          from: { opacity: "1", transform: "rotateX(0deg) scale(1)" },
          to: { opacity: "0", transform: "rotateX(-10deg) scale(0.95)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        pulse: {
          from: { opacity: "1" },
          to: { opacity: "0.5" },
        },
        fadeOut: {
          from: { opacity: "1" },
          to: { opacity: "0" },
        },
        spin: {
          from: {
            transform: "rotate(0deg)",
          },
          to: {
            transform: "rotate(360deg)",
          },
        },
      },
    },
    animation: {
      slideDownAndFade: "slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
      slideUp: "slideUp 300ms ease",
      slideDown: "slideDown 300ms ease",
      slideDrawer: "slideDrawer 200ms ease",
      slideEndDrawer: "slideEndDrawer 200ms ease",
      scaleIn: "scaleIn 200ms ease",
      scaleOut: "scaleOut 200ms ease",
      fadeIn: "fadeIn 200ms ease",
      fadeOut: "fadeOut 200ms ease",
      enterFromLeft: "enterFromLeft 250ms ease",
      enterFromRight: "enterFromRight 250ms ease",
      exitToLeft: "exitToLeft 250ms ease",
      exitToRight: "exitToRight 250ms ease",
      enterFromBottom: "enterFromBottom 250ms ease",
      exitToBottom: "exitToBottom 250ms ease",
      spin: "spin 1s linear infinite",
      pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) alternate infinite",
      bounce: "bounce 2s cubic-bezier(0.8, 0, 1, 1) alternate infinite",
    },
  },
  plugins: [
    plugin(({ matchUtilities }) => {
      matchUtilities({
        perspective: (value) => ({
          perspective: value,
        }),
      });
    }),
  ],
};
