import { Activity } from "lucide-react";
/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";

// ============================================================================
// 👑 PROJECT NEXUS — OS GENESIS EDITION (SYS03 MASTER DATASET V20.95)
// Súbor: @shared/components/CoreChronometer.jsx
// Status: 100% GROUNDED // STANDALONE CORE CHRONOMETER V20
// ============================================================================

export const CoreChronometer = ({ themeColor = "#39FF14" }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const yy = String(time.getFullYear()).slice(-2);
  const mm = String(time.getMonth() + 1).padStart(2, "0");
  const dd = String(time.getDate()).padStart(2, "0");
  const hh = String(time.getHours()).padStart(2, "0");
  const min = String(time.getMinutes()).padStart(2, "0");
  const ss = String(time.getSeconds()).padStart(2, "0");

  const genesisDate = new Date(2018, 7, 4);
  let years = time.getFullYear() - genesisDate.getFullYear();
  let months = time.getMonth() - genesisDate.getMonth();
  let days = time.getDate() - genesisDate.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(time.getFullYear(), time.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  const tooltipText = `MATRIX CORE UPTIME: ${years} rokov ${months} mesiacov ${days} dní`;

  return (
    <div
      title={tooltipText}
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg border bg-[#050505]/80 backdrop-blur-md transition-all duration-500 cursor-help hover:scale-105"
      style={{
        borderColor: `${themeColor}30`,
        boxShadow: `0 0 10px ${themeColor}10`,
      }}
    >
      <Activity
        size={12}
        style={{ color: themeColor }}
        className="animate-pulse opacity-70"
      />
      <span
        className="font-mono text-[10px] font-black tracking-widest whitespace-nowrap"
        style={{ color: themeColor }}
      >
        {dd}.{mm}.{yy} | {hh}:{min}:{ss}
      </span>
    </div>
  );
};

export default CoreChronometer;