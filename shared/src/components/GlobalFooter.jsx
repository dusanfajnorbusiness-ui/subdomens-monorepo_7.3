// ⚠️ OSTRÉ LOKÁLNE IMPORTY (ODKOMENTUJ VO SVOJOM VS CODE)
import { CoreChronometer } from "@shared/components/CoreChronometer.jsx";
import { BrainCircuit, Cpu, Database, FileText, Shield, Terminal, Zap } from "lucide-react";
import React from "react";
import { useNexusThemeProps } from "@shared/components/NexusThemePropsContext.jsx";
// ============================================================================
// 👑 PROJECT NEXUS — OS GENESIS EDITION (SYS03 MASTER DATASET V20.95)
// Súbor: @shared/components/GlobalFooter.jsx
// Status: 100% GROUNDED // FULL THEME COLOR SYNC & CORE UPTIME & SYSTEM LOG
// ============================================================================


export const SubdomainStandbyPage = () => {
     const { activeSubId, themeColor, currentSector, currentSub, setSubdomain } = useNexusThemeProps();
     // Všetko je okamžite prepojené a podriadené aktívnej subdoméne!
   };

export const GlobalFooter = ({
  sector,
  activeTab = "home",
  tier,
  userTier = "QUEST",
  themeColor = "#39FF14",
  activeColor,
  onNavigate,
  onOpenSystemLog,
  uptime,
}) => {
  // Pôvodné defenzívne spracovanie
  const activeSector = String(sector || activeTab || "home").toLowerCase();
  const currentThemeColor = String(themeColor || activeColor || "#FF003C");
  const currentYear = new Date().getFullYear();

  // Defenzívne ošetrenie hodnoty Tieru
  const effectiveTier = tier || userTier || "QUEST";
  const displayTier = (() => {
    if (effectiveTier && effectiveTier !== "QUEST") return String(effectiveTier).toUpperCase();
    if (typeof window !== "undefined") {
      try {
        const active = localStorage.getItem("nexus_active_identity");
        if (active) {
          const parsed = JSON.parse(active);
          if (parsed?.tier) return String(parsed.tier).toUpperCase();
        }
      } catch (e) {}
    }
    return String(effectiveTier || "QUEST").toUpperCase();
  })();

  return (
    <footer className="relative mt-auto border-t border-white/5 bg-[#020408]/90 backdrop-blur-xl overflow-hidden font-mono transition-colors duration-500">
      {/* 🎨 Dynamický glow efekt podfarbený farbou dimenzie */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px opacity-60 transition-all duration-700 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, transparent, ${themeColor}, transparent)`,
          boxShadow: `0 0 15px ${themeColor}`,
        }}
      />
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-32 blur-[120px] opacity-15 pointer-events-none transition-all duration-700"
        style={{ backgroundColor: themeColor }}
      />

      <div className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          
          {/* 🛑 LEFT SIDE: BRANDING */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-3">
              <div
                className="p-1.5 rounded-lg border transition-all duration-500 shadow-inner"
                style={{
                  backgroundColor: `${themeColor}15`,
                  borderColor: `${themeColor}40`,
                  color: themeColor,
                  boxShadow: `0 0 10px ${themeColor}20`,
                }}
              >
                <Shield size={16} />
              </div>
              <span className="font-black tracking-widest uppercase italic text-white text-sm transition-colors duration-500">
                Nexus{" "}
                <span style={{ color: themeColor }} className="not-italic transition-colors duration-500">
                  OS
                </span>
              </span>
            </div>
            <div className="text-[9px] text-white/40 uppercase tracking-[0.3em] mt-1 flex items-center gap-2">
              CyberTech Architect{" "}
              <span
                style={{ color: themeColor }}
                className="font-black text-[12px] transition-colors duration-500"
              >
                ×
              </span>{" "}
              AI Gemini
            </div>
          </div>

          {/* ⚡ CENTER: STATUS DASHBOARD (CELÝ VO FARBE DIMENZIE + CHRONOMETER & LOG) */}
          <div 
            className="flex flex-wrap items-center justify-center gap-3 md:gap-4 border px-5 py-2.5 rounded-2xl shadow-lg backdrop-blur-md transition-all duration-500"
            style={{
              borderColor: `${themeColor}35`,
              backgroundColor: `${themeColor}05`,
              boxShadow: `0 0 20px ${themeColor}10`,
            }}
          >
            {/* SECTOR */}
            <div className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full animate-pulse transition-all duration-500"
                style={{
                  backgroundColor: themeColor,
                  boxShadow: `0 0 10px ${themeColor}`,
                }}
              />
              <span className="text-[9px] font-black uppercase tracking-widest text-white/50 flex items-center gap-1.5">
                Sector:{" "}
                <span
                  style={{ color: themeColor }}
                  className="transition-colors duration-500 uppercase"
                >
                  {sector || activeTab}
                </span>
              </span>
            </div>

            <div className="hidden sm:block w-px h-4 bg-white/10" />

            {/* TIER (VYRIEŠENÁ CHYBNÁ HODNOTA) */}
            <div className="flex items-center gap-2">
              <Terminal size={12} style={{ color: themeColor }} className="opacity-70 transition-colors duration-500" />
              <span className="text-[9px] font-black uppercase tracking-widest text-white/50 flex items-center gap-1.5">
                Tier:{" "}
                <span style={{ color: themeColor }} className="font-extrabold transition-colors duration-500">
                  {displayTier}
                </span>
              </span>
            </div>

            <div className="hidden sm:block w-px h-4 bg-white/10" />

            {/* ⏱️ CORE UPTIME (ZABUDOVANÝ CHRONOMETER VO FARBE DIMENZIE) */}
            <div className="flex items-center gap-2 shrink-0 relative group">
              <div 
                className="p-1 rounded-lg border transition-all cursor-pointer"
                style={{
                  backgroundColor: "#080E14",
                  borderColor: `${themeColor}40`,
                  color: themeColor,
                }}
              >
                <CoreChronometer themeColor={themeColor} uptime={uptime} />
              </div>
            </div>



            <div className="hidden sm:block w-px h-4 bg-white/10" />

            {/* 📜 SYSTEM LOG BUTTON (ZABUDOVANÉ TLAČIDLO VO FARBE DIMENZIE) */}
            <button
              type="button"
              onClick={() => {
                if (typeof SoundFX?.click === "function") SoundFX.click();
                console.log("🚨 [SYSTEM LOG] Odosielam globálny event nexus_open_system_log");
                
                // 1. Ak existuje prop, zavoláme ho
                if (typeof onOpenSystemLog === "function") {
                  onOpenSystemLog();
                } else if (typeof onNavigate === "function") {
                  onNavigate("system-log");
                }
                
                // 2. V20 DEFENSIVE: Globálny odpal do celého okna pre App.jsx
                if (typeof window !== "undefined") {
                  window.dispatchEvent(new CustomEvent("nexus_open_system_log"));
                }
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all text-[9px] font-black uppercase tracking-widest hover:scale-[1.03]"
              style={{
                backgroundColor: `${themeColor}15`,
                borderColor: `${themeColor}50`,
                color: themeColor,
                boxShadow: `0 0 12px ${themeColor}15`,
              }}
            >
              <FileText size={12} style={{ color: themeColor }} /> System Log
            </button>
          </div>

          {/* 🔴 RIGHT SIDE: COPYRIGHT & TECH */}
          <div className="flex flex-col items-center md:items-end gap-2.5 text-[9px] text-white/30 uppercase tracking-widest">
            <div className="flex items-center gap-4 mb-0.5">
              <Cpu
                size={14}
                className="opacity-40 hover:opacity-100 transition-opacity"
                title="Processing Core"
              />
              <Database
                size={14}
                className="opacity-40 hover:opacity-100 transition-opacity"
                title="Data Matrix"
              />
              <BrainCircuit
                size={14}
                className="opacity-80 hover:opacity-100 transition-opacity"
                style={{ color: themeColor }}
                title="AI Integration"
              />
              <Zap
                size={14}
                className="opacity-40 hover:opacity-100 transition-opacity"
                title="Energy Output"
              />
            </div>

            {/* ⚖️ VOP & SÚKROMIE */}
            <div className="flex items-center gap-3 text-[8px] font-black tracking-widest text-white/40">
              <a
                href="/vop"
                onClick={(e) => {
                  if (typeof onNavigate === "function") {
                    e.preventDefault();
                    onNavigate("vop");
                  }
                }}
                className="hover:text-white transition-colors uppercase cursor-pointer"
              >
                VOP
              </a>
              <span className="w-1 h-1 rounded-full bg-white/20"></span>
              <a
                href="/privacy"
                onClick={(e) => {
                  if (typeof onNavigate === "function") {
                    e.preventDefault();
                    onNavigate("privacy");
                  }
                }}
                className="hover:text-white transition-colors uppercase cursor-pointer"
              >
                Súkromie
              </a>
            </div>

            <p>© {currentYear} NEXUS PROTOCOL. All Rights Reserved.</p>
            <p className="text-[7px] text-white/20 font-black tracking-[0.4em] uppercase">
              Co-Engineered by Sergeant [CORE]
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default GlobalFooter;