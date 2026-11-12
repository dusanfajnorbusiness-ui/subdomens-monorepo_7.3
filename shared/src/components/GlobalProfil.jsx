// ============================================================================
// ⚠️ LOKÁLNE IMPORTY (ZAKOMENTOVANÉ PRE STABILITU CANVAS NÁHĽADU) ⚠️
// ============================================================================

import { parseNexusFormat } from "@shared/utils/nexusParser.js";
import GlobalShopHistory from "@shop/components/GlobalShopHistory.jsx";
import { Activity, AlertTriangle, Ban, Chrome, Crown, Database, Edit3, Facebook, Globe, HeartPulse, Instagram, Mail, Maximize2, MessageCircle, Minimize2, Music2, Phone, Share2, User, Wallet, X, Youtube } from "lucide-react";
import React, { useEffect, useState } from "react";
import { NexusThemePropsProvider } from "@shared/components/NexusThemePropsContext.jsx";
// import { trackPresence } from "../utils/Blog-PresenceEngine"; // 🛑 ZAKOMENTOVANÉ: Chýbajúci modul
const trackPresence = () => {}; // Defenzívny mock pre V20 stav bez chýb
import { getTierColor } from "@shared/data/nexusConfig.js";

// ⚡ INJEKCIA: Globálne navigačné a scrollovacie moduly
import { GlobalHamburgerMenu } from "@shared/components/GlobalHamburgerMenu.jsx";
import { GlobalComponents } from "@shared/components/GlobalComponents.jsx";

// ============================================================================
// 🌟 POMOCNÝ KOMPONENT: TOOLTIP (ČISTÉ CENTROVANIE)
// ============================================================================
export const SubdomainStandbyPage = () => {
     const { activeSubId, themeColor, currentSector, currentSub, setSubdomain } = useNexusThemeProps();
     // Všetko je okamžite prepojené a podriadené aktívnej subdoméne!
   };

const TooltipHover = ({ text, dimColor = "#39FF14", position = "top" }) => {
  const isTop = position === "top";

  const animationClass = isTop
    ? "translate-y-2 group-hover/tooltip:translate-y-0"
    : "-translate-y-2 group-hover/tooltip:translate-y-0";

  return (
    <div
      className={`absolute ${isTop ? "bottom-[calc(100%+8px)]" : "top-[calc(100%+8px)]"} left-1/2 -translate-x-1/2 w-max max-w-[200px] opacity-0 group-hover/tooltip:opacity-100 invisible group-hover/tooltip:visible transition-all duration-300 pointer-events-none z-[999999] ${animationClass}`}
    >
      <div
        className="bg-[#050505] border rounded-xl p-3 shadow-[0_10px_40px_rgba(0,0,0,0.9)] backdrop-blur-xl text-center break-words"
        style={{
          borderColor: `${dimColor}50`,
          boxShadow: `0 5px 20px ${dimColor}30`,
        }}
      >
        <span className="text-[10px] text-white/90 font-mono leading-relaxed normal-case tracking-normal whitespace-pre-wrap block">
          {text}
        </span>
      </div>
      <div
        className={`w-2.5 h-2.5 rotate-45 bg-[#050505] absolute left-1/2 -translate-x-1/2 ${isTop ? "border-b border-r -bottom-1.5" : "border-t border-l -top-1.5"}`}
        style={{ borderColor: `${dimColor}50` }}
      />
    </div>
  );
};

const getPresenceStatus = (statusInput) => {
  if (!statusInput) return "OFFLINE";
  if (typeof statusInput === "string") return statusInput;
  if (typeof statusInput === "boolean") return statusInput ? "ONLINE" : "OFFLINE";
  return statusInput?.is_online || statusInput?.status === "online" ? "ONLINE" : "OFFLINE";
};

const getAvatarColor = (identifier) => {
  if (!identifier) return "from-purple-600 to-indigo-600";
  const str = typeof identifier === "object" 
    ? String(identifier.role || identifier.email || identifier.id || "nexus") 
    : String(identifier);
    
  const colors = [
    "from-purple-600 to-indigo-600",
    "from-cyan-500 to-blue-600",
    "from-emerald-500 to-teal-600",
    "from-amber-500 to-orange-600",
    "from-rose-500 to-pink-600",
    "from-fuchsia-600 to-purple-600"
  ];
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

const getRoleColor = (role) => {
  const r = String(role || "").toUpperCase();
  if (r.includes("ARCHITECT") || r.includes("ADMIN")) return "border-purple-500 text-purple-400 bg-purple-950/50";
  if (r.includes("PRO") || r.includes("VIP")) return "border-cyan-500 text-cyan-400 bg-cyan-950/50";
  return "border-emerald-500 text-emerald-400 bg-emerald-950/50";
};

export const GlobalProfil = ({
  isOpen,
  onClose,
  isMaximized,
  onToggleMaximize,
  profileData,
  title = "Záznam Entity",
  loading = false,
  error = null,
  fallbackName = "Neznáma Entita",
}) => {
  const [localNote, setLocalNote] = useState("");
  const [isEditingNote, setIsEditingNote] = useState(false);

  useEffect(() => {
    if (profileData?.email) {
      const notes = JSON.parse(
        localStorage.getItem("nexus_profile_notes") || "{}",
      );
      setLocalNote(notes[profileData.email] || "");
    }
  }, [profileData, isOpen]);

  const saveNote = (newNote) => {
    if (!profileData?.email) return;
    const notes = JSON.parse(
      localStorage.getItem("nexus_profile_notes") || "{}",
    );
    if (newNote.trim()) {
      notes[profileData.email] = newNote.trim();
    } else {
      delete notes[profileData.email];
    }
    localStorage.setItem("nexus_profile_notes", JSON.stringify(notes));
    setLocalNote(newNote.trim());
    setIsEditingNote(false);
  };

  if (!isOpen) return null;

  if (loading) {
    return (
      <div className="fixed inset-0 z-[999999] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 transition-all">
        <div className="flex flex-col items-center justify-center h-full">
          <Activity size={64} className="animate-pulse text-[#00FFFF] mb-6" />
          <p className="font-mono text-sm uppercase tracking-widest text-white/50">
            Sťahujem Dossier z Cloudu...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 z-[999999] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 transition-all">
        <div className="bg-[#050a0e] border border-red-500 rounded-3xl p-10 flex flex-col items-center text-center shadow-[0_0_50px_rgba(239,68,68,0.3)]">
          <AlertTriangle size={64} className="text-red-500 mb-6" />
          <p className="font-mono text-sm uppercase tracking-widest text-red-500 mb-8">
            {error}
          </p>
          <button
            onClick={onClose}
            className="bg-red-500/20 hover:bg-red-500 text-red-500 hover:text-black border border-red-500/50 px-8 py-3 rounded-xl font-black uppercase tracking-widest transition-colors"
          >
            Zavrieť
          </button>
        </div>
      </div>
    );
  }

  const data = profileData || {};
  const tColor =
    data.tier === "BANNED" ? "#ef4444" : getTierColor(data.tier || "FREE");
  const isBanned = data.tier === "BANNED";
  const hasCrown = data.tier === "ARCHITECT" || data.tier === "MASTER";

  const presence = getPresenceStatus(data.lastActive);
  const semanticColor = getAvatarColor(data.avatar, tColor);

  return (
    <div className="fixed inset-0 z-[999999] bg-black/90 backdrop-blur-md flex items-center justify-center p-2 md:p-8 transition-all">
      {/* 🛑 FIX: Vynútenie správnej sady liniek pre Hamburger. Zmení kontext na 'profil' */}
      <GlobalComponents themeColor={tColor} />
      <GlobalHamburgerMenu activeTab="profil" themeColor={tColor} />
      <div
        className={`bg-[#050a0e] border flex flex-col relative animate-in zoom-in-95 duration-200 shadow-[0_0_50px_rgba(0,0,0,0.8)] transition-all overflow-hidden ${isMaximized ? "w-full h-full rounded-none border-0" : "max-w-6xl w-[95vw] md:w-full h-[90vh] rounded-[2rem] border-2"}`}
        style={{ borderColor: isMaximized ? "transparent" : tColor }}
      >
        {/* HLAVIČKA */}
        <div className="flex justify-between items-center p-4 md:p-6 border-b border-white/5 shrink-0 bg-white/[0.02] relative z-20 rounded-t-[2rem]">
          <div
            className="font-black text-[11px] tracking-widest text-white uppercase flex items-center gap-2 cursor-default"
            title="Dátový Záznam Entity uložený vo Firebase DB."
          >
            <Database size={14} style={{ color: tColor }} /> {title}
          </div>

          <div className="flex gap-2">
            <button
              onClick={onToggleMaximize}
              title={isMaximized ? "Zmenšiť okno" : "Zväčšiť na celú obrazovku"}
              className="hidden sm:block text-white/40 hover:text-white transition-colors p-2 bg-black/40 rounded-lg border border-white/5"
            >
              {isMaximized ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>
            <button
              onClick={onClose}
              title="Zatvoriť Dossier"
              className="text-white/40 hover:text-[#FF003C] transition-colors p-2 bg-black/40 rounded-lg border border-white/5"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* TELO MODALU (Scrollovanie ako celok) */}
        <div
          id="nexus-profil-scroll"
          className="flex-1 p-4 md:p-6 lg:p-8 w-full flex flex-col lg:flex-row gap-6 min-h-0 overflow-y-auto custom-scrollbar relative z-20 rounded-b-[2rem]"
        >
          {/* ĽAVÝ PANEL */}
          <div className="w-full lg:w-1/3 flex flex-col gap-4 shrink-0 pb-4 lg:pb-0 lg:pr-2">
            {/* KARTA 1: IDENTITA */}
            <div
              id="nexus-profil-header"
              className="bg-black/40 border border-white/5 rounded-2xl p-5 flex flex-row items-center gap-4 relative shrink-0"
            >
              <div
                className="absolute top-0 left-0 w-1 h-full rounded-l-2xl"
                style={{ backgroundColor: semanticColor }}
              />

              <div className="relative shrink-0 group/tooltip hover:z-[100]">
                <div
                  className={`w-16 h-16 md:w-20 md:h-20 overflow-hidden rounded-full border-2 shadow-[0_0_20px_rgba(0,0,0,0.5)] bg-black shrink-0 ${isBanned ? "border-red-500 text-red-500" : ""}`}
                  style={
                    !isBanned
                      ? { borderColor: semanticColor, color: semanticColor }
                      : {}
                  }
                >
                  {data.avatar ? (
                    <img
                      src={data.avatar}
                      alt="Avatar"
                      className={`w-full h-full object-cover ${isBanned ? "grayscale opacity-50" : ""}`}
                    />
                  ) : (
                    <User size={32} className="m-auto mt-4 md:mt-5" />
                  )}
                </div>
                {!isBanned && (
                  <div
                    className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-[#050a0e] ${presence.ping ? "animate-pulse" : ""}`}
                    style={{ backgroundColor: presence.color }}
                  />
                )}
                <TooltipHover
                  text={`Status: ${presence.label}\nAura: ${semanticColor}`}
                  dimColor={presence.color}
                  position="bottom"
                />
              </div>

              <div className="flex flex-col min-w-0 flex-1 text-left">
                <div className="flex items-center gap-2 w-full mb-1">
                  <div className="relative group/tooltip hover:z-[100] flex-1 min-w-0">
                    <h2
                      className={`text-lg md:text-xl font-black uppercase tracking-wider truncate cursor-help ${isBanned ? "text-red-500 line-through opacity-70" : "text-white"}`}
                      style={!isBanned ? { color: semanticColor } : {}}
                    >
                      {data.displayName ||
                        (data.isGuest
                          ? "GUEST"
                          : data.email
                            ? data.email.split("@")[0]
                            : fallbackName)}
                    </h2>
                    <TooltipHover
                      text={`Zaregistrované meno entity v Systéme.`}
                      dimColor={semanticColor}
                      position="bottom"
                    />
                  </div>
                  {hasCrown && (
                    <div className="relative group/tooltip hover:z-[100] shrink-0">
                      <Crown size={18} style={{ color: tColor }} />
                      <TooltipHover
                        text="Elitná Entita Matrixu"
                        dimColor={tColor}
                        position="bottom"
                      />
                    </div>
                  )}
                </div>

                <div className="relative group/tooltip hover:z-[100] w-max max-w-full">
                  <p className="text-[9px] text-white/40 font-mono truncate w-full mb-2 cursor-help">
                    {data.email}
                  </p>
                  <TooltipHover
                    text={`Základné Databázové ID (E-mail)`}
                    dimColor="#ffffff"
                    position="bottom"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <div className="relative group/tooltip hover:z-[100]">
                    <span
                      className={`inline-block text-[9px] font-black uppercase tracking-[3px] px-2 py-0.5 rounded border shrink-0 cursor-help ${isBanned ? "text-red-500 border-red-500/50 bg-red-500/10" : ""}`}
                      style={
                        !isBanned
                          ? {
                              color: tColor,
                              borderColor: tColor,
                              backgroundColor: `${tColor}10`,
                            }
                          : {}
                      }
                    >
                      {data.tier || "FREE"}
                    </span>
                    <TooltipHover
                      text={`Oprávnenie k zápisu a čítaniu dát.`}
                      dimColor={tColor}
                      position="bottom"
                    />
                  </div>

                  <div className="flex-1 min-w-0 ml-1">
                    {isEditingNote ? (
                      <input
                        type="text"
                        maxLength={25}
                        value={localNote}
                        onChange={(e) => setLocalNote(e.target.value)}
                        onBlur={() => saveNote(localNote)}
                        onKeyDown={(e) =>
                          e.key === "Enter" && saveNote(localNote)
                        }
                        placeholder="Poznámka (max 25)..."
                        autoFocus
                        className="bg-black/60 border border-white/20 focus:border-white/50 rounded px-2 py-1 text-[9px] font-mono text-white/80 w-full outline-none transition-colors"
                      />
                    ) : (
                      <div className="relative group/tooltip hover:z-[100] cursor-pointer w-full flex justify-end">
                        <div
                          onClick={() => setIsEditingNote(true)}
                          className="flex items-center justify-end gap-1.5 w-full"
                        >
                          <Edit3
                            size={10}
                            className="text-white/20 group-hover/tooltip:text-white/60 shrink-0 transition-colors"
                          />
                          <span
                            className={`text-[9px] font-mono truncate ${localNote ? "text-yellow-500/80 italic" : "text-white/20 italic group-hover/tooltip:text-white/40 transition-colors"}`}
                          >
                            {localNote || "Poznámka (25z)"}
                          </span>
                        </div>
                        <TooltipHover
                          text={
                            localNote
                              ? `Poznámka Architekta:\n${localNote}`
                              : "Pridať lokálnu poznámku (Vidí iba Architekt)."
                          }
                          dimColor="#eab308"
                          position="bottom"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {!isBanned && (
              <>
                {/* KARTA 2: ZDRAVOTNÝ STAV */}
                {(data.diagnosis || data.medication) && (
                  <div
                    id="nexus-profil-health"
                    className="bg-black/40 border border-white/5 rounded-2xl p-5 flex flex-col gap-3 shrink-0"
                  >
                    <div className="relative group/tooltip hover:z-[100] w-max">
                      <div className="text-[9px] uppercase font-black text-white/30 tracking-widest border-b border-white/5 pb-2 flex items-center gap-2 cursor-help">
                        <HeartPulse size={12} /> Zdravotný Stav
                      </div>
                      <TooltipHover
                        text="Bio-metriky a zdravotné patche (Nastavené operátorom)."
                        dimColor="#00FFFF"
                        position="bottom"
                      />
                    </div>
                    <div className="flex flex-col gap-3 mt-1">
                      {data.diagnosis && (
                        <div className="relative group/tooltip hover:z-[100]">
                          <span className="text-[8px] uppercase font-black text-[#FF003C] tracking-widest cursor-help">
                            Diagnóza
                          </span>
                          <TooltipHover
                            text="Chyby hardvéru / Limitácie."
                            dimColor="#FF003C"
                            position="bottom"
                          />
                          <p className="text-[11px] text-white/70 font-mono mt-1 break-words">
                            {data.diagnosis}
                          </p>
                        </div>
                      )}
                      {data.medication && (
                        <div className="relative group/tooltip hover:z-[100]">
                          <span className="text-[8px] uppercase font-black text-[#00FFFF] tracking-widest cursor-help">
                            Medikácia
                          </span>
                          <TooltipHover
                            text="Aktívne nápravné protokoly."
                            dimColor="#00FFFF"
                            position="bottom"
                          />
                          <p className="text-[11px] text-white/70 font-mono mt-1 break-words">
                            {data.medication}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* KARTA 3: KONTAKTY (5x5 GRID & CENTROVANIE) */}
                {(data.email ||
                  data.phone ||
                  data.facebook ||
                  data.google ||
                  data.youtube1 ||
                  data.youtube2 ||
                  data.tiktok ||
                  data.instagram ||
                  data.whatsapp ||
                  data.www) && (
                  <div
                    id="nexus-profil-contacts"
                    className="bg-black/40 border border-white/5 rounded-2xl p-5 flex flex-col gap-4 shrink-0 text-center"
                  >
                    <div className="relative group/tooltip hover:z-[100] w-max mx-auto">
                      <div className="text-[9px] uppercase font-black text-white/30 tracking-widest border-b border-white/5 pb-2 flex items-center justify-center gap-2 cursor-help">
                        <Share2 size={12} /> Verejné Kontakty Siete
                      </div>
                      <TooltipHover
                        text="Komunikačné linky operátora zverejnené v Sieti."
                        dimColor="#39FF14"
                        position="bottom"
                      />
                    </div>

                    <div className="grid grid-cols-5 gap-3 w-max mx-auto justify-items-center">
                      {data.email && (
                        <div className="relative group/tooltip hover:z-[100]">
                          <a
                            href={`mailto:${data.email}`}
                            className="w-9 h-9 bg-white/5 hover:bg-white/10 hover:text-white text-white/40 border border-white/5 hover:border-white/20 rounded-xl transition-all flex items-center justify-center"
                          >
                            <Mail size={14} />
                          </a>
                          <TooltipHover
                            text={`Email: ${data.email}`}
                            dimColor="#ffffff"
                            position="bottom"
                          />
                        </div>
                      )}
                      {data.phone && (
                        <div className="relative group/tooltip hover:z-[100]">
                          <a
                            href={`tel:${data.phone}`}
                            className="w-9 h-9 bg-white/5 hover:bg-[#39FF14]/20 hover:text-[#39FF14] text-white/40 border border-white/5 hover:border-[#39FF14]/50 rounded-xl transition-all flex items-center justify-center"
                          >
                            <Phone size={14} />
                          </a>
                          <TooltipHover
                            text={`Mobil: ${data.phone}`}
                            dimColor="#39FF14"
                            position="bottom"
                          />
                        </div>
                      )}
                      {data.whatsapp && (
                        <div className="relative group/tooltip hover:z-[100]">
                          <a
                            href={data.whatsapp}
                            target="_blank"
                            rel="noreferrer"
                            className="w-9 h-9 bg-white/5 hover:bg-[#25D366]/20 hover:text-[#25D366] text-white/40 border border-white/5 hover:border-[#25D366]/50 rounded-xl transition-all flex items-center justify-center"
                          >
                            <MessageCircle size={14} />
                          </a>
                          <TooltipHover
                            text="WhatsApp Šifrovaný Chat"
                            dimColor="#25D366"
                            position="bottom"
                          />
                        </div>
                      )}
                      {data.facebook && (
                        <div className="relative group/tooltip hover:z-[100]">
                          <a
                            href={data.facebook}
                            target="_blank"
                            rel="noreferrer"
                            className="w-9 h-9 bg-white/5 hover:bg-[#0044FF]/30 hover:text-[#0044FF] text-white/40 border border-white/5 hover:border-[#0044FF]/50 rounded-xl transition-all flex items-center justify-center"
                          >
                            <Facebook size={14} />
                          </a>
                          <TooltipHover
                            text="Facebook Sieť"
                            dimColor="#0044FF"
                            position="bottom"
                          />
                        </div>
                      )}
                      {data.instagram && (
                        <div className="relative group/tooltip hover:z-[100]">
                          <a
                            href={data.instagram}
                            target="_blank"
                            rel="noreferrer"
                            className="w-9 h-9 bg-white/5 hover:bg-[#E1306C]/20 hover:text-[#E1306C] text-white/40 border border-white/5 hover:border-[#E1306C]/50 rounded-xl transition-all flex items-center justify-center"
                          >
                            <Instagram size={14} />
                          </a>
                          <TooltipHover
                            text="Instagram Profil"
                            dimColor="#E1306C"
                            position="bottom"
                          />
                        </div>
                      )}

                      {data.tiktok && (
                        <div className="relative group/tooltip hover:z-[100]">
                          <a
                            href={data.tiktok}
                            target="_blank"
                            rel="noreferrer"
                            className="w-9 h-9 bg-white/5 hover:bg-[#00FFFF]/20 hover:text-[#00FFFF] text-white/40 border border-white/5 hover:border-[#00FFFF]/50 rounded-xl transition-all flex items-center justify-center"
                          >
                            <Music2 size={14} />
                          </a>
                          <TooltipHover
                            text="TikTok Kanál"
                            dimColor="#00FFFF"
                            position="bottom"
                          />
                        </div>
                      )}
                      {data.youtube1 && (
                        <div className="relative group/tooltip hover:z-[100]">
                          <a
                            href={data.youtube1}
                            target="_blank"
                            rel="noreferrer"
                            className="w-9 h-9 bg-white/5 hover:bg-[#FF0000]/20 hover:text-[#FF0000] text-white/40 border border-white/5 hover:border-[#FF0000]/50 rounded-xl transition-all flex items-center justify-center"
                          >
                            <Youtube size={14} />
                          </a>
                          <TooltipHover
                            text="YouTube Kanál 1"
                            dimColor="#FF0000"
                            position="bottom"
                          />
                        </div>
                      )}
                      {data.youtube2 && (
                        <div className="relative group/tooltip hover:z-[100]">
                          <a
                            href={data.youtube2}
                            target="_blank"
                            rel="noreferrer"
                            className="w-9 h-9 bg-white/5 hover:bg-[#FF0000]/20 hover:text-[#FF0000] text-white/40 border border-white/5 hover:border-[#FF0000]/50 rounded-xl transition-all flex items-center justify-center"
                          >
                            <Youtube size={14} />
                          </a>
                          <TooltipHover
                            text="YouTube Kanál 2"
                            dimColor="#FF0000"
                            position="bottom"
                          />
                        </div>
                      )}
                      {data.google && (
                        <div className="relative group/tooltip hover:z-[100]">
                          <a
                            href={`mailto:${data.google}`}
                            className="w-9 h-9 bg-white/5 hover:bg-[#FF003C]/20 hover:text-[#FF003C] text-white/40 border border-white/5 hover:border-[#FF003C]/50 rounded-xl transition-all flex items-center justify-center"
                          >
                            <Chrome size={14} />
                          </a>
                          <TooltipHover
                            text="Verejný E-mail"
                            dimColor="#FF003C"
                            position="bottom"
                          />
                        </div>
                      )}
                      {data.www && (
                        <div className="relative group/tooltip hover:z-[100]">
                          <a
                            href={
                              data.www.startsWith("http")
                                ? data.www
                                : `https://${data.www}`
                            }
                            target="_blank"
                            rel="noreferrer"
                            className="w-9 h-9 bg-white/5 hover:bg-[#FFD700]/20 hover:text-[#FFD700] text-white/40 border border-white/5 hover:border-[#FFD700]/50 rounded-xl transition-all flex items-center justify-center"
                          >
                            <Globe size={14} />
                          </a>
                          <TooltipHover
                            text={`Osobný Uzol`}
                            dimColor="#FFD700"
                            position="bottom"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* PRAVÝ PANEL (Dossier) */}
          <div
            id="nexus-profil-dossier"
            className="w-full lg:w-2/3 xl:w-3/4 bg-black/50 border border-white/5 p-6 md:p-8 rounded-xl text-left relative shadow-inner flex flex-col h-max min-h-[400px]"
          >
            <div
              className="absolute top-0 left-0 w-1 h-full rounded-l-xl"
              style={{ backgroundColor: semanticColor }}
            />

            <div className="relative group/tooltip hover:z-[100] w-max">
              <h3 className="text-[12px] text-white/40 uppercase tracking-widest mb-6 border-b border-white/5 pb-4 font-black flex items-center gap-2 shrink-0 cursor-help">
                <Database size={16} /> Sémantický Odtlačok (Kybernetický
                Životopis)
              </h3>
              <TooltipHover
                text="Kompletný dekódovaný obsah z editora operátora."
                dimColor={semanticColor}
                position="bottom"
              />
            </div>

            <div
              className="font-mono text-[14px] md:text-[15px] leading-relaxed text-white/90 pr-4 flex-1 prose-nexus w-full break-words"
              style={{ "--node-color": semanticColor }}
            >
              {isBanned ? (
                <div className="flex flex-col items-center justify-center py-10 opacity-50 h-full">
                  <Ban size={48} className="text-red-500 mb-4" />
                  <p className="text-red-500 uppercase tracking-widest text-xs font-black">
                    Záznam bol trvalo zablokovaný administrátorom.
                  </p>
                </div>
              ) : data.dossier ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: parseNexusFormat(data.dossier),
                  }}
                />
              ) : (
                <span className="italic opacity-30">
                  Táto entita zatiaľ nevyplnila svoj sémantický kód.
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* ⚡ INJEKCIA HAMBURGER MENU A SCROLL KOMPONENTOV DO PROFILU */}
      {/* 🛑 FIX: Vstreknutie ID lokálnej šachty aj do Rýchleho Navigačného Uzla */}
      <GlobalHamburgerMenu
        activeTab="profil"
        themeColor={tColor}
        targetScrollId="nexus-profil-scroll"
      />
      <GlobalComponents
        themeColor={tColor}
        targetScrollId="nexus-profil-scroll"
      />
    </div>
  );
};

export default GlobalProfil;
