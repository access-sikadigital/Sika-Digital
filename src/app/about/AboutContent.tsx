"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, EASE } from "@/lib/gsap";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { SplitLines } from "@/components/motion/SplitLines";
import { Rule } from "@/components/motion/Rule";
import { MarkAnchor } from "@/components/motion/MarkFlight";
import { PageOpening } from "@/components/ui/PageOpening";
import { CTA } from "@/components/sections/CTA";

/**
 * ABOUT.
 *
 * Copy source: "About — Page Copy" in the SIKA Website Copy spreadsheet
 * (status: Draft for review). Change the doc first, then this file.
 *
 * Built from the same blocks as before (opening, split statement, numbered
 * cards, closing CTA) so the page keeps the approved design language; only
 * the words and the section list follow the copy doc.
 *
 * ── Motion ──────────────────────────────────────────────────────────────────
 * Reveal only, nothing scrubbed. This page is almost entirely prose: motion
 * belongs to arrival, not to reading.
 */

const COPY = {
  eyebrow: "About SIKA Digital",
  title: "Digital work that starts with understanding your business.",
  intro:
    "SIKA Digital is a Melbourne agency working with businesses across Australia. We help with SEO, paid advertising, websites and AI consulting, with the work shaped around what your business needs next.",
  priorities: {
    title: "Your priorities come first.",
    copy: "You might need a clearer website, better search visibility or help making a business process easier to manage. We begin by understanding the current situation and what a useful improvement would look like.",
  },
  approach: {
    eyebrow: "How we work",
    title: "How we approach the work",
    items: [
      {
        n: "01",
        t: "Ask the practical questions",
        c: "What do you offer? Who is it for? What happens after someone contacts you? Those answers matter as much as the channel or tool we use.",
      },
      {
        n: "02",
        t: "Explain the recommendation",
        c: "You should understand what we suggest, why it is relevant and what it involves. We agree on the scope and costs before the work begins.",
      },
      {
        n: "03",
        t: "Keep you involved",
        c: "Your knowledge helps make the work accurate. We build in review points and explain the decisions, so feedback has a clear place in the process.",
      },
    ],
  },
  offer: {
    title: "A broad offer, with a clear starting point.",
    copy: [
      "Search, advertising, content and websites often affect one another. We can look at those connections while keeping the first piece of work focused and manageable.",
      "Our services cover different stages of the customer journey. The industry pages show how that can apply to trade and service businesses, alongside our wider Australian business focus.",
    ],
  },
  cta: {
    eyebrow: "Start here",
    line1: "Tell us what you’re",
    line2: "working",
    accent: "towards.",
    copy: "Bring your website, your plans or the problem you want to work through. We’ll discuss where we may be able to help.",
  },
};

export function AboutContent() {
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
        if (node.getBoundingClientRect().top < window.innerHeight * 0.95)
          return;

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
        eyebrow={COPY.eyebrow}
        title={COPY.title}
        titleMax="max-w-[17ch]"
        intro={COPY.intro}
      />
      <Container className="mt-10 lg:mt-12">
        <Reveal delay={0.2}>
          <Button href={siteConfig.offer.primary.href} size="lg">
            {siteConfig.offer.primary.label}
          </Button>
        </Reveal>
      </Container>

      {/* ── Your priorities ─────────────────────────────────────────────── */}
      <section className="mt-24 border-y border-line bg-surface py-(--spacing-section) lg:mt-36">
        <Container>
          <div className="lg:flex lg:items-start lg:gap-16 xl:gap-24">
            <div className="lg:w-[46%] lg:shrink-0">
              <SplitLines
                as="h2"
                className="max-w-[18ch] font-display text-h2 leading-[0.94] text-foreground"
              >
                {COPY.priorities.title}
              </SplitLines>
            </div>
            <div className="mt-10 max-w-text lg:mt-0 lg:min-w-0 lg:flex-1">
              <p data-rise className="text-lead text-muted">
                {COPY.priorities.copy}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ── How we approach the work ────────────────────────────────────── */}
      <section className="py-(--spacing-section)">
        <Container>
          <Reveal y={14} className="flex items-center gap-4">
            <MarkAnchor size="w-3.5" />
            <p className="shrink-0 eyebrow text-accent">
              {COPY.approach.eyebrow}
            </p>
            <Rule className="flex-1" delay={0.15} />
          </Reveal>

          <SplitLines
            as="h2"
            className="mt-8 max-w-[18ch] font-display text-h2 leading-[0.94] text-foreground"
          >
            {COPY.approach.title}
          </SplitLines>

          <div className="mt-14 grid gap-4 lg:mt-20 lg:grid-cols-3">
            {COPY.approach.items.map((h) => (
              <article
                key={h.n}
                data-rise
                className="group duration-slow h-full rounded-card border border-line bg-surface p-8 transition-colors ease-out-quart hover:border-accent lg:p-10"
              >
                <span className="block font-display text-h2 leading-[0.94] text-accent tabular-nums">
                  {h.n}
                </span>
                <span
                  aria-hidden
                  className="duration-slow mt-7 block h-px w-full bg-line transition-colors ease-out-quart group-hover:bg-accent/40"
                />
                <h3 className="mt-7 max-w-[22ch] font-display text-h4 leading-[0.94] text-foreground">
                  {h.t}
                </h3>
                <p className="mt-4 max-w-md text-body text-muted">{h.c}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* ── A broad offer ───────────────────────────────────────────────── */}
      <section className="border-y border-line bg-surface py-(--spacing-section)">
        <Container>
          <div className="lg:flex lg:items-start lg:gap-16 xl:gap-24">
            <div className="lg:w-[46%] lg:shrink-0">
              <SplitLines
                as="h2"
                className="max-w-[18ch] font-display text-h2 leading-[0.94] text-foreground"
              >
                {COPY.offer.title}
              </SplitLines>
            </div>
            <div className="mt-10 max-w-text lg:mt-0 lg:min-w-0 lg:flex-1">
              {COPY.offer.copy.map((para, i) => (
                <p
                  key={i}
                  data-rise
                  className={
                    i === 0
                      ? "text-lead text-muted"
                      : "mt-6 text-body text-muted"
                  }
                >
                  {para}
                </p>
              ))}
              <div className="mt-10 flex flex-wrap gap-3">
                <Button href="/services/" variant="outline" size="lg">
                  Explore our services
                </Button>
                <Button href="/industries/" variant="ghost" size="lg">
                  Industries
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <CTA copy={COPY.cta} />
    </main>
  );
}
