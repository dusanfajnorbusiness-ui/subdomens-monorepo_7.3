# ==============================================================================
# 🌌 NEXUS OS // MASTER DECOMPRESSOR v4.0.2 - MANUÁL NA POUŽITIE
# ==============================================================================
# ÚČEL SKRIPTU:
# Tento PowerShell skript funguje ako "Stavebný Robot" (Scaffolding).
# Na jeden klik dokáže na tvojej Pracovnej ploche (Desktop) vybudovať 
# kompletnú, masívnu adresárovú štruktúru pre tvoj Projekt Nexus V4.0.
# 
# MECHANIZMUS (AKO TO FUNGUJE):
# 1. Vytvorí hlavný priečinok 🗄️PROJEKT-NEXUS_4.0 na ploche.
# 2. Vygeneruje základnú dokumentáciu (.md súbory) do 🗄️_DOCS.
# 3. Pripraví React štruktúru (src/components, data, atď.).
# 4. Automaticky vygeneruje 15 boilerplate .jsx uzlov (ID00 až ID14) 
#    s presne nastavenými farbami a dizajnmi podľa Omega Máp.
# 5. Vytvorí master_data.json a package.json.
# 
# AKO TO POUŽÍVAŤ:
# Vo VS Code (v PowerShell termináli) zadaj cestu k tomuto súboru a spusti ho:
# .\create_nexus.ps1
# 
# ⚠️ UPOZORNENIE: Pred spustením sa uisti, že máš zatvorené súbory
# v cieľovom priečinku, aby ich skript mohol bezpečne prepísať/vytvoriť.
# ==============================================================================

$desktopPath = [System.IO.Path]::Combine($env:USERPROFILE, "Desktop")
$rootName = "🗄️PROJEKT-NEXUS_4.0"
$rootPath = Join-Path $desktopPath $rootName
$reactAppName = "💠NEXUS-OS-GENESIS-EDITION"
$reactPath = Join-Path $rootPath $reactAppName

Write-Host "--- INICIALIZUJEM TOTÁLNU DEKOMPRESIU MATRICE NEXUS V4.0.2 ---" -ForegroundColor Cyan
Write-Host "Cieľová lokácia: $rootPath" -ForegroundColor Gray

# 1. Funkcia pre tvorbu uzlov (Adresáre a Súbory)
function New-NexusNode {
  param (
    [string]$BasePath,
    [string]$RelativePath,
    [string]$Content = "",
    [switch]$IsDirectory
  )

  $target = Join-Path $BasePath $RelativePath
  if ($IsDirectory) {
    if (-not (Test-Path $target)) {
      New-Item -Path $target -ItemType Directory -Force | Out-Null
      Write-Host "  📂 DIR  >> $RelativePath" -ForegroundColor White
    }
  }
  else {
    $parent = Split-Path $target
    if (-not (Test-Path $parent)) { New-Item -Path $parent -ItemType Directory -Force | Out-Null }
    # Používame UTF8 s BOM pre správne zobrazenie emoji a špeciálnych znakov vo VS Code
    [System.IO.File]::WriteAllText($target, $Content, [System.Text.Encoding]::UTF8)
    Write-Host "  📄 FILE >> $RelativePath" -ForegroundColor Gray
  }
}

# --- 🏗️ I. GLOBÁLNA TOPOLÓGIA (Root Folders) ---
New-NexusNode $rootPath "🛰️_CORE" -IsDirectory
New-NexusNode $rootPath "🏗️_SHELL" -IsDirectory
New-NexusNode $rootPath "📂_ASSETS\🎨_CSS" -IsDirectory
New-NexusNode $rootPath "📂_ASSETS\🧠_JS" -IsDirectory
New-NexusNode $rootPath "📂_ASSETS\🖼️_UI" -IsDirectory
New-NexusNode $rootPath "🗄️_DOCS" -IsDirectory
New-NexusNode $rootPath $reactAppName -IsDirectory

# --- 📄 II. SYSTÉMOVÁ DOKUMENTÁCIA (🗄️_DOCS) ---
$docFiles = @{
  "nexus_master_blueprint.md" = "# 💠 NEXUS MASTER BLUEPRINT V4.8`n`nStatus: MISSION_READY`n`n[ ARCHITECTURE DEFINITION ]`n`nDESIGNED BY | SERGEANT [CORE] DUŠAN FAJNOR"
  "master_codex_2000.md"      = "# 📚 MASTER CODEX 2000`n`nEsencia vedomostí pre ID08.`n`nPROCESSED BY GEMINI_AI // NEURAL_LINK_V3"
  "nexus_profile_dossier.md"  = "# 🛡️ PROFILE DOSSIER: sergeant [core]`n`nIdentita: Dušan Fajnor`n`n© 2026 NEXUS PROTOCOL."
  "NEX_DEPLOY_CHECKLIST.md"   = "# 📑 DEPLOY CHECKLIST`n`n- [ ] npm run build`n- [ ] firebase deploy`n- [ ] verify uplink"
  "SESSION_LOGS.md"           = "# 🌑 SESSION LOGS`n`nDátum: 15. 03. 2026`nStatus: INITIALIZED"
}

foreach ($doc in $docFiles.Keys) {
  New-NexusNode $rootPath "🗄️_DOCS\$doc" $docFiles[$doc]
}

# --- ⚛️ III. REACT MOTHERSHIP STRUCTURE ---
$reactDirs = @("src\components", "src\context", "src\hooks", "src\data", "src\pages", "public\📂_ASSETS")
foreach ($dir in $reactDirs) {
  New-NexusNode $reactPath $dir -IsDirectory
}

# --- 💠 IV. 15 SÉMANTICKÝCH DIMENZIÍ (src/pages) ---
$dimensions = @(
  @{ id = "ID00"; name = "MentorHub"; color = "#FFFFFF"; desc = "SOURCE_LAYER: Rozcestník a Manifest." },
  @{ id = "ID01"; name = "Identity"; color = "#39FF14"; desc = "IDENTITY_CORE: Ego vs. Bytie." },
  @{ id = "ID02"; name = "Workflow"; color = "#FFEB3B"; desc = "PROCESS_LAYER: Produktivita a denné priehradky." },
  @{ id = "ID03"; name = "Finance"; color = "#FFD700"; desc = "CASH_ENGINE: Cashflow a správa dlhu." },
  @{ id = "ID04"; name = "Revenue"; color = "#FFAA00"; desc = "REVENUE_ARCHITECT: Biznis modely a KaaS." },
  @{ id = "ID05"; name = "Assets"; color = "#FF8C00"; desc = "ASSETS_MATRIX: Investície a páky." },
  @{ id = "ID06"; name = "Study"; color = "#BF00FF"; desc = "DATA_ABSORBER: Aktívne vzdelávanie." },
  @{ id = "ID07"; name = "Skills"; color = "#8A2BE2"; desc = "SKILLS_TREE: IT zručnosti a profesia." },
  @{ id = "ID08"; name = "Reader"; color = "#00FFFF"; desc = "EMPTY_BOOK: Knižnica 817+ titulov." },
  @{ id = "ID09"; name = "Player"; color = "#FF003C"; desc = "SERGEANT_CORE: Gaming a taktické logy." },
  @{ id = "ID10"; name = "Home"; color = "#0044FF"; desc = "NONIDENTITY_CORE: Ticho a domov." },
  @{ id = "ID11"; name = "Recovery"; color = "#FFBF00"; desc = "THE_RECOVERY: Bio-hacking a zdravie." },
  @{ id = "ID12"; name = "Codex"; color = "#00E5FF"; desc = "NEXUS_CODEX: Zákony a kybernetická ústava." }, 
  @{ id = "ID13"; name = "Habits"; color = "#00008B"; desc = "HABIT_CORE: Mindfulness trackery a cykly." }, 
  @{ id = "ID14"; name = "Blog"; color = "#FF1493"; desc = "SIGNAL_PROCESSOR: Sémantické vlákna." }       
)

foreach ($dim in $dimensions) {
  $fileName = "$($dim.id)-$($dim.name).jsx"
  $content = @"
import React from 'react';
import { Cpu, Activity } from 'lucide-react';

/**
 * 🛰️ NEXUS DIMENSION: $($dim.id)
 * Name: $($dim.name)
 * Status: DECOMPRESSION_READY
 */
const $($dim.name)Page = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 text-left space-y-8">
      <header className="border-b border-white/10 pb-6">
        <div className="flex items-center gap-4 mb-4">
          <span className="bg-black text-[$($dim.color)] border border-[$($dim.color)] px-3 py-1 text-[10px] font-black uppercase tracking-widest shadow-[0_0_15px_rgba(0,0,0,0.5)]">
            $($dim.id) // $($dim.name)
          </span>
          <span className="text-white/20 text-[9px] font-mono uppercase tracking-[4px]">Active_Node</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter italic">
          $($dim.name) <span className="text-[$($dim.color)] not-italic">Space</span>
        </h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-black/40 border border-white/5 p-8 rounded-3xl">
          <h3 className="text-white font-black uppercase tracking-widest text-sm mb-4 flex items-center gap-3">
            <Cpu size={16} className="text-[$($dim.color)]"/> Systémový Popis
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed font-mono italic">
            "$($dim.desc)"
          </p>
        </div>
        <div className="bg-black/40 border border-white/5 p-8 rounded-3xl flex flex-col justify-center items-center text-center opacity-30">
          <Activity size={40} className="mb-4 text-[$($dim.color)]" />
          <p className="text-[10px] uppercase tracking-[5px]">Čakám na dátový stream...</p>
        </div>
      </div>

      <footer className="pt-20 opacity-20 text-[10px] font-mono uppercase tracking-widest">
        DESIGNED BY | SERGEANT [CORE] DUŠAN FAJNOR <br/>
        PROCESSED BY GEMINI_AI // NEURAL_LINK_V3 <br/>
        © 2026 NEXUS PROTOCOL.
      </footer>
    </div>
  );
};

export default $($dim.name)Page;
"@
  New-NexusNode $reactPath "src\pages\$fileName" $content
}

# --- ⚙️ V. SYSTEM CORE FILES (Embedded Data Matrix) ---

$masterDataJson = @'
{
  "nexus_configuration": {
    "owner": "Dušan Fajnor",
    "genesis": "Summer 2018",
    "version": "4.0.2",
    "theme": "Neon-Glass-Dark",
    "revenue_target": { "mrr_goal": 150, "annual_goal": 14976, "currency": "EUR" },
    "user_profile": {
      "rank": "CyberArchitect (LVL 50)",
      "status": "ONLINE (FIREBASE LINKED)",
      "bio_quote": "Nikto a Nič. Len Ticho a Kód.",
      "stats": [
        { "label": "AI Fusion", "value": "100%", "color": "purple" },
        { "label": "Debt Cleared", "value": "33%", "color": "emerald" },
        { "label": "System Load", "value": "OPTIMIZED", "color": "green" }
      ]
    }
  },
  "status": "STANDALONE_READY"
}
'@

New-NexusNode $reactPath "src\data\master_data.json" $masterDataJson
New-NexusNode $reactPath "src\App.jsx" "// Nexus Ultimate Monolith Reactor v4.0.2 Standalone`nexport default function App() { return (null); }"

$pkgJson = @'
{
  "name": "nexus-monolith-v4",
  "version": "4.0.2",
  "private": true,
  "dependencies": {
    "firebase": "^11.0.0",
    "lucide-react": "^0.400.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build"
  }
}
'@
New-NexusNode $reactPath "package.json" $pkgJson

Write-Host "`n====================================================" -ForegroundColor Green
Write-Host "✅ [ SUCCESS ]: MATRICA V4.0.2 STABILIZOVANÁ" -ForegroundColor Green
Write-Host "====================================================" -ForegroundColor Green
Write-Host "Lokácia: $rootPath" -ForegroundColor White
Write-Host "Dekomprimovaných: 15 JSX dimenzií, Standalone Data Matrix, Core topológia." -ForegroundColor Gray
