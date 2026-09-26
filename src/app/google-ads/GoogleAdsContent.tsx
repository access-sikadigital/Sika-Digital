"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, EASE } from "@/lib/gsap";
import { getPage, serviceGroups } from "@/config/pages";
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
 * GOOGLE ADS.
 *
 * ── The argument ────────────────────────────────────────────────────────────
 * Every other page on this site is about getting more. This one is about
 * spending less to get the same, because that is the honest state of most
 * accounts we are shown: the budget is not too small, it is going to searches
 * nobody would have taken the job from.
 *
 * That reframe is the page. It is also the only service here where a prospect
 * can verify the claim themselves in ten minutes, which is why the page tells
 * them how.
 *
 * ── Built to not resemble the other service pages ───────────────────────────
 *   Web design   horizontal stage track, five-row technical list
 *   SEO          paired two-column comparison, drawn timeline
 *   Google Ads   a spend bar that redistributes on scroll, a search-terms list
 *
 * ── The bar is illustrative and says so ─────────────────────────────────────
 * The split it animates between is a shape, not a measurement. There is no
 * client account behind it and the labels carry no percentages, because a
 * number on that bar would be a fabricated result on a page about honest
 * reporting. It is a diagram of an idea.
 */

/**
 * The searches an unmanaged account pays for.
 *
 * Written as things a person would actually type. Generic examples ("cheap
 * service", "free quote") read as filler; these read as a search-terms report,
 * which is what they are imitating.
 */
const WASTED = [
  { q: "electrician jobs melbourne", why: "Looking for work, not for a sparky" },
  { q: "how to wire a downlight", why: "Doing it themselves this weekend" },
  { q: "electrician apprenticeship", why: "Fifteen years old" },
  { q: "cheapest electrician near me", why: "Will leave over twenty dollars" },
  { q: "[competitor] reviews", why: "Already chose someone else" },
  { q: "electrical wholesale supplies", why: "Buying parts, not booking work" },
];

const CHANGES = [
  {
    n: "01",
    t: "Read the search terms report",
    c: "The actual phrases people typed, not the keywords in the account. These are different things and the gap between them is where the money goes. Most accounts we open have never had this exported.",
  },
  {
    n: "02",
    t: "Cut what was never going to convert",
    c: "Job seekers, students, DIYers, people shopping your competitor by name. Every one of them costs the same per click as a customer.",
  },
  {
    n: "03",
    t: "Send each ad to a page about that thing",
    c: "An ad for emergency callouts should not land on the homepage. Matching the page to the search lifts conversion and lowers what Google charges you for the click, which is the same fix paying twice.",
  },
  {
    n: "04",
    t: "Tell Google what a good lead looks like",
    c: "Most accounts optimise toward form fills, so the algorithm cheerfully finds more people who fill in forms and never answer the phone. Feeding real outcomes back changes what it goes looking for.",
  },
];

/** What anyone can check in their own account before they call us. */
const SELF_CHECK = [
  "Tools, then Search terms. Sort by cost, highest first.",
  "Read the top thirty. Circle the ones you would not have quoted on.",
  "Add up what they cost.",
  "That number is the monthly saving before anyone optimises anything.",
];

export function GoogleAdsContent() {
  const page = getPage("google-ads");
  const group = serviceGroups.find((g) => g.href === page.url);

  const barRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLElement>(null);

  /* ── The spend bar redistributes as you scroll through the section ─────────
     Two segments, scrubbed in opposite directions: waste shrinks, work grows.
     Scrubbed rather than played, because the point is to be able to stop half
     way and see the middle of it. A version that runs on entry would be a
     transition; this is a control you are operating.

     Widths are animated rather than transforms, and that is the one place on
     this site where layout cost is accepted on purpose: `scaleX` on a labelled
     bar stretches the label with it. Two elements, one property, is affordable. */
  useGSAP(
    () => {
      const el = barRef.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const waste = el.querySelector<HTMLElement>("[data-seg='waste']");
      const work = el.querySelector<HTMLElement>("[data-seg='work']");
      if (!waste || !work) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 70%",
          end: "bottom 65%",
          scrub: 0.6,
        },
      });

      tl.fromTo(
        waste,
        { width: "62%" },
        { width: "18%", ease: "none" },
        0
      ).fromTo(work, { width: "38%" }, { width: "82%", ease: "none" }, 0);
    },
    { scope: barRef }
  );

  /* ── The wasted searches get struck through, one at a time ────────────────
     A rule drawn across each line rather than an opacity fade. Striking a
     line out is a gesture with a meaning, and the meaning is the section. */
  useGSAP(
    () => {
      const el = listRef.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      ScrollTrigger.create({
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        toggleClass: "is-alive",
      });

      if (el.getBoundingClientRect().top < window.innerHeight * 0.95) return;

      gsap.fromTo(
        el.querySelectorAll("[data-strike]"),
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.5,
          ease: EASE.quart,
          stagger: 0.14,
          transformOrigin: "left center",
          scrollTrigger: { trigger: el, start: "top 68%", once: true },
        }
      );

      gsap.fromTo(
        el.querySelectorAll("[data-term]"),
        { autoAlpha: 0, x: 16 },
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.6,
          ease: EASE.expo,
          stagger: 0.14,
          scrollTrigger: { trigger: el, start: "top 72%", once: true },
        }
      );
    },
    { scope: listRef }
  );

  return (
    <main className="pt-32 lg:pt-40">
      <PageOpening
        eyebrow="Google Ads"
        title={page.h1}
        titleMax="max-w-[16ch]"
        intro="Most accounts do not need a bigger budget. They need to stop paying for the searches nobody would have taken the job from."
      />

      {/* ── The bar ─────────────────────────────────────────────────────── */}
      <section
        ref={barRef}
        className="mt-24 border-y border-line bg-surface py-(--spacing-section) lg:mt-36"
      >
        <Container>
          <Reveal y={14} className="flex items-center gap-4">
            <MarkAnchor size="w-3.5" />
            <p className="eyebrow shrink-0 text-accent">Where the money goes</p>
            <Rule className="flex-1" delay={0.15} />
          </Reveal>

          <SplitLines
            as="h2"
            className="mt-8 max-w-[19ch] font-display text-h2 leading-[1.1] text-foreground"
          >
            <>
              The same budget, pointed at{" "}
              <span className="text-accent">fewer</span> people.
            </>
          </SplitLines>

          {/* ── The bar, and the key beneath it ──────────────────────────────
              The labels used to sit inside the segments. That was the same
              mistake as the horizontal card track on the web design page, in
              miniature: the waste segment shrinks from 62% to 18% as you
              scroll, so its label was being squeezed and truncated away while
              someone was reading it.

              The bar animates. The words do not. A key underneath costs one
              extra row and means nothing on this diagram is moving at the
              moment it is being read. */}
          <div className="mt-14 lg:mt-20">
            <div
              aria-hidden
              className="flex h-14 w-full overflow-hidden rounded-card border border-line lg:h-20"
            >
              <div
                data-seg="waste"
                className="h-full bg-line-strong/50"
                style={{ width: "62%" }}
              />
              <div
                data-seg="work"
                className="h-full bg-accent"
                style={{ width: "38%" }}
              />
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:gap-10">
              <p className="flex items-center gap-3 font-mono text-eyebrow uppercase tracking-wider text-faint">
                <span
                  aria-hidden
                  className="block size-3 shrink-0 rounded-xs bg-line-strong/50"
                />
                Searches you would not quote on
              </p>
              <p className="flex items-center gap-3 font-mono text-eyebrow uppercase tracking-wider text-foreground">
                <span
                  aria-hidden
                  className="block size-3 shrink-0 rounded-xs bg-accent"
                />
                Searches that become work
              </p>
            </div>

            <p className="mt-8 max-w-text text-small text-faint">
              A diagram, not a measurement. The proportions are illustrative and
              carry no figures on purpose, because an invented number on a page
              about honest reporting would be the wrong kind of clever.
            </p>
          </div>
        </Container>
      </section>

      {/* ── The searches ────────────────────────────────────────────────── */}
      <section ref={listRef} className="py-(--spacing-section)">
        <Container>
          <Reveal y={14} className="flex items-center gap-4">
            <MarkAnchor size="w-3.5" />
            <p className="eyebrow shrink-0 text-accent">What you are paying for</p>
            <Rule className="flex-1" delay={0.15} />
          </Reveal>

          <SplitLines
            as="h2"
            className="mt-8 max-w-[20ch] font-display text-h2 leading-[1.1] text-foreground"
          >
            Six searches an unmanaged account will happily buy.
          </SplitLines>

          <ul className="mt-14 lg:mt-20">
            {WASTED.map((w) => (
              <li
                key={w.q}
                data-term
                className="border-t border-line py-6 last:border-b lg:flex lg:items-baseline lg:gap-12"
              >
                <span className="relative inline-block font-mono text-body text-muted lg:w-[46%] lg:shrink-0">
                  {w.q}
                  <span
                    data-strike
                    aria-hidden
                    className="absolute left-0 top-1/2 block h-px w-full origin-left bg-accent"
                  />
                </span>
                <span className="mt-2 block text-small text-faint lg:mt-0">
                  {w.why}
                </span>
              </li>
            ))}
          </ul>

          <Reveal delay={0.1} className="mt-10">
            <p className="max-w-text text-body text-muted">
              Not one of those is a bad keyword. They are all the same three or
              four keywords, matched loosely, which is the default. Nobody chose
              them. That is the point.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ── What we change ──────────────────────────────────────────────── */}
      <section className="border-y border-line bg-surface py-(--spacing-section)">
        <Container>
          <Reveal y={14} className="flex items-center gap-4">
            <MarkAnchor size="w-3.5" />
            <p className="eyebrow shrink-0 text-accent">What we change</p>
            <Rule className="flex-1" delay={0.15} />
          </Reveal>

          <SplitLines
            as="h2"
            className="mt-8 max-w-[18ch] font-display text-h2 leading-[1.1] text-foreground"
          >
            Four moves, in this order.
          </SplitLines>

          {/* Same card shape as the stage grid on the web design page, and
              deliberately so. Two service pages using one card for the same job
              is consistency; it is the SECTIONS that need to differ between
              pages, not every component inside them.

              The comment lives out here rather than inside the `map`. A JSX
              comment is an expression, so putting one immediately before the
              element a map returns makes two siblings with no parent, and the
              parse error it produces points at the closing tags rather than at
              the comment. Third time on this project.

              Also: a JSX comment cannot contain the characters that end a block
              comment. Writing the token out inside one closes it early and
              strands the brace, which is what the last error was. */}
          <div className="mt-14 grid gap-4 lg:mt-20 lg:grid-cols-2">
            {CHANGES.map((c) => (
              <Reveal key={c.n} y={20}>
                <article className="group h-full rounded-card border border-line bg-background p-8 transition-colors duration-slow ease-out-quart hover:border-accent lg:p-12">
                  <span className="block font-display text-h2 tabular-nums leading-none text-accent">
                    {c.n}
                  </span>

                  <span
                    aria-hidden
                    className="mt-7 block h-px w-full bg-line transition-colors duration-slow ease-out-quart group-hover:bg-accent/40"
                  />

                  <h3 className="mt-7 max-w-[22ch] font-display text-h4 leading-tight text-foreground">
                    {c.t}
                  </h3>
                  <p className="mt-4 text-body text-muted">{c.c}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Check it yourself ───────────────────────────────────────────────
          The most useful thing on the page, and it costs us the enquiry if the
          answer comes back fine. That is the trade: a prospect who runs this
          and finds nothing was never going to be a good client, and one who
          runs it and finds plenty arrives already convinced. */}
      <section className="py-(--spacing-section)">
        <Container>
          <div className="rounded-card border border-accent bg-surface p-8 lg:p-14">
            <p className="font-mono text-eyebrow uppercase tracking-wider text-accent">
              Before you call anyone
            </p>

            <SplitLines
              as="h2"
              className="mt-7 max-w-[20ch] font-display text-h2 leading-[1.1] text-foreground"
            >
              Four clicks, and you can check this without us.
            </SplitLines>

            <ol className="mt-12 grid gap-8 lg:grid-cols-4">
              {SELF_CHECK.map((step, i) => (
                <li key={step}>
                  <span className="font-mono text-eyebrow tabular-nums text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-4 border-t border-line pt-4 text-body text-muted">
                    {step}
                  </p>
                </li>
              ))}
            </ol>

            <p className="mt-12 max-w-text text-body text-foreground">
              If that number is small, your account is in good shape and you do
              not need us. If it is not, you now know what the first month is
              worth before anyone has quoted you.
            </p>
          </div>
        </Container>
      </section>

      {/* ── Evidence ────────────────────────────────────────────────────── */}
      <section className="border-y border-line bg-surface py-(--spacing-section)">
        <Container>
          <Reveal y={14} className="flex items-center gap-4">
            <MarkAnchor size="w-3.5" />
            <p className="eyebrow shrink-0 text-accent">Evidence</p>
            <Rule className="flex-1" delay={0.15} />
          </Reveal>

          <div className="mt-14 grid gap-4 lg:mt-20 lg:grid-cols-3">
            <Placeholder
              ratio="4/3"
              index="01"
              label="A search terms report with the junk highlighted. Real account, figures legible."
            />
            <Placeholder
              ratio="4/3"
              index="02"
              label="Cost per qualified lead before and after, same account, same chart."
            />
            <Placeholder
              ratio="4/3"
              index="03"
              label="A negative keyword list you actually built. Screenshot of the real one."
            />
          </div>

          <Reveal delay={0.1} className="mt-10">
            <p className="max-w-text text-small text-faint">
              Screenshots from real accounts go here. Placeholders until then,
              because a page about what other people fabricate is the last place
              to fabricate something.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ── Where to go next ────────────────────────────────────────────── */}
      {group && group.children.length > 1 ? (
        <section className="py-(--spacing-section)">
          <Container>
            <SplitLines
              as="h2"
              className="max-w-[18ch] font-display text-h2 leading-[1.1] text-foreground"
            >
              More specific than that?
            </SplitLines>

            <ul className="mt-12 grid gap-3 sm:grid-cols-2">
              {group.children.map((child) => (
                <li key={child.href}>
                  <Link
                    href={child.href}
                    className="group flex items-center justify-between gap-6 rounded-card border border-line bg-surface p-7 transition-colors duration-slow ease-out-quart hover:border-accent"
                  >
                    <span className="font-display text-h4 leading-tight text-foreground transition-colors duration-base group-hover:text-accent">
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

            <div className="mt-12">
              <Button href="/services/" variant="outline" size="lg">
                All services
              </Button>
            </div>
          </Container>
        </section>
      ) : null}

      <CTA />
    </main>
  );
}
