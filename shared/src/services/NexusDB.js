// ============================================================================
// ⚠️ LOKÁLNE IMPORTY PRE VÁŠ PROJEKT (ODKOMENTUJTE V LOKÁLNOM KÓDE) ⚠️
// ============================================================================

import { APP_ID, dbCore } from "@shared/data/nexusConfig.js";
import fallbackData from "@shared/data/nexusFallback.json";
import { checkPermission } from "@shared/data/permissionsRegistry.js";
/**
 * 🛰️ NEXUS OS: DATABASE ABSTRACTION LAYER (THE BRIDGE)
 * PROTOKOL: EXODUS | VERZIA: 1.2.1-AUTOHEAL
 * ARCHITEKT: [Váš Nick]
 */

import { addDoc, arrayRemove, arrayUnion, collection, deleteDoc, doc, getDocs, increment, limit, onSnapshot, orderBy, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";

// ============================================================================
// 🛑 MOCK PRE CANVAS NÁHĽAD (ZMAŽTE V LOKÁLNOM PROJEKTE) 🛑
// ============================================================================

// ============================================================================

// ============================================================================
// ⚙️ KONFIGURÁCIA MATRIXU (TU PREPÍNATE REALITU)
// ============================================================================
export const CORE_CONFIG = {
  ACTIVE_PROVIDER: "SUPABASE", // 🛑 ZÁKAZ FIREBASE! MOŽNOSTI: "SUPABASE" | "LOCAL"
  FALLBACK_ENABLED: true,
  VERSION: "1.2.1-AUTOHEAL",
};

console.log(
  `%c 🛰️ [NEXUSDB_CORE]: Bootujem abstraktný most. Provider: ${CORE_CONFIG.ACTIVE_PROVIDER}`,
  "color: #39FF14; font-weight: bold;",
);

export const NexusDB = {
  // ==========================================================================
  // 📡 REAL-TIME ČÍTANIE (READ)
  // ==========================================================================
  subscribeToPosts(onData, onError) {
    if (CORE_CONFIG.ACTIVE_PROVIDER === "LOCAL") {
      console.log(
        "%c 🛡️ [SHIELD]: Načítavam príspevky z lokálneho JSON (Fallback).",
        "color: #FFD700;",
      );
      onData(fallbackData?.posts || []);
      return () => {};
    }

    if (CORE_CONFIG.ACTIVE_PROVIDER === "SUPABASE") {
      // ⚡ Čisté delegovanie práce na Supabase provider
      return SupabaseProvider.subscribeToPosts(onData);
    }

    return () => {};
  },

  subscribeToUsers(onData, onError) {
    if (CORE_CONFIG.ACTIVE_PROVIDER === "LOCAL") {
      console.log(
        "%c 🛡️ [SHIELD]: Načítavam entity z lokálneho JSON (Fallback).",
        "color: #FFD700;",
      );
      onData(fallbackData?.users || {});
      return () => {};
    }

    if (CORE_CONFIG.ACTIVE_PROVIDER === "SUPABASE") {
      // ⚡ Čisté delegovanie práce na Supabase provider
      return SupabaseProvider.subscribeToUsers(onData);
    }

    return () => {};
  },
  // ==========================================================================
  // 📤 ODOSLANIE SIGNÁLU (CREATE) S INBOX & TOKENOMICS
  // ==========================================================================
  async createPost(payload, userState, allRawPosts) {
    if (CORE_CONFIG.ACTIVE_PROVIDER === "LOCAL") {
      throw new Error("V LOCAL režime nie je možný zápis.");
    }
    if (CORE_CONFIG.ACTIVE_PROVIDER === "FIREBASE") {
      if (!dbCore) throw new Error("Firebase Offline");

      // 1. Skener na @mentions
      const mentionRegex = /@"([^"]+)"/g;
      const mentionedNames = [];
      let match;
      while ((match = mentionRegex.exec(payload.content)) !== null) {
        if (!mentionedNames.includes(match[1])) mentionedNames.push(match[1]);
      }

      let mentionedEmails = [];
      if (mentionedNames.length > 0) {
        try {
          const snap = await getDocs(
            query(
              collection(dbCore, "artifacts", APP_ID, "users"),
              where("displayName", "in", mentionedNames),
            ),
          );
          snap.forEach((d) => {
            if (d.id !== userState?.email) mentionedEmails.push(d.id);
          });
        } catch (err) {
          console.warn("Mention scan failed");
        }
      }

      // 2. Vytvorenie dokumentu
      const postsRef = collection(
        dbCore,
        "artifacts",
        APP_ID,
        "public",
        "data",
        "nexus_posts",
      );
      const docRef = await addDoc(postsRef, {
        ...payload,
        timestamp: serverTimestamp(),
        reactions: {
          like: [],
          dislike: [],
          brain: [],
          eye: [],
          haha: [],
          wow: [],
          mention: mentionedEmails,
        },
        isPinned: false,
        authorId: userState?.email || "anonymous",
        authorName: userState?.displayName || "Neznáma Entita",
        authorTier: userState?.tier || "FREE",
        authorAvatar: userState?.avatar || "",
      });

      // 3. Odmeny a notifikácie za odpoveď
      if (payload.parentId && !userState?.isGuest && userState?.email) {
        const parentPost = allRawPosts.find((p) => p.id === payload.parentId);
        const isCitation = payload.content.trim().startsWith(">");

        if (parentPost && parentPost.authorId !== userState.email) {
          const actionText = isCitation ? "citoval tvoj" : "reagoval na tvoj";
          try {
            await addDoc(
              collection(
                dbCore,
                "artifacts",
                APP_ID,
                "users",
                parentPost.authorId,
                "messages",
              ),
              {
                senderId: userState.email,
                senderName: userState.displayName,
                text: `Operátor **${userState.displayName}** ${actionText} signál.`,
                timestamp: serverTimestamp(),
                isRead: false,
                isArchived: false,
                isSystem: false,
                linkId: docRef.id,
              },
            );
          } catch (e) {}
        }

        // Výpočet odmeny
        try {
          const baseReward = isCitation ? 0.3 : 0.5;
          const today = new Date().toISOString().split("T")[0];
          const currentDaily =
            userState.lastEarnedDate === today
              ? userState.dailyEarnedOC || 0
              : 0;
          const dailyLimit =
            checkPermission(userState.tier, "daily_reward_limit") || 10;

          let actualReward = baseReward;
          if (currentDaily + actualReward > dailyLimit)
            actualReward = Math.max(0, dailyLimit - currentDaily);
          actualReward = Number(actualReward.toFixed(2));

          if (actualReward > 0) {
            // ⚡ FIX: setDoc miesto updateDoc, ak Peňaženka ešte neexistuje, vytvorí sa.
            await setDoc(
              doc(dbCore, "artifacts", APP_ID, "users", userState.email),
              {
                credits: increment(actualReward),
                monthlyEarnedOC: increment(actualReward),
                yearlyEarnedOC: increment(actualReward),
                totalEarnedOC: increment(actualReward),
                dailyEarnedOC: currentDaily + actualReward,
                lastEarnedDate: today,
                transactionHistory: arrayUnion({
                  id: `TXN-NEW-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
                  date: new Date().toLocaleString("sk-SK"),
                  type: "REWARD",
                  action: isCitation ? "CITE_BONUS" : "REPLY_BONUS",
                  amount: actualReward,
                  currency: "OC",
                  timestamp: { seconds: Math.floor(Date.now() / 1000) },
                }),
              },
              { merge: true },
            );
          }
        } catch (err) {
          console.warn("Reward Failed", err);
        }
      }

      // Mentions Notifikácie
      mentionedEmails.forEach((email) => {
        addDoc(
          collection(dbCore, "artifacts", APP_ID, "users", email, "messages"),
          {
            senderId: "system_core",
            senderName: "SYSTEM_CORE (RADAR)",
            text: `Vaša entita bola označená v signáli od operátora **${userState?.displayName}**.`,
            timestamp: serverTimestamp(),
            isRead: false,
            isArchived: false,
            isSystem: true,
            linkId: docRef.id,
          },
        ).catch(() => {});
      });

      return docRef.id;
    }
  },

  // ==========================================================================
  // ⚙️ EXEKUTÍVNE AKCIE (UPDATE, DELETE, PIN, REACT)
  // ==========================================================================
  async executeAction(postId, action, data, userState, allRawPosts) {
    if (CORE_CONFIG.ACTIVE_PROVIDER === "LOCAL") return;
    if (CORE_CONFIG.ACTIVE_PROVIDER === "FIREBASE") {
      if (!dbCore) return;
      const postRef = doc(
        dbCore,
        "artifacts",
        APP_ID,
        "public",
        "data",
        "nexus_posts",
        postId,
      );

      if (action === "delete") {
        await deleteDoc(postRef);
      } else if (action === "pin") {
        await updateDoc(postRef, { isPinned: !!data });
      } else if (action === "react") {
        if (!userState?.email || userState?.isGuest)
          throw new Error("Nutná autorizácia.");
        const post = allRawPosts.find((p) => p.id === postId);
        if (!post) return;

        const currentReactions = post.reactions || {};
        const reactionTypes = [
          "like",
          "dislike",
          "brain",
          "eye",
          "haha",
          "wow",
        ];
        const rewardMap = {
          like: 0.1,
          dislike: -1.0,
          brain: 0.2,
          eye: 0.1,
          haha: 0.1,
          wow: 0.2,
        };

        let oldReaction = null;
        reactionTypes.forEach((t) => {
          if (
            currentReactions[t] &&
            currentReactions[t].includes(userState.email)
          )
            oldReaction = t;
        });

        const isRemoving = oldReaction === data;
        const isSwitching = oldReaction && oldReaction !== data;
        const isNew = !oldReaction;

        // Inbox Notifikácia
        if (!isRemoving && post.authorId && post.authorId !== userState.email) {
          try {
            await addDoc(
              collection(
                dbCore,
                "artifacts",
                APP_ID,
                "users",
                post.authorId,
                "messages",
              ),
              {
                senderId: userState.email,
                senderName: userState.displayName,
                text: `Operátor **${userState.displayName}** pridal sémantickú reakciu [${data.toUpperCase()}] na tvoj signál.`,
                timestamp: serverTimestamp(),
                isRead: false,
                isArchived: false,
                isSystem: false,
                linkId: post.id,
              },
            );
          } catch (e) {}
        }

        // Odmeny
        let grossReward = 0;
        if (isRemoving) grossReward = -(rewardMap[oldReaction] || 0);
        else if (isSwitching)
          grossReward = (rewardMap[data] || 0) - (rewardMap[oldReaction] || 0);
        else if (isNew) grossReward = rewardMap[data] || 0;

        if (grossReward !== 0) {
          const today = new Date().toISOString().split("T")[0];
          const currentDaily =
            userState.lastEarnedDate === today
              ? userState.dailyEarnedOC || 0
              : 0;
          const dailyLimit =
            checkPermission(userState.tier, "daily_reward_limit") || 10;

          let actualReward = grossReward;
          if (actualReward > 0 && currentDaily + actualReward > dailyLimit)
            actualReward = Math.max(0, dailyLimit - currentDaily);
          actualReward = Number(actualReward.toFixed(2));

          if (actualReward !== 0) {
            let txnDesc = isRemoving
              ? `Zrušenie reakcie [${oldReaction.toUpperCase()}]`
              : isSwitching
                ? `Zmena reakcie z [${oldReaction.toUpperCase()}] na [${data.toUpperCase()}]`
                : `Sémantická Reakcia [${data.toUpperCase()}]`;

            // ⚡ FIX: setDoc miesto updateDoc zabráni pádu pri prvotnej interakcii
            await setDoc(
              doc(dbCore, "artifacts", APP_ID, "users", userState.email),
              {
                credits: increment(actualReward),
                monthlyEarnedOC: increment(actualReward),
                yearlyEarnedOC: increment(actualReward),
                totalEarnedOC: increment(actualReward),
                dailyEarnedOC: Math.max(0, currentDaily + actualReward),
                lastEarnedDate: today,
                transactionHistory: arrayUnion({
                  id: `TXN-REA-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
                  date: new Date().toLocaleString("sk-SK"),
                  type: actualReward > 0 ? "REWARD" : "PENALTY",
                  action: `REACTION_${data.toUpperCase()}`,
                  item: `${txnDesc} | ${post.displayId || "Signál"}`,
                  amount: actualReward,
                  currency: "OC",
                  timestamp: { seconds: Math.floor(Date.now() / 1000) },
                }),
              },
              { merge: true },
            );
          }
        }

        // Update Reakcií
        const updatePayload = {};
        reactionTypes.forEach((t) => {
          if (t === data)
            updatePayload[`reactions.${t}`] = isRemoving
              ? arrayRemove(userState.email)
              : arrayUnion(userState.email);
          else if (currentReactions[t]?.includes(userState.email))
            updatePayload[`reactions.${t}`] = arrayRemove(userState.email);
        });
        await updateDoc(postRef, updatePayload);
      }
    }
  },

  async updatePost(postId, payload) {
    if (CORE_CONFIG.ACTIVE_PROVIDER === "LOCAL") return;
    if (CORE_CONFIG.ACTIVE_PROVIDER === "FIREBASE" && dbCore) {
      const postRef = doc(
        dbCore,
        "artifacts",
        APP_ID,
        "public",
        "data",
        "nexus_posts",
        postId,
      );
      await updateDoc(postRef, {
        ...payload,
        editedAt: serverTimestamp(),
        editCount: increment(1),
      });
    }
  },
};

export default NexusDB;
