import { Rule, defineType } from "sanity";

export const teamMember = defineType({
  name: "teamMember",
  title: "Team member",
  type: "document",
  fields: [
    { name: "name", title: "Name", type: "string", validation: (rule: Rule) => rule.required() },
    { name: "role", title: "Role", type: "localeString" },
    { name: "portrait", title: "Portrait", type: "imageWithAlt" },
    { name: "biography", title: "Biography", type: "localePortableText" },
  ],
  preview: {
    select: { title: "name", subtitle: "role.en", media: "portrait" },
  },
});
