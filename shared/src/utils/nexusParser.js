/**
 * ⚡ NEXUS PARSER V5.3 (CYBER-BRUTALISM ULTIMATE)
 * Tento modul transformuje surový Markdown na vysoko imerzné HTML elementy.
 * Dokonale podporuje Farby, Odkazy, Obrázky, Spoilery a Dynamickú sémantiku.
 */

export const parseNexusFormat = (rawText) => {
  if (!rawText) return "";
  let html = rawText;

  // 1. OCHRANA PRED XSS (Prevedenie HTML tagov na bezpečnú formu)
  html = html.replace(/</g, "&lt;").replace(/>/g, "&gt;");

  // 2. BLOKY KÓDU (Terminal Emulator)
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (match, lang, code) => {
    return `<div class="my-4 rounded-xl overflow-hidden border border-[#333] shadow-xl bg-[#050505] font-mono text-xs w-full">
                    <div class="bg-[#111] border-b border-[#333] px-4 py-2 flex items-center gap-2">
                       <div class="flex gap-1.5">
                          <div class="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                          <div class="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                          <div class="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                       </div>
                       <span class="text-[#555] uppercase font-black text-[9px] tracking-widest ml-2">${lang || "SYSTEM_LOG"}</span>
                    </div>
                    <div class="p-4 overflow-x-auto text-[#00f3ff] whitespace-pre-wrap word-break">${code.trim()}</div>
                </div>`;
  });

  // 3. YOUTUBE EMBED
  html = html.replace(/\[embed\](.*?)\[\/embed\]/gi, (match, url) => {
    let videoId = "";
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match2 = url.match(regExp);
    if (match2 && match2[2].length === 11) videoId = match2[2];
    if (!videoId)
      return `<a href="${url}" target="_blank" class="text-red-500 underline">[Neplatný YouTube Odkaz]</a>`;
    return `<div class="relative w-full overflow-hidden rounded-xl border border-white/10 my-4 shadow-2xl" style="padding-top: 56.25%">
                    <iframe class="absolute top-0 left-0 w-full h-full" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>`;
  });

  // 4. SPOILERY (Zbaľovacie Akordeóny) - Podpora s úvodzovkami aj bez
  html = html.replace(
    /\[spoiler(?:=|=")(.*?)"?\]([\s\S]*?)\[\/spoiler\]/gi,
    `<details class="bg-black/40 border border-[#333] rounded-xl p-4 my-3 cursor-pointer group transition-all w-full"><summary class="font-black uppercase tracking-widest text-white/50 group-hover:text-[var(--node-color,#E91E63)] outline-none list-none flex items-center gap-3 select-none">▶ $1</summary><div class="mt-4 pt-4 border-t border-[#222] text-[#ccc] animate-in fade-in slide-in-from-top-2 whitespace-pre-wrap">$2</div></details>`,
  );

  // 5. OBRÁZKY A ODKAZY
  // Obrazok: ![Popis](url) - s ochranou pri zlyhaní načítania
  html = html.replace(
    /!\[([^\]]*)\]\((.*?)\)/g,
    `<img src="$2" alt="$1" class="max-w-full rounded-[1.5rem] border border-white/10 shadow-2xl my-4 hover:scale-[1.02] transition-transform duration-500 cursor-zoom-in" loading="lazy" onerror="this.onerror=null; this.src='https://via.placeholder.com/800x400/111/ff003c?text=ERROR:+Image+Not+Found';" />`,
  );

  // Odkaz: [Nazov](url)
  html = html.replace(
    /\[([^\]]+)\]\((.*?)\)/g,
    `<a href="$2" target="_blank" rel="noopener noreferrer" class="text-[#00f3ff] font-bold hover:text-white underline decoration-[#00f3ff]/40 hover:decoration-[#00f3ff] transition-colors">$1</a>`,
  );

  // 6. ŠPECIÁLNE FORMÁTOVANIE (Color, Size, Hide, Align)
  html = html.replace(
    /\[color=(.*?)\]([\s\S]*?)\[\/color\]/gi,
    `<span style="color: $1; text-shadow: 0 0 10px $1, 0 0 20px $1;">$2</span>`,
  );
  html = html.replace(
    /\[size=(.*?)\]([\s\S]*?)\[\/size\]/gi,
    `<span style="font-size: $1px; line-height: 1.2;">$2</span>`,
  );
  html = html.replace(
    /\[hide\]([\s\S]*?)\[\/hide\]/gi,
    `<span class="blur-[6px] hover:blur-none transition-all duration-500 cursor-help select-none bg-white/5 px-2 py-0.5 rounded text-white" title="Tajný záznam (Prejdi myšou)">$1</span>`,
  );
  html = html.replace(
    /\[align=(left|center|right|justify)\]([\s\S]*?)\[\/align\]/gi,
    `<div style="text-align: $1;">$2</div>`,
  );

  // 7. ZÁKLADNÁ TYPOGRAFIA (Bold preberá farbu Dimenzie / Avatara!)
  html = html.replace(
    /\*\*(.*?)\*\*/g,
    // 🛑 FIX: Pridaný box-decoration-clone a pr-[2px] zabráni odstrihnutiu tieňa a hrubého fontu na hrane obrazovky
    `<strong class="font-black break-words whitespace-normal box-decoration-clone pr-[2px]" style="color: var(--node-color, #ffffff); text-shadow: 0 0 10px var(--node-color, rgba(255,255,255,0.5));">$1</strong>`,
  );
  html = html.replace(
    /\*([^\*]+)\*/g,
    // 🛑 FIX: Ochrana pre kurzívu pred odseknutím na pravom okraji
    `<em class="italic text-white/80 break-words whitespace-normal box-decoration-clone pr-[2px]">$1</em>`,
  );
  html = html.replace(
    /\[u\](.*?)\[\/u\]/gi,
    `<u class="underline decoration-[var(--node-color,#E91E63)]/50 underline-offset-4 break-words whitespace-normal">$1</u>`,
  );
  html = html.replace(
    /\~\~(.*?)\~\~/g,
    `<del class="opacity-40 text-red-500 line-through break-words whitespace-normal">$1</del>`,
  );

  // 8. ZMIENKY (@Meno)
  html = html.replace(
    /@"([^"]+)"/g,
    `<span class="bg-[#E91E63]/15 text-[#E91E63] font-black px-2 py-0.5 rounded-md border border-[#E91E63]/30 tracking-widest uppercase shadow-[0_0_15px_rgba(233,30,99,0.2)] cursor-help break-words whitespace-normal inline-block mb-1">@$1</span>`,
  );
  html = html.replace(
    /@([a-zA-Z0-9_.-]+)/g,
    `<span class="bg-[#E91E63]/15 text-[#E91E63] font-black px-2 py-0.5 rounded-md border border-[#E91E63]/30 tracking-widest uppercase shadow-[0_0_15px_rgba(233,30,99,0.2)] cursor-help break-words whitespace-normal inline-block mb-1">@$1</span>`,
  );

  // 9. NADPISY A CITÁCIE (Poisťujeme zalamovanie vo vnútri gridov/flexov)
  html = html.replace(
    /(?:^|\n)# (.*?)(?=\n|$)/g,
    `\n<h1 class="text-2xl md:text-3xl font-black uppercase tracking-tighter mt-10 mb-6 drop-shadow-md w-full break-words" style="color: var(--node-color, #39FF14)">$1</h1>\n`,
  );
  html = html.replace(
    /(?:^|\n)## (.*?)(?=\n|$)/g,
    `\n<h2 class="text-xl font-black text-white uppercase tracking-wider mt-8 mb-4 border-b border-white/10 pb-2 w-full break-words">$1</h2>\n`,
  );
  html = html.replace(
    /(?:^|\n)### (.*?)(?=\n|$)/g,
    // 🛑 FIX: min-w-0 flex-1 chráni flex kontajner pred roztlačením a zaručuje plynulé zalomenie
    `\n<h3 class="text-lg font-black text-white/80 uppercase tracking-widest mt-6 mb-3 flex items-center gap-2 w-full"><span class="w-2 h-2 rounded-full shrink-0" style="background-color: var(--node-color, #39FF14)"></span><span class="min-w-0 flex-1 break-words">$1</span></h3>\n`,
  );
  html = html.replace(
    /(?:^|\n)> (.*?)(?=\n|$)/g,
    `\n<blockquote class="border-l-[4px] pl-4 py-2 my-4 bg-white/5 rounded-r-xl italic text-white/70 shadow-inner w-full break-words" style="border-color: var(--node-color, #39FF14)">$1</blockquote>\n`,
  );

  // 10. HORIZONTÁLNA ČIARA
  html = html.replace(
    /(?:^|\n)---(?=\n|$)/g,
    `\n<div class="h-px w-full my-6 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>\n`,
  );

  // 11. ZOZNAMY (Odrážky a Čísla)
  html = html.replace(
    /(?:^|\n)- (.*?)(?=\n|$)/g,
    // 🛑 FIX: min-w-0 flex-1 na texte vo vnútri odrážok je absolútny "Bypass" pre flex-overflow bug!
    `\n<div class="flex items-start gap-3 my-1.5"><div class="w-1.5 h-1.5 rounded-full mt-2 shrink-0 shadow-[0_0_8px_currentColor]" style="background-color: var(--node-color, #39FF14); color: var(--node-color, #39FF14)"></div><span class="text-[#ccc] min-w-0 flex-1 break-words">$1</span></div>\n`,
  );
  html = html.replace(
    /(?:^|\n)(\d+)\. (.*?)(?=\n|$)/g,
    `\n<div class="flex items-start gap-3 my-1.5"><span class="font-black font-mono text-[10px] mt-1 shrink-0" style="color: var(--node-color, #39FF14)">$1.</span><span class="text-[#ccc] min-w-0 flex-1 break-words">$2</span></div>\n`,
  );

  // 12. OŠETRENIE RIADKOVANIA (Line Breaks)
  html = html.replace(/\n/g, "<br />");
  html = html.replace(/<br \/><h/g, "<h");
  html = html.replace(/<\/h1><br \/>/g, "</h1>");
  html = html.replace(/<\/h2><br \/>/g, "</h2>");
  html = html.replace(/<\/h3><br \/>/g, "</h3>");
  html = html.replace(/<br \/><div/g, "<div");
  html = html.replace(/<\/div><br \/>/g, "</div>");
  html = html.replace(/<br \/><blockquote/g, "<blockquote");
  html = html.replace(/<\/blockquote><br \/>/g, "</blockquote>");
  html = html.replace(/<br \/><details/g, "<details");
  html = html.replace(/<\/details><br \/>/g, "</details>");

  return html;
};
