import { metadataFor } from "@/lib/metadata";
import { CopyPage } from "@/components/sections/CopyPage";

/* Copy: V1 doc for /industries/builders/ (config/copy-v1). */
export const metadata = metadataFor("builders");

export default function Page() {
  return <CopyPage route="/industries/builders/" />;
}
