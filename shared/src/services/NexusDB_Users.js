import { APP_ID, dbCore } from "@shared/data/nexusConfig.js";
import fallbackData from "@shared/data/nexusFallback.json";
// ⚡ EXODUS FIX: Správna cesta k izolovanej konfigurácii (bráni zacykleniu s NexusDB_Core)
import { EXODUS_CONFIG } from "@shared/services/NexusDB_Config.js";
import { supabase } from "@shared/services/NexusDB_Supabase.js";
// 🛰️ EXODUS-READY: 11. 5. 2026 | MODUL: USERS & INBOX (V1.6.2)
import { addDoc, arrayUnion, collection, deleteDoc, doc, getDoc, getDocs, increment, onSnapshot, query, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";

export const NexusDB_Users = {
  // ==========================================================================
  // 🔐 AUTENTIFIKÁCIA A INICIALIZÁCIA ENTITY
  // ==========================================================================
  async verifyAndInitEntity(userEmail, initInfo) {
    if (EXODUS_CONFIG.ACTIVE_PROVIDER === "LOCAL" || !dbCore) {
      return {
        email: userEmail,
        tier: initInfo.tier,
        credits: initInfo.credits,
        isGuest: false,
      };
    }

    try {
      const userRef = doc(dbCore, "artifacts", APP_ID, "users", userEmail);
      const snap = await getDoc(userRef);

      let userData;
      if (!snap.exists()) {
        // Inicializácia novej entity
        userData = {
          email: userEmail,
          tier: initInfo.tier,
          credits: initInfo.credits,
          isGuest: false,
          displayName: userEmail.split("@")[0],
          unlockedNodes:
            initInfo.tier === "ARCHITECT" || initInfo.tier === "MASTER"
              ? ["NEXUS_MASTER_KEY"]
              : [],
          createdAt: serverTimestamp(),
        };
        await setDoc(userRef, userData);
      } else {
        // Entita existuje
        userData = snap.data();

        // ⚡ AUTO-HEAL PROTOCOL PRE ARCHITEKTA
        if (
          userEmail === "dusan.fajnor.business@gmail.com" &&
          userData.tier !== "ARCHITECT"
        ) {
          console.warn(
            "🛡️ ROOT OVERRIDE: Obnovujem stratený status Architekta v Databáze.",
          );
          await updateDoc(userRef, { tier: "ARCHITECT" });
          userData.tier = "ARCHITECT";
        }
      }
      return userData;
    } catch (err) {
      console.error("🔥 Firebase Init Error:", err);
      throw err;
    }
  },

  // ==========================================================================
  // 📡 SYNCHRONIZÁCIA IDENTITY A OPERÁTOROV
  // ==========================================================================
  subscribeToProfile(email, onData) {
    if (EXODUS_CONFIG.ACTIVE_PROVIDER === "LOCAL" || !dbCore || !email) {
      onData(fallbackData?.users?.[email] || null);
      return () => {};
    }
    const userRef = doc(dbCore, "artifacts", APP_ID, "users", email);
    return onSnapshot(userRef, (snap) => {
      if (snap.exists()) onData({ id: snap.id, ...snap.data() });
      else onData(null);
    });
  },

  subscribeToAllUsers(onData) {
    if (EXODUS_CONFIG.ACTIVE_PROVIDER === "LOCAL" || !dbCore) {
      onData([]);
      return () => {};
    }
    const q = collection(dbCore, "artifacts", APP_ID, "users");
    return onSnapshot(q, (snapshot) => {
      let ops = [];
      snapshot.forEach((d) => {
        const uData = d.data() || {};
        const rawTier = String(uData.tier || "FREE").toUpperCase();

        ops.push({
          id: d.id,
          ...uData,
          tier: rawTier === "QUEST" ? "FREE" : rawTier, // 🛡️ DB účty nikdy nespadnú do kategórie Quest
          isGuest: false, // 🛡️ DB záznam je VŽDY registrovaný operátor
        });
      });
      onData(ops);
    });
  },

  // ==========================================================================
  // 📡 INBOX & KOMUNIKÁCIA (PROTOKOL P2P)
  // ==========================================================================
  subscribeToMessages(email, subCollection = "messages", onData) {
    if (EXODUS_CONFIG.ACTIVE_PROVIDER === "LOCAL" || !dbCore || !email) {
      onData([]);
      return () => {};
    }
    const q = query(
      collection(dbCore, "artifacts", APP_ID, "users", email, subCollection),
    );
    return onSnapshot(q, (snapshot) => {
      let msgs = [];
      snapshot.forEach((d) => msgs.push({ id: d.id, ...d.data() }));
      // Zoradenie v pamäti (v rámci pravidla No Complex Queries)
      msgs.sort(
        (a, b) => (b.timestamp?.seconds || 0) - (a.timestamp?.seconds || 0),
      );
      onData(msgs);
    });
  },

  subscribeToUnreadMessages(email, onData) {
    if (EXODUS_CONFIG.ACTIVE_PROVIDER === "LOCAL" || !dbCore || !email) {
      onData(0);
      return () => {};
    }
    const q = collection(
      dbCore,
      "artifacts",
      APP_ID,
      "users",
      email,
      "messages",
    );
    return onSnapshot(q, (snapshot) => {
      let count = 0;
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        if (!data.isRead && !data.isArchived) count++;
      });
      onData(count);
    });
  },

  async sendMessage(senderData, recipientEmail, text) {
    if (EXODUS_CONFIG.ACTIVE_PROVIDER === "LOCAL" || !dbCore)
      throw new Error("OFFLINE");

    const payload = {
      text: text.trim(),
      senderId: senderData.email,
      senderName: senderData.displayName || senderData.email,
      senderAvatar: senderData.avatar || "",
      recipientId: recipientEmail,
      timestamp: serverTimestamp(),
      isRead: false,
      isArchived: false,
      isSystem: false,
    };

    // Dual-Write Protokol
    await addDoc(
      collection(
        dbCore,
        "artifacts",
        APP_ID,
        "users",
        recipientEmail,
        "messages",
      ),
      payload,
    );
    await addDoc(
      collection(
        dbCore,
        "artifacts",
        APP_ID,
        "users",
        senderData.email,
        "sent_messages",
      ),
      payload,
    );
    return true;
  },

  async updateMessageStatus(email, msgId, subCollection, updates) {
    if (EXODUS_CONFIG.ACTIVE_PROVIDER === "LOCAL" || !dbCore) return;
    const msgRef = doc(
      dbCore,
      "artifacts",
      APP_ID,
      "users",
      email,
      subCollection,
      msgId,
    );
    await updateDoc(msgRef, updates);
  },

  async deleteMessage(email, msgId, subCollection) {
    if (EXODUS_CONFIG.ACTIVE_PROVIDER === "LOCAL" || !dbCore) return;
    const msgRef = doc(
      dbCore,
      "artifacts",
      APP_ID,
      "users",
      email,
      subCollection,
      msgId,
    );
    await deleteDoc(msgRef);
  },

  // ==========================================================================
  // 🛡️ OSTATNÉ FUNKCIE (ADMIN, ZÁKONY, BACKUP)
  // ==========================================================================
  async pingActiveStatus(email) {
    if (EXODUS_CONFIG.ACTIVE_PROVIDER === "LOCAL" || !dbCore || !email) return;
    try {
      // ⚡ EXODUS FIX: Zmenené na setDoc s merge, aby to nepadlo, ak entita v DB ešte nie je vytvorená
      await setDoc(
        doc(dbCore, "artifacts", APP_ID, "users", email),
        { lastActive: serverTimestamp() },
        { merge: true },
      );
    } catch (e) {}
  },

  async updateProfileData(email, data) {
    if (EXODUS_CONFIG.ACTIVE_PROVIDER === "LOCAL" || !dbCore) return;
    const userRef = doc(dbCore, "artifacts", APP_ID, "users", email);
    await setDoc(
      userRef,
      { ...data, lastSync: serverTimestamp() },
      { merge: true },
    );
  },

  async updateUserTier(userId, newTier) {
    if (EXODUS_CONFIG.ACTIVE_PROVIDER === "LOCAL" || !dbCore) return;
    await updateDoc(doc(dbCore, "artifacts", APP_ID, "users", userId), {
      tier: newTier,
    });
  },

  async deleteUserRecord(userId) {
    if (EXODUS_CONFIG.ACTIVE_PROVIDER === "LOCAL" || !dbCore) return;
    await deleteDoc(doc(dbCore, "artifacts", APP_ID, "users", userId));
  },

  async broadcastSystemMessage(text, adminOperators) {
    if (EXODUS_CONFIG.ACTIVE_PROVIDER === "LOCAL" || !dbCore) return;
    await Promise.all(
      adminOperators.map(async (op) => {
        if (!op.email) return;
        await addDoc(
          collection(
            dbCore,
            "artifacts",
            APP_ID,
            "users",
            op.email,
            "messages",
          ),
          {
            text,
            senderId: "system_core",
            senderName: "SYSTEM_LOG",
            recipientId: op.email,
            timestamp: serverTimestamp(),
            isRead: false,
            isArchived: false,
            isSystem: true,
          },
        );
      }),
    );
  },

  async preRegisterEntity(email, tier) {
    if (EXODUS_CONFIG.ACTIVE_PROVIDER === "LOCAL" || !dbCore) return;
    await setDoc(doc(dbCore, "artifacts", APP_ID, "users", email), {
      email,
      tier,
      credits: 0,
      displayName: "Rezervovaná Entita",
      dossier: "Identita pred-registrovaná Systémom.",
      avatar: "",
      lastSync: serverTimestamp(),
    });
  },

  async updatePresenceAndMining(userState, sessionMins) {
    if (
      EXODUS_CONFIG.ACTIVE_PROVIDER === "LOCAL" ||
      !dbCore ||
      !userState?.email
    )
      return { resetMins: false };
    const userRef = doc(dbCore, "artifacts", APP_ID, "users", userState.email);
    let updates = { lastActive: serverTimestamp() };
    let resetMins = false;
    if (sessionMins >= 10) {
      const rewardOC = 0.1;
      const txnId = `TXN-TIME-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;

      const newTxn = {
        id: txnId,
        date: new Date().toLocaleString("sk-SK"),
        type: "REWARD",
        action: "UPTIME_BONUS",
        item: "Sémantické pripojenie: 10 minút",
        desc: "Autonómna ťažba (Proof of Presence). Odmena za udržiavanie stabilného spojenia s Matrixom.",
        amount: rewardOC,
        cost: rewardOC,
        currency: "OC",
        timestamp: { seconds: Math.floor(Date.now() / 1000) },
      };

      updates.credits = increment(rewardOC);
      updates.transactionHistory = arrayUnion(newTxn);
      updates.dailyActiveMinutes = increment(10);
      resetMins = true;
    }
    // ⚡ EXODUS FIX: Zmenené na setDoc s merge z rovnakého dôvodu (Auto-Heal prevencia proti NOT_FOUND chybe)
    await setDoc(userRef, updates, { merge: true });
    return { resetMins };
  },

  async getLaw(lawId, collectionName) {
    if (EXODUS_CONFIG.ACTIVE_PROVIDER === "LOCAL" || !dbCore) return "";
    try {
      const docRef = doc(
        dbCore,
        "artifacts",
        APP_ID,
        "public",
        "data",
        collectionName,
        lawId,
      );
      const snap = await getDoc(docRef);
      return snap.exists() ? snap.data().content : "";
    } catch (e) {
      return "";
    }
  },
  // ==========================================================================
  // 📜 INJEKTÁŽ SYSTÉMOVÝCH ZÁKONOV (SEEDER)
  // ==========================================================================
  async seedSystemLaws(lawsContent) {
    if (EXODUS_CONFIG.ACTIVE_PROVIDER === "LOCAL" || !dbCore) return;
    const { doc, setDoc } = await import("firebase/firestore");
    for (const [id, content] of Object.entries(lawsContent)) {
      const docRef = doc(
        dbCore,
        "artifacts",
        APP_ID,
        "public",
        "data",
        "system_laws",
        id,
      );
      await setDoc(
        docRef,
        {
          id,
          content: content.trim(),
          version: "V5.0-STUDIO",
          lastUpdate: new Date().toISOString(),
        },
        { merge: true },
      );
    }
  },

  async downloadCloudBackup() {
    if (!dbCore) return "# OFFLINE_ERROR";
    let masterContent = `# 🌌 NEXUS OS: MASTER CLOUD BACKUP\n> Export: ${new Date().toLocaleString()}\n\n`;
    const collections = [
      "system_laws",
      "dimension_meta",
      "mentor_system_laws",
      "personal_system_laws",
      "work_system_laws",
      "finance_system_laws",
      "business_system_laws",
      "investments_system_laws",
      "study_system_laws",
      "professional_system_laws",
      "reader_system_laws",
      "player_system_laws",
      "home_system_laws",
      "recovery_system_laws",
      "codex_system_laws",
      "habits_system_laws",
      "blog_system_laws",
    ];
    for (const col of collections) {
      try {
        const snap = await getDocs(
          collection(dbCore, "artifacts", APP_ID, "public", "data", col),
        );
        if (!snap.empty) {
          masterContent += `\n\n========================================================================\n// 📂 DATABÁZOVÝ KLASTER: [ ${col.toUpperCase()} ]\n========================================================================\n`;
          snap.forEach((d) => {
            const data = d.data();
            const contentText =
              data.content ||
              data.desc ||
              data.text ||
              "Prázdny alebo nekompatibilný uzol.";
            masterContent += `\n\n--- 🆔 ID UZLA: ${d.id} | 🏷️ ${data.title || data.name || "Bez Názvu"} ---\n\n${contentText}\n`;
          });
        }
      } catch (e) {}
    }
    return masterContent;
  },
  // ==========================================================================
  // 🛒 HARD CORE TRANSAKCIE (SHOP UPLINK)
  // ==========================================================================
  async processShopTransaction(
    email,
    campaignId,
    ocPrice,
    campaignTitle,
    category,
    monthsToRent = 0, // 🛑 NOVÝ PARAMETER: 0 = Doživotne, Číslo = Počet mesiacov (Časový zámok)
  ) {
    if (EXODUS_CONFIG.ACTIVE_PROVIDER === "LOCAL" || !supabase) {
      console.error(
        "[SYS_ERROR]: Nákup zamietnutý. Systém je v režime OFFLINE alebo chýba Supabase klient.",
      );
      throw new Error("OFFLINE_MODE");
    }

    try {
      // 1. Stiahnutie najčerstvejšej entity priamo zo Supabase Cloudu
      const { data: userData, error: fetchError } = await supabase
        .from("users")
        .select("*")
        .eq("email", email)
        .single();

      if (fetchError || !userData)
        throw new Error("Entita neexistuje v jadre Supabase.");

      // 2. TIER BYPASS (Ochrana vyšších hodností pred platením)
      const userTier = String(userData.tier || "FREE").toUpperCase();
      if (["OMEGA", "MASTER", "ARCHITECT"].includes(userTier)) {
        // Vystrelíme špecifický Error, ktorý frontend odchytí ako úspešnú hlášku
        throw new Error("CROWN_BYPASS");
      }

      // 3. Hard-Limit (Matematické overenie zostatku OC)
      const currentCredits = parseInt(userData.credits) || 0;
      const ocCost = parseInt(ocPrice) || 0;

      if (currentCredits < ocCost) {
        throw new Error("INSUFFICIENT_FUNDS");
      }

      const newCredits = currentCredits - ocCost;
      let currentNodes = userData.unlockedNodes || [];
      let currentLicenses = userData.activeLicenses || {};

      // 4. STACKING LOGIKA (Časový zámok) vs DOŽIVOTNÝ PRÍSTUP
      if (monthsToRent > 0) {
        let newExpDate = new Date();
        let currentExpDateStr = currentLicenses[campaignId];

        // Ak už má aktívny zámok a ešte nevypršal, pridávame čas K NEMU
        if (currentExpDateStr && new Date(currentExpDateStr) > new Date()) {
          newExpDate = new Date(currentExpDateStr);
        }

        // Prirátanie zakúpených mesiacov
        newExpDate.setMonth(newExpDate.getMonth() + monthsToRent);
        currentLicenses[campaignId] = newExpDate.toISOString();
      } else {
        // Doživotný nákup (Zápis do klasického poľa)
        if (currentNodes.includes(campaignId)) {
          throw new Error("ALREADY_OWNED");
        }
        currentNodes.push(campaignId);
      }

      // 5. Exekúcia odpočtu a odomknutia (Tvrdý Zápis do Supabase)
      const { error: updateError } = await supabase
        .from("users")
        .update({
          credits: newCredits,
          unlockedNodes: currentNodes,
          activeLicenses: currentLicenses,
        })
        .eq("email", email);

      if (updateError) throw updateError;

      // 6. Dual-Write: Zápis do Global Shop History pre tvoj Admin Dashboard
      const { error: historyError } = await supabase
        .from("global_shop_history")
        .insert([
          {
            operatorEmail: email,
            campaignId: campaignId,
            campaignTitle: campaignTitle,
            category: category,
            ocPrice: ocCost,
            type: "PURCHASE",
            created_at: new Date().toISOString(),
          },
        ]);

      if (historyError)
        console.error(
          "[SHOP_WARNING]: Zápis do histórie zlyhal:",
          historyError,
        );

      return {
        success: true,
        newCredits,
        newNodes: currentNodes,
        activeLicenses: currentLicenses,
      };
    } catch (error) {
      console.error("[SHOP_ERROR_LOG]: Zlyhanie transakcie:", error);
      throw error;
    }
  },
  // ==========================================================================
  // 🛒 OMEGA TRANSAKCIE (OC PAYWALL MODAL)
  // ==========================================================================
  processOCTransaction: async (email, priceOC, itemId, title, duration) => {
    try {
      if (!email) throw new Error("Chýba identita operátora (Email).");

      // 1. Získať zostatok a odomknuté uzly operátora
      const { data: user, error: fetchErr } = await supabase
        .from("users")
        .select("credits, unlocked_nodes, transaction_history")
        .eq("email", email)
        .single();

      if (fetchErr || !user)
        throw new Error("Chyba čítania peňaženky z Matrixu.");

      // 2. Kontrola zostatku (Tokenomics)
      const currentCredits = parseInt(user.credits || 0, 10);
      if (currentCredits < priceOC) {
        return {
          success: false,
          message: "Nedostatok OC kreditov. Vyžaduje sa dotácia.",
        };
      }

      // 3. Matematika: Strhnutie Kreditov
      const newCredits = currentCredits - priceOC;

      // 4. Zápis do poľa unlocked_nodes (Bezpečný JSON parsing)
      let unlocked = [];
      try {
        unlocked =
          typeof user.unlocked_nodes === "string"
            ? JSON.parse(user.unlocked_nodes || "[]")
            : user.unlocked_nodes;
      } catch (e) {
        unlocked = [];
      }

      // Ak tam efekt ešte nie je, pridaj ho (zabraňuje duplicite)
      if (!unlocked.includes(itemId)) {
        unlocked.push(itemId);
      }

      // 5. Zápis do poľa transaction_history (Lokálna Pokladňa)
      let history = [];
      try {
        history =
          typeof user.transaction_history === "string"
            ? JSON.parse(user.transaction_history || "[]")
            : user.transaction_history;
      } catch (e) {
        history = [];
      }

      history.push({
        id: `TX-${new Date().getTime()}`,
        type: "PURCHASE",
        item: itemId,
        title: title,
        amount: -priceOC,
        duration_months: duration,
        date: new Date().toISOString(),
      });

      // 6. Tvrdý Update do Supabase
      const { error: updateErr } = await supabase
        .from("users")
        .update({
          credits: newCredits.toString(), // Prepíšeme zostatok
          unlocked_nodes: JSON.stringify(unlocked), // Uložíme zakúpený uzol
          transaction_history: JSON.stringify(history), // Zápis logu
        })
        .eq("email", email);

      if (updateErr) throw updateErr;

      return { success: true };
    } catch (error) {
      console.error("[SYS_LOG_ERROR]: Paywall transakcia zlyhala:", error);
      return { success: false, message: error.message };
    }
  },
}; // ⬅️ TU KONČÍ CELÝ EXPORTOVANÝ OBJEKT DATABÁZY
