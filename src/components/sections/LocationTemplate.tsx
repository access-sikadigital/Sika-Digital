"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, EASE } from "@/lib/gsap";
import { getPage } from "@/config/pages";
import { getLocation } from "@/config/locations";
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
 * LOCATION PAGE TEMPLATE.
 *
 * ── The thing this template cannot fix on its own ───────────────────────────
 * Twelve pages differing only by a city name is the definition of a doorway
 * page, and no layout saves that. What saves it is `local` in
 * `config/locations`: a real observation about that city's market, written
 * once, that could not be moved to another page. If a city has no such
 * paragraph, it should not have a page. That rule lives in the config and is
 * repeated here because this is the file someone will copy when adding the
 * thirteenth.
 *
 * ── The remote disclosure is not optional ───────────────────────────────────
 * Every page states plainly that Sika is Melbourne based and works remotely.
 * Location pages are the exact place businesses imply an office they do not
 * have, and for a company selling local SEO that is both a false claim and the
 * specific behaviour that gets a Google Business Profile suspended.
 *
 * It also works commercially. Saying it up front removes the question a
 * prospect would otherwise carry through the whole page.
 *
 * ── The suburb list ─────────────────────────────────────────────────────────
 * Real areas, listed to show the page knows the city, and deliberately NOT
 * linked. Generating a page per suburb from a template is the doorway pattern
 * at a larger scale, and the point at which Google stops giving the benefit of
 * the doubt. If a suburb ever earns a page, it earns it by having something
 * written about it.
 *
 * ── Motion ──────────────────────────────────────────────────────────────────
 * Reveal only. These pages are prose.
 */
export function LocationTemplate({ pageKey }: { pageKey: string }) {
  const page = getPage(pageKey);
  const loc = getLocation(pageKey);

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
        eyebrow={loc.eyebrow}
        title={page.h1}
        titleMax="max-w-[16ch]"
        intro={loc.intro}
      />

      {/* ── Where we are ─────────────────────────────────────────────────────
          First section on the page, before any pitch. It is the question a
          reader of a location page is already holding. */}
      <Container className="mt-14 lg:mt-20">
        <div
          data-rise
          className="rounded-card border border-line bg-surface p-7 sm:flex sm:items-center sm:justify-between sm:gap-8 lg:p-9"
        >
          <p className="max-w-2xl text-body text-muted">
            <span className="text-foreground">
              We are {siteConfig.homeCity} based and work with {loc.city}{" "}
              businesses remotely.
            </span>{" "}
            No office there, and we are not going to imply one. For everything
            except a site visit it makes no practical difference, and it is
            worth knowing before you read the rest of this.
          </p>

          <p className="mt-5 shrink-0 font-mono text-eyebrow uppercase tracking-wider text-faint sm:mt-0">
            {siteConfig.homeCity} based
          </p>
        </div>
      </Container>

      {/* ── What is different about this market ──────────────────────────── */}
      <section className="mt-20 border-y border-line bg-surface py-(--spacing-section) lg:mt-28">
        <Container>
          <Reveal y={14} className="flex items-center gap-4">
            <MarkAnchor size="w-3.5" />
            <p className="eyebrow shrink-0 text-accent">
              The {loc.city} market
            </p>
            <Rule className="flex-1" delay={0.15} />
          </Reveal>

          <div className="mt-8 lg:flex lg:items-start lg:gap-16 xl:gap-24">
            <div className="lg:w-[46%] lg:shrink-0">
              <SplitLines
                as="h2"
                className="max-w-[18ch] font-display text-h2 uppercase leading-[0.96] text-foreground"
              >
                {loc.localHeading}
              </SplitLines>
            </div>

            <div className="mt-10 max-w-text lg:mt-0 lg:min-w-0 lg:flex-1">
              {loc.local.map((para, i) => (
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

      {/* ── Areas ─────────────────────────────────────────────────────────── */}
      <section className="py-(--spacing-section)">
        <Container>
          <Reveal y={14} className="flex items-center gap-4">
            <MarkAnchor size="w-3.5" />
            <p className="eyebrow shrink-0 text-accent">Areas</p>
            <Rule className="flex-1" delay={0.15} />
          </Reveal>

          <SplitLines
            as="h2"
            className="mt-8 max-w-[20ch] font-display text-h2 uppercase leading-[0.96] text-foreground"
          >
            Where {loc.city} businesses actually compete.
          </SplitLines>

          <Reveal delay={0.1} className="mt-8">
            <p className="max-w-text text-lead text-muted">
              Not one market. Each of these behaves differently in search, and
              a campaign pointed at the whole city is usually pointed at none
              of them.
            </p>
          </Reveal>

          {/* Plain text, not links. A page per suburb generated from a
              template is the doorway pattern at scale. */}
          <ul
            data-rise
            className="mt-12 flex flex-wrap gap-x-3 gap-y-3 lg:mt-16"
          >
            {loc.suburbs.map((s) => (
              <li
                key={s}
                className="rounded-full border border-line px-5 py-2.5 font-mono text-eyebrow uppercase tracking-wider text-muted"
              >
                {s}
              </li>
            ))}
          </ul>

          <Reveal delay={0.1} className="mt-10">
            <p className="max-w-text text-small text-faint">
              These are not links. A separate page for every suburb, spun from
              one template, is the thing search engines have spent a decade
              learning to discount. If an area earns a page it will be because
              there is something to say about it.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ── What we would do ──────────────────────────────────────────────── */}
      <section className="border-y border-line bg-surface py-(--spacing-section)">
        <Container>
          <SplitLines
            as="h2"
            className="max-w-[18ch] font-display text-h2 uppercase leading-[0.96] text-foreground"
          >
            The work behind it.
          </SplitLines>

          <Reveal delay={0.1} className="mt-8">
            <p className="max-w-text text-lead text-muted">
              None of it is specific to {loc.city}. What changes by city is
              which part matters most, and that is decided by looking at your
              account rather than by the address at the top of this page.
            </p>
          </Reveal>

          <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:mt-16">
            {loc.related.map((key) => {
              const target = getPage(key);
              return (
                <li key={key}>
                  <Link
                    href={target.url}
                    className="group flex items-center justify-between gap-6 rounded-card border border-line bg-background p-7 transition-colors duration-slow ease-out-quart hover:border-accent"
                  >
                    <span className="min-w-0">
                      <span className="block font-display text-h4 uppercase leading-tight text-foreground transition-colors duration-base group-hover:text-accent">
                        {target.label}
                      </span>
                      <span className="mt-2 block text-small text-muted">
                        {target.h1}
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
              );
            })}
          </ul>

          <div className="mt-12">
            <Button href="/services/" variant="outline" size="lg">
              All services
            </Button>
          </div>
        </Container>
      </section>

      <CTA />
    </main>
  );
}
