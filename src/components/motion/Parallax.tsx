"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/**
 * PARALLAX — scroll-linked drift.
 *
 * The element moves at a slightly different rate to the page, so it reads as
 * sitting on its own plane. Used behind imagery and on the floating brand
 * asterisks.
 *
 * ── `scrub: 0.4`, not `scrub: true` ─────────────────────────────────────────
 * This is the whole trick, and it is the one the reference sites get right.
 *
 * `scrub: true` locks the animation to the scrollbar exactly. Technically
 * correct, and it feels mechanical — the element is welded to the page.
 *
 * A numeric scrub adds that many seconds of catch-up, so the element eases
 * toward its target rather than snapping to it. The result reads as weight.
 * 0.3–0.5 is the useful band; above ~1s it stops feeling connected to the
 * scroll at all.
 *
 * ── Always use percentage-based movement ────────────────────────────────────
 * `yPercent` is relative to the element's own height, so the effect is
 * proportional at every viewport size. A pixel value tuned on a desktop is an
 * enormous shift on a phone.
 *
 * ── Overflow ────────────────────────────────────────────────────────────────
 * A parallaxed image must be oversized relative to its frame, and the frame must
 * clip. Otherwise the drift exposes an edge at one end of the scroll. The usual
 * pattern is `inset-y-[-10%]` on the image inside an `overflow-hidden` parent.
 */
export function Parallax({
  children,
  className,
  /**
   * Percent of the element's own height to travel across the full scroll pass.
   * Positive = moves down relative to the page (slower than scroll).
   * 5–15 is subtle and appropriate; beyond ~25 it becomes the point of the
   * section rather than an accent.
   */
  amount = 10,
  /** Horizontal drift instead of vertical. */
  axis = "y",
  scrub = 0.4,
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
  axis?: "x" | "y";
  scrub?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      /* Reduced motion: no drift at all. Parallax is a vestibular trigger and
         a slower version of it is still a trigger. */
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const prop = axis === "y" ? "yPercent" : "xPercent";

      gsap.fromTo(
        el,
        { [prop]: -amount },
        {
          [prop]: amount,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            /* Full pass: from the moment it enters the viewport to the moment
               it leaves, so the drift is spread across the whole traversal
               rather than finishing early. */
            start: "top bottom",
            end: "bottom top",
            scrub,
          },
        }
      );
    },
    { scope: ref, dependencies: [amount, axis, scrub] }
  );

  return (
    <div ref={ref} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
}
