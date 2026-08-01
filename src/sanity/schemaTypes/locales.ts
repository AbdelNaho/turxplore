/**
 * Sanity field names can't contain hyphens, so `pt-BR` (the next-intl
 * locale code) becomes the field key `ptBR` here. Map between the two
 * at the data-fetching layer — nowhere else.
 */
export const localeFields = [
  { name: "en", title: "English" },
  { name: "fr", title: "Français" },
  { name: "es", title: "Español" },
  { name: "ptBR", title: "Português (Brasil)" },
] as const;
