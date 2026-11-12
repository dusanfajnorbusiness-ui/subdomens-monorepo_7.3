import { EXODUS_CONFIG } from "@shared/services/NexusDB_Config.js";
import { createClient } from "@supabase/supabase-js";

// 🛡️ INJEKCIA FIREWALLU PRE SUPABASE
// import { pingEngine } from "../utils/NexusPingEngine"; // 🛑 ZAKOMENTOVANÉ: Modul leží v @settings/utils
const pingEngine = { ping: () => {}, log: () => {} }; // Defenzívny V20 mock pre nulové runtime chyby

const rawUrl = EXODUS_CONFIG?.SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL || "";
const rawKey = EXODUS_CONFIG?.SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY || "";

const isValidUrl = Boolean(rawUrl && !rawUrl.includes("placeholder") && rawUrl.startsWith("https://"));

const supabaseUrl = isValidUrl ? rawUrl : "https://ljyvsolsgliephsfkfgx.supabase.co";
const supabaseAnonKey = (isValidUrl && rawKey) ? rawKey : "sb_publishable_0RCfN1RFadZ_5mpv2DQF1g_YaK3pt67";

// ⚡ PRIDANÝ EXPORT: Jednotná inštancia klienta bez rizika placeholder pádu
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});


// ⚡ BEZPEČNÝ PARSER REAKCIÍ
const safeParseReactions = (rawReactions) => {
  if (!rawReactions) return {};
  let parsed = rawReactions;
  if (typeof rawReactions === "string") {
    try {
      parsed = JSON.parse(rawReactions);
    } catch (e) {
      parsed = {};
    }
  }
  return parsed;
};

// ⚡ INTERNÝ KALKULÁTOR STATUSU
const calculateStatus = (lastActiveTimestamp) => {
  if (!lastActiveTimestamp) return "OFFLINE";
  let timeMs = 0;
  if (typeof lastActiveTimestamp === "string")
    timeMs = new Date(lastActiveTimestamp).getTime();
  else if (lastActiveTimestamp.seconds)
    timeMs = lastActiveTimestamp.seconds * 1000;
  else if (lastActiveTimestamp.toMillis)
    timeMs = lastActiveTimestamp.toMillis();
  else timeMs = new Date(lastActiveTimestamp).getTime();

  if (isNaN(timeMs)) return "OFFLINE";
  const diff = (Date.now() - timeMs) / 60000;
  if (diff <= 5) return "ONLINE";
  if (diff <= 15) return "SLEEP";
  return "OFFLINE";
};

// ⚡ PREKLADOVÝ MOST PRE UŽÍVATEĽOV
const mapToReactUser = (dbUser) => {
  if (!dbUser) return null;
  const currentStatus = calculateStatus(dbUser.last_active);
  return {
    ...dbUser,
    id: dbUser.email,
    displayName: dbUser.display_name || "",
    avatar: dbUser.avatar_url || "",
    unlockedNodes: dbUser.unlocked_nodes || [],
    transactionHistory: dbUser.transaction_history || [],
    lastActive: dbUser.last_active || null,
    status: currentStatus,
    isOnline: currentStatus === "ONLINE",
  };
};

// ⚡ PREKLADOVÝ MOST PRE PRÍSPEVKY (Tento ti chýbal!)
const mapToReactPost = (dbPost) => {
  if (!dbPost) return null;
  return {
    ...dbPost,
    authorId: dbPost.author_id,
    authorName: dbPost.author_name,
    authorAvatar: dbPost.author_avatar,
    authorTier: dbPost.author_tier,
    parentId: dbPost.parent_id,
    isPinned: dbPost.is_pinned,
    reactions: safeParseReactions(dbPost.reactions),
    category: dbPost.dim || "uncategorized",
    cluster: dbPost.dim || "uncategorized",
    status: "ONLINE",
    editCount: dbPost.edit_count || 0,
  };
};

// ⚡ PREKLADOVÝ MOST PRE SPRÁVY (Tento sme pridali pred chvíľou)
const mapToReactMessage = (dbMsg) => {
  if (!dbMsg) return null;
  const timeMs = new Date(dbMsg.timestamp).getTime();
  return {
    id: dbMsg.id,
    senderId: dbMsg.sender_id,
    senderName: dbMsg.sender_name,
    recipientId: dbMsg.recipient_id,
    text: dbMsg.text,
    isRead: dbMsg.is_read,
    isArchived: dbMsg.is_archived,
    isSystem: dbMsg.is_system,
    timestamp: { seconds: Math.floor(timeMs / 1000) },
  };
};

const mapToDBDim = (rawCat) => {
  if (!rawCat) return "uncategorizedSTK";
  const cat = String(rawCat).trim();
  if (/^id\d{2}$/i.test(cat)) return cat.toLowerCase() + "DIM";
  if (/^stk\d{2}$/i.test(cat)) {
    const stkMap = {
      STK01: "philosophySTK",
      STK02: "psychologySTK",
      STK03: "spiritualSTK",
      STK04: "religionSTK",
      STK05: "hardwareTechSTK",
      STK06: "sportSTK",
      STK07: "gamesSTK",
      STK08: "relationshipsSTK",
      STK09: "healthSTK",
      STK10: "politicsSTK",
      STK11: "cyberTechSTK",
      STK12: "uncategorizedSTK",
      STK13: "otherSTK",
      STK14: "systemMessagesSTK",
    };
    return stkMap[cat.toUpperCase()] || "uncategorizedSTK";
  }
  if (
    cat.endsWith("DIM") ||
    cat.endsWith("STK") ||
    cat === "api_oracle" ||
    cat.endsWith("_page")
  )
    return cat;
  return "uncategorizedSTK";
};

const trigger3DZoom = (elementId, tier = "FREE") => {
  const TIER_COLORS = {
    BANNED: "#FF0000",
    FREE: "#00f3ff",
    PRO: "#FFD700",
    OMEGA: "#FF8C00",
    MODERATOR: "#D2B48C",
    ADMIN: "#FF00FF",
    MASTER: "#00FF00",
    ARCHITECT: "#FF003C",
  };
  const glowColor = TIER_COLORS[tier] || TIER_COLORS.FREE;

  setTimeout(() => {
    let attempts = 0;
    const finder = setInterval(() => {
      attempts++;
      const el = document.getElementById(elementId);
      if (el) {
        clearInterval(finder);
        const elementRect = el.getBoundingClientRect();
        const absoluteElementTop = elementRect.top + window.scrollY;
        const middleOffset = window.innerHeight / 2 - elementRect.height / 2;
        window.scrollTo({
          top: absoluteElementTop - middleOffset,
          behavior: "smooth",
        });

        el.style.transition =
          "all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
        el.style.transform = "scale(1.03) translateY(-5px)";
        el.style.boxShadow = `0 20px 40px ${glowColor}50, 0 0 15px ${glowColor}80`;
        el.style.borderColor = glowColor;
        el.style.zIndex = "50";

        setTimeout(() => {
          el.style.transform = "";
          el.style.boxShadow = "";
          el.style.borderColor = "";
          el.style.zIndex = "";
        }, 3000);
      } else if (attempts > 30) {
        clearInterval(finder);
      }
    }, 200);
  }, 100);
};

export const SupabaseProvider = {
  subscribeToProfile(email, onData) {
    // 🛡️ Ochrana pred prázdnymi reťazcami, medzerami a systémovými e-mailami
    if (
      !email ||
      email.trim() === "" ||
      email === "anonymous" ||
      email === "quest"
    ) {
      return () => {};
    }
    supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .maybeSingle()
      .then(({ data }) => {
        if (data) onData(mapToReactUser(data));
      });

    const channelId = `live-profile-${email}-${Date.now()}`;
    const channel = supabase
      .channel(channelId)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "users",
          filter: `email=eq.${email}`,
        },
        (payload) => onData(mapToReactUser(payload.new)),
      )
      .subscribe();
    return () => supabase.removeChannel(channel);
  },

  async updateProfileData(email, updates) {
    const dbPayload = { email: email, ...updates };
    if (dbPayload.displayName !== undefined) {
      dbPayload.display_name = dbPayload.displayName;
      delete dbPayload.displayName;
    }
    if (dbPayload.avatar !== undefined) {
      dbPayload.avatar_url = dbPayload.avatar;
      delete dbPayload.avatar;
    }
    if (dbPayload.unlockedNodes !== undefined) {
      dbPayload.unlocked_nodes = dbPayload.unlockedNodes;
      delete dbPayload.unlockedNodes;
    }
    if (dbPayload.transactionHistory !== undefined) {
      dbPayload.transaction_history = dbPayload.transactionHistory;
      delete dbPayload.transactionHistory;
    }
    dbPayload.last_active = new Date().toISOString();

    const { error } = await supabase
      .from("users")
      .upsert(dbPayload, { onConflict: "email" });
    if (error) throw error;
  },

  subscribeToAllUsers(onData) {
    // 1. Zaručenie absolútnej unikátnosti ID (prevencia StrictMode kolízie v rovnakej milisekunde)
    const channelId = `all-users-sync-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // 2. Definujeme funkciu pre stiahnutie dát
    const fetchAll = async () => {
      const { data, error } = await supabase.from("users").select("*");
      if (error) {
        console.error("🚨 [REALTIME_FETCH_ERROR]:", error);
        return;
      }
      if (data) {
        onData(data.map(mapToReactUser));
      }
    };

    // 3. Prvotný okamžitý load pre vyčistenie čiernej diery
    fetchAll();

    // 4. Konfigurácia kanálu: .on() musí byť zavolané striktne PRED .subscribe()
    const channel = supabase
      .channel(channelId)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "users" },
        fetchAll,
      );

    // 5. Spustenie odberu na nakonfigurovanom kanáli
    channel.subscribe((status) => {
      if (status === "SUBSCRIBED") {
      }
    });

    // 6. CLEANUP PROTOKOL: Odhlásenie a odstránenie z cache Supabase klienta pri unmounte
    return () => {
      supabase.removeChannel(channel);
    };
  },
  subscribeToUsers(onData) {
    const channelId = `blog-users-dict-${Date.now()}`;
    const fetchAndMap = async () => {
      const { data } = await supabase.from("users").select("*");
      if (data) {
        const dict = {};
        data.forEach((dbUser) => {
          const u = mapToReactUser(dbUser);
          dict[u.email] = u;
        });
        onData(dict);
      }
    };
    fetchAndMap();
    const channel = supabase
      .channel(channelId)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "users" },
        fetchAndMap,
      )
      .subscribe();
    return () => supabase.removeChannel(channel);
  },

  async verifyAndInitEntity(email, initInfo) {
    const { data: existing } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .maybeSingle();
    if (existing) return mapToReactUser(existing);

    const { data: newUser, error } = await supabase
      .from("users")
      .insert([
        {
          email: email,
          display_name: email.split("@")[0],
          tier: initInfo.tier,
          credits: initInfo.credits,
          created_at: new Date().toISOString(),
          last_active: new Date().toISOString(),
        },
      ])
      .select()
      .single();
    if (error) throw error;
    return mapToReactUser(newUser);
  },

  async pingActiveStatus(email) {
    if (!email) return;
    try {
      await supabase
        .from("users")
        .update({ last_active: new Date().toISOString() })
        .eq("email", email);
    } catch (e) {}
  },

  async updatePresenceAndMining() {
    return { resetMins: false };
  },

  subscribeToPosts(onData) {
    supabase
      .from("nexus_posts")
      .select("*")
      .order("timestamp", { ascending: false })
      .then(({ data }) => {
        if (data) onData(data.map(mapToReactPost));
      });

    const channelId = `global-blog-${Date.now()}`;
    const channel = supabase
      .channel(channelId)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "nexus_posts" },
        async () => {
          const { data } = await supabase
            .from("nexus_posts")
            .select("*")
            .order("timestamp", { ascending: false });
          if (data) onData(data.map(mapToReactPost));
        },
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  },

  subscribeToNode(nodeId, onData) {
    if (!nodeId) return () => {};
    const docId = `NODE_${nodeId}`;

    supabase
      .from("nexus_posts")
      .select("reactions")
      .eq("id", docId)
      .maybeSingle()
      .then(({ data }) => {
        onData(
          data
            ? { ...data, reactions: safeParseReactions(data.reactions) }
            : null,
        );
      });

    const channelId = `node-${docId}-${Date.now()}`;
    const channel = supabase
      .channel(channelId)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "nexus_posts",
          filter: `id=eq.${docId}`,
        },
        (payload) => {
          const newData = payload.new;
          onData(
            newData
              ? { ...newData, reactions: safeParseReactions(newData.reactions) }
              : null,
          );
        },
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  },

  // ==========================================================================
  // 📤 CREATE POST (+ INBOX ZMIENKY A ODPOVEDE)
  // ==========================================================================
  async createPost(payload, userState, allRawPosts = []) {
    // 🛑 ŽIADNE isLocal! Zmazali sme ho. Púšťame dáta z LocalHostu priamo do Supabase.

    const authorName =
      userState?.displayName ||
      (userState?.email && userState.email !== "quest"
        ? userState.email.split("@")
        : "Operátor");

    const rawDim = payload.category || payload.cluster || "ID14";

    const dbPayload = {
      author_id: userState.email,
      author_name: authorName,
      author_avatar: userState.avatar || "",
      author_tier: userState.tier || "FREE",
      content: payload.content,
      title: payload.title || "",
      dim: rawDim,
      parent_id: payload.parentId || null,
      reactions: {
        like: [],
        dislike: [],
        brain: [],
        eye: [],
        haha: [],
        wow: [],
        mention: [],
      },
      is_pinned: false,
    };

    // ⚡ EXODUS FIX: Zápis s vrátením dát (.select())
    const { data, error } = await supabase
      .from("nexus_posts")
      .insert([dbPayload])
      .select();
    if (error) throw error;

    // ⚡ OPRAVA BUGU 1: Supabase vracia POLE! Musíme vziať prvok s indexom nula .
    const newPostId = data && data.length > 0 ? data[0].id : null;

    // ⚡ OPRAVA ODKAZU 2: Inteligentný generátor URL presne podľa tvojho "Zdielať" tlačidla!
    // Ak je to odpoveď, nájdeme ID úplne prvého (hlavného) vlákna.
    let rootThreadId = newPostId;
    if (payload.parentId && allRawPosts && allRawPosts.length > 0) {
      let current = allRawPosts.find((p) => p.id === payload.parentId);
      let depth = 0;
      while (current && current.parentId && depth < 50) {
        current = allRawPosts.find((p) => p.id === current.parentId);
        depth++;
      }
      if (current) rootThreadId = current.id;
    }

    // ⚡ Výsledný odkaz: Otvorí hlavnú tému a odskroluje na novú odpoveď
    const threadLink = newPostId
      ? `\n\n[Otvoriť Signál](/ID14?thread=${rootThreadId}#post-${newPostId})`
      : "";

    // ========================================================================
    // 🟢 1. NEXUS RADAR: ZMIENKY (@mentions) - [ PRIORITA 1 ]
    // ========================================================================
    const contentStr = payload.content || "";
    const mentionedNames = [];

    // ⚡ FIX: 1. Skener pre Zmienky v úvodzovkách (napr. @"Meno Operátora")
    const regexQuotes = /@"([^"]+)"/g;
    let matchQ;
    while ((matchQ = regexQuotes.exec(contentStr)) !== null) {
      // ⚡ OPRAVA BUGU 3: Berieme index [1] (čistý text mena), inak Supabase padne!
      if (matchQ && matchQ[1]) mentionedNames.push(matchQ[1]);
    }

    // ⚡ FIX: 2. Skener pre klasické Zmienky (napr. @Meno)
    const regexPlain = /@([a-zA-Z0-9_.-]+)/g;
    let matchP;
    while ((matchP = regexPlain.exec(contentStr)) !== null) {
      // ⚡ OPRAVA BUGU 3: Berieme index [1]
      if (matchP && matchP[1]) mentionedNames.push(matchP[1]);
    }

    let mentionedEmails = []; // Anti-Spam pamäť

    if (mentionedNames.length > 0) {
      const { data: mentionedUsers } = await supabase
        .from("users")
        .select("email, display_name")
        .in("display_name", mentionedNames);
      if (mentionedUsers) {
        for (const u of mentionedUsers) {
          if (u.email !== userState.email) {
            mentionedEmails.push(u.email); // Pamätáme si, že tento už prioritu dostal
            // 🛡️ ZERO-PING FIREWALL: Skontrolujeme, či má entita povolené @zmienky
            const pingResult = await NexusPingEngine.dispatchPing(
              "mention",
              u.email,
              {},
            );

            if (pingResult && pingResult.pingSent) {
              try {
                await supabase.from("messages").insert([
                  {
                    sender_id: "system_core",
                    sender_name: "NEXUS_RADAR",
                    recipient_id: u.email,
                    text: `Operátor **${authorName}** ťa spomenul (@mention) vo svojom signále.${threadLink}`,
                    is_system: true,
                  },
                ]);
              } catch (e) {
                console.error("🔴 Chyba pri zápise zmienky:", e);
              }
            }
          }
        }
      }
    }

    // ========================================================================
    // 🟢 2. NEXUS RADAR: PRIAMA ODPOVEĎ / CITÁCIA - [ PRIORITA 2 ]
    // ========================================================================
    if (payload.parentId && allRawPosts && allRawPosts.length > 0) {
      const parentPost = allRawPosts.find((p) => p.id === payload.parentId);
      if (
        parentPost &&
        parentPost.authorId &&
        parentPost.authorId !== userState.email
      ) {
        // ⚡ ANTI-SPAM: Ak už bol označený cez zavináč, túto správu vynecháme!
        if (!mentionedEmails.includes(parentPost.authorId)) {
          // 🛡️ ZERO-PING FIREWALL: Skontrolujeme, či má entita povolené Odpovede
          const pingResult = await NexusPingEngine.dispatchPing(
            "reply",
            parentPost.authorId,
            {},
          );

          if (pingResult && pingResult.pingSent) {
            try {
              await supabase.from("messages").insert([
                {
                  sender_id: "system_core",
                  sender_name: "NEXUS_RADAR",
                  recipient_id: parentPost.authorId,
                  text: `Operátor **${authorName}** odpovedal (citoval) na tvoje vlákno.${threadLink}`,
                  is_system: true,
                },
              ]);
            } catch (e) {
              console.error("🔴 Chyba pri zápise odpovede:", e);
            }
          }
        }
      }
    }
    // ========================================================================
    // 🟢 3. NEXUS RADAR: ÚPLNE NOVÉ VLÁKNO - [ PRIORITA 3 ]
    // ========================================================================
    else if (!payload.parentId) {
      // 🛡️ EXODUS OPTIMALIZÁCIA: Stiahneme všetky dáta profilov (*), aby sme mohli aplikovať Zero-Ping aj na Nové vlákna lokálne
      const { data: allUsers } = await supabase
        .from("users")
        .select("*")
        .neq("email", userState.email);

      if (allUsers && allUsers.length > 0) {
        const titleStr = payload.title ? `"${payload.title}"` : "Nový signál";
        const broadcasts = [];

        for (const u of allUsers) {
          if (!mentionedEmails.includes(u.email)) {
            // 🛡️ LOKÁLNY ZERO-PING FILTER: Ak má entita tvrdý Ghost Mode (povypínané notifikácie na Lajky/Odpovede), vynecháme ju aj z tohto hromadného spamu.
            const isZeroPing =
              u.notifyReplies === false ||
              u.notify_replies === false ||
              u.notifyMentions === false ||
              u.notify_mentions === false;

            if (!isZeroPing) {
              broadcasts.push({
                sender_id: "system_core",
                sender_name: "NEXUS_RADAR",
                recipient_id: u.email,
                text: `Operátor **${authorName}** spustil nové vlákno: ${titleStr}.${threadLink}`,
                is_system: true,
              });
            }
          }
        }

        if (broadcasts.length > 0) {
          try {
            await supabase.from("messages").insert(broadcasts);
          } catch (e) {
            console.error(
              "🔴 Chyba pri hromadnom odosielaní nových vlákien:",
              e,
            );
          }
        }
      }
    }

    // TOKENOMICS (Odměňovanie autora)
    let actionType = "NEW_SIGNAL";
    let rewardAmount = 0.1;
    if (payload.parentId) {
      if (payload.content.startsWith(">")) {
        actionType = "CITE";
        rewardAmount = 0.3;
      } else {
        actionType = "DISCUSS";
        rewardAmount = 0.5;
      }
    }

    // 🛡️ Titánový Štít: Ak je to Quest/Hosť bez e-mailu, preskočíme dopyt na databázu
    if (
      !userState?.email ||
      userState.email === "anonymous" ||
      userState.email === "quest" ||
      userState.email.trim() === ""
    ) {
      localStorage.removeItem("nexus_blog_bridge_signal");
      if (typeof trigger3DZoom === "function")
        trigger3DZoom(`post-${newPostId}`, userState?.tier || "FREE");
      return newPostId;
    }

    try {
      const { data: userData, error: userErr } = await supabase
        .from("users")
        .select(
          "credits, transaction_history, monthly_earned_oc, yearly_earned_oc",
        )
        .eq("email", userState.email)
        .single();

      if (!userErr && userData) {
        const currentCredits = parseFloat(userData.credits || 0);
        const currentM = parseFloat(userData.monthly_earned_oc || 0);
        const currentY = parseFloat(userData.yearly_earned_oc || 0);
        const newCredits = parseFloat(
          (currentCredits + rewardAmount).toFixed(2),
        );

        const newTx = {
          id: `TXN-${actionType}-${Date.now()}`,
          type: "REWARD",
          amount: rewardAmount,
          title: actionType,
          note: payload.parentId
            ? `Akcia [${actionType}] vo vlákne: ${payload.parentId}`
            : `Vytvorenie nového sémantického vlákna`,
          date: new Date().toISOString(),
        };
        const currentHistory = Array.isArray(userData.transaction_history)
          ? userData.transaction_history
          : [];

        const updatePayload = {
          credits: newCredits,
          transaction_history: [newTx, ...currentHistory].slice(0, 50),
        };

        // ⚡ FIX: Bezpečná injekcia do súťaže
        if (rewardAmount > 0) {
          updatePayload.monthly_earned_oc = parseFloat(
            (currentM + rewardAmount).toFixed(2),
          );
          updatePayload.yearly_earned_oc = parseFloat(
            (currentY + rewardAmount).toFixed(2),
          );
        }

        // ⚡ FIX: Odstránený duplicitný príkaz .update(), ktorý spôsoboval pád!
        await supabase
          .from("users")
          .update(updatePayload)
          .eq("email", userState.email);
      }
    } catch (e) {
      console.error("🔴 [TOKENOMICS ERROR]:", e);
    }

    localStorage.removeItem("nexus_blog_bridge_signal");
    trigger3DZoom(`post-${newPostId}`, userState.tier);
    return newPostId;
  },

  async updatePost(postId, payload) {
    const rawDim = payload.category || payload.cluster || "uncategorizedSTK";
    const timestamp = new Date().toISOString();

    const { data: oldPost } = await supabase
      .from("nexus_posts")
      .select("edit_count")
      .eq("id", postId)
      .maybeSingle();
    const currentCount = oldPost?.edit_count ? Number(oldPost.edit_count) : 0;

    const updateData = {
      content: payload.content,
      title: payload.title || "",
      dim: mapToDBDim(rawDim),
      edited_at: timestamp,
      edit_count: currentCount + 1,
    };

    const { error } = await supabase
      .from("nexus_posts")
      .update(updateData)
      .eq("id", postId);
    if (error) throw error;
    if (typeof trigger3DZoom === "function")
      trigger3DZoom(`post-${postId}`, "FREE");
  },

  async executeAction(postId, action, data, userState) {
    if (action === "delete") {
      const { error } = await supabase
        .from("nexus_posts")
        .delete()
        .eq("id", postId);
      if (error) throw error;
    }
    if (action === "pin") {
      const { error } = await supabase
        .from("nexus_posts")
        .update({ is_pinned: !!data })
        .eq("id", postId);
      if (error) throw error;
    }
    if (action === "ban_user") {
      const { error } = await supabase
        .from("users")
        .update({ tier: data.isBanned ? "FREE" : "BANNED" })
        .eq("email", data.userId);
      if (error) throw error;
    }

    if (action === "react") {
      const { type, rewardAmount, targetAuthorId } = data;
      const myUserId = userState.email;
      if (!myUserId || myUserId === "anonymous") return;

      const { data: postSnap, error: fetchErr } = await supabase
        .from("nexus_posts")
        .select("reactions, title")
        .eq("id", postId)
        .maybeSingle();
      if (fetchErr || !postSnap) return;

      let currentReactions = safeParseReactions(postSnap.reactions);
      const reactionTypes = ["like", "dislike", "brain", "eye", "haha", "wow"];
      let oldReaction = null;

      reactionTypes.forEach((t) => {
        if (!Array.isArray(currentReactions[t])) currentReactions[t] = [];
        if (currentReactions[t].includes(myUserId)) oldReaction = t;
      });

      const isRemoving = oldReaction === type;
      reactionTypes.forEach((t) => {
        currentReactions[t] = currentReactions[t].filter(
          (id) => id !== myUserId,
        );
      });
      if (!isRemoving) currentReactions[type].push(myUserId);

      const { error: updateErr } = await supabase
        .from("nexus_posts")
        .update({ reactions: currentReactions })
        .eq("id", postId);
      if (updateErr) throw updateErr;

      // 🟢 NEXUS RADAR: Notifikácia za udelenú reakciu do INBOXU
      if (!isRemoving && targetAuthorId && targetAuthorId !== myUserId) {
        const icons = {
          like: "👍",
          dislike: "👎",
          brain: "🧠",
          eye: "👁️",
          haha: "😂",
          wow: "😮",
        };
        const icon = icons[type] || type;
        const senderName = userState.displayName || myUserId.split("@");
        const postTitle = postSnap.title ? `"${postSnap.title}"` : "vlákno";

        // ⚡ FIX: Formátovaný link pre nexusParser
        const threadLink = `\n\n[Otvoriť Signál](/?tab=blog&thread=${postId})`;

        // 🛡️ ZERO-PING FIREWALL: Odošle Inbox PING len ak to Supabase povolí
        const pingResult = await NexusPingEngine.dispatchPing(
          "reaction",
          targetAuthorId,
          {},
        );

        if (pingResult && pingResult.pingSent) {
          try {
            await supabase.from("messages").insert([
              {
                sender_id: "system_core",
                sender_name: "NEXUS_RADAR",
                recipient_id: targetAuthorId,
                text: `Operátor **${senderName}** reagoval (${icon}) na tvoje ${postTitle}.${threadLink}`,
                is_system: true,
              },
            ]);
          } catch (insertErr) {
            console.error(
              "🔴 Chyba pri zápise Supabase reakcie do Inboxu:",
              insertErr,
            );
          }
        }
      }

      // ==========================================================
      // 2. TOKENOMICS LOGIKA (Odmeňovanie Autora Príspevku)
      // ==========================================================
      const rewardVal = parseFloat(rewardAmount || 0);
      if (myUserId === targetAuthorId) return;

      if (!isRemoving && rewardVal !== 0 && targetAuthorId) {
        try {
          const { data: targetUser, error: userErr } = await supabase
            .from("users")
            .select(
              "credits, transaction_history, monthly_earned_oc, yearly_earned_oc",
            )
            .eq("email", targetAuthorId)
            .single();

          if (!userErr && targetUser) {
            let currentHistory = [];
            if (typeof targetUser.transaction_history === "string") {
              try {
                currentHistory = JSON.parse(targetUser.transaction_history);
              } catch (e) {}
            } else if (Array.isArray(targetUser.transaction_history)) {
              currentHistory = targetUser.transaction_history;
            }

            const currentCredits = parseFloat(targetUser.credits || 0);
            const currentM = parseFloat(targetUser.monthly_earned_oc || 0);
            const currentY = parseFloat(targetUser.yearly_earned_oc || 0);
            const newCredits = parseFloat(
              (currentCredits + rewardVal).toFixed(2),
            );
            const actionName = type.toUpperCase();

            const newTx = {
              id: `TXN-BLOG-${actionName}-${Date.now()}`,
              type: rewardVal > 0 ? "REWARD" : "PENALTY",
              amount: rewardVal,
              note: `Blog: Reakcia [${actionName}] od ${myUserId.split("@")[0]}`,
              title: `BLOG ${actionName}`,
              description: `Vlákno: ${postSnap.title || postId}`,
              date: new Date().toISOString(),
            };

            const updatePayload = {
              credits: newCredits,
              transaction_history: [newTx, ...currentHistory].slice(0, 50),
            };

            // ⚡ FIX: Bezpečná injekcia do súťaže
            if (rewardVal > 0) {
              updatePayload.monthly_earned_oc = parseFloat(
                (currentM + rewardVal).toFixed(2),
              );
              updatePayload.yearly_earned_oc = parseFloat(
                (currentY + rewardVal).toFixed(2),
              );
            }

            // ⚡ FIX: Odstránený duplicitný príkaz .update(), ktorý spôsoboval pád!
            await supabase
              .from("users")
              .update(updatePayload)
              .eq("email", targetAuthorId);
          }
        } catch (e) {
          console.error("🔴 [TOKENOMICS ERROR]:", e);
        }
      }
    }
  },

  async executeNodeAction(
    nodeId,
    action,
    type,
    userState,
    ocReward = 0,
    nodeTitle = "",
  ) {
    const docId = `NODE_${nodeId}`;
    const safeEmail = String(userState?.email || "").trim();
    const isQuestUser =
      !safeEmail ||
      safeEmail === "quest" ||
      safeEmail === "anonymous" ||
      userState?.isGuest ||
      userState?.tier === "QUEST";
    const myUserId = safeEmail;

    if (!myUserId || isQuestUser) return; // Quest hosťom nespúšťame DB tokenomics ani zápis do Supabase

    const rewardVal = parseFloat(ocReward || 0);

    const processTokenomics = async (isRemoving = false) => {
      if (!isRemoving && rewardVal !== 0) {
        try {
          const { data: userData, error: userErr } = await supabase
            .from("users")
            .select(
              "credits, transaction_history, monthly_earned_oc, yearly_earned_oc",
            )
            .eq("email", myUserId)
            .single();

          if (!userErr && userData) {
            const currentCredits = parseFloat(userData.credits || 0);
            const currentM = parseFloat(userData.monthly_earned_oc || 0);
            const currentY = parseFloat(userData.yearly_earned_oc || 0);
            const newCredits = parseFloat(
              (currentCredits + rewardVal).toFixed(2),
            );
            const actionName =
              type && typeof type === "string" ? type.toUpperCase() : "AKCIA";

            const newTx = {
              id: `TXN-${actionName}-${Date.now()}`,
              type: rewardVal > 0 ? "REWARD" : "PENALTY",
              amount: rewardVal,
              title: actionName,
              note:
                action === "react"
                  ? `Reakcia [${actionName}] na Uzol: ${nodeId}`
                  : `The Bridge [${actionName}] z Uzla: ${nodeId}`,
              description: `Uzol: ${nodeId}`,
              timestamp: {
                seconds: Math.floor(Date.now() / 1000),
                nanoseconds: 0,
              },
              date: new Date().toISOString(),
            };

            const currentHistory = Array.isArray(userData.transaction_history)
              ? userData.transaction_history
              : [];

            const updatePayload = {
              credits: newCredits,
              transaction_history: [newTx, ...currentHistory].slice(0, 50),
            };

            // ⚡ FIX: Bezpečná injekcia do súťaže
            if (rewardVal > 0) {
              updatePayload.monthly_earned_oc = parseFloat(
                (currentM + rewardVal).toFixed(2),
              );
              updatePayload.yearly_earned_oc = parseFloat(
                (currentY + rewardVal).toFixed(2),
              );
            }

            // ⚡ FIX: Odstránený duplicitný príkaz .update(), ktorý spôsoboval pád!
            await supabase
              .from("users")
              .update(updatePayload)
              .eq("email", myUserId);
          }
        } catch (e) {}
      }
    };

    if (action === "bridge_action") {
      await processTokenomics(false);
      return;
    }
    if (action !== "react") return;

    const { data: snap } = await supabase
      .from("nexus_posts")
      .select("reactions")
      .eq("id", docId)
      .maybeSingle();
    let currentReactions = safeParseReactions(snap?.reactions);
    const reactionTypes = ["like", "dislike", "brain", "eye", "haha", "wow"];

    let oldReaction = null;
    reactionTypes.forEach((t) => {
      if (!Array.isArray(currentReactions[t])) currentReactions[t] = [];
      if (currentReactions[t].includes(myUserId)) oldReaction = t;
    });

    const isRemoving = oldReaction === type;
    reactionTypes.forEach((t) => {
      currentReactions[t] = currentReactions[t].filter((id) => id !== myUserId);
    });
    if (!isRemoving) currentReactions[type].push(myUserId);

    if (!snap) {
      const newDoc = {
        id: docId,
        author_id: "system",
        author_name: "SYSTEM_CORE",
        content: `[SYSTEM] Sémantický uzol ${nodeId} inicializovaný.`,
        title: nodeTitle || `Statický Uzol ${nodeId}`,
        dim: nodeId.split("-")[0],
        reactions: currentReactions,
        timestamp: new Date().toISOString(),
      };
      await supabase.from("nexus_posts").insert([newDoc]);
    } else {
      await supabase
        .from("nexus_posts")
        .update({ reactions: currentReactions })
        .eq("id", docId);
    }
    await processTokenomics(isRemoving);
  },

  // OSTATNÉ FUNKCIE
  subscribeToConnectionStatus(email, onData) {
    if (onData) onData("ONLINE");
    return () => {};
  },
  subscribeToSystemStatus(onData) {
    if (onData) onData({ status: "ONLINE", version: "V31.5" });
    return () => {};
  },

  // ==========================================================================
  // 📨 INBOX & SPRÁVY (EXODUS PROTOCOL - PLNE AKTÍVNY)
  // ==========================================================================
  subscribeToMessages(email, subCollection, onData) {
    if (!email) {
      onData([]);
      return () => {};
    }
    // Ak sme v odoslaných, filtrujeme podľa sender_id, inak recipient_id
    const column =
      subCollection === "sent_messages" ? "sender_id" : "recipient_id";

    const fetchMsgs = async () => {
      const { data } = await supabase
        .from("messages")
        .select("*")
        .eq(column, email)
        .order("timestamp", { ascending: false });
      if (data) onData(data.map(mapToReactMessage));
    };
    fetchMsgs();

    const channel = supabase
      .channel(`msgs-${email}-${subCollection}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "messages",
          filter: `${column}=eq.${email}`,
        },
        fetchMsgs,
      )
      .subscribe();
    return () => supabase.removeChannel(channel);
  },

  subscribeToUnreadMessages(email, onData) {
    if (!email) {
      onData(0);
      return () => {};
    }
    const fetchUnread = async () => {
      const { count } = await supabase
        .from("messages")
        .select("*", { count: "exact", head: true })
        .eq("recipient_id", email)
        .eq("is_read", false)
        .eq("is_archived", false);
      onData(count || 0);
    };
    fetchUnread();

    const channel = supabase
      .channel(`unread-${email}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "messages",
          filter: `recipient_id=eq.${email}`,
        },
        fetchUnread,
      )
      .subscribe();
    return () => supabase.removeChannel(channel);
  },

  async sendMessage(senderData, recipientEmail, text) {
    const { error } = await supabase.from("messages").insert([
      {
        sender_id: senderData.email,
        sender_name: senderData.displayName || senderData.email.split("@"),
        recipient_id: recipientEmail,
        text: text,
        is_system: false,
      },
    ]);
    if (error) throw error;
  },

  async updateMessageStatus(email, msgId, subCollection, updates) {
    const dbUpdates = {};
    if (updates.isRead !== undefined) dbUpdates.is_read = updates.isRead;

    // ⚡ EXODUS FIX: Supabase očakáva is_archived (nie isArchived)
    if (updates.isArchived !== undefined)
      dbUpdates.is_archived = updates.isArchived;

    const { error } = await supabase
      .from("messages")
      .update(dbUpdates)
      .eq("id", msgId);
    if (error) throw error;
  },

  async deleteMessage(email, msgId, subCollection) {
    const { error } = await supabase.from("messages").delete().eq("id", msgId);
    if (error) throw error;
  },

  async broadcastSystemMessage(text, adminOperators) {
    const inserts = adminOperators.map((op) => ({
      sender_id: "system_core",
      sender_name: "SYSTEM_LOG",
      recipient_id: op.email,
      text: text,
      is_system: true,
    }));
    const { error } = await supabase.from("messages").insert(inserts);
    if (error) throw error;
  },
  // ==========================================================================

  subscribeToBlogNotifications(email, onData) {
    if (!email) {
      onData({ reactionCount: 0, replyCount: 0 });
      return () => {};
    }
    const fetchNotifs = async () => {
      const { data } = await supabase
        .from("messages")
        .select("text")
        .eq("recipient_id", email)
        .eq("is_read", false)
        .eq("is_archived", false)
        .eq("is_system", true);

      if (data) {
        let reactionCount = 0;
        let replyCount = 0;

        data.forEach((d) => {
          const t = d.text || "";
          // ⚡ PRIORITA 3: Srdce (IBA LAJKY A REAKCIE)
          if (t.includes("reagoval")) {
            reactionCount++;
          }
          // ⚡ PRIORITA 1 a 2: Bublina (ODPOVEDE, CITÁCIE a ZMIENKY)
          else if (
            t.includes("odpovedal") ||
            t.includes("citoval") ||
            t.includes("spomenul") ||
            t.includes("@mention")
          ) {
            replyCount++;
          }
        });

        onData({ reactionCount, replyCount });
      } else {
        onData({ reactionCount: 0, replyCount: 0 });
      }
    };
    fetchNotifs();
    const channel = supabase
      .channel(`blog-notifs-${email}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "messages",
          filter: `recipient_id=eq.${email}`,
        },
        fetchNotifs,
      )
      .subscribe();
    return () => supabase.removeChannel(channel);
  },

  // ==========================================================================
  // 🧹 VYČISTENIE NOTIFIKÁCIÍ PO KLIKNUTÍ NA RADAR
  // ==========================================================================
  async markBlogNotificationsAsRead(email, type) {
    if (!email) return;
    const { data } = await supabase
      .from("messages")
      .select("id, text")
      .eq("recipient_id", email)
      .eq("is_read", false)
      .eq("is_system", true);

    if (!data || data.length === 0) return;

    const idsToMark = [];
    data.forEach((msg) => {
      const t = msg.text || "";
      // ⚡ ODRKADLENÁ LOGIKA PRE ČISTENIE
      if (type === "REACTIONS" && t.includes("reagoval")) {
        idsToMark.push(msg.id);
      }
      if (
        type === "REPLIES" &&
        (t.includes("odpovedal") ||
          t.includes("citoval") ||
          t.includes("spomenul") ||
          t.includes("@mention"))
      ) {
        idsToMark.push(msg.id);
      }
    });

    if (idsToMark.length > 0) {
      await supabase
        .from("messages")
        .update({ is_read: true })
        .in("id", idsToMark);
    }
  },
  // ==========================================================================

  subscribeToBalance(email, onData) {
    this.subscribeToProfile(email, (data) => {
      if (data) onData(data.credits || 0);
    });
    return () => {};
  },

  async updateUserTier(userId, newTier) {
    const { error } = await supabase
      .from("users")
      .update({ tier: newTier })
      .eq("email", userId);
    if (error) throw error;
  },

  async deleteUserRecord(userId) {
    const { error } = await supabase.from("users").delete().eq("email", userId);
    if (error) throw error;
  },

  async preRegisterEntity(email, tier) {
    const { error } = await supabase
      .from("users")
      .insert([
        { email: email, tier: tier, display_name: "Rezervovaná Entita" },
      ]);
    if (error && error.code !== "23505") throw error;
  },

  async bulkUploadUsers() {},
  async bulkUploadPosts() {},
};

export const NexusDB = SupabaseProvider;
