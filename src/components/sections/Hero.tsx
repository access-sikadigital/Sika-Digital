"use client";

import { useRef } from "react";
import { hero } from "@/config/home";
import { HeroVideo } from "@/components/media/HeroVideo";
import { GoogleReviewsBadge } from "@/components/ui/GoogleReviewsBadge";
import { Reveal } from "@/components/motion/Reveal";
import { gsap, useGSAP, EASE } from "@/lib/gsap";

/**
 * HOMEPAGE HERO.
 *
 * Full-bleed looping video under a three-line headline taken from Sika's cover
 * artwork: "Get found. Get clicks. Get customers." The last line is stamped on
 * a torn lime strip, with the Google reviews badge above and the service line
 * underneath.
 *
 * ── Why the video needs a real scrim and not just low opacity ───────────────
 * Abstract footage changes brightness as it loops. Text that passes contrast
 * against frame 1 can fail badly against frame 300, and there is no way to
 * test every frame. The fix is a fixed gradient scrim that guarantees a floor
 * of darkness behind the text regardless of what the video is doing.
 *
 * ── The headline is real text ───────────────────────────────────────────────
 * It is the page's H1, so it is set in HTML rather than baked into an image:
 * readable by search engines and screen readers, sharp at every size, and
 * editable from config/home.ts.
 *
 * ── The resting state is the default ────────────────────────────────────────
 * Same rule as KineticWordmark: `fromTo`, built synchronously, no
 * ScrollTrigger, and the reduced-motion path returns before touching anything.
 * If the script never runs, the headline is simply there.
 */

/* The same feTurbulence noise as the `grain` utility, reused on the lime strip
   so it reads as printed paper rather than a flat CSS fill. */
const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/* Torn edges. Many small irregular steps along the top and bottom and a faint
   wobble down the sides, so the strip reads as ripped paper rather than a
   banner with cut ends. Built once at module load from a fixed formula and
   rounded, so the server and client produce the same string. Percentages, so
   the tear scales with the type. */
const TORN = (() => {
  const steps = 28;
  /* Deterministic 0..1 jitter per point. */
  const jag = (i: number, seed: number) =>
    Math.abs(Math.sin(i * 12.9898 + seed) * 43758.5453) % 1;
  const pt = (x: number, y: number) => `${x.toFixed(1)}% ${y.toFixed(1)}%`;

  const pts: string[] = [];
  for (let i = 0; i <= steps; i++) pts.push(pt((i / steps) * 100, jag(i, 1) * 7));
  for (let i = 1; i < 4; i++) pts.push(pt(100 - jag(i, 2) * 1.2, i * 25));
  for (let i = steps; i >= 0; i--)
    pts.push(pt((i / steps) * 100, 100 - jag(i, 3) * 7));
  for (let i = 3; i > 0; i--) pts.push(pt(jag(i, 4) * 1.2, i * 25));
  return `polygon(${pts.join(", ")})`;
})();

export function Hero({
  /** Optional video. Until footage is chosen the hero renders on the poster
      alone, which is a complete and correct state, not a broken one. */
  video,
  poster = "/media/hero-poster.jpg",
}: {
  video?: string;
  poster?: string;
}) {
  const headline = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const el = headline.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const lines = gsap.utils.toArray<HTMLElement>("[data-line]", el);
      const stamp = el.querySelector<HTMLElement>("[data-stamp]");

      const tl = gsap.timeline();

      /* The two white lines rise out of their masks, one after another. */
      tl.fromTo(
        lines,
        { yPercent: 110 },
        { yPercent: 0, duration: 1.1, ease: EASE.expo, stagger: 0.12 }
      );

      /* The payoff is stamped down last: it drops in oversized and slightly
         over-rotated, then settles with a small overshoot, like a sticker
         slapped onto the page. The resting tilt lives on the wrapper, so this
         only ever animates back to neutral. */
      if (stamp) {
        tl.fromTo(
          stamp,
          { scale: 1.35, rotate: -5, autoAlpha: 0 },
          {
            scale: 1,
            rotate: 0,
            autoAlpha: 1,
            duration: 0.75,
            ease: "back.out(2.2)",
          },
          0.4
        );
      }
    },
    { scope: headline, dependencies: [] }
  );

  return (
    <section className="grain relative flex min-h-dvh flex-col justify-center overflow-hidden pt-24 pb-16">
      {/* Media */}
      {video ? (
        <HeroVideo src={video} poster={poster} opacity="opacity-80" />
      ) : (
        <div aria-hidden className="glow-accent absolute inset-0" />
      )}

      {/*
        Scrim. A vertical gradient keeps the header legible and lets the section
        resolve at the bottom; the radial pool darkens the centre, where the
        headline and the small service line sit.
      */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgb(11 11 11 / 0.72) 0%, rgb(11 11 11 / 0.2) 32%, rgb(11 11 11 / 0.25) 62%, rgb(11 11 11 / 0.8) 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 45% at 50% 52%, rgb(11 11 11 / 0.55) 0%, transparent 75%)",
        }}
      />
      {/* Blue rising from the bottom edge, continued by the client band
          below, so the hero hands over rather than stopping at a line. */}
      <div
        aria-hidden
        className="glow-blue pointer-events-none absolute inset-x-0 bottom-0 h-1/2 opacity-70"
      />
      {/* Mobile keeps a flat wash on top: the copy runs edge to edge at that
          width, so it crosses far more of the picture. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[rgb(11_11_11/0.28)] sm:hidden"
      />

      {/* Centre column */}
      <div className="relative z-10 flex flex-col items-center px-(--spacing-gutter) text-center">
        {/* Social proof first, then the promise. */}
        <Reveal className="mb-8 sm:mb-10">
          <GoogleReviewsBadge />
        </Reveal>

        {/*
          ── On the type ─────────────────────────────────────────────────────
          Variable Archivo at its heaviest weight, pulled slightly condensed on
          the width axis, rather than Archivo Black. Black is drawn wide, and
          the cover artwork this copies sets the words narrow and tight, almost
          touching. Tracking and word spacing are both pulled in to match.

          ── On the size ─────────────────────────────────────────────────────
          "Get customers." on its strip is the widest line, about 7.2em. The
          phone size runs at about 10.5vw so that line fills most of the width
          after gutters; from md up it scales with the viewport (about 107px
          at 1440 wide) and caps at 8.25rem.
        */}
        <h1
          ref={headline}
          className="flex flex-col items-center font-sans text-[clamp(2.4rem,10.5vw,4rem)] leading-[0.94] font-black tracking-[-0.045em] [word-spacing:0.05em] text-foreground md:text-[clamp(4.5rem,0.75rem+6.6vw,8.25rem)]"
          style={{ fontStretch: "88%" }}
        >
          {hero.lines.map((line) => (
            /* Outer span clips, inner span travels. */
            <span key={line} className="block overflow-hidden pb-[0.04em]">
              <span data-line className="block">
                {line}
              </span>
            </span>
          ))}

          {/* Not masked: a mask would clip the tilted strip. The resting tilt
              sits on this wrapper; GSAP owns the inner element's transform. */}
          <span className="mt-[0.16em] block -rotate-[1.5deg]">
            {/*
              Blue on lime is a fixed brand pairing, not a theme role, so the
              primitives are used directly. It is the pairing from the cover
              artwork and measures roughly 10:1.
            */}
            <span
              data-stamp
              className="relative block px-[0.24em] pt-[0.06em] pb-[0.1em] text-blue"
            >
              <span
                aria-hidden
                className="absolute inset-0 bg-lime"
                style={{ clipPath: TORN }}
              >
                <span
                  className="absolute inset-0 opacity-35 mix-blend-multiply"
                  style={{ backgroundImage: NOISE }}
                />
              </span>
              <span className="relative">{hero.highlight}</span>
            </span>
          </span>
        </h1>

        <Reveal delay={0.9} className="mt-8 sm:mt-10">
          <p className="text-body text-foreground/80 sm:text-lead">
            {hero.services.join(" · ")}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
