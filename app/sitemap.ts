import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { locales } from "@/lib/i18n";

const languages = Object.fromEntries(
  locales.map((l) => [l, `${site.url}/${l}`]),
);

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return locales.map((l) => ({
    url: `${site.url}/${l}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: l === "en" ? 1 : 0.9,
    alternates: { languages },
  }));
}
