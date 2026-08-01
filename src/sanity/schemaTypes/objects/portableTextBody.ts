import type { ArrayDefinition } from "sanity";

/**
 * Shared portable-text body: prose blocks, pull quotes, and captioned
 * images (full-bleed or margin-aligned — that alignment is a frontend
 * choice, not a content one). Reused per-locale by `localePortableText`.
 */
export const portableTextBodyOf: ArrayDefinition["of"] = [
  {
    type: "block",
    styles: [
      { title: "Body", value: "normal" },
      { title: "Editorial headline", value: "h3" },
    ],
    marks: {
      decorators: [
        { title: "Italic", value: "em" },
        { title: "Bold", value: "strong" },
      ],
      annotations: [
        {
          name: "link",
          type: "object",
          title: "Link",
          fields: [{ name: "href", type: "url", title: "URL" }],
        },
      ],
    },
  },
  { type: "imageWithAlt" },
  { type: "pullQuote" },
];
