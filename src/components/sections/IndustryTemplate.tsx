"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, EASE } from "@/lib/gsap";
import { getPage, serviceGroups } from "@/config/pages";
import { getIndustry } from "@/config/industries";
import { siteConfig } from "@/config/site";
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
 * INDUSTRY PAGE TEMPLATE.
 *
 * ── Why these share a layout when the service pages do not ──────────────────
 * The five service pages were built bespoke on purpose: a visitor may read two
 * of them back to back, and they are selling genuinely different things.
 *
 * These are the opposite case. Four pages aimed at four versions of the same
 * search, read by four audiences who will each see exactly one of them. A
 * visitor comparing the electricians page against the plumbers page is not a
 * scenario that happens. Building four bespoke layouts for that would be
 * effort spent where nobody is looking, and it would guarantee they drift
 * apart as the site grows.
 *
 * ── The real risk here, and where it is actually handled ────────────────────
 * Four pages targeting four near-identical phrases is the shape Google treats
 * as doorway pages. The defence is not a different layout, it is different
 * substance, and that lives in `config/industries`: each trade gets its own
 * argument, its own job types, its own searches. A shared frame around
 * genuinely different content is a template. A different frame around the same
 * content is still a doorway page.
 *
 * ── Motion ──────────────────────────────────────────────────────────────────
 * Reveal only, nothing scrubbed. These pages are almost entirely prose, and
 * the rule from the web design rebuild applies: motion belongs to arrival, not
 * to reading.
 */
export function IndustryTemplate({ pageKey }: { pageKey: string }) {
  const page = getPage(pageKey);
  const industry = getIndustry(pageKey);

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
          { autoAlpha: 0, y: 22 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
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
        eyebrow={`Marketing for ${industry.label.toLowerCase()}`}
        title={page.h1}
        titleMax="max-w-[16ch]"
        intro={industry.intro}
      />

      {/* ── The photograph, and who is behind the page ─────────────────────
          The credential goes next to the picture rather than in a paragraph
          somewhere below it. On a page aimed at a trade, "ran a job, not just
          a campaign" is the only line on the site a competitor cannot write,
          so it gets the position that reflects that. */}
      <Container className="mt-16 lg:mt-24">
        <div className="overflow-hidden rounded-card border border-line bg-surface lg:flex lg:items-stretch">
          <div className="relative aspect-[16/10] lg:aspect-auto lg:w-[52%] lg:shrink-0">
            <Image
              src={industry.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 52vw, 100vw"
              style={{ objectPosition: industry.focus }}
              className="object-cover"
              priority
            />
          </div>

          <div className="flex flex-col justify-center p-8 lg:min-w-0 lg:flex-1 lg:p-12">
            <p className="font-mono text-eyebrow uppercase tracking-wider text-accent">
              Who you would be dealing with
            </p>
            <p className="mt-6 max-w-lg text-lead text-foreground">
              {siteConfig.founder.name} held an electrical licence for twelve
              years before any of this.
            </p>
            <p className="mt-5 max-w-lg text-body text-muted">
              Which matters here for one reason: when you describe a month where
              the phone rang constantly and the numbers still did not work, it
              lands with someone who has had that month rather than someone who
              has read about it.
            </p>
          </div>
        </div>
      </Container>

      {/* ── The argument ──────────────────────────────────────────────────── */}
      <section className="mt-24 border-y border-line bg-surface py-(--spacing-section) lg:mt-36">
        <Container>
          <div className="lg:flex lg:items-start lg:gap-16 xl:gap-24">
            <div className="lg:w-[46%] lg:shrink-0">
              <SplitLines
                as="h2"
                className="max-w-[18ch] font-display text-h2 leading-[1.1] text-foreground"
              >
                {industry.angleHeading}
              </SplitLines>
            </div>

            <div className="mt-10 max-w-text lg:mt-0 lg:min-w-0 lg:flex-1">
              {industry.angle.map((para, i) => (
                <p
                  key={para}
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
            </div>
          </div>
        </Container>
      </section>

      {/* ── Which jobs ────────────────────────────────────────────────────── */}
      <section className="py-(--spacing-section)">
        <Container>
          <Reveal y={14} className="flex items-center gap-4">
            <MarkAnchor size="w-3.5" />
            <p className="eyebrow shrink-0 text-accent">Which jobs</p>
            <Rule className="flex-1" delay={0.15} />
          </Reveal>

          <SplitLines
            as="h2"
            className="mt-8 max-w-[20ch] font-display text-h2 leading-[1.1] text-foreground"
          >
            <>
              Not every enquiry is a{" "}
              <span className="text-accent">good</span> enquiry.
            </>
          </SplitLines>

          <div className="mt-14 grid gap-4 lg:mt-20 lg:grid-cols-2">
            <div data-rise className="rounded-card border border-accent bg-surface p-8 lg:p-11">
              <p className="font-mono text-eyebrow uppercase tracking-wider text-accent">
                More of this
              </p>
              <ul className="mt-7 flex flex-col gap-4">
                {industry.wanted.map((w) => (
                  <li key={w} className="flex gap-4 text-body text-foreground">
                    <span aria-hidden className="shrink-0 text-accent">
                      &rarr;
                    </span>
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div data-rise className="rounded-card border border-line bg-surface p-8 lg:p-11">
              <p className="font-mono text-eyebrow uppercase tracking-wider text-faint">
                Less of this
              </p>
              <ul className="mt-7 flex flex-col gap-4">
                {industry.unwanted.map((u) => (
                  <li key={u} className="flex gap-4 text-body text-faint">
                    <span aria-hidden className="shrink-0 text-line-strong">
                      &times;
                    </span>
                    <span>{u}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Reveal delay={0.1} className="mt-10">
            <p className="max-w-text text-small text-faint">
              Both lists are job types, not promises. If the second one is wrong
              for how you work, that is the first thing worth telling us.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ── What they search ──────────────────────────────────────────────── */}
      <section className="border-y border-line bg-surface py-(--spacing-section)">
        <Container>
          <Reveal y={14} className="flex items-center gap-4">
            <MarkAnchor size="w-3.5" />
            <p className="eyebrow shrink-0 text-accent">What they type</p>
            <Rule className="flex-1" delay={0.15} />
          </Reveal>

          <SplitLines
            as="h2"
            className="mt-8 max-w-[20ch] font-display text-h2 leading-[1.1] text-foreground"
          >
            The same person, four searches, four different jobs.
          </SplitLines>

          <ul className="mt-14 lg:mt-20">
            {industry.searches.map((s) => (
              <li
                key={s.q}
                data-rise
                className="border-t border-line py-7 last:border-b lg:flex lg:items-baseline lg:gap-12"
              >
                <span className="font-mono text-body text-foreground lg:w-[42%] lg:shrink-0">
                  {s.q}
                </span>
                <span className="mt-2 block max-w-text text-body text-muted lg:mt-0 lg:min-w-0 lg:flex-1">
                  {s.read}
                </span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ── What we would do first ────────────────────────────────────────── */}
      <section className="py-(--spacing-section)">
        <Container>
          <Reveal y={14} className="flex items-center gap-4">
            <MarkAnchor size="w-3.5" />
            <p className="eyebrow shrink-0 text-accent">Where we would start</p>
            <Rule className="flex-1" delay={0.15} />
          </Reveal>

          <SplitLines
            as="h2"
            className="mt-8 max-w-[18ch] font-display text-h2 leading-[1.1] text-foreground"
          >
            Three things, before anyone spends anything.
          </SplitLines>

          <div className="mt-14 grid gap-4 lg:mt-20 lg:grid-cols-3">
            {industry.first.map((f, i) => (
              <article
                key={f.t}
                data-rise
                className="group h-full rounded-card border border-line bg-surface p-8 transition-colors duration-slow ease-out-quart hover:border-accent lg:p-10"
              >
                <span className="block font-display text-h2 tabular-nums leading-none text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  aria-hidden
                  className="mt-7 block h-px w-full bg-line transition-colors duration-slow ease-out-quart group-hover:bg-accent/40"
                />
                <h3 className="mt-7 max-w-[20ch] font-display text-h4 leading-tight text-foreground">
                  {f.t}
                </h3>
                <p className="mt-4 text-body text-muted">{f.c}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Evidence ──────────────────────────────────────────────────────── */}
      <section className="border-y border-line bg-surface py-(--spacing-section)">
        <Container>
          <Reveal y={14} className="flex items-center gap-4">
            <MarkAnchor size="w-3.5" />
            <p className="eyebrow shrink-0 text-accent">Evidence</p>
            <Rule className="flex-1" delay={0.15} />
          </Reveal>

          <div className="mt-14 grid gap-4 lg:mt-20 lg:grid-cols-2">
            <Placeholder
              ratio="16/10"
              index="01"
              label={`A real ${industry.label.toLowerCase().replace(/s$/, "")} client's enquiries, sorted by job type. Names removed, figures legible.`}
            />
            <Placeholder
              ratio="16/10"
              index="02"
              label="A Google Business Profile for this trade, with real review volume showing."
            />
          </div>

          <Reveal delay={0.1} className="mt-10">
            <p className="max-w-text text-small text-faint">
              This page has no case study on it yet, and it will not have an
              invented one. When there is a real result for this trade, it goes
              here.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ── What that actually involves ───────────────────────────────────── */}
      <section className="py-(--spacing-section)">
        <Container>
          <SplitLines
            as="h2"
            className="max-w-[18ch] font-display text-h2 leading-[1.1] text-foreground"
          >
            The parts that do the work.
          </SplitLines>

          <ul className="mt-12 grid gap-3 sm:grid-cols-2">
            {serviceGroups.map((g) => (
              <li key={g.href}>
                <Link
                  href={g.href}
                  className="group flex items-center justify-between gap-6 rounded-card border border-line bg-surface p-7 transition-colors duration-slow ease-out-quart hover:border-accent"
                >
                  <span className="min-w-0">
                    <span className="block font-display text-h4 leading-tight text-foreground transition-colors duration-base group-hover:text-accent">
                      {g.label}
                    </span>
                    <span className="mt-2 block text-small text-muted">
                      {g.blurb}
                    </span>
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
            <Button href="/industries/" variant="outline" size="lg">
              All industries
            </Button>
          </div>
        </Container>
      </section>

      <CTA />
    </main>
  );
}
