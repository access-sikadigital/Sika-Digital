import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import {
  enquire,
  faqs,
  fit,
  fixes,
  heroCta,
  problem,
  testimonials,
  why,
} from "@/config/landing";
import { absoluteUrl } from "@/lib/utils";
import { Hero } from "@/components/sections/Hero";
import { ServiceTicker } from "@/components/sections/ServiceTicker";
import { Process } from "@/components/sections/Process";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GoogleReviewsBadge } from "@/components/ui/GoogleReviewsBadge";
import { Reveal } from "@/components/motion/Reveal";
import { MarkAnchor } from "@/components/motion/MarkFlight";
import { Rule } from "@/components/motion/Rule";
import { LandingLogos } from "@/components/landing/LandingLogos";
import { LeadForm } from "@/components/landing/LeadForm";
import { StickyCta } from "@/components/landing/StickyCta";
import { TrackingScripts } from "@/components/landing/TrackingScripts";
import {
  FORM_ID,
  LandingBehaviour,
  TradeText,
} from "@/components/landing/LandingBehaviour";

/**
 * PAID LANDING PAGE — /lp/
 *
 * The destination for Google Ads and Meta Ads traffic. Built on the homepage's
 * approved hero, video and design system; the difference is the job. The
 * homepage introduces the agency. This page has one action: the audit form.
 *
 * ── Order, and why (full reasoning in docs/landing-page/) ───────────────────
 *   1. Hero + CTA        Approved hero, unchanged, plus one button.
 *   2. Logos             Proof before the pitch. Home services clients only.
 *   3. The problem       PAS: three places enquiries leak. Message match on
 *                        `?trade=`.
 *   4. What we fix       The four services, written as outcomes.
 *   5. Why Sika          Differentiators a competitor cannot copy.
 *   6. Testimonials      Renders only when real, approved quotes exist.
 *   7. Process           The approved homepage section, reused as is.
 *   8. Fit               Who this is and isn't for. A lead-quality filter.
 *   9. FAQ               Objections answered before the call.
 *  10. Form              The single conversion. Also the closing section.
 *
 * ── Not indexed ─────────────────────────────────────────────────────────────
 * A paid page duplicates the homepage's ground and is written for an ad, not a
 * search query. Indexing it would split signals with the homepage. Google Ads
 * reaches noindex pages without issue.
 */

const title = "Marketing for Home Services Businesses | Sika Digital";
const description =
  "Local SEO, Google and Meta ads, websites and lead follow-up for Australian home services businesses. Find out where your enquiries are going missing.";

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

function Tick({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="none" aria-hidden>
      <path
        d="M2.5 8.5L6 12l7.5-8"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="square"
      />
    </svg>
  );
}

function Cross({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="none" aria-hidden>
      <path
        d="M3.5 3.5l9 9M12.5 3.5l-9 9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
      />
    </svg>
  );
}

/** A mid-page CTA. Links to /contact/ so it works without JS; on this page
    LandingBehaviour turns the click into a scroll to the form. */
function InlineCta({
  location,
  className,
}: {
  location: string;
  className?: string;
}) {
  return (
    <div data-cta-location={location} className={className}>
      <Button href="/contact/" size="lg" className="w-full sm:w-auto">
        {heroCta.label}
      </Button>
    </div>
  );
}

export default function LandingPage() {
  return (
    <>
      <TrackingScripts />
      <LandingBehaviour />

      {/* ── 1. Hero ────────────────────────────────────────────────────── */}
      <Hero video="/media/hero.mp4" poster="/media/hero-poster.jpg">
        <div
          data-cta-location="hero"
          className="flex flex-col items-center gap-4"
        >
          <Button href="/contact/" size="lg">
            {heroCta.label}
          </Button>
          <p className="max-w-md text-small text-foreground/70">
            {heroCta.note}
          </p>
        </div>
      </Hero>
      <ServiceTicker />

      {/* ── 2. Logos ───────────────────────────────────────────────────── */}
      <LandingLogos />

      {/* ── 3. The problem ─────────────────────────────────────────────── */}
      <section aria-label="problem" className="relative py-(--spacing-section)">
        <Container>
          <SectionHeading
            eyebrow={problem.eyebrow}
            title={problem.title}
            intro={<TradeText text={problem.intro} />}
          />

          <ol className="mt-16 grid gap-5 sm:grid-cols-2 lg:mt-24 lg:gap-6">
            {problem.leaks.map((leak, i) => (
              <Reveal
                as="li"
                key={leak.n}
                delay={i * 0.08}
                className="rounded-card border border-line bg-surface p-7 lg:p-9"
              >
                <span className="font-mono text-eyebrow text-accent tabular-nums">
                  {leak.n}
                </span>
                <h3 className="mt-6 font-display text-h4 leading-[0.94] text-foreground">
                  {leak.title}
                </h3>
                <p className="mt-4 text-body text-muted">{leak.copy}</p>
              </Reveal>
            ))}
          </ol>

          <Reveal className="mt-12 lg:mt-16">
            <p className="max-w-[28ch] font-display text-h3 leading-[0.94] text-foreground">
              {problem.close}
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ── 4. What we fix ─────────────────────────────────────────────── */}
      <section
        aria-label="services"
        className="relative bg-surface py-(--spacing-section)"
      >
        <Container>
          <SectionHeading
            eyebrow={fixes.eyebrow}
            title={fixes.title}
            intro={fixes.intro}
          />

          <ol className="mt-16 border-t border-line lg:mt-24">
            {fixes.items.map((item) => (
              <Reveal
                as="li"
                key={item.n}
                y={20}
                className="grid gap-6 border-b border-line py-10 lg:grid-cols-12 lg:gap-10 lg:py-14"
              >
                <div className="lg:col-span-5">
                  <div className="flex items-baseline gap-5">
                    <span className="font-mono text-eyebrow text-accent tabular-nums">
                      {item.n}
                    </span>
                    <p className="font-mono text-eyebrow tracking-wider text-faint uppercase">
                      {item.service}
                    </p>
                  </div>
                  <h3 className="mt-5 font-display text-h3 leading-[0.94] text-foreground">
                    {item.outcome}
                  </h3>
                </div>
                <p className="text-lead text-muted lg:col-span-4">
                  {item.copy}
                </p>
                <ul className="flex flex-col gap-3 lg:col-span-3">
                  {item.points.map((p) => (
                    <li
                      key={p}
                      className="flex items-start gap-3 text-small text-foreground"
                    >
                      <Tick className="mt-1 size-3.5 shrink-0 text-accent" />
                      {p}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </ol>

          <InlineCta location="services" className="mt-14" />
        </Container>
      </section>

      {/* ── 5. Why Sika ────────────────────────────────────────────────── */}
      <section aria-label="why" className="relative py-(--spacing-section)">
        <Container>
          <SectionHeading eyebrow={why.eyebrow} title={why.title} />

          <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:mt-24 lg:grid-cols-3 lg:gap-6">
            {why.items.map((item, i) => (
              <Reveal
                key={item.title}
                delay={(i % 3) * 0.08}
                className={
                  i === 0
                    ? "rounded-card border border-accent/40 bg-surface p-7 sm:col-span-2 lg:p-9"
                    : "rounded-card border border-line bg-surface p-7 lg:p-9"
                }
              >
                <h3 className="font-display text-h4 leading-[0.94] text-foreground">
                  {item.title}
                </h3>
                <p className="mt-4 text-body text-muted">{item.copy}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12 flex flex-wrap items-center gap-6">
            <GoogleReviewsBadge />
          </Reveal>
        </Container>
      </section>

      {/* ── 6. Testimonials (only when real) ───────────────────────────── */}
      {testimonials.length ? (
        <section
          aria-label="testimonials"
          className="relative bg-surface py-(--spacing-section)"
        >
          <Container>
            <SectionHeading
              eyebrow="In their words"
              title="What clients say."
            />
            <div className="mt-16 grid gap-5 lg:mt-24 lg:grid-cols-3">
              {testimonials.map((t) => (
                <Reveal
                  as="figure"
                  key={t.name}
                  className="rounded-card border border-line bg-background p-7 lg:p-9"
                >
                  <blockquote className="text-lead text-foreground">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-6 text-small text-muted">
                    <span className="text-foreground">{t.name}</span>,{" "}
                    {t.business}
                  </figcaption>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {/* ── 7. Process (approved homepage section, reused) ─────────────── */}
      <Process />

      {/* ── 8. Fit ─────────────────────────────────────────────────────── */}
      <section aria-label="fit" className="relative py-(--spacing-section)">
        <Container>
          <SectionHeading eyebrow={fit.eyebrow} title={fit.title} />

          <div className="mt-16 grid gap-5 lg:mt-24 lg:grid-cols-2 lg:gap-6">
            <Reveal className="rounded-card border border-accent/40 bg-surface p-7 lg:p-10">
              <p className="eyebrow text-accent">A good fit</p>
              <ul className="mt-7 flex flex-col gap-5">
                {fit.good.map((g) => (
                  <li
                    key={g}
                    className="flex items-start gap-4 text-lead text-foreground"
                  >
                    <Tick className="mt-1.5 size-4 shrink-0 text-accent" />
                    {g}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal
              delay={0.08}
              className="rounded-card border border-line p-7 lg:p-10"
            >
              <p className="eyebrow text-faint">Probably not for you</p>
              <ul className="mt-7 flex flex-col gap-5">
                {fit.bad.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-4 text-lead text-muted"
                  >
                    <Cross className="mt-1.5 size-4 shrink-0 text-faint" />
                    {b}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── 9. FAQ ─────────────────────────────────────────────────────── */}
      <section
        aria-label="faq"
        className="relative bg-surface py-(--spacing-section)"
      >
        <Container>
          <div className="lg:grid lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <Reveal y={14} className="flex items-center gap-4">
                <MarkAnchor size="w-3.5" />
                <p className="shrink-0 eyebrow text-accent">Questions</p>
                <Rule className="flex-1" delay={0.15} />
              </Reveal>
              <h2 className="mt-8 font-display text-h2 leading-[0.94] text-foreground">
                Before you ask.
              </h2>
              <InlineCta location="faq" className="mt-10 hidden lg:block" />
            </div>

            <div className="mt-14 border-t border-line lg:col-span-8 lg:mt-0">
              {faqs.map((f) => (
                <details key={f.q} className="group border-b border-line">
                  <summary className="duration-base flex cursor-pointer list-none items-center justify-between gap-6 py-6 font-display text-h4 leading-[1.1] text-foreground transition-colors hover:text-accent [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span
                      aria-hidden
                      className="after:duration-base relative size-4 shrink-0 text-accent before:absolute before:inset-x-0 before:top-1/2 before:h-0.5 before:-translate-y-1/2 before:bg-current after:absolute after:inset-y-0 after:left-1/2 after:w-0.5 after:-translate-x-1/2 after:bg-current after:transition-transform group-open:after:scale-y-0"
                    />
                  </summary>
                  <p className="max-w-text pb-7 text-body text-muted">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── 10. The form ───────────────────────────────────────────────── */}
      <section
        id={FORM_ID}
        aria-label="enquire"
        className="theme-blue grain relative scroll-mt-24 overflow-hidden bg-background py-(--spacing-section)"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(80% 90% at 20% 0%, rgb(255 255 255 / 0.10) 0%, transparent 60%), radial-gradient(70% 80% at 100% 100%, rgb(11 11 11 / 0.35) 0%, transparent 70%)",
          }}
        />

        <Container className="relative">
          <div className="lg:flex lg:items-start lg:gap-16 xl:gap-24">
            <div className="lg:min-w-0 lg:flex-1">
              <Reveal y={14} className="flex items-center gap-4">
                <MarkAnchor size="w-3.5" />
                <p className="shrink-0 eyebrow text-accent">
                  {enquire.eyebrow}
                </p>
                <Rule className="flex-1" delay={0.15} />
              </Reveal>

              <h2 className="mt-8 max-w-[16ch] font-display text-h2 leading-[0.94] text-foreground">
                {enquire.title}
              </h2>
              <p className="mt-7 max-w-text text-lead text-muted">
                {enquire.intro}
              </p>

              <p className="mt-10 font-mono text-eyebrow tracking-wider text-faint uppercase">
                What we check
              </p>
              <ul className="mt-5 flex flex-col gap-3.5">
                {enquire.checks.map((c) => (
                  <li
                    key={c}
                    className="flex items-start gap-3 text-body text-foreground"
                  >
                    <Tick className="mt-1.5 size-3.5 shrink-0 text-accent" />
                    {c}
                  </li>
                ))}
              </ul>

              <ol className="mt-10 grid gap-6 border-t border-line pt-8 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                {enquire.steps.map((s) => (
                  <li key={s.n}>
                    <span className="font-mono text-eyebrow text-accent tabular-nums">
                      {s.n}
                    </span>
                    <span className="mt-2 block font-display text-h4 leading-[0.94] text-foreground">
                      {s.t}
                    </span>
                    <span className="mt-2 block text-small text-muted">
                      {s.c}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-14 lg:mt-0 lg:w-[52%] lg:shrink-0">
              <div className="theme-light rounded-card bg-background p-7 shadow-[0_30px_80px_-30px_rgb(0_0_0/0.6)] sm:p-9 lg:p-11">
                <LeadForm />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Room for the mobile sticky bar over the footer. */}
      <div aria-hidden className="h-20 sm:hidden" />
      <StickyCta />
    </>
  );
}
