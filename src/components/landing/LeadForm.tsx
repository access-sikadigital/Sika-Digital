"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";
import { budgetOptions, enquire, tradeOptions } from "@/config/landing";
import { Button } from "@/components/ui/Button";
import { useTrade } from "@/components/landing/LandingBehaviour";
import {
  newEventId,
  normalisePhoneAU,
  pushEvent,
  readAttribution,
  trackLead,
} from "@/lib/attribution";
import { cn } from "@/lib/utils";

/**
 * LANDING PAGE ENQUIRY FORM.
 *
 * Same visual language as the site's ContactForm (underlined fields, mono
 * labels, light card), but built for paid traffic:
 *
 *   · Posts to /api/lead/, which forwards to the GoHighLevel webhook
 *     server-side. The webhook URL never reaches the browser.
 *   · Sends UTMs, click IDs and first-touch source with every lead.
 *   · Fires the conversion only once the server has accepted the lead.
 *   · Asks two qualifying questions (trade, budget) so the pipeline can sort
 *     leads before anyone picks up the phone.
 *
 * ── Field count ─────────────────────────────────────────────────────────────
 * Seven visible fields, six required. Phone is required here, unlike on the
 * contact page: these are owner-operators who buy over the phone, and the
 * GHL speed-to-lead flow needs a number to text. Website is optional because
 * plenty of the target market does not have one worth the name.
 *
 * Labels sit above every field and stay visible while typing. Placeholders are
 * examples only, never the label.
 *
 * ── If the webhook is not configured ────────────────────────────────────────
 * The API answers 503 and the form hands the enquiry to the visitor's email
 * client, pre-written. Never a submit button that silently does nothing.
 */

type Status = "idle" | "sending" | "sent" | "error";

const fieldClass =
  "w-full border-b border-line bg-transparent py-3 text-body text-foreground transition-colors duration-base placeholder:text-faint focus:border-accent focus:outline-none aria-[invalid=true]:border-[var(--color-danger)]";

const labelClass =
  "block font-mono text-eyebrow uppercase tracking-wider text-faint";

function Select({
  id,
  label,
  options,
  value,
  onChange,
}: {
  id: string;
  label: string;
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className={labelClass} htmlFor={id}>
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          name={id}
          required
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            fieldClass,
            "appearance-none pr-8",
            !value && "text-faint"
          )}
        >
          <option value="" disabled>
            Choose one
          </option>
          {options.map((o) => (
            <option key={o} value={o} className="bg-background text-foreground">
              {o}
            </option>
          ))}
        </select>
        <svg
          viewBox="0 0 16 16"
          aria-hidden
          fill="none"
          className="pointer-events-none absolute top-1/2 right-0 size-4 -translate-y-1/2 text-accent"
        >
          <path
            d="M3 6l5 5 5-5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="square"
          />
        </svg>
      </div>
    </div>
  );
}

export function LeadForm({ className }: { className?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [trade, setTrade] = useState("");
  const [budget, setBudget] = useState("");
  const [started, setStarted] = useState(false);
  const fromUrl = useTrade();

  /* Pre-select the trade the ad was about, if the URL carried one. */
  useEffect(() => {
    if (fromUrl.option) setTrade((t) => t || fromUrl.option!);
  }, [fromUrl.option]);

  function onFirstInput() {
    if (started) return;
    setStarted(true);
    pushEvent("form_start", { form_id: "lp_enquiry" });
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    /* Honeypot: report success, send nothing. */
    if (data.get("company_website_url")) {
      setStatus("sent");
      return;
    }

    setStatus("sending");

    const eventId = newEventId();
    const fields = Object.fromEntries(
      [...data.entries()].filter(([k]) => k !== "company_website_url")
    ) as Record<string, string>;

    const payload = {
      ...fields,
      event_id: eventId,
      page_url: window.location.href,
      attribution: readAttribution(),
    };

    try {
      const res = await fetch("/api/lead/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.status === 503) {
        /* Webhook not configured: email fallback, no conversion fired. */
        const body = Object.entries(fields)
          .filter(([, v]) => v)
          .map(([k, v]) => `${k}: ${v}`)
          .join("\n");
        window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
          "Landing page enquiry"
        )}&body=${encodeURIComponent(body)}`;
        setStatus("sent");
        return;
      }

      if (!res.ok) throw new Error(String(res.status));

      trackLead({
        eventId,
        trade: fields.trade,
        budget: fields.budget,
        email: fields.email?.trim().toLowerCase(),
        phone: fields.phone ? normalisePhoneAU(fields.phone) : undefined,
      });

      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div
        role="status"
        className={cn(
          "rounded-card border border-accent p-8 lg:p-10",
          className
        )}
      >
        <p className="font-display text-h3 leading-[0.94] text-accent">
          {enquire.success.title}
        </p>
        <p className="mt-5 max-w-md text-lead text-muted">
          {enquire.success.copy}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      onInput={onFirstInput}
      aria-label="Enquiry"
      className={cn("relative flex flex-col gap-7", className)}
    >
      <div className="grid gap-7 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="lp-name">
            Your name *
          </label>
          <input
            id="lp-name"
            name="name"
            required
            autoComplete="name"
            className={fieldClass}
            placeholder="e.g. Jane Smith"
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="lp-business">
            Business name *
          </label>
          <input
            id="lp-business"
            name="business"
            required
            autoComplete="organization"
            className={fieldClass}
            placeholder="e.g. Smith Roofing"
          />
        </div>
      </div>

      <div className="grid gap-7 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="lp-phone">
            Mobile *
          </label>
          <input
            id="lp-phone"
            name="phone"
            type="tel"
            required
            inputMode="tel"
            autoComplete="tel"
            pattern="[0-9 +()\-]{8,20}"
            title="An Australian phone number, e.g. 0412 345 678"
            className={fieldClass}
            placeholder="e.g. 0412 345 678"
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="lp-email">
            Email *
          </label>
          <input
            id="lp-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={fieldClass}
            placeholder="e.g. jane@smithroofing.com.au"
          />
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="lp-website">
          Website{" "}
          <span className="tracking-normal normal-case">(if you have one)</span>
        </label>
        <input
          id="lp-website"
          name="website"
          type="text"
          inputMode="url"
          autoComplete="url"
          className={fieldClass}
          placeholder="e.g. smithroofing.com.au"
        />
      </div>

      <div className="grid gap-7 sm:grid-cols-2">
        <Select
          id="trade"
          label="Your trade *"
          options={tradeOptions}
          value={trade}
          onChange={setTrade}
        />
        <Select
          id="budget"
          label="Monthly marketing budget *"
          options={budgetOptions}
          value={budget}
          onChange={setBudget}
        />
      </div>

      {/* Honeypot. */}
      <div aria-hidden className="absolute -left-[9999px] opacity-0">
        <label htmlFor="lp-hp">Leave this field empty</label>
        <input
          id="lp-hp"
          name="company_website_url"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="flex flex-col items-start gap-4 pt-2">
        <Button
          type="submit"
          size="lg"
          disabled={status === "sending"}
          className="w-full sm:w-auto"
        >
          {status === "sending" ? "Sending" : enquire.submit}
        </Button>
        <p className="text-small text-faint">{enquire.reassurance}</p>
      </div>

      {status === "error" ? (
        <p role="alert" className="text-small text-foreground">
          That didn&apos;t go through. Email{" "}
          <a
            href={`mailto:${siteConfig.email}`}
            className="text-accent underline underline-offset-4"
          >
            {siteConfig.email}
          </a>{" "}
          instead and we&apos;ll pick it up.
        </p>
      ) : null}
    </form>
  );
}
