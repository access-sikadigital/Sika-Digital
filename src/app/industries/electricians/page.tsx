import { metadataFor } from "@/lib/metadata";
import { CopyPage } from "@/components/sections/CopyPage";

/* Copy: V1 doc for /industries/electricians/ (config/copy-v1). */
export const metadata = metadataFor("electricians");

export default function Page() {
  return <CopyPage route="/industries/electricians/" />;
}
