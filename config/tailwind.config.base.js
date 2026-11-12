/* eslint-disable no-undef */
import path from "path";

// ============================================================================
// 👑 PROJECT NEXUS — OS GENESIS EDITION (V20 MASTER TAILWIND BASE CONFIG)
// Súbor: config/tailwind.config.base.js
// ============================================================================

export const createTailwindConfig = (appDir) => {
  const rootDir = path.resolve(appDir, "../../");

  return {
    content: [
      path.resolve(appDir, "./index.html"),
      path.resolve(appDir, "./src/**/*.{js,ts,jsx,tsx}"),
      // 🛡️ AUTOMATICKÉ SKENOVANIE VŠETKÝCH ZDIELANÝCH COMPONENTOV A APPS
      path.resolve(rootDir, "shared/src/**/*.{js,ts,jsx,tsx}"),
      path.resolve(rootDir, "shared/components/**/*.{js,ts,jsx,tsx}"),
      path.resolve(rootDir, "apps/*/src/**/*.{js,ts,jsx,tsx}"),
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
