import { defineType } from "sanity";
import { localeFields } from "../locales";
import { portableTextBodyOf } from "./portableTextBody";

export const localePortableText = defineType({
  name: "localePortableText",
  title: "Rich text (per language)",
  type: "object",
  fields: localeFields.map(({ name, title }) => ({
    name,
    title,
    type: "array",
    of: portableTextBodyOf,
  })),
  preview: {
    select: { title: "en" },
    prepare() {
      return { title: "Rich text" };
    },
  },
});
