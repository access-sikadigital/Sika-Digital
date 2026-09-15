"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * SMOOTH SCROLL — Lenis, driven by the GSAP ticker.
 *
 * The single largest contributor to how "expensive" a site feels, and almost
 * free. Lenis intercepts the wheel event and interpolates the scroll position
 * instead of jumping to it, so movement has weight.
 *
 * ── Why Lenis is driven by GSAP's ticker, not its own RAF loop ──────────────
 * Both libraries want a requestAnimationFrame loop. Left alone they each run
 * their own, and their order within a frame is undefined. When ScrollTrigger
 * reads a scroll position Lenis has not yet updated, scrubbed animations lag
 * the page by one frame — a subtle jitter that only appears on scrubbed
 * elements and is very hard to trace back to its cause.
 *
 * One ticker means a defined order: Lenis updates, then ScrollTrigger reads.
 *
 * `lagSmoothing(0)` disables GSAP's frame-skip recovery. It exists to stop
 * animations jumping after the main thread stalls, but against a scroll-linked
 * timeline that correction reads as a lurch.
 *
 * ── Why the instance is exposed via context ─────────────────────────────────
 * Anything that opens a full-screen overlay has to stop the page behind it.
 * The usual `document.body.style.overflow = "hidden"` does NOT work here —
 * Lenis is animating a transform, not the native scroll position, so the page
 * keeps moving underneath the overlay. `lenis.stop()` is the correct lever, so
 * components need a handle on the instance.
 */

type LenisContextValue = Lenis | null;

const LenisContext = createContext<LenisContextValue>(null);

/**
 * The live Lenis instance, or `null` when smooth scrolling is disabled
 * (reduced motion, or before hydration). Always null-check it — a component
 * that assumes it exists will crash for users who asked for reduced motion.
 */
export const useLenis = () => useContext(LenisContext);

export function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const rafRef = useRef<((time: number) => void) | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    /* Reduced motion: no Lenis at all. Smooth scrolling is a vestibular
       trigger — a shorter version of it is still a trigger. Native scrolling
       is the correct behaviour, and overlays fall back to the CSS lock. */
    if (reduced.matches) return;

    const instance = new Lenis({
      /* ~1s to settle. Below 0.8 it stops reading as smooth; above 1.5 the page
         feels like it is resisting the user, which is where smooth scroll earns
         its bad reputation. */
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      /* Touch smoothing OFF. Mobile browsers already scroll smoothly; overriding
         it fights the OS, breaks momentum flicks and pull-to-refresh, and costs
         battery for no visual gain. */
      syncTouch: false,
    });

    instance.on("scroll", ScrollTrigger.update);

    /*
      Recalculate every trigger position once the real fonts are rendering.
      Webfonts change line heights, which changes element heights, which moves
      every trigger point below them. Without this, triggers created during the
      fallback-font paint fire at the wrong scroll positions for the rest of the
      session, and sections either reveal early or never reveal at all.
    */
    void document.fonts.ready.then(() => ScrollTrigger.refresh());

    const raf = (time: number) => {
      /* GSAP's ticker reports seconds; Lenis expects milliseconds. */
      instance.raf(time * 1000);
    };
    rafRef.current = raf;

    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    setLenis(instance);

    return () => {
      if (rafRef.current) gsap.ticker.remove(rafRef.current);
      gsap.ticker.lagSmoothing(500, 33); // restore GSAP's default
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  );
}
