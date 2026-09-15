"use client";

import { useRef, type ElementType } from "react";
import { gsap, useGSAP, EASE } from "@/lib/gsap";
import { MarkAnchor } from "@/components/motion/MarkFlight";
import { cn } from "@/lib/utils";

/**
 * KINETIC WORDMARK — words converging from opposite edges on a single line,
 * with the brand asterisk raised after the last letter.
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * THE RULE THIS FILE ENFORCES:
 * the resting state is the DEFAULT, and animation only adds movement to it.
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Two earlier versions rendered a permanently blank headline, both from the
 * same mistake. `gsap.from()` renders its START state immediately, so a word
 * asked to animate from `xPercent: -110` is shoved outside its mask the moment
 * it mounts, before a frame of the tween has run. It is then invisible until
 * the tween completes, and if the tween never runs the text is gone for good,
 * with no error and nothing in the console.
 *
 * Three things can stop it running, and all three happened:
 *
 *   · A ScrollTrigger on content already in the viewport at scroll zero. There
 *     is nothing to scroll into, so it depends on the first refresh resolving.
 *   · A tween created inside a promise callback. It lands outside the
 *     `useGSAP` context, and under StrictMode's double mount that is a race.
 *   · Any early return between mount and the tween being built.
 *
 * Hence: synchronous, `fromTo` rather than `from`, no ScrollTrigger, and a
 * reduced-motion path that returns before touching anything. If the JavaScript
 * fails entirely the headline still renders, which is the bar for anything
 * carrying the company name.
 *
 * ── Why words are passed in as an array ─────────────────────────────────────
 * Each word needs its own clipping mask to slide out of, so they have to be
 * separate elements. Passing them in keeps that explicit rather than depending
 * on a plugin's internal wrapper markup, and drops the SplitText dependency.
 *
 * ── Accessibility ───────────────────────────────────────────────────────────
 * The words are spans inside the real heading, so the text is the heading's
 * content. `aria-label` carries the joined string so assistive tech announces
 * one name rather than fragments, and the asterisk is decorative so it is never
 * read aloud as punctuation.
 */
export function KineticWordmark({
  words,
  mark = true,
  as: Tag = "h1",
  className,
}: {
  /** One entry per word. Alternate words enter from alternate sides. */
  words: string[];
  /** Raised brand asterisk after the last word. */
  mark?: boolean;
  as?: ElementType;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      /* Returns before touching anything, leaving the words exactly where the
         browser put them: visible, in position, no transform. */
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const items = gsap.utils.toArray<HTMLElement>("[data-word]", el);
      if (!items.length) return;

      items.forEach((item, i) => {
        /* Alternating: first word in from the left, second from the right. */
        const fromLeft = i % 2 === 0;
        gsap.fromTo(
          item,
          { xPercent: fromLeft ? -110 : 110 },
          {
            xPercent: 0,
            duration: 1.4,
            ease: EASE.expo,
            /* Small offset so they do not land on the same frame, which reads
               as one block rather than two halves meeting. */
            delay: i * 0.08,
            /* Kills any earlier tween on the same property instead of letting
               two fight, which is what leaves an element stuck half way. */
            overwrite: "auto",
          }
        );
      });

      /* The asterisk is NOT animated here. It is the single fixed mark owned by
         MarkFlight, which snaps to this anchor on load and then flies down the
         page. Animating a second one here would put two asterisks on screen. */
    },
    { scope: ref, dependencies: [words.join("|"), mark] }
  );

  return (
    <Tag
      ref={ref}
      className={cn("flex flex-wrap items-start justify-center", className)}
      aria-label={words.join(" ")}
    >
      {words.map((word, i) => (
        /* Outer span clips, inner span travels. Two elements because one cannot
           both hide its own overflow and move through it.
           The word gap is set in em so it scales with the type. */
        <span
          key={word}
          className={cn("block overflow-hidden", i > 0 && "ml-[0.22em]")}
        >
          <span data-word className="block">
            {word}
          </span>
        </span>
      ))}

      {mark ? (
        /*
          The FIRST dock point for the flying mark, not a mark of its own.

          `MarkAnchor` renders an invisible Logomark purely to reserve space, so
          the wordmark's spacing is identical whether or not the flying mark has
          arrived. The visible asterisk is the single fixed one in MarkFlight,
          which starts here and then travels down the page.

          Sized and offset in em so it holds its position against the last
          letter at every viewport width. `items-start` on the row puts it at
          cap height; the nudge lifts it to a true superscript.
        */
        <MarkAnchor
          size="w-[0.2em]"
          className="ml-[0.06em] translate-y-[0.06em]"
        />
      ) : null}
    </Tag>
  );
}
