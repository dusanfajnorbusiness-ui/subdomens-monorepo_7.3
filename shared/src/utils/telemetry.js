/**
 * 📡 PROJECT NEXUS — OS GENESIS EDITION (TELEMETRY MODULE V4 - PRODUCTION READY)
 * Path: src/utils/telemetry.js
 *
 * Central telemetry core for Google Ads Conversion Tracking (AW-17638452139).
 * Calibrated for B2C Memberships, Packs, KaaS PDF Sémantické Výťahy, and B2B Agency Services.
 * Supports both Campaign Keys and IDs as dictionary lookups for 100% data integrity.
 */

// 🛒 Unified Price Matrix (SSOT) mapping both KEYS and IDs to their exact EUR values
export const PRICE_MATRIX = {
  // =========================================================================
  // 🔑 KATEGÓRIA: Členské kľúče (Memberships) & B2C predplatné
  // =========================================================================
  "nexus-pro-14": 0.99,
  "kampan-14-nexus-pro": 0.99,
  membership_pro: 0.99,

  "nexus-omega-15": 2.99,
  "kampan-15-nexus-omega": 2.99,
  membership_omega: 2.99,

  "nexus-master-16": 4.99,
  "kampan-16-master-architect": 4.99,
  membership_master: 4.99,

  // =========================================================================
  // 🔋 KATEGÓRIA: Energetické balíky (OC Packs) & Jednorazové nákupy
  // =========================================================================
  "nexus-founders-17": 15.0,
  "kampan-17-nexus-founders-pack": 15.0,
  founders_pack: 15.0,

  "nexus-pocket-18": 5.0,
  "kampan-18-pocket-pack": 5.0,
  pocket_pack: 5.0,

  "nexus-starter-19": 25.0,
  "kampan-19-starter-pack": 25.0,
  starter_pack: 25.0,

  "nexus-marathon-20": 50.0,
  "kampan-20-marathon-pack": 50.0,
  marathon_pack: 50.0,

  "nexus-omegakey-21": 99.0,
  "kampan-21-omega-key-pack": 99.0,
  omega_key_pack: 99.0,

  // =========================================================================
  // 👑 KATEGÓRIA: Kódex, Mŕtve Knihy (KaaS Sémantické Výťahy) & Data-Books (20 PDFs)
  // =========================================================================
  "nexus-master-codex-32a": 198.0, // Equivalent of 5000 OC (high-ticket early access)
  CAMP_32A: 198.0,

  dead_books_archive_32b: 9.9, // Zastrešujúci archív / 1x PDF Výťah
  CAMP_32B: 9.9,

  "tolle-32b1": 9.9,
  CAMP_32B1: 9.9,

  "osho-32b2": 9.9,
  CAMP_32B2: 9.9,

  "ruiz-32b3": 9.9,
  CAMP_32B3: 9.9,

  "jung-32b4": 9.9,
  CAMP_32B4: 9.9,

  "chia-32b5": 9.9,
  CAMP_32B5: 9.9,

  "murphy-32b6": 9.9,
  CAMP_32B6: 9.9,

  "tepperwein-32b7": 9.9,
  CAMP_32B7: 9.9,

  "newton-32b8": 9.9,
  CAMP_32B8: 9.9,

  "frankl-32b9": 9.9,
  CAMP_32B9: 9.9,

  "freud-32b10": 9.9,
  CAMP_32B10: 9.9,

  "kahneman-32b11": 9.9,
  CAMP_32B11: 9.9,

  "sujiva-32b12": 9.9,
  CAMP_32B12: 9.9,

  "carnegie-32b13": 9.9,
  CAMP_32B13: 9.9,

  "clason-32b14": 9.9,
  CAMP_32B14: 9.9,

  "hill-32b15": 9.9,
  CAMP_32B15: 9.9,

  "walsch-32b16": 9.9,
  CAMP_32B16: 9.9,

  "kiyosaki-32b17": 9.9,
  CAMP_32B17: 9.9,

  "budha-32b18": 9.9,
  CAMP_32B18: 9.9,

  // --- Ostatné plánované Data-Booky (Category 2 - PRO/OMEGA) ---
  "the-workflow-system-reboot-32c": 9.9,
  CAMP_32C: 9.9,
  "cash-engine-dlhova-defragmentacia-32d": 9.9,
  CAMP_32D: 9.9,
  "trojan-horse-advertising-neuromarketing-32e": 9.9,
  CAMP_32E: 9.9,
  "kognitivny-overclocking-absorpcia-dat-32f": 9.9,
  CAMP_32F: 9.9,
  "codm-damage-run-architektura-32g": 9.9,
  CAMP_32G: 9.9,
  "poprava-insomnie-shutdown-protokol-32h": 9.9,
  CAMP_32H: 9.9,
  "assets-matrix-globalna-alokacia-32i": 9.9,
  CAMP_32I: 9.9,
  "it-skills-tree-git-deployment-32j": 9.9,
  CAMP_32J: 9.9,

  // =========================================================================
  // 💼 KATEGÓRIA: B2B/C Služby (Nexus Agency)
  // =========================================================================
  srv_uiux_audit: 30.0,
  "agency-kampan-01-uiux-diagnostika-webu": 30.0,

  srv_frontend_surgery: 25.0,
  "agency-kampan-02-front-end-chirurgia-uprava-kodu": 25.0,

  srv_excel_data: 25.0,
  "agency-kampan-03-excel-diagnostika-organizacia-dat": 25.0,

  srv_virtual_admin: 20.0,
  "agency-kampan-04-virtualna-administrativa-prepis-dat": 20.0,

  srv_semantic_dec: 20.0,
  "agency-kampan-05-uprava-textov-semanticka-dekompresia": 20.0,

  srv_posts_scripts: 20.0,
  "agency-kampan-06-pisanie-prispevkov-predajnych-scriptov": 20.0,

  srv_ghostwriting: 25.0,
  "agency-kampan-07-ghostwriting-tvorba-e-bookov": 25.0,

  srv_video_editing: 20.0,
  "agency-kampan-08-dynamicky-strih-videi-shorts-reels": 20.0,

  srv_codm_manual: 50.0,
  "agency-kampan-09-codm-zombies-takticky-manual": 50.0,

  srv_ffvii_license: 20.0,
  "agency-kampan-10-b2b-licencia-ffvii-ultimate-guide": 20.0,

  srv_ffviii_license: 20.0,
  "agency-kampan-11-b2b-licencia-ffviii-ultimate-guide": 20.0,

  srv_trinity_waitlist: 15.0,
  "agency-kampan-12-trinity-apps-rezervacia-kapacity": 15.0,

  srv_franchise_license: 20.0,
  "agency-kampan-13-nexus-franchise-license": 20.0,
};

/**
 * Sends a B2C Macro-Conversion (Purchase) packet to the Google Ads Reactor.
 * This is triggered dynamically when any click interceptor captures a redirect.
 *
 * @param {string} productKey - Key or ID from the PRICE_MATRIX (e.g., 'tolle-32b1' or 'CAMP_32B1')
 * @param {string} customTransactionId - Unique ID to prevent RAM packet duplication (optional)
 */
export function trackNexusPurchase(productKey, customTransactionId = "") {
  const value = PRICE_MATRIX[productKey] || 1.0; // 1.00 EUR baseline fallback to prevent data packet loss

  if (typeof window.gtag !== "undefined") {
    window.gtag("event", "conversion", {
      send_to: "AW-17638452139/OMJeCKDd5uEcEKvX1dpB",
      value: Number(value),
      currency: "EUR",
      transaction_id: customTransactionId || `tx_${productKey}_${Date.now()}`,
    });
    console.log(
      `%c[📡 TELEMETRY] Uplink Successful — Product: ${productKey} | Value: ${value} EUR`,
      "color: #FFD700; font-weight: bold;",
    );
  } else {
    console.warn(
      `%c[📡 TELEMETRY] Google Tag Offline — Conversion event: ${productKey} not sent. Check Shield settings.`,
      "color: #FF003C;",
    );
  }
}

/**
 * Sends a B2B Micro-Conversion (Lead Form / Meeting Booking) packet to the Google Ads Reactor.
 * Triggered strictly when a user submits any contact form or books a call on Nexus Agency.
 *
 * @param {string} bookingName - Identifier of the booking action (optional)
 */
export function trackAgencyMeeting(bookingName = "default_booking") {
  if (typeof window.gtag !== "undefined") {
    window.gtag("event", "conversion", {
      send_to: "AW-17638452139/b-4ACPqt-uEcEKvX1dpB",
      value: 20.0,
      currency: "EUR",
    });
    console.log(
      `%c[📡 TELEMETRY] B2B Meeting Booked successfully: ${bookingName}`,
      "color: #39FF14; font-weight: bold;",
    );
  } else {
    console.warn(
      "[📡 TELEMETRY] Google Tag Offline — B2B Booking tracking failed.",
    );
  }
}

/**
 * Global Bridge Interceptor for Shop and Campaigns checkout ports.
 * Keeps clean JSX without manual onClick mappings.
 */
export function handleExternalCheckout(
  productKey,
  targetUrl,
  productTitle = "Item",
) {
  console.log(
    `%c[📡 TELEMETRY] Redirect Captured — Hooking: ${productTitle} (ID: ${productKey})`,
    "color: #00FFFF;",
  );

  // A) Spustenie zvukového efektu (ak existuje)
  if (typeof window.SoundFX !== "undefined" && window.SoundFX.click) {
    window.SoundFX.click();
  } else if (typeof window.triggerClick === "function") {
    window.triggerClick();
  }

  // B) Odpálenie Google Ads konverzie s automatickým namapovaním ceny
  trackNexusPurchase(productKey);

  // C) Bezpečný prechod na šifrovaný port checkoutu po uvoľnení paketu (150ms delay)
  setTimeout(() => {
    window.open(targetUrl, "_blank", "noopener,noreferrer");
  }, 150);
}
// 📡 Expose to window for global console testing & external HTML hooks
if (typeof window !== "undefined") {
  window.PRICE_MATRIX = PRICE_MATRIX;
  window.trackNexusPurchase = trackNexusPurchase;
  window.trackAgencyMeeting = trackAgencyMeeting;
  window.handleExternalCheckout = handleExternalCheckout;
}
