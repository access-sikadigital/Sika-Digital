import { metadataFor } from "@/lib/metadata";
import { ServiceTemplate } from "@/components/sections/ServiceTemplate";

/**
 * Server wrapper. See the note in web-design/page.tsx for why this is split.
 *
 * Body is the shared service template, driven by `config/service-details`.
 * The reason these share a frame while the five hubs do not is written at the
 * top of ServiceTemplate.
 */
export const metadata = metadataFor("reputation-management");

export default function Page() {
  return <ServiceTemplate pageKey="reputation-management" />;
}
