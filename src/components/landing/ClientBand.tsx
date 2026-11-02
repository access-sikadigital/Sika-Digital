import { trustedBy } from "@/config/home";
import { clients } from "@/config/landing";
import { ClientMark, logoWidth } from "@/components/sections/TrustedBy";
import { Marquee } from "@/components/motion/Marquee";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Client logos for the landing page. Built from the homepage TrustedBy parts
 * (ClientMark, logoWidth, Marquee) so the logos look identical, but set as
 * two rows drifting in opposite directions under a short heading, which
 * gives the section more weight than the single homepage band.
 */
export function ClientBand() {
  const logos = trustedBy.logos;
  if (!logos.length) return null;
  const half = Math.ceil(logos.length / 2);
  const rows = [logos.slice(0, half), logos.slice(half)];

  return (
    <section
      aria-label="Clients"
      className="relative overflow-hidden border-b border-line py-20 sm:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 90% at 50% 0%, color-mix(in oklab, var(--color-blue) 38%, transparent) 0%, transparent 75%)",
        }}
      />
      <Reveal className="relative px-(--spacing-gutter)">
        <h2 className="mx-auto max-w-[22ch] text-center font-display text-h3 leading-[0.94] text-foreground">
          {clients.title}
        </h2>
      </Reveal>

      <div className="relative mt-12 flex flex-col gap-4 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)] [--logo-scale:0.72] sm:mt-16 sm:gap-6 sm:[--logo-scale:1]">
        {rows.map((row, r) => (
          <Marquee
            key={r}
            speed={60 + r * 8}
            reverse={r === 1}
            gap="clamp(1.5rem, 4vw, 4rem)"
            pauseOnHover
          >
            {row.map((logo) => (
              <span key={logo.name} className="group/logo flex shrink-0">
                <ClientMark
                  logo={logo}
                  width={`calc(${logoWidth(logo.width, logo.height, logo.scale)}px * var(--logo-scale))`}
                />
              </span>
            ))}
          </Marquee>
        ))}
      </div>
    </section>
  );
}
