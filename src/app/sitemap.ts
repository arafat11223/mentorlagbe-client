import type { MetadataRoute } from "next";

import { siteUrl } from "../lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const publicRoutes = [
    {
      path: "",
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      path: "/about",
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      path: "/pricing",
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      path: "/tuitions",
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
  ];

  return publicRoutes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
