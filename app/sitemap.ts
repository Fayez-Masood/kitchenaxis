import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { locales } from "@/lib/i18n";

const homeLangs = Object.fromEntries(
  locales.map((l) => [l, `${site.url}/${l}`]),
);
const riyadhLangs = Object.fromEntries(
  locales.map((l) => [l, `${site.url}/${l}/riyadh`]),
);

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const home = locales.map((l) => ({
    url: `${site.url}/${l}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: l === "en" ? 1 : 0.9,
    alternates: { languages: homeLangs },
  }));
  const riyadh = locales.map((l) => ({
    url: `${site.url}/${l}/riyadh`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
    alternates: { languages: riyadhLangs },
  }));
  return [...home, ...riyadh];
}
