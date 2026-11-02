"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Renders its children everywhere except the paid landing page (/lp/), which
 * has its own minimal footer. Adds no markup of its own, so every other page
 * renders exactly as before.
 */
export function HideOnLanding({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/lp" || pathname.startsWith("/lp/")) return null;
  return <>{children}</>;
}
