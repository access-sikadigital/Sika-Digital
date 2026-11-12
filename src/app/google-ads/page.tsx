import { metadataFor } from "@/lib/metadata";
import { CopyPage } from "@/components/sections/CopyPage";

/* Copy: V1 doc for /google-ads/ (config/copy-v1). */
export const metadata = metadataFor("google-ads");

export default function Page() {
  return <CopyPage route="/google-ads/" />;
}
