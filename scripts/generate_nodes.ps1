<#
=============================================================================
🌌 NEXUS UNIVERSAL AUTOMATION SCRIPT V8.0 (NODE GENERATOR) - MANUÁL
=============================================================================
ÚČEL SKRIPTU:
Tento PowerShell skript je tvoj ultimátny "Stavebný Robot". Dokáže na 
jeden klik vygenerovať kompletnú Omega Mapu a všetky fyzické (.jsx) uzly 
pre AKÚKOĽVEK dimenziu (od ID00 po ID14).

AKO TO POUŽÍVAŤ (KROK ZA KROKOM):
1. V sekcii "1. KONFIGURÁCIA DIMENZIE" (nižšie) zmeň hodnoty podľa toho, 
   ktorú dimenziu ideš práve budovať (napr. ID03, CASH-ENGINE, #FFD700).
2. Do sekcie "2. DATABÁZA UZLOV (CSV)" vlož textový zoznam tvojich uzlov 
   presne v tvare: SecId|SecTitle|NodeId|Tier|NodeTitle.
3. Otvor terminál vo VS Code a spusti skript: .\generate_nodes.ps1

OCHRANA (ANTI-OVERWRITE):
Skript NIKDY neprepíše uzol, ktorý už na disku existuje. Ak skript pustíš 
znovu po pridaní nových uzlov do CSV, vygeneruje len tie chýbajúce.
=============================================================================
#>

# =============================================================================
# 1. KONFIGURÁCIA DIMENZIE (TU ZMENIŤ PRED SPUSTENÍM!)
# =============================================================================
$DIM_ID = "IDXX"                           # Napr. ID03, ID10, ID14
$DIM_NAME = "NAZOV-DIMENZIE"               # Napr. CASH-ENGINE
$DIM_FOLDER = "IDXX-Nazov"                 # Presný názov zložky v src/subPages/ (napr. ID03-Finance)
$DIM_COLOR = "#FFFFFF"                     # Hex kód farby dimenzie (napr. #FFD700)
$DIM_BASE_TIER = "FREE"                    # Základný prístupový TIER dimenzie

# =============================================================================
# 2. DATABÁZA UZLOV (CSV DÁTA)
# =============================================================================
$csvData = @"
SecId|SecTitle|NodeId|Tier|NodeTitle
SEC_A|SEKCIA A: VSTUPNÁ BRÁNA|01|FREE|Základný uzol
"@

# =============================================================================
# 3. JADRO SKRIPTU (NEUPRAVOVAŤ)
# =============================================================================
Write-Host "--- 🌌 NEXUS AUTO-SCRIPT V8.0: INICIALIZÁCIA PRE [$DIM_ID] ---" -ForegroundColor Cyan

# Absolútne cesty k projektu (O úroveň vyššie od /scripts)
$rootPath = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$baseSubPath = Join-Path $rootPath "src\subPages\$DIM_FOLDER"
$mapFilePath = Join-Path $rootPath "src\data\$($DIM_ID)_OmegaMap.js"
$dataDirPath = Join-Path $rootPath "src\data"

$nodes = ConvertFrom-Csv -InputObject $csvData -Delimiter "|"

# KONTROLA A VYTVORENIE ADRESÁROV
if (!(Test-Path $dataDirPath)) { New-Item -ItemType Directory -Path $dataDirPath -Force | Out-Null }
$tiers = "FREE", "PRO", "OMEGA"
foreach ($t in $tiers) {
    $path = Join-Path $baseSubPath $t
    if (!(Test-Path $path)) { New-Item -ItemType Directory -Path $path -Force | Out-Null }
}

# --- GENEROVANIE OMEGA MAPY (.js) ---
$mapLines = New-Object System.Collections.Generic.List[string]
$lowerId = $DIM_ID.ToLower()

$mapLines.Add("/**")
$mapLines.Add(" * 🗺️ ${DIM_ID}: ${DIM_NAME} OMEGA MAP")
$mapLines.Add(" * Generované: NEXUS AUTO-SCRIPT V8.0")
$mapLines.Add(" */")
$mapLines.Add("")
$mapLines.Add("export const $($lowerId)OmegaMap = {")
$mapLines.Add("  dimensionId: `"$DIM_ID`",")
$mapLines.Add("  dimensionName: `"$DIM_NAME`",")
$mapLines.Add("  baseAccessTier: `"$DIM_BASE_TIER`",")
$mapLines.Add("  color: `"$DIM_COLOR`",")
$mapLines.Add("  sections: [")

$groupedBySec = $nodes | Group-Object SecId
foreach ($sec in $groupedBySec) {
    $secTitle = $sec.Group.SecTitle
    $mapLines.Add("    {")
    $mapLines.Add("      sectionId: `"$($sec.Name)`",")
    $mapLines.Add("      sectionTitle: `"$secTitle`",")
    $mapLines.Add("      nodes: [")
    
    foreach ($node in $sec.Group) {
        $isFree = if ($node.Tier -eq "FREE") { "true" } else { "false" }
        $cleanTitle = $node.NodeTitle.Replace("'", "\'")
        $mapLines.Add("        { id: `"$DIM_ID-$($node.NodeId)`", isFree: $isFree, tier: `"$($node.Tier)`", title: `"$cleanTitle`" },")
    }
    $mapLines.Add("      ]")
    $mapLines.Add("    },")
}
$mapLines.Add("  ]")
$mapLines.Add("};")
$mapLines.Add("")
$mapLines.Add("// Plochý export pre rýchle renderovanie a jednoduchšiu filtráciu.")
$mapLines.Add("export const flat$($DIM_ID)Nodes = $($lowerId)OmegaMap.sections.flatMap((section) =>")
$mapLines.Add("  section.nodes.map((node) => ({")
$mapLines.Add("    ...node,")
$mapLines.Add("    sectionId: section.sectionId,")
$mapLines.Add("    sectionTitle: section.sectionTitle,")
$mapLines.Add("  }))")
$mapLines.Add(");")

[System.IO.File]::WriteAllLines($mapFilePath, $mapLines, [System.Text.Encoding]::UTF8)
Write-Host "✅ OMEGA MAPA [$($DIM_ID)_OmegaMap.js] BOLA ÚSPEŠNE VYGENEROVANÁ." -ForegroundColor Green


# --- GENEROVANIE FYZICKÝCH JSX SÚBOROV (S OCHRANOU) ---
$counterCreated = 0
$counterSkipped = 0

foreach ($node in $nodes) {
    $fileName = "Node_$($DIM_ID)_$($node.NodeId).jsx"
    $filePath = Join-Path (Join-Path $baseSubPath $node.Tier) $fileName
    
    if (Test-Path $filePath) {
        Write-Host "[SKIPPED] Súbor už existuje (Ochrana dát): $fileName" -ForegroundColor DarkGray
        $counterSkipped++
    }
    else {
        $cleanTitle = $node.NodeTitle.Replace("'", "\'")
        $jsxContent = @"
import React from 'react';
import { Database, Fingerprint } from 'lucide-react';

/**
 * 🛰️ ${DIM_ID}: NODE $($node.NodeId)
 * TIER: $($node.Tier)
 * STATUS: DECOMPRESSION_PENDING
 */
export default function Node_$($DIM_ID)_$($node.NodeId)({ onInteract }) {
  return (
    <div className="p-10 md:p-20 bg-[#020408] min-h-screen text-[#b3d4d6] font-mono animate-in fade-in duration-700">
      <div className="max-w-4xl mx-auto border border-white/5 bg-black/40 rounded-[3rem] p-12 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 opacity-30" style={{ backgroundColor: '$DIM_COLOR', boxShadow: '0 0 20px $DIM_COLOR' }} />
        
        <header className="mb-12 border-b border-white/10 pb-8 flex justify-between items-start">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] flex items-center gap-2 mb-2" style={{ color: '$DIM_COLOR' }}>
               <Fingerprint size={14} /> Node_$($DIM_ID)_$($node.NodeId)
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter italic">
              $cleanTitle
            </h1>
          </div>
          <div className="px-3 py-1 border rounded-lg text-[10px] font-black uppercase tracking-widest bg-black" style={{ color: '$DIM_COLOR', borderColor: '$DIM_COLOR' }}>
            $($node.Tier) TIER
          </div>
        </header>

        <div className="flex flex-col items-center justify-center py-20 text-center opacity-40">
          <Database size={48} className="mb-6 animate-pulse" style={{ color: '$DIM_COLOR' }} />
          <h2 className="text-xl font-black text-white uppercase tracking-widest mb-2">
            Čakám na Dekompresiu
          </h2>
          <p className="text-sm font-mono max-w-md">
            Tento uzol čaká, kým ho Architekt naplní prežitou pravdou cez NODE MD Operátora.
          </p>
        </div>

      </div>
    </div>
  );
}
"@
        [System.IO.File]::WriteAllText($filePath, $jsxContent, [System.Text.Encoding]::UTF8)
        Write-Host "✨ [CREATED] Nový JSX uzol: $fileName" -ForegroundColor White
        $counterCreated++
    }
}

Write-Host "`n=========================================================================" -ForegroundColor Green
Write-Host "✅ NEXUS AUTO-BUILD DOKONČENÝ PRE DIMENZIU $DIM_ID" -ForegroundColor Green
Write-Host "📊 Vytvorených uzlov: $counterCreated" -ForegroundColor White
Write-Host "📊 Preskočených (Existujúcich) uzlov: $counterSkipped" -ForegroundColor Gray
Write-Host "=========================================================================" -ForegroundColor Green