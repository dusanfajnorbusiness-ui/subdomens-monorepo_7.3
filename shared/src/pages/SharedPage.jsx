/* eslint-disable no-undef */

// ============================================================================
// 👑 PROJECT NEXUS — OS GENESIS EDITION (SYS03 MASTER DATASET V20.95)
// Súbor: @shared/pages/SharedPage.jsx (alebo shared/src/pages/SharedPage.jsx)
// Status: 100% GROUNDED // DEFAULT STANDBY SHARED PAGE V20
// CORE_VERSION: SHARED-PAGE-V20.95
// ============================================================================

import React, { useState, useEffect } from "react";
import { Terminal, Activity, Cpu, Globe, ShieldAlert, Zap } from "lucide-react";

// ============================================================================
// ⚠️ DEFENZÍVNY AUDITION & FX FALLBACK
// ============================================================================
const triggerFx = () => {
  try {
    if (window.SoundFX && typeof window.SoundFX.play === "function") {
      window.SoundFX.play("click");
    }
  } catch (e) {
    // Defenzívny fallback bez chyby v konzole
  }
};

export const SharedPage = ({ nodeTitle = "NEXUS SHARED NODE", subId = "STANDBY" }) => {
  const [hostname, setHostname] = useState("localhost");
  const [uptime, setUptime] = useState(0);

  useEffect(() => {
    setHostname(String(window.location.hostname || "localhost"));
    const timer = setInterval(() => {
      setUptime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#03080a] text-[#b3d4d6] font-mono flex flex-col justify-between p-4 md:p-8 border-4 border-[#0a252c] relative overflow-hidden select-none">
      {/* BACKGROUND MATRIX GRID */}
      <div className="absolute inset-0 bg-[radial-gradient(#00f0ff_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      {/* HEADER TELEMETRY */}
      <header className="flex flex-wrap items-center justify-between border-b border-[#00f0ff]/30 pb-4 relative z-10 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#00f0ff]/10 border border-[#00f0ff] rounded">
            <Globe className="w-6 h-6 text-[#00f0ff] animate-pulse" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-widest text-[#39FF14] uppercase">
              {String(nodeTitle || "NEXUS OS CORE")}
            </h1>
            <p className="text-xs text-[#00f0ff]/70 tracking-tight">
              DOMÉNA: <span className="text-white font-bold">{hostname}</span> | STATUS: <span className="text-[#39FF14]">STANDBY ONLINE</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 border border-[#39FF14]/40 px-3 py-1 bg-[#39FF14]/5 text-xs text-[#39FF14]">
          <Activity className="w-4 h-4 animate-spin" />
          <span>LIVE UPTIME: {uptime}s</span>
        </div>
      </header>

      {/* MAIN CYBER CARD */}
      <main className="my-auto py-12 flex flex-col items-center justify-center text-center relative z-10">
        <div className="max-w-2xl w-full bg-[#051117]/80 border-2 border-[#00f0ff]/40 p-6 md:p-10 shadow-[0_0_30px_rgba(0,240,255,0.1)] rounded-lg backdrop-blur">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Cpu className="w-16 h-16 text-[#39FF14] animate-bounce" />
              <Zap className="w-6 h-6 text-[#00f0ff] absolute -top-1 -right-1 animate-pulse" />
            </div>
          </div>

          <div className="inline-block px-3 py-1 bg-[#00f0ff]/20 border border-[#00f0ff] text-[#00f0ff] text-xs font-bold tracking-widest uppercase mb-4">
            [ MATRIX NODE // {subId} ]
          </div>

          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4 tracking-wider uppercase">
            SYSTEM STANDBY & AWAITING MODULE
          </h2>

          <p className="text-sm text-[#b3d4d6]/80 leading-relaxed mb-6">
            Tento uzol je plne stabilizovaný v sieti <span className="text-[#39FF14]">OS GENESIS</span>.
            Vercel Edge Routing a CNAME SSL certifikáty sú aktívne. Pripravené pre exekúciu modulu.
          </p>

          {/* TELEMETRY MATRIX DISPLAY */}
          <div className="grid grid-cols-2 gap-3 text-left bg-[#020608] border border-[#00f0ff]/20 p-4 rounded text-xs font-mono mb-6">
            <div>
              <span className="text-gray-500 block">SUBDOMÉNA:</span>
              <span className="text-[#00f0ff] font-bold truncate block">{hostname}</span>
            </div>
            <div>
              <span className="text-gray-500 block">ROUTING ENGINE:</span>
              <span className="text-[#39FF14] font-bold block">V20.95 EDGE REWRITE</span>
            </div>
            <div>
              <span className="text-gray-500 block">SECURITY SHIELD:</span>
              <span className="text-[#39FF14] font-bold block">ACTIVE (SSL OK)</span>
            </div>
            <div>
              <span className="text-gray-500 block">GHOST MODE:</span>
              <span className="text-[#00f0ff] font-bold block">STANDBY (&lt; 10ms)</span>
            </div>
          </div>

          <button
            onClick={triggerFx}
            className="w-full py-3 bg-[#39FF14]/10 hover:bg-[#39FF14]/20 border border-[#39FF14] text-[#39FF14] font-bold uppercase tracking-widest transition-all duration-200 flex items-center justify-center gap-2 group"
          >
            <Terminal className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            <span>DIAGNOSTIKA MATRIXU OK</span>
          </button>
        </div>
      </main>

      {/* FOOTER BAR */}
      <footer className="border-t border-[#00f0ff]/20 pt-4 flex flex-wrap justify-between items-center text-xs text-gray-500 relative z-10 gap-2">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-[#39FF14]" />
          <span>PROJECT NEXUS OS © 2026 GENESIS EDITION</span>
        </div>
        <div>
          <span className="text-[#00f0ff]/60">V20.95 SSOT STANDBY LAYOUT</span>
        </div>
      </footer>
    </div>
  );
};

export default SharedPage;