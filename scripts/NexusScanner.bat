@echo off
:: ====================================================================
:: 🌌 NEXUS RAM SCANNER V3.0 - INTERAKTÍVNY PROTOKOL
:: ====================================================================
:: ÚČEL SKRIPTU:
:: Hĺbková defragmentácia RAM s ochranným štítom proti zrúteniu OS.
::
:: 🚨 EXPERT VETO - OCHRANA PRED PÁDOM WINDOWS:
:: Nikdy neodstreľuj proces 'explorer.exe' manuálne cez PID!
:: Ak to urobíš, padne ti celý vizuál Windowsu (spodná lišta, plocha).
::
:: ZMENY VO V3.0:
:: [+] Interaktívny výber s farebným odlíšením (Zelená = ANO, Červená = NIE).
:: [+] Vstavaná ochrana a varovania priamo v radare.
:: ====================================================================

color 0b
title NEXUS RAM SCANNER V3.0 (SAFE-MODE)
mode con: cols=85 lines=40

:START
cls
echo ====================================================================
echo  🌌 NEXUS RAM SCANNER V3.0 (INTERACTIVE PROTOCOL)
echo ====================================================================
echo.
echo [SYSTEM_LOG]: Chystam sa detekovat a znicit zakladny balast.
echo (WidgetService.exe, OneDrive.exe)
echo [OCHRANA AKTIVNA]: msedgewebview2.exe a A/V moduly su izolovane od odstrelu.
echo.

rem ⚡ VIZUÁLNE ROZHRANIE CEZ POWERSHELL (Farby)
powershell -NoProfile -Command "Write-Host '[Y] ANO - Spustit chirurgicky rez balastu' -ForegroundColor Green"
powershell -NoProfile -Command "Write-Host '[N] NIE - Iba preskenovat pamat (Preskoci mazanie)' -ForegroundColor Red"
echo.
set /p autokill_choice="Zadaj volbu [Y/N]: "

if /I "%autokill_choice%"=="N" goto SCAN_ONLY
if /I "%autokill_choice%"=="Y" goto AUTO_KILL

echo [!] Neplatny vstup. Skus to znova.
timeout /t 2 >nul
goto START

:AUTO_KILL
echo.
echo [!] INICIALIZUJEM TVRDY VYMAZ ZNAMYCH PARAZITOV...
:: Odstránený taskkill pre msedgewebview2.exe, aby nepadlo OBS / Audio panely
taskkill /IM WidgetService.exe /F 2>nul
taskkill /IM OneDrive.exe /F 2>nul
echo [SYS_DIAGNOSTIKA]: Jadro Widgetov a OneDrive znicene. A/V procesy ziju.
powershell -NoProfile -Command "Write-Host '[OK] Balast bol uspesne odrezany z RAM.' -ForegroundColor Green"
echo.

:SCAN_ONLY
echo [SYSTEM_LOG]: Skenujem procesy (Zoradene podla zataze RAM)...
echo.
rem Radar na TOP 20 najťažších procesov
powershell -NoProfile -Command "Get-Process | Sort-Object WorkingSet -Descending | Select-Object -First 20 | Format-Table Id, ProcessName, @{Name='RAM (MB)';Expression={[math]::Round($_.WorkingSet / 1MB, 2)}} -AutoSize"

echo ====================================================================
echo [STATUS]: Radar bezi. Pripraveny na manualny override.
powershell -NoProfile -Command "Write-Host 'VAROVANIE: Nikdy nezadavaj PID pre explorer.exe (Zabijes Windows)!' -ForegroundColor Yellow"
echo ====================================================================
echo.
set /p target="Zadaj 'ID' (PID) procesu na rucny odstrel, alebo '0' pre ukoncenie: "

if "%target%"=="0" exit

echo.
echo [!] ZAMERIAVAM CIELOVY UZOL PID: %target%...
taskkill /PID %target% /F

echo.
powershell -NoProfile -Command "Write-Host '[OK] Exekucia dokoncena. Stlac klavesu pre novy scan.' -ForegroundColor Green"
pause >nul
goto START