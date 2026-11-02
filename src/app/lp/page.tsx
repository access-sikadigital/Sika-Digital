import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { siteConfig } from "@/config/site";
import { approach, closing, cta, hero, services, why } from "@/config/landing";
import { absoluteUrl } from "@/lib/utils";
import { Hero } from "@/components/sections/Hero";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Rule } from "@/components/motion/Rule";
import { MarkAnchor } from "@/components/motion/MarkFlight";
import { Logomark } from "@/components/brand/Logo";
import {
  MarkAds,
  MarkFlow,
  MarkRank,
  MarkSocial,
  SiteFrame,
} from "@/components/graphics/Schematic";
import { ClientBand } from "@/components/landing/ClientBand";
import { BookingDialog } from "@/components/landing/BookingDialog";
import { LandingBehaviour } from "@/components/landing/LandingBehaviour";
import { TrackingScripts } from "@/components/landing/TrackingScripts";

/**
 * PAID LANDING PAGE — /lp/
 *
 * Built from the approved homepage: the hero and video, the client logo
 * marks, the service schematics, section headings, cards, buttons and the
 * blue closing band. Six short sections, each saying one new thing:
 *
 *   1. Hero            Who Sika is and what it does. One CTA.
 *   2. Clients         Proof, with almost no text.
 *   3. What we do      Four services plus the system that connects them.
 *   4. Why Sika        Four differences, each one checkable.
 *   5. How we work     Three steps. Removes the fear of the unknown.
 *   6. Book a call     The ask, with the coming-soon note beneath it.
 *
 * Every CTA opens BookingDialog (GHL calendar via NEXT_PUBLIC_BOOKING_URL,
 * otherwise a call-request form). Not indexed: paid traffic only while the
 * full site is built. The header drops its navigation and the global footer
 * is replaced by a minimal one on this route.
 */

const title = "Sika Digital | Australian Lead Generation Specialists";
const description =
  "Google Ads, SEO, paid social and websites for Australian trade, construction and service businesses. Turn searches and ad clicks into genuine enquiries.";

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

const SERVICE_MARKS: Record<string, ReactNode> = {
  ads: <MarkAds />,
  seo: <MarkRank />,
  social: <MarkSocial />,
};

/** Links to /contact/ so it works without JS; LandingBehaviour turns the
    click into the booking dialog. */
function BookButton({
  location,
  className,
  large = false,
}: {
  location: string;
  className?: string;
  large?: boolean;
}) {
  return (
    <div data-cta-location={location} className={className}>
      <Button
        href="/contact/"
        size="lg"
        className={
          large ? "w-full sm:min-h-16 sm:w-auto sm:text-h4" : undefined
        }
      >
        {cta}
      </Button>
    </div>
  );
}

export default function LandingPage() {
  const year = new Date().getFullYear();

  return (
    <>
      <TrackingScripts />
      <LandingBehaviour />

      {/* ── 1. Hero ──────────────────────────────────────────────────── */}
      <Hero
        video="/media/hero.mp4"
        poster="/media/hero-poster.jpg"
        copy={{
          eyebrow: (
            <p className="rounded-full border border-line-strong bg-white/[0.06] px-4 py-2 eyebrow !text-[0.625rem] !tracking-[0.12em] whitespace-nowrap text-foreground/85 backdrop-blur-md sm:!text-eyebrow sm:!tracking-[0.16em]">
              {hero.eyebrow}
            </p>
          ),
          lines: hero.lines,
          highlight: hero.highlight,
          description: hero.description,
        }}
      >
        <BookButton location="hero" large />
      </Hero>

      {/* ── 2. Clients ───────────────────────────────────────────────── */}
      <ClientBand />

      {/* ── 3. What we do ────────────────────────────────────────────── */}
      <section
        aria-label="What we do"
        className="relative py-(--spacing-section)"
      >
        <Container>
          <SectionHeading
            eyebrow={services.eyebrow}
            title={services.title}
            intro={services.intro}
          />

          <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:mt-24 lg:grid-cols-4 lg:gap-6">
            {services.items.map((s, i) => (
              <Reveal
                key={s.key}
                delay={i * 0.08}
                className="group duration-base flex flex-col rounded-card border border-line bg-surface p-7 transition-colors hover:border-accent/60 lg:p-8"
              >
                <div className="flex h-24 items-center">
                  {s.key === "web" ? (
                    <SiteFrame className="h-full w-auto" />
                  ) : (
                    <div className="w-24">{SERVICE_MARKS[s.key]}</div>
                  )}
                </div>
                <h3 className="mt-8 font-display text-h4 leading-[0.94] text-foreground">
                  {s.title}
                </h3>
                <p className="mt-4 text-body text-muted">{s.copy}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-5 flex flex-col gap-6 rounded-card border border-accent/40 bg-surface p-7 sm:flex-row sm:items-center sm:gap-10 lg:mt-6 lg:p-8">
            <div className="w-24 shrink-0">
              <MarkFlow />
            </div>
            <div className="lg:flex lg:flex-1 lg:items-baseline lg:gap-12">
              <h3 className="font-display text-h4 leading-[0.94] text-foreground lg:w-72 lg:shrink-0">
                {services.connected.title}
              </h3>
              <p className="mt-3 text-body text-muted lg:mt-0">
                {services.connected.copy}
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── 4. Why Sika ──────────────────────────────────────────────── */}
      <section
        aria-label="Why Sika Digital"
        className="relative bg-surface py-(--spacing-section)"
      >
        <Container>
          <SectionHeading
            eyebrow={why.eyebrow}
            title={why.title}
            intro={why.intro}
          />

          <ol className="mt-16 grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2 lg:mt-24">
            {why.items.map((item, i) => (
              <Reveal
                as="li"
                key={item.title}
                delay={(i % 2) * 0.08}
                className="bg-surface p-7 sm:p-9 lg:p-12"
              >
                <span className="font-mono text-eyebrow text-accent tabular-nums">
                  0{i + 1}
                </span>
                <h3 className="mt-6 font-display text-h3 leading-[0.94] text-foreground">
                  {item.title}
                </h3>
                <p className="mt-4 max-w-md text-body text-muted">
                  {item.copy}
                </p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* ── 5. How we work ───────────────────────────────────────────── */}
      <section
        aria-label="How we work"
        className="relative py-(--spacing-section)"
      >
        <Container>
          <SectionHeading eyebrow={approach.eyebrow} title={approach.title} />

          <ol className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-3 lg:gap-10">
            {approach.steps.map((step, i) => (
              <Reveal as="li" key={step.n} delay={i * 0.1}>
                <div className="flex items-center gap-4">
                  <span className="font-display text-h2 leading-[0.94] text-accent">
                    {step.n}
                  </span>
                  <Rule className="flex-1" delay={0.2 + i * 0.1} />
                </div>
                <h3 className="mt-8 font-display text-h3 leading-[0.94] text-foreground">
                  {step.title}
                </h3>
                <p className="mt-4 max-w-sm text-body text-muted">
                  {step.copy}
                </p>
              </Reveal>
            ))}
          </ol>

          <BookButton location="approach" className="mt-16 lg:mt-20" />
        </Container>
      </section>

      {/* ── 6. Book a call ───────────────────────────────────────────── */}
      <section
        aria-label="Book a discovery call"
        className="theme-blue grain relative overflow-hidden bg-background py-(--spacing-section)"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(80% 90% at 20% 0%, rgb(255 255 255 / 0.10) 0%, transparent 60%), radial-gradient(70% 80% at 100% 100%, rgb(11 11 11 / 0.35) 0%, transparent 70%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute top-1/2 -right-[18%] hidden w-[36rem] -translate-y-1/2 opacity-[0.12] lg:block"
        >
          <Logomark className="mark-turn" color="lime" decorative />
        </div>

        <Container className="relative">
          <div className="flex items-center gap-3">
            <MarkAnchor size="w-4" />
            <p className="eyebrow text-accent">{closing.eyebrow}</p>
          </div>

          <h2 className="mt-8 max-w-[16ch] font-display text-h1 leading-[0.94] text-foreground lg:mt-10">
            {closing.title}
          </h2>

          <div className="mt-12 border-t border-line pt-10 lg:mt-16 lg:flex lg:items-end lg:justify-between lg:gap-16">
            <p className="max-w-xl text-lead text-muted">{closing.copy}</p>
            <div className="mt-10 shrink-0 lg:mt-0">
              <BookButton location="closing" large />
            </div>
          </div>

          <p className="mt-16 flex items-center gap-2.5 font-mono text-eyebrow tracking-wider text-foreground/70 uppercase lg:mt-20">
            <span aria-hidden className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:animate-none" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            {closing.comingSoon}
          </p>
        </Container>
      </section>

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
