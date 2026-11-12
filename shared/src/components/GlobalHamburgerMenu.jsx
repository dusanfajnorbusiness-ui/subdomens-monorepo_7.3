/* eslint-disable no-undef */
// ============================================================================
// 👑 NEXUS OS: GLOBÁLNE HAMBURGER MENU (CHAMELEÓN PROTOKOL & HYBRID ROUTING V20.95)
// Súbor: @shared/components/GlobalHamburgerMenu.jsx
// Status: 100% GROUNDED // CHAMELEON COLOR ENGINE // DUAL ROUTE + ACCORDIONS
// Core Version: BC-HAMBURGER-MENU V20.95
// ============================================================================

import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { HAMBURGER_MENU_DATA } from "@shared/data/MenuHamburgerData.js";
import { useNexusThemeProps } from "@shared/components/NexusThemePropsContext.jsx";

// 🎨 KÁNONICKÁ FAREBNÁ MATICA SEKTOROV A SUBDOMÉN (CHAMELEÓN PROTOKOL)
const CHAMELEON_COLOR_MAP = {
  uplink: "#00f3ff",
  home: "#39FF14",
  shop: "#FFD700",
  videos: "#FF0000",
  audios: "#FF003C",
  images: "#39FF14",
  documents: "#00f3ff",
  apps: "#00f3ff",
  agency: "#00f3ff",
  blog: "#FF1493",
  operators: "#00f3ff",
  settings: "#8A2BE2",
  admin: "#FF003C",
  profil: "#39FF14",
  messages: "#3B82F6",
  // 16 Kognitívnych Subdomén (SUB00 - SUB15)
  sub00: "#FFFFFF",
  sub01: "#39FF14",
  sub02: "#FFEB3B",
  sub03: "#FFD700",
  sub04: "#FFAA00",
  sub05: "#FF8C00",
  sub06: "#BF00FF",
  sub07: "#8A2BE2",
  sub08: "#00f3ff",
  sub09: "#FF003C",
  sub10: "#0044FF",
  sub11: "#FFBF00",
  sub12: "#00E5FF",
  sub13: "#00008B",
  sub14: "#FF1493",
  sub15: "#4A4A4A",
};

export const GlobalHamburgerMenu = ({
  activeTab = "home",
  themeColor = null,
  activeSubId = null,
  currentSector = null,
  targetScrollId = null,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Napojenie na globálny kontext pre reaktívny chameleon efekt
  let contextTheme = {};
  try {
    contextTheme = useNexusThemeProps() || {};
  } catch (e) {
    contextTheme = {};
  }

  const effectiveSubId = activeSubId || contextTheme.activeSubId || null;
  const effectiveThemeColor = themeColor || contextTheme.themeColor || null;

  const [isOpen, setIsOpen] = useState(false);
  const [isMasterHidden, setIsMasterHidden] = useState(false);
  const [activeModal, setActiveModal] = useState(null);

  // Systémové poslucháče modálov
  useEffect(() => {
    const handleOpenProfil = () => setActiveModal("profil");
    const handleCloseProfil = () => setActiveModal(null);
    const handleOpenInbox = () => setActiveModal("messages");
    const handleCloseInbox = () => setActiveModal(null);

    window.addEventListener("nexus_open_profil_modal", handleOpenProfil);
    window.addEventListener("nexus_close_profil_modal", handleCloseProfil);
    window.addEventListener("nexus_open_inbox_modal", handleOpenInbox);
    window.addEventListener("nexus_close_inbox_modal", handleCloseInbox);

    return () => {
      window.removeEventListener("nexus_open_profil_modal", handleOpenProfil);
      window.removeEventListener("nexus_close_profil_modal", handleCloseProfil);
      window.removeEventListener("nexus_open_inbox_modal", handleOpenInbox);
      window.removeEventListener("nexus_close_inbox_modal", handleCloseInbox);
    };
  }, []);

  // Sound FX Triggery s defenzívnym fallbackom
  const triggerHover = () =>
    typeof SoundFX !== "undefined" && SoundFX?.hover && SoundFX.hover();
  const triggerClick = () =>
    typeof SoundFX !== "undefined" && SoundFX?.click && SoundFX.click();

  // Režim skrytia z LocalStorage
  useEffect(() => {
    const hiddenState = localStorage.getItem("nexus_hide_hamburger");
    if (hiddenState === "true") setIsMasterHidden(true);
  }, []);

  // 🧠 AUTO-SENSE KONTEXTU Z URL LIŠTY A SUBDOMÉNY
  const detectedTab = useMemo(() => {
    if (effectiveSubId && HAMBURGER_MENU_DATA[effectiveSubId]) {
      return effectiveSubId;
    }

    const path = String(location.pathname || "").toLowerCase();

    // 1. Detekcia subdoménových ciest (napr. /sub00, /sub05)
    const subMatch = path.match(/\/sub(\d{2})/i);
    if (subMatch && subMatch.at(0)) {
      const subKey = subMatch.at(0).replace("/", "").toUpperCase();
      if (HAMBURGER_MENU_DATA[subKey]) return subKey;
    }

    // 2. Šesť súrodencov obchodu
    if (path.includes("/shop/audios") || path === "/audios") return "audios";
    if (path.includes("/shop/videos") || path === "/videos") return "videos";
    if (path.includes("/shop/images") || path === "/images") return "images";
    if (path.includes("/shop/documents") || path === "/documents")
      return "documents";
    if (path.includes("/shop/apps") || path === "/apps") return "apps";

    // 3. Modály
    if (activeModal) return activeModal;
    if (path.includes("/profil") || path.includes("/profile")) return "profil";
    if (path.includes("/messages") || path.includes("/inbox"))
      return "messages";

    // 4. Koreňový uzol (Home)
    if (path === "/" || path === "") return "home";

    // 5. Porty a portály
    if (path.includes("/agency")) return "agency";
    if (path.startsWith("/shop")) return "shop";
    if (path.includes("/blog")) return "blog";
    if (path.includes("/operators") || path.includes("/operator/"))
      return "operators";
    if (path.includes("/settings")) return "settings";
    if (path.includes("/admin")) return "admin";

    return activeTab && activeTab !== "home" ? activeTab : "home";
  }, [location.pathname, activeTab, activeModal, effectiveSubId]);

  // 🎨 DYNAMICKÁ FARBA CHAMELEÓNA
  const activeColor = useMemo(() => {
    if (
      effectiveThemeColor &&
      effectiveThemeColor !== "#39FF14" &&
      effectiveThemeColor !== "#00f3ff"
    ) {
      return effectiveThemeColor;
    }
    const colorKey = String(detectedTab || "").toLowerCase();
    return (
      CHAMELEON_COLOR_MAP[colorKey] ||
      CHAMELEON_COLOR_MAP[activeTab] ||
      "#00f3ff"
    );
  }, [effectiveThemeColor, detectedTab, activeTab]);

  // Výber dátového poľa z SSOT databázy
  const currentMenu = useMemo(() => {
    return (
      HAMBURGER_MENU_DATA[detectedTab] ||
      HAMBURGER_MENU_DATA[activeTab] ||
      HAMBURGER_MENU_DATA.home ||
      []
    );
  }, [detectedTab, activeTab]);

  // Prvá sekcia je defaultne otvorená
  const [openSections, setOpenSections] = useState({ 0: true });

  // Transformácia zoznamu z MenuHamburgerData.js na zbaľovacie spoiler sekcie (podľa isDivider)
  const groupedSections = useMemo(() => {
    const sections = [];
    let currentSection = { title: "HLAVNÉ LINKY", items: [] };

    currentMenu.forEach((item) => {
      if (item.isDivider) {
        if (currentSection.items.length > 0 || sections.length > 0) {
          sections.push(currentSection);
        }
        currentSection = { title: item.label, items: [] };
      } else {
        currentSection.items.push(item);
      }
    });

    if (currentSection.items.length > 0) {
      sections.push(currentSection);
    }
    return sections;
  }, [currentMenu]);

  const toggleSection = (idx) => {
    triggerClick();
    setOpenSections((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  // ⚡ DUAL-ACTION HANDLER: NAVIGÁCIA + PLYNULÝ SCROLL
  const handleItemClick = (item) => {
    triggerClick();

    // 🛑 1. POLOŽKY VO VÝVOJI -> ZOSTÁVAJÚ HLUCHÉ, MENU SA NEZAVRIE
    if (item.inDevelopment || item.url === "#") {
      return;
    }

    // 🌐 2. SKUTOČNÉ EXTERNÉ LINKY (Iba tie, čo začínajú na http/https) -> NOVÉ OKNO
    const isAbsoluteHttp =
      item.url &&
      (item.url.startsWith("http://") || item.url.startsWith("https://"));
    if (isAbsoluteHttp) {
      window.open(item.url, "_blank", "noopener,noreferrer");
      setIsOpen(false);
      return;
    }

    // 🚪 3. ZATVORENIE MODÁLOV PRI INTERNEJ ZMENE
    window.dispatchEvent(new CustomEvent("nexus_close_profil_modal"));
    window.dispatchEvent(new CustomEvent("nexus_close_inbox_modal"));

     // Ak klikneš na HOME, HOMEPAGE alebo SUBDOMÉNY MATRIX
    if (item.id === "HOME" || item.url === "/home" || item.url === "/") {
      window.dispatchEvent(
        new CustomEvent("nexus_select_subdomain", { detail: "HOME" })
      );
      navigate("/home");
      window.scrollTo({ top: 0, behavior: "smooth" });
      setIsOpen(false);
      return;
    }

    // 3. Kliknutie na SUBDOMÉNU (SUB00 - SUB15)
    if (item.id && String(item.id).startsWith("SUB")) {
      window.dispatchEvent(
        new CustomEvent("nexus_select_subdomain", { detail: item.id })
      );
      if (item.url) navigate(item.url);
      setIsOpen(false);
      return;
    }

    // 4. Externé linky (Agency, Shop, soc. siete)
    if (item.isExternal && item.url && !item.url.startsWith("/")) {
      window.open(item.url, "_blank", "noopener,noreferrer");
      setIsOpen(false);
      return;
    }

    // 5. Interné trasy (/vop, /privacy)
    if (item.url) {
      navigate(item.url);
      window.scrollTo({ top: 0, behavior: "smooth" });
      setIsOpen(false);
      return;
    }
  };

  const toggleMenu = () => {
    triggerHover();
    setIsOpen(!isOpen);
  };

  if (isMasterHidden) return null;

  return (
    <div
      id="nexus-global-hamburger"
      className="fixed bottom-6 left-6 z-[9999] font-mono pointer-events-auto"
    >
      {/* 🔮 VYŤAHOVACÍ PANEL S POLOŽKAMI MENU */}
      {isOpen && (
        <div
          className="absolute bottom-16 left-0 w-72 sm:w-80 max-h-[75vh] overflow-y-auto bg-[#050A0E]/95 border rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.9)] backdrop-blur-2xl p-3 space-y-1 custom-scroll animate-in fade-in slide-in-from-bottom-5 duration-200"
          style={{
            borderColor: `${activeColor}40`,
            boxShadow: `0 0 30px ${activeColor}20`,
          }}
        >
          {/* HLAVIČKA AKTUÁLNEHO MENU */}
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 px-2">
            <span
              className="text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5"
              style={{ color: activeColor }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-ping"
                style={{ backgroundColor: activeColor }}
              />
              PORT: {String(detectedTab || "").toUpperCase()}
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-zinc-500 hover:text-white p-1 text-xs cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* SPOILER AKORDEÓN SEKCIE */}
          <div className="space-y-1.5">
            {groupedSections.map((sec, sIdx) => {
              const isExpanded = Boolean(openSections[sIdx]);

              return (
                <div
                  key={`sec-${sIdx}`}
                  className="border border-white/10 rounded-xl overflow-hidden bg-black/40"
                >
                  {/* TLAČIDLO PRE ZBALENIE / ROZBALENIE SEKCIE */}
                  <button
                    onClick={() => toggleSection(sIdx)}
                    className="w-full flex items-center justify-between px-3 py-2 text-[10px] font-black uppercase tracking-wider text-zinc-300 hover:text-white bg-white/5 hover:bg-white/10 transition-colors cursor-pointer text-left"
                  >
                    <span className="truncate pr-2">{sec.title}</span>
                    <span style={{ color: activeColor }}>
                      {isExpanded ? "▲" : "▼"}
                    </span>
                  </button>

                  {/* OBSAH SEKCIE */}
                  {isExpanded && (
                    <div className="p-1 space-y-0.5 bg-black/60 divide-y divide-white/5">
                      {sec.items.map((item, iIdx) => {
                        const IconComponent =
                          LucideIcons[item.icon] || LucideIcons.Circle;
                        const isDeadLink =
                          item.inDevelopment || item.url === "#";

                        return (
                          <button
                            key={`item-${sIdx}-${iIdx}`}
                            onClick={() => handleItemClick(item)}
                            className={`w-full flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-lg transition-all text-left text-xs font-bold ${
                              isDeadLink
                                ? "text-zinc-500 hover:text-zinc-400 hover:bg-white/[0.03] cursor-default"
                                : "text-zinc-300 hover:text-white hover:bg-white/10 cursor-pointer group"
                            }`}
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <IconComponent
                                size={13}
                                className={`shrink-0 transition-transform ${
                                  !isDeadLink && "group-hover:scale-110"
                                }`}
                                style={{
                                  color: isDeadLink
                                    ? "#555555"
                                    : item.themeColor || activeColor,
                                }}
                              />
                              <div className="flex flex-col min-w-0">
                                <span className="truncate text-[11px]">
                                  {item.label || item.name || "SUBDOMÉNA"}
                                </span>
                                {Boolean(
                                  item.isLiveSubdomain && item.subdomain,
                                ) && (
                                  <span className="text-[8px] text-zinc-500 font-mono truncate">
                                    {item.subdomain}
                                  </span>
                                )}
                              </div>
                            </div>

                            {item.isLiveSubdomain && (
                              <span
                                className="text-[7px] font-mono px-1 py-0.2 rounded border shrink-0 uppercase tracking-tighter"
                                style={{
                                  borderColor: `${item.themeColor || activeColor}60`,
                                  color: item.themeColor || activeColor,
                                }}
                              >
                                {item.subNumber || "SUB"}
                              </span>
                            )}

                            {!item.isLiveSubdomain && !isDeadLink && (
                              <span className="text-[7px] font-mono text-zinc-600 group-hover:text-zinc-400 shrink-0 uppercase">
                                LINK
                              </span>
                            )}

                            {isDeadLink && (
                              <span className="text-[7px] font-mono text-zinc-700 shrink-0 uppercase">
                                DEV
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ⚡ SPÚŠŤACIE FLOATING TLAČIDLO S DYNAMICKOU FARBOU */}
      <button
        onClick={toggleMenu}
        className="p-3.5 bg-black/80 hover:bg-black rounded-2xl border transition-all flex items-center justify-center cursor-pointer backdrop-blur-xl hover:scale-105"
        style={{
          color: activeColor,
          borderColor: `${activeColor}60`,
          boxShadow: isOpen
            ? `0 0 25px ${activeColor}80`
            : `0 0 20px ${activeColor}33`,
        }}
        title="Globálne Navigačné Menu"
      >
        {isOpen ? <X size={22} /> : <Menu size={22} />}
      </button>
    </div>
  );
};

export default GlobalHamburgerMenu;
