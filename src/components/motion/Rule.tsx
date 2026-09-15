"use client";

import { useRef } from "react";
import { gsap, useGSAP, EASE } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/**
 * A hairline that draws itself left to right.
 *
 * Used in the section heading, where it runs from the eyebrow out to the right
 * edge. That line is doing more than decoration: it is what ties a short mono
 * label to the full width of the container, so the heading reads as the top of
 * a section rather than as a paragraph that happens to be large.
 *
 * ── scaleX, not width ───────────────────────────────────────────────────────
 * `scaleX` composites. Animating `width` on an element inside a flex row forces
 * a layout pass per frame and, worse, reflows its siblings, so the eyebrow
 * beside it would shuffle as the line grew.
 *
 * ── The resting state is drawn ──────────────────────────────────────────────
 * `scaleX(1)` is the default and the animation starts from 0, so a heading with
 * no JavaScript still has its rule. This is the project's standing rule and the
 * guard below is the other half of it: an element already on screen at mount
 * skips the animation entirely, because `fromTo` renders its start state
 * immediately and there would be no scroll left to play it back.
 */
export function Rule({
  className,
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (el.getBoundingClientRect().top < window.innerHeight * 0.95) return;

      gsap.fromTo(
        el,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.1,
          delay,
          ease: EASE.expo,
          transformOrigin: "left center",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        }
      );
    },
    { scope: ref }
  );

  return (
    <span
      ref={ref}
      aria-hidden
      className={cn("block h-px origin-left bg-line", className)}
    />
  );
}
