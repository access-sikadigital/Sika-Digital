"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/**
 * MAGNETIC HOVER — the element leans toward the cursor.
 *
 * Attach the returned ref to an element. While the pointer is inside its
 * hit area (expanded by `padding`), the element follows at a fraction of the
 * cursor's offset, then springs back on leave.
 *
 * ── Why `gsap.quickTo` and not `gsap.to` ────────────────────────────────────
 * `mousemove` fires far more often than the screen refreshes. Calling
 * `gsap.to()` on each event creates a brand-new tween every time — dozens per
 * second, each allocating, each overwriting the last. It works, and it churns
 * garbage and stutters on mid-range hardware.
 *
 * `quickTo` builds ONE reusable tween up front and just retargets its end
 * value. It is the correct tool for any high-frequency input, and the
 * difference is visible on a throttled CPU.
 *
 * ── Pointer-type gating ─────────────────────────────────────────────────────
 * Gated behind `(hover: hover) and (pointer: fine)` — a real mouse. On a
 * touchscreen there is no cursor to be attracted to, and the listeners would
 * only fire on tap, making the button jump under the thumb.
 */
export function useMagnetic<T extends HTMLElement>({
  /** Fraction of the cursor offset the element travels. 0.2–0.4 is the useful band. */
  strength = 0.3,
  /** Pixels beyond the element's bounds that still count as "hovering". */
  padding = 24,
} = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointer.matches || reduced.matches) return;

    /* Built once, retargeted on every move. */
    const xTo = gsap.quickTo(el, "x", {
      duration: 0.5,
      ease: "power3.out",
    });
    const yTo = gsap.quickTo(el, "y", {
      duration: 0.5,
      ease: "power3.out",
    });

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      const withinX = Math.abs(e.clientX - cx) < rect.width / 2 + padding;
      const withinY = Math.abs(e.clientY - cy) < rect.height / 2 + padding;

      if (withinX && withinY) {
        xTo((e.clientX - cx) * strength);
        yTo((e.clientY - cy) * strength);
      } else {
        xTo(0);
        yTo(0);
      }
    };

    /* Listening on window rather than the element is what lets the magnet act
       BEFORE the cursor arrives — the element reaches out. Listening on the
       element itself means nothing happens until the pointer is already on it,
       which defeats the effect. Passive: the handler never calls
       preventDefault, and saying so lets the browser skip a check per event. */
    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onMove);
      gsap.killTweensOf(el);
      gsap.set(el, { x: 0, y: 0 });
    };
  }, [strength, padding]);

  return ref;
}
