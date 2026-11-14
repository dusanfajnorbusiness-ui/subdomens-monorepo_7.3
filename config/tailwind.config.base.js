/* eslint-disable no-undef */
import path from "path";

// ============================================================================
// 👑 PROJECT NEXUS — OS GENESIS EDITION (V20 MASTER TAILWIND BASE CONFIG)
// Súbor: config/tailwind.config.base.js (alebo tailwind.config.js)
// Status: 100% GROUNDED // ALL SUBDOMAINS & SHARED SCANNER
// ============================================================================

export const createTailwindConfig = (appDir) => {
  // Pomocná funkcia: prevod Windows lomiek na POSIX pre fast-glob
  const toPosix = (p) => String(p || "").replace(/\\/g, "/");

  const appDirPosix = toPosix(path.resolve(appDir || "."));
  const isInsideApps = appDirPosix.includes("/apps");
  const rootDirPosix = toPosix(path.resolve(appDir || ".", isInsideApps ? "../../" : "./"));

  return {
    content: [
      `${appDirPosix}/index.html`,
      // 🛡️ 1. Lokálny kód aplikácie
      `${appDirPosix}/src/**/*.{js,ts,jsx,tsx}`,
      // 🛡️ 2. Celý strom apps s explicitným ignorovaním node_modules
      `${rootDirPosix}/apps/**/*.{js,ts,jsx,tsx}`,
      // 🛡️ 3. Zdieľané moduly
      `${rootDirPosix}/shared/**/*.{js,ts,jsx,tsx}`,
      // 🚫 Zákaz scanovania závislostí pre 100% rýchlosť buildu
      `!${rootDirPosix}/**/node_modules/**`,
    ],
    theme: {
      extend: {
        colors: {
          nexus: {
            black: "#03080a",
            cyan: "#00F3FF",
            green: "#39FF14",
            gold: "#FFD700",
          },
        },
      },
    },
    plugins: [],
  };
};

export default createTailwindConfig;
