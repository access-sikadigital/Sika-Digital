import { metadataFor } from "@/lib/metadata";
import { LeadGenerationContent } from "./LeadGenerationContent";

/** Server wrapper. See the note in web-design/page.tsx for why this is split. */
export const metadata = metadataFor("lead-generation");

export default function LeadGenerationPage() {
  return <LeadGenerationContent />;
}
