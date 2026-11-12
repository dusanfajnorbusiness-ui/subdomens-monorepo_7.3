// 🛰️ EXODUS-READY: 11. 5. 2026 | MODUL: DB CONFIG (V2.1.3 - SECURITY SHIELD)
/**
 * 🛰️ PROJEKT NEXUS: CENTRÁLNY REGISTER KONFIGURÁCIE
 * Účel: Multicloud routing a bezpečná správa kľúčov.
 */
export const EXODUS_CONFIG = {
  // Prepínač reality: "FIREBASE" | "SUPABASE" | "LOCAL"
  ACTIVE_PROVIDER: "SUPABASE",

  FALLBACK_ENABLED: true,
  DEBUG_LOGS: true,
  VERSION: "2.1.3-EXODUS-PRO-SHIELD",

  // 🟦 SUPABASE LIVE CONFIGURATION (Defenzívne ošetrenie prehliadača aj Node.js)
  SUPABASE_URL:
    (typeof import.meta !== "undefined" &&
      import.meta.env &&
      (import.meta.env.VITE_SUPABASE_URL ||
        import.meta.env.REACT_APP_SUPABASE_URL)) ||
    (typeof process !== "undefined" &&
      process.env &&
      (process.env.VITE_SUPABASE_URL || process.env.REACT_APP_SUPABASE_URL)) ||
    "https://placeholder.supabase.co",
  SUPABASE_ANON_KEY:
    (typeof import.meta !== "undefined" &&
      import.meta.env &&
      (import.meta.env.VITE_SUPABASE_ANON_KEY ||
        import.meta.env.REACT_APP_SUPABASE_ANON_KEY)) ||
    (typeof process !== "undefined" &&
      process.env &&
      (process.env.VITE_SUPABASE_ANON_KEY ||
        process.env.REACT_APP_SUPABASE_ANON_KEY)) ||
    "placeholder-key",
};

console.log(
  "🛡️ [EXODUS CONFIG]: Provider loaded successfully ➔",
  EXODUS_CONFIG.ACTIVE_PROVIDER,
  "| URL:",
  EXODUS_CONFIG.SUPABASE_URL ? "OK" : "MISSING",
);
