"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, EASE } from "@/lib/gsap";
import { getPage } from "@/config/pages";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { SplitLines } from "@/components/motion/SplitLines";
import { Rule } from "@/components/motion/Rule";
import { MarkAnchor } from "@/components/motion/MarkFlight";
import { PageOpening } from "@/components/ui/PageOpening";
import { Placeholder } from "@/components/ui/Placeholder";
import { ReportChart } from "@/components/graphics/Schematic";
import { ClientLogos } from "@/components/sections/ClientLogos";
import { CTA } from "@/components/sections/CTA";

/**
 * RESULTS.
 *
 * ── ⚠️  READ THIS BEFORE ADDING ANYTHING TO THIS PAGE ───────────────────────
 * There are no case studies here because there are none signed off yet. That
 * is Open Question #3 in the scope and it has been the biggest gap on this
 * site since the first day of the build.
 *
 * Do not fill it with an illustrative example, a "typical" client, a rounded
 * figure, or a percentage from an industry report presented as though it were
 * Sika's. On a page titled Results, every one of those is a fabricated claim.
 * It would also be the one lie on a site whose entire argument is that other
 * agencies report numbers that do not mean anything, which makes it both
 * dishonest and strategically stupid.
 *
 * ── So what is the page for ─────────────────────────────────────────────────
 * The standard. It states what will be measured, what will be shown, and what
 * a reader is entitled to demand of any agency including this one. An empty
 * results page is embarrassing; a results page that sets a bar most agencies
 * would fail is an argument, and it stops being needed the moment three real
 * case studies exist.
 *
 * ── Adding the first case study ─────────────────────────────────────────────
 * Replace the `CASE_SLOTS` block. Keep the standard section: it is the reason
 * the numbers below it are worth reading. Every figure must be traceable to a
 * screenshot in the client's own account, and every client must have approved
 * being named.
 */

/** What gets reported, and what it replaces. */
const MEASURES = [
  {
    t: "Qualified enquiries",
    not: "Clicks, impressions, reach",
    c: "Someone who wanted the kind of work you want. Counted by a person reading them, not by a form submission firing.",
  },
  {
    t: "Cost per qualified enquiry",
    not: "Cost per lead",
    c: "The same sum with the junk taken out. It is always a worse-looking number and it is the only one that can be acted on.",
  },
  {
    t: "Which job types arrived",
    not: "Total lead volume",
    c: "Twelve callouts and two switchboard upgrades is not fourteen leads. Reporting that treats them as fourteen is how a busy month loses money.",
  },
  {
    t: "Revenue where you can track it",
    not: "Conversion rate",
    c: "Not every business can attribute a sale back to a click, and we will say so rather than inventing a figure that can.",
  },
];

/** What anyone should be able to demand of an agency, including this one. */
const STANDARD = [
  "Every number can be found in your own account, by you, without us.",
  "The accounts are in your name, so nothing can be hidden behind a login you do not hold.",
  "A bad month is reported as a bad month, in the same detail as a good one.",
  "Anything estimated by a platform is labelled as estimated.",
  "If we cannot attribute something, we say we cannot, rather than choosing the flattering assumption.",
];

export function ResultsContent() {
  const page = getPage("results");
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

      gsap.utils.toArray<HTMLElement>("[data-rise]", el).forEach((node) => {
        if (node.getBoundingClientRect().top < window.innerHeight * 0.95) return;

        gsap.fromTo(
          node,
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.85,
            ease: EASE.expo,
            scrollTrigger: { trigger: node, start: "top 86%", once: true },
          }
        );
      });
    },
    { scope: root }
  );

  return (
    <main ref={root} className="pt-32 lg:pt-40">
      <PageOpening
        eyebrow="Results"
        title={page.h1}
        titleMax="max-w-[16ch]"
        intro="Who we have worked with is below. What we have not done is dress any of it up as a case study with numbers we cannot show you."
      />

      {/* ── Who ───────────────────────────────────────────────────────────────
          First on the page, above the explanation of why there are no case
          studies. The logos are the one piece of proof here that is simply
          true with nothing attached, so they go where proof is looked for.

          Same list as the band under the homepage hero, read from the same
          config. */}
      <Container className="mt-16 lg:mt-24">
        <Reveal y={14} className="flex items-center gap-4">
          <MarkAnchor size="w-3.5" />
          <p className="eyebrow shrink-0 text-accent">Who we have worked with</p>
          <Rule className="flex-1" delay={0.15} />
        </Reveal>

        <ClientLogos className="mt-10 lg:mt-12" />

        <p className="mt-6 max-w-text text-small text-faint">
          {/* Permission confirmed by John, 24 Sep 2026, for all 30. Anyone
              added later needs the same before this sentence stays true. */}
          Every one a real client, listed with their permission. Hover a logo
          for its real colours.
        </p>
      </Container>

      {/* ── The empty slots ──────────────────────────────────────────────────
          Stated plainly and in the position the case studies will occupy, so
          the page reads as unfinished on purpose rather than as thin. */}
      <Container className="mt-16 lg:mt-24">
        <div className="rounded-card border border-accent bg-surface p-8 lg:p-14">
          <p className="font-mono text-eyebrow uppercase tracking-wider text-accent">
            Why this is empty
          </p>

          <p data-rise className="mt-7 max-w-2xl text-lead text-foreground">
            We have not published a case study we cannot evidence line by line,
            and the ones worth publishing are not signed off yet.
          </p>

          <p data-rise className="mt-6 max-w-2xl text-body text-muted">
            The alternative was an illustrative example, a typical client, or a
            figure from an industry report with our name near it. Every agency
            page you have read this year has one of those on it. On a site whose
            whole argument is that most marketing reporting does not mean
            anything, putting one here would be the only dishonest thing on the
            site, and it would be aimed at exactly the people we are asking to
            trust the rest of it.
          </p>

          <div data-rise className="mt-12 grid gap-4 lg:grid-cols-3">
            <Placeholder
              ratio="4/3"
              index="01"
              label="Case study one. Client named, figures from their own account."
            />
            <Placeholder
              ratio="4/3"
              index="02"
              label="Case study two. Different trade, different service."
            />
            <Placeholder
              ratio="4/3"
              index="03"
              label="Case study three. Include one that took longer than expected."
            />
          </div>

          <p className="mt-8 max-w-text text-small text-faint">
            Three slots. They get filled with real clients and real numbers, or
            they stay empty.
          </p>
        </div>
      </Container>

      {/* ── What gets measured ────────────────────────────────────────────── */}
      <section className="mt-24 border-y border-line bg-surface py-(--spacing-section) lg:mt-36">
        <Container>
          <Reveal y={14} className="flex items-center gap-4">
            <MarkAnchor size="w-3.5" />
            <p className="eyebrow shrink-0 text-accent">What gets counted</p>
            <Rule className="flex-1" delay={0.15} />
          </Reveal>

          <SplitLines
            as="h2"
            className="mt-8 max-w-[20ch] font-display text-h2 leading-[1.1] text-foreground"
          >
            <>
              Four numbers, and they are all{" "}
              <span className="text-accent">worse</span> than the usual ones.
            </>
          </SplitLines>

          <Reveal delay={0.1} className="mt-8">
            <p className="max-w-text text-lead text-muted">
              Every measure below produces a smaller, less impressive figure
              than the one it replaces. That is how you can tell it is the real
              one.
            </p>
          </Reveal>

          <ul className="mt-14 lg:mt-20">
            {MEASURES.map((m, i) => (
              <li
                key={m.t}
                data-rise
                className="border-t border-line py-8 last:border-b lg:flex lg:items-baseline lg:gap-10"
              >
                <span className="font-mono text-eyebrow tabular-nums text-faint lg:w-14 lg:shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <span className="lg:w-[32%] lg:shrink-0">
                  <span className="block font-display text-h4 leading-tight text-foreground">
                    {m.t}
                  </span>
                  <span className="mt-2 block text-small text-faint">
                    <span className="line-through decoration-line-strong">
                      {m.not}
                    </span>
                  </span>
                </span>

                <span className="mt-4 block max-w-text text-body text-muted lg:mt-0 lg:min-w-0 lg:flex-1">
                  {m.c}
                </span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ── The standard ─────────────────────────────────────────────────── */}
      <section className="py-(--spacing-section)">
        <Container>
          <div className="lg:flex lg:items-start lg:gap-16 xl:gap-24">
            <div className="lg:w-[46%] lg:shrink-0">
              <Reveal y={14} className="flex items-center gap-4">
                <MarkAnchor size="w-3.5" />
                <p className="eyebrow shrink-0 text-accent">The standard</p>
                <Rule className="flex-1" delay={0.15} />
              </Reveal>

              <SplitLines
                as="h2"
                className="mt-8 max-w-[18ch] font-display text-h2 leading-[1.1] text-foreground"
              >
                Hold anyone to this. Including us.
              </SplitLines>

              <Reveal delay={0.1} className="mt-8">
                <p className="max-w-text text-body text-muted">
                  None of it is generous. It is the minimum, and it is worth
                  asking your current agency about before you ask us anything.
                </p>
              </Reveal>
            </div>

            <ul className="mt-12 lg:mt-0 lg:min-w-0 lg:flex-1">
              {STANDARD.map((s) => (
                <li
                  key={s}
                  data-rise
                  className="flex gap-4 border-t border-line py-6 last:border-b"
                >
                  <span aria-hidden className="shrink-0 text-accent">
                    &rarr;
                  </span>
                  <span className="max-w-text text-body text-foreground">
                    {s}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* ── What a report looks like ──────────────────────────────────────── */}
      <section className="border-y border-line bg-surface py-(--spacing-section)">
        <Container>
          <div className="lg:flex lg:items-center lg:gap-16 xl:gap-24">
            <div className="lg:w-[46%] lg:shrink-0">
              <SplitLines
                as="h2"
                className="max-w-[18ch] font-display text-h2 leading-[1.1] text-foreground"
              >
                One page, monthly, and you can check it.
              </SplitLines>

              <Reveal delay={0.1}>
                <p className="mt-8 max-w-text text-lead text-muted">
                  Enquiries by job type, what they cost, what is working and
                  what is not, and the one thing being changed next month.
                </p>
                <p className="mt-6 max-w-text text-body text-muted">
                  Not a forty page export nobody opens. The test of a report is
                  whether you could act on it in the five minutes between jobs,
                  which is the only window most of our clients have.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.15} className="mt-14 lg:mt-0 lg:min-w-0 lg:flex-1">
              <div className="rounded-card border border-line bg-background p-6 sm:p-10">
                {/* Unlabelled on purpose. It is a drawing of a chart, and a
                    drawing with numbers on it, on this page of all pages,
                    would be exactly the thing the page is written against. */}
                <ReportChart className="w-full" />
              </div>
              <p className="mt-5 text-small text-faint">
                A drawing of the shape, with no figures on it. A page about not
                inventing numbers is the last place to draw one.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── What you can have now ────────────────────────────────────────── */}
      <section className="py-(--spacing-section)">
        <Container>
          <div className="rounded-card border border-line bg-surface p-8 lg:p-14">
            <SplitLines
              as="h2"
              className="max-w-[20ch] font-display text-h2 leading-[1.1] text-foreground"
            >
              No case studies. Have an audit of your own account instead.
            </SplitLines>

            <p className="mt-8 max-w-text text-lead text-muted">
              Somebody else's numbers were never going to tell you much about
              your business anyway. Yours will.
            </p>

            <div className="mt-10 flex flex-wrap gap-5">
              <Button href="/contact/" size="lg">
                Find my missing leads
              </Button>
              <Button href="/about/" variant="outline" size="lg" arrow={false}>
                Who you would be dealing with
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <CTA />
    </main>
  );
}
