import { getMediaData, SYSTEM_STANDBY_AWAITING } from "@shared/data/GlobalMediaPlayer.js";
import { SoundFX } from "@shared/utils/SoundEngine.js";
import { Activity, AlertTriangle, Clock, Film, Headphones, MousePointer, Radio, Shield } from "lucide-react";
/* eslint-disable no-undef */

// ============================================================================
// 👑 PROJECT NEXUS — OS GENESIS EDITION (SYS03 MASTER DATASET V20.95)
// Súbor: shared/src/components/GlobalMediaPlayer.jsx
// Status: 100% GROUNDED // FIXED LAYOUT COLLAPSE & REMOVED ROUTING LOOP
// CORE_VERSION: GLOBAL-MEDIA-PLAYER V20.5-STABLE
// ============================================================================

import React, { useEffect, useMemo, useState } from "react";

/**
 * 🛠️ HELPER: YouTube URL Parser & Embed Formatter (Strict No-Autoplay)
 */
const YT_HOST = "www.youtube.com";
const YT_PATH = "/embed/";
const YT_BASE = "https://" + YT_HOST + YT_PATH;

const formatYouTubeEmbedUrl = (rawUrl) => {
  const cleanUrl = String(rawUrl || "").trim();
  if (!cleanUrl || cleanUrl === SYSTEM_STANDBY_AWAITING) return SYSTEM_STANDBY_AWAITING;

  // 1. Priamy MP4 / MP3 odkaz zo Supabase Storage
  if (cleanUrl.includes(".mp4") || cleanUrl.includes(".mp3")) {
    return cleanUrl;
  }


  // 2. Extrakcia 11-miestneho Video ID z URL (Shorts, Watch, youtu.be, Embed)
  let videoId = "";
  if (cleanUrl.length === 11 && !cleanUrl.includes("/") && !cleanUrl.includes(".")) {
    videoId = cleanUrl;
  } else if (cleanUrl.includes("youtu.be/")) {
    const afterSlash = cleanUrl.split("youtu.be/") [1] || "";
    videoId = afterSlash.split("?") [0] || "";
  } else if (cleanUrl.includes("youtube.com/shorts/")) {
    const afterSlash = cleanUrl.split("youtube.com/shorts/") [1] || "";
    videoId = afterSlash.split("?") [0] || "";
  } else if (cleanUrl.includes("youtube.com/watch")) {
    const queryStr = cleanUrl.split("?") [1] || "";
    const urlParams = new URLSearchParams(queryStr);
    videoId = urlParams.get("v") || "";
  } else if (cleanUrl.includes("/embed/")) {
    const afterEmbed = cleanUrl.split("/embed/") [1] || "";
    videoId = afterEmbed.split("?") [0] || "";
  } else {
    videoId = cleanUrl;
  }

  return videoId ? (YT_BASE + videoId + "?rel=0") : SYSTEM_STANDBY_AWAITING;
};

const formatSeconds = (totalSecs) => {
  const mins = Math.floor(totalSecs / 60);
  const secs = totalSecs % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
};

const MEDIA_SWITCHES = [
  { key: "VP-V",  label: "VP-V",  name: "Vysvetľujúce Video", type: "video", group: "VIDEOPREHĽAD" },
  { key: "VP-K",  label: "VP-K",  name: "Krátke Shorts (9:16)", type: "video", group: "VIDEOPREHĽAD" },
  { key: "AP-HA", label: "AP-HA", name: "Hĺbková Analýza", type: "audio", group: "AUDIOPREHĽAD" },
  { key: "AP-EP", label: "AP-EP", name: "Exekutívny Prehľad", type: "audio", group: "AUDIOPREHĽAD" },
  { key: "AP-SK", label: "AP-SK", name: "Systematická Kritika", type: "audio", group: "AUDIOPREHĽAD" },
  { key: "AP-DD", label: "AP-DD", name: "Dialektická Debata", type: "audio", group: "AUDIOPREHĽAD" },
];

export const GlobalMediaPlayer = ({
  mediaId = "",
  item = null,
  customLinks = null,
  customTitle = null,
  dimColor = "#00B4D8",
  mode = "default", // 'default' | 'inline'
  className = ""
}) => {
  // 1. STAV PRE TRINITY MANIFESTO (MUSÍ BYŤ ÚPLNE PRVÝ!)
  const [currentManifestoKey, setCurrentManifestoKey] = useState(() => {
    const targetId = String(mediaId || item?.mediaId || item?.id || "").trim();
    if (["MANIFESTO_GENESIS", "MANIFESTO_PROTOCOL", "MANIFESTO_AGENCY"].includes(targetId)) {
      return targetId;
    }
    return "MANIFESTO_GENESIS";
  });

  const handleManifestoChange = (key) => {
    if (typeof SoundFX !== "undefined" && SoundFX?.click) {
      SoundFX.click();
    }
    setCurrentManifestoKey(key);
  };

  // 2. DÁTOVÝ OBJEKT MEDIÁLNEJ STOPY (TERAZ BEZPEČNE ČÍTA currentManifestoKey)
  const mediaObj = useMemo(() => {
    if (item && typeof item === "object") {
      const foundYt = item.youtubeId || item.youtubeUrl || item.ytId || item.youtube_id || item.yt_link;
      const foundLinks = item.youtubeLinks || item.links || item.mediaLinks;

      if (foundLinks) {
        return {
          title: String(item.title || item.name || "[ MEDIA NODE ]"),
          subtitle: String(item.subtitle || item.description || "NEXUS OS Genesis Media Stream"),
          links: foundLinks
        };
      }

      if (foundYt) {
        return {
          title: String(item.title || item.name || "[ MEDIA NODE ]"),
          subtitle: String(item.subtitle || item.description || "NEXUS OS Genesis Media Stream"),
          links: { "VP-V": foundYt, "VP-K": foundYt }
        };
      }
    }

    if (customLinks && typeof customLinks === "object") {
      return {
        title: String(customTitle || "[ CUSTOM MEDIA STREAM ]"),
        subtitle: "Štúdiový náhľad digitálneho aktíva",
        links: customLinks
      };
    }

    const targetId = String(currentManifestoKey || mediaId || item?.mediaId || item?.id || "MANIFESTO_GENESIS").trim();
    return getMediaData(targetId);
  }, [mediaId, item?.id, customTitle, currentManifestoKey]);

  // 3. INICIALIZÁCIA STOPY BEZ ZACYKLENIA (ACTIVE TRACK KEY)
  const [activeTrackKey, setActiveTrackKey] = useState(() => {
    const firstValid = MEDIA_SWITCHES.find(
      (sw) => mediaObj?.links?.[sw.key] && mediaObj.links[sw.key] !== SYSTEM_STANDBY_AWAITING
    );
    return firstValid ? firstValid.key : "VP-V";
  });

  const [clickCount, setClickCount] = useState(0);
  const [playTimeSeconds, setPlayTimeSeconds] = useState(0);

  const rawActiveUrl = mediaObj?.links?.[activeTrackKey] || SYSTEM_STANDBY_AWAITING;
  const embedUrl = useMemo(() => formatYouTubeEmbedUrl(rawActiveUrl), [rawActiveUrl]);
  const isStandby = rawActiveUrl === SYSTEM_STANDBY_AWAITING || embedUrl === SYSTEM_STANDBY_AWAITING;
  const activeSwitchInfo = MEDIA_SWITCHES.find((s) => s.key === activeTrackKey);

  // 4. STOPKY BEZ ZÁŤAŽE PRE ROUTER
  useEffect(() => {
    if (isStandby) return;
    const interval = setInterval(() => {
      setPlayTimeSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isStandby, activeTrackKey]);

  const handleSwitch = (key) => {
    if (typeof SoundFX !== "undefined" && SoundFX?.click) {
      SoundFX.click();
    }
    setClickCount((prev) => prev + 1);
    setActiveTrackKey(key);
  };

  return (
    <div
      className={`w-full min-w-full block bg-[#050A0E] border rounded-xl overflow-hidden shadow-2xl transition-all duration-300 ${className}`}
      style={{ borderColor: `${dimColor}40` }}
    >
      {/* 👑 TRINITY BRAND MANIFESTO SWITCHER */}
      <div className="p-2.5 bg-[#060C12] border-b border-gray-900 flex flex-wrap items-center justify-between gap-2">
        <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5 text-cyan-400" /> TRINITY MANIFESTO:
        </span>
        <div className="flex items-center gap-1.5">
          {[
            { key: "MANIFESTO_GENESIS",  label: "🌐 OS GENESIS", color: "#00F3FF" },
            { key: "MANIFESTO_PROTOCOL", label: "⚔️ PROTOKOL",   color: "#FF003C" },
            { key: "MANIFESTO_AGENCY",   label: "💼 AGENCY",     color: "#FFD700" },
          ].map((m) => {
            const isActive = currentManifestoKey === m.key;
            return (
              <button
                key={m.key}
                type="button"
                onClick={() => handleManifestoChange(m.key)}
                className={`px-2.5 py-1 rounded text-[11px] font-mono font-bold tracking-wider transition-all border ${
                  isActive
                    ? "bg-black text-white shadow-[0_0_10px_currentColor]"
                    : "bg-gray-950/60 text-gray-400 border-gray-800 hover:text-white"
                }`}
                style={{
                  borderColor: isActive ? m.color : undefined,
                  color: isActive ? m.color : undefined,
                }}
              >
                {m.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 🎛️ 6 CYBER SWITCHES PANEL */}
      <div className="p-3 bg-[#030609] border-b border-gray-900 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {MEDIA_SWITCHES.map((sw) => {
            const trackUrl = mediaObj?.links?.[sw.key];
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
                    ? { backgroundColor: dimColor, boxShadow: `0 0 12px ${dimColor}66` }
                    : {}
                }
              >
                {sw.type === "audio" ? (
                  <Headphones className="w-3.5 h-3.5" />
                ) : (
                  <Film className="w-3.5 h-3.5" />
                )}
                <span>{sw.label}</span>
                {hasCustomTrack && !isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                )}
              </button>
            );
          })}
        </div>

        <div className="text-[11px] font-mono text-gray-400 flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5 text-gray-500" />
          <span>REŽIM:</span>
          <span className="font-bold text-gray-200">
            {activeSwitchInfo?.name} ({activeSwitchInfo?.group})
          </span>
        </div>
      </div>

      {/* 📺 STRIKTNÝ ASPECT-VIDEO KONTAJNER (DYNAMICKÁ VÝŠKA PRE INLINE MODE) */}
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
              [ SYSTEM STANDBY // CDN STREAM AWAITING DEPLOYMENT ]
            </span>
            <p className="text-[11px] text-gray-400 mt-2 text-center max-w-md z-10 font-mono">
              Médiá pre zvolený režim ({activeTrackKey}) sú alokované v Standby zbernici. Prepnite na videoprehľad (VP-V / VP-K).
            </p>
          </div>
        ) : rawActiveUrl.includes(".mp4") ? (
          <video
            key={rawActiveUrl}
            src={rawActiveUrl}
            controls
            autoPlay={false}
            className="absolute inset-0 w-full h-full object-contain bg-black"
          />
        ) : rawActiveUrl.includes(".mp3") || rawActiveUrl.includes(".wav") ? (
          <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-[#050A0E] p-6 text-center">
            <div className="w-20 h-20 rounded-full border-2 border-cyan-500/40 flex items-center justify-center mb-4 animate-pulse shadow-[0_0_30px_rgba(0,243,255,0.2)]">
              <Headphones className="w-10 h-10 text-cyan-400" />
            </div>
            <span className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-4">
              {mediaObj.title} — {activeSwitchInfo?.name}
            </span>
            <audio
              key={rawActiveUrl}
              src={rawActiveUrl}
              controls
              className="w-full max-w-md accent-cyan-400"
            />
          </div>
        ) : (
          <iframe
            key={`${mediaId || item?.id || "player"}-${activeTrackKey}`}
            src={embedUrl}
            title={`${mediaObj.title} - ${activeTrackKey}`}
            className="absolute inset-0 w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        )}
      </div>

      {/* 📊 TELEMETRY & COUNTERS BOTTOM BAR (Skryté v režime mode="inline") */}
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
              <span>BITRATE: 320 KBPS</span>
            </span>
            <span className="text-gray-700">|</span>
            <span className="text-gray-400 uppercase">
              OS GENESIS // CORE MEDIA
            </span>
          </div>
        </div>
      )}
    </div>
  )
};