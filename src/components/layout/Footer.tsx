import Link from "next/link";
import { primaryNav, serviceGroups } from "@/config/pages";
import { siteConfig } from "@/config/site";
import { Logo, Logomark } from "@/components/brand/Logo";
import { Container } from "@/components/ui/Container";
import { Marquee } from "@/components/motion/Marquee";

/**
 * FOOTER.
 *
 * A server component with no motion beyond the capability band — it renders on
 * every route, and a footer that animates on all 47 of them is noise.
 *
 * Service columns read from `serviceGroups`, the same config the header menu
 * and the /services hub use, so the three can never disagree about what Sika
 * offers or what a group is called.
 *
 * ── What this replaced, and why ─────────────────────────────────────────────
 * Three stacked bands separated by two rules, and three faults in it.
 *
 * It printed `serviceGroups.slice(0, 3)`. Two entire service lines were
 * missing from the footer of every page on the site, silently, because the
 * old layout only had room for three columns. A slice is the wrong way to fit
 * content into a layout: the layout has to fit the content.
 *
 * "Phone" rendered its label whether or not a number existed, so on the live
 * site there was a labelled column with nothing under it. A labelled empty
 * column does not read as "coming soon", it reads as broken. Every block below
 * is now conditional on having something to say.
 *
 * And "Start a project" reprinted the CTA note word for word, immediately
 * below the CTA section that already says it.
 *
 * ── The wordmark ────────────────────────────────────────────────────────────
 * Set to the full width of the container at the bottom. It is the last thing
 * on every page and the only place on the site the logotype appears at size.
 * Nothing else is asked of that band, which is the point: it is a signature,
 * not a component.
 *
 * ── Tap targets ─────────────────────────────────────────────────────────────
 * Link padding sits on the anchor (`block py-2`), not as spacing on the list
 * item. Inline links with margin between them produce ~34px targets AND leave
 * the gap dead — a tap between two links hits neither. Moving the space inside
 * the anchor makes the whole band live.
 */

const linkClass =
  "block py-1.5 text-small text-muted transition-all duration-base ease-out-quart hover:translate-x-1 hover:text-accent";

/**
 * Group headings.
 *
 * These were the `eyebrow` token: mono, ~11px, `text-faint`. At that size and
 * weight they sat below the links they were labelling, so six groups read as
 * one undifferentiated field of links with grey noise scattered through it.
 *
 * Display face at body size instead, in full `foreground`, with a rule under
 * it. Roughly 16px against 15px links is a small numeric jump doing a lot of
 * work: the weight and the colour are what actually separate them, and the
 * rule is what says a heading owns the list beneath it rather than floating
 * between two.
 *
 * ── Why not `text-lead` or `text-h4` ────────────────────────────────────────
 * Four columns at container width is about 276px each, and "Systems &
 * Automation" is twenty characters. In the display face it needs roughly
 * 200px at body size and close to 300 at lead, so anything larger wraps the
 * longest heading to two lines and unbalances the column it lands in.
 */
const headingClass =
  "mb-4 border-b border-line pb-3 font-display text-body text-foreground";

export function Footer() {
  const year = new Date().getFullYear();

  const socials = Object.entries(siteConfig.social).filter(([, url]) => url);

  return (
    <footer className="border-t border-line bg-background">
      {/* Capability band — the lime moment, once per page. */}
      <div className="border-b border-line bg-accent py-4 text-on-accent">
        <Marquee speed={34} gap="2.5rem">
          {[
            "SEO",
            "Google Ads",
            "Meta Ads",
            "Local SEO",
            "Web Design",
            "Lead Generation",
            "AI Automation",
          ].map((item) => (
            <span
              key={item}
              className="flex items-center gap-10 font-display text-h4"
            >
              {item}
              <Logomark
                className="size-4 shrink-0"
                color="currentColor"
                decorative
              />
            </span>
          ))}
        </Marquee>
      </div>

      <Container className="pt-14 lg:pt-20">
        {/* ── Brand and contact, on one line ────────────────────────────────
            These four pieces used to be a narrow column down the left. Four
            short lines in a fixed 28% column leaves a void under them that
            nothing can fill, and the taller the link area beside it got, the
            bigger that void became. Laid across the top instead, the row is
            full at both ends and the links below get the whole width. */}
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between sm:gap-12">
          <div>
            <Logo className="h-6" />
            <p className="mt-6 max-w-sm text-small text-muted">
              {siteConfig.tagline}
            </p>
          </div>

          {/*
            Contact details render only when set, rather than printing an empty
            string or a placeholder. A footer showing "TODO" or a blank tel:
            link on a live lead-gen site is worse than showing nothing.
          */}
          <div className="sm:text-right">
            {siteConfig.email ? (
              <a
                href={`mailto:${siteConfig.email}`}
                /* The largest text in the row on purpose. It is the one thing
                   in a footer anyone actually comes looking for, and at small
                   grey it was indistinguishable from a nav link. */
                className="inline-block font-display text-h4 break-all text-foreground underline decoration-line-strong underline-offset-[6px] transition-colors duration-base hover:text-accent hover:decoration-accent"
              >
                {siteConfig.email}
              </a>
            ) : null}

            {siteConfig.phone ? (
              <a
                href={siteConfig.phoneHref}
                className="mt-2 block font-display text-h4 text-foreground transition-colors duration-base hover:text-accent"
              >
                {siteConfig.phone}
              </a>
            ) : null}

            <p className="mt-5 font-mono text-eyebrow uppercase tracking-wider text-faint">
              {siteConfig.homeCity}, working Australia wide
            </p>
          </div>
        </div>

        {/* ── Everything the site has ──────────────────────────────────────
            CSS multi-column, not a grid.

            A grid aligns rows to the tallest cell in them, and these groups
            run from two items to six. Every short group therefore left a hole
            the height of the longest one beside it, which is most of the empty
            space this footer had. Columns flow instead: a group starts
            wherever the one above it finished.

            `break-inside-avoid` is what keeps a group whole. Without it the
            browser is free to split a list across a column boundary and leave
            a heading stranded at the foot of one column. */}
        <div className="mt-14 columns-1 gap-8 sm:columns-2 lg:mt-20 lg:columns-4">
          {serviceGroups.map((group) => (
            <nav
              key={group.label}
              aria-label={group.label}
              className="mb-9 break-inside-avoid"
            >
              <p className={headingClass}>{group.label}</p>
              <ul className="-my-1.5">
                {group.children.map((child) => (
                  <li key={child.href}>
                    <Link href={child.href} className={linkClass}>
                      {child.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <nav aria-label="Company" className="mb-9 break-inside-avoid">
            <p className={headingClass}>Company</p>
            <ul className="-my-1.5">
              {primaryNav.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* ── The signature ────────────────────────────────────────────────
            Full container width, and nothing else in the band. This is the
            only place on the site the logotype appears at size, and it is the
            last thing on every page.

            `aria-hidden` on the wrapper: the same mark is already announced at
            the top of this footer, and a screen reader does not need the
            company name twice in one landmark. */}
        <div aria-hidden className="mt-6 lg:mt-10">
          <Logo className="w-full" spin />
        </div>
      </Container>

      <Container className="mt-10 border-t border-line py-7 lg:mt-14">
        <div className="flex flex-col gap-4 text-small text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.legalName || siteConfig.name}
            {siteConfig.abn ? ` · ABN ${siteConfig.abn}` : ""}. All rights
            reserved.
          </p>

          {socials.length ? (
            <ul className="flex items-center gap-6">
              {socials.map(([name, url]) => (
                <li key={name}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-eyebrow uppercase tracking-wider transition-colors duration-base hover:text-accent"
                  >
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </Container>
    </footer>
  );
}
