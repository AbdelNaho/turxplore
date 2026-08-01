import { defineType } from "sanity";

/** Renders as centered Editorial Subhead italic, flanked by hairline Ochre rules. */
export const pullQuote = defineType({
  name: "pullQuote",
  title: "Pull quote",
  type: "object",
  fields: [
    { name: "text", title: "Quote", type: "text", rows: 2 },
    { name: "attribution", title: "Attribution", type: "string" },
  ],
  preview: {
    select: { title: "text" },
  },
});
