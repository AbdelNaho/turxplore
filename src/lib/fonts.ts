import { Fraunces, Inter, Noto_Naskh_Arabic } from "next/font/google";

/**
 * Development substitutes for the licensed type — GT Sectra Fine and Söhne.
 * globals.css lists the licensed family first in each `--font-*` stack, so
 * swapping in the real fonts later is a one-line change there; nothing here
 * needs to move.
 */
export const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
  preload: true,
  variable: "--font-fraunces",
});

export const inter = Inter({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  display: "swap",
  preload: true,
  variable: "--font-inter",
});

/**
 * Loaded only on `/ar/*` routes once Arabic ships in phase 2 — do not apply
 * this variable on the default locale layout, per the brief's Latin-only
 * subset requirement for the initial launch.
 */
export const notoNaskhArabic = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: false,
  variable: "--font-noto-naskh",
});
