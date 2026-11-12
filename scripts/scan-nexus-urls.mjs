import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");

console.log(
  "\x1b[36m%s\x1b[0m",
  "👑 [NEXUS CRAWLER]: Štartujem autonómny sken projektu...",
);

const BASE_URL = "https://projekt-nexus.sk";
const AGENCY_URL = "https://agency.projekt-nexus.sk";
const ADMIN_URL = "https://admin.projekt-nexus.sk";

// 1. KANONICKÁ DÁTOVÁ MATRICA PRE 12 KATEGÓRIÍ
const categories = {
  HomePage: new Set(),
  Blog: new Set(),
  Operators: new Set(),
  "Shop/Nexus Shop": new Set(),
  "Shop/Videos Media": new Set(),
  "Shop/Audios Media": new Set(),
  "Shop/Images Media": new Set(),
  "Shop/Documnets Media": new Set(),
  "Shop/Apps Media": new Set(),
  Settings: new Set(),
  Admin: new Set(),
  Agency: new Set(),
};

// 🛡️ POMOCNÁ FUNKCIA: BEZPEČNÉ ČÍTANIE SÚBORU
function readFileSafe(relPath) {
  const fullPath = path.join(ROOT_DIR, relPath);
  if (fs.existsSync(fullPath)) {
    return fs.readFileSync(fullPath, "utf-8");
  }
  return "";
}

// 🛡️ POMOCNÁ FUNKCIA: ZARADENIE URL DO KATEGÓRIE
function categorizeUrl(url) {
  const lower = url.toLowerCase();

  if (lower.includes("admin.projekt-nexus.sk") || lower.includes("/admin")) {
    categories["Admin"].add(url);
  } else if (
    lower.includes("agency.projekt-nexus.sk") ||
    lower.includes("/agency")
  ) {
    categories["Agency"].add(url);
  } else if (lower.includes("/shop/videos")) {
    categories["Shop/Videos Media"].add(url);
  } else if (lower.includes("/shop/audios")) {
    categories["Shop/Audios Media"].add(url);
  } else if (lower.includes("/shop/images")) {
    categories["Shop/Images Media"].add(url);
  } else if (lower.includes("/shop/documents")) {
    categories["Shop/Documnets Media"].add(url);
  } else if (lower.includes("/shop/apps")) {
    categories["Shop/Apps Media"].add(url);
  } else if (lower.includes("/shop")) {
    categories["Shop/Nexus Shop"].add(url);
  } else if (lower.includes("/blog")) {
    categories["Blog"].add(url);
  } else if (lower.includes("/operator")) {
    categories["Operators"].add(url);
  } else if (lower.includes("/settings")) {
    categories["Settings"].add(url);
  } else {
    categories["HomePage"].add(url);
  }
}

// ============================================================================
// 🔍 FÁZA 1: SKEN ROUTINGU V APP.JSX (AUTODETEKCIA VŠETKÝCH TRÁS)
// ============================================================================
const appJsxContent = readFileSafe("src/App.jsx") || readFileSafe("App.jsx");

if (appJsxContent) {
  // Regex na zachytenie <Route path="..." />
  const routeRegex = /<Route[^>]*path=["']([^"']+)["']/g;
  let match;
  let routesFound = 0;

  while ((match = routeRegex.exec(appJsxContent)) !== null) {
    const rawPath = match;
    if (rawPath && rawPath !== "*") {
      const cleanPath = rawPath.startsWith("/") ? rawPath : `/${rawPath}`;
      // Ignorujeme dynamické parametre typu :id, tie nahradia skutočné dáta z Fázy 2
      if (!cleanPath.includes(":")) {
        categorizeUrl(`${BASE_URL}${cleanPath}`);
        routesFound++;
      }
    }
  }
  console.log(
    "\x1b[32m%s\x1b[0m",
    `✔ [App.jsx]: Zoskenovaných ${routesFound} statických trás.`,
  );
} else {
  console.log(
    "\x1b[33m%s\x1b[0m",
    "⚠ [App.jsx]: Súbor nenájdený v koreni ani v src/.",
  );
}

// ============================================================================
// 🔍 FÁZA 2: DYNAMICKÝ SKEN DÁTOVÝCH REGISTROV (ID POUŽITÉ V SHOPE A PRODUKTOCH)
// ============================================================================
function scanDataFolder(dirRelPath) {
  const fullDir = path.join(ROOT_DIR, dirRelPath);
  if (!fs.existsSync(fullDir)) return;

  const files = fs.readdirSync(fullDir, { recursive: true });

  files.forEach((file) => {
    if (
      typeof file === "string" &&
      (file.endsWith(".js") || file.endsWith(".json") || file.endsWith(".jsx"))
    ) {
      const content = fs.readFileSync(path.join(fullDir, file), "utf-8");

      // 1. Zber Audio ID (AUDIO_CODM_...)
      const audioMatches = content.match(/AUDIO_CODM_[A-Za-z0-9_-]+/g);
      if (audioMatches) {
        audioMatches.forEach((id) =>
          categorizeUrl(`${BASE_URL}/shop/audios?audio=${id}`),
        );
      }

      // 2. Zber Avatar ID (AVATAR_BOT_...)
      const avatarMatches = content.match(/AVATAR_BOT_[A-Za-z0-9_-]+/g);
      if (avatarMatches) {
        avatarMatches.forEach((id) =>
          categorizeUrl(`${BASE_URL}/shop/images?avatar=${id}`),
        );
      }

      // 3. Zber Kampaní Shopu a Dokumentov (id: "32..." alebo "CAMP_...")
      const idMatches = content.match(/id:\s*["']([^"']+)["']/g);
      if (idMatches) {
        idMatches.forEach((m) => {
          const rawId = m
            .replace(/id:\s*["']/, "")
            .replace(/["']/, "")
            .trim();
          if (rawId.startsWith("32")) {
            categorizeUrl(`${BASE_URL}/shop/documents/all/${rawId}`);
          } else if (
            rawId.startsWith("CAMP_33") ||
            rawId.startsWith("CAMP_34") ||
            rawId.startsWith("CAMP_35")
          ) {
            categorizeUrl(`${BASE_URL}/shop/apps/all/${rawId}`);
          } else if (rawId.startsWith("CAMP_")) {
            categorizeUrl(`${BASE_URL}/shop/shop/all/${rawId}`);
          }
        });
      }

      // 4. Zber Dimenzií (ID00 - ID15)
      const dimMatches = content.match(/ID(0|1)/g);
      if (dimMatches) {
        dimMatches.forEach((dim) => {
          categorizeUrl(`${BASE_URL}/${dim}`);
          categorizeUrl(`${BASE_URL}/blog?cat=${dim}`);
        });
      }
    }
  });
}

// Prehľadáme všetky priečinky s dátami
scanDataFolder("src/data");
scanDataFolder("src/components/shop");
scanDataFolder("src/database");

// ============================================================================
// 📄 FÁZA 3: EXPORT DO FORMÁTOVANÉHO MARKDOWNU
// ============================================================================
let totalCount = 0;
let md = `# 👑 NEXUS OS & NEXUS AGENCY // AUTONOMOUS MASTER SITEMAP\n`;
md += `> **Generované skenerom:** \`scripts/scan-nexus-urls.mjs\`\n`;
md += `> **Dátum:** ${new Date().toLocaleString("sk-SK")}\n`;
md += `> **Pravidlo:** Žiadne hardkódené URL zoznamy (100% dynamický sken zdrojákov)\n\n`;
md += `***\n\n`;

for (const [catName, urlSet] of Object.entries(categories)) {
  const urlList = Array.from(urlSet).sort();
  totalCount += urlList.length;
  md += `### 📂 ${catName} (${urlList.length})\n\n`;
  if (urlList.length === 0) {
    md += `_Žiadne detegované trasy v tejto kategórii._\n\n`;
  } else {
    urlList.forEach((u) => {
      md += `- [ ] \`\${u}\`\n`;
    });
    md += `\n`;
  }
}

const outputPath = path.join(ROOT_DIR, "NEXUS_MASTER_SITEMAP.md");
fs.writeFileSync(outputPath, md, "utf-8");

console.log(
  "\x1b[32m%s\x1b[0m",
  `\n✅ HOTOVO! Zoskenovaných celkovo ${totalCount} unikátnych URL adries.`,
);
console.log(
  "\x1b[35m%s\x1b[0m",
  `📁 Výsledný súbor bol uložený do: NEXUS_MASTER_SITEMAP.md\n`,
);
