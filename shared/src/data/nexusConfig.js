// 🛡️ CENTRÁLNY MOST: Získavame Supabase klienta z JEDINÉHO platného zdroja (Strojovne)
import { supabase } from "@shared/services/NexusDB_Supabase.js";
/**
 * ============================================================================
 * 👑 NEXUS CONFIG - MASTER REGISTER & DB ROUTING (V4.9)
 * ============================================================================
 * ÚČEL SÚBORU:
 * Toto je absolútne srdce Matrixu. Obsahuje prepojenia na obe databázy
 * (Firebase aj Supabase), definuje prístupové práva (TIER_VALUES) a
 * je "Single Source of Truth" (SSOT) pre všetky farby a dimenzie v systéme.
 *
 * APLIKOVANÉ OPRAVY (Zákon Symetrie):
 * - ID12 (Codex) zmenené z tmavej fialovej na kybernetickú tyrkysovú #00E5FF.
 * - ID14 (Blog) zmenené z červenej na Neon Pink #FF1493 (odstránená kolízia s ID09).
 * ============================================================================
 */

// import { getApp, getApps, initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

const isLocalhost =
  typeof window !== "undefined" && window.location.hostname === "localhost";

export const APP_ID = "nexus-system";

// 👑 SUPABASE IS THE ONLY ACTIVE PROVIDER IN OS GENESIS V20
export { supabase };

// ============================================================================
// 🔴 FIREBASE CORE (Bezpečne načítava vlastný kľúč, nie Gemini!)
// ============================================================================
const getSafeFirebaseKey = () => {
  if (typeof import.meta !== "undefined" && import.meta.env) {
    return (
      import.meta.env.VITE_FIREBASE_API_KEY ||
      import.meta.env.REACT_APP_FIREBASE_API_KEY ||
      "placeholder-firebase-key"
    );
  }
  if (typeof process !== "undefined" && process.env) {
    return (
      process.env.VITE_FIREBASE_API_KEY ||
      process.env.REACT_APP_FIREBASE_API_KEY ||
      "placeholder-firebase-key"
    );
  }
  return "placeholder-firebase-key";
};

let firebaseConfig = {
  apiKey: getSafeFirebaseKey(),
  authDomain: "nexus-core-2mb.firebaseapp.com",
  projectId: "nexus-core-2mb",
  storageBucket: "nexus-core-2mb.firebasestorage.app",
  messagingSenderId: "906269523308",
  appId: "1:906269523308:web:a4d4b70b03a03804570749",
};

console.log(
  "🛡️ [NEXUS CONFIG]: Firebase Shield Active | Key Status:",
  firebaseConfig.apiKey !== "placeholder-firebase-key"
    ? "LIVE_KEY"
    : "FALLBACK_KEY",
);

export const appCore = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();
export const authCore = getAuth(appCore);
export const dbCore = getFirestore(appCore);
// Pôvodný riadok 73 (export const APP\_ID = ...) vymazaný, premenná je už deklarovaná na vrchu súboru.
console.log(
  "🛡️ [NEXUS CONFIG]: SSOT Register zosynchronizovaný bez duplicity.",
);

// 🛑 SUPABASE KLON BOL ÚPLNE VYMAZANÝ Z TOHTO SÚBORU (Žiadny process.env pre Supabase, žiadny createClient)

// ============================================================================
// 🎨 CENTRÁLNY REGISTER DIMENZIÍ A FARIEB (Definitívny Fix pre HomePage a Blog)
// ============================================================================
export const TIER_VALUES = {
  QUEST: 0,
  GUEST: 0,
  BANNED: 0,
  FREE: 1,
  PRO: 2,
  OMEGA: 3,
  MODERATOR: 4,
  ADMIN: 5,
  MASTER: 6,
  ARCHITECT: 7,
};

/**
 * 👑 NEXUS CONFIG - PROTOKOL FAREBNOSTI UZLOV (TIERS)
 * Tieto farby definujú vizuálnu identitu tagov a efektov v celej aplikácii.
 * Prispôsobené pre tmavé (AMOLED / Deep Black) pozadie s vysokým kontrastom.
 */
export const TIER_COLORS = {
  QUEST: "#6B7280", // 🌫️ QUEST/HOSŤ: Tlmená dymovo-sivá pre anonymné relácie
  GUEST: "#6B7280", // 🌫️ GUEST: Dymovo-sivá
  BANNED: "#FF0000", // 🚫 BANNED: Čistá systémová červená pre zablokované účty (výstraha)
  FREE: "#00f3ff", // ❄️ FREE: Jasný kybernetický cyan pre základných bezplatných členov
  PRO: "#00FF00", // 🟢 PRO: Ostrá neónová zelená reprezentujúca pokročilého "Pro" používateľa
  OMEGA: "#FFD700", // ☄️ OMEGA: Návrat k legendárnej zlatej (Gold) pre limitované licencie a špeciálne účty
  MODERATOR: "#D2B48C", // 🛡️ MODERATOR: Tlmená zemitá piesková pre udržanie neutrality pri správe chatu a fór
  ADMIN: "#FF00FF", // 🔮 ADMIN: Divoká neónová magenta pre absolútnych správcov systému
  MASTER: "#FF3131", // 🔴 MASTER: Brutálna neónová červená pre najvyšší herný rank (skutočný Master)
  ARCHITECT: "#FF003C", // 👑 ARCHITECT: Tvoj osobný exkluzívny kód (temná malinovo-červená), podpis tvorcu Matrixu
};

export const getTierColor = (tier) => {
  if (!tier) return TIER_COLORS.QUEST;
  const cleanTier = String(tier).toUpperCase().trim();
  if (cleanTier === "QUEST" || cleanTier === "GUEST" || cleanTier === "HOSŤ") {
    return TIER_COLORS.QUEST;
  }
  return TIER_COLORS[cleanTier] || TIER_COLORS.FREE;
};

// ⚡ JADRO NEXUSU: Dimenzie, Systémové Uzly a Sémantické Tény
export const DIMENSIONS = [
  // 🔴 1. HLAVNÉ KOGNITÍVNE DIMENZIE (Viditeľné na HomePage)
  {
    id: "ID00",
    name: "MENTOR-HUB",
    color: "#FFFFFF",
    requiredTier: "FREE",
    type: "DIM",
  },
  {
    id: "ID01",
    name: "IDENTITY-CORE",
    color: "#39FF14",
    requiredTier: "FREE",
    type: "DIM",
  },
  {
    id: "ID02",
    name: "THE-WORKFLOW",
    color: "#FFEB3B",
    requiredTier: "FREE",
    type: "DIM",
  },
  {
    id: "ID03",
    name: "CASH-ENGINE",
    color: "#FFD700",
    requiredTier: "PRO",
    type: "DIM",
  },
  {
    id: "ID04",
    name: "REVENUE-ARCHITECT",
    color: "#FFAA00",
    requiredTier: "PRO",
    type: "DIM",
  },
  {
    id: "ID05",
    name: "ASSETS-MATRIX",
    color: "#FF8C00",
    requiredTier: "OMEGA",
    type: "DIM",
  },
  {
    id: "ID06",
    name: "DATA-ABSORBER",
    color: "#BF00FF",
    requiredTier: "PRO",
    type: "DIM",
  },
  {
    id: "ID07",
    name: "SKILLS-TREE",
    color: "#8A2BE2",
    requiredTier: "PRO",
    type: "DIM",
  },
  {
    id: "ID08",
    name: "EMPTY-BOOK",
    color: "#00FFFF",
    requiredTier: "FREE",
    type: "DIM",
  },
  {
    id: "ID09",
    name: "SERGEANT-CORE",
    color: "#FF003C",
    requiredTier: "FREE",
    type: "DIM",
  },
  {
    id: "ID10",
    name: "NONIDENTITY-CORE",
    color: "#0044FF",
    requiredTier: "FREE",
    type: "DIM",
  },
  {
    id: "ID11",
    name: "THE-RECOVERY",
    color: "#FFBF00",
    requiredTier: "PRO",
    type: "DIM",
  },
  {
    id: "ID12",
    name: "NEXUS-CODEX",
    color: "#00E5FF", // ⚡ FIX: Aplikovaná kybernetická tyrkysová podľa Omega Mapy
    requiredTier: "OMEGA",
    type: "DIM",
  },
  {
    id: "ID13",
    name: "NEXUS-HABITS",
    color: "#00008B",
    requiredTier: "OMEGA",
    type: "DIM",
  },
  {
    id: "ID14",
    name: "NEXUS-BLOG",
    color: "#FF1493", // ⚡ FIX: Aplikovaná Neon Pink pre Blog podľa Omega Mapy
    requiredTier: "FREE",
    type: "DIM",
  },

  // 🔴 2. SYSTÉMOVÉ UZLY (Neviditeľné na HomePage, prístupné z navigácie)
  // ⚡ HARD LOCK: Ochrana pred zneužitím botmi, prístup len pre teba
  {
    id: "API_ORACLE",
    name: "API ORACLE",
    color: "#00f3ff",
    requiredTier: "ARCHITECT",
    type: "SYS",
  },

  // 🔴 3. SÉMANTICKÉ TÉMY - BLOG KATEGÓRIE (type: "STK", viditeľné len na Blogu)
  {
    id: "STK01",
    name: "Filozofia",
    color: "#E0E0E0",
    requiredTier: "FREE",
    type: "STK",
    group: "core",
  },
  {
    id: "STK02",
    name: "Psychológia",
    color: "#E0E0E0",
    requiredTier: "FREE",
    type: "STK",
    group: "core",
  },
  {
    id: "STK03",
    name: "Duchovno",
    color: "#E0E0E0",
    requiredTier: "FREE",
    type: "STK",
    group: "core",
  },
  {
    id: "STK04",
    name: "Náboženstvo",
    color: "#E0E0E0",
    requiredTier: "FREE",
    type: "STK",
    group: "core",
  },
  {
    id: "STK05",
    name: "Počítače & IT",
    color: "#E0E0E0",
    requiredTier: "FREE",
    type: "STK",
    group: "topic",
  },
  {
    id: "STK06",
    name: "Šport",
    color: "#E0E0E0",
    requiredTier: "FREE",
    type: "STK",
    group: "topic",
  },
  {
    id: "STK07",
    name: "Hry Games",
    color: "#E0E0E0",
    requiredTier: "FREE",
    type: "STK",
    group: "topic",
  },
  {
    id: "STK08",
    name: "Láska a Vzťahy",
    color: "#E0E0E0",
    requiredTier: "FREE",
    type: "STK",
    group: "topic",
  },
  {
    id: "STK09",
    name: "Zdravie",
    color: "#E0E0E0",
    requiredTier: "FREE",
    type: "STK",
    group: "topic",
  },
  {
    id: "STK10",
    name: "Podnikanie",
    color: "#E0E0E0",
    requiredTier: "FREE",
    type: "STK",
    group: "topic",
  },
  {
    id: "STK11",
    name: "CyberTechnika",
    color: "#E0E0E0",
    requiredTier: "FREE",
    type: "STK",
    group: "topic",
  },
  {
    id: "STK12",
    name: "Nezaradené",
    color: "#E0E0E0",
    requiredTier: "FREE",
    type: "STK",
    group: "sys",
  },
  {
    id: "STK13",
    name: "Rôzne",
    color: "#E0E0E0",
    requiredTier: "FREE",
    type: "STK",
    group: "sys",
  },
  {
    id: "STK14",
    name: "Systémové Správy",
    color: "#E0E0E0",
    requiredTier: "FREE",
    type: "STK",
    group: "sys",
  },
];

// 🧠 INTELIGENTNÝ PREKLADAČ (Absolútne imúnny voči chybám vo veľkosti písmen)
export const getDimensionConfig = (searchId) => {
  if (!searchId) return { name: "Neznáme", color: "#555555" };

  // Transformuje vyhľadávaný kľúč zo Supabase na VEĽKÉ PÍSMENÁ a oreže medzery
  const normalizedSearchId = String(searchId).trim().toUpperCase();

  // Hľadá zhodu s naším registrom vyššie
  const found = DIMENSIONS.find(
    (d) => d.id.toUpperCase() === normalizedSearchId,
  );

  return found || { name: searchId, color: "#555555" };
};
