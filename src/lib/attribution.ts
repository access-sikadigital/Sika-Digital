/**
 * CAMPAIGN ATTRIBUTION + CONVERSION EVENTS (client only)
 *
 * Used by the paid landing page. Two jobs:
 *
 *   1. Capture where a visitor came from (UTMs and click IDs) on arrival, and
 *      keep it for the session, so the lead form can send it with the enquiry
 *      even if the visitor has clicked around or the URL has been tidied.
 *   2. Fire conversion events in one place, to whichever tags are present.
 *
 * ── Why first touch AND last touch ──────────────────────────────────────────
 * Last touch (sessionStorage) is what the ad platforms count. First touch
 * (localStorage, 90 days) is what tells you which campaign actually found the
 * customer when they come back a week later from a brand search. Both are sent
 * to GoHighLevel; the CRM decides which to report on.
 *
 * Storage can throw (Safari private mode, blocked cookies). Every access is
 * wrapped, and a failure costs attribution, never the lead.
 */

export const ATTRIBUTION_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "utm_id",
  "gclid",
  "gbraid",
  "wbraid",
  "fbclid",
  "msclkid",
] as const;

export type Attribution = Partial<
  Record<(typeof ATTRIBUTION_KEYS)[number], string>
> & {
  landing_page?: string;
  referrer?: string;
  captured_at?: string;
};

const LAST = "sika_attr_last";
const FIRST = "sika_attr_first";
const FIRST_TTL = 90 * 24 * 60 * 60 * 1000;

function safe<T>(fn: () => T): T | undefined {
  try {
    return fn();
  } catch {
    return undefined;
  }
}

/** Read UTMs and click IDs from the current URL. Call once on page load. */
export function captureAttribution() {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);

  const found: Attribution = {};
  for (const key of ATTRIBUTION_KEYS) {
    const v = params.get(key);
    if (v) found[key] = v.slice(0, 200);
  }
  const hasCampaign = Object.keys(found).length > 0;

  const touch: Attribution = {
    ...found,
    landing_page: window.location.href.slice(0, 500),
    referrer: document.referrer.slice(0, 500) || undefined,
    captured_at: new Date().toISOString(),
  };

  /* Last touch: overwrite only when this visit carries campaign data, so an
     internal reload without UTMs does not wipe the ad click that started the
     session. */
  const existing = safe(() => sessionStorage.getItem(LAST));
  if (hasCampaign || !existing) {
    safe(() => sessionStorage.setItem(LAST, JSON.stringify(touch)));
  }

  /* First touch: keep the oldest within the TTL. */
  const first = safe(() =>
    JSON.parse(localStorage.getItem(FIRST) ?? "null")
  ) as Attribution | null | undefined;
  const stale =
    !first?.captured_at ||
    Date.now() - Date.parse(first.captured_at) > FIRST_TTL;
  if (stale) safe(() => localStorage.setItem(FIRST, JSON.stringify(touch)));
}

/** Flattened for a form payload: last touch plainly, first touch prefixed. */
export function readAttribution(): Record<string, string> {
  const out: Record<string, string> = {};
  const last = safe(() => JSON.parse(sessionStorage.getItem(LAST) ?? "{}")) as
    Attribution | undefined;
  const first = safe(() => JSON.parse(localStorage.getItem(FIRST) ?? "{}")) as
    Attribution | undefined;

  for (const [k, v] of Object.entries(last ?? {})) if (v) out[k] = String(v);
  for (const [k, v] of Object.entries(first ?? {}))
    if (v) out[`first_${k}`] = String(v);

  /* Meta's browser cookies, for Conversions API matching and dedupe. */
  const cookies = safe(() => document.cookie) ?? "";
  const fbp = /(?:^|; )_fbp=([^;]+)/.exec(cookies)?.[1];
  const fbc = /(?:^|; )_fbc=([^;]+)/.exec(cookies)?.[1];
  if (fbp) out.fbp = fbp;
  if (fbc) out.fbc = fbc;
  else if (out.fbclid && out.captured_at)
    out.fbc = `fb.1.${Date.parse(out.captured_at)}.${out.fbclid}`;

  return out;
}

/* ── Events ──────────────────────────────────────────────────────────────── */

type Gtag = (...args: unknown[]) => void;
type Fbq = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: Gtag;
    fbq?: Fbq;
  }
}

/** Push to the dataLayer. GTM, if installed, picks it up from there. */
export function pushEvent(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}

/**
 * A lead has been accepted by the server.
 *
 * Fired AFTER the API confirms delivery, never on button press: a conversion
 * that counts failed submissions teaches Smart Bidding to buy more of them.
 *
 * `eventId` is shared with the server-side Meta CAPI event, so Meta counts the
 * browser and server copies of this lead once.
 *
 * When GTM is installed, only the dataLayer event fires here and the tags in
 * GTM do the rest; firing gtag and fbq directly as well would double count.
 */
export function trackLead({
  eventId,
  trade,
  budget,
  email,
  phone,
}: {
  eventId: string;
  trade?: string;
  budget?: string;
  email?: string;
  phone?: string;
}) {
  pushEvent("generate_lead", {
    lead_event_id: eventId,
    lead_trade: trade,
    lead_budget: budget,
    form_id: "lp_call_request",
    /* For GTM's Google Ads enhanced conversions variable. */
    enhanced_conversion_data: { email, phone_number: phone },
  });

  if (process.env.NEXT_PUBLIC_GTM_ID) return;

  const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  const adsLabel = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL;

  if (window.gtag) {
    if (email || phone) {
      window.gtag("set", "user_data", {
        email: email || undefined,
        phone_number: phone || undefined,
      });
    }
    window.gtag("event", "generate_lead", { trade, budget });
    if (adsId && adsLabel) {
      window.gtag("event", "conversion", {
        send_to: `${adsId}/${adsLabel}`,
        transaction_id: eventId,
      });
    }
  }

  if (window.fbq) {
    window.fbq(
      "track",
      "Lead",
      { content_category: trade },
      { eventID: eventId }
    );
  }
}

/** Same-origin, unguessable enough for dedupe. */
export function newEventId() {
  return (
    safe(() => crypto.randomUUID()) ??
    `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`
  );
}

/** E.164-ish for AU numbers, for enhanced conversions. Best effort only. */
export function normalisePhoneAU(raw: string) {
  const digits = raw.replace(/[^\d+]/g, "");
  if (digits.startsWith("+")) return digits;
  if (digits.startsWith("61")) return `+${digits}`;
  if (digits.startsWith("0")) return `+61${digits.slice(1)}`;
  return digits;
}
