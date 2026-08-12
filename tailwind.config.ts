import type { Config } from "tailwindcss";

/**
 * Turxplore design tokens — "L'Éditrice" system (MMXXVI): a light editorial
 * parchment ground, replacing the earlier "Terre de Marrakech" warm-night
 * direction. Locked 4-color palette. Aubergine is a single accent — used
 * once per composition, never as a repeated/decorative color. No default
 * Tailwind colors, spacing, or shadows survive.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    screens: {
      sm: "480px",
      tablet: "768px",
      md: "768px",
      desktop: "1024px",
      // Wider than `desktop`: the header's wordmark + nav links crowd
      // together with no guaranteed gap right at 1024px.
      nav: "1340px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1440px",
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      // Primary ground — parchment. 60% of any visible surface.
      parchment: "rgb(var(--color-parchment) / <alpha-value>)",
      // Subtle lifted ground (cards, scrolled header).
      parchment2: "rgb(var(--color-parchment-2) / <alpha-value>)",
      // Primary text, wordmark, khatam. Never pure black.
      encre: "rgb(var(--color-encre) / <alpha-value>)",
      // Softer text variant.
      encre2: "rgb(var(--color-encre-2) / <alpha-value>)",
      // Hairlines, meta labels, borders, grids.
      pierre: "rgb(var(--color-pierre) / <alpha-value>)",
      // Meta-label variant of pierre.
      pierre2: "rgb(var(--color-pierre-2) / <alpha-value>)",
      // Single accent — one word, one dot, one CTA per composition. Never a fill/background at scale.
      aubergine: "rgb(var(--color-aubergine) / <alpha-value>)",
      // Hover/active state for aubergine surfaces only.
      aubergine2: "rgb(var(--color-aubergine-2) / <alpha-value>)",
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
    // No shadows, no glows — the design system forbids both outright.
    boxShadow: {
      none: "none",
    },
    borderRadius: {
      none: "0px",
      full: "9999px",
    },
    extend: {
      transitionDuration: {
        // Hovers.
        interface: "200ms",
        // Page elements entering.
        editorial: "400ms",
        // Deliberate long-scroll section reveals only.
        ceremonial: "600ms",
      },
      transitionTimingFunction: {
        // Material standard — smooth without character, per spec.
        out: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      keyframes: {
        // No marquee/ticker keyframe — forbidden motion, removed outright.
        rise: {
          from: { opacity: "0", transform: "translateY(18px)" },
          to: { opacity: "1", transform: "none" },
        },
      },
      animation: {
        rise: "rise 0.6s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
