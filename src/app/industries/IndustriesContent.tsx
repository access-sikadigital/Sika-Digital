"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, EASE } from "@/lib/gsap";
import { getPage } from "@/config/pages";
import { industries } from "@/config/industries";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { SplitLines } from "@/components/motion/SplitLines";
import { Rule } from "@/components/motion/Rule";
import { MarkAnchor } from "@/components/motion/MarkFlight";
import { PageOpening } from "@/components/ui/PageOpening";
import { CTA } from "@/components/sections/CTA";

/**
 * INDUSTRIES HUB.
 *
 * ── What a hub is for ───────────────────────────────────────────────────────
 * Same principle as the services hub: not a menu. It has to say the thing the
 * four trade pages cannot say about themselves, which here is why an agency
 * that specialises at all is worth more than one that will take anyone.
 *
 * ── Bespoke, where the four children are not ────────────────────────────────
 * The children share a template because nobody reads two of them. This page is
 * read by people deciding whether Sika understands their trade at all, which
 * is a different job, so it gets its own shape: the four trades as full-height
 * image rows rather than cards, each carrying the one line that proves the
 * point for that trade.
 *
 * ── Motion ──────────────────────────────────────────────────────────────────
 * Image parallax only, and only on the pictures. No prose moves. See the note
 * in web-design/WebDesignContent for why that rule exists.
 */

/** The line that proves we understand this trade, one each. */
const PROOF: Record<string, string> = {
  tradies: "A full diary and a bad month are frequently the same week.",
  electricians:
    "Callouts keep the lights on. Switchboards and rewires pay for the year.",
  plumbers:
    "Emergency work is the easiest to get and the hardest to build anything on.",
  builders:
    "You were chosen months before anyone filled in your contact form.",
};

export function IndustriesContent() {
  const page = getPage("industries");
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

      /* Parallax on the photographs. The layer is scaled 1.16, giving about 8%
         of slack at each edge, and it travels 6% either way, so a row can
         never show a bare corner. */
      gsap.utils.toArray<HTMLElement>("[data-parallax]", el).forEach((layer) => {
        gsap.fromTo(
          layer,
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: "none",
            scrollTrigger: {
              trigger: layer,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-copy]", el).forEach((node) => {
        if (node.getBoundingClientRect().top < window.innerHeight * 0.95) return;

        gsap.fromTo(
          node,
          { autoAlpha: 0, y: 26 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: EASE.expo,
            scrollTrigger: { trigger: node, start: "top 82%", once: true },
          }
        );
      });
    },
    { scope: root }
  );

  return (
    <main className="pt-32 lg:pt-40">
      <PageOpening
        eyebrow="Industries"
        title={page.h1}
        titleMax="max-w-[16ch]"
        intro="Four trades, and the same mistake in all of them: buying more leads when the problem was which leads."
      />

      {/* ── Why specialising matters ──────────────────────────────────────── */}
      <section className="mt-24 border-y border-line bg-surface py-(--spacing-section) lg:mt-36">
        <Container>
          <div className="lg:flex lg:items-start lg:gap-16 xl:gap-24">
            <div className="lg:w-[48%] lg:shrink-0">
              <SplitLines
                as="h2"
                className="max-w-[18ch] font-display text-h2 leading-[1.1] text-foreground"
              >
                <>
                  An agency that takes anyone learns{" "}
                  <span className="text-accent">nothing</span>.
                </>
              </SplitLines>
            </div>

            <Reveal delay={0.1} className="mt-10 max-w-text lg:mt-0 lg:flex-1">
              <p className="text-lead text-muted">
                A generalist agency running a plumber and a law firm and a cafe
                is running three campaigns and learning three unrelated lessons,
                none of which transfer.
              </p>
              <p className="mt-6 text-body text-muted">
                Do the same trade repeatedly and you stop guessing. You know
                which searches waste money before you spend any, which job types
                are worth chasing, and what people in that trade are actually
                asked before they get booked. None of that is clever. It is just
                the difference between the tenth time and the first.
              </p>
              <p className="mt-6 text-body text-muted">
                {siteConfig.founder.name} held an electrical licence for twelve
                years, which is where the trade side of this started and why the
                list below is trades rather than whoever happened to call.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── The four ──────────────────────────────────────────────────────── */}
      <div ref={root}>
        {industries.map((industry, i) => {
          const flip = i % 2 === 1;

          return (
            <section
              key={industry.key}
              className="border-b border-line py-14 lg:py-20"
            >
              <Container>
                <div
                  className={
                    "lg:flex lg:items-center lg:gap-14 xl:gap-20 " +
                    (flip ? "lg:flex-row-reverse" : "")
                  }
                >
                  {/* ── Picture ───────────────────────────────────────── */}
                  <Link
                    href={`/industries/${industry.key}/`}
                    tabIndex={-1}
                    aria-hidden
                    className="group relative block aspect-[16/10] overflow-hidden rounded-card border border-line transition-colors duration-slow ease-out-quart hover:border-accent lg:aspect-[5/4] lg:w-[44%] lg:shrink-0"
                  >
                    <span data-parallax className="absolute inset-0 block">
                      <span className="absolute inset-0 block scale-[1.16]">
                        <Image
                          src={industry.image}
                          alt=""
                          fill
                          sizes="(min-width: 1024px) 44vw, 100vw"
                          style={{ objectPosition: industry.focus }}
                          className="object-cover transition-transform duration-slower ease-out-quart group-hover:scale-105"
                        />
                      </span>
                    </span>
                  </Link>

                  {/* ── Copy ──────────────────────────────────────────── */}
                  <div
                    data-copy
                    className="mt-10 lg:mt-0 lg:min-w-0 lg:flex-1"
                  >
                    <span className="font-mono text-eyebrow tabular-nums text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <h2 className="mt-5 font-display text-h2 leading-[1.1] text-foreground">
                      <Link
                        href={`/industries/${industry.key}/`}
                        className="transition-colors duration-base hover:text-accent"
                      >
                        {industry.label}
                      </Link>
                    </h2>

                    <p className="mt-6 max-w-text text-lead text-foreground">
                      {PROOF[industry.key]}
                    </p>

                    <p className="mt-5 max-w-text text-body text-muted">
                      {industry.intro}
                    </p>

                    <Link
                      href={`/industries/${industry.key}/`}
                      className="group mt-8 inline-flex items-center gap-3 font-display text-body text-foreground transition-colors duration-base hover:text-accent"
                    >
                      Marketing for {industry.label.toLowerCase()}
                      <span
                        aria-hidden
                        className="text-accent transition-transform duration-base ease-out-quart group-hover:translate-x-1.5"
                      >
                        &rarr;
                      </span>
                    </Link>
                  </div>
                </div>
              </Container>
            </section>
          );
        })}
      </div>

      {/* ── Not on the list ───────────────────────────────────────────────── */}
      <section className="py-(--spacing-section)">
        <Container>
          <Reveal y={14} className="flex items-center gap-4">
            <MarkAnchor size="w-3.5" />
            <p className="eyebrow shrink-0 text-accent">Not on the list</p>
            <Rule className="flex-1" delay={0.15} />
          </Reveal>

          <div className="mt-10 lg:flex lg:items-start lg:gap-16 xl:gap-24">
            <div className="lg:w-[48%] lg:shrink-0">
              <SplitLines
                as="h2"
                className="max-w-[18ch] font-display text-h2 leading-[1.1] text-foreground"
              >
                Carpenter, roofer, landscaper, concreter.
              </SplitLines>
            </div>

            <Reveal delay={0.1} className="mt-8 max-w-text lg:mt-0 lg:flex-1">
              <p className="text-lead text-muted">
                The four above are the ones with pages because they are the ones
                we have done most.
              </p>
              <p className="mt-6 text-body text-muted">
                The work is the same shape for any trade where the jobs vary in
                value and the good ones get planned rather than panicked about.
                If that describes yours, the absence of a page for it is not a
                signal about anything.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <CTA />
    </main>
  );
}
