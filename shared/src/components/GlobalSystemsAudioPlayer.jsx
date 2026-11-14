/* eslint-disable no-undef */
// ============================================================================
// 👑 PROJECT NEXUS — OS GENESIS EDITION (SYS05 GLOBAL AUDIO ENGINE V20.95)
// Súbor: shared/src/components/GlobalSystemsAudioPlayer.jsx
// Status: 100% GROUNDED // PERSISTENT CONTINUITY // AUTO-MODAL 10s SHIELD
// ============================================================================

import React, { useState, useEffect, useRef } from "react";
import {
  Play,
  Pause,
  Square,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Repeat,
  ListMusic,
  Headphones,
  Sliders,
  X,
  Activity,
  Radio
} from "lucide-react";
import { GLOBAL_SYSTEMS_AUDIO_TRACKS } from "@shared/data/GlobalSystemsAudioPlayer.js";

export const CORE_VERSION = "GS-AUDIO-PLAYER V20.95";

export const GlobalSystemsAudioPlayer = ({
  themeColor = "#00f3ff",
  autoPromptDelay = 10000 // 10 sekúnd kánon
}) => {
  const audioRef = useRef(null);

  // 1. Perzistentný stav z localStorage
  const [trackIndex, setTrackIndex] = useState(() => {
    const saved = localStorage.getItem("nexus_audio_track_idx");
    const parsed = parseInt(saved, 10);
    return !isNaN(parsed) && parsed >= 0 && parsed < GLOBAL_SYSTEMS_AUDIO_TRACKS.length ? parsed : 0;
  });

  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoopingAll, setIsLoopingAll] = useState(() => {
    return localStorage.getItem("nexus_audio_loop_all") !== "false";
  });
  const [volume, setVolume] = useState(() => {
    const saved = localStorage.getItem("nexus_audio_volume");
    return saved !== null ? parseFloat(saved) : 0.6;
  });
  const [isMuted, setIsMuted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("player"); // "player" | "playlist"

  const [selectedTracks, setSelectedTracks] = useState(() => {
    const saved = localStorage.getItem("nexus_audio_selected_ids");
    if (saved) {
      try {
        const arr = JSON.parse(saved);
        if (Array.isArray(arr) && arr.length > 0) return arr;
      } catch (e) {
        // fallback
      }
    }
    return GLOBAL_SYSTEMS_AUDIO_TRACKS.map((t) => t.id);
  });

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const activeTrack = GLOBAL_SYSTEMS_AUDIO_TRACKS[trackIndex] || GLOBAL_SYSTEMS_AUDIO_TRACKS;

  // 2. ⚡ V20 AUTO-PROMPT: ZOBRAZENIE MODÁLU PO 10 SEKUNDÁCH
  useEffect(() => {
    const hasPrompted = sessionStorage.getItem("nexus_audio_prompted_v20");
    if (!hasPrompted) {
      const timer = setTimeout(() => {
        setIsModalOpen(true);
        sessionStorage.setItem("nexus_audio_prompted_v20", "true");
      }, autoPromptDelay);

      return () => clearTimeout(timer); // 🛡️ ZÁRUKA V20: Žiadny memory leak pri rýchlom unmount
    }
  }, [autoPromptDelay]);

  // 3. Synchronizácia Audio elementu s nastaveniami
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  // 4. Perzistencia
  useEffect(() => {
    localStorage.setItem("nexus_audio_track_idx", trackIndex.toString());
  }, [trackIndex]);

  useEffect(() => {
    localStorage.setItem("nexus_audio_loop_all", isLoopingAll.toString());
  }, [isLoopingAll]);

  useEffect(() => {
    localStorage.setItem("nexus_audio_selected_ids", JSON.stringify(selectedTracks));
  }, [selectedTracks]);

  useEffect(() => {
    localStorage.setItem("nexus_audio_volume", volume.toString());
  }, [volume]);

  // 5. Prehrávacie handlery
  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn("[AUDIO_SHIELD] Autoplay interaction required:", err);
          setIsPlaying(false);
        });
    }
  };

  const handleStop = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handleNext = () => {
    const validTracks = GLOBAL_SYSTEMS_AUDIO_TRACKS.filter((t) => selectedTracks.includes(t.id));
    if (validTracks.length === 0) return;

    let nextIdx = trackIndex + 1;
    if (nextIdx >= GLOBAL_SYSTEMS_AUDIO_TRACKS.length) {
      nextIdx = 0;
    }

    let loops = 0;
    while (!selectedTracks.includes(GLOBAL_SYSTEMS_AUDIO_TRACKS[nextIdx].id) && loops < GLOBAL_SYSTEMS_AUDIO_TRACKS.length) {
      nextIdx = (nextIdx + 1) % GLOBAL_SYSTEMS_AUDIO_TRACKS.length;
      loops++;
    }

    setTrackIndex(nextIdx);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    }, 50);
  };

  const handlePrev = () => {
    let prevIdx = trackIndex - 1;
    if (prevIdx < 0) {
      prevIdx = GLOBAL_SYSTEMS_AUDIO_TRACKS.length - 1;
    }
    setTrackIndex(prevIdx);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    }, 50);
  };

  const handleTrackEnded = () => {
    if (isLoopingAll) {
      handleNext();
    } else {
      setIsPlaying(false);
    }
  };

  const toggleTrackSelection = (id) => {
    setSelectedTracks((prev) => {
      if (prev.includes(id)) {
        if (prev.length === 1) return prev; // aspoň 1 musí zostať
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const formatTime = (secs) => {
    const s = Math.floor(secs || 0);
    const m = Math.floor(s / 60);
    const rem = s % 60;
    return `${String(m).padStart(2, "0")}:${String(rem).padStart(2, "0")}`;
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={activeTrack?.url}
        onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime || 0)}
        onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
        onEnded={handleTrackEnded}
      />

      {/* 👑 1. PULZUJÚCE HUD TLAČIDLO (VŽDY DOSTUPNÉ V PRAVOM DOLNOM ROHU) */}
      <div className="fixed bottom-4 right-4 z-40 select-none font-mono">
        <button
          onClick={() => setIsModalOpen(true)}
          style={{
            borderColor: themeColor,
            boxShadow: isPlaying ? `0 0 20px rgba(0, 243, 255, 0.4)` : `0 0 10px rgba(0, 0, 0, 0.8)`
          }}
          className={`flex items-center gap-2.5 px-3.5 py-2.5 bg-black/90 backdrop-blur-md border rounded-none text-white hover:bg-neutral-900 transition-all duration-300 ${
            !isPlaying ? "animate-pulse" : ""
          }`}
          title="Otvoriť Deep Work Audio Modal"
        >
          {isPlaying ? (
            <Activity size={18} style={{ color: themeColor }} className="animate-pulse" />
          ) : (
            <Headphones size={18} style={{ color: themeColor }} />
          )}

          <div className="flex flex-col text-left">
            <span className="text-[10px] font-black tracking-widest uppercase flex items-center gap-1" style={{ color: themeColor }}>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping inline-block" />
              DEEP WORK
            </span>
            <span className="text-[9px] text-slate-300 truncate max-w-[110px]">
              {isPlaying ? activeTrack?.title : "READY TO STREAM"}
            </span>
          </div>

          <Sliders size={14} className="text-slate-400 ml-1 hover:text-white" />
        </button>
      </div>

      {/* 👑 2. INTERAKTÍVNY MODAL S OPACITY & BACKDROP BLUR (10s AUTO-TRIGGER / ON CLICK) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm select-none font-mono animate-fadeIn">
          <div
            style={{ borderColor: themeColor, boxShadow: `0 0 35px rgba(0, 243, 255, 0.25)` }}
            className="w-full max-w-lg bg-neutral-950/95 border text-white shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Hlavička Modálu */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-black/60">
              <div className="flex items-center gap-2.5">
                <Radio size={18} style={{ color: themeColor }} className="animate-pulse" />
                <div>
                  <h3 className="text-xs font-black tracking-widest uppercase text-white">
                    OS GENESIS // DEEP WORK FREQUENCY
                  </h3>
                  <p className="text-[9px] text-slate-400">
                    B2B NEURAL KULISA & AKUSTICKÉ KOTVY (SUPABASE CDN)
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                title="Minimalizovať modal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Prepínač Tabov: Prehrávač vs. Editácia Playlistu */}
            <div className="grid grid-cols-2 border-b border-white/10 text-xs text-center font-bold">
              <button
                onClick={() => setActiveTab("player")}
                style={{
                  borderBottomColor: activeTab === "player" ? themeColor : "transparent",
                  color: activeTab === "player" ? themeColor : "#94a3b8"
                }}
                className="py-2.5 border-b-2 hover:bg-white/5 transition-all flex items-center justify-center gap-2"
              >
                <Headphones size={14} /> RIADIACI MODUL
              </button>
              <button
                onClick={() => setActiveTab("playlist")}
                style={{
                  borderBottomColor: activeTab === "playlist" ? themeColor : "transparent",
                  color: activeTab === "playlist" ? themeColor : "#94a3b8"
                }}
                className="py-2.5 border-b-2 hover:bg-white/5 transition-all flex items-center justify-center gap-2"
              >
                <ListMusic size={14} /> UPRAVIŤ FREKVENCIE ({selectedTracks.length}/8)
              </button>
            </div>

            {/* TAB 1: RIADIACI MODUL */}
            {activeTab === "player" && (
              <div className="p-6 flex flex-col gap-5">
                {/* Obrazovka tracku */}
                <div
                  style={{ borderColor: "rgba(0, 243, 255, 0.2)" }}
                  className="p-4 bg-black/70 border flex flex-col gap-2 relative overflow-hidden"
                >
                  <div className="flex justify-between items-center text-[10px] text-cyan-400/80">
                    <span>{activeTrack?.badge}</span>
                    <span className="flex items-center gap-1">
                      <Activity size={12} className={isPlaying ? "animate-pulse" : ""} />
                      {isPlaying ? "STREAMING ACTIVE" : "STANDBY"}
                    </span>
                  </div>

                  <h2 className="text-base font-bold text-white tracking-wide truncate">
                    {activeTrack?.title}
                  </h2>

                  {/* Časová os */}
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>

                  <div className="w-full bg-white/10 h-1.5 overflow-hidden">
                    <div
                      style={{ width: `${(currentTime / (duration || 1)) * 100}%`, backgroundColor: themeColor }}
                      className="h-full transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Tlačidlá Prehrávania */}
                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={handlePrev}
                    className="p-2 border border-white/10 hover:border-cyan-400 hover:text-cyan-400 transition-all text-slate-300"
                    title="Predchádzajúca skladba"
                  >
                    <SkipBack size={18} />
                  </button>

                  <button
                    onClick={togglePlay}
                    style={{
                      borderColor: themeColor,
                      backgroundColor: isPlaying ? "rgba(0, 243, 255, 0.2)" : "rgba(0, 243, 255, 0.05)",
                      boxShadow: isPlaying ? `0 0 20px rgba(0, 243, 255, 0.3)` : "none"
                    }}
                    className="p-3.5 border text-white hover:scale-105 active:scale-95 transition-all"
                    title={isPlaying ? "Pozastaviť" : "Spustiť frekvenciu"}
                  >
                    {isPlaying ? <Pause size={22} style={{ color: themeColor }} /> : <Play size={22} style={{ color: themeColor }} />}
                  </button>

                  <button
                    onClick={handleStop}
                    className="p-2 border border-white/10 hover:border-red-500 hover:text-red-400 transition-all text-slate-300"
                    title="Zastaviť"
                  >
                    <Square size={18} />
                  </button>

                  <button
                    onClick={handleNext}
                    className="p-2 border border-white/10 hover:border-cyan-400 hover:text-cyan-400 transition-all text-slate-300"
                    title="Nasledujúca skladba"
                  >
                    <SkipForward size={18} />
                  </button>
                </div>

                {/* Ovládanie Hlasitosti a Slučky */}
                <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs text-slate-400">
                  <div className="flex items-center gap-2 flex-1 max-w-[200px]">
                    <button onClick={() => setIsMuted(!isMuted)} className="hover:text-white transition-colors">
                      {isMuted ? <VolumeX size={16} className="text-red-400" /> : <Volume2 size={16} />}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={isMuted ? 0 : volume}
                      onChange={(e) => {
                        setVolume(parseFloat(e.target.value));
                        if (isMuted) setIsMuted(false);
                      }}
                      className="w-full accent-cyan-400 cursor-pointer h-1 bg-white/20"
                    />
                    <span className="text-[10px] font-mono">{Math.round((isMuted ? 0 : volume) * 100)}%</span>
                  </div>

                  <button
                    onClick={() => setIsLoopingAll(!isLoopingAll)}
                    style={{ color: isLoopingAll ? themeColor : "#64748b" }}
                    className="flex items-center gap-1.5 text-[10px] font-bold tracking-wider hover:opacity-80 transition-all uppercase"
                  >
                    <Repeat size={14} />
                    {isLoopingAll ? "SLUČKA AKTÍVNA" : "JEDNORAZOVO"}
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: EDITÁCIA PLAYLISTU & CHECKBOXY */}
            {activeTab === "playlist" && (
              <div className="p-4 flex flex-col gap-3 max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-cyan-500/20">
                <p className="text-[10px] text-slate-400 leading-relaxed">
                  Zaškrtni skladby, ktoré majú rotovať v tvojej Deep Work relácii. Kliknutím na názov okamžite prepneš skladbu:
                </p>

                <div className="flex flex-col gap-1.5">
                  {GLOBAL_SYSTEMS_AUDIO_TRACKS.map((track, idx) => {
                    const isCurrent = trackIndex === idx;
                    const isChecked = selectedTracks.includes(track.id);

                    return (
                      <div
                        key={track.id}
                        style={{
                          borderColor: isCurrent ? themeColor : "rgba(255, 255, 255, 0.08)",
                          backgroundColor: isCurrent ? "rgba(0, 243, 255, 0.08)" : "rgba(0, 0, 0, 0.4)"
                        }}
                        className="flex items-center justify-between p-2 border text-xs transition-all hover:border-cyan-500/40"
                      >
                        <div className="flex items-center gap-2.5 overflow-hidden">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleTrackSelection(track.id)}
                            className="accent-cyan-400 cursor-pointer w-4 h-4"
                            title="Zahrnúť do slučky"
                          />
                          <button
                            onClick={() => {
                              setTrackIndex(idx);
                              setTimeout(() => {
                                if (audioRef.current) {
                                  audioRef.current.currentTime = 0;
                                  audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
                                }
                              }, 50);
                            }}
                            className="text-left truncate hover:text-cyan-300 transition-colors"
                          >
                            <span className={`block font-bold truncate ${isCurrent ? "text-cyan-400" : "text-slate-200"}`}>
                              {track.title}
                            </span>
                            <span className="text-[9px] text-slate-500 block">
                              {track.badge}
                            </span>
                          </button>
                        </div>

                        {isCurrent && isPlaying && (
                          <Activity size={14} style={{ color: themeColor }} className="animate-pulse shrink-0 ml-2" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Päta modálu */}
            <div className="px-5 py-3 border-t border-white/10 bg-black/70 flex items-center justify-between text-[11px]">
              <span className="text-slate-400 text-[10px]">
                STAV: {isPlaying ? "PREHRÁVA SA" : "POZASTAVENÉ"}
              </span>
              <button
                onClick={() => setIsModalOpen(false)}
                style={{ borderColor: themeColor, color: themeColor }}
                className="px-4 py-1.5 border text-xs font-bold hover:bg-cyan-500/10 active:scale-95 transition-all"
              >
                POKRAČOVAŤ NA WEBE ➔
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GlobalSystemsAudioPlayer;