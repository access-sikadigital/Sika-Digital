"use client";

import { useRef } from "react";
import { gsap, useGSAP, EASE } from "@/lib/gsap";
import { trustedBy } from "@/config/home";
import { ClientMark, logoWidth } from "@/components/sections/TrustedBy";
import { cn } from "@/lib/utils";

/**
 * CLIENT LOGO GRID.
 *
 * The same clients as the band under the homepage hero, laid out still, for
 * the results page.
 *
 * ── One list, one mark ──────────────────────────────────────────────────────
 * Reads `trustedBy` from config/home and renders each logo with the band's own
 * `ClientMark`, so a client looks the same in both places: white at rest, real
 * colours on a white tile on hover. A second implementation would drift.
 *
 * ── Still, not moving ───────────────────────────────────────────────────────
 * On the homepage the logos are atmosphere and a moving band suits that. Here
 * they are the evidence, and evidence gets read. Nothing on a page built to be
 * read moves while it is being read.
 *
 * ── Borders from the gap ────────────────────────────────────────────────────
 * The grid sits on a line-coloured background with a 1px gap, and each cell is
 * page-coloured. That draws every line exactly once. Borders on each cell
 * double up where cells meet and give every inner line twice the weight of the
 * outer edge.
 */
export function ClientLogos({ className }: { className?: string }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (el.getBoundingClientRect().top < window.innerHeight * 0.95) return;

      gsap.fromTo(
        el.querySelectorAll("[data-cell]"),
        { autoAlpha: 0, y: 14 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          ease: EASE.expo,
          /* From the centre outward, so the set assembles as one object
             rather than being typed out left to right. */
          stagger: { each: 0.022, grid: "auto", from: "center" },
          scrollTrigger: { trigger: el, start: "top 80%", once: true },
        }
      );
    },
    { scope: root }
  );

  return (
    <div
      ref={root}
      className={cn(
        "grid grid-cols-2 gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-3 lg:grid-cols-5",
        className
      )}
    >
      {trustedBy.logos.map((logo) => (
        <div
          key={logo.name}
          data-cell
          className="group/logo @container flex aspect-[16/10] items-center justify-center overflow-hidden bg-background p-2 sm:p-4"
        >
          {/* Capped at the cell, so a wide wordmark shrinks on a two-column
              phone grid instead of overflowing it.

              `cqw`, not `%`. A percentage here resolves against the mark's own
              wrapper, whose width comes from the image, so it is circular and
              caps nothing. The cell is a container, and 100cqw is its measured
              content width. 3rem is the mark's own side padding. */}
          <ClientMark
            logo={logo}
            width={`min(${logoWidth(logo.width, logo.height, logo.scale)}px, calc(100cqw - 3rem))`}
          />
        </div>
      ))}
    </div>
  );
}
