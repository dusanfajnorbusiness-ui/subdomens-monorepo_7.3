
/* eslint-disable no-undef */
import { useEffect } from "react";

// ============================================================================
// 👑 PROJECT NEXUS — OS GENESIS EDITION (THEME SYNC HOOK V20.95)
// Súbor: @shared/hooks/useThemeSync.js
// Status: 100% GROUNDED // AUTOMATIC THEME COLOR PROPAGATION
// ============================================================================

export const useThemeSync = (color, onThemeChange) => {
  useEffect(() => {
    if (color && typeof onThemeChange === "function") {
      onThemeChange(color);
    }
  }, [color, onThemeChange]);
};

export default useThemeSync;
