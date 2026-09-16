"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, EASE } from "@/lib/gsap";
import { getPage } from "@/config/pages";
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
 * ABOUT.
 *
 * ── The only page on this site a competitor cannot rewrite ──────────────────
 * Every other page makes an argument any decent agency could make with enough
 * care. This one rests on a fact: twelve years holding an electrical licence
 * before any of the marketing. Nobody can copy that, so the page is built
 * around it rather than around a company story.
 *
 * ── What it deliberately is not ─────────────────────────────────────────────
 * No founding-year narrative, no values grid, no "our mission". Those exist on
 * about pages because the page has to be filled, and they are read by nobody.
 * Someone lands here for one reason: they are about to hand over money and
 * want to know who to. So the page answers who, what they will actually get,
 * and what would make this a bad fit.
 *
 * ── The bad-fit section is the point of the page ────────────────────────────
 * It costs enquiries. That is what makes it work: a page that says who it is
 * wrong for is the only kind that is believable about who it is right for, and
 * the scope names lead quality as the thing to protect.
 *
 * ── Motion ──────────────────────────────────────────────────────────────────
 * Reveal only, nothing scrubbed. This page is almost entirely prose, and the
 * rule from the web design rebuild applies: motion belongs to arrival, not to
 * reading.
 */

const HOW = [
  {
    n: "01",
    t: "You deal with the person doing the work",
    c: "No account manager relaying questions to someone you never meet. It is a small team on purpose, and that is the trade-off: fewer clients at a time, and nothing gets lost being passed along.",
  },
  {
    n: "02",
    t: "Everything is in your name",
    c: "Your ad accounts, your analytics, your domain, your Google listing. If we stop working together you keep all of it and nothing needs to be handed over, because it was never held.",
  },
  {
    n: "03",
    t: "No lock-in contract",
    c: "Month to month. An agency that needs twelve months to be worth keeping is telling you something about months two through eleven.",
  },
  {
    n: "04",
    t: "Reports you can check",
    c: "Every number we report can be found in your own account. If a figure only exists in our dashboard, it is not a figure.",
  },
];

const BAD_FIT = [
  "You want the cheapest option. There is always a cheaper one and it usually costs more.",
  "You want to be told what you already decided. We will say when we think something is wrong, which is most of what you are paying for.",
  "You need results this fortnight. Ads can be quick. Nothing else here is.",
  "You want a hundred leads a month and do not mind what they are. That is a different service and someone else does it well.",
];

export function AboutContent() {
  const page = getPage("about");
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
        eyebrow="About"
        title={page.h1}
        titleMax="max-w-[17ch]"
        intro="Twelve years on the tools first. That is not a story about us, it is the reason the advice is different."
      />

      {/* ── The founder ───────────────────────────────────────────────────── */}
      <Container className="mt-16 lg:mt-24">
        <div className="overflow-hidden rounded-card border border-line bg-surface lg:flex lg:items-stretch">
          <div className="lg:w-[44%] lg:shrink-0">
            <Placeholder
              ratio="4/5"
              index="01"
              label="John, on site or in a van. Working clothes, not a suit. Natural light."
              className="h-full rounded-none border-0"
            />
          </div>

          <div className="flex flex-col justify-center p-8 lg:min-w-0 lg:flex-1 lg:p-14">
            <p className="font-mono text-eyebrow uppercase tracking-wider text-accent">
              {siteConfig.founder.role}
            </p>

            <h2 className="mt-6 font-display text-h2 uppercase leading-none text-foreground">
              {siteConfig.founder.name}
            </h2>

            <p data-rise className="mt-8 max-w-lg text-lead text-muted">
              Licensed electrician for twelve years. Ran the jobs, quoted the
              work, chased the invoices, and spent a fair amount of money on
              marketing that did very little.
            </p>

            <p data-rise className="mt-6 max-w-lg text-body text-muted">
              That last part is why this exists. The agencies were not lying.
              They were reporting clicks and leads accurately and none of it was
              connected to whether the month was any good, and nobody on either
              side of the call seemed to think that was strange.
            </p>

            <p data-rise className="mt-6 max-w-lg text-body text-muted">
              So the whole thing here is built backwards from the only question
              that mattered on a Friday afternoon: did the work that came in
              this month leave anything behind.
            </p>
          </div>
        </div>
      </Container>

      {/* ── Why it is trades ──────────────────────────────────────────────── */}
      <section className="mt-24 border-y border-line bg-surface py-(--spacing-section) lg:mt-36">
        <Container>
          <div className="lg:flex lg:items-start lg:gap-16 xl:gap-24">
            <div className="lg:w-[46%] lg:shrink-0">
              <SplitLines
                as="h2"
                className="max-w-[18ch] font-display text-h2 uppercase leading-[0.96] text-foreground"
              >
                <>
                  We know what a{" "}
                  <span className="text-accent">quote</span> costs to write.
                </>
              </SplitLines>
            </div>

            <div className="mt-10 max-w-text lg:mt-0 lg:min-w-0 lg:flex-1">
              <p data-rise className="text-lead text-muted">
                An hour of measuring, an evening of pricing, and a decent chance
                of hearing nothing back. Multiply that by the six quotes a
                lead-generation service sold to the same homeowner.
              </p>
              <p data-rise className="mt-6 text-body text-muted">
                An agency that has never done that treats an enquiry as a win,
                because on their side of it, it is. That single gap is behind
                most of what goes wrong between a trade business and whoever is
                running its marketing, and it is not fixable with better
                reporting.
              </p>
              <p data-rise className="mt-6 text-body text-muted">
                It is fixable by having done the job. That is the whole
                specialisation, and it is why the client list is trades and
                service businesses rather than whoever happened to call.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ── How we work ───────────────────────────────────────────────────── */}
      <section className="py-(--spacing-section)">
        <Container>
          <Reveal y={14} className="flex items-center gap-4">
            <MarkAnchor size="w-3.5" />
            <p className="eyebrow shrink-0 text-accent">How we work</p>
            <Rule className="flex-1" delay={0.15} />
          </Reveal>

          <SplitLines
            as="h2"
            className="mt-8 max-w-[18ch] font-display text-h2 uppercase leading-[0.96] text-foreground"
          >
            Four things, and none of them are negotiable.
          </SplitLines>

          <div className="mt-14 grid gap-4 lg:mt-20 lg:grid-cols-2">
            {HOW.map((h) => (
              <article
                key={h.n}
                data-rise
                className="group h-full rounded-card border border-line bg-surface p-8 transition-colors duration-slow ease-out-quart hover:border-accent lg:p-12"
              >
                <span className="block font-display text-h2 tabular-nums leading-none text-accent">
                  {h.n}
                </span>
                <span
                  aria-hidden
                  className="mt-7 block h-px w-full bg-line transition-colors duration-slow ease-out-quart group-hover:bg-accent/40"
                />
                <h3 className="mt-7 max-w-[22ch] font-display text-h4 uppercase leading-tight text-foreground">
                  {h.t}
                </h3>
                <p className="mt-4 max-w-md text-body text-muted">{h.c}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* ── The team ──────────────────────────────────────────────────────────
          Placeholders, and no invented names or job titles. A fabricated team
          is the single easiest thing on an agency site to disprove: one look at
          LinkedIn and the whole page becomes untrustworthy, including the parts
          that were true. */}
      <section className="border-y border-line bg-surface py-(--spacing-section)">
        <Container>
          <Reveal y={14} className="flex items-center gap-4">
            <MarkAnchor size="w-3.5" />
            <p className="eyebrow shrink-0 text-accent">The team</p>
            <Rule className="flex-1" delay={0.15} />
          </Reveal>

          <SplitLines
            as="h2"
            className="mt-8 max-w-[20ch] font-display text-h2 uppercase leading-[0.96] text-foreground"
          >
            Small, and in house.
          </SplitLines>

          <Reveal delay={0.1} className="mt-8">
            <p className="max-w-text text-lead text-muted">
              Design, build, search and ads are all done here. Nothing is passed
              to a contractor you never hear about, which is the reason nobody
              can tell you the landing page is somebody else's problem.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
            <Placeholder
              ratio="4/5"
              index="02"
              label="Team member. Same light and framing as the others."
            />
            <Placeholder
              ratio="4/5"
              index="03"
              label="Team member. Same light and framing as the others."
            />
            <Placeholder
              ratio="4/5"
              index="04"
              label="Team member, or the workspace if the team is one person."
            />
          </div>

          <Reveal delay={0.1} className="mt-10">
            <p className="max-w-text text-small text-faint">
              Photographs and names go here. No placeholder people, no stock
              portraits, nothing invented: a made-up team is the easiest claim
              on an agency site to check, and being caught on it makes the true
              parts of this page unreadable too.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ── Bad fit ──────────────────────────────────────────────────────── */}
      <section className="py-(--spacing-section)">
        <Container>
          <div className="rounded-card border border-line bg-surface p-8 lg:p-14">
            <p className="font-mono text-eyebrow uppercase tracking-wider text-faint">
              When to go elsewhere
            </p>

            <SplitLines
              as="h2"
              className="mt-7 max-w-[20ch] font-display text-h2 uppercase leading-[0.96] text-foreground"
            >
              This is a bad fit if any of these are true.
            </SplitLines>

            <ul className="mt-12 grid gap-7 lg:grid-cols-2">
              {BAD_FIT.map((b) => (
                <li key={b} data-rise className="flex gap-4">
                  <span aria-hidden className="shrink-0 text-line-strong">
                    &times;
                  </span>
                  <span className="max-w-md text-body text-muted">{b}</span>
                </li>
              ))}
            </ul>

            <p className="mt-12 max-w-text text-body text-foreground">
              None of that is a filter for the sake of it. Saying it here is
              cheaper for both of us than finding out in month three.
            </p>

            <div className="mt-10">
              <Button href="/services/" variant="outline" size="lg">
                What we actually do
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <CTA />
    </main>
  );
}
