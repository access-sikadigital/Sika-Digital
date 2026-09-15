"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, EASE } from "@/lib/gsap";
import { processSteps } from "@/config/home";
import { Container } from "@/components/ui/Container";
import { MarkAnchor } from "@/components/motion/MarkFlight";
import {
  AuditRows,
  PlanSteps,
  SiteFrame,
  ReportChart,
} from "@/components/graphics/Schematic";
import { cn } from "@/lib/utils";

/**
 * The deliverable at each step, in order. Defined at module scope so the
 * elements are created once rather than on every render of every step.
 */
const STEP_ART = [
  <AuditRows key="audit" />,
  <PlanSteps key="plan" />,
  <SiteFrame key="build" />,
  <ReportChart key="report" />,
];

/**
 * PROCESS — a sticky counter and a run of full-height steps.
 *
 * ── What this replaced, and why ─────────────────────────────────────────────
 * Four cards in a sticky stack. The problem was not the stacking, it was the
 * card. A bordered box with a tiny number in the left third and a narrow
 * paragraph in the right two thirds is the default shape every generated
 * layout lands on, and it wasted half its own width on empty panel. Four of
 * them in a column reads as four of the same thing, which is the opposite of
 * what a process is: an order.
 *
 * Here the section is split. The left rail sticks for the whole section and
 * holds the heading, a counter, and a segmented progress bar. The right column
 * is the steps themselves at full height, one screen each. Scrolling advances
 * a counter rather than sliding a card, so the section behaves like a machine
 * stepping through states instead of a list you are falling down.
 *
 * ── The counter ────────────────────────────────────────────────────────────
 * An odometer: all four numerals stacked in a column inside a one-line clip,
 * with the column translated up by exactly one numeral per step. The travel is
 * `-(100 / n) * i` percent of the column, which is one numeral's height by
 * definition, so it stays correct at any font size and never needs measuring.
 *
 * ── Sticky, not pinned ─────────────────────────────────────────────────────
 * Same reason as before. ScrollTrigger's `pin` takes the rail out of flow,
 * inserts a spacer and drives it from JavaScript, recalculating on every
 * resize, and on iOS it can visibly detach during momentum scrolling.
 * `position: sticky` does it natively on the compositor for nothing. GSAP is
 * left doing only transforms, which is what it is good at.
 *
 * ── The reveal guard ───────────────────────────────────────────────────────
 * Every reveal here checks whether its element is already on screen at mount
 * and skips itself if so. This is the project's standing rule and it exists
 * because `fromTo` renders its start state immediately: create one for
 * something already in view and the content is hidden with no scroll left to
 * bring it back. Skipping leaves the element in its resting state, which is
 * the correct state, so the section is readable even if the motion never runs.
 */
export function Process() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      /* The step drawings loop only while the section is on screen. See the
         note on `.sch` in globals.css. */
      ScrollTrigger.create({
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        toggleClass: "is-alive",
      });

      const steps = gsap.utils.toArray<HTMLElement>("[data-step]", el);
      if (!steps.length) return;

      /** True when the element is already in view, so a reveal would hide it. */
      const onScreen = (node: Element) =>
        node.getBoundingClientRect().top < window.innerHeight * 0.95;

      /* ── Per-step reveal. Runs at every breakpoint. ──────────────────── */
      steps.forEach((step) => {
        const masked = gsap.utils.toArray<HTMLElement>("[data-rise]", step);
        if (!masked.length || onScreen(step)) return;

        gsap.fromTo(
          masked,
          { yPercent: 115 },
          {
            yPercent: 0,
            duration: 1.1,
            ease: EASE.expo,
            stagger: 0.08,
            scrollTrigger: { trigger: step, start: "top 78%", once: true },
          }
        );

        /* The drawing assembles part by part, after the copy has landed. It
           trails the text on purpose: the sentence says what the step hands
           over and the picture is the evidence for it, so arriving first would
           put the answer before the question. */
        const art = step.querySelector<HTMLElement>("[data-art]");
        const parts = art?.querySelectorAll<SVGElement>("[data-g]");

        if (art && parts?.length) {
          gsap.fromTo(
            art,
            { autoAlpha: 0, y: 28 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.9,
              delay: 0.2,
              ease: EASE.expo,
              scrollTrigger: { trigger: step, start: "top 78%", once: true },
            }
          );

          gsap.fromTo(
            parts,
            { autoAlpha: 0, xPercent: -4 },
            {
              autoAlpha: 1,
              xPercent: 0,
              duration: 0.45,
              delay: 0.35,
              ease: EASE.quart,
              stagger: 0.05,
              scrollTrigger: { trigger: step, start: "top 78%", once: true },
            }
          );
        }
      });

      /* ── Desktop only: the counter, the segments, the active marker. ──────
         None of it means anything on a phone, where the rail scrolls away and
         there is no such thing as the step you are currently on.

         ── No dimming ───────────────────────────────────────────────────────
         The first build faded inactive steps to 22%. It looked decisive in
         isolation and was unreadable in practice: the steps are 76vh tall, so
         a neighbour is always partly on screen, and most of what you could see
         at any moment was a ghost. Nothing here is allowed to make the copy
         harder to read. The active step is marked with a lime rule instead,
         which costs no legibility at all. */
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const column = el.querySelector<HTMLElement>("[data-odometer]");
        const travel = 100 / processSteps.length;

        /* One reusable tween, retargeted. `quickTo` skips creating a new tween
           object on every step change, which matters because these fire during
           scroll. */
        const setStep = column
          ? gsap.quickTo(column, "yPercent", {
              duration: 0.65,
              ease: EASE.quart,
            })
          : null;

        steps.forEach((step, i) => {
          /* Activation. Drives the counter and the active marker together, so
             the numeral can never disagree with the step that is marked. */
          const activate = () => {
            setStep?.(-travel * i);
            steps.forEach((s, j) => {
              s.dataset.active = String(j === i);
            });
          };

          /* A bare ScrollTrigger, not a timeline with one attached. There is no
             tween here, only two callbacks, and an empty timeline would be a
             playhead running for nothing.

             ── Why both edges sit on the same line ──────────────────────────
             A step is active while the 45% line is inside it. Because that is
             one line and the steps are stacked flush, exactly one step can
             contain it at any scroll position, so the handoff is a single
             clean swap.

             The earlier values were `top 80%` to `bottom 40%`, and they were
             wrong: a step is 76vh tall, so the next step's top reached the 80%
             mark while the current step still filled the screen. Both had
             fired, the later one won, and the counter sat one ahead of what
             you were reading. */
          ScrollTrigger.create({
            trigger: step,
            start: "top 45%",
            end: "bottom 45%",
            onEnter: activate,
            onEnterBack: activate,
          });

          /* The segment for this step fills across it. Scrubbed, so the bar is
             a position readout rather than a thing that animates at you. */
          const seg = el.querySelector<HTMLElement>(`[data-seg="${i}"]`);
          if (seg) {
            gsap.fromTo(
              seg,
              { scaleX: 0 },
              {
                scaleX: 1,
                ease: "none",
                transformOrigin: "left center",
                scrollTrigger: {
                  trigger: step,
                  /* The same two edges the activation uses, so the segment is
                     filling for exactly as long as its step is the active one.
                     Different edges and the bar would still be filling after
                     the counter had already moved on. */
                  start: "top 45%",
                  end: "bottom 45%",
                  scrub: 0.4,
                },
              }
            );
          }
        });

        /* The first step is marked on arrival, before any trigger has fired. */
        steps.forEach((s, j) => {
          s.dataset.active = String(j === 0);
        });

        return () => {
          steps.forEach((s) => delete s.dataset.active);
        };
      });

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="grain relative border-t border-line py-(--spacing-section)"
    >
      <Container>
        <div className="lg:flex lg:items-start lg:gap-16">
          {/* ── Left rail. Sticks for the length of the section. ─────────── */}
          {/* `min-h-screen`, not `h-screen`. A fixed-height flex column shrinks
              its children to fit when their combined height exceeds it, and it
              does so silently: the tallest child loses the most. That is what
              was slicing the counter down to a sliver of a numeral. `min-h`
              lets the rail grow instead, and `shrink-0` below means nothing in
              it can ever be compressed to make room. */}
          <div className="lg:sticky lg:top-0 lg:flex lg:min-h-screen lg:w-[44%] lg:shrink-0 lg:flex-col lg:justify-center lg:py-16">
            <div className="flex shrink-0 items-center gap-3">
              <MarkAnchor size="w-3.5" />
              <p className="eyebrow text-accent">How it works</p>
            </div>

            {/* `18ch` sets this to three lines rather than four. The rail has
                to fit a short laptop viewport in full, and a wrapped line of
                display type is the most expensive thing in it. */}
            <h2 className="mt-6 max-w-[18ch] shrink-0 font-display text-h2 uppercase leading-[0.94] text-foreground">
              Four steps, and you can stop after the first.
            </h2>

            {/* ── The odometer ──────────────────────────────────────────────
                A one-numeral-tall window over a column of four.

                The box is 1.3em, not 1em. A heavy display face draws taller
                than its em square, so a 1em line box clips the glyph top and
                bottom. 1.3em with the numeral centred in it gives clearance on
                both sides at any size. The window and each numeral use the same
                figure, which is what keeps the travel exact: the column is
                n × 1.3em, so one numeral is 100/n percent of it, no matter what
                that figure is. */}
            <div
              aria-hidden
              className="mt-8 hidden h-[1.3em] shrink-0 overflow-hidden font-display text-[clamp(3rem,5vw,5.5rem)] leading-none lg:block"
            >
              <div data-odometer className="will-change-transform">
                {processSteps.map((step) => (
                  <span
                    key={step.n}
                    className="flex h-[1.3em] items-center tabular-nums leading-none text-accent"
                  >
                    {step.n}
                  </span>
                ))}
              </div>
            </div>

            {/* ── Segmented progress ────────────────────────────────────────
                Four segments rather than one bar. A single bar tells you how
                far through the section you are, which nobody needs. Segments
                tell you which step you are in and how far through it, which is
                the same information the counter gives, read a second way. */}
            <div
              aria-hidden
              className="mt-8 hidden shrink-0 grid-cols-4 gap-2 lg:grid"
            >
              {processSteps.map((step, i) => (
                <span
                  key={step.n}
                  className="relative block h-px w-full overflow-hidden bg-line"
                >
                  <span
                    data-seg={i}
                    className="absolute inset-0 block origin-left scale-x-0 bg-accent"
                  />
                </span>
              ))}
            </div>

            <p className="mt-8 max-w-sm shrink-0 text-lead text-muted">
              The first one is free and you keep it whether or not you hire us.
            </p>
          </div>

          {/* ── Right column. One step per screen. ───────────────────────── */}
          <ol className="mt-16 lg:mt-0 lg:w-[56%]">
            {processSteps.map((step, i) => (
              <li
                key={step.n}
                data-step
                className={cn(
                  "group/step flex flex-col justify-center border-t border-line py-14 lg:min-h-[76vh]",
                  /* The active marker. A lime rule down the left edge of the
                     step you are on, appearing only where there is room for
                     it. `border-l-2` is always present so the step never
                     shifts sideways when it becomes active; only the colour
                     changes. */
                  "lg:border-t-0 lg:border-l-2 lg:pl-10 lg:transition-colors lg:duration-slow lg:ease-out-quart",
                  /* A plain `data-*` variant, not `group-data-*`. The attribute
                     is set on this element, and `group-*` only ever looks at
                     ancestors, so the group form would never match. */
                  "lg:data-[active=true]:border-l-accent",
                  /* `cn` merges through tailwind-merge, so the override wins by
                     precedence rather than by whichever rule Tailwind happened
                     to emit last. Plain string concatenation cannot do this. */
                  i === 0 && "border-t-0 pt-0"
                )}
              >
                {/* Each masked line is a clip with the content inside it, so
                    the rise reads as type coming up out of a rule rather than
                    a box sliding in. */}
                <div className="overflow-hidden">
                  <div
                    data-rise
                    className="flex items-center gap-4 border-b border-line pb-4"
                  >
                    <span className="font-mono text-eyebrow tabular-nums text-accent">
                      {step.n}
                    </span>
                    {i === 0 && (
                      <span className="rounded-full border border-accent px-3 py-1 font-mono text-eyebrow uppercase tracking-wider text-accent">
                        Free
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-8 overflow-hidden">
                  <h3
                    data-rise
                    /* One step below the rail heading. At the same size they
                       compete, and the rail is the one that owns the section. */
                    className="font-display text-h3 uppercase leading-[0.98] text-foreground"
                  >
                    {step.title}
                  </h3>
                </div>

                <div className="mt-6 overflow-hidden">
                  <p data-rise className="max-w-xl text-lead text-muted">
                    {step.copy}
                  </p>
                </div>

                {/* ── What you get at this step ─────────────────────────────
                    One drawing per step, of the thing that step hands over:
                    the audit, the plan, the build, the report. Four steps of
                    heading and paragraph was the most text-dense stretch on
                    the page, and a drawing of the deliverable does more than a
                    fifth sentence describing it would.

                    Indexed by position rather than configured per step,
                    because the drawings are a fixed set of four that exist
                    only for this section. If the process ever becomes three
                    steps or five, this wants to move into config alongside the
                    copy rather than silently running out of pictures. */}
                {STEP_ART[i] && (
                  <div data-art className="mt-10 w-full max-w-md">
                    {STEP_ART[i]}
                  </div>
                )}
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
