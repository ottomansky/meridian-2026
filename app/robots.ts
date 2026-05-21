import type { MetadataRoute } from "next";

/**
 * The Keboola hub serves a default `Disallow: /` at /robots.txt. Override
 * it for this marketing site by shipping our own file from the Next.js
 * app router — the proxy passes /robots.txt through to the upstream, and
 * Next.js will serve this as the canonical robots.txt at build time.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://meridian-2026-74011946.hub.europe-west3.gcp.keboola.com/sitemap.xml",
  };
}
