"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { gsap, useGSAP, EASE } from "@/lib/gsap";
import { industries, type Industry } from "@/config/home";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

/**
 * INDUSTRIES — four panels that open.
 *
 * ── Why this section earns its place on the homepage ────────────────────────
 * The scope's own keyword research puts these terms at KD 6 to 17, the lowest
 * difficulty anywhere in the map, and names trade credibility as the
 * differentiator no generalist agency can copy. Putting it on the homepage
 * rather than burying it under /industries/ is what makes the wedge visible to
 * the people it is aimed at.
 *
 * ── What this replaced, and why ─────────────────────────────────────────────
 * Four equal photo cards in a row. Two problems, one cosmetic and one
 * structural.
 *
 * The cosmetic one: at a quarter of the container, "ELECTRICIANS" ran straight
 * off the edge of its own card. A fixed display size cannot survive a fixed
 * narrow column when the words are not the same length.
 *
 * The structural one: four identical tiles holding four stock photographs is
 * the most common shape on the internet, and no amount of animation on top
 * rescues it. Equal weight also says these four matter equally, which is a
 * claim the section does not intend to make.
 *
 * ── Panels, not cards ───────────────────────────────────────────────────────
 * One panel is open at a time. It takes roughly 44% of the row and shows the
 * label horizontally at full size with its line underneath; the other three
 * sit at about 18% each with their label turned on its side. Hovering moves
 * the opening.
 *
 * This fixes both problems at once. The open panel is wide enough that no word
 * can overflow it, and a closed panel is too narrow to need one. It also gives
 * the section an interaction the rest of the page does not have: everything
 * else here is driven by scroll, and a scroll-driven page with nothing to
 * touch starts to feel like a video.
 *
 * ── flex-grow, not scaleX ───────────────────────────────────────────────────
 * Animating `flex-grow` costs a layout pass per frame, which is the expensive
 * option and the correct one. `scaleX` would composite for free and stretch
 * the photographs horizontally while it did it, which on four pictures of
 * people is immediately obvious. Four elements is well inside what layout can
 * take at 60fps.
 *
 * ── Server-rendered resting state ───────────────────────────────────────────
 * The first panel is open in the markup, not opened by JavaScript on mount.
 * The section is therefore correct before any script runs and correct if none
 * ever does, and there is no frame where four equal panels flash before one
 * expands.
 */

function Panel({ industry, i }: { industry: Industry; i: number }) {
  const open = i === 0;

  return (
    <Link
      href={industry.href}
      data-panel
      className={cn(
        "group relative block overflow-hidden rounded-card border border-line",
        "aspect-[16/10] lg:aspect-auto lg:h-full",
        /* `basis-0` is load-bearing. With the default `basis-auto` a flex item
           is first sized to its content and only the leftover space is shared
           out, so a 2.4 : 1 : 1 : 1 ratio would apply to whatever was left
           after four panels of intrinsic width, not to the row. From zero, the
           ratio is the row. `min-w-0` then lets a panel go narrower than the
           word inside it, which is the whole point of a closed panel. */
        "lg:min-w-0 lg:basis-0",
        "transition-colors duration-slow ease-out-quart hover:border-accent",
        /* The resting split, in CSS. GSAP takes over on first hover. */
        open ? "lg:grow-[2.4]" : "lg:grow"
      )}
    >
      {/* Three layers, one transform each. This separation is not tidiness, it
          is the only way the three survive together: GSAP writes `transform`
          wholesale, so a scroll offset and a scale on the same element means
          whichever wrote last wins and the other silently disappears.

            · outer  — GSAP owns it, scroll parallax
            · middle — the oversize that gives the parallax somewhere to travel
            · inner  — the hover push, a CSS transition */}
      <span data-parallax className="absolute inset-0 block">
        <span className="absolute inset-0 block scale-[1.18]">
          <Image
            src={industry.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            /* `objectPosition` is inline rather than a class because it is a
               per-photo measurement, not a design decision. It belongs next to
               the file it describes, in config, so that swapping a photo and
               swapping its crop are the same edit. */
            style={{ objectPosition: industry.focus ?? "50% 50%" }}
            className="object-cover transition-transform duration-slower ease-out-quart group-hover:scale-105"
          />
        </span>
      </span>

      {/* Scrim. Taller and heavier than a card needed, because an open panel
          carries two lines of copy over whatever the photograph happens to be
          doing down there. Always present, so the type has the same contrast
          in every panel regardless of which one is open. */}
      <span
        aria-hidden
        className="absolute inset-0 block"
        style={{
          background:
            "linear-gradient(to top, var(--color-background) 4%, color-mix(in oklab, var(--color-background) 78%, transparent) 38%, color-mix(in oklab, var(--color-background) 20%, transparent) 78%, transparent 100%)",
        }}
      />

      {/* Index. Sits in every panel, open or closed, so the row reads as an
          ordered set rather than four unrelated pictures. */}
      <span className="absolute left-5 top-5 block font-mono text-eyebrow tabular-nums text-foreground/70">
        {String(i + 1).padStart(2, "0")}
      </span>

      {/* ── Closed state ──────────────────────────────────────────────────
          The label turned on its side and read from the bottom up. A closed
          panel is about 18% of the row, which is narrower than the word, so
          horizontal type here would either overflow or shrink to nothing.
          Desktop only: on a phone every panel is full width and open. */}
      <span
        data-idle
        aria-hidden
        className={cn(
          "pointer-events-none absolute bottom-5 left-5 hidden lg:block",
          "font-display text-h4 leading-[0.94] tracking-[-0.045em] text-foreground",
          "[writing-mode:vertical-rl] rotate-180",
          open ? "lg:opacity-0" : "lg:opacity-100"
        )}
      >
        {industry.label}
      </span>

      {/* ── Open state ────────────────────────────────────────────────────
          Full width, so the longest label in the set has room. */}
      <span
        data-live
        className={cn(
          "absolute inset-x-0 bottom-0 block p-6 lg:p-8",
          "opacity-100",
          open ? "lg:opacity-100" : "lg:opacity-0"
        )}
      >
        <span className="flex items-end justify-between gap-4">
          <span className="block whitespace-nowrap font-display text-h3 leading-[0.94] text-foreground">
            {industry.label}
          </span>
          <span
            aria-hidden
            className="block shrink-0 translate-y-1 text-lead text-accent opacity-0 transition-all duration-base ease-out-quart group-hover:translate-y-0 group-hover:opacity-100"
          >
            &rarr;
          </span>
        </span>

        <span className="mt-3 block max-w-sm text-small text-muted">
          {industry.blurb}
        </span>
      </span>
    </Link>
  );
}

export function Industries() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const panels = gsap.utils.toArray<HTMLElement>("[data-panel]", el);
      if (!panels.length) return;

      /* ── Entrance. Every breakpoint. ─────────────────────────────────────
         A clip-path wipe reads as a panel being uncovered rather than fading
         up, which suits hard-edged type, and it composites where animating
         height would force layout on four elements at once.

         `fromTo` with an explicit open end state, so an interrupted tween can
         never leave a panel clipped to nothing. */
      gsap.fromTo(
        panels,
        { clipPath: "inset(0% 0% 100% 0%)", yPercent: 5 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          yPercent: 0,
          duration: 1.2,
          ease: EASE.expo,
          stagger: 0.09,
          scrollTrigger: { trigger: el, start: "clamp(top 75%)", once: true },
        }
      );

      /* Parallax inside each panel. The layer is scaled 1.18, so it has about
         9% of its own height of slack at each edge. Travelling 6% either way
         stays inside that and a panel can never show a bare corner.

         Scrubbed, so the offset is a function of scroll position rather than
         something that plays. Stop mid-section and it stops with you. */
      gsap.utils.toArray<HTMLElement>("[data-parallax]", el).forEach((layer) => {
        gsap.fromTo(
          layer,
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: "none",
            scrollTrigger: {
              trigger: layer,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          }
        );
      });

      /* ── The opening. Desktop only. ──────────────────────────────────────
         On a phone every panel is full width and already open, so there is no
         second state to move between and nothing here would mean anything. */
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const idles = panels.map((p) =>
          p.querySelector<HTMLElement>("[data-idle]")
        );
        const lives = panels.map((p) =>
          p.querySelector<HTMLElement>("[data-live]")
        );

        let current = 0;

        const openAt = (next: number) => {
          if (next === current) return;
          current = next;

          /* One tween across all four rather than four tweens. The widths are
             a single distribution, and splitting it means four independent
             playheads that can drift apart mid-transition and briefly total
             more or less than the row. */
          gsap.to(panels, {
            flexGrow: (j: number) => (j === next ? 2.4 : 1),
            duration: 0.8,
            ease: EASE.expo,
            overwrite: "auto",
          });

          gsap.to(idles, {
            autoAlpha: (j: number) => (j === next ? 0 : 1),
            duration: 0.35,
            ease: EASE.quart,
            overwrite: "auto",
          });

          gsap.to(lives, {
            autoAlpha: (j: number) => (j === next ? 1 : 0),
            /* Slower than the close, and it is the only asymmetry here. The
               copy should arrive once the panel has somewhere to put it,
               rather than racing the width and wrapping on the way. */
            duration: 0.5,
            delay: 0.12,
            ease: EASE.quart,
            overwrite: "auto",
          });
        };

        /* Handlers are kept so they can be removed by identity. Detaching by
           replacing the node would also work and would be wrong: these are
           React's elements, and swapping them out from underneath it leaves
           React holding references to nodes that are no longer in the
           document. It would also orphan the entrance and parallax tweens,
           which target these same elements. */
        const bound = panels.map((panel, i) => {
          const enter = () => openAt(i);
          panel.addEventListener("pointerenter", enter);
          /* Keyboard parity. Tabbing through the row opens each panel in turn,
             so the copy a mouse user gets on hover is reachable without one. */
          panel.addEventListener("focus", enter);
          return { panel, enter };
        });

        return () => {
          bound.forEach(({ panel, enter }) => {
            panel.removeEventListener("pointerenter", enter);
            panel.removeEventListener("focus", enter);
          });
          /* Hand the widths and the two states back to CSS. Leaving inline
             values behind would freeze the desktop layout into the mobile
             one on a resize across the breakpoint. */
          gsap.set(panels, { clearProps: "flexGrow" });
          gsap.set([...idles, ...lives], {
            clearProps: "opacity,visibility",
          });
        };
      });

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="border-y border-line bg-surface py-(--spacing-section)"
    >
      <Container>
        <SectionHeading
          eyebrow="Who we work with"
          /* The headline was the only thing on the page this size with no
             colour in it at all. At 20ch this line breaks as "WE KNOW WHAT /
             A QUIET WEEK / COSTS YOU.", so the accent lands on a whole line
             rather than cutting across a break, and it lands on the phrase the
             sentence is actually about.

             Safe inside SplitLines: SplitText divides on lines and keeps
             nested inline elements intact. A character split would not be. */
          title={
            <>
              We know what{" "}
              <span className="text-accent">a quiet week</span> costs you.
            </>
          }
          intro={`${siteConfig.founder.name} spent ${siteConfig.founder.credential.replace(/^12 years/, "twelve years")}. The advice comes from someone who has run a job, not just a campaign.`}
        />
      </Container>

      {/* ── Full bleed ──────────────────────────────────────────────────────
          The only row on the page that breaks the container. Deliberate: the
          panels are photographs of people, and the argument they make is that
          Sika works with these trades. Gutters on that reads as a widget on a
          page. Running to the edges reads as the page being about them. */}
      <div className="mt-14 flex flex-col gap-3 px-4 lg:mt-20 lg:h-[68vh] lg:flex-row lg:gap-2 lg:px-6">
        {industries.map((industry, i) => (
          <Panel key={industry.key} industry={industry} i={i} />
        ))}
      </div>
    </section>
  );
}
