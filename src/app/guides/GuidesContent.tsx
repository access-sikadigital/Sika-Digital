"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, EASE } from "@/lib/gsap";
import { getPage } from "@/config/pages";
import { guides } from "@/config/guides";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { SplitLines } from "@/components/motion/SplitLines";
import { PageOpening } from "@/components/ui/PageOpening";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";
import { CTA } from "@/components/sections/CTA";

/**
 * GUIDES HUB.
 *
 * ── Ordered by usefulness, not by date ──────────────────────────────────────
 * Rendered in the order of `config/guides`, which is the order they are worth
 * reading rather than the order they were written. A reverse-chronological
 * feed is right for news and wrong for reference material: nothing here gets
 * less useful because it was written first, and putting the newest at the top
 * buries the cost guides that most people arrive for.
 *
 * ── The cards lead with the question ────────────────────────────────────────
 * Each card shows the page's H1, which is the question, rather than a clever
 * title. People scan this page looking for their own question and the match
 * should be literal.
 *
 * ── Copy ────────────────────────────────────────────────────────────────────
 * Source: "Guides — Page Copy" in the SIKA Website Copy spreadsheet (Draft for
 * review). The guides are grouped into the four starting points the doc sets
 * out, each group introduced by the doc's own line.
 */

const COPY = {
  eyebrow: "Digital marketing guides",
  title: "Understand your options before making the next decision.",
  intro:
    "Marketing terms and quotes can be hard to compare. These guides explain common questions in everyday language, so you can plan the work and ask more useful questions.",
  groupsTitle: "Choose a starting point",
  groups: [
    {
      title: "SEO and local visibility",
      copy: "What is local SEO? explains how it relates to nearby customers. Google Maps SEO looks at your business profile, accurate information and the factors behind local results.",
      keys: ["guide-what-is-local-seo", "guide-maps-seo"],
    },
    {
      title: "Search and advertising choices",
      copy: "SEO vs Google Ads compares how the two approaches work and when each may fit your priorities.",
      keys: ["guide-seo-vs-ads"],
    },
    {
      title: "Costs and scope",
      copy: "How much does SEO cost in Australia?, How much do Google Ads cost? and How much does a website cost? explain what changes the budget and what to look for in a quote.",
      keys: ["guide-seo-cost", "guide-ads-cost", "guide-website-cost"],
    },
    {
      title: "Enquiries and trade marketing",
      copy: "How to get more leads looks at the journey from getting found to following up. Digital marketing for tradies applies that thinking to services, areas and the jobs you want.",
      keys: ["guide-more-leads", "guide-tradies"],
    },
  ],
  prepare: {
    title: "Use the guides to prepare for a conversation.",
    copy: "Write down your current situation, the work you want to improve and anything a quote needs to include. Your own business details will matter more than a general example.",
  },
  cta: {
    eyebrow: "Start here",
    line1: "Want help applying it",
    line2: "to your",
    accent: "business?",
    copy: "Explore our services or tell us which question you are working through. We’ll discuss a practical next step with you.",
  },
};
export function GuidesContent() {
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

      const cards = gsap.utils.toArray<HTMLElement>("[data-card]", el);
      if (!cards.length) return;
      if (el.getBoundingClientRect().top < window.innerHeight * 0.95) return;

      gsap.fromTo(
        cards,
        { clipPath: "inset(0% 0% 100% 0%)", yPercent: 5 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          yPercent: 0,
          duration: 0.9,
          ease: EASE.expo,
          stagger: 0.07,
          scrollTrigger: { trigger: el, start: "top 75%", once: true },
        }
      );
    },
    { scope: root }
  );

  return (
    <main ref={root} className="pt-32 lg:pt-40">
      <PageOpening
        eyebrow={COPY.eyebrow}
        title={COPY.title}
        titleMax="max-w-[12ch]"
        intro={COPY.intro}
      />
      <Container className="mt-10 lg:mt-12">
        <Reveal delay={0.2}>
          <Button href={siteConfig.offer.primary.href} size="lg">
            {siteConfig.offer.primary.label}
          </Button>
        </Reveal>
      </Container>

      {/* ── Choose a starting point ──────────────────────────────────────── */}
      <section className="py-(--spacing-section)">
        <Container>
          <SplitLines
            as="h2"
            className="max-w-[18ch] font-display text-h2 leading-[0.94] text-foreground"
          >
            {COPY.groupsTitle}
          </SplitLines>

          <div className="mt-14 flex flex-col gap-16 lg:mt-20 lg:gap-24">
            {COPY.groups.map((group, g) => (
              <div
                key={group.title}
                className="lg:flex lg:items-start lg:gap-16"
              >
                <div className="lg:w-[34%] lg:shrink-0">
                  <span className="font-mono text-eyebrow text-accent tabular-nums">
                    {String(g + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 font-display text-h3 leading-[0.94] text-foreground">
                    {group.title}
                  </h3>
                  <p className="mt-5 max-w-md text-body text-muted">
                    {group.copy}
                  </p>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:mt-0 lg:min-w-0 lg:flex-1">
                  {group.keys.map((key) => {
                    const guide = guides.find((x) => x.key === key);
                    if (!guide) return null;
                    const target = getPage(key);
                    return (
                      <Link
                        key={key}
                        href={target.url}
                        data-card
                        className="group duration-slow flex h-full flex-col justify-between rounded-card border border-line bg-surface p-7 transition-colors ease-out-quart hover:border-accent lg:p-9"
                      >
                        <div>
                          <span className="font-mono text-eyebrow tracking-wider text-faint uppercase">
                            {guide.label}
                          </span>
                          <h4 className="duration-base mt-5 max-w-[22ch] font-display text-h4 leading-[0.94] text-foreground transition-colors group-hover:text-accent">
                            {target.h1}
                          </h4>
                          <p className="mt-4 text-small text-muted">
                            {guide.summary}
                          </p>
                        </div>
                        <span className="mt-8 flex items-center gap-3 font-display text-body text-foreground">
                          Read it
                          <span
                            aria-hidden
                            className="duration-base text-accent transition-transform ease-out-quart group-hover:translate-x-1.5"
                          >
                            &rarr;
                          </span>
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Prepare for a conversation ───────────────────────────────────── */}
      <section className="border-y border-line bg-surface py-(--spacing-section)">
        <Container>
          <div className="lg:flex lg:items-start lg:gap-16 xl:gap-24">
            <div className="lg:w-[46%] lg:shrink-0">
              <SplitLines
                as="h2"
                className="max-w-[18ch] font-display text-h2 leading-[0.94] text-foreground"
              >
                {COPY.prepare.title}
              </SplitLines>
            </div>
            <Reveal delay={0.1} className="mt-10 max-w-text lg:mt-0 lg:flex-1">
              <p className="text-lead text-muted">{COPY.prepare.copy}</p>
              <div className="mt-10">
                <Button href="/services/" variant="outline" size="lg">
                  Explore our services
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <CTA copy={COPY.cta} />
    </main>
  );
}
