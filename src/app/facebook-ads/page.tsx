import { metadataFor } from "@/lib/metadata";
import { CopyPage } from "@/components/sections/CopyPage";

/* Copy: V1 doc for /facebook-ads/ (config/copy-v1). */
export const metadata = metadataFor("facebook-ads");

export default function Page() {
  return <CopyPage route="/facebook-ads/" />;
}
