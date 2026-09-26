import { metadataFor } from "@/lib/metadata";
import { getPage } from "@/config/pages";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { SplitLines } from "@/components/motion/SplitLines";
import { Rule } from "@/components/motion/Rule";
import { MarkAnchor } from "@/components/motion/MarkFlight";
import { ContactForm } from "@/components/forms/ContactForm";
import { Placeholder } from "@/components/ui/Placeholder";
import { AuditRows } from "@/components/graphics/Schematic";

export const metadata = metadataFor("contact");

/**
 * CONTACT.
 *
 * ── Why this page was built first ───────────────────────────────────────────
 * Every call to action on the site points here. Until this route existed, the
 * primary action on every page was a 404. Nothing else on a lead-generation
 * site matters if this one is missing.
 *
 * ── The page answers three questions, in this order ─────────────────────────
 * People arriving at a contact form are deciding whether to spend four minutes
 * on a company they have known for two. So:
 *
 *   1. What do I have to do?         The form, first, at the top, no preamble.
 *   2. What happens after I send it? The three steps beside it.
 *   3. What if I do not want a form? The direct details, underneath.
 *
 * The usual order is the reverse of this: a paragraph about the company, then
 * a map, then the form somewhere near the bottom. That order is written for
 * the business rather than for the person filling it in.
 *
 * ── No closing CTA ──────────────────────────────────────────────────────────
 * This page IS the call to action. A "get in touch" band at the bottom of the
 * get-in-touch page is a link to itself.
 */
export default function ContactPage() {
  const page = getPage("contact");

  return (
    <main className="pt-32 lg:pt-40">
      {/* ── Opening ────────────────────────────────────────────────────── */}
      <Container>
        <Reveal y={14} className="flex items-center gap-4">
          <MarkAnchor size="w-3.5" />
          <p className="eyebrow shrink-0 text-accent">Contact</p>
          <Rule className="flex-1" delay={0.15} />
        </Reveal>

        <div className="mt-8 lg:flex lg:items-end lg:gap-16">
          <SplitLines
            as="h1"
            className="max-w-[16ch] font-display text-h1 leading-[0.94] text-foreground lg:shrink-0"
          >
            {page.h1}
          </SplitLines>

          <Reveal
            delay={0.12}
            className="mt-8 max-w-text lg:mt-0 lg:min-w-0 lg:flex-1 lg:border-l lg:border-line lg:pb-2 lg:pl-12"
          >
            <Rule className="mb-6 w-12 bg-accent" delay={0.3} />
            <p className="text-lead text-muted">
              Not a brief. Not a budget. Just the thing that is not working.
              We will go and look at it before we reply.
            </p>
          </Reveal>
        </div>
      </Container>

      {/* ── The form, and what happens to it ───────────────────────────── */}
      <Container className="mt-20 lg:mt-28">
        <div className="lg:flex lg:items-start lg:gap-16 xl:gap-24">
          {/* ── The form, on paper ───────────────────────────────────────
              `theme-light` inverts every semantic token for this subtree, so
              nothing inside the form needed changing: `text-foreground` becomes
              ink, `border-line` becomes a light hairline, and the accent swaps
              from lime to blue because lime on white measures about 1.3:1 and
              is unreadable. That swap is the reason this is a theme class
              rather than a `bg-white` and a handful of overrides.

              It also does real work beyond looking different. The one thing on
              this page a visitor has to act on is now the one thing that is not
              the same colour as everything else. */}
          <div className="lg:w-[58%] lg:shrink-0">
            <div className="theme-light rounded-card bg-background p-7 sm:p-9 lg:p-11">
              <ContactForm />
            </div>
          </div>

          {/* ── What happens next ────────────────────────────────────────
              Beside the form rather than under it, so it is readable while
              someone is deciding whether to start typing. Under the form it
              only gets read by people who already decided. */}
          <aside className="mt-20 lg:mt-0 lg:min-w-0 lg:flex-1">
            <div className="rounded-card border border-line bg-surface p-7 lg:p-9">
              <p className="font-mono text-eyebrow uppercase tracking-wider text-faint">
                What happens next
              </p>

              <ol className="mt-7 flex flex-col gap-7">
                {[
                  {
                    n: "01",
                    t: "We go and look",
                    c: "Your site, your Google listing, your ad accounts. Before we reply, not during a call.",
                  },
                  {
                    n: "02",
                    t: "You get what we found",
                    c: "In writing, in plain language, with the order we would fix it in. Yours either way.",
                  },
                  {
                    n: "03",
                    t: "You decide",
                    c: "If the first fix is something you can do yourself, we will tell you that too.",
                  },
                ].map((s) => (
                  <li key={s.n} className="flex gap-5">
                    <span className="font-mono text-eyebrow tabular-nums text-accent">
                      {s.n}
                    </span>
                    <span className="min-w-0">
                      <span className="block font-display text-h4 leading-[0.94] text-foreground">
                        {s.t}
                      </span>
                      <span className="mt-2 block text-small text-muted">
                        {s.c}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>

              <div className="mt-8 border-t border-line pt-7">
                <AuditRows className="w-full" />
              </div>
            </div>

            {/* ── The other ways ───────────────────────────────────────────
                Rendered only when set. A contact page listing a blank phone
                number is worse than one that does not mention phones. */}
            <div className="mt-10 flex flex-col gap-6 border-t border-line pt-8">
              {siteConfig.email ? (
                <div>
                  <p className="font-mono text-eyebrow uppercase tracking-wider text-faint">
                    Or just email
                  </p>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="mt-2 inline-block font-display text-h4 break-all text-foreground underline decoration-line-strong underline-offset-[6px] transition-colors duration-base hover:text-accent hover:decoration-accent"
                  >
                    {siteConfig.email}
                  </a>
                </div>
              ) : null}

              {siteConfig.phone ? (
                <div>
                  <p className="font-mono text-eyebrow uppercase tracking-wider text-faint">
                    Or call
                  </p>
                  <a
                    href={siteConfig.phoneHref}
                    className="mt-2 inline-block font-display text-h4 text-foreground transition-colors duration-base hover:text-accent"
                  >
                    {siteConfig.phone}
                  </a>
                </div>
              ) : null}

              <p className="font-mono text-eyebrow uppercase tracking-wider text-faint">
                {siteConfig.homeCity}, working Australia wide
              </p>
            </div>
          </aside>
        </div>
      </Container>

      {/* ── Who picks it up ─────────────────────────────────────────────────
          One photo and two sentences. A contact page that names nobody is
          asking a stranger to write to an inbox. The credential does the work
          here: it is the one thing on this site a competitor cannot copy. */}
      <Container className="mt-28 lg:mt-36">
        <div className="rounded-card border border-line bg-surface p-7 sm:flex sm:items-center sm:gap-10 lg:p-10">
          <Placeholder
            ratio="1/1"
            index="01"
            label="John, on a job site or at a desk. Natural, not a studio headshot."
            className="w-full sm:w-56 sm:shrink-0"
          />

          <div className="mt-8 sm:mt-0">
            <p className="font-mono text-eyebrow uppercase tracking-wider text-faint">
              Who reads it
            </p>
            <p className="mt-4 max-w-lg text-lead text-foreground">
              {siteConfig.founder.name} reads every enquiry that comes through
              this page.
            </p>
            <p className="mt-4 max-w-lg text-body text-muted">
              Twelve years holding a licence before any of this. So when you
              describe a quiet month, or a phone that rings with the wrong jobs,
              it lands with someone who has had both.
            </p>
          </div>
        </div>
      </Container>

      <div className="h-28 lg:h-40" />
    </main>
  );
}
