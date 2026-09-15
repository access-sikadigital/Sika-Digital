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
import { Placeholder } from "@/components/ui/Placeholder";
import { RankList } from "@/components/graphics/Schematic";
import { CTA } from "@/components/sections/CTA";

/**
 * SEO.
 *
 * ── The argument ────────────────────────────────────────────────────────────
 * Ranking is not the product. Ranking for things people search when they are
 * about to spend money is the product, and those are different jobs that look
 * identical on a report. That distinction is the whole page, because it is
 * also the most common way an SEO retainer quietly wastes a year: the graph
 * goes up, the phone does not ring, and nobody can say why.
 *
 * ── Built to not resemble the web design page ───────────────────────────────
 * Both are Tier 1 service hubs and a visitor may well read them back to back,
 * so they have been given different bones on purpose.
 *
 *   Web design  vertical opening, horizontal scrolling stages, a five-row list
 *   SEO         a scrubbed counter, a two-column comparison, a timeline
 *
 * If a second service page ever gets built by copying one of these, copy the
 * reasoning rather than the layout.
 *
 * ── Copy rules ──────────────────────────────────────────────────────────────
 * No jargon a tradesperson would have to look up. The terms that survive are
 * the ones where the plain phrase would be vaguer rather than simpler: "map
 * pack" is one, because it is a specific place on a specific results page.
 *
 * Nothing here claims a result. No traffic figures, no rankings, no
 * timeframes presented as promises. The honest version of "how long does SEO
 * take" is in the timeline below and it does not have a number in it.
 */

/** The distinction the page is built on. */
const COMPARE = {
  vanity: [
    "Ranks for the industry term with the biggest number beside it",
    "Traffic is up and nobody can tell you from where",
    "The report arrives monthly and says everything is fine",
    "Top of page one for a phrase your customers never type",
  ],
  useful: [
    "Ranks for what someone types when the thing is already broken",
    "You can name the five searches that bring the good jobs",
    "The report says how many enquiries, and which ones were worth it",
    "Visible in the map pack for the suburbs you actually drive to",
  ],
};

const TIMELINE = [
  {
    t: "First few weeks",
    c: "The fixes that have been costing you rankings for years. Pages search cannot read, slow templates, a Google listing with the wrong opening hours on it. Unglamorous and usually the biggest single jump.",
  },
  {
    t: "The first couple of months",
    c: "The pages that answer what people actually search. One page per thing you do, per place you do it. This is the part that compounds and it is the part most agencies skip because it is work.",
  },
  {
    t: "After that",
    c: "Authority. Other sites referencing yours, reviews arriving steadily, the listing being used rather than just existing. Slow, and the reason a site that has done the first two still outranks a newer one that has done them better.",
  },
  {
    t: "What we will not tell you",
    c: "A date. Anyone who gives you one for a search result they do not control is guessing and knows it. What we will give you is the order, the reasoning, and something to check against each month.",
  },
];

export function SeoContent() {
  const page = getPage("seo");
  const group = serviceGroups.find((g) => g.href === page.url);

  const compareRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLElement>(null);

  /* ── The comparison fills in, one pair at a time ───────────────────────────
     Both columns of a row arrive together, so the two halves are always read
     as a pair. Animating each column separately would let the left one get
     four rows ahead of the right, which turns a comparison into two lists. */
  useGSAP(
    () => {
      const el = compareRef.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      ScrollTrigger.create({
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        toggleClass: "is-alive",
      });

      if (el.getBoundingClientRect().top < window.innerHeight * 0.95) return;

      gsap.fromTo(
        el.querySelectorAll("[data-pair]"),
        { autoAlpha: 0, y: 20 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: EASE.expo,
          stagger: 0.12,
          scrollTrigger: { trigger: el, start: "top 72%", once: true },
        }
      );
    },
    { scope: compareRef }
  );

  /* ── The timeline draws down as you pass it ────────────────────────────────
     One scrubbed tween on a vertical rule, plus a reveal per entry. The rule
     is a position readout: it is only ever as far down as you are, so it says
     "this is a sequence in time" without a single date being printed. */
  useGSAP(
    () => {
      const el = timelineRef.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const rule = el.querySelector<HTMLElement>("[data-spine]");
      if (rule) {
        gsap.fromTo(
          rule,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            transformOrigin: "center top",
            scrollTrigger: {
              trigger: el,
              start: "top 65%",
              end: "bottom 75%",
              scrub: 0.5,
            },
          }
        );
      }

      gsap.utils.toArray<HTMLElement>("[data-entry]", el).forEach((entry) => {
        if (entry.getBoundingClientRect().top < window.innerHeight * 0.95)
          return;

        gsap.fromTo(
          entry,
          { autoAlpha: 0, x: 24 },
          {
            autoAlpha: 1,
            x: 0,
            duration: 0.8,
            ease: EASE.expo,
            scrollTrigger: { trigger: entry, start: "top 82%", once: true },
          }
        );
      });
    },
    { scope: timelineRef }
  );

  return (
    <main className="pt-32 lg:pt-40">
      {/* ── Opening ────────────────────────────────────────────────────── */}
      <Container>
        <Reveal y={14} className="flex items-center gap-4">
          <MarkAnchor size="w-3.5" />
          <p className="eyebrow shrink-0 text-accent">SEO</p>
          <Rule className="flex-1" delay={0.15} />
        </Reveal>

        <div className="mt-8 lg:flex lg:items-end lg:gap-16">
          <SplitLines
            as="h1"
            className="max-w-[15ch] font-display text-h1 uppercase leading-[0.94] text-foreground lg:shrink-0"
          >
            {page.h1}
          </SplitLines>

          <Reveal
            delay={0.12}
            className="mt-8 max-w-text lg:mt-0 lg:min-w-0 lg:flex-1 lg:border-l lg:border-line lg:pb-2 lg:pl-12"
          >
            <Rule className="mb-6 w-12 bg-accent" delay={0.3} />
            <p className="text-lead text-muted">
              Being found is easy to sell and hard to check. Being found by
              someone who is about to spend money is the whole job.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="mt-16 lg:mt-24">
          <div className="rounded-card border border-line bg-surface p-6 sm:p-10 lg:p-16">
            <RankList className="mx-auto w-full max-w-3xl" />
          </div>
        </Reveal>
      </Container>

      {/* ── The distinction ─────────────────────────────────────────────── */}
      <section
        ref={compareRef}
        className="mt-28 border-y border-line bg-surface py-(--spacing-section) lg:mt-40"
      >
        <Container>
          <Reveal y={14} className="flex items-center gap-4">
            <MarkAnchor size="w-3.5" />
            <p className="eyebrow shrink-0 text-accent">The difference</p>
            <Rule className="flex-1" delay={0.15} />
          </Reveal>

          <SplitLines
            as="h2"
            className="mt-8 max-w-[20ch] font-display text-h2 uppercase leading-[0.96] text-foreground"
          >
            <>
              Two kinds of first place. Only one of them{" "}
              <span className="text-accent">pays</span>.
            </>
          </SplitLines>

          {/* Two labelled columns, and the rows are paired rather than
              stacked, so each line is read against its opposite. */}
          <div className="mt-14 lg:mt-20">
            <div className="hidden gap-8 border-b border-line pb-4 lg:grid lg:grid-cols-2">
              <p className="font-mono text-eyebrow uppercase tracking-wider text-faint">
                What gets reported
              </p>
              <p className="font-mono text-eyebrow uppercase tracking-wider text-accent">
                What gets you work
              </p>
            </div>

            {COMPARE.vanity.map((v, i) => (
              <div
                key={v}
                data-pair
                className="grid gap-4 border-b border-line py-7 lg:grid-cols-2 lg:gap-8"
              >
                <p className="flex gap-4 text-body text-faint lg:pr-8">
                  <span aria-hidden className="shrink-0 text-line-strong">
                    &times;
                  </span>
                  <span className="line-through decoration-line-strong">
                    {v}
                  </span>
                </p>
                <p className="flex gap-4 text-body text-foreground">
                  <span aria-hidden className="shrink-0 text-accent">
                    &rarr;
                  </span>
                  <span>{COMPARE.useful[i]}</span>
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── What we do about it ─────────────────────────────────────────── */}
      <section ref={timelineRef} className="py-(--spacing-section)">
        <Container>
          <Reveal y={14} className="flex items-center gap-4">
            <MarkAnchor size="w-3.5" />
            <p className="eyebrow shrink-0 text-accent">How long it takes</p>
            <Rule className="flex-1" delay={0.15} />
          </Reveal>

          <SplitLines
            as="h2"
            className="mt-8 max-w-[18ch] font-display text-h2 uppercase leading-[0.96] text-foreground"
          >
            The order matters more than the speed.
          </SplitLines>

          <div className="relative mt-16 lg:mt-24 lg:pl-16">
            {/* The spine. Drawn under the entries so an entry's own background
                never has to sit on top of a line running through it. */}
            <div
              aria-hidden
              className="absolute left-0 top-2 hidden h-[calc(100%-1rem)] w-px bg-line lg:block"
            >
              <span
                data-spine
                className="absolute inset-0 block origin-top bg-accent"
              />
            </div>

            <ol className="flex flex-col gap-14 lg:gap-20">
              {TIMELINE.map((entry, i) => (
                <li key={entry.t} data-entry className="relative">
                  <span
                    aria-hidden
                    className="absolute -left-16 top-2 hidden size-2.5 rounded-full bg-accent lg:block"
                    style={{ marginLeft: "-4.5px" }}
                  />

                  <div className="lg:flex lg:items-baseline lg:gap-12">
                    <h3 className="font-display text-h3 uppercase leading-tight text-foreground lg:w-[34%] lg:shrink-0">
                      {entry.t}
                    </h3>
                    <p className="mt-4 max-w-text text-body text-muted lg:mt-0 lg:min-w-0 lg:flex-1">
                      {entry.c}
                    </p>
                  </div>

                  {i === TIMELINE.length - 1 ? null : (
                    <div className="mt-10 lg:hidden">
                      <Rule className="w-16 bg-line-strong" />
                    </div>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {/* ── Proof, when there is some ───────────────────────────────────── */}
      <section className="border-y border-line bg-surface py-(--spacing-section)">
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
              label="A Search Console graph over twelve months. Real account, figures legible."
            />
            <Placeholder
              ratio="4/3"
              index="02"
              label="A map pack result for a real suburb. Screenshot, not a mockup."
            />
            <Placeholder
              ratio="4/3"
              index="03"
              label="A ranking page you wrote, on screen, scrolled to the useful part."
            />
          </div>

          <Reveal delay={0.1} className="mt-10">
            <p className="max-w-text text-small text-faint">
              Screenshots from real accounts go here. Until then these are
              placeholders, because a page about honest reporting is the last
              place to put an invented graph.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ── Where to go next ────────────────────────────────────────────── */}
      {group ? (
        <section className="py-(--spacing-section)">
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
