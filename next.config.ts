import type { NextConfig } from "next";

/**
 * SIKA DIGITAL — Next.js configuration
 *
 * The site is statically generated and served from Vercel's edge. That matters
 * more here than on a normal build: Sika sells SEO and Google Ads, so this site
 * is the working demonstration of both. A slow agency site argues against its
 * own pitch, and it is also the landing destination for paid clicks, where Core
 * Web Vitals feed Quality Score and therefore the cost per click.
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,

  /* Vercel sets this header anyway; removing it saves a few bytes and tells
     scanners a little less about the stack. */
  poweredByHeader: false,

  images: {
    /* AVIF first, WebP fallback. AVIF is roughly 30–50% smaller than WebP on
       photographic content, which is most of what an agency site carries. */
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 2560],
    /* Long cache — filenames are content-hashed, so this is safe. */
    minimumCacheTTL: 31_536_000,
  },

  /* Trailing slashes ON, because the scope workbook's sitemap is written with
     them (/seo/, /google-ads/). Pick one and never change it: switching later
     means redirecting every indexed URL on the site. */
  trailingSlash: true,

  experimental: {
    /* Only pull the icons/components actually imported from these packages
       rather than the whole barrel file. */
    optimizePackageImports: ["motion", "gsap"],
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        /* Self-hosted font files, if any are added later. Immutable because the
           filenames are hashed. */
        source: "/fonts/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  /**
   * REDIRECTS FROM THE OLD SITE.
   *
   * Deliberately empty until the current sikadigital.com URL list is exported.
   * The scope's Deliverable #2 calls for a redirect map, and every old URL that
   * 404s on launch throws away whatever authority it had. Add them here before
   * go-live — leaving this array empty at launch is a silent, expensive mistake.
   */
  async redirects() {
    return [];
  },
};

export default nextConfig;
