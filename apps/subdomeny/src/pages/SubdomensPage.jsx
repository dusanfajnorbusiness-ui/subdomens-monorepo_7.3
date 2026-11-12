/* eslint-disable no-undef */

// ============================================================================
// 👑 PROJECT NEXUS — OS GENESIS EDITION (SUBDOMAINS HOMEPAGE MASTER V20.95)
// Súbor: apps/subdomeny/src/pages/SubdomensPage.jsx
// Status: 100% GROUNDED // PROTOKOL V20 // ZERO-BALAST POLICY
// ============================================================================

import React, { useState, useEffect } from "react";
import {
  Terminal,
  Cpu,
  Layers,
  Radio,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";

import { SoundFX } from "@shared/utils/SoundEngine.js";
import {
  SUBDOMAINS_MATRIX,
  SUBDOMAINS_ARRAY,
} from "@subdomeny/data/SubdomainsMasterData.js";
import { SubdomainHeader } from "@subdomeny/components/SubdomainHeader.jsx";
import { SubdomainDropdown } from "@subdomeny/components/SubdomainDropdown.jsx";
import { SubdomainStandbyPage } from "@subdomeny/components/SubdomainStandbyPage.jsx";

export function SubdomensPage({
  initialSubId,
  subId: propSubId,
  activeSubId: propActiveSubId,
  themeColor: propThemeColor,
  activeColor: propActiveColor,
  currentSub: propCurrentSub,
  onSelectSub,
  onThemeChange,
  onHomeClick,
  ...rest
}) {
  // 🛡️ V20 DEFENZÍVNA SANITIZÁCIA: Z akéhokoľvek vstupu (/sub03,03, sub03, 3) spraví "SUB 03"
  const parseSafeSubId = (raw) => {
    const str = Array.isArray(raw) ? raw.join(" ") : String(raw || "");
    const match = str.match(/(\d{1,2})/);
    return match ? `SUB ${String(match[1]).padStart(2, "0")}` : "SUB 00";
  };

  // Vstupné ID z props alebo fallback na SUB 09
  const incomingId =
    initialSubId ||
    propSubId ||
    propActiveSubId ||
    propCurrentSub?.id ||
    "SUB 09";
  const [activeSubId, setActiveSubId] = useState(() =>
    parseSafeSubId(incomingId),
  );

  // Bezpečná synchronizácia pri zmene propu z App.jsx
  useEffect(() => {
    if (incomingId) {
      setActiveSubId(parseSafeSubId(incomingId));
    }
  }, [incomingId]);

  const handleSelectSub = (newId) => {
    if (SoundFX?.click) SoundFX.click();
    const cleanId = parseSafeSubId(newId);
    setActiveSubId(cleanId);
    if (typeof onSelectSub === "function") {
      onSelectSub(cleanId);
    }
  };

  // Defenzívne vytiahnutie dát aktívnej subdomény z matrice SSOT
  const subList = Array.isArray(SUBDOMAINS_ARRAY)
    ? SUBDOMAINS_ARRAY
    : Object.values(SUBDOMAINS_MATRIX || {});

  const currentSub =
    (SUBDOMAINS_MATRIX && SUBDOMAINS_MATRIX[activeSubId]) ||
    subList.find(
      (item) =>
        String(item?.id || "").toUpperCase() ===
        String(activeSubId).toUpperCase(),
    ) ||
    propCurrentSub ||
    subList[0] ||
    {};

  // Farba: ak prišla z App.jsx (napr. červená #FF003C), použijeme ju, inak farba z matrice
  const themeColor = String(
    propThemeColor || propActiveColor || currentSub?.color || "#FF003C",
  );
  const activeColor = themeColor;

  // Bezpečná propagácia zmeny farby do rodičovského App.jsx
  useEffect(() => {
    if (typeof onThemeChange === "function" && themeColor) {
      onThemeChange(themeColor);
    }
  }, [themeColor, onThemeChange]);

  return (
    <div className="min-h-screen bg-[#030507] text-[#b3d4d6] font-mono selection:bg-white selection:text-black">
      {/* RIADOK 87: Hlavičke musíme tie props odovzdať! */}
      <SubdomainHeader
        themeColor={themeColor}
        activeColor={themeColor}
        subId={activeSubId}
        currentSub={currentSub}
      />

      <div className="max-w-[1600px] mx-auto p-4 md:p-8 pb-32">
        {/* 🧭 2. HERO RIADIACI UZOL OS GENESIS */}
        <header className="my-6 md:my-10 space-y-6 text-center md:text-left border-b border-white/10 pb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-4 max-w-4xl">
              {/* STATUS BADGE */}
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest border transition-all duration-300"
                style={{
                  borderColor: `${themeColor}40`,
                  backgroundColor: `${themeColor}10`,
                  color: themeColor,
                }}
              >
                <Terminal size={14} className="animate-pulse" />
                OS GENESIS // 16 CHAMELEON SUBDOMÉNOVÝCH UZLOV
              </div>

              {/* HLAVNÝ TITLE */}
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-tight">
                JEDNOČLENNÁ{" "}
                <span
                  className="transition-colors duration-500"
                  style={{
                    color: themeColor,
                    filter: `drop-shadow(0 0 20px ${themeColor}60)`,
                  }}
                >
                  IT ARMÁDA
                </span>{" "}
                & MATRICA
              </h1>

              <p className="text-xs md:text-sm text-zinc-400 font-sans leading-relaxed max-w-3xl">
                Riadiaci uzol subdomén OS Genesis. 16 sémantických dimenzií
                (ID00 – ID15), dekonštrukcia Ega, kybernetická terapia a
                digitálny ekosystém V20 s nulovým balastom.
              </p>
            </div>

            {/* PRAVÝ OVLÁDACÍ PANEL: DROPDOWN & STATUS */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
              <SubdomainDropdown
                currentSubId={activeSubId}
                activeColor={themeColor}
                onSelectSub={(newSubId) => {
                  setActiveSubId(newSubId);
                }}
              />

              <div className="px-3 py-2 rounded-xl border border-zinc-800 bg-black/80 flex items-center gap-2 text-xs">
                <span
                  className="w-2 h-2 rounded-full animate-ping"
                  style={{ backgroundColor: themeColor }}
                />
                <span className="text-zinc-400 text-[10px] tracking-wider uppercase font-bold">
                  NODE: {currentSub.id}
                </span>
              </div>
            </div>
          </div>

          {/* ⚡ RÝCHLA MRIEŽKA 16 UZLOV (QUICK SWITCHER DOCK) */}
          {/* zmazane duplicida máme dropdown tlačidlo  */}
        </header>

        {/* 📦 3. CENTRÁLNY OBSAH: CHAMELEON STANDBY PAGE DANÉHO UZLA */}
        <main className="w-full">
          <SubdomainStandbyPage
            subId={activeSubId}
            onThemeChange={onThemeChange}
          />
        </main>
      </div>
    </div>
  );
}

export default SubdomensPage;
