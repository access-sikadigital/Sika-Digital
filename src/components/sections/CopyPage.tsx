import Link from "next/link";
import type { ReactNode } from "react";
import { copyV1, type CopySection } from "@/config/copy-v1";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { PageOpening } from "@/components/ui/PageOpening";
import { Reveal } from "@/components/motion/Reveal";
import { SplitLines } from "@/components/motion/SplitLines";
import { CTA } from "@/components/sections/CTA";
import { ContactForm } from "@/components/forms/ContactForm";
import { cn } from "@/lib/utils";

/**
 * COPY PAGE
 *
 * Renders a page's V1 copy (config/copy-v1) with the site's existing blocks:
 * the page opening, split statement sections, numbered cards, and the blue
 * closing CTA. Every inner page uses it, so the copy is word for word from
 * the docs and the pages read as one site.
 *
 * Section shape decides the layout:
 *   · H2 + paragraphs              → heading left, copy right
 *   · H2 + H3 items                → heading, then numbered cards
 *   · the last H2                  → the closing CTA band (or, on Contact,
 *                                    the enquiry form)
 *
 * Mentions of other pages in cross-link sentences ("Explore Local SEO…")
 * become links, so the related-page lines in the docs actually go somewhere.
 */

/* Longest phrases first, so "Local SEO for Sydney" wins over "Local SEO". */
const LINKS: [string, string][] = [
  ["Local SEO for Sydney", "/local-seo-sydney/"],
  ["Local SEO for Brisbane", "/local-seo-brisbane/"],
  ["Web Design for Sydney", "/web-design-sydney/"],
  ["Web Design for Brisbane businesses", "/web-design-brisbane/"],
  ["Ecommerce Website Development", "/web-design/ecommerce/"],
  ["AI Consulting and Automation", "/ai-automation/"],
  ["Web Design and Development", "/web-design/"],
  ["Facebook and Instagram Ads", "/facebook-ads/"],
  [
    "digital marketing guide for tradies",
    "/guides/digital-marketing-for-tradies/",
  ],
  ["digital marketing for tradies", "/industries/tradies/"],
  ["marketing for electricians", "/industries/electricians/"],
  ["marketing for plumbers", "/industries/plumbers/"],
  ["marketing for builders", "/industries/builders/"],
  ["wider trade marketing approach", "/industries/tradies/"],
  ["wider industry overview", "/industries/"],
  ["Google Maps SEO guide", "/guides/google-maps-seo/"],
  ["SEO and AI search", "/seo/"],
  ["Small Business SEO", "/seo/small-business-seo/"],
  ["Conversion Rate Optimisation", "/conversion-rate-optimisation/"],
  ["Social Media Marketing", "/social-media-marketing/"],
  ["Reputation Management", "/reputation-management/"],
  ["WordPress Development", "/web-design/wordpress/"],
  ["Ecommerce Websites", "/web-design/ecommerce/"],
  ["Content Marketing", "/content-marketing/"],
  ["Email Marketing", "/email-marketing/"],
  ["Meta Advertising", "/facebook-ads/"],
  ["Lead Generation", "/lead-generation/"],
  ["PPC Management", "/google-ads/ppc-management/"],
  ["Ecommerce SEO", "/seo/ecommerce-seo/"],
  ["Website Design", "/web-design/"],
  ["AI Automation", "/ai-automation/"],
  ["SEO services", "/seo/"],
  ["SEO Audit", "/seo/seo-audit/"],
  ["Local SEO", "/seo/local-seo/"],
  ["Google Ads", "/google-ads/"],
  ["Web Design", "/web-design/"],
  ["our services", "/services/"],
  ["read about SIKA Digital", "/about/"],
  ["the guides", "/guides/"],
  ["SEO", "/seo/"],
];

/** H3 cards that are themselves a page (Industries hub, Services hub). */
const CARD_LINKS: Record<string, string> = {
  Tradies: "/industries/tradies/",
  Electricians: "/industries/electricians/",
  Plumbers: "/industries/plumbers/",
  Builders: "/industries/builders/",
  "SEO and AI search": "/seo/",
  "Paid advertising": "/google-ads/",
  "Lead generation": "/lead-generation/",
};

/** Sentences that point somewhere else, the only ones that get links. */
const CROSS_LINK =
  /^(Explore|Read |See |Looking for|Need |For |If your priority|If nearby|The review can|This work can|These pages|Our wider)/;

const linkClass =
  "text-foreground underline decoration-line-strong underline-offset-4 transition-colors duration-base hover:text-accent hover:decoration-accent";

function linkify(text: string, self: string): ReactNode[] {
  const out: ReactNode[] = [];
  const sentences = text.split(/(?<=[.?!])\s+/);

  sentences.forEach((sentence, si) => {
    if (si > 0) out.push(" ");

    /* Email addresses are always linked. */
    const email = /[\w.+-]+@[\w-]+\.[\w.]+/.exec(sentence);
    if (email) {
      const [a, b] = [
        sentence.slice(0, email.index),
        sentence.slice(email.index + email[0].length),
      ];
      out.push(
        a,
        <a key={`e${si}`} href={`mailto:${email[0]}`} className={linkClass}>
          {email[0]}
        </a>,
        b
      );
      return;
    }

    if (!CROSS_LINK.test(sentence)) {
      out.push(sentence);
      return;
    }

    let rest = sentence;
    let k = 0;
    while (rest) {
      let best: { i: number; phrase: string; href: string } | null = null;
      for (const [phrase, href] of LINKS) {
        if (href === self) continue;
        const re = new RegExp(
          `\\b${phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`
        );
        const m = re.exec(rest);
        if (
          m &&
          (!best ||
            m.index < best.i ||
            (m.index === best.i && phrase.length > best.phrase.length))
        ) {
          best = { i: m.index, phrase: m[0], href };
        }
      }
      if (!best) {
        out.push(rest);
        break;
      }
      out.push(rest.slice(0, best.i));
      out.push(
        <Link key={`l${si}-${k++}`} href={best.href} className={linkClass}>
          {best.phrase}
        </Link>
      );
      rest = rest.slice(best.i + best.phrase.length);
    }
  });

  return out;
}

/** Splits a closing heading into the CTA band's two drifting lines. */
function ctaHeading(h2: string) {
  const words = h2.split(" ");
  const accent = words.pop() ?? "";
  const mid = Math.ceil(words.length / 2);
  return {
    line1: words.slice(0, mid).join(" "),
    line2: words.slice(mid).join(" "),
    accent,
  };
}

function Paras({
  paras,
  self,
  lead = true,
  plain = false,
}: {
  paras: string[];
  self: string;
  lead?: boolean;
  /** No links: for text inside a card that is itself a link. */
  plain?: boolean;
}) {
  return (
    <>
      {paras.map((p, i) => (
        <p
          key={i}
          className={cn(
            i > 0 && "mt-6",
            lead && i === 0 ? "text-lead text-muted" : "text-body text-muted"
          )}
        >
          {plain ? p : linkify(p, self)}
        </p>
      ))}
    </>
  );
}

function Section({
  section,
  index,
  self,
}: {
  section: CopySection;
  index: number;
  self: string;
}) {
  const surface = index % 2 === 0;
  const hasItems = section.items.length > 0;
  const cols =
    section.items.length === 3
      ? "lg:grid-cols-3"
      : section.items.length === 1
        ? ""
        : "sm:grid-cols-2";

  return (
    <section
      className={cn(
        "py-(--spacing-section)",
        surface && "border-y border-line bg-surface"
      )}
    >
      <Container>
        {hasItems ? (
          <>
            <div className="lg:flex lg:items-end lg:gap-16">
              <SplitLines
                as="h2"
                className="max-w-[20ch] font-display text-h2 leading-[0.94] text-foreground lg:shrink-0"
              >
                {section.h2}
              </SplitLines>
              {section.paras.length ? (
                <Reveal
                  delay={0.1}
                  className="mt-8 max-w-text lg:mt-0 lg:min-w-0 lg:flex-1 lg:border-l lg:border-line lg:pb-2 lg:pl-12"
                >
                  <Paras paras={section.paras} self={self} />
                </Reveal>
              ) : null}
            </div>

            <div className={cn("mt-14 grid gap-4 lg:mt-20", cols)}>
              {section.items.map((item, i) => {
                const title = item.h3.replace(/^\d+\.\s*/, "");
                const target = CARD_LINKS[title];
                const href = target && target !== self ? target : undefined;
                const card = (
                  <>
                    <span className="block font-mono text-eyebrow text-accent tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      aria-hidden
                      className="duration-slow mt-6 block h-px w-full bg-line transition-colors ease-out-quart group-hover:bg-accent/40"
                    />
                    <h3 className="duration-base mt-6 max-w-[24ch] font-display text-h4 leading-[0.94] text-foreground transition-colors group-hover:text-accent">
                      {title}
                    </h3>
                    <div className="mt-4 max-w-xl">
                      <Paras
                        paras={item.paras}
                        self={self}
                        lead={false}
                        plain={Boolean(href)}
                      />
                    </div>
                  </>
                );
                const cardClass = cn(
                  "group duration-slow h-full rounded-card border border-line p-7 transition-colors ease-out-quart hover:border-accent lg:p-10",
                  surface ? "bg-background" : "bg-surface"
                );
                return (
                  <Reveal key={item.h3} delay={(i % 3) * 0.06}>
                    {href ? (
                      <Link href={href} className={cn(cardClass, "block")}>
                        {card}
                      </Link>
                    ) : (
                      <article className={cardClass}>{card}</article>
                    )}
                  </Reveal>
                );
              })}
            </div>

            {section.after.length ? (
              <Reveal className="mt-10 max-w-text border-t border-line pt-8">
                <Paras paras={section.after} self={self} lead={false} />
              </Reveal>
            ) : null}
          </>
        ) : (
          <div className="lg:flex lg:items-start lg:gap-16 xl:gap-24">
            <div className="lg:w-[46%] lg:shrink-0">
              <SplitLines
                as="h2"
                className="max-w-[18ch] font-display text-h2 leading-[0.94] text-foreground"
              >
                {section.h2}
              </SplitLines>
            </div>
            <Reveal
              delay={0.1}
              className="mt-10 max-w-text lg:mt-0 lg:min-w-0 lg:flex-1"
            >
              <Paras paras={section.paras} self={self} />
            </Reveal>
          </div>
        )}
      </Container>
    </section>
  );
}

export function CopyPage({ route }: { route: string }) {
  const page = copyV1[route];
  if (!page) throw new Error(`No V1 copy for ${route}`);

  const sections = page.sections.slice(0, -1);
  const closing = page.sections[page.sections.length - 1]!;
  const isContact = route === "/contact/";
  const heroHref = isContact
    ? "/contact/#enquire"
    : siteConfig.offer.primary.href;

  return (
    <main className="pt-32 lg:pt-40">
      <PageOpening
        eyebrow={page.eyebrow}
        title={page.h1}
        titleMax="max-w-[16ch]"
        intro={page.intro.join(" ")}
      />
      <Container className="mt-10 lg:mt-12">
        <Reveal delay={0.2}>
          <Button href={heroHref} size="lg">
            {page.cta || siteConfig.offer.primary.label}
          </Button>
        </Reveal>
      </Container>

      <div className="mt-24 lg:mt-36">
        {sections.map((s, i) => (
          <Section key={s.h2} section={s} index={i} self={route} />
        ))}
      </div>

      {isContact ? (
        <section id="enquire" className="scroll-mt-28 py-(--spacing-section)">
          <Container>
            <div className="lg:flex lg:items-start lg:gap-16 xl:gap-24">
              <div className="lg:w-[40%] lg:shrink-0">
                <SplitLines
                  as="h2"
                  className="max-w-[16ch] font-display text-h2 leading-[0.94] text-foreground"
                >
                  {closing.h2}
                </SplitLines>
                <div className="mt-8 max-w-text">
                  <Paras paras={closing.paras} self={route} />
                </div>
              </div>
              <div className="mt-12 lg:mt-0 lg:min-w-0 lg:flex-1">
                <div className="theme-light rounded-card bg-background p-7 sm:p-9 lg:p-11">
                  <ContactForm submitLabel={closing.cta} />
                </div>
              </div>
            </div>
          </Container>
        </section>
      ) : (
        <CTA
          copy={{
            eyebrow: "Start here",
            ...ctaHeading(closing.h2),
            copy: closing.paras.join(" "),
          }}
        />
      )}
    </main>
  );
}
