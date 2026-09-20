import { metadataFor } from "@/lib/metadata";
import { LocationTemplate } from "@/components/sections/LocationTemplate";

/**
 * Server wrapper. See the note in web-design/page.tsx for why this is split.
 *
 * Body is the shared location template, driven by `config/locations`. The
 * doorway-page risk these pages carry, and what actually defends against it,
 * is written at the top of LocationTemplate.
 */
export const metadata = metadataFor("seo-adelaide");

export default function Page() {
  return <LocationTemplate pageKey="seo-adelaide" />;
}
