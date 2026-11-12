r"""
===============================================================================
👑 PROJEKT NEXUS OS GENESIS — SUPABASE STORAGE PDF & ASSET SCANNER V20.80
===============================================================================
Operátor: CyberTech ARCHITECT Dušan Fajnor (@nexus-core2Mb)
Skript: nexus_supabase_pdf_scanner.py
Účel:
  1. Rekurzívne prejde VŠETKY priečinky a súbory v Supabase Storage buckete 'pdf-assets' (a 'zip-assets').
  2. Zobrazí kompletný zoznam nahraných PDF/PPTX/ZIP súborov (veľkosť, dátum vytvorenia, cestu).
  3. Porovná nájdené súbory s aktívnym štandardom V20 (kt-01 až kt-08).
  4. Identifikuje a zvýrazní STARÉ / DUPLICITNÉ / SIROTSKÉ PDF súbory, ktoré tam nemajú čo robiť.
  5. [VOLITEĽNÉ] Umožní jedným klikom zmazať staré vybrané súbory zo Supabase Storage.
===============================================================================
"""

import os
import sys
import json
import time
import urllib.request
import urllib.error

SUPABASE_URL = "https://ljyvsolsgliephsfkfgx.supabase.co"
BUCKETS_TO_SCAN = ["pdf-assets", "zip-assets"]

# Aktívne V20 kategórie (kt-01 až kt-08)
VALID_V20_PREFIXES = [
    "documents-pdf-pptx-k-01",
    "documents-pdf-pptx-k-02",
    "documents-pdf-pptx-k-03",
    "documents-pdf-pptx-k-04",
    "documents-pdf-pptx-k-05",
    "documents-pdf-pptx-k-06",
    "documents-pdf-pptx-k-07",
    "documents-pdf-pptx-k-08",
    "zip-archives-kt-01",
    "zip-archives-kt-02",
    "zip-archives-kt-03",
    "zip-archives-kt-04",
    "zip-archives-kt-05",
    "zip-archives-kt-06",
    "zip-archives-kt-07",
    "zip-archives-kt-08"
]

def format_size(bytes_size):
    if not bytes_size:
        return "0 KB"
    mb = bytes_size / (1024 * 1024)
    if mb >= 1.0:
        return f"{mb:.2f} MB"
    kb = bytes_size / 1024
    return f"{kb:.1f} KB"

def get_headers(api_key):
    return {
        "Authorization": f"Bearer {api_key}",
        "apiKey": api_key,
        "Content-Type": "application/json"
    }

def list_supabase_dir(api_key, bucket, prefix=""):
    """Rekurzívne preskenuje priečinok v Supabase Storage."""
    url = f"{SUPABASE_URL}/storage/v1/object/list/{bucket}"
    payload = json.dumps({
        "prefix": prefix,
        "limit": 1000,
        "offset": 0,
        "sortBy": {"column": "name", "order": "asc"}
    }).encode("utf-8")

    req = urllib.request.Request(url, data=payload, headers=get_headers(api_key), method="POST")
    files = []
    
    try:
        with urllib.request.urlopen(req) as resp:
            items = json.loads(resp.read().decode("utf-8"))
            for item in items:
                item_name = item.get("name")
                if not item_name:
                    continue
                
                full_path = f"{prefix}{item_name}" if not prefix else f"{prefix}/{item_name}"
                
                # Ak nemá metadata alebo id (alebo name je priečinok), ide o pod-priečinok
                if item.get("id") is None or item.get("metadata") is None:
                    # Prehľadávame rekurzívne pod-priečinok
                    sub_files = list_supabase_dir(api_key, bucket, full_path)
                    files.extend(sub_files)
                else:
                    files.append({
                        "bucket": bucket,
                        "name": item_name,
                        "full_path": full_path,
                        "size": item.get("metadata", {}).get("size", 0),
                        "mimetype": item.get("metadata", {}).get("mimetype", ""),
                        "created_at": item.get("created_at", "N/A"),
                        "updated_at": item.get("updated_at", "N/A")
                    })
    except urllib.error.HTTPError as e:
        body = e.read().decode("utf-8", errors="ignore")
        print(f"  ❌ Chyba skenovania [{bucket}] na trati '{prefix}': {e.code} - {body}")
    except Exception as ex:
        print(f"  ❌ Neočakávaná chyba pri skenovaní: {ex}")

    return files

def delete_supabase_files(api_key, bucket, file_paths):
    """Odstráni vybrané súbory zo Supabase Storage."""
    if not file_paths:
        return
    
    url = f"{SUPABASE_URL}/storage/v1/object/{bucket}"
    payload = json.dumps({"prefixes": file_paths}).encode("utf-8")
    req = urllib.request.Request(url, data=payload, headers=get_headers(api_key), method="DELETE")
    
    try:
        with urllib.request.urlopen(req) as resp:
            print(f"  ✅ Úspešne vymazaných {len(file_paths)} súborov z bucketu '{bucket}'.")
    except Exception as ex:
        print(f"  ❌ Chyba pri mazaní zo Supabase: {ex}")

def main():
    print("=========================================================================")
    print("👑 PROJEKT NEXUS OS GENESIS — SUPABASE PDF & ASSET STORAGE SCANNER V20.80")
    print("=========================================================================")
    
    api_key = input("🔑 Zadaj Supabase Service Role Key (alebo Secret Key): ").strip()
    if not api_key:
        print("❌ API kľúč je povinný pre skenovanie. Ukončujem skript.")
        sys.exit(1)

    all_found_files = []
    old_orphan_files = []

    for bucket in BUCKETS_TO_SCAN:
        print(f"\n🔍 Spúšťam skenovanie Storage Bucket-u: '{bucket}'...")
        bucket_files = list_supabase_dir(api_key, bucket)
        print(f"   📊 Našiel som celkovo {len(bucket_files)} súborov v buckete '{bucket}'.")
        
        for f in bucket_files:
            all_found_files.append(f)
            
            # Kontrola či súbor spadá pod platnú V20 štruktúru
            is_valid_v20 = any(f["full_path"].startswith(prefix) for prefix in VALID_V20_PREFIXES)
            if not is_valid_v20:
                old_orphan_files.append(f)

    # 📈 REKAPITULÁCIA SKENOVANIA
    print("\n=========================================================================")
    print("📊 FINÁLNA DIAGNOSTIKA SKENOVANIA SUPABASE STORAGE")
    print("=========================================================================")
    print(f"  • Celkový počet nájdených súborov: {len(all_found_files)}")
    print(f"  • Počet PLATNÝCH V20 súborov (kt-01 až kt-08): {len(all_found_files) - len(old_orphan_files)}")
    print(f"  • Počet STARÝCH / SIROTSKÝCH / NEŠTANDARDNÝCH súborov: {len(old_orphan_files)}")
    
    if all_found_files:
        print("\n📂 DETAILNÝ ZOZNAM VŠETKÝCH NAHRANÝCH SÚBOROV:")
        print("-" * 80)
        for idx, f in enumerate(all_found_files, 1):
            status = "🟢 [VALID V20]" if f not in old_orphan_files else "🔴 [OLD/ORPHAN]"
            print(f"{idx:02d}. {status} {f['bucket']}/{f['full_path']} ({format_size(f['size'])})")

    if old_orphan_files:
        print("\n🚨 DETEGOVANÉ STARÉ SÚBORY NA DEKOMPRESIU (MAZANIE):")
        print("-" * 80)
        for idx, f in enumerate(old_orphan_files, 1):
            print(f"  [{idx}] {f['bucket']}/{f['full_path']} ({format_size(f['size'])})")
        
        choice = input("\n🗑️ Chceš vymazať všetky detegované staré súbory zo Supabase Storage? (ano/nie): ").strip().lower()
        if choice in ["ano", "a", "yes", "y"]:
            # Mazanie podľa bucketov
            pdf_deletes = [f["full_path"] for f in old_orphan_files if f["bucket"] == "pdf-assets"]
            zip_deletes = [f["full_path"] for f in old_orphan_files if f["bucket"] == "zip-assets"]
            
            if pdf_deletes:
                delete_supabase_files(api_key, "pdf-assets", pdf_deletes)
            if zip_deletes:
                delete_supabase_files(api_key, "zip-assets", zip_deletes)
            print("✨ Dekompresia dokončená. Supabase Storage je 100% čisté a pripravené pre V20!")
        else:
            print("ℹ️ Mazanie zrušené. Súbory zostávajú v pôvodnom stave.")
    else:
        print("\n✨ SKVELÁ SPRÁVA: V Supabase Storage sa nenachádzajú žiadne staré neštandardné PDF súbory!")

if __name__ == "__main__":
    main()
