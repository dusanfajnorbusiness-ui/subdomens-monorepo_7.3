
/* eslint-disable no-undef */

// ============================================================================
// 👑 PROJECT NEXUS — OS GENESIS EDITION & SUBDOMAINS MONOREPO 7.3
// Súbor: shared/src/data/seoRegistry.js
// Status: STRICTLY GROUNDED // 100% VERIFIED CDN ENDPOINTS // ZERO SCRIPT LOSS
// Core Version: SEO-REGISTRY V20.95_TEMPLATE_PERFECT
// Autor: Dušan Fajnor @nexus-core2Mb (CyberTech Architect)
// ============================================================================

export const CORE_VERSION = "SEO-REGISTRY V20.95";

// ============================================================================
// 🌐 1. ZÁKLADNÉ BÁZY PRE OBRÁZKY (CDN ENDPOINTS)
// ============================================================================
export const CDN_ROOT =
  "https://" + "ljyvsolsgliephsfkfgx.supabase.co/storage/v1/object/public/shop/images";

// 1. Priečinok pre 16 kognitívnych subdomén (16x9 Landscape)
export const CDN_SUBDOMAINS =
  CDN_ROOT + "/nexus-subdomains-v20-master-assets/01_16x9_Landscape";

// 2. Priečinok pre systémové stránky a uzly (Blog, Operators, Settings)
export const CDN_PAGES =
  CDN_ROOT + "/pagesMaster/16x9_desktop";

// ============================================================================
// ⚡ 2. KÁNONICKÉ ADRESY EKOSYSTÉMU
// ============================================================================
export const SITE_URL = "https://" + "subdomens.projekt-nexus.sk";

export const MENTOR_URL = "https://" + "mentor.projekt-nexus.sk";
export const PERSONAL_URL = "https://" + "personal.projekt-nexus.sk";
export const WORK_URL = "https://" + "work.projekt-nexus.sk";
export const FINANCE_URL = "https://" + "finance.projekt-nexus.sk";
export const BUSINESS_URL = "https://" + "business.projekt-nexus.sk";
export const INVESTMENTS_URL = "https://" + "investments.projekt-nexus.sk";
export const STUDY_URL = "https://" + "study.projekt-nexus.sk";
export const PROFESSIONAL_URL = "https://" + "professional.projekt-nexus.sk";
export const READER_URL = "https://" + "reader.projekt-nexus.sk";
export const PLAYER_URL = "https://" + "player.projekt-nexus.sk";
export const HOME_URL = "https://" + "home.projekt-nexus.sk";
export const RECOVERY_URL = "https://" + "recovery.projekt-nexus.sk";
export const CODEX_URL = "https://" + "codex.projekt-nexus.sk";
export const HABITS_URL = "https://" + "habits.projekt-nexus.sk";
export const BLOG_URL = "https://" + "blog.projekt-nexus.sk";
export const DEATH_URL = "https://" + "death.projekt-nexus.sk";

// ============================================================================
// 🗺️ 3. CENTRÁLNY REGISTÉR METADÁT (SSOT)
// ============================================================================
export const SEO_REGISTRY = {
  // --- 🌐 HLAVNÝ VSTUP NA SUBDOMENS ---
  "/": {
    title:
      "[ PROJEKT NEXUS OS | GENESIS EDITION ]: Centrálna Matrica Subdomén",
    description:
      "Unikátny operačný systém (OS Genesis) integrujúci osobný rozvoj, hlbokú prácu (Deep Work), IT zručnosti a správu financií. Prestaň prežívať, začni tvoriť.",
    themeColor: "#39FF14",
    ogUrl: SITE_URL,
    ogType: "website",
    ogTitle:
      "[ PROJEKT NEXUS OS | GENESIS EDITION ]: Centrálna Matrica Subdomén",
    ogDescription:
      "Unikátny operačný systém (OS Genesis) integrujúci osobný rozvoj, hlbokú prácu (Deep Work), IT zručnosti a správu financií. Prestaň prežívať, začni tvoriť.",
    ogImage: CDN_SUBDOMAINS + "/hub_16x9.png",
    twitterCard: "summary_large_image",
    twitterTitle:
      "[ PROJEKT NEXUS OS | GENESIS EDITION ]: Centrálna Matrica Subdomén",
    twitterDescription:
      "Unikátny operačný systém (OS Genesis) integrujúci osobný rozvoj, hlbokú prácu (Deep Work), IT zručnosti a správu financií. Prestaň prežívať, začni tvoriť.",
    twitterImage: CDN_SUBDOMAINS + "/hub_16x9.png",
  },

  "/home": {
    title:
      "[ PROJEKT NEXUS OS | GENESIS EDITION ]: Domovský Grid Subdomén",
    description:
      "Prehľad a navigačná mapa 16 kognitívnych dimenzií OS Genesis. Prístup k suverénnym subdoménam a špecializovaným uzlom.",
    themeColor: "#39FF14",
    ogUrl: SITE_URL + "/home",
    ogType: "website",
    ogTitle:
      "[ PROJEKT NEXUS OS | GENESIS EDITION ]: Domovský Grid Subdomén",
    ogDescription:
      "Prehľad a navigačná mapa 16 kognitívnych dimenzií OS Genesis. Prístup k suverénnym subdoménam a špecializovaným uzlom.",
    ogImage: CDN_SUBDOMAINS + "/hub_16x9.png",
    twitterCard: "summary_large_image",
    twitterTitle:
      "[ PROJEKT NEXUS OS | GENESIS EDITION ]: Domovský Grid Subdomén",
    twitterDescription:
      "Prehľad a navigačná mapa 16 kognitívnych dimenzií OS Genesis. Prístup k suverénnym subdoménam.",
    twitterImage: CDN_SUBDOMAINS + "/hub_16x9.png",
  },

  // --- 🧭 SYSTÉMOVÉ UZLY (VLASTNÉ OBRÁZKY Z PAGES MASTER) ---
  "/blog": {
    title: "NEXUS BLOG: Sémantické Vysielanie a Diskusné Fórum | NEXUS OS",
    description:
      "Sémantické P2P vysielanie a diskusná platforma bez cenzúry. Prepojenie operátorov Siete, zdieľanie prežitých skúseností a kognitívna defragmentácia.",
    themeColor: "#FF1493",
    ogUrl: SITE_URL + "/blog",
    ogType: "website",
    ogTitle: "NEXUS BLOG: Sémantické Vysielanie a Diskusné Fórum | NEXUS OS",
    ogDescription:
      "Sémantické P2P vysielanie a diskusná platforma bez cenzúry. Prepojenie operátorov Siete, zdieľanie prežitých skúseností a kognitívna defragmentácia.",
    ogImage: CDN_PAGES + "/BlogPage-16x9.jpg",
    twitterCard: "summary_large_image",
    twitterTitle:
      "NEXUS BLOG: Sémantické Vysielanie a Diskusné Fórum | NEXUS OS",
    twitterDescription:
      "Sémantické P2P vysielanie a diskusná platforma bez cenzúry. Prepojenie operátorov Siete.",
    twitterImage: CDN_PAGES + "/BlogPage-16x9.jpg",
  },

  "/operators": {
    title: "SIEŤ ENTÍT: IT Komunita, Networking a Zoznam Operátorov | NEXUS OS",
    description:
      "Prehľad registrovaných operátorov OS Genesis. Hierarchia v Sieti od Questov po Architektov, biometrické profily a aktivita v Matrixe.",
    themeColor: "#00F3FF",
    ogUrl: SITE_URL + "/operators",
    ogType: "website",
    ogTitle:
      "SIEŤ ENTÍT: IT Komunita, Networking a Zoznam Operátorov | NEXUS OS",
    ogDescription:
      "Prehľad registrovaných operátorov OS Genesis. Hierarchia v Sieti od Questov po Architektov, biometrické profily a aktivita v Matrixe.",
    ogImage: CDN_PAGES + "/OperatorsPage-16x9.jpg",
    twitterCard: "summary_large_image",
    twitterTitle:
      "SIEŤ ENTÍT: IT Komunita, Networking a Zoznam Operátorov | NEXUS OS",
    twitterDescription:
      "Prehľad registrovaných operátorov OS Genesis. Hierarchia v Sieti od Questov po Architektov.",
    twitterImage: CDN_PAGES + "/OperatorsPage-16x9.jpg",
  },

  "/settings": {
    title: "CORE SETUP: Nastavenie profilu a Klientska zóna | NEXUS OS",
    description:
      "Riadiaci panel operátora. Správa osobných údajov, bezpečnosti, API prepojení, biometrických avatarov a systémových notifikácií.",
    themeColor: "#39FF14",
    ogUrl: SITE_URL + "/settings",
    ogType: "website",
    ogTitle: "CORE SETUP: Nastavenie profilu a Klientska zóna | NEXUS OS",
    ogDescription:
      "Riadiaci panel operátora. Správa osobných údajov, bezpečnosti, API prepojení, biometrických avatarov a systémových notifikácií.",
    ogImage: CDN_PAGES + "/SettingsPage-16x9.jpg",
    twitterCard: "summary_large_image",
    twitterTitle: "CORE SETUP: Nastavenie profilu a Klientska zóna | NEXUS OS",
    twitterDescription:
      "Riadiaci panel operátora. Správa osobných údajov, bezpečnosti, API prepojení, biometrických avatarov a systémových notifikácií.",
    twitterImage: CDN_PAGES + "/SettingsPage-16x9.jpg",
  },

  // ==========================================================================
  // ⚡ 16 KOGNITÍVNYCH SUBDOMÉN (VLASTNÉ ASSETY Z 01_16x9_LANDSCAPE)
  // ==========================================================================
  "/sub00": {
    title: "MENTOR-HUB: Inteligentný AI Mentoring & Dialog | NEXUS OS",
    description:
      "Priamy neurálny dialóg s AI Gemini. Dekompresia myšlienok, riešenie systémových zásekov a kognitívny mentoring.",
    themeColor: "#FFFFFF",
    ogUrl: MENTOR_URL,
    ogType: "website",
    ogTitle: "MENTOR-HUB: Inteligentný AI Mentoring & Dialog | NEXUS OS",
    ogDescription:
      "Priamy neurálny dialóg s AI Gemini. Dekompresia myšlienok, riešenie systémových zásekov a kognitívny mentoring.",
    ogImage: CDN_SUBDOMAINS + "/mentor_16x9.png",
    twitterCard: "summary_large_image",
    twitterTitle: "MENTOR-HUB: Inteligentný AI Mentoring | NEXUS OS",
    twitterDescription:
      "Priamy neurálny dialóg s AI Gemini. Dekompresia myšlienok a kognitívny mentoring.",
    twitterImage: CDN_SUBDOMAINS + "/mentor_16x9.png",
  },

  "/sub01": {
    title: "IDENTITY-CORE: Osobný Rozvoj & Dekonštrukcia Ega | NEXUS OS",
    description:
      "Centrálny modul architektúry človeka. Preprogramovanie starých identít, deštrukcia sociálneho balastu a suverénne bytie.",
    themeColor: "#39FF14",
    ogUrl: PERSONAL_URL,
    ogType: "website",
    ogTitle: "IDENTITY-CORE: Osobný Rozvoj & Dekonštrukcia Ega | NEXUS OS",
    ogDescription:
      "Centrálny modul architektúry človeka. Preprogramovanie starých identít, deštrukcia sociálneho balastu a suverénne bytie.",
    ogImage: CDN_SUBDOMAINS + "/personal_16x9.png",
    twitterCard: "summary_large_image",
    twitterTitle: "IDENTITY-CORE: Osobný Rozvoj | NEXUS OS",
    twitterDescription:
      "Centrálny modul architektúry človeka. Preprogramovanie starých identít a suverénne bytie.",
    twitterImage: CDN_SUBDOMAINS + "/personal_16x9.png",
  },

  "/sub02": {
    title: "THE-WORKFLOW: Hlboká Práca & Nulový Odpor | NEXUS OS",
    description:
      "Systém nekompromisnej produktivity a riadenia pozornosti. GTD protokoly, optimalizácia flowu a eliminácia prokrastinácie.",
    themeColor: "#FFEB3B",
    ogUrl: WORK_URL,
    ogType: "website",
    ogTitle: "THE-WORKFLOW: Hlboká Práca & Nulový Odpor | NEXUS OS",
    ogDescription:
      "Systém nekompromisnej produktivity a riadenia pozornosti. GTD protokoly, optimalizácia flowu a eliminácia prokrastinácie.",
    ogImage: CDN_SUBDOMAINS + "/work_16x9.png",
    twitterCard: "summary_large_image",
    twitterTitle: "THE-WORKFLOW: Hlboká Práca | NEXUS OS",
    twitterDescription:
      "Systém nekompromisnej produktivity a riadenia pozornosti. GTD protokoly.",
    twitterImage: CDN_SUBDOMAINS + "/work_16x9.png",
  },

  "/sub03": {
    title: "CASH-ENGINE: Správa Financií & Dlhová Hygiena | NEXUS OS",
    description:
      "Finančná architektúra a cashflow radar. Radikálna optimalizácia nákladov, splácanie dlhov a budovanie kapitálovej rezervy.",
    themeColor: "#FFD700",
    ogUrl: FINANCE_URL,
    ogType: "website",
    ogTitle: "CASH-ENGINE: Správa Financií & Dlhová Hygiena | NEXUS OS",
    ogDescription:
      "Finančná architektúra a cashflow radar. Radikálna optimalizácia nákladov, splácanie dlhov a budovanie kapitálovej rezervy.",
    ogImage: CDN_SUBDOMAINS + "/finance_16x9.png",
    twitterCard: "summary_large_image",
    twitterTitle: "CASH-ENGINE: Správa Financií | NEXUS OS",
    twitterDescription:
      "Finančná architektúra, cashflow radar a dlhová hygiena.",
    twitterImage: CDN_SUBDOMAINS + "/finance_16x9.png",
  },

  "/sub04": {
    title: "REVENUE-ARCHITECT: Monetizácia & Digitálne Produkty | NEXUS OS",
    description:
      "Tvorba škálovateľných digitálnych aktív a Knowledge-as-a-Service (KaaS). Monetizácia expertízy a B2B štruktúry.",
    themeColor: "#FFAA00",
    ogUrl: BUSINESS_URL,
    ogType: "website",
    ogTitle: "REVENUE-ARCHITECT: Monetizácia & Digitálne Produkty | NEXUS OS",
    ogDescription:
      "Tvorba škálovateľných digitálnych aktív a KaaS. Monetizácia expertízy a B2B štruktúry.",
    ogImage: CDN_SUBDOMAINS + "/business_16x9.png",
    twitterCard: "summary_large_image",
    twitterTitle: "REVENUE-ARCHITECT: Monetizácia | NEXUS OS",
    twitterDescription:
      "Tvorba škálovateľných digitálnych aktív a predajných lievikov.",
    twitterImage: CDN_SUBDOMAINS + "/business_16x9.png",
  },

  "/sub05": {
    title: "ASSETS-MATRIX: Investičný Firewall & Budovanie Majetku | NEXUS OS",
    description:
      "Dlhodobá akumulácia a ochrana bohatstva. OMEGAMIUM investičné protokoly, diverzifikácia a suverénne aktíva.",
    themeColor: "#FF8C00",
    ogUrl: INVESTMENTS_URL,
    ogType: "website",
    ogTitle: "ASSETS-MATRIX: Investičný Firewall & Budovanie Majetku | NEXUS OS",
    ogDescription:
      "Dlhodobá akumulácia a ochrana bohatstva. OMEGAMIUM investičné protokoly, diverzifikácia a suverénne aktíva.",
    ogImage: CDN_SUBDOMAINS + "/investments_16x9.png",
    twitterCard: "summary_large_image",
    twitterTitle: "ASSETS-MATRIX: Investičný Firewall | NEXUS OS",
    twitterDescription:
      "Dlhodobá akumulácia a ochrana majetku v Sieti.",
    twitterImage: CDN_SUBDOMAINS + "/investments_16x9.png",
  },

  "/sub06": {
    title: "DATA-ABSORBER: Štúdium & Kognitívna Absorpcia | NEXUS OS",
    description:
      "Metódy rýchleho učenia a dekódovania zložitých systémov. Sémantická filtrácia informácií a syntéza dát do praxe.",
    themeColor: "#BF00FF",
    ogUrl: STUDY_URL,
    ogType: "website",
    ogTitle: "DATA-ABSORBER: Štúdium & Kognitívna Absorpcia | NEXUS OS",
    ogDescription:
      "Metódy rýchleho učenia a dekódovania zložitých systémov. Sémantická filtrácia informácií a syntéza dát do praxe.",
    ogImage: CDN_SUBDOMAINS + "/study_16x9.png",
    twitterCard: "summary_large_image",
    twitterTitle: "DATA-ABSORBER: Kognitívna Absorpcia | NEXUS OS",
    twitterDescription:
      "Metódy rýchleho učenia a premeny dát na prežitú skúsenosť.",
    twitterImage: CDN_SUBDOMAINS + "/study_16x9.png",
  },

  "/sub07": {
    title: "SKILLS-TREE: Technologický Stack & IT Zručnosti | NEXUS OS",
    description:
      "Strom digitálnych kompetencií pre éru umelej inteligencie. Frontend, backend, automatizácia a architektonický kód.",
    themeColor: "#8A2BE2",
    ogUrl: PROFESSIONAL_URL,
    ogType: "website",
    ogTitle: "SKILLS-TREE: Technologický Stack & IT Zručnosti | NEXUS OS",
    ogDescription:
      "Strom digitálnych kompetencií pre éru umelej inteligencie. Frontend, backend, automatizácia a architektonický kód.",
    ogImage: CDN_SUBDOMAINS + "/professional_16x9.png",
    twitterCard: "summary_large_image",
    twitterTitle: "SKILLS-TREE: IT Kompetencie | NEXUS OS",
    twitterDescription:
      "Rozvoj technických schopností v ére umelej inteligencie.",
    twitterImage: CDN_SUBDOMAINS + "/professional_16x9.png",
  },

  "/sub08": {
    title: "EMPTY-BOOK: Digitálna Knižnica & Mŕtve Knihy | NEXUS OS",
    description:
      "Filozofické výťahy, tichá múdrosť a dekompresné texty (Osho, Tolle, Seneca). Priestor pre kontempláciu a čítanie.",
    themeColor: "#00FFFF",
    ogUrl: READER_URL,
    ogType: "website",
    ogTitle: "EMPTY-BOOK: Digitálna Knižnica & Mŕtve Knihy | NEXUS OS",
    ogDescription:
      "Filozofické výťahy, tichá múdrosť a dekompresné texty (Osho, Tolle, Seneca). Priestor pre kontempláciu a čítanie.",
    ogImage: CDN_SUBDOMAINS + "/reader_16x9.png",
    twitterCard: "summary_large_image",
    twitterTitle: "EMPTY-BOOK: Digitálna Knižnica | NEXUS OS",
    twitterDescription:
      "Sémantické výťahy a nadčasová filozofia prítomného okamihu.",
    twitterImage: CDN_SUBDOMAINS + "/reader_16x9.png",
  },

  "/sub09": {
    title: "SERGEANT-CORE: Taktický Boj & Gaming Stratégia | NEXUS OS",
    description:
      "Taktické myslenie, herná dominancia v Call of Duty: Mobile Zombies a nekompromisná vojenská disciplína v civilnom živote.",
    themeColor: "#FF003C",
    ogUrl: PLAYER_URL,
    ogType: "website",
    ogTitle: "SERGEANT-CORE: Taktický Boj & Gaming Stratégia | NEXUS OS",
    ogDescription:
      "Taktické myslenie, herná dominancia v Call of Duty: Mobile Zombies a nekompromisná vojenská disciplína v civilnom živote.",
    ogImage: CDN_SUBDOMAINS + "/player_16x9.png",
    twitterCard: "summary_large_image",
    twitterTitle: "SERGEANT-CORE: Taktický Boj | NEXUS OS",
    twitterDescription:
      "Taktické myslenie a tréning reflexov v hernom priestore.",
    twitterImage: CDN_SUBDOMAINS + "/player_16x9.png",
  },

  "/sub10": {
    title: "NONIDENTITY-CORE: Ticho, Domov & Odpojenie od Siete | NEXUS OS",
    description:
      "Bezpečné útočisko mimo digitálneho hluku. Ticho mysle, návrat k podstate, čisté bytie a obnova biologických zdrojov.",
    themeColor: "#0044FF",
    ogUrl: HOME_URL,
    ogType: "website",
    ogTitle: "NONIDENTITY-CORE: Ticho, Domov & Odpojenie od Siete | NEXUS OS",
    ogDescription:
      "Bezpečné útočisko mimo digitálneho hluku. Ticho mysle, návrat k podstate, čisté bytie a obnova biologických zdrojov.",
    ogImage: CDN_SUBDOMAINS + "/home_16x9.png",
    twitterCard: "summary_large_image",
    twitterTitle: "NONIDENTITY-CORE: Ticho & Domov | NEXUS OS",
    twitterDescription:
      "Bezpečný priestor pre úplné odpojenie z Matrixu.",
    twitterImage: CDN_SUBDOMAINS + "/home_16x9.png",
  },

  "/sub11": {
    title: "THE-RECOVERY: Mentálna Hygiena & Cesta z Vyhorenia | NEXUS OS",
    description:
      "Systematická regenerácia po kolapse, obnova nervovej sústavy a vystúpenie z chronického stresu Matrixu.",
    themeColor: "#FFBF00",
    ogUrl: RECOVERY_URL,
    ogType: "website",
    ogTitle: "THE-RECOVERY: Mentálna Hygiena & Cesta z Vyhorenia | NEXUS OS",
    ogDescription:
      "Systematická regenerácia po kolapse, obnova nervovej sústavy a vystúpenie z chronického stresu Matrixu.",
    ogImage: CDN_SUBDOMAINS + "/recovery_16x9.png",
    twitterCard: "summary_large_image",
    twitterTitle: "THE-RECOVERY: Mentálna Hygiena | NEXUS OS",
    twitterDescription:
      "Protokol pre zotavenie a reset preťaženej mysle.",
    twitterImage: CDN_SUBDOMAINS + "/recovery_16x9.png",
  },

  "/sub12": {
    title: "NEXUS-CODEX: Centrálna Znalostná Báza & Vyhľadávač | NEXUS OS",
    description:
      "Katalóg systémových definícií, pravidiel a protokolov. Kódex integrity OS Genesis a kognitívny vyhľadávač.",
    themeColor: "#00E5FF",
    ogUrl: CODEX_URL,
    ogType: "website",
    ogTitle: "NEXUS-CODEX: Centrálna Znalostná Báza & Vyhľadávač | NEXUS OS",
    ogDescription:
      "Katalóg systémových definícií, pravidiel a protokolov. Kódex integrity OS Genesis a kognitívny vyhľadávač.",
    ogImage: CDN_SUBDOMAINS + "/codex_16x9.png",
    twitterCard: "summary_large_image",
    twitterTitle: "NEXUS-CODEX: Systémový Kódex | NEXUS OS",
    twitterDescription:
      "Centrálny register pravidiel a definícií pre operátorov Siete.",
    twitterImage: CDN_SUBDOMAINS + "/codex_16x9.png",
  },

  "/sub13": {
    title: "NEXUS-HABITS: Rutiny & Kvantifikácia Pokroku | NEXUS OS",
    description:
      "Nástroj pre sledovanie denných rituálov, upevňovanie návykov a udržiavanie dlhodobého zamerania.",
    themeColor: "#00008B",
    ogUrl: HABITS_URL,
    ogType: "website",
    ogTitle: "NEXUS-HABITS: Rutiny & Kvantifikácia Pokroku | NEXUS OS",
    ogDescription:
      "Nástroj pre sledovanie denných rituálov, upevňovanie návykov a udržiavanie dlhodobého zamerania.",
    ogImage: CDN_SUBDOMAINS + "/habits_16x9.png",
    twitterCard: "summary_large_image",
    twitterTitle: "NEXUS-HABITS: Návyky & Rutiny | NEXUS OS",
    twitterDescription:
      "Exekúcia denných rituálov pre udržanie stability systému.",
    twitterImage: CDN_SUBDOMAINS + "/habits_16x9.png",
  },

  "/sub14": {
    title: "NEXUS-BLOG: Sémantické Vysielanie & Diskusné Fórum | NEXUS OS",
    description:
      "Sémantické vysielanie a diskusná platforma. Zdieľanie prežitých skúseností, postrehy z praxe a kognitívna defragmentácia.",
    themeColor: "#FF1493",
    ogUrl: BLOG_URL,
    ogType: "website",
    ogTitle: "NEXUS-BLOG: Sémantické Vysielanie & Diskusné Fórum | NEXUS OS",
    ogDescription:
      "Sémantické vysielanie a diskusná platforma. Zdieľanie prežitých skúseností, postrehy z praxe a kognitívna defragmentácia.",
    ogImage: CDN_SUBDOMAINS + "/blog_16x9.png",
    twitterCard: "summary_large_image",
    twitterTitle: "NEXUS-BLOG: Sémantické Vysielanie | NEXUS OS",
    twitterDescription:
      "Zdieľanie prežitých skúseností a kognitívna defragmentácia.",
    twitterImage: CDN_SUBDOMAINS + "/blog_16x9.png",
  },

  "/sub15": {
    title: "DEATH-CORE: Digitálny Testament & Legacy Trezor | NEXUS OS",
    description:
      "Konečná perspektíva bytia. Memento mori, archivácia kľúčov, digitálny odkaz a suverénny odchod zo Siete.",
    themeColor: "#4A4A4A",
    ogUrl: DEATH_URL,
    ogType: "website",
    ogTitle: "DEATH-CORE: Digitálny Testament & Legacy Trezor | NEXUS OS",
    ogDescription:
      "Konečná perspektíva bytia. Memento mori, archivácia kľúčov, digitálny odkaz a suverénny odchod zo Siete.",
    ogImage: CDN_SUBDOMAINS + "/death_16x9.png",
    twitterCard: "summary_large_image",
    twitterTitle: "DEATH-CORE: Digitálny Testament | NEXUS OS",
    twitterDescription:
      "Memento mori, archivácia kľúčov a trvalý digitálny odkaz.",
    twitterImage: CDN_SUBDOMAINS + "/death_16x9.png",
  },

  // --- ⚖️ PRÁVNA INTEGRITA & SYSTÉMOVÉ CHYBY NA SUBDOMENS ---
  "/vop": {
    title: "VŠEOBECNÉ OBCHODNÉ PODMIENKY | NEXUS CODEX | NEXUS OS",
    description:
      "Všeobecné obchodné podmienky, licenčné pravidlá a právna integrita obchodného ekosystému Projekt Nexus a Nexus Agency.",
    themeColor: "#39FF14",
    ogUrl: SITE_URL + "/vop",
    ogType: "website",
    ogTitle: "VŠEOBECNÉ OBCHODNÉ PODMIENKY | NEXUS CODEX | NEXUS OS",
    ogDescription:
      "Všeobecné obchodné podmienky, licenčné pravidlá a právna integrita obchodného ekosystému Projekt Nexus.",
    ogImage: CDN_SUBDOMAINS + "/codex_16x9.png",
    twitterCard: "summary_large_image",
    twitterTitle: "VŠEOBECNÉ OBCHODNÉ PODMIENKY | NEXUS CODEX | NEXUS OS",
    twitterDescription:
      "Všeobecné obchodné podmienky, licenčné pravidlá a právna integrita ekosystému.",
    twitterImage: CDN_SUBDOMAINS + "/codex_16x9.png",
  },

  "/privacy": {
    title: "OCHRANA OSOBNÝCH ÚDAJOV (GDPR) | NEXUS CODEX | NEXUS OS",
    description:
      "Pravidlá ochrany osobných údajov, spracovanie cookies a kryptografická ochrana dát operátorov v Sieti Projekt Nexus.",
    themeColor: "#39FF14",
    ogUrl: SITE_URL + "/privacy",
    ogType: "website",
    ogTitle: "OCHRANA OSOBNÝCH ÚDAJOV (GDPR) | NEXUS CODEX | NEXUS OS",
    ogDescription:
      "Pravidlá ochrany osobných údajov, spracovanie cookies a kryptografická ochrana dát operátorov v Sieti Projekt Nexus.",
    ogImage: CDN_SUBDOMAINS + "/codex_16x9.png",
    twitterCard: "summary_large_image",
    twitterTitle: "OCHRANA OSOBNÝCH ÚDAJOV (GDPR) | NEXUS CODEX | NEXUS OS",
    twitterDescription:
      "Pravidlá ochrany osobných údajov a kryptografická ochrana dát v Sieti.",
    twitterImage: CDN_SUBDOMAINS + "/codex_16x9.png",
  },

  "/404.html": {
    title: "404 SYSTEM ERROR | Zablúdil si v Matrixe | NEXUS OS",
    description:
      "Požadovaný uzol nebol v Sieti nájdený alebo bol terminovaný. Reštartuj spojenie a vráť sa späť na hlavný Grid.",
    themeColor: "#FF003C",
    ogUrl: SITE_URL + "/404.html",
    ogType: "website",
    ogTitle: "404 SYSTEM ERROR | Zablúdil si v Matrixe | NEXUS OS",
    ogDescription:
      "Požadovaný uzol nebol v Sieti nájdený alebo bol terminovaný. Reštartuj spojenie a vráť sa späť na hlavný Grid.",
    ogImage: CDN_SUBDOMAINS + "/player_16x9.png",
    twitterCard: "summary_large_image",
    twitterTitle: "404 SYSTEM ERROR | Zablúdil si v Matrixe | NEXUS OS",
    twitterDescription:
      "Požadovaný uzol nebol v Sieti nájdený alebo bol terminovaný.",
    twitterImage: CDN_SUBDOMAINS + "/player_16x9.png",
  },
};

// ============================================================================
// 🔗 4. MAPOVANIE SUBDOMÉN (HOST & NAME ALIASES)
// ============================================================================
SEO_REGISTRY["mentor.projekt-nexus.sk"] = SEO_REGISTRY["/sub00"];
SEO_REGISTRY["/mentor"] = SEO_REGISTRY["/sub00"];

SEO_REGISTRY["personal.projekt-nexus.sk"] = SEO_REGISTRY["/sub01"];
SEO_REGISTRY["/personal"] = SEO_REGISTRY["/sub01"];

SEO_REGISTRY["work.projekt-nexus.sk"] = SEO_REGISTRY["/sub02"];
SEO_REGISTRY["/work"] = SEO_REGISTRY["/sub02"];

SEO_REGISTRY["finance.projekt-nexus.sk"] = SEO_REGISTRY["/sub03"];
SEO_REGISTRY["/finance"] = SEO_REGISTRY["/sub03"];

SEO_REGISTRY["business.projekt-nexus.sk"] = SEO_REGISTRY["/sub04"];
SEO_REGISTRY["/business"] = SEO_REGISTRY["/sub04"];

SEO_REGISTRY["investments.projekt-nexus.sk"] = SEO_REGISTRY["/sub05"];
SEO_REGISTRY["/investments"] = SEO_REGISTRY["/sub05"];

SEO_REGISTRY["study.projekt-nexus.sk"] = SEO_REGISTRY["/sub06"];
SEO_REGISTRY["/study"] = SEO_REGISTRY["/sub06"];

SEO_REGISTRY["professional.projekt-nexus.sk"] = SEO_REGISTRY["/sub07"];
SEO_REGISTRY["/professional"] = SEO_REGISTRY["/sub07"];

SEO_REGISTRY["reader.projekt-nexus.sk"] = SEO_REGISTRY["/sub08"];
SEO_REGISTRY["/reader"] = SEO_REGISTRY["/sub08"];

SEO_REGISTRY["player.projekt-nexus.sk"] = SEO_REGISTRY["/sub09"];
SEO_REGISTRY["/player"] = SEO_REGISTRY["/sub09"];

SEO_REGISTRY["home.projekt-nexus.sk"] = SEO_REGISTRY["/sub10"];
SEO_REGISTRY["/home-sub"] = SEO_REGISTRY["/sub10"];

SEO_REGISTRY["recovery.projekt-nexus.sk"] = SEO_REGISTRY["/sub11"];
SEO_REGISTRY["/recovery"] = SEO_REGISTRY["/sub11"];

SEO_REGISTRY["codex.projekt-nexus.sk"] = SEO_REGISTRY["/sub12"];
SEO_REGISTRY["/codex"] = SEO_REGISTRY["/sub12"];

SEO_REGISTRY["habits.projekt-nexus.sk"] = SEO_REGISTRY["/sub13"];
SEO_REGISTRY["/habits"] = SEO_REGISTRY["/sub13"];

SEO_REGISTRY["blog.projekt-nexus.sk"] = SEO_REGISTRY["/sub14"];

SEO_REGISTRY["death.projekt-nexus.sk"] = SEO_REGISTRY["/sub15"];
SEO_REGISTRY["/death"] = SEO_REGISTRY["/sub15"];

export default SEO_REGISTRY;
