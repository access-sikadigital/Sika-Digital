"use client";

import { useState } from "react";
import { siteConfig } from "@/config/site";
import { callRequest } from "@/config/landing";
import { Button } from "@/components/ui/Button";
import {
  newEventId,
  normalisePhoneAU,
  pushEvent,
  readAttribution,
  trackLead,
} from "@/lib/attribution";
import { cn } from "@/lib/utils";

/**
 * Call-request form, shown in the booking dialog until a calendar link is
 * configured. Four required fields, one optional.
 *
 * Posts to /api/lead/ (GoHighLevel webhook) with UTMs and click IDs. The
 * conversion fires only after the server accepts the lead. If the webhook is
 * not configured the API answers 503 and the form hands the enquiry to the
 * visitor's email client, so a request is never silently dropped.
 */

type Status = "idle" | "sending" | "sent" | "error";

const fieldClass =
  "w-full border-b border-line bg-transparent py-3 text-body text-foreground transition-colors duration-base placeholder:text-faint focus:border-accent focus:outline-none";
const labelClass =
  "block font-mono text-eyebrow uppercase tracking-wider text-faint";

export function CallRequestForm({ className }: { className?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [started, setStarted] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    if (data.get("company_website_url")) {
      setStatus("sent");
      return;
    }

    setStatus("sending");
    const eventId = newEventId();
    const fields = Object.fromEntries(
      [...data.entries()].filter(([k]) => k !== "company_website_url")
    ) as Record<string, string>;

    try {
      const res = await fetch("/api/lead/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...fields,
          event_id: eventId,
          page_url: window.location.href,
          attribution: readAttribution(),
        }),
      });

      if (res.status === 503) {
        const body = Object.entries(fields)
          .filter(([, v]) => v)
          .map(([k, v]) => `${k}: ${v}`)
          .join("\n");
        window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
          "Discovery call request"
        )}&body=${encodeURIComponent(body)}`;
        setStatus("sent");
        return;
      }
      if (!res.ok) throw new Error(String(res.status));

      trackLead({
        eventId,
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
      <div role="status" className={cn("border-t border-line pt-8", className)}>
        <p className="font-display text-h4 leading-[0.94] text-accent">
          {callRequest.success.title}
        </p>
        <p className="mt-4 text-body text-muted">{callRequest.success.copy}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      onInput={() => {
        if (started) return;
        setStarted(true);
        pushEvent("form_start", { form_id: "lp_call_request" });
      }}
      aria-label="Discovery call request"
      className={cn("relative flex flex-col gap-6", className)}
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="cr-name">
            Name *
          </label>
          <input
            id="cr-name"
            name="name"
            required
            autoComplete="name"
            className={fieldClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="cr-business">
            Business *
          </label>
          <input
            id="cr-business"
            name="business"
            required
            autoComplete="organization"
            className={fieldClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="cr-phone">
            Phone *
          </label>
          <input
            id="cr-phone"
            name="phone"
            type="tel"
            required
            inputMode="tel"
            autoComplete="tel"
            pattern="[0-9 +()\-]{8,20}"
            title="A phone number, e.g. 0412 345 678"
            className={fieldClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="cr-email">
            Email *
          </label>
          <input
            id="cr-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={fieldClass}
          />
        </div>
      </div>
      <div>
        <label className={labelClass} htmlFor="cr-website">
          Website{" "}
          <span className="tracking-normal normal-case">(optional)</span>
        </label>
        <input
          id="cr-website"
          name="website"
          inputMode="url"
          autoComplete="url"
          className={fieldClass}
        />
      </div>

      <div aria-hidden className="absolute -left-[9999px] opacity-0">
        <label htmlFor="cr-hp">Leave this field empty</label>
        <input
          id="cr-hp"
          name="company_website_url"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={status === "sending"}
        className="mt-2 w-full sm:w-auto sm:self-start"
      >
        {status === "sending" ? "Sending" : callRequest.submit}
      </Button>

      {status === "error" ? (
        <p role="alert" className="text-small text-foreground">
          That didn&apos;t go through. Email{" "}
          <a
            href={`mailto:${siteConfig.email}`}
            className="text-accent underline underline-offset-4"
          >
            {siteConfig.email}
          </a>{" "}
          and we&apos;ll be in touch.
        </p>
      ) : null}
    </form>
  );
}
