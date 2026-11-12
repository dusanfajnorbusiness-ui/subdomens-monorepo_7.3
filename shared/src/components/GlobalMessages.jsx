import { GlobalComponents } from "@shared//components/GlobalComponents.jsx";
import { GlobalHamburgerMenu } from "@shared/components/GlobalHamburgerMenu.jsx";
import { NexusDB } from "@shared/services/NexusDB_Core.js";
import { parseNexusFormat } from "@shared/utils/nexusParser.js";
// ⚡ EXODUS FIX: Úplne odstránené priame Firebase/Firestore importy!
// Modul teraz komunikuje výlučne s abstraktným mostom NexusDB.

// ============================================================================
// ⚠️ OSTRÉ LOKÁLNE IMPORTY (ODKOMENTUJ VO SVOJOM VS CODE)
// ============================================================================

import { SoundFX } from "@shared/utils/SoundEngine.js";
import { AlertCircle, Archive, CheckCircle2, CheckSquare, ChevronLeft, ChevronRight, Filter, Inbox, Mail, PenTool, RefreshCw, Reply, Save, Search, Send, ShieldAlert, Square, Terminal, Trash2, User, X } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";

// ============================================================================
// ⚠️ MOCK PRE CANVAS NÁHĽAD (ZMAZAŤ V LOKÁLNOM PROJEKTE) ⚠️
// ============================================================================
// const SoundFX = { click: () => {}, success: () => {} };
// const parseNexusFormat = (t) => t;
// const NexusDB = {
//   subscribeToAllUsers: (cb) => { cb([]); return () => {}; },
//   subscribeToMessages: (id, col, cb) => { cb([]); return () => {}; },
//   sendMessage: async () => true,
//   updateMessageStatus: async () => true,
//   deleteMessage: async () => true
// };
// ============================================================================

const CORE_VERSION = "GM-GlobalMessages V5.2-EXODUS";

/**
 * 📨 NEXUS GLOBAL MESSAGING PROTOCOL (V5.2 - EXODUS INBOX)
 * DESIGNED BY | SERGEANT [CORE] DUŠAN FAJNOR
 * ---------------------------------------------------------------------------
 * Účel: Komunikačný uzol (P2P) pre súkromné správy medzi entitami v Sieti.
 * FIX V5.2: Plne agnostický od databázových poskytovateľov (NexusDB Bridge).
 */
export const GlobalMessages = ({
  themeColor = "#3B82F6", // 👈 PRIDANÝ FALLBACK PRE THEMECOLOR
  isOpen,
  onClose,
  userState,
  composeData,
  clearComposeData,
}) => {
  const [messages, setMessages] = useState([]);
  const [sentMessages, setSentMessages] = useState([]);
  const [activeTab, setActiveTab] = useState("inbox"); // inbox | sent | archive | compose
  const [currentPage, setCurrentPage] = useState(1);
  const [messagesPerPage, setMessagesPerPage] = useState(20);

  // Komponovanie a Vyhľadávanie Operátorov
  const [composeRecipient, setComposeRecipient] = useState(null);
  const [messageText, setMessageText] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [networkEntities, setNetworkEntities] = useState([]);
  const [recipientQuery, setRecipientQuery] = useState("");

  // Lokálny Radar a Filter Typu Správy
  const [messageSearchQuery, setMessageSearchQuery] = useState("");
  const [messageFilter, setMessageFilter] = useState("ALL"); // ALL | ENTITY | SYSTEM

  // Selektívne Checkboxy
  const [selectedMessages, setSelectedMessages] = useState([]);

  // Auto-Save (Draft Indicator)
  const [draftStatus, setDraftStatus] = useState("");

  const myUserId = userState?.email || "anonymous";
  const isGuestEntity = userState ? userState.isGuest : true;
  const maxChars = 2000;

  // 📡 SYSTÉMOVÝ SIGNÁL PRI ŠTARTE
  useEffect(() => {
    if (isOpen) {
    }
  }, [isOpen]);

  // 1. Načítanie databázy entít (Pre radar pri komponovaní cez Most)
  useEffect(() => {
    const unsub = NexusDB.subscribeToAllUsers((users) => {
      const entities = users
        .filter((u) => u.displayName)
        .map((u) => ({ id: u.id, displayName: u.displayName }));
      setNetworkEntities(entities);
    });
    return () => {
      if (unsub) unsub();
    };
  }, []);

  // ⚡ LAPAČ SIGNÁLOV: Zmena pohľadu z Globálneho Hamburger Menu
  useEffect(() => {
    const handleSwitchTab = (e) => {
      if (e.detail) {
        setActiveTab(e.detail);
      }
    };
    window.addEventListener("nexus_switch_local_tab", handleSwitchTab);
    return () =>
      window.removeEventListener("nexus_switch_local_tab", handleSwitchTab);
  }, []);

  // 2. Zachytenie požiadavky na novú správu zvonku
  useEffect(() => {
    if (composeData && composeData.recipientId) {
      setComposeRecipient(composeData);
      if (composeData.defaultText) {
        setMessageText(composeData.defaultText);
      }
      setActiveTab("compose");
    }
  }, [composeData]);

  // Auto-Save Draftu po otvorení
  useEffect(() => {
    if (activeTab === "compose" && !messageText && !composeData) {
      const savedDraft = localStorage.getItem("nexus_inbox_draft");
      if (savedDraft) {
        setMessageText(savedDraft);
        setDraftStatus("Načítaný koncept");
        setTimeout(() => setDraftStatus(""), 3000);
      }
    }
  }, [activeTab]);

  // 3. Real-time načítavanie doručených signálov (Prijaté správy)
  useEffect(() => {
    if (
      !isOpen ||
      isGuestEntity ||
      myUserId === "anonymous" ||
      myUserId === "quest"
    )
      return;
    const unsub = NexusDB.subscribeToMessages(
      myUserId,
      "messages",
      setMessages,
    );
    return () => {
      if (unsub) unsub();
    };
  }, [isOpen, myUserId, isGuestEntity]);

  // 4. Real-time načítavanie ODOSLANÝCH signálov
  useEffect(() => {
    if (
      !isOpen ||
      isGuestEntity ||
      myUserId === "anonymous" ||
      myUserId === "quest"
    )
      return;
    const unsub = NexusDB.subscribeToMessages(
      myUserId,
      "sent_messages",
      setSentMessages,
    );
    return () => {
      if (unsub) unsub();
    };
  }, [isOpen, myUserId, isGuestEntity]);

  // Resetovanie stavov pri prepínaní záložiek
  useEffect(() => {
    setCurrentPage(1);
    setSelectedMessages([]);
  }, [activeTab, messagesPerPage, messageFilter, messageSearchQuery]);

  // ============================================================================
  // ⚡ DYNAMICKÝ FILTER (Záložky + Radar + Systém vs Entita)
  // ============================================================================
  const filteredMessages = useMemo(() => {
    let source = [];
    if (activeTab === "inbox") source = messages.filter((m) => !m.isArchived);
    else if (activeTab === "archive")
      source = messages.filter((m) => m.isArchived);
    else if (activeTab === "sent") source = sentMessages;

    if (messageFilter === "SYSTEM") {
      source = source.filter(
        (m) => m.senderId === "SYSTEM" || m.senderId === "system_core",
      );
    } else if (messageFilter === "ENTITY") {
      source = source.filter(
        (m) => m.senderId !== "SYSTEM" && m.senderId !== "system_core",
      );
    }

    if (messageSearchQuery.trim() !== "") {
      const q = messageSearchQuery.toLowerCase();
      source = source.filter(
        (m) =>
          (m.text && m.text.toLowerCase().includes(q)) ||
          (m.senderName && m.senderName.toLowerCase().includes(q)) ||
          (m.recipientName && m.recipientName.toLowerCase().includes(q)),
      );
    }
    return source;
  }, [messages, sentMessages, activeTab, messageFilter, messageSearchQuery]);

  const totalPages = Math.ceil(filteredMessages.length / messagesPerPage) || 1;
  const currentMessages = filteredMessages.slice(
    (currentPage - 1) * messagesPerPage,
    currentPage * messagesPerPage,
  );
  const unreadCount = messages.filter((m) => !m.isRead && !m.isArchived).length;

  // ============================================================================
  // 🛠️ HROMADNÉ AKCIE PRE VYBRANÉ (BULK ACTIONS - CEZ MOST)
  // ============================================================================
  const toggleSelection = (id) => {
    if (SoundFX?.click) SoundFX.click();
    setSelectedMessages((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const selectAllCurrent = () => {
    if (SoundFX?.click) SoundFX.click();
    const visibleIds = currentMessages.map((m) => m.id);
    const allSelected = visibleIds.every((id) => selectedMessages.includes(id));
    if (allSelected) {
      setSelectedMessages((prev) =>
        prev.filter((id) => !visibleIds.includes(id)),
      );
    } else {
      const newSelection = new Set([...selectedMessages, ...visibleIds]);
      setSelectedMessages(Array.from(newSelection));
    }
  };

  // ⚡ FIX: Bleskový (Optimistic) Update a Bypass pre hromadné mazanie
  const deleteMessage = async (id, skipConfirm = false) => {
    if (!skipConfirm && !window.confirm("Zmazať tento signál natrvalo?"))
      return;

    // 1. Okamžitý vizuálny výmaz (už žiadne čakanie na DB)
    setMessages((prev) => prev.filter((m) => m.id !== id));
    setSentMessages((prev) => prev.filter((m) => m.id !== id));

    try {
      const collectionName =
        activeTab === "sent" ? "sent_messages" : "messages";
      await NexusDB.deleteMessage(myUserId, id, collectionName);
      if (SoundFX?.success && !skipConfirm) SoundFX.success();
    } catch (e) {
      console.error("Delete error:", e);
    }
  };

  const archiveMessage = async (id, currentStatus) => {
    if (SoundFX?.click) SoundFX.click();

    // 1. Okamžitý vizuálny presun
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, isArchived: !currentStatus } : m)),
    );

    try {
      await NexusDB.updateMessageStatus(myUserId, id, "messages", {
        isArchived: !currentStatus,
      });
    } catch (e) {
      console.error("Archive error:", e);
    }
  };

  const executeBulkAction = async (actionType) => {
    if (selectedMessages.length === 0)
      return alert("Najskôr označte správy cez checkboxy.");
    if (SoundFX?.click) SoundFX.click();

    if (actionType === "delete") {
      if (
        !window.confirm(
          `Naozaj zmazať ${selectedMessages.length} označených správ?`,
        )
      )
        return;
    }

    // ⚡ FIX: skipConfirm = true pre hromadné mazanie (zabraňuje spamu okien)
    await Promise.all(
      selectedMessages.map((id) =>
        actionType === "delete"
          ? deleteMessage(id, true)
          : archiveMessage(id, false),
      ),
    );

    if (SoundFX?.success) SoundFX.success();
    setSelectedMessages([]);
  };

  // ============================================================================
  // 🛠️ INDIVIDUÁLNE AKCIE (CEZ MOST)
  // ============================================================================
  const handleTextChange = (e) => {
    const val = e.target.value;
    setMessageText(val);
    localStorage.setItem("nexus_inbox_draft", val);
    setDraftStatus("Ukladám...");
    setTimeout(() => setDraftStatus(""), 1500);
  };

  const handleSendMessage = async () => {
    if (!messageText.trim() || !composeRecipient || isGuestEntity || isSending)
      return;
    if (SoundFX?.click) SoundFX.click();
    setIsSending(true);

    try {
      // ⚡ EXODUS FIX: Dual-Write logika je teraz kompletne prenesená na Most.
      await NexusDB.sendMessage(
        userState,
        composeRecipient.recipientId,
        messageText,
      );

      setMessageText("");
      localStorage.removeItem("nexus_inbox_draft");
      setComposeRecipient(null);
      setRecipientQuery("");
      if (clearComposeData) clearComposeData();
      setActiveTab("sent");
      if (SoundFX?.success) SoundFX.success();
    } catch (e) {
      console.error(e);
      alert(`Chyba pri odosielaní signálu: ${e.message}`);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const markMessageAsRead = async (msg) => {
    if (msg.isRead || activeTab === "sent") return;
    try {
      await NexusDB.updateMessageStatus(myUserId, msg.id, "messages", {
        isRead: true,
      });
    } catch (e) {}
  };

  // const archiveMessage = async (id, currentStatus) => {
  //   if (SoundFX?.click) SoundFX.click();

  //   // ⚡ FIX: Okamžitý Optimistic UI Update (Okamžité skrytie v UI)
  //   setMessages((prev) =>
  //     prev.map((m) => (m.id === id ? { ...m, isArchived: !currentStatus } : m)),
  //   );

  //   try {
  //     await NexusDB.updateMessageStatus(myUserId, id, "messages", {
  //       isArchived: !currentStatus,
  //     });
  //   } catch (e) {
  //     // Ak zlyhá databáza, vrátime to späť
  //     setMessages((prev) =>
  //       prev.map((m) =>
  //         m.id === id ? { ...m, isArchived: currentStatus } : m,
  //       ),
  //     );
  //     console.error("Archive error:", e);
  //   }
  // };

  // const deleteMessage = async (id) => {
  //   if (
  //     !window.confirm(
  //       "Zmazať tento signál natrvalo? (Túto akciu nemožno vrátiť späť)",
  //     )
  //   )
  //     return;
  //   try {
  //     const collectionName =
  //       activeTab === "sent" ? "sent_messages" : "messages";
  //     await NexusDB.deleteMessage(myUserId, id, collectionName);
  //     if (SoundFX?.success) SoundFX.success();
  //   } catch (e) {}
  // };

  const initiateReply = (msg) => {
    setComposeRecipient({
      recipientId: msg.senderId,
      recipientName: msg.senderName,
    });
    setActiveTab("compose");
  };

  const handleClose = () => {
    if (clearComposeData) clearComposeData();
    setMessageText("");
    setComposeRecipient(null);
    setRecipientQuery("");
    onClose();
  };

  const dimColor = String(themeColor || "#3B82F6"); // Default Nexus Blue

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999999] bg-black/90 flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-300 font-mono">
      <div className="bg-[#050a0e] border border-blue-500/30 w-full max-w-6xl h-full max-h-[90vh] rounded-[2.5rem] shadow-[0_0_50px_rgba(59,130,246,0.15)] flex flex-col md:flex-row overflow-hidden relative text-left">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>

        {/* ⚡ ĽAVÝ PANEL: NAVIGAČNÉ MENU */}
        <div className="w-full md:w-64 bg-black/40 border-b md:border-b-0 md:border-r border-white/5 p-6 flex flex-col shrink-0 relative z-20">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-blue-500 font-black uppercase tracking-widest flex items-center gap-3">
              <Mail size={16} /> INBOX
            </h2>
            <button
              onClick={handleClose}
              className="md:hidden text-white/50 hover:text-red-500 bg-white/5 p-2 rounded-full"
            >
              <X size={14} />
            </button>
          </div>

          <div className="flex flex-row md:flex-col gap-2 overflow-x-auto hide-scroll pb-2 md:pb-0">
            <button
              onClick={() => setActiveTab("inbox")}
              className={`flex items-center justify-between w-full p-3 rounded-xl transition-all text-[10px] font-black uppercase tracking-widest shrink-0 ${activeTab === "inbox" ? "bg-blue-500/20 text-blue-400 shadow-inner border border-blue-500/30" : "bg-white/5 text-white/50 hover:text-white hover:bg-white/10"}`}
            >
              <div
                id="nexus-messages-inbox"
                className="flex items-center gap-3"
              >
                <Inbox size={14} /> Prijaté
              </div>
              {unreadCount > 0 && (
                <span className="bg-blue-500 text-black px-2 py-0.5 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]">
                  {unreadCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("sent")}
              id="nexus-messages-sent"
              className={`flex items-center justify-start gap-3 w-full p-3 rounded-xl transition-all text-[10px] font-black uppercase tracking-widest shrink-0 ${activeTab === "sent" ? "bg-[#39FF14]/20 text-[#39FF14] shadow-inner border border-[#39FF14]/30" : "bg-white/5 text-white/50 hover:text-white hover:bg-white/10"}`}
            >
              <Send size={14} /> Odoslané
            </button>
            <button
              onClick={() => setActiveTab("archive")}
              id="nexus-messages-archive"
              className={`flex items-center justify-start gap-3 w-full p-3 rounded-xl transition-all text-[10px] font-black uppercase tracking-widest shrink-0 ${activeTab === "archive" ? "bg-gray-500/20 text-gray-300 shadow-inner border border-gray-500/30" : "bg-white/5 text-white/50 hover:text-white hover:bg-white/10"}`}
            >
              <Archive size={14} /> Archív
            </button>
            <button
              onClick={() => setActiveTab("compose")}
              id="nexus-messages-compose"
              className={`flex items-center justify-start gap-3 w-full p-3 rounded-xl transition-all text-[10px] font-black uppercase tracking-widest shrink-0 mt-0 md:mt-4 ${activeTab === "compose" ? "bg-[#FF007F]/20 text-[#FF007F] shadow-inner border border-[#FF007F]/30" : "bg-[#FF007F]/10 text-[#FF007F]/50 hover:text-[#FF007F] hover:bg-[#FF007F]/20"}`}
            >
              <PenTool size={14} /> Nová Správa
            </button>
          </div>
        </div>

        {/* ⚡ PRAVÝ PANEL: OBSAH */}
        <div className="flex-1 flex flex-col min-h-0 bg-[#0d0d0d] relative z-10">
          <div className="p-4 md:p-6 border-b border-white/5 flex flex-col gap-4 shrink-0 bg-black/20">
            <div className="flex justify-between items-center w-full">
              <h3 className="text-white/80 font-black uppercase tracking-widest text-[11px] flex items-center gap-2">
                {activeTab === "inbox" && (
                  <>
                    <Inbox size={14} className="text-blue-500" /> Prijaté
                    Signály
                  </>
                )}
                {activeTab === "sent" && (
                  <>
                    <Send size={14} className="text-[#39FF14]" /> Odoslané
                    Signály
                  </>
                )}
                {activeTab === "archive" && (
                  <>
                    <Archive size={14} className="text-gray-400" /> Archivované
                    Signály
                  </>
                )}
                {activeTab === "compose" && (
                  <>
                    <Terminal size={14} className="text-[#FF007F]" />{" "}
                    Komunikačný Terminál
                  </>
                )}
              </h3>

              <button
                onClick={handleClose}
                className="hidden md:block text-white/50 hover:text-red-500 bg-white/5 hover:bg-white/10 p-2 rounded-full transition-colors ml-2"
              >
                <X size={14} />
              </button>
            </div>

            {/* ⚡ PRAVÝ PANEL: OBSAH (OCHRANA PRED PRETEKANÍM) */}
            <div className="flex-1 flex flex-col min-w-0 w-full min-h-0 bg-[#0d0d0d] relative z-10 overflow-hidden"></div>

            {/* Filtre */}
            {activeTab !== "compose" && !isGuestEntity && (
              <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 bg-black/40 p-3 rounded-xl border border-white/5">
                <div className="relative w-full xl:w-64 group flex items-center bg-black border border-white/10 rounded-lg p-1.5 focus-within:border-blue-500/50 transition-colors">
                  <Search size={14} className="text-white/30 ml-2" />
                  <input
                    type="text"
                    placeholder="Radar správ..."
                    value={messageSearchQuery}
                    onChange={(e) => setMessageSearchQuery(e.target.value)}
                    className="bg-transparent text-white text-[10px] uppercase font-black tracking-widest outline-none w-full px-2 py-1 placeholder:text-white/20"
                  />
                  {messageSearchQuery && (
                    <button
                      onClick={() => setMessageSearchQuery("")}
                      className="text-white/30 hover:text-red-500 mr-1"
                    >
                      <X size={12} />
                    </button>
                  )}
                </div>

                <div className="flex items-center bg-black border border-white/10 rounded-lg p-1 w-full xl:w-auto">
                  <Filter
                    size={12}
                    className="text-white/30 mx-2 hidden sm:block"
                  />
                  <button
                    onClick={() => setMessageFilter("ALL")}
                    className={`px-3 py-1.5 text-[9px] font-black uppercase rounded-md transition-colors flex-1 xl:flex-none ${messageFilter === "ALL" ? "bg-white/10 text-white" : "text-white/40 hover:text-white"}`}
                  >
                    Všetko
                  </button>
                  <button
                    onClick={() => setMessageFilter("ENTITY")}
                    className={`px-3 py-1.5 text-[9px] font-black uppercase rounded-md transition-colors flex-1 xl:flex-none ${messageFilter === "ENTITY" ? "bg-blue-500/20 text-blue-400" : "text-white/40 hover:text-blue-400"}`}
                  >
                    Entity
                  </button>
                  {activeTab !== "sent" && (
                    <button
                      onClick={() => setMessageFilter("SYSTEM")}
                      className={`px-3 py-1.5 text-[9px] font-black uppercase rounded-md transition-colors flex-1 xl:flex-none ${messageFilter === "SYSTEM" ? "bg-purple-500/20 text-purple-400" : "text-white/40 hover:text-purple-400"}`}
                    >
                      Systém
                    </button>
                  )}
                </div>

                {/* Hromadné Checkbox Akcie */}
                <div className="flex items-center gap-2 w-full xl:w-auto justify-end">
                  {selectedMessages.length > 0 ? (
                    <>
                      <span className="text-[9px] font-black text-white/50 mr-2 uppercase tracking-widest">
                        {selectedMessages.length} vybraných
                      </span>
                      {activeTab === "inbox" && (
                        <button
                          onClick={() => executeBulkAction("read")}
                          className="p-1.5 bg-[#39FF14]/10 text-[#39FF14] hover:bg-[#39FF14] hover:text-black rounded-lg transition-colors border border-[#39FF14]/30"
                          title="Prečítať vybrané"
                        >
                          <CheckCircle2 size={12} />
                        </button>
                      )}
                      {activeTab === "inbox" && (
                        <button
                          onClick={() => executeBulkAction("archive")}
                          className="p-1.5 bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500 hover:text-black rounded-lg transition-colors border border-yellow-500/30"
                          title="Archivovať vybrané"
                        >
                          <Archive size={12} />
                        </button>
                      )}
                      <button
                        onClick={() => executeBulkAction("delete")}
                        className="p-1.5 bg-[#FF003C]/10 text-[#FF003C] hover:bg-[#FF003C] hover:text-black rounded-lg transition-colors border border-[#FF003C]/30"
                        title="Zmazať vybrané"
                      >
                        <Trash2 size={12} />
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={selectAllCurrent}
                      className="text-[9px] font-black uppercase tracking-widest text-white/40 hover:text-white flex items-center gap-1.5 bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/5 transition-colors"
                    >
                      <CheckSquare size={12} /> Označiť stranu
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          <div
            id="nexus-messages-scroll"
            className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6 custom-scrollbar w-full min-w-0"
          >
            {isGuestEntity ? (
              <div className="flex flex-col items-center justify-center h-full text-center opacity-70 animate-in zoom-in-95 duration-500">
                <ShieldAlert
                  size={64}
                  className="text-[#FF003C] mb-6 animate-pulse drop-shadow-[0_0_20px_rgba(255,0,60,0.5)]"
                />
                <p className="text-[#FF003C] font-black uppercase tracking-[0.3em] text-lg md:text-xl mb-2">
                  Prístup Zamietnutý
                </p>
                <p className="text-white/50 font-mono text-[10px] md:text-xs uppercase tracking-widest max-w-sm">
                  Súkromná komunikácia je vyhradená výhradne pre registrované
                  entity. Inicializujte sa v Matrixe.
                </p>
              </div>
            ) : activeTab === "compose" ? (
              <div className="w-full max-w-2xl mx-auto flex flex-col gap-6 animate-in fade-in">
                {/* RADAR ENTÍT PRE VÝBER ADRESÁTA */}
                <div className="bg-black/50 border border-white/10 rounded-2xl p-4 flex flex-col gap-2 relative z-50">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#FF007F]">
                    Príjemca:
                  </span>
                  {composeRecipient ? (
                    <div className="flex items-center justify-between bg-[#FF007F]/10 border border-[#FF007F]/20 px-4 py-3 rounded-xl">
                      <span className="text-white font-black text-sm uppercase tracking-wider">
                        {composeRecipient.recipientName}
                      </span>
                      <button
                        onClick={() => setComposeRecipient(null)}
                        className="text-[#FF007F] hover:text-[#FF003C] transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="relative w-full">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search size={16} className="text-[#FF007F]/50" />
                      </div>
                      <input
                        type="text"
                        placeholder="VYHĽADAŤ ENTITU V SIETI..."
                        value={recipientQuery}
                        onChange={(e) => setRecipientQuery(e.target.value)}
                        className="w-full bg-black/60 border border-white/10 rounded-xl p-4 pl-12 text-white font-mono text-sm outline-none focus:border-[#FF007F]/50 transition-colors"
                      />
                      {recipientQuery && networkEntities && (
                        <div className="absolute top-full left-0 mt-2 w-full bg-[#020408] border border-[#FF007F]/30 rounded-xl shadow-[0_10px_40px_rgba(255,0,127,0.2)] overflow-hidden z-50 flex flex-col max-h-48 overflow-y-auto custom-scrollbar">
                          {networkEntities.filter((e) =>
                            e.displayName
                              ?.toLowerCase()
                              .includes(recipientQuery.toLowerCase()),
                          ).length > 0 ? (
                            networkEntities
                              .filter((e) =>
                                e.displayName
                                  ?.toLowerCase()
                                  .includes(recipientQuery.toLowerCase()),
                              )
                              .map((entity) => (
                                <button
                                  key={entity.id}
                                  onClick={() => {
                                    if (SoundFX?.click) SoundFX.click();
                                    setComposeRecipient({
                                      recipientId: entity.id,
                                      recipientName: entity.displayName,
                                    });
                                    setRecipientQuery("");
                                  }}
                                  className="w-full text-left px-4 py-3 hover:bg-[#FF007F]/10 text-white/70 hover:text-white font-mono text-[11px] uppercase font-black tracking-widest transition-colors border-b border-white/5 last:border-0 flex items-center gap-3"
                                >
                                  <User size={12} className="text-[#FF007F]" />{" "}
                                  {entity.displayName}
                                </button>
                              ))
                          ) : (
                            <div className="p-4 text-center text-white/30 text-[9px] uppercase tracking-widest font-black italic">
                              Entita nenájdená
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="bg-black/40 border border-white/5 rounded-2xl p-4 flex flex-col gap-4 shadow-inner relative z-10">
                  <textarea
                    value={messageText}
                    onChange={handleTextChange}
                    onKeyDown={handleKeyDown}
                    maxLength={maxChars}
                    disabled={!composeRecipient || isSending}
                    className="w-full bg-black/50 border border-white/10 rounded-xl p-6 text-white font-mono text-[14px] outline-none min-h-[250px] placeholder:text-white/20 resize-y custom-scrollbar disabled:cursor-not-allowed focus:border-[#FF007F]/30 transition-colors"
                    placeholder={
                      !composeRecipient
                        ? "Najskôr vyberte príjemcu..."
                        : "Zadajte sémantický signál... (Podporuje základný formát MD)"
                    }
                  />
                  <div className="flex justify-between items-center border-t border-white/5 pt-4">
                    <div className="flex items-center gap-4">
                      <span className="text-[10px] font-mono text-white/30">
                        {messageText.length} / {maxChars}
                      </span>
                      {draftStatus && (
                        <span className="text-[9px] font-black uppercase text-[#FF007F] animate-pulse flex items-center gap-1">
                          <Save size={10} /> {draftStatus}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={handleSendMessage}
                      disabled={
                        !composeRecipient ||
                        messageText.length === 0 ||
                        isSending
                      }
                      className="bg-[#FF007F] text-white font-black px-6 py-3 rounded-xl uppercase text-[10px] tracking-widest hover:scale-105 transition-transform flex items-center gap-2 shadow-[0_0_15px_rgba(255,0,127,0.3)] disabled:opacity-30 disabled:hover:scale-100"
                    >
                      {isSending ? "Odosielam..." : "Odoslať (Ctrl+Enter)"}{" "}
                      <Terminal size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ) : currentMessages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center opacity-30 mt-20">
                {activeTab === "archive" ? (
                  <Archive size={48} className="mb-4 text-gray-500" />
                ) : activeTab === "sent" ? (
                  <Send size={48} className="mb-4 text-[#39FF14]" />
                ) : (
                  <Inbox size={48} className="mb-4 text-blue-500" />
                )}
                <p className="text-white font-mono uppercase tracking-[4px] text-xs">
                  Žiadne signály neodpovedajú zadanému filtru
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-4 animate-in fade-in relative z-10">
                {currentMessages.map((msg) => {
                  const isSentTab = activeTab === "sent";
                  const isSystemMsg =
                    msg.senderId === "SYSTEM" || msg.senderId === "system_core";
                  const isSelected = selectedMessages.includes(msg.id);

                  let borderBase = isSentTab
                    ? "border-[#39FF14]/30"
                    : isSystemMsg
                      ? "border-purple-500/30"
                      : "border-blue-500/50";
                  if (activeTab === "archive")
                    borderBase = "border-gray-800 opacity-70 grayscale-[30%]";
                  if (isSelected) borderBase += " ring-2 ring-white/50";

                  return (
                    <div
                      key={msg.id}
                      onMouseEnter={() => {
                        if (!isSelected) markMessageAsRead(msg);
                      }}
                      className={`bg-black/40 border p-5 md:p-6 rounded-2xl transition-all relative overflow-hidden flex flex-col ${borderBase} ${!msg.isRead && activeTab === "inbox" ? "shadow-[0_0_20px_rgba(59,130,246,0.15)]" : ""}`}
                    >
                      {!msg.isRead && activeTab === "inbox" && (
                        <div
                          className={`absolute top-0 left-0 w-1 h-full shadow-[0_0_10px_rgba(255,255,255,0.8)] ${isSystemMsg ? "bg-purple-500" : "bg-blue-500"}`}
                        />
                      )}
                      {isSentTab && (
                        <div className="absolute top-0 left-0 w-1 h-full bg-[#39FF14]" />
                      )}

                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-2">
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <button
                            onClick={() => toggleSelection(msg.id)}
                            className="mr-2 text-white/30 hover:text-white transition-colors shrink-0"
                          >
                            {isSelected ? (
                              <CheckSquare size={16} className="text-white" />
                            ) : (
                              <Square size={16} />
                            )}
                          </button>

                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center bg-black border shrink-0 ${activeTab === "archive" ? "border-gray-600 text-gray-500" : isSentTab ? "border-[#39FF14] text-[#39FF14]" : isSystemMsg ? "border-purple-500 text-purple-500" : "border-blue-500 text-blue-500"}`}
                          >
                            {isSystemMsg ? (
                              <Terminal size={14} />
                            ) : (
                              <User size={14} />
                            )}
                          </div>
                          <div className="min-w-0">
                            <div className="font-black text-white text-xs md:text-sm uppercase tracking-widest truncate">
                              {isSentTab ? "Pre:" : "Od:"}{" "}
                              <span
                                className={
                                  activeTab === "archive"
                                    ? "text-gray-400"
                                    : isSentTab
                                      ? "text-[#39FF14]"
                                      : isSystemMsg
                                        ? "text-purple-400"
                                        : "text-blue-400"
                                }
                              >
                                {isSentTab ? msg.recipientName : msg.senderName}
                              </span>
                            </div>
                            <div className="text-[10px] text-white/40 font-mono mt-0.5">
                              {msg.timestamp
                                ? new Date(
                                    msg.timestamp.seconds * 1000,
                                  ).toLocaleString("sk-SK")
                                : "Odosielam..."}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="text-[13px] md:text-[14px] text-white/80 font-mono leading-relaxed bg-black/30 p-4 rounded-xl border border-white/5 mb-4 overflow-hidden relative z-10">
                        {typeof parseNexusFormat === "function" ? (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: parseNexusFormat(msg.text),
                            }}
                            className="prose-nexus break-words"
                          />
                        ) : (
                          <div className="whitespace-pre-wrap break-words">
                            {msg.text}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-wrap justify-end gap-2 border-t border-white/5 pt-4 mt-auto">
                        {!isSentTab &&
                          activeTab !== "archive" &&
                          !isSystemMsg && (
                            <button
                              onClick={() => initiateReply(msg)}
                              className="text-[9px] uppercase tracking-widest font-black px-4 py-2 bg-white/5 hover:bg-[#39FF14]/20 text-white/60 hover:text-[#39FF14] border border-transparent hover:border-[#39FF14]/30 rounded-xl transition-all flex items-center gap-2"
                            >
                              <Reply size={12} /> Odpovedať
                            </button>
                          )}
                        <button
                          onClick={() => deleteMessage(msg.id)}
                          className="text-[9px] uppercase tracking-widest font-black px-4 py-2 bg-white/5 hover:bg-[#FF003C]/20 text-white/60 hover:text-[#FF003C] border border-transparent hover:border-[#FF003C]/30 rounded-xl transition-all flex items-center gap-2"
                        >
                          <Trash2 size={12} /> Zmazať
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {activeTab !== "compose" &&
            filteredMessages.length > 0 &&
            !isGuestEntity && (
              <div className="p-4 border-t border-white/5 flex flex-wrap justify-between items-center gap-4 bg-black/20 shrink-0 relative z-20">
                <select
                  value={messagesPerPage}
                  onChange={(e) => setMessagesPerPage(Number(e.target.value))}
                  className="bg-black border border-white/10 text-white text-[10px] uppercase font-bold py-2 px-3 rounded-lg outline-none cursor-pointer hover:bg-white/5 transition-colors"
                >
                  <option value={20}>20 správ</option>
                  <option value={30}>30 správ</option>
                  <option value={40}>40 správ</option>
                  <option value={50}>50 správ</option>
                </select>
                {totalPages > 1 && (
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="p-2 bg-white/5 hover:bg-white/10 rounded-lg disabled:opacity-30 transition-colors text-white"
                    >
                      <ChevronLeft size={14} />
                    </button>
                    <span className="text-[10px] font-mono text-white/50">
                      {currentPage} / {totalPages}
                    </span>
                    <button
                      onClick={() =>
                        setCurrentPage((p) => Math.min(totalPages, p + 1))
                      }
                      disabled={currentPage === totalPages}
                      className="p-2 bg-white/5 hover:bg-white/10 rounded-lg disabled:opacity-30 transition-colors text-white"
                    >
                      <ChevronRight size={14} />
                    </button>
                  </div>
                )}
              </div>
            )}
        </div>
      </div>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(59, 130, 246, 0.3); border-radius: 10px; }
        .hide-scroll::-webkit-scrollbar { display: none; }
        .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }
        .prose-nexus { font-size: 13px; }
        .prose-nexus h1, .prose-nexus h2, .prose-nexus h3 { font-size: 14px !important; margin: 0.5rem 0 !important; }
        .prose-nexus p { margin-bottom: 0.5rem; }
      `}</style>
      {/* ⚡ INJEKCIA HAMBURGER MENU A SCROLL ŠÍPOK (Modrá téma) + Z-INDEX ŠTÍT */}
      <div className="relative z- pointer-events-none">
        <div className="pointer-events-auto">
          <GlobalHamburgerMenu activeTab="messages" themeColor="#3b82f6" />
          <GlobalComponents
            themeColor="#3b82f6"
            targetScrollId="nexus-messages-scroll"
          />
        </div>
      </div>
    </div>
  );
};

export default GlobalMessages;
