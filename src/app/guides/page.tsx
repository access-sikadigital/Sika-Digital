import { metadataFor } from "@/lib/metadata";
import { GuidesContent } from "./GuidesContent";

/** Server wrapper. See the note in web-design/page.tsx for why this is split. */
export const metadata = metadataFor("guides");

export default function GuidesPage() {
  return <GuidesContent />;
}
