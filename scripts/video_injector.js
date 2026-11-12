/**
 * ============================================================================
 * 🚀 NEXUS OS: VIDEO INJECTOR (V3 - INTERAKTÍVNY KOBERCOVÝ BOMBARDÉR)
 * ============================================================================
 * ÚČEL SKRIPTU:
 * Tento Node.js skript slúži na hromadnú (kobercovú) injektáž video modulu 
 * `<GlobalNodeVideo>` do stoviek fyzických uzlov (.jsx) v zložke subPages.
 * Automaticky deteguje Node ID, farbu dimenzie a bezpečne vloží importy aj 
 * samotný komponent pod hlavičku `<header>`.
 *
 * OCHRANA (ANTI-DUPLICATE):
 * Skript najprv vykoná audit. Ak uzol už video modul obsahuje, preskočí ho.
 * Taktiež ignoruje súbory s atypickým formátovaním, aby nerozbil Matrix.
 *
 * AKO TO POUŽÍVAŤ:
 * 1. Otvor terminál vo VS Code.
 * 2. Presuň sa do zložky scripts: `cd scripts` (ak tam ešte nie si).
 * 3. Spusti skript príkazom: `node video_injector.js`
 * 4. Skontroluj výsledky auditu a potvrď zápis stlačením 'y'.
 * ============================================================================
 */

const fs = require("fs").promises;
const path = require("path");
const readline = require("readline");

// Vytvorenie interaktívneho rozhrania pre konzolu
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const askQuestion = (query) =>
  new Promise((resolve) => rl.question(query, resolve));

// ⚡ FIX PRE ZLOŽKU /scripts: Relatívna cesta o úroveň vyššie (do /src/subPages)
const SUBPAGES_DIR = path.join(__dirname, "..", "src", "subPages");

// Rekurzívne hľadanie JSX súborov v podpriečinkoch Matrixu
async function getFiles(dir) {
  let results = [];
  const list = await fs.readdir(dir, { withFileTypes: true });
  for (const file of list) {
    const res = path.resolve(dir, file.name);
    if (file.isDirectory()) {
      results = results.concat(await getFiles(res));
    } else if (file.isFile() && file.name.endsWith(".jsx")) {
      // Zaujímajú nás len súbory, ktoré sú skutočné uzly (Node_ alebo LOG-)
      if (file.name.startsWith("Node_") || file.name.includes("_LOG-")) {
        results.push(res);
      }
    }
  }
  return results;
}

async function runInjector() {
  console.log("\n========================================================");
  console.log("🚀 NEXUS VIDEO INJECTOR (V3 - INTERAKTÍVNY ROOT SCRIPT)");
  console.log("========================================================\n");

  try {
    const files = await getFiles(SUBPAGES_DIR);
    console.log(
      `[+] Skúmam Matrix: Nájdených ${files.length} potenciálnych uzlov.\n`,
    );

    let readyToInject = [];
    let alreadyInjected = [];
    let skipped = [];

    // ========================================================================
    // 🧠 FÁZA 1: AUDIT (Skenovanie a detekcia premenných v uzloch)
    // ========================================================================
    for (const file of files) {
      let content = await fs.readFile(file, "utf8");
      const fileName = path.basename(file);

      // Kontrola, či už náhodou uzol modul nemá (Ochrana proti duplikátom)
      if (content.includes("<GlobalNodeVideo")) {
        alreadyInjected.push(fileName);
        continue;
      }

      // Inteligentná extrakcia ID z názvu súboru cez Regex
      let nodeId = null;
      const matchNode = fileName.match(/Node_(ID\d+)_(\d+)\.jsx/); // napr. Node_ID01_36.jsx
      const matchLog = fileName.match(/(ID\d+)_LOG-(\d+)\.jsx/); // napr. ID00_LOG-03.jsx

      if (matchNode) nodeId = `${matchNode[1]}-${matchNode[2]}`;
      else if (matchLog) nodeId = `${matchLog[1]}-${matchLog[2]}`;

      if (!nodeId) {
        skipped.push(`${fileName} (Neznámy formát ID)`);
        continue;
      }

      // Detekcia konštanty farby (rôzne uzly ju môžu mať definovanú inak)
      let colorVarName = null;
      if (content.includes("DIM_COLOR")) colorVarName = "DIM_COLOR";
      else if (content.includes("dimColor")) colorVarName = "dimColor";

      // Kontrola miesta pre bezpečné vloženie kódu (pod Hlavičkou)
      const hasHeader = content.includes("</header>");

      if (!colorVarName || !hasHeader) {
        skipped.push(`${fileName} (Chýba farba alebo </header> tag)`);
        continue;
      }

      readyToInject.push({
        file,
        name: fileName,
        nodeId,
        colorVar: colorVarName,
        content,
      });
    }

    // --- VÝSTUP AUDITU PRE ARCHITEKTA ---
    console.log(`✅ Pripravené na injektáž: ${readyToInject.length} uzlov`);
    console.log(`⚡ Už obsahujú video modul: ${alreadyInjected.length} uzlov`);
    console.log(`❌ Preskočené (chybné/atypické): ${skipped.length} uzlov\n`);

    if (readyToInject.length === 0) {
      console.log("Všetky uzly už sú nainjektované. Končím protokol.");
      rl.close();
      return;
    }

    console.log("UKÁŽKA PRVÝCH 3 UZLOV (Audit):");
    readyToInject.slice(0, 3).forEach((res) => {
      console.log(
        ` -> ${res.name} | Extrahované ID: ${res.nodeId} | Farba: ${res.colorVar}`,
      );
    });

    // ========================================================================
    // ✍️ FÁZA 2: POTVRDENIE A FYZICKÝ ZÁPIS KÓDU
    // ========================================================================
    const answer = await askQuestion(
      `\nSpustiť fyzický zápis (Injektáž) do ${readyToInject.length} súborov? (y/n): `,
    );

    if (answer.toLowerCase() === "y" || answer.toLowerCase() === "yes") {
      console.log("\n🚀 ZAČÍNAM PREPISOVAŤ KÓD...");
      let successCount = 0;

      for (const item of readyToInject) {
        let newContent = item.content;

        // 1. INJEKTÁŽ IMPORTU (Ošetrenie pádov z predošlých verzií)
        const importString = `import { GlobalNodeVideo } from "../../../components/GlobalNodeVideo";\n`;
        if (!newContent.includes("GlobalNodeVideo")) {
          if (newContent.includes("import { SoundFX }")) {
            newContent = newContent.replace(
              "import { SoundFX }",
              `${importString}import { SoundFX }`,
            );
          } else if (newContent.includes("// 🟢 1. PRODUKČNÉ IMPORTY")) {
            newContent = newContent.replace(
              "// 🟢 1. PRODUKČNÉ IMPORTY",
              `// 🟢 1. PRODUKČNÉ IMPORTY\n${importString}`,
            );
          } else {
            // Fallback tesne pod React import
            newContent = newContent.replace(
              /(import React.*?;\n)/,
              `$1${importString}`,
            );
          }
        }

        // 2. INJEKTÁŽ KOMPONENTU (Precízne vpálenie za <header>)
        const componentInjection = `</header>\n\n      {/* =====================================================================\n          ⭐ INJEKTÁŽNY MODUL: YOUTUBE VIDEO \n      ====================================================================== */}\n      <GlobalNodeVideo nodeId="${item.nodeId}" dimColor={${item.colorVar}} />`;

        newContent = newContent.replace("</header>", componentInjection);

        await fs.writeFile(item.file, newContent, "utf8");
        successCount++;
        console.log(`[OK] Vložené: ${item.name}`);
      }
      console.log(`\n🎉 HOTOVO! Úspešne upravených ${successCount} uzlov.`);
    } else {
      console.log("Injektáž zrušená. Žiadne súbory neboli zmenené.");
    }
  } catch (error) {
    console.error("Kritická chyba:", error);
  } finally {
    rl.close();
  }
}

runInjector();