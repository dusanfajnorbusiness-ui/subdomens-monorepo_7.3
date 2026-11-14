/* eslint-disable no-undef */

// ============================================================================
// 👑 PROJECT NEXUS — OS GENESIS EDITION (MEDIA DROPDOWN HUD CONTROLLER)
// Súbor: shared/src/components/MediaDropdownMenu.jsx
// Status: 100% GROUNDED // MULTI-PLAYER FLOATING HUD TRIGGER
// ============================================================================

import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, Headphones, Film, Shield, Layers, X } from "lucide-react";
import { GlobalMediaPlayer as GlobalMediaPlayerBRAND } from "@shared/components/GlobalMediaPlayerBRAND.jsx";
import { GlobalMediaPlayerDIM } from "@shared/components/GlobalMediaPlayerDIM.jsx";
import { SoundFX } from "@shared/utils/SoundEngine.js";
import { createPortal } from "react-dom";

export const MediaDropdownMenu = ({ themeColor = "#00F3FF" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null); // 'BRAND' | 'DIM' | null
  const menuRef = useRef(null);

  // Zatvorenie dropdownu klikom mimo
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Zatvorenie ESC klávesom
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setActiveModal(null);
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const openPlayer = (type) => {
    if (SoundFX?.click) SoundFX.click();
    setActiveModal(type);
    setIsOpen(false);
  };

  const closeModal = () => {
    if (SoundFX?.click) SoundFX.click();
    setActiveModal(null);
  };

  return (
    <div className="relative inline-block font-mono" ref={menuRef}>
      {/* 🎧 DROPDOWN TRIGGER BUTTON */}
      <button
        type="button"
        onClick={() => {
          if (SoundFX?.click) SoundFX.click();
          setIsOpen((prev) => !prev);
        }}
        className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs font-bold tracking-wider transition-all duration-300 border cursor-pointer active:scale-95"
        style={{
          color: themeColor,
          borderColor: `${themeColor}50`,
          backgroundColor: `${themeColor}12`,
          boxShadow: isOpen ? `0 0 15px ${themeColor}40` : `0 0 10px ${themeColor}20`,
        }}
      >
        <Headphones className="w-3.5 h-3.5" style={{ color: themeColor }} />
        <span className="hidden xs:inline">MEDIA HUD</span>
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          style={{ color: themeColor }}
        />
      </button>

      {/* 📋 DROPDOWN MENU — 100% CHAMELEON ADAPTÁCIA NA THEMECOLOR */}
      {isOpen && (
        <div 
          className="absolute right-0 mt-2 w-64 bg-[#050A0E] rounded-xl shadow-[0_0_25px_rgba(0,0,0,0.85)] overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150 border transition-all"
          style={{
            borderColor: `${themeColor || "#00F3FF"}50`,
            boxShadow: `0 0 20px ${themeColor || "#00F3FF"}25`,
          }}
        >
          {/* Lišta záhlavia dropdownu */}
          <div 
            className="p-2 border-b bg-black/50 flex items-center justify-between"
            style={{ borderColor: `${themeColor || "#00F3FF"}25` }}
          >
            <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">
              VYBERTE PREHRÁVAČ:
            </span>
            <span 
              className="w-1.5 h-1.5 rounded-full animate-ping"
              style={{ backgroundColor: themeColor || "#00F3FF" }}
            />
          </div>

          <div className="p-1.5 space-y-1">
            {/* 1. BRAND MANIFESTO */}
            <button
              type="button"
              onClick={() => openPlayer("BRAND")}
              className="w-full flex items-start gap-2.5 p-2 rounded-lg text-left text-gray-300 border border-transparent transition-all group cursor-pointer"
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${themeColor || "#00F3FF"}50`;
                e.currentTarget.style.backgroundColor = `${themeColor || "#00F3FF"}15`;
                e.currentTarget.style.color = themeColor || "#00F3FF";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "transparent";
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#D1D5DB";
              }}
            >
              <Shield 
                className="w-4 h-4 mt-0.5 group-hover:scale-110 transition-transform shrink-0" 
                style={{ color: themeColor || "#00F3FF" }}
              />
              <div>
                <div className="text-xs font-bold font-mono tracking-wide">BRAND MANIFESTO</div>
                <div className="text-[10px] text-gray-500">Agency • Protokol • Projekt</div>
              </div>
            </button>

            {/* 2. 16 DIMENSIONS HUD */}
            <button
              type="button"
              onClick={() => openPlayer("DIM")}
              className="w-full flex items-start gap-2.5 p-2 rounded-lg text-left text-gray-300 border border-transparent transition-all group cursor-pointer"
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${themeColor || "#00F3FF"}50`;
                e.currentTarget.style.backgroundColor = `${themeColor || "#00F3FF"}15`;
                e.currentTarget.style.color = themeColor || "#00F3FF";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "transparent";
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#D1D5DB";
              }}
            >
              <Layers 
                className="w-4 h-4 mt-0.5 group-hover:scale-110 transition-transform shrink-0" 
                style={{ color: themeColor || "#00F3FF" }}
              />
              <div>
                <div className="text-xs font-bold font-mono tracking-wide">16 DIMENSIONS HUD</div>
                <div className="text-[10px] text-gray-500">ID00 - ID15 Audioprehľady</div>
              </div>
            </button>
          </div>
        </div>
      )}


      {/* 📺 PLÁVAJÚCI CYBER-HUD MODAL VYCENTROVANÝ DO DOCUMENT.BODY CEZ PORTAL */}
      {activeModal && typeof document !== "undefined" && createPortal(
        <div 
          className="fixed inset-0 z-[999999] flex items-center justify-center p-3 sm:p-6"
          style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}
        >
          {/* 🌌 Nepriestrelné Cyber Tmavé Pozadie (Blackout 90% + Blur) */}
          <div
            className="absolute inset-0 bg-black/90 backdrop-blur-xl cursor-pointer"
            onClick={closeModal}
            style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
          />

         {/* 🪟 Vycentrovaný Kontajner Modálu (Opravené: jedno < a zrovnané tagy) */}
          <div 
            className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#050A0E] rounded-2xl flex flex-col my-auto transition-all duration-300"
            style={{
              border: `2px solid ${themeColor || "#00F3FF"}99`,
              boxShadow: `0 0 50px ${themeColor || "#00F3FF"}33, inset 0 0 20px ${themeColor || "#00F3FF"}15`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* 🛑 Globálna lišta s dynamickou farbou stránky */}
            <div 
              className="flex items-center justify-between px-4 py-2.5 bg-[#030609] sticky top-0 z-20 border-b"
              style={{ borderColor: `${themeColor || "#00F3FF"}40` }}
            >
              <span 
                className="text-xs font-mono font-bold tracking-wider flex items-center gap-2"
                style={{ color: themeColor || "#00F3FF" }}
              >
                <span 
                  className="w-2 h-2 rounded-full animate-ping" 
                  style={{ backgroundColor: themeColor || "#00F3FF" }}
                />
                [ NEXUS HUD // {activeModal === "BRAND" ? "TRINITY BRAND STREAM" : "16 KOGNITÍVNYCH DIMENZIÍ"} ]
              </span>
              <button
                type="button"
                onClick={closeModal}
                className="px-3 py-1 rounded bg-red-950/80 border border-red-500 text-red-400 hover:bg-red-900 hover:text-white font-mono text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-[0_0_10px_rgba(239,68,68,0.3)]"
              >
                <X className="w-3.5 h-3.5" />
                <span>ZATVORIŤ [ESC]</span>
              </button>
            </div>

            {/* 🎬 Obsah zvoleného prehrávača s odovzdaním farby stránky */}
            <div className="p-2 sm:p-4 bg-black">
              {activeModal === "BRAND" ? (
                <GlobalMediaPlayerBRAND
                  mediaId="MANIFESTO_GENESIS"
                  dimColor={themeColor || "#00F3FF"}
                />
              ) : (
                <GlobalMediaPlayerDIM
                  onClose={closeModal}
                  dimColor={themeColor || "#10B981"}
                />
              )}
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default MediaDropdownMenu;