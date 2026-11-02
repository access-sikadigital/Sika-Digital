import { landingLogos } from "@/config/landing";
import { ClientMark, logoWidth } from "@/components/sections/TrustedBy";
import { Marquee } from "@/components/motion/Marquee";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Client logo band for the landing page.
 *
 * The homepage TrustedBy band, built from the same pieces (ClientMark,
 * logoWidth, Marquee) and styled identically, but fed the home services
 * clients only. See `landingLogos` in config/landing.ts for why.
 */
export function LandingLogos() {
  if (!landingLogos.length) return null;

  return (
    <section
      aria-label="Clients"
      className="relative overflow-hidden border-b border-line py-12 sm:py-16"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 90% at 50% 0%, color-mix(in oklab, var(--color-blue) 38%, transparent) 0%, transparent 75%)",
        }}
      />
      <Reveal className="relative">
        <p className="text-center eyebrow text-faint">
          Home services businesses we work with
        </p>
      </Reveal>

      <div className="relative mt-10 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)] [--logo-scale:0.75] sm:[--logo-scale:1]">
        <Marquee speed={50} gap="clamp(1.5rem, 4vw, 4rem)" pauseOnHover>
          {landingLogos.map((logo) => (
            <span key={logo.name} className="group/logo flex shrink-0">
              <ClientMark
                logo={logo}
                width={`calc(${logoWidth(logo.width, logo.height, logo.scale)}px * var(--logo-scale))`}
              />
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
