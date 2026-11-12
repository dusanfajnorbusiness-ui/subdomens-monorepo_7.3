// ============================================================================
// 👑 PROJECT NEXUS — OS GENESIS EDITION & NEXUS AGENCY
// File: src/data/seoRegistry.js
// Status: STRICTLY GROUNDED // 100% SUPABASE CDN READY // LEGACY IMG MIGRATION COMPLETE
// Core Version: SEO-REGISTRY V20.90_STABLE // OPEN GRAPH & TWITTER CARDS
// Author: Dušan Fajnor @nexus-core2Mb (CyberTech Architect)
// ============================================================================

/**
 * 🗺️ NEXUS SEO REGISTRY (Centrálna matrica pre Open Graph a MetaTagy)
 *
 * Všetky náhľadové obrázky boli úspešne migrované zo zastaralých lokálnych /img-nexus/
 * na 100% verejne prístupné, bleskovo rýchle a chybám 404 imúnne Supabase Storage CDN endpointy.
 *
 * Architektúra trás:
 * 1. Root Home ("/") - Hlavná vstupná brána OS Genesis
 * 2. Nexus Agency ("/agency") - B2B IT Infraštruktúra & Jedno-členná IT Armáda
 * 3. Kognitívne Dimenzie (/ID00 až /ID15)
 * 4. Systémové Uzly (/blog, /operators, /settings, /login)
 * 5. E-Shop Súrodenci (/shop, /shop/documents, /shop/images, /shop/audios, /shop/videos, /shop/apps)
 * 6. Systémové Moduly (/nexus_img_gallery, /nexus_video_gallery, /video_mentoring, /video_nodes, /nexus_directory)
 * 7. Právna Integrita (/vop, /privacy, /404.html)
 */

export const CDN_BASE =
  "https://ljyvsolsgliephsfkfgx.supabase.co/storage/v1/object/public/shop/images";

export const SITE_URL = "https://projekt-nexus.sk";
export const AGENCY_URL = "https://agency.projekt-nexus.sk";
export const SHOP_URL = "https://shop.projekt-nexus.sk";
export const OPERATORS_URL = "https://operators.projekt-nexus.sk";
export const SETTINGS_URL = "https://settings.projekt-nexus.sk";
export const BLOG_URL = "https://blog.projekt-nexus.sk";
export const UPLINK_URL = "https://uplink.projekt-nexus.sk";
export const ADMIN_URL = "https://admin.projekt-nexus.sk";

export const SEO_REGISTRY = {
  "/": {
    title:
      "[ PROJEKT NEXUS OS | GENESIS EDITION ]: Digitálny Operačný Systém pre Myseľ a Finančnú Slobodu",
    description:
      "Unikátny operačný systém (OS Genesis) integrujúci osobný rozvoj, hlbokú prácu (Deep Work), IT zručnosti a správu financií. Prestaň prežívať, začni tvoriť.",
    themeColor: "#39FF14",
    ogUrl: "https://projekt-nexus.sk",
    ogType: "website",
    ogTitle:
      "[ PROJEKT NEXUS OS | GENESIS EDITION ]: Digitálny Operačný Systém pre Myseľ a Finančnú Slobodu",
    ogDescription:
      "Unikátny operačný systém (OS Genesis) integrujúci osobný rozvoj, hlbokú prácu (Deep Work), IT zručnosti a správu financií. Prestaň prežívať, začni tvoriť.",
    ogImage:
      "https://ljyvsolsgliephsfkfgx.supabase.co/storage/v1/object/public/shop/images/osGenesis_BrandManifesto/nexus_os_thumb_16x9.png",
    twitterCard: "summary_large_image",
    twitterTitle:
      "[ PROJEKT NEXUS OS | GENESIS EDITION ]: Digitálny Operačný Systém pre Myseľ a Finančnú Slobodu",
    twitterDescription:
      "Unikátny operačný systém (OS Genesis) integrujúci osobný rozvoj, hlbokú prácu (Deep Work), IT zručnosti a správu financií. Prestaň prežívať, začni tvoriť.",
    twitterImage:
      "https://ljyvsolsgliephsfkfgx.supabase.co/storage/v1/object/public/shop/images/osGenesis_BrandManifesto/nexus_os_thumb_16x9.png",
  },
  "/agency": {
    title:
      "[ NEXUS AGENCY | DIGITAL INFRASTRUCTURE ]: Digitálna Infraštruktúra & B2B IT Exekúcia | Jedno-členná IT Armáda",
    description:
      "Komerčný Work UI Space a taktická základňa Jedno-člennej IT armády. Front-end chirurgia, UI/UX audity webov, dátová organizácia a vývoj softvéru na mieru.",
    themeColor: "#00F3FF",
    ogUrl: "https://agency.projekt-nexus.sk",
    ogType: "website",
    ogTitle:
      "[ NEXUS AGENCY | DIGITAL INFRASTRUCTURE ]: Digitálna Infraštruktúra & B2B IT Exekúcia | Jedno-členná IT Armáda",
    ogDescription:
      "Komerčný Work UI Space a taktická základňa Jedno-člennej IT armády. Front-end chirurgia, UI/UX audity webov, dátová organizácia a vývoj softvéru na mieru.",
    ogImage:
      "https://ljyvsolsgliephsfkfgx.supabase.co/storage/v1/object/public/shop/images/nexusAgency_BrandManifesto/nexus_agency_thumb_16x9.png",
    twitterCard: "summary_large_image",
    twitterTitle:
      "[ NEXUS AGENCY | DIGITAL INFRASTRUCTURE ]: Digitálna Infraštruktúra & B2B IT Exekúcia | Jedno-členná IT Armáda",
    twitterDescription:
      "Komerčný Work UI Space a taktická základňa Jedno-člennej IT armády. Front-end chirurgia, UI/UX audity webov, dátová organizácia a vývoj softvéru na mieru.",
    twitterImage:
      "https://ljyvsolsgliephsfkfgx.supabase.co/storage/v1/object/public/shop/images/nexusAgency_BrandManifesto/nexus_agency_thumb_16x9.png",
  },
  "/ID00": {
    title: "MENTOR-HUB: AI Mentoring a Filozofické Konzultácie | NEXUS OS",
    description:
      "Prístup k syntetickým mentorom a kognitívnym modelom. Asynchrónne dialógy o zmysle bytia, prekonávaní kríz a optimalizácii vedomia.",
    themeColor: "#FFFFFF",
    ogUrl: "https://mentor.projekt-nexus.sk",
    fallbackUrl: "https://projekt-nexus.sk/ID00",
    ogType: "website",
    ogTitle: "MENTOR-HUB: AI Mentoring a Filozofické Konzultácie | NEXUS OS",
    ogDescription:
      "Prístup k syntetickým mentorom a kognitívnym modelom. Asynchrónne dialógy o zmysle bytia, prekonávaní kríz a optimalizácii vedomia.",
    ogImage:
      "https://ljyvsolsgliephsfkfgx.supabase.co/storage/v1/object/public/shop/images/dimenzieMaster/16x9_desktop/id00-mentor-hub-16x9.jpg",
    twitterCard: "summary_large_image",
    twitterTitle:
      "MENTOR-HUB: AI Mentoring a Filozofické Konzultácie | NEXUS OS",
    twitterDescription:
      "Prístup k syntetickým mentorom a kognitívnym modelom. Asynchrónne dialógy o zmysle bytia, prekonávaní kríz a optimalizácii vedomia.",
    twitterImage:
      "https://ljyvsolsgliephsfkfgx.supabase.co/storage/v1/object/public/shop/images/dimenzieMaster/16x9_desktop/id00-mentor-hub-16x9.jpg",
  },
  "/ID01": {
    title:
      "IDENTITY-CORE: Osobný rozvoj, psychológia a ovládnutie mysle | NEXUS OS",
    description:
      "Dekonštrukcia parazitického ega a prechod do bdelého Svedka. Psychologická stabilizácia, riešenie existenciálnych kríz a budovanie pevného charakteru.",
    themeColor: "#39FF14",
    ogUrl: "https://personal.projekt-nexus.sk",
    fallbackUrl: "https://projekt-nexus.sk/ID01",
    ogType: "website",
    ogTitle:
      "IDENTITY-CORE: Osobný rozvoj, psychológia a ovládnutie mysle | NEXUS OS",
    ogDescription:
      "Dekonštrukcia parazitického ega a prechod do bdelého Svedka. Psychologická stabilizácia, riešenie existenciálnych kríz a budovanie pevného charakteru.",
    ogImage:
      "https://ljyvsolsgliephsfkfgx.supabase.co/storage/v1/object/public/shop/images/dimenzieMaster/16x9_desktop/id01-identity-core-16x9.jpg",
    twitterCard: "summary_large_image",
    twitterTitle:
      "IDENTITY-CORE: Osobný rozvoj, psychológia a ovládnutie mysle | NEXUS OS",
    twitterDescription:
      "Dekonštrukcia parazitického ega a prechod do bdelého Svedka. Psychologická stabilizácia, riešenie existenciálnych kríz a budovanie pevného charakteru.",
    twitterImage:
      "https://ljyvsolsgliephsfkfgx.supabase.co/storage/v1/object/public/shop/images/dimenzieMaster/16x9_desktop/id01-identity-core-16x9.jpg",
  },
  "/ID02": {
    title: "THE-WORKFLOW: Produktivita, Deep Work a Time Management | NEXUS OS",
    description:
      "Eliminácia prokrastinácie, nastavenie nekompromisného denného režimu a hlboká práca (Deep Work). Premeň svoj čas na nezvratné výsledky.",
    themeColor: "#FFEB3B",
    ogUrl: "https://work.projekt-nexus.sk",
    fallbackUrl: "https://projekt-nexus.sk/ID02",
    ogType: "website",
    ogTitle:
      "THE-WORKFLOW: Produktivita, Deep Work a Time Management | NEXUS OS",
    ogDescription:
      "Eliminácia prokrastinácie, nastavenie nekompromisného denného režimu a hlboká práca (Deep Work). Premeň svoj čas na nezvratné výsledky.",
    ogImage:
      "https://ljyvsolsgliephsfkfgx.supabase.co/storage/v1/object/public/shop/images/dimenzieMaster/16x9_desktop/id02-the-workflow-16x9.jpg",
    twitterCard: "summary_large_image",
    twitterTitle:
      "THE-WORKFLOW: Produktivita, Deep Work a Time Management | NEXUS OS",
    twitterDescription:
      "Eliminácia prokrastinácie, nastavenie nekompromisného denného režimu a hlboká práca (Deep Work). Premeň svoj čas na nezvratné výsledky.",
    twitterImage:
      "https://ljyvsolsgliephsfkfgx.supabase.co/storage/v1/object/public/shop/images/dimenzieMaster/16x9_desktop/id02-the-workflow-16x9.jpg",
  },
  "/ID03": {
    title:
      "CASH-ENGINE: Správa osobných financií a likvidácia dlhov | NEXUS OS",
    description:
      "Exaktné tabuľky, rozpočtový minimalizmus a algoritmy na oddlženie. Vybuduj si pevnú finančnú imunitu a zastav plytvanie kapitálom.",
    themeColor: "#FFD700",
    ogUrl: "https://finance.projekt-nexus.sk",
    fallbackUrl: "https://projekt-nexus.sk/ID03",
    ogType: "website",
    ogTitle:
      "CASH-ENGINE: Správa osobných financií a likvidácia dlhov | NEXUS OS",
    ogDescription:
      "Exaktné tabuľky, rozpočtový minimalizmus a algoritmy na oddlženie. Vybuduj si pevnú finančnú imunitu a zastav plytvanie kapitálom.",
    ogImage:
      "https://ljyvsolsgliephsfkfgx.supabase.co/storage/v1/object/public/shop/images/dimenzieMaster/16x9_desktop/id03-cash-engine-16x9.jpg",
    twitterCard: "summary_large_image",
    twitterTitle:
      "CASH-ENGINE: Správa osobných financií a likvidácia dlhov | NEXUS OS",
    twitterDescription:
      "Exaktné tabuľky, rozpočtový minimalizmus a algoritmy na oddlženie. Vybuduj si pevnú finančnú imunitu a zastav plytvanie kapitálom.",
    twitterImage:
      "https://ljyvsolsgliephsfkfgx.supabase.co/storage/v1/object/public/shop/images/dimenzieMaster/16x9_desktop/id03-cash-engine-16x9.jpg",
  },
  "/ID04": {
    title: "REVENUE-ARCHITECT: Budovanie biznisu a predajné lieviky | NEXUS OS",
    description:
      "Prechod zo zamestnanca na architekta vlastného príjmu. Tvorba asymetrických ponúk, predajných systémov a monetizácia tvojich schopností.",
    themeColor: "#FFAA00",
    ogUrl: "https://business.projekt-nexus.sk",
    fallbackUrl: "https://projekt-nexus.sk/ID04",
    ogType: "website",
    ogTitle:
      "REVENUE-ARCHITECT: Budovanie biznisu a predajné lieviky | NEXUS OS",
    ogDescription:
      "Prechod zo zamestnanca na architekta vlastného príjmu. Tvorba asymetrických ponúk, predajných systémov a monetizácia tvojich schopností.",
    ogImage:
      "https://ljyvsolsgliephsfkfgx.supabase.co/storage/v1/object/public/shop/images/dimenzieMaster/16x9_desktop/id04-revenue-architect-16x9.jpg",
    twitterCard: "summary_large_image",
    twitterTitle:
      "REVENUE-ARCHITECT: Budovanie biznisu a predajné lieviky | NEXUS OS",
    twitterDescription:
      "Prechod zo zamestnanca na architekta vlastného príjmu. Tvorba asymetrických ponúk, predajných systémov a monetizácia tvojich schopností.",
    twitterImage:
      "https://ljyvsolsgliephsfkfgx.supabase.co/storage/v1/object/public/shop/images/dimenzieMaster/16x9_desktop/id04-revenue-architect-16x9.jpg",
  },
  "/ID05": {
    title: "ASSETS-MATRIX: Investovanie, pasívny príjem a ETF fondy | NEXUS OS",
    description:
      "Chladná investičná stratégia bez emócií. Pravidelné DCA nákupy, budovanie dlhodobého portfólia a tvorba skutočného pasívneho bohatstva.",
    themeColor: "#FF8C00",
    ogUrl: "https://investments.projekt-nexus.sk",
    fallbackUrl: "https://projekt-nexus.sk/ID05",
    ogType: "website",
    ogTitle:
      "ASSETS-MATRIX: Investovanie, pasívny príjem a ETF fondy | NEXUS OS",
    ogDescription:
      "Chladná investičná stratégia bez emócií. Pravidelné DCA nákupy, budovanie dlhodobého portfólia a tvorba skutočného pasívneho bohatstva.",
    ogImage:
      "https://ljyvsolsgliephsfkfgx.supabase.co/storage/v1/object/public/shop/images/dimenzieMaster/16x9_desktop/id05-assets-matrix-16x9.jpg",
    twitterCard: "summary_large_image",
    twitterTitle:
      "ASSETS-MATRIX: Investovanie, pasívny príjem a ETF fondy | NEXUS OS",
    twitterDescription:
      "Chladná investičná stratégia bez emócií. Pravidelné DCA nákupy, budovanie dlhodobého portfólia a tvorba skutočného pasívneho bohatstva.",
    twitterImage:
      "https://ljyvsolsgliephsfkfgx.supabase.co/storage/v1/object/public/shop/images/dimenzieMaster/16x9_desktop/id05-assets-matrix-16x9.jpg",
  },
  "/ID06": {
    title:
      "DATA-ABSORBER: Akcelerované učenie a Hlboká práca (Deep Work) | NEXUS OS",
    description:
      "Ako rýchlo absorbovať komplexné vedomosti, čítať odbornú literatúru a prepájať dáta. Zvýš priepustnosť svojho biologického procesora.",
    themeColor: "#BF00FF",
    ogUrl: "https://study.projekt-nexus.sk",
    fallbackUrl: "https://projekt-nexus.sk/ID06",
    ogType: "website",
    ogTitle:
      "DATA-ABSORBER: Akcelerované učenie a Hlboká práca (Deep Work) | NEXUS OS",
    ogDescription:
      "Ako rýchlo absorbovať komplexné vedomosti, čítať odbornú literatúru a prepájať dáta. Zvýš priepustnosť svojho biologického procesora.",
    ogImage:
      "https://ljyvsolsgliephsfkfgx.supabase.co/storage/v1/object/public/shop/images/dimenzieMaster/16x9_desktop/id06-data-absorber-16x9.jpg",
    twitterCard: "summary_large_image",
    twitterTitle:
      "DATA-ABSORBER: Akcelerované učenie a Hlboká práca (Deep Work) | NEXUS OS",
    twitterDescription:
      "Ako rýchlo absorbovať komplexné vedomosti, čítať odbornú literatúru a prepájať dáta. Zvýš priepustnosť svojho biologického procesora.",
    twitterImage:
      "https://ljyvsolsgliephsfkfgx.supabase.co/storage/v1/object/public/shop/images/dimenzieMaster/16x9_desktop/id06-data-absorber-16x9.jpg",
  },
  "/ID07": {
    title:
      "SKILLS-TREE: IT Zručnosti, Programovanie a Web Development | NEXUS OS",
    description:
      "Technický strom schopností. React, JavaScript, SCSS, databázy a architektúra webových aplikácií bez zbytočného akademického balastu.",
    themeColor: "#8A2BE2",
    ogUrl: "https://professional.projekt-nexus.sk",
    fallbackUrl: "https://projekt-nexus.sk/ID07",
    ogType: "website",
    ogTitle:
      "SKILLS-TREE: IT Zručnosti, Programovanie a Web Development | NEXUS OS",
    ogDescription:
      "Technický strom schopností. React, JavaScript, SCSS, databázy a architektúra webových aplikácií bez zbytočného akademického balastu.",
    ogImage:
      "https://ljyvsolsgliephsfkfgx.supabase.co/storage/v1/object/public/shop/images/dimenzieMaster/16x9_desktop/id07-skills-tree-16x9.jpg",
    twitterCard: "summary_large_image",
    twitterTitle:
      "SKILLS-TREE: IT Zručnosti, Programovanie a Web Development | NEXUS OS",
    twitterDescription:
      "Technický strom schopností. React, JavaScript, SCSS, databázy a architektúra webových aplikácií bez zbytočného akademického balastu.",
    twitterImage:
      "https://ljyvsolsgliephsfkfgx.supabase.co/storage/v1/object/public/shop/images/dimenzieMaster/16x9_desktop/id07-skills-tree-16x9.jpg",
  },
  "/ID08": {
    title:
      "EMPTY-BOOK: Sémantická knižnica, osobný rozvoj a recenzie | NEXUS OS",
    description:
      "Dekomprimované múdrosti z viac ako 230+ prečítaných kníh. Čistá esenia pre osobný rast, psychológiu a životnú filozofiu.",
    themeColor: "#00FFFF",
    ogUrl: "https://reader.projekt-nexus.sk",
    fallbackUrl: "https://projekt-nexus.sk/ID08",
    ogType: "website",
    ogTitle:
      "EMPTY-BOOK: Sémantická knižnica, osobný rozvoj a recenzie | NEXUS OS",
    ogDescription:
      "Dekomprimované múdrosti z viac ako 230+ prečítaných kníh. Čistá esenia pre osobný rast, psychológiu a životnú filozofiu.",
    ogImage:
      "https://ljyvsolsgliephsfkfgx.supabase.co/storage/v1/object/public/shop/images/dimenzieMaster/16x9_desktop/id08-empty-book-16x9.jpg",
    twitterCard: "summary_large_image",
    twitterTitle:
      "EMPTY-BOOK: Sémantická knižnica, osobný rozvoj a recenzie | NEXUS OS",
    twitterDescription:
      "Dekomprimované múdrosti z viac ako 230+ prečítaných kníh. Čistá esenia pre osobný rast, psychológiu a životnú filozofiu.",
    twitterImage:
      "https://ljyvsolsgliephsfkfgx.supabase.co/storage/v1/object/public/shop/images/dimenzieMaster/16x9_desktop/id08-empty-book-16x9.jpg",
  },
  "/ID09": {
    title: "SERGEANT-CORE: CoDM Zombies, Herné Stratégie a Návody | NEXUS OS",
    description:
      "Taktické herné operácie a mentálny tréning cez Call of Duty Mobile Zombies. Návody na boss fighty, optimalizáciu výbavy a maximálny round survive.",
    themeColor: "#FF003C",
    ogUrl: "https://player.projekt-nexus.sk",
    fallbackUrl: "https://projekt-nexus.sk/ID09",
    ogType: "website",
    ogTitle: "SERGEANT-CORE: CoDM Zombies, Herné Stratégie a Návody | NEXUS OS",
    ogDescription:
      "Taktické herné operácie a mentálny tréning cez Call of Duty Mobile Zombies. Návody na boss fighty, optimalizáciu výbavy a maximálny round survive.",
    ogImage:
      "https://ljyvsolsgliephsfkfgx.supabase.co/storage/v1/object/public/shop/images/dimenzieMaster/16x9_desktop/id09-sergeant-core-16x9.jpg",
    twitterCard: "summary_large_image",
    twitterTitle:
      "SERGEANT-CORE: CoDM Zombies, Herné Stratégie a Návody | NEXUS OS",
    twitterDescription:
      "Taktické herné operácie a mentálny tréning cez Call of Duty Mobile Zombies. Návody na boss fighty, optimalizáciu výbavy a maximálny round survive.",
    twitterImage:
      "https://ljyvsolsgliephsfkfgx.supabase.co/storage/v1/object/public/shop/images/dimenzieMaster/16x9_desktop/id09-sergeant-core-16x9.jpg",
  },
  "/ID10": {
    title:
      "NONIDENTITY-CORE: Vnútorný pokoj, Wu-wei a Digitálny detox | NEXUS OS",
    description:
      "Ukotvenie v prítomnom okamihu. Princípy Wu-wei, odpútanie sa od digitálneho hluku a návrat k prirodzenému stavu tichého vedomia.",
    themeColor: "#0044FF",
    ogUrl: "https://home.projekt-nexus.sk",
    fallbackUrl: "https://projekt-nexus.sk/ID10",
    ogType: "website",
    ogTitle:
      "NONIDENTITY-CORE: Vnútorný pokoj, Wu-wei a Digitálny detox | NEXUS OS",
    ogDescription:
      "Ukotvenie v prítomnom okamihu. Princípy Wu-wei, odpútanie sa od digitálneho hluku a návrat k prirodzenému stavu tichého vedomia.",
    ogImage:
      "https://ljyvsolsgliephsfkfgx.supabase.co/storage/v1/object/public/shop/images/dimenzieMaster/16x9_desktop/id10-nonidentity-core-16x9.jpg",
    twitterCard: "summary_large_image",
    twitterTitle:
      "NONIDENTITY-CORE: Vnútorný pokoj, Wu-wei a Digitálny detox | NEXUS OS",
    twitterDescription:
      "Ukotvenie v prítomnom okamihu. Princípy Wu-wei, odpútanie sa od digitálneho hluku a návrat k prirodzenému stavu tichého vedomia.",
    twitterImage:
      "https://ljyvsolsgliephsfkfgx.supabase.co/storage/v1/object/public/shop/images/dimenzieMaster/16x9_desktop/id10-nonidentity-core-16x9.jpg",
  },
  "/ID11": {
    title:
      "THE-RECOVERY: Biohacking, Mentálne zdravie a Prevencia vyhorenia | NEXUS OS",
    description:
      "Fyzická a psychická regenerácia. Optimalizácia spánku, riešenie nespavosti, prevencia vyhorenia a reštart preťaženého nervového systému.",
    themeColor: "#FFBF00",
    ogUrl: "https://recovery.projekt-nexus.sk",
    fallbackUrl: "https://projekt-nexus.sk/ID11",
    ogType: "website",
    ogTitle:
      "THE-RECOVERY: Biohacking, Mentálne zdravie a Prevencia vyhorenia | NEXUS OS",
    ogDescription:
      "Fyzická a psychická regenerácia. Optimalizácia spánku, riešenie nespavosti, prevencia vyhorenia a reštart preťaženého nervového systému.",
    ogImage:
      "https://ljyvsolsgliephsfkfgx.supabase.co/storage/v1/object/public/shop/images/dimenzieMaster/16x9_desktop/id11-the-recovery-16x9.jpg",
    twitterCard: "summary_large_image",
    twitterTitle:
      "THE-RECOVERY: Biohacking, Mentálne zdravie a Prevencia vyhorenia | NEXUS OS",
    twitterDescription:
      "Fyzická a psychická regenerácia. Optimalizácia spánku, riešenie nespavosti, prevencia vyhorenia a reštart preťaženého nervového systému.",
    twitterImage:
      "https://ljyvsolsgliephsfkfgx.supabase.co/storage/v1/object/public/shop/images/dimenzieMaster/16x9_desktop/id11-the-recovery-16x9.jpg",
  },
  "/ID12": {
    title:
      "NEXUS-CODEX: Ústava Systému, Pravidlá Matrixu a Etika Kódu | NEXUS OS",
    description:
      "Základné pravidlá fungovania celého ekosystému Nexus. Morálny kódex, ochrana osobných hraníc a princípy suverénneho operátora.",
    themeColor: "#00E5FF",
    ogUrl: "https://codex.projekt-nexus.sk",
    fallbackUrl: "https://projekt-nexus.sk/ID12",
    ogType: "website",
    ogTitle:
      "NEXUS-CODEX: Ústava Systému, Pravidlá Matrixu a Etika Kódu | NEXUS OS",
    ogDescription:
      "Základné pravidlá fungovania celého ekosystému Nexus. Morálny kódex, ochrana osobných hraníc a princípy suverénneho operátora.",
    ogImage:
      "https://ljyvsolsgliephsfkfgx.supabase.co/storage/v1/object/public/shop/images/dimenzieMaster/16x9_desktop/id12-nexus-codex-16x9.jpg",
    twitterCard: "summary_large_image",
    twitterTitle:
      "NEXUS-CODEX: Ústava Systému, Pravidlá Matrixu a Etika Kódu | NEXUS OS",
    twitterDescription:
      "Základné pravidlá fungovania celého ekosystému Nexus. Morálny kódex, ochrana osobných hraníc a princípy suverénneho operátora.",
    twitterImage:
      "https://ljyvsolsgliephsfkfgx.supabase.co/storage/v1/object/public/shop/images/dimenzieMaster/16x9_desktop/id12-nexus-codex-16x9.jpg",
  },
  "/ID13": {
    title:
      "NEXUS-HABITS: Budovanie Návykov, Disciplína a Denný Režim | NEXUS OS",
    description:
      "Systém budovania atómových návykov. Habit stacking, mechanizmy sebadisciplíny a transformácia každodenných mikro-rozhodnutí na monolitický úspech.",
    themeColor: "#0055FF",
    ogUrl: "https://habits.projekt-nexus.sk",
    fallbackUrl: "https://projekt-nexus.sk/ID13",
    ogType: "website",
    ogTitle:
      "NEXUS-HABITS: Budovanie Návykov, Disciplína a Denný Režim | NEXUS OS",
    ogDescription:
      "Systém budovania atómových návykov. Habit stacking, mechanizmy sebadisciplíny a transformácia každodenných mikro-rozhodnutí na monolitický úspech.",
    ogImage:
      "https://ljyvsolsgliephsfkfgx.supabase.co/storage/v1/object/public/shop/images/dimenzieMaster/16x9_desktop/id13-nexus-habits-16x9.jpg",
    twitterCard: "summary_large_image",
    twitterTitle:
      "NEXUS-HABITS: Budovanie Návykov, Disciplína a Denný Režim | NEXUS OS",
    twitterDescription:
      "Systém budovania atómových návykov. Habit stacking, mechanizmy sebadisciplíny a transformácia každodenných mikro-rozhodnutí na monolitický úspech.",
    twitterImage:
      "https://ljyvsolsgliephsfkfgx.supabase.co/storage/v1/object/public/shop/images/dimenzieMaster/16x9_desktop/id13-nexus-habits-16x9.jpg",
  },
  "/ID14": {
    title: "NEXUS-BLOG: Diskusné Fórum, IT Komunita a Osobný Rozvoj | NEXUS OS",
    description:
      "Komunitný priestor pre hĺbkové diskusie, technické vlákna a sémantické eseje. Spojenie operátorov s rovnakou frekvenciou bez algoritmického šumu.",
    themeColor: "#FF1493",
    ogUrl: "https://blog.projekt-nexus.sk",
    fallbackUrl: "https://projekt-nexus.sk/ID14",
    ogType: "website",
    ogTitle:
      "NEXUS-BLOG: Diskusné Fórum, IT Komunita a Osobný Rozvoj | NEXUS OS",
    ogDescription:
      "Komunitný priestor pre hĺbkové diskusie, technické vlákna a sémantické eseje. Spojenie operátorov s rovnakou frekvenciou bez algoritmického šumu.",
    ogImage:
      "https://ljyvsolsgliephsfkfgx.supabase.co/storage/v1/object/public/shop/images/dimenzieMaster/16x9_desktop/id14-nexus-blog-16x9.jpg",
    twitterCard: "summary_large_image",
    twitterTitle:
      "NEXUS-BLOG: Diskusné Fórum, IT Komunita a Osobný Rozvoj | NEXUS OS",
    twitterDescription:
      "Komunitný priestor pre hĺbkové diskusie, technické vlákna a sémantické eseje. Spojenie operátorov s rovnakou frekvenciou bez algoritmického šumu.",
    twitterImage:
      "https://ljyvsolsgliephsfkfgx.supabase.co/storage/v1/object/public/shop/images/dimenzieMaster/16x9_desktop/id14-nexus-blog-16x9.jpg",
  },
  "/ID15": {
    title:
      "ID15 KERNEL ARCHIVE: The Legacy Protocol & Digitálny Testament | NEXUS OS",
    description:
      "Trvalá archivácia zdrojového kódu a systémový odkaz Architekta. Správa digitálneho testamentu a kontinuita dát.",
    themeColor: "#8A8A8A",
    ogUrl: "https://death.projekt-nexus.sk",
    fallbackUrl: "https://projekt-nexus.sk/ID15",
    ogType: "website",
    ogTitle:
      "ID15 KERNEL ARCHIVE: The Legacy Protocol & Digitálny Testament | NEXUS OS",
    ogDescription:
      "Trvalá archivácia zdrojového kódu a systémový odkaz Architekta. Správa digitálneho testamentu a kontinuita dát.",
    ogImage:
      "https://ljyvsolsgliephsfkfgx.supabase.co/storage/v1/object/public/shop/images/dimenzieMaster/16x9_desktop/id15-death-core-16x9.jpg",
    twitterCard: "summary_large_image",
    twitterTitle:
      "ID15 KERNEL ARCHIVE: The Legacy Protocol & Digitálny Testament | NEXUS OS",
    twitterDescription:
      "Trvalá archivácia zdrojového kódu a systémový odkaz Architekta. Správa digitálneho testamentu a kontinuita dát.",
    twitterImage:
      "https://ljyvsolsgliephsfkfgx.supabase.co/storage/v1/object/public/shop/images/dimenzieMaster/16x9_desktop/id15-death-core-16x9.jpg",
  },
  "/blog": {
    title: "NEXUS BLOG: Sémantické Vysielanie a Diskusné Fórum | NEXUS OS",
    description:
      "Sémantické P2P vysielanie a diskusná platforma bez cenzúry. Prepojenie operátorov Siete, zdieľanie prežitých skúseností a kognitívna defragmentácia.",
    themeColor: "#FF1493",
    ogUrl: "https://blog.projekt-nexus.sk",
    ogType: "website",
    ogTitle: "NEXUS BLOG: Sémantické Vysielanie a Diskusné Fórum | NEXUS OS",
    ogDescription:
      "Sémantické P2P vysielanie a diskusná platforma bez cenzúry. Prepojenie operátorov Siete, zdieľanie prežitých skúseností a kognitívna defragmentácia.",
    ogImage:
      "https://ljyvsolsgliephsfkfgx.supabase.co/storage/v1/object/public/shop/images/pagesMaster/16x9_desktop/BlogPage-16x9.jpg",
    twitterCard: "summary_large_image",
    twitterTitle:
      "NEXUS BLOG: Sémantické Vysielanie a Diskusné Fórum | NEXUS OS",
    twitterDescription:
      "Sémantické P2P vysielanie a diskusná platforma bez cenzúry. Prepojenie operátorov Siete, zdieľanie prežitých skúseností a kognitívna defragmentácia.",
    twitterImage:
      "https://ljyvsolsgliephsfkfgx.supabase.co/storage/v1/object/public/shop/images/pagesMaster/16x9_desktop/BlogPage-16x9.jpg",
  },
  "/login": {
    title: "NEXUS UPLINK: Prihlásenie a Klientska zóna | NEXUS OS",
    description:
      "Vstupná brána do systému OS Genesis. Autorizácia identity operátora, prístup k odomknutým uzlom a peňaženke OC kreditov.",
    themeColor: "#00F3FF",
    ogUrl: "https://uplink.projekt-nexus.sk",
    ogType: "website",
    ogTitle: "NEXUS UPLINK: Prihlásenie a Klientska zóna | NEXUS OS",
    ogDescription:
      "Vstupná brána do systému OS Genesis. Autorizácia identity operátora, prístup k odomknutým uzlom a peňaženke OC kreditov.",
    ogImage:
      "https://ljyvsolsgliephsfkfgx.supabase.co/storage/v1/object/public/shop/images/pagesMaster/16x9_desktop/UplinkModal-16x9.jpg",
    twitterCard: "summary_large_image",
    twitterTitle: "NEXUS UPLINK: Prihlásenie a Klientska zóna | NEXUS OS",
    twitterDescription:
      "Vstupná brána do systému OS Genesis. Autorizácia identity operátora, prístup k odomknutým uzlom a peňaženke OC kreditov.",
    twitterImage:
      "https://ljyvsolsgliephsfkfgx.supabase.co/storage/v1/object/public/shop/images/pagesMaster/16x9_desktop/UplinkModal-16x9.jpg",
  },
  "/operators": {
    title: "SIEŤ ENTÍT: IT Komunita, Networking a Zoznam Operátorov | NEXUS OS",
    description:
      "Prehľad registrovaných operátorov OS Genesis. Hierarchia v Sieti od Questov po Architektov, biometrické profily a aktivita v Matrixe.",
    themeColor: "#00F3FF",
    ogUrl: "https://operators.projekt-nexus.sk",
    ogType: "website",
    ogTitle:
      "SIEŤ ENTÍT: IT Komunita, Networking a Zoznam Operátorov | NEXUS OS",
    ogDescription:
      "Prehľad registrovaných operátorov OS Genesis. Hierarchia v Sieti od Questov po Architektov, biometrické profily a aktivita v Matrixe.",
    ogImage:
      "https://ljyvsolsgliephsfkfgx.supabase.co/storage/v1/object/public/shop/images/pagesMaster/16x9_desktop/OperatorsPage-16x9.jpg",
    twitterCard: "summary_large_image",
    twitterTitle:
      "SIEŤ ENTÍT: IT Komunita, Networking a Zoznam Operátorov | NEXUS OS",
    twitterDescription:
      "Prehľad registrovaných operátorov OS Genesis. Hierarchia v Sieti od Questov po Architektov, biometrické profily a aktivita v Matrixe.",
    twitterImage:
      "https://ljyvsolsgliephsfkfgx.supabase.co/storage/v1/object/public/shop/images/pagesMaster/16x9_desktop/OperatorsPage-16x9.jpg",
  },
  "/settings": {
    title: "CORE SETUP: Nastavenie profilu a Klientska zóna | NEXUS OS",
    description:
      "Riadiaci panel operátora. Správa osobných údajov, bezpečnosti, API prepojení, biometrických avatarov a systémových notifikácií.",
    themeColor: "#39FF14",
    ogUrl: "https://settings.projekt-nexus.sk",
    ogType: "website",
    ogTitle: "CORE SETUP: Nastavenie profilu a Klientska zóna | NEXUS OS",
    ogDescription:
      "Riadiaci panel operátora. Správa osobných údajov, bezpečnosti, API prepojení, biometrických avatarov a systémových notifikácií.",
    ogImage:
      "https://ljyvsolsgliephsfkfgx.supabase.co/storage/v1/object/public/shop/images/pagesMaster/16x9_desktop/SettingsPage-16x9.jpg",
    twitterCard: "summary_large_image",
    twitterTitle: "CORE SETUP: Nastavenie profilu a Klientska zóna | NEXUS OS",
    twitterDescription:
      "Riadiaci panel operátora. Správa osobných údajov, bezpečnosti, API prepojení, biometrických avatarov a systémových notifikácií.",
    twitterImage:
      "https://ljyvsolsgliephsfkfgx.supabase.co/storage/v1/object/public/shop/images/pagesMaster/16x9_desktop/SettingsPage-16x9.jpg",
  },
  "/shop": {
    title: "NEXUS SHOP: Členstvá, Matrix FX a B2B Licencie | NEXUS OS",
    description:
      "Komerčný obchod a Tokenomics ekosystému OS Genesis. Odomkni si PRO & OMEGA členstvá, OC kreditné balíky, Matrix FX vizuálne anomálie a exekutívne IT služby.",
    themeColor: "#FFD700",
    ogUrl: "https://shop.projekt-nexus.sk",
    ogType: "website",
    ogTitle: "NEXUS SHOP: Členstvá, Matrix FX a B2B Licencie | NEXUS OS",
    ogDescription:
      "Komerčný obchod a Tokenomics ekosystému OS Genesis. Odomkni si PRO & OMEGA členstvá, OC kreditné balíky, Matrix FX vizuálne anomálie a exekutívne IT služby.",
    ogImage:
      "https://ljyvsolsgliephsfkfgx.supabase.co/storage/v1/object/public/shop/images/pagesMaster/16x9_desktop/ShopPage-16x9.jpg",
    twitterCard: "summary_large_image",
    twitterTitle: "NEXUS SHOP: Členstvá, Matrix FX a B2B Licencie | NEXUS OS",
    twitterDescription:
      "Komerčný obchod a Tokenomics ekosystému OS Genesis. Odomkni si PRO & OMEGA členstvá, OC kreditné balíky, Matrix FX vizuálne anomálie a exekutívne IT služby.",
    twitterImage:
      "https://ljyvsolsgliephsfkfgx.supabase.co/storage/v1/object/public/shop/images/pagesMaster/16x9_desktop/ShopPage-16x9.jpg",
  },
  "/shop/documents": {
    title: "NEXUS DOCUMENTS: 69 Taktických Kódexov & PDF Knihy | NEXUS OS",
    description:
      "Digitálna knižnica a taktické kódexy (PDF/PPTX). Hlboká dekompresia kníh, procesné manuály a architektonické blueprinty pre tvoj osobný aj biznis rast.",
    themeColor: "#00F3FF",
    ogUrl: "https://shop.projekt-nexus.sk/documents",
    ogType: "website",
    ogTitle: "NEXUS DOCUMENTS: 69 Taktických Kódexov & PDF Knihy | NEXUS OS",
    ogDescription:
      "Digitálna knižnica a taktické kódexy (PDF/PPTX). Hlboká dekompresia kníh, procesné manuály a architektonické blueprinty pre tvoj osobný aj biznis rast.",
    ogImage:
      "https://ljyvsolsgliephsfkfgx.supabase.co/storage/v1/object/public/shop/images/pagesMaster/16x9_desktop/ShopDocumentsMedia-16x9.jpg",
    twitterCard: "summary_large_image",
    twitterTitle:
      "NEXUS DOCUMENTS: 69 Taktických Kódexov & PDF Knihy | NEXUS OS",
    twitterDescription:
      "Digitálna knižnica a taktické kódexy (PDF/PPTX). Hlboká dekompresia kníh, procesné manuály a architektonické blueprinty pre tvoj osobný aj biznis rast.",
    twitterImage:
      "https://ljyvsolsgliephsfkfgx.supabase.co/storage/v1/object/public/shop/images/pagesMaster/16x9_desktop/ShopDocumentsMedia-16x9.jpg",
  },
  "/shop/images": {
    title: "NEXUS AVATARS: 21 Bot Avatarov & Vizuálne Aktíva | NEXUS OS",
    description:
      "Exkluzívna kolekcia 21 hybridných 3D avatarov a digitálnych botov pre tvoj profil a systémové prostredie OS Genesis.",
    themeColor: "#39FF14",
    ogUrl: "https://shop.projekt-nexus.sk/images",
    ogType: "website",
    ogTitle: "NEXUS AVATARS: 21 Bot Avatarov & Vizuálne Aktíva | NEXUS OS",
    ogDescription:
      "Exkluzívna kolekcia 21 hybridných 3D avatarov a digitálnych botov pre tvoj profil a systémové prostredie OS Genesis.",
    ogImage:
      "https://ljyvsolsgliephsfkfgx.supabase.co/storage/v1/object/public/shop/images/pagesMaster/16x9_desktop/ShopImageMedia-16x9.jpg",
    twitterCard: "summary_large_image",
    twitterTitle: "NEXUS AVATARS: 21 Bot Avatarov & Vizuálne Aktíva | NEXUS OS",
    twitterDescription:
      "Exkluzívna kolekcia 21 hybridných 3D avatarov a digitálnych botov pre tvoj profil a systémové prostredie OS Genesis.",
    twitterImage:
      "https://ljyvsolsgliephsfkfgx.supabase.co/storage/v1/object/public/shop/images/pagesMaster/16x9_desktop/ShopImageMedia-16x9.jpg",
  },
  "/shop/audios": {
    title: "NEXUS AUDIO: Focus Tracky, Podcasts & CoDM Soundtracks | NEXUS OS",
    description:
      "Frekvenčná banka a zvuková kulisa pre hlbokú prácu. Neuro-focus tracky, Dialektické debaty, hovorené lekcie a energické CoDM Zombies skladby.",
    themeColor: "#FF003C",
    ogUrl: "https://shop.projekt-nexus.sk/audios",
    ogType: "website",
    ogTitle:
      "NEXUS AUDIO: Focus Tracky, Podcasts & CoDM Soundtracks | NEXUS OS",
    ogDescription:
      "Frekvenčná banka a zvuková kulisa pre hlbokú prácu. Neuro-focus tracky, Dialektické debaty, hovorené lekcie a energické CoDM Zombies skladby.",
    ogImage:
      "https://ljyvsolsgliephsfkfgx.supabase.co/storage/v1/object/public/shop/images/pagesMaster/16x9_desktop/ShopAudioMedia-16x9.jpg",
    twitterCard: "summary_large_image",
    twitterTitle:
      "NEXUS AUDIO: Focus Tracky, Podcasts & CoDM Soundtracks | NEXUS OS",
    twitterDescription:
      "Frekvenčná banka a zvuková kulisa pre hlbokú prácu. Neuro-focus tracky, Dialektické debaty, hovorené lekcie a energické CoDM Zombies skladby.",
    twitterImage:
      "https://ljyvsolsgliephsfkfgx.supabase.co/storage/v1/object/public/shop/images/pagesMaster/16x9_desktop/ShopAudioMedia-16x9.jpg",
  },
  "/shop/videos": {
    title: "NEXUS VIDEO: Kinematické Prehľady & Explainer Videá | NEXUS OS",
    description:
      "Vysokokvalitné explainer videá, dynamické strihy a kinematické trailery prezentujúce funkcie a kampaňové kódexy ekosystému.",
    themeColor: "#FF0000",
    ogUrl: "https://shop.projekt-nexus.sk/videos",
    ogType: "website",
    ogTitle: "NEXUS VIDEO: Kinematické Prehľady & Explainer Videá | NEXUS OS",
    ogDescription:
      "Vysokokvalitné explainer videá, dynamické strihy a kinematické trailery prezentujúce funkcie a kampaňové kódexy ekosystému.",
    ogImage:
      "https://ljyvsolsgliephsfkfgx.supabase.co/storage/v1/object/public/shop/images/pagesMaster/16x9_desktop/ShopVideoMedia-16x9.jpg",
    twitterCard: "summary_large_image",
    twitterTitle:
      "NEXUS VIDEO: Kinematické Prehľady & Explainer Videá | NEXUS OS",
    twitterDescription:
      "Vysokokvalitné explainer videá, dynamické strihy a kinematické trailery prezentujúce funkcie a kampaňové kódexy ekosystému.",
    twitterImage:
      "https://ljyvsolsgliephsfkfgx.supabase.co/storage/v1/object/public/shop/images/pagesMaster/16x9_desktop/ShopVideoMedia-16x9.jpg",
  },
  "/shop/apps": {
    title: "NEXUS APPS: Software Moduly & Aplikácie OS Genesis | NEXUS OS",
    description:
      "Izolované softvérové terminály, Web PWA aplikácie a desktopové PC nástroje pre riadenie workflow, produktivity a digitálnych aktív.",
    themeColor: "#00FFFF",
    ogUrl: "https://shop.projekt-nexus.sk/apps",
    ogType: "website",
    ogTitle: "NEXUS APPS: Software Moduly & Aplikácie OS Genesis | NEXUS OS",
    ogDescription:
      "Izolované softvérové terminály, Web PWA aplikácie a desktopové PC nástroje pre riadenie workflow, produktivity a digitálnych aktív.",
    ogImage:
      "https://ljyvsolsgliephsfkfgx.supabase.co/storage/v1/object/public/shop/images/pagesMaster/16x9_desktop/ShopPage-16x9.jpg",
    twitterCard: "summary_large_image",
    twitterTitle:
      "NEXUS APPS: Software Moduly & Aplikácie OS Genesis | NEXUS OS",
    twitterDescription:
      "Izolované softvérové terminály, Web PWA aplikácie a desktopové PC nástroje pre riadenie workflow, produktivity a digitálnych aktív.",
    twitterImage:
      "https://ljyvsolsgliephsfkfgx.supabase.co/storage/v1/object/public/shop/images/pagesMaster/16x9_desktop/ShopPage-16x9.jpg",
  },
  "/nexus_img_gallery": {
    title: "SYS 03 | NEXUS IMG GALLERY - Projekt Nexus",
    description:
      "Vizuálny archív Projektu Nexus. Komplexná galéria grafických materiálov, schém, avatarov a systémových obrazoviek OS Genesis.",
    themeColor: "#BF00FF",
    ogUrl: "https://projekt-nexus.sk/nexus_img_gallery",
    ogType: "website",
    ogTitle: "SYS 03 | NEXUS IMG GALLERY - Projekt Nexus",
    ogDescription:
      "Vizuálny archív Projektu Nexus. Komplexná galéria grafických materiálov, schém, avatarov a systémových obrazoviek OS Genesis.",
    ogImage:
      "https://ljyvsolsgliephsfkfgx.supabase.co/storage/v1/object/public/shop/images/sys01-05_modulMaster/16x9_desktop/SYS03_NEXUS-IMG-GALLERY-16x9.jpg",
    twitterCard: "summary_large_image",
    twitterTitle: "SYS 03 | NEXUS IMG GALLERY - Projekt Nexus",
    twitterDescription:
      "Vizuálny archív Projektu Nexus. Komplexná galéria grafických materiálov, schém, avatarov a systémových obrazoviek OS Genesis.",
    twitterImage:
      "https://ljyvsolsgliephsfkfgx.supabase.co/storage/v1/object/public/shop/images/sys01-05_modulMaster/16x9_desktop/SYS03_NEXUS-IMG-GALLERY-16x9.jpg",
  },
  "/nexus_video_gallery": {
    title: "SYS 04 | NEXUS VIDEO GALLERY - Projekt Nexus",
    description:
      "Centrálny video archív Projektu Nexus. Explainer videá, taktické trailer zábery a multimediálne záznamy z ekosystému OS Genesis.",
    themeColor: "#FF0000",
    ogUrl: "https://projekt-nexus.sk/nexus_video_gallery",
    ogType: "website",
    ogTitle: "SYS 04 | NEXUS VIDEO GALLERY - Projekt Nexus",
    ogDescription:
      "Centrálny video archív Projektu Nexus. Explainer videá, taktické trailer zábery a multimediálne záznamy z ekosystému OS Genesis.",
    ogImage:
      "https://ljyvsolsgliephsfkfgx.supabase.co/storage/v1/object/public/shop/images/sys01-05_modulMaster/16x9_desktop/SYS04_NEXUS-VIDEO-GALLERY-16x9.jpg",
    twitterCard: "summary_large_image",
    twitterTitle: "SYS 04 | NEXUS VIDEO GALLERY - Projekt Nexus",
    twitterDescription:
      "Centrálny video archív Projektu Nexus. Explainer videá, taktické trailer zábery a multimediálne záznamy z ekosystému OS Genesis.",
    twitterImage:
      "https://ljyvsolsgliephsfkfgx.supabase.co/storage/v1/object/public/shop/images/sys01-05_modulMaster/16x9_desktop/SYS04_NEXUS-VIDEO-GALLERY-16x9.jpg",
  },
  "/video_mentoring": {
    title: "NEXUS MENTORING: Asynchrónne Mentoringové Streamy | NEXUS OS",
    description:
      "Prémiové asynchrónne záznamy a mentoringové streamy. Hlboká dekompresia a konzultácie priamo z jadra Root Architekta.",
    themeColor: "#E91E63",
    ogUrl: "https://projekt-nexus.sk/video_mentoring",
    ogType: "website",
    ogTitle: "NEXUS MENTORING: Asynchrónne Mentoringové Streamy | NEXUS OS",
    ogDescription:
      "Prémiové asynchrónne záznamy a mentoringové streamy. Hlboká dekompresia a konzultácie priamo z jadra Root Architekta.",
    ogImage:
      "https://ljyvsolsgliephsfkfgx.supabase.co/storage/v1/object/public/shop/images/sys01-05_modulMaster/16x9_desktop/SYS02_MENTORING-16x9.jpg",
    twitterCard: "summary_large_image",
    twitterTitle:
      "NEXUS MENTORING: Asynchrónne Mentoringové Streamy | NEXUS OS",
    twitterDescription:
      "Prémiové asynchrónne záznamy a mentoringové streamy. Hlboká dekompresia a konzultácie priamo z jadra Root Architekta.",
    twitterImage:
      "https://ljyvsolsgliephsfkfgx.supabase.co/storage/v1/object/public/shop/images/sys01-05_modulMaster/16x9_desktop/SYS02_MENTORING-16x9.jpg",
  },
  "/video_nodes": {
    title: "NEXUS VIDEO NODES: Bezplatný Video Archív a Návody | NEXUS OS",
    description:
      "Súbor bezplatných video uzlov pre operátorov Siete. Kognitívny tréning a vizuálna dekódovacia databáza.",
    themeColor: "#FF0000",
    ogUrl: "https://projekt-nexus.sk/video_nodes",
    ogType: "website",
    ogTitle: "NEXUS VIDEO NODES: Bezplatný Video Archív a Návody | NEXUS OS",
    ogDescription:
      "Súbor bezplatných video uzlov pre operátorov Siete. Kognitívny tréning a vizuálna dekódovacia databáza.",
    ogImage:
      "https://ljyvsolsgliephsfkfgx.supabase.co/storage/v1/object/public/shop/images/sys01-05_modulMaster/16x9_desktop/SYS01_VIDEO-NODES-16x9.jpg",
    twitterCard: "summary_large_image",
    twitterTitle:
      "NEXUS VIDEO NODES: Bezplatný Video Archív a Návody | NEXUS OS",
    twitterDescription:
      "Súbor bezplatných video uzlov pre operátorov Siete. Kognitívny tréning a vizuálna dekódovacia databáza.",
    twitterImage:
      "https://ljyvsolsgliephsfkfgx.supabase.co/storage/v1/object/public/shop/images/sys01-05_modulMaster/16x9_desktop/SYS01_VIDEO-NODES-16x9.jpg",
  },
  "/nexus_directory": {
    title: "MASTER DIRECTORY: Centrálny Register Odkazov a Portov | NEXUS OS",
    description:
      "Centrálny z-indexovaný register všetkých odkazov, sietí, B2B agentúr a portov Architekta. Komplexná navigačná matica Projektu Nexus.",
    themeColor: "#39FF14",
    ogUrl: "https://projekt-nexus.sk/nexus_directory",
    ogType: "website",
    ogTitle: "MASTER DIRECTORY: Centrálny Register Odkazov a Portov | NEXUS OS",
    ogDescription:
      "Centrálny z-indexovaný register všetkých odkazov, sietí, B2B agentúr a portov Architekta. Komplexná navigačná matica Projektu Nexus.",
    ogImage:
      "https://ljyvsolsgliephsfkfgx.supabase.co/storage/v1/object/public/shop/images/sys01-05_modulMaster/16x9_desktop/SYS05_MASTER-DIRECTORY-16x9.jpg",
    twitterCard: "summary_large_image",
    twitterTitle:
      "MASTER DIRECTORY: Centrálny Register Odkazov a Portov | NEXUS OS",
    twitterDescription:
      "Centrálny z-indexovaný register všetkých odkazov, sietí, B2B agentúr a portov Architekta. Komplexná navigačná matica Projektu Nexus.",
    twitterImage:
      "https://ljyvsolsgliephsfkfgx.supabase.co/storage/v1/object/public/shop/images/sys01-05_modulMaster/16x9_desktop/SYS05_MASTER-DIRECTORY-16x9.jpg",
  },
  "/vop": {
    title: "VŠEOBECNÉ OBCHODNÉ PODMIENKY | NEXUS CODEX | NEXUS OS",
    description:
      "Všeobecné obchodné podmienky, licenčné pravidlá a právna integrita obchodného ekosystému Projekt Nexus a Nexus Agency.",
    themeColor: "#39FF14",
    ogUrl: "https://projekt-nexus.sk/vop",
    ogType: "website",
    ogTitle: "VŠEOBECNÉ OBCHODNÉ PODMIENKY | NEXUS CODEX | NEXUS OS",
    ogDescription:
      "Všeobecné obchodné podmienky, licenčné pravidlá a právna integrita obchodného ekosystému Projekt Nexus a Nexus Agency.",
    ogImage:
      "https://ljyvsolsgliephsfkfgx.supabase.co/storage/v1/object/public/shop/images/pagesMaster/16x9_desktop/homePage-16x9.jpg",
    twitterCard: "summary_large_image",
    twitterTitle: "VŠEOBECNÉ OBCHODNÉ PODMIENKY | NEXUS CODEX | NEXUS OS",
    twitterDescription:
      "Všeobecné obchodné podmienky, licenčné pravidlá a právna integrita obchodného ekosystému Projekt Nexus a Nexus Agency.",
    twitterImage:
      "https://ljyvsolsgliephsfkfgx.supabase.co/storage/v1/object/public/shop/images/pagesMaster/16x9_desktop/homePage-16x9.jpg",
  },
  "/privacy": {
    title: "OCHRANA OSOBNÝCH ÚDAJOV (GDPR) | NEXUS CODEX | NEXUS OS",
    description:
      "Pravidlá ochrany osobných údajov, spracovanie cookies a kryptografická ochrana dát operátorov v Sieti Projekt Nexus.",
    themeColor: "#39FF14",
    ogUrl: "https://projekt-nexus.sk/privacy",
    ogType: "website",
    ogTitle: "OCHRANA OSOBNÝCH ÚDAJOV (GDPR) | NEXUS CODEX | NEXUS OS",
    ogDescription:
      "Pravidlá ochrany osobných údajov, spracovanie cookies a kryptografická ochrana dát operátorov v Sieti Projekt Nexus.",
    ogImage:
      "https://ljyvsolsgliephsfkfgx.supabase.co/storage/v1/object/public/shop/images/pagesMaster/16x9_desktop/homePage-16x9.jpg",
    twitterCard: "summary_large_image",
    twitterTitle: "OCHRANA OSOBNÝCH ÚDAJOV (GDPR) | NEXUS CODEX | NEXUS OS",
    twitterDescription:
      "Pravidlá ochrany osobných údajov, spracovanie cookies a kryptografická ochrana dát operátorov v Sieti Projekt Nexus.",
    twitterImage:
      "https://ljyvsolsgliephsfkfgx.supabase.co/storage/v1/object/public/shop/images/pagesMaster/16x9_desktop/homePage-16x9.jpg",
  },
  "/404.html": {
    title: "404 SYSTEM ERROR | Zablúdil si v Matrixe | NEXUS OS",
    description:
      "Požadovaný uzol nebol v Sieti nájdený alebo bol terminovaný. Reštartuj spojenie a vráť sa späť na hlavný Grid.",
    themeColor: "#FF003C",
    ogUrl: "https://projekt-nexus.sk/404.html",
    ogType: "website",
    ogTitle: "404 SYSTEM ERROR | Zablúdil si v Matrixe | NEXUS OS",
    ogDescription:
      "Požadovaný uzol nebol v Sieti nájdený alebo bol terminovaný. Reštartuj spojenie a vráť sa späť na hlavný Grid.",
    ogImage:
      "https://ljyvsolsgliephsfkfgx.supabase.co/storage/v1/object/public/shop/images/pagesMaster/16x9_desktop/homePage-16x9.jpg",
    twitterCard: "summary_large_image",
    twitterTitle: "404 SYSTEM ERROR | Zablúdil si v Matrixe | NEXUS OS",
    twitterDescription:
      "Požadovaný uzol nebol v Sieti nájdený alebo bol terminovaný. Reštartuj spojenie a vráť sa späť na hlavný Grid.",
    twitterImage:
      "https://ljyvsolsgliephsfkfgx.supabase.co/storage/v1/object/public/shop/images/pagesMaster/16x9_desktop/homePage-16x9.jpg",
  },
};

export default SEO_REGISTRY;
