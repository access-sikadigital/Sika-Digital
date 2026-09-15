import { cn } from "@/lib/utils";

/**
 * SCHEMATICS — generated interface drawings.
 *
 * ── What these are for ──────────────────────────────────────────────────────
 * Three sections in the middle of the homepage were type with nothing else in
 * them, and there are no photographs of the work to put there. These are the
 * alternative: browser frames, ranking lists, charts and wiring diagrams drawn
 * as SVG.
 *
 * For an agency that builds websites and runs search, a drawn interface is
 * closer to the subject than a photograph would be. A stock picture of a
 * laptop says nothing; a wireframe of a page with a form on it is the thing
 * being sold. It also cannot look like stock, which matters on a site whose
 * argument is that generic loses work.
 *
 * ── What they are NOT ───────────────────────────────────────────────────────
 * They are not proof. A drawn dashboard is an illustration of a dashboard and
 * has no numbers in it that mean anything. Nothing here carries a figure that
 * could be read as a real result, and nothing here should ever be given one.
 * When real screenshots exist, these are what they replace.
 *
 * ── One visual language ─────────────────────────────────────────────────────
 * Every schematic on the site obeys the same four rules, which is what stops
 * six drawings in three sections reading as six different clip-art sets:
 *
 *   · 1px strokes, `line-strong`, never heavier
 *   · fills are `surface`, or nothing
 *   · exactly one lime element per drawing, on the thing that matters
 *   · no gradients, no shadows, no rounded-everything
 *
 * ── The `data-g` hooks ──────────────────────────────────────────────────────
 * Parts that animate carry `data-g`. The drawings themselves hold no motion:
 * the consuming section owns the timeline, because only the section knows when
 * its own content arrives and these have to land with it rather than on their
 * own schedule. Every drawing is complete and correct with no JavaScript.
 */

type SchematicProps = { className?: string };

const svg = "h-full w-full";

/**
 * A browser window with a landing page in it: hero block, copy, a form, and a
 * single lime call to action. The lime is on the button, because the button is
 * the only part of a website this section is actually claiming to care about.
 */
export function SiteFrame({ className }: SchematicProps) {
  return (
    <svg
      viewBox="0 0 340 230"
      className={cn(svg, className)}
      fill="none"
      aria-hidden
    >
      {/* Window */}
      <rect
        x="0.5"
        y="0.5"
        width="339"
        height="229"
        rx="7"
        className="fill-surface stroke-line-strong"
      />

      {/* Chrome */}
      <path d="M0 26h340" className="stroke-line-strong" />
      <circle cx="15" cy="13" r="2.5" className="fill-line-strong" />
      <circle cx="25" cy="13" r="2.5" className="fill-line-strong" />
      <circle cx="35" cy="13" r="2.5" className="fill-line-strong" />
      <rect
        x="50"
        y="8"
        width="120"
        height="10"
        rx="5"
        className="fill-line-strong/40"
      />

      {/* Nav */}
      <g className="fill-line-strong/50">
        <rect data-g="nav" x="16" y="42" width="34" height="5" rx="2.5" />
        <rect data-g="nav" x="58" y="42" width="26" height="5" rx="2.5" />
        <rect data-g="nav" x="92" y="42" width="30" height="5" rx="2.5" />
      </g>

      {/* Hero copy */}
      <g className="fill-foreground/75">
        <rect data-g="line" x="16" y="70" width="150" height="13" rx="2" />
        <rect data-g="line" x="16" y="90" width="110" height="13" rx="2" />
      </g>
      <g className="fill-line-strong/60">
        <rect data-g="line" x="16" y="116" width="168" height="5" rx="2.5" />
        <rect data-g="line" x="16" y="128" width="140" height="5" rx="2.5" />
      </g>

      {/* The button. The one lime thing in the drawing, and the one thing on a
          landing page the rest of the page exists to get pressed, so it is the
          one thing here that keeps moving. */}
      <rect
        data-g="cta"
        x="16"
        y="150"
        width="82"
        height="24"
        rx="12"
        className="sch sch-pulse fill-accent"
      />

      {/* Form panel */}
      <rect
        x="210"
        y="42"
        width="114"
        height="150"
        rx="5"
        className="stroke-line-strong"
      />
      <g className="fill-line-strong/45">
        <rect data-g="field" x="222" y="58" width="60" height="5" rx="2.5" />
        <rect data-g="field" x="222" y="72" width="90" height="14" rx="3" />
        <rect data-g="field" x="222" y="96" width="52" height="5" rx="2.5" />
        <rect data-g="field" x="222" y="110" width="90" height="14" rx="3" />
        <rect data-g="field" x="222" y="134" width="66" height="5" rx="2.5" />
        <rect data-g="field" x="222" y="148" width="90" height="14" rx="3" />
      </g>
      {/* A caret in the first field. The form is the point of the page, so the
          drawing should look like someone is part way through filling it. */}
      <rect
        x="226"
        y="75"
        width="1.5"
        height="8"
        className="sch sch-blink fill-accent"
      />

      <rect
        data-g="submit"
        x="222"
        y="170"
        width="90"
        height="12"
        rx="6"
        className="stroke-accent"
      />
    </svg>
  );
}

/**
 * A results page with five positions and one of them held. The held row is the
 * lime one and it is at the top, which is the entire claim the section makes
 * about search, drawn rather than asserted.
 */
export function RankList({ className }: SchematicProps) {
  const rows = [0, 1, 2, 3, 4];

  return (
    <svg
      viewBox="0 0 340 230"
      className={cn(svg, className)}
      fill="none"
      aria-hidden
    >
      <rect
        x="0.5"
        y="0.5"
        width="339"
        height="229"
        rx="7"
        className="fill-surface stroke-line-strong"
      />

      {/* Search field */}
      <rect
        x="16"
        y="16"
        width="308"
        height="26"
        rx="13"
        className="stroke-line-strong"
      />
      <circle cx="34" cy="29" r="5" className="stroke-line-strong" />
      <path d="M38 33l5 5" className="stroke-line-strong" />
      <rect
        x="50"
        y="26"
        width="96"
        height="6"
        rx="3"
        className="fill-line-strong/50"
      />

      {rows.map((r) => {
        const y = 60 + r * 34;
        const held = r === 0;

        return (
          <g key={r} data-g="row">
            {held && (
              <rect
                x="10"
                y={y - 8}
                width="320"
                height="30"
                rx="4"
                className="fill-accent/10"
              />
            )}
            <rect
              x="16"
              y={y}
              width={held ? 120 : 96 - r * 8}
              height="7"
              rx="3.5"
              className={
                held
                  ? "sch sch-extend fill-accent"
                  : "fill-foreground/45"
              }
            />
            <rect
              x="16"
              y={y + 13}
              width={held ? 210 : 180 - r * 14}
              height="4"
              rx="2"
              className="fill-line-strong/55"
            />
          </g>
        );
      })}
    </svg>
  );
}

/**
 * Enquiries by month. Deliberately unlabelled: no axis figures, no percentage,
 * no period. A drawn chart with numbers on it is a fabricated result, and this
 * one is on a live page for a real business.
 */
export function ReportChart({ className }: SchematicProps) {
  const bars = [26, 38, 33, 52, 47, 68, 84, 76, 104];

  return (
    <svg
      viewBox="0 0 340 230"
      className={cn(svg, className)}
      fill="none"
      aria-hidden
    >
      <rect
        x="0.5"
        y="0.5"
        width="339"
        height="229"
        rx="7"
        className="fill-surface stroke-line-strong"
      />

      {/* Header */}
      <rect
        x="16"
        y="18"
        width="74"
        height="7"
        rx="3.5"
        className="fill-foreground/70"
      />
      <rect
        x="264"
        y="16"
        width="60"
        height="12"
        rx="6"
        className="stroke-line-strong"
      />

      {/* Grid */}
      <g className="stroke-line-strong/45">
        <path d="M16 62h308" />
        <path d="M16 106h308" />
        <path d="M16 150h308" />
      </g>
      <path d="M16 194h308" className="stroke-line-strong" />

      {bars.map((h, i) => {
        const last = i === bars.length - 1;
        return (
          <rect
            key={i}
            data-g="bar"
            x={22 + i * 34}
            y={194 - h}
            width="20"
            height={h}
            rx="2"
            className={cn(
              "sch sch-bar",
              last ? "fill-accent" : "fill-line-strong"
            )}
            /* Offset per bar, and not a clean multiple of anything. Equal
               delays make nine bars breathe as one object; uneven ones make
               the row read as nine separate readings. */
            style={{ animationDelay: `${(i * 0.37) % 1.9}s` }}
          />
        );
      })}
    </svg>
  );
}

/**
 * The follow-up, as a wiring diagram. A form on the left, a set of things that
 * fire when it is submitted on the right, and a path joining them. The lime is
 * on the path rather than on any box, because the wiring is the product here
 * and the boxes are just tools.
 */
export function FlowNodes({ className }: SchematicProps) {
  return (
    <svg
      viewBox="0 0 340 230"
      className={cn(svg, className)}
      fill="none"
      aria-hidden
    >
      <rect
        x="0.5"
        y="0.5"
        width="339"
        height="229"
        rx="7"
        className="fill-surface stroke-line-strong"
      />

      {/* Source */}
      <rect
        x="20"
        y="94"
        width="82"
        height="42"
        rx="5"
        className="fill-background stroke-accent"
      />
      <rect
        x="32"
        y="108"
        width="44"
        height="5"
        rx="2.5"
        className="fill-accent"
      />
      <rect
        x="32"
        y="119"
        width="58"
        height="4"
        rx="2"
        className="fill-line-strong"
      />

      {/* The joins, drawn twice.

          The first pass is the wire: a solid line that is there whether or not
          anything is animating, so the diagram is complete and readable at
          rest. The second is the traffic: the same three paths again at full
          accent with a short dash chasing a long gap, which is the one honest
          way to draw flow along a curve without keyframing a dot's position.

          Two passes rather than dashing the wire itself, because a dashed wire
          with the animation paused is just a dotted line, and paused is the
          default state everywhere off screen. */}
      <g data-g="wire" className="stroke-accent/45">
        <path d="M102 115h38c8 0 8-58 16-58h52" />
        <path d="M102 115h106" />
        <path d="M102 115h38c8 0 8 58 16 58h52" />
      </g>

      <g aria-hidden className="stroke-accent" strokeWidth="1.75">
        <path
          className="sch sch-flow"
          d="M102 115h38c8 0 8-58 16-58h52"
        />
        <path
          className="sch sch-flow"
          style={{ animationDelay: "0.8s" }}
          d="M102 115h106"
        />
        <path
          className="sch sch-flow"
          style={{ animationDelay: "1.6s" }}
          d="M102 115h38c8 0 8 58 16 58h52"
        />
      </g>

      {/* Destinations */}
      {[
        { y: 38, w: 112 },
        { y: 96, w: 112 },
        { y: 154, w: 112 },
      ].map((n, i) => (
        <g key={i} data-g="node">
          <rect
            x="208"
            y={n.y}
            width={n.w}
            height="38"
            rx="5"
            className="fill-background stroke-line-strong"
          />
          <rect
            x="220"
            y={n.y + 12}
            width={54 - i * 8}
            height="5"
            rx="2.5"
            className="fill-foreground/60"
          />
          <rect
            x="220"
            y={n.y + 23}
            width={76 - i * 10}
            height="4"
            rx="2"
            className="fill-line-strong"
          />
        </g>
      ))}
    </svg>
  );
}

/**
 * The audit. Rows of things checked, three of them flagged. The lime is on the
 * flags, because the flags are what the first conversation is about.
 */
export function AuditRows({ className }: SchematicProps) {
  const rows = [
    { w: 170, flag: false },
    { w: 140, flag: true },
    { w: 196, flag: false },
    { w: 122, flag: true },
    { w: 158, flag: false },
    { w: 182, flag: true },
  ];

  return (
    <svg
      viewBox="0 0 340 230"
      className={cn(svg, className)}
      fill="none"
      aria-hidden
    >
      <rect
        x="0.5"
        y="0.5"
        width="339"
        height="229"
        rx="7"
        className="fill-surface stroke-line-strong"
      />

      <rect
        x="16"
        y="18"
        width="90"
        height="7"
        rx="3.5"
        className="fill-foreground/70"
      />
      <path d="M0 40h340" className="stroke-line-strong" />

      {rows.map((r, i) => {
        const y = 58 + i * 28;
        return (
          <g key={i} data-g="row">
            {r.flag ? (
              <>
                {/* The flags pulse in sequence rather than together, so the
                    panel reads as a list still being worked through. */}
                <rect
                  x="16"
                  y={y - 7}
                  width="14"
                  height="14"
                  rx="3"
                  className="sch sch-pulse fill-accent"
                  style={{ animationDelay: `${i * 0.45}s` }}
                />
                <path
                  d="M23 -3.5v5M23 3.5v1"
                  transform={`translate(0 ${y})`}
                  /* The mark sits on top of the lime chip, so it has to use
                     the token that means "ink on accent" rather than a raw
                     dark colour. In the light theme the accent becomes blue
                     and a hardcoded near-black would be unreadable on it. */
                  className="stroke-on-accent"
                />
              </>
            ) : (
              <rect
                x="16"
                y={y - 7}
                width="14"
                height="14"
                rx="3"
                className="stroke-line-strong"
              />
            )}
            <rect
              x="42"
              y={y - 3}
              width={r.w}
              height="6"
              rx="3"
              className={r.flag ? "fill-foreground/70" : "fill-line-strong"}
            />
          </g>
        );
      })}
    </svg>
  );
}

/* ───────────────────────────────────────────────────────────────────────────
   MARKS

   The small siblings of the panels above, for the four supporting service
   tiles. Those tiles are a quarter the size of the lead one, so the full
   drawings cannot simply be scaled down: a 1px stroke at a third of the size
   is a smudge, and six elements in a 110px box is noise.

   These are drawn for the size they render at instead. Same language, same one
   lime element, but three or four shapes each and nothing that needs to be
   read. They are marks, not diagrams. At this size a viewer should recognise
   the shape of the thing in a glance and never be tempted to squint at it.
   ─────────────────────────────────────────────────────────────────────────── */

/** SEO. A query and the position it returns. */
export function MarkRank({ className }: SchematicProps) {
  return (
    <svg
      viewBox="0 0 132 72"
      className={cn(svg, className)}
      fill="none"
      aria-hidden
    >
      <rect
        x="0.5"
        y="0.5"
        width="131"
        height="17"
        rx="8.5"
        className="stroke-line-strong"
      />
      <circle cx="13" cy="9" r="3.5" className="stroke-line-strong" />
      <path d="M15.8 11.8L18.5 14.5" className="stroke-line-strong" />
      <rect
        x="26"
        y="6"
        width="44"
        height="6"
        rx="3"
        className="fill-line-strong"
      />

      <g data-g="mark">
        <rect
          x="0"
          y="30"
          width="46"
          height="6"
          rx="3"
          className="sch sch-strong sch-extend fill-accent"
        />
        <rect
          x="0"
          y="41"
          width="104"
          height="4"
          rx="2"
          className="fill-line-strong"
        />
      </g>
      <g data-g="mark">
        <rect
          x="0"
          y="55"
          width="34"
          height="6"
          rx="3"
          className="fill-foreground/35"
        />
        <rect
          x="0"
          y="66"
          width="86"
          height="4"
          rx="2"
          className="fill-line-strong"
        />
      </g>
    </svg>
  );
}

/** Google Ads. A paid position and a hand on it. */
export function MarkAds({ className }: SchematicProps) {
  return (
    <svg
      viewBox="0 0 132 72"
      className={cn(svg, className)}
      fill="none"
      aria-hidden
    >
      <g data-g="mark">
        <rect x="0" y="2" width="20" height="12" rx="3" className="fill-accent" />
        <rect
          x="27"
          y="4"
          width="52"
          height="8"
          rx="4"
          className="fill-foreground/50"
        />
      </g>
      <rect
        data-g="mark"
        x="0"
        y="22"
        width="112"
        height="4"
        rx="2"
        className="fill-line-strong"
      />
      <rect
        data-g="mark"
        x="0"
        y="32"
        width="88"
        height="4"
        rx="2"
        className="fill-line-strong"
      />

      <g data-g="mark" className="stroke-line-strong">
        <path d="M0 50h132" />
      </g>

      {/* The click. Arrives from off the bottom-right corner, presses the ad,
          holds, then leaves. A nudge was enough on the full-size panels; at
          110px wide the pointer has to actually travel or there is nothing
          to see. */}
      <path
        data-g="mark"
        d="M86 44l22 22-9 1.5 5 11-5 2.5-5.5-11-7.5 6z"
        className="sch sch-strong sch-cursor fill-accent"
      />
    </svg>
  );
}

/** Paid social. A post and the response to it. */
export function MarkSocial({ className }: SchematicProps) {
  return (
    <svg
      viewBox="0 0 132 72"
      className={cn(svg, className)}
      fill="none"
      aria-hidden
    >
      <rect
        x="0.5"
        y="0.5"
        width="131"
        height="71"
        rx="6"
        className="stroke-line-strong"
      />

      <g data-g="mark">
        <circle cx="18" cy="17" r="7" className="fill-line-strong" />
        <rect
          x="32"
          y="11"
          width="40"
          height="5"
          rx="2.5"
          className="fill-foreground/45"
        />
        <rect
          x="32"
          y="20"
          width="26"
          height="4"
          rx="2"
          className="fill-line-strong"
        />
      </g>

      <rect
        data-g="mark"
        x="11"
        y="32"
        width="110"
        height="22"
        rx="4"
        className="fill-line-strong/70"
      />

      <g data-g="mark">
        {/* A ring thrown off the like, then the dot itself popping. The ring
            is what actually reads at this size: travel survives being drawn
            small, a 4px circle changing diameter does not. */}
        <circle
          cx="16"
          cy="63"
          r="4"
          className="sch sch-strong sch-ripple stroke-accent"
        />
        <circle
          cx="16"
          cy="63"
          r="4"
          className="sch sch-strong sch-pulse fill-accent"
        />
        <rect
          x="26"
          y="61"
          width="22"
          height="4"
          rx="2"
          className="fill-line-strong"
        />
        <circle cx="60" cy="63" r="4" className="stroke-line-strong" />
        <rect
          x="70"
          y="61"
          width="16"
          height="4"
          rx="2"
          className="fill-line-strong"
        />
      </g>
    </svg>
  );
}

/** Systems and automation. One thing in, three things out. */
export function MarkFlow({ className }: SchematicProps) {
  return (
    <svg
      viewBox="0 0 132 72"
      className={cn(svg, className)}
      fill="none"
      aria-hidden
    >
      <rect
        data-g="mark"
        x="0.5"
        y="24.5"
        width="34"
        height="23"
        rx="4"
        className="stroke-accent"
      />

      <g data-g="mark" className="stroke-accent/45">
        <path d="M35 36h14c6 0 6-28 12-28h16" />
        <path d="M35 36h42" />
        <path d="M35 36h14c6 0 6 28 12 28h16" />
      </g>

      {/* Traffic. Same two-pass treatment as the full diagram. */}
      <g aria-hidden className="stroke-accent" strokeWidth="1.6">
        <path
          className="sch sch-strong sch-flow"
          d="M35 36h14c6 0 6-28 12-28h16"
        />
        <path
          className="sch sch-strong sch-flow"
          style={{ animationDelay: "0.8s" }}
          d="M35 36h42"
        />
        <path
          className="sch sch-strong sch-flow"
          style={{ animationDelay: "1.6s" }}
          d="M35 36h14c6 0 6 28 12 28h16"
        />
      </g>

      {[2, 26, 50].map((y, i) => (
        <rect
          key={i}
          data-g="mark"
          x="77.5"
          y={y + 0.5}
          width="54"
          height="19"
          rx="4"
          className="fill-background stroke-line-strong"
        />
      ))}
    </svg>
  );
}

/**
 * The plan. Four bars on a timeline, in order, each starting where the shape
 * of the work says it should rather than all at zero.
 */
export function PlanSteps({ className }: SchematicProps) {
  const rows = [
    { x: 16, w: 150 },
    { x: 62, w: 176 },
    { x: 128, w: 130 },
    { x: 186, w: 138 },
  ];

  return (
    <svg
      viewBox="0 0 340 230"
      className={cn(svg, className)}
      fill="none"
      aria-hidden
    >
      <rect
        x="0.5"
        y="0.5"
        width="339"
        height="229"
        rx="7"
        className="fill-surface stroke-line-strong"
      />

      <rect
        x="16"
        y="18"
        width="68"
        height="7"
        rx="3.5"
        className="fill-foreground/70"
      />

      {/* Timeline */}
      <g className="stroke-line-strong/45">
        <path d="M16 44v170" />
        <path d="M97 44v170" />
        <path d="M178 44v170" />
        <path d="M259 44v170" />
      </g>

      {rows.map((r, i) => {
        const y = 74 + i * 34;
        const lead = i === 0;
        return (
          <g key={i}>
            {/* Every bar creeps, not just the lime one. A plan is four things
                moving at once, and animating only the highlighted row would
                say the other three are finished. */}
            <rect
              data-g="task"
              x={r.x}
              y={y}
              width={r.w}
              height="18"
              rx="4"
              className={cn(
                "sch sch-extend",
                lead ? "fill-accent" : "fill-line-strong"
              )}
              style={{ animationDelay: `${i * 0.6}s` }}
            />
          </g>
        );
      })}
    </svg>
  );
}
