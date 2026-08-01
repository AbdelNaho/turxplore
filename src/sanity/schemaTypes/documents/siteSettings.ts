import { defineType } from "sanity";

/** Singleton — pinned in the Studio structure rather than listed for creation. */
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    { name: "siteTitle", title: "Site title", type: "string" },
    { name: "defaultSeo", title: "Default SEO", type: "seo" },
    {
      name: "contact",
      title: "Contact",
      type: "object",
      fields: [
        { name: "address", title: "Address", type: "localeString" },
        { name: "phone", title: "Phone", type: "string" },
        { name: "email", title: "Email", type: "string" },
      ],
    },
    {
      name: "advisorTeamContact",
      title: "Advisor-facing team contact",
      type: "object",
      fields: [
        { name: "name", title: "Name", type: "string" },
        { name: "email", title: "Email", type: "string" },
        { name: "phone", title: "Phone", type: "string" },
      ],
    },
  ],
  preview: {
    prepare() {
      return { title: "Site settings" };
    },
  },
});
