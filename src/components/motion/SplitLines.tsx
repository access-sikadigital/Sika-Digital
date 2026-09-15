"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, useGSAP, SplitText, ScrollTrigger, EASE } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/**
 * SPLIT LINES — headline reveal, line by line.
 *
 * Each line is wrapped in a clipping mask and rises into it, staggered.
 *
 * ── Why lines and not characters ────────────────────────────────────────────
 * Per-character animation is the more common effect and it is worse in three
 * measurable ways:
 *
 *   · Cost. A 60-character headline becomes 60 animated elements, each a
 *     composited layer. Per line it is three or four.
 *   · Legibility. Letters arriving independently are unreadable mid-flight; a
 *     line arriving as a unit can be read the moment it lands.
 *   · Accessibility. Splitting to characters puts each letter in its own
 *     element, and some screen readers then announce the text letter by letter.
 *
 * ── Two bugs this file exists to avoid ──────────────────────────────────────
 *
 * 1. INVISIBLE HEADLINES. A `from` tween renders its start state immediately,
 *    so the lines sit at `yPercent: 110`, below their masks, from the moment
 *    they mount. If the ScrollTrigger meant to reveal them never fires, the
 *    headline is permanently blank, with no error anywhere. A trigger on
 *    something already in the viewport at scroll zero has nothing to scroll
 *    into, and whether it resolves depends on fonts, layout and the
 *    smooth-scroll layer all being ready first.
 *
 *    So anything already on screen animates directly, with no trigger at all.
 *    Only headlines genuinely below the fold get one.
 *
 * 2. WRONG LINE BREAKS. The split measures rendered text to decide where lines
 *    fall. Split against a fallback face and then swap in Archivo, and the
 *    masks end up in the wrong places: clipped descenders, a stray word alone
 *    on the last line. `document.fonts.ready` is the gate.
 *
 *    That gate is also why the split mutates the DOM *after* first paint, which
 *    invalidates every cached ScrollTrigger position on the page. Hence the
 *    refresh at the end.
 */
export function SplitLines({
  children,
  as: Tag = "h2",
  className,
  delay = 0,
  stagger = 0.09,
  duration = 1.1,
  start = "top 85%",
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  /** Seconds between lines. Above ~0.15 the headline reads as slow. */
  stagger?: number;
  duration?: number;
  start?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      let split: SplitText | null = null;
      let cancelled = false;

      const run = () => {
        if (cancelled || !ref.current) return;

        split = new SplitText(el, {
          type: "lines",
          linesClass: "split-line",
          /* Wraps each line so it rises out of nothing rather than fading in
             place, and keeps the original sentence as an aria-label on the
             container so assistive tech reads it whole. */
          mask: "lines",
          autoSplit: true,
        });

        const rect = el.getBoundingClientRect();
        const onScreen = rect.top < window.innerHeight * 0.95;

        const vars: gsap.TweenVars = {
          yPercent: 110,
          autoAlpha: 0,
          duration,
          delay,
          stagger,
          ease: EASE.expo,
        };

        if (onScreen) {
          gsap.from(split.lines, vars);
        } else {
          gsap.from(split.lines, {
            ...vars,
            scrollTrigger: { trigger: el, start: `clamp(${start})`, once: true },
          });
        }

        /* The split just changed the DOM height of this element, so every
           ScrollTrigger further down the page is now measuring against stale
           positions. */
        ScrollTrigger.refresh();
      };

      void document.fonts.ready.then(run);

      return () => {
        cancelled = true;
        split?.revert();
      };
    },
    { scope: ref, dependencies: [] }
  );

  return (
    <Tag ref={ref} className={cn(className)}>
      {children}
    </Tag>
  );
}
