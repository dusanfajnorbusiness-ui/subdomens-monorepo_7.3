import { NexusPingEngine } from "@shared/utils/NexusPingEngine.js";
import { supabase } from "@shared//services/NexusDB_Supabase.js";
import { APP_ID, dbCore } from "@shared/data/nexusConfig.js";
import fallbackData from "@shared/data/nexusFallback.json";
import { EXODUS_CONFIG } from "@shared/services/NexusDB_Config.js";
import { addDoc, arrayRemove, arrayUnion, collection, deleteDoc, doc, getDoc, increment, onSnapshot, query, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";

export const NexusDB_Blog = {
  // ==========================================================================
  // 📡 POSTS (HLAVNÝ FEED BLOGU)
  // ==========================================================================
  
  subscribeToPosts(onData) {
    if (EXODUS_CONFIG.ACTIVE_PROVIDER === "LOCAL" || !dbCore) {
      onData(fallbackData?.posts || []);
      return () => {};
    }
    try {
      const postsRef = collection(
        dbCore,
        "artifacts",
        APP_ID,
        "public",
        "data",
        "nexus_posts",
      );
      return onSnapshot(postsRef, (snap) => {
        const posts = [];
        snap.forEach((d) => posts.push({ id: d.id, ...d.data() }));
        onData(posts);
      });
    } catch (e) {
      onData(fallbackData?.posts || []);
      return () => {};
    }
  },

  // ==========================================================================
  // 📡 USERS (PRE RADAR A AUTOROV)
  // ==========================================================================
  subscribeToUsers(onData) {
    if (EXODUS_CONFIG.ACTIVE_PROVIDER === "LOCAL" || !dbCore) {
      onData(fallbackData?.users || {});
      return () => {};
    }
    try {
      const usersRef = collection(dbCore, "artifacts", APP_ID, "users");
      return onSnapshot(usersRef, (snap) => {
        const usersMap = {};
        snap.forEach((d) => {
          usersMap[d.id] = d.data();
        });
        onData(usersMap);
      });
    } catch (e) {
      onData(fallbackData?.users || {});
      return () => {};
    }
  },

  // ==========================================================================
  // 📡 BLOG NOTIFICATIONS (RADAR PRE ZELENÚ SIGNÁLKU)
  // ==========================================================================
  subscribeToBlogNotifications(email, onData) {
    if (EXODUS_CONFIG.ACTIVE_PROVIDER === "LOCAL" || !dbCore || !email) {
      onData(false);
      return () => {};
    }
    try {
      const q = query(
        collection(dbCore, "artifacts", APP_ID, "users", email, "messages"),
      );
      return onSnapshot(q, (snapshot) => {
        let hasReactions = false;
        snapshot.forEach((docSnap) => {
          const d = docSnap.data();
          if (
            !d.isRead &&
            !d.isArchived &&
            d.text &&
            (d.text.includes("reakciu") ||
              d.text.includes("reagoval") ||
              d.text.includes("citoval") ||
              d.text.includes("označená"))
          ) {
            hasReactions = true;
          }
        });
        onData(hasReactions);
      });
    } catch (e) {
      onData(false);
      return () => {};
    }
  },

  // ==========================================================================
  // 📤 CREATE & UPDATE POST
  // ==========================================================================
  async createPost(payload, userState, allRawPosts) {
    const isLocal =
      typeof window !== "undefined" &&
      (window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1");

    if (isLocal) {
      console.warn(
        "🛡️ [NEXUS_SHIELD]: Zápis a Broadcast blokovaný. Vraciam MOCK objekt pre UI.",
      );
      return {
        id: `local-mock-${Date.now()}`,
        ...payload,
        authorId: userState.email || "lokalny-tester@nexus.sk",
        authorName: userState.displayName || "Local_Tester",
        authorAvatar: userState.avatar || "",
        authorTier: userState.tier || "FREE",
        timestamp: new Date().toISOString(),
        reactions: {
          like: [],
          dislike: [],
          brain: [],
          eye: [],
          haha: [],
          wow: [],
          mention: [],
        },
      };
    }

    // TENTO KÓD SA VYKONÁ LEN NA OSTREJ PRODUKCII (Premenná docRef voľne dýcha)
    if (!dbCore) throw new Error("DB_OFFLINE");

    const docRef = await addDoc(
      collection(dbCore, "artifacts", APP_ID, "public", "data", "nexus_posts"),
      {
        ...payload,
        authorId: userState.email,
        authorName: userState.displayName || userState.email.split("@"),
        authorAvatar: userState.avatar || "",
        authorTier: userState.tier || "FREE",
        timestamp: serverTimestamp(),
        reactions: {
          like: [],
          dislike: [],
          brain: [],
          eye: [],
          haha: [],
          wow: [],
          mention: [],
        },
      },
    );
    // ⚡ EXODUS FIX: Zjednotenie odmien aj pre uzly
    if (
      (payload.parentId || payload.nodeAction) &&
      !userState?.isGuest &&
      userState?.email
    ) {
      // 1. 🟢 NOTIFIKÁCIA AUTOROVI VLÁKNA (Cez Firewall NexusPingEngine)
      if (payload.parentId && allRawPosts) {
        const parentPost = allRawPosts.find((p) => p.id === payload.parentId);
        const isCitation = payload.content.trim().startsWith(">");

        if (parentPost && parentPost.authorId !== userState.email) {
          const actionText = isCitation ? "citoval tvoj" : "reagoval na tvoj";

          // 🛡️ FIREWALL KONTROLA PRED VÝSTRELOM: "Má tento adresát zapnuté Odpovede?"
          const pingResult = await NexusPingEngine.dispatchPing(
            "reply",
            parentPost.authorId,
            {},
          );

          // Ak Firewall povolil (pingSent: true), strieľame do Inboxu
          if (pingResult && pingResult.pingSent) {
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
            } catch (e) {
              console.error("🔴 Chyba pri zápise notifikácie:", e);
            }
          }
        }
      }

      // 2. 🟢 RADAR PRE @MENTIONS (Detekcia a Notifikácia označených Entít)
      if (payload.content && allRawPosts) {
        const mentionRegex = /@([a-zA-Z0-9_.-]+)/g;
        const mentions = payload.content.match(mentionRegex);

        if (mentions) {
          // Očistíme mená od "@" a odstránime duplicity
          const uniqueNames = [...new Set(mentions.map((m) => m.substring(1)))];

          for (const mentionedName of uniqueNames) {
            // Nájdeme email adresáta na základe jeho displayName v doterajších postoch
            const mentionedUserPost = allRawPosts.find(
              (p) => p.authorName === mentionedName,
            );

            if (
              mentionedUserPost &&
              mentionedUserPost.authorId !== userState.email
            ) {
              const targetEmail = mentionedUserPost.authorId;

              // 🛡️ FIREWALL KONTROLA PRE ZMIENKY: "Má tento adresát zapnuté Mentions?"
              const pingResult = await NexusPingEngine.dispatchPing(
                "mention",
                targetEmail,
                {},
              );

              if (pingResult && pingResult.pingSent) {
                try {
                  await addDoc(
                    collection(
                      dbCore,
                      "artifacts",
                      APP_ID,
                      "users",
                      targetEmail,
                      "messages",
                    ),
                    {
                      senderId: userState.email,
                      senderName: userState.displayName,
                      text: `Operátor **${userState.displayName}** ťa označil (@) vo vlákne.`,
                      timestamp: serverTimestamp(),
                      isRead: false,
                      isArchived: false,
                      isSystem: false,
                      linkId: docRef.id,
                    },
                  );
                } catch (e) {
                  console.error("🔴 Chyba pri zápise zmienky:", e);
                }
              }
            }
          }
        }
      }

      // 3. Výpočet odmeny
      try {
        const isCitation = payload.content.trim().startsWith(">");
        const isNode = !!payload.nodeAction;
        const baseReward =
          isCitation || payload.nodeAction === "cite" ? 0.3 : 0.5;
        const today = new Date().toISOString().split("T")[0];
        const currentDaily =
          userState.lastEarnedDate === today ? userState.dailyEarnedOC || 0 : 0;
        const dailyLimit = 10;

        let actualReward = baseReward;
        if (currentDaily + actualReward > dailyLimit)
          actualReward = Math.max(0, dailyLimit - currentDaily);
        actualReward = Number(actualReward.toFixed(2));

        if (actualReward > 0) {
          const actionCode = isNode
            ? payload.nodeAction === "cite"
              ? "NODE_CITE_BONUS"
              : "NODE_REPLY_BONUS"
            : isCitation
              ? "CITE_BONUS"
              : "REPLY_BONUS";
          const itemDesc = isNode
            ? payload.nodeAction === "cite"
              ? "Citácia statického uzla"
              : "Diskusia k statickému uzlu"
            : isCitation
              ? "Citácia sémantického uzla"
              : "Diskusia k signálu";

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
                action: actionCode,
                item: itemDesc,
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

    return docRef.id;
  },

  async updatePost(postId, updatePayload) {
    if (!dbCore) throw new Error("DB_OFFLINE");
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
      ...updatePayload,
      editedAt: serverTimestamp(),
      editCount: increment(1),
    });
  },

  // ==========================================================================
  // ⚔️ EXECUTE ACTION (Delete, Pin, React, Ban v Blogu)
  // ==========================================================================
  async executeAction(postId, action, data, userState, allRawPosts) {
    if (!dbCore) throw new Error("DB_OFFLINE");
    const postRef = doc(
      dbCore,
      "artifacts",
      APP_ID,
      "public",
      "data",
      "nexus_posts",
      postId,
    );

    if (action === "delete") await deleteDoc(postRef);
    if (action === "pin") await updateDoc(postRef, { isPinned: !!data });
    if (action === "ban_user") {
      const userRef = doc(dbCore, "artifacts", APP_ID, "users", data.userId);
      await updateDoc(userRef, { tier: data.isBanned ? "FREE" : "BANNED" });
    }
    if (action === "react") {
      const post = allRawPosts.find((p) => p.id === postId);
      if (!post) return;

      // 🛡️ Ochrana formátu: Pôvodne sa čakal len string, no z Blog-PostCard posielame objekt s odmenami
      const reactType = typeof data === "object" ? data.type : data;
      const targetEmail =
        typeof data === "object" ? data.targetAuthorId : post.authorId;

      const safeEmail = String(userState?.email || "QUEST_ANON").trim();
      const senderDisplayName =
        userState?.displayName ||
        (userState?.email ? userState.email.split("@") : "Anonymný Hosť");

      const currentReactions = post.reactions || {};
      const hasUser = (currentReactions[reactType] || []).includes(safeEmail);
      const updateObj = {};
      const reactionTypes = ["like", "dislike", "brain", "eye", "haha", "wow"];

      reactionTypes.forEach((t) => {
        if (t === reactType)
          updateObj[`reactions.${t}`] = hasUser
            ? arrayRemove(safeEmail)
            : arrayUnion(safeEmail);
        else if ((currentReactions[t] || []).includes(safeEmail))
          updateObj[`reactions.${t}`] = arrayRemove(safeEmail);
      });

      // Zápis Lajku do samotného vlákna
      await updateDoc(postRef, updateObj);

      // 🛡️ ZERO-PING FIREWALL: Odošle Inbox PING len ak operátor reakciu PRIDÁVA (!hasUser) a nereaguje sám na seba
      if (!hasUser && targetEmail && targetEmail !== userState.email) {
        // Colnica: Opýtame sa Nexusu, či má adresát zapnuté PINGy pre Reakcie
        const pingResult = await NexusPingEngine.dispatchPing(
          "reaction",
          targetEmail,
          {},
        );

        if (pingResult && pingResult.pingSent) {
          try {
            await addDoc(
              collection(
                dbCore,
                "artifacts",
                APP_ID,
                "users",
                targetEmail,
                "messages",
              ),
              {
                senderId: safeEmail,
                senderName: senderDisplayName,
                text: `Operátor **${senderDisplayName}** reagoval na tvoj signál.`,
                timestamp: serverTimestamp(),
                isRead: false,
                isArchived: false,
                isSystem: false,
                linkId: postId,
              },
            );
          } catch (e) {
            console.error("🔴 Chyba pri zápise reakcie do Inboxu:", e);
          }
        }
      }
    }
  },

  // ==========================================================================
  // 📡 STATIC NODES & FOOTERS (Pre GlobalPredFooterNode)
  // ==========================================================================
  subscribeToNode(nodeId, onData) {
    if (EXODUS_CONFIG.ACTIVE_PROVIDER === "LOCAL" || !dbCore) {
      onData(null);
      return () => {};
    }
    try {
      const nodeRef = doc(
        dbCore,
        "artifacts",
        APP_ID,
        "public",
        "data",
        "posts",
        `NODE_${nodeId}`,
      );
      return onSnapshot(nodeRef, (snap) => {
        if (snap.exists()) onData(snap.data());
        else onData(null);
      });
    } catch (e) {
      onData(null);
      return () => {};
    }
  },

  async executeNodeAction(nodeId, action, type, userState) {
    if (EXODUS_CONFIG.ACTIVE_PROVIDER === "LOCAL" || !dbCore) return;

    const docId = `NODE_${nodeId}`;
    const postRef = doc(
      dbCore,
      "artifacts",
      APP_ID,
      "public",
      "data",
      "posts",
      docId,
    );

    if (action === "react") {
      const snap = await getDoc(postRef);
      const safeEmail = String(userState?.email || "QUEST_ANON").trim();
      const isQuestUser =
        !userState?.email || userState?.isGuest || safeEmail === "QUEST_ANON";
      const myUserId = safeEmail;
      const reactionTypes = ["like", "dislike", "brain", "eye", "haha", "wow"];
      const rewardMap = {
        like: 0.1,
        dislike: -1.0,
        brain: 0.2,
        eye: 0.1,
        haha: 0.1,
        wow: 0.2,
      };

      let oldReaction = null;
      if (snap.exists()) {
        const cr = snap.data().reactions || {};
        reactionTypes.forEach((t) => {
          if ((cr[t] || []).includes(myUserId)) oldReaction = t;
        });
      }

      const isRemoving = oldReaction === type;
      const isSwitching = oldReaction && oldReaction !== type;
      const isNew = !oldReaction;

      // 1. BEZPEČNÝ ZÁPIS DO DATABÁZY - AK ZLYHÁ, ZASTAVÍ SA (ZABRAŇUJE OC FARMENIU)
      if (!snap.exists()) {
        try {
          const newReactions = {
            like: [],
            dislike: [],
            brain: [],
            eye: [],
            haha: [],
            wow: [],
          };
          newReactions[type] = [myUserId];
          await setDoc(postRef, {
            text: `[SYSTEM] Sémantický uzol ${nodeId} inicializovaný pre príjem reakcií.`,
            author: "SYSTEM_CORE",
            authorId: "system",
            dim: nodeId.split("-")[0],
            timestamp: serverTimestamp(),
            reactions: newReactions,
            isPinned: true,
          });
        } catch (e) {
          console.warn(
            "[NEXUS_DB]: Nemáte práva inicializovať uzol. Vizuálna reakcia beží iba u vás (Optimistic UI).",
          );
          return; // DÔLEŽITÉ: Ukončí proces, aby sa neprideľovali neoprávnené OC
        }
      } else {
        const currentReactions = snap.data().reactions || {};
        const hasUser = (currentReactions[type] || []).includes(myUserId);
        const updateObj = {};

        reactionTypes.forEach((t) => {
          if (t === type) {
            updateObj[`reactions.${t}`] = hasUser
              ? arrayRemove(myUserId)
              : arrayUnion(myUserId);
          } else if ((currentReactions[t] || []).includes(myUserId)) {
            updateObj[`reactions.${t}`] = arrayRemove(myUserId);
          }
        });

        try {
          await updateDoc(postRef, updateObj);
        } catch (e) {
          console.warn(
            "[NEXUS_DB]: Zamietnutá úprava reakcie na serveri. Vizuál zostáva lokálne.",
          );
          return; // DÔLEŽITÉ: Ukončí proces
        }
      }

      // 2. ⚡ EXODUS FIX: Zápis Odmien pre operátora IBA AK DATABÁZA NEZLYHALA
      if (isQuestUser) return; // Quest hosťom zapíšeme reakciu, ale vynecháme OC odmeny a zápis transakcií
      let grossReward = 0;
      if (isRemoving) grossReward = -(rewardMap[oldReaction] || 0);
      else if (isSwitching)
        grossReward = (rewardMap[type] || 0) - (rewardMap[oldReaction] || 0);
      else if (isNew) grossReward = rewardMap[type] || 0;

      if (grossReward !== 0) {
        const today = new Date().toISOString().split("T")[0];
        const currentDaily =
          userState.lastEarnedDate === today ? userState.dailyEarnedOC || 0 : 0;
        const dailyLimit = 10;

        let actualReward = grossReward;
        if (actualReward > 0 && currentDaily + actualReward > dailyLimit) {
          actualReward = Math.max(0, dailyLimit - currentDaily);
        }
        actualReward = Number(actualReward.toFixed(2));

        if (actualReward !== 0) {
          let txnDesc = isRemoving
            ? `Zrušenie reakcie [${oldReaction.toUpperCase()}] na uzol`
            : isSwitching
              ? `Zmena reakcie z [${oldReaction.toUpperCase()}] na [${type.toUpperCase()}] na uzol`
              : `Sémantická Reakcia [${type.toUpperCase()}] na uzol`;

          try {
            await setDoc(
              doc(dbCore, "artifacts", APP_ID, "users", myUserId),
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
                  action: `NODE_REACTION_${type.toUpperCase()}`,
                  item: `${txnDesc} | ${nodeId}`,
                  amount: actualReward,
                  currency: "OC",
                  timestamp: { seconds: Math.floor(Date.now() / 1000) },
                }),
              },
              { merge: true },
            );
          } catch (e) {
            console.warn("Reward update failed, check Firestore rules.", e);
          }
        }
      }
    }
  },

  // ==========================================================================
  // 🎬 NODE VIDEOS SUBSCRIBE (EXODUS PROTOCOL)
  // ==========================================================================
  subscribeToNodeVideo(nodeId, onData) {
    if (EXODUS_CONFIG.ACTIVE_PROVIDER === "LOCAL") {
      onData(null);
      return () => {};
    }

    // ⚡ 1. VETVA: SUPABASE (Čítanie a Real-time zobrazenie)
    if (EXODUS_CONFIG.ACTIVE_PROVIDER === "SUPABASE") {
      if (!supabase) return () => {};

      // A) Okamžité načítanie videa pri štarte uzla
      supabase
        .from("node_videos")
        .select("*")
        .eq("node_id", nodeId)
        .maybeSingle()
        .then(({ data }) => {
          if (data && data.youtube_id) onData({ youtubeId: data.youtube_id });
          else onData(null);
        });

      // B) Real-time odoberač (Ak pridáš video, okamžite sa zjaví na obrazovke)
      const channel = supabase
        .channel(`video_${nodeId}`)
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "node_videos",
            filter: `node_id=eq.${nodeId}`,
          },
          (payload) => {
            if (payload.eventType === "DELETE") onData(null);
            else if (payload.new && payload.new.youtube_id)
              onData({ youtubeId: payload.new.youtube_id });
          },
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }

    // 🔥 2. VETVA: FIREBASE FALLBACK (Mŕtvy kód)
    if (!dbCore) return () => {};
    const docRef = doc(
      dbCore,
      "artifacts",
      APP_ID,
      "public",
      "data",
      "node_videos",
      nodeId,
    );
    return onSnapshot(docRef, (snap) => {
      if (snap.exists() && snap.data().youtubeId) onData(snap.data());
      else onData(null);
    });
  },

  

  // ==========================================================================
  // 🎬 NODE VIDEOS UPDATE (EXODUS PROTOCOL)
  // ==========================================================================
  async updateNodeVideo(nodeId, youtubeId) {
    if (EXODUS_CONFIG.ACTIVE_PROVIDER === "LOCAL" || !dbCore)
      throw new Error("DB_OFFLINE");

    // ⚡ 1. VETVA: SUPABASE (EXODUS PROTOKOL)
    if (EXODUS_CONFIG.ACTIVE_PROVIDER === "SUPABASE") {
      if (!supabase) throw new Error("Supabase klient chýba!");

      if (youtubeId === null) {
        // TLAČIDLO ZMAZAŤ (Vyčistenie prepojenia v SQL)
        const { error } = await supabase
          .from("node_videos")
          .delete()
          .eq("node_id", nodeId);

        if (error) throw new Error("Supabase Delete Error: " + error.message);
      } else {
        // TLAČIDLO ULOŽIŤ (Vytvorenie alebo prepísanie)
        // ⚡ FIX: Odstránený neexistujúci stĺpec 'edited_by'
        const { error } = await supabase.from("node_videos").upsert(
          {
            node_id: nodeId,
            youtube_id: youtubeId,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "node_id" },
        );

        if (error) throw new Error("Supabase Upsert Error: " + error.message);
      }
      return;
    }

    // 🔥 2. VETVA: FIREBASE (MŔTVY KÓD - FALLBACK)
    const docRef = doc(
      dbCore,
      "artifacts",
      APP_ID,
      "public",
      "data",
      "node_videos",
      nodeId,
    );
    await setDoc(
      docRef,
      {
        youtubeId: youtubeId,
        lastEditedAt: serverTimestamp(),
        editedBy: "ARCHITECT",
      },
      { merge: true },
    );
  },

  // ==========================================================================
  // 🎙️ NODE PODCASTS SUBSCRIBE (EXODUS PROTOCOL)
  // ==========================================================================
  subscribeToNodePodcast(nodeId, onData) {
    // ⚡ 1. VETVA: SUPABASE (Čítanie a Real-time zobrazenie)
    if (EXODUS_CONFIG.ACTIVE_PROVIDER === "SUPABASE") {
      if (!supabase) return () => {};

      // A) Okamžité načítanie podcastu pri štarte uzla
      supabase
        .from("node_podcasts")
        .select("*")
        .eq("node_id", nodeId)
        .maybeSingle()
        .then(({ data }) => {
          if (data && data.youtube_id) onData({ youtubeId: data.youtube_id });
          else onData(null);
        });

      // B) Real-time odoberač (Ak pridáš audio, okamžite sa zjaví na obrazovke)
      const channel = supabase
        .channel(`podcast_${nodeId}`)
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "node_podcasts",
            filter: `node_id=eq.${nodeId}`,
          },
          (payload) => {
            if (payload.eventType === "DELETE") onData(null);
            else if (payload.new && payload.new.youtube_id)
              onData({ youtubeId: payload.new.youtube_id });
          },
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }

    // 🔥 2. VETVA: FIREBASE FALLBACK (Mŕtvy kód)
    if (!dbCore) return () => {};
    const docRef = doc(
      dbCore,
      "artifacts",
      APP_ID,
      "public",
      "data",
      "node_podcasts",
      nodeId,
    );
    return onSnapshot(docRef, (snap) => {
      if (snap.exists() && snap.data().youtubeId) onData(snap.data());
      else onData(null);
    });
  },

  // ==========================================================================
  // 🎙️ NODE PODCASTS UPDATE (EXODUS PROTOKOL)
  // ==========================================================================
  async updateNodePodcast(nodeId, youtubeId) {
    // ⚡ 1. VETVA: SUPABASE (EXODUS PROTOKOL)
    if (EXODUS_CONFIG.ACTIVE_PROVIDER === "SUPABASE") {
      if (!supabase) throw new Error("Supabase klient chýba!");

      if (youtubeId === null) {
        const { error } = await supabase
          .from("node_podcasts")
          .delete()
          .eq("node_id", nodeId);
        if (error) throw new Error("Supabase Delete Error: " + error.message);
      } else {
        // ⚡ FIX: Odstránený neexistujúci stĺpec 'edited_by'
        const { error } = await supabase.from("node_podcasts").upsert(
          {
            node_id: nodeId,
            youtube_id: youtubeId,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "node_id" },
        );
        if (error) throw new Error("Supabase Upsert Error: " + error.message);
      }
      return;
    }

    // 🔥 2. VETVA: FIREBASE (MŔTVY KÓD - FALLBACK)
    if (!dbCore)
      throw new Error("Firebase offline. Systém beží len na Supabase.");
    const docRef = doc(
      dbCore,
      "artifacts",
      APP_ID,
      "public",
      "data",
      "node_podcasts",
      nodeId,
    );
    await setDoc(
      docRef,
      {
        youtubeId: youtubeId,
        lastEditedAt: serverTimestamp(),
        editedBy: "ARCHITECT",
      },
      { merge: true },
    );
  },
};
