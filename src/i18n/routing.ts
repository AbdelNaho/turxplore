import { defineRouting } from "next-intl/routing";

/**
 * Arabic (`ar`) is a phase-2 locale — it requires RTL layout mirroring and
 * is deliberately excluded from `locales` until that work lands.
 */
export const routing = defineRouting({
  locales: ["en", "fr", "es", "pt-BR"],
  defaultLocale: "en",
  localePrefix: "as-needed",
});

export type AppLocale = (typeof routing.locales)[number];
