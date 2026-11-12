import { metadataFor } from "@/lib/metadata";
import { CopyPage } from "@/components/sections/CopyPage";

/* Copy: V1 doc for /industries/plumbers/ (config/copy-v1). */
export const metadata = metadataFor("plumbers");

export default function Page() {
  return <CopyPage route="/industries/plumbers/" />;
}
