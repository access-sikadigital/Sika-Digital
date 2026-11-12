import { metadataFor } from "@/lib/metadata";
import { CopyPage } from "@/components/sections/CopyPage";

/* Copy: V1 doc for /services/ (config/copy-v1). */
export const metadata = metadataFor("services");

export default function Page() {
  return <CopyPage route="/services/" />;
}
