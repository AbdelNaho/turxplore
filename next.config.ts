import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 90],
  },
  outputFileTracingRoot: __dirname,
  // The Sanity Studio bundle (rich-text editor, previews, styled-components)
  // is large enough that tracing it into every route's serverless function
  // has caused silent, memory-related crashes during "Collecting build
  // traces" on Vercel. The studio route needs none of this traced in — it's
  // a 'use client' page; sharp's non-Linux binaries are dead weight too.
  outputFileTracingExcludes: {
    "/studio/**/*": ["node_modules/sanity/**", "node_modules/@sanity/**", "node_modules/styled-components/**"],
    "*": [
      "node_modules/@img/sharp-darwin-*/**",
      "node_modules/@img/sharp-win32-*/**",
      "node_modules/@img/sharp-linuxmusl-*/**",
    ],
  },
};

export default withNextIntl(nextConfig);
