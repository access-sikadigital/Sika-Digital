"use client";

import { useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP, EASE } from "@/lib/gsap";
import { processSteps, type Step } from "@/config/home";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import {
  AuditMock,
  PlanMock,
  BuildMock,
  ReportMock,
} from "@/components/graphics/ProcessMocks";
import { cn } from "@/lib/utils";

/**
 * The product panel for each step, in order. `wide` puts the panel on its own
 * row across the full width, with the trace running into it; the build has
 * three things to show (creative, search, landing pages) and needs the room.
 */
const STEP_ART: { node: ReactNode; wide?: boolean }[] = [
  { node: <AuditMock key="audit" /> },
  { node: <PlanMock key="plan" /> },
  { node: <BuildMock key="build" />, wide: true },
  { node: <ReportMock key="report" /> },
];

/**
 * PROCESS — "How it works", drawn as a circuit.
 *
 * ── The idea ────────────────────────────────────────────────────────────────
 * Sika was founded by a licensed electrician, and the intro above already
 * says "wire the follow-up". So the process is wired: a lime current runs down
 * a trace from "Your business" to a lamp at the bottom that reads "Your phone
 * rings". Each step is a breaker on the trace. When the current reaches it,
 * the breaker flips on, a branch runs out to that step's panel, and the step
 * powers up with a short fluorescent flicker.
 *
 * Deliberately not a rail of stacked cards. Copy and panel sit on opposite
 * sides of the trace and alternate, so the section zig-zags down the page and
 * the trace is the thing holding it together.
 *
 * ── The current is a position readout ───────────────────────────────────────
 * The fill is scrubbed to scroll, so it always shows exactly how far through
 * the process the reader is. `scaleY` from the top: a transform, composited.
 * The spark at its head is translated by the same scrub rather than scaled,
 * which would squash it.
 *
 * ── Power state ─────────────────────────────────────────────────────────────
 * Steps are ON by default. Script marks the steps below the fold OFF on mount
 * and flips each one ON as the current reaches it (and OFF again scrolling
 * back up). The dimming and the flicker are CSS, keyed on `data-power`; see
 * the CIRCUIT notes in globals.css. With reduced motion none of this runs and
 * every step is simply on.
 *
 * ── The reveal guard ────────────────────────────────────────────────────────
 * The project's standing rule. `fromTo` renders its start state immediately,
 * so nothing already on screen at mount is given a reveal.
 */
export function Process() {
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

      const circuit = el.querySelector<HTMLElement>("[data-circuit]");
      const fill = el.querySelector<HTMLElement>("[data-current]");
      const spark = el.querySelector<HTMLElement>("[data-spark]");
      const lamp = el.querySelector<HTMLElement>("[data-lamp]");

      /* ── The current ───────────────────────────────────────────────────── */
      if (circuit && fill) {
        const scroll = {
          trigger: circuit,
          start: "top 60%",
          end: "bottom 60%",
          scrub: 0.4,
        };
        gsap.fromTo(
          fill,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            transformOrigin: "top center",
            scrollTrigger: scroll,
          }
        );
        if (spark) {
          gsap.fromTo(
            spark,
            { y: 0 },
            {
              y: () => circuit.offsetHeight,
              ease: "none",
              scrollTrigger: { ...scroll, invalidateOnRefresh: true },
            }
          );
        }
      }

      /* ── Power ─────────────────────────────────────────────────────────── */
      const powerAt = (node: HTMLElement) => {
        const rect = node.getBoundingClientRect();
        if (rect.top + rect.height / 2 > window.innerHeight * 0.6) {
          node.dataset.power = "off";
        }
        ScrollTrigger.create({
          trigger: node,
          start: "center 60%",
          onEnter: () => (node.dataset.power = "on"),
          onLeaveBack: () => (node.dataset.power = "off"),
        });
      };

      const steps = gsap.utils.toArray<HTMLElement>("[data-step]", el);
      steps.forEach(powerAt);
      if (lamp) powerAt(lamp);

      /* ── Reveals ───────────────────────────────────────────────────────── */
      const onScreen = (node: Element) =>
        node.getBoundingClientRect().top < window.innerHeight * 0.95;

      steps.forEach((step) => {
        if (onScreen(step)) return;
        const trigger = { trigger: step, start: "top 78%", once: true };

        const blocks = step.querySelectorAll("[data-reveal]");
        if (blocks.length) {
          gsap.fromTo(
            blocks,
            { autoAlpha: 0, y: 48 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 1.1,
              stagger: 0.12,
              ease: EASE.expo,
              scrollTrigger: trigger,
            }
          );
        }

        const chips = step.querySelectorAll("[data-chip]");
        if (chips.length) {
          gsap.fromTo(
            chips,
            { autoAlpha: 0, y: 10 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.5,
              delay: 0.35,
              stagger: 0.05,
              ease: EASE.quart,
              scrollTrigger: trigger,
            }
          );
        }

        const pops = step.querySelectorAll("[data-pop]");
        if (pops.length) {
          gsap.fromTo(
            pops,
            { autoAlpha: 0, y: 16 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.6,
              delay: 0.45,
              stagger: 0.06,
              ease: EASE.quart,
              scrollTrigger: trigger,
            }
          );
        }

        const growY = step.querySelectorAll("[data-grow-y]");
        if (growY.length) {
          gsap.fromTo(
            growY,
            { scaleY: 0 },
            {
              scaleY: 1,
              duration: 1,
              delay: 0.6,
              stagger: 0.08,
              ease: EASE.expo,
              transformOrigin: "bottom center",
              scrollTrigger: trigger,
            }
          );
        }

        const growX = step.querySelectorAll("[data-grow-x]");
        if (growX.length) {
          gsap.fromTo(
            growX,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 0.9,
              delay: 0.6,
              stagger: 0.1,
              ease: EASE.expo,
              transformOrigin: "left center",
              scrollTrigger: trigger,
            }
          );
        }

        /* Count-ups. The target is in the attribute; see ProcessMocks. */
        step.querySelectorAll<HTMLElement>("[data-count]").forEach((node) => {
          const prefix = node.dataset.prefix ?? "";
          const suffix = node.dataset.suffix ?? "";
          const target = Number(node.dataset.count) || 0;
          const counter = { v: 0 };
          gsap.to(counter, {
            v: target,
            duration: 1.6,
            delay: 0.6,
            ease: "power2.out",
            scrollTrigger: trigger,
            onUpdate: () => {
              node.textContent = `${prefix}${Math.round(counter.v)}${suffix}`;
            },
          });
        });
      });
    },
    { scope: root }
  );

  const { primary } = siteConfig.offer;

  return (
    <section
      ref={root}
      className="grain relative overflow-hidden border-t border-line py-(--spacing-section)"
    >
      {/* Ambient light: blue pools either side of the trace. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(40% 25% at 12% 30%, color-mix(in oklab, var(--color-blue) 34%, transparent) 0%, transparent 70%), radial-gradient(40% 25% at 88% 62%, color-mix(in oklab, var(--color-blue) 30%, transparent) 0%, transparent 70%)",
        }}
      />

      <Container className="relative">
        {/* ── Heading ─────────────────────────────────────────────────────── */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow text-accent">How it works</p>
          <h2 className="mt-5 font-display text-h2 leading-[0.94] text-foreground">
            Wired for enquiries.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lead text-muted">
            Four steps, in order. The first one is free and you keep it whether
            or not you hire us.
          </p>
        </div>

        {/* ── Source terminal ─────────────────────────────────────────────── */}
        <div className="relative mt-14 flex lg:mt-20 lg:justify-center">
          <span className="relative z-10 inline-flex items-center gap-2 rounded-full border border-line-strong bg-ink px-4 py-2 font-mono text-[0.68rem] tracking-[0.14em] text-muted uppercase">
            <Plug className="size-3.5 text-accent" />
            Your business
          </span>
        </div>

        {/* ── The circuit ─────────────────────────────────────────────────── */}
        <ol data-circuit className="relative mx-auto max-w-6xl pl-14 lg:pl-0">
          {/* Trace: unlit copper, the lit current over it, the spark. */}
          <span
            aria-hidden
            className="absolute top-0 bottom-0 left-5 w-[2px] -translate-x-1/2 bg-line lg:left-1/2"
          >
            <span
              data-current
              className="absolute inset-0 origin-top overflow-hidden bg-gradient-to-b from-accent via-accent to-blue shadow-[0_0_14px_rgb(189_240_49/0.55)]"
            >
              <span className="sch current-flow absolute inset-x-0 -top-12 bottom-0 opacity-60" />
            </span>
            <span data-spark className="absolute inset-x-0 top-0 h-0">
              <span className="absolute top-0 left-1/2 block size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-paper shadow-[0_0_0_4px_rgb(189_240_49/0.35),0_0_28px_6px_rgb(189_240_49/0.8)]" />
            </span>
          </span>

          {processSteps.map((step, i) => (
            <CircuitStep key={step.n} step={step} index={i} art={STEP_ART[i]} />
          ))}
        </ol>

        {/* ── The lamp ────────────────────────────────────────────────────── */}
        <div
          data-lamp
          className="group/lamp relative flex flex-col items-start lg:items-center"
        >
          <div className="flex items-center gap-4 lg:flex-col lg:gap-5">
            <span
              aria-hidden
              className={cn(
                "relative flex size-10 items-center justify-center rounded-full border transition-[background-color,border-color,box-shadow,color] duration-(--duration-slow) lg:size-16",
                "border-accent bg-accent text-on-accent shadow-[0_0_0_8px_rgb(189_240_49/0.12),0_0_60px_10px_rgb(189_240_49/0.45)]",
                "group-data-[power=off]/lamp:border-line-strong group-data-[power=off]/lamp:bg-ink group-data-[power=off]/lamp:text-faint group-data-[power=off]/lamp:shadow-none"
              )}
            >
              <Bulb className="size-5 lg:size-7" />
            </span>
            <p
              data-power-target
              className="font-display text-h4 leading-[0.94] text-foreground"
            >
              Your phone rings.
            </p>
          </div>

          <div className="mt-10 flex flex-col items-start gap-3 lg:items-center">
            <Button href={primary.href} size="lg">
              Start with step one, free
            </Button>
            <p className="text-small text-faint">
              Yours to keep, whether or not you hire us.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   One step: breaker on the trace, copy on one side, panel on the other.
   ═══════════════════════════════════════════════════════════════════════════ */

function CircuitStep({
  step,
  index,
  art,
}: {
  step: Step;
  index: number;
  art?: { node: ReactNode; wide?: boolean };
}) {
  /* Even steps: copy left, panel right. Odd steps swap. */
  const copyLeft = index % 2 === 0;
  const wide = art?.wide;

  return (
    <li
      data-step
      className="group/step relative py-12 lg:grid lg:grid-cols-[1fr_7rem_1fr] lg:items-center lg:py-20"
    >
      {/* ── Breaker. On the trace: at the step's top on phones, centred on
          the row from lg. ─────────────────────────────────────────────── */}
      <div
        aria-hidden
        className="absolute top-12 -left-[3.125rem] z-10 lg:relative lg:top-auto lg:left-auto lg:col-start-2 lg:row-start-1 lg:flex lg:items-center lg:justify-center lg:self-stretch"
      >
        {/* Branch: from the trace out to the panel's side. Not on wide
            steps, where the trace runs straight into the panel instead. */}
        {!wide ? (
          <span
            className={cn(
              "absolute top-1/2 hidden h-[2px] w-1/2 -translate-y-1/2 bg-line lg:block",
              copyLeft ? "left-1/2" : "right-1/2"
            )}
          >
            <span
              className={cn(
                "absolute inset-0 bg-accent shadow-[0_0_10px_rgb(189_240_49/0.6)] transition-transform duration-(--duration-slow) ease-(--ease-out-quart)",
                copyLeft ? "origin-left" : "origin-right",
                "group-data-[power=off]/step:scale-x-0"
              )}
            />
            {/* Solder pad where the branch meets the panel. */}
            <span
              className={cn(
                "absolute top-1/2 size-2.5 -translate-y-1/2 rounded-full border-2 border-accent bg-ink transition-colors duration-(--duration-slow) group-data-[power=off]/step:border-line-strong",
                copyLeft ? "-right-1" : "-left-1"
              )}
            />
          </span>
        ) : null}
        <Breaker n={step.n} />
      </div>

      {/* ── Copy ─────────────────────────────────────────────────────────── */}
      <div
        className={cn(
          "lg:row-start-1",
          copyLeft
            ? "lg:col-start-1 lg:justify-self-end lg:pr-4"
            : "lg:col-start-3 lg:pl-4"
        )}
      >
        {/* Two wrappers: the reveal leaves an inline opacity behind, which
            would override the power dimming if both sat on one element. */}
        <div data-reveal className="max-w-xl">
          <div data-power-target>
            <div className="flex items-center gap-3">
              <span className="font-mono text-eyebrow tracking-[0.16em] text-accent uppercase">
                Step {step.n}
              </span>
              {index === 0 ? (
                <span className="rounded-full bg-accent px-2.5 py-0.5 font-mono text-[0.62rem] font-medium tracking-wider text-on-accent uppercase">
                  Free
                </span>
              ) : null}
            </div>
            <h3 className="mt-4 font-display text-h3 leading-[0.94] text-foreground">
              {step.title}
            </h3>
            <p className="mt-5 text-lead text-muted">{step.copy}</p>
            {!wide ? <Chips tags={step.tags} className="mt-7" /> : null}
          </div>
        </div>
      </div>

      {/* ── Panel ────────────────────────────────────────────────────────── */}
      {wide ? (
        <>
          {/* The chips take the free side of the copy row. */}
          <div
            className={cn(
              "lg:row-start-1 lg:self-center",
              copyLeft ? "lg:col-start-3 lg:pl-4" : "lg:col-start-1 lg:pr-4"
            )}
          >
            <div data-reveal>
              <div data-power-target>
                <Chips tags={step.tags} className="mt-7 lg:mt-0" />
              </div>
            </div>
          </div>
          {/* Full-width device. Solid, so it sits over the trace, which reads
              as the current running into it at the top and out at the foot. */}
          <div className="relative z-10 mt-10 lg:col-span-3 lg:row-start-2 lg:mt-12">
            <div data-reveal>
              <div
                data-power-target
                className="relative rounded-[1.25rem] border border-line-strong/70 bg-[#0e0f11] p-5 shadow-[0_40px_100px_-40px_rgb(0_0_0/0.95)] sm:p-7"
              >
                <Pad className="-top-1.5" />
                {art?.node}
                <Pad className="-bottom-1.5" />
              </div>
            </div>
          </div>
        </>
      ) : (
        <div
          className={cn(
            "mt-10 lg:row-start-1 lg:mt-0",
            copyLeft ? "lg:col-start-3" : "lg:col-start-1 lg:justify-self-end"
          )}
        >
          <div data-reveal className="lg:max-w-lg">
            <div data-power-target>{art?.node}</div>
          </div>
        </div>
      )}
    </li>
  );
}

function Chips({ tags, className }: { tags: string[]; className?: string }) {
  return (
    <ul className={cn("flex flex-wrap gap-2", className)}>
      {tags.map((t) => (
        <li
          key={t}
          data-chip
          className="flex items-center gap-1.5 rounded-full border border-line-strong bg-[rgb(255_255_255/0.03)] px-3 py-1.5 text-small text-foreground/90"
        >
          <svg viewBox="0 0 16 16" className="size-3 text-accent" aria-hidden>
            <path
              d="M2.5 8.5L6 12l7.5-8"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="square"
            />
          </svg>
          {t}
        </li>
      ))}
    </ul>
  );
}

/**
 * A breaker switch. ON is the default look; `data-power="off"` on the step
 * drops the toggle and greys it. The toggle moves on `transform`.
 */
function Breaker({ n }: { n: string }) {
  return (
    <span className="relative flex flex-col items-center gap-1.5 bg-ink py-1.5">
      <span
        className={cn(
          "relative flex h-11 w-7 justify-center rounded-[6px] border bg-[#141517] p-[3px] transition-[border-color,box-shadow] duration-(--duration-slow) lg:h-14 lg:w-9",
          "border-accent shadow-[0_0_24px_rgb(189_240_49/0.35)]",
          "group-data-[power=off]/step:border-line-strong group-data-[power=off]/step:shadow-none"
        )}
      >
        <span
          className={cn(
            "block h-1/2 w-full rounded-[3px] transition-[transform,background-color] duration-(--duration-slow) ease-(--ease-out-expo)",
            "bg-accent",
            "group-data-[power=off]/step:translate-y-full group-data-[power=off]/step:bg-slate-600"
          )}
        />
      </span>
      <span className="font-mono text-[0.6rem] leading-none text-faint tabular-nums">
        {n}
      </span>
    </span>
  );
}

/** A solder pad on the trace, where it meets the wide device. */
function Pad({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "absolute hidden size-3 rounded-full border-2 border-accent bg-ink lg:left-1/2 lg:block lg:-translate-x-1/2",
        "group-data-[power=off]/step:border-line-strong",
        className
      )}
    />
  );
}

function Plug({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="none" aria-hidden>
      <path
        d="M5.5 1.5v4M10.5 1.5v4M3.5 5.5h9v2.5a4.5 4.5 0 0 1-9 0V5.5zM8 12.5v2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function Bulb({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
      <path
        d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2V16h5v-.1c0-.8.4-1.5 1-2A6 6 0 0 0 12 3z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}
