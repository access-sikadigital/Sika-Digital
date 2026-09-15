import { metadataFor } from "@/lib/metadata";
import { GoogleAdsContent } from "./GoogleAdsContent";

/** Server wrapper. See the note in web-design/page.tsx for why this is split. */
export const metadata = metadataFor("google-ads");

export default function GoogleAdsPage() {
  return <GoogleAdsContent />;
}
