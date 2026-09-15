import { Archivo, Archivo_Black, JetBrains_Mono } from "next/font/google";

/**
 * TYPE PAIRING — from Sika's own brand kit.
 *
 * The brand folder ships Archivo (variable, weight + width) and Archivo Black
 * as TTFs. Both are on Google Fonts under the SIL Open Font License, so
 * `next/font/google` is used rather than self-hosting the supplied files:
 *
 *   · next/font downloads and self-hosts the files AT BUILD TIME, so there is
 *     no request to Google at runtime and no privacy or latency cost. It is
 *     self-hosting, just automated.
 *   · It generates a size-adjusted fallback automatically, which removes the
 *     layout shift when the real face swaps in. Doing that by hand means
 *     measuring cap heights and writing @font-face descriptors yourself.
 *   · Subsetting and preloading are handled.
 *
 * ── Why Archivo rather than the reference sites' faces ──────────────────────
 * The agency sites in the reference set use licensed families (PP Neue
 * Montreal, Kamerik, Akkurat Mono). Archivo reaches the same territory because
 * it carries a WIDTH axis as well as weight — `font-stretch` gives the
 * condensed display setting those faces are chosen for. Free, and it is what
 * Sika's own brand guidelines specify, so there is no conflict to resolve.
 */

/**
 * Body, UI and anything that has to be read at length.
 *
 * `axes: ["wdth"]` opts into the width axis. Without it next/font ships weight
 * only and `font-stretch` silently does nothing.
 */
export const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
  axes: ["wdth"],
});

/**
 * Display. A separate family, not a weight of Archivo — Archivo Black is drawn
 * with its own proportions rather than being the top of the variable range.
 *
 * Single weight by definition, so `weight` is required.
 */
export const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  variable: "--font-archivo-black",
  display: "swap",
  weight: "400",
});

/**
 * Mono companion, for eyebrows, labels, stat figures and form hints.
 *
 * This is the one face NOT in the brand kit, and it is a deliberate addition:
 * the mono-caps label against huge display type is the texture that makes the
 * reference sites feel considered, and Archivo has no mono cut. JetBrains Mono
 * is OFL, has a true italic and real tabular figures, and is neutral enough not
 * to argue with Archivo's geometry.
 *
 * Weights are capped — a mono used for labels never needs nine of them, and
 * every extra weight is another file.
 */
export const monoCompanion = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-companion",
  display: "swap",
  weight: ["400", "500"],
});

/** Every font variable, for the <html> className in the root layout. */
export const fontVariables = [
  archivo.variable,
  archivoBlack.variable,
  monoCompanion.variable,
].join(" ");
