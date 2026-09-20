"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, EASE } from "@/lib/gsap";
import { getPage, serviceGroups } from "@/config/pages";
import { getServiceDetail } from "@/config/service-details";
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
 * SERVICE PAGE TEMPLATE.
 *
 * Used by the thirteen service pages that sit below the five hubs. The hubs
 * are bespoke; these share a frame for the same reason the trade pages do,
 * which is that nobody reads two of them back to back and the thing that has
 * to differ is the substance.
 *
 * ── The section that makes these pages work ─────────────────────────────────
 * "Worth knowing" is not a formatting convention. Every entry in
 * `config/service-details` has to contain something an agency would rather not
 * put in writing: this is the wrong tool if X, you can do this yourself, the
 * usual pricing model is against your interests.
 *
 * Without it, thirteen pages saying "we do this and we are good at it" are
 * interchangeable with every competitor's and with each other, which is the
 * shape Google treats as thin. With it, none of them could have been written
 * by anyone else. It also does the commercial job the scope asks for: the
 * cheapest way to protect lead quality is to tell the wrong enquiries not to
 * come.
 *
 * ── Parent link ─────────────────────────────────────────────────────────────
 * Derived from the URL rather than configured. `/seo/local-seo/` belongs to
 * `/seo/`, and a service group whose href is a prefix of this page's URL is
 * its parent. Top-level services like `/email-marketing/` have no prefix match
 * and correctly get no parent, which is why this is a `find` and not an
 * assumption.
 *
 * ── Motion ──────────────────────────────────────────────────────────────────
 * Reveal only, nothing scrubbed. These pages are prose, and motion belongs to
 * arrival rather than to reading.
 */
export function ServiceTemplate({ pageKey }: { pageKey: string }) {
  const page = getPage(pageKey);
  const detail = getServiceDetail(pageKey);

  const parent = serviceGroups.find(
    (g) => g.href !== page.url && page.url.startsWith(g.href)
  );

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
        eyebrow={detail.eyebrow}
        title={page.h1}
        titleMax="max-w-[16ch]"
        intro={detail.intro}
      />

      {/* ── The argument ──────────────────────────────────────────────────── */}
      <section className="mt-20 border-y border-line bg-surface py-(--spacing-section) lg:mt-32">
        <Container>
          <div className="lg:flex lg:items-start lg:gap-16 xl:gap-24">
            <div className="lg:w-[46%] lg:shrink-0">
              <SplitLines
                as="h2"
                className="max-w-[18ch] font-display text-h2 uppercase leading-[0.96] text-foreground"
              >
                {detail.angleHeading}
              </SplitLines>
            </div>

            <div className="mt-10 max-w-text lg:mt-0 lg:min-w-0 lg:flex-1">
              {detail.angle.map((para, i) => (
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

      {/* ── What it is ────────────────────────────────────────────────────── */}
      <section className="py-(--spacing-section)">
        <Container>
          <Reveal y={14} className="flex items-center gap-4">
            <MarkAnchor size="w-3.5" />
            <p className="eyebrow shrink-0 text-accent">What the work is</p>
            <Rule className="flex-1" delay={0.15} />
          </Reveal>

          <SplitLines
            as="h2"
            className="mt-8 max-w-[18ch] font-display text-h2 uppercase leading-[0.96] text-foreground"
          >
            The parts that actually move it.
          </SplitLines>

          <ul className="mt-14 lg:mt-20">
            {detail.includes.map((item, i) => (
              <li
                key={item.t}
                data-rise
                className="group border-t border-line py-8 last:border-b lg:flex lg:items-baseline lg:gap-10"
              >
                <span className="font-mono text-eyebrow tabular-nums text-faint lg:w-14 lg:shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <h3 className="mt-3 max-w-[24ch] font-display text-h4 uppercase leading-tight text-foreground transition-colors duration-slow ease-out-quart group-hover:text-accent lg:mt-0 lg:w-[36%] lg:shrink-0">
                  {item.t}
                </h3>

                <p className="mt-3 max-w-text text-body text-muted lg:mt-0 lg:min-w-0 lg:flex-1">
                  {item.c}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ── The honest bit ───────────────────────────────────────────────────
          Bordered in accent and given its own band, because it is the one
          section on the page a competitor would not have written. */}
      <section className="border-y border-line bg-surface py-(--spacing-section)">
        <Container>
          <div className="rounded-card border border-accent bg-background p-8 lg:p-14">
            <p className="font-mono text-eyebrow uppercase tracking-wider text-accent">
              Worth knowing
            </p>

            <SplitLines
              as="h2"
              className="mt-7 max-w-[20ch] font-display text-h2 uppercase leading-[0.96] text-foreground"
            >
              {detail.honestHeading}
            </SplitLines>

            <div className="mt-8 max-w-2xl">
              {detail.honest.map((para, i) => (
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

      {/* ── Where we would start ──────────────────────────────────────────── */}
      <section className="py-(--spacing-section)">
        <Container>
          <Reveal y={14} className="flex items-center gap-4">
            <MarkAnchor size="w-3.5" />
            <p className="eyebrow shrink-0 text-accent">Where we would start</p>
            <Rule className="flex-1" delay={0.15} />
          </Reveal>

          <SplitLines
            as="h2"
            className="mt-8 max-w-[18ch] font-display text-h2 uppercase leading-[0.96] text-foreground"
          >
            Three things, before anyone spends anything.
          </SplitLines>

          <div className="mt-14 grid gap-4 lg:mt-20 lg:grid-cols-3">
            {detail.first.map((f, i) => (
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
                <h3 className="mt-7 max-w-[20ch] font-display text-h4 uppercase leading-tight text-foreground">
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
              label={`A real ${detail.eyebrow.toLowerCase()} result from a client account. Figures legible, name approved.`}
            />
            <Placeholder
              ratio="16/10"
              index="02"
              label="The before state, same account, same view. Both or neither."
            />
          </div>

          <Reveal delay={0.1} className="mt-10">
            <p className="max-w-text text-small text-faint">
              Nothing invented goes in these two frames. See the results page
              for why that rule exists.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ── Back up the tree ──────────────────────────────────────────────── */}
      <section className="py-(--spacing-section)">
        <Container>
          <SplitLines
            as="h2"
            className="max-w-[18ch] font-display text-h2 uppercase leading-[0.96] text-foreground"
          >
            {parent ? `The rest of ${parent.label.toLowerCase()}.` : "Everything else."}
          </SplitLines>

          <ul className="mt-12 grid gap-3 sm:grid-cols-2">
            {(parent ? parent.children : serviceGroups).map((child) => (
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

          <div className="mt-12 flex flex-wrap gap-4">
            {parent ? (
              <Button href={parent.href} variant="outline" size="lg">
                {parent.label}
              </Button>
            ) : null}
            <Button href="/services/" variant="outline" size="lg" arrow={false}>
              All services
            </Button>
          </div>
        </Container>
      </section>

      <CTA />
    </main>
  );
}
