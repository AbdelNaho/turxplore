import type { Config } from "tailwindcss";

/**
 * Turxplore design tokens — warm night palette (night / clay / ivory),
 * the direction the client explicitly chose over the earlier daylight
 * system. No default Tailwind colors, spacing, or shadows survive.
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
      // Primary canvas — warm near-black.
      night: "rgb(var(--color-night) / <alpha-value>)",
      // Secondary canvas shade, slightly lifted (e.g. scrolled header).
      night2: "rgb(var(--color-night-2) / <alpha-value>)",
      // Tertiary canvas, for sections that sit a step apart (e.g. tailor-made).
      ember: "rgb(var(--color-ember) / <alpha-value>)",
      // Primary text on night.
      ivory: "rgb(var(--color-ivory) / <alpha-value>)",
      // Signature accent — the one warm point of light.
      clay: "rgb(var(--color-clay) / <alpha-value>)",
      // Secondary accent, rare.
      brass: "rgb(var(--color-brass) / <alpha-value>)",
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
      card: "0 24px 48px rgba(10, 6, 3, 0.35)",
      glow: "0 0 14px 3px rgba(193, 96, 58, 0.5)",
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
      keyframes: {
        marquee: {
          to: { transform: "translateX(-50%)" },
        },
        rise: {
          from: { opacity: "0", transform: "translateY(18px)" },
          to: { opacity: "1", transform: "none" },
        },
      },
      animation: {
        marquee: "marquee 36s linear infinite",
        rise: "rise 0.95s cubic-bezier(0.22, 0.61, 0.36, 1) forwards",
      },
    },
  },
  plugins: [],
};

export default config;
