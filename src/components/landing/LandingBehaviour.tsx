"use client";

import { useEffect, useState } from "react";
import { useLenis } from "@/components/motion/SmoothScroll";
import { captureAttribution, pushEvent } from "@/lib/attribution";
import { defaultTradeLabel, trades, type TradeKey } from "@/config/landing";

export const FORM_ID = "enquire";

/**
 * Page-level behaviour for the landing page. Renders nothing.
 *
 * ── Every CTA goes to the form on this page ─────────────────────────────────
 * The shared components (header, Process) link their buttons to /contact/.
 * On a paid landing page that is a leak: the visitor leaves the page that was
 * built for the ad they clicked. Rather than change those components, clicks
 * on any /contact/ link are caught here and turned into a scroll to the form.
 *
 * Without JavaScript the links still work and land on the contact page, which
 * is a correct fallback rather than a dead button.
 */
export function LandingBehaviour() {
  const lenis = useLenis();

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
      const toForm =
        url.origin === window.location.origin &&
        (url.pathname === "/contact/" ||
          url.pathname === "/contact" ||
          (url.pathname === window.location.pathname &&
            url.hash === `#${FORM_ID}`));
      if (!toForm) return;

      /* Capture phase, so this runs before next/link's own handler; Link
         skips navigation when the event is already default-prevented. */
      event.preventDefault();
      event.stopPropagation();

      const where =
        link.closest<HTMLElement>("[data-cta-location]")?.dataset.ctaLocation ??
        link.closest("header")?.tagName.toLowerCase() ??
        link.closest("section")?.getAttribute("aria-label") ??
        "page";
      pushEvent("cta_click", {
        cta_location: where,
        cta_text: link.textContent?.trim(),
      });

      scrollToForm(lenis);
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [lenis]);

  return null;
}

export function scrollToForm(lenis: ReturnType<typeof useLenis>) {
  const target = document.getElementById(FORM_ID);
  if (!target) return;

  const focusFirst = () =>
    target
      .querySelector<HTMLInputElement>("input:not([tabindex='-1'])")
      ?.focus({ preventScroll: true });

  if (lenis) {
    lenis.scrollTo(target, {
      offset: -96,
      duration: 1.2,
      onComplete: focusFirst,
    });
  } else {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    target.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
      block: "start",
    });
    window.setTimeout(focusFirst, reduced ? 0 : 700);
  }
  history.replaceState(null, "", `#${FORM_ID}`);
}

/**
 * The trade from `?trade=`, for message match with the ad.
 *
 * Read after mount, not during render: the page is statically generated, so
 * the server HTML always carries the generic label and the trade swaps in on
 * the client. A search engine or a no-JS visitor sees a complete sentence.
 */
export function useTrade(): { key?: TradeKey; label: string; option?: string } {
  const [trade, setTrade] = useState<{
    key?: TradeKey;
    label: string;
    option?: string;
  }>({
    label: defaultTradeLabel,
  });

  useEffect(() => {
    const raw = new URLSearchParams(window.location.search)
      .get("trade")
      ?.toLowerCase()
      .trim();
    if (raw && raw in trades) {
      const key = raw as TradeKey;
      setTrade({ key, label: trades[key].label, option: trades[key].option });
    }
  }, []);

  return trade;
}

/** Inline text with `{trade}` replaced. */
export function TradeText({ text }: { text: string }) {
  const { label } = useTrade();
  return <>{text.replace("{trade}", label)}</>;
}
