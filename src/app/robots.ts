import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/utils";

/**
 * robots.txt
 *
 * Vercel preview deployments get a unique hostname and are fully crawlable
 * unless told otherwise. A preview indexed alongside production is a duplicate
 * of the entire site — so previews disallow everything, and only the real
 * domain opens up.
 */
export default function robots(): MetadataRoute.Robots {
  const isProduction = process.env.VERCEL_ENV === "production";

  if (!isProduction) {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        /* API routes return JSON and have nothing to rank. */
        disallow: ["/api/"],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/"),
  };
}
