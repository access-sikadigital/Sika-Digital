"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { serviceGroups } from "@/config/pages";
import { siteConfig } from "@/config/site";
import { Logomark } from "@/components/brand/Logo";
import { gsap, useGSAP, EASE } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/**
 * SERVICES MEGA-MENU — desktop.
 *
 * ── Why this was redesigned ─────────────────────────────────────────────────
 * The first version used `bg-background/95` with a backdrop blur, which is the
 * fashionable choice and was the wrong one. `backdrop-filter` blurs what is
 * behind an element, but a blurred shape is still a shape: the homepage's
 * display-size H1 sat directly underneath and read straight through the panel,
 * so the menu was illegible exactly where the page was busiest. Glass panels
 * only work over texture — photographs, gradients, small text. Over huge solid
 * type they fail completely.
 *
 * The fix is two separate layers doing two separate jobs:
 *
 *   1. A SCRIM across the whole viewport, killing the page underneath. This is
 *      what makes the menu readable regardless of what it opens over.
 *   2. An OPAQUE PANEL on `bg-surface` — one step lighter than the page, so it
 *      reads as a sheet resting on top rather than a hole cut in the page.
 *
 * Nothing here is translucent. That is the point.
 *
 * ── Stacking ────────────────────────────────────────────────────────────────
 * Everything lives inside <header>, which is `fixed z-50`, so these z-indexes
 * are local to it: scrim 0, panel 10, and the header bar itself 20 — the bar
 * must stay above the scrim so the logo and close affordance remain visible.
 */
export function ServicesMega({
  open,
  onOpen,
  onClose,
  triggerId,
}: {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  triggerId: string;
}) {
  const [active, setActive] = useState(0);
  const panel = useRef<HTMLDivElement>(null);
  const scrim = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const group = serviceGroups[active] ?? serviceGroups[0];

  useGSAP(
    () => {
      const el = panel.current;
      const sc = scrim.current;
      if (!el || !sc) return;

      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const timeline = gsap.timeline({ paused: true });

      if (reduced) {
        timeline
          .set(sc, { autoAlpha: 1 })
          .set(el, { autoAlpha: 1, clipPath: "inset(0% 0% 0% 0%)" }, 0);
      } else {
        timeline
          .fromTo(
            sc,
            { autoAlpha: 0 },
            { autoAlpha: 1, duration: 0.4, ease: "power2.out" },
            0
          )
          /* Clip-path wipe, not a height animation — height forces layout on
             every frame, clip-path is composited. */
          .fromTo(
            el,
            { autoAlpha: 0, clipPath: "inset(0% 0% 100% 0%)" },
            {
              autoAlpha: 1,
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 0.55,
              ease: EASE.expo,
            },
            0
          )
          .fromTo(
            el.querySelectorAll("[data-rail-item]"),
            { autoAlpha: 0, x: -18 },
            { autoAlpha: 1, x: 0, duration: 0.5, stagger: 0.045, ease: EASE.expo },
            0.14
          )
          .fromTo(
            el.querySelectorAll("[data-feature]"),
            { autoAlpha: 0, y: 16 },
            { autoAlpha: 1, y: 0, duration: 0.55, ease: EASE.expo },
            0.22
          );
      }

      tl.current = timeline;
      return () => {
        tl.current = null;
      };
    },
    { scope: panel }
  );

  useEffect(() => {
    const timeline = tl.current;
    if (!timeline) return;
    /* Open at 1×, close at 2.4×. An entrance can be admired; a dismissal
       should get out of the way. */
    if (open) timeline.timeScale(1).play();
    else timeline.timeScale(2.4).reverse();
  }, [open]);

  /* Swapping the right pane without a transition reads as a glitch rather than
     a change. A short stagger is enough to make it deliberate. */
  useGSAP(
    () => {
      if (!open) return;
      const pane = panel.current?.querySelector("[data-pane]");
      if (!pane) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.fromTo(
        pane.querySelectorAll("[data-pane-item]"),
        { autoAlpha: 0, y: 12 },
        { autoAlpha: 1, y: 0, duration: 0.42, stagger: 0.03, ease: EASE.quart }
      );
    },
    { scope: panel, dependencies: [active, open] }
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <>
      {/* ── 1. Scrim ──────────────────────────────────────────────────────
          Covers the viewport and kills the page behind the menu. Clicking it
          closes — the standard escape hatch people reach for before they think
          of Escape. */}
      <div
        ref={scrim}
        aria-hidden
        onClick={onClose}
        className={cn(
          "invisible fixed inset-0 z-0 bg-ink/85 opacity-0",
          open ? "pointer-events-auto" : "pointer-events-none"
        )}
      />

      {/* ── 2. Panel ──────────────────────────────────────────────────────── */}
      <div
        ref={panel}
        id="services-mega"
        aria-labelledby={triggerId}
        /* `inert` removes the subtree from the tab order and the accessibility
           tree while closed. `visibility: hidden` alone would still let a
           keyboard user tab into an invisible menu. */
        inert={!open || undefined}
        onMouseEnter={onOpen}
        onMouseLeave={onClose}
        className="invisible fixed inset-x-0 top-20 z-10 border-b border-line bg-surface opacity-0 shadow-[0_40px_80px_-20px_rgb(0_0_0/0.6)]"
        style={{ clipPath: "inset(0% 0% 100% 0%)" }}
      >
        {/* Lime hairline. One pixel, and it makes the panel read as a
            deliberate brand surface rather than a grey box. */}
        <span aria-hidden className="block h-px w-full bg-accent" />

        <div className="mx-auto grid w-full max-w-wide grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)_minmax(0,0.85fr)] gap-10 px-(--spacing-gutter) py-10">
          {/* Left rail — numbered groups */}
          <ul className="border-r border-line pr-8">
            {serviceGroups.map((g, i) => (
              <li key={g.href} data-rail-item>
                <Link
                  href={g.href}
                  onMouseEnter={() => setActive(i)}
                  /* Focus swaps the pane too, so a keyboard user sees what a
                     mouse user sees. Without this the pane goes stale. */
                  onFocus={() => setActive(i)}
                  onClick={onClose}
                  className={cn(
                    "group flex items-start gap-4 rounded-card px-4 py-3.5 transition-colors duration-base",
                    i === active
                      ? "bg-background text-accent"
                      : "text-foreground hover:bg-background/60"
                  )}
                >
                  <span
                    className={cn(
                      "mt-1.5 font-mono text-eyebrow tabular-nums transition-colors",
                      i === active ? "text-accent" : "text-faint"
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-h4 leading-[0.94]">
                    {g.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Middle — the active group's pages */}
          <div data-pane className="min-w-0">
            <p data-pane-item className="eyebrow text-faint">
              {group?.label}
            </p>
            <p data-pane-item className="mt-2 text-small text-muted">
              {group?.blurb}
            </p>

            <ul className="mt-7 grid gap-1.5 sm:grid-cols-2">
              {group?.children.map((child) => (
                <li key={child.href} data-pane-item>
                  <Link
                    href={child.href}
                    onClick={onClose}
                    /* text-foreground, not text-muted. On a solid panel the
                       links are the content — muted grey made them read as
                       disabled in the first version. */
                    className="group flex items-center justify-between gap-3 rounded-card px-4 py-3 text-small font-medium text-foreground transition-colors duration-base hover:bg-background hover:text-accent"
                  >
                    {child.label}
                    <span
                      aria-hidden
                      className="shrink-0 text-accent opacity-0 transition-all duration-base group-hover:translate-x-1 group-hover:opacity-100"
                    >
                      &rarr;
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — the lime feature card.
              Gives the panel a visual anchor and puts the offer in front of
              someone at the exact moment they are deciding what they need. */}
          <Link
            data-feature
            href={siteConfig.offer.primary.href}
            onClick={onClose}
            className="group flex flex-col justify-between rounded-card bg-accent p-7 text-on-accent transition-transform duration-base ease-out-quart hover:-translate-y-1"
          >
            <div>
              <Logomark className="size-7" color="currentColor" decorative />
              <p className="mt-6 font-display text-h4 leading-[0.94]">
                {siteConfig.offer.primary.label}
              </p>
              <p className="mt-3 text-small opacity-80">
                {siteConfig.offer.primary.note}
              </p>
            </div>
            <span className="mt-8 inline-flex items-center gap-2 font-display text-small">
              Start here
              <span
                aria-hidden
                className="transition-transform duration-base group-hover:translate-x-1.5"
              >
                &rarr;
              </span>
            </span>
          </Link>
        </div>
      </div>
    </>
  );
}
