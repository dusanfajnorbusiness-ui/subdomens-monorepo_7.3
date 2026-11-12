/**
 * ============================================================================
 * 🌌 NEXUS EXODUS SCANNER V1.0 (ANTI-SPAGHETTI RADAR) - MANUÁL NA POUŽITIE
 * ============================================================================
 * ÚČEL SKRIPTU:
 * Tento Node.js radar je kritickým strážcom Protokolu EXODUS. 
 * Prehľadáva celý priečinok 'src' a hľadá akékoľvek priame napojenia na 
 * Firebase/Firestore (napr. importy ako 'from "firebase/firestore"').
 * 
 * PREČO JE TO DÔLEŽITÉ:
 * V OS Genesis V20 (a vyššie) nesmie žiadny UI komponent komunikovať s databázou 
 * napriamo. Všetka komunikácia musí pretekať cez abstraktný most 'NexusDB_Core'. 
 * Ak skener nájde "Infikovaný uzol", znamená to, že tento súbor porušuje 
 * pravidlá a pri prepnutí cloudu (na Supabase) by spôsobil pád (Error 500).
 * 
 * AKO TO POUŽÍVAŤ:
 * Pred každým väčším nasadením (Deploymentom) na Vercel alebo GitHub otvor 
 * terminál a zadaj:
 * node scripts/exodus-scan.js
 * 
 * Cieľ: Skener musí na konci zahlásiť zeleným: MATRIX JE ČISTÝ!
 * ============================================================================
 */

const fs = require('fs');
const path = require('path');

// 🔍 Nastavenia skenera
const TARGET_DIR = path.join(__dirname, '../src');
const TARGET_PATTERNS = [
  'from "firebase/firestore"',
  'from \'firebase/firestore\'',
  'updateDoc',
  'setDoc',
  'addDoc',
  'deleteDoc',
  'onSnapshot',
  'collection(',
  'dbCore'
];

// 🎨 Farby do terminálu
const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  cyan: "\x1b[36m",
  bgRed: "\x1b[41m"
};

console.log(`${colors.bright}${colors.cyan}🛰️ NEXUS OS: EXODUS RADAR ŠTARTUJE...${colors.reset}\n`);

let infectedFilesCount = 0;
let totalFilesScanned = 0;

/**
 * 🧠 Rekurzívne prehľadávanie zložiek
 */
function scanDirectory(dir) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Ignorujeme node_modules a iné balasty
      if (file !== 'node_modules' && file !== '.git') {
        scanDirectory(filePath);
      }
    } else {
      // Skenujeme len zdrojové súbory
      if (file.endsWith('.js') || file.endsWith('.jsx')) {
        totalFilesScanned++;
        checkFile(filePath, file);
      }
    }
  });
}

/**
 * 🔬 Analýza obsahu súboru
 */
function checkFile(filePath, fileName) {
  const content = fs.readFileSync(filePath, 'utf8');
  let findings = [];

  TARGET_PATTERNS.forEach(pattern => {
    if (content.includes(pattern)) {
      findings.push(pattern);
    }
  });

  if (findings.length > 0) {
    infectedFilesCount++;
    const relativePath = path.relative(path.join(__dirname, '..'), filePath);
    
    console.log(`${colors.bgRed}${colors.bright} 🔴 INFIKOVANÝ UZOL: ${relativePath} ${colors.reset}`);
    console.log(`${colors.yellow}   ↳ Nájdené artefakty: ${colors.reset}${findings.join(', ')}`);
    
    // Extrakcia konkrétnych riadkov (pre rýchlejšiu navigáciu)
    const lines = content.split('\n');
    lines.forEach((line, index) => {
      if (TARGET_PATTERNS.some(p => line.includes(p))) {
        if (!line.trim().startsWith('//') && !line.trim().startsWith('*')) {
          console.log(`${colors.cyan}      [L${index + 1}]:${colors.reset} ${line.trim().substring(0, 80)}...`);
        }
      }
    });
    console.log('');
  }
}

// 🚀 Exekúcia
try {
  scanDirectory(TARGET_DIR);

  console.log('------------------------------------------------------------');
  if (infectedFilesCount === 0) {
    console.log(`${colors.green}${colors.bright}✅ MATRIX JE ČISTÝ! Všetky súbory sú EXODUS-READY.${colors.reset}`);
  } else {
    console.log(`${colors.yellow}⚠️ NÁLEZ DOKONČENÝ:${colors.reset}`);
    console.log(`🔍 Skenovaných súborov: ${totalFilesScanned}`);
    console.log(`🔴 Kandidátov na defragmentáciu: ${infectedFilesCount}`);
    console.log(`\n${colors.bright}TVOJ POSTUP:${colors.reset} Presuň logiku z týchto súborov do NexusDB mosta.`);
  }
} catch (error) {
  console.error(`${colors.red}Kritická chyba skenera:${colors.reset}`, error.message);
}