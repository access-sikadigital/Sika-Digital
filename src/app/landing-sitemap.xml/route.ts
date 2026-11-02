import { absoluteUrl } from "@/lib/utils";

/**
 * Sitemap for sikadigital.com while it serves only the landing page.
 * next.config rewrites /sitemap.xml to this for that host, so search engines
 * are not pointed at the unfinished full-site pages.
 */
export const dynamic = "force-static";

export function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${absoluteUrl("/")}</loc><changefreq>weekly</changefreq><priority>1</priority></url>
</urlset>`;
  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
