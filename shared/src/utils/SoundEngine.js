/**
 * 🔊 NEXUS SOUND ENGINE (V4.0 - BROWSER UNLOCK FIX)
 * DESIGNED BY | SERGEANT [CORE] DUŠAN FAJNOR
 * ---------------------------------------------------------------------------
 * Účel: Matematická syntéza vĺn.
 * Fix: Prehliadače blokovali AudioContext. Pridaný globálny senzor prvého
 * dotyku, ktorý zvukový modul odomkne na pozadí, hneď ako klikneš myšou.
 */

const isBrowser = typeof window !== "undefined";

let audioCtx = null;
let masterGain = null;
let isUnlocked = false;

// ============================================================================
// 1. INICIALIZÁCIA A ODOMKNUTIE AUDIO CONTEXTU
// ============================================================================
const initAudio = () => {
  if (!isBrowser) return null;

  if (!audioCtx) {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();

      // 🎛️ MASTER MIXPULT: Zníženie globálnej hlasitosti, aby to nekričalo
      masterGain = audioCtx.createGain();
      masterGain.gain.value = 0.15; // 15% hlasitosť
      masterGain.connect(audioCtx.destination);
    } catch (e) {
      console.warn("AudioContext blokovaný alebo nepodporovaný prehliadačom.");
    }
  }
  return audioCtx;
};

// ⚡ GLOBÁLNY UNLOCKER (Oklamanie ochrany prehliadačov)
const unlockAudio = () => {
  if (isUnlocked || !isBrowser) return;
  const ctx = initAudio();
  if (!ctx) return;

  // Ak je uspatý, skúsime ho prebudiť prvým klikom
  if (ctx.state === "suspended") {
    ctx.resume().then(() => {
      isUnlocked = true;
      // Upratanie po sebe, aby sme nezaťažovali pamäť
      ["click", "touchstart", "keydown"].forEach((evt) =>
        window.removeEventListener(evt, unlockAudio, true),
      );
    });
  } else {
    isUnlocked = true;
    ["click", "touchstart", "keydown"].forEach((evt) =>
      window.removeEventListener(evt, unlockAudio, true),
    );
  }

  // Tichý "výstrel" pre iOS a Safari (vyžaduje sa pre úplne prebudenie)
  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    gain.gain.value = 0; // Ticho
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(0);
    osc.stop(ctx.currentTime + 0.001);
  } catch (e) {}
};

if (isBrowser) {
  // Zavesíme senzory na celú stránku (vykoná sa len raz pri prvom kontakte)
  ["click", "touchstart", "keydown"].forEach((evt) =>
    window.addEventListener(evt, unlockAudio, true),
  );
}

// ============================================================================
// 2. SYNTÉZA VĹN (PLAY TONE)
// ============================================================================
const playTone = (type, startFreq, endFreq, duration, volume) => {
  if (!isBrowser) return;
  const ctx = audioCtx || initAudio();
  if (!ctx) return;

  // Pri HOVER efekte ("sine") nebudíme nasilu kontext, ak ešte nebol odomknutý klikom
  if (type === "sine" && ctx.state !== "running") return;

  if (ctx.state === "suspended") {
    ctx.resume().catch(() => {});
  }

  try {
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(startFreq, t);

    if (endFreq) {
      osc.frequency.exponentialRampToValueAtTime(endFreq, t + duration);
    }

    // ADSR Obálka (Odstraňuje "pukanie" na konci zvuku)
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(volume, t + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, t + duration);

    osc.connect(gain);
    gain.connect(masterGain || ctx.destination);

    osc.start(t);
    osc.stop(t + duration);
  } catch (e) {
    console.warn("Nexus Audio Error:", e);
  }
};

// ============================================================================
// 3. EXPORT KNIŽNICE EFEKTOV
// ============================================================================
export const SoundFX = {
  hover: () => playTone("sine", 1200, null, 0.05, 0.015),
  click: () => playTone("square", 400, 50, 0.1, 0.05),
  error: () => playTone("sawtooth", 150, 50, 0.3, 0.1),
  success: () => {
    playTone("triangle", 600, null, 0.1, 0.05);
    setTimeout(() => playTone("triangle", 800, null, 0.1, 0.05), 100);
  },
};

export default SoundFX;
