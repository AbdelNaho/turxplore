import { Rule, defineType } from "sanity";

export const article = defineType({
  name: "article",
  title: "Journal article",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "localeString", validation: (rule: Rule) => rule.required() },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title.en" },
      validation: (rule: Rule) => rule.required(),
    },
    { name: "category", title: "Category", type: "localeString" },
    { name: "excerpt", title: "Excerpt", type: "localeText" },
    { name: "heroImage", title: "Hero image", type: "imageWithAlt", validation: (rule: Rule) => rule.required() },
    { name: "body", title: "Body", type: "localePortableText" },
    { name: "author", title: "Author", type: "reference", to: [{ type: "teamMember" }] },
    { name: "publishedAt", title: "Published at", type: "datetime" },
    { name: "readTimeMinutes", title: "Read time (minutes)", type: "number" },
    {
      name: "relatedLink",
      title: "Related link (editorially framed, singular)",
      type: "object",
      fields: [
        { name: "label", title: "Label", type: "localeString" },
        { name: "reference", title: "Article", type: "reference", to: [{ type: "article" }] },
      ],
    },
    { name: "seo", title: "SEO", type: "seo" },
  ],
  preview: {
    select: { title: "title.en", media: "heroImage" },
  },
});
