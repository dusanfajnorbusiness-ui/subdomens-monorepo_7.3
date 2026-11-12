/* eslint-disable no-undef */

// ============================================================================
// 👑 PROJECT NEXUS — OS GENESIS EDITION (SYS03 SUBDOMAIN DROPDOWN V20.95)
// Súbor: shared/components/SubdomainDropdown.jsx
// Status: 100% GROUNDED // CYBER-BRUTALISM UI/UX // 16 SUB NODES SELECTOR
// Author: Dušan Fajnor @nexus-core2Mb (CyberTech Architect)
// ============================================================================

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Globe, Shield, ExternalLink } from "lucide-react";

// ============================================================================
// ⚠️ OSTRÉ LOKÁLNE IMPORTY (ODKOMENTUJ VO SVOJOM VS CODE)
// ============================================================================
import { SoundFX as ImportedSoundFX } from "@shared/utils/SoundEngine.js";
import { SUBDOMAINS_ARRAY } from "@subdomeny/data/SubdomainsMasterData.js";

// V20 Defenzívne ošetrenie pre zamedzenie ReferenceError ak SoundEngine zlyhá
const SoundFX = ImportedSoundFX || {
  playHover: () => {},
  playSuccess: () => {},
  playClick: () => {},
};

// Spätná kompatibilita pre staré importy

export const SUBDOMAINS_LIST = [
  { id: "SUB 00", dimId: "ID 00", name: "MENTOR-HUB", path: "/sub00", domain: "mentor.projekt-nexus.sk", color: "#FFFFFF", tier: "FREE" },
  { id: "SUB 01", dimId: "ID 01", name: "IDENTITY-CORE", path: "/sub01", domain: "personal.projekt-nexus.sk", color: "#39FF14", tier: "FREE" },
  { id: "SUB 02", dimId: "ID 02", name: "THE-WORKFLOW", path: "/sub02", domain: "work.projekt-nexus.sk", color: "#FFEB3B", tier: "FREE" },
  { id: "SUB 03", dimId: "ID 03", name: "CASH-ENGINE", path: "/sub03", domain: "finance.projekt-nexus.sk", color: "#FFD700", tier: "PRO" },
  { id: "SUB 04", dimId: "ID 04", name: "REVENUE-ARCHITECT", path: "/sub04", domain: "business.projekt-nexus.sk", color: "#FFAA00", tier: "PRO" },
  { id: "SUB 05", dimId: "ID 05", name: "ASSETS-MATRIX", path: "/sub05", domain: "investments.projekt-nexus.sk", color: "#FF8C00", tier: "OMEGA" },
  { id: "SUB 06", dimId: "ID 06", name: "DATA-ABSORBER", path: "/sub06", domain: "study.projekt-nexus.sk", color: "#BF00FF", tier: "PRO" },
  { id: "SUB 07", dimId: "ID 07", name: "SKILLS-TREE", path: "/sub07", domain: "professional.projekt-nexus.sk", color: "#8A2BE2", tier: "PRO" },
  { id: "SUB 08", dimId: "ID 08", name: "EMPTY-BOOK", path: "/sub08", domain: "reader.projekt-nexus.sk", color: "#00FFFF", tier: "FREE" },
  { id: "SUB 09", dimId: "ID 09", name: "SERGEANT-CORE", path: "/sub09", domain: "player.projekt-nexus.sk", color: "#FF003C", tier: "FREE" },
  { id: "SUB 10", dimId: "ID 10", name: "NONIDENTITY-CORE", path: "/sub10", domain: "home.projekt-nexus.sk", color: "#0044FF", tier: "FREE" },
  { id: "SUB 11", dimId: "ID 11", name: "THE-RECOVERY", path: "/sub11", domain: "recovery.projekt-nexus.sk", color: "#FFBF00", tier: "PRO" },
  { id: "SUB 12", dimId: "ID 12", name: "NEXUS-CODEX", path: "/sub12", domain: "codex.projekt-nexus.sk", color: "#00E5FF", tier: "OMEGA" },
  { id: "SUB 13", dimId: "ID 13", name: "NEXUS-HABITS", path: "/sub13", domain: "habits.projekt-nexus.sk", color: "#00008B", tier: "OMEGA" },
  { id: "SUB 14", dimId: "ID 14", name: "NEXUS-BLOG", path: "/sub14", domain: "blog.projekt-nexus.sk", color: "#FF1493", tier: "FREE" },
  { id: "SUB 15", dimId: "ID 15", name: "DEATH-CORE", path: "/sub15", domain: "death.projekt-nexus.sk", color: "#4A4A4A", tier: "FREE" },
];

export function SubdomainDropdown({
  currentSubId = null,
  activeColor = "#00f3ff",
  onSelectSub
}) {
  const [isOpen, setIsOpen] = useState(false);

 

  const [hoveredSub, setHoveredSub] = useState(null);
  const dropdownRef = useRef(null);

  // Bezpečné uzatvorenie dropdownu pri kliknutí mimo komponentu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    try {
      if (!isOpen) {
        SoundFX?.playSuccess?.();
      } else {
        SoundFX?.playClick?.();
      }
    } catch (e) {
      // Fallback ak SoundEngine nie je inicializovaný
    }
    setIsOpen((prev) => !prev);
  };

  const handleSubSelect = (sub) => {
    try {
      SoundFX?.playSuccess?.();
    } catch (e) {}
    setIsOpen(false);

    const isLocalhost =
      typeof window !== "undefined" &&
      (window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1" ||
        window.location.port === "51800");

    // 1. Zmena URL bez reloadu na /sub00 až /sub15
    const cleanNum = String(sub.id || "").replace(/\D/g, "").padStart(2, "0");
    const targetPath = `/sub${cleanNum}`;

    if (typeof window !== "undefined" && window.history) {
      window.history.pushState({}, "", targetPath);
      window.dispatchEvent(new Event("popstate"));
    }

    // 2. DEV & MONOREPO: Okamžité odovzdanie čistého ID pre prefarbenie stránky
    if (isLocalhost) {
      if (typeof onSelectSub === "function") {
        onSelectSub(sub.id); // Odovzdáva presne "SUB 00", "SUB 01" atď.
      }
      return;
    }

    // 3. PRODUKCIA: Presmerovanie na ostrú subdoménu
    if (sub?.domain || sub?.url) {
      window.location.href = sub.url || `https://${String(sub.domain || "")}`;
    }
  };

  const getBadgeStyle = (tier) => {
    const safeTier = String(tier || "").toUpperCase();
    if (safeTier === "OMEGA") return "bg-[#FF8C00]/20 text-[#FF8C00] border-[#FF8C00]/50";
    if (safeTier === "PRO") return "bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/50";
    return "bg-[#39FF14]/20 text-[#39FF14] border-[#39FF14]/50";
  };

  return (
    <div ref={dropdownRef} className="relative inline-block text-left font-mono z-50">
      {/* 🔘 GLOBÁLNE TLAČIDLO SUB PREPOJENÉ NA CHAMELEON TÉMU */}
      <button
        onClick={toggleDropdown}
        onMouseEnter={() => SoundFX?.playHover?.()}
        type="button"
        className="px-3.5 py-1.5 rounded-xl bg-black/80 border text-white text-xs font-extrabold tracking-wider uppercase transition-all duration-200 flex items-center gap-2 active:scale-95 cursor-pointer"
        style={{
          borderColor: isOpen ? activeColor : `${activeColor}60`,
          boxShadow: isOpen
            ? `0 0 18px ${activeColor}50`
            : `0 0 10px ${activeColor}25`,
        }}
      >
        <Globe
          className="w-4 h-4 animate-pulse"
          style={{ color: activeColor }}
        />
        <span style={{ color: activeColor }}>SUB</span>
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          style={{ color: isOpen ? activeColor : "#a1a1aa" }}
        />
      </button>

      {/* DROPDOWN MENU PANEL (CYBER-BRUTALISM GRID) */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-[#03070A]/95 border border-[#00f3ff]/40 backdrop-blur-2xl shadow-[0_0_30px_rgba(0,0,0,0.9)] p-3 space-y-3 z-50 animate-in fade-in zoom-in-95 duration-150">
          {/* HEADER DROPDOWNU */}
          <div className="flex items-center justify-between pb-2 border-b border-white/10 px-1">
            <div className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-[#00f3ff]" />
              <span className="text-[11px] font-black tracking-widest text-[#00f3ff] uppercase">
                SUBDOMÉNY OS GENESIS (SUB 00 - SUB 15)
              </span>
            </div>
            <span className="text-[9px] px-2 py-0.5 rounded-full bg-white/10 text-zinc-400 font-semibold border border-white/10">
              16 UZLOV
            </span>
          </div>

          {/* GRID 16 SUBDOMÉNOVÝCH TLAČIDIEL */}
          <div className="grid grid-cols-2 gap-1.5 max-h-[360px] overflow-y-auto pr-1 custom-scrollbar">
            {SUBDOMAINS_LIST.map((sub) => {
              const isSelected = sub.id === currentSubId;
              const isHovered = hoveredSub?.id === sub.id;

              return (
                <div key={sub.id} className="relative group">
                  <button
                    onClick={() => handleSubSelect(sub)}
                    onMouseEnter={() => {
                      setHoveredSub(sub);
                      SoundFX?.playHover?.();
                    }}
                    onMouseLeave={() => setHoveredSub(null)}
                    className={`w-full text-left p-2 rounded-xl border text-xs transition-all duration-150 flex flex-col justify-between relative overflow-hidden ${
                      isSelected
                        ? "bg-white/10 border-[#00f3ff] shadow-[0_0_10px_rgba(0,243,255,0.3)]"
                        : "bg-black/60 border-white/10 hover:border-white/30 hover:bg-white/5"
                    }`}
                    style={{
                      borderColor: isHovered ? sub.color : undefined,
                    }}
                  >
                    {/* ACCENT LED STRIP ON LEFT */}
                    <div
                      className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl transition-opacity"
                      style={{ backgroundColor: sub.color }}
                    />

                    <div className="flex items-center justify-between pl-2">
                      <span className="font-extrabold text-[11px] tracking-wider text-white">
                        {String(sub.id || "")}
                      </span>
                      <span
                        className={`text-[8px] font-black px-1.5 py-0.2 rounded border uppercase ${getBadgeStyle(
                          sub.tier
                        )}`}
                      >
                        {String(sub.tier || "")}
                      </span>
                    </div>

                    <div className="pl-2 mt-1 truncate">
                      <span
                        className="text-[10px] font-bold block truncate tracking-tight"
                        style={{ color: sub.color }}
                      >
                        {String(sub.name || "")}
                      </span>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>

          {/* TOOLTIP FOOTER DETAIL PRE HOVEROVANÚ SUBDOMÉNU */}
          <div className="pt-2 border-t border-white/10 px-2 min-h-[44px] flex flex-col justify-center bg-black/40 rounded-xl">
            {hoveredSub ? (
              <div className="flex items-center justify-between gap-2 text-[10px]">
                <div className="truncate">
                  <span className="font-extrabold text-white">
                    {String(hoveredSub.id || "")} [{String(hoveredSub.dimId || "")}]:
                  </span>{" "}
                  <span style={{ color: hoveredSub.color }} className="font-bold">
                    {String(hoveredSub.name || "")}
                  </span>
                  <p className="text-zinc-400 text-[9px] truncate">
                    https://{String(hoveredSub.domain || "")}
                  </p>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
              </div>
            ) : (
              <p className="text-[10px] text-zinc-500 text-center italic">
                Prejdi myšou nad subdoménou pre detail...
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SubdomainDropdown;