import { metadataFor } from "@/lib/metadata";
import { Hero } from "@/components/sections/Hero";
import { ServiceTicker } from "@/components/sections/ServiceTicker";
import { TrustedBy } from "@/components/sections/TrustedBy";
import { IntroStatement } from "@/components/sections/IntroStatement";
import { ServicesList } from "@/components/sections/ServicesList";
import { Process } from "@/components/sections/Process";
import { Industries } from "@/components/sections/Industries";
import { CTA } from "@/components/sections/CTA";

export const metadata = metadataFor("home");

/**
 * HOMEPAGE
 *
 * ── The order, and why ──────────────────────────────────────────────────────
 *   1. Hero              Who this is and where.
 *   1b. Trusted by       Client logo band. Renders only once real logos
 *                        are in config/home.ts.
 *   2. Intro statement   What Sika actually does, in one sentence.
 *   3. Services          The five service lines, in priority order.
 *   4. Process           How an engagement runs. Removes the fear of the
 *                        unknown before anyone is asked to enquire.
 *   5. Industries        The trades wedge. The cheapest ground in the whole
 *                        keyword map and the one thing a generalist cannot
 *                        copy, so it sits on the homepage rather than three
 *                        clicks down.
 *   6. CTA               One decision, largest type on the page.
 *
 * Every section runs a DIFFERENT animation on purpose. A page where each
 * section fades up identically reads as a template. Here it is: converge,
 * scrubbed word brighten, masked row stagger, sticky card stack, clip-path
 * wipe, opposing drift.
 *
 * ── Surface rhythm ──────────────────────────────────────────────────────────
 * Sections alternate between the page background (ink) and one step lighter
 * (surface): ink, ink, surface, ink, surface, ink. Six sections on an identical
 * black field read as one long scroll with no sense of progress.
 *
 * These are SURFACE changes, not `theme-light`. A genuinely light section would
 * be a stronger rhythm, and it breaks the flying brand mark: the asterisk is
 * lime, and lime on white measures about 1.3:1, so it would vanish for the
 * length of that section. Making it work needs each MarkAnchor to declare a
 * tone and MarkFlight to tween its fill to match. Worth doing, not worth
 * guessing at before the section designs are settled.
 *
 * ── What is deliberately NOT here ───────────────────────────────────────────
 * There is no proof section. No case studies, no client logos, no statistics.
 *
 * That is Open Question #3 in the scope workbook, and it is the single biggest
 * gap on the site. The honest options were to leave it out or to invent
 * numbers, and inventing results for a real agency is not a placeholder, it is
 * a false claim that would go live and stay live.
 *
 * It belongs between Process and Industries. Once there are three to five real
 * client results with real figures, that is where they go.
 *
 * ── Copy status ─────────────────────────────────────────────────────────────
 * Headlines here are my drafting, written plainly rather than in agency
 * language. They still need John's pass, and the intro statement in
 * config/home.ts should be rewritten once the positioning one-liner
 * (Open Question #1) is settled.
 */
export default function HomePage() {
  return (
    <>
      <Hero video="/media/hero.mp4" poster="/media/hero-poster.jpg" />
      <ServiceTicker />
      <TrustedBy />
      <IntroStatement />
      <ServicesList />
      <Process />
      <Industries />
      <CTA />
    </>
  );
}
