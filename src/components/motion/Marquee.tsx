"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/**
 * MARQUEE — an endless horizontal ticker band.
 *
 * Used for the lime capability band and for client logo rows. Two details make
 * the difference between one that looks professional and one that does not.
 *
 * ── 1. The loop must be seamless ────────────────────────────────────────────
 * The children are rendered TWICE and the track is translated by exactly -50%.
 * At the moment it reaches -50%, the second copy sits precisely where the first
 * started, so resetting to 0 is invisible. Any other arrangement — a gap, an
 * odd number of copies, a percentage that is not 50 — produces a visible jump
 * once per cycle, which is the tell of a cheap implementation.
 *
 * The duplicate is `aria-hidden`: it is the same words again, and a screen
 * reader should not read the list twice.
 *
 * ── 2. It must not animate off-screen ───────────────────────────────────────
 * A marquee in the footer running while the user is at the top of the page
 * costs work every frame for something nobody can see. ScrollTrigger pauses the
 * tween whenever the band is out of view. On a long page with several bands
 * this is the difference between a smooth scroll and a warm phone.
 */
export function Marquee({
  children,
  className,
  /** Seconds for one full cycle. Longer = slower. 20–40 reads as calm. */
  speed = 28,
  /** Reverse direction. Alternating two stacked bands looks deliberate. */
  reverse = false,
  /** Gap between repeated items. */
  gap = "3rem",
  /** Ease to a stop while hovered, so an item in the band can be inspected. */
  pauseOnHover = false,
}: {
  children: ReactNode;
  className?: string;
  speed?: number;
  reverse?: boolean;
  gap?: string;
  pauseOnHover?: boolean;
}) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = track.current;
      const container = root.current;
      if (!el || !container) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const tween = gsap.to(el, {
        xPercent: reverse ? 50 : -50,
        duration: speed,
        ease: "none",
        repeat: -1,
      });

      /* Run only while the band is on screen. */
      ScrollTrigger.create({
        trigger: container,
        start: "top bottom",
        end: "bottom top",
        onToggle: (self) => (self.isActive ? tween.play() : tween.pause()),
      });

      /* Hover eases the band's speed down to nothing and back up rather than
         pausing dead, so it never jolts under the cursor. Tweening timeScale
         leaves the loop position untouched. */
      if (pauseOnHover) {
        const slow = () => gsap.to(tween, { timeScale: 0, duration: 0.6, ease: "power2.out" });
        const resume = () => gsap.to(tween, { timeScale: 1, duration: 0.6, ease: "power2.in" });
        container.addEventListener("pointerenter", slow);
        container.addEventListener("pointerleave", resume);
        return () => {
          container.removeEventListener("pointerenter", slow);
          container.removeEventListener("pointerleave", resume);
        };
      }

      /* useGSAP's context reverts the tween and its ScrollTrigger on unmount,
         so no manual cleanup is needed here. */
    },
    { scope: root, dependencies: [speed, reverse, pauseOnHover] }
  );

  return (
    <div ref={root} className={cn("w-full overflow-hidden", className)}>
      <div
        ref={track}
        className="flex w-max flex-nowrap items-center"
        style={{ gap }}
      >
        <div className="flex flex-nowrap items-center" style={{ gap }}>
          {children}
        </div>
        <div
          className="flex flex-nowrap items-center"
          style={{ gap }}
          aria-hidden
        >
          {children}
        </div>
      </div>
    </div>
  );
}
