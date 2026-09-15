"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP, EASE } from "@/lib/gsap";
import { serviceGroups } from "@/config/pages";
import { servicePreviews } from "@/config/home";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CursorPreview } from "@/components/motion/CursorPreview";
import {
  SiteFrame,
  MarkRank,
  MarkAds,
  MarkSocial,
  MarkFlow,
} from "@/components/graphics/Schematic";
import { cn } from "@/lib/utils";

/**
 * A mark per supporting service, in the order `serviceGroups` lists them after
 * the lead: SEO, Google Ads, Paid Social, Systems & Automation. Module scope,
 * so the elements are created once rather than on every render.
 */
const MARKS = [
  <MarkRank key="seo" />,
  <MarkAds key="ads" />,
  <MarkSocial key="social" />,
  <MarkFlow key="systems" />,
];

/**
 * SERVICES — one lead tile, four supporting tiles.
 *
 * ── Why this is not a list ──────────────────────────────────────────────────
 * Two earlier versions were stacked rows: index, big label, blurb. A vertical
 * list gives five services equal weight and reads as a menu, and it can only
 * ever be a list.
 *
 * Here the layout carries the argument. Websites takes half the section on its
 * own because it is the thing everything else depends on, which is what the
 * heading claims and what the scope's priority order says. The other four take
 * a quarter each. The hierarchy is visible before a word is read.
 *
 * ── Flex halves, not grid spans ─────────────────────────────────────────────
 * Deliberate. An earlier row layout collapsed because `col-span` utilities were
 * not applying, and when a span fails there is nothing in the markup that looks
 * wrong: every child silently lands in one narrow column and overlaps. Two flex
 * halves with a plain 2x2 grid inside the right one cannot fail that way.
 *
 * ── Nested links ────────────────────────────────────────────────────────────
 * The tile is not a link, because the child pages inside it are. An <a> inside
 * an <a> is invalid and browsers silently un-nest it, breaking both. The title
 * is the link; `group` on the wrapper drives the hover state.
 */

/**
 * The drifting light. Two blurred blobs on different clocks, revealed on hover.
 * Animation timing and the paused-until-hovered behaviour live in globals.css.
 *
 * ── Positioned with offsets, not translate ──────────────────────────────────
 * The obvious way to centre an oversized blob is `left-1/2 -translate-x-1/2`.
 * That cannot work here: the keyframes animate `transform`, so the centring
 * translate is overwritten the moment the animation starts and the blob jumps.
 * Negative insets do the same job without touching transform.
 */
function TileGlow() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden opacity-0 transition-opacity duration-slow ease-out-quart group-hover:opacity-100 group-focus-within:opacity-100"
    >
      <span
        className="tile-glow tile-glow--a absolute -top-1/4 -left-1/4 block aspect-square w-[150%] mix-blend-screen"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--color-lime) 38%, transparent) 0%, transparent 62%)",
        }}
      />
      <span
        className="tile-glow tile-glow--b absolute -top-1/4 -left-1/4 block aspect-square w-[140%] mix-blend-screen"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--color-blue) 60%, transparent) 0%, transparent 58%)",
        }}
      />
    </span>
  );
}

export function ServicesList() {
  const root = useRef<HTMLElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      /* ── The schematics only run while the section is on screen ──────────
         Everything with a `.sch` class is `animation-play-state: paused` by
         default and starts only under `.is-alive`. Across the homepage that is
         around thirty looping elements, and leaving them running for the whole
         visit would keep the compositor busy on drawings nobody can see.

         `toggleClass` puts the class on the trigger element, so one
         ScrollTrigger covers every drawing in the section. */
      ScrollTrigger.create({
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        toggleClass: "is-alive",
      });

      const tiles = gsap.utils.toArray<HTMLElement>("[data-tile]", el);
      if (!tiles.length) return;

      gsap.fromTo(
        tiles,
        { yPercent: 8, autoAlpha: 0 },
        {
          yPercent: 0,
          autoAlpha: 1,
          duration: 0.9,
          ease: EASE.expo,
          stagger: 0.07,
          scrollTrigger: { trigger: el, start: "clamp(top 72%)", once: true },
        }
      );

      /* ── The page builds itself ──────────────────────────────────────────
         The wireframe assembles in the order a page actually gets made: nav,
         then the words, then the form, then the button last. It is the same
         sequence the section is describing in copy two inches below it, which
         is the only reason the motion is here. A drawing that merely fades up
         would be decoration.

         Scoped to the drawing rather than run off the section trigger, so it
         starts once the tile it lives in has arrived. */
      /* The marks come in with their tiles, one shape at a time. Short and
         tight: these are 110px wide and a long reveal on something that small
         reads as a stutter rather than as motion. */
      gsap.utils.toArray<HTMLElement>("[data-mark]", el).forEach((mark) => {
        const shapes = mark.querySelectorAll<SVGElement>("[data-g]");
        if (!shapes.length) return;

        gsap.fromTo(
          shapes,
          { autoAlpha: 0, xPercent: -6 },
          {
            autoAlpha: 1,
            xPercent: 0,
            duration: 0.4,
            ease: EASE.quart,
            stagger: 0.07,
            scrollTrigger: { trigger: mark, start: "clamp(top 85%)", once: true },
          }
        );
      });

      const site = el.querySelector<HTMLElement>("[data-site]");
      if (site) {
        const parts = site.querySelectorAll<SVGElement>("[data-g]");
        if (parts.length) {
          gsap.fromTo(
            parts,
            { autoAlpha: 0, yPercent: 14 },
            {
              autoAlpha: 1,
              yPercent: 0,
              duration: 0.5,
              ease: EASE.quart,
              stagger: 0.045,
              scrollTrigger: {
                trigger: site,
                start: "clamp(top 78%)",
                once: true,
              },
            }
          );

          /* The button lands last and lands harder. It is the only lime thing
             in the drawing and the only thing on a landing page that the rest
             of the page exists to get someone to press. */
          const cta = site.querySelector<SVGElement>("[data-g='cta']");
          if (cta) {
            gsap.fromTo(
              cta,
              { scale: 0.82 },
              {
                scale: 1,
                duration: 0.7,
                ease: EASE.expo,
                delay: 0.42,
                transformOrigin: "16px 162px",
                scrollTrigger: {
                  trigger: site,
                  start: "clamp(top 78%)",
                  once: true,
                },
              }
            );
          }
        }
      }
    },
    { scope: root }
  );

  const [lead, ...rest] = serviceGroups;
  if (!lead) return null;

  /**
   * Shared tile chrome.
   *
   * The flat lime fill on hover is gone, replaced by the drifting light. A
   * solid colour swap meant every piece of text had to invert to ink on hover:
   * eight `group-hover:text-on-accent` declarations per tile, each one its own
   * contrast risk. The light leaves the text alone.
   */
  const tileClass = (featured: boolean) =>
    cn(
      "group relative flex flex-col justify-between overflow-hidden rounded-card border border-line bg-background",
      "transition-colors duration-slow ease-out-quart hover:border-accent",
      featured ? "min-h-[26rem] p-8 lg:min-h-full lg:p-10" : "min-h-56 p-7"
    );

  return (
    <section
      ref={root}
      className="border-y border-line bg-surface py-(--spacing-section)"
    >
      <Container>
        <SectionHeading
          eyebrow="Services"
          title="Five things, in the order they matter."
          intro="Most of it starts with the website. Everything else is pointing traffic at something that converts."
        />

        <div className="mt-16 flex flex-col gap-4 lg:mt-24 lg:flex-row">
          {/* ── Lead tile: half the section ──────────────────────────────── */}
          <article
            data-tile
            className={cn(tileClass(true), "lg:w-1/2")}
            onMouseEnter={() => setPreview(servicePreviews[lead.href] ?? null)}
            onMouseLeave={() => setPreview(null)}
          >
            <TileGlow />

            {/* `relative` on the content, so it paints above the absolutely
                positioned glow rather than underneath it. */}
            <div className="relative flex items-start justify-between gap-6">
              <span className="font-mono text-eyebrow tabular-nums text-faint">
                01
              </span>
              <span
                aria-hidden
                className="text-h3 text-accent opacity-0 transition-all duration-base ease-out-quart group-hover:translate-x-0 group-hover:opacity-100 lg:-translate-x-3"
              >
                &rarr;
              </span>
            </div>

            {/* ── The drawing ───────────────────────────────────────────────
                The lead tile is half the section and most of it was empty,
                which is what made this stretch of the page feel like a wall of
                text. A wireframe of a landing page with a form and one call to
                action is closer to what is being sold here than any photograph
                would be, and it cannot be mistaken for stock.

                `min-h-0` because this is a flex child holding an SVG: without
                it the item refuses to shrink below the drawing's intrinsic
                height and pushes the copy out of the bottom of the tile. */}
            <div
              data-site
              className="relative my-8 hidden min-h-0 flex-1 items-center justify-center sm:flex"
            >
              <SiteFrame className="max-h-full w-full max-w-md drop-shadow-[0_24px_48px_rgba(0,0,0,0.45)]" />
            </div>

            <div className="relative">
              <Link
                href={lead.href}
                onFocus={() => setPreview(servicePreviews[lead.href] ?? null)}
                onBlur={() => setPreview(null)}
                className="block font-display text-h1 uppercase leading-[0.9] text-foreground transition-colors duration-base group-hover:text-accent"
              >
                {lead.label}
              </Link>

              <p className="mt-6 max-w-sm text-lead text-muted">{lead.blurb}</p>

              <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-6">
                {lead.children.map((child) => (
                  <li key={child.href}>
                    <Link
                      href={child.href}
                      className="text-small whitespace-nowrap text-muted underline-offset-4 transition-colors duration-base hover:text-accent hover:underline"
                    >
                      {child.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </article>

          {/* ── Four supporting tiles, 2x2 ───────────────────────────────── */}
          <div className="grid gap-4 sm:grid-cols-2 lg:w-1/2">
            {rest.map((group, i) => (
              <article
                key={group.href}
                data-tile
                className={tileClass(false)}
                onMouseEnter={() =>
                  setPreview(servicePreviews[group.href] ?? null)
                }
                onMouseLeave={() => setPreview(null)}
              >
                <TileGlow />

                <div className="relative flex items-start justify-between gap-4">
                  <span className="font-mono text-eyebrow tabular-nums text-faint">
                    {String(i + 2).padStart(2, "0")}
                  </span>
                  <span
                    aria-hidden
                    className="text-lead text-accent opacity-0 transition-all duration-base ease-out-quart group-hover:translate-x-0 group-hover:opacity-100 lg:-translate-x-2"
                  >
                    &rarr;
                  </span>
                </div>

                {/* The mark. Sits in the dead space between the index and the
                    title that every one of these tiles had.

                    Indexed by position, like the process drawings, because
                    this is a fixed set of four that exists only for this row.
                    A fifth service added to the config would get no mark and
                    the tile would still be correct, which is the right failure
                    for a decorative element to have. */}
                {MARKS[i] && (
                  <div data-mark className="relative my-5 w-24 sm:w-28">
                    {MARKS[i]}
                  </div>
                )}

                <div className="relative">
                  <Link
                    href={group.href}
                    onFocus={() =>
                      setPreview(servicePreviews[group.href] ?? null)
                    }
                    onBlur={() => setPreview(null)}
                    className="block font-display text-h3 uppercase leading-none text-foreground transition-colors duration-base group-hover:text-accent"
                  >
                    {group.label}
                  </Link>
                  <p className="mt-3 text-small text-muted">{group.blurb}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>

      {/* Follows the cursor while a tile is hovered. Renders nothing until a
          clip is configured. See `servicePreviews` in config/home.ts. */}
      <CursorPreview src={preview} />
    </section>
  );
}
