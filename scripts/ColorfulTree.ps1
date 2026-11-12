<#
=============================================================================
🌌 NEXUS OS: VISUAL RADAR TREE (TERMINAL SCANNER)
=============================================================================
ÚČEL SKRIPTU:
Tento nástroj (koncept od AI Textie, upravený pre OS Genesis) slúži ako 
vizuálny skener tvojej infraštruktúry. Vypíše obsah zložiek v prehľadnom, 
farebne odlíšenom strome priamo v PowerShell termináli.

AKO TO POUŽÍVAŤ:
Spusti skript zo zložky scripts:
.\nexus_visual_radar.ps1

Radar najprv preskenuje tvoju aktuálnu pozíciu a následne prejde do 
interaktívneho režimu, kde môžeš vkladať cesty priamo zo schránky (Ctrl+C).
=============================================================================
#>

function Show-ColorfulTree {
    param(
        [string]$Path = ".",  
        [int]$MaxItems = 100   
    )

    # Paleta farieb pre rôzne typy súborov
    $fileColors = @{
        ".txt"       = "White"
        ".odt"       = "White"
        ".py"        = "White"
        ".c"         = "White"
        ".cpp"       = "White"
        ".cs"        = "White"
        ".md"        = "White"
        ".js"        = "Yellow"
        ".jsx"       = "Yellow"    # Pridané pre React
        ".json"      = "Yellow"
        ".java"      = "Yellow"
        ".xls"       = "Green"
        ".xlsx"      = "DarkGreen"
        ".rtf"       = "Green"
        ".html"      = "Red"
        ".css"       = "Red"
        ".scss"      = "DarkRed"
        ".ppt"       = "Magenta"
        ".pptx"      = "Magenta"
        ".doc"       = "Blue"
        ".docx"      = "DarkBlue"
        ".csv"       = "Cyan"
        ".xml"       = "Cyan"
        ".yaml"      = "DarkCyan"
        ".yml"       = "Cyan"
        ".pdf"       = "Blue"
        ".jpg"       = "Gray"      
        ".jpeg"      = "Gray"      
        ".png"       = "DarkGray"
        ".gif"       = "Black"
        ".zip"       = "Gray"
        ".rar"       = "Gray"
        ".tar"       = "Gray"
        ".tar.gz"    = "Gray"
        ".mp3"       = "Black"
        ".wav"       = "Black"
        ".flac"      = "Black"
        ".mp4"       = "Black"
        ".avi"       = "Black"
        ".mkv"       = "Black"
        ".m4v"       = "Black"
        ".mov"       = "Black"
        ".mpeg"      = "Black"
        ".mpg"       = "Black"
        ".wma"       = "Black"
        ".flv"       = "Black"
        ".exe"       = "Black"
        ".svg"       = "Magenta"  
        ".ts"        = "Cyan"      
        ".tsx"       = "Cyan"      
        ".ps1"       = "Green"     
        ".gitignore" = "Gray"   
        default      = "Blue"      
    }

    $items = Get-ChildItem -Path $Path -Recurse | Where-Object { $_.FullName -notlike "*node_modules*" -and $_.FullName -notlike "*.git*" }

    if ($items.Count -eq 0) {
        Write-Host "Žiadne položky na zobrazenie v: $Path" -ForegroundColor Yellow
        return
    }

    $groupedItems = $items | Group-Object { $_.Directory.FullName }

    foreach ($group in $groupedItems) {
        Write-Host "📁 |-- [$($group.Name)]" -ForegroundColor Cyan

        $fileCount = 0
        foreach ($item in $group.Group) {
            if ($fileCount -ge $MaxItems) {
                break
            }

            $indentation = "    " * ($item.FullName.Split('\').Count - ($Path.Split('\').Count))
            if ($item.PSIsContainer) {
                Write-Host "$($indentation)📁 |-- [$($item.Name)]" -ForegroundColor Cyan
            } else {
                $color = $fileColors[$item.Extension]

                if (-not $color) {
                    $color = $fileColors["default"]
                }

                $lastModified = $item.LastWriteTime.ToString("yyyy-MM-dd HH:mm:ss")
                
                # Ošetrenie pre chýbajúceho vlastníka
                try {
                    $owner = (Get-Acl $item.FullName).Owner
                } catch {
                    $owner = "Neznáma Entita"
                }

                Write-Host "$($indentation)📄 | -- $($item.Name) (Veľkosť: $([math]::Round($item.Length / 1KB, 2)) KB)" -ForegroundColor $color
                Write-Host "$($indentation)    ➜ Posledná zmena: $lastModified" -ForegroundColor DarkGray
                Write-Host "$($indentation)    ➜ Vlastník: $owner`n" -ForegroundColor DarkGray
            }

            $fileCount++
        }
    }
}

function Copy-FilePaths {
    $filePaths = @()
    
    while ($true) {
        Write-Host "===========================================================" -ForegroundColor Magenta
        Write-Host "📡 INTERAKTÍVNY LAPAČ CIEST (CLIPBOARD SCANNER)" -ForegroundColor Magenta
        Write-Host "Kliknite pravým tlačidlom myši na zložku/súbor v Prieskumníkovi a zvoľte 'Kopírovať cestu'."
        Write-Host "Potom sa vráťte sem a stlačte Enter."

        Read-Host "Stlačte Enter, keď máte cestu v schránke..."
        
        # Ošetrenie úvodzoviek, ktoré Windows pri kopírovaní niekedy pridá
        $filePath = (Get-Clipboard).Replace('"', '').Trim()

        if (Test-Path $filePath) {
            $filePaths += $filePath
            Write-Host "✅ Cesta zachytená: $filePath" -ForegroundColor Green
        } else {
            Write-Host "❌ Neplatná cesta alebo prázdna schránka." -ForegroundColor Red
        }

        $continue = Read-Host "Chcete pridať ďalšiu stopu? (ano/nie)"
        if ($continue -ne 'ano') { break }
    }

    Write-Host "`n===========================================================" -ForegroundColor Magenta
    Write-Host "📊 VÝSLEDNÁ ANALÝZA ZACHYTENÝCH UZLOV:" -ForegroundColor Magenta
    $filePaths | ForEach-Object { Write-Host $_ -ForegroundColor Gray }
    Write-Host "-----------------------------------------------------------"
    
    foreach ($path in $filePaths) {
        # Ak je to súbor, zobrazíme jeho zložku, ak je to zložka, zobrazíme ju celú
        if (Test-Path $path -PathType Leaf) {
            Show-ColorfulTree -Path (Split-Path $path)
        } else {
            Show-ColorfulTree -Path $path
        }
    }
}

function Main {
    Write-Host "===========================================================" -ForegroundColor Green
    Write-Host "🤖 NEXUS VISUAL RADAR V1.0 INICIALIZOVANÝ" -ForegroundColor Green
    Write-Host "===========================================================" -ForegroundColor Green
    
    $currentPath = Get-Location
    Write-Host "`n📍 SKENUJEM AKTUÁLNY SEKTOR: $currentPath`n" -ForegroundColor Yellow
    
    Show-ColorfulTree -Path $currentPath
    Copy-FilePaths
}

Main