<#
=============================================================================
🌌 NEXUS OS: AUTO-SYNC PROTOKOL (TACHOMETER WRAPPER)
=============================================================================
ÚČEL SKRIPTU:
Tento nástroj funguje ako "One-Click" spúšťač (Wrapper) pre tvoj Node.js
skener riadkov (sync_node_lines.js). Jeho úlohou je prepočítať všetky 
riadky v uzloch (Nodes) a aktualizovať dáta pre Tachometre na webe.

AKO TO POUŽÍVAŤ:
1. Súbor maj uložený v zložke `scripts`.
2. Dvakrát naň klikni vo Windows Prieskumníkovi, alebo ho spusti 
   v termináli: .\auto_sync.ps1
3. Skript automaticky odskočí do Root priečinka, spustí Node.js 
   operáciu a nechá otvorené okno, aby si si mohol prečítať výsledok.
=============================================================================
#>

# ⚡ NEXUS OS: AUTO-SYNC PROTOKOL
# DESIGNED BY | SERGEANT [CORE] DUŠAN FAJNOR
# ---------------------------------------------------------------------------

Clear-Host
Write-Host "=======================================================" -ForegroundColor Cyan
Write-Host " ⚡ NEXUS OS: SYNCHRONIZÁCIA DÁT UZLOV (TACHOMETER) ⚡ " -ForegroundColor Cyan
Write-Host "=======================================================" -ForegroundColor Cyan
Write-Host "Iniciujem skenovanie zdrojového kódu..." -ForegroundColor Yellow
Write-Host ""

# Zabezpečí, že sa skript spustí v ROOTE projektu (o úroveň vyššie od /scripts)
# (Toto je dôležité, pretože Node.js skript hľadá zložku src/ z koreňa projektu)
$rootPath = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
Set-Location -Path $rootPath

# Spustenie samotného Node.js skriptu z koreňového adresára
node scripts/sync_node_lines.js

Write-Host ""
Write-Host "=======================================================" -ForegroundColor Cyan
Write-Host "Hotovo! Stlačte ľubovoľnú klávesu pre zatvorenie okna..." -ForegroundColor DarkGray

# Pozastaví zatvorenie okna, aby si Architekt mohol prečítať výsledok merania
$null = $Host.UI.RawUI.ReadKey('NoEcho,IncludeKeyDown')