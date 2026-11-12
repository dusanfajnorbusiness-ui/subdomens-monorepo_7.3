/**
 * ============================================================================
 * 🌌 NEXUS NODE LINES SCANNER V3.0 (UNIVERSAL DECODER) - MANUÁL NA POUŽITIE
 * ============================================================================
 * ÚČEL SKRIPTU:
 * Tento Node.js skript slúži ako "Zberač dát" pre tvoje Vizuálne Tachometre.
 * Prehľadá celú zložku 'src/subPages', nájde všetky .jsx uzly (aj štandardné, 
 * aj Mentor logy, aj sub-uzly) a zráta v nich presný počet riadkov kódu.
 * Tieto čísla následne uloží do 'src/data/nodeStats.json'.
 * 
 * PREČO JE KRITICKÝ:
 * Bez tohto skriptu by GlobalDimensionHub.jsx nevedel, na koľko % sú uzly 
 * hotové. Je to tvoj automatický ukazovateľ progresu (kapacita z 1000 riadkov).
 * 
 * AKO TO POUŽÍVAŤ:
 * Kedykoľvek dokončíš písanie nového uzla a chceš, aby sa aktualizoval 
 * tachometer na webe, otvor vo VS Code terminál a zadaj:
 * node scripts/sync_node_lines.js 
 * (alebo iný názov, pod akým máš tento súbor uložený)
 * ============================================================================
 */

const fs = require("fs");
const path = require("path");

// __dirname je /scripts, projektRoot je o úroveň vyššie
const projectRoot = path.join(__dirname, "..");
const subPagesDir = path.join(projectRoot, "src/subPages");
const outputFile = path.join(projectRoot, "src/data/nodeStats.json");

const stats = {};

function scanDirectory(directory) {
  if (!fs.existsSync(directory)) return;

  const items = fs.readdirSync(directory);

  for (const item of items) {
    const fullPath = path.join(directory, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      scanDirectory(fullPath);
    } else if (item.endsWith(".jsx")) {
      try {
        // 🧪 UNIVERZÁLNY REGEX V4.0 (Dekóduje Node_IDxx_xx, IDxx_LOG-xx a Node_IDxx_xx_x)
        // Group 1: ID sektora (napr. ID00)
        // Group 2: Číslo uzla aj s možným sub-indexom (napr. 03, 40_2)
        const match = item.match(
          /(?:Node_)?(ID\d{2})_?(?:LOG-)?(\d+(?:_\d+)?)\.jsx/i,
        );

        if (match) {
          const nodeId = `${match[1].toUpperCase()}-${match[2]}`;

          const content = fs.readFileSync(fullPath, "utf8");
          const lineCount = content.split("\n").length;

          stats[nodeId] = lineCount;

          // Diagnostická sonda pre overenie sub-uzlov
          if (nodeId.includes("_")) {
            console.log(
              `🛠️ [SCANNER SONDA]: Sub-uzol úspešne dekódovaný: ${item} -> ${nodeId}`,
            );
          }
        }
      } catch (err) {
        console.error(`❌ ERROR [${item}]:`, err.message);
      }
    }
  }
}

console.log("=======================================================");
console.log("🤖 NEXUS SCANNER V3.0: Spúšťam univerzálnu synchronizáciu...");
console.log(`📍 Root: ${projectRoot}`);
console.log("=======================================================");

scanDirectory(subPagesDir);

try {
  const dataDir = path.dirname(outputFile);
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

  fs.writeFileSync(outputFile, JSON.stringify(stats, null, 2), "utf8");

  const total = Object.keys(stats).length;
  console.log(`✅ SYNC COMPLETE!`);
  console.log(`📊 Celkový počet dekomprimovaných uzlov: ${total}`);

  // Rýchla kontrola ID00 pre Architekta
  const id00Count = Object.keys(stats).filter((id) =>
    id.startsWith("ID00"),
  ).length;
  if (id00Count > 0) {
    console.log(
      `🟢 SEKTOR ID00: Detegovaných ${id00Count} logov (Mentor Hub).`,
    );
  } else {
    console.log(
      `🔴 SEKTOR ID00: Stále chýbajú dáta! Skontrolujte názvy súborov.`,
    );
  }
} catch (err) {
  console.error("❌ FATAL ERROR PRI ZÁPISE:", err.message);
}
console.log("=======================================================");