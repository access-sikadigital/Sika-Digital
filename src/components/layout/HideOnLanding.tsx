"use client";

import type { ReactNode } from "react";
import { useIsLanding } from "@/lib/landing-route";

/**
 * Renders its children everywhere except the landing page (/lp/, or the root
 * of sikadigital.com), which has its own minimal footer. Adds no markup of its
 * own, so every other page renders exactly as before.
 */
export function HideOnLanding({ children }: { children: ReactNode }) {
  if (useIsLanding()) return null;
  return <>{children}</>;
}
