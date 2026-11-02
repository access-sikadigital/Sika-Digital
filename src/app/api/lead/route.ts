import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { z } from "zod";

/**
 * LEAD INTAKE — POST /api/lead/
 *
 * Receives the landing page form, validates it, and forwards it to the
 * GoHighLevel inbound webhook (GHL_WEBHOOK_URL). Server-side so the webhook URL
 * is never shipped to the browser and cannot be spammed directly.
 *
 * Optionally sends a matching server-side `Lead` event to the Meta Conversions
 * API, sharing `event_id` with the browser pixel so Meta counts it once.
 *
 * ── Responses ───────────────────────────────────────────────────────────────
 *   200  delivered to GHL
 *   400  failed validation
 *   502  GHL rejected it or could not be reached
 *   503  GHL_WEBHOOK_URL is not set. The form falls back to email on this, so
 *        an unconfigured environment never swallows a lead.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const text = (max: number) => z.string().trim().max(max);

const Lead = z.object({
  name: text(120).min(1),
  business: text(160).min(1),
  phone: text(30).min(8),
  email: z.string().trim().toLowerCase().email().max(200),
  website: text(300).optional().default(""),
  trade: text(80).min(1),
  budget: text(80).min(1),
  event_id: text(80).optional(),
  page_url: text(1000).optional(),
  attribution: z.record(z.string().max(1000)).optional().default({}),
});

const sha256 = (v: string) => createHash("sha256").update(v).digest("hex");

function splitName(full: string) {
  const [first, ...rest] = full.trim().split(/\s+/);
  return { first_name: first ?? "", last_name: rest.join(" ") };
}

function auPhoneDigits(raw: string) {
  const d = raw.replace(/\D/g, "");
  if (d.startsWith("61")) return d;
  if (d.startsWith("0")) return `61${d.slice(1)}`;
  return d;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid_json" },
      { status: 400 }
    );
  }

  const parsed = Lead.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "invalid",
        fields: parsed.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }
  const lead = parsed.data;

  const webhook = process.env.GHL_WEBHOOK_URL;
  if (!webhook) {
    console.error(
      "[lead] GHL_WEBHOOK_URL is not set. Lead NOT delivered; client will fall back to email.",
      { email: lead.email, business: lead.business }
    );
    return NextResponse.json(
      { ok: false, error: "not_configured" },
      { status: 503 }
    );
  }

  const a = lead.attribution;
  /* Flat keys, named the way GHL custom fields usually are, so mapping in the
     webhook trigger is one field per line. */
  const ghlPayload = {
    ...splitName(lead.name),
    full_name: lead.name,
    email: lead.email,
    phone: lead.phone,
    company_name: lead.business,
    website: lead.website,
    trade: lead.trade,
    monthly_budget: lead.budget,
    lead_source: "Landing page",
    form_id: "lp_enquiry",
    page_url: lead.page_url ?? "",
    event_id: lead.event_id ?? "",
    tags: ["lp-lead", `budget:${lead.budget}`, `trade:${lead.trade}`],
    ...a,
  };

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ghlPayload),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      console.error("[lead] GHL webhook rejected the lead", res.status);
      return NextResponse.json(
        { ok: false, error: "upstream" },
        { status: 502 }
      );
    }
  } catch (err) {
    console.error("[lead] GHL webhook unreachable", err);
    return NextResponse.json({ ok: false, error: "upstream" }, { status: 502 });
  }

  /* Meta CAPI. Best effort: a failure here must never fail the lead. */
  const pixel = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const token = process.env.META_CAPI_ACCESS_TOKEN;
  if (pixel && token && lead.event_id) {
    const { first_name, last_name } = splitName(lead.name);
    const user_data: Record<string, unknown> = {
      em: [sha256(lead.email)],
      ph: [sha256(auPhoneDigits(lead.phone))],
      fn: first_name ? [sha256(first_name.toLowerCase())] : undefined,
      ln: last_name ? [sha256(last_name.toLowerCase())] : undefined,
      country: [sha256("au")],
      client_user_agent: request.headers.get("user-agent") ?? undefined,
      client_ip_address:
        request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
        undefined,
      fbc: a.fbc,
      fbp: a.fbp,
    };
    try {
      await fetch(
        `https://graph.facebook.com/v21.0/${pixel}/events?access_token=${token}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            data: [
              {
                event_name: "Lead",
                event_time: Math.floor(Date.now() / 1000),
                event_id: lead.event_id,
                action_source: "website",
                event_source_url: lead.page_url,
                user_data,
                custom_data: { content_category: lead.trade },
              },
            ],
            ...(process.env.META_CAPI_TEST_EVENT_CODE
              ? { test_event_code: process.env.META_CAPI_TEST_EVENT_CODE }
              : {}),
          }),
          signal: AbortSignal.timeout(5_000),
        }
      );
    } catch (err) {
      console.error("[lead] Meta CAPI failed (lead was still delivered)", err);
    }
  }

  return NextResponse.json({ ok: true });
}
