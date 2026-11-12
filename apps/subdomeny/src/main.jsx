/* eslint-disable no-undef */

// ============================================================================
// 👑 PROJECT NEXUS — OS GENESIS EDITION (SYS03 MASTER DATASET V20.95)
// Súbor: @apps/subdomeny/src/main.jsx
// Status: 100% GROUNDED // UNIVERSAL BOOTSTRAPPER // ZERO CRASH FALLBACK
// CORE_VERSION: MAIN-BOOT-V20.95
// ============================================================================

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

// ============================================================================
// ⚠️ DEFENZÍVNY CENTRÁLNY BOOTSTRAPPER PRE OS GENESIS
// ============================================================================

const rootElement = document.getElementById("root");

if (!rootElement) {
  console.error(
    "%c[NEXUS CRITICAL ERROR]: DOM SOCKET '#root' NEBOLA NÁJDENÁ!",
    "color: #FF0055; font-weight: bold; background: #000; padding: 4px;"
  );
} else {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );

  console.log(
    "%c[NEXUS OS]: UNIFIED_BOOT_SEQUENCE_COMPLETE // 100% READY",
    "color: #39FF14; font-weight: bold; background: #000; padding: 4px 8px; border-radius: 4px;"
  );
}