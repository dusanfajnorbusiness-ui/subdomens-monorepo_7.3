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

  // ⚡ SÉMANTICKÉ DEDENIE SEO DÁT
  const getActiveSeo = (path) => {
    // 1. Záchranná brzda, ak by zlyhal import
    if (!SEO_REGISTRY) return {};

    // 2. Presná zhoda (napr. "/", "/shop", "/operators")
    if (SEO_REGISTRY[path]) return SEO_REGISTRY[path];

    // 3. Extrakcia materskej dimenzie (napr. z "/shop/protocols" vyreže iba "shop")
    // Rozbijeme URL a odstránime všetky prázdne znaky
    // Z adresy "/shop/cashflow" vznikne čisté pole: ["shop", "cashflow"]
    const pathParts = path.split("/").filter(Boolean);

    // 🛑 KĽÚČOVÁ OPRAVA: Vyberáme výhradne prvý prvok poľa (index 0 -> napr. "shop")
    const parentPath = pathParts.length > 0 ? `/${pathParts}` : "/";

    // 4. Špecifická výnimka pre operátorov (ak URL je /operator/... -> dedí z /operators)
    if (parentPath === "/operator" && SEO_REGISTRY["/operators"]) {
      return SEO_REGISTRY["/operators"];
    }

    // 5. Dedenie z Materskej kategórie (ak existuje)
    if (SEO_REGISTRY[parentPath]) return SEO_REGISTRY[parentPath];

    // 6. Ultimátny Fallback na Home Page pre absolútne neznáme uzly
    return SEO_REGISTRY["/"] || {};
  };

  const inheritedSeo = getActiveSeo(currentPath);

  // 🛑 PRIORITIZAČNÝ PROTOKOL: Ak komponent nedostane prop, potiahne si dáta z Registra
  const finalTitle =
    title || inheritedSeo.title || "Projekt Nexus OS: Genesis Edition";
  const finalDesc =
    description ||
    inheritedSeo.description ||
    "Digitálny operačný systém pre ľudské vedomie. Odinštaluj chaos, nasadzujeme čistý kód.";
  const finalImage =
    image ||
    inheritedSeo.ogImage ||
    inheritedSeo.image ||
    "/img-nexus/pages/homePage.jpg";
  const finalColor = color || inheritedSeo.themeColor || "#39FF14";

  const finalOgTitle = ogTitle || inheritedSeo.ogTitle || finalTitle;
  const finalOgDesc = ogDescription || inheritedSeo.ogDescription || finalDesc;
  const finalTwitterTitle =
    twitterTitle || inheritedSeo.twitterTitle || finalOgTitle;
  const finalTwitterDesc =
    twitterDescription || inheritedSeo.twitterDescription || finalOgDesc;

  // 🛑 KĽÚČOVÁ OPRAVA: Doména musí byť natvrdo s "www", inak Facebook robí 307 slučku!
  const baseUrl = "https://www.projekt-nexus.sk";

  const fullImageUrl = finalImage.startsWith("http")
    ? finalImage
    : `${baseUrl}${finalImage}`;

  const fullUrl = url
    ? url.startsWith("http")
      ? url
      : `${baseUrl}${url}`
    : `${baseUrl}${currentPath}`;

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
