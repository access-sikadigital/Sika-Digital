import type { MetadataRoute } from "next";
import { indexablePages } from "@/config/pages";
import { absoluteUrl } from "@/lib/utils";

/**
 * sitemap.xml, generated from the IA config.
 *
 * Generated rather than hand-written so it can never fall out of step with the
 * routes that actually exist — a sitemap listing a 404, or omitting a live
 * page, is a self-inflicted crawl problem.
 *
 * ── On priority ─────────────────────────────────────────────────────────────
 * Google has said for years that it ignores the `priority` field. It is set
 * anyway because Bing still reads it, and Microsoft Ads' organic side is a real
 * (if small) channel for Australian B2B. It costs nothing.
 *
 * Priority is derived from the build tier, which is derived from commercial
 * value — so the ordering reflects what the business actually wants ranked,
 * not an arbitrary guess.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return indexablePages().map((page) => ({
    url: absoluteUrl(page.url),
    lastModified: now,
    changeFrequency:
      page.template === "guide" || page.template === "blog-hub"
        ? "monthly"
        : "weekly",
    priority: page.url === "/" ? 1 : page.tier === 1 ? 0.9 : page.tier === 2 ? 0.7 : 0.5,
  }));
}
