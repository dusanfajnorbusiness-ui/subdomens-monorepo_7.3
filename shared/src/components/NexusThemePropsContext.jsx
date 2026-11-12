// ============================================================================
// 👑 PROJECT NEXUS — OS GENESIS EDITION (SSOT GLOBAL THEME & PROPS CONTEXT V20.95)
// Súbor: @shared/components/NexusThemePropsContext.jsx
// Status: 100% GROUNDED // ZERO-PROP-DRILLING MATRIX // 16 SUB NODES RECOVERY
// Architektúra: Univerzálna zbernica (Theme, Sector, Tier, Routing & Node Sync)
// Použiteľnosť: Monorepo Apps (Subdomény, Web, Shop, Agency, Admin)
// Author: Dušan Fajnor @nexus-core2Mb (CyberTech Architect) & NEXUS BACKEND CHIRURG
// ============================================================================

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";

// ============================================================================
// ⚠️ OSTRÉ MONOREPO IMPORTY (VITE ALIAS SSOT)
// ============================================================================
import { SoundFX as ImportedSoundFX } from "@shared/utils/SoundEngine.js";
import { SUBDOMAINS_ARRAY, SUBDOMAINS_MATRIX } from "@subdomeny/data/SubdomainsMasterData.js";

// Defenzívny fallback pre SoundEngine
const SoundFX = ImportedSoundFX || {
  playHover: () => {},
  playSuccess: () => {},
  playClick: () => {},
};

// 🛡️ 1. DEFENZÍVNY PARSER (V20 ZERO-COMMA PROTOCOL)
// Z akéhokoľvek vstupu ("/sub05,05", "SUB 05", ["sub05"], 5) vytiahne striktne "05"
export const extractCleanSubNumber = (input) => {
  if (!input) return "00";
  const rawStr = Array.isArray(input) ? input.join(" ") : String(input || "");
  const match = rawStr.match(/\d{1,2}/);
  return match ? String(match).padStart(2, "0") : "00";
};

// Vytvorenie React kontextu
const NexusThemePropsContext = createContext(null);

export const NexusThemePropsProvider = ({ children, defaultSubId = "SUB 00" }) => {
  // 🧭 2. INICIALIZÁCIA STAVU Z URL (DETEKCIA NA PRVÝ TICK)
  const getInitialRouteState = useCallback(() => {
    if (typeof window === "undefined" || !window.location) {
      return { id: defaultSubId, isHome: true };
    }

    const path = String(window.location.pathname || "").toLowerCase().trim();

    // Ak sme na domovskej adrese "/"
    if (path === "/" || path === "") {
      return { id: "SUB 00", isHome: true };
    }

    // Ak URL obsahuje /sub (napr. /sub00, /sub05, /sub-12)
    if (path.includes("/sub")) {
      const num = extractCleanSubNumber(path);
      return { id: `SUB ${num}`, isHome: false };
    }

    return { id: defaultSubId, isHome: true };
  }, [defaultSubId]);

  const [routeState, setRouteState] = useState(getInitialRouteState);

  // 🔄 3. NATIVNÉ POČÚVANIE POPSTATE (HISTÓRIA PREHLIADAČA SPÄŤ / DOPREDU)
  useEffect(() => {
    const handlePopState = () => {
      setRouteState(getInitialRouteState());
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [getInitialRouteState]);

  // 🧭 4. REAKTÍVNE MAPOVANIE DÁT Z MATRICE SSOT
  const activeSubId = routeState.id;
  const isDefaultHome = routeState.isHome;

  const subList = useMemo(() => {
    return Array.isArray(SUBDOMAINS_ARRAY)
      ? SUBDOMAINS_ARRAY
      : Object.values(SUBDOMAINS_MATRIX || {});
  }, []);

  const currentSub = useMemo(() => {
    return (
      (SUBDOMAINS_MATRIX && SUBDOMAINS_MATRIX[activeSubId]) ||
      subList.find((item) => String(item?.id || "").toUpperCase() === String(activeSubId).toUpperCase()) ||
      subList || {
        id: "SUB 00",
        dimId: "ID 00",
        name: "MENTOR-HUB",
        domain: "mentor.projekt-nexus.sk",
        color: "#FFFFFF",
        tier: "FREE",
        subTitle: "AI GEMINI MENTORING NODE // SYSTEM STANDBY",
        description: "Kognitívna dimenzia pre mentoring a AI syntézu.",
      }
    );
  }, [activeSubId, subList]);

  // 🎨 CHAMELEON ATRIBÚTY PRE CELÚ APLIKÁCIU
  const themeColor = String(currentSub?.color || "#FFFFFF");
  const cleanSubNum = extractCleanSubNumber(activeSubId);
  const currentSector = isDefaultHome ? "home" : `sub${cleanSubNum}`;
  const operatorTier = "QUEST";
  const currentTier = operatorTier;

  // 🔄 5. CENTRÁLNY HANDLER PREPÍNANIA SUBDOMÉN (PRE DROPDOWNY, ODKAZY, GRID)
  const setSubdomain = useCallback((rawTarget) => {
    try {
      SoundFX?.playClick?.();
    } catch (e) {}

    const num = extractCleanSubNumber(rawTarget);
    const targetId = `SUB ${num}`;
    const targetPath = `/sub${num}`;

    setRouteState({ id: targetId, isHome: false });

    if (typeof window !== "undefined" && window.location.pathname !== targetPath) {
      window.history.pushState({}, "", targetPath);
    }
  }, []);

  // 🏠 RESET NA DOMOVSKÝ UZOL (HOME BUTTON)
  const resetToHome = useCallback(() => {
    try {
      SoundFX?.playClick?.();
    } catch (e) {}

    setRouteState({ id: "SUB 00", isHome: true });

    if (typeof window !== "undefined" && window.location.pathname !== "/") {
      window.history.pushState({}, "", "/");
    }
  }, []);

  // 📦 SSOT DÁTOVÝ KONTRAKT
  const contextValue = useMemo(() => {
    return {
      // Stavové identifikátory
      activeSubId,
      cleanSubNum,
      isDefaultHome,

      // Chameleon UI & Theming
      themeColor,
      activeColor: themeColor,
      color: themeColor,
      currentSector,
      sector: currentSector,
      operatorTier,
      currentTier,
      tier: currentTier,

      // Dátový balík aktuálneho uzla
      currentSub,
      currentSubData: currentSub,
      subList,

      // Ovládacie metódy
      setSubdomain,
      onSelectSub: setSubdomain,
      resetToHome,
      handleHomeClick: resetToHome,
    };
  }, [
    activeSubId,
    cleanSubNum,
    isDefaultHome,
    themeColor,
    currentSector,
    operatorTier,
    currentTier,
    currentSub,
    subList,
    setSubdomain,
    resetToHome,
  ]);

  return (
    <NexusThemePropsContext.Provider value={contextValue}>
      {children}
    </NexusThemePropsContext.Provider>
  );
};

// 🪝 6. VLASTNÝ HOOK PRE PRIAMY ODBER V KOMPONENTOCH
export const useNexusThemeProps = () => {
  const context = useContext(NexusThemePropsContext);
  if (!context) {
    throw new Error(
      "❌ [FATAL V20]: useNexusThemeProps musí byť použitý vo vnútri <NexusThemePropsProvider>!"
    );
  }
  return context;
};

// Spätná kompatibilita pre aliasy
export const useNexusSubdomain = useNexusThemeProps;
export default NexusThemePropsContext;