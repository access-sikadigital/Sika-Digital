"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, EASE } from "@/lib/gsap";
import { getPage, serviceGroups } from "@/config/pages";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { SplitLines } from "@/components/motion/SplitLines";
import { Rule } from "@/components/motion/Rule";
import { MarkAnchor } from "@/components/motion/MarkFlight";
import {
  SiteFrame,
  RankList,
  MarkAds,
  MarkSocial,
  FlowNodes,
} from "@/components/graphics/Schematic";
import { CTA } from "@/components/sections/CTA";

/**
 * SERVICES HUB.
 *
 * ── What a hub is for ───────────────────────────────────────────────────────
 * Not a menu. The nav is already a menu, and anyone who wanted a list of links
 * has one two clicks away at all times. A hub earns its place by saying the
 * thing the individual pages cannot say about themselves: how the five fit
 * together, and in what order.
 *
 * So this page is built as a sequence rather than a grid. Websites first
 * because everything else points traffic at it, then the two ways of getting
 * traffic there, then the thing that catches what arrives. Read top to bottom
 * it is an argument; a grid of five equal cards would be a directory.
 *
 * ── Every row is different on purpose ───────────────────────────────────────
 * The image side alternates left and right down the page. That is the cheapest
 * way to stop five identical rows reading as a table, and it means the eye has
 * to move to find the next one, which is what keeps someone reading past row
 * three.
 *
 * ── No prices ───────────────────────────────────────────────────────────────
 * Deliberate, and worth stating so nobody adds them later without deciding to.
 * The scope names lead quality as the thing to protect, and a price on a hub
 * page filters on budget before anyone has established what the work is worth.
 */

/**
 * The argument for each service, and the drawing that goes with it.
 *
 * Keyed by href so it cannot drift out of step with the nav, the footer or the
 * homepage, all of which read the same `serviceGroups`. A group with no entry
 * here still renders, with its config blurb and no drawing, so adding a sixth
 * service does not break this page.
 */
const DETAIL: Record<
  string,
  { line: string; body: string; art: React.ReactNode }
> = {
  "/web-design/": {
    line: "Everything else points here",
    body: "You can send a thousand people a day at a site that does not ask for the job, and you will have a thousand people a day who did not call. This is the only part of the list that the rest of the list depends on, which is why it goes first.",
    art: <SiteFrame className="w-full" />,
  },
  "/seo/": {
    line: "The traffic that does not stop when you stop paying",
    body: "Slower to arrive and it stays. Someone searching for what you do, in the suburb you work in, at the moment the thing has already gone wrong. That is the most qualified visitor you will ever get and it costs nothing per click.",
    art: <RankList className="w-full" />,
  },
  "/google-ads/": {
    line: "The traffic you can turn on this afternoon",
    body: "Search ads put you in front of people already looking. The whole skill is in what you exclude: most accounts we look at are paying for searches from people who were never going to buy, and nobody had checked in a year.",
    art: <MarkAds className="w-full" />,
  },
  "/facebook-ads/": {
    line: "For the people who were not looking yet",
    body: "Search catches demand that exists. Social makes some. It is the right tool for a job people put off, and the wrong one for an emergency, and knowing which of those you sell is most of the decision.",
    art: <MarkSocial className="w-full" />,
  },
  "/lead-generation/": {
    line: "What happens in the five minutes after",
    body: "An enquiry that sits in an inbox until Tuesday is a lost job with extra steps. Missed calls, follow-ups, the reminder that goes out when a quote has gone quiet. Unglamorous, and usually the cheapest lead you will ever find.",
    art: <FlowNodes className="w-full" />,
  },
};

export function ServicesContent() {
  const page = getPage("services");
  const root = useRef<HTMLDivElement>(null);

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

      /* One trigger per row. The rows are a screen apart, so a single staggered
         tween would fire them all while four of the five were still well below
         the fold. */
      gsap.utils.toArray<HTMLElement>("[data-row]", el).forEach((row, i) => {
        if (row.getBoundingClientRect().top < window.innerHeight * 0.95) return;

        const copy = row.querySelector("[data-copy]");
        const art = row.querySelector("[data-art]");

        /* The two halves come in from opposite sides, and which side depends
           on where each one sits. They meet in the middle, which reads as the
           row assembling rather than as two things sliding the same way. */
        const dir = i % 2 === 0 ? 1 : -1;

        if (copy) {
          gsap.fromTo(
            copy,
            { autoAlpha: 0, x: 28 * dir },
            {
              autoAlpha: 1,
              x: 0,
              duration: 0.9,
              ease: EASE.expo,
              scrollTrigger: { trigger: row, start: "top 78%", once: true },
            }
          );
        }

        if (art) {
          gsap.fromTo(
            art,
            { autoAlpha: 0, x: -28 * dir, scale: 0.97 },
            {
              autoAlpha: 1,
              x: 0,
              scale: 1,
              duration: 1,
              delay: 0.08,
              ease: EASE.expo,
              scrollTrigger: { trigger: row, start: "top 78%", once: true },
            }
          );
        }
      });
    },
    { scope: root }
  );

  return (
    <main className="pt-32 lg:pt-40">
      {/* ── Opening ────────────────────────────────────────────────────── */}
      <Container>
        <Reveal y={14} className="flex items-center gap-4">
          <MarkAnchor size="w-3.5" />
          <p className="eyebrow shrink-0 text-accent">Services</p>
          <Rule className="flex-1" delay={0.15} />
        </Reveal>

        <div className="mt-8 lg:flex lg:items-end lg:gap-16">
          <SplitLines
            as="h1"
            className="max-w-[14ch] font-display text-h1 uppercase leading-[0.94] text-foreground lg:shrink-0"
          >
            {page.h1}
          </SplitLines>

          <Reveal
            delay={0.12}
            className="mt-8 max-w-text lg:mt-0 lg:min-w-0 lg:flex-1 lg:border-l lg:border-line lg:pb-2 lg:pl-12"
          >
            <Rule className="mb-6 w-12 bg-accent" delay={0.3} />
            <p className="text-lead text-muted">
              Five things, and they are listed in the order they matter rather
              than the order that makes the list look even.
            </p>
          </Reveal>
        </div>
      </Container>

      {/* ── The five, as a sequence ──────────────────────────────────────── */}
      <div ref={root} className="mt-20 lg:mt-32">
        {serviceGroups.map((group, i) => {
          const detail = DETAIL[group.href];
          const flip = i % 2 === 1;

          return (
            <section
              key={group.href}
              data-row
              className="border-t border-line py-16 lg:py-24"
            >
              <Container>
                <div
                  className={
                    "lg:flex lg:items-center lg:gap-16 xl:gap-24 " +
                    (flip ? "lg:flex-row-reverse" : "")
                  }
                >
                  {/* ── Copy ──────────────────────────────────────────── */}
                  <div data-copy className="lg:w-[46%] lg:shrink-0">
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-eyebrow tabular-nums text-accent">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {detail ? (
                        <span className="font-mono text-eyebrow uppercase tracking-wider text-faint">
                          {detail.line}
                        </span>
                      ) : null}
                    </div>

                    {/* `text-h2`, not `text-h1`.

                        A column is 46% of the container, about 550px, and at
                        h1 the display face runs roughly 96px. "AUTOMATION" is
                        ten characters with nowhere to break, which is about
                        620px: it ran straight out of the column and over the
                        drawing beside it.

                        This is the third time on this site that display type
                        in a narrow column has overflowed, so the rule is worth
                        stating. Wrapping saves a long HEADING; it cannot save
                        a long WORD. Before setting display type in a column,
                        take the longest single word in the set and check it
                        fits, because that word is the real constraint. */}
                    <h2 className="mt-6 font-display text-h2 uppercase leading-[0.94] text-foreground">
                      <Link
                        href={group.href}
                        className="transition-colors duration-base hover:text-accent"
                      >
                        {group.label}
                      </Link>
                    </h2>

                    <p className="mt-6 max-w-text text-lead text-muted">
                      {detail?.body ?? group.blurb}
                    </p>

                    {/* The children, as a plain run of links rather than a
                        second card grid. They are a detail of this row, not a
                        set of five more decisions. */}
                    <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-6">
                      {group.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className="text-small whitespace-nowrap text-muted underline-offset-4 transition-colors duration-base hover:text-accent hover:underline"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={group.href}
                      className="group mt-8 inline-flex items-center gap-3 font-display text-body uppercase tracking-wide text-foreground transition-colors duration-base hover:text-accent"
                    >
                      {group.label}
                      <span
                        aria-hidden
                        className="text-accent transition-transform duration-base ease-out-quart group-hover:translate-x-1.5"
                      >
                        &rarr;
                      </span>
                    </Link>
                  </div>

                  {/* ── Drawing ───────────────────────────────────────── */}
                  {detail ? (
                    <div
                      data-art
                      className="mt-12 lg:mt-0 lg:min-w-0 lg:flex-1"
                    >
                      <div className="rounded-card border border-line bg-surface p-6 sm:p-10">
                        {detail.art}
                      </div>
                    </div>
                  ) : null}
                </div>
              </Container>
            </section>
          );
        })}
      </div>

      {/* ── The point of having all five ────────────────────────────────── */}
      <section className="border-y border-line bg-surface py-(--spacing-section)">
        <Container>
          <div className="lg:flex lg:items-start lg:gap-16 xl:gap-24">
            <div className="lg:w-[52%] lg:shrink-0">
              <SplitLines
                as="h2"
                className="max-w-[18ch] font-display text-h2 uppercase leading-[0.96] text-foreground"
              >
                <>
                  One team, so nobody gets to blame the{" "}
                  <span className="text-accent">other one</span>.
                </>
              </SplitLines>
            </div>

            <Reveal delay={0.1} className="mt-10 max-w-text lg:mt-0 lg:flex-1">
              <p className="text-lead text-muted">
                The usual arrangement is one company on the ads, another on the
                site, and a third somewhere on the CRM.
              </p>
              <p className="mt-6 text-body text-muted">
                It works until something stops working. Then the ads agency says
                the landing page is the problem, the web company says the
                traffic is, and the honest answer is that nobody has looked at
                both. Doing all five in house is not a bundle. It means there is
                one place to ask.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <CTA />
    </main>
  );
}
