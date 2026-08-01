import type { SchemaTypeDefinition } from "sanity";

import { localeString } from "./objects/localeString";
import { localeText } from "./objects/localeText";
import { localePortableText } from "./objects/localePortableText";
import { imageWithAlt } from "./objects/imageWithAlt";
import { pullQuote } from "./objects/pullQuote";
import { seo } from "./objects/seo";
import { chapter } from "./objects/chapter";

import { article } from "./documents/article";
import { destination } from "./documents/destination";
import { composition } from "./documents/composition";
import { correspondent } from "./documents/correspondent";
import { teamMember } from "./documents/teamMember";
import { manifesto } from "./documents/manifesto";
import { homeSection } from "./documents/homeSection";
import { siteSettings } from "./documents/siteSettings";

export const schemaTypes: SchemaTypeDefinition[] = [
  // Objects
  localeString,
  localeText,
  localePortableText,
  imageWithAlt,
  pullQuote,
  seo,
  chapter,
  // Documents
  article,
  destination,
  composition,
  correspondent,
  teamMember,
  manifesto,
  homeSection,
  siteSettings,
];

/** Document types with exactly one instance — pinned in the Studio structure. */
export const singletonTypes = new Set(["manifesto", "siteSettings"]);
