/* eslint-disable no-undef */
// ============================================================================
// 👑 NEXUS PING ENGINE — DEFENZÍVNY MOCK PRE SUBDOMÉNY
// ============================================================================

export const NexusPingEngine = {
  ping: () => {},
  log: () => {},
  track: () => {},
  sendPing: () => Promise.resolve({ success: true }),
};

export const pingNexus = () => {};
export const trackPing = () => {};

export default NexusPingEngine;