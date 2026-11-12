import { metadataFor } from "@/lib/metadata";
import { CopyPage } from "@/components/sections/CopyPage";

/* Copy: V1 doc for /conversion-rate-optimisation/ (config/copy-v1). */
export const metadata = metadataFor("cro");

export default function Page() {
  return <CopyPage route="/conversion-rate-optimisation/" />;
}
