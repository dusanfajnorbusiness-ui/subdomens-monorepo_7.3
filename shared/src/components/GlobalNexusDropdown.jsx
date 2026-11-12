/* eslint-disable no-undef */
// ============================================================================
// 👑 PROJECT NEXUS — OS GENESIS EDITION (GLOBAL ECOSYSTEM DUAL DROPDOWN V20.95)
// Súbor: shared/src/components/GlobalSubDropdown.jsx
// Dizajn: NEXUS SURGICAL CYBERTECH ZENITH (#00f3ff) // ZERO-BALAST POLICY
// ============================================================================

import React, { useState, useEffect, useRef } from "react";
import { Globe, Layers, ChevronDown, ExternalLink, Sparkles } from "lucide-react";
import { NexusThemePropsProvider } from "@shared/components/NexusThemePropsContext.jsx";
export const SubdomainStandbyPage = () => {
     const { activeSubId, themeColor, currentSector, currentSub, setSubdomain } = useNexusThemeProps();
     // Všetko je okamžite prepojené a podriadené aktívnej subdoméne!
   };

export function GlobalNexusDropdown({
  currentSubId = null,
  subId = null,
  activeColor,
  themeColor,
  color,
  onSelectSub
}) {
  // 🛡️ V20 DEFENZÍVA: Priorita preberá chameleon farbu z App.jsx (napr. #FF003C pre sub09)
  const effectiveColor = String(themeColor || activeColor || color || "#FF003C");
  const activeSub = String(currentSubId || subId || "SUB 00").toUpperCase();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Defenzívne zatvorenie kliknutím mimo okna
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left font-mono z-50" ref={dropdownRef}>
      {/* 🔘 DROPDOWN TRIGGER BUTTON */}
       <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg border backdrop-blur-md transition-all duration-300 text-xs font-bold"
        style={{
          borderColor: `${effectiveColor}40`,
          backgroundColor: `${effectiveColor}10`,
          color: effectiveColor,
          boxShadow: `0 0 10px ${effectiveColor}15`,
        }}
      >
        <Globe className="w-3.5 h-3.5" style={{ color: effectiveColor }} />
        <span>NEXUS NET</span>
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          style={{ color: effectiveColor }}
        />
      </button>

      {/* 📋 ROZBAĽOVACIE MENU V AGENCY CYBER-BRUTALIZME */}
     {isOpen && (
        <div
          className="absolute right-0 mt-2 w-72 bg-black/95 backdrop-blur-md rounded-xl z-50 p-2 divide-y divide-zinc-900 animate-in fade-in zoom-in-95 duration-150 border"
          style={{
            borderColor: `${effectiveColor}40`,
            boxShadow: `0 0 25px ${effectiveColor}25`,
          }}
        >
          <div
            className="px-3 py-1.5 text-[9px] uppercase tracking-widest font-bold flex items-center justify-between"
            style={{ color: effectiveColor }}
          >
            <span>EXTERNÝ ROUTING</span>
            <span
              className="text-[8px] px-1 py-0.5 rounded border"
              style={{
                backgroundColor: `${effectiveColor}15`,
                borderColor: `${effectiveColor}30`,
                color: effectiveColor,
              }}
            >
              3 AKTÍVNE UZLY
            </span>
          </div>

          <div className="py-1.5 space-y-1">
            {/* 1. ODKAZ: PROJEKT NEXUS */}
            <a
              href="https://projekt-nexus.sk"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="group flex items-center justify-between p-2.5 rounded-lg hover:bg-zinc-900/80 border border-transparent hover:border-[#00f3ff]/30 transition-all"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-[#00f3ff] group-hover:scale-105 transition-transform shadow-[0_0_8px_rgba(0,243,255,0.1)]">
                  <Globe className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-zinc-100 group-hover:text-[#00f3ff] transition-colors">
                    PROJEKT-NEXUS.SK
                  </div>
                  <div className="text-[10px] text-zinc-400">Hlavný Monolit OS Genesis</div>
                </div>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-zinc-600 group-hover:text-[#00f3ff] transition-colors" />
            </a>

            {/* 2. ODKAZ: NEXUS AGENCY */}
            <a
              href="https://agency.projekt-nexus.sk"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="group flex items-center justify-between p-2.5 rounded-lg hover:bg-zinc-900/80 border border-transparent hover:border-[#00f3ff]/30 transition-all"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-[#ff0055] group-hover:scale-105 transition-transform shadow-[0_0_8px_rgba(255,0,85,0.1)]">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-zinc-100 group-hover:text-[#ff0055] transition-colors">
                    NEXUS AGENCY
                  </div>
                  <div className="text-[10px] text-zinc-400">B2B CyberTech Služby</div>
                </div>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-zinc-600 group-hover:text-[#ff0055] transition-colors" />
            </a>

            {/* 3. ODKAZ: SUBDOMÉNY */}
            <a
              href="https://mentor.projekt-nexus.sk"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="group flex items-center justify-between p-2.5 rounded-lg hover:bg-zinc-900/80 border border-transparent hover:border-[#00f3ff]/30 transition-all"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-[#10b981] group-hover:scale-105 transition-transform shadow-[0_0_8px_rgba(16,185,129,0.1)]">
                  <Layers className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-zinc-100 group-hover:text-[#10b981] transition-colors">
                    SUBDOMÉNY
                  </div>
                  <div className="text-[10px] text-zinc-400">16 Satelitov & Komerčné Moduly</div>
                </div>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-zinc-600 group-hover:text-[#10b981] transition-colors" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default GlobalNexusDropdown;
