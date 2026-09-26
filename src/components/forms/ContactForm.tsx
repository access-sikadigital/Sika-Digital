"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP, EASE } from "@/lib/gsap";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

/**
 * CONTACT FORM.
 *
 * ── ⚠️  READ THIS BEFORE LAUNCH ─────────────────────────────────────────────
 * Set `NEXT_PUBLIC_FORM_ENDPOINT` to the URL that should receive enquiries
 * (the GHL inbound webhook, or whatever replaces it). Until it is set, the
 * form falls back to opening the visitor's email client with the answers
 * already written into the message.
 *
 * That fallback exists for one reason: a lead-generation site must never have
 * a submit button that silently does nothing. An unconfigured endpoint is the
 * normal state of a form during a build, and the usual outcome is that it
 * ships that way and nobody finds out until someone asks why the enquiries
 * stopped. The fallback is worse than a webhook and infinitely better than a
 * black hole.
 *
 * It is still a fallback. Wire the endpoint.
 *
 * ── Field count is a conversion decision ────────────────────────────────────
 * Six fields, two of them required. Every additional field costs completions,
 * and everything here is either needed to reply (name, email) or needed to
 * make the first reply useful rather than a round of questions (website, the
 * one thing they want fixed). Phone is optional because plenty of people will
 * not give one to a stranger, and refusing to accept the enquiry without it
 * loses the lead rather than gaining the number.
 *
 * ── The honeypot ────────────────────────────────────────────────────────────
 * A field that is invisible to people and irresistible to bots. Hidden with
 * position and opacity rather than `display: none`, because some bots skip
 * undisplayed fields, and marked `tabIndex={-1}` with `autoComplete="off"` so
 * nobody using a keyboard or a password manager ever lands in it.
 */

const ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT;

const GOALS = [
  "More enquiries",
  "A new website",
  "Ranking in search",
  "My ads are not working",
  "Not sure yet",
];

type Status = "idle" | "sending" | "sent" | "error";

const fieldClass =
  "w-full border-b border-line bg-transparent py-3 text-body text-foreground transition-colors duration-base placeholder:text-faint focus:border-accent focus:outline-none";

const labelClass =
  "block font-mono text-eyebrow uppercase tracking-wider text-faint";

export function ContactForm({ className }: { className?: string }) {
  const root = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (el.getBoundingClientRect().top < window.innerHeight * 0.95) return;

      gsap.fromTo(
        el.querySelectorAll("[data-field]"),
        { autoAlpha: 0, y: 16 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: EASE.expo,
          stagger: 0.07,
          scrollTrigger: { trigger: el, start: "top 80%", once: true },
        }
      );
    },
    { scope: root }
  );

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    /* Honeypot. Filled means a bot. Report success and send nothing, so the
       bot has no signal to learn from and no reason to try a variation. */
    if (data.get("company_website_url")) {
      setStatus("sent");
      return;
    }

    setStatus("sending");

    const payload = Object.fromEntries(data.entries());

    if (!ENDPOINT) {
      /* No endpoint configured. Hand the enquiry to the visitor's email client
         rather than dropping it. */
      const body = Object.entries(payload)
        .filter(([key, value]) => key !== "company_website_url" && value)
        .map(([key, value]) => `${key}: ${value}`)
        .join("\n");

      window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
        "Website enquiry"
      )}&body=${encodeURIComponent(body)}`;

      setStatus("sent");
      return;
    }

    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div
        className={cn(
          "rounded-card border border-accent bg-surface p-8 lg:p-10",
          className
        )}
      >
        <p className="font-display text-h3 leading-[0.94] text-accent">
          Got it.
        </p>
        <p className="mt-5 max-w-md text-lead text-muted">
          We will look at your website, your Google Business Profile and your ad
          accounts before we reply, so the first thing you hear from us is worth
          reading. That usually takes a day.
        </p>
      </div>
    );
  }

  return (
    <form
      ref={root}
      onSubmit={onSubmit}
      className={cn("flex flex-col gap-8", className)}
    >
      <div data-field className="grid gap-8 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="name">
            Your name *
          </label>
          <input
            id="name"
            name="name"
            required
            autoComplete="name"
            className={fieldClass}
            placeholder="Jane Smith"
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="business">
            Business
          </label>
          <input
            id="business"
            name="business"
            autoComplete="organization"
            className={fieldClass}
            placeholder="Smith Electrical"
          />
        </div>
      </div>

      <div data-field className="grid gap-8 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="email">
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={fieldClass}
            placeholder="jane@smithelectrical.com.au"
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="phone">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className={fieldClass}
            placeholder="04.."
          />
        </div>
      </div>

      <div data-field>
        <label className={labelClass} htmlFor="website">
          Your website
        </label>
        <input
          id="website"
          name="website"
          type="url"
          autoComplete="url"
          className={fieldClass}
          placeholder="https://"
        />
      </div>

      <div data-field>
        <label className={labelClass} htmlFor="goal">
          What do you want fixed?
        </label>

        {/* `appearance-none` and a drawn caret, because the native select arrow
            is painted by the operating system in its own colour and is the one
            control here that cannot be themed.

            The caret is a real element rather than a `background-image` data
            URI. A data URI cannot read a CSS custom property, so its colour has
            to be hardcoded, and this form sits on a light card where the accent
            is blue and on a dark one where it is lime. Hardcoded lime would be
            invisible on the white version. As an element it just inherits. */}
        <div className="relative">
          <select
            id="goal"
            name="goal"
            defaultValue={GOALS[0]}
            className={cn(fieldClass, "appearance-none pr-8")}
          >
            {GOALS.map((g) => (
              <option
                key={g}
                value={g}
                className="bg-background text-foreground"
              >
                {g}
              </option>
            ))}
          </select>

          <svg
            viewBox="0 0 16 16"
            aria-hidden
            fill="none"
            className="pointer-events-none absolute right-0 top-1/2 size-4 -translate-y-1/2 text-accent"
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

      <div data-field>
        <label className={labelClass} htmlFor="message">
          Anything else
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className={cn(fieldClass, "resize-y")}
          placeholder="What is happening at the moment, and what you would like instead."
        />
      </div>

      {/* Honeypot. Never remove the label: a screen reader user who lands here
          needs to be told to leave it alone. */}
      <div aria-hidden className="absolute -left-[9999px] opacity-0">
        <label htmlFor="company_website_url">Leave this field empty</label>
        <input
          id="company_website_url"
          name="company_website_url"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div data-field className="flex flex-wrap items-center gap-6 pt-2">
        <Button type="submit" size="lg" disabled={status === "sending"}>
          {status === "sending" ? "Sending" : "Send it"}
        </Button>

        <p className="text-small text-faint">
          No newsletter, no sales sequence.
        </p>
      </div>

      {status === "error" ? (
        <p className="text-small text-foreground">
          That did not go through. Email{" "}
          <a
            href={`mailto:${siteConfig.email}`}
            className="text-accent underline underline-offset-4"
          >
            {siteConfig.email}
          </a>{" "}
          instead and we will pick it up.
        </p>
      ) : null}
    </form>
  );
}
