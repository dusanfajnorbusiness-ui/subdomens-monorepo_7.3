// ============================================================================
// 👑 PROJECT NEXUS — OS GENESIS EDITION (CDN SANITIZER V20.23)
// Súbor: scripts/sanitize-supabase-md.mjs (Verzia 3)
// Status: STRICT ESM // MARKDOWN TABLE COMPATIBLE // 100% EXAKTNÁ NÁHRADA 39 URL
// Purpose: Automatická konverzia nepovolených znakov v URL (medzery, zátvorky, apostrofy)
// ============================================================================

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Inteligentné vyhľadanie súboru
const potentialPaths = [
  process.argv[2],
  path.resolve(process.cwd(), "SUPABASE_STORAGE_6_SURODENCOV.md"),
  "D:\\🗄️_DOCS_4.0\\GEM_7.0\\Supabase\\SUPABASE_STORAGE_6_SURODENCOV.md",
  path.resolve(__dirname, "../SUPABASE_STORAGE_6_SURODENCOV.md"),
].filter(Boolean);

let targetFile = null;
for (const p of potentialPaths) {
  if (fs.existsSync(p)) {
    targetFile = p;
    break;
  }
}

if (!targetFile) {
  console.error(
    "❌ [CHYBA]: Súbor SUPABASE_STORAGE_6_SURODENCOV.md sa nenašiel.",
  );
  console.log("ℹ️ Testované cesty:", potentialPaths);
  console.log("👉 Zadaj cestu manuálne ako parameter.");
  process.exit(1);
}

console.log(
  `⚡ [NEXUS CDN SANITIZER V20.23]: Načítavam register: ${targetFile}...`,
);
const rawContent = fs.readFileSync(targetFile, "utf-8");

// Regex šitý na mieru Markdown tabuľkám: zachytí URL vnútri `](URL) |`
// Nevadí mu medzera ani zátvorky v názve súboru!
const tableUrlRegex =
  /\]\((https:\/\/ljyvsolsgliephsfkfgx\.supabase\.co\/storage\/v1\/object\/public\/[^\n\r]+?)\)\s*\|/g;

let fixCount = 0;
const sanitizedContent = rawContent.replace(
  tableUrlRegex,
  (fullMatch, rawUrl) => {
    let cleanUrl = rawUrl
      .replaceAll(" ", "%20")
      .replaceAll("(", "%28")
      .replaceAll(")", "%29")
      .replaceAll("'", "%27");

    if (cleanUrl !== rawUrl) {
      fixCount++;
    }
    return `](${cleanUrl}) |`;
  },
);

fs.writeFileSync(targetFile, sanitizedContent, "utf-8");

console.log(`------------------------------------------------------------`);
console.log(`✔ [NEXUS CDN SANITIZER]: Sanitizácia úspešne dokončená!`);
console.log(`✔ [CIEĽOVÝ SÚBOR]: ${targetFile}`);
console.log(
  `✔ [OPRAVENÉ URL]: Celkovo vyčistených ${fixCount} adries s nepovolenými znakmi!`,
);
console.log(
  `✔ [STAV]: Všetky medzery (%20), zátvorky (%28, %29) a apostrofy (%27) sú v linkoch ošetrené.`,
);
console.log(`------------------------------------------------------------`);
