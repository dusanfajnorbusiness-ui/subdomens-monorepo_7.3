import { APP_ID, dbCore } from "@shared/data/nexusConfig.js";
import fallbackData from "@shared/data/nexusFallback.json";
import { EXODUS_CONFIG } from "@shared/services/NexusDB_Config.js";
// 🛰️ EXODUS-READY: 11. 5. 2026 | MODUL: NEXUS DB SHOP
import { arrayUnion, doc, increment, onSnapshot, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";

const TIER_RANK = {
  BANNED: 0,
  FREE: 1,
  PRO: 2,
  OMEGA: 3,
  MODERATOR: 4,
  ADMIN: 5,
  MASTER: 6,
  ARCHITECT: 7,
};

export const NexusDB_Shop = {
  subscribeToBalance(email, onData) {
    if (EXODUS_CONFIG.ACTIVE_PROVIDER === "LOCAL" || !dbCore || !email) {
      onData(fallbackData?.users?.[email]?.credits || 0);
      return () => {};
    }
    const userRef = doc(dbCore, "artifacts", APP_ID, "users", email);
    return onSnapshot(userRef, (snap) => {
      if (snap.exists()) onData(snap.data().credits || 0);
    });
  },

  // ⚡ EXODUS ADDON: Samostatná logika pre nákupy
  async processPurchase(
    userEmail,
    productIds,
    newTier,
    priceOc,
    currentTier,
    currentUnlocked,
    currentName,
  ) {
    if (EXODUS_CONFIG.ACTIVE_PROVIDER === "LOCAL" || !dbCore)
      throw new Error("DB_OFFLINE");

    const safeEmail = String(userEmail || "").trim();
    if (!safeEmail || safeEmail === "quest" || safeEmail === "NEXUS_GUEST") {
      throw new Error(
        "🛑 PRÍSTUP ZAMIETNUTÝ: Anonymný hosť (QUEST) nemôže vykonávať nákupy, míňať OC ani meniť TIER.",
      );
    }

    const userRef = doc(dbCore, "artifacts", APP_ID, "users", safeEmail);
    const txnId = `TXN-SHOP-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;

    const newTxn = {
      id: txnId,
      date: new Date().toLocaleString("sk-SK"),
      type: "EXPENSE",
      action: "PURCHASE",
      desc: `Nákup položiek: ${productIds.join(", ")} ${newTier ? `+ Povýšenie na ${newTier}` : ""}`,
      amount: -priceOc,
      currency: "OC",
      timestamp: serverTimestamp(),
    };

    let updates = {
      credits: increment(-priceOc),
      lastTransaction: serverTimestamp(),
      transactionHistory: arrayUnion(newTxn),
    };

    // Ochrana proti degradácii TIERu
    let finalTier = currentTier || "FREE";
    if (newTier) {
      const currentRank = TIER_RANK[currentTier || "FREE"] || 1;
      const newRank = TIER_RANK[newTier] || 1;
      if (newRank > currentRank) {
        updates.tier = newTier;
        finalTier = newTier;
      }
    }

    let updatedUnlocked = [...(currentUnlocked || [])];
    if (productIds && productIds.length > 0) {
      productIds.forEach((id) => {
        if (!updatedUnlocked.includes(id)) updatedUnlocked.push(id);
      });
      updates.unlockedNodes = updatedUnlocked;
    }

    // 1. Zápis na profil
    await updateDoc(userRef, updates);

    // 2. Globálny Ledger pre Architekta
    try {
      const globalTxnRef = doc(
        dbCore,
        "artifacts",
        APP_ID,
        "public",
        "data",
        "global_transactions",
        txnId,
      );
      await setDoc(globalTxnRef, {
        ...newTxn,
        userEmail: safeEmail,
        userName: currentName || "Neznáma Entita",
        serverTime: serverTimestamp(),
      });
    } catch (logErr) {
      console.warn("Global ledger zápis zlyhal.", logErr);
    }

    return { finalTier, updatedUnlocked };
  },
};
