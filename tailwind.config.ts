import type { Config } from "tailwindcss";

/**
 * Turxplore design tokens. Every value here traces to the visual system
 * brief — no default Tailwind colors, spacing, or shadows survive.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    screens: {
      sm: "480px",
      tablet: "768px",
      md: "768px",
      desktop: "1024px",
      // Wider than `desktop`: the header's wordmark + 5 nav links + language
      // switcher crowd together with no guaranteed gap right at 1024px.
      nav: "1340px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1440px",
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      bone: "rgb(var(--color-bone) / <alpha-value>)",
      ink: "rgb(var(--color-ink) / <alpha-value>)",
      ochre: "rgb(var(--color-ochre) / <alpha-value>)",
      cedar: "rgb(var(--color-cedar) / <alpha-value>)",
      andalus: "rgb(var(--color-andalus) / <alpha-value>)",
      sand: {
        100: "rgb(var(--color-sand-100) / <alpha-value>)",
        200: "rgb(var(--color-sand-200) / <alpha-value>)",
      },
      slate: {
        300: "rgb(var(--color-slate-300) / <alpha-value>)",
        400: "rgb(var(--color-slate-400) / <alpha-value>)",
        500: "rgb(var(--color-slate-500) / <alpha-value>)",
        600: "rgb(var(--color-slate-600) / <alpha-value>)",
      },
    },
    spacing: {
      px: "1px",
      0: "0px",
      1: "8px",
      2: "16px",
      3: "24px",
      4: "32px",
      5: "48px",
      6: "64px",
      7: "96px",
      8: "128px",
      9: "192px",
      10: "256px",
    },
    fontFamily: {
      serif: "var(--font-serif)",
      sans: "var(--font-sans)",
      arabic: "var(--font-arabic)",
    },
    fontSize: {
      // Fluid between mobile and the 1024px desktop breakpoint, where each
      // reaches exactly the brief's specified size — never exceeds it.
      "display-hero": [
        "clamp(3rem, 7.4vw + 1.27rem, 6rem)",
        { lineHeight: "1.04", letterSpacing: "-0.03em", fontWeight: "300" },
      ],
      "display-feature": [
        "clamp(2.25rem, 4.3vw + 1.24rem, 4rem)",
        { lineHeight: "1.12", letterSpacing: "-0.025em", fontWeight: "300" },
      ],
      "display-section": [
        "clamp(1.875rem, 2.8vw + 1.23rem, 3rem)",
        { lineHeight: "1.17", letterSpacing: "-0.02em", fontWeight: "400" },
      ],
      "editorial-headline": [
        "2rem",
        { lineHeight: "1.25", letterSpacing: "-0.015em", fontWeight: "400" },
      ],
      "editorial-subhead": [
        "1.5rem",
        { lineHeight: "1.33", letterSpacing: "0em", fontWeight: "400" },
      ],
      "body-large": [
        "1.25rem",
        { lineHeight: "1.6", letterSpacing: "0em", fontWeight: "400" },
      ],
      "body-standard": [
        "1.0625rem",
        { lineHeight: "1.65", letterSpacing: "0em", fontWeight: "400" },
      ],
      "interface-body": [
        "0.9375rem",
        { lineHeight: "1.6", letterSpacing: "0em", fontWeight: "400" },
      ],
      "interface-label": [
        "0.8125rem",
        { lineHeight: "1.54", letterSpacing: "0.02em", fontWeight: "500" },
      ],
      "caps-label": [
        "0.6875rem",
        { lineHeight: "1.45", letterSpacing: "0.14em", fontWeight: "500" },
      ],
      caption: [
        "0.875rem",
        { lineHeight: "1.57", letterSpacing: "0.01em", fontWeight: "400" },
      ],
    },
    maxWidth: {
      none: "none",
      content: "1440px",
      reading: "640px",
      full: "100%",
    },
    boxShadow: {
      none: "none",
      card: "0 24px 48px rgba(27, 31, 46, 0.08)",
    },
    borderRadius: {
      none: "0px",
      full: "9999px",
    },
    extend: {
      transitionDuration: {
        interface: "350ms",
        editorial: "900ms",
        ceremonial: "2000ms",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0, 0, 0.2, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
