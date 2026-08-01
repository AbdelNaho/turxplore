import { Rule, defineType } from "sanity";

export const composition = defineType({
  name: "composition",
  title: "Composition",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      description: 'e.g. "Cedar & Silver — Ten days across the Middle Atlas"',
      type: "localeString",
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name.en" },
      validation: (rule: Rule) => rule.required(),
    },
    { name: "heroImage", title: "Hero image", type: "imageWithAlt", validation: (rule: Rule) => rule.required() },
    { name: "durationDays", title: "Duration (days)", type: "number" },
    {
      name: "regions",
      title: "Regions visited",
      type: "array",
      of: [{ type: "reference", to: [{ type: "destination" }] }],
    },
    {
      name: "travelerCount",
      title: "Traveler count",
      description: 'e.g. "2–6 guests"',
      type: "string",
    },
    { name: "description", title: "One-line editorial description", type: "localeString" },
    { name: "introduction", title: "Introduction", type: "localePortableText" },
    { name: "chapters", title: "Chapters", type: "array", of: [{ type: "chapter" }] },
    { name: "closing", title: "Closing", type: "localePortableText" },
    { name: "seo", title: "SEO", type: "seo" },
  ],
  preview: {
    select: { title: "name.en", media: "heroImage" },
  },
});
