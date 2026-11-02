"use client";

import { useEffect, useRef, useState } from "react";
import { bookingUrl, callRequest } from "@/config/landing";
import { OPEN_BOOKING } from "@/components/landing/LandingBehaviour";
import { CallRequestForm } from "@/components/landing/CallRequestForm";
import { pushEvent } from "@/lib/attribution";

/**
 * BOOKING DIALOG
 *
 * Opened by every CTA on the landing page. A native <dialog>, so focus is
 * trapped, Escape closes it and the page behind is inert, with no library.
 *
 *   · NEXT_PUBLIC_BOOKING_URL set   → the GoHighLevel calendar, embedded.
 *   · not set                       → a four-field call-request form that
 *                                     posts to the GHL webhook.
 *
 * The calendar iframe is only mounted once the dialog first opens, so it
 * costs nothing on page load.
 */
export function BookingDialog() {
  const ref = useRef<HTMLDialogElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const open = () => {
      setMounted(true);
      const el = ref.current;
      if (el && !el.open) el.showModal();
      pushEvent("booking_open", {
        booking_mode: bookingUrl ? "calendar" : "form",
      });
    };
    window.addEventListener(OPEN_BOOKING, open);
    return () => window.removeEventListener(OPEN_BOOKING, open);
  }, []);

  const close = () => ref.current?.close();

  return (
    <dialog
      ref={ref}
      aria-label={callRequest.title}
      data-lenis-prevent
      onClick={(e) => {
        /* Click on the backdrop (the dialog element itself) closes it. */
        if (e.target === e.currentTarget) close();
      }}
      className="m-auto max-h-[92dvh] w-[min(40rem,calc(100vw-2rem))] overflow-hidden rounded-card border border-line-strong bg-transparent p-0 text-foreground backdrop:bg-black/70 backdrop:backdrop-blur-sm"
    >
      <div className="theme-light relative max-h-[92dvh] overflow-y-auto bg-background p-6 sm:p-9">
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="duration-base absolute top-3 right-3 flex size-11 items-center justify-center text-muted transition-colors hover:text-foreground"
        >
          <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
            <path
              d="M3.5 3.5l9 9M12.5 3.5l-9 9"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="square"
            />
          </svg>
        </button>

        <p className="eyebrow text-accent">Sika Digital</p>
        <h2 className="mt-3 pr-10 font-display text-h3 leading-[0.94] text-foreground">
          {callRequest.title}
        </h2>

        {bookingUrl ? (
          <>
            <div className="mt-6 h-[min(680px,70dvh)] overflow-hidden rounded-button border border-line">
              {mounted ? (
                <iframe
                  src={bookingUrl}
                  title="Book a discovery call"
                  className="size-full border-0"
                  loading="lazy"
                />
              ) : null}
            </div>
            <p className="mt-4 text-small text-faint">
              Calendar not loading?{" "}
              <a
                href={bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline underline-offset-4"
              >
                Open it in a new tab
              </a>
              .
            </p>
          </>
        ) : (
          <>
            <p className="mt-4 text-body text-muted">{callRequest.intro}</p>
            <CallRequestForm className="mt-8" />
          </>
        )}
      </div>
    </dialog>
  );
}
