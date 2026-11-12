/* eslint-disable no-undef */
// ============================================================================
// 👑 PROJECT NEXUS — OS GENESIS EDITION (V20 SUBDOMAINS NETWORK CONFIG)
// Súbor: apps/subdomeny/subdomena_[XX]/vite.config.js
// Status: 100% GROUNDED // UNIFIKOVANÝ PORT MATRIX [51800 - 51815]
// ============================================================================
// 📡 REGISTER PORTOV SUBDOMÉN OS GENESIS:
// Base Modul: 51800    | ID00 Mentor: 51800  | ID01 Identity: 51801
// ID02 Workflow: 51802 | ID03 Finance: 51803 | ID04 Revenue: 51804
// ID05 Assets: 51805   | ID06 Study: 51806   | ID07 Skills: 51807
// ID08 Reader: 51808   | ID09 Player: 51809  | ID10 Home: 51810
// ID11 Recovery: 51811 | ID12 Codex: 51812   | ID13 Habits: 51813
// ID14 Blog: 51814     | ID15 Death: 51815
// ============================================================================

/* eslint-disable no-undef */
// ============================================================================
// 👑 PROJECT NEXUS — OS GENESIS EDITION (SYS03 MASTER DATASET V20.95)
// Súbor: vite.config.base.js (Zdieľaná Vite Továreň pre subdomény)
// Status: 100% GROUNDED // MULTI-PORT MATRIX [51800 - 51815]
// ============================================================================

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

/**
 * V20 Továreň na Vite konfigurácie pre subdomény
 * @param {string} appDir - Adresár subdomény (__dirname)
 * @param {number} port - Pridelený port z Matrixu (51800 - 51815)
 */
export default function createViteConfig(appDir, port = 51800) {
  return defineConfig({
    plugins: [react()],
    server: {
      port: Number(port),
      strictPort: true,
      open: true, // 🚀 AUTO-OPEN pre každú subdoménu pri samostatnom štarte
      host: true,
    },
    resolve: {
      alias: {
        "@shared": path.resolve(appDir, "../../shared"),
        "@subdomeny": path.resolve(appDir, "../src"),
      },
    },
  });
}