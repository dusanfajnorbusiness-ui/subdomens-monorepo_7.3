import sys
import os
import json
import urllib.request
import urllib.error
import time

SUPABASE_URL = "https://ljyvsolsgliephsfkfgx.supabase.co"

def get_key():
    if len(sys.argv) > 1 and sys.argv[1].strip():
        return sys.argv[1].strip()
    print("==============================================================================")
    print("🚀 SUPABASE STORAGE DYNAMIC ALL-BUCKETS EXPORTER v3.0 (AUTODETECT ALL BUCKETS)")
    print("==============================================================================")
    key = input("👉 Vložte váš Supabase Anon alebo Service Role Key: ").strip()
    return key

def fetch_all_buckets(api_key):
    """Dynamicky načíta VŠETKY existujúce aj budúce Buckety priamo z Supabase API."""
    url = f"{SUPABASE_URL}/storage/v1/bucket"
    req = urllib.request.Request(url, headers={
        "Authorization": f"Bearer {api_key}",
        "apikey": api_key
    })
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            buckets = [b['id'] for b in data if isinstance(b, dict) and 'id' in b]
            return buckets
    except Exception as e:
        print(f"⚠️ Nepodarilo sa dynamicky získať zoznam bucketov cez API ({e}). Použijem záložný zoznam.")
        return ["pdf-assets", "bot-avatars", "system-standby", "image-media", "zip-assets", "codm-zombies-are-back"]

def list_files_recursive(bucket, prefix="", api_key="", retries=3):
    """Rekurzívne prejde celú podadresárovú štruktúru v danom buckete."""
    url = f"{SUPABASE_URL}/storage/v1/object/list/{bucket}"
    payload = json.dumps({
        "prefix": prefix,
        "limit": 1000,
        "offset": 0,
        "sortBy": {"column": "name", "order": "asc"}
    }).encode('utf-8')
    
    headers = {
        "Authorization": f"Bearer {api_key}",
        "apikey": api_key,
        "Content-Type": "application/json"
    }
    
    for attempt in range(retries):
        try:
            req = urllib.request.Request(url, data=payload, headers=headers, method="POST")
            with urllib.request.urlopen(req, timeout=15) as resp:
                items = json.loads(resp.read().decode('utf-8'))
                
                all_files = []
                for item in items:
                    name = item.get("name")
                    if not name:
                        continue
                    
                    full_path = f"{prefix}/{name}".strip("/") if prefix else name
                    
                    # Ak položka nemá ID ani metadata, ide o virtuálny adresár -> rekurzia
                    if item.get("id") is None and item.get("metadata") is None:
                        all_files.extend(list_files_recursive(bucket, full_path, api_key))
                    else:
                        size_bytes = item.get("metadata", {}).get("size", 0) if item.get("metadata") else 0
                        all_files.append({
                            "bucket": bucket,
                            "path": full_path,
                            "name": name,
                            "size_mb": round(size_bytes / (1024 * 1024), 2),
                            "url": f"{SUPABASE_URL}/storage/v1/object/public/{bucket}/{full_path}"
                        })
                return all_files
        except Exception as e:
            if attempt < retries - 1:
                time.sleep(1.5)
            else:
                print(f"  ❌ Chyba pri načítaní path '{prefix}' v buckete '{bucket}': {e}")
                return []

def main():
    api_key = get_key()
    if not api_key:
        print("❌ Chýba API Kľúč! Exekúcia zrušená.")
        sys.exit(1)
        
    print("\n🔍 DYNAMICKÝ SKEN VŠETKÝCH BUCKETOV V CLOUDE...")
    buckets = fetch_all_buckets(api_key)
    print(f"✅ Nájdených {len(buckets)} bucketov: {', '.join(buckets)}")
    
    total_catalog = {}
    total_count = 0
    total_size_mb = 0.0
    
    for bucket in buckets:
        print(f"[+] Získavam dáta pre bucket: '{bucket}'...")
        files = list_files_recursive(bucket, "", api_key)
        total_catalog[bucket] = files
        bucket_size = sum(f["size_mb"] for f in files)
        total_count += len(files)
        total_size_mb += bucket_size
        print(f"    └─ 📊 '{bucket}': {len(files)} súborov | {round(bucket_size, 2)} MB")
        
    # Výstupné súbory
    target_dir = r"D:\Projects\PROJEKT-NEXUS_5.0\NEXUS-OS_GENESIS-EDITION\scripts"
    os.makedirs(target_dir, exist_ok=True)
    
    md_file = os.path.join(target_dir, "SUPABASE_STORAGE_CESTY.md")
    json_file = os.path.join(target_dir, "SUPABASE_STORAGE_CESTY.json")
    
    # Zápis JSON
    with open(json_file, "w", encoding="utf-8") as f:
        json.dump(total_catalog, f, indent=2, ensure_ascii=False)
        
    # Zápis Markdown
    with open(md_file, "w", encoding="utf-8") as f:
        f.write("# 🌐 SUPABASE STORAGE - GLOBÁLNA MAPA DÁTOVÝCH CIEST (DYNAMIC V3.0)\n\n")
        f.write(f"**Celkovo spracovaných bucketov:** `{len(buckets)}`  \n")
        f.write(f"**Celkovo súborov v cloude:** `{total_count}`  \n")
        f.write(f"**Celková veľkosť dát:** `{round(total_size_mb / 1024, 2)} GB` ({round(total_size_mb, 2)} MB)  \n\n")
        
        for bucket, files in total_catalog.items():
            f.write(f"## 📦 Bucket: `{bucket}` ({len(files)} súborov)\n\n")
            if not files:
                f.write("_Bucket je prázdny._\n\n")
                continue
            f.write("| Súbor / Cesta | Veľkosť (MB) | Public CDN URL |\n")
            f.write("| :--- | :---: | :--- |\n")
            for item in files:
                f.write(f"| `{item['path']}` | {item['size_mb']} MB | [{item['name']}]({item['url']}) |\n")
            f.write("\n")
            
    print("\n==============================================================================")
    print(f"✅ EXPORT DOKONČENÝ:")
    print(f"📄 Markdown: {md_file}")
    print(f"📄 JSON Data: {json_file}")
    print(f"📊 CELKOVO SPRACOVANÝCH SÚBOROV: {total_count} naprieč {len(buckets)} bucketmi!")
    print("==============================================================================")

if __name__ == "__main__":
    main()
