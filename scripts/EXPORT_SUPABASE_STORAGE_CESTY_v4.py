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
    print("🚀 SUPABASE STORAGE HARVESTER 6 SÚRODENCOV v4.0 (AUTODETECT & CLASSIFY 6 SIBLINGS)")
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


def classify_file(item):
    bucket = item.get("bucket", "")
    path = item.get("path", "").lower()
    name = item.get("name", "").lower()
    ext = os.path.splitext(name)[1].lower()
    
    if ext in [".mp3", ".wav", ".flac", ".ogg"] or "mp3-clean" in path or "audios" in path or bucket == "codm-zombies-are-back":
        return "audios"
    if ext in [".mp4", ".mov", ".webm", ".mkv"] or "mp4-clean" in path or "videos" in path:
        return "videos"
    if any(k in path for k in ["kt-04", "33a", "34b", "35c", "app", "apps", "terminal", "electron", "pwa"]):
        return "apps"
    if bucket == "pdf-assets" or ext in [".pdf", ".pptx", ".doc", ".docx"] or any(k in path for k in ["kt-01", "kt-02", "kt-03", "kt-05", "kt-06", "kt-07", "kt-08", "documents-"]):
        return "documents"
    if bucket in ["bot-avatars", "image-media"] or ext in [".jpg", ".jpeg", ".png", ".webp", ".svg"]:
        if bucket == "system-standby" or "pagesmaster" in path or "matrix-fx" in path:
            return "shopMembershipFx"
        return "images"
    if bucket == "system-standby" or any(k in path for k in ["matrix-fx", "standby", "membership", "pack"]):
        return "shopMembershipFx"
    return "documents"

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
        
    # 👥 KATEGORIZÁCIA DO 6 SÚRODENCOV OBCHODU
    siblings = {
        "documents": [],
        "audios": [],
        "videos": [],
        "images": [],
        "apps": [],
        "shopMembershipFx": []
    }
    
    for bucket_name, b_files in total_catalog.items():
        for it in b_files:
            it["relative_cdn"] = f"{bucket_name}/{it['path']}"
            cat = classify_file(it)
            siblings[cat].append(it)

    target_dirs = [
        os.getcwd(),
        r"D:\Projects\PROJEKT-NEXUS_5.0\NEXUS-OS_GENESIS-EDITION\scripts"
    ]

    for t_dir in target_dirs:
        try:
            os.makedirs(t_dir, exist_ok=True)
            
            # 1. JSON Export
            json_file = os.path.join(t_dir, "SUPABASE_STORAGE_6_SURODENCOV.json")
            json_data = {
                "cdn_base": f"{SUPABASE_URL}/storage/v1/object/public",
                "total_files": total_count,
                "total_size_mb": round(total_size_mb, 2),
                "counts": {k: len(v) for k, v in siblings.items()},
                "siblings": {
                    k: [{"path": it["relative_cdn"], "name": it["name"], "size_mb": it["size_mb"], "url": it["url"]} for it in v]
                    for k, v in siblings.items()
                }
            }
            with open(json_file, "w", encoding="utf-8") as f:
                json.dump(json_data, f, indent=2, ensure_ascii=False)
                
            # 2. JS Most pre frontend data.js (kompaktný bez milión riadkov)
            js_file = os.path.join(t_dir, "GlobalSupabaseCDN_URL_Live.js")
            with open(js_file, "w", encoding="utf-8") as f:
                f.write("// ====================================================================================\n")
                f.write("// 🌐 GLOBAL SUPABASE CDN URL REGISTRY - LIVE EXTRACTED (6 SÚRODENCOV OBCHODU)\n")
                f.write(f"// Celkovo overených aktív v cloude: {total_count}\n")
                f.write("// ====================================================================================\n\n")
                f.write(f"export const CDN_BASE = \"{SUPABASE_URL}/storage/v1/object/public\";\n\n")
                f.write("export const SHOP_SIBLINGS_CDN = {\n")
                for k, v in siblings.items():
                    f.write(f"  // 📦 SÚRODENEC: {k} ({len(v)} súborov)\n")
                    f.write(f"  {k}: [\n")
                    for it in v:
                        f.write(f"    \"{it['relative_cdn']}\",\n")
                    f.write("  ],\n\n")
                f.write("};\n\n")
                f.write("/** Vráti plnú klikateľnú CDN URL adresu */\n")
                f.write("export const getCdnUrl = (relPath) => `${CDN_BASE}/${relPath}`;\n\n")
                f.write("export default SHOP_SIBLINGS_CDN;\n")
                
            # 3. Markdown Audit s klikateľnými URL
            md_file = os.path.join(t_dir, "SUPABASE_STORAGE_6_SURODENCOV.md")
            with open(md_file, "w", encoding="utf-8") as f:
                f.write("# 🌐 SUPABASE STORAGE - AUDIT REGISTER 6 SÚRODENCOV (LIVE CDN V4.0)\n\n")
                f.write(f"**Celkovo súborov v cloude:** `{total_count}`  \n")
                f.write(f"**Celková veľkosť dát:** `{round(total_size_mb / 1024, 2)} GB` ({round(total_size_mb, 2)} MB)  \n")
                f.write(f"**CDN Base Endpoint:** `{SUPABASE_URL}/storage/v1/object/public`  \n\n")
                for k, v in siblings.items():
                    f.write(f"## 📦 Súrodenec: `{k}` ({len(v)} súborov)\n\n")
                    f.write("| Relatívna cesta | Veľkosť (MB) | Priama CDN URL |\n")
                    f.write("| :--- | :---: | :--- |\n")
                    for it in v:
                        f.write(f"| `{it['relative_cdn']}` | {it['size_mb']} MB | [{it['name']}]({it['url']}) |\n")
                    f.write("\n")
        except Exception:
            pass

    print("\n==============================================================================")
    print(f"✅ HARVESTER 6 SÚRODENCOV V4.0 DOKONČENÝ NA 100%:")
    print(f"📊 CELKOVO SPRACOVANÝCH SÚBOROV: {total_count} naprieč {len(buckets)} bucketmi!")
    for k, v in siblings.items():
        print(f"   • {k}: {len(v)} súborov")
    print("==============================================================================")
    print("📄 1. JS Most pre data.js:  GlobalSupabaseCDN_URL_Live.js")
    print("📄 2. JSON Dátový Sklad:    SUPABASE_STORAGE_6_SURODENCOV.json")
    print("📄 3. Markdown Audit:       SUPABASE_STORAGE_6_SURODENCOV.md")
    print("==============================================================================")

if __name__ == "__main__":
    main()
