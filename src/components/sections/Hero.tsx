"use client";

import { useRef } from "react";
import { hero } from "@/config/home";
import { HeroVideo } from "@/components/media/HeroVideo";
import { GoogleReviewsBadge } from "@/components/ui/GoogleReviewsBadge";
import { Reveal } from "@/components/motion/Reveal";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

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
 * ── The headline types itself ───────────────────────────────────────────────
 * Each line is revealed left to right with `clip-path`, stepped once per
 * character, with a caret riding the edge. Clip is used rather than animating
 * width or adding a character per frame: the text is laid out once, so nothing
 * reflows, and the whole sentence is in the DOM from the first byte for search
 * engines and screen readers. The lime strip wipes in under the last line at
 * exactly the typing speed, like a highlighter following the words.
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
  for (let i = 0; i <= steps; i++)
    pts.push(pt((i / steps) * 100, jag(i, 1) * 7));
  for (let i = 1; i < 4; i++) pts.push(pt(100 - jag(i, 2) * 1.2, i * 25));
  for (let i = steps; i >= 0; i--)
    pts.push(pt((i / steps) * 100, 100 - jag(i, 3) * 7));
  for (let i = 3; i > 0; i--) pts.push(pt(jag(i, 4) * 1.2, i * 25));
  return `polygon(${pts.join(", ")})`;
})();

/**
 * The typing caret. Hidden at rest, so a headline that never animates — no
 * script, or reduced motion — has no stray bar sitting beside it.
 *
 * Sized in em, so it matches the line at every viewport width.
 */
function Caret({ className, inset }: { className?: string; inset?: string }) {
  return (
    <span aria-hidden className={cn("absolute inset-y-0 left-0 block", inset)}>
      <span
        data-caret
        className={cn(
          "absolute top-[0.14em] bottom-[0.16em] left-0 w-[0.055em] bg-accent opacity-0",
          className
        )}
      />
    </span>
  );
}

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
      const strip = el.querySelector<HTMLElement>("[data-strip]");
      if (!lines.length) return;

      const tl = gsap.timeline();
      /* Seconds per character, and the gap between lines. Tuned so the whole
         headline lands inside about 1.5s: it is the page's largest text, and
         an agency selling Core Web Vitals should not hide its own H1 behind a
         long animation. */
      const PER_CHAR = 0.035;
      const GAP = 0.12;

      let at = 0;

      lines.forEach((line, i) => {
        const text = line.querySelector<HTMLElement>("[data-type]");
        const caret = line.querySelector<HTMLElement>("[data-caret]");
        if (!text) return;

        const chars = Math.max((text.textContent ?? "").length, 1);
        const duration = chars * PER_CHAR;
        const last = i === lines.length - 1;

        /* One step per character, so the reveal lands on letter boundaries
           rather than sliding through them. */
        tl.fromTo(
          text,
          { clipPath: "inset(0 100% 0 0)" },
          { clipPath: "inset(0 0% 0 0)", duration, ease: `steps(${chars})` },
          at
        );

        if (caret) {
          /* The caret travels to the end of the line on the same clock. The
             width is read at run time, so it is correct at any type size. */
          tl.fromTo(
            caret,
            { x: 0, autoAlpha: 1 },
            {
              x: () => text.getBoundingClientRect().width,
              duration,
              ease: `steps(${chars})`,
            },
            at
          );

          if (last) {
            /* Four blinks at the end, then it leaves. */
            tl.to(caret, {
              autoAlpha: 0,
              duration: 0.45,
              repeat: 7,
              yoyo: true,
              ease: "steps(1)",
            });
          } else {
            tl.to(caret, { autoAlpha: 0, duration: 0.08 }, at + duration);
          }
        }

        /* The strip wipes in under the last line at the typing speed, so the
           lime arrives with the words rather than after them. */
        if (last && strip) {
          tl.fromTo(
            strip,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration,
              ease: "none",
              transformOrigin: "left center",
            },
            at
          );
        }

        at += duration + GAP;
      });
    },
    { scope: headline, dependencies: [] }
  );

  return (
    <section className="grain relative flex min-h-dvh flex-col justify-center overflow-hidden pt-24 pb-16">
      {/* Media */}
      {video ? (
        <HeroVideo src={video} poster={poster} opacity="opacity-80" />
      ) : (
        <div aria-hidden className="absolute inset-0 glow-accent" />
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
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 opacity-70 glow-blue"
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
          className="flex flex-col items-center font-sans text-[clamp(2.4rem,10.5vw,4rem)] leading-[0.94] font-black tracking-[-0.045em] text-foreground [word-spacing:0.05em] md:text-[clamp(4.5rem,0.75rem+6.6vw,8.25rem)]"
          style={{ fontStretch: "88%" }}
        >
          {hero.lines.map((line) => (
            <span key={line} data-line className="relative block pb-[0.04em]">
              <span data-type className="block">
                {line}
              </span>
              <Caret />
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
              data-line
              className="relative block px-[0.24em] pt-[0.06em] pb-[0.1em] text-blue"
            >
              <span
                data-strip
                aria-hidden
                className="absolute inset-0 origin-left bg-lime"
                style={{ clipPath: TORN }}
              >
                <span
                  className="absolute inset-0 opacity-35 mix-blend-multiply"
                  style={{ backgroundImage: NOISE }}
                />
              </span>
              <span data-type className="relative block">
                {hero.highlight}
              </span>
              <Caret className="bg-blue" inset="px-[0.24em]" />
            </span>
          </span>
        </h1>

        {/* Waits for the headline to finish typing. */}
        <Reveal delay={1.6} className="mt-8 sm:mt-10">
          <p className="text-body text-foreground/80 sm:text-lead">
            {hero.services.join(" · ")}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
