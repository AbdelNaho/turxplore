import type { MetadataRoute } from "next";

const paths = ["", "/fr", "/es", "/pt-BR"];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((path) => ({
    url: `https://turxplore.com${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.8,
  }));
}
