"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/**
 * CURSOR PREVIEW — a video panel that trails the pointer.
 *
 * Set `src` to show a clip, or null to hide. Used by the services list, where
 * hovering a row brings up a preview of that service.
 *
 * ── One video element, not one per item ─────────────────────────────────────
 * The obvious build mounts a `<video>` per list item and toggles visibility.
 * Five video elements on one page is five decoders, five buffers and five
 * things the browser keeps warm whether or not anyone hovers. This mounts a
 * single element and swaps its `src`, so the cost is one clip at a time.
 *
 * The trade is a short delay the first time each clip is hovered. With files in
 * the few-hundred-KB range that is imperceptible, and it is the right trade on
 * a page that has to load fast.
 *
 * ── quickTo, not a tween per event ──────────────────────────────────────────
 * `pointermove` fires far above the refresh rate. A fresh `gsap.to()` per event
 * would allocate dozens of tweens a second. `quickTo` builds one per axis and
 * retargets it, which is also what gives the panel its lag behind the cursor.
 * That lag IS the effect: a panel locked exactly to the pointer feels stuck to
 * it, one that trails feels like it has weight.
 *
 * ── Off on touch ────────────────────────────────────────────────────────────
 * There is no hover on a touchscreen. The panel would appear on tap, directly
 * under the thumb, over the thing being tapped.
 */
export function CursorPreview({
  src,
  className,
  width = 340,
}: {
  /** Clip to show, or null to hide the panel. */
  src: string | null;
  className?: string;
  width?: number;
}) {
  const panel = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [enabled, setEnabled] = useState(false);

  /* Decided after mount so the server and first client render match. */
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    setEnabled(fine.matches && !reduced.matches);
  }, []);

  /* Follow the pointer. */
  useEffect(() => {
    if (!enabled) return;
    const el = panel.current;
    if (!el) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.55, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.55, ease: "power3.out" });

    const onMove = (e: PointerEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [enabled]);

  /* Show, hide, and swap the clip. */
  useEffect(() => {
    if (!enabled) return;
    const el = panel.current;
    const vid = video.current;
    if (!el || !vid) return;

    if (src) {
      if (vid.getAttribute("src") !== src) {
        vid.setAttribute("src", src);
        vid.load();
      }
      void vid.play().catch(() => {});
      gsap.to(el, {
        autoAlpha: 1,
        scale: 1,
        duration: 0.4,
        ease: "power3.out",
      });
    } else {
      gsap.to(el, {
        autoAlpha: 0,
        scale: 0.92,
        duration: 0.35,
        ease: "power3.out",
        /* Pausing only once it is fully hidden avoids a visible freeze frame
           on the way out. */
        onComplete: () => vid.pause(),
      });
    }
  }, [src, enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={panel}
      aria-hidden
      /* `-translate-x-1/2 -translate-y-1/2` in the inner wrapper rather than on
         this element, because GSAP owns this element's transform and the two
         would overwrite each other. */
      className={cn(
        "pointer-events-none invisible fixed top-0 left-0 z-40 opacity-0",
        className
      )}
      style={{ width }}
    >
      <div className="-translate-x-1/2 -translate-y-1/2">
        <div className="overflow-hidden rounded-card border border-line-strong bg-ink shadow-[0_30px_60px_-20px_rgb(0_0_0/0.8)]">
          <video
            ref={video}
            muted
            loop
            playsInline
            preload="none"
            className="block aspect-video w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
