import { Rule, defineType } from "sanity";
import { localeFields } from "../locales";

export const localeString = defineType({
  name: "localeString",
  title: "Text (per language)",
  type: "object",
  fields: localeFields.map(({ name, title }) => ({
    name,
    title,
    type: "string",
    validation: name === "en" ? (rule: Rule) => rule.required() : undefined,
  })),
  preview: {
    select: { title: "en" },
  },
});
