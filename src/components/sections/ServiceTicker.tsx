import Link from "next/link";
import { getPage } from "@/config/pages";
import { serviceTicker } from "@/config/home";
import { Logomark } from "@/components/brand/Logo";
import { Marquee } from "@/components/motion/Marquee";

/**
 * SERVICE TICKER — the lime band under the hero.
 *
 * The five core services, scrolling, each one a link to its page. It tells a
 * visitor what Sika does before they have read a sentence, and it gives the
 * homepage five direct internal links to the pages that most need to rank.
 *
 * ── Names come from config, hrefs from the IA ───────────────────────────────
 * The label is the name people use ("Meta Ads"); the link is resolved from the
 * page key through `getPage`, so it cannot point at a URL that has moved or no
 * longer exists. See `serviceTicker` in config/home.ts.
 *
 * ── Why the list is rendered twice inside one copy ──────────────────────────
 * Five names at this size run to about 1,400px. The marquee loops two copies
 * of its children, and if one copy is narrower than the viewport the band
 * shows a blank stretch before the loop resets. Two passes per copy keeps one
 * copy wider than any screen up to about 2,800px. The second pass is `inert`
 * and `aria-hidden`: a screen reader hears each service once, and a keyboard
 * user tabs through five links, not twenty.
 *
 * ── Relationship to the footer band ─────────────────────────────────────────
 * Same colour, type and separator as the capability band at the top of the
 * footer, so the page opens and closes on the same device. This one runs the
 * opposite direction to it, so the two do not read as a copy of each other.
 */
function Items({ hidden = false }: { hidden?: boolean }) {
  return (
    <span
      className="flex items-center gap-10"
      {...(hidden ? { "aria-hidden": true, inert: true } : {})}
    >
      {serviceTicker.map((item) => (
        <span key={item.key} className="flex items-center gap-10">
          <Link
            href={getPage(item.key).url}
            className="whitespace-nowrap font-display text-h4 leading-[1.2] underline-offset-[6px] decoration-2 transition-opacity duration-(--duration-base) hover:underline"
          >
            {item.label}
          </Link>
          <Logomark
            className="size-4 shrink-0"
            color="currentColor"
            decorative
          />
        </span>
      ))}
    </span>
  );
}

export function ServiceTicker() {
  return (
    <nav
      aria-label="Services"
      className="relative border-y border-on-accent/15 bg-accent py-5 text-on-accent"
    >
      <Marquee speed={38} reverse gap="2.5rem" pauseOnHover>
        <Items />
        <Items hidden />
      </Marquee>
    </nav>
  );
}
