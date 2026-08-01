import { Rule, defineType } from "sanity";
import { localeFields } from "../locales";

export const localeText = defineType({
  name: "localeText",
  title: "Long text (per language)",
  type: "object",
  fields: localeFields.map(({ name, title }) => ({
    name,
    title,
    type: "text",
    rows: 3,
    validation: name === "en" ? (rule: Rule) => rule.required() : undefined,
  })),
  preview: {
    select: { title: "en" },
  },
});
