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

// ============================================================================
// 👑 PROJECT NEXUS — OS GENESIS EDITION (SYS03 MASTER DATASET V20.95)
// Súbor: vite.config.js (Koreňový Launchpad)
// Status: 100% GROUNDED // PORT 51800 // AUTO-OPEN ENABLED
// ============================================================================

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 51800,
    strictPort: true,
    open: true,
    host: true,
  },
  optimizeDeps: {
    entries: ["index.html"], // 🛡️ ZÁKAZ SKENOVANIA VNÚTORNÝCH 16 SUBDOMÉN!
  },
  resolve: {
    dedupe: ["react", "react-dom", "react-router-dom"],
    alias: {
      "@": path.resolve(__dirname, "./apps/subdomeny/src"),
      "@subdomeny": path.resolve(__dirname, "./apps/subdomeny/src"),
      "@shared": path.resolve(__dirname, "./shared/src"),
      "@mentor": path.resolve(__dirname, "./apps/subdomeny/mentor/src"),
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});