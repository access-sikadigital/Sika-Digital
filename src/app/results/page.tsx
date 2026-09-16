import { metadataFor } from "@/lib/metadata";
import { ResultsContent } from "./ResultsContent";

/** Server wrapper. See the note in web-design/page.tsx for why this is split. */
export const metadata = metadataFor("results");

export default function ResultsPage() {
  return <ResultsContent />;
}
