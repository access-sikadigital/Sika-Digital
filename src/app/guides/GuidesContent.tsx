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
 */
export function GuidesContent() {
  const page = getPage("guides");
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
        eyebrow="Guides"
        title={page.h1}
        titleMax="max-w-[16ch]"
        intro="Written for people deciding whether to spend money, including the parts that would talk you out of it."
      />

      {/* ── Why these exist ───────────────────────────────────────────────── */}
      <Container className="mt-14 lg:mt-20">
        <div className="rounded-card border border-line bg-surface p-7 lg:p-10">
          <p className="max-w-2xl text-body text-muted">
            <span className="text-foreground">
              The cost guides have real numbers in them.
            </span>{" "}
            Almost every competing page on those questions avoids giving one,
            which is exactly why we do. Each guide shows when it was last
            checked, because a page about prices with no date on it stops being
            useful and gives you no way to tell.
          </p>
        </div>
      </Container>

      {/* ── The guides ────────────────────────────────────────────────────── */}
      <section className="py-(--spacing-section)">
        <Container>
          <div className="grid gap-4 lg:grid-cols-2">
            {guides.map((guide, i) => {
              const target = getPage(guide.key);

              return (
                <Link
                  key={guide.key}
                  href={target.url}
                  data-card
                  className="group flex h-full flex-col justify-between rounded-card border border-line bg-surface p-8 transition-colors duration-slow ease-out-quart hover:border-accent lg:p-11"
                >
                  <div>
                    <div className="flex items-baseline justify-between gap-6 border-b border-line pb-5">
                      <span className="font-mono text-eyebrow tabular-nums text-accent">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-mono text-eyebrow uppercase tracking-wider text-faint">
                        {guide.label}
                      </span>
                    </div>

                    <h2 className="mt-7 max-w-[22ch] font-display text-h3 leading-[0.94] text-foreground transition-colors duration-base group-hover:text-accent">
                      {target.h1}
                    </h2>

                    <p className="mt-5 max-w-md text-body text-muted">
                      {guide.summary}
                    </p>
                  </div>

                  <span className="mt-10 flex items-center gap-3 font-display text-body text-foreground">
                    Read it
                    <span
                      aria-hidden
                      className="text-accent transition-transform duration-base ease-out-quart group-hover:translate-x-1.5"
                    >
                      &rarr;
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ── What is not here ──────────────────────────────────────────────── */}
      <section className="border-t border-line py-(--spacing-section)">
        <Container>
          <div className="lg:flex lg:items-start lg:gap-16 xl:gap-24">
            <div className="lg:w-[46%] lg:shrink-0">
              <SplitLines
                as="h2"
                className="max-w-[18ch] font-display text-h2 leading-[0.94] text-foreground"
              >
                <>
                  No blog. On{" "}
                  <span className="text-accent">purpose</span>.
                </>
              </SplitLines>
            </div>

            <Reveal delay={0.1} className="mt-10 max-w-text lg:mt-0 lg:flex-1">
              <p className="text-lead text-muted">
                There is no weekly post here and there is not going to be one.
              </p>
              <p className="mt-6 text-body text-muted">
                Publishing on a schedule produces content that exists because it
                was Thursday. These get written when there is a question worth
                answering properly, and updated when the answer changes, which
                is a slower output and a more useful one.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <CTA />
    </main>
  );
}
