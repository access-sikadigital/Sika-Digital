"use client";

import { useEffect } from "react";
import { captureAttribution, pushEvent } from "@/lib/attribution";

/** Window event that opens the booking dialog. */
export const OPEN_BOOKING = "sika:open-booking";

export function openBooking(location: string) {
  pushEvent("cta_click", { cta_location: location });
  window.dispatchEvent(new CustomEvent(OPEN_BOOKING));
}

/**
 * Page-level behaviour for the landing page. Renders nothing.
 *
 * Every CTA on the page (including the shared header's, which links to
 * /contact/) opens the booking dialog instead of leaving the page. Clicks are
 * caught in the capture phase, before next/link handles them. Without
 * JavaScript the links still go to the contact page, a working fallback.
 */
export function LandingBehaviour() {
  useEffect(() => {
    captureAttribution();
  }, []);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
        return;

      const link = (event.target as Element | null)?.closest?.("a");
      if (!link) return;

      const url = new URL(link.href, window.location.href);
      if (
        url.origin !== window.location.origin ||
        !/^\/contact\/?$/.test(url.pathname)
      )
        return;

      event.preventDefault();
      event.stopPropagation();

      const where =
        link.closest<HTMLElement>("[data-cta-location]")?.dataset.ctaLocation ??
        (link.closest("header") ? "header" : "page");
      openBooking(where);
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
