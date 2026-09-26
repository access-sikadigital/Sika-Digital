"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, EASE } from "@/lib/gsap";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Logomark } from "@/components/brand/Logo";
import { MarkAnchor } from "@/components/motion/MarkFlight";

/**
 * CLOSING CTA.
 *
 * ── Two rewrites, and what each one got wrong ───────────────────────────────
 * The first was a left-aligned stack with two equal buttons. The right half
 * was empty, the offer was abstract, and asking for two decisions meant the
 * easier one got taken.
 *
 * The second fixed the content and broke the shape. Putting the headline in a
 * 56% column wrapped display type onto four lines, and a tall panel plus a
 * full-width slab plus a note stacked into a section about three screens long.
 * A closing CTA that scrolls is not closing anything.
 *
 * ── The constraint this version is built to ─────────────────────────────────
 * It has to fit on one screen. Everything below follows from that:
 *
 *   · The headline gets the full container width, so it sets on two lines at
 *     full size instead of four at a squeeze.
 *   · The three checks are one inline row, not a panel of three rows each with
 *     a description under it.
 *   · The note is gone. It listed the same three things the checks list, in a
 *     sentence, directly above them. It was not supporting copy, it was the
 *     same content twice.
 *   · One rule separates the promise from the action. Not a bordered card,
 *     which is a box drawn around something that did not need one.
 *
 * ── One action ──────────────────────────────────────────────────────────────
 * The audit is the button. The call booking is a text link beneath it, which
 * is the weight a second option deserves: it is for people who did not want
 * the first one.
 *
 * ── The mark behind it ──────────────────────────────────────────────────────
 * An oversized asterisk bleeding off the right edge, turning slowly. A brand
 * mark that fits inside the container reads as a logo placed on the page; one
 * that runs off it reads as the page being printed on the brand.
 *
 * ── The headline drifts ─────────────────────────────────────────────────────
 * Two lines moving opposite ways on `xPercent`, scrubbed. It echoes the hero,
 * where the two words converge, so the page opens and closes on the same idea.
 *
 * Both lines drift within 0 to +8%, never negative. The container clips its
 * overflow, and a line that starts shifted left loses its first letter behind
 * the left edge ("IND OUT WHAT"). Both lines are short, so the room to move is
 * all on the right.
 *
 * ── Brand blue ──────────────────────────────────────────────────────────────
 * The one saturated band on the page, via `theme-blue` (see globals.css). It
 * closes the page on the cover artwork's pairing, blue with lime, and sits
 * directly above the lime ticker band in the footer.
 */

/**
 * What the audit looks at.
 *
 * ⚠️  Must stay in step with `offer.primary.note` in config/site, which says
 *     the same thing in a sentence. If the offer changes, both change.
 */
const CHECKS = ["Your website", "Google Business Profile", "Ad accounts"];

function Tick({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="none" aria-hidden>
      <path
        d="M2.5 8.5L6 12l7.5-8"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="square"
      />
    </svg>
  );
}

export function CTA() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      ScrollTrigger.create({
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        toggleClass: "is-alive",
      });

      gsap.utils.toArray<HTMLElement>("[data-drift]", el).forEach((line, i) => {
        /* Opposite directions, both inside 0 to 8. */
        const [from, to] = i % 2 === 0 ? [0, 8] : [8, 0];
        gsap.fromTo(
          line,
          { xPercent: from },
          {
            xPercent: to,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.5,
            },
          }
        );
      });

      const checks = gsap.utils.toArray<HTMLElement>("[data-check]", el);
      if (checks.length && el.getBoundingClientRect().top > window.innerHeight) {
        gsap.fromTo(
          checks,
          { autoAlpha: 0, y: 12 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: EASE.expo,
            stagger: 0.1,
            scrollTrigger: { trigger: el, start: "top 72%", once: true },
          }
        );
      }
    },
    { scope: root }
  );

  const { primary, fallback } = siteConfig.offer;

  return (
    <section
      ref={root}
      className="theme-blue grain relative overflow-hidden bg-background py-(--spacing-section)"
    >
      {/* Depth. A flat saturated fill reads as a banner ad; a darker corner
          and a lifted centre make it read as lit. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(80% 90% at 20% 0%, rgb(255 255 255 / 0.10) 0%, transparent 60%), radial-gradient(70% 80% at 100% 100%, rgb(11 11 11 / 0.35) 0%, transparent 70%)",
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute -right-[18%] top-1/2 hidden w-[36rem] -translate-y-1/2 opacity-[0.12] lg:block"
      >
        <Logomark className="mark-turn" color="lime" decorative />
      </div>

      <Container className="relative">
        <div className="flex items-center gap-3">
          <MarkAnchor size="w-4" />
          <p className="eyebrow text-accent">Start here</p>
        </div>

        {/* Full container width. This is the whole reason the headline sets on
            two lines rather than four: display type needs room, and taking it
            away to make space for a column beside it costs more than the
            column is worth.

            Wrapped in `overflow-hidden` so the drift can never push a line
            past the viewport edge and create a horizontal scrollbar.

            At the hero's 0.94 line-height that clip would also cut the g in
            "missing", so the wrapper carries bottom padding with an equal
            negative margin. `text-h1` sets its em to the headline's size so
            0.18em means the same thing here as on the lines inside. */}
        <div className="mt-8 overflow-hidden pb-[0.18em] -mb-[0.18em] text-h1 lg:mt-10">
          <span
            data-drift
            className="block font-display text-h1 leading-[0.94] text-foreground"
          >
            Find out what
          </span>
          <span
            data-drift
            className="block font-display text-h1 leading-[0.94] text-foreground"
          >
            you are <span className="text-accent">missing</span>
          </span>
        </div>

        {/* One rule, and the action sits under it. A bordered card here would
            be a box drawn around something that did not need one. */}
        <div className="mt-12 border-t border-line pt-10 lg:mt-16 lg:flex lg:items-end lg:justify-between lg:gap-16">
          <div className="lg:min-w-0">
            {/* Three items on one line. As a panel of three rows with a
                description under each, this was taller than the headline, for
                content that is a list of three nouns. */}
            <ul className="flex flex-wrap gap-x-8 gap-y-4">
              {CHECKS.map((c) => (
                <li
                  key={c}
                  data-check
                  className="flex items-center gap-2.5 text-nowrap"
                >
                  <Tick className="size-4 shrink-0 text-accent" />
                  <span className="font-display text-body text-foreground">
                    {c}
                  </span>
                </li>
              ))}
            </ul>

            <p className="mt-5 text-small text-faint">
              Yours to keep, whether or not you hire us.
            </p>
          </div>

          <div className="mt-10 shrink-0 lg:mt-0">
            <Button
              href={primary.href}
              size="lg"
              className="min-h-16 w-full text-h4 sm:w-auto"
            >
              {primary.label}
            </Button>

            <p className="mt-4 text-small text-muted lg:text-right">
              Not ready for that?{" "}
              <Link
                href={fallback.href}
                className="text-foreground underline decoration-line-strong underline-offset-4 transition-colors duration-base hover:text-accent hover:decoration-accent"
              >
                {fallback.label}
              </Link>
              .
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
