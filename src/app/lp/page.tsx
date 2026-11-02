import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { landing } from "@/config/landing";
import { absoluteUrl } from "@/lib/utils";
import { Hero } from "@/components/sections/Hero";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { BookingDialog } from "@/components/landing/BookingDialog";
import { LandingBehaviour } from "@/components/landing/LandingBehaviour";
import { TrackingScripts } from "@/components/landing/TrackingScripts";

/**
 * PAID LANDING PAGE — /lp/
 *
 * One screen, one action. The approved homepage hero (video, typed headline,
 * torn lime strip) with landing-page copy, a single "Book a Discovery Call"
 * button, the coming-soon note and a minimal footer. The global footer is
 * hidden on this route (HideOnLanding) and the header drops its navigation.
 *
 * The CTA opens BookingDialog: the GoHighLevel calendar when
 * NEXT_PUBLIC_BOOKING_URL is set, otherwise a short call-request form.
 *
 * Not indexed: this page is for paid traffic while the full site is built.
 */

const title = "Sika Digital | Lead Generation Specialists, Australia";
const description =
  "Australian digital marketing agency specialising in lead generation through Google Ads, SEO and performance marketing. Book a discovery call.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: absoluteUrl("/lp/") },
  robots: { index: false, follow: false },
  openGraph: {
    type: "website",
    url: absoluteUrl("/lp/"),
    title,
    description,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
  },
};

export default function LandingPage() {
  const year = new Date().getFullYear();

  return (
    <>
      <TrackingScripts />
      <LandingBehaviour />

      <Hero
        video="/media/hero.mp4"
        poster="/media/hero-poster.jpg"
        copy={{
          eyebrow: (
            <p className="rounded-full border border-line-strong bg-white/[0.06] px-4 py-2 eyebrow !text-[0.625rem] !tracking-[0.12em] whitespace-nowrap text-foreground/85 backdrop-blur-md sm:!text-eyebrow sm:!tracking-[0.16em]">
              {landing.eyebrow}
            </p>
          ),
          lines: landing.lines,
          highlight: landing.highlight,
          description: landing.description,
        }}
      >
        <div
          data-cta-location="hero"
          className="flex flex-col items-center gap-6"
        >
          <Button href="/contact/" size="lg" className="sm:min-h-16 sm:text-h4">
            {landing.cta}
          </Button>
          <p className="flex items-center gap-2.5 font-mono text-eyebrow tracking-wider text-foreground/70 uppercase">
            <span aria-hidden className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:animate-none" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            {landing.comingSoon}
          </p>
        </div>
      </Hero>

      <footer className="border-t border-line bg-background py-8">
        <Container className="flex flex-col items-center justify-between gap-3 text-small text-faint sm:flex-row">
          <p>
            © {year} {siteConfig.legalName || siteConfig.name}. Melbourne,
            Australia.
          </p>
          {siteConfig.email ? (
            <Link
              href={`mailto:${siteConfig.email}`}
              className="duration-base text-foreground/80 transition-colors hover:text-accent"
            >
              {siteConfig.email}
            </Link>
          ) : null}
        </Container>
      </footer>

      <BookingDialog />
    </>
  );
}
