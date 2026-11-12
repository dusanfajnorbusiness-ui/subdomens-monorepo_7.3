import React from "react";

export const GenericPagePlaceholder = ({ title, icon: Icon, desc }) => (
  <div className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-700 flex flex-col items-center justify-center h-[60vh] text-center">
    <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
      {Icon && <Icon size={40} className="text-white/40" />}
    </div>
    <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase italic mb-4">{title}</h1>
    <p className="text-gray-500 font-mono text-[10px] uppercase tracking-[0.5em] max-w-md">{desc}</p>
    <div className="mt-8 px-4 py-2 bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 rounded-lg text-[10px] font-black uppercase tracking-widest animate-pulse">
      [ Module Under Construction - Očakáva Krok Protokolu ]
    </div>
  </div>
);