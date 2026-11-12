// ============================================================================
// ⚠️ OSTRÉ LOKÁLNE IMPORTY (ODKOMENTUJ VO SVOJOM VS CODE)
// ============================================================================
import { SoundFX } from "@shared/utils/SoundEngine.js";
import { ArrowDown, ArrowUp } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useNexusThemeProps } from "@shared/components/NexusThemePropsContext.jsx";
// ============================================================================
// ⚠️ MOCK PRE CANVAS NÁHĽAD (ZMAZAŤ V LOKÁLNOM PROJEKTE) ⚠️
// ============================================================================

// ============================================================================

/**
 * ⚡ NEXUS GLOBAL COMPONENTS (V26 - OMEGA FX SEQUENCER)
 * DESIGNED BY | CyberTech ARCHITECT [DUŠAN FAJNOR]
 * ---------------------------------------------------------------------------
 * Obsahuje: Top Scroll Bar, Scroll Navigation
 * KOMPLETNÝCH 8 MATRIX EFEKTOV (Laser, Lightning, Glitch, EMP, Scramble, Cascade, Shield, Cursor)
 */

export const SubdomainStandbyPage = () => {
     const { activeSubId, themeColor, currentSector, currentSub, setSubdomain } = useNexusThemeProps();
     // Všetko je okamžite prepojené a podriadené aktívnej subdoméne!
   };
   
export const GlobalComponents = ({
  themeColor = "#39FF14",
  targetScrollId = null,
  userState = null, // 📡 DÁTOVÝ MOST: Prijíma identitu a nákupy z App.jsx
}) => {
  // 1. SCROLL STAVY
  const [scrollWidth, setScrollWidth] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showScrollBottom, setShowScrollBottom] = useState(false);

  // 2. MATRIX FX STAVY
  const [activeFx, setActiveFx] = useState("NONE");
  const [activeText, setActiveText] = useState("NONE"); // Nový nezávislý stav pre 90s text

  const [isFxEnabled, setIsFxEnabled] = useState(() => {
    if (typeof window !== "undefined")
      return localStorage.getItem("nexus_matrix_fx") !== "false";
    return true;
  });

  const [isSoundFxEnabled, setIsSoundFxEnabled] = useState(() => {
    if (typeof window !== "undefined")
      return localStorage.getItem("nexus_sound_fx") !== "false";
    return true;
  });

  // ⚡ DEV-MODE: HEARTBEAT LASER (Sonda pre detekciu zamrznutia)
  const [isLocalhost, setIsLocalhost] = useState(false);
  const devLaserRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Overenie, či bežíme na tvojom lokálnom dev serveri
      const local =
        window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1";
      setIsLocalhost(local);

      if (local) {
        let position = -10;

        // Interval každých 30ms (~33 FPS). Dostatočne plynulé, extrémne šetrné k Celeronu.
        // Ak React (Main Thread) zamrzne, tento interval zastane a laser fyzicky zamrzne na mieste.
        const heartbeat = setInterval(() => {
          if (devLaserRef.current) {
            position += 6; // Rýchlosť pádu lasera
            if (position > window.innerHeight) position = -10;
            devLaserRef.current.style.top = `${position}px`;
          }
        }, 30);

        return () => clearInterval(heartbeat);
      }
    }
  }, []);

  // ============================================================================
  // 🎵 NATIVE AUDIO ENGINE (0% RAM Load)
  // ============================================================================
  const playSystemBeep = (
    freq = 800,
    type = "sine",
    duration = 0.1,
    vol = 0.05,
  ) => {
    // ... (funkcia playSystemBeep zostáva presne rovnaká)
    if (typeof window === "undefined" || !isSoundFxEnabled) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const audioCtx = new AudioContext();
      if (audioCtx.state === "suspended") return;

      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      oscillator.type = type;
      oscillator.frequency.value = freq;
      gainNode.gain.setValueAtTime(vol, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.001,
        audioCtx.currentTime + duration,
      );

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + duration);
    } catch (e) {
      /* Tichý chod */
    }
  };

  // ============================================================================
  // ⚙️ OMEGA FX SEQUENCER (Auth Matrix Guard + Timing Engine)
  // ============================================================================
  useEffect(() => {
    // 📡 SONDA 1: Hlavný stav pri štarte sekvencera
    // console.log(
    //   "[SYS_PROBE_1]: Sequencer Initialized. Master Switch (isFxEnabled):",
    //   isFxEnabled,
    //   "| User:",
    //   userState?.tier,
    // );

    if (!isFxEnabled) {
      // console.log("[SYS_PROBE_2]: Master Switch je OFF. Čakám na zapnutie.");
      setActiveFx("NONE");
      setActiveText("NONE");
      return;
    }

    // 🛡️ THE CONSTITUTION PROTOCOL
    const checkAccess = (fxStorageKey) => {
      if (!userState) return false;
      if (userState.tier === "ARCHITECT") return true; // 👑 GOD MODE

      // ⚡ BEZPEČNOSTNÝ ŠTÍT: Prepis z JSON Stringu na čisté Pole (Array)
      let unlocked = [];
      try {
        const rawNodes =
          userState.unlockedNodes || userState.unlocked_nodes || [];
        unlocked = Array.isArray(rawNodes)
          ? rawNodes
          : JSON.parse(rawNodes || "[]");
      } catch (e) {
        console.warn(
          "[SYS_LOG]: Dekódovanie uzlov vo FX Engine zlyhalo. Padám na [].",
        );
        unlocked = [];
      }

      // Teraz je unlocked na 100% pole
      const hasMasterKey = unlocked.includes("NEXUS_MASTER_KEY");
      const hasFxBundle = unlocked.some((node) =>
        String(node).toUpperCase().includes("MATRIX_FX_BUNDLE"),
      );

      // ⚡ INTELIGENTNÁ DETEKCIA (Prekladač Shop kľúčov na Core ID)
      const hasSingleNode = unlocked.some((node) => {
        const n = String(node).toLowerCase();
        // Dekódovacia matica pre všetky Matrix FX efekty
        if (fxStorageKey === "laser")
          return (
            n.includes("laser") ||
            n.includes("biometric") ||
            n.includes("kampan-23")
          );
        if (fxStorageKey === "lightning")
          return (
            n.includes("lightning") ||
            n.includes("network") ||
            n.includes("kampan-24")
          );
        if (fxStorageKey === "crtGlitch")
          return (
            n.includes("crt") || n.includes("glitch") || n.includes("kampan-25")
          );
        if (fxStorageKey === "empSurge")
          return (
            n.includes("emp") || n.includes("power") || n.includes("kampan-26")
          );
        if (fxStorageKey === "textScramble")
          return (
            n.includes("scramble") ||
            n.includes("decrypting") ||
            n.includes("kampan-27")
          );
        if (fxStorageKey === "dataCascade")
          return (
            n.includes("cascade") ||
            n.includes("overflow") ||
            n.includes("kampan-28")
          );
        if (fxStorageKey === "focusShield")
          return (
            n.includes("shield") ||
            n.includes("cognitive") ||
            n.includes("kampan-29")
          );
        if (fxStorageKey === "neuralCursor")
          return (
            n.includes("neural") ||
            n.includes("cursor") ||
            n.includes("kampan-30")
          );

        return n.includes(fxStorageKey.toLowerCase());
      });

      return hasMasterKey || hasFxBundle || hasSingleNode;
    };

    let step = 0;
    let idleSeconds = 0;
    let isSequenceRunning = false;

    const sequencer = setInterval(() => {
      // 📡 DÁTOVÝ MOST: Načítanie nastavení z lokálneho disku
      let settings = { timing: "off", audioEnabled: false };
      try {
        const saved = localStorage.getItem("nexus_advanced_fx");
        if (saved) settings = JSON.parse(saved);
      } catch (e) {}

      // 📡 SONDA 2: Výpis stavu slučky (Iba raz za cyklus, aby nespamovalo konzolu)
      if (step === 0 && idleSeconds === 0) {
      }

      // Ak nie je nastavený časovač, sekvencer stojí
      if (settings.timing === "off") {
        if (step === 0 && idleSeconds === 0) setActiveFx("NONE");
        setActiveText("NONE");
        isSequenceRunning = false;
        return;
      }

      const audio = settings.audioEnabled;

      // 🕒 ČASOVANIE SLUČKY
      if (!isSequenceRunning) {
        if (settings.timing === "showcase") {
          if (step === 0) isSequenceRunning = true;
          step = 0;
        } else {
          idleSeconds++;
          const targetSeconds = parseInt(settings.timing) * 60;
          if (
            idleSeconds >= targetSeconds ||
            (settings.timing === "random" && Math.random() < 0.01)
          ) {
            isSequenceRunning = true;
            step = 0;
            idleSeconds = 0;
          }
        }
      }

      // ⚙️ EXEKÚCIA EFEKTOV
      if (isSequenceRunning) {
        step++;

        // SONDA NA PRVÝ KROK
        if (step === 1) {
          const access = checkAccess("laser");

          if (settings.laser && access) {
            setActiveFx("LASER");
            setActiveText("LASER");
            if (audio) playSystemBeep(800, "sine", 0.1, 0.02);
          }
        } else if (step === 5) {
          setActiveFx("NONE");
          setActiveText("NONE");
        }

        // 2. LIGHTNING
        else if (step === 8) {
          if (settings.lightning && checkAccess("lightning")) {
            setActiveFx("LIGHTNING");
            setActiveText("LIGHTNING");
            if (audio) playSystemBeep(150, "sawtooth", 0.3, 0.05);
          }
        } else if (step === 9) {
          setActiveFx("NONE");
        } else if (step === 11) {
          setActiveText("NONE");
        }

        // 3. CRT GLITCH
        else if (step === 12) {
          if (settings.crtGlitch && checkAccess("crtGlitch")) {
            setActiveFx("GLITCH");
            setActiveText("GLITCH");
            if (audio) {
              playSystemBeep(2500, "square", 0.05, 0.01);
              setTimeout(() => playSystemBeep(3000, "square", 0.05, 0.01), 100);
            }
          }
        } else if (step === 13) {
          setActiveFx("NONE");
        } else if (step === 15) {
          setActiveText("NONE");
        }

        // 4. EMP SURGE
        else if (step === 16) {
          if (settings.empSurge && checkAccess("empSurge")) {
            setActiveFx("EMP");
            setActiveText("EMP");
            if (audio) playSystemBeep(50, "sine", 0.5, 0.1);
          }
        } else if (step === 17) {
          setActiveFx("NONE");
        } else if (step === 19) {
          setActiveText("NONE");
        }

        // 5. SCRAMBLE
        else if (step === 21) {
          if (settings.textScramble && checkAccess("textScramble")) {
            setActiveFx("SCRAMBLE");
            setActiveText("SCRAMBLE");
            if (audio) {
              playSystemBeep(4000, "square", 0.02, 0.01);
              setTimeout(() => playSystemBeep(4500, "square", 0.02, 0.01), 150);
            }
          }
        } else if (step === 23) {
          setActiveFx("NONE");
        } else if (step === 24) {
          setActiveText("NONE");
        }

        // 6. CASCADE MATRIX RAIN
        else if (step === 26) {
          if (settings.dataCascade && checkAccess("dataCascade")) {
            setActiveFx("CASCADE");
            setActiveText("CASCADE");
            if (audio) playSystemBeep(300, "triangle", 4, 0.01);
          }
        } else if (step === 30) {
          setActiveFx("NONE");
          setActiveText("NONE");
        }

        // 7. SHIELD
        else if (step === 32) {
          if (settings.focusShield && checkAccess("focusShield")) {
            setActiveFx("SHIELD");
            setActiveText("SHIELD");
            if (audio) playSystemBeep(100, "sine", 4, 0.03);
          }
        } else if (step === 36) {
          setActiveFx("NONE");
          setActiveText("NONE");
        }

        // 8. NEURAL CURSOR
        else if (step === 38) {
          if (settings.neuralCursor && checkAccess("neuralCursor")) {
            setActiveFx("CURSOR");
            setActiveText("CURSOR");
            if (audio) playSystemBeep(1200, "sine", 0.05, 0.02);
          }
        }

        // KONIEC SLUČKY
        else if (step >= 42) {
          setActiveFx("NONE");
          setActiveText("NONE");
          isSequenceRunning = false;
          step = 0;
        }
      }
    }, 1000);

    return () => clearInterval(sequencer);
  }, [isFxEnabled, userState]);

  // ============================================================================
  // 🖱️ NEURAL LINK CURSOR (Zero-React State Hack)
  // ============================================================================
  useEffect(() => {
    if (activeFx !== "CURSOR") return;

    // Počas 4 sekúnd vytvárame elementy čisto cez DOM (chráni React pred Memory Leakom)
    const handleMouseMove = (e) => {
      if (Math.random() > 0.3) return; // Nespamujeme každú milisekundu
      const dot = document.createElement("div");
      dot.className =
        "fixed pointer-events-none text-[10px] font-black z- opacity-80";
      dot.className =
        "fixed pointer-events-none text-[10px] font-black opacity-80";
      dot.style.zIndex = "9999"; // Ochrana proti zmazaniu zátvoriek v Matrix chate
      dot.innerText = Math.random() > 0.5 ? "1" : "0";
      dot.style.color = themeColor;
      dot.style.left = `${e.clientX + 10}px`;
      dot.style.top = `${e.clientY + 10}px`;
      dot.style.textShadow = `0 0 10px ${themeColor}`;
      document.body.appendChild(dot);

      // Zmiznutie do prázdna
      setTimeout(() => {
        dot.style.transition = "all 0.5s ease-out";
        dot.style.opacity = "0";
        dot.style.transform = "translateY(20px) scale(0.5)";
      }, 50);

      setTimeout(() => dot.remove(), 550);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [activeFx, themeColor]);

  // ============================================================================
  // 📡 LAPAČ NASTAVENÍ (Signál zo SettingsPage)
  // ============================================================================
  useEffect(() => {
    const handleSettingsToggle = () => {
      setIsFxEnabled(localStorage.getItem("nexus_matrix_fx") !== "false");
      setIsSoundFxEnabled(localStorage.getItem("nexus_sound_fx") !== "false");
    };
    window.addEventListener("nexus_settings_updated", handleSettingsToggle);
    return () =>
      window.removeEventListener(
        "nexus_settings_updated",
        handleSettingsToggle,
      );
  }, []);

  // ============================================================================
  // 🎯 SCROLL RADAR ENGINE
  // ============================================================================
  useEffect(() => {
    let scrollTarget = window;
    let targetElement = null;
    let scrollHandler = null;

    const attachRadar = () => {
      if (targetScrollId) {
        targetElement = document.getElementById(targetScrollId);
        if (targetElement) scrollTarget = targetElement;
      }

      scrollHandler = () => {
        const currentScrollTop = targetElement
          ? targetElement.scrollTop
          : document.body.scrollTop || document.documentElement.scrollTop;
        const currentScrollHeight = targetElement
          ? targetElement.scrollHeight
          : document.documentElement.scrollHeight;
        const currentClientHeight = targetElement
          ? targetElement.clientHeight
          : document.documentElement.clientHeight;
        const scrollableHeight = currentScrollHeight - currentClientHeight;
        const scrolled =
          scrollableHeight > 0
            ? (currentScrollTop / scrollableHeight) * 100
            : 0;

        setScrollWidth(scrolled);
        setShowScrollTop(currentScrollTop > 100);
        setShowScrollBottom(
          scrollableHeight > 20 && currentScrollTop < scrollableHeight - 20,
        );
      };

      scrollTarget.addEventListener("scroll", scrollHandler, { passive: true });
      scrollHandler();
    };

    const timer = setTimeout(attachRadar, 500);
    return () => {
      clearTimeout(timer);
      if (scrollTarget && scrollHandler)
        scrollTarget.removeEventListener("scroll", scrollHandler);
    };
  }, [targetScrollId]);

  const scrollToTop = () => {
    if (typeof SoundFX !== "undefined" && SoundFX.click) SoundFX.click();
    if (targetScrollId) {
      const el = document.getElementById(targetScrollId);
      if (el) {
        el.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBottom = () => {
    if (typeof SoundFX !== "undefined" && SoundFX.click) SoundFX.click();
    if (targetScrollId) {
      const el = document.getElementById(targetScrollId);
      if (el) {
        el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
        return;
      }
    }
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  // Prepočet farby pre SVG z URL enkódovania (nahradenie # za %23)
  const svgThemeColor = themeColor.replace("#", "%23");
  // Terminálové názvy pre 90s Typewriter overlay
  const fxNames = {
    LASER: "BIOMETRIC_SCAN_INITIATED",
    LIGHTNING: "NETWORK_SHORT_CIRCUIT",
    GLITCH: "CRT_SIGNAL_INTERFERENCE",
    EMP: "POWER_SURGE_DETECTED",
    SCRAMBLE: "DECRYPTING_DATA_NODES",
    CASCADE: "MATRIX_DATA_OVERFLOW",
    SHIELD: "COGNITIVE_SHIELD_ACTIVE",
    CURSOR: "NEURAL_LINK_ESTABLISHED",
  };

  // ============================================================================
  // 🖥️ RENDER BLOK EFEKTOV A NAVIGÁCIE
  // ============================================================================
  return (
    <>
      {/* 🛡️ OCHRANNÝ ŠTÍT (Karanténa pre efekty, aby nenaťahovali stránku) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-[999999]">
        {/* ⚡ DEV-MODE JS LASER (Heartbeat Monitor pre detekciu zamrznutia Reactu) */}
        {isLocalhost && (
          <div
            ref={devLaserRef}
            // ⚡ Zmenené z 'fixed' na 'absolute', z-index zmazaný (rieši ho obal)
            className="absolute left-0 w-full opacity-40"
            style={{
              top: "-10px",
              height: "3px",
              background: themeColor,
              boxShadow: `0 0 15px ${themeColor}, 0 0 30px ${themeColor}`,
            }}
          />
        )}
      </div>
      {/* 📟 0. TERMINAL TYPEWRITER OVERLAY (Názov aktuálneho efektu v strede) */}
      {activeText !== "NONE" && (
        <div
          className="fixed inset-0 pointer-events-none flex items-center justify-center"
          style={{ zIndex: 9999 }}
        >
          <div
            className="px-6 py-2 bg-black/80 backdrop-blur-md border border-white/10 rounded-sm shadow-2xl"
            style={{ boxShadow: `0 0 30px ${themeColor}20` }}
          >
            <div
              className="font-bold text-[11px] md:text-sm tracking-[0.2em] flex items-center"
              style={{
                fontFamily: '"Courier New", Courier, monospace',
                color: themeColor,
                textShadow: `0 0 10px ${themeColor}`,
              }}
            >
              <span className="opacity-50 mr-2">{`>`}</span>
              <span className="inline-block whitespace-nowrap overflow-hidden animate-[typeReveal_0.5s_steps(25,end)_forwards]">
                {/* Zmena z activeFx na activeText */}
                {`NEXUS_EXE: ${fxNames[activeText]}`}
              </span>
              <span className="animate-[blinkCaret_0.8s_infinite] ml-1 font-black">
                _
              </span>
            </div>
          </div>
        </div>
      )}
      {/* 🟢 1. TOP SCROLL BAR */}
      <div
        className="fixed top-0 left-0 h-1 transition-all duration-75 ease-out pointer-events-none"
        style={{
          width: `${scrollWidth}%`,
          backgroundColor: themeColor,
          boxShadow: `0 0 10px ${themeColor}, 0 0 20px ${themeColor}`,
          zIndex: 9999,
        }}
      />

      {/* 🔴 2. LASER SCANNER */}
      {activeFx === "LASER" && (
        <div
          className="fixed left-0 w-full pointer-events-none animate-[globalScan_4s_linear_forwards]"
          style={{ zIndex: 9998 }}
        >
          <div className="w-full electric-jitter">
            <div
              className="w-full laser-glitch-effect relative"
              style={{ "--theme-color": themeColor }}
            />
          </div>
        </div>
      )}

      {/* 🌩️ 3. INTENSE LIGHTNING */}
      {activeFx === "LIGHTNING" && (
        <div
          className="fixed top-0 left-0 w-full h-[50vh] pointer-events-none mix-blend-screen animate-[intenseLightning_1s_ease-out_forwards]"
          style={{
            background: `linear-gradient(180deg, ${themeColor}60 0%, transparent 100%)`,
            zIndex: 9998,
          }}
        />
      )}

      {/* 📺 4. CRT GLITCH ŠUM */}
      {activeFx === "GLITCH" && (
        <div
          className="pointer-events-none fixed inset-0 mix-blend-overlay opacity-40 animate-pulse"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backdropFilter:
              "contrast(180%) brightness(120%) hue-rotate(15deg) grayscale(30%)",
            boxShadow: "inset 0 0 100px rgba(0,0,0,0.8)",
            zIndex: 9998,
          }}
        >
          <div
            className="absolute w-full h-[8px] bg-white/30 blur-[2px]"
            style={{
              top: `${Math.random() * 80 + 10}%`,
              transform: `skewY(${Math.random() * 4 - 2}deg)`,
            }}
          />
        </div>
      )}

      {/* 🌑 5. EMP POWER SURGE */}
      {activeFx === "EMP" && (
        <div
          className="pointer-events-none fixed inset-0 bg-black/95 transition-opacity duration-150 animate-pulse"
          style={{ zIndex: 9998 }}
        />
      )}

      {/* 🔣 6. TERMINAL TEXT SCRAMBLE */}
      {activeFx === "SCRAMBLE" && (
        <div
          className="fixed inset-0 pointer-events-none flex flex-wrap content-start overflow-hidden opacity-30 mix-blend-screen p-10 animate-[fastScramble_2s_linear_forwards]"
          style={{ zIndex: 9998 }}
        >
          {Array.from({ length: 150 }).map((_, i) => (
            <span
              key={i}
              className="text-[12px] md:text-sm font-black mr-4 mb-2 tracking-widest"
              style={{ color: themeColor, textShadow: `0 0 5px ${themeColor}` }}
            >
              0x{Math.random().toString(16).substr(2, 6).toUpperCase()}
            </span>
          ))}
        </div>
      )}

      {/* 🌧️ 7. DATA CASCADE OVERFLOW */}
      {activeFx === "CASCADE" && (
        <div
          className="fixed inset-0 pointer-events-none opacity-20 mix-blend-screen"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Ctext x='10' y='20' fill='${svgThemeColor}' font-family='monospace' font-size='14' font-weight='900'%3E0 1 0 1 1 0%3C/text%3E%3Ctext x='60' y='80' fill='${svgThemeColor}' font-family='monospace' font-size='14' font-weight='900'%3E1 1 0 0 0 1%3C/text%3E%3Ctext x='110' y='140' fill='${svgThemeColor}' font-family='monospace' font-size='14' font-weight='900'%3E0 0 1 1 0 0%3C/text%3E%3C/svg%3E")`,
            backgroundSize: "160px 160px",
            animation: "cascadeDown 4s linear forwards",
            zIndex: 9998,
          }}
        />
      )}

      {/* 🛡️ 8. BREATHING FOCUS SHIELD (Kognitívna vinetácia) */}
      {activeFx === "SHIELD" && (
        <div
          className="fixed inset-0 pointer-events-none animate-[breathingShield_4s_ease-in-out_forwards]"
          style={{
            boxShadow: `inset 0 0 200px 30px ${themeColor}40, inset 0 0 400px 100px rgba(0,0,0,0.95)`,
            zIndex: 9998,
          }}
        />
      )}

      {/* 🔝/🔽 SCROLL NAVIGATION BUTTONS */}
      <div
        className="fixed bottom-10 right-6 md:right-10 flex flex-col gap-3"
        style={{ zIndex: 9997 }}
      >
        <button
          onClick={scrollToTop}
          className={`p-3 md:p-4 rounded-2xl border bg-black/80 backdrop-blur-xl transition-all duration-500 hover:scale-110 active:scale-95 ${showScrollTop ? "translate-y-0 opacity-100 pointer-events-auto" : "translate-y-10 opacity-0 pointer-events-none"}`}
          style={{
            borderColor: `${themeColor}40`,
            color: themeColor,
            boxShadow: `0 10px 30px rgba(0,0,0,0.5)`,
          }}
        >
          <ArrowUp size={24} />
        </button>
        <button
          onClick={scrollToBottom}
          className={`p-3 md:p-4 rounded-2xl border bg-black/80 backdrop-blur-xl transition-all duration-500 hover:scale-110 active:scale-95 ${showScrollBottom ? "translate-y-0 opacity-100 pointer-events-auto" : "translate-y-10 opacity-0 pointer-events-none"}`}
          style={{
            borderColor: `${themeColor}40`,
            color: themeColor,
            boxShadow: `0 10px 30px rgba(0,0,0,0.5)`,
          }}
        >
          <ArrowDown size={24} />
        </button>
      </div>

      <style>{`
      /* Animácia orezania: Plynule a sekane odkrýva text zľava doprava ako písací stroj */
        @keyframes typeReveal {
            from { clip-path: inset(0 100% 0 0); }
            to { clip-path: inset(0 0 0 0); }
        }
        /* Blikajúci 90s terminálový kurzor */
        @keyframes blinkCaret {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
        }
        @keyframes globalScan { 0% { top: -10px; opacity: 0; } 10% { opacity: 0.6; } 90% { opacity: 0.6; } 100% { top: 100vh; opacity: 0; } }
        @keyframes intenseLightning { 0% { opacity: 0; } 20% { opacity: 0.9; filter: brightness(2); } 40% { opacity: 0; } 60% { opacity: 1; filter: brightness(3); } 100% { opacity: 0; } }
        @keyframes fastScramble { 0%, 100% { opacity: 0; filter: blur(2px); } 10%, 90% { opacity: 0.8; filter: blur(0px); } 50% { opacity: 0.3; } }
        @keyframes cascadeDown { 0% { background-position: 0 -100px; opacity: 0; } 15% { opacity: 0.4; } 85% { opacity: 0.4; } 100% { background-position: 0 400px; opacity: 0; } }
        @keyframes breathingShield { 0%, 100% { opacity: 0; } 30%, 70% { opacity: 1; } }
        @keyframes constantJitter { 0% { opacity: 0.8; filter: brightness(1) contrast(1.2); transform: scaleY(0.8) translateY(-1px); } 25% { opacity: 1; filter: brightness(2) contrast(1.5); transform: scaleY(1.5) translateY(1px); } 50% { opacity: 0.9; filter: brightness(1.5) contrast(1); transform: scaleY(1.1) translateY(0); } 75% { opacity: 0.7; filter: brightness(0.8) contrast(1.5); transform: scaleY(0.6) translateY(1px); } 100% { opacity: 0.8; filter: brightness(1) contrast(1.2); transform: scaleY(0.8) translateY(-1px); } }
        @keyframes energyFlow { 0% { background-position: 0 0; } 100% { background-position: -50px 0; } }
        @keyframes laserGlitch { 0% { height: 2px; transform: perspective(1000px) rotateX(0deg); filter: brightness(1); } 40% { height: 40px; transform: perspective(1000px) rotateX(0deg); filter: brightness(2) hue-rotate(30deg); } 60% { height: 40px; transform: perspective(1000px) rotateX(1080deg); filter: brightness(3) hue-rotate(-30deg); } 100% { height: 2px; transform: perspective(1000px) rotateX(0deg); filter: brightness(1); } }
        
        .electric-jitter { animation: constantJitter 0.08s infinite; }
        .laser-glitch-effect::after { content: ''; position: absolute; inset: 0; background: repeating-linear-gradient(90deg, transparent, transparent 10px, rgba(255,255,255,0.6) 12px, rgba(255,255,255,0.9) 15px); animation: energyFlow 0.3s linear infinite; mix-blend-mode: overlay; pointer-events: none; }
        .laser-glitch-effect { background: var(--theme-color); box-shadow: 0 0 40px 2px var(--theme-color), 0 0 15px var(--theme-color); animation: laserGlitch 4s ease-in-out forwards; transform-origin: center; transform-style: preserve-3d; }
      `}</style>
    </>
  );
};
