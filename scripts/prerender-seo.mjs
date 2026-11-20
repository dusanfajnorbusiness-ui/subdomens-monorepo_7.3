
/* eslint-disable no-undef */

// ============================================================================
// 👑 PROJECT NEXUS — OS GENESIS EDITION (SUBDOMAINS MASTER V20.95)
// Súbor: scripts/prerender-seo.mjs
// Status: 100% GROUNDED // SUBDOMAINS PRERENDER & SITEMAP ENGINE
// Core Version: PRERENDER-V20.95_SUBDOMAINS_CANONICAL
// Autor: Dušan Fajnor @nexus-core2Mb (CyberTech Architect)
// ============================================================================

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");

// 🗺️ DEFENZÍVNA DETEKCIA DIST ADRESÁRA (ROOT DIST PRE SUBDOMÉNY)
const DIST_DIR = fs.existsSync(path.join(ROOT_DIR, "dist/index.html"))
  ? path.join(ROOT_DIR, "dist")
  : fs.existsSync(path.join(ROOT_DIR, "apps/main-web/dist/index.html"))
  ? path.join(ROOT_DIR, "apps/main-web/dist")
  : path.join(ROOT_DIR, "dist");

const BASE_URL = "https://subdomens.projekt-nexus.sk";

// Kánonický zoznam všetkých trás pre vygenerovanie statických HTML snapshotov
const SUBDOMAIN_ROUTES = [
  "/",
  "/home",
  "/blog",
  "/operators",
  "/settings",
  "/vop",
  "/privacy",
  // 16 Kognitívnych subdoménových uzlov (ID00 – ID15)
  "/sub00",
  "/sub01",
  "/sub02",
  "/sub03",
  "/sub04",
  "/sub05",
  "/sub06",
  "/sub07",
  "/sub08",
  "/sub09",
  "/sub10",
  "/sub11",
  "/sub12",
  "/sub13",
  "/sub14",
  "/sub15",
];

async function executeSubdomainsPrerender() {
  console.log(
    "⚡ [NEXUS MASTER SEO V20]: Spúšťam prerender pre subdoménovú matricu (OS Genesis)...",
  );

  // 1. NAČÍTANIE CENTRÁLNEHO SEO REGISTRA ZO SHARED
  let SEO_REGISTRY = {};
  try {
    const registryPath = path.join(ROOT_DIR, "shared/src/data/seoRegistry.js");
    if (fs.existsSync(registryPath)) {
      const fileUrl = `file://${registryPath.replace(/\\/g, "/")}`;
      const mod = await import(fileUrl);
      SEO_REGISTRY = mod.SEO_REGISTRY || mod.default || {};
      console.log(
        "  🟢 [SEO REGISTRY]: shared/src/data/seoRegistry.js úspešne načítaný.",
      );
    } else {
      console.warn("  ⚠️ [SEO REGISTRY]: Súbor seoRegistry.js nebol nájdený!");
    }
  } catch (e) {
    console.warn(
      "  ⚠️ [SEO REGISTRY ERROR]: Zlyhal import seoRegistry.js:",
      e.message,
    );
  }

  const rootIndexPath = path.join(DIST_DIR, "index.html");
  if (!fs.existsSync(rootIndexPath)) {
    console.error(
      `  ❌ [FATAL]: Dist index.html neexistuje na ceste: ${rootIndexPath}. Najprv spusti build!`,
    );
    process.exit(1);
  }

  const templateHtml = fs.readFileSync(rootIndexPath, "utf8");
  let totalProcessed = 0;
  const sitemapUrls = [];

  // 2. GENEROVANIE PRE JEDNOTLIVÉ SUBDOMÉNOVÉ TRASY
  for (const route of SUBDOMAIN_ROUTES) {
    const seo = SEO_REGISTRY[route] || SEO_REGISTRY["/"] || {};

    const title = seo.title || "[ PROJEKT NEXUS OS | GENESIS EDITION ]";
    const desc =
      seo.description ||
      "Unikátny operačný systém (OS Genesis) integrujúci osobný rozvoj, hlbokú prácu a IT zručnosti.";
    const ogUrl = seo.ogUrl || `${BASE_URL}${route === "/" ? "" : route}`;
    const themeColor = seo.themeColor || "#39FF14";
    const image = seo.ogImage || "";

    const ogTags = `
    <!-- ⚡ V20 PRERENDER OPEN GRAPH & SEO -->
    <link rel="canonical" href="${ogUrl}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${ogUrl}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${desc}" />
    <meta property="og:image" content="${image}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content="${ogUrl}" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${desc}" />
    <meta name="twitter:image" content="${image}" />`;

    let customHtml = templateHtml
      .replace(/<title>.*?<\/title>/i, `<title>${title}</title>`)
      .replace(
        /<meta\s+name=["']description["']\s+content=["'].*?["']\s*\/?>/i,
        `<meta name="description" content="${desc}" />`,
      )
      .replace(
        /<meta\s+name=["']theme-color["']\s+content=["'].*?["']\s*\/?>/i,
        `<meta name="theme-color" content="${themeColor}" />`,
      );

    // Injekcia tagov pred uzatvárací </head>
    customHtml = customHtml.replace("</head>", `${ogTags}\n</head>`);

    if (route === "/") {
      fs.writeFileSync(rootIndexPath, customHtml, "utf8");
    } else {
      const routeDir = path.join(DIST_DIR, route.replace(/^\//, ""));
      fs.mkdirSync(routeDir, { recursive: true });
      fs.writeFileSync(path.join(routeDir, "index.html"), customHtml, "utf8");
    }

    sitemapUrls.push({
      loc: ogUrl,
      priority: route === "/" ? "1.0" : route.startsWith("/sub") ? "0.9" : "0.8",
    });

    totalProcessed++;
  }

  console.log(
    `  🟢 [PRERENDER COMPLETE]: Úspešne vygenerovaných ${totalProcessed} statických HTML snapshotov.`,
  );

  // 3. GENEROVANIE KÁNONICKEJ SITEMAP.XML PRE SUBDOMÉNY
  const today = new Date().toISOString().split("T");
  let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  sitemapXml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  for (const item of sitemapUrls) {
    sitemapXml += `  <url>\n`;
    sitemapXml += `    <loc>${item.loc}</loc>\n`;
    sitemapXml += `    <lastmod>${today}</lastmod>\n`;
    sitemapXml += `    <changefreq>weekly</changefreq>\n`;
    sitemapXml += `    <priority>${item.priority}</priority>\n`;
    sitemapXml += `  </url>\n`;
  }
  sitemapXml += `</urlset>\n`;

  // Zápis sitemap.xml do distu
  const sitemapDistPath = path.join(DIST_DIR, "sitemap.xml");
  fs.writeFileSync(sitemapDistPath, sitemapXml, "utf8");
  console.log(`  🟢 [SITEMAP DIST]: Uložená v ${sitemapDistPath}`);

  // Zápis do priečinka public (ak existuje v root alebo v apps/main-web)
  const publicDir = path.join(ROOT_DIR, "public");
  if (fs.existsSync(publicDir)) {
    fs.writeFileSync(path.join(publicDir, "sitemap.xml"), sitemapXml, "utf8");
    console.log(`  🟢 [SITEMAP PUBLIC]: Uložená v ${path.join(publicDir, "sitemap.xml")}`);
  }

  const mainWebPublicDir = path.join(ROOT_DIR, "apps/main-web/public");
  if (fs.existsSync(mainWebPublicDir)) {
    fs.writeFileSync(path.join(mainWebPublicDir, "sitemap.xml"), sitemapXml, "utf8");
    console.log(`  🟢 [SITEMAP MAIN-WEB PUBLIC]: Uložená v ${path.join(mainWebPublicDir, "sitemap.xml")}`);
  }

  console.log(
    `✅ [NEXUS MASTER SEO V20]: Hotovo. Všetkých ${totalProcessed} uzlov a sitemap sú synchronizované bez starého balastu!`,
  );
}

executeSubdomainsPrerender().catch((err) => {
  console.error("🔴 [SUBDOMAINS PRERENDER FATAL ERROR]:", err);
  process.exit(1);
});
