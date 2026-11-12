// ============================================================================
// 👑 NEXUS OS GENESIS: METADATA FORGE V5.0 (SINGLE SOURCE OF TRUTH)
// CORE_VERSION: NEXUS-FORGE-V5.0
// ============================================================================

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const OUTPUT_FILE_GENESIS = path.join(ROOT_DIR, 'strom-metadata-os-genesis-v5.md');
const OUTPUT_FILE_AGENCY = path.join(ROOT_DIR, 'strom-metadata-nexus-agency-v5.md');

console.log(`⚡ [NEXUS FORGE V5.0]: Spúšťam re-skenovanie pre: ${ROOT_DIR}`);

const categories = {
  '🖼️ **PUBLIC ASSETS & IMAGES**': [],
  '⚙️ **AUTOMATION SCRIPTS**': [],
  '🧩 **REACT COMPONENTS**': [],
  '🗄️ **DATA REGISTRIES & CONFIGS**': [],
  '📄 **ROUTING PAGES & MODULES**': [],
  '💠 **SUBPAGES & TIER NODES**': [],
  '🛠️ **ROOT CONFIGURATION & OTHER**': []
};

function getCategory(relativePath) {
  const normalized = relativePath.replace(/\\/g, '/');
  if (normalized.startsWith('public/')) return '🖼️ **PUBLIC ASSETS & IMAGES**';
  if (normalized.startsWith('scripts/')) return '⚙️ **AUTOMATION SCRIPTS**';
  if (normalized.startsWith('src/components/')) return '🧩 **REACT COMPONENTS**';
  if (normalized.startsWith('src/data/')) return '🗄️ **DATA REGISTRIES & CONFIGS**';
  if (normalized.startsWith('src/subPages/')) return '💠 **SUBPAGES & TIER NODES**';
  if (normalized.startsWith('src/pages/')) return '📄 **ROUTING PAGES & MODULES**';
  return '🛠️ **ROOT CONFIGURATION & OTHER**';
}

function scanDir(dir) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    if (['node_modules', '.git', 'build', 'dist', '.cache', '.firebase'].includes(item)) continue;
    const fullPath = path.join(dir, item);
    const relPath = path.relative(ROOT_DIR, fullPath);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      scanDir(fullPath);
    } else {
      const catKey = getCategory(relPath);
      categories[catKey].push({
        path: fullPath,
        relPath: relPath.replace(/\\/g, '/'),
        size: (stat.size / 1024).toFixed(2) + ' KB',
        mtime: stat.mtime.toISOString().replace('T', ' ').substring(0, 19)
      });
    }
  }
}

scanDir(ROOT_DIR);

let totalFiles = 0;
Object.values(categories).forEach(arr => totalFiles += arr.length);

function generateMarkdown(title) {
  let md = '# ' + title + '\n';
  md += '**Generated:** ' + new Date().toISOString().replace('T', ' ').substring(0, 19) + ' | **Total Files:** ' + totalFiles + ' | **Root:** `' + ROOT_DIR + '`\n\n';
  md += '--- \n\n';

  for (const [catTitle, files] of Object.entries(categories)) {
    if (files.length === 0) continue;
    md += '### ' + catTitle + ' (' + files.length + ' súborov)\n\n';
    md += '| 📄 **Relatívna Cesta (V5 SSOT)** | ⚖️ **Veľkosť** | ⏱️ **Posledná Úprava** |\n';
    md += '| :--- | :--- | :--- |\n';
    
    files.sort((a, b) => a.relPath.localeCompare(b.relPath));
    for (const file of files) {
      md += '| `' + file.relPath + '` | ' + file.size + ' | `' + file.mtime + '` |\n';
    }
    md += '\n';
  }
  return md;
}

const contentGenesis = generateMarkdown('👑 OS GENESIS EDITION V5.0: METADATA MATRIX');
const contentAgency = generateMarkdown('🏢 NEXUS AGENCY DIGITAL INFRASTRUCTURE V5.0: METADATA MATRIX');

fs.writeFileSync(OUTPUT_FILE_GENESIS, contentGenesis, 'utf-8');
fs.writeFileSync(OUTPUT_FILE_AGENCY, contentAgency, 'utf-8');

console.log(`✅ [COMPLETED V5.0]: Vygenerovaný OS Genesis register: ${OUTPUT_FILE_GENESIS}`);
console.log(`✅ [COMPLETED V5.0]: Vygenerovaný Agency register: ${OUTPUT_FILE_AGENCY}`);