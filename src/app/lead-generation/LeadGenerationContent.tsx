"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, EASE } from "@/lib/gsap";
import { getPage, serviceGroups } from "@/config/pages";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { SplitLines } from "@/components/motion/SplitLines";
import { Rule } from "@/components/motion/Rule";
import { MarkAnchor } from "@/components/motion/MarkFlight";
import { PageOpening } from "@/components/ui/PageOpening";
import { Placeholder } from "@/components/ui/Placeholder";
import { FlowNodes } from "@/components/graphics/Schematic";
import { CTA } from "@/components/sections/CTA";

/**
 * SYSTEMS & AUTOMATION.
 *
 * ── The argument ────────────────────────────────────────────────────────────
 * Every other page sells more enquiries. This one sells keeping the ones
 * already arriving, which is the cheapest work on the list and the last thing
 * anyone buys, because a leak is invisible in a way an empty pipeline is not.
 *
 * The page is built around making it visible. A funnel that narrows as you
 * scroll, with what was lost named at each step.
 *
 * ── Built to not resemble the other service pages ───────────────────────────
 *   Web design    horizontal stage track, technical list
 *   SEO           paired comparison, drawn timeline
 *   Google Ads    scrubbed spend bar, struck-through search terms
 *   Paid social   two creative columns at two speeds
 *   Systems       a narrowing funnel, scrubbed
 *
 * ── The funnel carries no numbers ───────────────────────────────────────────
 * Same rule as the spend bar on the Google Ads page. The stages narrow by a
 * shape, not a measured rate, and no percentage appears anywhere near them.
 * An invented drop-off figure on a page about honest measurement would undo
 * the argument it is drawn to make.
 */

const STAGES = [
  {
    t: "They call",
    lost: "Nobody answers. You are under a house.",
    fix: "A text goes out the second the call is missed, from your number, saying you will ring back. Most people wait when they get one. Almost nobody waits when they do not.",
  },
  {
    t: "They fill in the form",
    lost: "It lands in an inbox with the invoices.",
    fix: "The enquiry goes to your phone, not your email, and it goes somewhere you can see who has not been called back yet.",
  },
  {
    t: "You quote",
    lost: "They go quiet and you feel rude chasing.",
    fix: "Two follow-ups, written once, sent automatically. This is the single highest-return thing on this page and it is the one nobody does.",
  },
  {
    t: "They book",
    lost: "The job goes well and that is the end of it.",
    fix: "A review request when the work is fresh, and a reminder next year for anything with a next year. The cheapest lead you will ever get is one you already served.",
  },
];

const SPEED = [
  {
    t: "Five minutes",
    c: "Ring back inside that and you are usually the only one who has. The other three quotes have not called yet.",
  },
  {
    t: "An hour",
    c: "Still fine. They are probably still at the kitchen table thinking about it.",
  },
  {
    t: "Tomorrow morning",
    c: "Someone else has been and gone. You are now the second quote, which is a different conversation and usually a worse one.",
  },
  {
    t: "Tuesday",
    c: "You are ringing to be told they went with someone else. This is the call most trades spend their week making.",
  },
];

export function LeadGenerationContent() {
  const page = getPage("lead-generation");
  const group = serviceGroups.find((g) => g.href === page.url);

  const funnelRef = useRef<HTMLElement>(null);
  const speedRef = useRef<HTMLElement>(null);

  /* ── The funnel narrows as you go down it ──────────────────────────────────
     Each stage's bar is scrubbed to its own position, so the narrowing happens
     under the reader rather than before they arrive. Width again, not scaleX,
     for the same reason as the Google Ads bar: these bars are labelled and a
     transform would stretch the label with them.

     Four bars, one property. Layout cost is real and affordable here, and the
     alternative distorts type. */
  useGSAP(
    () => {
      const el = funnelRef.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      ScrollTrigger.create({
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        toggleClass: "is-alive",
      });

      gsap.utils.toArray<HTMLElement>("[data-stage]", el).forEach((stage, i) => {
        const bar = stage.querySelector<HTMLElement>("[data-bar]");
        if (!bar) return;

        /* Each stage keeps less than the one above it. The steps are uneven on
           purpose: an even taper reads as a graphic, an uneven one reads as
           something that was measured. */
        const width = [100, 74, 52, 33][i] ?? 25;

        gsap.fromTo(
          bar,
          { width: `${[100, 100, 74, 52][i] ?? 100}%` },
          {
            width: `${width}%`,
            ease: "none",
            scrollTrigger: {
              trigger: stage,
              start: "top 85%",
              end: "top 45%",
              scrub: 0.5,
            },
          }
        );

        if (stage.getBoundingClientRect().top < window.innerHeight * 0.95)
          return;

        gsap.fromTo(
          stage.querySelectorAll("[data-copy]"),
          { autoAlpha: 0, y: 18 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: EASE.expo,
            stagger: 0.08,
            scrollTrigger: { trigger: stage, start: "top 80%", once: true },
          }
        );
      });
    },
    { scope: funnelRef }
  );

  /* ── The clock ────────────────────────────────────────────────────────────
     A single rule that fills across the four windows, scrubbed. It is the same
     device as the funnel turned on its side, which is intentional: both
     sections are about the same thing losing value over a dimension. */
  useGSAP(
    () => {
      const el = speedRef.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const line = el.querySelector<HTMLElement>("[data-track]");
      if (!line) return;

      gsap.fromTo(
        line,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          transformOrigin: "left center",
          scrollTrigger: {
            trigger: el,
            start: "top 72%",
            end: "bottom 80%",
            scrub: 0.5,
          },
        }
      );
    },
    { scope: speedRef }
  );

  return (
    <main className="pt-32 lg:pt-40">
      <PageOpening
        eyebrow="Systems & automation"
        title={page.h1}
        titleMax="max-w-[15ch]"
        intro="The cheapest enquiry you will ever get is the one you already paid for and never called back."
      />

      {/* ── The leak ────────────────────────────────────────────────────── */}
      <section
        ref={funnelRef}
        className="mt-24 border-y border-line bg-surface py-(--spacing-section) lg:mt-36"
      >
        <Container>
          <Reveal y={14} className="flex items-center gap-4">
            <MarkAnchor size="w-3.5" />
            <p className="eyebrow shrink-0 text-accent">Where it goes</p>
            <Rule className="flex-1" delay={0.15} />
          </Reveal>

          <SplitLines
            as="h2"
            className="mt-8 max-w-[19ch] font-display text-h2 uppercase leading-[0.96] text-foreground"
          >
            <>
              Four places an enquiry{" "}
              <span className="text-accent">quietly</span> disappears.
            </>
          </SplitLines>

          <div className="mt-16 flex flex-col gap-12 lg:mt-24 lg:gap-16">
            {STAGES.map((s, i) => (
              <div key={s.t} data-stage>
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-eyebrow tabular-nums text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-h3 uppercase leading-none text-foreground">
                    {s.t}
                  </h3>
                </div>

                {/* The bar. Its width is the only thing carrying the funnel,
                    so it sits above the copy where it cannot be missed. */}
                <div className="mt-6 h-8 w-full rounded-sm bg-line/40 lg:h-11">
                  <div
                    data-bar
                    className="h-full rounded-sm bg-accent"
                    style={{ width: `${[100, 100, 74, 52][i] ?? 100}%` }}
                  />
                </div>

                <div className="mt-6 lg:flex lg:gap-12">
                  <p
                    data-copy
                    className="flex gap-3 text-body text-faint lg:w-[38%] lg:shrink-0"
                  >
                    <span aria-hidden className="shrink-0 text-line-strong">
                      &times;
                    </span>
                    <span>{s.lost}</span>
                  </p>
                  <p
                    data-copy
                    className="mt-4 max-w-text text-body text-muted lg:mt-0 lg:min-w-0 lg:flex-1"
                  >
                    {s.fix}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-14 max-w-text text-small text-faint">
            The bars are a shape, not a measurement. No drop-off figure appears
            here because we do not have yours yet, and a page about measuring
            things properly is the wrong place to guess.
          </p>
        </Container>
      </section>

      {/* ── Speed ───────────────────────────────────────────────────────── */}
      <section ref={speedRef} className="py-(--spacing-section)">
        <Container>
          <Reveal y={14} className="flex items-center gap-4">
            <MarkAnchor size="w-3.5" />
            <p className="eyebrow shrink-0 text-accent">Speed to lead</p>
            <Rule className="flex-1" delay={0.15} />
          </Reveal>

          <SplitLines
            as="h2"
            className="mt-8 max-w-[18ch] font-display text-h2 uppercase leading-[0.96] text-foreground"
          >
            The quote is usually won before anyone quotes.
          </SplitLines>

          <div className="relative mt-16 lg:mt-24">
            <div className="h-px w-full bg-line">
              <span
                data-track
                aria-hidden
                className="block h-px origin-left bg-accent"
              />
            </div>

            <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {SPEED.map((s, i) => (
                <li
                  key={s.t}
                  className={
                    "border-b border-line py-9 lg:border-b-0 " +
                    (i > 0 ? "lg:border-l lg:border-line lg:pl-8" : "lg:pr-8")
                  }
                >
                  <span className="font-mono text-eyebrow tabular-nums text-faint">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-5 font-display text-h3 uppercase leading-none text-accent">
                    {s.t}
                  </h3>
                  <p className="mt-4 text-body text-muted">{s.c}</p>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {/* ── What gets built ─────────────────────────────────────────────── */}
      <section className="border-y border-line bg-surface py-(--spacing-section)">
        <Container>
          <div className="lg:flex lg:items-center lg:gap-16 xl:gap-24">
            <div className="lg:w-[46%] lg:shrink-0">
              <SplitLines
                as="h2"
                className="max-w-[18ch] font-display text-h2 uppercase leading-[0.96] text-foreground"
              >
                One enquiry in, four things out.
              </SplitLines>

              <Reveal delay={0.1}>
                <p className="mt-8 max-w-text text-lead text-muted">
                  A form gets filled in. A text goes to the customer, a
                  notification goes to your phone, a card appears in the
                  pipeline, and a follow-up is scheduled for the day after a
                  quote goes out.
                </p>
                <p className="mt-6 max-w-text text-body text-muted">
                  None of it is clever. All of it happens whether or not anyone
                  remembered, which is the entire value, because the days you
                  forget are the days you were busiest.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.15} className="mt-14 lg:mt-0 lg:min-w-0 lg:flex-1">
              <div className="rounded-card border border-line bg-background p-6 sm:p-10">
                <FlowNodes className="w-full" />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── Evidence ────────────────────────────────────────────────────── */}
      <section className="py-(--spacing-section)">
        <Container>
          <Reveal y={14} className="flex items-center gap-4">
            <MarkAnchor size="w-3.5" />
            <p className="eyebrow shrink-0 text-accent">Evidence</p>
            <Rule className="flex-1" delay={0.15} />
          </Reveal>

          <div className="mt-14 grid gap-4 lg:mt-20 lg:grid-cols-3">
            <Placeholder
              ratio="4/3"
              index="01"
              label="A real missed-call text, screenshotted from a phone."
            />
            <Placeholder
              ratio="4/3"
              index="02"
              label="A pipeline with real cards in it. Names blurred, stages legible."
            />
            <Placeholder
              ratio="4/3"
              index="03"
              label="A follow-up sequence that recovered a job. The actual messages."
            />
          </div>

          <Reveal delay={0.1} className="mt-10">
            <p className="max-w-text text-small text-faint">
              Real screenshots go here. Placeholders until then.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ── Where to go next ────────────────────────────────────────────── */}
      {group && group.children.length > 1 ? (
        <section className="border-t border-line py-(--spacing-section)">
          <Container>
            <SplitLines
              as="h2"
              className="max-w-[18ch] font-display text-h2 uppercase leading-[0.96] text-foreground"
            >
              More specific than that?
            </SplitLines>

            <ul className="mt-12 grid gap-3 sm:grid-cols-2">
              {group.children.map((child) => (
                <li key={child.href}>
                  <Link
                    href={child.href}
                    className="group flex items-center justify-between gap-6 rounded-card border border-line bg-surface p-7 transition-colors duration-slow ease-out-quart hover:border-accent"
                  >
                    <span className="font-display text-h4 uppercase leading-tight text-foreground transition-colors duration-base group-hover:text-accent">
                      {child.label}
                    </span>
                    <span
                      aria-hidden
                      className="shrink-0 text-lead text-accent transition-transform duration-base ease-out-quart group-hover:translate-x-1"
                    >
                      &rarr;
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-12">
              <Button href="/services/" variant="outline" size="lg">
                All services
              </Button>
            </div>
          </Container>
        </section>
      ) : null}

      <CTA />
    </main>
  );
}
