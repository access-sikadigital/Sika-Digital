"use client";

import { useSelectedLayoutSegment } from "next/navigation";

/**
 * True when the current page is the landing page, whether it was reached at
 * /lp/ (paid traffic) or at / on sikadigital.com, where next.config rewrites
 * the root to /home-landing/.
 *
 * Uses the resolved route segment rather than the URL: after a rewrite the
 * URL is "/", which would otherwise look like the full-site homepage.
 */
export function useIsLanding() {
  const segment = useSelectedLayoutSegment();
  return segment === "lp" || segment === "home-landing";
}
