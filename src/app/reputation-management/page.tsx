import { metadataFor } from "@/lib/metadata";
import { CopyPage } from "@/components/sections/CopyPage";

/* Copy: V1 doc for /reputation-management/ (config/copy-v1). */
export const metadata = metadataFor("reputation-management");

export default function Page() {
  return <CopyPage route="/reputation-management/" />;
}
