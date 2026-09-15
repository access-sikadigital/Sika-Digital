"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/**
 * POINTER SPOTLIGHT — a soft brand-coloured glow that trails the cursor.
 *
 * Drop it inside any `relative` container and it fills that container, tracks
 * the pointer within it, and fades out when the pointer leaves. Used on the
 * hero, where it lifts the footage under the cursor and gives the section
 * something to do on hover without moving any content.
 *
 * ── Why a moved element and not an animated gradient ───────────────────────
 * The obvious build is a radial-gradient background whose `circle at X Y`
 * position updates on pointermove. It works and it is expensive: changing a
 * gradient's position repaints the whole layer every frame, at the rate the
 * pointer fires, which is well above the refresh rate.
 *
 * This renders the gradient ONCE into a fixed-size element and then only
 * transforms it. Transform is composited, costs no repaint, and the browser can
 * hand the whole thing to the GPU.
 *
 * ── `screen` blend, not opacity ─────────────────────────────────────────────
 * A semi-transparent lime overlay dulls whatever is under it, because it is
 * still averaging toward its own colour. `screen` is additive: it can only
 * brighten. Over dark footage that reads as light falling on the scene rather
 * than a coloured sheet laid over it.
 *
 * ── Off on touch ────────────────────────────────────────────────────────────
 * There is no cursor to follow. The handler would only fire on tap, producing a
 * glow that appears under the thumb and stays there.
 */
export function PointerSpotlight({
  className,
  /** Diameter in pixels. Large and soft reads better than small and tight. */
  size = 600,
  /** Peak strength at the centre. Above ~0.3 it stops being a glow. */
  intensity = 0.18,
}: {
  className?: string;
  size?: number;
  intensity?: number;
}) {
  const root = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = root.current;
      const el = dot.current;
      if (!container || !el) return;

      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const finePointer = window.matchMedia(
        "(hover: hover) and (pointer: fine)"
      ).matches;
      if (reduced || !finePointer) return;

      /* One reusable tween per axis, retargeted. A fresh gsap.to() per
         pointermove allocates dozens of tweens a second for no benefit. */
      const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3.out" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3.out" });

      /* The container rect only changes on resize or scroll, so it is cached
         rather than read inside the move handler, which would force a layout
         calculation on every event. */
      let rect = container.getBoundingClientRect();
      const measure = () => {
        rect = container.getBoundingClientRect();
      };

      let visible = false;

      const onMove = (e: PointerEvent) => {
        const inside =
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom;

        if (inside) {
          xTo(e.clientX - rect.left);
          yTo(e.clientY - rect.top);
          if (!visible) {
            visible = true;
            gsap.to(el, { autoAlpha: 1, duration: 0.45, ease: "power2.out" });
          }
        } else if (visible) {
          visible = false;
          gsap.to(el, { autoAlpha: 0, duration: 0.6, ease: "power2.out" });
        }
      };

      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("resize", measure);
      window.addEventListener("scroll", measure, { passive: true });

      return () => {
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("resize", measure);
        window.removeEventListener("scroll", measure);
      };
    },
    { scope: root, dependencies: [] }
  );

  return (
    <div
      ref={root}
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
    >
      <div
        ref={dot}
        className="absolute top-0 left-0 rounded-full opacity-0 mix-blend-screen"
        style={{
          width: size,
          height: size,
          /* -50% centres the element on the transform origin, so the glow sits
             under the cursor rather than starting at it. */
          marginLeft: -size / 2,
          marginTop: -size / 2,
          background: `radial-gradient(circle, color-mix(in oklab, var(--color-lime) ${Math.round(
            intensity * 100
          )}%, transparent) 0%, transparent 68%)`,
        }}
      />
    </div>
  );
}
