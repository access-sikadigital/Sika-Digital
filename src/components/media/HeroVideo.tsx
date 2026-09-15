"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * FULL-BLEED HERO VIDEO.
 *
 * The poster does the real work. It ships in the server HTML as a plain <img>,
 * so it is the LCP element and paints on the first frame whether or not the
 * video ever arrives. The <video> is mounted client-side only, and swaps in
 * when it can actually play.
 *
 * Three failure modes are handled without any configuration:
 *
 *   · prefers-reduced-motion  The <video> is never mounted, so the file is
 *     never requested. Not merely paused: paused still costs the download.
 *   · scrolled out of view    Playback pauses. A hero video decoding four
 *     sections below the fold is pure battery cost.
 *   · error, stall, blocked   `canplay` never fires, the poster simply stays.
 *     There is no error state to design.
 *
 * ── The handoff is a hard swap, not a cross-fade ────────────────────────────
 * The obvious approach is to fade the video in over the poster. It looks right
 * on paper, because the poster IS frame 0 of the clip. In practice the video
 * autoplays the moment it can, so by the time a 1s fade runs it is already a
 * second or more into the shot, and you are cross-fading a still frame against
 * a completely different moving frame. On slow abstract footage that reads as a
 * rendering fault for the first second of every fresh page load.
 *
 * Seeking back to 0 before revealing makes the first visible frame identical to
 * the poster, so there is nothing to cross-fade and the swap is invisible.
 */
export function HeroVideo({
  src,
  poster,
  className,
  /** Opacity of the media itself. The scrim above it does the rest. */
  opacity = "opacity-60",
}: {
  src: string;
  poster: string;
  className?: string;
  opacity?: string;
}) {
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);

  /* Mounted in an effect, not at render, so the server HTML and the first
     client render match. Mounting during render would be a hydration error. */
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setEnabled(!mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const handleCanPlay = () => {
    const el = ref.current;
    if (el && el.currentTime > 0.05) el.currentTime = 0;
    setReady(true);
  };

  /* Pause once the hero has scrolled away, resume when it returns. */
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) void el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.01 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [enabled]);

  return (
    <div aria-hidden className={cn("absolute inset-0 overflow-hidden", className)}>
      {/* Plain <img>, not next/image: this is a fixed full-bleed background at
          one size, so the srcSet machinery buys nothing, and next/image adds a
          wrapper that complicates stacking the video exactly on top. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={poster}
        alt=""
        className={cn(
          "absolute inset-0 size-full object-cover",
          ready ? "opacity-0" : opacity
        )}
      />

      {enabled && (
        <video
          ref={ref}
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onCanPlay={handleCanPlay}
          className={cn(
            "absolute inset-0 size-full object-cover",
            ready ? opacity : "opacity-0"
          )}
        />
      )}
    </div>
  );
}
