/* eslint-disable no-undef */

// ============================================================================
// 👑 PROJECT NEXUS — OS GENESIS EDITION (GLOBAL MASTER LAYOUT V20.95)
// Súbor: shared/components/GlobalNexusMasterLayout.jsx
// Status: 100% GROUNDED // MASTER WRAPPER FOR ALL SUBDOMAINS & APPS
// Standard: V20 TRINITY SPECIFICATION
// Author: Dušan Fajnor @nexus-core2Mb (CyberTech Architect)
// ============================================================================

import React, { useState, useEffect } from "react";
import {
  Shield,
  Grid,
  Terminal,
  Users,
  ShoppingCart,
  Settings,
  ShieldAlert,
  Mail,
  LogOut,
  Calendar,
  Globe,
} from "lucide-react";
import { SoundFX } from "@shared/utils/SoundEngine";
import { getTierColor } from "@shared/data/nexusConfig";
import { GlobalWallet } from "@shop/components/GlobalWallet";
import { GlobalProfil } from "./GlobalProfil";
import { GlobalMessages } from "./GlobalMessages";
import { GlobalHamburgerMenu } from "./GlobalHamburgerMenu";
import { GlobalFooter } from "./GlobalFooter";
// import { GlobalKeyboard } from "./GlobalKeyboard";

// DETEKCIA SUBDOMÉN PRE AKTUÁLNY CONTAINER
const getCurrentHostname = () =>
  typeof window !== "undefined" ? window.location.hostname : "";

export const GlobalNexusMasterLayout = ({
  children,
  activeTab = "home",
  userState = {},
  themeColor = "#00F3FF",
}) => {
  const [showProfil, setShowProfil] = useState(false);
  const [showInbox, setShowInbox] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const hostname = getCurrentHostname();
  const isAgencySubdomain =
    hostname.startsWith("agency.") ||
    window.location.pathname.startsWith("/agency");
  const isAdminSubdomain =
    hostname.startsWith("admin.") ||
    window.location.pathname.startsWith("/admin");

  const isITArmy =
    userState?.tier === "MASTER" ||
    userState?.tier === "ARCHITECT" ||
    userState?.role === "IT_ARMY";
  const isArchitect =
    userState?.tier === "ARCHITECT" ||
    userState?.email === "dusan.fajnor.business@gmail.com";

  // TELEPORTY MEDZI SUBDOMÉNAMI (Localhost vs Production Matrix)
  const handleTeleport = (domainKey, path = "") => {
    SoundFX?.playClick?.();

    const isLocal =
      typeof window !== "undefined" && window.location.hostname === "localhost";

    const localPorts = {
      home: "http://localhost:3000",
      agency: "http://localhost:3001",
      shop: "http://localhost:3002",
      operators: "http://localhost:3003",
      settings: "http://localhost:3004",
      admin: "http://localhost:3005",
      blog: "http://localhost:3006",
      uplink: "http://localhost:3007",
    };

    const prodDomains = {
      home: "https://projekt-nexus.sk",
      agency: "https://agency.projekt-nexus.sk",
      shop: "https://shop.projekt-nexus.sk",
      operators: "https://operators.projekt-nexus.sk",
      settings: "https://settings.projekt-nexus.sk",
      admin: "https://admin.projekt-nexus.sk",
      blog: "https://blog.projekt-nexus.sk",
      uplink: "https://uplink.projekt-nexus.sk",
    };

    const baseUrlMap = isLocal ? localPorts : prodDomains;
    const targetUrl =
      baseUrlMap[domainKey] ||
      (isLocal ? "http://localhost:3000" : "https://projekt-nexus.sk");

    window.location.href = `${targetUrl}${path}`;
  };

  return (
    <div className="min-h-screen bg-[#03080a] text-[#b3d4d6] font-mono flex flex-col relative text-left">
      {/* <GlobalKeyboard /> */}

      {/* 🧭 CYBER-DOCK TOP NAVIGAČNÁ LIŠTA */}
      <nav
        style={{ zIndex: 1000 }}
        className="fixed top-0 left-0 w-full border-b border-white/10 bg-[#03080a]/95 backdrop-blur-xl px-3 py-2 flex justify-between items-center shadow-2xl font-mono"
      >
        <div className="flex items-center gap-2 flex-1 min-w-0 pr-2">
          {/* LOGO MATERSKEJ LODE */}
          <div
            onClick={() => handleTeleport("home")}
            className="flex items-center gap-2 shrink-0 cursor-pointer group px-1"
            title="Projekt Nexus OS"
          >
            <div className="p-1.5 rounded-lg transition-all duration-500 bg-[#00F3FF] shadow-[0_0_15px_rgba(0,243,255,0.4)]">
              <Shield size={15} className="text-black" />
            </div>
            <span className="text-white font-black tracking-tighter uppercase italic text-xs hidden 2xl:block">
              Nexus <span style={{ color: themeColor }}>OS</span>
            </span>
          </div>

          {/* KROS-SUBDOMÉNOVÉ TELEPORT TLAČIDLÁ */}
          <div className="flex items-center gap-1 overflow-x-auto flex-1 min-w-0 hide-scroll py-0.5">
            <button
              onClick={() => handleTeleport("home")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent cursor-pointer"
            >
              <Globe size={14} /> <span className="hidden xl:inline">Web</span>
            </button>

            <button
              onClick={() => handleTeleport("agency")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase transition-all cursor-pointer ${
                isAgencySubdomain
                  ? "text-white bg-[#00F3FF]/20 border border-[#00F3FF]/60 shadow-[0_0_12px_rgba(0,243,255,0.3)]"
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Grid
                size={14}
                className={isAgencySubdomain ? "text-[#00F3FF]" : ""}
              />{" "}
              <span className="hidden xl:inline">Agency</span>
            </button>

            <button
              onClick={() => handleTeleport("blog")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase text-zinc-400 hover:text-white hover:bg-white/5 cursor-pointer"
            >
              <Terminal size={14} />{" "}
              <span className="hidden xl:inline">Blog</span>
            </button>

            <button
              onClick={() => handleTeleport("operators")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase text-zinc-400 hover:text-white hover:bg-white/5 cursor-pointer"
            >
              <Users size={14} />{" "}
              <span className="hidden xl:inline">Operators</span>
            </button>

            <button
              onClick={() => handleTeleport("shop")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase text-zinc-400 hover:text-white hover:bg-white/5 cursor-pointer"
            >
              <ShoppingCart size={14} />{" "}
              <span className="hidden xl:inline">Shop</span>
            </button>

            {/* 📅 KALENDÁR / TASK-MANAGER (ZOBRAZENÝ LEN NA AGENCY PRE IT ARMÁDU) */}
            {isAgencySubdomain && isITArmy && (
              <button
                onClick={() => SoundFX?.playClick?.()}
                title="Organizer & Task-Manager (IT Armáda Only)"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase text-[#39FF14] bg-[#39FF14]/10 border border-[#39FF14]/30 hover:bg-[#39FF14]/20 transition-all cursor-pointer"
              >
                <Calendar size={14} />{" "}
                <span className="hidden xl:inline">Organizer</span>
              </button>
            )}

            <button
              onClick={() => handleTeleport("settings")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase text-zinc-400 hover:text-white hover:bg-white/5 cursor-pointer"
            >
              <Settings size={14} />{" "}
              <span className="hidden xl:inline">Settings</span>
            </button>

            {/* 👑 ADMIN PANEL (LEN PRE ARCHITEKTA) */}
            {isArchitect && (
              <button
                onClick={() => handleTeleport("admin")}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase text-[#FF003C] bg-[#FF003C]/10 border border-[#FF003C]/30 hover:bg-[#FF003C]/20 transition-all cursor-pointer"
              >
                <ShieldAlert size={14} />{" "}
                <span className="hidden xl:inline">ADMIN</span>
              </button>
            )}
          </div>
        </div>

        {/* ⚓ PRAVÁ ČASŤ: PEŇAŽENKA + INBOX + PROFIL */}
        <div className="flex items-center gap-2 shrink-0">
          <GlobalWallet
            balance={userState?.credits || 0}
            userEmail={userState?.email || ""}
            userTier={userState?.tier || "FREE"}
            getTierColor={getTierColor}
          />

          <button
            onClick={() => setShowInbox(true)}
            className="relative p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500 hover:text-black transition-colors cursor-pointer"
            title="Správy a notifikácie"
          >
            <Mail size={15} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] font-black w-3.5 h-3.5 flex items-center justify-center rounded-full shadow-[0_0_8px_red]">
                {unreadCount}
              </span>
            )}
          </button>
          {/* AVATAR / PROFIL TRIGGER */}
          <div
            onClick={() => setShowProfil(true)}
            className="w-8 h-8 rounded-full border-2 cursor-pointer overflow-hidden flex items-center justify-center bg-black transition-all hover:scale-105"
            style={{ borderColor: getTierColor(userState?.tier || "FREE") }}
            title="Otvoriť profil a nastavenia"
          >
            {userState?.avatar ? (
              <img
                src={userState.avatar}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <Users size={14} className="text-zinc-400" />
            )}
          </div>
        </div>
      </nav>

      {/* HLAVNÝ OBSAH DANNEJ SUBDOMÉNY */}
      <main className="pt-20 flex-1 w-full">{children}</main>

      {/* GLOBÁLNE DOCKY, MODÁLY A FOOTER */}
      <GlobalHamburgerMenu activeTab={activeTab} themeColor={themeColor} />

      <GlobalProfil
        isOpen={showProfil}
        onClose={() => setShowProfil(false)}
        profileData={userState}
      />

      <GlobalMessages
        isOpen={showInbox}
        onClose={() => setShowInbox(false)}
        userState={userState}
      />

      <GlobalFooter themeColor={themeColor} />
    </div>
  );
};

export default GlobalNexusMasterLayout;
