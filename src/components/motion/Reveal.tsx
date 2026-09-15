"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, useGSAP, EASE } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/**
 * REVEAL — the workhorse scroll entrance.
 *
 * Fades and lifts a block as it enters the viewport. Used for most sections,
 * with `SplitLines` reserved for headlines where the per-line stagger earns its
 * extra cost.
 *
 * ── Elements already on screen do NOT get a ScrollTrigger ───────────────────
 * This is the important part, and getting it wrong produces a bug that is very
 * hard to read from the symptom.
 *
 * A `from` tween renders its starting state immediately, so the element is
 * hidden the moment the component mounts. If the ScrollTrigger that is supposed
 * to reveal it never fires, the element stays invisible permanently. There is
 * no error, nothing in the console, just a blank section.
 *
 * And a trigger attached to something already inside the viewport at scroll
 * zero has nothing to scroll into. Whether it fires depends on ScrollTrigger
 * resolving its start position correctly during the first refresh, which in
 * turn depends on fonts having loaded, the smooth-scroll layer being ready, and
 * layout having settled. Any of those landing late and the hero is simply
 * black.
 *
 * So: measure on mount. If the element is already visible, play the tween
 * directly on a short delay. Only elements genuinely below the fold get a
 * ScrollTrigger. This is automatic, so no component has to remember a prop, and
 * the whole class of bug disappears.
 */
export function Reveal({
  children,
  as: Tag = "div",
  className,
  delay = 0,
  y = 28,
  duration = 1,
  start = "top 85%",
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Seconds. Use to stagger siblings that are not in one container. */
  delay?: number;
  /** Pixels to travel. Keep small: 20 to 40 reads as considered, 100 reads as a slide. */
  y?: number;
  duration?: number;
  /** ScrollTrigger start, used only when the element begins below the fold. */
  start?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      /* Checked in JS as well as CSS. The CSS backstop only shortens durations;
         building no timeline at all is cheaper and leaves no transform behind. */
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const rect = el.getBoundingClientRect();
      const onScreen = rect.top < window.innerHeight * 0.95;

      const vars: gsap.TweenVars = {
        autoAlpha: 0,
        y,
        duration,
        delay,
        ease: EASE.expo,
      };

      if (onScreen) {
        gsap.from(el, vars);
        return;
      }

      gsap.from(el, {
        ...vars,
        scrollTrigger: {
          trigger: el,
          /* `clamp()` pins the start inside the scrollable range, so an element
             near the bottom of a short page still resolves to a real position
             rather than one that can never be reached. */
          start: `clamp(${start})`,
          once: true,
        },
      });
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref} className={cn(className)}>
      {children}
    </Tag>
  );
}
