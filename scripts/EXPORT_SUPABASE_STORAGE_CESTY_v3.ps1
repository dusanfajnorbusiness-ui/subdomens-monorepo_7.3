param (
    [string]$SupabaseKey = ""
)

$SUPABASE_URL = "https://ljyvsolsgliephsfkfgx.supabase.co"

if ([string]::IsNullOrWhiteSpace($SupabaseKey)) {
    Write-Host "==============================================================================" -ForegroundColor Cyan
    Write-Host "🚀 SUPABASE STORAGE DYNAMIC ALL-BUCKETS EXPORTER v3.0 (POWERSHELL EDITION)" -ForegroundColor Cyan
    Write-Host "==============================================================================" -ForegroundColor Cyan
    $SupabaseKey = Read-Host "👉 Vložte váš Supabase Anon alebo Service Role Key"
}

if ([string]::IsNullOrWhiteSpace($SupabaseKey)) {
    Write-Host "❌ Chýba API Kľúč! Exekúcia zrušená." -ForegroundColor Red
    exit 1
}

$headers = @{
    "Authorization" = "Bearer $SupabaseKey"
    "apikey"        = $SupabaseKey
}

Write-Host "`n🔍 DYNAMICKÝ SKEN VŠETKÝCH BUCKETOV V CLOUDE..." -ForegroundColor Yellow

$buckets = @()
try {
    $bucketResp = Invoke-RestMethod -Uri "$SUPABASE_URL/storage/v1/bucket" -Headers $headers -Method Get -TimeoutSec 15
    foreach ($b in $bucketResp) {
        if ($b.id) { $buckets += $b.id }
    }
}
catch {
    Write-Host "⚠️ Nepodarilo sa dynamicky získať zoznam bucketov cez API. Použijem záložný zoznam." -ForegroundColor Red
    $buckets = @("pdf-assets", "bot-avatars", "system-standby", "image-media", "zip-assets", "codm-zombies-are-back")
}

Write-Host "✅ Nájdených $($buckets.Count) bucketov: $($buckets -join ', ')" -ForegroundColor Green

function Get-SupabaseFilesRecursive([string]$bucket, [string]$prefix = "") {
    $listUrl = "$SUPABASE_URL/storage/v1/object/list/$bucket"
    $body = @{
        prefix = $prefix
        limit  = 1000
        offset = 0
        sortBy = @{ column = "name"; order = "asc" }
    } | ConvertTo-Json -Compress

    $res = @()
    try {
        $items = Invoke-RestMethod -Uri $listUrl -Headers $headers -Method Post -Body $body -ContentType "application/json" -TimeoutSec 15
        foreach ($item in $items) {
            if (-not $item.name) { continue }
            $fullPath = if ([string]::IsNullOrWhiteSpace($prefix)) { $item.name } else { "$prefix/$($item.name)" }

            if ($null -eq $item.id -and $null -eq $item.metadata) {
                $res += Get-SupabaseFilesRecursive -bucket $bucket -prefix $fullPath
            }
            else {
                $sizeBytes = if ($item.metadata -and $item.metadata.size) { [double]$item.metadata.size } else { 0 }
                $sizeMb = [math]::Round($sizeBytes / 1MB, 2)
                $res += [PSCustomObject]@{
                    bucket  = $bucket
                    path    = $fullPath
                    name    = $item.name
                    size_mb = $sizeMb
                    url     = "$SUPABASE_URL/storage/v1/object/public/$bucket/$fullPath"
                }
            }
        }
    }
    catch {
        Write-Host "  ❌ Chyba pri načítaní path '$prefix' v buckete '$bucket': $_" -ForegroundColor Red
    }
    return $res
}

$catalog = @{}
$totalCount = 0
$totalSizeMb = 0

foreach ($bucket in $buckets) {
    Write-Host "[+] Získavam dáta pre bucket: '$bucket'..." -ForegroundColor Cyan
    $files = Get-SupabaseFilesRecursive -bucket $bucket -prefix ""
    $catalog[$bucket] = $files
    $bSize = ($files | Measure-Object -Property size_mb -Sum).Sum
    if (-not $bSize) { $bSize = 0 }
    $totalCount += $files.Count
    $totalSizeMb += $bSize
    Write-Host "    └─ 📊 '$bucket': $($files.Count) súborov | $([math]::Round($bSize, 2)) MB" -ForegroundColor Green
}

$targetDir = "D:\Projects\PROJEKT-NEXUS_5.0\NEXUS-OS_GENESIS-EDITION\scripts"
if (-not (Test-Path $targetDir)) { New-Item -ItemType Directory -Path $targetDir | Out-Null }

$mdFile = Join-Path $targetDir "SUPABASE_STORAGE_CESTY.md"
$jsonFile = Join-Path $targetDir "SUPABASE_STORAGE_CESTY.json"

$catalog | ConvertTo-Json -Depth 5 | Set-Content -Path $jsonFile -Encoding UTF8

$mdLines = @(
    "# 🌐 SUPABASE STORAGE - GLOBÁLNA MAPA DÁTOVÝCH CIEST (DYNAMIC V3.0)",
    "",
    "**Celkovo spracovaných bucketov:** `$($buckets.Count)`  ",
    "**Celkovo súborov v cloude:** `$totalCount`  ",
    "**Celková veľkosť dát:** `$([math]::Round($totalSizeMb / 1024, 2)) GB` ($([math]::Round($totalSizeMb, 2)) MB)  ",
    ""
)

foreach ($kv in $catalog.GetEnumerator()) {
    $bName = $kv.Key
    $bFiles = $kv.Value
    $mdLines += "## 📦 Bucket: `$bName` ($($bFiles.Count) súborov)"
    $mdLines += ""
    if ($bFiles.Count -eq 0) {
        $mdLines += "_Bucket je prázdny._"
        $mdLines += ""
        continue
    }
    $mdLines += "| Súbor / Cesta | Veľkosť (MB) | Public CDN URL |"
    $mdLines += "| :--- | :---: | :--- |"
    foreach ($f in $bFiles) {
        $mdLines += "| `$($f.path)` | $($f.size_mb) MB | [$($f.name)]($($f.url)) |"
    }
    $mdLines += ""
}

$mdLines | Set-Content -Path $mdFile -Encoding UTF8

Write-Host "`n==============================================================================" -ForegroundColor Green
Write-Host "✅ EXPORT DOKONČENÝ:" -ForegroundColor Green
Write-Host "📄 Markdown: $mdFile" -ForegroundColor Yellow
Write-Host "📄 JSON Data: $jsonFile" -ForegroundColor Yellow
Write-Host "📊 CELKOVO SPRACOVANÝCH SÚBOROV: $totalCount naprieč $($buckets.Count) bucketmi!" -ForegroundColor Cyan
Write-Host "==============================================================================" -ForegroundColor Green
