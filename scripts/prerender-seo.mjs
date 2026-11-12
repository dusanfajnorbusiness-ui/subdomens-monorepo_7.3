/* eslint-disable no-undef */

// ============================================================================
// 👑 PROJECT NEXUS — OS GENESIS EDITION (SYS03 MASTER DATASET V20.95)
// Súbor: scripts/prerender-seo.mjs
// Status: 100% GROUNDED // MASTER GLOBAL SEO PRERENDER ENGINE (ROOT V20)
// ============================================================================

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");

// 🗺️ MAPOVANIE APPLIKÁCIÍ A ICH PRODUKČNÝCH DIST ADRESÁROV
const APP_TARGETS = {
  "main-web": path.join(ROOT_DIR, "apps/main-web/dist"),
  agency: path.join(ROOT_DIR, "apps/agency/dist"),
  shop: path.join(ROOT_DIR, "apps/shop/dist"),
  operators: path.join(ROOT_DIR, "apps/operators/dist"),
  settings: path.join(ROOT_DIR, "apps/settings/dist"),
  admin: path.join(ROOT_DIR, "apps/admin/dist"),
  blog: path.join(ROOT_DIR, "apps/blog/dist"),
  uplink: path.join(ROOT_DIR, "apps/uplink/dist"),
};

const baseUrl = "https://projekt-nexus.sk";

async function executeGlobalPrerender() {
  console.log(
    "⚡ [NEXUS MASTER SEO V20]: Spúšťam globálny SEO Snapshot & Prerender pre celé monorepo...",
  );

  // 1. NAČÍTANIE ZDIELANÉHO SEO REGISTRA ZO SHARED
  let SEO_REGISTRY = {};
  try {
    const registryPath = path.join(ROOT_DIR, "shared/src/data/seoRegistry.js");
    if (fs.existsSync(registryPath)) {
      const fileUrl = `file://${registryPath.replace(/\\/g, "/")}`;
      const mod = await import(fileUrl);
      SEO_REGISTRY = mod.SEO_REGISTRY || mod.default || {};
      console.log(
        "  🟢 [SEO REGISTRY]: Zbernica /shared/src/data/seoRegistry.js úspešne načítaná.",
      );
    }
  } catch (e) {
    console.warn(
      "  ⚠️ [SEO REGISTRY WARNING]: Zlyhal import shared/src/data/seoRegistry.js:",
      e.message,
    );
  }

  let totalProcessed = 0;
  const globalSitemapRoutes = new Set();

  // 2. EXEKÚCIA PRE KAŽDÚ APLIKÁCIU V MONOREPE
  for (const [appName, distPath] of Object.entries(APP_TARGETS)) {
    const indexPath = path.join(distPath, "index.html");

    if (!fs.existsSync(indexPath)) {
      console.log(
        `  ⏩ [SKIP APP]: ${appName} nemá vygenerovaný dist/index.html (presakujem).`,
      );
      continue;
    }

    const templateHtml = fs.readFileSync(indexPath, "utf8");
    const appRoute = appName === "main-web" ? "/" : `/${appName}`;
    const seo = SEO_REGISTRY[appRoute] || {};

    const title =
      seo.ogTitle || seo.title || `PROJEKT NEXUS | ${appName.toUpperCase()}`;
    const desc =
      seo.ogDescription ||
      seo.description ||
      `Oficiálny uzol ${appName} v Sieti OS Genesis.`;
    const ogUrl = seo.ogUrl || `${baseUrl}${appRoute}`;
    const canonicalUrl = seo.fallbackUrl || ogUrl;
    const themeColor = seo.themeColor || "#39FF14";
    const image =
      seo.ogImage || seo.image || `${baseUrl}/img-nexus/pages/homePage.jpg`;

    const ogTags = `
    <link rel="canonical" href="${canonicalUrl}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${ogUrl}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${desc}" />
    <meta property="og:image" content="${image}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${desc}" />
    <meta name="twitter:image" content="${image}" />
    `;

    let customHtml = templateHtml
      .replace(/<title>.*?<\/title>/i, `<title>${title}</title>`)
      .replace(
        /<meta name="description" content=".*?"\s*\/?>/i,
        `<meta name="description" content="${desc}" />`,
      )
      .replace(
        /<meta name="theme-color" content=".*?"\s*\/?>/i,
        `<meta name="theme-color" content="${themeColor}" />`,
      );

    customHtml = customHtml.replace("</head>", `${ogTags}\n</head>`);
    fs.writeFileSync(indexPath, customHtml, "utf8");
    totalProcessed++;
    globalSitemapRoutes.add(appRoute);

    // Dynamic generation for 16 Cognitive Dimensions inside main-web
    if (appName === "main-web") {
      for (let i = 0; i <= 15; i++) {
        const dimId = `ID${i.toString().padStart(2, "0")}`;
        const dimRoute = `/${dimId}`;
        const dimTargetDir = path.join(distPath, dimId);
        fs.mkdirSync(dimTargetDir, { recursive: true });

        const dimSeo = SEO_REGISTRY[dimRoute] || {};
        const dimTitle = dimSeo.title || `PROJEKT NEXUS | Dimenzia ${dimId}`;
        const dimDesc =
          dimSeo.description ||
          `Sémantická matrica a dátový uzol ${dimId} pre OS Genesis.`;
        const dimCanonical =
          dimSeo.fallbackUrl || dimSeo.ogUrl || `${baseUrl}${dimRoute}`;

        const dimOgTags = `
        <link rel="canonical" href="${dimCanonical}" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="${dimSeo.ogUrl || dimCanonical}" />
        <meta property="og:title" content="${dimTitle}" />
        <meta property="og:description" content="${dimDesc}" />
        `;

        let dimHtml = templateHtml
          .replace(/<title>.*?<\/title>/i, `<title>${dimTitle}</title>`)
          .replace(
            /<meta name="description" content=".*?"\s*\/?>/i,
            `<meta name="description" content="${dimDesc}" />`,
          );

        dimHtml = dimHtml.replace("</head>", `${dimOgTags}\n</head>`);
        fs.writeFileSync(
          path.join(dimTargetDir, "index.html"),
          dimHtml,
          "utf8",
        );
        totalProcessed++;
        globalSitemapRoutes.add(dimRoute);
      }
    }

    console.log(`  🟢 [SEO SNAPSHOT GENERATED] ➔ App: ${appName}`);
  }

  // 3. GENERISANIE GLOBÁLNEJ SITEMAP.XML IN ROOT & DIST
  const today = new Date().toISOString().split("T");
  let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  sitemapXml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  Array.from(globalSitemapRoutes)
    .sort()
    .forEach((route) => {
      const fullUrl = route === "/" ? baseUrl : `${baseUrl}${route}`;
      sitemapXml += `  <url>\n`;
      sitemapXml += `    <loc>${fullUrl}</loc>\n`;
      sitemapXml += `    <lastmod>${today}</lastmod>\n`;
      sitemapXml += `    <changefreq>weekly</changefreq>\n`;
      sitemapXml += `    <priority>${route === "/" ? "1.0" : "0.8"}</priority>\n`;
      sitemapXml += `  </url>\n`;
    });
  sitemapXml += `</urlset>\n`;

  const publicSitemapPath = path.join(ROOT_DIR, "public/sitemap.xml");
  const mainWebDistSitemapPath = path.join(
    ROOT_DIR,
    "apps/main-web/dist/sitemap.xml",
  );

  if (fs.existsSync(path.join(ROOT_DIR, "public"))) {
    fs.writeFileSync(publicSitemapPath, sitemapXml, "utf8");
  }
  if (fs.existsSync(path.join(ROOT_DIR, "apps/main-web/dist"))) {
    fs.writeFileSync(mainWebDistSitemapPath, sitemapXml, "utf8");
  }

const mainDist = path.join(ROOT_DIR, "apps/main-web/dist");
  const subApps = ["agency", "shop", "blog", "operators", "settings", "admin", "uplink"];

  if (fs.existsSync(mainDist)) {
    subApps.forEach((subApp) => {
      const srcDist = path.join(ROOT_DIR, `apps/${subApp}/dist`);
      const targetDist = path.join(mainDist, subApp);
      if (fs.existsSync(srcDist)) {
        fs.cpSync(srcDist, targetDist, { recursive: true });
        console.log(`📦 [V20 DIST SYNC]: apps/${subApp}/dist ➔ main-web/dist/${subApp}`);
      }
    });
  }

  console.log(
    `✅ [NEXUS MASTER SEO V20]: Úspešne vygenerovaných ${totalProcessed} statických uzlov a sitemap.xml!`,
  );
}

executeGlobalPrerender().catch((err) => {
  console.error("🔴 [GLOBAL SEO FATAL ERROR]:", err);
  process.exit(1);
});
