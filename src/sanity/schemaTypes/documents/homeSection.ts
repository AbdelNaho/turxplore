import { Rule, defineType } from "sanity";

/**
 * One document per homepage section (2–6 in section 4.1 of the brief —
 * section 1 is the manifesto excerpt and pulls from `manifesto` directly).
 */
export const homeSection = defineType({
  name: "homeSection",
  title: "Homepage section",
  type: "document",
  fields: [
    {
      name: "sectionKey",
      title: "Section",
      type: "string",
      options: {
        list: [
          { title: "Journal feature", value: "journalFeature" },
          { title: "Destinations feature", value: "destinationsFeature" },
          { title: "The atelier's approach", value: "approach" },
          { title: "Correspondents preview", value: "correspondentsFeature" },
          { title: "Inquire", value: "inquire" },
        ],
      },
      validation: (rule: Rule) => rule.required(),
    },
    { name: "heading", title: "Heading", type: "localeString" },
    { name: "body", title: "Body", type: "localeText" },
    { name: "image", title: "Image", type: "imageWithAlt" },
    {
      name: "link",
      title: "Link",
      type: "object",
      fields: [
        { name: "label", title: "Label", type: "localeString" },
        { name: "href", title: "Href", type: "string" },
      ],
    },
  ],
  preview: {
    select: { title: "sectionKey", subtitle: "heading.en" },
  },
});
