/**
 * ============================================================================
 * 🎙️ NEXUS PODCAST INJECTOR V1.0 (Auto-Deployment Script)
 * ============================================================================
 * 📂 CESTA: NEXUS-OS-GENESIS-EDITION/scripts/podcast-injector.js
 * 👑 AUTOR: NEXUS CODE ARCHITECT & Dušan Fajnor (@zombieSergeant)
 *
 * 🎯 SÉMANTICKÝ ODTLAČOK (ÚČEL):
 * Tento Node.js skript slúži ako autonómny agent pre hromadnú "Ghost-Mode"
 * exekúciu. Jeho úlohou je prejsť celú adresárovú štruktúru uzlov (Nodes),
 * detegovať chýbajúci Audio modul a chirurgicky vpichnúť komponent
 * <GlobalNodePodcast /> presne do Zákona Symetrie (nad Terminál/Footer).
 *
 * ⚙️ MECHANIKA KÓDU (Ako to funguje):
 * 1. SCAN: Prehľadá zložku `src/subPages/` a nájde všetky `.jsx` súbory uzlov.
 * 2. FILTER: Ak súbor už obsahuje `<GlobalNodePodcast`, preskočí ho (ochrana proti duplicite).
 * 3. COLOR MATCHING: Podľa názvu súboru (napr. ID06) automaticky priradí
 *    správnu HEX farbu z Kódexu (DIM_COLORS).
 * 4. IMPORT INJECT: Doplní import komponentu na začiatok súboru (ak chýba).
 * 5. COMPONENT INJECT: Nájde sémantickú kotvu (Terminál 6B, Promo Banner 6C
 *    alebo PredFooter 7) a vpichne Podcast modul priamo nad ňu.
 *
 * 🚀 PRÍKAZ NA SPUSTENIE (V termináli VS Code):
 * > node scripts/podcast-injector.js
 * ============================================================================
 */

const fs = require("fs");
const path = require("path");

// ============================================================================
// ⚙️ KONFIGURÁCIA SYSTÉMU
// ============================================================================
const TARGET_DIR = path.join(__dirname, "..", "src", "subPages");

// Mapa farieb podľa dimenzií z Nadštandardu V20
const DIM_COLORS = {
  ID00: "#FFFFFF",
  ID01: "#39FF14",
  ID02: "#FFEB3B",
  ID03: "#FFD700",
  ID04: "#FFAA00",
  ID05: "#FF8C00",
  ID06: "#BF00FF",
  ID07: "#8A2BE2",
  ID08: "#00FFFF",
  ID09: "#FF003C",
  ID10: "#0044FF",
  ID11: "#FFBF00",
  ID12: "#00E5FF",
  ID13: "#00008B",
  ID14: "#FF1493",
  ID15: "#4A4A4A",
};

const PODCAST_IMPORT = `import { GlobalNodePodcast } from "../../../components/GlobalNodePodcast";`;

// Štatistiky
let stats = { scanned: 0, existing: 0, injected: 0, errors: 0 };

// ============================================================================
// 🛠️ JADRO INJEKTORA
// ============================================================================
function scanAndInject(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      scanAndInject(fullPath);
    } else if (file.endsWith(".jsx") && file.includes("Node_ID")) {
      stats.scanned++;
      processFile(fullPath, file);
    }
  }
}

const getPodcastComponent = (
  color,
) => `      {/* ⚡ NOVÁ POZÍCIA PRE PODCAST: Tesne pred Terminálom */}
      <div className="w-full mb-16 relative z-10">
        <GlobalNodePodcast nodeId={NODE_ID} dimColor="${color}" />
      </div>\n`;

function processFile(filePath, fileName) {
  let content = fs.readFileSync(filePath, "utf-8");

  // Ak už podcast má, preskakujeme
  if (content.includes("<GlobalNodePodcast")) {
    console.log(`[ 🟢 OK ] ${fileName} -> Podcast už obsahuje.`);
    stats.existing++;
    return;
  }

  // 1. ZISTENIE FARBY PODĽA DIMENZIE
  const idMatch = fileName.match(/ID\d{2}/);
  const dimensionId = idMatch ? idMatch : "ID01";
  const dimColor = DIM_COLORS[dimensionId] || "#00FFFF";

  // 2. INJEKCIA IMPORTU
  if (!content.includes("GlobalNodePodcast")) {
    const importRegex = /(import .*?;\n)+/g;
    const importsMatch = content.match(importRegex);
    if (importsMatch) {
      const lastImportBlock = importsMatch[importsMatch.length - 1];
      content = content.replace(
        lastImportBlock,
        `${lastImportBlock}${PODCAST_IMPORT}\n`,
      );
    } else {
      content = `${PODCAST_IMPORT}\n${content}`;
    }
  }

  // 3. INJEKCIA KOMPONENTU (SMART REGEX V2.0)
  const anchorRegex =
    /((?:\{\/\*\s*6B\.\s*TERMINAL SUMMARY\s*\*\/\}\s*)?<(?:section|div)[^>]*max-w-(?:5xl|6xl)[^>]*>\s*<div[^>]*bg-(?:black|\[#050505\])[^>]*>)/i;

  if (anchorRegex.test(content)) {
    content = content.replace(anchorRegex, (match) => {
      // Vloží podcast PRESNE nad celú túto sekciu Terminálu
      return `${getPodcastComponent(dimColor)}${match}`;
    });

    // Zápis do súboru
    fs.writeFileSync(filePath, content, "utf-8");
    console.log(
      `[ ⚡ INJECTED V2 ] ${fileName} -> Pridaný Podcast (${dimensionId}: ${dimColor})`,
    );
    stats.injected++;
  } else {
    console.log(
      `[ 🔴 ERROR ] ${fileName} -> Nenašiel sa Terminál pre ukotvenie.`,
    );
    stats.errors++;
  }
}

// ============================================================================
// 🚀 EXEKÚCIA
// ============================================================================
console.log("\n=======================================================");
console.log("🎙️ NEXUS PODCAST INJECTOR V2.0 INITIALIZED");
console.log("=======================================================\n");

// Spustenie hlavnej skenovacej funkcie
scanAndInject(TARGET_DIR);

// Výpis analytiky
console.log("\n=======================================================");
console.log("📊 VÝSLEDKY SKENOVANIA:");
console.log(`🔹 Celkovo uzlov: ${stats.scanned}`);
console.log(`🟢 Už obsahovali Podcast: ${stats.existing}`);
console.log(`⚡ Úspešne injektované: ${stats.injected}`);
console.log(`🔴 Chyby (Nenašiel sa anchor): ${stats.errors}`);
console.log("=======================================================\n");
