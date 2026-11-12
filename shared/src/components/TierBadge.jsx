// ============================================================================
// ⚠️ LOKÁLNE IMPORTY (ZAKOMENTOVANÉ PRE STABILITU CANVAS NÁHĽADU) ⚠️
// ARCHITEKT: PRED NASADENÍM ODKOMENTUJ TIETO ORIGINÁLY A ZMAŽ MOCK BLOK:
// ============================================================================

import { getTierColor } from "@shared/data/nexusConfig.js";
import { Crown, ShieldAlert, ShieldCheck, User, Zap } from "lucide-react";
import React from "react";

// ============================================================================
// 🛑 MOCK PRE CANVAS NÁHĽAD (ZMAZAŤ V LOKÁLNOM PROJEKTE) 🛑
// ============================================================================

// ============================================================================

/**
 * 💠 KROK 5/8: TIER BADGE COMPONENT (V2.0 DEFRAGMENTED)
 * DESIGNED BY | SERGEANT [CORE] DUŠAN FAJNOR
 * ---------------------------------------------------------------------------
 * Účel: Centralizovaný zobrazovač prístupových práv pre profily a uzly.
 * Update: Odstránená duplicitná logika farieb. Modul je teraz plne napojený
 * na centrálny register nexusConfig.js (getTierColor).
 */
export const TierBadge = ({ tier, size = "md", showIcon = true }) => {
  const cleanTier = String(tier).toUpperCase();

  // ============================================================================
  // 🛡️ 1. IKONOGRAFICKÝ REGISTER (Visual Mapping)
  // ============================================================================
  const getTierIcon = (t) => {
    switch (t) {
      case "ARCHITECT":
        return <Crown size={12} />;
      case "MASTER":
        return <Crown size={12} />;
      case "ADMIN":
        return <ShieldCheck size={12} />;
      case "MODERATOR":
        return <ShieldCheck size={12} />;
      case "OMEGA":
        return <Zap size={12} />;
      case "PRO":
        return <Zap size={12} />;
      case "FREE":
        return <User size={12} />;
      case "QUEST":
      case "GUEST":
      case "HOSŤ":
      case "BANNED":
        return <ShieldAlert size={12} />;
      default:
        return null;
    }
  };

  // 📡 DEFRAGMENTÁCIA: Použitie globálnej farby z nexusConfig.js
  const tColor = getTierColor(cleanTier);

  // ============================================================================
  // 📏 2. ADAPTÍVNY RENDER (Size Classes)
  // ============================================================================
  // Komponent podporuje rôzne veľkosti, čo umožňuje jeho vloženie
  // do kompaktných zoznamov (sm) aj veľkých profilových kariet (md).
  const sizeClasses =
    size === "sm"
      ? "px-2 py-0.5 text-[7px] gap-1 rounded-md border"
      : "px-3 py-1 text-[8px] md:text-[9px] gap-2 rounded-lg border border-white/10";

  // ============================================================================
  // ✨ 3. VIZUÁLNE VRSTVY (Zen Zenith Architecture)
  // ============================================================================
  // Implementuje CSS vrstvy pre priesvitnosť (backgroundColor s 10% opacitou)
  // a dynamickú žiaru (boxShadow), ktoré sa prispôsobujú aktuálnej farbe TIERu.
  return (
    <div
      className={`inline-flex items-center font-black uppercase tracking-widest transition-all shadow-lg backdrop-blur-md ${sizeClasses}`}
      style={{
        color: tColor,
        borderColor: `${tColor}40`,
        backgroundColor: `${tColor}10`,
        boxShadow: `0 0 15px ${tColor}15`,
      }}
    >
      {showIcon && <span className="shrink-0">{getTierIcon(cleanTier)}</span>}
      <span>
        {cleanTier === "GUEST" || cleanTier === "HOSŤ" ? "QUEST" : cleanTier}{" "}
        TIER
      </span>
    </div>
  );
};

// Export pre predvolené použitie v iných moduloch
export default TierBadge;
