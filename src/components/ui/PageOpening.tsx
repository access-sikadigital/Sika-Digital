import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { SplitLines } from "@/components/motion/SplitLines";
import { Rule } from "@/components/motion/Rule";
import { MarkAnchor } from "@/components/motion/MarkFlight";
import { cn } from "@/lib/utils";

/**
 * PAGE OPENING — the masthead every page below the homepage starts with.
 *
 * Extracted after the fifth page, not the second. The bodies of these pages
 * are deliberately different from one another, but the masthead is not part of
 * that: it is the thing that tells you which site you are on, and six slightly
 * different versions of it would read as six slightly different sites.
 *
 * ── The width cap is a prop for a reason ────────────────────────────────────
 * `titleMax` looks like something that should have been a constant. It cannot
 * be. The headings run from four words to nine, and a cap that suits "Everything
 * we do, in one place." leaves "Google Ads that bring the right enquiries." on
 * four ragged lines. The number is a per-headline judgement, so it stays at the
 * call site where the headline is.
 *
 * ── Do not raise the heading past `text-h1` ─────────────────────────────────
 * It sits in a flex row beside the intro, and at h1 the display face runs about
 * 96px, which puts a ten-character word at roughly 620px. That is already close
 * to the widest column this layout gives it. See the note in
 * services/ServicesContent for the time this went wrong.
 */
export function PageOpening({
  eyebrow,
  title,
  intro,
  titleMax = "max-w-[15ch]",
}: {
  eyebrow: string;
  title: ReactNode;
  intro: ReactNode;
  /** Tailwind max-width in `ch`, tuned to the individual headline. */
  titleMax?: string;
}) {
  return (
    <Container>
      <Reveal y={14} className="flex items-center gap-4">
        <MarkAnchor size="w-3.5" />
        <p className="eyebrow shrink-0 text-accent">{eyebrow}</p>
        <Rule className="flex-1" delay={0.15} />
      </Reveal>

      <div className="mt-8 lg:flex lg:items-end lg:gap-16">
        <SplitLines
          as="h1"
          className={cn(
            "font-display text-h1 leading-[1.1] text-foreground lg:shrink-0",
            titleMax
          )}
        >
          {title}
        </SplitLines>

        <Reveal
          delay={0.12}
          className="mt-8 max-w-text lg:mt-0 lg:min-w-0 lg:flex-1 lg:border-l lg:border-line lg:pb-2 lg:pl-12"
        >
          <Rule className="mb-6 w-12 bg-accent" delay={0.3} />
          <p className="text-lead text-muted">{intro}</p>
        </Reveal>
      </div>
    </Container>
  );
}
