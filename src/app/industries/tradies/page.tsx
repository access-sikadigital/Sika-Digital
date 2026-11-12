import { metadataFor } from "@/lib/metadata";
import { CopyPage } from "@/components/sections/CopyPage";

/* Copy: V1 doc for /industries/tradies/ (config/copy-v1). */
export const metadata = metadataFor("tradies");

export default function Page() {
  return <CopyPage route="/industries/tradies/" />;
}
