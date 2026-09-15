import { metadataFor } from "@/lib/metadata";
import { ServicesContent } from "./ServicesContent";

/** Server wrapper. See the note in web-design/page.tsx for why this is split. */
export const metadata = metadataFor("services");

export default function ServicesPage() {
  return <ServicesContent />;
}
