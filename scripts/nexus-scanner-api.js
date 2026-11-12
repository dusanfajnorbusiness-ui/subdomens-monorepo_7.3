/**
 * ============================================================================
 * 🌌 NEXUS SCANNER API SERVER V1.0 - MANUÁL NA POUŽITIE
 * ============================================================================
 * ÚČEL SKRIPTU:
 * Tento Node.js skript funguje ako lokálny mini-server (backend) bežiaci
 * na porte 3042. Umožňuje tvojej React aplikácii (napr. z Admin panelu)
 * na diaľku cez API spustiť skenovanie vytvorených uzlov v 'src/subPages'.
 *
 * MECHANIZMUS (AKO TO FUNGUJE):
 * 1. Prehľadá zložku subPages a nájde všetky .jsx súbory uzlov.
 * 2. Spočíta počet riadkov kódu v každom jednom z nich.
 * 3. Zapíše tieto štatistiky do 'src/data/nodeStats.json'.
 * 4. Tento JSON súbor následne kŕmi tvoj Vizuálny Tachometer na webe.
 *
 * AKO TO POUŽÍVAŤ:
 * Aby React mohol tento skript zavolať, server musí bežať v pozadí.
 * Otvor si vo VS Code nový (druhý) terminál a zadaj:
 * node nazov_tohto_suboru.js
 * ============================================================================
 */

const fs = require("fs");
const path = require("path");
const http = require("http");

// Skok o úroveň vyššie (..) z /scripts do hlavného Rootu projektu
const projectRoot = path.join(__dirname, "..");
const subPagesDir = path.join(projectRoot, "src", "subPages");
const outputFile = path.join(projectRoot, "src", "data", "nodeStats.json");

const scanNodes = () => {
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
        const match = item.match(/(?:Node_)?(ID\d{2})_?(?:LOG-)?(\d+)\.jsx/i);
        if (match) {
          const nodeId = `${match[1].toUpperCase()}-${match[2]}`;
          const content = fs.readFileSync(fullPath, "utf8");
          stats[nodeId] = content.split("\n").length;
        }
      }
    }
  }

  scanDirectory(subPagesDir);
  const dataDir = path.dirname(outputFile);
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  fs.writeFileSync(outputFile, JSON.stringify(stats, null, 2), "utf8");

  return Object.keys(stats).length;
};

// Vytvorenie mini servera na porte 3042
const server = http.createServer((req, res) => {
  // CORS ochrana aby to React mohol zavolať
  res.setHeader("Access-Control-Allow-Origin", "*");

  if (req.url === "/api/scan-nodes" && req.method === "GET") {
    try {
      const totalNodes = scanNodes();
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          success: true,
          message: `Úspešne dekódovaných ${totalNodes} uzlov.`,
        }),
      );
    } catch (err) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ success: false, error: err.message }));
    }
  } else {
    res.writeHead(404);
    res.end();
  }
});

const PORT = 3042;
server.listen(PORT, () => {
  console.log(`🤖 NEXUS SCANNER SERVER beží na http://localhost:${PORT}`);
  console.log(`Pripojené na zložku: ${subPagesDir}`);
});
