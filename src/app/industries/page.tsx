import { metadataFor } from "@/lib/metadata";
import { IndustriesContent } from "./IndustriesContent";

/** Server wrapper. See the note in web-design/page.tsx for why this is split. */
export const metadata = metadataFor("industries");

export default function IndustriesPage() {
  return <IndustriesContent />;
}
