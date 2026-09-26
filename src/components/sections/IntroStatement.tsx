"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, EASE } from "@/lib/gsap";
import { introStatement, introChain } from "@/config/home";
import { serviceGroups } from "@/config/pages";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { MarkAnchor } from "@/components/motion/MarkFlight";
import { FlowNodes } from "@/components/graphics/Schematic";

/**
 * INTRO — the positioning, built as a sequence rather than a paragraph.
 *
 * ── What this replaced, and why ─────────────────────────────────────────────
 * The previous version was a label, a column of three stats, and a paragraph
 * beside them. It was competent and completely generic: that arrangement is on
 * a very large share of agency sites, because it is what you reach for when you
 * have a sentence and a grid and no idea.
 *
 * The problem was that the layout carried no meaning. Any copy could have gone
 * in it. Here the copy IS the layout: the sentence is broken into its four
 * verbs, laid across the full width in the order the work actually happens, and
 * a rule draws through them as you scroll. Reading left to right walks you
 * through the engagement.
 *
 * That also fixes the thing the paragraph version could never fix. "We do all
 * of it" is a claim. A sequence of four numbered stages is a demonstration, and
 * the reader arrives at the conclusion themselves.
 *
 * ── No comparison to other agencies ─────────────────────────────────────────
 * The earlier copy opened with "Most agencies sell you a channel". Easy to
 * write, and it puts a competitor in the reader's head at the exact moment you
 * want them thinking about you. Dropped.
 *
 * ── The animation ──────────────────────────────────────────────────────────
 * A lime rule draws left to right, scrubbed to scroll, and the four links rise
 * into it staggered. One scrubbed tween plus one staggered tween, so the whole
 * section costs two ScrollTriggers.
 *
 * `fromTo` throughout, and the rule's resting state is `scaleX(1)`, so if the
 * JavaScript never runs the section still reads correctly with the line drawn
 * and every link in place.
 */
export function IntroStatement() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      /* The wiring diagram's traffic loops only while the section is on
         screen. See the note on `.sch` in globals.css. */
      ScrollTrigger.create({
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        toggleClass: "is-alive",
      });

      /* The rule draws across as the section passes through the viewport. */
      const rule = el.querySelector<HTMLElement>("[data-rule]");
      if (rule) {
        gsap.fromTo(
          rule,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            transformOrigin: "left center",
            scrollTrigger: {
              trigger: el,
              start: "top 70%",
              end: "bottom 80%",
              scrub: 0.5,
            },
          }
        );
      }

      /* ── The wiring draws itself ─────────────────────────────────────────
         Nodes arrive first, then the joins are drawn between them. Drawing a
         path is the one piece of SVG motion that says something a fade cannot:
         it shows a connection being made, in a direction, which is exactly the
         claim the headline beside it is making.

         The length is measured from the path rather than guessed, so the dash
         maths stays correct if the diagram is ever redrawn. */
      const diagram = el.querySelector<HTMLElement>("[data-diagram]");

      if (diagram) {
        const nodes = diagram.querySelectorAll<SVGElement>("[data-g='node']");
        const wires = diagram.querySelectorAll<SVGPathElement>(
          "[data-g='wire'] path"
        );

        if (nodes.length) {
          gsap.fromTo(
            nodes,
            { autoAlpha: 0, xPercent: 3 },
            {
              autoAlpha: 1,
              xPercent: 0,
              duration: 0.7,
              ease: EASE.quart,
              stagger: 0.09,
              scrollTrigger: {
                trigger: diagram,
                start: "clamp(top 80%)",
                once: true,
              },
            }
          );
        }

        wires.forEach((wire, i) => {
          const len = wire.getTotalLength();

          gsap.fromTo(
            wire,
            { strokeDasharray: len, strokeDashoffset: len },
            {
              strokeDashoffset: 0,
              duration: 1.1,
              delay: 0.25 + i * 0.12,
              ease: EASE.quart,
              /* Cleared on completion so the stroke goes back to being a plain
                 solid line. A dasharray left on a finished path is invisible
                 at full offset but reappears as a dotted line the moment
                 anything re-renders or the SVG is scaled. */
              onComplete: () => gsap.set(wire, { clearProps: "strokeDasharray,strokeDashoffset" }),
              scrollTrigger: {
                trigger: diagram,
                start: "clamp(top 80%)",
                once: true,
              },
            }
          );
        });
      }

      const links = gsap.utils.toArray<HTMLElement>("[data-link]", el);
      if (links.length) {
        gsap.fromTo(
          links,
          { yPercent: 40, autoAlpha: 0 },
          {
            yPercent: 0,
            autoAlpha: 1,
            duration: 1,
            ease: EASE.expo,
            stagger: 0.09,
            scrollTrigger: { trigger: el, start: "clamp(top 68%)", once: true },
          }
        );
      }
    },
    { scope: root }
  );

  return (
    <section ref={root} className="grain relative py-(--spacing-section)">
      <Container>
        <div className="flex items-center gap-3">
          <MarkAnchor size="w-3.5" />
          <p className="eyebrow text-accent">What we actually do</p>
        </div>

        {/* ── Headline and diagram ────────────────────────────────────────
            The headline is set at 12ch, which left most of this row empty and
            made the first section after the hero read as a wall of type with a
            gap beside it.

            The diagram is the wiring: a form on the left, the things that fire
            when someone submits it on the right, and the joins drawn between
            them. It is the literal picture of "the whole thing", which is what
            the headline claims and what the four links underneath spell out,
            so it earns the space rather than filling it. */}
        <div className="mt-10 lg:flex lg:items-center lg:gap-16">
          <h2 className="max-w-[12ch] font-display text-h1 leading-[0.94] text-foreground lg:shrink-0">
            {introStatement}
          </h2>

          <div
            data-diagram
            className="mt-12 w-full max-w-md lg:mt-0 lg:min-w-0 lg:flex-1"
          >
            <FlowNodes />
          </div>
        </div>

        {/* ── The chain ──────────────────────────────────────────────────
            Full width, four equal columns on desktop, two on tablet, one on a
            phone. The rule sits above them and draws through as you scroll. */}
        <div className="mt-20 lg:mt-28">
          <div className="relative h-px w-full bg-line">
            <span
              data-rule
              aria-hidden
              className="absolute inset-0 block origin-left bg-accent"
            />
          </div>

          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {introChain.map((link, i) => (
              <li
                key={link.n}
                data-link
                className={
                  /* Rules between columns rather than around each cell, so the
                     row reads as one continuous run instead of four boxes. */
                  "border-b border-line py-10 lg:border-b-0 " +
                  (i > 0 ? "lg:border-l lg:border-line lg:pl-8" : "lg:pr-8")
                }
              >
                <span className="font-mono text-eyebrow tabular-nums text-faint">
                  {link.n}
                </span>

                <span className="mt-5 block font-display text-h2 leading-[0.94] text-accent">
                  {link.verb}
                </span>

                <span className="mt-3 block text-lead text-muted">
                  {link.object}
                </span>
              </li>
            ))}
          </ol>
        </div>

        {/*
          Meta strip. The three facts that used to occupy a whole column are
          now one quiet line, which is the weight they deserve: they are
          reassurance, not argument.

          All three are already true elsewhere in the config. Nothing invented.
        */}
        <p className="mt-16 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line pt-8 font-mono text-eyebrow uppercase tracking-wider text-faint">
          <span>{siteConfig.homeCity}, working Australia wide</span>
          <span aria-hidden className="text-line-strong">
            /
          </span>
          <span className="tabular-nums">
            {String(serviceGroups.length).padStart(2, "0")} service lines, one
            team
          </span>
          <span aria-hidden className="text-line-strong">
            /
          </span>
          <span>{siteConfig.founder.credential}</span>
        </p>
      </Container>
    </section>
  );
}
