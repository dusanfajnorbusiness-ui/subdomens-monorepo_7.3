// ============================================================================
// ⚠️ OSTRÉ LOKÁLNE IMPORTY
// ============================================================================
// ⚡ Uprav si cestu a názov podľa tvojho nexusConfig.js
import { SEO_REGISTRY } from "@shared/data/seoRegistry.js";
import React from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

export const MetaTags = ({
  title,
  description,
  image,
  color,
  url,
  ogTitle,
  ogDescription,
  twitterTitle,
  twitterDescription,
}) => {
  // ⚡ Získanie aktuálnej URL adresy pre Chameleón Protokol
  const location = useLocation();
  const currentPath = location.pathname;

  // ⚡ SÉMANTICKÉ DEDENIE SEO DÁT (V20 SUBDOMAINS PROTOKOL)
  const getActiveSeo = (path) => {
    if (!SEO_REGISTRY) return {};

    // 1. Presná zhoda cesty v registri (napr. "/", "/home", "/blog", "/sub00")
    if (SEO_REGISTRY[path]) return SEO_REGISTRY[path];

    // 2. Kontrola cez hostname prehliadača (pre priame subdomény napr. mentor.projekt-nexus.sk)
    if (typeof window !== "undefined" && window.location?.hostname) {
      const host = window.location.hostname;
      if (SEO_REGISTRY[host]) return SEO_REGISTRY[host];
    }

    // 3. Extrakcia materskej cesty (index 0 namiesto celého poľa)
    const pathParts = String(path || "")
      .split("/")
      .filter(Boolean);
    const parentPath = pathParts.length > 0 ? `/${pathParts}` : "/";

    if (parentPath === "/operator" && SEO_REGISTRY["/operators"]) {
      return SEO_REGISTRY["/operators"];
    }

    if (SEO_REGISTRY[parentPath]) return SEO_REGISTRY[parentPath];

    // 4. Globálny fallback na koreň matrice
    return SEO_REGISTRY["/"] || {};
  };

  const inheritedSeo = getActiveSeo(currentPath);

  // 🛑 PRIORITIZAČNÝ PROTOKOL: Prop -> Register -> Default
  const finalTitle =
    title || inheritedSeo.title || "[ PROJEKT NEXUS OS | GENESIS EDITION ]";
  const finalDesc =
    description ||
    inheritedSeo.description ||
    "Unikátny operačný systém (OS Genesis) integrujúci osobný rozvoj, hlbokú prácu (Deep Work) a IT zručnosti.";
  const finalImage =
    image ||
    inheritedSeo.ogImage ||
    inheritedSeo.image ||
    (SEO_REGISTRY["/"] && SEO_REGISTRY["/"].ogImage) ||
    "";
  const finalColor = color || inheritedSeo.themeColor || "#39FF14";

  const finalOgTitle = ogTitle || inheritedSeo.ogTitle || finalTitle;
  const finalOgDesc = ogDescription || inheritedSeo.ogDescription || finalDesc;
  const finalTwitterTitle =
    twitterTitle || inheritedSeo.twitterTitle || finalOgTitle;
  const finalTwitterDesc =
    twitterDescription || inheritedSeo.twitterDescription || finalOgDesc;

  // 🛑 KÁNONICKÁ DOMÉNA: Žiadny hardcoded www prepis, rešpektujeme subdoménový register!
  const defaultBaseUrl =
    inheritedSeo.ogUrl || "https://subdomens.projekt-nexus.sk";

  const fullImageUrl = finalImage;

  const fullUrl = url
    ? url.startsWith("http")
      ? url
      : `${defaultBaseUrl}${url}`
    : inheritedSeo.ogUrl || `${defaultBaseUrl}${currentPath}`;

  return (
    <Helmet>
      {/* 🔮 ZÁKLADNÉ SEO A IDENTIFIKÁCIA UZLA */}

      <title>{finalTitle}</title>
      <meta name="description" content={finalDesc} />
      <meta name="theme-color" content={finalColor} />

      {/* 🌐 OPEN GRAPH / FACEBOOK / LINKEDIN */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={finalOgTitle} />
      <meta property="og:description" content={finalOgDesc} />
      <meta property="og:image" content={fullImageUrl} />

      {/* 🔖 TWITTER / X CARD PROTOCOL */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={finalTwitterTitle} />
      <meta name="twitter:description" content={finalTwitterDesc} />
      <meta name="twitter:image" content={fullImageUrl} />
    </Helmet>
  );
};
export default MetaTags;
