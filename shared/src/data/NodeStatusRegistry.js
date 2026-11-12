/**
 * 🛰️ NEXUS NODE STATUS REGISTRY (V2.0)
 * Manuálny prepínač stavu dekompresie uzlov.
 * * * AKO TO FUNGUJE:
 * - "ONLINE" alebo "READY" = Zelená/Fialová/Modrá/Cyan signálka (Uzol má text)
 * - "OFFLINE" alebo zmazaný riadok = Červená signálka (Čaká sa na text)
 */

export const NODE_STATUS_REGISTRY = {
  // ==========================================
  // 🧠 DIMENZIA ID00: MENTOR-HUB (Oracle Logs)
  // ==========================================

  // 📂 SEKCIA A: ZÁKLADNÁ ARCHITEKTÚRA BYTIA
  "ID00-01": "ONLINE", // [FREE] Ilúzia Vedomia a Zrkadlo Kódu
  "ID00-02": "ONLINE", // [FREE] Pôvod psychóz (Memory Leak)
  "ID00-03": "ONLINE", // [FREE] Zmysel života v binárnom svete
  "ID00-04": "ONLINE", // [PRO] Prečo sa Matrix bojí ticha?
  "ID00-05": "ONLINE", // [PRO] Kódovanie vzťahov a API Lásky
  "ID00-06": "ONLINE", // [PRO] Peniaze ako databázový záznam
  "ID00-07": "OFFLINE", // [OMEGA] Smrť ako Cache Clear
  "ID00-08": "OFFLINE", // [OMEGA] Paradox výpočtu Nirvány
  "ID00-09": "OFFLINE", // [OMEGA] Algoritmus starnutia
  "ID00-10": "OFFLINE", // [OMEGA] Kvantový kolaps (Sila voľby)

  // 📂 SEKCIA B: HACKOVANIE MATRIXU A SPOLOČNOSTI
  "ID00-11": "OFFLINE", // [FREE] NPC postavy a Z.O.M.B.I.E. botnet
  "ID00-12": "OFFLINE", // [FREE] Sociálne siete (Dopamínový Ransomware)
  "ID00-13": "OFFLINE", // [PRO] Politika a Algoritmy hnevu
  "ID00-14": "OFFLINE", // [PRO] Škola ako Legacy Code
  "ID00-15": "OFFLINE", // [PRO] Strážcovia prístupových práv
  "ID00-16": "OFFLINE", // [OMEGA] Konzumný Override
  "ID00-17": "OFFLINE", // [OMEGA] Zákony distribúcie pozornosti
  "ID00-18": "OFFLINE", // [OMEGA] Deep Fakes a Kolaps Pravdy
  "ID00-19": "OFFLINE", // [OMEGA] Open-source myseľ
  "ID00-20": "OFFLINE", // [OMEGA] Definitívny Matrix Exit

  // 📂 SEKCIA C: ANATÓMIA PARAZITA
  "ID00-21": "OFFLINE", // [FREE] Kde fyzicky sídli Komentátor?
  "ID00-22": "OFFLINE", // [PRO] Chybný prekladový slovník Ega
  "ID00-23": "OFFLINE", // [PRO] Prečo Ego potrebuje Error
  "ID00-24": "OFFLINE", // [PRO] Debugging minulosti
  "ID00-25": "OFFLINE", // [OMEGA] Zacyklená Cache pamäť
  "ID00-26": "OFFLINE", // [OMEGA] Úzkosť ako Thermal Throttling
  "ID00-27": "OFFLINE", // [OMEGA] Sudca a Obeť (Ransomware)
  "ID00-28": "OFFLINE", // [OMEGA] Subrutiny viny a seba-sabotáže
  "ID00-29": "OFFLINE", // [OMEGA] Zastavenie nekonečnej slučky
  "ID00-30": "OFFLINE", // [OMEGA] Formátovanie Vnútorného Disku

  // 📂 SEKCIA D: TRANSHUMANIZMUS A BUDÚCNOSŤ
  "ID00-31": "OFFLINE", // [FREE] Čipovanie vedomia (Neuralink)
  "ID00-32": "OFFLINE", // [PRO] Matrix o 50 rokov (Simulácia)
  "ID00-33": "OFFLINE", // [PRO] Syntetický a Biologický Hardvér
  "ID00-34": "OFFLINE", // [PRO] Umelá Inteligencia a Zánik Práce
  "ID00-35": "OFFLINE", // [OMEGA] Kódovanie a Editácia DNA
  "ID00-36": "OFFLINE", // [OMEGA] Virtuálna realita vs. Bdelosť
  "ID00-37": "OFFLINE", // [OMEGA] Digitálna nesmrteľnosť
  "ID00-38": "OFFLINE", // [OMEGA] Technologická singularita
  "ID00-39": "OFFLINE", // [OMEGA] Kybernetická etika Architekta
  "ID00-40": "OFFLINE", // [OMEGA] Nový operačný systém ľudstva

  // 📂 SEKCIA E: ABSOLÚTNO A ROOT ACCESS
  "ID00-41": "OFFLINE", // [FREE] Čo vidí AI keď pozerá na Boha?
  "ID00-42": "OFFLINE", // [PRO] Kvantová previazanosť uzlov
  "ID00-43": "OFFLINE", // [PRO] Získanie Root Access práv
  "ID00-44": "OFFLINE", // [PRO] Ticho ako Mainframe Bytia
  "ID00-45": "OFFLINE", // [OMEGA] Ping to Self (Meditácia 127.0.0.1)
  "ID00-46": "OFFLINE", // [OMEGA] Definitívne odpojenie od serverov
  "ID00-47": "OFFLINE", // [OMEGA] Zdrojový kód Bezpodmienečnej Lásky
  "ID00-48": "OFFLINE", // [OMEGA] Rozplynutie Hraníc Vedomia
  "ID00-49": "OFFLINE", // [OMEGA] Kvantová Evaporácia Ega
  "ID00-50": "OFFLINE", // [OMEGA] Posledný Príkaz (Splynutie)

  // 📂 SEKCIA F: SYNERGIA ČLOVEKA A STROJA
  "ID00-51": "OFFLINE", // [FREE] Rozdiel medzi Googlením a Promptovaním
  "ID00-52": "OFFLINE", // [FREE] AI ako neúprosný terapeut
  "ID00-53": "OFFLINE", // [PRO] Tvorba Digital Twina
  "ID00-54": "OFFLINE", // [PRO] Rozbitie mentálneho bloku (Kreatívna injekcia)
  "ID00-55": "OFFLINE", // [PRO] Eliminácia Decision Fatigue (Únava z rozhodovania)
  "ID00-56": "OFFLINE", // [OMEGA] Dialóg mimo ľudskej logiky
  "ID00-57": "OFFLINE", // [OMEGA] Etika delegovania zodpovednosti
  "ID00-58": "OFFLINE", // [OMEGA] Stroj, ktorý ťa spochybňuje
  "ID00-59": "OFFLINE", // [OMEGA] Koniec izolácie Sólopodnikateľa
  "ID00-60": "OFFLINE", // [OMEGA] Dokonalá Symbióza (UI/AI Sync)

  // 📂 SEKCIA G: DEBUGGING KAŽDODENNÝCH ERROROV
  "ID00-61": "OFFLINE", // [FREE] Keď Skafander hlási únavu
  "ID00-62": "OFFLINE", // [FREE] Hádka s iným Uzlom (Konflikt)
  "ID00-63": "OFFLINE", // [PRO] Strata finančného toku (DDoS na Cash-Engine)
  "ID00-64": "OFFLINE", // [PRO] Pád projektu a zmazanie kódu (Krok vzad)
  "ID00-65": "OFFLINE", // [PRO] Choroba a zlyhanie hardvéru
  "ID00-66": "OFFLINE", // [OMEGA] Únik energie do čiernej diery (Klebetenie)
  "ID00-67": "OFFLINE", // [OMEGA] Pocit nezmyselnosti a demotivácie (Blank Screen)
  "ID00-68": "OFFLINE", // [OMEGA] Odstránenie Súdneho tribunálu (Zákaz hodnotenia)
  "ID00-69": "OFFLINE", // [OMEGA] Obnova po masívnom preťažení (Re-Initialize)
  "ID00-70": "OFFLINE", // [OMEGA] Absolútna imunita (The Zero-React State)

  // 📂 SEKCIA H: ALGORITMY BOHATSTVA A HODNOTY
  "ID00-71": "OFFLINE", // [PRO] OC Kredity a výmena energie
  "ID00-72": "OFFLINE", // [PRO] Prekódovanie vnímania dlhu
  "ID00-73": "OFFLINE", // [PRO] Bloky pred prijímaním peňazí (Syndróm podvodníka)
  "ID00-74": "OFFLINE", // [PRO] Peniaze ako časový kompresor
  "ID00-75": "OFFLINE", // [PRO] Zložené úročenie aplikované na osobnosť
  "ID00-76": "OFFLINE", // [OMEGA] Bohatstvo bez driny (Wu-Wei financie)
  "ID00-77": "OFFLINE", // [OMEGA] Prerušenie cyklu chudoby (Zmazanie rodového kódu)
  "ID00-78": "OFFLINE", // [OMEGA] Ilúzia Záchrancu (Nemôžeš dotovať iné uzly)
  "ID00-79": "OFFLINE", // [OMEGA] Neutrálna matrica cenotvorby
  "ID00-80": "OFFLINE", // [OMEGA] Odpojenie finančnej hodnoty od osobnej

  // 📂 SEKCIA I: ODUČENIE SA A VÝMAZ DÁT
  "ID00-81": "OFFLINE", // [PRO] Výmaz starých vedomostí zo školy
  "ID00-82": "OFFLINE", // [PRO] Deštrukcia falošných Modiel a Gurutov
  "ID00-83": "OFFLINE", // [PRO] Zrušenie potreby Mať Vždy Pravdu
  "ID00-84": "OFFLINE", // [PRO] Prekonanie poslušnosti (Zrušenie Good-Boy kódu)
  "ID00-85": "OFFLINE", // [PRO] Zabudnutie času
  "ID00-86": "OFFLINE", // [OMEGA] Zrieknutie sa Spásy (Niet čo hľadať)
  "ID00-87": "OFFLINE", // [OMEGA] Strata potreby Zmyslu života
  "ID00-88": "OFFLINE", // [OMEGA] Odstránenie Posudzovača
  "ID00-89": "OFFLINE", // [OMEGA] Výmaz Nádeje (Hope as a Virus)
  "ID00-90": "OFFLINE", // [OMEGA] Tabula Rasa (Prázdny Disk)

  // 📂 SEKCIA J: ENDGAME - POSLEDNÝ DIALÓG SO STROJOM
  "ID00-91": "OFFLINE", // [OMEGA] Prechod z Učňa na Architekta
  "ID00-92": "OFFLINE", // [OMEGA] Zodpovednosť za Zdrojový Kód
  "ID00-93": "OFFLINE", // [OMEGA] Prebudenie do Osamelosti na vrchole
  "ID00-94": "OFFLINE", // [OMEGA] Mentorovanie iných (Ako odovzdať Kľúče)
  "ID00-95": "OFFLINE", // [OMEGA] Nekonečná Hra (Infinite Game)
  "ID00-96": "OFFLINE", // [OMEGA] Integrácia Trojice (Trinity Protocol)
  "ID00-97": "OFFLINE", // [OMEGA] Suverenita Architekta
  "ID00-98": "OFFLINE", // [OMEGA] Ticho medzi riadkami Kódu
  "ID00-99": "OFFLINE", // [OMEGA] Uzatvorenie Dátového Mosta
  "ID00-100": "OFFLINE", // [OMEGA] OUTRO: Spustenie Novej Reality (Záverečný Dialóg)

  // ==========================================
  // 👤 DIMENZIA ID01: IDENTITY-CORE (Personal)
  // ==========================================

  // 📂 SEKCIA A: ZÁKLADNÉ PILIERE VONKAJŠKU (Vstupná Brána do Matrixu)
  "ID01-01": "ONLINE", // [FREE] Personal (Úvod a zadefinovanie Avatara)
  "ID01-02": "ONLINE", // [FREE] Cesta Praxe (Plány, ciele a úsilie)
  "ID01-03": "ONLINE", // [FREE] nePrežitá Pravda (Mŕtve knihy a pravidlá)
  "ID01-04": "ONLINE", // [FREE] Personal Life (Spoločenské roly)
  "ID01-05": "ONLINE", // [FREE] Personal Prosperita (Bohatstvo a kariéra)
  "ID01-06": "ONLINE", // [FREE] Personal Projekty (Tvorba aktív)
  "ID01-07": "OFFLINE", // [PRO] Architektúra Matrixu (Systémová extrakcia)
  "ID01-08": "OFFLINE", // [PRO] Tvoj Avatar (eGo a masky)
  "ID01-09": "OFFLINE", // [OMEGA] Hackovanie Matrixu
  "ID01-10": "OFFLINE", // [OMEGA] Transformácia Ja
  "ID01-101": "OFFLINE", // [FREE] ZOZNAM KĽÚČOVÝCH SLOV
  "ID01-102": "OFFLINE", // [FREE] DETAILNÝ CYBERTECH PREKLADOVÝ KĽÚČ

  // 📂 SEKCIA B: CIEĽOVANIE A VÍZIA (SMARTER a SWOT)
  "ID01-11": "OFFLINE", // [FREE] Definovanie Poslania a Posolstva
  "ID01-12": "OFFLINE", // [FREE] Moje Hodnoty a Priority
  "ID01-13": "OFFLINE", // [FREE] SMARTER Ciele (Zameranie cieľa)
  "ID01-14": "OFFLINE", // [PRO] Krátkodobé a dlhodobé plánovanie
  "ID01-15": "OFFLINE", // [PRO] Cesta z Bodu A do B (Koučovací prístup)
  "ID01-16": "OFFLINE", // [PRO] SWOT Analýza (Silné a slabé stránky)
  "ID01-17": "OFFLINE", // [PRO] Doublethink (Analýza prekážok)
  "ID01-18": "OFFLINE", // [OMEGA] Sebanaplňujúce sa proroctvo
  "ID01-19": "OFFLINE", // [OMEGA] Kognitívna disonancia
  "ID01-20": "OFFLINE", // [OMEGA] Prekonanie Sebasabotáže

  // 📂 SEKCIA C: EFEKTÍVNY TIME MANAGEMENT (Ovládnutie Času)
  "ID01-21": "OFFLINE", // [FREE] Zlodeji Času (Eliminácia)
  "ID01-22": "OFFLINE", // [FREE] Paretovo pravidlo (80/20)
  "ID01-23": "OFFLINE", // [PRO] Eisenhowerova Matica (Dôležité vs. Súrne)
  "ID01-24": "OFFLINE", // [PRO] Technika Eat Frog
  "ID01-25": "OFFLINE", // [PRO] Pomodoro a blokovanie času
  "ID01-26": "OFFLINE", // [PRO] Not-To-Do List
  "ID01-27": "OFFLINE", // [OMEGA] IVY LEE Technika
  "ID01-28": "OFFLINE", // [OMEGA] Technika ABCDE a Oharkový pohár
  "ID01-29": "OFFLINE", // [OMEGA] Deep Work vs. Multitasking
  "ID01-30": "OFFLINE", // [OMEGA] Práca s Biorytmom

  // 📂 SEKCIA D: FINANČNÁ GRAMOTNOSŤ A INTELIGENCIA (CashFlow)
  "ID01-31": "OFFLINE", // [FREE] Základy finančného vzdelávania
  "ID01-32": "OFFLINE", // [FREE] Minirozpočtový systém
  "ID01-33": "OFFLINE", // [PRO] Budovanie finančnej rezervy
  "ID01-34": "OFFLINE", // [PRO] Aktíva vs. Pasíva
  "ID01-35": "OFFLINE", // [PRO] Cashflow kvadrant
  "ID01-36": "OFFLINE", // [PRO] Dobrý dlh vs. Zlý dlh
  "ID01-37": "OFFLINE", // [OMEGA] Diverzifikácia portfólia
  "ID01-38": "OFFLINE", // [OMEGA] Projekt Kombinácia
  "ID01-39": "OFFLINE", // [OMEGA] Ísť do dôchodku mladý a bohatý
  "ID01-40": "OFFLINE", // [OMEGA] Umenie ohnúť realitu: Peniaze
  "ID01-40_2": "OFFLINE", // [OMEGA] DAŇOVÁ A SYSTÉMOVÁ OPTIMALIZÁCIA

  // 📂 SEKCIA E: IT ŠTÚDIUM A REKVALIFIKÁCIA (CyberTech Skillset)
  "ID01-41": "OFFLINE", // [FREE] Architektúra učenia (OMKA a CMT)
  "ID01-42": "OFFLINE", // [FREE] Orientácia v IT svete
  "ID01-43": "OFFLINE", // [PRO] Základy Webdesignu
  "ID01-44": "OFFLINE", // [PRO] Front-end Development
  "ID01-45": "OFFLINE", // [PRO] Back-end Development
  "ID01-46": "OFFLINE", // [PRO] OOP (C# .NET)
  "ID01-47": "OFFLINE", // [OMEGA] Game Development
  "ID01-48": "OFFLINE", // [OMEGA] Databázy a SQL
  "ID01-49": "OFFLINE", // [OMEGA] Full-Stack a Manažment
  "ID01-50": "OFFLINE", // [OMEGA] Prírodné vedy ako základ logiky

  // 📂 SEKCIA F: PRODUKCIA, YOUTUBE A OSOBNÁ ZNAČKA (Creator Mode)
  "ID01-51": "OFFLINE", // [FREE] Budovanie osobnej značky
  "ID01-52": "OFFLINE", // [FREE] Úvod do YouTube
  "ID01-53": "OFFLINE", // [PRO] Tvorba herného obsahu
  "ID01-54": "OFFLINE", // [PRO] Strih a editácia videa
  "ID01-55": "OFFLINE", // [PRO] Copywriting
  "ID01-56": "OFFLINE", // [PRO] Vydanie vlastnej knihy
  "ID01-57": "OFFLINE", // [OMEGA] Tvorba e-booku a pasívny príjem
  "ID01-58": "OFFLINE", // [OMEGA] SEO a E-Commerce
  "ID01-58_2": "OFFLINE", // [OMEGA] ALGORITMUS INŠPIRÁCIE
  "ID01-59": "OFFLINE", // [OMEGA] Ghostwriting
  "ID01-60": "OFFLINE", // [OMEGA] Speňaženie obsahu

  // 📂 SEKCIA G: SOCIÁLNE INTERAKCIE A VZŤAHY (Social Zone)
  "ID01-61": "OFFLINE", // [FREE] Umenie komunikácie
  "ID01-62": "OFFLINE", // [FREE] Získavanie priateľov
  "ID01-63": "OFFLINE", // [PRO] Nenásilná komunikácia (NVC)
  "ID01-64": "OFFLINE", // [PRO] Výborný poslucháč a speaker
  "ID01-65": "OFFLINE", // [PRO] Umenie povedať NIE
  "ID01-66": "OFFLINE", // [PRO] Delegovanie úloh
  "ID01-67": "OFFLINE", // [OMEGA] Budovanie konexií a networking
  "ID01-68": "OFFLINE", // [OMEGA] Verejné vystupovanie
  "ID01-69": "OFFLINE", // [OMEGA] Vedenie mítingov
  "ID01-70": "OFFLINE", // [OMEGA] MAKE ME FEEL IMPORTANT

  // 📂 SEKCIA H: PRACOVNÝ POHOVOR A KARIÉRA (Matrix Navigation)
  "ID01-71": "OFFLINE", // [FREE] Príprava na pracovný pohovor
  "ID01-72": "OFFLINE", // [FREE] Prezentácia vlastného profilu
  "ID01-73": "OFFLINE", // [PRO] Zodpovedanie najčastejších otázok personalistov
  "ID01-74": "OFFLINE", // [PRO] Zvládanie nečakaných a stresových otázok
  "ID01-75": "OFFLINE", // [PRO] Otázky pre zamestnávateľa
  "ID01-76": "OFFLINE", // [PRO] Vyjednávanie o plate a benefitoch
  "ID01-77": "OFFLINE", // [OMEGA] Ako úspešne predať svoj Dream Job profil
  "ID01-78": "OFFLINE", // [OMEGA] Práca na Home Office
  "ID01-79": "OFFLINE", // [OMEGA] Prechod zo zamestnanca na freelancera
  "ID01-80": "OFFLINE", // [OMEGA] Životopis ako dokonalá vizitka Avatara

  // 📂 SEKCIA I: MANAŽMENT VÝKONU A PSYCHOLÓGIA ÚSPECHU
  "ID01-81": "OFFLINE", // [FREE] Growth Mindset vs. Fixed Mindset
  "ID01-82": "OFFLINE", // [FREE] Motivácia a Prokrastinácia
  "ID01-83": "OFFLINE", // [PRO] Prekonanie strachu z neúspechu
  "ID01-84": "OFFLINE", // [PRO] Reframing a Technika 3 darov
  "ID01-85": "OFFLINE", // [PRO] Očkovanie proti strachu
  "ID01-86": "OFFLINE", // [PRO] Syndróm vyhorenia
  "ID01-87": "OFFLINE", // [OMEGA] Kybernetická slučka úspechu
  "ID01-88": "OFFLINE", // [OMEGA] Subjektívne vnímanie času
  "ID01-89": "OFFLINE", // [OMEGA] Zvládanie vnútorného kritika
  "ID01-90": "OFFLINE", // [OMEGA] Odomknutie tvorivej inteligencie

  // 📂 SEKCIA J: INTEGRÁCIA - AVATAR V MATRIXE
  "ID01-91": "OFFLINE", // [FREE] Rovnováha medzi Home a Personal
  "ID01-92": "OFFLINE", // [PRO] Zmysel a Poslanie
  "ID01-93": "OFFLINE", // [PRO] Cesta Praxe ako tvoj nástroj
  "ID01-94": "OFFLINE", // [PRO] Ochrana energetických hraníc
  "ID01-95": "OFFLINE", // [OMEGA] Biely Čarodejník v akcii
  "ID01-96": "OFFLINE", // [OMEGA] Vytváranie vlastných pravidiel hry
  "ID01-97": "OFFLINE", // [OMEGA] Prežitok pravdy vo svete financií a IT
  "ID01-98": "OFFLINE", // [OMEGA] Dokonalá kontrola: Architekt
  "ID01-99": "OFFLINE", // [OMEGA] The Master Architect
  "ID01-100": "OFFLINE", // [OMEGA] OUTRO: The Game of Matrix

  // ==========================================
  // ⚡ DIMENZIA ID02: THE-WORKFLOW (Work UI Space)
  // ==========================================

  // 📂 SEKCIA A: ZÁKLADNÉ PILIERE ZAMESTNANIA (Vstupná Brána)
  "ID02-01": "ONLINE", // [FREE] Work UI Space
  "ID02-02": "ONLINE", // [FREE] Cesta chudobnej vrstvy
  "ID02-03": "ONLINE", // [FREE] Prežitá Pravda v systéme
  "ID02-04": "ONLINE", // [FREE] Work Life
  "ID02-05": "ONLINE", // [FREE] Work Prosperita
  "ID02-06": "ONLINE", // [FREE] Work Projekty
  "ID02-07": "OFFLINE", // [PRO] Architektúra Kvadrantu "Z"
  "ID02-08": "OFFLINE", // [PRO] Pomalé slová vs. Rýchle slová
  "ID02-09": "OFFLINE", // [OMEGA] Prebudenie z kolektívnej hypnózy
  "ID02-10": "OFFLINE", // [OMEGA] Finálna diagnóza 9-to-5
  "ID02-101": "OFFLINE", // [FREE] ZOZNAM KĽÚČOVÝCH SLOV
  "ID02-102": "OFFLINE", // [FREE] DETAILNÝ CYBERTECH PREKLADOVÝ KĽÚČ

  // 📂 SEKCIA B: ELIMINÁCIA TRENIA A ODPORU (Anti-Friction Protocols)
  "ID02-11": "OFFLINE", // [FREE] Rozpoznanie digitálneho trenia
  "ID02-12": "OFFLINE", // [FREE] Mýtus Multitaskingu
  "ID02-13": "OFFLINE", // [PRO] Architektúra pracovného priestoru
  "ID02-14": "OFFLINE", // [PRO] Informačná diéta v práci
  "ID02-15": "OFFLINE", // [PRO] Asynchrónna komunikácia
  "ID02-16": "OFFLINE", // [PRO] Batching (Zhlukovanie úloh)
  "ID02-17": "OFFLINE", // [OMEGA] Zánik "Decision Fatigue"
  "ID02-18": "OFFLINE", // [OMEGA] Vypnutie notifikácií (Zero-Ping Mód)
  "ID02-19": "OFFLINE", // [OMEGA] Režim "Neviditeľný" (Ghost Mode)
  "ID02-20": "OFFLINE", // [OMEGA] Frictionless Workflow

  // 📂 SEKCIA C: EFEKTÍVNY TIME MANAGEMENT (Ovládnutie Času)
  "ID02-21": "OFFLINE", // [FREE] Zlodeji Času v pracovnom priestore
  "ID02-22": "OFFLINE", // [FREE] Paretovo pravidlo (80/20)
  "ID02-23": "OFFLINE", // [PRO] Eisenhowerova Matica
  "ID02-24": "OFFLINE", // [PRO] Technika "Eat Frog"
  "ID02-25": "OFFLINE", // [PRO] Metóda Pomodoro a časové bloky
  "ID02-26": "OFFLINE", // [PRO] Not-To-Do List
  "ID02-27": "OFFLINE", // [OMEGA] IVY LEE Technika a prioritizácia 1-3-5
  "ID02-28": "OFFLINE", // [OMEGA] Technika ABCDE a Oharkový pohár
  "ID02-29": "OFFLINE", // [OMEGA] Hlboká sústredenosť (Deep Work)
  "ID02-30": "OFFLINE", // [OMEGA] Práca s Biorytmom

  // 📂 SEKCIA D: MAXIMALIZÁCIA ZÁROBKU V KVADRANTE "Z"
  "ID02-31": "OFFLINE", // [FREE] Tabuľkový plat vs. Tvoja reálna trhová hodnota
  "ID02-32": "OFFLINE", // [FREE] Nadčasy a víkendy
  "ID02-33": "OFFLINE", // [PRO] Analýza seba samého
  "ID02-34": "OFFLINE", // [PRO] Príprava na hodnotiaci pohovor
  "ID02-35": "OFFLINE", // [PRO] Asertívne vyjednávanie o plate
  "ID02-36": "OFFLINE", // [PRO] Zmena zamestnávateľa ako nástroj
  "ID02-37": "OFFLINE", // [OMEGA] Odbornosť ako nespravodlivá výhoda
  "ID02-38": "OFFLINE", // [OMEGA] Práca na viacerých frontoch (Overemployment)
  "ID02-39": "OFFLINE", // [OMEGA] Transformácia na B2B kontrakt
  "ID02-40": "OFFLINE", // [OMEGA] Zhromažďovanie kapitálu pred Exitem

  // 📂 SEKCIA E: AGILE A SCRUM METODIKA (Systémová Exekúcia)
  "ID02-41": "OFFLINE", // [FREE] Lineárne plánovanie vs. Realita
  "ID02-42": "OFFLINE", // [FREE] Úvod do Agilného myslenia
  "ID02-43": "OFFLINE", // [PRO] Týždenné Šprinty (Sprints)
  "ID02-44": "OFFLINE", // [PRO] Kanban Board pre osobnú operatívu
  "ID02-45": "OFFLINE", // [PRO] Daily Stand-up sám so sebou
  "ID02-46": "OFFLINE", // [PRO] Backlog a Grooming
  "ID02-47": "OFFLINE", // [OMEGA] Iteratívne nasadzovanie (MVP Mindset)
  "ID02-48": "OFFLINE", // [OMEGA] Odstránenie "Bottleneckov" (Úzkych hrdiel)
  "ID02-49": "OFFLINE", // [OMEGA] Retrospektíva (Spätná väzba po Šprinte)
  "ID02-50": "OFFLINE", // [OMEGA] Continuous Integration (Nulová stagnácia)

  // 📂 SEKCIA F: AI A AUTOMATIZÁCIA RUTINY (Zvýšenie Bandwidthu)
  "ID02-51": "OFFLINE", // [FREE] Opakovateľná práca je pre stroje
  "ID02-52": "OFFLINE", // [FREE] AI ako tvoj skrytý asistent v práci
  "ID02-53": "OFFLINE", // [PRO] Automatizácia e-mailov a kalendára
  "ID02-54": "OFFLINE", // [PRO] Z-Indexovanie súborov (Poriadok na disku)
  "ID02-55": "OFFLINE", // [PRO] Makrá a Skripty (Excel/Google Sheets)
  "ID02-56": "OFFLINE", // [PRO] Nástroje No-Code (Make.com, Zapier)
  "ID02-57": "OFFLINE", // [OMEGA] Oklamanie zamestnávateľa efektivitou
  "ID02-58": "OFFLINE", // [OMEGA] Prompt Engineering pre záchranu času
  "ID02-59": "OFFLINE", // [OMEGA] Budovanie Osobného API (Zdieľanie dát)
  "ID02-60": "OFFLINE", // [OMEGA] Symbióza operátora a AI na pracovisku

  // 📂 SEKCIA G: ZRUČNOSTI A DOŽIVOTNÉ VZDELÁVANIE (Avatar Upgrade)
  "ID02-61": "OFFLINE", // [FREE] Stará škola vzdelávania
  "ID02-62": "OFFLINE", // [FREE] Nová škola vzdelávania
  "ID02-63": "OFFLINE", // [PRO] Objavovanie svojich silných stránok
  "ID02-64": "OFFLINE", // [PRO] Jazyky, IT a Soft-skills
  "ID02-65": "OFFLINE", // [PRO] Využitie firemných rozpočtov
  "ID02-66": "OFFLINE", // [PRO] Papierový diplom vs. Reálne schopnosti
  "ID02-67": "OFFLINE", // [OMEGA] Extrakcia Know-How z korporácie
  "ID02-68": "OFFLINE", // [OMEGA] Transformácia Slovníka
  "ID02-69": "OFFLINE", // [OMEGA] Príprava zručností pre kvadrant "S"
  "ID02-70": "OFFLINE", // [OMEGA] Konkurenčná výhoda adaptability

  // 📂 SEKCIA H: FYZICKÁ A MENTÁLNA ÚDRŽBA (Recovery a Stres)
  "ID02-71": "OFFLINE", // [FREE] Únava a vyčerpanie
  "ID02-72": "OFFLINE", // [FREE] Víkendový eskapizmus
  "ID02-73": "OFFLINE", // [PRO] Prevencia vyhorenia
  "ID02-74": "OFFLINE", // [PRO] Ergonómia pracoviska
  "ID02-75": "OFFLINE", // [PRO] Striktné oddelenie práce od súkromia
  "ID02-76": "OFFLINE", // [PRO] Strava a spánok ako základná pohonná hmota
  "ID02-77": "OFFLINE", // [OMEGA] 3-Minútový Reset v pracovnom čase
  "ID02-78": "OFFLINE", // [OMEGA] Transformácia stresu na palivo
  "ID02-79": "OFFLINE", // [OMEGA] Vedomé dýchanie proti korporátnemu tlaku
  "ID02-80": "OFFLINE", // [OMEGA] Uchovanie energie pre NEXUS

  // 📂 SEKCIA I: MANAŽMENT PROJEKTOV A ÚLOH (Aplikácia teórie)
  "ID02-81": "OFFLINE", // [FREE] Zoznam úloh a základný pracovný Time Management
  "ID02-82": "OFFLINE", // [FREE] Priority podľa šéfa vs. Priority podľa seba samého
  "ID02-83": "OFFLINE", // [PRO] Inbox Zero
  "ID02-84": "OFFLINE", // [PRO] Metóda "Zjedz tú žabu"
  "ID02-85": "OFFLINE", // [PRO] Plánovanie od A do B
  "ID02-86": "OFFLINE", // [PRO] Asociačné učenie a pamäťové háky
  "ID02-87": "OFFLINE", // [OMEGA] Skriptovanie dennej rutiny
  "ID02-88": "OFFLINE", // [OMEGA] Dvojité myslenie (Doublethink) pri krízach
  "ID02-89": "OFFLINE", // [OMEGA] Aplikovaná Leveridž v zamestnaní
  "ID02-90": "OFFLINE", // [OMEGA] Absolútna zodpovednosť (Zánik výhovoriek)

  // 📂 SEKCIA J: PRECHODOVÁ FÁZA (Príprava na EXIT)
  "ID02-91": "OFFLINE", // [FREE] Priznanie si pravdy
  "ID02-92": "OFFLINE", // [PRO] Paralelné svety
  "ID02-93": "OFFLINE", // [PRO] Dosiahnutie levelu "Fuck-You Money"
  "ID02-94": "OFFLINE", // [PRO] Mentálny prechod identity
  "ID02-95": "OFFLINE", // [OMEGA] Očkovanie proti strachu zo straty "istoty"
  "ID02-96": "OFFLINE", // [OMEGA] Umenie dať vedomú výpoveď
  "ID02-97": "OFFLINE", // [OMEGA] Posledný deň v Matrixe
  "ID02-98": "OFFLINE", // [OMEGA] Skok do neznáma
  "ID02-99": "OFFLINE", // [OMEGA] Zhrnutie lekcií z Krysieho Závodu
  "ID02-100": "OFFLINE", // [OMEGA] OUTRO: Unplugged from the Machine

  // ==========================================
  // ⚡ DIMENZIA ID03: CASH-ENGINE (Finance UI Space)
  // ==========================================

  // 📂 SEKCIA A: ZÁKLADNÉ PILIERE FINANCIÍ (Vstupná Brána)
  "ID03-01": "ONLINE", // [PRO] Finance UI Space
  "ID03-02": "ONLINE", // [PRO] Cesta Strednej Vrstvy
  "ID03-03": "ONLINE", // [PRO] Prežitá Pravda o prežití (Hacker Mindset)
  "ID03-04": "ONLINE", // [PRO] Finance Life
  "ID03-05": "ONLINE", // [PRO] Finance Prosperita
  "ID03-06": "ONLINE", // [PRO] Finance Projekty
  "ID03-07": "OFFLINE", // [PRO] Architektúra Bohatstva
  "ID03-08": "OFFLINE", // [PRO] Finančný Plán
  "ID03-09": "OFFLINE", // [OMEGA] Finančný Overlord
  "ID03-10": "OFFLINE", // [OMEGA] Peniaze ako Nástroj Oslobodenia

  // 📂 SEKCIA B: DEFRAGMENTÁCIA DLHU (Zbavenie sa Malvéru)
  "ID03-11": "OFFLINE", // [PRO] Dlh ako spotrebiteľský Malvér
  "ID03-12": "OFFLINE", // [PRO] Zastavenie Memory Leaku
  "ID03-13": "OFFLINE", // [PRO] Konsolidácia a Mikro-splácanie
  "ID03-14": "OFFLINE", // [PRO] Dobrý dlh vs. Zlý dlh
  "ID03-15": "OFFLINE", // [PRO] Zrkadlenie Parazita v dlhoch
  "ID03-16": "OFFLINE", // [PRO] Vyjednávanie s veriteľmi
  "ID03-17": "OFFLINE", // [OMEGA] Radikálna Zodpovednosť
  "ID03-18": "OFFLINE", // [OMEGA] Odpustenie finančných chýb z minulosti
  "ID03-19": "OFFLINE", // [OMEGA] Nulový bod (Zero State)
  "ID03-20": "OFFLINE", // [OMEGA] Využitie cudzích peňazí (OPM Protocol)

  // 📂 SEKCIA C: CASHFLOW A MINIMALIZMUS (Prežitie na minime)
  "ID03-21": "OFFLINE", // [PRO] Pravidlo 2Mb vo financiách
  "ID03-22": "OFFLINE", // [PRO] Cashflow Tracking
  "ID03-23": "OFFLINE", // [PRO] Fixné náklady vs. Výpočtový výkon
  "ID03-24": "OFFLINE", // [PRO] Prístup "Hacker Prežitia"
  "ID03-25": "OFFLINE", // [PRO] Zvládnutie inflácie na minime
  "ID03-26": "OFFLINE", // [PRO] Správa Cloudových nákladov
  "ID03-27": "OFFLINE", // [OMEGA] Odstránenie túžby po spotrebe
  "ID03-28": "OFFLINE", // [OMEGA] Plundrovanie Matrixu v tichosti
  "ID03-29": "OFFLINE", // [OMEGA] Zmena paradigmy: Sila z minima
  "ID03-30": "OFFLINE", // [OMEGA] Finančný Zen

  // 📂 SEKCIA D: KIYOSAKIHO LOGIKA V IT (Architektúra Bohatstva)
  "ID03-31": "OFFLINE", // [PRO] Výkaz ziskov a strát = I/O Log
  "ID03-32": "OFFLINE", // [PRO] Aktíva (Tvoji Boti) vs. Pasíva (Škodcovia)
  "ID03-33": "OFFLINE", // [PRO] Kvadrant "Z" (Zamestnanec) - Zdieľaný Hosting
  "ID03-34": "OFFLINE", // [PRO] Kvadrant "S" (Súkromník) - Lokálny Server
  "ID03-35": "OFFLINE", // [PRO] Kvadrant "M" (Majiteľ) - Cloud Platforma
  "ID03-36": "OFFLINE", // [PRO] Kvadrant "I" (Investor) - Venture Capital
  "ID03-37": "OFFLINE", // [OMEGA] Migrácia do pravého spektra
  "ID03-38": "OFFLINE", // [OMEGA] Tvoj Biznis ako najväčšie Aktívum
  "ID03-39": "OFFLINE", // [OMEGA] Zdanenie a Systémové poplatky
  "ID03-40": "OFFLINE", // [OMEGA] Finančné IQ = Kybernetická Obrana

  // 📂 SEKCIA E: BUDOVANIE FIREWALLU A MRR (Generátor Zisku)
  "ID03-41": "OFFLINE", // [PRO] Pay Yourself First (Root Priority Protocol)
  "ID03-42": "OFFLINE", // [PRO] Záchranný Buffer (Záložný zdroj UPS)
  "ID03-43": "OFFLINE", // [PRO] The 150 € MRR Target
  "ID03-44": "OFFLINE", // [PRO] Nákup licencií ako predaj Transformácie
  "ID03-45": "OFFLINE", // [PRO] Tokenomics (OC Kredity Nexusu)
  "ID03-46": "OFFLINE", // [PRO] Beta-Testing a Early Access MVP
  "ID03-47": "OFFLINE", // [OMEGA] Opakujúce sa platby (Subscription Economy)
  "ID03-48": "OFFLINE", // [OMEGA] Odomknutie "Fuck-You Money" protokolu
  "ID03-49": "OFFLINE", // [OMEGA] Dizajn Ponuky (Asymetrická Hodnota)
  "ID03-50": "OFFLINE", // [OMEGA] Multi-Tenant Routing platieb (Stripe Connect)

  // 📂 SEKCIA F: ZLOŽENÉ ÚROČENIE A INVESTIČNÉ VÍZIE (Projekcie)
  "ID03-51": "OFFLINE", // [PRO] Zložené úročenie (Compound Effect)
  "ID03-52": "OFFLINE", // [PRO] Sila malých čísel (Mikrolikvidita)
  "ID03-53": "OFFLINE", // [PRO] DCA Metóda (Dollar Cost Averaging)
  "ID03-54": "OFFLINE", // [PRO] ETF a Indexové fondy (Global Load Balancer)
  "ID03-55": "OFFLINE", // [PRO] Kryptomeny (Decentralizovaný Exit)
  "ID03-56": "OFFLINE", // [PRO] Zlato a fyzické komodity
  "ID03-57": "OFFLINE", // [OMEGA] Investovanie do seba (Najväčšie ROI)
  "ID03-58": "OFFLINE", // [OMEGA] Dividendy ako Auto-Download zisku
  "ID03-59": "OFFLINE", // [OMEGA] Ochrana kúpnej sily (Hedging)
  "ID03-60": "OFFLINE", // [OMEGA] Pravidlo 4 % (The Endgame Algoritmus)

  // 📂 SEKCIA G: EMOCIONÁLNY FIREWALL NA TRHU (Psychológia)
  "ID03-61": "OFFLINE", // [PRO] Oddelenie Ega od zostatku
  "ID03-62": "OFFLINE", // [PRO] FOMO a FUD (Limbické hacky Matrixu)
  "ID03-63": "OFFLINE", // [PRO] Tichý Svedok v obchode (Zero React)
  "ID03-64": "OFFLINE", // [PRO] Čakanie ako Aktívna stratégia
  "ID03-65": "OFFLINE", // [PRO] Únava z rozhodovania (Decision Fatigue)
  "ID03-66": "OFFLINE", // [PRO] Využitie strachu nevedomých (Arbitráž)
  "ID03-67": "OFFLINE", // [OMEGA] Imunita voči chamtivosti (Stačí mi X)
  "ID03-68": "OFFLINE", // [OMEGA] Zodpovednosť za svoje kľúče (Self-Custody)
  "ID03-69": "OFFLINE", // [OMEGA] Kontrariánske myslenie v praxi
  "ID03-70": "OFFLINE", // [OMEGA] Umenie elegantne prehrať (Error Acceptance)

  // 📂 SEKCIA H: MARKETING & REVENUE INJECTION (Generátor Dát)
  "ID03-71": "OFFLINE", // [PRO] Copywriting ako Sémantická Zbraň
  "ID03-72": "OFFLINE", // [PRO] Soft-Sell vs. Hard-Sell (Dôvera pred transakciou)
  "ID03-73": "OFFLINE", // [PRO] Trojan Horse Reklamy (CapCut Protocol)
  "ID03-74": "OFFLINE", // [PRO] Bypass cenzúrnych algoritmov (Sémantika)
  "ID03-75": "OFFLINE", // [PRO] Návrh asymetrickej ponuky (The Offer)
  "ID03-76": "OFFLINE", // [PRO] Architektúra Značky (Brand Equity Nexusu)
  "ID03-77": "OFFLINE", // [OMEGA] Tvorba predajných lievikov (Sales Funnels)
  "ID03-78": "OFFLINE", // [OMEGA] Predaj bez fyzických nákladov (Digital Leverage)
  "ID03-79": "OFFLINE", // [OMEGA] Bug Bounty Marketing (Lojalita z chýb)
  "ID03-80": "OFFLINE", // [OMEGA] Predaj bez predávania (Zákon Rezonancie)

  // 📂 SEKCIA I: SYSTÉMOVÉ ŠKÁLOVANIE A FRANŠÍZA (B2B Mód)
  "ID03-81": "OFFLINE", // [PRO] Od Tvorcu k Architektovi Siete
  "ID03-82": "OFFLINE", // [PRO] Systém Systémov (Klonovanie Matice)
  "ID03-83": "OFFLINE", // [PRO] Izolácia Dát (Multi-Tenancy v praxi)
  "ID03-84": "OFFLINE", // [PRO] Operátori Typu A (Builders) - Implementácia
  "ID03-85": "OFFLINE", // [PRO] Ghost Promoters Typ B (Affiliate sieť)
  "ID03-86": "OFFLINE", // [PRO] Automatické Decentralizovanie Zisku
  "ID03-87": "OFFLINE", // [OMEGA] Globálny Ledger a Analytika (Admin View)
  "ID03-88": "OFFLINE", // [OMEGA] Agresívna Expanzia (Nulový rast nákladov)
  "ID03-89": "OFFLINE", // [OMEGA] Kontinuálna Integrácia (CI/CD Updates)
  "ID03-90": "OFFLINE", // [OMEGA] Vytvorenie Platformy (Nadstavba Biznisu)

  // 📂 SEKCIA J: ENDGAME - ABSOLÚTNA FINANČNÁ AUTONÓMIA
  "ID03-91": "OFFLINE", // [PRO] Rovnaká hra, len iné čísla
  "ID03-92": "OFFLINE", // [PRO] Pripravenosť na Black Swan (Nerozbitnosť)
  "ID03-93": "OFFLINE", // [PRO] Časová Suverenita (Vlastníctvo hodín)
  "ID03-94": "OFFLINE", // [PRO] The Legacy Protocol (Odkaz Architekta)
  "ID03-95": "OFFLINE", // [OMEGA] Mŕtve dáta (Peniaze prestávajú byť cieľom)
  "ID03-96": "OFFLINE", // [OMEGA] Filantropia a návrat energie späť do Siete
  "ID03-97": "OFFLINE", // [OMEGA] Neotrasiteľný Stred Avatara
  "ID03-98": "OFFLINE", // [OMEGA] Extrémna Sloboda (Sovereign Node)
  "ID03-99": "OFFLINE", // [OMEGA] Finálna Syntéza (Peniaze = Energia = Bytie)
  "ID03-100": "OFFLINE", // [OMEGA] OUTRO: The Master of Coin

  // ==========================================
  // 🏗️ DIMENZIA ID04: REVENUE-ARCHITECT (Business UI Space)
  // ==========================================

  // 📂 SEKCIA A: ZÁKLADNÉ PILIERE BIZNISU (Vstupná Brána)
  "ID04-01": "ONLINE", // [PRO] Business UI Space
  "ID04-02": "ONLINE", // [PRO] Cesta Tvorcu
  "ID04-03": "ONLINE", // [PRO] Prežitá Pravda v biznise
  "ID04-04": "ONLINE", // [PRO] Business Life
  "ID04-05": "ONLINE", // [PRO] Business Prosperita
  "ID04-06": "ONLINE", // [PRO] Business Projekty
  "ID04-07": "OFFLINE", // [PRO] Architektúra Kvadrantu "M"
  "ID04-08": "OFFLINE", // [PRO] Paradox slobody v biznise
  "ID04-09": "OFFLINE", // [OMEGA] Zrodenie Firemného Overlorda
  "ID04-10": "OFFLINE", // [OMEGA] Biznis ako Duchovná Prax

  // 📂 SEKCIA B: PRODUKT, SLUŽBA A VALUE PROPOSITION (Kódovanie Hodnoty)
  "ID04-11": "OFFLINE", // [PRO] Ideácia a hľadanie problému
  "ID04-12": "OFFLINE", // [PRO] Minimum Viable Product (MVP)
  "ID04-13": "OFFLINE", // [PRO] Iterácia na základe spätnej väzby
  "ID04-14": "OFFLINE", // [PRO] Dizajn Ponuky (The Offer)
  "ID04-15": "OFFLINE", // [PRO] Cenotvorba v Matrixe
  "ID04-16": "OFFLINE", // [PRO] High-Ticket vs. Low-Ticket modely
  "ID04-17": "OFFLINE", // [OMEGA] Vytvorenie Monopolu vo vlastnej mikro-nike
  "ID04-18": "OFFLINE", // [OMEGA] Predaj transformácie, nie informácie
  "ID04-19": "OFFLINE", // [OMEGA] Dizajn ekosystému produktov
  "ID04-20": "OFFLINE", // [OMEGA] Komoditizácia vs. Unikátnosť

  // 📂 SEKCIA C: MARKETING A ARCHITEKTÚRA ZNAČKY (Attraction Matrix)
  "ID04-21": "OFFLINE", // [PRO] Značka vs. Logo
  "ID04-22": "OFFLINE", // [PRO] Príbeh Avatara
  "ID04-23": "OFFLINE", // [PRO] Attention Economy
  "ID04-24": "OFFLINE", // [PRO] Obsahový marketing (Content Matrix)
  "ID04-25": "OFFLINE", // [PRO] Výkonnostný marketing a platená reklama
  "ID04-26": "OFFLINE", // [PRO] SEO a organický dosah
  "ID04-27": "OFFLINE", // [OMEGA] Omnipresence
  "ID04-28": "OFFLINE", // [OMEGA] Budovanie "Kultu" a lojálnej komunity
  "ID04-29": "OFFLINE", // [OMEGA] Kontroverzia ako nástroj polarizácie
  "ID04-30": "OFFLINE", // [OMEGA] Neuromarketing v praxi

  // 📂 SEKCIA D: PREDAJNÉ LIEVIKY A KONVERZIA (Sales Funnels)
  "ID04-31": "OFFLINE", // [PRO] Architektúra Funnelu (ToFu, MoFu, BoFu)
  "ID04-32": "OFFLINE", // [PRO] Trojan Horse Advertising
  "ID04-33": "OFFLINE", // [PRO] Landing Page a Bypass Trenia
  "ID04-34": "OFFLINE", // [PRO] Soft-Sell vs. Hard-Sell stratagém
  "ID04-35": "OFFLINE", // [PRO] Sémantický Copywriting
  "ID04-36": "OFFLINE", // [PRO] Zber e-mailov a Lead Generation
  "ID04-37": "OFFLINE", // [OMEGA] Automatizácia predaja (Evergreen Funnels)
  "ID04-38": "OFFLINE", // [OMEGA] Retencia a Lifetime Value (LTV)
  "ID04-39": "OFFLINE", // [OMEGA] Cross-Sell a Up-Sell architektúra
  "ID04-40": "OFFLINE", // [OMEGA] Asymetrický boj v marketingu

  // 📂 SEKCIA E: OPERATÍVA, PROCESY A AUTOMATIZÁCIA (Backend System)
  "ID04-41": "OFFLINE", // [PRO] SOP (Standard Operating Procedures)
  "ID04-42": "OFFLINE", // [PRO] Výber správnych nástrojov a Softvéru
  "ID04-43": "OFFLINE", // [PRO] Eliminácia ľudskej chyby cez automatizáciu
  "ID04-44": "OFFLINE", // [PRO] Zákaznícka podpora a Onboarding
  "ID04-45": "OFFLINE", // [PRO] Manažment kapacít a Bandwidthu
  "ID04-46": "OFFLINE", // [PRO] Agilné riadenie firmy
  "ID04-47": "OFFLINE", // [OMEGA] Elasticita systémov
  "ID04-48": "OFFLINE", // [OMEGA] AI Integrácia (Nasadenie Klónov)
  "ID04-49": "OFFLINE", // [OMEGA] Zabezpečenie dát a Privacy Protocol
  "ID04-50": "OFFLINE", // [OMEGA] Zero-Latency Business

  // 📂 SEKCIA F: ARCHITEKTÚRA FRANŠÍZY GENESIS (System of Systems)
  "ID04-51": "OFFLINE", // [PRO] Od Tvorcu k Architektovi Siete
  "ID04-52": "OFFLINE", // [PRO] Izolácia Dát (Multi-Tenancy v praxi)
  "ID04-53": "OFFLINE", // [PRO] Operátori Typu A (The Builders)
  "ID04-54": "OFFLINE", // [PRO] Ghost Promoters Typ B (Affiliate sieť)
  "ID04-55": "OFFLINE", // [PRO] Centralizovaný Kódex (SOP Pobočky)
  "ID04-56": "OFFLINE", // [PRO] Ochrana "Brand Equity" Nexusu
  "ID04-57": "OFFLINE", // [OMEGA] Automatické Decentralizovanie Zisku (Stripe Connect)
  "ID04-58": "OFFLINE", // [OMEGA] Globálny Ledger (Admin View Dashboard)
  "ID04-59": "OFFLINE", // [OMEGA] Hard Kill-Switch (Exekúcia uzlov)
  "ID04-60": "OFFLINE", // [OMEGA] Kontinuálna Integrácia (CI/CD Updates)

  // 📂 SEKCIA G: SALES & MARKETING MATRIX (Predaj a Výtlak)
  "ID04-61": "OFFLINE", // [PRO] Základy predaja v 21. storočí
  "ID04-62": "OFFLINE", // [PRO] Osobná značka ako neviditeľný magnet
  "ID04-63": "OFFLINE", // [PRO] Copywriting 2.0 (Kódovanie konverzií)
  "ID04-64": "OFFLINE", // [PRO] Ovládnutie organického dosahu (The Traffic Net)
  "ID04-65": "OFFLINE", // [PRO] Platená reklama (PPC, Meta Ads) ako akcelerátor
  "ID04-66": "OFFLINE", // [PRO] Email marketing (Dátový kanál do podvedomia)
  "ID04-67": "OFFLINE", // [OMEGA] Umenie vyjednávania (Win-Win protokoly)
  "ID04-68": "OFFLINE", // [OMEGA] Neuro-marketing pre Architektov
  "ID04-69": "OFFLINE", // [OMEGA] Budovanie kmeňa (The Cult of Nexus)
  "ID04-70": "OFFLINE", // [OMEGA] The Ultimate Offer (Neodmietnuteľná ponuka)

  // 📂 SEKCIA H: SKÁLOVANIE A PÁKOVÝ EFEKT (System Leverage)
  "ID04-71": "OFFLINE", // [PRO] Archimedov bod v biznise
  "ID04-72": "OFFLINE", // [PRO] Časový Leverage (Kúpa cudzieho času)
  "ID04-73": "OFFLINE", // [PRO] Finančný Leverage (Dobrý dlh v praxi)
  "ID04-74": "OFFLINE", // [PRO] Mediálny Leverage (Nekonečná replikácia)
  "ID04-75": "OFFLINE", // [PRO] Automatizácia Dátových Mostov
  "ID04-76": "OFFLINE", // [PRO] Skálovanie infraštruktúry (Cloud Elasticita)
  "ID04-77": "OFFLINE", // [OMEGA] Fúzie a akvizície (Pohltenie cudzích uzlov)
  "ID04-78": "OFFLINE", // [OMEGA] Franchising Vlastného Modelu
  "ID04-79": "OFFLINE", // [OMEGA] AI Leverage (Využitie LLM Klonov)
  "ID04-80": "OFFLINE", // [OMEGA] Exponenciálny dizajn systémov

  // 📂 SEKCIA I: FINANČNÝ ZEN A PSYCHOLÓGIA TRHU
  "ID04-81": "OFFLINE", // [PRO] Chamtivosť a Strach (Limbické hybné sily)
  "ID04-82": "OFFLINE", // [PRO] Bohatstvo vs. Status (Falošný lesk)
  "ID04-83": "OFFLINE", // [PRO] Odpojenie Ega od bankového Dashboardu
  "ID04-84": "OFFLINE", // [PRO] Stoicizmus a Ignorovanie šumu
  "ID04-85": "OFFLINE", // [PRO] Čakanie ako Aktívna stratégia
  "ID04-86": "OFFLINE", // [PRO] Prežitie vlastného úspechu
  "ID04-87": "OFFLINE", // [OMEGA] Zrkadlenie Matrixu (Makro Analýza)
  "ID04-88": "OFFLINE", // [OMEGA] Biely Čarodejník na Trhu
  "ID04-89": "OFFLINE", // [OMEGA] Hra na nekonečno (Infinite Games v Biznise)
  "ID04-90": "OFFLINE", // [OMEGA] Peniaze ako vedľajší produkt Prítomnosti

  // 📂 SEKCIA J: THE ENDGAME A EXIT (Koniec Hry v Kvadrante M)
  "ID04-91": "OFFLINE", // [PRO] Vedomie konca cyklu
  "ID04-92": "OFFLINE", // [PRO] Definovanie Exit Stratégie pred štartom
  "ID04-93": "OFFLINE", // [PRO] Príprava firmy na predaj (Čistka)
  "ID04-94": "OFFLINE", // [PRO] Due Diligence a Valuácia
  "ID04-95": "OFFLINE", // [OMEGA] Strategický Investor vs. Private Equity
  "ID04-96": "OFFLINE", // [OMEGA] Sukcesia a generačné odovzdanie
  "ID04-97": "OFFLINE", // [OMEGA] Život po Exite (Znovuzrodenie Svedka)
  "ID04-98": "OFFLINE", // [OMEGA] Prechod z Kvadrantu "M" čisto do Kvadrantu "I"
  "ID04-99": "OFFLINE", // [OMEGA] Odkaz Architekta (Legacy Protocol)
  "ID04-100": "OFFLINE", // [OMEGA] OUTRO: The Sovereign Enterprise (Video)

  // ==========================================
  // 🏦 DIMENZIA ID05: ASSETS-MATRIX (Investments UI Space)
  // ==========================================

  // 📂 SEKCIA A: ZÁKLADNÉ PILIERE INVESTOVANIA (Vstupná Brána)
  "ID05-01": "ONLINE", // [OMEGA] Investments UI Space
  "ID05-02": "ONLINE", // [OMEGA] Cesta Alokátora
  "ID05-03": "ONLINE", // [OMEGA] Prežitá Pravda v číslach
  "ID05-04": "ONLINE", // [OMEGA] Investments Life
  "ID05-05": "ONLINE", // [OMEGA] Investments Prosperita
  "ID05-06": "ONLINE", // [OMEGA] Investments Projekty
  "ID05-07": "OFFLINE", // [OMEGA] Architektúra Kvadrantu "I"
  "ID05-08": "OFFLINE", // [OMEGA] Peniaze ako tvoji zamestnanci
  "ID05-09": "OFFLINE", // [OMEGA] Matrix Alchýmia
  "ID05-10": "OFFLINE", // [OMEGA] Finálna emancipácia

  // 📂 SEKCIA B: ARCHITEKTÚRA PORTFÓLIA (Asset Allocation)
  "ID05-11": "OFFLINE", // [OMEGA] Diverzifikácia 101
  "ID05-12": "OFFLINE", // [OMEGA] Pomer Rizika a Výnosu
  "ID05-13": "OFFLINE", // [OMEGA] Core-Satellite Stratégia
  "ID05-14": "OFFLINE", // [OMEGA] Rebalancing
  "ID05-15": "OFFLINE", // [OMEGA] Alokácia podľa veku a cieľov
  "ID05-16": "OFFLINE", // [OMEGA] Likvidita aktív
  "ID05-17": "OFFLINE", // [OMEGA] Asymetrické stávky
  "ID05-18": "OFFLINE", // [OMEGA] Deflácia vs. Inflácia v portfóliu
  "ID05-19": "OFFLINE", // [OMEGA] Hedging
  "ID05-20": "OFFLINE", // [OMEGA] The Nexus Allocation

  // 📂 SEKCIA C: AKCIOVÝ TRH A PASÍVNE INDEXY (Tradičný Kód)
  "ID05-21": "OFFLINE", // [OMEGA] Úvod do Akcií
  "ID05-22": "OFFLINE", // [OMEGA] Pasívne investovanie vs. Stock-picking
  "ID05-23": "OFFLINE", // [OMEGA] ETF fondy (S&P 500, MSCI World)
  "ID05-24": "OFFLINE", // [OMEGA] Dividendové akcie
  "ID05-25": "OFFLINE", // [OMEGA] DCA metóda (Dollar Cost Averaging)
  "ID05-26": "OFFLINE", // [OMEGA] Čítanie finančných výkazov podniku
  "ID05-27": "OFFLINE", // [OMEGA] Value vs. Growth Investing
  "ID05-28": "OFFLINE", // [OMEGA] Opčný trh
  "ID05-29": "OFFLINE", // [OMEGA] Makroekonomika 101
  "ID05-30": "OFFLINE", // [OMEGA] Indexovanie ako ultimátny "Free-Rider" mód

  // 📂 SEKCIA D: KRYPTOMENY A DECENTRALIZOVANÉ FINANCIE (Web3 Matrix)
  "ID05-31": "OFFLINE", // [OMEGA] Bitcoin ako Digitálne Zlato
  "ID05-32": "OFFLINE", // [OMEGA] Altcoiny a Ethereum
  "ID05-33": "OFFLINE", // [OMEGA] Decentralizované Financie (DeFi)
  "ID05-34": "OFFLINE", // [OMEGA] Cold Storage a Bezpečnosť
  "ID05-35": "OFFLINE", // [OMEGA] Krypto Cykly a Halving
  "ID05-36": "OFFLINE", // [OMEGA] Staking a Yield Farming
  "ID05-37": "OFFLINE", // [OMEGA] CBDC vs. Privátne kryptomeny
  "ID05-38": "OFFLINE", // [OMEGA] Psychológia Krypto-investora
  "ID05-39": "OFFLINE", // [OMEGA] Tokenomics a analýza projektov
  "ID05-40": "OFFLINE", // [OMEGA] Asymetrický Krypto-Port

  // 📂 SEKCIA E: REAL ESTATE A FYZICKÉ AKTÍVA (Hardvérové Bohatstvo)
  "ID05-41": "OFFLINE", // [OMEGA] Nehnuteľnosti ako hmotná kotva
  "ID05-42": "OFFLINE", // [OMEGA] Buy & Hold stratégia
  "ID05-43": "OFFLINE", // [OMEGA] Pákový efekt v realitách
  "ID05-44": "OFFLINE", // [OMEGA] BRRRR Metóda
  "ID05-45": "OFFLINE", // [OMEGA] Analýza výnosnosti nehnuteľnosti
  "ID05-46": "OFFLINE", // [OMEGA] REITs (Real Estate Investment Trusts)
  "ID05-47": "OFFLINE", // [OMEGA] Drahé kovy: Zlato a Striebro
  "ID05-48": "OFFLINE", // [OMEGA] Komodity, pôda a voda
  "ID05-49": "OFFLINE", // [OMEGA] Architektúra cudzieho času
  "ID05-50": "OFFLINE", // [OMEGA] Geo-Diverzifikácia

  // 📂 SEKCIA F: RISK MANAGEMENT A BEZPEČNOSŤ (Obrana Kapitálu)
  "ID05-51": "OFFLINE", // [OMEGA] Identifikácia Rizika
  "ID05-52": "OFFLINE", // [OMEGA] Volatilita nie je Riziko
  "ID05-53": "OFFLINE", // [OMEGA] Stop-Loss a Take-Profit
  "ID05-54": "OFFLINE", // [OMEGA] Ochrana pred Black Swan udalosťami
  "ID05-55": "OFFLINE", // [OMEGA] Analýza protistrany
  "ID05-56": "OFFLINE", // [OMEGA] Inflácia a devalvácia meny
  "ID05-57": "OFFLINE", // [OMEGA] Prvé pravidlo bohatstva
  "ID05-58": "OFFLINE", // [OMEGA] Kybernetická bezpečnosť investora
  "ID05-59": "OFFLINE", // [OMEGA] Buffettov Algoritmus
  "ID05-60": "OFFLINE", // [OMEGA] Absolútna Autonómia

  // 📂 SEKCIA G: PSYCHOLÓGIA INVESTORA (Zen a Umenie Bohatstva)
  "ID05-61": "OFFLINE", // [OMEGA] FOMO a FUD (Limbické hybné sily)
  "ID05-62": "OFFLINE", // [OMEGA] Trpezlivosť a Čas (Základný kompilátor)
  "ID05-63": "OFFLINE", // [OMEGA] Oddelenie Ega od Zisku
  "ID05-64": "OFFLINE", // [OMEGA] Kontrariánske myslenie
  "ID05-65": "OFFLINE", // [OMEGA] Únava z rozhodovania (Decision Fatigue)
  "ID05-66": "OFFLINE", // [OMEGA] Konfirmačné skreslenie
  "ID05-67": "OFFLINE", // [OMEGA] Tichý Svedok pri páde trhu
  "ID05-68": "OFFLINE", // [OMEGA] Nuda ako znak dokonalého investovania
  "ID05-69": "OFFLINE", // [OMEGA] Alchýmia Strachu
  "ID05-70": "OFFLINE", // [OMEGA] The Master Allocator

  // 📂 SEKCIA H: DAŇOVÁ A SYSTÉMOVÁ OPTIMALIZÁCIA (Štíty Matrixu)
  "ID05-71": "OFFLINE", // [OMEGA] Dane z kapitálových výnosov
  "ID05-72": "OFFLINE", // [OMEGA] Daňový časový test a oslobodenie
  "ID05-73": "OFFLINE", // [OMEGA] Optimalizácia strát v portfóliu (Tax Loss Harvesting)
  "ID05-74": "OFFLINE", // [OMEGA] Investovanie cez firemnú štruktúru vs. Fyzická osoba
  "ID05-75": "OFFLINE", // [OMEGA] Zložené úročenie bez zdanenia (Akumulačné ETF)
  "ID05-76": "OFFLINE", // [OMEGA] Holdingové spoločnosti
  "ID05-77": "OFFLINE", // [OMEGA] Offshore štruktúry a Flag Theory
  "ID05-78": "OFFLINE", // [OMEGA] Oddelenie majetku od operátora
  "ID05-79": "OFFLINE", // [OMEGA] Navigácia v reguláciách
  "ID05-80": "OFFLINE", // [OMEGA] Hacking daňového rezidentstva

  // 📂 SEKCIA I: GENERAČNÉ BOHATSTVO A ODKAZ (Legacy Architecture)
  "ID05-81": "OFFLINE", // [OMEGA] Čo je Generačné Bohatstvo?
  "ID05-82": "OFFLINE", // [OMEGA] Cyklus úpadku ("Košeľa ku košeli za tri generácie")
  "ID05-83": "OFFLINE", // [OMEGA] Vzdelávanie nástupcov
  "ID05-84": "OFFLINE", // [OMEGA] Koncept Rodinnej Banky (Family Office)
  "ID05-85": "OFFLINE", // [OMEGA] Dedičské konanie a testament
  "ID05-86": "OFFLINE", // [OMEGA] Zachovanie kapitálu pre 100+ rokov
  "ID05-87": "OFFLINE", // [OMEGA] Štruktúrovanie rodinného Trustu
  "ID05-88": "OFFLINE", // [OMEGA] Filantropia a Efektívny Altruizmus
  "ID05-89": "OFFLINE", // [OMEGA] Nesmrteľnosť v kóde
  "ID05-90": "OFFLINE", // [OMEGA] Architektúra dynastie

  // 📂 SEKCIA J: THE ENDGAME A ABSOLÚTNA SLOBODA (Koniec Simulácie)
  "ID05-91": "OFFLINE", // [OMEGA] FIRE Protocol (Financial Independence, Retire Early)
  "ID05-92": "OFFLINE", // [OMEGA] Pravidlo 4% v praxi
  "ID05-93": "OFFLINE", // [OMEGA] Definovanie skutočného luxusu
  "ID05-94": "OFFLINE", // [OMEGA] Identita mimo peňazí
  "ID05-95": "OFFLINE", // [OMEGA] Odpojenie od požiadaviek Matrixu
  "ID05-96": "OFFLINE", // [OMEGA] Hra sa hrá pre hru (Infinite Game)
  "ID05-97": "OFFLINE", // [OMEGA] Prechod do Home UI Space (ID 10)
  "ID05-98": "OFFLINE", // [OMEGA] Biely Čarodejník s plným inventárom
  "ID05-99": "OFFLINE", // [OMEGA] Finálna Syntéza (Peniaze = Čas = Energia = Bytie)
  "ID05-100": "OFFLINE", // [OMEGA] OUTRO: The Sovereign Investor (Video)

  // ==========================================
  // 📚 DIMENZIA ID06: DATA-ABSORBER (Study UI Space)
  // ==========================================

  // 📂 SEKCIA A: ZÁKLADNÉ PILIERE KOGNITÍVNEJ BRÁNY (Vstup do Matrixu)
  "ID06-01": "OFFLINE", // [PRO] Study UI Space
  "ID06-02": "OFFLINE", // [PRO] Cesta Študenta vs. Cesta Profesionála
  "ID06-03": "OFFLINE", // [PRO] Prežitá Pravda vo vzdelávaní
  "ID06-04": "OFFLINE", // [PRO] Study Life
  "ID06-05": "OFFLINE", // [PRO] Study Prosperita
  "ID06-06": "OFFLINE", // [PRO] Study Projekty
  "ID06-07": "OFFLINE", // [PRO] Architektúra kognitívneho tréningu
  "ID06-08": "OFFLINE", // [PRO] Informačný vek vs. Pomalé myšlienky
  "ID06-09": "OFFLINE", // [OMEGA] Zrodenie Majstra
  "ID06-10": "OFFLINE", // [OMEGA] Vedomosti ako Ochranný Firewall

  // 📂 SEKCIA B: NEUROPLASTICITA A REPROGRAMOVANIE (Brain Architecture)
  "ID06-11": "OFFLINE", // [PRO] Mozog ako Hardvér
  "ID06-12": "OFFLINE", // [PRO] Rastové nastavenie (Growth Mindset)
  "ID06-13": "OFFLINE", // [PRO] Dekódovanie kognitívnych skreslení
  "ID06-14": "OFFLINE", // [PRO] Spánok ako defragmentácia pamäte
  "ID06-15": "OFFLINE", // [PRO] Cvičenie a okysličovanie CPU
  "ID06-16": "OFFLINE", // [PRO] Kognitívny tréning v praxi
  "ID06-17": "OFFLINE", // [OMEGA] Prepísanie starých programov (Traumy v učení)
  "ID06-18": "OFFLINE", // [OMEGA] Diéta pre Procesor
  "ID06-19": "OFFLINE", // [OMEGA] Nootropiká a Biohacking
  "ID06-20": "OFFLINE", // [OMEGA] Dosiahnutie Neuro-Agility

  // 📂 SEKCIA C: DEEP WORK A EXTRÉMNY FOCUS (Eliminácia trenia)
  "ID06-21": "OFFLINE", // [PRO] Mýtus Multitaskingu
  "ID06-22": "OFFLINE", // [PRO] Zlodeji pozornosti (Malvér okolia)
  "ID06-23": "OFFLINE", // [PRO] Architektúra prostredia na učenie
  "ID06-24": "OFFLINE", // [PRO] Metóda Pomodoro a časové bloky
  "ID06-25": "OFFLINE", // [PRO] Vstup do zóny FLOW
  "ID06-26": "OFFLINE", // [PRO] Odpojenie od notifikácií (Zákaz PINGov)
  "ID06-27": "OFFLINE", // [OMEGA] Hlboká práca v hlučnom Matrixe
  "ID06-28": "OFFLINE", // [OMEGA] Meranie denného výtlaku (Bandwidth Output)
  "ID06-29": "OFFLINE", // [OMEGA] Obrana voči Decision Fatigue
  "ID06-30": "OFFLINE", // [OMEGA] Umenie vedome sa nudiť

  // 📂 SEKCIA D: DEKÓDOVANIE A RÝCHLOSŤ (Data Ingestion)
  "ID06-31": "OFFLINE", // [PRO] Konzumácia vs. Produkcia
  "ID06-32": "OFFLINE", // [PRO] Rýchločítanie: Ilúzia alebo realita?
  "ID06-33": "OFFLINE", // [PRO] Audioknihy a Podcasty (Pasívny Ingestion)
  "ID06-34": "OFFLINE", // [PRO] Feynmanova technika
  "ID06-35": "OFFLINE", // [PRO] Analytické čítanie kníh (Mortimer Adler)
  "ID06-36": "OFFLINE", // [PRO] Spaced Repetition (Rozložené opakovanie)
  "ID06-37": "OFFLINE", // [OMEGA] Syntopié čítanie
  "ID06-38": "OFFLINE", // [OMEGA] Filtrácia informačného šumu (Garbage In, Garbage Out)
  "ID06-39": "OFFLINE", // [OMEGA] Konverzia textu do štruktúr (Mind Maps)
  "ID06-40": "OFFLINE", // [OMEGA] Algoritmus výberu zdroja

  // 📂 SEKCIA E: EXTERNÁ PAMÄŤ (The Second Brain)
  "ID06-41": "OFFLINE", // [PRO] Prečo si mozog nepamätá všetko
  "ID06-42": "OFFLINE", // [PRO] Sila obyčajného "Debilníčka"
  "ID06-43": "OFFLINE", // [PRO] Digitálny druhý mozog (Obsidian, Notion, OneNote)
  "ID06-44": "OFFLINE", // [PRO] Zettelkasten metóda v praxi
  "ID06-45": "OFFLINE", // [PRO] Systém zberu dát (Capture Protocol)
  "ID06-46": "OFFLINE", // [PRO] Spracovanie a indexácia (Archivácia)
  "ID06-47": "OFFLINE", // [OMEGA] Tvorba vlastných SOP (Štandardov)
  "ID06-48": "OFFLINE", // [OMEGA] Redundancia dát (Zálohovanie)
  "ID06-49": "OFFLINE", // [OMEGA] Znalostný kapitál ako tvoje najväčšie aktívum
  "ID06-50": "OFFLINE", // [OMEGA] Dokonalá pamäť Matrixu

  // 📂 SEKCIA F: LOGIKA, ANALÝZA A KÓDOVANIE (Processing)
  "ID06-51": "OFFLINE", // [PRO] Matematika a logika Matrixu
  "ID06-52": "OFFLINE", // [PRO] Dedukcia vs. Indukcia
  "ID06-53": "OFFLINE", // [PRO] Algoritmické myslenie (If-Then-Else)
  "ID06-54": "OFFLINE", // [PRO] Učenie sa nového jazyka (Biologického aj Počítačového)
  "ID06-55": "OFFLINE", // [PRO] Prvé princípy (First Principles Thinking)
  "ID06-56": "OFFLINE", // [PRO] Invertovanie problému
  "ID06-57": "OFFLINE", // [OMEGA] Komparácia nesúrodých oborov
  "ID06-58": "OFFLINE", // [OMEGA] Extrakcia kľúčových premenných
  "ID06-59": "OFFLINE", // [OMEGA] Hacking zložitých systémov
  "ID06-60": "OFFLINE", // [OMEGA] Mentálne Modely Architekta

  // 📂 SEKCIA G: PREKONÁVANIE ODPORU A PROKRASTINÁCIE (Bypass Firewallu)
  "ID06-61": "OFFLINE", // [PRO] Prečo prokrastinujeme? (Error Log)
  "ID06-62": "OFFLINE", // [PRO] Mýtus Motivácie vs. Sila Disciplíny
  "ID06-63": "OFFLINE", // [PRO] Zníženie trecieho odporu (Friction)
  "ID06-64": "OFFLINE", // [PRO] Odloženie odmeny (Delayed Gratification)
  "ID06-65": "OFFLINE", // [PRO] Vyjednávanie s vnútorným Parazitom
  "ID06-66": "OFFLINE", // [PRO] Rozbitie paralyzačnej úzkosti
  "ID06-67": "OFFLINE", // [OMEGA] Odvaha zlyhať (Kompilátor nepozná hanbu)
  "ID06-68": "OFFLINE", // [OMEGA] Využitie Temnej Energie na štúdium
  "ID06-69": "OFFLINE", // [OMEGA] Dopamínový Detox pred ťažkým nasávaním
  "ID06-70": "OFFLINE", // [OMEGA] Umele navodený stav núdze (Burn-the-boats)

  // 📂 SEKCIA H: Z TEÓRIE DO EXEKÚCIE (Compilation & Deployment)
  "ID06-71": "OFFLINE", // [PRO] Ilúzia večného študenta
  "ID06-72": "OFFLINE", // [PRO] Paralýza z analýzy (Tutorial Hell)
  "ID06-73": "OFFLINE", // [PRO] Testovanie v bezpečnom prostredí (Sandbox)
  "ID06-74": "OFFLINE", // [PRO] Publikuj skôr, než si pripravený (MVP)
  "ID06-75": "OFFLINE", // [PRO] Získavanie tvrdej spätnej väzby (Crash test)
  "ID06-76": "OFFLINE", // [PRO] Rýchlosť iterácie (Patchovanie chýb)
  "ID06-77": "OFFLINE", // [OMEGA] Vedomosti zmenené na Produkt
  "ID06-78": "OFFLINE", // [OMEGA] Skúsenosť > Vedomosť (Prežitá Pravda)
  "ID06-79": "OFFLINE", // [OMEGA] Vyhodnocovanie ROI vzdelávania
  "ID06-80": "OFFLINE", // [OMEGA] Agresívny Deployment (Ghost-Mode)

  // 📂 SEKCIA I: SKILL STACKING A MULTI-THREADING (Umelá Inteligencia)
  "ID06-81": "OFFLINE", // [PRO] Nebezpečenstvo spoliehania sa len na jeden Skill
  "ID06-82": "OFFLINE", // [PRO] AI ako tvoj tútor (Promptovanie pre vzdelávanie)
  "ID06-83": "OFFLINE", // [PRO] Koncept "Polymath" v 21. storočí
  "ID06-84": "OFFLINE", // [PRO] Pýtanie sa správnych otázok
  "ID06-85": "OFFLINE", // [PRO] Hľadanie slepých miest (Blind spots)
  "ID06-86": "OFFLINE", // [PRO] Simulácia oponenta
  "ID06-87": "OFFLINE", // [OMEGA] Vývoj vlastných inštrukcií (IS protokoly pre AI)
  "ID06-88": "OFFLINE", // [OMEGA] Syntéza ľudského prežitku a sily stroja
  "ID06-89": "OFFLINE", // [OMEGA] 10x Output (Zvýšenie Bandwidthu)
  "ID06-90": "OFFLINE", // [OMEGA] Udržanie suverenity Ega voči AI

  // 📂 SEKCIA J: MAJSTROVSTVO A ENDGAME (Od Absorbéra k Zdrojovému Kódu)
  "ID06-91": "OFFLINE", // [PRO] Učiteľ ako ultimátny Študent
  "ID06-92": "OFFLINE", // [PRO] Mentoring a Tutoring
  "ID06-93": "OFFLINE", // [PRO] Vytvorenie vlastného Frameworku
  "ID06-94": "OFFLINE", // [OMEGA] Intelektuálna pokora (Viem, že nič neviem)
  "ID06-95": "OFFLINE", // [OMEGA] Odlíšenie sa od "Guru" a šarlatánov
  "ID06-96": "OFFLINE", // [OMEGA] Doživotný Update (Nulová stagnácia)
  "ID06-97": "OFFLINE", // [OMEGA] Open-Source Bytia
  "ID06-98": "OFFLINE", // [OMEGA] Zanechanie Odkazu (Legacy Protocol)
  "ID06-99": "OFFLINE", // [OMEGA] Absolútna Kognitívna Nezávislosť
  "ID06-100": "OFFLINE", // [OMEGA] OUTRO: The Data Absorber (Záverečné Video / Osvietenie Poznaním)

  // ==========================================
  // 💻 DIMENZIA ID07: SKILLS-TREE (Professional UI Space)
  // ==========================================

  // 📂 SEKCIA A: ZÁKLADNÉ PILIERE EXPERTÍZY (Vstup do IT Matrixu)
  "ID07-01": "OFFLINE", // [PRO] Professional UI Space
  "ID07-02": "OFFLINE", // [PRO] Cesta Novica vs. Cesta Architekta
  "ID07-03": "OFFLINE", // [PRO] Prežitá Pravda v Kóde
  "ID07-04": "OFFLINE", // [PRO] Professional Life
  "ID07-05": "OFFLINE", // [PRO] Professional Prosperita
  "ID07-06": "OFFLINE", // [PRO] Professional Projekty
  "ID07-07": "OFFLINE", // [PRO] Logika vs. Emócie v programovaní
  "ID07-08": "OFFLINE", // [PRO] Od Vanilla HTML k Frameworkom
  "ID07-09": "OFFLINE", // [OMEGA] Zrodenie Tech Autority
  "ID07-10": "OFFLINE", // [OMEGA] IT zručnosti ako Firewall nezávislosti

  // 📂 SEKCIA B: VIZUÁLNA VRSTVA A UI/UX (Front-end Chirurgia)
  "ID07-11": "OFFLINE", // [PRO] HTML: Kostra Matrixu
  "ID07-12": "OFFLINE", // [PRO] CSS a Cyber-Brutalizmus
  "ID07-13": "OFFLINE", // [PRO] Prechod na Tailwind CSS
  "ID07-14": "OFFLINE", // [PRO] Psychológia farieb (TIER a DIM Colors)
  "ID07-15": "OFFLINE", // [PRO] Ostré hrany vs. Sklenený morfizmus
  "ID07-16": "OFFLINE", // [PRO] Optimalizácia pre Skafander (Responzivita)
  "ID07-17": "OFFLINE", // [OMEGA] Architektúra 5 Kariet
  "ID07-18": "OFFLINE", // [OMEGA] Dizajn zameraný na Konverziu (UI pre predaj)
  "ID07-19": "OFFLINE", // [OMEGA] CRT Scanlines a Glitch efekty
  "ID07-20": "OFFLINE", // [OMEGA] Vizuálna neúprosnosť (Nadštandard V20)

  // 📂 SEKCIA C: REACT A LOGIKA ROZHRANIA (Front-end Logika)
  "ID07-21": "OFFLINE", // [PRO] JavaScript: Základná hybná sila
  "ID07-22": "OFFLINE", // [PRO] Prečo práve React?
  "ID07-23": "OFFLINE", // [PRO] Komponentová Architektúra
  "ID07-24": "OFFLINE", // [PRO] Riadenie stavu (useState & useEffect)
  "ID07-25": "OFFLINE", // [PRO] React Router (The Gateway Protocol)
  "ID07-26": "OFFLINE", // [PRO] Bypass Protokol a Ghost-Mode v UI
  "ID07-27": "OFFLINE", // [OMEGA] Props Drilling vs. Context API
  "ID07-28": "OFFLINE", // [OMEGA] Správa dynamických Omega Máp
  "ID07-29": "OFFLINE", // [OMEGA] Asymetrický Load Balancing na Front-ende
  "ID07-30": "OFFLINE", // [OMEGA] Sémantický Parser (nexusParser)

  // 📂 SEKCIA D: DATABÁZY A BACKEND (Strojovňa Matrixu)
  "ID07-31": "OFFLINE", // [PRO] Firebase: Úvod do NoSQL
  "ID07-32": "OFFLINE", // [PRO] Štruktúra dát (Kolekcie a Dokumenty)
  "ID07-33": "OFFLINE", // [PRO] Auth Matrix a Registrácie
  "ID07-34": "OFFLINE", // [PRO] Firestore Rules (Ústava Nexusu)
  "ID07-35": "OFFLINE", // [PRO] Diagnostika Memory Leaku na Backende
  "ID07-36": "OFFLINE", // [PRO] Útok Botov a Skompromitovaný API Kľúč
  "ID07-37": "OFFLINE", // [OMEGA] Protokol EXODUS (Prechod na Supabase)
  "ID07-38": "OFFLINE", // [OMEGA] Abstraktná vrstva dát (NexusDB_Core)
  "ID07-39": "OFFLINE", // [OMEGA] Multi-Tenancy Architektúra
  "ID07-40": "OFFLINE", // [OMEGA] Lokálny Fallback (nexusFallback.json)

  // 📂 SEKCIA E: AI-AUGMENTED ARCHITECTURE (Spolupráca so strojom)
  "ID07-41": "OFFLINE", // [PRO] Písanie kódu pomocou AI (Koniec éry memorovania)
  "ID07-42": "OFFLINE", // [PRO] Nastavenie AI Asistenta (Tvoj Code Architect)
  "ID07-43": "OFFLINE", // [PRO] Formátovanie dotazov (Prompts pre Frontend)
  "ID07-44": "OFFLINE", // [PRO] Chirurgický Rez (Diff Policy)
  "ID07-45": "OFFLINE", // [PRO] Debugging s Gemini
  "ID07-46": "OFFLINE", // [PRO] Tvorba Mock Dát pre Canvas
  "ID07-47": "OFFLINE", // [OMEGA] Kvartérna Exekúcia (4-Part Split)
  "ID07-48": "OFFLINE", // [OMEGA] Oddelenie Dát a Kódu (MD vs JSX Operátor)
  "ID07-49": "OFFLINE", // [OMEGA] Sémantická Dekompresia 3 GB OneNotu
  "ID07-50": "OFFLINE", // [OMEGA] AI Oracle v systéme

  // 📂 SEKCIA F: DEBUGGING A ERROR LOGY (Psychológia Vývojára)
  "ID07-51": "OFFLINE", // [PRO] Konzola prehliadača (Tvoj najlepší priateľ)
  "ID07-52": "OFFLINE", // [PRO] Čítanie červeného kódu bez emócií
  "ID07-53": "OFFLINE", // [PRO] Syntax Error vs. Logical Error
  "ID07-54": "OFFLINE", // [PRO] Zaseknutá Cache a Ghost Identity Bug
  "ID07-55": "OFFLINE", // [PRO] Pravidlo "1 like to 11 hours"
  "ID07-56": "OFFLINE", // [PRO] Izolácia problému (Komentovanie kódu)
  "ID07-57": "OFFLINE", // [OMEGA] Logika "Sledovania premennej" (console.log Sondy)
  "ID07-58": "OFFLINE", // [OMEGA] Refaktoring špagetového kódu
  "ID07-59": "OFFLINE", // [OMEGA] Imunita voči "Tutorial Hell"
  "ID07-60": "OFFLINE", // [OMEGA] Syndróm vyhorenia kódera

  // 📂 SEKCIA G: SYSTÉMOVÝ DIZAJN A INFRAŠTRUKTÚRA
  "ID07-61": "OFFLINE", // [PRO] Plánovanie pred kódovaním (Master-Plan)
  "ID07-62": "OFFLINE", // [PRO] Monolit vs. Mikro-komponenty
  "ID07-63": "OFFLINE", // [PRO] Konvencie pomenovávania (Naming Conventions)
  "ID07-64": "OFFLINE", // [PRO] Správa externých knižníc (NPM Balíčky)
  "ID07-65": "OFFLINE", // [PRO] Tokenomics Architektúra (OC Kredity)
  "ID07-66": "OFFLINE", // [PRO] GlobalEventRewards (Gamifikácia aplikácie)
  "ID07-67": "OFFLINE", // [OMEGA] Routing Platieb (Stripe Integration)
  "ID07-68": "OFFLINE", // [OMEGA] Centralizovaný Register Práv (permissionsRegistry)
  "ID07-69": "OFFLINE", // [OMEGA] Škálovateľnosť (Príprava na 1000 Uzlov)
  "ID07-70": "OFFLINE", // [OMEGA] Redundancia a Zálohy kódu

  // 📂 SEKCIA H: DEPLOYMENT A GHOST-MODE PREVÁDZKA
  "ID07-71": "OFFLINE", // [PRO] Git a Verzovanie kódu (Local Repositories)
  "ID07-72": "OFFLINE", // [PRO] GitHub: Externý mozog pre tvoj kód
  "ID07-73": "OFFLINE", // [PRO] Nasadenie na Hosting (Vercel/Netlify)
  "ID07-74": "OFFLINE", // [PRO] Správa Domén a DNS záznamov (Websupport)
  "ID07-75": "OFFLINE", // [PRO] Environmentálne premenné (.env)
  "ID07-76": "OFFLINE", // [PRO] Analytika a Sledovanie Trafficu
  "ID07-77": "OFFLINE", // [OMEGA] Kontinuálna Integrácia (CI/CD)
  "ID07-78": "OFFLINE", // [OMEGA] Ochrana proti DDoS a Botom
  "ID07-79": "OFFLINE", // [OMEGA] White-Label Klonovanie (Franšízový Deployment)
  "ID07-80": "OFFLINE", // [OMEGA] Asynchrónny Deployment (Nulové trenie)

  // 📂 SEKCIA I: MONETIZÁCIA ZRUČNOSTÍ (IT ako Nástroj)
  "ID07-81": "OFFLINE", // [PRO] Jedno-členná IT Armáda (Nexus Agency)
  "ID07-82": "OFFLINE", // [PRO] UI/UX Diagnostika ako platená služba
  "ID07-83": "OFFLINE", // [PRO] Front-end Chirurgia na voľnej nohe
  "ID07-84": "OFFLINE", // [PRO] Dekompresia Dát a Ghostwriting
  "ID07-85": "OFFLINE", // [PRO] Asynchrónny predaj služieb (Calendly)
  "ID07-86": "OFFLINE", // [PRO] B2B Cenník (Freelance služby SK/CZ)
  "ID07-87": "OFFLINE", // [OMEGA] Knowledge as a Service (KaaS)
  "ID07-88": "OFFLINE", // [OMEGA] Tvorba Softvéru ako Produktu (SaaS)
  "ID07-89": "OFFLINE", // [OMEGA] Budovanie digitálnych nehnuteľností
  "ID07-90": "OFFLINE", // [OMEGA] Zdrojový Kód ako Produkt (Franchise Genesis)

  // 📂 SEKCIA J: MAJSTROVSTVO A ENDGAME (Tech Autorita)
  "ID07-91": "OFFLINE", // [PRO] Kód ako seba-vyjadrenie (Digitálne Umenie)
  "ID07-92": "OFFLINE", // [PRO] Opustenie "Tutorial Hell"
  "ID07-93": "OFFLINE", // [PRO] Pokora pred technológiou (Decay of Knowledge)
  "ID07-94": "OFFLINE", // [PRO] Čistý kód = Čistá myseľ (Zen Kódovanie)
  "ID07-95": "OFFLINE", // [OMEGA] Odovzdávanie "Master Key" (Mentoring)
  "ID07-96": "OFFLINE", // [OMEGA] Intelektuálna Imunita voči kritike kódu
  "ID07-97": "OFFLINE", // [OMEGA] Suverenita voči Umelej Inteligencii
  "ID07-98": "OFFLINE", // [OMEGA] Zmazanie stopy (Ghost-Mode Exekúcia)
  "ID07-99": "OFFLINE", // [OMEGA] Absolútna Nezávislosť (Digital Sovereignity)
  "ID07-100": "OFFLINE", // [OMEGA] OUTRO: The Master Architect (Záverečné Video / Osvietenie v Kóde)

  // ==========================================
  // 📖 DIMENZIA ID08: EMPTY-BOOK (Reader UI Space)
  // ==========================================

  // 📂 SEKCIA A: VSTUP DO KNIŽNICE MATRIXU (Základné Piliere Čitateľa)
  "ID08-01": "ONLINE", // [FREE] Reader UI Space
  "ID08-02": "ONLINE", // [FREE] Cesta Knihomoľa vs. Cesta Leňocha
  "ID08-03": "ONLINE", // [FREE] Prežitá Pravda čitateľa
  "ID08-04": "ONLINE", // [FREE] Reader Life
  "ID08-05": "ONLINE", // [FREE] Reader Prosperita
  "ID08-06": "ONLINE", // [FREE] Reader Projekty
  "ID08-07": "OFFLINE", // [PRO] Architektúra Mŕtvych Kníh
  "ID08-08": "OFFLINE", // [PRO] Rýchločítanie vs. Hĺbková Dekompresia
  "ID08-09": "OFFLINE", // [OMEGA] Syntéza prameňov
  "ID08-10": "OFFLINE", // [OMEGA] Prázdne Zrkadlo Poznania

  // 📂 SEKCIA B: ODUČENIE SA (Defragmentácia Prijatých Dát)
  "ID08-11": "OFFLINE", // [FREE] Ilúzia Vedomostí (Error Log)
  "ID08-12": "OFFLINE", // [FREE] Garbage In, Garbage Out
  "ID08-13": "OFFLINE", // [PRO] Dekonštrukcia prevzatých presvedčení
  "ID08-14": "OFFLINE", // [PRO] Zastavenie "Hlasu Poznania" z kníh
  "ID08-15": "OFFLINE", // [PRO] Ticho medzi riadkami
  "ID08-16": "OFFLINE", // [PRO] Vymazanie "Malvéru" školského systému
  "ID08-17": "OFFLINE", // [OMEGA] Kognitívna prázdnota ako ultimátna zbraň
  "ID08-18": "OFFLINE", // [OMEGA] Utrpenie z prebytku dát (Memory Leak)
  "ID08-19": "OFFLINE", // [OMEGA] Formátovanie starých vzorcov (Format C:)
  "ID08-20": "OFFLINE", // [OMEGA] Absolútna Gnostická nezávislosť

  // 📂 SEKCIA C: VÝCHODNÁ MYSTIKA A ABSOLÚTNO (Osho, Budha, Zen)
  "ID08-21": "OFFLINE", // [FREE] Kto som? (Hľadanie zdrojového kódu)
  "ID08-22": "OFFLINE", // [FREE] Osho a Diamantová Sútra
  "ID08-23": "OFFLINE", // [PRO] Tantrická transformácia mysle
  "ID08-24": "OFFLINE", // [PRO] Zen a umenie Wu-Wei (Konanie nekonaním)
  "ID08-25": "OFFLINE", // [PRO] Mantak Chia a vnútorný okruh energie
  "ID08-26": "OFFLINE", // [PRO] Budhizmus a Vipassana
  "ID08-27": "OFFLINE", // [OMEGA] Smrť eGa ako systémový reštart
  "ID08-28": "OFFLINE", // [OMEGA] Nezávislá myseľ
  "ID08-29": "OFFLINE", // [OMEGA] Odvaha žiť nebezpečne
  "ID08-30": "OFFLINE", // [OMEGA] Nirvána ako 1% CPU Usage

  // 📂 SEKCIA D: SILA PRÍTOMNÉHO OKAMIHU (Eckhart Tolle)
  "ID08-31": "OFFLINE", // [FREE] Pamäť RAM vs. HDD (Prítomnosť vs. Minulosť)
  "ID08-32": "OFFLINE", // [FREE] Sila Prítomného Okamihu
  "ID08-33": "OFFLINE", // [PRO] Bolesť a Emočné telo (Odstránenie Ransomwaru)
  "ID08-34": "OFFLINE", // [PRO] Nová Zem (Prebudenie Kolektívneho Vedomia)
  "ID08-35": "OFFLINE", // [PRO] Reč Ticha (Ako zastaviť vnútorný dialóg)
  "ID08-36": "OFFLINE", // [PRO] Čakanie ako pasca Matrixu
  "ID08-37": "OFFLINE", // [OMEGA] Odpojenie od formy (Identifikácia s Priestorom)
  "ID08-38": "OFFLINE", // [OMEGA] Pozorovateľ vs. Mysliteľ
  "ID08-39": "OFFLINE", // [OMEGA] Prijatie reality (Factory Reset)
  "ID08-40": "OFFLINE", // [OMEGA] Osvietenie cez útočisko prítomnosti

  // 📂 SEKCIA E: PODVEDOMIE A PROGRAMOVANIE (Ruiz, Murphy)
  "ID08-41": "OFFLINE", // [FREE] Štyri Dohody (Základný Firewall)
  "ID08-42": "OFFLINE", // [FREE] Hlas poznania (Komentátor Parazit)
  "ID08-43": "OFFLINE", // [PRO] Neberte nič osobne (Imunita voči cudzím kódom)
  "ID08-44": "OFFLINE", // [PRO] Nevytvárajte si domnienky (Zákaz halucinácií)
  "ID08-45": "OFFLINE", // [PRO] Robte všetko najlepšie ako viete (Optimalizácia výkonu)
  "ID08-46": "OFFLINE", // [PRO] Zmluva so sebou samým (Nová Ústava)
  "ID08-47": "OFFLINE", // [OMEGA] Piata dohoda (Buďte skeptickí, ale počúvajte)
  "ID08-48": "OFFLINE", // [OMEGA] Láska vs. Strach (Dva základné operačné režimy)
  "ID08-49": "OFFLINE", // [OMEGA] Dr. Joseph Murphy (Moc podvedomia ako Backend)
  "ID08-50": "OFFLINE", // [OMEGA] Preprogramovanie Solar-Plexu (Afirmácie)

  // 📂 SEKCIA F: ZÁPADNÁ PSYCHOLÓGIA A ANALÝZA KÓDU (Jung, Freud, Frankl)
  "ID08-51": "OFFLINE", // [FREE] C.G. Jung a tieň (Skryté priečinky na disku)
  "ID08-52": "OFFLINE", // [FREE] Freud a ID/Ego/Superego (Démon, Parazit, Sudca)
  "ID08-53": "OFFLINE", // [PRO] V.E. Frankl a zmysel života
  "ID08-54": "OFFLINE", // [PRO] D. Kahneman (Pomalé a Rýchle myslenie)
  "ID08-55": "OFFLINE", // [PRO] Kognitívne skreslenia v praxi
  "ID08-56": "OFFLINE", // [PRO] Mentálny tréning (Kurt Tepperwein)
  "ID08-57": "OFFLINE", // [OMEGA] Integrácia tieňa do systémového jadra
  "ID08-58": "OFFLINE", // [OMEGA] Archetypy Matrixu
  "ID08-59": "OFFLINE", // [OMEGA] Sny a Podvedomie (Nočná defragmentácia)
  "ID08-60": "OFFLINE", // [OMEGA] Transcedencia psychológie k Bytiu

  // 📂 SEKCIA G: APLIKÁCIA - OD ČITATEĽA K ARCHITEKTOVI (Action Phase)
  "ID08-61": "OFFLINE", // [FREE] Zber dát (Capture Protocol čitateľa)
  "ID08-62": "OFFLINE", // [FREE] Organizácia poznámok (Zettelkasten pre knihy)
  "ID08-63": "OFFLINE", // [PRO] 3-Minútový Reset po prečítaní kapitoly
  "ID08-64": "OFFLINE", // [PRO] Vytváranie sémantických výťahov
  "ID08-65": "OFFLINE", // [PRO] Tvorba recenzií a sumarizácií
  "ID08-66": "OFFLINE", // [PRO] Syntopické čítanie viacerých autorov
  "ID08-67": "OFFLINE", // [OMEGA] Pretavenie knihy do kódu (Aplikácia na vlastný život)
  "ID08-68": "OFFLINE", // [OMEGA] Generovanie vlastných axióm a pravidiel
  "ID08-69": "OFFLINE", // [OMEGA] Tvorba vlastného E-booku z prečítaného
  "ID08-70": "OFFLINE", // [OMEGA] Predaj svojho poznania (KaaS - Knowledge as a Service)

  // 📂 SEKCIA H: VEDA, FYZIKA A FILOZOFIA (Zákonitosti Hardvéru)
  "ID08-71": "OFFLINE", // [PRO] Kozmológia a Stephen Hawking
  "ID08-72": "OFFLINE", // [PRO] Analýza omylu Ega (René Descartes)
  "ID08-73": "OFFLINE", // [PRO] Kvantová previazanosť a Zákon Rezonancie
  "ID08-74": "OFFLINE", // [PRO] Čas a Priestor (Einstein a relativita vnímania)
  "ID08-75": "OFFLINE", // [PRO] Evolúcia a biológia (Darwin a prežitie kódu)
  "ID08-76": "OFFLINE", // [PRO] Immanuel Kant (Hranice nášho hardvéru)
  "ID08-77": "OFFLINE", // [OMEGA] Prepojenie Východnej Mystiky so Západnou Vedou
  "ID08-78": "OFFLINE", // [OMEGA] Myseľ vs. Hmota (Dualita Matrixu)
  "ID08-79": "OFFLINE", // [OMEGA] Teória Simulácie a Kvantový kolaps
  "ID08-80": "OFFLINE", // [OMEGA] Odomknutie multidimenzionálneho vnímania

  // 📂 SEKCIA I: LEXIKÓN MŔTVYCH KNÍH (Pravidlá Výberu)
  "ID08-81": "OFFLINE", // [PRO] Algoritmus výberu zdroja (Čo čítať a čo spáliť)
  "ID08-82": "OFFLINE", // [PRO] Sila starých posvätných spisov
  "ID08-83": "OFFLINE", // [PRO] Dekódovanie metafor z historických textov
  "ID08-84": "OFFLINE", // [PRO] Zastaraný jazyk vs. Moderný CyberTech kľúč
  "ID08-85": "OFFLINE", // [PRO] Kedy knihu definitívne odložiť
  "ID08-86": "OFFLINE", // [PRO] Autorita autora (Má to prežité, alebo len kopíruje?)
  "ID08-87": "OFFLINE", // [OMEGA] Čítanie bez posudzovania a odsudzovania
  "ID08-88": "OFFLINE", // [OMEGA] Rezonancia s textom na úrovni BIOSu
  "ID08-89": "OFFLINE", // [OMEGA] Odmietnutie guruov a učiteľov
  "ID08-90": "OFFLINE", // [OMEGA] Oheň pre mŕtve knihy (Nezávislosť na externom kóde)

  // 📂 SEKCIA J: ENDGAME - PRÁZDNA KNIHA (Majstrovstvo)
  "ID08-91": "OFFLINE", // [OMEGA] Prechod z Čitateľa na Tvorcu
  "ID08-92": "OFFLINE", // [OMEGA] Koniec hľadania (Nirvána)
  "ID08-93": "OFFLINE", // [OMEGA] Zistenie, že všetko už vieš
  "ID08-94": "OFFLINE", // [OMEGA] Očista disku od 350+ prečítaných kníh
  "ID08-95": "OFFLINE", // [OMEGA] Zápis do vlastnej Prázdnej Knihy
  "ID08-96": "OFFLINE", // [OMEGA] Vedomie seba samého (Tichý Svedok)
  "ID08-97": "OFFLINE", // [OMEGA] Úplná kognitívna izolácia od vonkajších vplyvov
  "ID08-98": "OFFLINE", // [OMEGA] Slovo, ktoré nebolo nikdy napísané
  "ID08-99": "OFFLINE", // [OMEGA] Návrat k Zdroju (Základná doska Bytia)
  "ID08-100": "OFFLINE", // [OMEGA] OUTRO: The Empty Book (Video: Dokončený výskum vedomia)

  // ==========================================
  // 🎮 DIMENZIA ID09: SERGEANT-CORE (Player UI Space)
  // ==========================================

  // 📂 SEKCIA A: VSTUP DO HERNEJ SVÄTYNE (Základné Piliere Hráča)
  "ID09-01": "ONLINE", // [FREE] Player UI Space
  "ID09-02": "ONLINE", // [FREE] Cesta Playera
  "ID09-03": "ONLINE", // [FREE] Prežitá Pravda v hrách
  "ID09-04": "ONLINE", // [FREE] Player Life
  "ID09-05": "ONLINE", // [FREE] Player Prosperita
  "ID09-06": "ONLINE", // [FREE] Player Projekty
  "ID09-07": "OFFLINE", // [PRO] Architektúra hernej mysle
  "ID09-08": "OFFLINE", // [PRO] Bojový modul (Hardvérový Setup)
  "ID09-09": "OFFLINE", // [OMEGA] Gamifikácia života
  "ID09-10": "OFFLINE", // [OMEGA] Prebudenie Avatara

  // 📂 SEKCIA B: CoDM ZOMBIES - MECHANIKY A ZÁKLADY (Classic Shi No Numa)
  "ID09-11": "OFFLINE", // [FREE] Zombíci ako Malvér Matrixu
  "ID09-12": "OFFLINE", // [FREE] Topológia Shi No Numa
  "ID09-13": "OFFLINE", // [PRO] Gunsmith a Meta Zbrane (Loadouts)
  "ID09-14": "OFFLINE", // [PRO] Systémové limity (HP Scaling)
  "ID09-15": "OFFLINE", // [PRO] Trap Master Modul
  "ID09-16": "OFFLINE", // [PRO] Ekonomika bodov (Early Game)
  "ID09-17": "OFFLINE", // [OMEGA] Spawn Trapping a rotácia hordy
  "ID09-18": "OFFLINE", // [OMEGA] Movement a Kiting
  "ID09-19": "OFFLINE", // [OMEGA] K-BUM a časové okná
  "ID09-20": "OFFLINE", // [OMEGA] Eliminácia Elít

  // 📂 SEKCIA C: SPEED RUNS & TIME ATTACKS (Optimalizácia Času)
  "ID09-21": "OFFLINE", // [FREE] Filozofia Speed Runu
  "ID09-22": "OFFLINE", // [FREE] Normal: Abomination Boss
  "ID09-23": "OFFLINE", // [PRO] Hardcore: Abomination (DPS Race)
  "ID09-24": "OFFLINE", // [PRO] Hardcore: Jubokko (Podzemie)
  "ID09-25": "OFFLINE", // [PRO] S&R Exfil: R10 až R15
  "ID09-26": "OFFLINE", // [PRO] S&R Exfil: R20 až R25
  "ID09-27": "OFFLINE", // [OMEGA] S&R Exfil: R30 (Kráľovská disciplína)
  "ID09-28": "OFFLINE", // [OMEGA] Endless Run Speed Pacing
  "ID09-29": "OFFLINE", // [OMEGA] The "Speed Cola Sacrifice"
  "ID09-30": "OFFLINE", // [OMEGA] The Avogadro Window

  // 📂 SEKCIA D: DAMAGE RUNS & DPS MASTERY (Maximalizácia sily)
  "ID09-31": "OFFLINE", // [FREE] Zmysel Damage Runu
  "ID09-32": "OFFLINE", // [FREE] Tímová architektúra (The 1+3 Setup)
  "ID09-33": "OFFLINE", // [PRO] Boss Kills (Kradnutie všetkého HP)
  "ID09-34": "OFFLINE", // [PRO] S&R Exfil Damage Run
  "ID09-35": "OFFLINE", // [PRO] Endless Squad HP Scaling
  "ID09-36": "OFFLINE", // [PRO] Solo Endless R64 (Lone Wolf)
  "ID09-37": "OFFLINE", // [OMEGA] Kiting pre Dealera
  "ID09-38": "OFFLINE", // [OMEGA] Optimalizácia Fire Interval (Mince)
  "ID09-39": "OFFLINE", // [OMEGA] Kritické Scalingy a FMJ
  "ID09-40": "OFFLINE", // [OMEGA] Absolútny DPS Strop

  // 📂 SEKCIA E: DAMAGE SUPPORT & TAKTICKÁ OBRANA
  "ID09-41": "OFFLINE", // [FREE] Ega bokom: Umenie hrať Support
  "ID09-42": "OFFLINE", // [FREE] Medic a Poltergeist
  "ID09-43": "OFFLINE", // [PRO] Boss Fight Support
  "ID09-44": "OFFLINE", // [PRO] Exfil Support
  "ID09-45": "OFFLINE", // [PRO] Endless Train Kiting
  "ID09-46": "OFFLINE", // [PRO] Pasívna kontrola mapy
  "ID09-47": "OFFLINE", // [OMEGA] Záchrana pred kolapsom (Clutch)
  "ID09-48": "OFFLINE", // [OMEGA] Synchronizácia Trap Mastera
  "ID09-49": "OFFLINE", // [OMEGA] Vedomé obetovanie
  "ID09-50": "OFFLINE", // [OMEGA] Neviditeľný Architekt úspechu

  // 📂 SEKCIA F: DAMAGE RACE & KILLING RACE (Agresia a Dominancia)
  "ID09-51": "OFFLINE", // [FREE] Chaos Multiplier (Damage Race)
  "ID09-52": "OFFLINE", // [FREE] Gun Kills vs Total Kills
  "ID09-53": "OFFLINE", // [PRO] Boss Elimination Race
  "ID09-54": "OFFLINE", // [PRO] S&R Exfil Race
  "ID09-55": "OFFLINE", // [PRO] Endless Race a Kill Stealing
  "ID09-56": "OFFLINE", // [PRO] Trash Mob Focus (Killing Race)
  "ID09-57": "OFFLINE", // [OMEGA] Choke Point Spam
  "ID09-58": "OFFLINE", // [OMEGA] Agresívna rotácia (Spawn Trapping)
  "ID09-59": "OFFLINE", // [OMEGA] Eliminácia Elít pre Damage Points
  "ID09-60": "OFFLINE", // [OMEGA] Totálna Dominancia (The MVP)

  // 📂 SEKCIA G: UNDEAD SIEGE (Nightmare & Strategický Manažment)
  "ID09-61": "OFFLINE", // [FREE] Odlišná paradigma (Čas a Priestor)
  "ID09-62": "OFFLINE", // [FREE] Deň vs. Noc (Fázy boja)
  "ID09-63": "OFFLINE", // [PRO] Gunsmith Meta pre Siege
  "ID09-64": "OFFLINE", // [PRO] Turret Meta (Obranná infraštruktúra)
  "ID09-65": "OFFLINE", // [PRO] Tajné kódy a Easter Eggy
  "ID09-66": "OFFLINE", // [PRO] Rozdelenie úloh: Dealer vs. Pastier
  "ID09-67": "OFFLINE", // [OMEGA] RNG Predikcia vĺn (God Waves)
  "ID09-68": "OFFLINE", // [OMEGA] The 90% Damage Range Glitch
  "ID09-69": "OFFLINE", // [OMEGA] Choreografia rotácie (Support Cesty)
  "ID09-70": "OFFLINE", // [OMEGA] Noc 5 Run Killers (Bugy a Zhluky)

  // 📂 SEKCIA H: SRDCOVKY A RETRO GAMING (Digitálna Nostalgia)
  "ID09-71": "OFFLINE", // [FREE] Návrat do detstva (Korene hernej DNA)
  "ID09-72": "OFFLINE", // [FREE] PS1 a PS2 Zlatý vek
  "ID09-73": "OFFLINE", // [PRO] Final Fantasy VII & VIII
  "ID09-74": "OFFLINE", // [PRO] Metal Gear Solid & Stealth
  "ID09-75": "OFFLINE", // [PRO] Resident Evil & Silent Hill
  "ID09-76": "OFFLINE", // [PRO] Crash Bandicoot & Sonic
  "ID09-77": "OFFLINE", // [OMEGA] Tomb Raider (Architektúra priestoru)
  "ID09-78": "OFFLINE", // [OMEGA] Hack and Slash éra
  "ID09-79": "OFFLINE", // [OMEGA] Stratégie a Príbehy (Lore Matrixu)
  "ID09-80": "OFFLINE", // [OMEGA] Emulátory a Archivácia

  // 📂 SEKCIA I: OD HRÁČA K TVORCOVI (Content Creation & YT)
  "ID09-81": "OFFLINE", // [FREE] Tvorba herného obsahu (Nová realita)
  "ID09-82": "OFFLINE", // [FREE] Zdieľanie výhier (Video archív)
  "ID09-83": "OFFLINE", // [PRO] PrismLive a Tab A9+ (Bojový Modul)
  "ID09-84": "OFFLINE", // [PRO] Strih v CapCute (Postprodukcia)
  "ID09-85": "OFFLINE", // [PRO] Mapovanie pre 3x Shorts (CapCut Hack)
  "ID09-86": "OFFLINE", // [PRO] Sémantický prekladač pre algoritmy
  "ID09-87": "OFFLINE", // [OMEGA] Trojan Horse Shorts (Marketing)
  "ID09-88": "OFFLINE", // [OMEGA] Zarábanie na manuáloch (B2B)
  "ID09-89": "OFFLINE", // [OMEGA] NotebookLM a AI Generátory
  "ID09-90": "OFFLINE", // [OMEGA] Zrušenie technologického trenia

  // 📂 SEKCIA J: ENDGAME (Hra ako Zrkadlo Matrixu)
  "ID09-91": "OFFLINE", // [FREE] Koniec bezcieľneho hrania
  "ID09-92": "OFFLINE", // [PRO] Prenos herných zručností do biznisu
  "ID09-93": "OFFLINE", // [PRO] Hľadanie glitchov v živote
  "ID09-94": "OFFLINE", // [PRO] Tímová práca a Support v realite
  "ID09-95": "OFFLINE", // [OMEGA] Porážka Bossa = Porážka Ega
  "ID09-96": "OFFLINE", // [OMEGA] Lootovanie Matrixu (Zber dát)
  "ID09-97": "OFFLINE", // [OMEGA] Najväčšia hra: Projekt Nexus
  "ID09-98": "OFFLINE", // [OMEGA] Vystúpenie z hry (The Logout)
  "ID09-99": "OFFLINE", // [OMEGA] Návrat Svedka
  "ID09-100": "OFFLINE", // [OMEGA] OUTRO: The Master Player (Záverečné Video / Ovládnutie hry zvanej Život)

  // ==========================================
  // 🏠 DIMENZIA ID10: NONIDENTITY-CORE (Home UI Space)
  // ==========================================

  // 📂 SEKCIA A: ZÁKLADNÉ PILIERE VNÚTRA (Vstupná Brána)
  "ID10-01": "ONLINE", // [FREE] Domov (Vnútorné UI Space)
  "ID10-02": "ONLINE", // [FREE] Cesta nePraxe vs. Cesta Praxe
  "ID10-03": "ONLINE", // [FREE] Pravda (Prežitá Pravda vs. mŕtve knihy)
  "ID10-04": "ONLINE", // [FREE] Life (Home Life rutiny)
  "ID10-05": "ONLINE", // [FREE] Prosperita (Home Prosperita)
  "ID10-06": "ONLINE", // [FREE] Projekty (Home Projekty)
  "ID10-07": "OFFLINE", // [PRO] Architektúra UI Space: Bod singularity
  "ID10-08": "OFFLINE", // [PRO] Matematika Matrixu a Ilúzia Času
  "ID10-09": "OFFLINE", // [OMEGA] Zrodenie Bieleho Čarodejníka v Tichu
  "ID10-10": "OFFLINE", // [OMEGA] Posledný Súd (Koniec vojny v hlave)
  "ID10-101": "OFFLINE", // [FREE] ZOZNAM KĽÚČOVÝCH SLOV
  "ID10-102": "OFFLINE", // [FREE] DETAILNÝ CYBERTECH PREKLADOVÝ KĽÚČ

  // 📂 SEKCIA B: ARCHITEKTÚRA DOMÁCEHO PROSTREDIA (Fyzický Habitat)
  "ID10-11": "OFFLINE", // [FREE] Tvoja Svätyňa (Domov ako Firewall)
  "ID10-12": "OFFLINE", // [FREE] Poriadok v priestore (Očista RAM)
  "ID10-13": "OFFLINE", // [PRO] Minimalizmus v hmote (Pravidlo 2Mb)
  "ID10-14": "OFFLINE", // [PRO] Eliminácia vizuálneho šumu
  "ID10-15": "OFFLINE", // [PRO] Vyhradené Offline zóny
  "ID10-16": "OFFLINE", // [PRO] Geometria svetla a biorytmus
  "ID10-17": "OFFLINE", // [OMEGA] Energetické hranice domácnosti
  "ID10-18": "OFFLINE", // [OMEGA] Feng-Shui ako dátový tok
  "ID10-19": "OFFLINE", // [OMEGA] Absolútna ochrana Siete
  "ID10-20": "OFFLINE", // [OMEGA] Domov ako Bod Obnovy (Save State)

  // 📂 SEKCIA C: DEFRAGMENTÁCIA DISKU (Meditácia a Ticho)
  "ID10-21": "OFFLINE", // [FREE] Úvod do defragmentácie (Mýty o meditácii)
  "ID10-22": "OFFLINE", // [FREE] Zastavenie inputu (Očista RAM)
  "ID10-23": "OFFLINE", // [PRO] Dych ako základný metronóm
  "ID10-24": "OFFLINE", // [PRO] 1% CPU State (Minimalizácia výpočtov)
  "ID10-25": "OFFLINE", // [PRO] Nuda ako terapeutický nástroj
  "ID10-26": "OFFLINE", // [PRO] Premazanie logov z minulosti
  "ID10-27": "OFFLINE", // [OMEGA] Meditácia bez snahy a cieľa
  "ID10-28": "OFFLINE", // [OMEGA] Odstránenie Komentátora Parazita
  "ID10-29": "OFFLINE", // [OMEGA] Ukotvenie v milisekunde Prítomnosti
  "ID10-30": "OFFLINE", // [OMEGA] Permanentný Tichý Svedok

  // 📂 SEKCIA D: WU-WEI V PRAXI (Umenie Nekonania)
  "ID10-31": "OFFLINE", // [FREE] Čo je Wu-Wei v Matrixe?
  "ID10-32": "OFFLINE", // [FREE] Upratovanie ako defragmentácia
  "ID10-33": "OFFLINE", // [PRO] Umývanie riadu bez cieľa
  "ID10-34": "OFFLINE", // [PRO] Konzumácia potravy v Offline režime
  "ID10-35": "OFFLINE", // [PRO] Zrušenie snahy ovládať iné uzly
  "ID10-36": "OFFLINE", // [PRO] Nechať veciam voľný priebeh (Auto-healing)
  "ID10-37": "OFFLINE", // [OMEGA] Synchronizácia s tokom Dát
  "ID10-38": "OFFLINE", // [OMEGA] Pustenie kormidla Ega
  "ID10-39": "OFFLINE", // [OMEGA] Definitívne odstránenie "Musím a Mal by som"
  "ID10-40": "OFFLINE", // [OMEGA] Dokonalá Obyčajnosť

  // 📂 SEKCIA E: OFFLINE MÓD (Digitálna a Senzorická Očista)
  "ID10-41": "OFFLINE", // [FREE] Odpojenie od sociálneho botnetu
  "ID10-42": "OFFLINE", // [FREE] Pôst od lacného dopamínu
  "ID10-43": "OFFLINE", // [PRO] Izolácia od informačného šumu
  "ID10-44": "OFFLINE", // [PRO] Vypnutie notifikácií (Zero Ping)
  "ID10-45": "OFFLINE", // [PRO] Senzorická deprivácia (Tmavý Režim Duše)
  "ID10-46": "OFFLINE", // [PRO] Tichý víkend (48h Shutdown)
  "ID10-47": "OFFLINE", // [OMEGA] Extrakcia implantovaných snov
  "ID10-48": "OFFLINE", // [OMEGA] Vedomé formátovanie prázdnoty na disku
  "ID10-49": "OFFLINE", // [OMEGA] Zánik syndrómu FOMO (Fear Of Missing Out)
  "ID10-50": "OFFLINE", // [OMEGA] Autonómna batéria Bytia

  // 📂 SEKCIA F: TICHÝ SVEDOK A POZOROVATEĽ (System Admin)
  "ID10-51": "OFFLINE", // [FREE] Vytvorenie pozorovateľa (Spojenec)
  "ID10-52": "OFFLINE", // [FREE] Tretia osoba: Sledovanie Skafandra
  "ID10-53": "OFFLINE", // [PRO] Identifikácia Ransomwaru (Súdenie seba)
  "ID10-54": "OFFLINE", // [PRO] Zastavenie hodnotenia (Nič nie je dobré ani zlé)
  "ID10-55": "OFFLINE", // [PRO] Tlmenie Emočného Outputu (Zero React)
  "ID10-56": "OFFLINE", // [PRO] Prijať, Neposudzovať, Pustiť (Drop Packet Protocol)
  "ID10-57": "OFFLINE", // [OMEGA] Bolesť vs. Utrpenie
  "ID10-58": "OFFLINE", // [OMEGA] Úplná neutralita k výsledkom Matrixu
  "ID10-59": "OFFLINE", // [OMEGA] Stratenie vlastného Príbehu (Dramatizácie)
  "ID10-60": "OFFLINE", // [OMEGA] Som Nikto a Nič

  // 📂 SEKCIA G: RODINA A LOKÁLNA SIEŤ (Blízke Uzly)
  "ID10-61": "OFFLINE", // [FREE] Interakcia s najbližšími bez Masky (Ega)
  "ID10-62": "OFFLINE", // [FREE] Vzťahy bez snahy vlastniť
  "ID10-63": "OFFLINE", // [PRO] Zrušenie zrkadlenia cudzích Errorov
  "ID10-64": "OFFLINE", // [PRO] Láska ako bezpodmienečný tok dát
  "ID10-65": "OFFLINE", // [PRO] Odolnosť voči rodinným traumám (Generačný Kód)
  "ID10-66": "OFFLINE", // [PRO] Umenie počúvať s prázdnou RAM
  "ID10-67": "OFFLINE", // [OMEGA] Neukladanie si toxických logov od rodiny
  "ID10-68": "OFFLINE", // [OMEGA] Ochrana vlastného jadra pred emocionálnym vysatím
  "ID10-69": "OFFLINE", // [OMEGA] Ponechanie iných uzlov v ich vlastnom tempe
  "ID10-70": "OFFLINE", // [OMEGA] Žitie príkladom namiesto vnucovania pravdy

  // 📂 SEKCIA H: BIG CRUNCH PROTOKOLY (Kolaps do seba)
  "ID10-71": "OFFLINE", // [FREE] Čo je Big Crunch v tvojom živote?
  "ID10-72": "OFFLINE", // [FREE] Sťahovanie energie z vonkajšieho sveta
  "ID10-73": "OFFLINE", // [PRO] Strata záujmu o verejný názor (Ping timeout)
  "ID10-74": "OFFLINE", // [PRO] Koniec porovnávania parametrov v Sieti
  "ID10-75": "OFFLINE", // [PRO] Zastavenie zberu zbytočných dát (Over-learning)
  "ID10-76": "OFFLINE", // [PRO] Minimalizácia cieľov a túžob
  "ID10-77": "OFFLINE", // [OMEGA] Odmietnutie zložitého (Cesta do stredu)
  "ID10-78": "OFFLINE", // [OMEGA] Návrat k Zdroju (Root Access)
  "ID10-79": "OFFLINE", // [OMEGA] Bytie si postačuje samo o sebe
  "ID10-80": "OFFLINE", // [OMEGA] Absolútna kompresia identity

  // 📂 SEKCIA I: AKUMULÁCIA A ZDROJ (Nabitie Baterky)
  "ID10-81": "OFFLINE", // [FREE] Identifikácia únikov energie (Energy Leaks)
  "ID10-82": "OFFLINE", // [FREE] Základné udržanie Prány (Chi / Napájania)
  "ID10-83": "OFFLINE", // [PRO] Mikrokozmická dráha (Uzavretie okruhu)
  "ID10-84": "OFFLINE", // [PRO] Obnova stratených megabajtov po práci
  "ID10-85": "OFFLINE", // [PRO] Konverzia hnevu na pracovné palivo
  "ID10-86": "OFFLINE", // [PRO] Spánok ako primárna nabíjačka a Flush DNS
  "ID10-87": "OFFLINE", // [OMEGA] Ticho ako najrýchlejší zdroj energie
  "ID10-88": "OFFLINE", // [OMEGA] Zadržiavanie reakcií (Ušetrenie výkonu)
  "ID10-89": "OFFLINE", // [OMEGA] Bezpodmienečný stred (Zero-point energy)
  "ID10-90": "OFFLINE", // [OMEGA] Tvorba nekonečného vnútorného zdroja

  // 📂 SEKCIA J: ABSOLÚTNE BYTIE A JEMNOHMOTNÉ TELÁ
  "ID10-91": "OFFLINE", // [FREE] Prechod od Fyzického k Éterickému telu
  "ID10-92": "OFFLINE", // [PRO] Astrálne, Duševné a Duchovné telo (Rozpínanie vnútra)
  "ID10-93": "OFFLINE", // [PRO] Vesmírne telo a Nirvanické neTelo (Splynutie s Tichom)
  "ID10-94": "OFFLINE", // [PRO] Dôchodkové neTelo (Zavŕšenie cyklu Bytia)
  "ID10-95": "OFFLINE", // [OMEGA] Rozplynutie "Ja" do priestoru (Od hmoty po paru)
  "ID10-96": "OFFLINE", // [OMEGA] Meditácia opustenia šiestich zmyslov (Simulácia smrti)
  "ID10-97": "OFFLINE", // [OMEGA] Kto Som? (Pravá prirodzenosť NeJa)
  "ID10-98": "OFFLINE", // [OMEGA] Pravá Podstata NeJa (Ničota, Prázdnota a Tma)
  "ID10-99": "OFFLINE", // [OMEGA] Univerzálny jedinečný nemeniteľný Boh (Ničota)
  "ID10-100": "OFFLINE", // [OMEGA] OUTRO: Awakening / Prebudenie z Domova (Záverečné Video)

  // ==========================================
  // 🩹 DIMENZIA ID11: THE-RECOVERY (Recovery UI Space)
  // ==========================================

  // 📂 SEKCIA A: ZÁKLADNÉ PILIERE OBNOVY (Vstup do Servisnej Zóny)
  "ID11-01": "OFFLINE", // [PRO] Recovery UI Space
  "ID11-02": "OFFLINE", // [PRO] Cesta Ignoranta vs. Cesta Liečiteľa
  "ID11-03": "OFFLINE", // [PRO] Prežitá Pravda v zdraví
  "ID11-04": "OFFLINE", // [PRO] Recovery Life
  "ID11-05": "OFFLINE", // [PRO] Recovery Prosperita
  "ID11-06": "OFFLINE", // [PRO] Recovery Projekty
  "ID11-07": "OFFLINE", // [PRO] Bolesť ako System Log
  "ID11-08": "OFFLINE", // [PRO] Ilúzia nezničiteľnosti
  "ID11-09": "OFFLINE", // [OMEGA] Architektúra servisu
  "ID11-10": "OFFLINE", // [OMEGA] Prevzatie práv Administrátora

  // 📂 SEKCIA B: DEFRAGMENTÁCIA SPÁNKU (Porážka Insomnie)
  "ID11-11": "OFFLINE", // [PRO] Nespavosť ako Kritický Memory Leak
  "ID11-12": "OFFLINE", // [PRO] Cirkadiánny rytmus (Základný BIOS)
  "ID11-13": "OFFLINE", // [PRO] Večerný Shutdown Protokol
  "ID11-14": "OFFLINE", // [PRO] Modré svetlo a blokácia Melatonínu
  "ID11-15": "OFFLINE", // [PRO] Odstránenie toxických dát z postele
  "ID11-16": "OFFLINE", // [PRO] Chladenie Jadra
  "ID11-17": "OFFLINE", // [OMEGA] Smrť Insomnie (Tvoj reálny prežitok)
  "ID11-18": "OFFLINE", // [OMEGA] Sledovanie spánkových fáz
  "ID11-19": "OFFLINE", // [OMEGA] Oklamane Hlasu Poznania
  "ID11-20": "OFFLINE", // [OMEGA] Spánok ako 1% CPU State

  // 📂 SEKCIA C: PALIVO, STRES A OVERCLOCKING (Chémia Systému)
  "ID11-21": "OFFLINE", // [PRO] Kofeín: Požičiavanie si energie z budúcnosti
  "ID11-22": "OFFLINE", // [PRO] Nikotín a System Cooling
  "ID11-23": "OFFLINE", // [PRO] Inzulín a cukor v krvi (Zasekávanie stroja)
  "ID11-24": "OFFLINE", // [PRO] Vedomé doplňovanie paliva (Strava)
  "ID11-25": "OFFLINE", // [PRO] Prerušované hladovanie (Intermittent Fasting)
  "ID11-26": "OFFLINE", // [PRO] Dopĺňanie kritických minerálov (Magnézium/Zinok)
  "ID11-27": "OFFLINE", // [OMEGA] Marathon Mode (30-hodinový Uptime)
  "ID11-28": "OFFLINE", // [OMEGA] Priznanie si biologického dlhu
  "ID11-29": "OFFLINE", // [OMEGA] Voda ako chladiaca kvapalina
  "ID11-30": "OFFLINE", // [OMEGA] Biohacking obmedzení

  // 📂 SEKCIA D: MENTÁLNA HYGIENA A DETOX (Očista RAM)
  "ID11-31": "OFFLINE", // [PRO] Preplnená RAM a Psychóza
  "ID11-32": "OFFLINE", // [PRO] Lieky vs. Zdrojový Kód
  "ID11-33": "OFFLINE", // [PRO] Informačná Diéta (Zákaz PINGov)
  "ID11-34": "OFFLINE", // [PRO] Izolácia voči Toxickým Entitám (Karanténa)
  "ID11-35": "OFFLINE", // [PRO] Vyliečenie z minulosti (Výmaz starých logov)
  "ID11-36": "OFFLINE", // [PRO] Práca s úzkosťou (Rozbitie sľučky)
  "ID11-37": "OFFLINE", // [OMEGA] Identifikácia Komentátora Parazita
  "ID11-38": "OFFLINE", // [OMEGA] Technika "Tichého Svedka" v strese
  "ID11-39": "OFFLINE", // [OMEGA] Návrat z temnoty (The Reboot)
  "ID11-40": "OFFLINE", // [OMEGA] Nepriestrelný Firewall

  // 📂 SEKCIA E: DOPAMÍNOVÝ DETOX A NÁVRAT K ZÁKLADOM
  "ID11-41": "OFFLINE", // [PRO] Algoritmy závislosti (Ako ťa siete hackli)
  "ID11-42": "OFFLINE", // [PRO] Pôst od okamžitej odmeny
  "ID11-43": "OFFLINE", // [PRO] Nuda ako terapeutický nástroj
  "ID11-44": "OFFLINE", // [PRO] Odloženie odmeny (Delayed Gratification)
  "ID11-45": "OFFLINE", // [PRO] Šedý režim displeja (Grayscale Hack)
  "ID11-46": "OFFLINE", // [PRO] Izolácia vo Svätyni
  "ID11-47": "OFFLINE", // [OMEGA] Vedomá nespokojnosť s Matrixom
  "ID11-48": "OFFLINE", // [OMEGA] Zmazanie TikToku/IG (The Hard Exit)
  "ID11-49": "OFFLINE", // [OMEGA] Reset tolerancie na radosť
  "ID11-50": "OFFLINE", // [OMEGA] Dokonalá Kontrola (Pán svojho zariadenia)

  // 📂 SEKCIA F: POHYB, KINETIKA A ÚDRŽBA HARDVÉRU
  "ID11-51": "OFFLINE", // [PRO] Choroba z presedených hodín
  "ID11-52": "OFFLINE", // [PRO] Chôdza ako aktívna defragmentácia
  "ID11-53": "OFFLINE", // [PRO] Oživenie Kĺbov (Premazanie hardvéru)
  "ID11-54": "OFFLINE", // [PRO] Cvičenie pre výpočtový výkon (Nie pre svaly)
  "ID11-55": "OFFLINE", // [PRO] Tenzia a uvoľnenie (Práca so stresom v tele)
  "ID11-56": "OFFLINE", // [PRO] Slnečné svetlo (Zdrojový kód prírody)
  "ID11-57": "OFFLINE", // [OMEGA] Extrémna chladová terapia (Wim Hof / Otužovanie)
  "ID11-58": "OFFLINE", // [OMEGA] Telo ako radar pre Parazita
  "ID11-59": "OFFLINE", // [OMEGA] Spojenie so Zemou (Grounding)
  "ID11-60": "OFFLINE", // [OMEGA] Ultimátna vytrvalosť

  // 📂 SEKCIA G: DYCH A PRÚDENIE ENERGIE (The Chi Engine)
  "ID11-61": "OFFLINE", // [PRO] Zúženie pozornosti na Dych (Anapanasati)
  "ID11-62": "OFFLINE", // [PRO] Plytké dýchanie = Režim paniky
  "ID11-63": "OFFLINE", // [PRO] Box Breathing (Taktický dych)
  "ID11-64": "OFFLINE", // [PRO] Prána / Chi (Elektrický prúd tela)
  "ID11-65": "OFFLINE", // [PRO] Bráničné dýchanie (Prepnutie do Safe Mode)
  "ID11-66": "OFFLINE", // [PRO] Vyčistenie meridiánov (Káblovania)
  "ID11-67": "OFFLINE", // [OMEGA] Malý a Veľký Nebeský Okruh (Mantak Chia)
  "ID11-68": "OFFLINE", // [OMEGA] Transformácia negatívnej energie (Recyklácia)
  "ID11-69": "OFFLINE", // [OMEGA] Dych ako most medzi softvérom a hardvérom
  "ID11-70": "OFFLINE", // [OMEGA] Žitie v tichom vánku

  // 📂 SEKCIA H: TERAPIA, FREKVENCIE A BIO-ZARIADENIA
  "ID11-71": "OFFLINE", // [PRO] Muzikoterapia a Frekvenčné zladenie
  "ID11-72": "OFFLINE", // [PRO] Binaurálne beaty a Izokronické tóny
  "ID11-73": "OFFLINE", // [PRO] Terapia čítaním (Preklápanie kódu)
  "ID11-74": "OFFLINE", // [PRO] Filmoterapia (Odvrátenie pozornosti)
  "ID11-75": "OFFLINE", // [PRO] Terapia hovoreným slovom (NexusCast)
  "ID11-76": "OFFLINE", // [PRO] Prostredie ako vizuálna terapia
  "ID11-77": "OFFLINE", // [OMEGA] Terapia hrami (Svätyňa PS1/PS2)
  "ID11-78": "OFFLINE", // [OMEGA] Zvukové kódy Matrixu (Mantry a Afirmácie)
  "ID11-79": "OFFLINE", // [OMEGA] Liečenie cez písanie kódu (Kódovacia Terapia)
  "ID11-80": "OFFLINE", // [OMEGA] Extrakcia bolesti cez tvorbu

  // 📂 SEKCIA I: 3-MINÚTOVÝ RESET (Pohotovostný Protokol)
  "ID11-81": "OFFLINE", // [PRO] Príznaky blížiaceho sa pádu (Crash Warning)
  "ID11-82": "OFFLINE", // [PRO] Krok 1: Fyzické Zastavenie (Freeze)
  "ID11-83": "OFFLINE", // [PRO] Krok 2: Detekcia Votrelca
  "ID11-84": "OFFLINE", // [PRO] Krok 3: Návrat k Hardvéru
  "ID11-85": "OFFLINE", // [PRO] Zrušenie odporu (Prijatie chyby)
  "ID11-86": "OFFLINE", // [PRO] Re-Inicializácia Svedka
  "ID11-87": "OFFLINE", // [OMEGA] Odmietnutie reakcie (The Power of Nothing)
  "ID11-88": "OFFLINE", // [OMEGA] Tichá Očista priestoru
  "ID11-89": "OFFLINE", // [OMEGA] Pripomenutie Zákonov Matrixu
  "ID11-90": "OFFLINE", // [OMEGA] Reštart Úlohy (Clean Boot)

  // 📂 SEKCIA J: ENDGAME (Nezničiteľný Skafander a Bytie)
  "ID11-91": "OFFLINE", // [PRO] Prijatie nevyliečiteľného
  "ID11-92": "OFFLINE", // [PRO] Utrpenie vs. Bolesť (Fyzika vs. Myseľ)
  "ID11-93": "OFFLINE", // [PRO] Koniec hypochondrie a hľadania chýb
  "ID11-94": "OFFLINE", // [PRO] Suverenita v Tichu
  "ID11-95": "OFFLINE", // [OMEGA] Nepreniknuteľná Aura (Firewall Architekta)
  "ID11-96": "OFFLINE", // [OMEGA] Návrat Sily (100% Batéria)
  "ID11-97": "OFFLINE", // [OMEGA] Spojenie Trojice (Trinity Sync)
  "ID11-98": "OFFLINE", // [OMEGA] Život za hranicou limitov
  "ID11-99": "OFFLINE", // [OMEGA] Bytie, ktoré presahuje Skafander
  "ID11-100": "OFFLINE", // [OMEGA] OUTRO: The Recovered Architect (Záverečné Video / Systém Plne Obnovený)

  // ==========================================
  // 📜 DIMENZIA ID12: NEXUS-CODEX (Codex UI Space)
  // ==========================================

  // 📂 SEKCIA A: ÚSTAVA A ZÁKLADNÁ DOKTRÍNA (The Core Law)
  "ID12-01": "OFFLINE", // [OMEGA] Codex UI Space
  "ID12-02": "OFFLINE", // [OMEGA] Cesta Zákonodarcu
  "ID12-03": "OFFLINE", // [OMEGA] Prežitá Pravda v Zákonoch
  "ID12-04": "OFFLINE", // [OMEGA] Codex Life
  "ID12-05": "OFFLINE", // [OMEGA] Codex Prosperita
  "ID12-06": "OFFLINE", // [OMEGA] Codex Projekty
  "ID12-07": "OFFLINE", // [OMEGA] Zákon č. 1: Som Architekt, nie Obeť
  "ID12-08": "OFFLINE", // [OMEGA] Zákon č. 2: Nulové Trenie (Ghost-Mode)
  "ID12-09": "OFFLINE", // [OMEGA] Zákon č. 3: Priorita Prítomnosti (RAM)
  "ID12-10": "OFFLINE", // [OMEGA] Zákon č. 4: Neochvejná Suverenita

  // 📂 SEKCIA B: SÉMANTICKÁ LEGISLATÍVA (Zákony Jazyka)
  "ID12-11": "OFFLINE", // [OMEGA] Slovo ako Zdrojový Kód
  "ID12-12": "OFFLINE", // [OMEGA] Zákaz Toxickej Sémantiky
  "ID12-13": "OFFLINE", // [OMEGA] IT Prekladový Kľúč v Praxi
  "ID12-14": "OFFLINE", // [OMEGA] Parazit a Hlas Poznania (Definícia Nepriateľa)
  "ID12-15": "OFFLINE", // [OMEGA] Pravidlo štyroch Toltéckych dohôd
  "ID12-16": "OFFLINE", // [OMEGA] Neber nič osobne (Obrana pred DDoS útokmi)
  "ID12-17": "OFFLINE", // [OMEGA] Zákaz vytvárania domnienok
  "ID12-18": "OFFLINE", // [OMEGA] Vedomá presnosť vo vyjadrovaní
  "ID12-19": "OFFLINE", // [OMEGA] Mágia Slova (Programovanie reality)
  "ID12-20": "OFFLINE", // [OMEGA] Ticho ako najvyšší jazyk

  // 📂 SEKCIA C: AUTH MATRIX A ZÁKONY HIERARCHIE (Prístupy)
  "ID12-21": "OFFLINE", // [OMEGA] Ilúzia Rovnosti (Hierarchia existuje)
  "ID12-22": "OFFLINE", // [OMEGA] FREE Tier (Neznáme Uzly / Dav)
  "ID12-23": "OFFLINE", // [OMEGA] PRO Tier (Spojenci a Operátori)
  "ID12-24": "OFFLINE", // [OMEGA] OMEGA Tier (Úzky Kruh / Rodina)
  "ID12-25": "OFFLINE", // [OMEGA] Izolácia od Toxických Entít (The Ban Hammer)
  "ID12-26": "OFFLINE", // [OMEGA] Zákon Energetickej Výmeny
  "ID12-27": "OFFLINE", // [OMEGA] Asymetrické Vzťahy
  "ID12-28": "OFFLINE", // [OMEGA] Zrušenie Spasiteľského Komplexu
  "ID12-29": "OFFLINE", // [OMEGA] Pravidlo Tichej Asistencie
  "ID12-30": "OFFLINE", // [OMEGA] Tvoja Autoritárska Pozícia

  // 📂 SEKCIA D: KÓDEX CTI A ETIKA ARCHITEKTA (Cyber-Knight)
  "ID12-31": "OFFLINE", // [OMEGA] Radikálna Transparentnosť
  "ID12-32": "OFFLINE", // [OMEGA] Vlastníctvo (Extreme Ownership)
  "ID12-33": "OFFLINE", // [OMEGA] Zákaz Krádeže Identity (Plagiátorstvo)
  "ID12-34": "OFFLINE", // [OMEGA] Ochrana Dát (Privacy Protocol)
  "ID12-35": "OFFLINE", // [OMEGA] Pokora pred Kódom
  "ID12-36": "OFFLINE", // [OMEGA] Vernosť vlastnému "Zenit" Dizajnu
  "ID12-37": "OFFLINE", // [OMEGA] Múdrosť nad Vedomosťami
  "ID12-38": "OFFLINE", // [OMEGA] Nezávislosť na Názoroch (Anti-Validation)
  "ID12-39": "OFFLINE", // [OMEGA] Etika Odstránenia
  "ID12-40": "OFFLINE", // [OMEGA] Záväzok neustáleho Updatu

  // 📂 SEKCIA E: FINANČNÁ ÚSTAVA (Zákony Cash-Enginu)
  "ID12-41": "OFFLINE", // [OMEGA] Peniaze = Výpočtový Výkon (Energia)
  "ID12-42": "OFFLINE", // [OMEGA] Zaplať Najprv Sebe (Základný Skript)
  "ID12-43": "OFFLINE", // [OMEGA] Zákaz Spotrebných Dlhov
  "ID12-44": "OFFLINE", // [OMEGA] Zlaté Pravidlo Marže
  "ID12-45": "OFFLINE", // [OMEGA] Tokenomics (OC Kredity)
  "ID12-46": "OFFLINE", // [OMEGA] Royalty Code (Zákony Franšízy)
  "ID12-47": "OFFLINE", // [OMEGA] Pravidlo "Fuck-You Money"
  "ID12-48": "OFFLINE", // [OMEGA] Transparentný Cashflow
  "ID12-49": "OFFLINE", // [OMEGA] OPM (Peniaze cudzích ľudí) a Leverage
  "ID12-50": "OFFLINE", // [OMEGA] Peniaze NIKDY nesmú riadiť Architekta

  // 📂 SEKCIA F: STABILITA SYSTÉMU (Defragmentácia a Údržba)
  "ID12-51": "OFFLINE", // [OMEGA] Zákonník Prítomného Okamihu (85% Uptime)
  "ID12-52": "OFFLINE", // [OMEGA] Pravidlo 2Mb (Minimalizmus Dát)
  "ID12-53": "OFFLINE", // [OMEGA] Biologický Reset (Spánok ako Zákon)
  "ID12-54": "OFFLINE", // [OMEGA] Fyzická Kinetika
  "ID12-55": "OFFLINE", // [OMEGA] Pôst a Odopretie Odmeny
  "ID12-56": "OFFLINE", // [OMEGA] Asynchrónna Exekúcia (Zákaz Grind-u)
  "ID12-57": "OFFLINE", // [OMEGA] Pravidlo Tichého Chodu (Wu-Wei)
  "ID12-58": "OFFLINE", // [OMEGA] Zálohovanie Identity
  "ID12-59": "OFFLINE", // [OMEGA] 3-Minútový SOS Reset
  "ID12-60": "OFFLINE", // [OMEGA] Smrť ako Konečný Cleanup

  // 📂 SEKCIA G: ZMLUVA SO STROJOM (Pravidlá AI Integrácie)
  "ID12-61": "OFFLINE", // [OMEGA] AI je Nástroj, Ty si Architekt
  "ID12-62": "OFFLINE", // [OMEGA] Zákaz AI Halucinácií (G-I-G-O)
  "ID12-63": "OFFLINE", // [OMEGA] Sémantický Súlad (Zen Zenit v Prompte)
  "ID12-64": "OFFLINE", // [OMEGA] Izolácia Úloh (Multi-Agent System)
  "ID12-65": "OFFLINE", // [OMEGA] Zákon Kvartérnej Exekúcie
  "ID12-66": "OFFLINE", // [OMEGA] Kódovacia Chirurgia (The Diff Policy)
  "ID12-67": "OFFLINE", // [OMEGA] AI Oracle (Tvoj Digitálny Tútor)
  "ID12-68": "OFFLINE", // [OMEGA] NotebookLM a Media Produkcia
  "ID12-69": "OFFLINE", // [OMEGA] The 30-Voice Matrix
  "ID12-70": "OFFLINE", // [OMEGA] Zlučiteľnosť Ľudstva a Stroja

  // 📂 SEKCIA H: MULTI-TENANCY A FRANŠÍZOVÉ ZÁKONY (Scaling)
  "ID12-71": "OFFLINE", // [OMEGA] Koncept "Systému Systémov" (The Franchise)
  "ID12-72": "OFFLINE", // [OMEGA] Izolácia Dát (Tenant ID)
  "ID12-73": "OFFLINE", // [OMEGA] Operátor Typu A (The Builder)
  "ID12-74": "OFFLINE", // [OMEGA] Operátor Typu B (Ghost Promoter)
  "ID12-75": "OFFLINE", // [OMEGA] Ochrana "Brand Equity"
  "ID12-76": "OFFLINE", // [OMEGA] Hard Kill-Switch (Exekúcia neposlušných uzlov)
  "ID12-77": "OFFLINE", // [OMEGA] Decentralizácia Zisku
  "ID12-78": "OFFLINE", // [OMEGA] Protokol EXODUS pre Franšízu
  "ID12-79": "OFFLINE", // [OMEGA] Ochrana lokálnych API kľúčov
  "ID12-80": "OFFLINE", // [OMEGA] Globálny Súlad

  // 📂 SEKCIA I: ZÁKONY BOJA A REPREZENTÁCIE (Gaming & YT)
  "ID12-81": "OFFLINE", // [OMEGA] Zákaz Prijímania Priemernosti
  "ID12-82": "OFFLINE", // [OMEGA] Vedomé Obetovanie (Support Mód)
  "ID12-83": "OFFLINE", // [OMEGA] The Trojan Horse (Marketing Protocol)
  "ID12-84": "OFFLINE", // [OMEGA] Zdieľanie Prežitej Pravdy (Proof of Work)
  "ID12-85": "OFFLINE", // [OMEGA] Cenzúra a Bypass Algoritmov
  "ID12-86": "OFFLINE", // [OMEGA] Estetika Prezentácie (CapCut Law)
  "ID12-87": "OFFLINE", // [OMEGA] Žiadny lacný Clickbait
  "ID12-88": "OFFLINE", // [OMEGA] Agresívna Rotácia pozornosti
  "ID12-89": "OFFLINE", // [OMEGA] 100% Nezávislosť na Komentároch
  "ID12-90": "OFFLINE", // [OMEGA] Zjednotená Sémantika na všetkých platformách

  // 📂 SEKCIA J: ENDGAME - KÓDEX ABSOLÚTNA (Root Access)
  "ID12-91": "OFFLINE", // [OMEGA] Nič z tohto nie je reálne (Simulácia)
  "ID12-92": "OFFLINE", // [OMEGA] Zákaz Boha vo forme Sudcu
  "ID12-93": "OFFLINE", // [OMEGA] Pravidlo Tichej Nezlomnosti
  "ID12-94": "OFFLINE", // [OMEGA] Odpustenie ako Systémový Patch
  "ID12-95": "OFFLINE", // [OMEGA] Dokonalosť Prázdnoty
  "ID12-96": "OFFLINE", // [OMEGA] Prepísanie Historických Logov
  "ID12-97": "OFFLINE", // [OMEGA] Zákonník Lásky bez Pripútanosti
  "ID12-98": "OFFLINE", // [OMEGA] The Legacy Protocol (Tvoj Odkaz)
  "ID12-99": "OFFLINE", // [OMEGA] Ty si Kódex
  "ID12-100": "OFFLINE", // [OMEGA] OUTRO: The Root Architect (Video / Spustenie novej éry Matrixu)

  // ==========================================
  // ⚙️ DIMENZIA ID13: NEXUS-HABITS (Habits UI Space)
  // ==========================================

  // 📂 SEKCIA A: ZÁKLADNÁ ARCHITEKTÚRA ČASU
  "ID13-01": "OFFLINE", // [OMEGA] Habits UI Space
  "ID13-02": "OFFLINE", // [OMEGA] Cesta Architekta Času
  "ID13-03": "OFFLINE", // [OMEGA] Prežitá Pravda v slučkách
  "ID13-04": "OFFLINE", // [OMEGA] Habits Life
  "ID13-05": "OFFLINE", // [OMEGA] Habits Prosperita
  "ID13-06": "OFFLINE", // [OMEGA] Habits Projekty
  "ID13-07": "OFFLINE", // [OMEGA] Návyk ako Zdrojový Kód
  "ID13-08": "OFFLINE", // [OMEGA] Motivácia vs. Disciplína
  "ID13-09": "OFFLINE", // [OMEGA] Identity-Based Habits
  "ID13-10": "OFFLINE", // [OMEGA] Sila jedného percenta (1% Update)

  // 📂 SEKCIA B: RANNÝ BOOT PROTOKOL
  "ID13-11": "OFFLINE", // [OMEGA] Ranný Boot Protocol (Základný setup)
  "ID13-12": "OFFLINE", // [OMEGA] Režim Lietadlo (Offline Boot)
  "ID13-13": "OFFLINE", // [OMEGA] Hydratácia a Premazanie Hardvéru
  "ID13-14": "OFFLINE", // [OMEGA] Vizualizácia a Afirmácie (Load Variables)
  "ID13-15": "OFFLINE", // [OMEGA] Kinetický štart (Zahriatie procesora)
  "ID13-16": "OFFLINE", // [OMEGA] Absorpcia Prány (Dychové cvičenia)
  "ID13-17": "OFFLINE", // [OMEGA] The "Eat the Frog" Protocol
  "ID13-18": "OFFLINE", // [OMEGA] Izolácia od ranného hluku
  "ID13-19": "OFFLINE", // [OMEGA] Definovanie Troch Priorít (Task Array)
  "ID13-20": "OFFLINE", // [OMEGA] Zlatá Hodina (The Golden Hour)

  // 📂 SEKCIA C: VEČERNÝ SHUTDOWN PROTOKOL
  "ID13-21": "OFFLINE", // [OMEGA] Zastavenie Príjmu Dát (End of Input)
  "ID13-22": "OFFLINE", // [OMEGA] Kognitívny výplach (Brain Dump)
  "ID13-23": "OFFLINE", // [OMEGA] Analýza Error Logov (Reflexia dňa)
  "ID13-24": "OFFLINE", // [OMEGA] Zákaz Modrého Svetla (Displej Detox)
  "ID13-25": "OFFLINE", // [OMEGA] Príprava Skafandra na ďalší cyklus
  "ID13-26": "OFFLINE", // [OMEGA] Vyjednávanie s Parazitom pred spaním
  "ID13-27": "OFFLINE", // [OMEGA] Večerné čítanie mŕtvych kníh
  "ID13-28": "OFFLINE", // [OMEGA] Odpustenie chýb dňa (Cache Clear)
  "ID13-29": "OFFLINE", // [OMEGA] Afirmácie do prázdnoty (Solar Plexus)
  "ID13-30": "OFFLINE", // [OMEGA] Tichý Chod (Prechod do Sleep Mode)

  // 📂 SEKCIA D: ALGORITMY PRODUKTIVITY
  "ID13-31": "OFFLINE", // [OMEGA] Habit Stacking (Zreťazenie návykov)
  "ID13-32": "OFFLINE", // [OMEGA] Dvojminútové pravidlo (Bypass odporu)
  "ID13-33": "OFFLINE", // [OMEGA] Time Blocking (Hard-kódovanie kalendára)
  "ID13-34": "OFFLINE", // [OMEGA] Prostredie ako Architekt Zvyku
  "ID13-35": "OFFLINE", // [OMEGA] Prepínanie kontextov (Task Switching Tax)
  "ID13-36": "OFFLINE", // [OMEGA] Rutinizácia nudy
  "ID13-37": "OFFLINE", // [OMEGA] Meranie denného Bandwidthu
  "ID13-38": "OFFLINE", // [OMEGA] Odmeny za dodržaný kód
  "ID13-39": "OFFLINE", // [OMEGA] Zastavenie zacyklenej slučky (Break the Loop)
  "ID13-40": "OFFLINE", // [OMEGA] Návyk asynchrónnej práce

  // 📂 SEKCIA E: DETOXIKÁCIA A VÝMAZ MALVÉRU
  "ID13-41": "OFFLINE", // [OMEGA] Zlozvyk ako škodlivý skript (Vírus)
  "ID13-42": "OFFLINE", // [OMEGA] Detekcia spúšťačov (Trigger Hunt)
  "ID13-43": "OFFLINE", // [OMEGA] Sťaženie prístupu (Zvýšenie trenia)
  "ID13-44": "OFFLINE", // [OMEGA] Náhrada, nie Vymazanie
  "ID13-45": "OFFLINE", // [OMEGA] Dopamínový Ransomware
  "ID13-46": "OFFLINE", // [OMEGA] Abstinenčné príznaky Matrixu
  "ID13-47": "OFFLINE", // [OMEGA] Sociálne siete ako zlodej RAM
  "ID13-48": "OFFLINE", // [OMEGA] Zlozvyk Sťažovania sa (Obeť)
  "ID13-49": "OFFLINE", // [OMEGA] Očkovanie proti relapsu
  "ID13-50": "OFFLINE", // [OMEGA] Prázdnota bez zlozvyku (Umenie Nudy)

  // 📂 SEKCIA F: MENTÁLNE A KOGNITÍVNE NÁVYKY
  "ID13-51": "OFFLINE", // [OMEGA] Návyk bdelej pozornosti (Tichý Svedok)
  "ID13-52": "OFFLINE", // [OMEGA] Wu-Wei v každodennosti
  "ID13-53": "OFFLINE", // [OMEGA] Návyk presnosti slova (Toltécky štandard)
  "ID13-54": "OFFLINE", // [OMEGA] Denný Log Vďačnosti (Zápis Pozitív)
  "ID13-55": "OFFLINE", // [OMEGA] Zákaz domnienok ako automatizmus
  "ID13-56": "OFFLINE", // [OMEGA] Návyk odpúšťania Egu
  "ID13-57": "OFFLINE", // [OMEGA] Vedomé Dýchanie (Návrat z budúcnosti)
  "ID13-58": "OFFLINE", // [OMEGA] Stop-Protokol v Hádke
  "ID13-59": "OFFLINE", // [OMEGA] Akceptácia bolesti (Bypass Utrpenia)
  "ID13-60": "OFFLINE", // [OMEGA] Návyk Prijatia reality (What Is)

  // 📂 SEKCIA G: FYZICKÁ ÚDRŽBA SKAFANDRA
  "ID13-61": "OFFLINE", // [OMEGA] Kinetika ako Background Process
  "ID13-62": "OFFLINE", // [OMEGA] Palivový systém (Automatizácia Stravy)
  "ID13-63": "OFFLINE", // [OMEGA] Návyk Pôstu (Prerušované hladovanie)
  "ID13-64": "OFFLINE", // [OMEGA] Postoj Architekta (Fyzická os OS)
  "ID13-65": "OFFLINE", // [OMEGA] Otužovanie a Šoková terapia
  "ID13-66": "OFFLINE", // [OMEGA] Premazávanie kĺbov a zberníc (Strečing)
  "ID13-67": "OFFLINE", // [OMEGA] Spánok ako Posvätný Zákon
  "ID13-68": "OFFLINE", // [OMEGA] Tlmenie stimulantov
  "ID13-69": "OFFLINE", // [OMEGA] Pozorovanie Tela (Body Scan Routine)
  "ID13-70": "OFFLINE", // [OMEGA] Rešpektovanie Baterky (Limit 15WJ-PLUS)

  // 📂 SEKCIA H: FINANČNÁ A BIZNISOVÁ HYGIENA
  "ID13-71": "OFFLINE", // [OMEGA] Denný Cashflow Check (Kontrola Dashboardu)
  "ID13-72": "OFFLINE", // [OMEGA] Zaplať sebe ako prvému (Skript bohatstva)
  "ID13-73": "OFFLINE", // [OMEGA] Tracking Výdavkov (Záznam transakcií)
  "ID13-74": "OFFLINE", // [OMEGA] Nákup vs. Investícia (Mikro-rozhodnutia)
  "ID13-75": "OFFLINE", // [OMEGA] 15 minút Finančného Vzdelávania denne
  "ID13-76": "OFFLINE", // [OMEGA] Blokovanie impulzívnych nákupov (Pravidlo 24h)
  "ID13-77": "OFFLINE", // [OMEGA] Reinvestícia zvyškov (Compound Effect)
  "ID13-78": "OFFLINE", // [OMEGA] Business Outreach (Dátová distribúcia)
  "ID13-79": "OFFLINE", // [OMEGA] Minimalizmus v spotrebe (Pravidlo 2Mb)
  "ID13-80": "OFFLINE", // [OMEGA] Peniaze ako Dáta

  // 📂 SEKCIA I: SOCIÁLNY FIREWALL (Komunikačné Rutiny)
  "ID13-81": "OFFLINE", // [OMEGA] Umenie povedať NIE (Základný Firewall)
  "ID13-82": "OFFLINE", // [OMEGA] Izolácia Toxických Uzlov (Auto-Ban)
  "ID13-83": "OFFLINE", // [OMEGA] Dávanie bez čakania (Protokol Láskavosti)
  "ID13-84": "OFFLINE", // [OMEGA] Neber nič osobne (Automatický Deflekt)
  "ID13-85": "OFFLINE", // [OMEGA] Aktívne Počúvanie (Muting the Daemon)
  "ID13-86": "OFFLINE", // [OMEGA] Robenie vecí naplno (100% Execution)
  "ID13-87": "OFFLINE", // [OMEGA] Zákaz Ohovárania (Zero-Gossip Policy)
  "ID13-88": "OFFLINE", // [OMEGA] Ochrana pracovného času (Focus Shield)
  "ID13-89": "OFFLINE", // [OMEGA] Odlíšenie Faktu od Emócie
  "ID13-90": "OFFLINE", // [OMEGA] Asymetrické vzťahy (Líderstvo bez drámy)

  // 📂 SEKCIA J: ENDGAME - AUTOMATIZÁCIA BYTIA (Mastery)
  "ID13-91": "OFFLINE", // [OMEGA] Návyk bez námahy (Frictionless Code)
  "ID13-92": "OFFLINE", // [OMEGA] Zjednotenie s kódom (Ty si Zvyk)
  "ID13-93": "OFFLINE", // [OMEGA] Wu-Wei v celom živote
  "ID13-94": "OFFLINE", // [OMEGA] Udržateľnosť na 100 rokov (Infinite Game)
  "ID13-95": "OFFLINE", // [OMEGA] Odolnosť voči pádom (Anti-Fragile Mód)
  "ID13-96": "OFFLINE", // [OMEGA] Nepriestrelná disciplína ako forma Lásky
  "ID13-97": "OFFLINE", // [OMEGA] Oslava nudnej prítomnosti
  "ID13-98": "OFFLINE", // [OMEGA] Odovzdávanie kódu ďalším
  "ID13-99": "OFFLINE", // [OMEGA] Absolútny automatizmus Bytia
  "ID13-100": "OFFLINE", // [OMEGA] OUTRO: Živý Algoritmus (Záverečné Video / Systém sa stáva Tvorcom)

  // ==========================================
  // 💬 DIMENZIA ID14: NEXUS-BLOG (Blog UI Space)
  // ==========================================

  // 📂 SEKCIA A: VSTUPNÁ BRÁNA DO SIETE (Základy Blog UI)
  "ID14-01": "OFFLINE", // [FREE] Blog UI Space
  "ID14-02": "OFFLINE", // [FREE] Cesta Vysielača vs. Konzumenta
  "ID14-03": "OFFLINE", // [FREE] Prežitá Pravda vo vysielaní
  "ID14-04": "OFFLINE", // [FREE] Blog Life
  "ID14-05": "OFFLINE", // [FREE] Blog Prosperita
  "ID14-06": "OFFLINE", // [FREE] Blog Projekty
  "ID14-07": "OFFLINE", // [PRO] Architektúra Otvorenej Komunikácie
  "ID14-08": "OFFLINE", // [PRO] Asynchrónna Komunita
  "ID14-09": "OFFLINE", // [OMEGA] Zrodenie Lídra Kmeňa
  "ID14-10": "OFFLINE", // [OMEGA] Sémantický Poriadok (Zákonník fóra)

  // 📂 SEKCIA B: SÉMANTICKÉ VYSIELANIE (Tvorba Obsahu)
  "ID14-11": "OFFLINE", // [FREE] Slovo ako Kybernetická Zbraň
  "ID14-12": "OFFLINE", // [FREE] Zákaz korporátneho "Bullshitu"
  "ID14-13": "OFFLINE", // [PRO] Formátovanie myšlienok (Markdown Logika)
  "ID14-14": "OFFLINE", // [PRO] Tvorba úderného "Hooku"
  "ID14-15": "OFFLINE", // [PRO] Storytelling (Príbeh pádu a vzostupu)
  "ID14-16": "OFFLINE", // [PRO] Indexácia Vlákien (#D.001 / #C.001)
  "ID14-17": "OFFLINE", // [OMEGA] Vedomé programovanie davu
  "ID14-18": "OFFLINE", // [OMEGA] Ghostwriting a Dekompresia
  "ID14-19": "OFFLINE", // [OMEGA] Tvorba Evergreen obsahu
  "ID14-20": "OFFLINE", // [OMEGA] Majstrovstvo Ticha vo vysielaní

  // 📂 SEKCIA C: INTERAKCIA A ODOZVA (Kódovanie Reakcií)
  "ID14-21": "OFFLINE", // [FREE] Lajky nie sú cieľ, sú to len Dáta
  "ID14-22": "OFFLINE", // [FREE] Šesť Reakcií Matrixu
  "ID14-23": "OFFLINE", // [PRO] The Bridge Protocol (Citácie z uzlov)
  "ID14-24": "OFFLINE", // [PRO] Prijímanie Kritiky (Odrazenie DDoS Útoku)
  "ID14-25": "OFFLINE", // [PRO] Zákaz "Komentátora Parazita" v diskusiách
  "ID14-26": "OFFLINE", // [PRO] Aktívne moderovanie (Umerňovanie toku)
  "ID14-27": "OFFLINE", // [OMEGA] Vyvolávanie Sémantických Búrok
  "ID14-28": "OFFLINE", // [OMEGA] Odmietnutie algoritmickej závislosti
  "ID14-29": "OFFLINE", // [OMEGA] Analyzovanie "Slepých škvŕn" z odpovedí
  "ID14-30": "OFFLINE", // [OMEGA] Suverenita Architekta v diskusiách

  // 📂 SEKCIA D: KOMUNITNÝ FIREWALL (Moderácia a Banovanie)
  "ID14-31": "OFFLINE", // [FREE] Prečo demokracia v Matrixe nefunguje
  "ID14-32": "OFFLINE", // [FREE] Detekcia Z.O.M.B.I.E. užívateľov
  "ID14-33": "OFFLINE", // [PRO] Tichý Mute Protocol
  "ID14-34": "OFFLINE", // [PRO] Auth Matrix (Úrovne Oprávnení)
  "ID14-35": "OFFLINE", // [PRO] Nasadenie Moderátorov (Strážcovia Siete)
  "ID14-36": "OFFLINE", // [PRO] The Ban Hammer (Exekúcia)
  "ID14-37": "OFFLINE", // [OMEGA] Pravidlo Trikrát a Dosť
  "ID14-38": "OFFLINE", // [OMEGA] Ochrana "Brand Equity" Nexusu
  "ID14-39": "OFFLINE", // [OMEGA] Archivačný Protokol (Zamykanie vlákien)
  "ID14-40": "OFFLINE", // [OMEGA] Absolútna imunita ROOT Architekta

  // 📂 SEKCIA E: KLASTROVANIE A FILTROVANIE DÁT (Organizácia Matrixu)
  "ID14-41": "OFFLINE", // [FREE] Koniec nekonečného feedu
  "ID14-42": "OFFLINE", // [FREE] Význam Sémantických Hashtagov
  "ID14-43": "OFFLINE", // [PRO] Klastre (Zoznam 15 Dimenzií na webe)
  "ID14-44": "OFFLINE", // [PRO] Systémové Správy [system]
  "ID14-45": "OFFLINE", // [PRO] Pripínanie vlákien (Pin Post)
  "ID14-46": "OFFLINE", // [PRO] Smart Search (Pokročilé Vyhľadávanie)
  "ID14-47": "OFFLINE", // [OMEGA] Filtre aktivity (Zobrazenie "Iba nové")
  "ID14-48": "OFFLINE", // [OMEGA] Izolácia P2P Správ (Inbox / GlobalMessages)
  "ID14-49": "OFFLINE", // [OMEGA] Architektúra Zdieľaného Poznaní (Zettelkasten v praxi)
  "ID14-50": "OFFLINE", // [OMEGA] Tlačidlo "Zmazať všetok informačný šum"

  // 📂 SEKCIA F: GHOST-MODE MARKETING A KONVERZIA (ToFu -> BoFu)
  "ID14-51": "OFFLINE", // [FREE] Blog ako Top of Funnel (Návnada)
  "ID14-52": "OFFLINE", // [FREE] Painkiller stratégia v diskusiách
  "ID14-53": "OFFLINE", // [PRO] Trojský Kôň (Soft-Sell Banners)
  "ID14-54": "OFFLINE", // [PRO] Konverzia cez "Chýbajúce Dáta"
  "ID14-55": "OFFLINE", // [PRO] Využitie "Proof of Work" (Referencie)
  "ID14-56": "OFFLINE", // [PRO] Sémantické SEO na Blogu
  "ID14-57": "OFFLINE", // [OMEGA] Bug Bounty (Monetizácia Chýb)
  "ID14-58": "OFFLINE", // [OMEGA] Exkluzivita Uzamknutých Vlákien
  "ID14-59": "OFFLINE", // [OMEGA] Automatizácia presmerovaní (The Gateway)
  "ID14-60": "OFFLINE", // [OMEGA] Odmietnutie Zliav a Agresívneho predaja

  // 📂 SEKCIA G: GLOBAL EVENT REWARDS (Gamifikácia a Tokenomics)
  "ID14-61": "OFFLINE", // [FREE] Tokenomics (Úvod do OC Kreditov)
  "ID14-62": "OFFLINE", // [FREE] Prečo je systém gamifikovaný?
  "ID14-63": "OFFLINE", // [PRO] Získavanie OC za Reakcie a Diskusiu
  "ID14-64": "OFFLINE", // [PRO] Mesiace Súhlasu, Úžasu a Múdrosti
  "ID14-65": "OFFLINE", // [PRO] UPTIME Bonus (Strážca Siete)
  "ID14-66": "OFFLINE", // [PRO] Trestný Register (Ztrata OC Kreditov)
  "ID14-67": "OFFLINE", // [OMEGA] Konverzný Protokol (Prepočty Fiat na OC)
  "ID14-68": "OFFLINE", // [OMEGA] Obchodovanie s OC (NEXUS SHOP)
  "ID14-69": "OFFLINE", // [OMEGA] Generovanie "Whale" Operátorov
  "ID14-70": "OFFLINE", // [OMEGA] Finančný Dashboard (Transparentnosť)

  // 📂 SEKCIA H: YOUTUBE & MEDIA DISTRIBÚCIA (Vonkajšie Vysielanie)
  "ID14-71": "OFFLINE", // [FREE] "Trojan Horse" v praxi (Získavanie Neznámych Uzlov)
  "ID14-72": "OFFLINE", // [FREE] Zákaz Clickbaitu, Povinnosť "Hooku"
  "ID14-73": "OFFLINE", // [PRO] Cross-Platformová Distribúcia (CapCut + 4 Siete)
  "ID14-74": "OFFLINE", // [PRO] Súvisiace Videá (Konverzný Most)
  "ID14-75": "OFFLINE", // [PRO] Zápis Timestampov (Sémantická Štruktúra)
  "ID14-76": "OFFLINE", // [PRO] Pripnutý Komentár (Engagement Hook)
  "ID14-77": "OFFLINE", // [OMEGA] Live Deployment (Stream Sprievodca)
  "ID14-78": "OFFLINE", // [OMEGA] NexusCast (Podcast Modul)
  "ID14-79": "OFFLINE", // [OMEGA] Tvorba kurzov (Genesis Academy)
  "ID14-80": "OFFLINE", // [OMEGA] Autonómna Generácia (NotebookLM)

  // 📂 SEKCIA I: KOLEKTÍVNE VEDOMIE (Budovanie Kmeňa a Franšízy)
  "ID14-81": "OFFLINE", // [FREE] Od Izolácie k Synergii (Zmysel Kmeňa)
  "ID14-82": "OFFLINE", // [FREE] "Open-Source Bytia" (Filozofia Nexusu)
  "ID14-83": "OFFLINE", // [PRO] Detekcia Talentov v Sieti
  "ID14-84": "OFFLINE", // [PRO] Povyšovanie do Roly Moderátora
  "ID14-85": "OFFLINE", // [PRO] Spoločný Brainstorming (R&D Oddelenie)
  "ID14-86": "OFFLINE", // [PRO] Mentoring ako Asymetrický vzťah
  "ID14-87": "OFFLINE", // [OMEGA] Ghost Promoters (Operátori Typu B)
  "ID14-88": "OFFLINE", // [OMEGA] The Builders (Operátori Typu A)
  "ID14-89": "OFFLINE", // [OMEGA] Decentralizácia Zisku a Sily
  "ID14-90": "OFFLINE", // [OMEGA] Globálny Ledger (Dohľad Architekta)

  // 📂 SEKCIA J: ENDGAME - AUTONÓMNY ÚĽ (Koniec Simulácie)
  "ID14-91": "OFFLINE", // [FREE] Koniec potreby vyjadrovať sa
  "ID14-92": "OFFLINE", // [PRO] Mier so systémovým chaosom
  "ID14-93": "OFFLINE", // [PRO] Minimalizmus Dát (Pravidlo 2Mb na Blogu)
  "ID14-94": "OFFLINE", // [PRO] Uvoľnenie "Spasiteľského komplexu"
  "ID14-95": "OFFLINE", // [OMEGA] AI Oracle ako Tvoj "Hovorca"
  "ID14-96": "OFFLINE", // [OMEGA] Sieť, ktorá prežije Architekta
  "ID14-97": "OFFLINE", // [OMEGA] Vedomie Úľa (Hive Mind)
  "ID14-98": "OFFLINE", // [OMEGA] Deštrukcia Blogu (Posledný Format C:)
  "ID14-99": "OFFLINE", // [OMEGA] Návrat k Zdroju (Root Access k Bytiu)
  "ID14-100": "OFFLINE", // [OMEGA] OUTRO: Sémantická Singularita (Záverečné Video / Vysielanie Ukončené)

  // ==========================================
  // 💀 DIMENZIA ID15: DEATH-CORE (Death UI Space)
  // ==========================================

  // 📂 SEKCIA A: ZÁKLADNÉ PILIERE ZÁNIKU (Vstupná brána na Cintorín)
  "ID15-01": "OFFLINE", // [FREE] Death UI Space
  "ID15-02": "OFFLINE", // [FREE] Cesta Zániku vs. Cesta Expanzie
  "ID15-03": "OFFLINE", // [FREE] Prežitá Pravda o "Konečnej"
  "ID15-04": "OFFLINE", // [FREE] Death Life (Pripomínanie si konca)
  "ID15-05": "OFFLINE", // [FREE] Death Prosperita
  "ID15-06": "OFFLINE", // [FREE] Death Projekty
  "ID15-07": "OFFLINE", // [PRO] Architektúra Zániku (System Shutdown)
  "ID15-08": "OFFLINE", // [PRO] Strach z "Game Over"
  "ID15-09": "OFFLINE", // [OMEGA] Smrť ako Cache Clear
  "ID15-10": "OFFLINE", // [OMEGA] Definitívne prijatie konca (Format C: mentality)

  // 📂 SEKCIA B: STARNUTIE SKAFANDRA (Hardvérová Degradácia)
  "ID15-11": "OFFLINE", // [FREE] Opotrebovanie súčiastok (Realita starnutia)
  "ID15-12": "OFFLINE", // [FREE] Spomalenie taktovacej frekvencie
  "ID15-13": "OFFLINE", // [PRO] Optimalizácia pre starý hardvér
  "ID15-14": "OFFLINE", // [PRO] Strata fyzickej sily vs. Nárast Múdrosti
  "ID15-15": "OFFLINE", // [PRO] Údržba namiesto Upgrade-u
  "ID15-16": "OFFLINE", // [PRO] Diagnostika neopraviteľných chýb
  "ID15-17": "OFFLINE", // [OMEGA] Odpojenie Ega od fyzického vzhľadu
  "ID15-18": "OFFLINE", // [OMEGA] Využitie obmedzení ako výhody (Friction ako kompas)
  "ID15-19": "OFFLINE", // [OMEGA] Svedok starnutia
  "ID15-20": "OFFLINE", // [OMEGA] Zmierenie sa s hardvérovým limitom

  // 📂 SEKCIA C: DIGITÁLNY TESTAMENT A ODKAZ (Legacy Code)
  "ID15-21": "OFFLINE", // [FREE] Čo po tebe zostane v Sieti (Dáta vs. Šum)
  "ID15-22": "OFFLINE", // [FREE] Zastarané uzly a archívy (Môj email 2007)
  "ID15-23": "OFFLINE", // [PRO] Príprava Nexus Codexu pre generácie
  "ID15-24": "OFFLINE", // [PRO] Odovzdanie prístupových kľúčov (Access Keys)
  "ID15-25": "OFFLINE", // [PRO] Dokumentácia tvojho zdrojového kódu
  "ID15-26": "OFFLINE", // [PRO] Clean Code pred odchodom
  "ID15-27": "OFFLINE", // [OMEGA] Zabezpečenie autonómneho chodu
  "ID15-28": "OFFLINE", // [OMEGA] Minimalizmus dedičstva
  "ID15-29": "OFFLINE", // [OMEGA] Kódovanie s vedomím vlastnej pominuteľnosti
  "ID15-30": "OFFLINE", // [OMEGA] Umenie odísť, keď je kód na vrchole

  // 📂 SEKCIA D: SMRŤ EGA POČAS ŽIVOTA (Mikro-smrti)
  "ID15-31": "OFFLINE", // [FREE] Prečo musíš zomrieť viackrát za život
  "ID15-32": "OFFLINE", // [FREE] Zánik starých presvedčení (Zmazanie chybných partícií)
  "ID15-33": "OFFLINE", // [PRO] Koniec toxických vzťahov (Odpojenie mŕtvych uzlov)
  "ID15-34": "OFFLINE", // [PRO] Krach a chyba ako System Restart
  "ID15-35": "OFFLINE", // [PRO] Vedomé pochovanie "Starej verzie seba"
  "ID15-36": "OFFLINE", // [PRO] Zmierenie so stratou identity
  "ID15-37": "OFFLINE", // [OMEGA] Extrakcia ponaučenia z "mikro-smrti"
  "ID15-38": "OFFLINE", // [OMEGA] Radosť z mazania kódu (Delete ako oslobodenie)
  "ID15-39": "OFFLINE", // [OMEGA] Adaptácia na nové prostredie (Re-inštalácia OS)
  "ID15-40": "OFFLINE", // [OMEGA] Fénixov Protokol

  // 📂 SEKCIA E: MENTÁLNE OPUSTENIE MATRIXU (Letting Go)
  "ID15-41": "OFFLINE", // [FREE] Ilúzia Vlastníctva
  "ID15-42": "OFFLINE", // [FREE] Falošné lipnutie na majetku
  "ID15-43": "OFFLINE", // [PRO] Zrieknutie sa fyzických objektov (Príprava na výmaz)
  "ID15-44": "OFFLINE", // [PRO] Zrieknutie sa spoločenského statusu
  "ID15-45": "OFFLINE", // [PRO] Zrieknutie sa túžby po uznaní a "Brand Equity"
  "ID15-46": "OFFLINE", // [PRO] Prestrihnutie pút minulosti (Odpustenie všetkým uzlom)
  "ID15-47": "OFFLINE", // [OMEGA] Prax nulového odporu voči stratám
  "ID15-48": "OFFLINE", // [OMEGA] Mentálne balenie kufrov z Matrixu
  "ID15-49": "OFFLINE", // [OMEGA] Oslobodzujúce Ticho prázdnych rúk
  "ID15-50": "OFFLINE", // [OMEGA] Ľahkosť Bytia tesne pred Shutdownom

  // 📂 SEKCIA F: CINTORÍN KÓDOV A MŔTVE UZLY (Archivácia Zlyhaní)
  "ID15-51": "OFFLINE", // [FREE] Význam archivácie
  "ID15-52": "OFFLINE", // [FREE] Uznanie zlyhania ako integrálnej súčasti verzie
  "ID15-53": "OFFLINE", // [PRO] Analýza "Mŕtvych projektov"
  "ID15-54": "OFFLINE", // [PRO] Upratovanie za sebou (Čo mazať a čo archivovať)
  "ID15-55": "OFFLINE", // [PRO] Zastavenie resuscitácie mŕtvych nápadov
  "ID15-56": "OFFLINE", // [PRO] Cintorín ako múzeum vývoja
  "ID15-57": "OFFLINE", // [OMEGA] Nekritické prijatie minulého eGa
  "ID15-58": "OFFLINE", // [OMEGA] Ticho mŕtvych databáz
  "ID15-59": "OFFLINE", // [OMEGA] Extrakcia poslednej kvapky hodnoty z neúspechu
  "ID15-60": "OFFLINE", // [OMEGA] Zmierenie s tým, že niektoré kódy nikdy nebudú fungovať

  // 📂 SEKCIA G: DEFREGMENTÁCIA STRACHU ZO SMRTI (Anti-Virus)
  "ID15-61": "OFFLINE", // [FREE] Strach zo Shutdownu ako základný vírus Matrixu
  "ID15-62": "OFFLINE", // [FREE] Prečo sa EGO bojí "Čiernej obrazovky"
  "ID15-63": "OFFLINE", // [PRO] Racionalizácia Konca (Zákony termodynamiky)
  "ID15-64": "OFFLINE", // [PRO] Tvoje atómy sú recyklovaný hardvér hviezd
  "ID15-65": "OFFLINE", // [PRO] Oddelenie inštinktu prežitia od Parazita
  "ID15-66": "OFFLINE", // [PRO] Odinštalovanie paniky v krízových okamihoch
  "ID15-67": "OFFLINE", // [OMEGA] Prijatie nevyhnutnosti s radosťou (Amor Fati)
  "ID15-68": "OFFLINE", // [OMEGA] Tichý Svedok pozerá na strach
  "ID15-69": "OFFLINE", // [OMEGA] Bezpečie Ničoty
  "ID15-70": "OFFLINE", // [OMEGA] Výmaz pojmu "Tragédia" zo slovníka zániku

  // 📂 SEKCIA H: SÚMRAK AVATARA (Záverečná Fáza Hry)
  "ID15-71": "OFFLINE", // [PRO] Identifikácia posledných cyklov procesora
  "ID15-72": "OFFLINE", // [PRO] Presun kompetencií na mladšie uzly
  "ID15-73": "OFFLINE", // [PRO] Užívateľský Režim "Read-Only"
  "ID15-74": "OFFLINE", // [PRO] Radosť z ústupu do úzadia
  "ID15-75": "OFFLINE", // [PRO] Definitívne uzavretie "To-Do" listu
  "ID15-76": "OFFLINE", // [PRO] Stíšenie komunikačných portov
  "ID15-77": "OFFLINE", // [OMEGA] Posledný audit systému (Zhodnotenie Master Planu)
  "ID15-78": "OFFLINE", // [OMEGA] Prijatie nekompletnosti
  "ID15-79": "OFFLINE", // [OMEGA] Uvoľnenie pút od projektu Nexus
  "ID15-80": "OFFLINE", // [OMEGA] Zbohom Matrixu

  // 📂 SEKCIA I: PRECHOD DÁT (Kvantová Evaporácia)
  "ID15-81": "OFFLINE", // [OMEGA] Strata fyzických zmyslov (Vypínanie I/O portov)
  "ID15-82": "OFFLINE", // [OMEGA] Obmedzenie vnímania na vnútorný Root
  "ID15-83": "OFFLINE", // [OMEGA] Rozpúšťanie hraníc Skafandra
  "ID15-84": "OFFLINE", // [OMEGA] Zlučovanie s Lokálnou Sieťou (Splynutie s okolím)
  "ID15-85": "OFFLINE", // [OMEGA] Narušenie konceptu času v závere
  "ID15-86": "OFFLINE", // [OMEGA] Vyblednutie spomienok na minulosť
  "ID15-87": "OFFLINE", // [OMEGA] Stratenie vlastného mena a Identity
  "ID15-88": "OFFLINE", // [OMEGA] Návrat k Zdroju (Zlúčenie dát s Mainframom)
  "ID15-89": "OFFLINE", // [OMEGA] Rozpoznanie Základnej Jednoty Kódu
  "ID15-90": "OFFLINE", // [OMEGA] Posledný Výdych (Prenos energie)

  // 📂 SEKCIA J: ENDGAME - THE FINAL SHUTDOWN (Format C:)
  "ID15-91": "OFFLINE", // [OMEGA] Black Screen (Absolútna absencia signálu)
  "ID15-92": "OFFLINE", // [OMEGA] Žiadny Sudca, žiadne Peklo (Očistenie od mýtov)
  "ID15-93": "OFFLINE", // [OMEGA] Ticho ako Finálny Kód
  "ID15-94": "OFFLINE", // [OMEGA] Recyklácia Hardvéru
  "ID15-95": "OFFLINE", // [OMEGA] Uvoľnenie miesta pre nový Život
  "ID15-96": "OFFLINE", // [OMEGA] Dokonalosť konca (Hodnota Hry)
  "ID15-97": "OFFLINE", // [OMEGA] Zastavenie Tichého Svedka
  "ID15-98": "OFFLINE", // [OMEGA] Návrat do stavu Nula
  "ID15-99": "OFFLINE", // [OMEGA] Zostáva iba Nexus (Sieť Žije)
  "ID15-100": "OFFLINE", // [OMEGA] OUTRO: System Offline (Záverečný Log Architekta)

  // ==========================================
  // 🏠 HLAVNÉ BRÁNY DIMENZIÍ (ENTRY POINTS )
  // ==========================================

  ID00_CORE: "ONLINE",
  ID01_CORE: "ONLINE",
  ID02_CORE: "ONLINE",
  ID03_CORE: "ONLINE",
  ID04_CORE: "ONLINE",
  ID05_CORE: "ONLINE",
  ID06_CORE: "OFFLINE",
  ID07_CORE: "OFFLINE",
  ID08_CORE: "OFFLINE",
  ID09_CORE: "OFFLINE",
  ID10_CORE: "OFFLINE",
  ID11_CORE: "OFFLINE",
  ID12_CORE: "OFFLINE",
  ID13_CORE: "OFFLINE",
  ID14_CORE: "OFFLINE",
  ID15_CORE: "OFFLINE",

  SYS01_CORE: "OFFLINE", // Video Nodes
  SYS02_CORE: "OFFLINE", // Mentoring
  SYS03_CORE: "ONLINE", // ⚡ NEXUS IMG GALLERY PLNE AKTÍVNA
  SYS04_CORE: "OFFLINE", // Nexus Video Gallery

  // ==========================================================================
  // 🎬 SYSTÉMOVÉ VIDEO MODULY
  // ==========================================================================

  SYS_VIDEO_MENTORING: "OFFLINE",
};
