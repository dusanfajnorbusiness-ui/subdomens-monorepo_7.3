
/* eslint-disable no-undef */

// ============================================================================
// 👑 PROJECT NEXUS — OS GENESIS EDITION (SUBDOMAINS MASTER V20.95)
// Súbor: scripts/scan-nexus-urls.mjs
// Status: 100% GROUNDED // AUTONOMOUS SUBDOMAINS CRAWLER & SITEMAP EXPORTER
// Core Version: CRAWLER-V20.95_SUBDOMAINS_CANONICAL_FIXED
// Autor: Dušan Fajnor @nexus-core2Mb (CyberTech Architect)
// ============================================================================

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");

console.log(
  "\x1b[36m%s\x1b[0m",
  "👑 [NEXUS CRAWLER]: Štartujem autonómny sken subdoménového ekosystému OS Genesis...",
);

const BASE_URL = "https://" + "subdomens.projekt-nexus.sk";

// 🗺️ REGISTER 16 KOGNITÍVNYCH SUBDOMÉN (ID00 – ID15)
const SUBDOMAIN_MAP = {
  sub00: { id: "ID00", name: "ID00 MENTOR-HUB", domain: "https://" + "mentor.projekt-nexus.sk" },
  sub01: { id: "ID01", name: "ID01 IDENTITY-CORE", domain: "https://" + "personal.projekt-nexus.sk" },
  sub02: { id: "ID02", name: "ID02 THE-WORKFLOW", domain: "https://" + "work.projekt-nexus.sk" },
  sub03: { id: "ID03", name: "ID03 CASH-ENGINE", domain: "https://" + "finance.projekt-nexus.sk" },
  sub04: { id: "ID04", name: "ID04 REVENUE-ARCHITECT", domain: "https://" + "business.projekt-nexus.sk" },
  sub05: { id: "ID05", name: "ID05 ASSETS-MATRIX", domain: "https://" + "investments.projekt-nexus.sk" },
  sub06: { id: "ID06", name: "ID06 DATA-ABSORBER", domain: "https://" + "study.projekt-nexus.sk" },
  sub07: { id: "ID07", name: "ID07 SKILLS-TREE", domain: "https://" + "professional.projekt-nexus.sk" },
  sub08: { id: "ID08", name: "ID08 EMPTY-BOOK", domain: "https://" + "reader.projekt-nexus.sk" },
  sub09: { id: "ID09", name: "ID09 SERGEANT-CORE", domain: "https://" + "player.projekt-nexus.sk" },
  sub10: { id: "ID10", name: "ID10 NONIDENTITY-CORE", domain: "https://" + "home.projekt-nexus.sk" },
  sub11: { id: "ID11", name: "ID11 THE-RECOVERY", domain: "https://" + "recovery.projekt-nexus.sk" },
  sub12: { id: "ID12", name: "ID12 NEXUS-CODEX", domain: "https://" + "codex.projekt-nexus.sk" },
  sub13: { id: "ID13", name: "ID13 NEXUS-HABITS", domain: "https://" + "habits.projekt-nexus.sk" },
  sub14: { id: "ID14", name: "ID14 NEXUS-BLOG", domain: "https://" + "blog.projekt-nexus.sk" },
  sub15: { id: "ID15", name: "ID15 DEATH-CORE", domain: "https://" + "death.projekt-nexus.sk" },
};

// 1. KANONICKÉ KATEGÓRIE
const categories = {
  "Centrála (Subdomens Hub)": new Set(),
  "Systémové Uzly (Blog / Operators / Settings)": new Set(),
  "Právna Integrita (VOP & GDPR)": new Set(),
  "Subdoména: ID00 MENTOR-HUB": new Set(),
  "Subdoména: ID01 IDENTITY-CORE": new Set(),
  "Subdoména: ID02 THE-WORKFLOW": new Set(),
  "Subdoména: ID03 CASH-ENGINE": new Set(),
  "Subdoména: ID04 REVENUE-ARCHITECT": new Set(),
  "Subdoména: ID05 ASSETS-MATRIX": new Set(),
  "Subdoména: ID06 DATA-ABSORBER": new Set(),
  "Subdoména: ID07 SKILLS-TREE": new Set(),
  "Subdoména: ID08 EMPTY-BOOK": new Set(),
  "Subdoména: ID09 SERGEANT-CORE": new Set(),
  "Subdoména: ID10 NONIDENTITY-CORE": new Set(),
  "Subdoména: ID11 THE-RECOVERY": new Set(),
  "Subdoména: ID12 NEXUS-CODEX": new Set(),
  "Subdoména: ID13 NEXUS-HABITS": new Set(),
  "Subdoména: ID14 NEXUS-BLOG": new Set(),
  "Subdoména: ID15 DEATH-CORE": new Set(),
  "Ostatné Detegované Uzly": new Set(),
};

function categorizeUrl(url) {
  if (!url) return;
  const cleanUrl = url.trim();
  const lower = cleanUrl.toLowerCase();

  // 1. Párovanie 16 subdomén
  for (let i = 0; i <= 15; i++) {
    const key = `sub${i.toString().padStart(2, "0")}`;
    const subInfo = SUBDOMAIN_MAP[key];
    const catName = `Subdoména: ${subInfo.name}`;

    if (
      lower.includes(`/${key}`) ||
      lower.includes(subInfo.domain.toLowerCase()) ||
      lower.includes(`/${subInfo.id.toLowerCase()}`)
    ) {
      categories[catName].add(cleanUrl);
      return;
    }
  }

  // 2. Systémové uzly
  if (
    lower.includes("/blog") ||
    lower.includes("/operators") ||
    lower.includes("/operator") ||
    lower.includes("/settings")
  ) {
    categories["Systémové Uzly (Blog / Operators / Settings)"].add(cleanUrl);
  } else if (lower.includes("/vop") || lower.includes("/privacy")) {
    categories["Právna Integrita (VOP & GDPR)"].add(cleanUrl);
  } else if (
    lower.endsWith("subdomens.projekt-nexus.sk") ||
    lower.endsWith("subdomens.projekt-nexus.sk/") ||
    lower.includes("/home")
  ) {
    categories["Centrála (Subdomens Hub)"].add(cleanUrl);
  } else {
    categories["Ostatné Detegované Uzly"].add(cleanUrl);
  }
}

async function runCrawler() {
  // ============================================================================
  // 🔍 FÁZA 1: EXAKTNÝ IMPORT ZO SHARED/SRC/DATA/SEOREGISTRY.JS (SSOT ZBERNICA)
  // ============================================================================
  const registryPath = path.join(ROOT_DIR, "shared/src/data/seoRegistry.js");
  if (fs.existsSync(registryPath)) {
    try {
      const fileUrl = `file://${registryPath.replace(/\\/g, "/")}`;
      const mod = await import(fileUrl);
      const registry = mod.SEO_REGISTRY || mod.default || {};
      
      let registryCount = 0;
      for (const [key, val] of Object.entries(registry)) {
        if (val.ogUrl) {
          categorizeUrl(val.ogUrl);
          registryCount++;
        }
        if (key.startsWith("/")) {
          categorizeUrl(`${BASE_URL}${key}`);
          registryCount++;
        }
      }
      console.log(
        "\x1b[32m%s\x1b[0m",
        `✔ [SEO Registry SSOT]: Úspešne integrovaných ${registryCount} kánonických URL adries.`,
      );
    } catch (e) {
      console.warn("⚠ [SEO Registry]: Chyba pri dynamickom importe:", e.message);
    }
  }

  // ============================================================================
  // 🔍 FÁZA 2: INŠPEKCIA ROUTINGU V APP.JSX
  // ============================================================================
  const appJsxCandidates = [
    "apps/main-web/src/App.jsx",
    "src/App.jsx",
    "App.jsx",
  ];

  for (const p of appJsxCandidates) {
    const fullPath = path.join(ROOT_DIR, p);
    if (fs.existsSync(fullPath)) {
      const appJsxContent = fs.readFileSync(fullPath, "utf-8");
      const routeRegex = /<Route[^>]*path=["']([^"']+)["']/g;
      let match;
      let routesFound = 0;

      while ((match = routeRegex.exec(appJsxContent)) !== null) {
        const rawPath = match;
        if (rawPath && rawPath !== "*") {
          const cleanPath = rawPath.startsWith("/") ? rawPath : `/${rawPath}`;
          if (!cleanPath.includes(":")) {
            categorizeUrl(`${BASE_URL}${cleanPath}`);
            routesFound++;
          }
        }
      }
      console.log(
        "\x1b[32m%s\x1b[0m",
        `✔ [App.jsx Audit - ${p}]: Zoskenovaných ${routesFound} trás.`,
      );
      break;
    }
  }

  // ============================================================================
  // 📄 FÁZA 3: EXPORT DO FORMÁTOVANÉHO MARKDOWNU
  // ============================================================================
  let totalCount = 0;
  let md = `# 👑 NEXUS OS // AUTONOMOUS SUBDOMAINS MASTER SITEMAP\n`;
  md += `> **Generované skenerom:** \`scripts/scan-nexus-urls.mjs\`\n`;
  md += `> **Dátum:** ${new Date().toLocaleString("sk-SK")}\n`;
  md += `> **Architektúra:** OS Genesis V20.95 (16 Kognitívnych Subdomén + Centrála)\n\n`;
  md += `***\n\n`;

  for (const [catName, urlSet] of Object.entries(categories)) {
    const urlList = Array.from(urlSet).sort();
    totalCount += urlList.length;
    md += `### 📂 ${catName} (${urlList.length})\n\n`;
    if (urlList.length === 0) {
      md += `_Žiadne detegované trasy v tejto kategórii._\n\n`;
    } else {
      urlList.forEach((u) => {
        md += `- [ ] \`${u}\`\n`;
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
}

runCrawler().catch((err) => {
  console.error("🔴 [CRAWLER FATAL ERROR]:", err);
  process.exit(1);
});
