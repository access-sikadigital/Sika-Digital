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
import { SiteFrame } from "@/components/graphics/Schematic";
import { CTA } from "@/components/sections/CTA";

/**
 * WEB DESIGN.
 *
 * ── The argument this page makes ────────────────────────────────────────────
 * Most web design pages sell the artefact: the design, the build, the stack.
 * This one sells the gap between having a website and having one that works,
 * because that is the gap the visitor is already standing in. They have a
 * site. It is not bringing them work. Nobody in that position needs to be told
 * what a website is.
 *
 * So the page is built around one idea, stated four ways: a site is not
 * finished when it looks good, it is finished when a stranger who lands on it
 * picks up the phone.
 *
 * ── Copy rules on this page ─────────────────────────────────────────────────
 * No jargon that a tradesperson would have to look up. "Core Web Vitals"
 * appears once, in the technical section, where it is a term of art and
 * leaving it out would be vaguer rather than simpler. Everywhere else the
 * plain phrase wins: "loads fast" not "optimised for LCP".
 *
 * Nothing here claims a result. No percentages, no client outcomes, no
 * "we increased X by Y". That material does not exist yet, and inventing it
 * for a real agency is a false claim that would ship and stay shipped.
 *
 * ── The motion ──────────────────────────────────────────────────────────────
 * Deliberately not the homepage's, but the rule below outranks that.
 *
 * MOTION BELONGS TO ARRIVAL, NOT TO READING. A block may move as it comes in.
 * Once it is in front of someone it holds still until they leave it.
 *
 * The first version of the stage band broke this and had to be rebuilt. See
 * the note above `useGSAP` for what went wrong and why the temptation is worth
 * naming: anything scrubbed is bound to the scroll wheel, which means it is by
 * definition moving while it is being read. Scrubbing is right for a progress
 * rail, a parallax layer or a diagram with no prose in it, and wrong for a
 * card carrying forty words.
 */

const STAGES = [
  {
    n: "01",
    t: "Work out what the page has to do",
    c: "Before anything is drawn. Who lands here, what they are worried about, and what we want them to do about it. A page with no job is where design decisions go to become opinions.",
  },
  {
    n: "02",
    t: "Design it around the decision",
    c: "The thing you want people to do gets the best position, the most contrast and the fewest words. Everything else is arranged behind that, not beside it.",
  },
  {
    n: "03",
    t: "Build it to be quick",
    c: "Hand written, no page builder, no fourteen plugins loading fonts nobody uses. Fast is not a finishing touch here, it is what the build is for.",
  },
  {
    n: "04",
    t: "Wire up the proof",
    c: "Forms, calls and clicks all tracked before launch, so the first question anyone asks about the new site has an answer.",
  },
];

const TECHNICAL = [
  {
    t: "It loads fast on a phone on mobile data",
    c: "Not on your laptop on the office wifi. That is the test, because that is the visitor.",
  },
  {
    t: "Google can read every page",
    c: "Clean markup, real headings, proper structure. The site is built so search does not have to guess what it is looking at.",
  },
  {
    t: "It passes Core Web Vitals",
    c: "The only speed numbers Google actually uses. Worth naming because they also feed ad Quality Score, so the same work lowers what you pay per click.",
  },
  {
    t: "You can update it without calling us",
    c: "The parts that change often are yours. The parts that break things are not.",
  },
  {
    t: "It works when someone zooms in",
    c: "Older eyes, bright sunlight, one thumb. Most of your customers are not browsing in ideal conditions.",
  },
];

export function WebDesignContent() {
  const page = getPage("web-design");
  const group = serviceGroups.find((g) => g.href === page.url);

  const stagesRef = useRef<HTMLElement>(null);
  const techRef = useRef<HTMLElement>(null);

  /* ── The four stages ──────────────────────────────────────────────────────
     ── What this replaced, and why ───────────────────────────────────────────
     A horizontal track, scrubbed to scroll. It was unreadable, and not by a
     small margin: the cards were travelling sideways at exactly the moment
     someone was trying to read them, and the reader had no way to stop the
     movement except to stop scrolling, which is not something you can do while
     reading a page.

     The principle it broke is worth writing down, because it is easy to break
     again and it looks good in a demo. MOTION BELONGS TO ARRIVAL, NOT TO
     READING. A block may move as it comes in. Once it is in front of someone
     it holds still until they leave it. Anything scrubbed is bound to the
     scroll wheel, so by definition it is moving while being read.

     Scrubbing is fine for things that are not read: a progress rail, a
     parallax layer, a diagram with no prose in it. It is wrong for a card with
     forty words on it.

     What is here now is a clip-path wipe per card, once, then stillness. The
     stagger runs on a diagonal rather than in DOM order, so a 2x2 grid
     assembles corner to corner instead of top row then bottom row. */
  useGSAP(
    () => {
      const el = stagesRef.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const cards = gsap.utils.toArray<HTMLElement>("[data-stage]", el);
      if (!cards.length) return;
      if (el.getBoundingClientRect().top < window.innerHeight * 0.95) return;

      gsap.fromTo(
        cards,
        { clipPath: "inset(0% 0% 100% 0%)", yPercent: 6 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          yPercent: 0,
          duration: 1,
          ease: EASE.expo,
          stagger: { each: 0.1, from: "start" },
          scrollTrigger: { trigger: el, start: "top 72%", once: true },
        }
      );
    },
    { scope: stagesRef }
  );

  /* ── The technical list lights up row by row ───────────────────────────────
     One trigger per row rather than one staggered tween, because the rows are
     a screen apart and a stagger would fire them all while most were still
     below the fold. */
  useGSAP(
    () => {
      const el = techRef.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      ScrollTrigger.create({
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        toggleClass: "is-alive",
      });

      gsap.utils.toArray<HTMLElement>("[data-row]", el).forEach((row) => {
        if (row.getBoundingClientRect().top < window.innerHeight * 0.95) return;

        gsap.fromTo(
          row,
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: EASE.expo,
            scrollTrigger: { trigger: row, start: "top 88%", once: true },
          }
        );
      });
    },
    { scope: techRef }
  );

  return (
    <main className="pt-32 lg:pt-40">
      {/* ── Opening ────────────────────────────────────────────────────── */}
      <Container>
        <Reveal y={14} className="flex items-center gap-4">
          <MarkAnchor size="w-3.5" />
          <p className="eyebrow shrink-0 text-accent">Web design</p>
          <Rule className="flex-1" delay={0.15} />
        </Reveal>

        <div className="mt-8 lg:flex lg:items-end lg:gap-16">
          <SplitLines
            as="h1"
            className="max-w-[15ch] font-display text-h1 leading-[0.94] text-foreground lg:shrink-0"
          >
            {page.h1}
          </SplitLines>

          <Reveal
            delay={0.12}
            className="mt-8 max-w-text lg:mt-0 lg:min-w-0 lg:flex-1 lg:border-l lg:border-line lg:pb-2 lg:pl-12"
          >
            <Rule className="mb-6 w-12 bg-accent" delay={0.3} />
            <p className="text-lead text-muted">
              A site is not finished when it looks good. It is finished when
              someone who has never heard of you lands on it and picks up the
              phone.
            </p>
          </Reveal>
        </div>

        {/* The wireframe from the homepage services tile, at full size. Same
            drawing, and that is the point: the homepage promises this page and
            this page opens with the thing it promised. */}
        <Reveal delay={0.2} className="mt-16 lg:mt-24">
          <div className="rounded-card border border-line bg-surface p-6 sm:p-10 lg:p-16">
            <SiteFrame className="mx-auto w-full max-w-3xl" />
          </div>
        </Reveal>
      </Container>

      {/* ── The problem, named ──────────────────────────────────────────── */}
      <section className="mt-28 border-y border-line bg-surface py-(--spacing-section) lg:mt-40">
        <Container>
          <div className="lg:flex lg:items-start lg:gap-16 xl:gap-24">
            <div className="lg:w-[52%] lg:shrink-0">
              <SplitLines
                as="h2"
                className="max-w-[18ch] font-display text-h2 leading-[0.94] text-foreground"
              >
                <>
                  Most websites are{" "}
                  <span className="text-accent">brochures</span> that load
                  slowly.
                </>
              </SplitLines>
            </div>

            <Reveal delay={0.1} className="mt-10 max-w-text lg:mt-0 lg:flex-1">
              <p className="text-lead text-muted">
                They list what the business does. They have a contact page. They
                were signed off because everyone agreed the colours were right.
              </p>
              <p className="mt-6 text-body text-muted">
                None of that is the job. The job is that a person with a problem
                finds you, believes you can fix it, and gets in touch before
                they open the next tab. Everything on this page is about
                shortening that.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── How it gets built ───────────────────────────────────────────── */}
      <section ref={stagesRef} className="py-(--spacing-section)">
        <Container>
          <Reveal y={14} className="flex items-center gap-4">
            <MarkAnchor size="w-3.5" />
            <p className="eyebrow shrink-0 text-accent">How it gets built</p>
            <Rule className="flex-1" delay={0.15} />
          </Reveal>

          <SplitLines
            as="h2"
            className="mt-8 max-w-[20ch] font-display text-h2 leading-[0.94] text-foreground"
          >
            Four stages, and none of them start with a colour.
          </SplitLines>
        </Container>

        {/* ── A plain two-by-two ───────────────────────────────────────────
            Every card is fully on screen and completely still by the time
            anyone reaches it.

            ── Three things were removed to make it legible ──────────────────
            The word "STAGE" in the corner of each card. It appeared four
            times, carried no information the number did not already carry, and
            it was competing with the number for the same corner of the eye.

            The number as 11px mono. A sequence of four is the one thing this
            block has to communicate before any of it is read, and at eyebrow
            size it was the smallest element on the card rather than the
            first. It is display type at `text-h2` now, which makes the order
            readable from across the room.

            The equal weighting of number and title. They sat on one baseline
            in a flex row, so neither led. Stacked, with a rule between, there
            is one obvious reading order: which one this is, then what it is,
            then what it means. */}
        <div className="mt-16 grid gap-4 md:grid-cols-2 lg:mt-24 lg:gap-5">
          {STAGES.map((s) => (
            <article
              key={s.n}
              data-stage
              className="group relative flex h-full flex-col rounded-card border border-line bg-surface p-8 transition-colors duration-slow ease-out-quart hover:border-accent lg:p-12"
            >
              <span className="block font-display text-h2 tabular-nums leading-[0.94] text-accent">
                {s.n}
              </span>

              <span
                aria-hidden
                className="mt-7 block h-px w-full bg-line transition-colors duration-slow ease-out-quart group-hover:bg-accent/40"
              />

              {/* `text-h4`, not `text-h3`. Half the container minus the gap is
                  around 570px, and at h3 the display face puts a long word
                  close to that. This set has "Work out what the page has to
                  do" in it, which at h3 sets on three lines and starts to read
                  as a headline competing with the section above it. */}
              <h3 className="mt-7 max-w-[22ch] font-display text-h4 leading-[0.94] text-foreground">
                {s.t}
              </h3>

              <p className="mt-4 max-w-md text-body text-muted">{s.c}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── What you actually get ──────────────────────────────────────── */}
      <section
        ref={techRef}
        className="border-y border-line bg-surface py-(--spacing-section)"
      >
        <Container>
          <Reveal y={14} className="flex items-center gap-4">
            <MarkAnchor size="w-3.5" />
            <p className="eyebrow shrink-0 text-accent">What you get</p>
            <Rule className="flex-1" delay={0.15} />
          </Reveal>

          <SplitLines
            as="h2"
            className="mt-8 max-w-[18ch] font-display text-h2 leading-[0.94] text-foreground"
          >
            Five things, and you can check every one yourself.
          </SplitLines>

          <div className="mt-16 lg:mt-24">
            {TECHNICAL.map((row, i) => (
              <div
                key={row.t}
                data-row
                className="group border-t border-line py-9 last:border-b lg:flex lg:items-baseline lg:gap-12"
              >
                <span className="font-mono text-eyebrow tabular-nums text-faint lg:w-16 lg:shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <h3 className="mt-3 max-w-[22ch] font-display text-h3 leading-[0.94] text-foreground transition-colors duration-slow ease-out-quart group-hover:text-accent lg:mt-0 lg:w-[40%] lg:shrink-0">
                  {row.t}
                </h3>

                <p className="mt-4 max-w-text text-body text-muted lg:mt-0 lg:min-w-0 lg:flex-1">
                  {row.c}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── The work ────────────────────────────────────────────────────────
          Placeholders until there are real screenshots. Deliberately labelled
          as briefs for whoever supplies them: the difference between "web
          design image" and "the site on a phone, one hand, outdoors" is the
          difference between getting a stock photo back and getting the shot. */}
      <section className="py-(--spacing-section)">
        <Container>
          <Reveal y={14} className="flex items-center gap-4">
            <MarkAnchor size="w-3.5" />
            <p className="eyebrow shrink-0 text-accent">Recent work</p>
            <Rule className="flex-1" delay={0.15} />
          </Reveal>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-20">
            <Placeholder
              ratio="4/3"
              index="01"
              label="A site you built, full page, scrolled to the section you are proudest of."
            />
            <Placeholder
              ratio="4/3"
              index="02"
              label="The same site on a phone, held in one hand, outdoors."
            />
            <Placeholder
              ratio="4/3"
              index="03"
              label="A before and after, side by side, same page."
            />
            <Placeholder
              ratio="4/3"
              index="04"
              label="A speed score, or the enquiry form filling up. Real numbers only."
            />
          </div>

          <Reveal delay={0.1} className="mt-10">
            <p className="max-w-text text-small text-faint">
              Case studies with real figures go here once there are three to
              five worth showing. Nothing invented in the meantime.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ── Where to go next ────────────────────────────────────────────── */}
      {group ? (
        <section className="border-t border-line py-(--spacing-section)">
          <Container>
            <SplitLines
              as="h2"
              className="max-w-[18ch] font-display text-h2 leading-[0.94] text-foreground"
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
                    <span className="font-display text-h4 leading-[0.94] text-foreground transition-colors duration-base group-hover:text-accent">
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
