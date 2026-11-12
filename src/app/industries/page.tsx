import { metadataFor } from "@/lib/metadata";
import { CopyPage } from "@/components/sections/CopyPage";

/* Copy: V1 doc for /industries/ (config/copy-v1). */
export const metadata = metadataFor("industries");

export default function Page() {
  return <CopyPage route="/industries/" />;
}
