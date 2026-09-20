"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, EASE } from "@/lib/gsap";
import { getPage } from "@/config/pages";
import { getGuide } from "@/config/guides";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { SplitLines } from "@/components/motion/SplitLines";
import { Rule } from "@/components/motion/Rule";
import { MarkAnchor } from "@/components/motion/MarkFlight";
import { CTA } from "@/components/sections/CTA";

/**
 * GUIDE TEMPLATE.
 *
 * ── The answer goes first ───────────────────────────────────────────────────
 * `shortAnswer` renders above everything, in a bordered panel, before any
 * introduction. Two reasons, and both matter more than the convention of
 * easing into a topic.
 *
 * Someone who searched "how much does SEO cost" wants the number. Making them
 * read four paragraphs of context first is a cost imposed on the reader for
 * the writer's comfort, and most of them leave.
 *
 * It is also how a page earns a featured snippet. A direct answer near the top
 * in a clear block is what gets extracted. Buried below an introduction, it
 * does not exist as far as that mechanism is concerned.
 *
 * ── The reviewed date is shown, not hidden ──────────────────────────────────
 * These guides contain prices. A cost page with no date on it is untrustworthy
 * by the time it is a year old and there is no way for a reader to tell. The
 * date is printed on the page so a stale guide is visibly stale, which is also
 * the mechanism that makes someone update it.
 *
 * ── Motion ──────────────────────────────────────────────────────────────────
 * Reveal only. This is long-form prose, and nothing on a page built to be read
 * should move while it is being read.
 */
export function GuideTemplate({ pageKey }: { pageKey: string }) {
  const page = getPage(pageKey);
  const guide = getGuide(pageKey);

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
          { autoAlpha: 0, y: 20 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.75,
            ease: EASE.expo,
            scrollTrigger: { trigger: node, start: "top 88%", once: true },
          }
        );
      });
    },
    { scope: root }
  );

  const reviewed = new Date(guide.reviewed).toLocaleDateString("en-AU", {
    month: "long",
    year: "numeric",
  });

  return (
    <main ref={root} className="pt-32 lg:pt-40">
      <Container>
        <Reveal y={14} className="flex items-center gap-4">
          <MarkAnchor size="w-3.5" />
          <Link
            href="/guides/"
            className="eyebrow shrink-0 text-accent transition-colors duration-base hover:text-foreground"
          >
            Guides
          </Link>
          <Rule className="flex-1" delay={0.15} />
        </Reveal>

        <SplitLines
          as="h1"
          className="mt-8 max-w-[20ch] font-display text-h1 uppercase leading-[0.94] text-foreground"
        >
          {page.h1}
        </SplitLines>

        {/* ── The answer ─────────────────────────────────────────────────── */}
        <Reveal delay={0.1} className="mt-12 lg:mt-16">
          <div className="rounded-card border border-accent bg-surface p-8 lg:p-12">
            <p className="font-mono text-eyebrow uppercase tracking-wider text-accent">
              Short answer
            </p>
            {guide.shortAnswer.map((p, i) => (
              <p
                key={p}
                className={
                  i === 0
                    ? "mt-6 max-w-2xl text-lead text-foreground"
                    : "mt-5 max-w-2xl text-body text-muted"
                }
              >
                {p}
              </p>
            ))}
          </div>
        </Reveal>

        <p className="mt-6 font-mono text-eyebrow uppercase tracking-wider text-faint">
          Last checked {reviewed}
        </p>
      </Container>

      {/* ── The body ────────────────────────────────────────────────────── */}
      <Container className="mt-20 lg:mt-28">
        <div className="max-w-3xl">
          {guide.sections.map((section) => (
            <section key={section.h} data-rise className="mt-16 first:mt-0">
              <h2 className="max-w-[24ch] font-display text-h3 uppercase leading-tight text-foreground">
                {section.h}
              </h2>

              {section.p.map((p) => (
                <p key={p} className="mt-6 text-lead text-muted">
                  {p}
                </p>
              ))}

              {section.list ? (
                <ul className="mt-8 flex flex-col gap-4">
                  {section.list.map((item) => (
                    <li key={item} className="flex gap-4">
                      <span aria-hidden className="shrink-0 text-accent">
                        &rarr;
                      </span>
                      <span className="text-body text-muted">{item}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>
      </Container>

      {/* ── FAQs ────────────────────────────────────────────────────────────
          Rendered as plain headings and paragraphs rather than an accordion.
          Content hidden behind a click is content a reader has to work for,
          and these are short enough that hiding them buys nothing. */}
      <section className="mt-24 border-y border-line bg-surface py-(--spacing-section) lg:mt-36">
        <Container>
          <SplitLines
            as="h2"
            className="max-w-[18ch] font-display text-h2 uppercase leading-[0.96] text-foreground"
          >
            Common questions.
          </SplitLines>

          <div className="mt-14 max-w-3xl lg:mt-20">
            {guide.faqs.map((f) => (
              <div
                key={f.q}
                data-rise
                className="border-t border-line py-8 last:border-b"
              >
                <h3 className="max-w-[30ch] font-display text-h4 uppercase leading-tight text-foreground">
                  {f.q}
                </h3>
                <p className="mt-4 text-body text-muted">{f.a}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Where next ──────────────────────────────────────────────────── */}
      <section className="py-(--spacing-section)">
        <Container>
          <SplitLines
            as="h2"
            className="max-w-[18ch] font-display text-h2 uppercase leading-[0.96] text-foreground"
          >
            Read next.
          </SplitLines>

          <ul className="mt-12 grid gap-3 sm:grid-cols-2">
            {guide.related.map((key) => {
              const target = getPage(key);
              return (
                <li key={key}>
                  <Link
                    href={target.url}
                    className="group flex items-center justify-between gap-6 rounded-card border border-line bg-surface p-7 transition-colors duration-slow ease-out-quart hover:border-accent"
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
            <Button href="/guides/" variant="outline" size="lg">
              All guides
            </Button>
          </div>
        </Container>
      </section>

      <CTA />
    </main>
  );
}
