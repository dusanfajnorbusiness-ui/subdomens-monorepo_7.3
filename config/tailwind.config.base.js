/* eslint-disable no-undef */
import path from "path";

// ============================================================================
// 👑 PROJECT NEXUS — OS GENESIS EDITION (V20 MASTER TAILWIND BASE CONFIG)
// Súbor: config/tailwind.config.base.js (alebo tailwind.config.js)
// Status: 100% GROUNDED // ALL SUBDOMAINS & SHARED SCANNER
// ============================================================================

export const createTailwindConfig = (appDir) => {
  // Pomocná funkcia: prevod Windows lomiek na POSIX pre fast-glob
  const toPosix = (p) => p.replace(/\\/g, "/");

  const appDirPosix = toPosix(path.resolve(appDir));
  // Ak appDir je koreň monorepa, rootDir je totožný; ak je v podpriečinku, stúpa hore
  const rootDirPosix = toPosix(
    path.resolve(appDir, appDir.includes("apps") ? "../../" : "./"),
  );

  return {
    content: [
      `${appDirPosix}/index.html`,
      // 🛡️ 1. Pokrytie priamo lokálnych súborov (ak existuje priamy src)
      `${appDirPosix}/src/**/*.{js,ts,jsx,tsx}`,
      // 🛡️ 2. Pokrytie celého stromu apps vrátane vnorených subdomén (App.jsx, komponenty)
      `${rootDirPosix}/apps/**/*.{js,ts,jsx,tsx}`,
      // 🛡️ 3. Pokrytie zdieľaných modulov a UI elementov
      `${rootDirPosix}/shared/**/*.{js,ts,jsx,tsx}`,
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
