/**
 * Give every client logo a content-hashed filename, and update the config.
 *
 *   node scripts/hash-logos.mjs
 *
 * Run it after adding or replacing any file in public/media/clients.
 *
 * ── Why ─────────────────────────────────────────────────────────────────────
 * next.config.ts caches optimised images for a year. That is only safe if a
 * changed image gets a new URL. Files in /public keep whatever name you give
 * them, so replacing `acme.png` with a new `acme.png` means visitors keep
 * seeing the old one for up to a year, with no error anywhere. That exact bug
 * shipped once already.
 *
 * ── What it does ────────────────────────────────────────────────────────────
 *   · Any file without a hash gets one: `acme.png` becomes `acme.1a2b3c4d.png`.
 *   · A hashed file whose content no longer matches its hash is renamed to the
 *     right one, so replacing a file in place and re-running also works.
 *   · Every reference in src/config/home.ts is updated to the new name.
 *
 * Idempotent. Running it twice changes nothing the second time.
 */
import { createHash } from "node:crypto";
import { readFileSync, readdirSync, renameSync, writeFileSync } from "node:fs";
import { join, extname } from "node:path";

const DIR = "public/media/clients";
const CONFIG = "src/config/home.ts";
const HASHED = /^(.*)\.([0-9a-f]{8})(\.[a-z0-9]+)$/;

let config = readFileSync(CONFIG, "utf8");
let changed = 0;

for (const file of readdirSync(DIR)) {
  const hash = createHash("sha256")
    .update(readFileSync(join(DIR, file)))
    .digest("hex")
    .slice(0, 8);

  const match = file.match(HASHED);
  const stem = match ? match[1] : file.slice(0, -extname(file).length);
  const ext = match ? match[3] : extname(file);
  const next = `${stem}.${hash}${ext}`;

  if (next === file) continue;

  renameSync(join(DIR, file), join(DIR, next));
  config = config.replaceAll(`/media/clients/${file}"`, `/media/clients/${next}"`);

  /* A file dropped in unhashed but referenced in config by its bare name. */
  if (!match) {
    config = config.replaceAll(`/media/clients/${stem}${ext}"`, `/media/clients/${next}"`);
  }

  console.log(`  ${file}  ->  ${next}`);
  changed++;
}

writeFileSync(CONFIG, config);

/* Every reference must point at a file that exists. Fail loudly if not: a
   missing logo renders as a broken image on the homepage. */
const onDisk = new Set(readdirSync(DIR));
const missing = [...config.matchAll(/"\/media\/clients\/([^"]+)"/g)]
  .map((m) => m[1])
  .filter((f) => !onDisk.has(f));

if (missing.length) {
  console.error(`\n  Referenced in config but not on disk:\n    ${missing.join("\n    ")}`);
  process.exit(1);
}

console.log(changed ? `\n  ${changed} renamed.` : "  All logos already hashed.");
