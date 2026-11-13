/* eslint-disable no-undef */

// ============================================================================
// 👑 PROJECT NEXUS — OS GENESIS EDITION (SUBDOMAINS APPS MASTER V20.95)
// Súbor: apps/subdomeny/src/App.jsx
// Status: 100% GROUNDED // ZERO MAIN-WEB DEPENDENCIES // PROTOKOL V20
// CORE_VERSION: SUBDOMAINS-CORE-V20.95
// ============================================================================

import React, { useState, useEffect } from "react";
import {
  Shield,
  Grid,
  Terminal,
  Users,
  Settings,
  Mail,
  LogOut,
  User,
  Loader2,
} from "lucide-react";

// ============================================================================
// ⚠️ OSTRÉ LOKÁLNE IMPORTY (SUBDOMÉNY & ZÁKLADNÝ SHARED)
// ============================================================================
import {
  SUBDOMAINS_MATRIX,
  SUBDOMAINS_ARRAY,
} from "@subdomeny/data/SubdomainsMasterData.js";
import SubdomensPage from "@subdomeny/pages/SubdomensPage.jsx";
import { GlobalComponents } from "@shared/components/GlobalComponents.jsx";
import { GlobalHamburgerMenu } from "@shared/components/GlobalHamburgerMenu.jsx";
import GlobalFooter from "@shared/components/GlobalFooter.jsx";
import { SoundFX } from "@shared/utils/SoundEngine.js";
import { SystemLogModal } from "@shared/components/SystemLogModal.jsx";
import { GlobalNexusDropdown } from "@shared/components/GlobalNexusDropdown.jsx";
import { NexusThemePropsProvider } from "@shared/components/NexusThemePropsContext.jsx";
export const CORE_VERSION = "SUBDOMAINS-APP V20.95_STABLE";
import PrivacyPage from "@shared/pages/PrivacyPage.jsx";
import VopPage from "@shared/pages/VopPage.jsx";
import { useLocation, useNavigate, Routes, Route } from "react-router-dom";

// 🛡️ DETEKTOR VÝCHODZIEHO ID Z HOSTNAME / PORTU
const getInitialSubId = () => {
  if (typeof window === "undefined" || !window.location) return "SUB 00";
  const host = String(window.location.hostname || "").toLowerCase();
  const port = String(window.location.port || "");

  if (port === "51800" || host.startsWith("mentor.")) return "SUB 00";
  if (port === "51801" || host.includes("personal")) return "SUB 01";
  if (port === "51802" || host.includes("work")) return "SUB 02";
  if (port === "51803" || host.includes("finance")) return "SUB 03";
  if (port === "51804" || host.includes("business")) return "SUB 04";
  if (port === "51805" || host.includes("investments")) return "SUB 05";
  if (port === "51806" || host.includes("study")) return "SUB 06";
  if (port === "51807" || host.includes("professional")) return "SUB 07";
  if (port === "51808" || host.includes("reader")) return "SUB 08";
  if (port === "51809" || host.includes("player")) return "SUB 09";
  if (port === "51810" || host.includes("home")) return "SUB 10";
  if (port === "51811" || host.includes("recovery")) return "SUB 11";
  if (port === "51812" || host.includes("codex")) return "SUB 12";
  if (port === "51813" || host.includes("habits")) return "SUB 13";
  if (port === "51814" || host.includes("blog")) return "SUB 14";
  if (port === "51815" || host.includes("death")) return "SUB 15";

  return "SUB 00";
};

export const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // 🧭 Kontrola, či sme na priamej subdoméne mentora
  const currentHost =
    typeof window !== "undefined"
      ? String(window.location.hostname || "").toLowerCase()
      : "";

  // 🗺️ MASTER REGISTER SUBDOMÉNOVÝCH PREFIXOV (SUB 00 AŽ SUB 15)
  const SUBDOMAIN_HOST_MAP = {
    "mentor.": "SUB 00",
    "personal.": "SUB 01",
    "work.": "SUB 02",
    "finance.": "SUB 03",
    "business.": "SUB 04",
    "investments.": "SUB 05",
    "assets.": "SUB 05",
    "study.": "SUB 06",
    "maps.": "SUB 06",
    "professional.": "SUB 07",
    "skills.": "SUB 07",
    "reader.": "SUB 08",
    "player.": "SUB 09",
    "music.": "SUB 09",
    "home.": "SUB 10",
    "recovery.": "SUB 11",
    "codex.": "SUB 12",
    "habits.": "SUB 13",
    "blog.": "SUB 14",
    "death.": "SUB 15",
  };

  // Zistíme, či bežíme na niektorej z autonómnych subdomén
  const matchedSubEntry = Object.entries(SUBDOMAIN_HOST_MAP).find(([prefix]) =>
    currentHost.startsWith(prefix),
  );
  const detectedSubId = matchedSubEntry ? matchedSubEntry.at(1) : null;
  const isDirectAutonomousSub = Boolean(detectedSubId);
  const isDirectMentor = currentHost.startsWith("mentor.");

  const HUB_URL = String(
    import.meta.env.VITE_APP_URL || "https://subdomens.projekt-nexus.sk",
  );

  // 🧭 1. DETEKCIA POČIATOČNÉHO STAVU Z URL
  const getInitialRouteState = () => {
    if (typeof window === "undefined") {
      return { id: "SUB 00", isHome: !isDirectAutonomousSub };
    }
    const path = String(window.location.pathname || "")
      .toLowerCase()
      .trim();

    // Ak sme na akejkoľvek samostatnej subdoméne (mentor, personal, work...), isHome je VŽDY false
    if (isDirectAutonomousSub && detectedSubId) {
      return { id: detectedSubId, isHome: false };
    }

    // Podpora koreňa aj aliasu /home pre centrálu subdomén
    if (path === "/" || path === "" || path === "/home") {
      return { id: "SUB 00", isHome: true };
    }

    const match = path.match(/\/sub(\d{1,2})/);
    if (match && match.at(1)) {
      const num = String(match.at(1)).padStart(2, "0");
      return { id: `SUB ${num}`, isHome: false };
    }

    return { id: "SUB 00", isHome: true };
  };

  const [routeState, setRouteState] = useState(getInitialRouteState);
  const activeSubId = routeState.id;
  const isDefaultHome = routeState.isHome;

  // 🧭 1. JEDINÝ, KANONICKÝ EFFECT PRE SYNCHRONIZÁCIU URL S OBSAHOM SUBDOMÉNY
  useEffect(() => {
    const rawPath = String(location.pathname || "/")
      .toLowerCase()
      .trim();

    // Ak sme na VOP alebo PRIVACY, neriešime prepínanie subdomén
    if (rawPath === "/vop" || rawPath === "/privacy") {
      setRouteState((prev) => ({ ...prev, isHome: false }));
      return;
    }

    // Ak sme na autonómnej subdoméne (napr. personal., mentor.)
    if (isDirectAutonomousSub && detectedSubId) {
      setRouteState({ id: detectedSubId, isHome: false });
      return;
    }

    // Ak sme na koreni alebo /home
    if (rawPath === "/" || rawPath === "" || rawPath === "/home") {
      setRouteState({ id: "SUB 00", isHome: true });
      return;
    }

    // Robustné zachytenie /sub01 až /sub15 (aj jedno- aj dvojciferné)
    const match = rawPath.match(/\/sub(\d{1,2})/);
    if (match && match.at(1)) {
      const num = String(match.at(1)).padStart(2, "0");
      const isZero = num === "00";
      setRouteState({
        id: `SUB ${num}`,
        isHome: isZero,
      });
    } else {
      setRouteState({ id: "SUB 00", isHome: true });
    }
  }, [location.pathname, isDirectAutonomousSub, detectedSubId]);

  // 🛡️ MODAL SYSTÉMOVÉHO LOGU: ZÁSADNE ZAČÍNA ZATVORENÝ (ŽIADNE SKÁKANIE)
  const [isSystemLogOpen, setIsSystemLogOpen] = useState(false);

  const handleCloseSystemLog = () => {
    setIsSystemLogOpen(false);
  };

  // Čisté dvojmiestne číslo aktívneho uzla (napr. "09")
  const cleanSubNum = String(activeSubId).replace(/\D/g, "").padStart(2, "0");

  // 🧭 1. REAKTÍVNE DÁTA Z MATRICE PRE AKTÍVNY UZOL
  const subList = Array.isArray(SUBDOMAINS_ARRAY)
    ? SUBDOMAINS_ARRAY
    : Object.values(SUBDOMAINS_MATRIX || {});

  // 🛡️ MULTI-KĽÚČOVÝ V20 SKENER (nájde objekt v SUBDOMAINS_MATRIX bez ohľadu na formát kľúča)
  const foundInMatrix =
    typeof SUBDOMAINS_MATRIX !== "undefined" && SUBDOMAINS_MATRIX
      ? SUBDOMAINS_MATRIX[`SUB ${cleanSubNum}`] ||
        SUBDOMAINS_MATRIX[`SUB${cleanSubNum}`] ||
        SUBDOMAINS_MATRIX[`ID ${cleanSubNum}`] ||
        SUBDOMAINS_MATRIX[`ID${cleanSubNum}`] ||
        SUBDOMAINS_MATRIX[cleanSubNum]
      : null;

  const foundInList = subList.find((item) => {
    const rawId = String(item?.id || item?.subId || item?.dimId || "").replace(
      /\D/g,
      "",
    );
    return rawId.padStart(2, "0") === cleanSubNum;
  });

  // Skutočný objekt subdomény (priorita: matica > zoznam > prvý prvok ak sme na home)
  const currentSub =
    foundInMatrix ||
    foundInList ||
    (cleanSubNum === "00" ? subList.at(0) || {} : {}) ||
    {};

  // 🎨 CHAMELEON FARBA: Ak má subdoména definovanú farbu, použije sa; inak fallback
  const themeColor = String(
    currentSub?.color ||
      currentSub?.themeColor ||
      (cleanSubNum === "09" ? "#FF003C" : "#00F3FF"),
  );

  const operatorTier = "QUEST";
  const currentTier = operatorTier;

  // 🧭 PRESNÉ ROZHODNUTIE SEKTORU: Ak je čisté číslo "00" a sme na koreni -> "home", inak ostrý sektor `sub01` až `sub15`
  const isReallyHome =
    (location.pathname === "/" ||
      location.pathname === "" ||
      location.pathname === "/home") &&
    cleanSubNum === "00";
  const currentSector = isReallyHome ? "home" : `sub${cleanSubNum}`;

  // 🛡️ DEFENZÍVNY SSOT OBJEKT PRE HLAVIČKU A SUBDOMENSPAGE
  const currentSubData = {
    ...currentSub,
    id: `SUB ${cleanSubNum}`,
    subId: `SUB ${cleanSubNum}`,
    dimId: currentSub?.dimId || `ID ${cleanSubNum}`,
    title:
      currentSub?.title ||
      currentSub?.name ||
      (cleanSubNum === "09" ? "SERGEANT-CORE" : `SUBDOMÉNA ${cleanSubNum}`),
    name:
      currentSub?.name ||
      currentSub?.title ||
      (cleanSubNum === "09" ? "SERGEANT-CORE" : `SUBDOMÉNA ${cleanSubNum}`),
    themeColor: themeColor,
    color: themeColor,
    tier: currentSub?.tier || operatorTier,
  };

  // 🔄 REAKTÍVNE POČÚVANIE NA HISTÓRIU PREHLIADAČA (POPSTATE)
  useEffect(() => {
    const handlePopState = () => {
      setRouteState(getInitialRouteState());
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // 🔄 CENTRÁLNY HANDLER PREPÍNANIA SUBDOMÉN (VOLANÝ Z DROPDOWNU AJ MRIEŽKY)
  const handleSelectSub = (newSubId) => {
    if (SoundFX?.click) SoundFX.click();

    const rawStr = String(newSubId || "SUB 00");
    const match = rawStr.match(/\d{1,2}/);
    const cleanNum =
      match && match.at(0) ? String(match.at(0)).padStart(2, "0") : "00";
    const targetId = `SUB ${cleanNum}`;
    const targetPath = cleanNum === "00" ? "/home" : `/sub${cleanNum}`;

    // Ak sme na akejkoľvek autonómnej subdoméne (mentor, personal, atď.), opúšťame ju na centrálu
    if (isDirectAutonomousSub) {
      console.log(
        "🔄 [NEXUS RESET] Opúšťam subdoménu -> smerujem na centrálu:",
        HUB_URL,
      );
      window.location.href = `${HUB_URL}${targetPath}`;
      return;
    }

    setRouteState({
      id: targetId,
      isHome: cleanNum === "00" ? true : false,
    });

    navigate(targetPath);
  };

  // NÁVRAT NA CENTRÁLU ZO VŠETKÝCH AUTONÓMNYCH SUBDOMÉN
  const handleHomeClick = () => {
    if (SoundFX?.click) SoundFX.click();

    // Ak sme na akejkoľvek autonómnej subdoméne (personal., mentor., atď.), fyzicky skočíme na centrálu
    if (isDirectAutonomousSub) {
      console.log(
        "🔄 [NEXUS RESET] Opúšťam subdoménu -> smerujem na centrálu:",
        HUB_URL,
      );
      window.location.href = `${HUB_URL}/home`;
      return;
    }

    // Ak sme už fyzicky na centrále (subdomens.), stačí reaktívny reset bez reloadu
    setRouteState({ id: "SUB 00", isHome: true });
    navigate("/home");
    setBootTrigger((prev) => prev + 1);
  };

  // 🏷️ UNIKÁTNA ZNAČKA TOHTO GIT PUSHU (zmeň pri novom ostrom pushi)
  const NEXUS_GIT_PUSH_ID = "nexus_build_push_2026_11_12_v7_3_02";

  // 🎯 HANDLER: SYNCHRONIZOVAŤ A ZAVRIEŤ (ZAPÍŠE PUSH AJ RELÁCIU)
  const handleAcknowledgeSystemLog = () => {
    if (SoundFX?.click) SoundFX.click();
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("nexus_last_acknowledged_push", NEXUS_GIT_PUSH_ID);
        sessionStorage.setItem("nexus_session_log_dismissed", "true");
      }
    } catch (err) {
      console.warn("Storage sync error", err);
    }
    setIsSystemLogOpen(false);
  };

  // 4. Manuálne vyvolanie z Footera kedykoľvek
  useEffect(() => {
    const handleOpenSignal = () => {
      setIsSystemLogOpen(true);
    };

    window.addEventListener("nexus_open_system_log", handleOpenSignal);
    return () => {
      window.removeEventListener("nexus_open_system_log", handleOpenSignal);
    };
  }, []);

  // 2. NEXUS ROUTING: PREDĹŽENÉ DOBY & TELEMETRIA BOOTU
  const [bootTrigger, setBootTrigger] = useState(0);
  const [isBooting, setIsBooting] = useState(true);
  const [bootStep, setBootStep] = useState(1);
  const [bootProgress, setBootProgress] = useState(15);
  const [bootStatus, setBootStatus] = useState(
    "DOBA 1: KVANTOVÁ SYNCHRONIZÁCIA MATRIX ZBERNICE...",
  );

  useEffect(() => {
    setIsBooting(true);
    setBootStep(1);
    setBootProgress(18);
    setBootStatus("DOBA 1: KVANTOVÁ SYNCHRONIZÁCIA MATRIX ZBERNICE...");

    const t1 = setTimeout(() => {
      setBootStep(2);
      setBootProgress(58);
      setBootStatus("DOBA 2: KOGNITÍVNY HANDSHAKE UZLA & DEŠIFROVANIE SSOT...");
      if (SoundFX?.hover) SoundFX.hover();
    }, 1200);

    const t2 = setTimeout(() => {
      setBootStep(3);
      setBootProgress(92);
      setBootStatus(
        "DOBA 3: STABILIZÁCIA SUBDOMÉNY & AUTORIZÁCIA OPERÁTORA...",
      );
    }, 2400);

    const t3 = setTimeout(() => {
      setBootProgress(100);
      setIsBooting(false);
      if (SoundFX?.click) SoundFX.click();
    }, 3600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [activeSubId, bootTrigger]);

  useEffect(() => {
    // 1. Príjem signálu z Hamburger Menu (nexus_select_subdomain)
    const handleSubSelect = (e) => {
      const targetId = e.detail;
      if (targetId === "HOME") {
        if (isDirectMentor) {
          window.location.href = `${HUB_URL}/home`;
          return;
        }
        setRouteState((prev) => ({
          ...prev,
          id: "SUB 00",
          isHome: true,
        }));
        navigate("/home");
      } else if (targetId) {
        const rawStr = String(targetId);
        const match = rawStr.match(/\d{1,2}/);
        const cleanNum =
          match && match.at(0) ? String(match.at(0)).padStart(2, "0") : "00";

        setRouteState((prev) => ({
          ...prev,
          id: `SUB ${cleanNum}`,
          isHome: cleanNum === "00" && !isDirectMentor ? true : false,
        }));
        if (!isDirectMentor) {
          navigate(cleanNum === "00" ? "/home" : `/sub${cleanNum}`);
        }
      }
    };
    window.addEventListener("nexus_select_subdomain", handleSubSelect);

    const path = String(location.pathname || "").toLowerCase();
    if (!isDirectMentor) {
      if (path === "/" || path === "" || path === "/home") {
        setRouteState((prev) => ({ ...prev, id: "SUB 00", isHome: true }));
      } else {
        const match = path.match(/\/sub(\d{2})/);
        if (match && match.at(1)) {
          setRouteState((prev) => ({
            ...prev,
            id: `SUB ${match.at(1)}`,
            isHome: false,
          }));
        }
      }
    }

    return () => {
      window.removeEventListener("nexus_select_subdomain", handleSubSelect);
    };
  }, [location.pathname, isDirectMentor, HUB_URL, navigate]);

  // 3. IDENTITA OPERÁTORA (IZOLOVANÝ KONTRAKT)
  const [userState] = useState({
    email: "operator@projekt-nexus.sk",
    displayName: "OPERÁTOR",
    tier: "ARCHITECT",
    credits: 0,
    avatar: "",
    isGuest: false,
  });

  if (location.pathname === "/vop") {
    return (
      <div className="min-h-screen bg-[#050A0E] text-zinc-200 p-4 sm:p-8 font-mono">
        <VopPage onBack={() => navigate("/")} />
        <GlobalHamburgerMenu activeTab="home" themeColor={themeColor} />
      </div>
    );
  }

  if (location.pathname === "/privacy") {
    return (
      <div className="min-h-screen bg-[#050A0E] text-zinc-200 p-4 sm:p-8 font-mono">
        <PrivacyPage onBack={() => navigate("/")} />
        <GlobalHamburgerMenu activeTab="home" themeColor={themeColor} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#03080a] text-[#b3d4d6] font-mono overflow-x-hidden flex flex-col justify-between text-left relative selection:bg-cyan-500 selection:text-black">
      <style>{`
        ::selection { background-color: ${themeColor}; color: #000; }
        .hide-scroll::-webkit-scrollbar { display: none; }
        .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* ==================================================================== */}
      {/* 🧭 1. GLOBÁLNE HLUCHÁ LIŠTA (CYBER-DOCK PROTOTYP BEZ PREKLIKOV)        */}
      {/* ==================================================================== */}
      <nav
        style={{ zIndex: 1000 }}
        className="fixed top-0 left-0 w-full border-b border-cyan-500/30 bg-[#030609]/95 backdrop-blur-xl px-3 py-2 flex justify-between items-center shadow-[0_4px_25px_rgba(0,180,216,0.15)] text-left"
      >
        {/* LOGO MATERSKEJ LODE (VIZUÁLNY DOCK) */}
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 shrink">
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 px-2 py-1 rounded-xl bg-[#080E14] border border-cyan-500/40 shadow-[0_0_12px_rgba(0,180,216,0.2)]">
            <div
              className="p-1 sm:p-1.5 rounded-lg text-black transition-colors shrink-0"
              style={{ backgroundColor: themeColor }}
            >
              <Shield size={13} className="font-black" />
            </div>
            <span className="text-white font-black tracking-widest uppercase italic text-[11px] sm:text-xs hidden md:inline-block">
              NEXUS <span style={{ color: themeColor }}>SUB</span>
            </span>
          </div>

          {/* NAVIGAČNÉ TLAČIDLÁ (NA MOBILE LEN HOME, OSTATNÉ OD MD+) */}
          <div className="flex items-center gap-1 py-0.5">
            {/* 🟢 DYNAMICKÉ TLAČIDLO HOME (VIDITEĽNÉ VŽDY) */}
            <button
              type="button"
              onClick={handleHomeClick}
              className="px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-1 sm:gap-1.5 cursor-pointer active:scale-95 shrink-0"
              style={{
                color: isDefaultHome ? "#FFFFFF" : themeColor,
                borderColor: `${themeColor}60`,
                borderWidth: "1px",
                borderStyle: "solid",
                backgroundColor: `${themeColor}15`,
                boxShadow: `0 0 12px ${themeColor}25`,
              }}
              title="[ 🏠 RESET NA DOMOVSKÝ UZOL // SUB 00 ]"
            >
              <Grid size={12} style={{ color: themeColor }} />
              <span>Home</span>
            </button>

            {/* 🛑 HLUCHÉ TLAČIDLÁ (SKRYTÉ NA MOBILE, VIDITEĽNÉ OD MD VYŠŠIE) */}
            <button
              type="button"
              disabled
              aria-disabled="true"
              title="[ ⚠️ BLOG // MODUL VO VÝVOJI // V20 PROTOKOL ]"
              className="hidden md:flex px-2.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider text-zinc-600 opacity-40 hover:opacity-50 items-center gap-1 cursor-not-allowed border border-white/5 bg-white/[0.02] select-none transition-opacity shrink-0"
            >
              <Terminal size={13} />
              <span>Blog</span>
            </button>

            <button
              type="button"
              disabled
              aria-disabled="true"
              title="[ ⚠️ OPERÁTORI // SYSTÉMOVÁ MATRIX VO VÝVOJI ]"
              className="hidden lg:flex px-2.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider text-zinc-600 opacity-40 hover:opacity-50 items-center gap-1 cursor-not-allowed border border-white/5 bg-white/[0.02] select-none transition-opacity shrink-0"
            >
              <Users size={13} />
              <span>Operators</span>
            </button>

            <button
              type="button"
              disabled
              aria-disabled="true"
              title="[ ⚠️ NASTAVENIA // KONFIGURAČNÁ BRÁNA VO VÝVOJI ]"
              className="hidden xl:flex px-2.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider text-zinc-600 opacity-40 hover:opacity-50 items-center gap-1 cursor-not-allowed border border-white/5 bg-white/[0.02] select-none transition-opacity shrink-0"
            >
              <Settings size={13} />
              <span>Settings</span>
            </button>
          </div>
        </div>

        {/* PRAVÝ BLOK (DROPDOWN + STATUS OPERÁTORA) */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 ml-2">
          {/* ODDELOVAČ (SKRYTÝ NA NAJMENŠÍCH DISPLEJOCH) */}
          <div className="hidden sm:block h-4 w-[1px] bg-white/10 mx-0.5 sm:mx-1" />

          {/* DROPDOWN SUBDOMÉN */}
          <div className="shrink-0 max-w-[150px] xs:max-w-[180px] sm:max-w-none">
            <GlobalNexusDropdown
              currentSubId={activeSubId}
              subId={activeSubId}
              activeColor={themeColor}
              themeColor={themeColor}
              color={themeColor}
              onSelectSub={handleSelectSub}
            />
          </div>

          {/* OPERÁTOR STATUS BADGE */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            {/* INBOX (SKRYTÝ NA MOBILE) */}
            <button
              type="button"
              disabled
              aria-disabled="true"
              title="[ ⚠️ INBOX // KOMUNIKAČNÝ UZOL VO VÝVOJI ]"
              className="hidden sm:flex p-1.5 sm:p-2 rounded-lg bg-blue-500/5 text-blue-400/40 border border-blue-500/10 cursor-not-allowed select-none transition-all shrink-0"
            >
              <Mail size={14} />
            </button>

            {/* AVATAR OPERÁTORA (VŽDY VIDITEĽNÝ) */}
            <div
              title="[ 👤 OPERÁTOR PROFIL // AUTORIZOVANÝ PRÍSTUP ]"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 flex items-center justify-center bg-black shrink-0 cursor-help transition-all duration-300"
              style={{
                borderColor: `${themeColor}80`,
                boxShadow: `0 0 10px ${themeColor}20`,
              }}
            >
              <User size={13} style={{ color: themeColor }} />
            </div>

            {/* LOGOUT (SKRYTÝ NA MOBILE A TABLETE) */}
            <button
              type="button"
              disabled
              aria-disabled="true"
              title="[ ⚠️ LOGOUT // ODHLÁSENIE RELÁCIE VO VÝVOJI ]"
              className="hidden md:flex px-2 py-1.5 rounded-lg bg-red-500/5 text-red-400/40 border border-red-500/10 shrink-0 items-center gap-1 text-[9px] font-black uppercase tracking-wider cursor-not-allowed select-none transition-all"
            >
              <LogOut size={12} />
              <span className="hidden xl:inline">LOGOUT</span>
            </button>
          </div>
        </div>
      </nav>

      {/* ==================================================================== */}
      {/* 🧭 2. HLAVNÝ OBSAH + HEADER MENIACI SA NA ZÁKLADE DROPDOWNU          */}
      {/* ==================================================================== */}
      <main className="pt-20 flex-1 px-2 md:px-6 pb-12 relative z-10 w-full max-w-7xl mx-auto">
        {/* ⚡ 3. NEXUS ROUTING: PREDĹŽENÝ CYBER-BRUTALISTICKÝ BOOT HUD */}
        {isBooting ? (
          <div className="min-h-[58vh] flex flex-col items-center justify-center font-mono text-center p-4 relative">
            {/* CYBER-BOX MONOLIT */}
            <div
              className="w-full max-w-xl p-6 sm:p-8 rounded-2xl bg-[#03060a]/90 backdrop-blur-2xl border relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)]"
              style={{ borderColor: `${themeColor}40` }}
            >
              {/* DEKORATÍVNA SCANLINE LINKA */}
              <div
                className="absolute top-0 left-0 h-[2px] w-full animate-pulse"
                style={{
                  backgroundColor: themeColor,
                  boxShadow: `0 0 15px ${themeColor}`,
                }}
              />

              {/* HLAVIČKA ROUTINGU */}
              <div className="flex justify-between items-center border-b border-zinc-800/80 pb-3 mb-6 text-[10px] tracking-widest uppercase">
                <span className="flex items-center gap-2 text-zinc-400">
                  <span
                    className="w-2 h-2 rounded-full animate-ping"
                    style={{ backgroundColor: themeColor }}
                  />
                  NEXUS_ROUTING_ENGINE // V20.95
                </span>
                <span style={{ color: themeColor }} className="font-black">
                  [ STEP 0{bootStep} / 03 ]
                </span>
              </div>

              {/* CENTRÁLNY RADAR A SPINNER */}
              <div className="relative my-6 flex items-center justify-center">
                <div
                  className="w-24 h-24 rounded-full border-2 border-dashed animate-spin"
                  style={{
                    borderColor: `${themeColor}50`,
                    animationDuration: "6s",
                  }}
                />
                <div
                  className="absolute w-16 h-16 rounded-full border border-zinc-700 animate-ping opacity-30"
                  style={{ borderColor: themeColor }}
                />
                <Loader2
                  size={36}
                  className="absolute animate-spin"
                  style={{ color: themeColor }}
                />
              </div>

              {/* STAVOVÁ TELEMETRIA & POPIS DOBY */}
              <div className="space-y-2 mb-6">
                <div
                  className="inline-block text-[11px] font-black uppercase tracking-[0.25em] px-3 py-1 rounded bg-black/80 border"
                  style={{ color: themeColor, borderColor: `${themeColor}40` }}
                >
                  TARGET: {activeSubId} // {currentSubData.title}
                </div>
                <p className="text-white font-mono text-xs sm:text-sm tracking-widest font-bold h-6 flex items-center justify-center">
                  {bootStatus}
                </p>
              </div>

              {/* PROGRESS BAR NA TRI DOBY */}
              <div className="w-full bg-zinc-950 rounded-full h-2.5 p-0.5 border border-zinc-800 overflow-hidden relative mb-3">
                <div
                  className="h-full rounded-full transition-all duration-700 ease-out"
                  style={{
                    width: `${bootProgress}%`,
                    backgroundColor: themeColor,
                    boxShadow: `0 0 12px ${themeColor}`,
                  }}
                />
              </div>

              {/* HEXADECIMÁLNA PÄTA BOOT OKNA */}
              <div className="flex justify-between items-center text-[9px] text-zinc-500 font-mono tracking-wider pt-2">
                <span>FREQ: 432Hz // CORE_SYNC</span>
                <span className="font-bold text-zinc-400">
                  {bootProgress}% LOADED
                </span>
                <span>STATUS: NOMINAL</span>
              </div>
            </div>

            {/* SYSTÉM & PRÁVNE DÁTA */}
            <Routes>
              <Route path="/vop" element={<VopPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
            </Routes>
          </div>
        ) : (
          <div className="flex flex-col gap-6 animate-fadeIn">
            {/* 🛑 CHYBA BOLA: nodeTitle={currentSubData?.title} alebo podobne */}
            <SubdomensPage
              activeSubId={`SUB ${cleanSubNum}`}
              subId={`SUB ${cleanSubNum}`}
              rawSubId={`SUB${cleanSubNum}`}
              subNum={cleanSubNum}
              isHome={isDefaultHome}
              themeColor={themeColor}
              activeColor={themeColor}
              currentSub={currentSubData}
              subData={currentSubData}
              currentSector={isDefaultHome ? "home" : `sub${cleanSubNum}`}
              onSelectSub={handleSelectSub}
              onHomeClick={handleHomeClick}
            />
          </div>
        )}
      </main>

      {/* ==================================================================== */}
      {/* 📡 4. GLOBAL KOMPONENTY A FOOTER                                     */}
      {/* ==================================================================== */}
      <div className="w-full">
        {/* 🍔 GLOBÁLNE HAMBURGER MENU */}
        <GlobalHamburgerMenu
          activeTab={isDefaultHome ? "home" : activeSubId || "home"}
          themeColor={themeColor}
          activeSubId={activeSubId}
          currentSector={currentSector}
        />

        {/* 🚨 GLOBÁLNY MODAL PRE SYSTÉMOVÝ LOG */}
        {isSystemLogOpen && (
          <SystemLogModal
            isOpen={isSystemLogOpen}
            onClose={() => setIsSystemLogOpen(false)}
            onAcknowledge={handleAcknowledgeSystemLog}
            themeColor={themeColor}
            buildPushId={NEXUS_GIT_PUSH_ID}
          />
        )}

        {/* 4. GLOBÁLNY FOOTER REAKTÍVNE PREPOJENÝ NA AKTÍVNU SUBDOMÉNU */}
        <GlobalFooter
          sector={currentSector || activeSubId || "SUB 00"}
          tier={currentTier || "FREE"}
          themeColor={themeColor}
        />

        {/* 5. GLOBÁLNE KOMPONENTY (SYSTEM AUDIT, POPUPY, MATRIX FX) */}
        <GlobalComponents themeColor={themeColor} activeSubId={activeSubId} />
      </div>
    </div>
  );
};

export default App;
