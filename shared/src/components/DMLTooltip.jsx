/* eslint-disable no-undef */

// ============================================================================
// 👑 PROJECT NEXUS — OS GENESIS EDITION (SYS03 MASTER DATASET V20.95)
// Súbor: shared/src/components/DMLTooltip.jsx
// Status: 100% NOMINAL // DOM-SAFE (SPAN-ONLY) // UNIVERSAL LEXICON RESOLVER V20
// CORE_VERSION: DML-TOOLTIP V20.6
// ============================================================================

import React, { useState } from "react";
import { HelpCircle } from "lucide-react";
import { SoundFX } from "@shared/utils/SoundEngine.js";
import { NEXUS_MASTER_LEXICON } from "@shared/data/NexusMasterLexicon.js";

// 🟢 1. UNIFIKOVANÁ MATRIX TABUĽKA 13 KATEGÓRIÍ A FARIEB
export const DEFAULT_CATEGORY_STYLES = {
  1: { hex: "#94A3B8", text: "text-[#94A3B8]", border: "border-slate-500/30", bg: "bg-slate-500/5", hoverBorder: "hover:border-slate-400", type: "Foreign Lang" },
  2: { hex: "#00B4D8", text: "text-[#00B4D8]", border: "border-cyan-500/30", bg: "bg-cyan-500/5", hoverBorder: "hover:border-cyan-400", type: "IT Pojem" },
  3: { hex: "#00FFFF", text: "text-[#00FFFF]", border: "border-cyan-400/40", bg: "bg-cyan-500/5", hoverBorder: "hover:border-cyan-300", type: "AI Concept" },
  4: { hex: "#FF003C", text: "text-[#FF003C]", border: "border-red-500/30", bg: "bg-red-500/5", hoverBorder: "hover:border-red-400", type: "System Command" },
  5: { hex: "#FFEB3B", text: "text-[#FFEB3B]", border: "border-yellow-500/30", bg: "bg-yellow-500/5", hoverBorder: "hover:border-yellow-300", type: "Work Term" },
  6: { hex: "#FFD700", text: "text-[#FFD700]", border: "border-yellow-500/30", bg: "bg-yellow-500/5", hoverBorder: "hover:border-yellow-300", type: "Finance Term" },
  7: { hex: "#FFAA00", text: "text-[#FFAA00]", border: "border-orange-500/30", bg: "bg-orange-500/5", hoverBorder: "hover:border-orange-300", type: "Business Term" },
  8: { hex: "#FF8C00", text: "text-[#FF8C00]", border: "border-orange-600/30", bg: "bg-orange-600/5", hoverBorder: "hover:border-orange-400", type: "Investment Term" },
  9: { hex: "#8B5CF6", text: "text-[#8B5CF6]", border: "border-violet-500/30", bg: "bg-violet-500/5", hoverBorder: "hover:border-violet-400", type: "Philosophical" },
  10: { hex: "#6366F1", text: "text-[#6366F1]", border: "border-indigo-500/30", bg: "bg-indigo-500/5", hoverBorder: "hover:border-indigo-400", type: "Psychological" },
  11: { hex: "#EC4899", text: "text-[#EC4899]", border: "border-pink-500/30", bg: "bg-pink-500/5", hoverBorder: "hover:border-pink-400", type: "Psychiatric" },
  12: { hex: "#39FF14", text: "text-[#39FF14]", border: "border-green-500/30", bg: "bg-green-500/5", hoverBorder: "hover:border-green-400", type: "Personal UI (Čierne)" },
  13: { hex: "#0044FF", text: "text-[#0044FF]", border: "border-blue-500/30", bg: "bg-blue-500/5", hoverBorder: "hover:border-blue-400", type: "Home UI (Biele)" },

  // String aliasy pre typy kategórií
  foreign_lang: { hex: "#94A3B8", text: "text-[#94A3B8]", border: "border-slate-500/30", bg: "bg-slate-500/5", hoverBorder: "hover:border-slate-400", type: "Foreign Lang" },
  it_term: { hex: "#00B4D8", text: "text-[#00B4D8]", border: "border-cyan-500/30", bg: "bg-cyan-500/5", hoverBorder: "hover:border-cyan-400", type: "IT Pojem" },
  ai_concept: { hex: "#00FFFF", text: "text-[#00FFFF]", border: "border-cyan-400/40", bg: "bg-cyan-500/5", hoverBorder: "hover:border-cyan-300", type: "AI Concept" },
  system_command: { hex: "#FF003C", text: "text-[#FF003C]", border: "border-red-500/30", bg: "bg-red-500/5", hoverBorder: "hover:border-red-400", type: "System Command" },
  work_term: { hex: "#FFEB3B", text: "text-[#FFEB3B]", border: "border-yellow-500/30", bg: "bg-yellow-500/5", hoverBorder: "hover:border-yellow-300", type: "Work Term" },
  finance_term: { hex: "#FFD700", text: "text-[#FFD700]", border: "border-yellow-500/30", bg: "bg-yellow-500/5", hoverBorder: "hover:border-yellow-300", type: "Finance Term" },
  business_term: { hex: "#FFAA00", text: "text-[#FFAA00]", border: "border-orange-500/30", bg: "bg-orange-500/5", hoverBorder: "hover:border-orange-300", type: "Business Term" },
  business: { hex: "#FFAA00", text: "text-[#FFAA00]", border: "border-orange-500/30", bg: "bg-orange-500/5", hoverBorder: "hover:border-orange-300", type: "Business Term" },
  investment_term: { hex: "#FF8C00", text: "text-[#FF8C00]", border: "border-orange-600/30", bg: "bg-orange-600/5", hoverBorder: "hover:border-orange-400", type: "Investment Term" },
  philosophical_term: { hex: "#8B5CF6", text: "text-[#8B5CF6]", border: "border-violet-500/30", bg: "bg-violet-500/5", hoverBorder: "hover:border-violet-400", type: "Philosophical" },
  philosophical: { hex: "#8B5CF6", text: "text-[#8B5CF6]", border: "border-violet-500/30", bg: "bg-violet-500/5", hoverBorder: "hover:border-violet-400", type: "Philosophical" },
  psychological_term: { hex: "#6366F1", text: "text-[#6366F1]", border: "border-indigo-500/30", bg: "bg-indigo-500/5", hoverBorder: "hover:border-indigo-400", type: "Psychological" },
  psychological: { hex: "#6366F1", text: "text-[#6366F1]", border: "border-indigo-500/30", bg: "bg-indigo-500/5", hoverBorder: "hover:border-indigo-400", type: "Psychological" },
  psychiatric_term: { hex: "#EC4899", text: "text-[#EC4899]", border: "border-pink-500/30", bg: "bg-pink-500/5", hoverBorder: "hover:border-pink-400", type: "Psychiatric" },
  personal_ui_term: { hex: "#39FF14", text: "text-[#39FF14]", border: "border-green-500/30", bg: "bg-green-500/5", hoverBorder: "hover:border-green-400", type: "Personal UI (Čierne)" },
  personal_ui: { hex: "#39FF14", text: "text-[#39FF14]", border: "border-green-500/30", bg: "bg-green-500/5", hoverBorder: "hover:border-green-400", type: "Personal UI (Čierne)" },
  home_ui_term: { hex: "#0044FF", text: "text-[#0044FF]", border: "border-blue-500/30", bg: "bg-blue-500/5", hoverBorder: "hover:border-blue-400", type: "Home UI (Biele)" },
  home_ui: { hex: "#0044FF", text: "text-[#0044FF]", border: "border-blue-500/30", bg: "bg-blue-500/5", hoverBorder: "hover:border-blue-400", type: "Home UI (Biele)" },
};

// 🔍 2. UNIVERZÁLNY DÁTOVÝ RESOLVER SLUGU Z AKÉHOKOĽVEK REGISTRA (FLAT AJ NESTED)
const resolveLexiconEntry = (lexikon, normalizedSlug) => {
  if (!lexikon || !normalizedSlug) return null;

  // Priamy kľúč (flat object)
  if (lexikon[normalizedSlug]) return lexikon[normalizedSlug];

  // Kľúč vnútri `terms`
  if (lexikon.terms && lexikon.terms[normalizedSlug]) {
    return lexikon.terms[normalizedSlug];
  }

  // Kľúč vnútri `nodes[i].terms`
  if (Array.isArray(lexikon.nodes)) {
    for (const node of lexikon.nodes) {
      if (node?.terms && node.terms[normalizedSlug]) {
        return node.terms[normalizedSlug];
      }
    }
  }

  // Hľadanie bez ohľadu na malé/veľké písmená
  const targetKey = normalizedSlug.toLowerCase().trim();
  const searchDictionary = (dictObj) => {
    if (!dictObj || typeof dictObj !== "object") return null;
    const matchedKey = Object.keys(dictObj).find(
      (k) => k.toLowerCase().trim() === targetKey
    );
    return matchedKey ? dictObj[matchedKey] : null;
  };

  const directMatch = searchDictionary(lexikon);
  if (directMatch) return directMatch;

  const termsMatch = searchDictionary(lexikon.terms);
  if (termsMatch) return termsMatch;

  if (Array.isArray(lexikon.nodes)) {
    for (const node of lexikon.nodes) {
      const nodeMatch = searchDictionary(node?.terms);
      if (nodeMatch) return nodeMatch;
    }
  }

  return null;
};

// 🟡 3. MAIN COMPONENT
export const DMLTooltip = ({
  slug,
  label,
  lexikon = NEXUS_MASTER_LEXICON,
  categoryStyles = {},
  title,
  description,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // 🛡️ Prečistenie slugu
  const normalizedSlug = slug ? String(slug).toLowerCase().trim() : "";

  // 🔍 Extrakcia zadaného pojmu z akéhokoľvek registra
  const entry = resolveLexiconEntry(lexikon, normalizedSlug);

  // 🎨 Spracovanie kategórie (podpora category_id, category, categoryType)
  const catKey =
    entry?.category_id ??
    entry?.category ??
    entry?.categoryType ??
    entry?.categoryKey ??
    2;

  const catStyle =
    categoryStyles[catKey] ||
    DEFAULT_CATEGORY_STYLES[catKey] ||
    DEFAULT_CATEGORY_STYLES;

  const termToShow = entry?.term || label || children || slug || title || "UNKNOWN_TERM";
  const translation = entry?.translation || "Preklad neuvedený";
  const tooltipText = entry?.tooltip || description || `Sémantický pojem [${termToShow}] nemá priradený popis.`;
  const categoryType = entry?.categoryType || catStyle.type || "IT Pojem";

  const finalTextColor = entry?.textColor || catStyle.text || "text-[#00B4D8]";
  const finalBorderColor = entry?.borderColor || catStyle.border || "border-cyan-500/30";
  const finalBgColor = entry?.bgColor || catStyle.bg || "bg-cyan-500/5";
  const finalHoverBorder = entry?.hoverBorderColor || catStyle.hoverBorder || "hover:border-cyan-400";
  const finalExtraClass = entry?.glow || catStyle.glow || "";

  const handleToggle = (e) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
    if (typeof SoundFX !== "undefined" && SoundFX?.click) SoundFX.click();
  };

  return (
    <span className="relative inline-block mx-1 z-35">
      {/* SPAN-ONLY TRIGGER */}
      <span
        role="button"
        tabIndex={0}
        onClick={handleToggle}
        onMouseEnter={() => {
          if (typeof SoundFX !== "undefined" && SoundFX?.hover) SoundFX.hover();
        }}
        onTouchStart={(e) => {
          e.stopPropagation();
          setIsOpen((prev) => !prev);
          if (typeof SoundFX !== "undefined" && SoundFX?.click) SoundFX.click();
        }}
        className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded border font-mono text-xs md:text-[13px] font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer select-none ${finalTextColor} ${finalBorderColor} ${finalBgColor} ${finalHoverBorder} ${finalExtraClass}`}
      >
        <span>{termToShow}</span>
        <HelpCircle className="w-3 h-3 opacity-60 shrink-0 inline-block" />
      </span>

      {/* SPAN-ONLY POPOVER */}
      {isOpen && (
        <>
          <span
            className="fixed inset-0 z-40 bg-transparent block"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }}
          />
          <span
            className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-72 p-3 rounded-lg bg-[#050A0E] border ${finalBorderColor} shadow-[0_0_20px_rgba(0,0,0,0.9)] text-xs font-mono text-gray-300 animate-fade-in block text-left z-50 ${finalExtraClass}`}
          >
            <span
              className={`font-bold block mb-1 pb-1 border-b border-gray-800 ${finalTextColor}`}
            >
              {termToShow} {translation ? `➔ ${translation}` : ""}
            </span>
            <span className="text-gray-500 font-bold block mb-1 text-[9px] uppercase tracking-wider font-mono">
              Kategória: {categoryType}
            </span>
            <span className="text-gray-400 leading-relaxed block text-[11px] font-normal normal-case">
              {tooltipText}
            </span>
          </span>
        </>
      )}
    </span>
  );
};

export default DMLTooltip;