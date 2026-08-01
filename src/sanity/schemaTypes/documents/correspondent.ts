import { Rule, defineType } from "sanity";

export const correspondent = defineType({
  name: "correspondent",
  title: "Correspondent",
  type: "document",
  fields: [
    { name: "name", title: "Name", type: "string", validation: (rule: Rule) => rule.required() },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
      validation: (rule: Rule) => rule.required(),
    },
    { name: "region", title: "Region", type: "localeString" },
    { name: "specialty", title: "Specialty", type: "localeString" },
    { name: "portrait", title: "Portrait", type: "imageWithAlt", validation: (rule: Rule) => rule.required() },
    { name: "biography", title: "Biography (300–500 words)", type: "localePortableText" },
    { name: "additionalPhotos", title: "Additional photographs", type: "array", of: [{ type: "imageWithAlt" }] },
    {
      name: "relatedCompositions",
      title: "Compositions led",
      type: "array",
      of: [{ type: "reference", to: [{ type: "composition" }] }],
      validation: (rule: Rule) => rule.max(2),
    },
  ],
  preview: {
    select: { title: "name", subtitle: "region.en", media: "portrait" },
  },
});
