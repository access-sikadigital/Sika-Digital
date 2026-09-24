"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP, EASE } from "@/lib/gsap";
import { trustedBy } from "@/config/home";
import { logoWidth } from "@/components/sections/TrustedBy";
import { cn } from "@/lib/utils";

/**
 * CLIENT LOGO GRID.
 *
 * The same clients as the band under the homepage hero, laid out still, for
 * the results page.
 *
 * ── One list, one sizing rule ───────────────────────────────────────────────
 * Reads `trustedBy` from config/home and sizes with the band's own
 * `logoWidth`. A second list of clients would eventually disagree with the
 * first about who the clients are, and on a page about honest proof that is
 * the one inconsistency that matters.
 *
 * ── Still, not moving ───────────────────────────────────────────────────────
 * On the homepage the logos are atmosphere and a moving band suits that. Here
 * they are the evidence, and evidence gets read. Nothing on a page built to be
 * read moves while it is being read.
 *
 * ── Same idle and hover as the band ─────────────────────────────────────────
 * White silhouette at rest, real colours on hover, a light tile behind the
 * logos whose colours need one. So a client recognised in one place looks the
 * same in the other.
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
          className="group/logo flex aspect-[16/10] items-center justify-center bg-background p-5 sm:p-6"
        >
          <span
            className={cn(
              "flex items-center justify-center rounded-card px-4 py-3 transition-colors duration-(--duration-base)",
              logo.tone === "dark"
                ? "group-hover/logo:bg-paper"
                : "group-hover/logo:bg-white/[0.06]"
            )}
          >
            <Image
              src={logo.src}
              alt={logo.name}
              width={logo.width}
              height={logo.height}
              unoptimized={logo.src.endsWith(".svg")}
              style={{ width: logoWidth(logo.width, logo.height, logo.scale) }}
              className={cn(
                "h-auto max-w-full opacity-60 transition-[filter,opacity] duration-(--duration-base) group-hover/logo:opacity-100 group-hover/logo:filter-none",
                logo.idle === "grayscale" ? "grayscale" : "brightness-0 invert"
              )}
            />
          </span>
        </div>
      ))}
    </div>
  );
}
