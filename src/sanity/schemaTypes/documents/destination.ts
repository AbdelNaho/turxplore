import { Rule, defineType } from "sanity";

export const destination = defineType({
  name: "destination",
  title: "Destination",
  type: "document",
  fields: [
    { name: "name", title: "Name", type: "localeString", validation: (rule: Rule) => rule.required() },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name.en" },
      validation: (rule: Rule) => rule.required(),
    },
    { name: "heroImage", title: "Hero image", type: "imageWithAlt", validation: (rule: Rule) => rule.required() },
    {
      name: "evocativeLine",
      title: "Evocative one-line description",
      description: 'e.g. "The city that refuses to be photographed."',
      type: "localeString",
    },
    { name: "essay", title: "Essay (500–1200 words)", type: "localePortableText" },
    { name: "gallery", title: "Gallery", type: "array", of: [{ type: "imageWithAlt" }] },
    {
      name: "relatedCompositions",
      title: "Related compositions",
      type: "array",
      of: [{ type: "reference", to: [{ type: "composition" }] }],
      validation: (rule: Rule) => rule.max(4),
    },
    { name: "seo", title: "SEO", type: "seo" },
  ],
  preview: {
    select: { title: "name.en", media: "heroImage" },
  },
});
