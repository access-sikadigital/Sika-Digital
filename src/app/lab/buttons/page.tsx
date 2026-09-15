import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

/**
 * BUTTON LAB — not part of the site.
 *
 * A scratch page for choosing a call-to-action treatment by looking at them
 * rather than by describing them. Every option below is live: hover each one.
 *
 * ⚠️  DELETE THIS ROUTE once a direction is picked. It is `noindex` and linked
 *     from nowhere, so it will not be crawled or found, but it is still a page
 *     that ships and it has no business being in the build.
 */
export const metadata = {
  title: "Button lab",
  robots: { index: false, follow: false },
};

const LABEL = "Find my missing leads";

function Arrow({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={cn("size-[1.1em] shrink-0", className)}
      fill="none"
      aria-hidden
    >
      <path
        d="M1.5 8h12M9 3.5L13.5 8 9 12.5"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="square"
      />
    </svg>
  );
}

function Option({
  n,
  name,
  note,
  children,
}: {
  n: string;
  name: string;
  note: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-t border-line py-14">
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-eyebrow tabular-nums text-accent">
          {n}
        </span>
        <h2 className="font-display text-h4 uppercase text-foreground">
          {name}
        </h2>
      </div>
      <p className="mt-2 max-w-text text-small text-muted">{note}</p>
      <div className="mt-8 flex flex-wrap items-center gap-6">{children}</div>
    </div>
  );
}

export default function ButtonLab() {
  return (
    <main className="py-32">
      <Container>
        <p className="eyebrow text-accent">Scratch page</p>
        <h1 className="mt-6 max-w-[16ch] font-display text-h1 uppercase leading-[0.94] text-foreground">
          Pick a button.
        </h1>
        <p className="mt-6 max-w-text text-lead text-muted">
          Hover each one. Tell me the number and I will make it the real
          button everywhere, then delete this page.
        </p>

        <div className="mt-20">
          {/* ── 01 ─────────────────────────────────────────────────────── */}
          <Option
            n="01"
            name="Split block"
            note="What is on the site right now. Square block divided into a label cell and an arrow cell. Fill wipes up, label swaps, arrow travels. Same divider device as the section headings and the schematics."
          >
            <Button href="/contact/" size="lg">
              {LABEL}
            </Button>
            <Button href="/contact/" size="lg" variant="outline">
              {LABEL}
            </Button>
          </Option>

          {/* ── 02 ─────────────────────────────────────────────────────── */}
          <Option
            n="02"
            name="Editorial underline"
            note="No box at all. The type is the button. A lime rule sweeps in under it and the arrow steps right. Quietest option and the most confident, but it is easy to miss on a page with a lot going on."
          >
            <a
              href="/contact/"
              className="group relative inline-flex items-center gap-4 border-b-2 border-line-strong pb-3 font-display text-h4 uppercase tracking-wide text-foreground"
            >
              {LABEL}
              <Arrow className="transition-transform duration-slow ease-out-quart group-hover:translate-x-1.5" />
              <span
                aria-hidden
                className="absolute -bottom-0.5 left-0 block h-0.5 w-full origin-left scale-x-0 bg-accent transition-transform duration-slow ease-out-quart group-hover:scale-x-100"
              />
            </a>
          </Option>

          {/* ── 03 ─────────────────────────────────────────────────────── */}
          <Option
            n="03"
            name="Bracketed"
            note="Four corner ticks that close in on hover, like something being targeted. Hard-edged and technical, and it matches the schematic drawings more literally than anything else here."
          >
            <a
              href="/contact/"
              className="group relative inline-flex items-center gap-4 px-9 py-5 font-display text-h4 uppercase tracking-wide text-foreground transition-colors duration-slow group-hover:text-accent"
            >
              {[
                "left-0 top-0 border-l-2 border-t-2 group-hover:translate-x-1 group-hover:translate-y-1",
                "right-0 top-0 border-r-2 border-t-2 group-hover:-translate-x-1 group-hover:translate-y-1",
                "left-0 bottom-0 border-b-2 border-l-2 group-hover:translate-x-1 group-hover:-translate-y-1",
                "right-0 bottom-0 border-b-2 border-r-2 group-hover:-translate-x-1 group-hover:-translate-y-1",
              ].map((pos) => (
                <span
                  key={pos}
                  aria-hidden
                  className={cn(
                    "absolute size-4 border-accent transition-transform duration-slow ease-out-quart",
                    pos
                  )}
                />
              ))}
              <span className="transition-colors duration-slow ease-out-quart group-hover:text-accent">
                {LABEL}
              </span>
              <Arrow className="text-accent transition-transform duration-slow ease-out-quart group-hover:translate-x-1.5" />
            </a>
          </Option>

          {/* ── 04 ─────────────────────────────────────────────────────── */}
          <Option
            n="04"
            name="Slab"
            note="Full width of its container, label one end and arrow the other, lime wiping across from the left. Enormous target, impossible to miss. Right for the closing section, too heavy for a header."
          >
            <a
              href="/contact/"
              className="group relative flex w-full items-center justify-between overflow-hidden border border-line-strong px-8 py-8 md:px-12"
            >
              <span
                aria-hidden
                className="absolute inset-0 -z-10 -translate-x-full bg-accent transition-transform duration-slower ease-out-quart group-hover:translate-x-0"
              />
              <span className="relative font-display text-h3 uppercase leading-none text-foreground transition-colors duration-slow ease-out-quart group-hover:text-on-accent">
                {LABEL}
              </span>
              <Arrow className="relative size-8 text-accent transition-all duration-slow ease-out-quart group-hover:translate-x-2 group-hover:text-on-accent" />
            </a>
          </Option>

          {/* ── 05 ─────────────────────────────────────────────────────── */}
          <Option
            n="05"
            name="Outline, floods"
            note="Lime outline and lime type on nothing, flooding to a solid lime block from the bottom edge. The lightest-looking of the boxed options until you touch it."
          >
            <a
              href="/contact/"
              className="group relative isolate inline-flex min-h-14 items-center gap-4 overflow-hidden rounded-button border border-accent px-8 font-display text-body uppercase tracking-wide text-accent transition-colors duration-slow ease-out-quart hover:text-on-accent"
            >
              <span
                aria-hidden
                className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-accent transition-transform duration-slow ease-out-quart group-hover:scale-y-100"
              />
              {LABEL}
              <Arrow className="transition-transform duration-slow ease-out-quart group-hover:translate-x-1.5" />
            </a>
          </Option>

          {/* ── 06 ─────────────────────────────────────────────────────── */}
          <Option
            n="06"
            name="Flat pill, no disc"
            note="The button you already had, with only the two things that were actually wrong fixed: the muddy translucent disc is gone and the arrow is drawn rather than typed. Here in case the shape was never the problem."
          >
            <a
              href="/contact/"
              className="group relative isolate inline-flex min-h-14 items-center gap-4 overflow-hidden rounded-full bg-accent px-9 font-display text-body uppercase tracking-wide text-on-accent"
            >
              <span
                aria-hidden
                className="absolute inset-0 -z-10 translate-y-full bg-foreground transition-transform duration-slow ease-out-quart group-hover:translate-y-0"
              />
              {LABEL}
              <Arrow className="transition-transform duration-slow ease-out-quart group-hover:translate-x-1.5" />
            </a>
          </Option>
        </div>
      </Container>
    </main>
  );
}
