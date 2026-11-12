/* eslint-disable no-undef */
// ============================================================================
// 👑 PROJECT NEXUS — OS GENESIS EDITION (V20 SUBDOMAINS NETWORK CONFIG)
// Súbor: apps/subdomena/vite.config.js
// Status: 100% GROUNDED // UNIFIKOVANÝ PORT MATRIX [51800 - 51815]
// ============================================================================
// 📡 REGISTER PORTOV SUBDOMÉN OS GENESIS:
// uplink (5170) 
// Base Modul: main-web (5171), 
// agency (5172), 
// blog (5173), 
// operators (5174), 
// shop (5175), 
// settings (5176), 
// admin (5177), apps/admin/vite.config.js
// subdomeny (51800 - 51815)
// ============================================================================
// Súbor: shared/vite.config.js
// ============================================================================
// shared (51900)
// ============================================================================

import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// ============================================================================
// 👑 PROJECT NEXUS — OS GENESIS EDITION (V20 MASTER VITE BASE CONFIG)
// Súbor: config/vite.config.base.js
// ============================================================================

export const createViteConfig = (appDir, port = 5173) => {
  const rootDir = path.resolve(appDir, "../../");

  return defineConfig({
    base: "/",
    root: appDir,
    plugins: [react()],
    define: {
      "process.env": {},
    },
    server: {
      port,
      host: true,
    },
    resolve: {
      alias: {
        "@shared": path.resolve(rootDir, "shared/src"),
        "@nexus/shared": path.resolve(rootDir, "shared/src"),
        "@main-web": path.resolve(rootDir, "apps/main-web/src"),
        "@uplink": path.resolve(rootDir, "apps/uplink/src"),
        "@shop": path.resolve(rootDir, "apps/shop/src"),
        "@agency": path.resolve(rootDir, "apps/agency/src"),
        "@blog": path.resolve(rootDir, "apps/blog/src"),
        "@admin": path.resolve(rootDir, "apps/admin/src"),
        "@subdomeny": path.resolve(rootDir, "apps/subdomeny/src"),
        "@operators": path.resolve(rootDir, "apps/operators/src"),
        "@settings": path.resolve(rootDir, "apps/settings/src"),
        "@apps": path.resolve(rootDir, "apps"),
      },
    },
    build: {
      outDir: path.resolve(appDir, "dist"),
      emptyOutDir: true,
      sourcemap: false,
      chunkSizeWarningLimit: 1600,
    },
  });
};

export default createViteConfig;
