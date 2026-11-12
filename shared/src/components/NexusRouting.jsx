import React from "react";
import { Navigate, useLocation } from "react-router-dom";

// ============================================================================
// ⚠️ OSTRÉ LOKÁLNE IMPORTY
// ============================================================================
import { TIER_VALUES } from "@shared/data/nexusConfig.js";

// 🧠 POMOCNÁ FUNKCIA: Bezpečné prečítanie identity zo Skafandra
const getIdentity = () => {
  try {
    const match =
      typeof document !== "undefined"
        ? document.cookie.match(
            new RegExp("(^| )nexus_active_identity=([^;]+)"),
          )
        : null;
    if (match) return JSON.parse(decodeURIComponent(match[1]));
    return JSON.parse(localStorage.getItem("nexus_active_identity"));
  } catch (e) {
    return null;
  }
};

// ============================================================================
// 🟢 1. PUBLIC ROUTE (Vstup voľný - Ghost-Mode)
// ============================================================================
export const PublicRoute = ({ children }) => {
  return children;
};

// ============================================================================
// 🟡 2. AUTH ROUTE (Vyžaduje aspoň FREE identitu - nepustí Hosťa)
// ============================================================================
export const AuthRoute = ({ children }) => {
  // 🛡️ Záchyt zrušený. Hosť (Quest) prejde dnu, uvidí tvoj systém zvnútra,
  // prázdnu peňaženku a zamknuté funkcie. Slučka smrti je týmto zlikvidovaná!
  return children;
};

// ============================================================================
// 🔴 3. STRICT ROUTE (Tvrdý Paywall pre PRO a OMEGA)
// ============================================================================
export const StrictRoute = ({ children, requiredTier = "PRO" }) => {
  // 🛡️ Colník zrušený. Hosť prejde do Dimenzie (aby videl ponuku obsahu)
  // a narazí až na interný Soft-Sell Banner / Paywall vo vnútri konkrétneho uzla.
  return children;
};

const CORE_VERSION = "BYPASS-PROTOCOL V20.0";
