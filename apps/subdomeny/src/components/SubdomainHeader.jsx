import { SubdomainDropdown } from "@subdomeny/components/SubdomainDropdown.jsx";
// ============================================================================
// ⚠️ OSTRÉ LOKÁLNE IMPORTY (ODKOMENTUJ VO SVOJOM VS CODE)
// ============================================================================
import { SoundFX } from "@shared/utils/SoundEngine.js";
import { ArrowUpRight, Cpu, ExternalLink, Shield, Terminal } from "lucide-react";
/* eslint-disable no-undef */

// ============================================================================
// 👑 PROJECT NEXUS — OS GENESIS EDITION (SUBDOMAIN HEADER COMPONENT V20.95)
// Súbor: apps/subdomeny/src/components/SubdomainHeader.jsx
// Status: 100% GROUNDED // DYNAMIC CHAMELEON HEADER // 16 SUB NODES
// Author: Dušan Fajnor @nexus-core2Mb (CyberTech Architect)
// ============================================================================

import React from "react";

export function SubdomainHeader({
  themeColor = "#00f3ff",
  activeColor: propActiveColor,
  color,
  subId = null,
  currentSub = null,
  dimensionName = "NEXUS STANDBY NODE",
  subTitle = "SYSTEM STANDBY AWAITING",
}) {
  // Defenzívne ošetrenie farby z akéhokoľvek propu alebo priamo z currentSub
  const activeColor = String(
    propActiveColor ||
    themeColor ||
    color ||
    currentSub?.color ||
    currentSub?.themeColor ||
    "#00f3ff"
  );

  const safeSubId = subId || currentSub?.id ? String(subId || currentSub?.id) : null;
  const safeName = String(
    dimensionName !== "NEXUS STANDBY NODE"
      ? dimensionName
      : (currentSub?.name || currentSub?.title || dimensionName)
  );
  const safeSubTitle = String(
    subTitle !== "SYSTEM STANDBY AWAITING"
      ? subTitle
      : (currentSub?.subTitle || subTitle)
  );

  return (
    <header
      className="w-full bg-[#03070A]/90 border-b backdrop-blur-2xl sticky top-0 z-40 font-mono text-white py-3 px-4 md:px-8 transition-colors duration-500"
      style={{ borderColor: `${activeColor}40` }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* LOGO & BRAND TITLE WITH DYNAMIC ACCENT (ĽAVÁ STRANA) */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-start">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center border transition-all duration-500 shrink-0"
            style={{
              backgroundColor: `${activeColor}15`,
              borderColor: activeColor,
              boxShadow: `0 0 15px ${activeColor}40`,
            }}
          >
            <Cpu className="w-5 h-5" style={{ color: activeColor }} />
          </div>
          <div>
            <h1 className="text-sm md:text-base font-extrabold tracking-widest text-white uppercase flex items-center gap-2">
              PROJECT NEXUS{" "}
              {safeSubId && (
                <span
                  className="text-[10px] px-2 py-0.5 rounded-full border transition-colors"
                  style={{
                    color: activeColor,
                    backgroundColor: `${activeColor}15`,
                    borderColor: `${activeColor}40`,
                  }}
                >
                  {safeSubId}
                </span>
              )}
            </h1>
            <p
              className="text-[10px] md:text-xs font-semibold tracking-wider uppercase transition-colors"
              style={{ color: activeColor }}
            >
              {safeName} <span className="text-zinc-500">|</span>{" "}
              <span className="text-zinc-400">{safeSubTitle}</span>
            </p>
            <p className="text-[10px] text-gray-400 hidden sm:block">
              OS GENESIS // CHAMELEON SUBDOMAIN ARCHITECTURE V20.95
            </p>
          </div>
        </div>

        {/* KO-FI / B2B LINK (PRAVÁ STRANA HLAVIČKY) */}
        <div className="flex items-center justify-end w-full md:w-auto">
          <a
            href="https://ko-fi.com/cybertech_architect/commissions"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => SoundFX?.playSuccess?.()}
            onMouseEnter={() => SoundFX?.playHover?.()}
            className="px-4 py-2 text-xs font-bold text-black rounded-xl transition-all flex items-center gap-1.5 uppercase tracking-wider cursor-pointer shadow-lg hover:scale-105 active:scale-95 shrink-0"
            style={{
              backgroundColor: activeColor,
              boxShadow: `0 0 15px ${activeColor}50`,
            }}
          >
            <span>B2B SHOP</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </header>
  );
};

export default SubdomainHeader;