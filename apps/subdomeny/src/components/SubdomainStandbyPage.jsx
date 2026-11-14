/* eslint-disable no-undef */

// ============================================================================
// 👑 PROJECT NEXUS — OS GENESIS EDITION (SYS03 SUBDOMAIN STANDBY PAGE V20.95)
// Súbor: apps/subdomeny/src/pages/SubdomainStandbyPage.jsx
// Status: 100% GROUNDED // DYNAMIC CHAMELEON STANDBY ENGINE // 16 SUB NODES
// Author: Dušan Fajnor @nexus-core2Mb (CyberTech Architect)
// ============================================================================

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Globe, Key, Lock, Radio, ShieldAlert, Terminal, Zap } from "lucide-react";

import { SoundFX } from "@shared/utils/SoundEngine.js";
import { GlobalMediaPlayer as GlobalMediaPlayerBRAND } from "@shared/components/GlobalMediaPlayerBRAND.jsx";
// (alebo ak tam komponent voláš ako <GlobalMediaPlayer />, daj:)
// import { GlobalMediaPlayer } from "@shared/components/GlobalMediaPlayerBRAND.jsx";

// Ostré SSOT dátové a komponentové importy
import { SUBDOMAINS_MATRIX, SUBDOMAINS_ARRAY as SUBDOMAINS_LIST, } from "@subdomeny/data/SubdomainsMasterData.js";

import { SubdomainHeader } from "@subdomeny/components/SubdomainHeader.jsx";

export function SubdomainStandbyPage({ subId: propSubId = "SUB 00", themeColor: propThemeColor, onThemeChange }) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location?.search || "");
  const querySubId = searchParams.get("id") || searchParams.get("subId");

  // 1. Z akéhokoľvek vstupu (URL, props, query) vytiahneme čisté dvojmiestne číslo
  const rawInput = querySubId || propSubId || "00";
  const numMatch = String(rawInput).match(/\d{1,2}/);
  const cleanNum = numMatch ? String(numMatch).padStart(2, "0") : "00";
  const subKey = `SUB ${cleanNum}`;

  // 2. Priame vyhľadanie v SUBDOMAINS_MATRIX (rýchlejšie a presnejšie ako find)
  const currentSubData =
    (SUBDOMAINS_MATRIX && SUBDOMAINS_MATRIX[subKey]) ||
    (Array.isArray(SUBDOMAINS_ARRAY) && SUBDOMAINS_ARRAY.find((item) => String(item?.id).includes(cleanNum))) ||
    {};

  // 3. Kanonická farba uzla: SUB 09 má natvrdo v matici červenú #FF003C
  const activeColor = String(
    currentSubData?.color || propThemeColor || (cleanNum === "09" ? "#FF003C" : "#00F3FF")
  );
  const subName = String(currentSubData?.name || (cleanNum === "09" ? "SERGEANT-CORE" : "MENTOR-HUB"));
  const subTier = String(currentSubData?.tier || "FREE").toUpperCase();
  const subDomain = String(currentSubData?.domain || `${cleanNum === "09" ? "player" : "mentor"}.projekt-nexus.sk`);
  const subId = subKey;

  // Automatická synchronizácia zbernice farieb pri zmene subdomény
  useEffect(() => {
    if (typeof onThemeChange === "function") {
      onThemeChange(activeColor);
    }
  }, [activeColor, subId, onThemeChange]);

  const handleLicenceSubmit = (e) => {
    e.preventDefault();
    if (!licenceKey.trim()) return;

    try {
      SoundFX?.playHover?.();
    } catch (err) {}

    // Simulácia overenia kľúča
    setAccessDenied(true);
    setTimeout(() => setAccessDenied(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#020406] text-white font-mono selection:bg-white selection:text-black relative overflow-x-hidden flex flex-col justify-between">
      {/* CYBER GRID BACKGROUND WITH DYNAMIC GLOW */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#1f293715_1px,transparent_1px),linear-gradient(to_bottom,#1f293715_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0" />
      <div
        className="fixed -top-40 -left-40 w-96 h-96 rounded-full blur-[140px] pointer-events-none opacity-25 transition-all duration-700"
        style={{ backgroundColor: activeColor }}
      />

      {/* HLAVNÝ STANDBY OBSAH */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 py-8 md:py-14 w-full my-auto space-y-8 text-center">
        {/* STATUS BADGES */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border text-xs font-black uppercase tracking-widest bg-black/60 shadow-lg backdrop-blur-md"
            style={{ borderColor: activeColor, color: activeColor }}
          >
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>STATUS: SYSTEM STANDBY AWAITING</span>
          </div>

          <span className="px-3 py-1 rounded-full bg-white/10 text-zinc-300 text-xs font-extrabold border border-white/20 uppercase">
            TIER: {subTier}
          </span>
        </div>

        {/* HERO TITLE & DIMENSION HEADER */}
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.15)]">
            {subId} — <span style={{ color: activeColor }}>{subName}</span>
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 font-sans max-w-2xl mx-auto leading-relaxed">
            Uzol subdomény{" "}
            <span className="text-white font-mono font-bold">
              https://{subDomain}
            </span>{" "}
            je v režime záložného standby stanovišťa. Čaká sa na inicializáciu
            dekódovacieho protokolu V20 a overenie operátora.
          </p>
        </div>

        {/* 🎬 MASTER MEDIA PLAYER INTEGRÁCIA S CHAMELEON FARBOU */}
        <div className="w-full max-w-4xl mx-auto my-6 animate-in fade-in duration-700">
          {typeof GlobalMediaPlayerBRAND === "function" ? (
            <GlobalMediaPlayerBRAND
              mediaId="MANIFESTO_GENESIS"
              dimColor={activeColor}
            />
          ) : (
            <div 
              className="p-6 border bg-black/40 rounded-xl text-xs"
              style={{ borderColor: `${activeColor}40`, color: activeColor }}
            >
              [ ⚡ SYSTEM MEDIA STREAM STANDBY // {subName} ]
            </div>
          )}
        </div>

        {/* BRUTALIST STATUS TELEMETRIA */}
        <div className="pt-4 flex items-center justify-center gap-4 text-[10px] text-zinc-500 uppercase tracking-widest">
          <span>PORT: 51800</span>
          <span>•</span>
          <span style={{ color: activeColor }}>CHAMELEON: ACTIVE</span>
          <span>•</span>
          <span>PROTOCOL: V20.95</span>
        </div>
      </main>
    </div>
  );
}

export default SubdomainStandbyPage;