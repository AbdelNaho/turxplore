import { Rule, defineType } from "sanity";

/**
 * Alt text is required and hand-authored — never auto-generated, never
 * left as "image" — per the accessibility section of the brief.
 */
export const imageWithAlt = defineType({
  name: "imageWithAlt",
  title: "Image",
  type: "image",
  options: { hotspot: true },
  fields: [
    {
      name: "alt",
      title: "Alternative text",
      type: "string",
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: "credit",
      title: "Photographer credit",
      type: "string",
    },
  ],
});
