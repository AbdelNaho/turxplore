import { defineType } from "sanity";

/** Hand-authored per page — never generated from templates or keyword lists. */
export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    { name: "metaTitle", title: "Meta title", type: "localeString" },
    { name: "metaDescription", title: "Meta description", type: "localeText" },
    { name: "shareImage", title: "Share image (Open Graph / Twitter)", type: "imageWithAlt" },
  ],
});
