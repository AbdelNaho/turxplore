import { defineType } from "sanity";

/** A chapter within a composition — never a day, never a schedule. */
export const chapter = defineType({
  name: "chapter",
  title: "Chapter",
  type: "object",
  fields: [
    { name: "number", title: "Chapter number", type: "number" },
    { name: "title", title: "Title", type: "localeString" },
    { name: "coverImage", title: "Cover image", type: "imageWithAlt" },
    { name: "body", title: "Body", type: "localePortableText" },
  ],
  preview: {
    select: { number: "number", title: "title.en" },
    prepare({ number, title }) {
      return { title: `${number ?? "—"}. ${title ?? "Untitled chapter"}` };
    },
  },
});
