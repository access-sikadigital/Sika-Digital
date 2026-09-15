"use client";

import Link from "next/link";
import { useRef } from "react";
import { serviceGroups } from "@/config/pages";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { gsap, useGSAP, ScrollTrigger, EASE } from "@/lib/gsap";

/**
 * SERVICES — pinned horizontal scroll.
 *
 * The section pins and the panels move sideways as you scroll down, one panel
 * per service group. It is the showpiece of the page and the one place the site
 * pins anything.
 *
 * ── On pinning, honestly ────────────────────────────────────────────────────
 * One of the reference sites uses zero pinned sections, and that is a defensible
 * choice: pinning means the page stops moving at native speed, which some people
 * dislike and which costs you if it is overused.
 *
 * It earns its place exactly once, here, because five service groups genuinely
 * benefit from being read as a sequence rather than a grid, and because
 * horizontal travel makes the set feel like a range rather than a list. The rule
 * for the rest of the site is no more pins.
 *
 * Note this is not scroll hijacking in the harmful sense. Scroll velocity is
 * untouched; vertical distance is simply mapped to horizontal movement. Nothing
 * intercepts the wheel or overrides the scrollbar.
 *
 * ── Desktop only ────────────────────────────────────────────────────────────
 * `gsap.matchMedia` builds the pin above 1024px and nothing below it. On a
 * phone the panels stack and scroll normally. A pinned horizontal track on a
 * touch device fights the browser's own gesture handling and is the single
 * worst place to put this pattern.
 *
 * matchMedia also REVERTS cleanly when the query stops matching, so resizing
 * from desktop to mobile tears the pin down rather than leaving a stuck
 * transform behind.
 */
export function ServicesScroll() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const section = root.current;
      const strip = track.current;
      if (!section || !strip) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 1024px)",
          reduced: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          const { isDesktop, reduced } = ctx.conditions as {
            isDesktop: boolean;
            reduced: boolean;
          };
          if (!isDesktop || reduced) return;

          /* Distance the track must travel: its full width minus one viewport.
             Computed rather than guessed, so adding a sixth service group needs
             no change here. */
          const distance = () => strip.scrollWidth - window.innerWidth;

          const tween = gsap.to(strip, {
            x: () => -distance(),
            ease: "none",
            scrollTrigger: {
              trigger: section,
              pin: true,
              scrub: 1,
              /* Scroll distance equals travel distance, so the panels move at
                 roughly the speed the page would have scrolled. Multiplying
                 this is how pinned sections start to feel like wading. */
              end: () => `+=${distance()}`,
              invalidateOnRefresh: true,
              anticipatePin: 1,
            },
          });

          /* Progress rule under the panels. scaleX, not width: transform
             composites, width forces layout on every frame. */
          if (progress.current) {
            gsap.fromTo(
              progress.current,
              { scaleX: 0 },
              {
                scaleX: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: section,
                  start: "top top",
                  end: () => `+=${distance()}`,
                  scrub: true,
                },
              }
            );
          }

          return () => {
            tween.scrollTrigger?.kill();
            tween.kill();
          };
        }
      );

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      id="services"
      className="relative overflow-hidden bg-background py-(--spacing-section) lg:py-0"
    >
      <div className="lg:flex lg:h-dvh lg:flex-col lg:justify-center">
        <Container className="lg:shrink-0 lg:pt-24">
          <SectionHeading
            eyebrow="What we do"
            title="Five things, done properly."
            intro="Web and SEO first. Paid and automation to make it move faster."
          />
        </Container>

        {/* Horizontal track. `w-max` lets it size to its contents so the travel
            distance can be measured rather than hardcoded. */}
        <div
          ref={track}
          className="mt-14 flex flex-col gap-6 lg:mt-16 lg:w-max lg:flex-row lg:gap-8 lg:px-(--spacing-gutter)"
        >
          {serviceGroups.map((group, i) => (
            <article
              key={group.href}
              className="group flex flex-col justify-between rounded-card border border-line bg-surface p-8 transition-colors duration-base hover:border-accent lg:h-[26rem] lg:w-[30rem] lg:shrink-0"
            >
              <div>
                <span className="font-mono text-eyebrow tabular-nums text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 font-display text-h2 leading-none uppercase text-foreground">
                  {group.label}
                </h3>
                <p className="mt-4 max-w-sm text-body text-muted">
                  {group.blurb}
                </p>
              </div>

              <ul className="mt-8 flex flex-wrap gap-2">
                {group.children.map((child) => (
                  <li key={child.href}>
                    <Link
                      href={child.href}
                      className="inline-flex rounded-pill border border-line px-3.5 py-2 text-small text-muted transition-colors duration-base hover:border-accent hover:text-accent"
                    >
                      {child.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        {/* Progress rule. Desktop only, since there is no horizontal travel to
            report on a phone. */}
        <Container className="hidden lg:mt-12 lg:block lg:shrink-0 lg:pb-16">
          <span className="block h-px w-full bg-line">
            <span
              ref={progress}
              className="block h-px w-full origin-left scale-x-0 bg-accent"
            />
          </span>
        </Container>
      </div>
    </section>
  );
}
