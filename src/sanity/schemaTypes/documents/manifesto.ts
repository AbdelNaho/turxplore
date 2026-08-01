import { defineType } from "sanity";

/** Singleton — pinned in the Studio structure rather than listed for creation. */
export const manifesto = defineType({
  name: "manifesto",
  title: "Manifesto",
  type: "document",
  fields: [
    { name: "fullText", title: "Full manifesto", type: "localePortableText" },
    {
      name: "homepageExcerpt",
      title: "Homepage excerpt (60 words max)",
      type: "localeText",
    },
    {
      name: "footerExcerpt",
      title: "Footer excerpt (2 sentences)",
      type: "localeText",
    },
  ],
  preview: {
    prepare() {
      return { title: "Manifesto" };
    },
  },
});
