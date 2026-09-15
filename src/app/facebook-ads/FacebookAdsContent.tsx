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
import { CTA } from "@/components/sections/CTA";

/**
 * PAID SOCIAL.
 *
 * ── The argument ────────────────────────────────────────────────────────────
 * Search catches demand that already exists. Social makes some. Everything
 * else on this page follows from that one distinction, including the part most
 * agencies will not say out loud: if you sell emergencies, this is the wrong
 * channel and you should spend the money on search instead.
 *
 * Saying so costs an enquiry now and a bad fit later. The scope names lead
 * quality as the thing to protect, and a client sold the wrong channel churns
 * in four months and tells people why.
 *
 * ── Built to not resemble the other service pages ───────────────────────────
 *   Web design    horizontal stage track, technical list
 *   SEO           paired comparison, drawn timeline
 *   Google Ads    scrubbed spend bar, struck-through search terms
 *   Paid social   two creative columns drifting at different rates
 *
 * ── The drifting columns ────────────────────────────────────────────────────
 * The one piece of motion on the site that imitates its own subject: two
 * columns of creative moving past each other at different speeds is what
 * scrolling a feed looks like. It is also the reason the section works with
 * placeholders in it. The shapes are doing the job, not the pictures.
 */

const WRONG_RIGHT = {
  wrong: {
    t: "Do not start here if",
    items: [
      "You sell emergencies. Nobody scrolls Instagram with water coming through the ceiling.",
      "Your website does not convert yet. Social sends colder traffic than search, so it fails a weak page faster.",
      "You need work this week. Give it six.",
    ],
  },
  right: {
    t: "Start here if",
    items: [
      "The job is one people put off. Rewires, extensions, solar, anything with a think-about-it phase.",
      "You can show the work. Before and after is the format, and you already have it on your phone.",
      "Your area is small enough to reach twice. Familiarity is most of what this buys.",
    ],
  },
};

const CREATIVE = [
  {
    t: "The first second is the whole ad",
    c: "Not the offer, not the logo. Whether the shot is interesting before anyone has read a word. Most ads lose here and the rest of the budget is spent buying impressions nobody looked at.",
  },
  {
    t: "It should look like it came from you",
    c: "Real jobs, real vans, real hands. Polished stock performs worse and it costs more, which is a rare case of the cheap option also being the right one.",
  },
  {
    t: "Say the thing they are worried about",
    c: "Mess. Cost. Whether you turn up. An ad that names the objection out-performs one that lists the service, because the objection is what they were already thinking.",
  },
  {
    t: "Three angles, not three colours",
    c: "Testing a headline against the same headline in a different font is not a test. Different reasons to care are a test.",
  },
];

export function FacebookAdsContent() {
  const page = getPage("facebook-ads");
  const group = serviceGroups.find((g) => g.href === page.url);

  const feedRef = useRef<HTMLElement>(null);

  /* ── Two columns, two speeds ──────────────────────────────────────────────
     Scrubbed `y` on each column, in opposite directions and at different
     magnitudes. That difference is the entire effect: matched speeds read as
     one block moving, and opposite directions at the same rate read as a
     mechanism. Uneven is what reads as a feed.

     Desktop only. On a phone the columns are stacked and moving them would
     just fight the scroll the reader is already doing. */
  useGSAP(
    () => {
      const el = feedRef.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      ScrollTrigger.create({
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        toggleClass: "is-alive",
      });

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const cols = gsap.utils.toArray<HTMLElement>("[data-col]", el);

        cols.forEach((col, i) => {
          gsap.fromTo(
            col,
            { y: i === 0 ? 70 : -40 },
            {
              y: i === 0 ? -70 : 40,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top bottom",
                end: "bottom top",
                scrub: i === 0 ? 0.5 : 0.9,
              },
            }
          );
        });
      });

      return () => mm.revert();
    },
    { scope: feedRef }
  );

  return (
    <main className="pt-32 lg:pt-40">
      <PageOpening
        eyebrow="Paid social"
        title={page.h1}
        titleMax="max-w-[15ch]"
        intro="Search finds people already looking for you. This finds the ones who have not got round to it yet, which is a different job and a different ad."
      />

      {/* ── The distinction ─────────────────────────────────────────────── */}
      <section className="mt-24 border-y border-line bg-surface py-(--spacing-section) lg:mt-36">
        <Container>
          <div className="lg:flex lg:items-start lg:gap-16 xl:gap-24">
            <div className="lg:w-[50%] lg:shrink-0">
              <SplitLines
                as="h2"
                className="max-w-[17ch] font-display text-h2 uppercase leading-[0.96] text-foreground"
              >
                <>
                  Search catches demand. Social{" "}
                  <span className="text-accent">makes</span> it.
                </>
              </SplitLines>
            </div>

            <Reveal delay={0.1} className="mt-10 max-w-text lg:mt-0 lg:flex-1">
              <p className="text-lead text-muted">
                Somebody searching for an emergency electrician has already
                decided. You are competing on being the one they find.
              </p>
              <p className="mt-6 text-body text-muted">
                Nobody has ever gone looking for a switchboard upgrade. They
                have thought about it for two years, put it off twice, and will
                book it the week something makes it feel urgent. This is the
                channel that makes that week happen, and it is the only one
                that can.
              </p>
            </Reveal>
          </div>

          {/* The honest split. On the page rather than in a sales call,
              because a client sold the wrong channel churns in four months. */}
          <div className="mt-16 grid gap-4 lg:mt-24 lg:grid-cols-2">
            {[WRONG_RIGHT.wrong, WRONG_RIGHT.right].map((panel, i) => (
              <Reveal key={panel.t} y={20}>
                <div
                  className={
                    "h-full rounded-card border p-8 lg:p-10 " +
                    (i === 1
                      ? "border-accent bg-background"
                      : "border-line bg-background")
                  }
                >
                  <p
                    className={
                      "font-mono text-eyebrow uppercase tracking-wider " +
                      (i === 1 ? "text-accent" : "text-faint")
                    }
                  >
                    {panel.t}
                  </p>

                  <ul className="mt-7 flex flex-col gap-5">
                    {panel.items.map((item) => (
                      <li key={item} className="flex gap-4">
                        <span
                          aria-hidden
                          className={
                            "shrink-0 " +
                            (i === 1 ? "text-accent" : "text-line-strong")
                          }
                        >
                          {i === 1 ? "→" : "×"}
                        </span>
                        <span
                          className={
                            i === 1
                              ? "text-body text-foreground"
                              : "text-body text-faint"
                          }
                        >
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── The creative ────────────────────────────────────────────────── */}
      <section ref={feedRef} className="overflow-hidden py-(--spacing-section)">
        <Container>
          <Reveal y={14} className="flex items-center gap-4">
            <MarkAnchor size="w-3.5" />
            <p className="eyebrow shrink-0 text-accent">The creative</p>
            <Rule className="flex-1" delay={0.15} />
          </Reveal>

          <SplitLines
            as="h2"
            className="mt-8 max-w-[18ch] font-display text-h2 uppercase leading-[0.96] text-foreground"
          >
            <>
              The targeting is fine. The{" "}
              <span className="text-accent">picture</span> is the problem.
            </>
          </SplitLines>

          <div className="mt-14 lg:mt-24 lg:flex lg:items-start lg:gap-16 xl:gap-24">
            {/* Copy on the left, feed on the right. The feed is decorative and
                goes second in the DOM so a screen reader gets the argument
                before it gets the scenery. */}
            <div className="lg:w-[46%] lg:shrink-0">
              <ul className="flex flex-col">
                {CREATIVE.map((c, i) => (
                  <Reveal key={c.t} y={20} delay={i * 0.04}>
                    <li className="border-t border-line py-7 last:border-b">
                      <h3 className="max-w-[24ch] font-display text-h4 uppercase leading-tight text-foreground">
                        {c.t}
                      </h3>
                      <p className="mt-3 text-body text-muted">{c.c}</p>
                    </li>
                  </Reveal>
                ))}
              </ul>
            </div>

            {/* Two columns at two speeds. The shapes carry this, which is why
                it still works before the real creative exists. */}
            <div
              aria-hidden
              className="mt-14 grid grid-cols-2 gap-4 lg:mt-0 lg:min-w-0 lg:flex-1"
            >
              <div data-col className="flex flex-col gap-4 lg:will-change-transform">
                <Placeholder
                  ratio="4/5"
                  index="01"
                  label="Before and after, same room, same angle."
                />
                <Placeholder
                  ratio="1/1"
                  index="02"
                  label="Hands working. Close, unstaged."
                />
                <Placeholder
                  ratio="4/5"
                  index="03"
                  label="The van, on a real street."
                />
              </div>

              <div
                data-col
                className="flex flex-col gap-4 lg:mt-12 lg:will-change-transform"
              >
                <Placeholder
                  ratio="1/1"
                  index="04"
                  label="A finished job, wide. No filter."
                />
                <Placeholder
                  ratio="4/5"
                  index="05"
                  label="Someone talking to camera, phone held vertically."
                />
                <Placeholder
                  ratio="1/1"
                  index="06"
                  label="A review, screenshotted from the real listing."
                />
              </div>
            </div>
          </div>

          <Reveal delay={0.1} className="mt-12">
            <p className="max-w-text text-small text-faint">
              Placeholders, and the briefs are on them. Every one is a shot you
              can take on a phone this week, which is deliberate: the ads that
              work here are not the ones that took a crew to make.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ── Tracking ────────────────────────────────────────────────────────
          The unglamorous part, and the one that decides whether any of the
          above can be judged. */}
      <section className="border-y border-line bg-surface py-(--spacing-section)">
        <Container>
          <div className="lg:flex lg:items-start lg:gap-16 xl:gap-24">
            <div className="lg:w-[50%] lg:shrink-0">
              <SplitLines
                as="h2"
                className="max-w-[18ch] font-display text-h2 uppercase leading-[0.96] text-foreground"
              >
                Half of what Meta reports never happened.
              </SplitLines>
            </div>

            <Reveal delay={0.1} className="mt-10 max-w-text lg:mt-0 lg:flex-1">
              <p className="text-lead text-muted">
                Browsers block the pixel, people tap through on a phone and
                enquire from a laptop, and the platform fills the gap with
                estimates it is not required to label.
              </p>
              <p className="mt-6 text-body text-muted">
                Server-side tracking closes most of that, and matching enquiries
                back to what actually became a job closes the rest. Without it
                you are choosing which ads to scale from a number Meta has an
                incentive to round up. It is the least interesting thing on this
                page and the first thing we set up.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── Where to go next ────────────────────────────────────────────── */}
      {group && group.children.length > 1 ? (
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
