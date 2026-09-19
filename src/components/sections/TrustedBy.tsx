import Image from "next/image";
import { trustedBy } from "@/config/home";
import { Marquee } from "@/components/motion/Marquee";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

/* Every logo gets the same visual AREA rather than the same height. Equal
   heights make a wide wordmark enormous and a square badge tiny; equal area
   gives each the same weight. Square px at desktop, scaled down on phones via
   --logo-scale. The height cap keeps a square badge from towering. */
const LOGO_AREA = 4400;
const MAX_HEIGHT = 58;

function logoWidth(width: number, height: number) {
  const ratio = width / height;
  const h = Math.min(Math.sqrt(LOGO_AREA / ratio), MAX_HEIGHT);
  return Math.round(h * ratio);
}

/**
 * TRUSTED BY — client logo band under the hero.
 *
 * Every logo is flattened to a soft white silhouette so a row of mismatched
 * brand colours reads as one calm band, and shows its real colours when
 * hovered. The band slows to a stop under the cursor (`pauseOnHover`) so a
 * logo can actually be hovered rather than chased.
 *
 * ── Why a filter and not two images ─────────────────────────────────────────
 * `brightness(0) invert(1)` turns any logo, whatever its colours, into flat
 * white. Removing the filter on hover restores the original file. One asset
 * per client, nothing to keep in sync.
 *
 * Real colours are not always readable on the dark page: a charcoal or navy
 * logo vanishes. Those are marked `tone: "dark"` in config and get a light
 * tile behind them on hover. See `trustedBy` in config/home.ts.
 *
 * ── Empty until real logos exist ────────────────────────────────────────────
 * See `trustedBy` in config/home.ts. With no logos the section renders nothing
 * in production and labelled empty slots in development.
 */
export function TrustedBy() {
  const { count, logos } = trustedBy;
  const preview = logos.length === 0;

  if (preview && process.env.NODE_ENV === "production") return null;

  return (
    <section aria-label="Clients" className="relative overflow-hidden border-b border-line py-12 sm:py-16">
      {/* Picks up the blue glow from the bottom of the hero and lets it fade
          out through this band. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 90% at 50% 0%, color-mix(in oklab, var(--color-blue) 38%, transparent) 0%, transparent 75%)",
        }}
      />
      <Reveal className="relative">
        <p className="eyebrow text-center text-faint">
          Trusted by{" "}
          {count ? <span className="text-foreground">{count} </span> : null}
          service businesses
        </p>
      </Reveal>

      {/* Edge fade, so logos drift in and out of nothing rather than being
          cut off by the viewport. */}
      <div className="relative mt-10 [--logo-scale:0.75] sm:[--logo-scale:1] [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <Marquee speed={40} gap="clamp(1.5rem, 4vw, 4rem)" pauseOnHover>
          {preview
            ? Array.from({ length: 6 }, (_, i) => (
                <span
                  key={i}
                  className="eyebrow flex h-12 w-44 items-center justify-center rounded-button border border-dashed border-line-strong text-faint"
                >
                  Client logo
                </span>
              ))
            : logos.map((logo) => (
                <span
                  key={logo.name}
                  className={cn(
                    "group/logo flex shrink-0 items-center justify-center rounded-card px-6 py-4 transition-colors duration-(--duration-base)",
                    logo.tone === "dark" ? "hover:bg-paper" : "hover:bg-white/[0.06]"
                  )}
                >
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    width={logo.width}
                    height={logo.height}
                    unoptimized={logo.src.endsWith(".svg")}
                    style={{
                      width: `calc(${logoWidth(logo.width, logo.height)}px * var(--logo-scale))`,
                    }}
                    className={cn(
                      "h-auto max-w-none opacity-60 transition-[filter,opacity] duration-(--duration-base) group-hover/logo:opacity-100 group-hover/logo:filter-none",
                      logo.idle === "grayscale" ? "grayscale" : "brightness-0 invert"
                    )}
                  />
                </span>
              ))}
        </Marquee>
      </div>
    </section>
  );
}
