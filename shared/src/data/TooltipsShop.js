// ============================================================================
// 👑 PROJECT NEXUS — OS GENESIS EDITION (TOOLTIPS SHOP DATA REGISTER V20.76)
// File: src/data/TooltipsShop.js
// Status: SINGLE SOURCE OF TRUTH FOR ALL SHOP TOOLTIPS & HELP MESSAGES
// ============================================================================

export const TOOLTIP_CONFIG = {
  SCAN_DELAY_MS: 1500, // Presne 1.5 sekundy skenovania
  MYSTERY_SYMBOL: "❓",
  MYSTERY_TITLE: "[ ❓ SKENUJE SA... ]",
};

export const SHOP_TOOLTIPS = {
  // --- TABS ---
  TAB_SHOP:
    "Hlavný komerčný e-shop Nexus OS Genesis: Členstvá, OC Balíky, Matrix FX a IT Služby.",
  TAB_VIDEOS: "Sémantické video prehľady, trailery a masterclassy OS Genesis.",
  TAB_AUDIOS: "Hovorené slovo, mp3 taktické lekcie a tónové stimulácie.",
  TAB_IMAGES: "Galéria 3D Hybrid Robotic Avatarov (ID00 - ID20) pre profil.",
  TAB_DOCUMENTS:
    "Vedomostný trezor: 69x PDF a PPTX taktických manuálov OS Genesis.",

  // --- TIERS ---
  FREE: "Bezplatná verzia prístupná pre všetkých návštevníkov a členov Kmeňa ZDARMA (0.00 € / 0 OC).",
  PRO: "Prémiová úroveň pre pokročilých vývojárov a operátorov OS Genesis (4 900 OC / 49.00 €).",
  OMEGA:
    "Kompletný neobmedzený kódex s plnou licenciou a VIP dátami (6 900 OC / 69.00 €).",
  MASTER:
    "Vlajková loď a B2B Enterprise kódex s bionickým vodoznakom (9 900 OC / 99.00 €).",
  ZDARMA:
    "Bezplatný produkt prístupný pre voľné sťahovanie a použitie bez kreditov.",
  FREEMIUM: "Bezplatná základná úroveň s možnosťou rozšírenia na vyššie TIERS.",
  PROMIUM: "Prémiový balík výhod pre profesionálne nasadenie.",
  OMEGAMIUM: "Ultra VIP kódex so všetkými prístupovými kľúčmi.",
  MASTERMIUM: "Enterprise úroveň s plným zdrojovým kódom a podporou.",

  // --- SUBCATEGORIES ---
  SUBCAT_ALL: "Zobraziť všetky dostupné produkty, balíky a služby v obchode.",
  SUBCAT_MEMBERSHIP:
    "Mesačné a doživotné členstvá OS Genesis (PRO, OMEGA, MASTER).",
  SUBCAT_PACKS: "Dobíjanie kreditov OC (Pocket, Starter, Marathon, Omega Key).",
  SUBCAT_MATRIX_FX: "Vizuálne a zvukové anomálie pre zvýšenie imerzie.",
  SUBCAT_SERVICES: "B2B IT Služby, diagnostika kódu, audit a ghostwriting.",
  SUBCAT_ZMENAREN:
    "Zmenáreň a kurzový lístok OC kreditov pre okamžitú konverziu.",
  SUBCAT_CASHFLOW:
    "Kiyosaki Cashflow terminal, história transakcií a saldo účtu.",

  // --- LAYOUTS ---
  GRID_3:
    "Zobraziť štandardnú mriežku s veľkými obálkami a detailným náhľadom.",
  GRID_MEDIUM:
    "Zobraziť kompaktnú mriežku so zmenšenými kartami pre rýchlejšie prehliadanie.",
  LIST: "Zobraziť čistú dátovú tabuľku bez obrázkov pre bleskovú navigáciu.",

  // --- BUTTONS & ACTIONS ---
  DETAIL:
    "Otvoriť detailný 6-dielny protokol, zameranie, pointu a technické špecifikácie.",
  BUY_OC: "Odomknúť a stiahnuť produkt pomocou vášho saldo konta OC kreditov.",
  BUY_STANDBY:
    "⚡ Predaj je dočasne pozastavený. Systém očakáva dokončenie cloudového exportu súborov.",
  COPY_LINK:
    "Skopírovať trvalý URL odkaz do schránky pre zdieľanie alebo nastavenia profilu.",
  PREVIEW: "Spustiť živý audio/video prehrávač v Standby režime.",
  ZIP_DOWNLOAD: "Stiahnuť zbalený ZIP archív priamo zo Supabase Storage CDN.",

  // --- CATEGORIES & NAV ---
  EXPAND_ALL: "Rozbaliť všetky kategórie a sémantické akordeóny obchodu.",
  COLLAPSE_ALL: "Zbaliť všetky kategórie do úsporného prehľadového zobrazenia.",
  CENNIK:
    "Prehľad konverzných kurzov, cenníkových matíc a balíkových zliav (až 70% zľava).",
  BADGE_CATEGORY: "Sémantická kategória zaradenia uzla v obchode OS Genesis.",
  SERVICE_GROUP: "Filtrovať IT služby podľa typu zamerania.",
};

// ============================================================================
// 🖼️ SYS 03: NEXUS IMG GALLERY TOOLTIP REGISTRY (V20 KÁNON)
// ============================================================================
export const SYS03_GALLERY_TOOLTIPS = {
  copyUrl: {
    title: "SKOPÍROVAŤ CDN LINK",
    text: "Vloží do systémovej schránky priamu, vysokorýchlostnú Supabase CDN URL adresu vo zvolenom pomere strán.",
  },
  lightbox: {
    title: "CYBER LIGHTBOX (FULLSCREEN)",
    text: "Otvorí detailný náhľad aktíva s technickou telemetriou (rozlíšenie, veľkosť, kontrolný súčet SHA-256).",
  },
  download: {
    title: "STIAHNUŤ MASTER GRAFIKU",
    text: "Priame stiahnutie 8K/4K mastra. Pre Bot Avatarov vyžaduje overenú identitu a príslušný TIER.",
  },
  botLock: {
    title: "PRÉMIOVÝ BOT AVATAR (ZAMKNUTÉ)",
    text: "Tento 3D avatar patrí medzi prémiové licencie. Kliknutím otvoríš GlobalPaywallModal pre odomknutie doživotného prístupu.",
  },
  ratios: {
    feed: "Formát 1:1 (Štvorec) — Optimalizovaný pre Instagram feed, Discord a avatary.",
    shorts:
      "Formát 9:16 (Vertikál) — Pre TikTok, YouTube Shorts a mobilné storky.",
    desktop:
      "Formát 16:9 (Širokouhlý) — Web bannery, prezentácie a desktop tapety.",
  },
};

export const getTooltip = (key, defaultText = "") => {
  if (!key) return defaultText || "Dátový uzol OS Genesis.";
  const cleanKey = String(key).toUpperCase().trim();
  return SHOP_TOOLTIPS[cleanKey] || defaultText || "Dátový uzol OS Genesis.";
};

export default SHOP_TOOLTIPS;
