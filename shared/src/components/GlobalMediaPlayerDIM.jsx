/* eslint-disable no-undef */

// ============================================================================
// 👑 PROJECT NEXUS — OS GENESIS EDITION (SYS03 MASTER DATASET V20.95)
// Súbor: shared/src/components/GlobalMediaPlayerDIM.jsx
// Status: 100% GROUNDED // 16 DIMENSIONS MEDIA HUD PLAYER
// CORE_VERSION: DIM-MEDIA-PLAYER V20.5-STABLE
// ============================================================================

import React, { useEffect, useMemo, useState } from "react";
import {
  Activity,
  AlertTriangle,
  Clock,
  Film,
  Headphones,
  MousePointer,
  Layers,
  Shield,
  X,
} from "lucide-react";
import {
  DIMENSIONS_MEDIA_REGISTER,
  getDimensionMediaData,
  SYSTEM_STANDBY_AWAITING,
} from "@shared/data/GlobalMediaPlayerDIM.js";
import { SoundFX } from "@shared/utils/SoundEngine.js";

const YT_HOST = "www.youtube.com";
const YT_PATH = "/embed/";
const YT_BASE = "https://" + YT_HOST + YT_PATH;

const formatYouTubeEmbedUrl = (rawUrl) => {
  const cleanUrl = String(rawUrl || "").trim();
  if (!cleanUrl || cleanUrl === SYSTEM_STANDBY_AWAITING) return SYSTEM_STANDBY_AWAITING;
  if (cleanUrl.includes(".mp4") || cleanUrl.includes(".mp3")) return cleanUrl;

  let videoId = "";
  if (cleanUrl.length === 11 && !cleanUrl.includes("/") && !cleanUrl.includes(".")) {
    videoId = cleanUrl;
  } else if (cleanUrl.includes("youtu.be/")) {
    const afterSlash = cleanUrl.split("youtu.be/") || "";
    videoId = afterSlash.split("?") || "";
  } else if (cleanUrl.includes("youtube.com/shorts/")) {
    const afterSlash = cleanUrl.split("youtube.com/shorts/") || "";
    videoId = afterSlash.split("?") || "";
  } else if (cleanUrl.includes("youtube.com/watch")) {
    const queryStr = cleanUrl.split("?") || "";
    const urlParams = new URLSearchParams(queryStr);
    videoId = urlParams.get("v") || "";
  } else if (cleanUrl.includes("/embed/")) {
    const afterEmbed = cleanUrl.split("/embed/") || "";
    videoId = afterEmbed.split("?") || "";
  } else {
    videoId = cleanUrl;
  }

  return videoId ? `${YT_BASE}${videoId}?rel=0` : SYSTEM_STANDBY_AWAITING;
};

const formatSeconds = (totalSecs) => {
  const mins = Math.floor(totalSecs / 60);
  const secs = totalSecs % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
};

const MEDIA_SWITCHES = [
  { key: "VP-V", label: "VP-V", name: "Vysvetľujúce Video", type: "video", group: "VIDEOPREHĽAD" },
  { key: "VP-K", label: "VP-K", name: "Krátke Shorts (9:16)", type: "video", group: "VIDEOPREHĽAD" },
  { key: "AP-HA", label: "AP-HA", name: "Hĺbková Analýza", type: "audio", group: "AUDIOPREHĽAD" },
  { key: "AP-EP", label: "AP-EP", name: "Exekutívny Prehľad", type: "audio", group: "AUDIOPREHĽAD" },
  { key: "AP-SK", label: "AP-SK", name: "Systematická Kritika", type: "audio", group: "AUDIOPREHĽAD" },
  { key: "AP-DD", label: "AP-DD", name: "Dialektická Debata", type: "audio", group: "AUDIOPREHĽAD" },
];

export const GlobalMediaPlayerDIM = ({
  initialDimId = "ID00",
  onClose = null,
  mode = "default",
  className = "",
}) => {
  const [activeDimId, setActiveDimId] = useState(initialDimId);
  const [activeTrackKey, setActiveTrackKey] = useState("VP-V");
  const [clickCount, setClickCount] = useState(0);
  const [playTimeSeconds, setPlayTimeSeconds] = useState(0);

  const dimData = useMemo(() => getDimensionMediaData(activeDimId), [activeDimId]);
  const activeColor = dimData.color || "#00F3FF";

  const rawActiveUrl = dimData?.links?.[activeTrackKey] || SYSTEM_STANDBY_AWAITING;
  const embedUrl = useMemo(() => formatYouTubeEmbedUrl(rawActiveUrl), [rawActiveUrl]);
  const isStandby = rawActiveUrl === SYSTEM_STANDBY_AWAITING || embedUrl === SYSTEM_STANDBY_AWAITING;
  const activeSwitchInfo = MEDIA_SWITCHES.find((s) => s.key === activeTrackKey);

  useEffect(() => {
    if (isStandby) return;
    const interval = setInterval(() => setPlayTimeSeconds((p) => p + 1), 1000);
    return () => clearInterval(interval);
  }, [isStandby, activeTrackKey, activeDimId]);

  const handleDimChange = (dimId) => {
    if (SoundFX?.click) SoundFX.click();
    setActiveDimId(dimId);
  };

  const handleSwitch = (key) => {
    if (SoundFX?.click) SoundFX.click();
    setClickCount((p) => p + 1);
    setActiveTrackKey(key);
  };

  return (
    <div
      className={`w-full min-w-full block bg-[#050A0E] border rounded-xl overflow-hidden shadow-2xl transition-all duration-300 ${className}`}
      style={{ borderColor: `${activeColor}40` }}
    >
      {/* 🌌 16 DIMENSIONS SELECTOR BAR */}
      <div className="p-2.5 bg-[#060C12] border-b border-gray-900 flex flex-wrap items-center justify-between gap-2">
        <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5" style={{ color: activeColor }} /> 16 DIMENZIÍ:
        </span>
        <div className="flex items-center gap-1 overflow-x-auto max-w-full pb-1">
          {Object.values(DIMENSIONS_MEDIA_REGISTER).map((dim) => {
            const isActive = activeDimId === dim.id;
             const itemColor = dim.color || "#00F3FF";

            return (
              <button
                key={dim.id}
                type="button"
                onClick={() => handleDimChange(dim.id)}
                className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider transition-all border shrink-0 cursor-pointer ${
                  isActive
                    ? "scale-105 z-10"
                    : "opacity-75 hover:opacity-100"
                }`}
                style={{
                  color: itemColor,
                  borderColor: isActive ? itemColor : `${itemColor}40`,
                  backgroundColor: isActive ? `${itemColor}25` : `${itemColor}08`,
                  boxShadow: isActive ? `0 0 10px ${itemColor}60` : "none",
                }}
              >
                {dim.id}
              </button>
            );
          })}
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded border border-gray-800 bg-gray-950 text-gray-400 hover:text-white hover:border-red-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* 🎛️ 6 CYBER SWITCHES PANEL */}
      <div className="p-3 bg-[#030609] border-b border-gray-900 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {MEDIA_SWITCHES.map((sw) => {
            const trackUrl = dimData?.links?.[sw.key];
            const hasCustomTrack = trackUrl && trackUrl !== SYSTEM_STANDBY_AWAITING;
            const isActive = activeTrackKey === sw.key;

            return (
              <button
                key={sw.key}
                type="button"
                onClick={() => handleSwitch(sw.key)}
                className={`relative px-3 py-1.5 rounded text-xs font-mono font-bold tracking-wider transition-all flex items-center gap-1.5 ${
                  isActive
                    ? "text-black shadow-lg scale-105 z-10"
                    : hasCustomTrack
                    ? "bg-gray-950 text-gray-200 border border-cyan-500/40 hover:border-cyan-400"
                    : "bg-gray-950/50 text-gray-600 border border-gray-900 hover:text-gray-400 opacity-60"
                }`}
                style={
                  isActive
                    ? { backgroundColor: activeColor, boxShadow: `0 0 12px ${activeColor}66` }
                    : {}
                }
              >
                {sw.type === "audio" ? <Headphones className="w-3.5 h-3.5" /> : <Film className="w-3.5 h-3.5" />}
                <span>{sw.label}</span>
              </button>
            );
          })}
        </div>

        <div className="text-[11px] font-mono text-gray-400 flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5 text-gray-500" />
          <span className="font-bold text-gray-200">{dimData.title}</span>
          <span className="text-gray-500">({activeSwitchInfo?.name})</span>
        </div>
      </div>

      {/* 📺 VIDEO / STANDBY DISPLAY */}
      <div
        className={`relative w-full aspect-video bg-black border-t border-gray-900 overflow-hidden ${
          mode === "inline" ? "w-full" : "min-h-[250px] md:min-h-[420px]"
        }`}
      >
        {isStandby ? (
          <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-[#030609] text-yellow-400 p-6 font-mono border border-yellow-500/10">
            <img
              src="https://ljyvsolsgliephsfkfgx.supabase.co/storage/v1/object/public/shop/images/system-standby_image/16x9_desktop/system-standby-16x9.jpg"
              alt="System Standby"
              className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none"
            />
            <AlertTriangle className="w-10 h-10 mb-3 animate-pulse text-yellow-400/80 z-10" />
            <span className="text-xs font-black uppercase tracking-widest text-yellow-400 z-10">
              [ {dimData.title} // STANDBY TRANSMISSION ]
            </span>
            <p className="text-[11px] text-gray-400 mt-2 text-center max-w-md z-10 font-mono">
              Relácia pre kognitívnu dimenziu {activeDimId} ({activeTrackKey}) je vo výrobnom štúdiu. Po nahratí bude stream automaticky sprístupnený.
            </p>
          </div>
        ) : (
          <iframe
            key={`${activeDimId}-${activeTrackKey}`}
            src={embedUrl}
            title={`${dimData.title} - ${activeTrackKey}`}
            className="absolute inset-0 w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        )}
      </div>

      {/* 📊 TELEMETRY & BOTTOM BAR */}
      {mode !== "inline" && (
        <div className="bg-[#020406] px-4 py-2 border-t border-gray-900 flex flex-wrap items-center justify-between text-[10px] font-mono text-gray-400 gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-cyan-400">
              <MousePointer className="w-3 h-3 text-cyan-500" />
              <span>INTERAKCIE:</span>
              <strong className="text-white">{clickCount} KLIKOV</strong>
            </span>
            <span className="flex items-center gap-1.5 text-emerald-400">
              <Clock className="w-3 h-3 text-emerald-500" />
              <span>ČAS STREAMU:</span>
              <strong className="text-white">{formatSeconds(playTimeSeconds)}</strong>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-gray-500">
              <Activity className="w-3 h-3 text-gray-600 animate-pulse" />
              <span>DIM-BUS // ID00-ID15</span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default GlobalMediaPlayerDIM;