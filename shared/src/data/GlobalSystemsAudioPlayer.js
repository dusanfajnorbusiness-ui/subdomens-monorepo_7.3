/* eslint-disable no-undef */
// ============================================================================
// 👑 PROJECT NEXUS — OS GENESIS EDITION (SYS05 MASTER AUDIO REGISTRY V20.95)
// Súbor: shared/src/data/GlobalSystemsAudioPlayer.js
// Status: 100% GROUNDED // SUPABASE CDN // ZERO FALLBACK
// ============================================================================

export const CORE_VERSION = "GAT-AUDIO V20.95";

export const GLOBAL_SYSTEMS_AUDIO_TRACKS = [
  {
    id: "DW-52",
    dim: "DIM02",
    title: "Optimal Load",
    badge: "AP-DW-52 // DIM02",
    url: "https://ljyvsolsgliephsfkfgx.supabase.co/storage/v1/object/public/GlobalSystems/GlobalAudioPlayerForSystems/IN-AP-DW-52-DIM02_Optimal_Load_feed-1x1_ai-watermark.mp3"
  },
  {
    id: "DW-S03",
    dim: "SSOT",
    title: "Calculated Alignment",
    badge: "DW-S03 // ALIGNMENT",
    url: "https://ljyvsolsgliephsfkfgx.supabase.co/storage/v1/object/public/GlobalSystems/GlobalAudioPlayerForSystems/IN-DW-S03_Calculated_Alignment_feed-1x1_ai-watermark.mp3"
  },
  {
    id: "DW-S07",
    dim: "SSOT",
    title: "The Unwritten Page",
    badge: "DW-S07 // ZENITH",
    url: "https://ljyvsolsgliephsfkfgx.supabase.co/storage/v1/object/public/GlobalSystems/GlobalAudioPlayerForSystems/IN-DW-S07_The_Unwritten_Page_feed-1x1_ai-watermark.mp3"
  },
  {
    id: "DW-S11",
    dim: "SSOT",
    title: "The Steady Hand",
    badge: "DW-S11 // STEADY",
    url: "https://ljyvsolsgliephsfkfgx.supabase.co/storage/v1/object/public/GlobalSystems/GlobalAudioPlayerForSystems/IN-DW-S11_The_Steady_Hand_feed-1x1_ai-watermark.mp3"
  },
  {
    id: "DW-35",
    dim: "DIM01",
    title: "The Clockwork Horizon",
    badge: "VP-DW-35 // DIM01",
    url: "https://ljyvsolsgliephsfkfgx.supabase.co/storage/v1/object/public/GlobalSystems/GlobalAudioPlayerForSystems/IN-VP-DW-35-DIM01_The_Clockwork_Horizon_feed-1x1_ai-watermark.mp3"
  },
  {
    id: "DW-39",
    dim: "DIM05",
    title: "Strategic Stillness",
    badge: "VP-DW-39 // DIM05",
    url: "https://ljyvsolsgliephsfkfgx.supabase.co/storage/v1/object/public/GlobalSystems/GlobalAudioPlayerForSystems/IN-VP-DW-39-DIM05_Strategic_Stillness_feed-1x1_ai-watermark.mp3"
  },
  {
    id: "DW-43",
    dim: "DIM09",
    title: "The Immaculate Core",
    badge: "VP-DW-43 // DIM09",
    url: "https://ljyvsolsgliephsfkfgx.supabase.co/storage/v1/object/public/GlobalSystems/GlobalAudioPlayerForSystems/IN-VP-DW-43-DIM09_The_Immaculate_Core_feed-1x1_ai-watermark.mp3"
  },
  {
    id: "DW-44",
    dim: "DIM10",
    title: "Architecture of Clarity",
    badge: "VP-DW-44 // DIM10",
    url: "https://ljyvsolsgliephsfkfgx.supabase.co/storage/v1/object/public/GlobalSystems/GlobalAudioPlayerForSystems/IN-VP-DW-44-DIM10_Architecture_of_Clarity_feed-1x1_ai-watermark.mp3"
  }
];

// Fallback alias pre kompatibilitu:
export const DEEP_WORK_TRACKS = GLOBAL_SYSTEMS_AUDIO_TRACKS;

export const getTrackByIndex = (index) => {
  const safeIdx = Math.max(0, Math.min(Number(index || 0), GLOBAL_SYSTEMS_AUDIO_TRACKS.length - 1));
  return GLOBAL_SYSTEMS_AUDIO_TRACKS[safeIdx];
};

export default GLOBAL_SYSTEMS_AUDIO_TRACKS;