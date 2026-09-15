import { metadataFor } from "@/lib/metadata";
import { FacebookAdsContent } from "./FacebookAdsContent";

/** Server wrapper. See the note in web-design/page.tsx for why this is split. */
export const metadata = metadataFor("facebook-ads");

export default function FacebookAdsPage() {
  return <FacebookAdsContent />;
}
