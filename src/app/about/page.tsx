import { metadataFor } from "@/lib/metadata";
import { AboutContent } from "./AboutContent";

/** Server wrapper. See the note in web-design/page.tsx for why this is split. */
export const metadata = metadataFor("about");

export default function AboutPage() {
  return <AboutContent />;
}
