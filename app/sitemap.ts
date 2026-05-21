import type { MetadataRoute } from "next";

const BASE = "https://meridian-2026-74011946.hub.europe-west3.gcp.keboola.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/product`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/signals`, lastModified: now, changeFrequency: "hourly", priority: 0.8 },
    { url: `${BASE}/manifesto`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/pricing`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];
}
