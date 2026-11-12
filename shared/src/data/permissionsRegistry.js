/* eslint-disable no-undef */
// ============================================================================
// 👑 PROJECT NEXUS — OS GENESIS EDITION
// File: src/data/permissionsRegistry.js
// Core Version: PERMISSIONS-REGISTRY V20.12 (100% FULL SSOT SOURCE SYNC)
// Status: STRICTLY GROUNDED // ALL EXPORTS PRESERVED + CAN PREVIEW PDF GATEWAY
// ============================================================================

// ============================================================================
// 👑 1. REGISTER TIER FARIEB (HODNOSTI OPERÁTOROV)
// ============================================================================
export const TIER_COLORS = {
  BANNED: "#FF0000", // 🚫 BANNED: Čistá systémová červená pre zablokované účty
  FREE: "#00f3ff", // ❄️ FREE: Jasný kybernetický cyan pre základných členov
  QUEST: "#6B7280", // 🌫️ QUEST/HOSŤ: Tlmená dymovo-sivá pre anonymné relácie
  GUEST: "#6B7280", // 🌫️ GUEST: Dymovo-sivá
  HOSŤ: "#6B7280", // 🌫️ GUEST: Dymovo-sivá
  HOST: "#6B7280", // 🌫️ GUEST: Dymovo-sivá
  FREEMIUM: "#00f3ff", // ❄️ FREEMIUM: Kybernetický cyan
  PRO: "#00FF00", // 🟢 PRO: Ostrá neónová zelená
  PROMIUM: "#00FF00", // 🟢 PROMIUM: Neónová zelená
  OMEGA: "#FFD700", // ☄️ OMEGA: Legendárna zlatá
  OMEGAMIUM: "#FFD700", // ☄️ OMEGAMIUM: Zlatá
  MODERATOR: "#D2B48C", // 🛡️ MODERATOR: Tlmená zemitá piesková
  ADMIN: "#FF00FF", // 🔮 ADMIN: Divoká neónová magenta
  MASTER: "#FF3131", // 🔴 MASTER: Neónová červená
  MASTERMIUM: "#FF003C", // 🔴 MASTERMIUM: Temná malinovo-červená
  ARCHITECT: "#FF003C", // 👑 ARCHITECT: Malinovo-červená (podpis tvorcu Matrixu)
};

export const getTierColor = (tier) => {
  if (!tier) return "rgba(255,255,255,0.4)";
  const cleanTier = String(tier).toUpperCase().trim();
  return TIER_COLORS[cleanTier] || "rgba(255,255,255,0.4)";
};

// ============================================================================
// 🛡️ 2. HIERARCHICKÝ REBRÍČEK TIEROV (TIER RANK MATRIX)
// ============================================================================
export const TIER_RANKS = {
  QUEST: 0, // 🔒 QUEST/HOSŤ: Nulový prístup
  GUEST: 0, // 🔒 GUEST: Nulový prístup
  BANNED: 0,
  FREE: 1,
  FREEMIUM: 1,
  ZDARMA: 1,
  PRO: 2,
  PROMIUM: 2,
  OMEGA: 3,
  OMEGAMIUM: 3,
  MODERATOR: 4,
  ADMIN: 5,
  MASTER: 6,
  MASTERMIUM: 6,
  ARCHITECT: 7,
};

// ============================================================================
// 🔐 3. OVERENIE OPRÁVNENIA NA NÁHĽAD PDF (CAN PREVIEW PDF FIREWALL)
// ============================================================================
export const canPreviewPdf = (userTier = "FREE", docTier = "FREE") => {
  if (isQuestUser(userTier)) return false; // 🔒 QUEST MÁ PRÍSNY ZÁKAZ NÁHĽADU PDF
  const cleanUser = String(userTier || "FREE")
    .toUpperCase()
    .trim();
  const cleanDoc = String(docTier || "FREE")
    .toUpperCase()
    .trim();

  const userRank = TIER_RANKS[cleanUser] ?? 1;
  const docRank = TIER_RANKS[cleanDoc] ?? 1;

  if (userRank === 0) return false;
  return userRank >= docRank;
};

// ============================================================================
// 🌌 4. OMEGA MAPA - ZÁKON O DIMENZIÁCH (TAGS & COLORS)
// ============================================================================
export const DIMENSION_TAGS = {
  ID00: {
    id: "ID00",
    short: "ISM",
    name: "Mentor-Hub",
    full: "Inteligentný Systémový Mentoring",
    color: "#FFFFFF",
  },
  ID01: {
    id: "ID01",
    short: "OSI",
    name: "Identity-Core",
    full: "Osobný Rast a Identita",
    color: "#39FF14",
  },
  ID02: {
    id: "ID02",
    short: "PHP",
    name: "The-Workflow",
    full: "Produktivita a Hlboká Práca",
    color: "#FFEB3B",
  },
  ID03: {
    id: "ID03",
    short: "ROF",
    name: "Cash-Engine",
    full: "Riadenie Osobných Financií",
    color: "#FFD700",
  },
  ID04: {
    id: "ID04",
    short: "TZP",
    name: "Revenue-Architect",
    full: "Tvorba Zisku a Podnikanie",
    color: "#FFAA00",
  },
  ID05: {
    id: "ID05",
    short: "IPP",
    name: "Assets-Matrix",
    full: "Investície a Pasívny Príjem",
    color: "#FF8C00",
  },
  ID06: {
    id: "ID06",
    short: "AUŠ",
    name: "Data-Absorber",
    full: "Akcelerované Učenie a Štúdium",
    color: "#BF00FF",
  },
  ID07: {
    id: "ID07",
    short: "RIT",
    name: "Skills-Tree",
    full: "Rozvoj IT Zručností",
    color: "#8A2BE2",
  },
  ID08: {
    id: "ID08",
    short: "SLD",
    name: "Empty-Book",
    full: "Sémantická Literárna Databáza",
    color: "#00FFFF",
  },
  ID09: {
    id: "ID09",
    short: "TMG",
    name: "Sergeant-Core",
    full: "Taktické Myslenie a Gaming",
    color: "#FF003C",
  },
  ID10: {
    id: "ID10",
    short: "NDS",
    name: "NonIdentity-Core",
    full: "Nenáboženské Duchovno a Bytie",
    color: "#0044FF",
  },
  ID11: {
    id: "ID11",
    short: "MFR",
    name: "The-Recovery",
    full: "Mentálna a Fyzická Regenerácia",
    color: "#FFBF00",
  },
  ID12: {
    id: "ID12",
    short: "CKM",
    name: "Nexus-Codex",
    full: "Centrálny Kódex Matrixu",
    color: "#00E5FF",
  },
  ID13: {
    id: "ID13",
    short: "ADN",
    name: "Nexus-Habits",
    full: "Architektúra Denných Návykov",
    color: "#00008B",
  },
  ID14: {
    id: "ID14",
    short: "OKS",
    name: "Nexus-Blog",
    full: "Otvorená Komunikačná Sieť",
    color: "#FF1493",
  },
};

export const getDimensionData = (dimId) => {
  return (
    DIMENSION_TAGS[dimId] || {
      id: dimId || "SYS",
      short: "SYS",
      name: "System Core",
      full: "System Core",
      color: "#FFFFFF",
    }
  );
};

export const DIMENSIONS = Object.values(DIMENSION_TAGS).map((dim) => ({
  id: dim.id,
  name: dim.name,
  color: dim.color,
}));

// ============================================================================
// 🛡️ 5. CORE PREMENNÉ A MATICA OPRÁVNENÍ (AUTH MATRIX)
// ============================================================================
export const APP_ID = "nexus-core-production";

export const PERMISSIONS_MATRIX = [
  // 1. ZÁKLADNÉ KOMUNIKAČNÉ PRÁVA
  {
    id: "read_react",
    name: "Čítať a Reagovať (Lajky)",
    quest: true,
    guest: true,
    host: true,
    free: true,
    pro: true,
    omega: true,
    mod: true,
    admin: true,
    master: true,
    arch: true,
  },
  {
    id: "create_thread",
    name: "Spustiť novú diskusiu",
    quest: false,
    guest: false,
    host: false,
    free: true,
    pro: true,
    omega: true,
    mod: true,
    admin: true,
    master: true,
    arch: true,
  },
  {
    id: "cite_reply",
    name: "Citovať a Odpovedať",
    quest: false,
    guest: false,
    host: false,
    free: true,
    pro: true,
    omega: true,
    mod: true,
    admin: true,
    master: true,
    arch: true,
  },

  // 2. OBMEDZENIA DĹŽKY TEXTU
  {
    id: "dossier_limit",
    name: "Limit Dossieru (Znaky)",
    quest: "0K",
    guest: "0K",
    host: "0K",
    free: "1K",
    pro: "2K",
    omega: "3K",
    mod: "4K",
    admin: "5K",
    master: "6K",
    arch: "7K",
  },
  {
    id: "thread_limit",
    name: "Limit na 1 Vlákno",
    quest: "0",
    guest: "0",
    host: "0",
    free: "1500",
    pro: "2500",
    omega: "3500",
    mod: "4500",
    admin: "5500",
    master: "6500",
    arch: "7500",
  },

  // 3. PRÉMIOVÝ OBSAH A UZLY (ID00 - ID15)
  {
    id: "free_nodes",
    name: "Prístup k FREE uzlom",
    quest: true,
    guest: true,
    host: true,
    free: true,
    pro: true,
    omega: true,
    mod: true,
    admin: true,
    master: true,
    arch: true,
  },
  {
    id: "pro_nodes",
    name: "Prístup k PRO uzlom",
    quest: false,
    guest: false,
    host: false,
    free: false,
    pro: true,
    omega: true,
    mod: true,
    admin: true,
    master: true,
    arch: true,
  },
  {
    id: "omega_nodes",
    name: "Prístup k OMEGA VIP uzlom",
    quest: false,
    guest: false,
    host: false,
    free: false,
    pro: false,
    omega: true,
    mod: true,
    admin: true,
    master: true,
    arch: true,
  },
  {
    id: "master_nodes",
    name: "Prístup k MASTER Root uzlom",
    quest: false,
    guest: false,
    host: false,
    free: false,
    pro: false,
    omega: false,
    mod: false,
    admin: true,
    master: true,
    arch: true,
  },
  {
    id: "video_vault",
    name: "Prístup k Video Archívu",
    quest: false,
    guest: false,
    host: false,
    free: false,
    pro: true,
    omega: true,
    mod: true,
    admin: true,
    master: true,
    arch: true,
  },
  {
    id: "mentoring",
    name: "Prístup k Mentoringu",
    quest: false,
    guest: false,
    host: false,
    free: false,
    pro: false,
    omega: true,
    mod: true,
    admin: true,
    master: true,
    arch: true,
  },

  // 4. API ORACLE & AI MODELY
  {
    id: "api_oracle_basic",
    name: "API Oracle Basic",
    quest: false,
    guest: false,
    host: false,
    free: true,
    pro: true,
    omega: true,
    mod: true,
    admin: true,
    master: true,
    arch: true,
  },
  {
    id: "api_oracle_advanced",
    name: "API Oracle Advanced",
    quest: false,
    guest: false,
    host: false,
    free: false,
    pro: false,
    omega: false,
    mod: true,
    admin: true,
    master: true,
    arch: true,
  },

  // 5. MODERAČNÉ A ADMIN PRÁVA
  {
    id: "delete_own",
    name: "Zmazať vlastné vlákno",
    quest: false,
    guest: false,
    host: false,
    free: true,
    pro: true,
    omega: true,
    mod: true,
    admin: true,
    master: true,
    arch: true,
  },
  {
    id: "delete_any",
    name: "Zmazať cudzie vlákna",
    quest: false,
    guest: false,
    host: false,
    free: false,
    pro: false,
    omega: false,
    mod: false,
    admin: true,
    master: false,
    arch: true,
  },
  {
    id: "pin_post",
    name: "Pripnúť vlákno (Pin)",
    quest: false,
    guest: false,
    host: false,
    free: false,
    pro: false,
    omega: false,
    mod: true,
    admin: true,
    master: true,
    arch: true,
  },
  {
    id: "ban_user",
    name: "Uvaliť BAN Operátorovi",
    quest: false,
    guest: false,
    host: false,
    free: false,
    pro: false,
    omega: false,
    mod: true,
    admin: true,
    master: false,
    arch: true,
  },
  {
    id: "edit_constitution",
    name: "Matrix Override (Zmazať entitu)",
    quest: false,
    guest: false,
    host: false,
    free: false,
    pro: false,
    omega: false,
    mod: false,
    admin: false,
    master: false,
    arch: true,
  },

  // 6. TOKENOMICS (DENNÉ LIMITY OC KREDITOV)
  {
    id: "daily_reward_limit",
    name: "Denný Limit Odmien (OC)",
    quest: 0,
    guest: 0,
    host: 0,
    free: 10,
    pro: 12,
    omega: 14,
    mod: 15,
    admin: 20,
    master: 25,
    arch: 50,
  },
];

// ============================================================================
// ⚙️ 6. EXEKUTÍVNA FUNKCIA NA OVERENIE PRÁV (CHECK PERMISSION)
// ============================================================================
export const checkPermission = (tier, permissionId) => {
  const cleanTier = String(tier || "FREE")
    .toLowerCase()
    .trim();
  if (
    cleanTier === "quest" ||
    cleanTier === "guest" ||
    cleanTier === "hosť" ||
    cleanTier === "host"
  ) {
    return false; // Anonymný Quest hosť má tvrdo blokované všetky akcie v Matrixe
  }
  const perm = PERMISSIONS_MATRIX.find((p) => p.id === permissionId);

  if (!perm) return false;

  let tierKey = cleanTier;
  if (cleanTier === "architect") tierKey = "arch";
  else if (cleanTier === "moderator") tierKey = "mod";
  else if (cleanTier === "promium") tierKey = "pro";
  else if (cleanTier === "omegamium") tierKey = "omega";
  else if (cleanTier === "mastermium") tierKey = "master";

  if (perm[tierKey] === undefined) return false;
  if (typeof perm[tierKey] !== "boolean") return perm[tierKey];

  return !!perm[tierKey];
};

// ============================================================================
// 🎟️ 7. TRIPLE VIP TICKETS ENGINE (DOCUMENTS, AUDIOS, VIDEOS)
// ============================================================================
export const VIP_TICKETS_QUOTA = {
  QUEST: { DOCUMENTS: 0, AUDIOS: 0, VIDEOS: 0 },
  GUEST: { DOCUMENTS: 0, AUDIOS: 0, VIDEOS: 0 },
  HOSŤ: { DOCUMENTS: 0, AUDIOS: 0, VIDEOS: 0 },
  FREE: { DOCUMENTS: 0, AUDIOS: 0, VIDEOS: 0 },
  FREEMIUM: { DOCUMENTS: 1, AUDIOS: 1, VIDEOS: 1 },
  PRO: { DOCUMENTS: 2, AUDIOS: 2, VIDEOS: 2 },
  PROMIUM: { DOCUMENTS: 2, AUDIOS: 2, VIDEOS: 2 },
  OMEGA: { DOCUMENTS: 2, AUDIOS: 2, VIDEOS: 2 },
  OMEGAMIUM: { DOCUMENTS: 2, AUDIOS: 2, VIDEOS: 2 },
  MODERATOR: { DOCUMENTS: 2, AUDIOS: 2, VIDEOS: 2 },
  ADMIN: { DOCUMENTS: 2, AUDIOS: 2, VIDEOS: 2 },
  MASTER: { DOCUMENTS: 2, AUDIOS: 2, VIDEOS: 2 },
  MASTERMIUM: { DOCUMENTS: 2, AUDIOS: 2, VIDEOS: 2 },
  ARCHITECT: { DOCUMENTS: 999, AUDIOS: 999, VIDEOS: 999 },
};

export const getVipQuotaForType = (
  userTier = "FREE",
  mediaType = "DOCUMENTS",
) => {
  const cleanTier = String(userTier || "FREE")
    .toUpperCase()
    .trim();
  const cleanType = String(mediaType || "DOCUMENTS")
    .toUpperCase()
    .trim();
  const tierQuotas = VIP_TICKETS_QUOTA[cleanTier] || VIP_TICKETS_QUOTA.FREE;
  return tierQuotas[cleanType] ?? 0;
};

export const getVipTicketsStatus = (
  userTier = "FREE",
  pageKey = "shop",
  savedUsed = 0,
  savedMonth = "",
) => {
  const now = new Date();
  const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

  const cleanTier = String(userTier || "FREE")
    .toUpperCase()
    .trim();
  const isQuest =
    cleanTier === "QUEST" || cleanTier === "GUEST" || cleanTier === "HOSŤ";
  let max = cleanTier === "BANNED" || isQuest ? 0 : 2; // Každý nebanned/nequest člen má 2 VIP lístky mesačne

  let used = Number(savedUsed) || 0;
  if (savedMonth !== currentMonth) {
    used = 0;
  }

  const available = Math.max(0, max - used);
  const isLocked = available === 0 && max > 0;

  return { max, used, available, month: currentMonth, isLocked, pageKey };
};

export default {
  TIER_COLORS,
  getTierColor,
  TIER_RANKS,
  canPreviewPdf,
  DIMENSION_TAGS,
  getDimensionData,
  DIMENSIONS,
  APP_ID,
  PERMISSIONS_MATRIX,
  checkPermission,
  VIP_TICKETS_QUOTA,
  getVipQuotaForType,
  getVipTicketsStatus,
};

// ============================================================================
// 🛡️ 8. QUEST / HOSŤ ROUTE GUARD & MEDIA FIREWALL MATRIX V20.12
// ============================================================================
export const QUEST_ALLOWED_ROUTES = [
  "/login",
  "/video_nodes",
  "/nexus_img_gallery",
  "/nexus_video_gallery",
  "/sys05-directory",
  "/blog",
  "/operators",
  "/operators/databasa",
  "/operators/matrix-sutaz",
  "/settings",
  "/settings/login_connections",
  "/settings/dossier",
  "/settings/health",
  "/settings/contacts",
  "/settings/wallet",
  "/settings/permissions",
  "/settings/notifications",
];

export const isQuestUser = (userOrTier) => {
  if (!userOrTier) return true;
  if (typeof userOrTier === "string") {
    const u = userOrTier.toUpperCase().trim();
    return u === "QUEST" || u === "GUEST" || u === "HOSŤ" || u === "HOST";
  }
  if (typeof userOrTier === "object") {
    const role = String(userOrTier.role || userOrTier.tier || "")
      .toUpperCase()
      .trim();
    return (
      role === "QUEST" ||
      role === "GUEST" ||
      role === "HOSŤ" ||
      role === "HOST" ||
      userOrTier.isQuest === true
    );
  }
  return false;
};

export const isRouteAllowedForQuest = (pathname) => {
  if (!pathname) return true;
  const cleanPath = pathname.toLowerCase().trim();

  // Dimenzie ID00 až ID15 sú pre Quest povolené
  if (/^\/id\d{2}$/.test(cleanPath)) return true;

  // Prísne zakázané zóny pre Quest
  if (
    cleanPath.startsWith("/shop") ||
    cleanPath.startsWith("/admin") ||
    cleanPath.startsWith("/video_mentoring")
  ) {
    return false;
  }

  // Kontrola bielej listiny povolených trás
  return QUEST_ALLOWED_ROUTES.some(
    (route) => cleanPath === route || cleanPath.startsWith(route + "/"),
  );
};

export const canPlayMedia = (userTier = "FREE") => {
  if (isQuestUser(userTier)) return false; // 🔒 ZÁKAZ PREHRÁVANIA MP3 / MP4
  return true;
};

export const canDownloadAssets = (userTier = "FREE") => {
  if (isQuestUser(userTier)) return false; // 🔒 ZÁKAZ STIAHNUTIA ZIP / SÚBOROV
  return true;
};
