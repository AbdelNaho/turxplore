/**
 * No live Sanity project is connected yet — these fall back to a
 * placeholder so `sanity.config.ts` and the Studio route can load
 * during local development. Set the real values in `.env.local` (see
 * `.env.example`) once a project exists; nothing else needs to change.
 */
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = "2025-01-01";
