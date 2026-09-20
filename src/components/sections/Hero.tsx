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
 * Letter by letter, with a caret sitting after the last one typed.
 *
 * The first attempt swept a `clip-path` across each line, stepped once per
 * character. It looked wrong, and the reason is worth keeping: a clip is a
 * percentage of the LINE, while letters are all different widths. So the edge
 * lands mid-glyph and you watch half an "m" appear. A caret pinned to that
 * edge drifts away from the text it is supposed to be following.
 *
 * So the line is split into one span per character on mount, all hidden, and
 * revealed one at a time. `visibility`, not display or opacity: the text is
 * laid out once at its final size, so nothing reflows as it types and the
 * caret can be parked at a character's real edge, measured up front.
 *
 * The rhythm is uneven on purpose — each keystroke varies, and there is a
 * pause after a full stop. A metronome reads as a progress bar, not typing.
 *
 * The split is client-side only, so the server HTML carries the plain
 * sentence, and the h1 keeps an `aria-label` so a screen reader announces the
 * whole line rather than whatever has been typed so far.
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
function Caret({ className }: { className?: string }) {
  return (
    <span
      data-caret
      aria-hidden
      className={cn(
        "absolute top-[0.14em] bottom-[0.16em] left-0 block w-[0.055em] bg-accent opacity-0",
        className
      )}
    />
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

      /* Seconds per keystroke, the pause after a full stop, and the pause
         between lines. Typing is meant to be read along with, so this is
         closer to a person typing than to a loading bar. */
      const PER_CHAR = 0.065;
      /* The beat after a line lands, which is also the pause the full stop
         earns. */
      const BETWEEN_LINES = 0.45;

      /* One span per character, hidden but laid out. Returns the spans and a
         function that puts the plain text back. */
      const split = (node: HTMLElement) => {
        const original = node.textContent ?? "";
        node.textContent = "";
        const frag = document.createDocumentFragment();
        const chars = [...original].map((ch) => {
          const span = document.createElement("span");
          /* A non-breaking space still takes its width while hidden. */
          span.textContent = ch === " " ? " " : ch;
          span.style.visibility = "hidden";
          frag.appendChild(span);
          return span;
        });
        node.appendChild(frag);
        return {
          chars,
          restore: () => {
            node.textContent = original;
          },
        };
      };

      const restores: (() => void)[] = [];
      const tl = gsap.timeline();
      let at = 0;

      lines.forEach((line, i) => {
        const text = line.querySelector<HTMLElement>("[data-type]");
        const caret = line.querySelector<HTMLElement>("[data-caret]");
        if (!text) return;

        const { chars, restore } = split(text);
        restores.push(restore);
        if (!chars.length) return;

        /* Every caret position measured before the timeline writes anything,
           so the reads cannot interleave with writes and force a reflow per
           character. Hidden characters still occupy their place, so these
           are the final positions.

           Measured from rects rather than `offsetLeft`, which is relative to
           whichever ancestor happens to be positioned. The caret is placed
           against the line, so the distances are taken from the line. */
        const lineLeft = line.getBoundingClientRect().left;
        const stops = chars.map(
          (ch) => ch.getBoundingClientRect().right - lineLeft
        );
        const last = i === lines.length - 1;
        const start = at;

        if (caret) tl.set(caret, { autoAlpha: 1, x: 0 }, at);

        /*
          ONE tween per line, driving a counter, rather than a `set()` per
          character.

          `timeline.set()` looked like the obvious way to write this and it is
          a trap: a zero-duration tween renders the moment it is CREATED, so
          every character in a line turned visible while the timeline was
          still being built, and each line appeared in one go. Whatever the
          position parameter says.

          Driving a counter has no such edge, and it keeps the caret honest:
          both the characters and the caret are set from the same number in
          the same frame, so the bar is always exactly at the last letter.
        */
        const typed = { n: 0 };
        const duration = chars.length * PER_CHAR;

        tl.to(
          typed,
          {
            n: chars.length,
            duration,
            ease: "none",
            onUpdate: () => {
              const shown = Math.floor(typed.n);
              chars.forEach((ch, k) => {
                ch.style.visibility = k < shown ? "visible" : "hidden";
              });
              if (caret) {
                gsap.set(caret, { x: shown > 0 ? stops[shown - 1] : 0 });
              }
            },
          },
          at
        );

        /* The strip wipes in under the last line as it types, so the lime
           arrives with the words rather than landing on them afterwards. */
        if (last && strip) {
          /* Set before the timeline runs rather than leaning on a `fromTo`
             rendering its own start state: the strip is lime on near-black
             and there is no hiding a frame of it at full width. CSS leaves it
             drawn, so with no script it is simply there. */
          gsap.set(strip, { scaleX: 0, transformOrigin: "left center" });
          tl.to(strip, { scaleX: 1, duration, ease: "none" }, start);
        }

        at += duration;

        /* The caret leaves at the end of its line. On the last one it goes
           for good: a bar blinking beside a finished headline is a cursor
           waiting for input that is never coming. */
        if (caret) {
          tl.to(
            caret,
            { autoAlpha: 0, duration: 0.15 },
            at + (last ? 0.25 : 0)
          );
        }

        at += BETWEEN_LINES;
      });

      /* useGSAP reverts the tweens; the DOM split is ours to undo. */
      return () => restores.forEach((fn) => fn());
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
          aria-label={[...hero.lines, hero.highlight].join(" ")}
          className="flex flex-col items-center font-sans text-[clamp(2.4rem,10.5vw,4rem)] leading-[0.94] font-black tracking-[-0.045em] text-foreground [word-spacing:0.05em] md:text-[clamp(4.5rem,0.75rem+6.6vw,8.25rem)]"
          style={{ fontStretch: "88%" }}
        >
          {hero.lines.map((line) => (
            <span key={line} data-line className="relative block pb-[0.04em]">
              <span data-type className="relative block">
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
              {/* Relative, so the typed text paints above the strip, which is
                  absolutely positioned and would otherwise cover it. */}
              <span data-type className="relative block">
                {hero.highlight}
              </span>
              <Caret className="bg-blue" />
            </span>
          </span>
        </h1>

        {/* Waits for the headline to finish typing. */}
        <Reveal delay={3.3} className="mt-8 sm:mt-10">
          <p className="text-body text-foreground/80 sm:text-lead">
            {hero.services.join(" · ")}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
