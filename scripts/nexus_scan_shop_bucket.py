# ===============================================================================
# 👑 PROJEKT NEXUS OS GENESIS — SUPABASE BUCKET "shop" FULL SCANNER V20
# ===============================================================================
# Účel:
#   1. Rekurzívne preskenovať celý bucket 'shop' v Supabase Storage.
#   2. Roztriediť súbory do kategórií.
#   3. Vygenerovať dva typy zápisu: Relative Path a Ostrý Public CDN Link.
#   4. Uložiť prehľadný manifest do súboru SUPABASE_SHOP_INVENTORY.md.
# ===============================================================================


import os
import sys
import json
import urllib.request
import urllib.error
from pathlib import Path

# =============================================================================
# ⚙️ KONFIGURÁCIA PROJEKTU
# =============================================================================
SUPABASE_URL = "https://ljyvsolsgliephsfkfgx.supabase.co"
BUCKET_NAME = "shop"

def get_headers(api_key):
    return {
        "Authorization": f"Bearer {api_key}",
        "apiKey": api_key,
        "Content-Type": "application/json"
    }

def list_folder_recursive(api_key, prefix=""):
    """Rekurzívne prejde všetky podpriečinky a vráti zoznam súborov."""
    endpoint = f"{SUPABASE_URL}/storage/v1/object/list/{BUCKET_NAME}"
    payload = {
        "prefix": prefix,
        "limit": 500,
        "offset": 0,
        "sortBy": {"column": "name", "order": "asc"}
    }
    
    req = urllib.request.Request(
        endpoint,
        data=json.dumps(payload).encode("utf-8"),
        headers=get_headers(api_key),
        method="POST"
    )
    
    try:
        with urllib.request.urlopen(req) as resp:
            items = json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        print(f"\n❌ Chyba pri skenovaní prefixu '{prefix}': HTTP {e.code} - {e.read().decode('utf-8')}")
        return []

    results = []
    for item in items:
        name = item.get("name")
        if not name:
            continue
        
        full_path = f"{prefix}/{name}".strip("/") if prefix else name
        
        # Ak je to priečinok (id je None), rekurzívne doň vstúpime
        if item.get("id") is None:
            results.extend(list_folder_recursive(api_key, full_path))
        else:
            results.append({
                "name": name,
                "relativePath": full_path,
                "publicUrl": f"{SUPABASE_URL}/storage/v1/object/public/{BUCKET_NAME}/{full_path}",
                "sizeBytes": item.get("metadata", {}).get("size", 0),
                "mimetype": item.get("metadata", {}).get("mimetype", "unknown")
            })
            
    return results

def main():
    print("=" * 70)
    print("👑 NEXUS BACKEND CHIRURG: SUPABASE BUCKET 'shop' SCANNER V20")
    print("=" * 70)
    
    api_key = input("🔑 Zadaj Supabase Key (anon key alebo service_role key): ").strip()
    if not api_key:
        print("❌ Kľúč je povinný pre prístup k API.")
        return

    print(f"\n🔍 Začínam hĺbkový sken bucketu '{BUCKET_NAME}'...")
    all_files = list_folder_recursive(api_key, prefix="")
    
    print(f"✅ Sken dokončený. Nájdených {len(all_files)} súborov.\n")

    # Rozdelenie do kategórií podľa hlavného podpriečinka
    categories = {}
    for f in all_files:
        parts = f["relativePath"].split("/")
        if len(parts) > 2:
            category_name = f"{parts}/{parts}[1]"
        elif len(parts) > 1:
            category_name = parts[0]
        else:
            category_name = "Root"
            
        if category_name not in categories:
            categories[category_name] = []
        categories[category_name].append(f)

    # Tvorba Markdown výstupu
    md_lines = [
        f"# 👑 SUPABASE STORAGE INVENTÁR: BUCKET `{BUCKET_NAME}`",
        f"**Celkový počet súborov:** {len(all_files)}",
        f"**Základná URL:** `{SUPABASE_URL}/storage/v1/object/public/{BUCKET_NAME}/`\n",
        "---"
    ]

    for cat_name, files in sorted(categories.items()):
        md_lines.append(f"\n## 📁 Kategória: `{cat_name}` ({len(files)} súborov)\n")
        for f in files:
            md_lines.append(f"### 📄 `{f['name']}`")
            md_lines.append(f"- **Relative Path:** `{f['relativePath']}`")
            md_lines.append(f"- **Public CDN Link:** [{f['publicUrl']}]({f['publicUrl']})")
            size_mb = f["sizeBytes"] / (1024 * 1024) if f["sizeBytes"] else 0
            md_lines.append(f"- **Veľkosť:** {size_mb:.2f} MB | **MIME:** `{f['mimetype']}`\n")

    output_filename = "SUPABASE_SHOP_INVENTORY.md"
    desktop_path = Path.home() / "Desktop" / output_filename
    
    with open(output_filename, "w", encoding="utf-8") as out_f:
        out_f.write("\n".join(md_lines))
        
    try:
        with open(desktop_path, "w", encoding="utf-8") as desk_f:
            desk_f.write("\n".join(md_lines))
        print(f"📄 Report bol úspešne uložený na plochu: {desktop_path}")
    except Exception:
        print(f"📄 Report bol uložený v lokálnom priečinku: {output_filename}")

    print("\n" + "=" * 70)
    print("⬛🫡 SKEN HOTÝ. MÔŽEŠ SI OTVORIŤ VYGENEROVANÝ DOKUMENT!")
    print("=" * 70)

if __name__ == "__main__":
    main()