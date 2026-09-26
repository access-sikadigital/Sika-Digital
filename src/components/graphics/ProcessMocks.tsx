import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * PROCESS MOCKS — one product panel per step of "How it works".
 *
 * Built in HTML rather than SVG, unlike the schematics, because these carry
 * real UI: text, chips, photos, a form. That makes them richer and keeps every
 * label crisp and selectable at any size.
 *
 * ── Figures are examples, and say so ────────────────────────────────────────
 * Any panel with numbers in it carries an "Example" chip in its header. The
 * figures show what the report looks like, not what a client achieved. When
 * real, publishable numbers exist (Open Question #3), they replace these.
 *
 * ── Animation hooks ─────────────────────────────────────────────────────────
 * The panels hold no motion of their own; the section owns the timeline.
 *
 *   data-grow-y   scales up from the foot (chart bars)
 *   data-grow-x   extends from the left (plan bars, audit score)
 *   data-count    counts up to the number it holds (e.g. data-count="54").
 *                 Optional data-prefix / data-suffix. The rendered text is the
 *                 final value too, so the figure is right with no JavaScript.
 *                 The target lives in the attribute, not read back from the
 *                 text, because undoing a count (StrictMode's double mount)
 *                 rewrites the text to 0.
 *   data-pop      rises in, staggered (rows, cards)
 *
 * The continuous loops (`sch-*`) are the shared ones from globals.css and only
 * run while the section carries `is-alive`.
 */

function Panel({
  title,
  badge,
  live,
  children,
  className,
}: {
  title: string;
  badge?: string;
  live?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-card border border-line-strong/70 bg-[rgb(255_255_255/0.035)] p-4 shadow-[0_40px_80px_-40px_rgb(0_0_0/0.9)] sm:p-5",
        className
      )}
    >
      <div className="flex items-center justify-between gap-3 border-b border-line pb-3">
        <div className="flex items-center gap-2">
          {live ? (
            <span className="sch sch-pulse block size-2 rounded-full bg-success shadow-[0_0_10px_rgb(62_207_142/0.8)]" />
          ) : null}
          <span className="font-mono text-[0.68rem] tracking-[0.14em] text-muted uppercase">
            {title}
          </span>
        </div>
        {badge ? (
          <span className="rounded-full border border-line-strong px-2 py-0.5 font-mono text-[0.6rem] tracking-[0.12em] text-faint uppercase">
            {badge}
          </span>
        ) : (
          <span aria-hidden className="flex gap-1">
            <span className="size-1.5 rounded-full bg-accent" />
            <span className="size-1.5 rounded-full bg-line-strong" />
            <span className="size-1.5 rounded-full bg-line-strong" />
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

/* ── 01 · The audit ─────────────────────────────────────────────────────── */

const AUDIT_ROWS: { label: string; value: string; ok: boolean }[] = [
  { label: "Mobile page speed", value: "5.8s", ok: false },
  { label: "Click-to-call on mobile", value: "Missing", ok: false },
  { label: "Conversion tracking", value: "Not firing", ok: false },
  { label: "Google Business Profile", value: "62% complete", ok: false },
  { label: "Ad spend on wrong searches", value: "Found", ok: false },
  { label: "Reviews", value: "Healthy", ok: true },
];

export function AuditMock() {
  return (
    <Panel title="Lead leak audit" badge="Example">
      <div className="mt-4 flex items-center gap-5">
        {/* Score ring. The arc is a stroke-dasharray, so it costs nothing to
            draw at any size. */}
        <div className="relative size-20 shrink-0">
          <svg viewBox="0 0 80 80" className="size-full -rotate-90" aria-hidden>
            <circle cx="40" cy="40" r="34" fill="none" stroke="var(--color-line)" strokeWidth="6" />
            <circle
              cx="40"
              cy="40"
              r="34"
              fill="none"
              stroke="var(--color-lime)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={`${0.54 * 213.6} 213.6`}
            />
          </svg>
          <span className="absolute inset-0 flex flex-col items-center justify-center">
            <span data-count="54" className="font-display text-2xl leading-none text-foreground">
              54
            </span>
            <span className="font-mono text-[0.55rem] text-faint">/ 100</span>
          </span>
        </div>
        <div>
          <p className="font-display text-lg leading-tight text-foreground">
            Enquiry health
          </p>
          <p className="mt-1 text-small text-muted">
            <span className="text-danger">5 leaks</span> costing you enquiries
          </p>
        </div>
      </div>

      <ul className="relative mt-4 divide-y divide-line overflow-hidden rounded-[0.6rem] border border-line">
        {/* Scan band, reading down the rows. */}
        <span
          aria-hidden
          className="sch sch-scan pointer-events-none absolute inset-x-0 top-0 h-[16.66%] bg-gradient-to-b from-transparent via-accent/10 to-transparent [--sch-scan-travel:500%]"
        />
        {AUDIT_ROWS.map((row) => (
          <li
            key={row.label}
            data-pop
            className="relative flex items-center justify-between gap-3 px-3 py-2.5"
          >
            <span className="flex items-center gap-2.5 text-small text-foreground/90">
              <span
                className={cn(
                  "flex size-4 shrink-0 items-center justify-center rounded-full text-[0.6rem] font-bold",
                  row.ok ? "bg-success/20 text-success" : "bg-danger/20 text-danger"
                )}
                aria-hidden
              >
                {row.ok ? "✓" : "!"}
              </span>
              {row.label}
            </span>
            <span
              className={cn(
                "font-mono text-[0.7rem]",
                row.ok ? "text-success" : "text-danger"
              )}
            >
              {row.value}
            </span>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

/* ── 02 · The plan ──────────────────────────────────────────────────────── */

const PLAN: { task: string; start: number; end: number; win?: boolean }[] = [
  { task: "Fix tracking & call tracking", start: 0, end: 2, win: true },
  { task: "Rebuild service pages", start: 1, end: 6 },
  { task: "Google Business Profile", start: 2, end: 7 },
  { task: "Google Ads, high intent only", start: 4, end: 12 },
  { task: "Meta retargeting", start: 7, end: 12 },
];
const WEEKS = 12;

export function PlanMock() {
  return (
    <Panel title="Your 90-day plan" badge="Example">
      <div className="mt-4">
        {/* Week ruler */}
        <div className="grid grid-cols-[7.5rem_1fr] gap-3 sm:grid-cols-[10rem_1fr]">
          <span />
          <div className="grid grid-cols-6 font-mono text-[0.58rem] text-faint">
            {["W1", "W3", "W5", "W7", "W9", "W11"].map((w) => (
              <span key={w}>{w}</span>
            ))}
          </div>
        </div>

        <ul className="mt-2 space-y-2.5">
          {PLAN.map((p) => (
            <li
              key={p.task}
              data-pop
              className="grid grid-cols-[7.5rem_1fr] items-center gap-3 sm:grid-cols-[10rem_1fr]"
            >
              <span className="truncate text-[0.78rem] text-foreground/85">{p.task}</span>
              <div className="relative h-6 rounded-[0.35rem] bg-[rgb(255_255_255/0.04)]">
                <span
                  data-grow-x
                  className={cn(
                    "absolute inset-y-0 flex origin-left items-center rounded-[0.35rem] px-2",
                    p.win
                      ? "bg-accent text-on-accent shadow-[0_0_18px_rgb(189_240_49/0.45)]"
                      : "bg-blue/80 text-paper"
                  )}
                  style={{
                    left: `${(p.start / WEEKS) * 100}%`,
                    width: `${((p.end - p.start) / WEEKS) * 100}%`,
                  }}
                >
                </span>
                {/* Outside the bar: a two-week bar is too short to hold it. */}
                {p.win ? (
                  <span
                    className="absolute top-1/2 ml-2 -translate-y-1/2 font-mono text-[0.55rem] font-medium tracking-wider whitespace-nowrap text-accent uppercase"
                    style={{ left: `${(p.end / WEEKS) * 100}%` }}
                  >
                    ← Quick win
                  </span>
                ) : null}
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-line pt-3">
          <span className="font-mono text-[0.6rem] tracking-[0.12em] text-faint uppercase">
            Ordered by
          </span>
          {["Cost to fix", "Enquiries recovered"].map((t) => (
            <span
              key={t}
              className="rounded-full border border-line-strong px-2 py-0.5 text-[0.7rem] text-muted"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </Panel>
  );
}

/* ── 03 · The build ─────────────────────────────────────────────────────── */

const CREATIVE = [
  { src: "/media/industries/electricians.jpg", hook: "Hook A" },
  { src: "/media/industries/plumbers.jpg", hook: "Hook B" },
  { src: "/media/industries/tradies.jpg", hook: "Hook C", win: true },
];

export function BuildMock() {
  return (
    <div className="grid gap-5">
      <div className="grid gap-5 lg:grid-cols-[1.25fr_1fr]">
        {/* Meta creative testing */}
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-[0.68rem] tracking-[0.14em] text-muted uppercase">
              Meta Ads · Creative
            </span>
            <span className="rounded-full border border-accent/50 bg-accent/10 px-2.5 py-0.5 font-mono text-[0.6rem] tracking-[0.12em] text-accent uppercase">
              Tested every month
            </span>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-3">
            {CREATIVE.map((c) => (
              <div key={c.hook} data-pop className="text-center">
                <div
                  className={cn(
                    "relative aspect-[9/14] overflow-hidden rounded-[0.7rem] border",
                    c.win
                      ? "border-accent shadow-[0_0_28px_-4px_rgb(189_240_49/0.55)]"
                      : "border-line-strong"
                  )}
                >
                  <Image
                    src={c.src}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 160px, 30vw"
                    className="object-cover"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" />
                  <span className="absolute bottom-2 left-2 rounded-[0.3rem] bg-ink/80 px-1.5 py-0.5 font-mono text-[0.55rem] text-paper">
                    {c.hook}
                  </span>
                  {c.win ? (
                    <span className="absolute top-2 left-2 rounded-[0.3rem] bg-accent px-1.5 py-0.5 font-mono text-[0.55rem] font-medium text-on-accent">
                      ★ Winner
                    </span>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Google search intent */}
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-[0.68rem] tracking-[0.14em] text-muted uppercase">
              Google Ads · Intent
            </span>
            <span className="rounded-full border border-blue bg-blue/30 px-2.5 py-0.5 font-mono text-[0.6rem] tracking-[0.12em] text-paper uppercase">
              High-intent search
            </span>
          </div>
          <div
            data-pop
            className="mt-3 rounded-card border border-line-strong/70 bg-[rgb(255_255_255/0.035)] p-4"
          >
            <div className="flex items-center gap-2 rounded-full border border-line-strong bg-ink/60 px-3 py-2 text-small text-foreground/90">
              <svg viewBox="0 0 16 16" className="size-3.5 text-faint" aria-hidden>
                <circle cx="7" cy="7" r="5" fill="none" stroke="currentColor" strokeWidth="1.6" />
                <path d="M11 11l3.5 3.5" stroke="currentColor" strokeWidth="1.6" />
              </svg>
              emergency electrician near me
              <span className="sch sch-blink -ml-1 block h-4 w-px bg-foreground" />
            </div>
            <div className="mt-4 space-y-1">
              <p className="text-[0.7rem] text-muted">
                <span className="font-semibold text-foreground">Sponsored</span> · yourbusiness.com.au
              </p>
              <p className="text-[0.95rem] leading-snug text-[#8ab4f8]">
                24/7 Emergency Electrician · On Site Fast, Fixed Pricing
              </p>
              <p className="text-[0.75rem] leading-snug text-muted">
                Licensed and insured. Call now and a sparky is on the way.
              </p>
            </div>
            <p className="mt-3 border-t border-line pt-3 text-[0.72rem] text-muted">
              <span className="font-semibold text-foreground">Top of page</span> for
              the searches that book jobs
            </p>
          </div>
        </div>
      </div>

      {/* Handoff */}
      <div className="flex flex-col items-center gap-2">
        <span className="rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 font-mono text-[0.62rem] tracking-[0.14em] text-accent uppercase">
          Both land on pages built to convert
        </span>
        <svg viewBox="0 0 12 22" className="h-5 w-3 text-accent" aria-hidden>
          <path
            className="sch sch-flow [--sch-dash:4_6] [--sch-period:10px]"
            d="M6 0v19"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path d="M2 15l4 5 4-5" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Landing pages, fanned */}
      <div className="relative mx-auto h-[11.5rem] w-full max-w-3xl sm:h-[19rem]">
        <LandingCard
          className="absolute top-8 left-0 hidden w-[42%] -rotate-6 opacity-70 sm:block"
          image="/media/industries/plumbers.jpg"
          headline="Blocked Drain? Fixed Today."
          cta="Book a plumber"
        />
        <LandingCard
          className="absolute top-8 right-0 hidden w-[42%] rotate-6 opacity-70 sm:block"
          image="/media/industries/builders.jpg"
          headline="Custom Homes, Built on Time."
          cta="Start your build"
        />
        <LandingCard
          className="absolute top-0 left-1/2 z-10 w-[88%] -translate-x-1/2 shadow-[0_40px_80px_-30px_rgb(0_0_0/0.95)] sm:w-[54%]"
          image="/media/industries/electricians.jpg"
          headline="Licensed Electricians Across Melbourne"
          cta="Get a quote"
          form
        />
      </div>
    </div>
  );
}

function LandingCard({
  className,
  image,
  headline,
  cta,
  form,
}: {
  className?: string;
  image: string;
  headline: string;
  cta: string;
  form?: boolean;
}) {
  return (
    <div
      data-pop
      className={cn(
        "overflow-hidden rounded-[0.7rem] border border-line-strong bg-ink",
        className
      )}
    >
      <div className="flex items-center gap-1 border-b border-line px-2.5 py-1.5">
        <span className="size-1.5 rounded-full bg-line-strong" />
        <span className="size-1.5 rounded-full bg-line-strong" />
        <span className="size-1.5 rounded-full bg-line-strong" />
        <span className="ml-2 h-2 w-24 rounded-full bg-[rgb(255_255_255/0.08)]" />
      </div>
      <div className="relative aspect-[16/10]">
        <Image src={image} alt="" fill sizes="(min-width: 640px) 420px, 90vw" className="object-cover" />
        <span className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/70 to-ink/20" />
        <div className="absolute inset-0 flex items-center justify-between gap-3 p-4">
          <div className="max-w-[60%]">
            <p className="font-display text-[clamp(0.85rem,2.2vw,1.25rem)] leading-[1.05] text-paper">
              {headline}
            </p>
            <span className="mt-3 inline-block rounded-[3px] bg-accent px-2.5 py-1 text-[0.62rem] font-bold text-on-accent uppercase">
              {cta}
            </span>
          </div>
          {form ? (
            <div className="hidden w-[34%] space-y-1.5 rounded-[0.4rem] bg-paper/95 p-2 sm:block">
              <span className="block h-1.5 w-2/3 rounded-full bg-ink/70" />
              <span className="block h-4 rounded-[2px] border border-ink/15" />
              <span className="block h-4 rounded-[2px] border border-ink/15" />
              <span className="block h-4 rounded-[2px] bg-blue" />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

/* ── 04 · The report ────────────────────────────────────────────────────── */

const KPIS: {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  delta: string;
  good: boolean;
}[] = [
  { label: "Enquiries", value: 68, delta: "▲ 41%", good: true },
  { label: "Cost per lead", value: 38, prefix: "$", delta: "▼ 27%", good: true },
  { label: "Jobs booked", value: 41, delta: "▲ 33%", good: true },
  { label: "Revenue tracked", value: 96, prefix: "$", suffix: "k", delta: "▲ 52%", good: true },
];

const BARS = [34, 42, 40, 55, 68, 88];

const LEADS: { who: string; job: string; source: "Google Ads" | "Meta Ads" | "Organic"; value: string }[] = [
  { who: "SK", job: "Switchboard upgrade", source: "Google Ads", value: "$4,200" },
  { who: "JT", job: "Bathroom renovation", source: "Meta Ads", value: "$18,500" },
  { who: "MP", job: "Blocked drain · urgent", source: "Organic", value: "$650" },
];

const SOURCE_STYLE = {
  "Google Ads": "border-blue bg-blue/35 text-paper",
  "Meta Ads": "border-accent/50 bg-accent/10 text-accent",
  Organic: "border-line-strong text-muted",
} as const;

export function ReportMock() {
  return (
    <Panel title="Leads · synced live" badge="Example" live>
      <div className="mt-4 grid grid-cols-2 gap-2.5">
        {KPIS.map((k) => (
          <div
            key={k.label}
            data-pop
            className="rounded-[0.6rem] border border-line bg-[rgb(255_255_255/0.025)] p-3"
          >
            <p className="font-mono text-[0.58rem] tracking-[0.12em] text-faint uppercase">
              {k.label}
            </p>
            <p className="mt-1 font-display text-2xl leading-none text-foreground">
              <span data-count={k.value} data-prefix={k.prefix ?? ""} data-suffix={k.suffix ?? ""}>
                {k.prefix}
                {k.value}
                {k.suffix}
              </span>
            </p>
            <p className={cn("mt-1 font-mono text-[0.62rem]", k.good ? "text-success" : "text-danger")}>
              {k.delta}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-4 border-t border-line pt-3">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[0.6rem] tracking-[0.12em] text-faint uppercase">
            Enquiries by month
          </span>
          <span className="font-mono text-[0.6rem] text-success">▲ compounding</span>
        </div>
        <div className="mt-3 flex h-24 items-end gap-2">
          {BARS.map((h, i) => {
            const last = i === BARS.length - 1;
            return (
              <div key={i} className="flex h-full flex-1 flex-col items-center justify-end gap-1">
                <span
                  data-grow-y
                  className={cn(
                    "block w-full origin-bottom rounded-t-[0.3rem]",
                    last
                      ? "bg-accent shadow-[0_0_24px_rgb(189_240_49/0.5)]"
                      : "bg-gradient-to-t from-blue/70 to-blue"
                  )}
                  style={{ height: `${h}%` }}
                />
                <span className="font-mono text-[0.55rem] text-faint">M{i + 1}</span>
              </div>
            );
          })}
        </div>
      </div>

      <ul className="mt-4 divide-y divide-line border-t border-line">
        {LEADS.map((l) => (
          <li key={l.who} data-pop className="flex items-center gap-3 py-2.5">
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue to-[#4b4de0] font-mono text-[0.6rem] text-paper">
              {l.who}
            </span>
            <span className="min-w-0 flex-1 truncate text-[0.8rem] text-foreground/90">
              {l.job}
            </span>
            <span
              className={cn(
                "hidden rounded-full border px-2 py-0.5 font-mono text-[0.58rem] sm:inline",
                SOURCE_STYLE[l.source]
              )}
            >
              {l.source}
            </span>
            <span className="font-display text-[0.85rem] text-foreground">{l.value}</span>
          </li>
        ))}
      </ul>

      <div className="mt-3 flex flex-wrap items-center gap-1.5 border-t border-line pt-3">
        <span className="mr-1 font-mono text-[0.58rem] tracking-[0.12em] text-faint uppercase">
          Works with
        </span>
        {["GoHighLevel", "HubSpot", "ServiceM8", "Pipedrive"].map((t) => (
          <span
            key={t}
            className="rounded-full border border-line-strong px-2 py-0.5 text-[0.65rem] text-muted"
          >
            {t}
          </span>
        ))}
      </div>
    </Panel>
  );
}
