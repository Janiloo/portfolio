import type { MetadataRoute } from "next";
import { profile } from "@/lib/content/profile";
import { projects } from "@/lib/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: profile.siteUrl, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    ...projects.map((p) => ({
      url: `${profile.siteUrl}/projects/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
