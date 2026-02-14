# PRODUCT REQUIREMENTS DOCUMENT (PRD)
## Bulk AI Image Platform - Dual-Mode Multi-Provider Testing

**Verze:** 2.5
**Datum:** Únor 13, 2026
**Status:** Draft - Living Document
**Last Updated:** Phase 7.10B - Dynamic Credit Display in UI
**Product Owner:** [Vaše jméno]

---

## 📋 TABLE OF CONTENTS

1. [Executive Summary](#executive-summary)
2. [Problem Statement](#problem-statement)
3. [Use Cases & Examples](#use-cases--examples)
4. [Product Vision](#product-vision)
5. [Target Users](#target-users)
6. [User Stories](#user-stories)
7. [Feature Requirements](#feature-requirements)
8. [Technical Requirements](#technical-requirements)
9. [UX/UI Guidelines](#uxui-guidelines)
10. [Pricing & Business Model](#pricing--business-model)
11. [Success Metrics](#success-metrics)
12. [Roadmap](#roadmap)
13. [Open Questions](#open-questions)
14. [Changelog](#changelog)
15. [Approvals & Sign-Off](#approvals--sign-off)

---

## 1. EXECUTIVE SUMMARY

### Product Name
**[TBD - možnosti:]**
- PixelForge
- BulkCraft AI
- ImageLab Pro
- PhotoScale
- [přidat další nápady]

### Tagline
"Test 3 AI services. Choose the best price. Process thousands."

### One-liner
All-in-one SaaS platforma pro bulk zpracování produktových obrázků s dual-mode přístupem: vylepšujte existující fotky NEBO generujte nové z popisů. Otestujte 3 AI služby, vyberte optimální poměr cena/kvalita, zpracujte stovky obrázků pomocí transparentního kreditního systému.

### Unique Value Proposition
Jediný nástroj na trhu, který kombinuje:
1. **Dual-Mode Processing** - Enhancement (vylepšení existujících fotek) + Generation (vytvoření nových z popisů)
2. **Multi-AI testing** - porovnání kvality a ceny 3 služeb (DALL-E, Flux, Nano Banana Pro)
3. **Test-first workflow** - nejprve vzorek, pak bulk
4. **Credit-based pricing** - platíte jen za to, co použijete, s transparentními cenami před každou akcí
5. **True bulk processing** - až 500+ obrázků najednou

---

## 2. PROBLEM STATEMENT

### Dva hlavní use cases, dva typy problémů:

---

### 🎨 USE CASE A: ENHANCEMENT MODE (Vylepšení existujících fotek)

**Kdo:** Dropshippers, resellers, POD sellers, e-commerce s existujícím katalogem

**Current Pain Points:**
- Mají stovky produktových fotek od dodavatelů (AliExpress, CJ Dropshipping), ale kvalita je špatná
- Domácí fotky mají chaotické pozadí, špatné světlo
- Potřebují konzistentní look napříč celým katalogem
- Manuální úprava v Photoshopu každé fotky zabere věčnost
- Existující nástroje (Pebblely, Photoroom):
  - ✅ Umí background replacement
  - ❌ Používají jen 1 AI model (nevíš jestli je to nejlepší/nejlevnější)
  - ❌ Bulk jen do 10-50 fotek najednou
  - ❌ Nevíš kolik to bude stát předem
  - ❌ Nelze testovat před bulk zpracováním

**Konkrétní příklad:**
```
Mám 300 produktových fotek z AliExpress:
• Špatné pozadí (továrna, ne studio)
• Špatné světlo
• Nekonzistentní styl
• Chci vše na bílém pozadí s profesionálním světlem

Současné řešení:
→ Photoroom: Musím nahrát po 10, nevím jestli Photoroom AI 
  je nejlepší volba, platím $10/měsíc unlimited ale nevím 
  kolik bych ušetřil s jinými nástroji
```

---

### 🚀 USE CASE B: GENERATION MODE (Imaginární generování)

**Kdo:** Affiliate marketéři, content creators, agentury, concept designers

**Current Pain Points:**
- Potřebují ilustrace/vizuály pro články, prezentace, mockupy
- Stock fotky jsou generické, drahé, nebo nesedí přesně
- Chápou že AI může generovat z popisů, ale:
  - Neví která AI služba (DALL-E, Midjourney, Flux) dá nejlepší výsledky pro jejich styl
  - Každá AI má jiný poměr cena/kvalita
  - Generování desítek obrázků po jednom v ChatGPT/Midjourney zabere hodiny
  - Žádný způsob jak udělat bulk generování z CSV seznamu
  - Discord interface Midjourney je komplikovaný pro non-techies

**Konkrétní příklad:**
```
Píšu affiliate article "Best Coffee Mugs 2026":
• Potřebuji 15 ilustrací různých hrnků
• Stock fotky stojí $5-15/každá = $75-225
• ChatGPT může generovat, ale:
  - Musím psát každý prompt zvlášť
  - DALL-E stojí $0.04-0.08 per image
  - Nevím jestli Flux by byl levnější/lepší
  - Zabere to hodinu práce
```

---

### Market Gap - Co NIKDO nedělá pro OBA use cases:

**NIKDO nenabízí:**
- ❌ **Dual-mode přístup** - enhancement i generation v jednom nástroji
- ❌ **Multi-AI srovnání** - test 3 služeb před bulk zpracováním
- ❌ **Test-first workflow** - vzorek → porovnání → bulk
- ❌ **Transparentní credit-based pricing** - vidíš přesné náklady před každou akcí
- ❌ **True bulk processing** - stovky obrázků najednou z CSV/ZIP

---

## 3. USE CASES & EXAMPLES

### 🎨 ENHANCEMENT MODE - Real Product Photo Improvement

Enhancement mode je pro situace, kdy **máte existující fotky produktů**, ale potřebujete je vylepšit nebo změnit jejich kontext.

---

#### Use Case 1: Dropshipping Store - AliExpress Photo Cleanup

**Scenario:**
David spustil nový Shopify store s 150 produkty z AliExpress. Fotky od dodavatele mají:
- Tovární pozadí (někdy s čínskými nápisy)
- Špatné osvětlení
- Nekonzistentní styl
- Vypadají "levně"

**Current workflow (bez našeho nástroje):**
1. Stáhne 150 fotek z AliExpress
2. Otevře Photoroom
3. Nahraje po 10 fotkách (limit)
4. Klikne "Remove background" na každou
5. Aplikuje white background
6. Stáhne, opakuje 15×
7. **Celkem: 3-4 hodiny práce**

**S naším nástrojem:**
1. Upload ZIP se 150 fotkami
2. Test mode: Vybere 1 fotku → otestuje 3 AI (DALL-E, Flux, NBPro) s "white studio background"
3. Porovná výsledky: Flux má nejlepší poměr cena/kvalita (5 credits vs 8 pro DALL-E)
4. Bulk: 150 × 5 credits = 750 credits = $45
5. **Celkem: 20 minut práce**

**Výsledek:**
- 150 konzistentních produktových fotek
- White studio background
- Profesionální osvětlení
- Ušetřil 3+ hodiny

---

#### Use Case 2: Reseller - Home Photos to Professional

**Scenario:**
Anna prodává vintage oblečení na Poshmark. Fotí doma s iPhone, ale pozadí je:
- Její ložnice (neuspořádaná)
- Špatné světlo (večer)
- Neprofesionální

Konkurence má krásné lifestyle fotky, ona vypadá jako amatér.

**Current workflow:**
1. Použije Photoroom na každou fotku jednotlivě
2. Manual background removal
3. Aplikuje gradient nebo barevné pozadí
4. 5-10 minut per fotka
5. **Pro 50 produktů: 4-8 hodin**

**S naším nástrojem:**
1. Nahraje 50 fotek najednou (ZIP)
2. Test mode: "Minimal lifestyle background, beige aesthetic"
3. Vybere Flux (levnější, dostatečná kvalita)
4. Bulk: 50 × 5 credits = 250 credits = $15-20
5. **Celkem: 15 minut**

**Výsledek:**
- Konzistentní aesthetic napříč celým profilem
- Vypadá jako profesionální brand
- Conversion rate ↑ (lepší trust)

---

#### Use Case 3: Print-on-Demand - Mockup Variations

**Scenario:**
Peter vytváří POD designs (trička, hrnky). Má základní mockup na bílém pozadí, ale chce ukázat produkt v různých kontextech pro marketing:
- Coffee shop scene (pro Instagram)
- Outdoor/camping (pro niche targeting)
- Minimalist desk setup

**Current workflow:**
1. Najde stock fotky pozadí ($5-15 každá)
2. Photoshop: vloží mockup do scény (30-60 min per image)
3. Nebo použije Placeit ($29/měsíc pro limitované templates)
4. **Pro 20 variants: $100+ a 10+ hodin**

**S naším nástrojem:**
1. Má 20 mockupů na bílém pozadí
2. CSV: různé kontexty pro každý
   ```
   mockup_mug_01.png, coffee_shop_aesthetic
   mockup_mug_02.png, outdoor_camping
   mockup_tshirt_01.png, minimalist_desk
   ```
3. Test mode: Vybere nejlepší AI pro jeho styl
4. Bulk: 20 variants × 6 credits = 120 credits = $7-12
5. **Celkem: 25 minut**

**Výsledek:**
- 20 různých marketingových asset
- Konzistentní brand look
- $90 ušetřeno vs stock fotky

---

#### Use Case 4: E-commerce Catalog Refresh

**Scenario:**
Firma má 500 produktových fotek z roku 2020. Styl je zastaralý:
- Gradient pozadí (teď je trendy white/minimal)
- Tmavé osvětlení
- Potřebují rebrand

**Current solution:**
Najmout fotografa: $5,000-10,000 pro 500 fotek

**S naším nástrojem:**
1. Upload 500 existujících fotek
2. Test mode: Nový styl (white minimal, soft shadows)
3. Bulk: 500 × 6 credits = 3,000 credits = $180-200
4. **1-2 hodiny setup, overnight processing**

**Výsledek:**
- Kompletně refreshnutý katalog
- Ušetřeno $4,800+ vs fotograf
- Konzistentní nový brand aesthetic

---

#### Use Case 5: Real Estate - Property Photo Enhancement

**Scenario:**
Real estate agent má fotky nemovitostí, ale:
- Špatné počasí (zataženo)
- Prázdné pokoje (bez nábytku)
- Tmavé/hnusné osvětlení

**S naším nástrojem:**
1. Enhancement mode: Vylepší osvětlení, barvy
2. Generation features: "Add virtual staging furniture"
3. Bulk: 30 fotek × 8 credits = 240 credits = $15-20

**Výsledek:**
- Světlé, přitažlivé fotky
- Virtual staging místo prázdných pokojů
- Nemovitost se prodá rychleji

---

### 🚀 GENERATION MODE - Imaginární Vytváření

Generation mode je pro situace, kdy **NEMÁTE existující fotky** a potřebujete vytvořit vizuály from scratch z textových popisů.

---

#### Use Case 1: Affiliate Blog - Article Illustrations

**Scenario:**
Anna píše tech review blog. Každý článek potřebuje 5-8 ilustrací:
- Hero image článku
- Comparison charts (visualized)
- Product close-ups
- Use case scenarios

**Current workflow:**
1. Hledá stock fotky (Unsplash, Pexels) - většinou nenajde přesně co chce
2. NEBO platí Shutterstock ($29-199/měsíc)
3. Každá fotka zabere 10-15 min vyhledávání
4. Často musí "settle" za něco co není ideální
5. **Pro 20 článků/měsíc = 160 fotek = hodiny práce**

**S naším nástrojem:**
1. CSV seznam ilustrací:
   ```
   "MacBook Pro on minimal desk, side view, soft lighting"
   "Wireless headphones, product shot, white background"
   "Person using laptop in coffee shop, realistic"
   "iPhone comparison, two phones side by side"
   ```
2. Test mode: Zkusí 3 AI služby, vybere nejlepší
3. Bulk: 160 fotek × 5 credits (Flux) = 800 credits = $50
4. **Celkem: 1 hodina setup**

**Výsledek:**
- Přesně to co chce (custom descriptions)
- Unique content (ne stock fotky co má každý)
- Ušetřeno $149 vs Shutterstock + hodiny práce
- Konzistentní vizuální styl napříč články

---

#### Use Case 2: Social Media Content Creator

**Scenario:**
Brand manager potřebuje 30 social media posts měsíčně s product-related vizuály pro Instagram/TikTok.

**Current workflow:**
1. Design v Canva s stock fotkami (generic)
2. NEBO platí designéra ($200-500/měsíc)
3. Stock fotky často nesedí přesně k brandingu

**S naším nástrojem:**
1. Template prompts:
   ```
   "Coffee mug on wooden table, morning light, cozy aesthetic"
   "Laptop and notebook, minimal desk setup, top view"
   "Smartphone mockup, hand holding, outdoor background"
   ```
2. Vygeneruje 30 variants s konzistentním stylem
3. Bulk: 30 × 8 credits (DALL-E pro best quality) = 240 credits = $15-20

**Výsledek:**
- On-brand unique content
- Levnější než stock nebo designer
- Konzistentní aesthetic

---

#### Use Case 3: Startup Pitch Deck - Product Mockups

**Scenario:**
Startup má nápad na fyzický produkt, ale ještě nemají prototyp. Potřebují vizuály pro investorům:
- Product renders
- Use case scenarios
- Mockups v různých prostředích

**Current solution:**
- Najmout 3D designéra: $500-2,000
- Nebo použít generic mockups (nevěrohodné)

**S naším nástrojem:**
1. Detailní popisy produktu:
   ```
   "Smart water bottle, minimalist design, aluminum finish, LED indicator"
   "Same bottle on gym bench, realistic lighting"
   "Product packaging, eco-friendly box, lifestyle photo"
   ```
2. Test různé AI pro nejvíce realistic render
3. Generate 15 variants pro pitch deck
4. Bulk: 15 × 10 credits = 150 credits = $10-15

**Výsledek:**
- Professional-looking mockups
- Ušetřeno $1,500+ vs 3D designer
- Multiple variants pro A/B testing s investory

---

#### Use Case 4: E-learning Course - Custom Illustrations

**Scenario:**
Online course creator potřebuje ilustrace pro vzdělávací obsah:
- 50 lekční ilustrací
- Konzistentní ilustrativní styl
- Specific k tématu kurzu

**Current solution:**
- Stock illustrations (generic, každý je používá)
- Najmout ilustrátora: $50-200 per illustration = $2,500-10,000

**S naším nástrojem:**
1. CSV s popisem každé lekce:
   ```
   "Person learning coding, illustrated style, friendly, colorful"
   "Database diagram visualization, modern, clean, educational"
   "Team collaboration, illustrated characters, diverse"
   ```
2. Test mode: Najde správný "illustrated" styl
3. Bulk: 50 × 5 credits = 250 credits = $15-20

**Výsledek:**
- Unique course visuals
- Konzistentní styl (důležité pro branding)
- Ušetřeno $2,000+ vs ilustrátor

---

#### Use Case 5: Game Developer - Concept Art

**Scenario:**
Indie game dev potřebuje concept art pro:
- Character designs
- Environment concepts
- Item/weapon designs
- Marketing assets

**Current workflow:**
1. Concept artist: $100-300 per piece
2. Stock assets (nevhodné pro unique game)

**S naším nástrojem:**
1. Detailní popisy:
   ```
   "Fantasy sword, glowing runes, dark metal, intricate details"
   "Medieval tavern interior, warm lighting, wooden furniture"
   "Elf character, archer, green cloak, forest background"
   ```
2. Test DALL-E vs Flux vs NBPro pro fantasy art style
3. Generate 100 concept pieces
4. Bulk: 100 × 10 credits = 1,000 credits = $60

**Výsledek:**
- Rapid concept iteration
- Ušetřeno $10,000+ vs concept artist
- Možnost rychle testovat různé art direction

---

#### Use Case 6: Marketing Agency - Client Campaigns

**Scenario:**
Agentura má 5 klientů, každý potřebuje:
- Campaign visuals (10-20 per klient)
- A/B testing variants
- Different styles pro různé platformy

**Current workflow:**
- In-house designer: $4,000-6,000/měsíc
- Stock fotky: $200-500/měsíc
- Render time: 2-3 hodiny per visual

**S naším nástrojem:**
1. Každý klient má template prompts
2. Rychlé iterace a variants
3. Bulk generation:
   - Klient A (B2B): 20 professional product shots
   - Klient B (DTC): 30 lifestyle scenes
   - Klient C (Tech): 15 modern abstract visuals
4. Celkem: 65 × 8 credits = 520 credits = $30-40

**Výsledek:**
- Levnější než designer hours
- Rychlejší iterace
- Více variants pro testing

---

### 📊 Srovnání: Enhancement vs Generation

| | Enhancement Mode | Generation Mode |
|---|---|---|
| **Input** | Existing photos (ZIP/upload) | Text descriptions (CSV) |
| **Output** | Improved versions of same product | Brand new imaginární visuals |
| **Use Cases** | Dropshipping, catalog refresh, reselling | Affiliate, social media, concept art |
| **Accuracy** | 100% (produkt je real) | 70-90% (depends on prompt) |
| **Speed** | Faster (just enhancement) | Slower (full generation) |
| **Cost** | 3-8 credits per image | 3-15 credits per image |
| **Best For** | E-commerce, real products | Content creation, marketing |

---

### 🎯 Why Dual-Mode Matters

**Většina konkurence dělá JEN jedno:**
- Pebblely, Photoroom: Enhancement only
- DALL-E, Midjourney: Generation only

**Naše výhoda:**
- ✅ Jeden nástroj pro OBA use cases
- ✅ E-commerce user needs BOTH (katalog enhancement + marketing generation)
- ✅ Content creator needs BOTH (enhance vlastní fotky + generate illustrations)
- ✅ Jednodušší billing (kredity fungují pro obojí)

---

## 4. PRODUCT VISION

### Mission Statement
Democratizovat přístup k profesionálnímu product photography pomocí AI, a dát uživatelům kontrolu nad tím, která AI služba nejlépe vyhovuje jejich potřebám.

### Long-term Vision (3 roky)
- #1 platforma pro bulk AI image generation
- 10,000+ aktivních uživatelů
- Integrováno s Shopify, WooCommerce, Amazon
- Vlastní AI model trénovaný na best practices

### Short-term Goals (MVP - 6 měsíců)
- Funkční test mode s 3 AI službami
- Bulk generování až 200 obrázků
- 100 platících uživatelů
- $2,900-7,900 MRR

---

## 5. TARGET USERS

### Primary Personas

#### 👤 Persona 1: "Dropshipping David" - ENHANCEMENT MODE
**Demografie:**
- Věk: 25-35
- Role: Solo e-commerce entrepreneur
- Zkušenost: Střední (1-2 roky dropshipping)
- Tech skills: Základní

**Charakteristika:**
- Spravuje 100-300 produktů z AliExpress/CJ Dropshipping
- Obměňuje katalog každý měsíc (nové trendy)
- Budget: $50-100/měsíc na tools
- Potřebuje rychle vylepšit fotky od dodavatelů

**Pain Points:**
- Fotky od dodavatelů jsou nekvalitní (tovární pozadí, špatné světlo)
- Nemá čas ani skill pro Photoshop
- Pebblely používá, ale nevědí jestli je to nejlepší/nejlevnější volba
- Batch upload je limitovaný (max 10 najednou)

**Primary Use Case:** ENHANCEMENT MODE
- Upload 100 fotek z AliExpress
- Background removal + professional background
- Konzistentní look pro celý Shopify store

**Success Criteria:**
- Vylepší 100 produktových fotek za < 1 hodinu
- Náklady < $30
- Konzistentní kvalita napříč katalogem

---

#### 👤 Persona 2: "Affiliate Anna" - GENERATION MODE
**Demografie:**
- Věk: 28-40
- Role: Content creator / Blogger
- Zkušenost: Pokročilá (3+ roky affiliate)
- Tech skills: Střední

**Charakteristika:**
- Píše 10-20 review článků měsíčně
- Potřebuje ilustrace k článkům
- Budget: $40-80/měsíc na visuals
- Dělá vše sama (content + design)

**Pain Points:**
- Stock fotky jsou drahé ($5-15 per image) nebo generické
- ChatGPT umí generovat, ale:
  - Po jednom obrázku (zdlouhavé)
  - Nevědí jestli je DALL-E nejlepší volba
  - Chybí batch processing
- Potřebuje konzistentní vizuální styl napříč články

**Primary Use Case:** GENERATION MODE
- CSV seznam: "coffee mug minimalist", "laptop stand wood", etc.
- Vygeneruje 20 ilustrací najednou
- Stejný styl napříč všemi

**Success Criteria:**
- Vygeneruje 20 article illustrations za < 30 minut
- Konzistentní brand style
- Ví přesně kolik to stojí před generováním
- Levnější než stock fotky ($40 vs $100+)

---

#### 👤 Persona 3: "POD Peter" - BOTH MODES
**Demografie:**
- Věk: 22-35
- Role: Print-on-Demand seller (TeeSpring, Printful)
- Zkušenost: Začátečník-střední
- Tech skills: Základní-střední

**Charakteristika:**
- Vytváří 50-150 design variants měsíčně
- Testuje různé niches (minimalist, vintage, humor...)
- Budget: $40-100/měsíc
- Rychlý prototyping je klíčový

**Pain Points:**
- **Enhancement use:** Má mockup templates, chce je ukázat v různých kontextech
- **Generation use:** Testuje nové design koncepty před výrobou
- Obojí zabere hodiny když dělá po jednom

**Primary Use Cases:** 
1. **ENHANCEMENT:** Mockup tričko → vložit do lifestyle fotek (kavárna, ulice...)
2. **GENERATION:** Rychle vygenerovat 50 design konceptů pro testování

**Success Criteria:**
- Otestuje 3 AI služby na svém stylu (minimalist tees)
- Vybere nejlevnější/nejlepší pro jeho niche
- Zpracuje 100 mockupů nebo designů za < 1 hodinu

---

#### 👤 Persona 4: "Agency Alice" - BOTH MODES
**Demografie:**
- Věk: 30-45
- Role: Marketing agency owner (3-10 zaměstnanců)
- Zkušenost: Expert
- Tech skills: Pokročilé

**Charakteristika:**
- Spravuje 5-15 klientů současně
- Mix e-commerce (enhancement) a content marketing (generation)
- Budget: $200-500/měsíc na image tools
- Potřebuje škálovatelnost a quality control

**Pain Points:**
- Různí klienti, různé potřeby:
  - E-commerce klient: vylepšit 500 produktových fotek
  - Content klient: vygenerovat 100 blog ilustrací
- Současné nástroje jsou specializované (jeden pro enhancement, jiný pro generation)
- Nevědí která AI dá nejlepší ROI pro každého klienta
- Team collaboration je komplikovaná

**Primary Use Cases:**
1. **ENHANCEMENT:** Klient má starý katalog → refresh 500 fotek
2. **GENERATION:** Content klient → 100 unique illustrations monthly

**Success Criteria:**
- Jeden nástroj pro všechny klienty (enhancement i generation)
- Team workspace (3-5 seats)
- API pro automatizaci (V2)
- Transparentní billing (chargebacks ke klientům)

---

### Secondary Personas
- **Resellers** (Poshmark, Vinted, Depop) - Enhancement mode pro fotky z domu
- **Social media managers** - Generation mode pro branded content
- **Concept designers** - Generation mode pro mockupy/pitchdecky

---

## 6. USER STORIES

### Epic 1: Test Mode - Dual Mode Interface

**User Story 1.1:** Jako user chci mít jasnou volbu mezi Enhancement a Generation módem, abych mohl vybrat správný workflow.

**Acceptance Criteria:**
- [ ] Dashboard má 2 jasné CTA buttons: "Enhance Existing Photos" a "Generate New Images"
- [ ] Každý button vede na příslušný test mode
- [ ] Tooltip vysvětluje rozdíl mezi módy
- [ ] User může přepínat mezi módy pomocí tabů

**Priority:** P0 (MVP must-have)

---

### Epic 2: Enhancement Mode - Test & Bulk

**User Story 2.1:** Jako dropshipper chci nahrát existující fotku produktu a otestovat 3 AI služby na background replacementu.

**Acceptance Criteria:**
- [ ] User může uploadnout 1 fotku (jpg, png, max 10MB)
- [ ] Zadá parametry:
  - Background style (white, studio, lifestyle, coffee_shop, outdoor...)
  - Enhancement level (light, medium, heavy)
  - Output ratio (1:1, 16:9, 4:5, 9:16)
- [ ] Systém vygeneruje 3 varianty (DALL-E, Flux, Nano Banana Pro)
- [ ] Každá varianta zobrazuje:
  - Before/After comparison
  - Credit cost per image
  - Estimated quality score
- [ ] Generování trvá < 60 sekund celkem
- [ ] "Use this for bulk" button

**Priority:** P0 (MVP must-have)

---

**User Story 2.2:** Jako dropshipper chci udělat bulk enhancement 100 produktových fotek s tím AI které jsem vybral v testu.

**Acceptance Criteria:**
- [ ] Upload options:
  - ZIP file s fotkami + CSV mapping
  - Google Drive folder (V2)
- [ ] CSV format:
  ```
  filename, background_style, enhancement_level
  mug_001.jpg, coffee_shop, medium
  tshirt_001.jpg, lifestyle, heavy
  ```
- [ ] Preview prvních 5 fotek
- [ ] Zobrazí total cost estimate:
  ```
  100 images × 5 credits = 500 credits
  Current balance: 2,000 credits
  After job: 1,500 credits remaining
  ```
- [ ] Potvrzení před spuštěním
- [ ] Background processing s progress tracking

**Priority:** P0 (MVP must-have)

---

### Epic 3: Generation Mode - Test & Bulk

**User Story 3.1:** Jako affiliate marketér chci popsat produkt a otestovat 3 AI služby na generování.

**Acceptance Criteria:**
- [ ] Text input pro popis produktu (max 500 chars)
- [ ] Parametry:
  - Style (realistic, illustrated, 3D, minimalist, vintage...)
  - Background (white, gradient, contextual, custom)
  - Angle/View (front, 45°, top, lifestyle)
  - Ratio (1:1, 16:9, 9:16, 4:5)
- [ ] Systém vygeneruje 3 varianty (DALL-E, Flux, Nano Banana Pro)
- [ ] Každá varianta zobrazuje:
  - Generated image
  - Credit cost per image
  - Generation time
- [ ] Side-by-side comparison
- [ ] "Use this for bulk" button

**Priority:** P0 (MVP must-have)

---

**User Story 3.2:** Jako affiliate marketér chci vygenerovat 50 ilustrací z CSV seznamu popisů.

**Acceptance Criteria:**
- [ ] CSV upload format:
  ```
  product_name, description, style, background
  Coffee Mug, "Blue ceramic mug 350ml minimalist", realistic, white
  Laptop Stand, "Aluminum adjustable ergonomic", 3D, studio
  ```
- [ ] Preview prvních 3 popisů
- [ ] Zobrazí cost estimate:
  ```
  50 images × 10 credits (DALL-E) = 500 credits
  Alternative: Flux = 250 credits (50% save)
  Alternative: NBPro = 150 credits (70% save)
  ```
- [ ] User vybere AI službu
- [ ] Potvrzení před spuštěním
- [ ] Queue processing s progress tracking

**Priority:** P0 (MVP must-have)

---

### Epic 4: Credit System

**User Story 4.1:** Jako user chci vidět můj credit balance na každé stránce.

**Acceptance Criteria:**
- [ ] Header zobrazuje: "Balance: 1,247 credits"
- [ ] Hover tooltip: "≈ 120-400 images (depending on AI)"
- [ ] Link na "Buy Credits" page
- [ ] Warning když balance < 100 credits

**Priority:** P0 (MVP must-have)

---

**User Story 4.2:** Jako user chci koupit kredity před tím, než začnu generovat.

**Acceptance Criteria:**
- [ ] Credit packages page:
  - Starter: 100 credits = $10
  - Popular: 500 credits = $40 (save 20%)
  - Pro: 2,000 credits = $120 (save 40%)
  - Business: 10,000 credits = $450 (save 55%)
- [ ] Stripe checkout integration
- [ ] Instant credit top-up (< 5 sekund)
- [ ] Email confirmation s receipt
- [ ] Credit transaction history

**Priority:** P0 (MVP must-have)

---

**User Story 4.3:** Jako user chci vidět přesný cost estimate PŘED každým bulk jobem.

**Acceptance Criteria:**
- [ ] Before confirmation screen zobrazuje:
  ```
  ┌─────────────────────────────────┐
  │ Job Summary                     │
  ├─────────────────────────────────┤
  │ Mode: Enhancement               │
  │ Images: 100                     │
  │ AI Service: Flux                │
  │ Operations:                     │
  │  • Background removal: 1 credit │
  │  • Background gen: 4 credits    │
  │ Total per image: 5 credits      │
  │ Total cost: 500 credits         │
  │                                 │
  │ Your balance: 2,000 credits     │
  │ After job: 1,500 credits        │
  │                                 │
  │ [Cancel] [Confirm & Start]      │
  └─────────────────────────────────┘
  ```
- [ ] Nelze pokračovat pokud insufficient balance
- [ ] Link na "Buy more credits" pokud nemá dost

**Priority:** P0 (MVP must-have)

---

### Epic 5: Bulk Processing & Progress

**User Story 5.1:** Jako user chci vidět real-time progress mého bulk jobu.

**Acceptance Criteria:**
- [ ] Progress page zobrazuje:
  - Progress bar: "42/100 images (42%)"
  - ETA: "≈ 6 minutes remaining"
  - Real-time grid preview (generované obrázky se postupně objevují)
  - Current credit spend: "210/500 credits used"
- [ ] Option zrušit job:
  - Refund nevygenerovaných credits
  - "Cancel & Refund 290 credits?"
- [ ] Email + in-app notification když hotovo

**Priority:** P0 (MVP must-have)

---

**User Story 5.2:** Jako user chci stáhnout všechny vygenerované obrázky najednou.

**Acceptance Criteria:**
- [ ] Project results page:
  - Grid view všech obrázků
  - "Download All (ZIP)" button
- [ ] ZIP obsahuje:
  - Obrázky pojmenované podle product_name nebo čísla
  - metadata.csv s detaily (filename, AI used, cost...)
- [ ] Download link platný 30 dní
- [ ] Option re-download kdykoliv z project history

**Priority:** P0 (MVP must-have)

---

### Epic 3.5: Projects & Style Consistency (Phase 7.5-7.6 - COMPLETED)

**User Story 3.5.1:** Jako content creator chci vytvořit projekt s definovaným stylem, aby všechny moje generované obrázky měly konzistentní vzhled.

**Acceptance Criteria:**
- [x] User může vytvořit nový projekt s názvem
- [x] User může definovat base style prompt (např. "1960s style, warm colors, film grain")
- [x] User může zvolit výchozí AI službu pro projekt (via lock workflow)
- [x] User může zvolit výchozí aspect ratio pro projekt
- [x] User může nastavit style, background, quality_level, creativity_level
- [x] Projekt se uloží do databáze
- [x] User vidí projekt na dashboardu
- [x] Auto-open edit mode for new projects

**Priority:** P0 (MVP - Phase 7.5) - **COMPLETED**

---

**User Story 3.5.2:** Jako user chci vygenerovat ukázkový obrázek se stylem projektu před bulk generováním, abych ověřil/a, že styl vypadá dobře.

**Acceptance Criteria:**
- [x] User zadá popis scény v rámci projektu
- [x] Systém zkombinuje base style projektu + popis scény do plného promptu
- [x] Systém mapuje quality/creativity na AI-specific parameters (Phase 7.6)
- [x] Systém vygeneruje sample s 1-3 AI službami (volitelné checkboxy)
- [x] User vidí side-by-side porovnání s individual timing per service
- [x] User může schválit a zamknout styl, nebo iterovat na stylu projektu
- [x] Schválený sample se uloží jako referenční obrázek projektu
- [x] User může unlock a re-lock s jiným nastavením
- [x] User může uložit obrázky do project storage (Save to Project)

**Priority:** P0 (MVP - Phase 7.5) - **COMPLETED**

---

**User Story 3.5.3:** Jako developer/user chci vybrat, které AI služby testovat, abych ušetřil kredity a mohl debugovat konkrétní služby.

**Acceptance Criteria:**
- [x] Checkboxy pro zapnutí/vypnutí DALL-E 3, Flux Pro, Nano Banana Pro
- [x] Alespoň jedna služba musí být vybrána (validace)
- [x] Celková cena v kreditech zobrazena před generováním
- [x] Volají se pouze vybrané služby
- [x] Výsledky zobrazují pouze vybrané služby
- [x] Default: všechny služby zapnuté

**Priority:** P0 (MVP - Phase 7.5) - **COMPLETED**

---

**User Story 3.5.4:** Jako user chci generovat více obrázků pomocí zamknutého stylu projektu, aby všechny obrázky byly konzistentní.

**Acceptance Criteria:**
- [ ] User může spustit bulk generování ze zamknutého projektu
- [ ] Dva režimy vstupu: Textový popis NEBO CSV upload
- [ ] Text mode: User popíše N scén ke generování
- [ ] CSV mode: User nahraje CSV s popisy scén
- [ ] Systém aplikuje styl projektu na každou scénu
- [ ] User vidí odhad nákladů před spuštěním
- [ ] Background job zpracuje všechny generování
- [ ] Výsledky zachovávají konzistenci stylu projektu

**Priority:** P0 (MVP - Phase 8 - TODO)

---

**User Story 3.5.5:** Jako user chci se vrátit k existujícímu projektu a generovat další obrázky ve stejném stylu, abych mohl/a rozšířit kampaň/knihu/sérii v čase.

**Acceptance Criteria:**
- [x] Dashboard zobrazuje všechny projekty uživatele
- [x] User může otevřít existující projekt
- [x] Projekt zobrazuje: base style, zamknuté samples, saved images
- [ ] User může spustit nové bulk generování ve stejném stylu
- [x] Nová generování používají stejná nastavení projektu (AI služba, styl, ratio)
- [x] User může vidět všechny obrázky z projektu (saved images gallery)

**Priority:** P1 (Phase 7.5) - **PARTIALLY COMPLETED** (bulk pending)

---

**Implementation Workflow (Phase 7.5-7.6 - Actual):**

```
1. Create Project → name only → redirects with ?new=true → auto-opens edit mode
2. Configure Project → edit: name, mode, prompt, style, background, ratio, quality, creativity
3. Generate Sample → enter scene description → select 1-3 AI services → parallel generation
   - System combines: base_prompt + scene + style modifiers + background modifiers
   - Maps quality/creativity to service-specific params:
     DALL-E: quality (standard/hd), style (natural/vivid)
     Flux: guidance (3.5-10), steps (20-50), seed
     Nano Banana: temperature (0.3-1.8)
   - Shows results with: preview, timing, cost, errors, "Save to Project"
4. Lock Style → select preferred AI → confirmation → generates consistency_seed → status: queued
5. Unlock (optional) → revert to draft → keep seed as reference → re-test
6. Bulk Generation → TODO Phase 8
```

---

### Epic 6: Post-Generation Editing (V2)

**User Story 6.1:** Jako user chci přegenerovat konkrétní obrázky které se nepovedla.

**Acceptance Criteria:**
- [ ] Grid view s multi-select (checkboxes)
- [ ] "Regenerate Selected (5)" button
- [ ] Option změnit parametry jen pro vybrané:
  - Jiný prompt/popis
  - Jiná AI služba
  - Jiné parametry
- [ ] Cost estimate jen pro re-generation
- [ ] Original se nepřepíše (vytvoří novou verzi)

**Priority:** P1 (V2 - should have)

---

### Epic 7: Project Management

**User Story 7.1:** Jako user chci vidět historii svých projektů a credit usage.

**Acceptance Criteria:**
- [ ] Dashboard "My Projects":
  - List všech projektů
  - Každý projekt: název, datum, mode (enhance/generate), počet obrázků, AI použité, credits spent
  - Search & filter (by mode, by date, by AI service)
- [ ] Project detail:
  - Grid všech obrázků
  - Credit breakdown
  - Option re-download ZIP
  - Option duplicate project (reuse settings)
- [ ] Credit history:
  - All transactions (purchases, usage, refunds)
  - Balance over time graph (V2)

**Priority:** P1 (V2 - should have)

---

### Epic 8: Bulk Image Upload & Transformation

**User Story 8.1:** Jako dropshipper chci nahrát 100 produktových fotek najednou a hromadně jim změnit pozadí na lifestyle scény.

**Acceptance Criteria:**
- [ ] Uživatel může nahrát více obrázků najednou (drag & drop nebo file picker)
- [ ] Podporované formáty: JPG, PNG, WebP (max 10 MB per soubor)
- [ ] MVP limit: 50 obrázků najednou, vyšší plány více
- [ ] Upload probíhá paralelně (5 souborů najednou) s progress barem
- [ ] Po uploadu se zobrazí mapping tabulka: thumbnail | filename | product name | prompt | styl
- [ ] Auto-fill product name z filename (bez přípony)
- [ ] Uživatel může editovat metadata inline v tabulce
- [ ] Alternativa: nahrát CSV zvlášť pro hromadné mapování metadat (sloupec `filename` matchne uploaded soubory)

**Priority:** P0 (MVP must-have)

---

**User Story 8.2:** Jako affiliate marketér chci nahrát existující obrázky a nechat AI vygenerovat varianty s konzistentním stylem.

**Acceptance Criteria:**
- [ ] Po uploadu obrázků a vyplnění metadat → možnost "Test na vzorku" (1 obrázek, 3 AI služby)
- [ ] Po schválení vzorku → "Spustit bulk transformaci"
- [ ] Cost estimate zobrazuje náklady za celou dávku
- [ ] Výstupní obrázky jsou uloženy vedle originálů v rámci projektu
- [ ] Originální obrázky zůstávají zachovány pro případnou re-generaci

**Priority:** P0 (MVP must-have)

---

**User Story 8.3:** Jako POD seller chci nahrát obrázky přes ZIP soubor, protože mám stovky souborů organizovaných ve složce.

**Acceptance Criteria:**
- [ ] Uživatel může nahrát ZIP soubor (max 500 MB)
- [ ] Systém rozbalí ZIP a zobrazí nalezené obrázky
- [ ] Ignoruje ne-obrázkové soubory (s upozorněním)
- [ ] Pokud ZIP obsahuje CSV soubor, automaticky ho použije pro mapování metadat
- [ ] Stejný mapping flow jako u jednotlivých souborů

**Priority:** P1 (V2 - should have)

---

## 7. FEATURE REQUIREMENTS

### 6.1 MVP Features (Phase 1 - Months 1-3)

#### 🔴 Critical (P0) - Must Have

**A. Dual-Mode Interface**
- [ ] Landing/Dashboard s jasnou volbou:
  - "Enhance Existing Photos" button → Enhancement workflow
  - "Generate New Images" button → Generation workflow
- [ ] Tab switching mezi módy v test mode
- [ ] Mode selection persistence (pamatuje si poslední použitý)
- [ ] Tooltips vysvětlující rozdíl

---

**B. Enhancement Mode - Test**
- [ ] Upload existing photo (jpg, png, max 10MB)
- [ ] Preview nahraného obrázku
- [ ] Parametry:
  - Background style: Dropdown (white, studio, lifestyle, coffee_shop, outdoor, nature, modern, vintage)
  - Enhancement level: Slider (light, medium, heavy)
  - Output ratio: Buttons (1:1, 16:9, 9:16, 4:5)
- [ ] "Test with 3 AI Services" button
- [ ] Generování 3 variant paralelně:
  - DALL-E inpainting
  - Flux background replacement  
  - Nano Banana Pro img2img
- [ ] Results display:
  - Side-by-side comparison (before/after)
  - Credit cost per image pro každou AI
  - Quality indicator
  - "Use this AI for bulk" button

**Backend operations:**
```
1. Background removal (Claid API nebo remove.bg)
2. Background generation s novým pozadím (AI specific)
3. Enhancement (světlo, barvy, ostrost)
```

---

**C. Enhancement Mode - Bulk**
- [ ] Upload options:
  - Option 1: ZIP + CSV
    - ZIP obsahuje fotky
    - CSV mapping: `filename, background_style, enhancement_level`
  - Option 2: ZIP only (aplikuje stejné parametry na všechny)
- [ ] CSV validation:
  - Check že všechny filenames existují v ZIP
  - Validate column names
  - Error messages pro chybné řádky
- [ ] Preview prvních 5 fotek s parametry
- [ ] AI service selection (based on test)
- [ ] Cost calculator:
  ```
  Operations per image:
  • Background removal: 1 credit
  • Background generation (Flux): 4 credits
  Total: 5 credits × 100 images = 500 credits
  
  Your balance: 2,000 credits
  After job: 1,500 credits
  
  [Cancel] [Confirm & Start]
  ```
- [ ] Queue processing (background worker)
- [ ] Progress page s real-time updates

---

**D. Generation Mode - Test**
- [ ] Text input pro popis produktu (textarea, max 500 chars)
- [ ] Parametry:
  - Style: Dropdown (realistic, illustrated, 3D, minimalist, vintage, modern, abstract)
  - Background: Dropdown (white, gradient, contextual, transparent, custom color picker)
  - Angle/View: Dropdown (front, 45°, side, top, lifestyle)
  - Ratio: Buttons (1:1, 16:9, 9:16, 4:5)
- [ ] "Test with 3 AI Services" button
- [ ] Generování 3 variant:
  - DALL-E 3
  - Flux Pro
  - Nano Banana Pro
- [ ] Results display:
  - Side-by-side generated images
  - Credit cost per image
  - Generation time
  - "Use this AI for bulk" button

---

**E. Bulk Generation (dva režimy)**

*Režim 1: Text-only (generování od nuly)*
- [ ] CSV/Excel upload
  - Support: .csv, .xlsx
  - Max 200 rows (MVP limit)
  - Required columns: product_name, description
  - Optional: style, background, ratio
- [ ] CSV validation & preview

*Režim 2: Image-based (transformace existujících fotek)*
- [ ] Bulk image upload (viz Bulk Image Upload feature níže)
- [ ] Mapování metadat na uploaded obrázky (inline tabulka nebo CSV s `filename` sloupcem)
- [ ] Test na vzorku před bulk transformací

*Společné pro oba režimy:*
- [ ] AI service selection (based on test)
- [ ] Cost calculator před generováním
- [ ] Queue processing (background jobs)
- [ ] Progress tracking (real-time)
- [ ] Grid view vygenerovaných obrázků

---

**E2. Bulk Image Upload (P0 - Must Have)**
- [ ] Multi-file upload (drag & drop nebo file picker)
  - Podporované formáty: JPG, PNG, WebP
  - Max velikost per soubor: 10 MB
  - Upload limity dle plánu: Free 10, Starter 100, Pro 500 obrázků najednou
- [ ] Paralelní upload přes presigned URLs (5 souborů najednou)
  - MVP: Supabase Storage, scale: Cloudflare R2 (S3-kompatibilní, stejný kód)
  - Soubory NEprocházejí přes backend server (šetří bandwidth)
- [ ] Upload progress bar: "23/50 nahráno"
  - Retry logika: 3× pokus při selhání jednotlivého souboru
- [ ] Po dokončení uploadu: mapping tabulka
  - Thumbnail | Filename | Product name (auto-fill z filename) | Prompt | Styl
  - Inline editace všech polí
  - Alternativní flow: upload CSV s `filename` sloupcem pro hromadné mapování
- [ ] Validace: kontrola duplicit, neplatných formátů, překročení limitu
- [ ] Automatické generování thumbnailů (200×200) pro UI zobrazení

---

**F. Credit System**
- [ ] Credit balance display (header, všude viditelné)
- [ ] Buy Credits page:
  - 4 packages (Starter, Popular, Pro, Business)
  - Stripe checkout integration
  - Instant credit top-up
- [ ] Credit transaction history:
  - Purchases
  - Usage (per project)
  - Refunds (cancelled jobs)
- [ ] Low balance warning (<100 credits)
- [ ] Email confirmation po purchase

---

**G. Progress & Download**
- [ ] Real-time progress page:
  - Progress bar s percentage
  - ETA estimate
  - Grid preview (generated images appear progressively)
  - Current credit spend
  - "Cancel & Refund" option
- [ ] Completion notification:
  - In-app notification
  - Email notification
- [ ] Download options:
  - Individual image download (right-click)
  - "Download All (ZIP)" button
  - ZIP obsahuje metadata.csv

---

**H. Project Management (Basic)**
- [ ] Dashboard "My Projects":
  - List projektů (card nebo table view)
  - Filter: All, Enhancement, Generation
  - Sort: Date, Cost, Image count
- [ ] Project detail:
  - Grid všech obrázků
  - Project info (mode, AI used, total cost)
  - Re-download ZIP option
- [ ] Project deletion

---

**I. Auth & Onboarding**
- [ ] Email/password registrace
- [ ] Email verification
- [ ] Password reset flow
- [ ] Welcome email s 20 free credits
- [ ] Onboarding tour (tooltips první použití)

---

**F. Projects & Samples (Phase 7.5 - COMPLETED)**
- [x] Create project (simplified - name only, auto-open edit mode)
- [x] Editable project header with manual save
  - [x] Name, Mode (generation/enhancement), Base Prompt
  - [x] Style (realistic, illustrated, 3d, minimalist, artistic)
  - [x] Background (white, gradient, contextual, transparent)
  - [x] Aspect Ratio (1:1, 16:9, 9:16, 4:3, 3:2)
  - [x] Auto-save settings before sample generation
- [x] Generate sample (select 1-3 AI services via checkboxes)
- [x] Side-by-side comparison with individual timing per service
- [x] Lock style workflow
  - [x] Unified service selection UI with quality/cost/speed comparison
  - [x] Confirmation dialog explaining what locking does
  - [x] Consistency seed generation (for Flux Pro bulk)
  - [x] Project status: draft → queued (locked)
- [x] Unlock project feature (revert to draft, keep seed as reference)
- [x] Save sample to project storage (generated_images table)
- [x] Image preview modal (ESC, overlay click, body scroll lock)
- [x] Auto-open edit mode for new projects (?new=true query param)
- [x] Dashboard with project listing
- [x] Pre-fill scene description from most recent sample

**G. AI Parameter Optimization (Phase 7.6 - COMPLETED)**
- [x] Structured parameters instead of prompt-only generation
- [x] Quality level: Standard, High, Ultra - affects resolution & cost
- [x] Creativity level: Low, Medium, High - affects prompt adherence
- [x] DALL-E 3 parameter mapping:
  - [x] quality: standard | hd (maps from quality_level)
  - [x] style: natural | vivid (maps from creativity_level)
- [x] Flux Pro parameter mapping:
  - [x] guidance: 3.5-10.0 (prompt adherence, maps from creativity_level)
  - [x] num_inference_steps: 20-50 (quality, maps from quality_level)
  - [x] seed: integer (consistency across bulk, generated at lock time)
- [x] Nano Banana Pro parameter mapping:
  - [x] temperature: 0.3-1.8 (creativity, maps from creativity_level)
- [x] Parameter mapper utility (lib/ai/parameter-mapper.ts)
- [x] Prompt builder utility (lib/ai/prompt-builder.ts)
- [x] Console logging for debugging parameter mapping

**H. Context Upload & AI Context Generation (Phase 7.8-7.9 - COMPLETED)**
- [x] Collapsible context section in project detail (default collapsed)
- [x] Per-file upload progress indicator
- [x] AI-assisted context generation with GPT-4o-mini
- [x] 3-step wizard modal: template selection → prompt input → preview/edit
- [x] 4 built-in templates: product_category, brand_guidelines, style_guide, custom
- [x] Column rename: ai_service → ai_service_id, selected_service → locked_ai_service_id

**I. Dynamic Pricing & Cost Management (Phase 7.10A-B - COMPLETED)**
- [x] Database-driven pricing with `service_costs` + `pricing_coefficients` tables
- [x] Materialized view `current_service_pricing` for fast credit lookups
- [x] 11 service pricing tiers (4 DALL-E, 3 Flux, 3 Nano Banana, 1 GPT-4o-mini)
- [x] DB functions: `get_credits_required()`, `refresh_pricing_cache()`
- [x] Auto-refresh triggers on cost/coefficient changes
- [x] Pricing operations library (`lib/pricing/operations.ts`)
- [x] Auto-update system for Flux (monitoring) and GPT (calculated from token costs)
- [x] Admin API: `GET /api/admin/pricing`, `POST /api/admin/pricing/auto-update`
- [x] Public API: `POST /api/pricing/calculate-credits` (single + batch)
- [x] `useServiceCredits` React hook with 300ms debounce
- [x] Dynamic credit labels in sample generation form (replaces static values)
- [x] Total cost per sample display
- [x] Real-time credit display in fine-tuning modals
- [x] Pricing tier hints on Flux steps slider
- [x] Context generator shows "1 credit (fixed)"

---

### 6.2 Phase 2 Features (Months 4-6)

#### 🟡 Important (P1) - Should Have

**A. Advanced Editing**
- [ ] Selective regeneration:
  - Multi-select obrázky (checkboxes)
  - "Regenerate Selected" button
  - Option změnit parametry jen pro vybrané
  - Credit cost estimate pro re-generation
- [ ] Image variants:
  - Generate 2-3 variants jednoho obrázku
  - A/B comparison

**B. Templates & Presets**
- [ ] Saved settings:
  - "Save as Preset" button
  - Name preset (e.g., "Coffee Shop Enhancement")
  - Apply preset v bulk upload
- [ ] Template library:
  - Pre-made presets pro různé kategorie
  - "E-commerce White BG"
  - "Lifestyle Coffee Theme"
  - "Minimal Product"

**C. Team Collaboration**
- [ ] Team workspaces:
  - Invite members (email)
  - Shared credit pool
  - Role permissions (Admin, Member, Viewer)
- [ ] Project sharing:
  - Read-only share link
  - Password protection
- [ ] Comments on images (V2.1)

**D. Enhanced Project Management**
- [ ] Duplicate project (reuse settings)
- [ ] Project templates
- [ ] Bulk actions (delete multiple, archive)
- [ ] Export project report (PDF)

**E. Google Drive Integration**
- [ ] Connect Google Drive account
- [ ] Select folder for bulk upload
- [ ] Auto-upload results back to Drive

---

### 6.3 Phase 3+ Features (Nice to Have)

#### 🟢 Future (P2-P3)

**A. Additional AI Services**
- ℹ️ MVP již obsahuje: DALL-E 3, Flux Pro, Nano Banana Pro (Google Gemini)
- [ ] Midjourney integration (když budou mít API)
- [ ] Leonardo.ai
- [ ] Custom AI models upload

**B. Advanced Features**
- [ ] Image upscaling (2K, 4K)
- [ ] Image-to-video generation
- [ ] Batch color correction
- [ ] Auto-tagging (AI generated tags)
- [ ] Background removal only mode (cheap/fast)

**C. API (V3)**
- [ ] REST API for bulk processing
- [ ] Webhook notifications
- [ ] API documentation
- [ ] Rate limiting
- [ ] API keys management

**D. Integrations**
- [ ] Shopify plugin
- [ ] WooCommerce plugin
- [ ] Zapier integration
- [ ] Dropbox integration

**E. Advanced Analytics**
- [ ] Credit usage analytics
- [ ] Cost per project breakdown
- [ ] AI performance comparison (your usage)
- [ ] ROI calculator

---

## 8. TECHNICAL REQUIREMENTS

### 7.1 Tech Stack

**Frontend:**
- Framework: Next.js 14+ (React, App Router)
- UI Library: Shadcn/ui + Tailwind CSS
- State Management: Zustand nebo React Context
- Forms: React Hook Form + Zod validation

**Backend:**
- Framework: Next.js API routes (nebo FastAPI pro heavy processing)
- Database: PostgreSQL (Supabase nebo Neon)
- Queue: BullMQ (Redis-based) pro background jobs
- Storage: Supabase Storage (MVP) → Cloudflare R2 (scale, 200+ uživatelů)

**Utilities (Phase 7.6):**
- Parameter Mapper (`lib/ai/parameter-mapper.ts`) - Maps UI settings to service-specific params
- Prompt Builder (`lib/ai/prompt-builder.ts`) - Combines base_prompt + scene + style + background

**Pricing System (Phase 7.10):**
- Pricing Operations (`lib/pricing/operations.ts`) - getServicePricing, getCreditsRequired, getServiceId, calculateJobCredits, refreshPricingCache
- Auto-Update (`lib/pricing/auto-update.ts`) - Flux monitoring + GPT token-based calculation
- Types (`lib/types/pricing.ts`) - ServiceCost, PricingCoefficient, CurrentServicePricing, ServiceIdType
- React Hook (`hooks/useServiceCredits.ts`) - Debounced credit fetching with AbortController

**AI Services:**
- OpenAI DALL-E 3 API
- Replicate API (Flux Pro)
- Google Gemini API (Nano Banana Pro / gemini-3-pro-image-preview)

**Payments:**
- Stripe (subscription + usage-based billing)

**Hosting:**
- Vercel (frontend + serverless functions)
- Railway / Render (background workers)

---

### 7.2 System Architecture

```
[User Browser]
     ↓
[Next.js Frontend]
     ↓
[Next.js API Routes]
     ↓
     ├─→ [PostgreSQL] (metadata, projects, users)
     ├─→ [Redis/BullMQ] (job queue)
     ├─→ [Supabase Storage → R2] (image storage)
     └─→ [AI APIs]
          ├─ OpenAI DALL-E
          ├─ Replicate (Flux Pro)
          └─ Google Gemini (Nano Banana Pro)
```

**Background Worker:**
- Zpracovává bulk jobs z queue
- Paralelní generování (5-10 images současně)
- Error handling & retry logic
- Webhook notifications

---

### 7.3 Data Model (Database Schema)

**Users Table:**
```sql
id: uuid (PK)
email: string (unique)
password_hash: string
credit_balance: integer (default: 20 -- welcome credits)
stripe_customer_id: string (nullable)
email_verified: boolean (default: false)
created_at: timestamp
updated_at: timestamp
```

**Credit_Transactions Table:**
```sql
id: uuid (PK)
user_id: uuid (FK → Users)
type: enum ('purchase', 'usage', 'refund', 'bonus', 'welcome')
amount: integer (+ or -, e.g., +500 for purchase, -10 for usage)
description: string ('Purchased 500 credits', 'Project: Q1 Catalog', 'Cancelled job refund')
balance_after: integer (credit balance after this transaction)
project_id: uuid (FK → Projects, nullable)
stripe_payment_intent_id: string (nullable)
created_at: timestamp
```

**Credit_Packages Table:**
```sql
id: uuid (PK)
name: string ('Starter', 'Popular', 'Pro', 'Business')
credits: integer (100, 500, 2000, 10000)
price_cents: integer (1000, 4000, 12000, 45000)
discount_percent: integer (0, 20, 40, 55)
is_active: boolean (default: true)
sort_order: integer
created_at: timestamp
```

**AI_Services_Pricing Table:**
```sql
id: uuid (PK)
service: enum ('dalle3', 'flux_pro', 'nano_banana_pro')
mode: enum ('enhancement', 'generation')
operation: enum ('bg_removal', 'bg_generation', 'enhancement', 'full_generation')
quality: enum ('standard', 'premium', 'hd')
credit_cost: integer
is_active: boolean (default: true)
created_at: timestamp
updated_at: timestamp

-- Examples:
-- dalle3, generation, full_generation, standard → 10 credits
-- flux_pro, enhancement, bg_generation, standard → 4 credits
-- nano_banana_pro, generation, full_generation, standard → 3 credits
```

**Projects Table:**
```sql
id: uuid (PK)
user_id: uuid (FK → Users)
name: string
mode: enum ('enhancement', 'generation', 'text_only', 'image_based')  -- rozšířeno o typ projektu
ai_service: enum ('dalle3', 'flux_pro', 'nano_banana_pro')
total_images: integer
total_credits_spent: integer
status: enum ('draft', 'queued', 'processing', 'completed', 'failed', 'cancelled')
settings: jsonb ({
  "background_style": "coffee_shop",
  "enhancement_level": "medium",
  "style": "realistic",
  "ratio": "1:1"
})
expires_at: timestamp                      -- datum expirace dle plánu (NOVÉ)
created_at: timestamp
updated_at: timestamp
completed_at: timestamp (nullable)
```

**Images Table:**
```sql
id: uuid (PK)
project_id: uuid (FK → Projects)
product_name: string
uploaded_file_id: uuid (FK → Uploaded_Files, nullable)  -- odkaz na zdrojový soubor (null pro text-only režim) (NOVÉ)
source_image_url: string (nullable -- null pro generation mode)
generated_image_url: string
thumbnail_url: string
ai_service: enum ('dalle3', 'flux_pro', 'nano_banana_pro')
mode: enum ('enhancement', 'generation')
prompt: text (nullable -- pro generation mode)
settings: jsonb (specific parametry pro tento obrázek)
credits_spent: integer
status: enum ('pending', 'processing', 'completed', 'failed')
error_message: text (nullable)
generation_time_seconds: integer (nullable)
expires_at: timestamp                      -- datum expirace (NOVÉ)
created_at: timestamp
completed_at: timestamp (nullable)
```

**Jobs Table (Queue):**
```sql
id: uuid (PK)
project_id: uuid (FK → Projects)
user_id: uuid (FK → Users)
mode: enum ('enhancement', 'generation')
payload: jsonb ({
  "csv_data": [...],
  "ai_service": "flux_pro",
  "settings": {...}
})
status: enum ('queued', 'processing', 'completed', 'failed', 'cancelled')
progress: integer (0-100)
images_processed: integer
images_total: integer
credits_reserved: integer (locked při start)
credits_refunded: integer (při cancel)
error_message: text (nullable)
started_at: timestamp (nullable)
completed_at: timestamp (nullable)
created_at: timestamp
```

**Uploaded_Files Table (NOVÉ):**
```sql
id: uuid (PK)
project_id: uuid (FK → Projects)
original_filename: string                  -- původní název souboru
product_name: string                       -- název produktu (auto-fill nebo z CSV)
storage_original_url: string               -- cesta k originálu v storage (Supabase Storage MVP / R2 scale)
storage_thumbnail_url: string              -- cesta k thumbnailu v storage
file_size_bytes: integer
mime_type: string
upload_status: enum ('uploading', 'confirmed', 'failed')
expires_at: timestamp
created_at: timestamp
```

**Projects Table (Phase 7.5 + 7.6):**
```sql
id: uuid (PK)
user_id: uuid (FK → users)
name: string (e.g., "1960s Bar Campaign")
mode: enum ('generation', 'enhancement') DEFAULT 'generation'
base_prompt: text (nullable) -- Overall style/theme for project
ai_service: enum ('openai_dalle3', 'replicate_flux', 'google_nano_banana')
default_ratio: string ('1:1', '16:9', '9:16', '4:3', '3:2')

-- Phase 7.5 additions
style: string DEFAULT 'realistic' -- realistic, illustrated, 3d, minimalist, artistic
background: string DEFAULT 'white' -- white, gradient, contextual, transparent

-- Phase 7.6 additions
quality_level: enum ('standard', 'high', 'ultra') DEFAULT 'standard'
creativity_level: enum ('low', 'medium', 'high') DEFAULT 'medium'
consistency_seed: integer -- For Flux Pro consistency in bulk generation

-- Phase 7.7 additions
context_config: jsonb DEFAULT '{}' -- Reference images and text documents
-- Example: { reference_images: [{id, url, filename, uploaded_at}], text_documents: [{id, url, filename, uploaded_at}] }

status: enum ('draft', 'queued', 'processing', 'completed', 'failed', 'cancelled')
locked_sample_id: uuid (FK → samples, nullable) -- Sample that defined the locked style
total_images: integer DEFAULT 0
total_credits_spent: integer DEFAULT 0
created_at: timestamp
updated_at: timestamp
```

**Samples Table (Phase 7.5):**
```sql
id: uuid (PK)
project_id: uuid (FK → projects)
scene_description: text NOT NULL

-- Generated results from 1-3 AI services
generated_images: jsonb -- Array of {aiService, displayName, imageUrl, creditCost, generationTime, error}

selected_service: string -- Which AI service user prefers for bulk
is_locked: boolean DEFAULT false -- If this sample locked the project style
created_at: timestamptz
```

**Generated Images Table (Phase 7.6):**
```sql
-- Stores both sample and bulk generated images permanently
id: uuid (PK)
project_id: uuid (FK → projects) ON DELETE CASCADE
sample_id: uuid (FK → samples, nullable) ON DELETE SET NULL -- If from sample generation
job_id: uuid (FK → jobs, nullable) ON DELETE SET NULL -- If from bulk generation

-- Image data
image_url: text NOT NULL
ai_service: text NOT NULL
prompt_used: text NOT NULL DEFAULT ''
scene_description: text

-- Metadata
generation_time: integer -- seconds per service
credit_cost: integer DEFAULT 0
parameters: jsonb DEFAULT '{}' -- Stores quality_level, creativity_level, style, background

-- Classification
image_type: enum ('sample', 'bulk') DEFAULT 'sample'
is_favorite: boolean DEFAULT false

created_at: timestamptz
-- Indexes: project_id, sample_id, image_type
```

**Project Service Configs Table (Phase 7.7):**
```sql
-- Per-service fine-tuning configuration
id: uuid (PK)
project_id: uuid (FK → projects) ON DELETE CASCADE
ai_service: enum ('openai_dalle3', 'replicate_flux', 'google_nano_banana')

use_basic_params: boolean DEFAULT true
-- true = use project's quality_level/creativity_level (mapped to service params)
-- false = use custom_params below

custom_params: jsonb
-- Flux: { guidance, num_inference_steps, interval, prompt_upsampling, safety_tolerance }
-- Nano Banana: { temperature, topP, topK, enable_search }
-- DALL-E: { quality, style }

created_at: timestamptz
updated_at: timestamptz
UNIQUE(project_id, ai_service)
```

**Update Jobs Table (Phase 7.5):**
```
+ project_id: uuid (FK → projects, nullable) -- vazba na projekt pro konzistenci stylu
```

**Service Costs Table (Phase 7.10A):**
```sql
id: uuid (PK, DEFAULT gen_random_uuid())
service_id: text NOT NULL -- e.g., 'dalle3_standard_square', 'flux_high', 'nano_1k'
ai_service_id: text -- Parent AI service (e.g., 'openai_dalle3')
cost_usd: decimal(10,6) NOT NULL -- Actual API cost in USD
valid_from: date NOT NULL DEFAULT CURRENT_DATE
valid_to: date -- NULL = currently active
source: enum ('api_auto', 'manual', 'calculated') DEFAULT 'manual'
notes: text
created_at: timestamptz DEFAULT now()

-- Unique: only one active cost per service (valid_to IS NULL)
-- Indexes: service_id, (service_id, valid_to) for current lookups
-- RLS: public SELECT, service_role INSERT/UPDATE

-- Seed data (11 service tiers):
-- dalle3_standard_square: $0.040, dalle3_standard_wide: $0.080
-- dalle3_hd_square: $0.080, dalle3_hd_wide: $0.120
-- flux_standard: $0.030, flux_high: $0.060, flux_ultra: $0.100
-- nano_1k: $0.020, nano_2k: $0.040, nano_4k: $0.080
-- gpt4o_mini_context: $0.000630
```

**Pricing Coefficients Table (Phase 7.10A):**
```sql
id: uuid (PK, DEFAULT gen_random_uuid())
coefficient: decimal(5,2) NOT NULL DEFAULT 1.0 -- Markup multiplier
valid_from: date NOT NULL DEFAULT CURRENT_DATE
valid_to: date -- NULL = currently active
name: text NOT NULL DEFAULT 'default'
description: text
created_at: timestamptz DEFAULT now()

-- Controls global markup: user_price = cost_usd * coefficient
-- Seed: coefficient = 1.0 (no markup for MVP)
```

**Current Service Pricing View (Phase 7.10A):**
```sql
-- Materialized view: current_service_pricing
-- Joins service_costs + pricing_coefficients where valid_to IS NULL
-- Pre-calculates: user_price_usd = cost_usd * coefficient
-- Pre-calculates: credits_required = CEIL(user_price_usd / 0.01)
-- Auto-refreshed via triggers on service_costs/pricing_coefficients changes
-- Columns: service_id, ai_service_id, cost_usd, coefficient, user_price_usd,
--   credits_required, cost_valid_from, coefficient_valid_from, source, notes
```

---

### 7.4 API Endpoints

**Auth:**
- `POST /api/auth/register`
  - Body: `{ email, password }`
  - Response: `{ user, access_token }` + 20 welcome credits
- `POST /api/auth/login`
  - Body: `{ email, password }`
  - Response: `{ user, access_token }`
- `POST /api/auth/logout`
- `POST /api/auth/verify-email`
  - Body: `{ token }`
- `POST /api/auth/reset-password`

---

**Credits:**
- `GET /api/credits/balance`
  - Response: `{ balance: 1247, transactions_count: 15 }`
  
- `GET /api/credits/packages`
  - Response: `{ packages: [{ id, name, credits, price, discount }] }`
  
- `POST /api/credits/purchase`
  - Body: `{ package_id }`
  - Response: `{ stripe_session_url }` → redirect to Stripe
  
- `POST /api/credits/webhook/stripe`
  - Stripe webhook pro payment confirmation
  - Auto top-up credits
  
- `GET /api/credits/transactions`
  - Query: `?page=1&limit=20`
  - Response: `{ transactions: [...], total, page }`

---

**Test Mode - Enhancement:**
- `POST /api/test/enhancement`
  - Body: 
    ```json
    {
      "image": "base64..." nebo file upload,
      "settings": {
        "background_style": "coffee_shop",
        "enhancement_level": "medium",
        "ratio": "1:1"
      }
    }
    ```
  - Response:
    ```json
    {
      "results": [
        {
          "ai_service": "dalle3",
          "image_url": "https://...",
          "credit_cost": 8,
          "generation_time": 12
        },
        {
          "ai_service": "flux_pro",
          "image_url": "https://...",
          "credit_cost": 5,
          "generation_time": 8
        },
        {
          "ai_service": "nano_banana_pro",
          "image_url": "https://...",
          "credit_cost": 4,
          "generation_time": 6
        }
      ],
      "test_id": "uuid"
    }
    ```

---

**Test Mode - Generation:**
- `POST /api/test/generation`
  - Body:
    ```json
    {
      "description": "Blue ceramic coffee mug, minimalist...",
      "settings": {
        "style": "realistic",
        "background": "white",
        "angle": "front",
        "ratio": "1:1"
      }
    }
    ```
  - Response: Same format as enhancement

---

**Bulk Enhancement:**
- `POST /api/bulk/enhancement/upload`
  - Body: multipart/form-data
    - `zip_file`: ZIP s fotkami
    - `csv_file`: CSV mapping (optional)
    - `settings`: JSON (pokud není CSV)
  - Response: `{ project_id, images_preview: [first 5] }`
  
- `POST /api/bulk/enhancement/start`
  - Body:
    ```json
    {
      "project_id": "uuid",
      "ai_service": "flux_pro",
      "confirm": true
    }
    ```
  - Response:
    ```json
    {
      "job_id": "uuid",
      "estimated_credits": 500,
      "estimated_time_minutes": 10,
      "current_balance": 2000,
      "balance_after": 1500
    }
    ```

---

**Bulk Generation:**
- `POST /api/bulk/generation/upload`
  - Body: multipart/form-data
    - `csv_file`: CSV s descriptions
  - Response: `{ project_id, items_preview: [first 5] }`
  
- `POST /api/bulk/generation/start`
  - Body: Same as enhancement (+ optional `projectId` for style consistency)
  - Response: Same as enhancement

---

**Projects (Phase 7.5):**
- `POST /api/projects` - vytvoření nového projektu
  - Body: `{ name, basePrompt, aiService, defaultRatio }`
  - Response: `{ projectId, ... }`
- `GET /api/projects` - seznam projektů uživatele
- `GET /api/projects/:id` - detail projektu
- `PATCH /api/projects/:id` - úprava projektu (pouze pokud status=draft)
- `DELETE /api/projects/:id` - smazání projektu

**Samples (Phase 7.5):**
- `POST /api/projects/:id/samples` - generování style sample
  - Body: `{ sceneDescription, selectedServices: { dalle3: bool, flux: bool, nanoBanana: bool } }`
  - Response: `{ sampleId, generatedImages: [{ aiService, imageUrl, creditCost }] }`
- `PATCH /api/projects/:id/samples/:sampleId/lock` - zamknutí sample jako referenčního
  - Aktualizuje project.status na 'locked'
  - Response: `{ project: { status: 'locked', locked_sample_id: sampleId } }`

---

**Image Upload:**
- `POST /api/upload/init` - inicializuje upload session, vrátí presigned URLs
  - Body: `{ project_id, files: [{ filename, size, mime_type }] }`
  - Response: `{ uploads: [{ file_id, presigned_put_url, thumbnail_url }] }`
- `POST /api/upload/confirm/:file_id` - potvrdí úspěšný upload jednoho souboru
  - Backend ověří existenci v storage (Supabase Storage / R2), spustí thumbnail generování
  - Response: `{ status: "confirmed", thumbnail_url }`
- `GET /api/upload/status/:project_id` - stav uploadu celého projektu
  - Response: `{ total: 50, confirmed: 42, failed: 1, pending: 7 }`
- `PUT /api/upload/metadata/:project_id` - hromadná aktualizace metadat
  - Body: `{ files: [{ file_id, product_name, prompt, style }] }`
- `POST /api/upload/metadata-csv/:project_id` - upload CSV pro mapování metadat
  - Body: CSV soubor s `filename` sloupcem

---

**Job Management:**
- `GET /api/jobs/:job_id/status`
  - Response:
    ```json
    {
      "status": "processing",
      "progress": 42,
      "images_processed": 42,
      "images_total": 100,
      "credits_spent": 210,
      "estimated_time_remaining": 360,
      "preview_images": [... latest 10]
    }
    ```
  
- `POST /api/jobs/:job_id/cancel`
  - Response:
    ```json
    {
      "cancelled": true,
      "credits_refunded": 290,
      "images_completed": 42,
      "new_balance": 1790
    }
    ```

- `GET /api/jobs/:job_id/download`
  - Response: ZIP file download (signed URL)

---

**Projects (Updated Phase 7.5-7.6):**
- `POST /api/projects` - Create project (name only, returns draft project)
  - Body: `{ name }`
  - Response: `{ success, project }`
- `GET /api/projects` - List user's projects
  - Response: `{ success, projects: [...] }`
- `GET /api/projects/:id` - Project detail + samples
  - Response: `{ success, project, samples: [...] }`
- `PATCH /api/projects/:id` - Update project settings
  - Body: `{ name?, mode?, base_prompt?, style?, background?, default_ratio?, quality_level?, creativity_level? }`
  - Response: `{ success, project }`
- `DELETE /api/projects/:id`
- `PATCH /api/projects/:id/unlock` - Unlock locked project (revert to draft)
  - Response: `{ success, project }`

**Samples (Phase 7.5):**
- `POST /api/projects/:id/samples` - Generate sample with 1-3 AI services
  - Body: `{ scene_description, selected_services: { dalle3: bool, flux: bool, nanoBanana: bool } }`
  - Response: `{ success, sample: { id, scene_description, generated_images: [...] } }`
- `PATCH /api/projects/:id/samples/:sampleId/lock` - Lock style + set AI service
  - Body: `{ selected_service: 'openai_dalle3' | 'replicate_flux' | 'google_nano_banana' }`
  - Response: `{ success, project: { status: 'queued', ai_service, consistency_seed } }`

**Generated Images (Phase 7.6):**
- `POST /api/projects/:id/images` - Save sample image to project storage
  - Body: `{ sample_id, image_url, ai_service, prompt_used, scene_description, generation_time, credit_cost, parameters }`
  - Response: `{ success, image }`
- `GET /api/projects/:id/images` - Get all saved images for project
  - Response: `{ success, images: [...] }`

---

**AI Pricing (Public):**
- `GET /api/pricing/ai-services`
  - Response:
    ```json
    {
      "enhancement": {
        "dalle3": { "bg_generation": 8, "enhancement": 2 },
        "flux_pro": { "bg_generation": 4, "enhancement": 1 },
        "nano_banana_pro": { "bg_generation": 3, "enhancement": 1 }
      },
      "generation": {
        "dalle3": { "standard": 10, "hd": 15 },
        "flux_pro": { "standard": 5, "premium": 8 },
        "nano_banana_pro": { "standard": 3, "premium": 5 }
      }
    }
    ```

**Dynamic Pricing (Phase 7.10):**
- `POST /api/pricing/calculate-credits` - Calculate credits for service(s)
  - Single: `{ ai_service: "openai_dalle3", params: { quality: "hd", ratio: "16:9" } }`
  - Batch: `{ services: [{ ai_service, params, count }] }`
  - Response (single): `{ success, service_id: "dalle3_hd_wide", credits_required: 12 }`
  - Response (batch): `{ success, total_credits, breakdown: [{ service, service_id, credits_per_image, count, subtotal }] }`
- `GET /api/admin/pricing` - Get all current service pricing (from materialized view)
  - Response: `{ success, pricing: [...], count }`
- `POST /api/admin/pricing/auto-update` - Trigger pricing auto-update (bearer token auth)
  - Header: `Authorization: Bearer <PRICING_UPDATE_SECRET>`
  - Response: `{ success, result: { flux: "checked", gpt: "updated" } }`

---

### 7.5 Performance Requirements

**Response Times:**
- Test mode (3 varianty): < 60 sekund
- Bulk job start: < 5 sekund (okamžitě do queue)
- Bulk processing: ~10-15 obrázků/minutu (parallel)
- Dashboard load: < 2 sekundy

**Scalability:**
- Support pro 1000 současných uživatelů (MVP)
- Queue capacity: 100 jobs současně
- Image storage: Supabase Storage (MVP, dle plánu) → R2 unlimited (scale)

**Reliability:**
- Uptime: 99.5%+ (MVP), 99.9%+ (V2)
- Auto-retry failed generations (max 3x)
- Backup databáze denně

**AI Parameter Optimization (Phase 7.6):**
- Quality levels map to service-specific settings:
  - Standard: Fastest, lowest cost (DALL-E standard, Flux 25 steps, Nano Banana 1K)
  - High: Balanced quality/speed (DALL-E hd, Flux 35 steps)
  - Ultra: Best quality, higher cost (DALL-E hd, Flux 50 steps)
- Creativity levels control prompt adherence:
  - Low: Strict prompt following (guidance 9.5, temp 0.5)
  - Medium: Balanced (guidance 7.5, temp 0.9)
  - High: Creative interpretation (guidance 5.0, temp 1.4)
- Consistency seeds ensure similar results across bulk generations (Flux Pro)
- Parameter mapper: `lib/ai/parameter-mapper.ts`
- Prompt builder: `lib/ai/prompt-builder.ts`

---

### 7.6 Security Requirements

- [ ] HTTPS všude
- [ ] Password hashing (bcrypt)
- [ ] JWT tokens pro auth
- [ ] Rate limiting (100 req/min per user)
- [ ] File upload validation (type, size)
- [ ] SQL injection prevention (ORM)
- [ ] XSS prevention
- [ ] CSRF tokens
- [ ] User data isolation (pouze vlastní projekty)

---

### 7.7 Storage Architecture & Retention Policy

**Dvoustupňová strategie:**

| Fáze | Provider | Kdy | Důvod |
|------|----------|-----|-------|
| **MVP** | Supabase Storage | 0–200 aktivních uživatelů | Již v stacku, méně infrastruktury, RLS policies, jeden dashboard |
| **Scale** | Cloudflare R2 | 200+ aktivních uživatelů nebo egress > $50/měsíc | Nulové egress fees, levnější při objemu |

Migrace MVP → R2 je jednoduchá — obojí je S3-kompatibilní API, stačí změnit credentials a endpoint URL.

**MVP: Supabase Storage**
- Již součást stacku (stejný projekt, dashboard, billing)
- Podporuje presigned URLs pro přímý upload z frontendu
- RLS policies pro file-level access control
- S3-kompatibilní API (kód půjde 1:1 migrovat na R2)
- ~$0.021/GB/měsíc za storage, egress $0.09/GB (zdarma 2 GB/měsíc v plánu)

**Budoucnost: Cloudflare R2**
- Nulové egress fees (klíčové při velkém objemu stahování)
- S3-kompatibilní API
- ~$0.015/GB/měsíc za storage

**Bucket struktura (stejná pro obě fáze):**

```
Bucket: app-storage
├── /{user_id}/
│   ├── /inputs/
│   │   └── /{project_id}/
│   │       ├── originals/        ← plná kvalita uploadovaných obrázků
│   │       │   ├── {uuid}.jpg
│   │       │   └── {uuid}.png
│   │       └── thumbnails/       ← 200×200 náhledy pro UI
│   │           └── {uuid}_thumb.jpg
│   └── /outputs/
│       └── /{project_id}/
│           └── {uuid}.png        ← AI vygenerované obrázky
```

**Upload Flow (presigned URLs — funguje identicky na Supabase Storage i R2):**
1. Frontend volá `POST /api/upload/init` → backend vrátí N× presigned PUT URL
2. Frontend uploaduje přímo do storage paralelně (5 souborů najednou), neprochází serverem
3. Po každém úspěšném uploadu: `POST /api/upload/confirm/{image_id}` → backend ověří existenci v storage
4. Worker vygeneruje thumbnail (background job)
5. Po uploadu všech souborů → zobrazí mapping tabulka

**Retention Policy (doba uchovávání):**

| Plán | Input obrázky | Output obrázky | ZIP download cache |
|------|---------------|-----------------|-------------------|
| Free | 7 dní | 7 dní | 24 hodin |
| Starter | 30 dní | 30 dní | 7 dní |
| Pro | 90 dní | 90 dní | 30 dní |
| Business | 180 dní | 180 dní | 90 dní |

**Cleanup mechanismus:**
- Každý soubor v DB má `expires_at` timestamp
- Denní cron job maže soubory kde `expires_at < now()` (ze storage i z DB)
- Uživatel dostane email upozornění 3 dny před expirací
- Po smazání projektu se mažou inputs i outputs najednou (celá složka)

**ZIP generování:**
- ZIP se generuje on-demand (stream ze storage → zip → stream uživateli)
- ZIP se dočasně cachuje pro opakované stažení (dle plánu)
- Negenerovat ZIP předem, neukládat trvale

**Kalkulace nákladů (odhad):**

*MVP fáze (Supabase Storage):*

| Uživatelů | Průměr img/měsíc | Aktivní storage | Storage cost | Egress (odhad) | Celkem/měsíc |
|-----------|-------------------|-----------------|--------------|----------------|--------------|
| 50 | 200 | ~10 GB | ~$0.21 | ~$2-5 | ~$2-5 |
| 100 | 300 | ~30 GB | ~$0.63 | ~$5-15 | ~$6-16 |
| 200 | 400 | ~80 GB | ~$1.68 | ~$15-40 | ~$17-42 |

*Scale fáze (Cloudflare R2 — nulový egress):*

| Uživatelů | Průměr img/měsíc | Aktivní storage | Náklad R2/měsíc |
|-----------|-------------------|-----------------|-----------------|
| 500 | 400 | ~270 GB | ~$4.05 |
| 1000 | 500 | ~900 GB | ~$13.50 |

---

## 9. UX/UI GUIDELINES

### 8.1 Design Principles

1. **Clarity over Cleverness** - každý krok musí být okamžitě pochopitelný
2. **Progressive Disclosure** - nezahlcovat uživatele, ukázat jen co potřebuje
3. **Instant Feedback** - každá akce má okamžitou odezvu
4. **Trust through Transparency** - ceny a časy vždy viditelné

---

### 8.2 Key Screens (Wireframe Popis)

#### Screen 1: Dashboard (Home)
```
┌────────────────────────────────────────┐
│ Logo    Projects  Billing  Settings   │ ← Header
├────────────────────────────────────────┤
│                                        │
│  [+ New Project]  [Upload CSV]        │ ← CTA buttons
│                                        │
│  Recent Projects:                      │
│  ┌─────────────────┐ ┌──────────────┐ │
│  │ Project 1       │ │ Project 2    │ │
│  │ 50 images       │ │ 120 images   │ │
│  │ $12.50          │ │ $28.40       │ │
│  │ Yesterday       │ │ 3 days ago   │ │
│  └─────────────────┘ └──────────────┘ │
│                                        │
│  Usage this month: 150/500 images     │
│  [View all projects →]                 │
│                                        │
└────────────────────────────────────────┘
```

---

#### Screen 2: Test Mode
```
┌────────────────────────────────────────┐
│ ← Back to Dashboard                    │
├────────────────────────────────────────┤
│  Step 1: Upload Product Image          │
│  [Drag & drop nebo click to upload]   │
│                                        │
│  Step 2: Describe what you want        │
│  Prompt: [________________________]   │
│  Style:  [Realistic ▼]                │
│  Background: [White ▼]                │
│  Ratio: [1:1 ▼]                       │
│                                        │
│  [Generate 3 Variants] ← Big CTA      │
│                                        │
│  ─── Results (after generation) ───   │
│                                        │
│  ┌──────┐    ┌──────┐    ┌──────┐    │
│  │DALL-E│    │ Flux │    │NBPro │    │
│  │      │    │      │    │      │    │
│  │[img] │    │[img] │    │[img] │    │
│  │$0.47 │    │$0.24 │    │$0.13 │    │
│  │      │    │      │    │      │    │
│  │[Use] │    │[Use] │    │[Use] │    │
│  └──────┘    └──────┘    └──────┘    │
│                                        │
│  Satisfied? → [Start Bulk Generation] │
└────────────────────────────────────────┘
```

---

#### Screen 3: Bulk Generation Setup
```
┌────────────────────────────────────────┐
│ ← Back                                 │
├────────────────────────────────────────┤
│  Bulk Generation Setup                 │
│                                        │
│  Selected AI: [Flux ▼]  (based on test)│
│                                        │
│  Upload Products CSV:                  │
│  [Choose File] products.csv (100 rows) │
│                                        │
│  Preview (first 5 rows):               │
│  product_name  | description           │
│  Blue Mug      | Ceramic coffee mug... │
│  Red T-shirt   | Cotton casual tee...  │
│  ...                                   │
│                                        │
│  ─── Cost Estimate ───                │
│  100 images × $0.24 = $24.00          │
│  Estimated time: 8-12 minutes         │
│                                        │
│  [✓] I confirm and start generation    │
│  [Start Generating] ← Disabled until ✓ │
│                                        │
└────────────────────────────────────────┘
```

---

#### Screen 4: Generation Progress
```
┌────────────────────────────────────────┐
│  Generating 100 images...              │
│  ████████░░░░░░░░░░  42/100  (42%)    │
│  Estimated time remaining: 6 minutes   │
│                                        │
│  [Cancel Job] ← refund nevygenerované  │
│                                        │
│  ─── Generated Images (live update) ──│
│  ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐      │
│  │img│ │img│ │img│ │img│ │...│      │
│  └───┘ └───┘ └───┘ └───┘ └───┘      │
│  ┌───┐ ┌───┐ ┌───┐ ┌───┐            │
│  │img│ │img│ │img│ │img│            │
│  └───┘ └───┘ └───┘ └───┘            │
│  ... (grid pokračuje)                  │
│                                        │
└────────────────────────────────────────┘
```

---

#### Screen 5: Project Results
```
┌────────────────────────────────────────┐
│ ← Projects  |  Project: "Q1 Products" │
├────────────────────────────────────────┤
│                                        │
│  ✅ 100 images generated successfully  │
│  Total cost: $24.00                    │
│  Generated: 15 min ago                 │
│                                        │
│  [Download All (ZIP)]  [Regenerate]   │
│                                        │
│  ─── Images (grid view) ───           │
│  [☐ Select All]  [Filter ▼]  [Sort ▼]│
│                                        │
│  ┌────────┐ ┌────────┐ ┌────────┐    │
│  │☐ [img] │ │☐ [img] │ │☐ [img] │    │
│  │Blue Mug│ │Red Tee │ │Green...│    │
│  │↓ ⋮     │ │↓ ⋮     │ │↓ ⋮     │    │
│  └────────┘ └────────┘ └────────┘    │
│  ... (100 images total)                │
│                                        │
│  [Regenerate Selected (3)]             │
│                                        │
└────────────────────────────────────────┘
```

---

### 8.3 Component Library

**Primary CTA Button:**
- Color: Bright blue (#2563EB)
- Large, rounded corners
- Clear hover state

**Secondary Button:**
- Color: Gray outline
- Subtle hover

**Input Fields:**
- Clean, modern
- Helpful placeholders
- Inline validation errors

**Progress Indicators:**
- Clean progress bar
- Percentage + ETA
- Color: Blue → Green when complete

**Cards:**
- Subtle shadow
- Hover effect (slight lift)
- Clear hierarchy (title > metadata > CTA)

---

### 8.4 Color Palette

**Primary:**
- Blue: #2563EB (CTAs, links)
- Success Green: #10B981
- Warning Yellow: #F59E0B
- Error Red: #EF4444

**Neutrals:**
- Background: #FFFFFF
- Secondary BG: #F9FAFB
- Border: #E5E7EB
- Text Primary: #111827
- Text Secondary: #6B7280

---

### 8.5 Typography

- **Font:** Inter (clean, modern, web-safe)
- **Headings:** Bold, larger size
- **Body:** Regular, 16px
- **Captions:** 14px, gray

---

## 10. PRICING & BUSINESS MODEL

### 9.1 Credit-Based Pricing Model

**Proč credit-based systém:**
1. ✅ **Alignment s core value** - "test & choose best price" vyžaduje flexibilní pricing
2. ✅ **Transparentnost** - user vidí přesné náklady před každou akcí
3. ✅ **Spravedlnost** - levná AI = méně kreditů = větší úspora
4. ✅ **Flexibilita** - user si vybírá mezi kvalitou (drahé) a kvantitou (levné)
5. ✅ **Škálovatelnost** - od malých po velké projekty

---

### 9.2 Credit Packages

| Package | Credits | Price | Per Credit | Discount | Typical Usage |
|---------|---------|-------|------------|----------|---------------|
| **Starter** | 100 | $10 | $0.10 | 0% | ~10-30 images |
| **Popular** ⭐ | 500 | $40 | $0.08 | 20% | ~60-150 images |
| **Pro** | 2,000 | $120 | $0.06 | 40% | ~250-650 images |
| **Business** | 10,000 | $450 | $0.045 | 55% | ~1200-3000+ images |

**Free Trial:**
- 20 credits zdarma při registraci
- ~3-6 test generací (depends on AI)
- Plný přístup ke všem features
- No credit card required
- Bulk image upload: max 10 obrázků najednou
- Retence souborů: 7 dní

**Upload limity & retence dle balíčku:**

| Plán | Bulk image upload | Retence souborů |
|------|-------------------|-----------------|
| Free (trial) | max 10 obrázků najednou | 7 dní |
| Starter | max 100 obrázků najednou | 30 dní |
| Pro | max 500 obrázků najednou | 90 dní |
| Business | max 2000 obrázků najednou | 180 dní |

**Credit expiration:** NEVER (user-friendly, buduje trust)

---

### 9.3 Credit Cost Table

#### Enhancement Mode:

| Operation | AI Service | Quality | Credits | Notes |
|-----------|-----------|---------|---------|-------|
| Background removal | Any | - | **1** | Using Claid/remove.bg API |
| Enhancement basic | Claid | Standard | **1** | Color, light correction |
| Enhancement premium | Claid | Premium | **2** | + AI enhancement |
| Background generation | DALL-E 3 | Standard | **8** | Highest quality |
| Background generation | Flux Pro | Standard | **4** | Best value |
| Background generation | Nano Banana Pro | Standard | **3** | Google Gemini |

**Typical Enhancement Job:**
```
Background removal (1) + Background gen (4) + Enhancement (1) = 6 credits/image

Example: 100 products with Flux
= 100 × 6 = 600 credits
= $36-60 (depending on package)
```

---

#### Generation Mode:

| AI Service | Quality | Resolution | Credits | Use Case |
|-----------|---------|------------|---------|----------|
| DALL-E 3 | Standard | 1024x1024 | **10** | Best quality |
| DALL-E 3 | HD | 1024x1792 | **15** | Premium |
| Flux Pro | Standard | 1024x1024 | **5** | Balanced |
| Flux Pro | Premium | 1024x1024 | **8** | High quality |
| Nano Banana Pro | 2K | 2048x2048 | **3** | Google Gemini |
| Nano Banana Pro | 4K | 4096x4096 | **5** | Premium quality |

**Typical Generation Job:**
```
Example: 50 blog illustrations with DALL-E Standard
= 50 × 10 = 500 credits
= $30-50 (depending on package)

Alternative with Nano Banana Pro:
= 50 × 3 = 150 credits
= $9-15 (70% cheaper!)
```

---

#### Dynamic Credit Calculation (Phase 7.10)

Credits are calculated dynamically from the database rather than hardcoded values:

```
Workflow:
1. User selects AI service + adjusts parameters (quality, steps, ratio)
2. Frontend useServiceCredits hook fires (300ms debounce)
3. POST /api/pricing/calculate-credits with service + params
4. Backend maps params → ServiceIdType (e.g., "dalle3_hd_wide")
5. Queries current_service_pricing materialized view
6. Returns credits_required = CEIL(cost_usd × coefficient / 0.01)
7. UI updates credit labels in real-time

Price formula:
  credits_required = CEIL(cost_usd × coefficient / credit_value)

Where:
  cost_usd     = actual API cost from service_costs table
  coefficient  = global markup from pricing_coefficients (default: 1.0)
  credit_value = $0.01 (1 credit = $0.01)

11 Service Pricing Tiers:
  DALL-E 3:      standard_square (4cr), standard_wide (8cr), hd_square (8cr), hd_wide (12cr)
  Flux Pro:      standard (3cr), high (6cr), ultra (10cr)
  Nano Banana:   1K (2cr), 2K (4cr), 4K (8cr)
  GPT-4o-mini:   context generation (1cr, fixed)
```

**Benefits of dynamic pricing:**
- Prices update when API costs change (no code changes needed)
- Historical cost tracking via valid_from/valid_to periods
- Global markup adjustable without modifying individual service costs
- Materialized view ensures fast lookups (auto-refreshed via triggers)
- Auto-update system monitors Replicate + calculates OpenAI costs from token pricing

---

### 9.4 Revenue Model

**Primary Revenue:**
- Credit purchases (one-time payments)
- No recurring subscriptions (simpler, user-friendly)

**Secondary Revenue (Future - V3):**
- Team seats (flat fee per additional member)
- API usage (pay-per-call)
- White-label licensing
- Premium support

---

### 9.5 Cost Structure & Margins

#### Variable Costs (per image):

**Enhancement Mode:**
```
Background removal API: ~$0.01
Claid enhancement: ~$0.03-0.05
AI background gen (Flux): ~$0.08-0.12
Total cost: ~$0.12-0.18 per image
User pays: 6 credits × $0.06 = $0.36
Gross margin: ~50-66%
```

**Generation Mode:**
```
DALL-E 3: ~$0.04-0.08 per image
User pays: 10 credits × $0.06 = $0.60
Gross margin: ~85-90%

Flux Pro: ~$0.10-0.15 per image
User pays: 5 credits × $0.06 = $0.30
Gross margin: ~50-66%

Nano Banana Pro (Google): ~$0.13 (2K) / ~$0.24 (4K), Batch API ~$0.067 (2K)
User pays: 3 credits × $0.06 = $0.18
Gross margin: ~30-50% (2K) / nižší u 4K
```

**Average blended margin:** ~60-70%

---

#### Fixed Costs (monthly):

| Item | Cost |
|------|------|
| Vercel hosting (Pro) | $20 |
| Railway workers | $20-50 |
| Supabase (Pro) | $25 |
| Supabase Storage (MVP) / R2 (scale) | $5-30 |
| Stripe fees | 2.9% + $0.30 |
| Email (Resend) | $20 |
| Monitoring (Sentry) | $26 |
| Domain & misc | $10 |
| **Total** | **~$150-200/měsíc** |

---

### 9.6 Break-Even Analysis

**Break-even point:**
```
Fixed costs: $200/měsíc
Average credit purchase: $60 (mix of packages)
Gross margin: 65%
Contribution margin: $60 × 0.65 = $39

Break-even: $200 / $39 = ~5.2 purchases/měsíc
= 5-6 active paying users
```

**Revenue Targets:**

| Milestone | Active Users | Purchases/mo | Revenue | Profit |
|-----------|--------------|--------------|---------|--------|
| **Month 3** | 20 | 15 | $900 | $700 |
| **Month 6** | 100 | 70 | $4,200 | $4,000 |
| **Month 12** | 300 | 200 | $12,000 | $11,800 |

*Assumptions: 70% monthly active purchase rate, avg $60 purchase*

---

### 9.7 Pricing Page Design

```
┌────────────────────────────────────────────────┐
│          How Credits Work                      │
├────────────────────────────────────────────────┤
│ Credits are our simple, transparent pricing.   │
│ Different AI services cost different amounts   │
│ based on their quality and capabilities.       │
│                                                │
│ You ALWAYS see exact costs before generating.  │
│ No surprises. No hidden fees.                  │
│                                                │
│ Enhancement: 3-8 credits per image             │
│ Generation:  3-15 credits per image            │
│                                                │
│ Credits never expire. Buy once, use anytime.   │
└────────────────────────────────────────────────┘

┌──────────┬────────────┬──────────┬──────────────┐
│ Starter  │ Popular ⭐ │   Pro    │   Business   │
├──────────┼────────────┼──────────┼──────────────┤
│ 100      │ 500        │ 2,000    │ 10,000       │
│ credits  │ credits    │ credits  │ credits      │
├──────────┼────────────┼──────────┼──────────────┤
│   $10    │   $40      │  $120    │   $450       │
├──────────┼────────────┼──────────┼──────────────┤
│ $0.10    │ $0.08      │ $0.06    │ $0.045       │
│ /credit  │ /credit    │ /credit  │ /credit      │
├──────────┼────────────┼──────────┼──────────────┤
│          │ Save 20%   │ Save 40% │ Save 55%     │
├──────────┼────────────┼──────────┼──────────────┤
│ Perfect  │ Most       │ Best     │ For          │
│ for      │ popular    │ value    │ agencies     │
│ testing  │ choice     │ for pros │              │
├──────────┼────────────┼──────────┼──────────────┤
│ ~10-30   │ ~60-150    │ ~250-650 │ ~1200-3000   │
│ images   │ images     │ images   │ images       │
├──────────┼────────────┼──────────┼──────────────┤
│ [Buy]    │ [Buy Now]  │ [Buy]    │ [Contact]    │
└──────────┴────────────┴──────────┴──────────────┘

💡 Not sure? Start with 20 FREE credits!
   No credit card required.
```

---

### 9.8 Competitive Pricing Comparison

| Service | Model | Cost per Image | Flexibility | Our Advantage |
|---------|-------|----------------|-------------|---------------|
| **Pebblely** | $19/1000 | $0.019 | ❌ 1 AI only | ✅ Multi-AI choice |
| **Photoroom** | $10/unlimited | ~$0.01 | ❌ 1 AI only | ✅ Better quality |
| **Claid** | Credit-based | $0.08-0.40 | ✅ Flexible | ✅ Cheaper + test mode |
| **DALL-E API** | Pay-per-use | $0.04-0.08 | ✅ API | ✅ Bulk + GUI |
| **US** | Credit-based | **$0.03-0.60** | ✅✅ **Best** | ✅✅ **All-in-one** |

---

### 9.9 Refund & Fair Use Policy

**Refunds:**
- Failed generations: Auto-refund credits
- Cancelled jobs: Refund nevygenerovaných credits
- Unsatisfied results: Manual review (support ticket)
- No refunds on purchased credits (non-consumable digital goods)

**Fair Use:**
- No rate limits na free tier (20 credits is tiny anyway)
- Paid users: Reasonable use expected
- Abuse detection: >10,000 credits/day flagged for review
- API abuse prevention (V3)

---

### 9.10 Future Monetization (V2-V3)

**Planned additions:**
- **Team Seats:** $10/měsíc per additional member
- **API Access:** $99/měsíc base + credit usage
- **Priority Processing:** +20% credits for instant queue priority
- **Custom AI Models:** $299 one-time training fee
- **White-label:** $999/měsíc enterprise

---

### 9.11 Revenue Projections (12 months)

**Conservative Scenario:**
```
Month 1-3: 5-20 users, $500-2K revenue
Month 4-6: 50-100 users, $3K-7K revenue
Month 7-12: 200-300 users, $10K-15K revenue

Year 1 Total: ~$60K-90K revenue
Year 1 Profit: ~$50K-80K (after costs)
```

**Optimistic Scenario:**
```
Month 6: 200 users, $12K revenue
Month 12: 500 users, $30K revenue

Year 1 Total: ~$150K revenue
Year 1 Profit: ~$130K
```

**Path to $10K MRR:**
- Need ~170 active users buying $60/month
- OR 100 users buying $100/month
- Achievable in 6-9 months with good PMF

---

## 11. SUCCESS METRICS

### 10.1 North Star Metric
**Monthly Revenue** (ne MRR, protože není subscription)

Target:
- Month 3 (launch): $500-1,000 (15-25 credit purchases)
- Month 6: $3,000-7,000 (70-170 purchases)
- Month 12: $10,000-15,000 (200-300 purchases)

---

### 10.2 Key Performance Indicators (KPIs)

**Acquisition:**
- [ ] Website visitors/měsíc
- [ ] Signup rate (visitor → free account)
- [ ] Target: 5-10% conversion rate
- [ ] Free trial activation rate (sign up → use 20 free credits)
- [ ] Target: 60%+ use free credits

**Activation:**
- [ ] % users who complete test mode (Enhancement OR Generation)
- [ ] Target: 50%+ complete at least 1 test
- [ ] % users who do first bulk job
- [ ] Target: 25%+ do bulk within 7 days

**Monetization:**
- [ ] Free → Paid conversion rate
- [ ] Target: 15-20% buy credits within 30 days
- [ ] Average first purchase: Target $40 (Popular pack)
- [ ] Repeat purchase rate (monthly)
- [ ] Target: 40%+ buy again within 30 days

**Retention:**
- [ ] 30-day retention (users who return)
- [ ] Target: 40%+
- [ ] Credit depletion rate (jak rychle spotřebují credits)
- [ ] Target: 50% used within 30 days (indikuje hodnotu)

**Revenue:**
- [ ] Monthly revenue (total credit purchases)
- [ ] Average Revenue Per Paying User (ARPPU)
- [ ] Target: $60 per month
- [ ] Customer Lifetime Value (LTV)
- [ ] Target: $180 (3 purchases × $60)

**Engagement:**
- [ ] Průměr obrázků/user/měsíc (paying users)
- [ ] Target: 100-200 images
- [ ] Průměr projektů/user/měsíc
- [ ] Target: 2-3 projects
- [ ] Mode preference (Enhancement vs Generation usage)
- [ ] AI preference (which AI users choose most)

**Credit Economics:**
- [ ] Average credits per project
- [ ] Target: 300-500 credits
- [ ] Credit purchase frequency
- [ ] Target: 1.5× per month (active users)
- [ ] Unused credit balance (dead money)
- [ ] Target: <20% of sold credits unused after 90 days

**Project Usage (Phase 7.5):**
- [ ] Průměrný počet projektů na uživatele
- [ ] % uživatelů, kteří se vrací ke stejnému projektu (retention indikátor)
- [ ] Průměrný počet bulk jobů na projekt
- [ ] Project style lock rate (% kteří schválí první sample vs iterují)
- [ ] Target: 60%+ projektů má alespoň 2 bulk joby

---

### 10.3 Product-Market Fit Signals

**Early indicators (Months 1-3):**
- [ ] 30+ users buy credits
- [ ] 15%+ conversion rate (free → paid)
- [ ] NPS score > 40
- [ ] 30%+ repeat purchases within 30 days
- [ ] Organický word-of-mouth (user referrals)
- [ ] Feature requests od users

**Strong PMF (Months 6-12):**
- [ ] 100+ monthly paying customers
- [ ] NPS score > 50
- [ ] 40%+ repeat purchase rate
- [ ] Users buying larger packages (Pro → Business upgrade)
- [ ] Requests pro team features
- [ ] Willingness to pre-pay for discounts (future: annual plans)

**PMF Red Flags:**
- ⚠️ <10% free → paid conversion
- ⚠️ <20% repeat purchase
- ⚠️ >50% credits unused after 60 days
- ⚠️ High test usage but low bulk usage
- ⚠️ NPS < 30

---

### 10.4 Operational Metrics

**Technical:**
- [ ] Uptime: 99.5%+ (MVP), 99.9%+ (V2)
- [ ] API response time: <2s (test mode), <5s (bulk start)
- [ ] Image generation success rate: >95%
- [ ] Queue processing time: <30s per image (average)
- [ ] Error rate: <2%

**Cost Metrics:**
- [ ] AI API costs per image (by service)
- [ ] Storage costs per GB
- [ ] Gross margin per credit package
- [ ] Target: >60% blended margin

**Customer Support:**
- [ ] Support tickets per 100 users
- [ ] Target: <5
- [ ] Average response time
- [ ] Target: <12 hours
- [ ] Resolution rate
- [ ] Target: >90%

---

### 10.5 Growth Metrics (Months 6+)

**Viral Coefficient:**
- [ ] Referrals per user
- [ ] Target: 0.3 (30% users refer someone)
- [ ] Referral conversion rate
- [ ] Target: 20%

**Channel Performance:**
- [ ] ProductHunt upvotes & conversion
- [ ] Organic search traffic (SEO)
- [ ] Social media engagement
- [ ] Content marketing ROI

**Cohort Analysis:**
- [ ] Month 1 cohort: 30-day retention, LTV
- [ ] Month 2 cohort: comparison to Month 1
- [ ] Target: improving retention each month

---

### 10.6 Dashboards

**Daily Dashboard (for you):**
```
Today:
• Revenue: $120 (3 purchases)
• New signups: 8
• Active jobs: 12 running
• Credits sold: 500
• Error rate: 0.8%
```

**Weekly Dashboard:**
```
This Week:
• Revenue: $840
• New paying users: 15
• Repeat purchases: 6
• Total images generated: 12,340
• Popular AI: Flux (62%), DALL-E (25%), NBPro (13%)
• Popular mode: Enhancement (70%), Generation (30%)
```

**Monthly Dashboard:**
```
This Month:
• Total revenue: $3,600
• New users: 120
• Paying users: 60 (50% conv rate)
• Images generated: 54,200
• Average purchase: $60
• Repeat rate: 38%
• NPS: 52
```

---

## 12. ROADMAP

### Phase 0: Pre-Development (Week 1-2)
- [x] Konkurenční analýza
- [x] PRD vytvoření
- [ ] Brand & naming
- [ ] Domain registrace
- [ ] Tech stack finalizace
- [ ] Wireframes (Figma)

---

### Phase 1: MVP Development (Weeks 3-10)

**Week 3-4: Foundation**
- [ ] Next.js projekt setup
- [ ] Database schema
- [ ] Auth system (email/password)
- [ ] Stripe integration basic

**Week 5-6: Test Mode**
- [ ] Image upload
- [ ] AI API integrations (DALL-E, Flux, Nano Banana Pro)
- [ ] Test generation logic
- [ ] Side-by-side comparison UI

**Week 7-8: Bulk Generation**
- [ ] CSV upload & validation
- [ ] Queue system (BullMQ)
- [ ] Background worker
- [ ] Progress tracking

**Week 9-10: Polish & Testing**
- [ ] Download ZIP functionality
- [ ] Dashboard
- [ ] Billing flows
- [ ] Bug fixing
- [ ] Internal testing

---

### Phase 2: Beta Launch (Week 11-12)
- [ ] Deploy to production
- [ ] Beta user recruitment (5-10 users)
- [ ] Feedback collection
- [ ] Iterate based on feedback

---

### Phase 3: Public Launch (Week 13)
- [ ] ProductHunt launch
- [ ] Indie Hackers post
- [ ] Twitter/X announcement
- [ ] Email outreach (cold/warm)

---

### Phase 4: Growth & Iteration (Months 4-6)
- [ ] Feature additions based on feedback
- [ ] SEO optimization
- [ ] Content marketing
- [ ] Partnerships (Shopify, WooCommerce)

---

### Phase 7.5: Projects & Samples - COMPLETED
- [x] Database schema pro Projects a Samples tabulky
- [x] Create project page (name only, auto-open edit mode)
- [x] Editable project header (name, mode, prompt, style, background, ratio, quality, creativity)
- [x] Generate style sample se selektivními službami (checkboxy)
- [x] Lock project style po schválení sample (consistency seed)
- [x] Unlock project feature
- [x] Save sample to project storage (generated_images table)
- [x] Image preview modal
- [x] Project dashboard (seznam všech projektů)
- [x] Návrat k existujícímu projektu pro další generování
- [ ] Update bulk generování pro použití stylu projektu (Phase 8)

### Phase 7.6: Parameter Optimization - COMPLETED
- [x] quality_level, creativity_level, consistency_seed columns
- [x] Parameter mapper utility (DALL-E, Flux, Nano Banana)
- [x] Prompt builder utility
- [x] Individual service timing measurement
- [x] Console logging cleanup

### Phase 7.7: Context & Fine-tuning - COMPLETED
- [x] Context config JSONB column + project_service_configs table
- [x] Context upload UI (reference images, text documents)
- [x] Service fine-tuning modals (per-service advanced params)
- [x] Service config API endpoints (CRUD)
- [x] Context & fine-tuning applied in sample generation

### Phase 7.8: DB Normalization - COMPLETED
- [x] Renamed ai_service → ai_service_id across codebase (~16 files)
- [x] Renamed selected_service → locked_ai_service_id
- [x] Collapsible context section (default collapsed)
- [x] Per-file upload progress indicator

### Phase 7.9: AI Context Generation - COMPLETED
- [x] GPT-4o-mini client with 4 templates
- [x] /api/ai/generate-context endpoint (GET templates, POST generate)
- [x] ContextGeneratorModal (3-step wizard)
- [x] Integration with project context upload flow

### Phase 7.10: Dynamic Pricing - COMPLETED
- [x] service_costs table with historical cost tracking
- [x] pricing_coefficients table with global markup multiplier
- [x] Materialized view current_service_pricing with auto-refresh triggers
- [x] DB functions: get_credits_required(), refresh_pricing_cache()
- [x] Pricing operations library (getServiceId, calculateJobCredits, etc.)
- [x] Auto-update system (Flux monitoring, GPT token calculation)
- [x] Admin endpoints: GET /api/admin/pricing, POST /api/admin/pricing/auto-update
- [x] POST /api/pricing/calculate-credits (single + batch mode)
- [x] useServiceCredits React hook (300ms debounce, AbortController)
- [x] Dynamic credit labels in sample generation form
- [x] Total cost per sample display
- [x] Real-time credit display in fine-tuning modals
- [x] Context generator shows "1 credit (fixed)"

---

## 13. OPEN QUESTIONS

### Product Questions

**Q1: Default mode na homepage?**
- Option A: Enhancement (častější use case pro e-commerce)
- Option B: Generation (sexier pro marketing)
- Option C: User si vybere při onboarding ("What do you want to do?")
- **Decision:** [TBD - asi C, onboarding wizard]

**Q2: Povolit download CSV template?**
- Pro: Usnadní onboarding, méně support tickets
- Proti: Extra práce (ale asi 1 hodina)
- **Decision:** [TBD - YES, low effort high value]

**Q3: Test mode - kolik variant zobrazit?**
- Current: 3 AI services paralelně
- Alternative: Postupně (user vybere 1st AI → pokud nespokojen, test další)
- **Decision:** [TBD - asi paralelní, hlavní value prop]

**Q4: Enhancement mode - required source image quality?**
- Min resolution? (např. 512x512)
- Max file size? (10MB dostatečné?)
- Podporovat HEIC, WebP?
- **Decision:** [TBD]

**Q5: Jak řešit konzistenci across bulk job?** ✅ RESOLVED
- User chce stejný "feel" napříč 100 obrázky
- ~~Option A: První obrázek set seed → use same seed~~
- ~~Option B: "Consistency mode" toggle (může být dražší)~~
- **Decision:** Consistency seeds (Phase 7.6) - při lock style se vygeneruje random seed pro Flux Pro, který se aplikuje na všechna bulk generování. DALL-E a Nano Banana Pro nemají seed, konzistence se řeší přes stejné parametry (quality, style).

---

### Technical Questions

**Q6: Které background removal API?**
- Option A: remove.bg ($0.20 per image - drahé)
- Option B: Claid.ai ($0.01-0.02 - levnější, ale package)
- Option C: Own model (Rembg, U-2-Net - free, ale hosting cost)
- **Decision:** [TBD - asi B (Claid) pro MVP]

**Q7: Queue system - jak priority handling?**
- FIFO (first in first out)
- Nebo priorita pro větší jobs? (aby 1 large job neblokoval všechny)
- **Decision:** [TBD]

**Q8: Storage - jak dlouho držet generated images?**
- Option A: 30 dní (jako Pebblely)
- Option B: Forever (dokud user nesmaže projekt)
- Option C: 90 dní free, forever pro paid users
- **Decision:** [TBD - asi B, storage je levné]

**Q9: Concurrent job limit per user?**
- Free users: 1 job současně
- Paid users: 3-5 jobs?
- Nebo unlimited queue ale throttled processing?
- **Decision:** [TBD]

**Q10: Image format output?**
- PNG (best quality, larger files)
- JPG (smaller, good enough?)
- WebP (modern, smallest, ale kompatibilita?)
- User choice?
- **Decision:** [TBD - asi PNG default, JPG option]

---

### Business Questions

**Q11: Referral program pro launch?**
- "Invite friend → oba dostanete 50 bonus credits"
- Pro: Virality, growth hack
- Proti: Abuse risk, tracking complexity
- **Decision:** [TBD - asi V2, focus na PMF first]

**Q12: Affiliate program s influencery?**
- 20% recurring commission na credit purchases
- Pro: Může dát quick reach
- Proti: Margin hit, management overhead
- **Decision:** [TBD - asi V2]

**Q13: Refund policy pro nespokojenost?**
- "Nejsem spokojený s výsledky" → refund credits?
- Option A: No refunds (digital goods)
- Option B: Manual review, case-by-case
- Option C: Auto refund first purchase if <50% credits used
- **Decision:** [TBD - asi B, manual review]

**Q14: Bulk discount nad threshold?**
- Např. 20,000+ credits = custom pricing
- Pro: Attract enterprise
- Proti: Revenue hit
- **Decision:** [TBD - explore after seeing usage patterns]

**Q15: Credit gifting / transfer?**
- User může giftnout credits jinému useru?
- Use case: Agency → client
- Pro: Flexibility
- Proti: Abuse, tracking
- **Decision:** [TBD - asi V2, team feature]

---

### Marketing Questions

**Q16: Jaký název produktu?**
- Options brainstormed:
  - PixelForge
  - BulkCraft AI
  - ImageLab Pro
  - PhotoScale
  - CompareGen
  - TestForge
- **Decision:** [TBD - domain availability check + user testing]

**Q17: Primary marketing message?**
- Option A: "Test 3 AI services, choose the best price"
- Option B: "Bulk image processing - Enhancement & Generation"
- Option C: "The only AI image tool you'll ever need"
- **Decision:** [TBD - A/B test landing pages]

**Q18: Launch strategy?**
- Option A: ProductHunt only (organic)
- Option B: ProductHunt + paid ads (Google, FB)
- Option C: ProductHunt + influencer outreach
- **Decision:** [TBD - asi A for MVP, C for V2]

**Q19: Free tier positioning?**
- 20 credits zdarma je dost?
- Nebo více (50?) aby měli "aha moment"?
- Risk: Abuse, free riders
- **Decision:** [TBD - start s 20, možná increase if conversion low]

**Q20: Content marketing focus?**
- Blog topics:
  - "How to enhance product photos for free"
  - "DALL-E vs Flux vs Nano Banana Pro: Which is best for e-commerce?"
  - "Dropshipping product photography guide"
- SEO keywords to target?
- **Decision:** [TBD - competitor keyword research]

---

### Storage & Upload Questions (NOVÉ)

- [x] **Q21:** Storage provider — S3 nebo Cloudflare R2?
  - ~~R2: nulové egress fees, levnější pro stahování~~
  - ~~S3: zralejší ekosystém, více nástrojů~~
  - **Decision:** Dvoustupňová strategie — MVP na Supabase Storage (již v stacku, RLS, méně infrastruktury), migrace na R2 při 200+ uživatelích nebo egress > $50/měsíc

- [ ] **Q22:** Resumable uploads — implementovat pro MVP?
  - Pro: Robustnější pro velké dávky, lepší UX při špatném připojení
  - Proti: Složitější implementace, tus.io knihovna
  - **Decision:** [TBD — asi V2, MVP stačí retry per soubor]

- [ ] **Q23:** Max velikost jednoho souboru — 10 MB nebo více?
  - 10 MB pokryje 95% produktových fotek
  - Vyšší limit = vyšší storage + bandwidth náklady
  - **Decision:** [TBD — 10 MB pro MVP]

- [ ] **Q24:** Thumbnail generování — na workeru nebo edge function?
  - Worker: jednodušší, ale pomalejší
  - Cloudflare Image Resizing: rychlejší, ale extra náklad
  - **Decision:** [TBD]

- [ ] **Q25:** Jak řešit situaci kdy uživatel chce obrázky zpět po expiraci?
  - Neumožnit (smazáno = smazáno)
  - Nabídnout "extended storage" add-on za příplatek
  - **Decision:** [TBD]

- [ ] **Q26:** Kdy přejít ze Supabase Storage na Cloudflare R2?
  - **Kritéria pro migraci (kterékoliv z):**
    - Egress náklady Supabase Storage > $50/měsíc
    - 200+ aktivních uživatelů (měsíčně)
    - Supabase Storage limity začnou omezovat (bandwidth throttling)
  - **Migrace je low-risk:** obojí S3-kompatibilní API, stačí změnit endpoint + credentials
  - **Migrační plán:** paralelní zápis do obou → postupný přesun starých dat → přepnutí čtení
  - **Monitoring:** sledovat Supabase billing dashboard, nastavit alert na egress > $30/měsíc
  - **Decision:** [MVP běží na Supabase Storage, migrace dle kritérií výše]

---

## 14. CHANGELOG

### Version 2.5 (February 13, 2026) - Phase 7.10A-B Dynamic Pricing

**Phase 7.10B - Dynamic Credit Display in UI**
- **NOVÉ:** `POST /api/pricing/calculate-credits` endpoint (single service + batch mode)
- **NOVÉ:** `useServiceCredits` React hook with 300ms debounce and AbortController for cancellation
- **AKTUALIZOVÁNO:** Sample generation form shows dynamic credits from pricing API (replaces static "15/10/6 credits")
- **NOVÉ:** Total cost per sample display bar below service checkboxes
- **NOVÉ:** Real-time credit display in ServiceFineTuningModal header (updates as params change)
- **NOVÉ:** Pricing tier hints on Flux steps slider (High/Ultra tier indicators)
- **AKTUALIZOVÁNO:** DALL-E HD option text updated to "higher credits" (dynamic)
- **AKTUALIZOVÁNO:** ContextGeneratorModal shows "1 credit (fixed)" for clarity
- **NOVÉ:** `defaultRatio` prop on ServiceFineTuningModal for accurate DALL-E pricing

**Phase 7.10A - Dynamic Pricing & Cost Management System**
- **NOVÉ:** `service_costs` table with validity periods (valid_from/valid_to) for historical cost tracking
- **NOVÉ:** `pricing_coefficients` table for global markup multiplier (default: 1.0)
- **NOVÉ:** `current_service_pricing` materialized view with pre-calculated credits_required
- **NOVÉ:** DB functions: `get_credits_required(service_id, date)`, `refresh_pricing_cache()`
- **NOVÉ:** Auto-refresh triggers on service_costs and pricing_coefficients changes
- **NOVÉ:** Seed data: 11 service pricing tiers (4 DALL-E, 3 Flux, 3 Nano Banana, 1 GPT-4o-mini)
- **NOVÉ:** Pricing operations library (`lib/pricing/operations.ts`): getServicePricing, getCreditsRequired, getServiceId, calculateJobCredits, refreshPricingCache
- **NOVÉ:** ServiceIdType union type mapping AI service + params to 11 pricing tiers
- **NOVÉ:** Auto-update system (`lib/pricing/auto-update.ts`): Flux monitoring via test prediction, GPT pricing calculated from token costs
- **NOVÉ:** `GET /api/admin/pricing` - all current pricing from materialized view
- **NOVÉ:** `POST /api/admin/pricing/auto-update` - trigger auto-update (bearer token auth via PRICING_UPDATE_SECRET)
- **AKTUALIZOVÁNO:** `database.types.ts` with service_costs and pricing_coefficients table types
- **NOVÉ:** Migration: `20260213300000_pricing_system.sql`

**Phase 7.9 - AI-Assisted Context Generation**
- **NOVÉ:** GPT-4o-mini text client (`lib/ai/openai-text.ts`) with 4 templates
- **NOVÉ:** `/api/ai/generate-context` endpoint (GET templates, POST generate)
- **NOVÉ:** `ContextGeneratorModal` component (3-step wizard: template → prompt → preview)
- **NOVÉ:** "Generate with AI" button in collapsible context section
- **NOVÉ:** Auto-upload generated text as .txt file to project context

**Phase 7.8 - DB Normalization & UI Polish**
- **AKTUALIZOVÁNO:** Renamed `ai_service` → `ai_service_id` across ~16 files (DB columns, API routes, components)
- **AKTUALIZOVÁNO:** Renamed `selected_service` → `locked_ai_service_id` (samples table + UI)
- **NOVÉ:** Collapsible context section in project detail (default collapsed, with summary counts)
- **NOVÉ:** Per-file upload progress indicator in ProjectContextUpload

---

### Version 2.4 (February 13, 2026) - Phase 7.7 Context & Fine-tuning

**Phase 7.7.5 - Apply Context & Fine-tuning in Sample Generation**
- **NOVÉ:** `context-helpers.ts`: load project context (decode base64 documents, extract ref images)
- **NOVÉ:** `buildContextPromptSuffix`: appends document text and image references to prompts for DALL-E/Flux
- **NOVÉ:** `buildGeminiImageParts`: extracts inline_data parts from base64 reference images for Gemini
- **NOVÉ:** `getFinalParameters`: unified function returns custom params or basic-mapped params per service
- **AKTUALIZOVÁNO:** Samples API loads `context_config` and `project_service_configs` before generation
- **AKTUALIZOVÁNO:** Nano Banana Pro: receives reference images as multimodal inline_data (up to 14) + text context + topP/topK + Google Search grounding
- **AKTUALIZOVÁNO:** Flux Pro: receives text context in prompt + custom params (interval, prompt_upsampling, safety_tolerance)
- **AKTUALIZOVÁNO:** DALL-E 3: receives text context in prompt + custom quality/style params
- **NOVÉ:** Console logging for context usage and parameter source (custom vs basic)

**Phase 7.7.4 - Service Config API Endpoints**
- **NOVÉ:** Single-service config endpoint: GET `/api/projects/[projectId]/service-configs/[service]`
- **NOVÉ:** DELETE endpoint to reset service config to basic params
- **NOVÉ:** Graceful error handling (PGRST116 for not found, missing table fallbacks)
- **NOVÉ:** Validation of `ai_service` parameter against allowed values (`dalle`, `flux-pro`, `nano-banana`)
- **NOVÉ:** Full CRUD coverage: list all (GET), upsert (POST), get single (GET), delete (DELETE)

**Phase 7.7.3 - Service Fine-tuning Modals**
- **NOVÉ:** `ServiceFineTuningModal` component with per-service advanced parameter configuration
- **NOVÉ:** Flux Pro fine-tuning: guidance scale, inference steps, interval, prompt upsampling toggle, safety tolerance level
- **NOVÉ:** Nano Banana Pro fine-tuning: temperature, topP, topK, Google Search grounding toggle
- **NOVÉ:** DALL-E 3 fine-tuning: quality (standard/hd), style (natural/vivid)
- **NOVÉ:** `/api/projects/[projectId]/service-configs` endpoint (GET list, POST upsert per service)
- **NOVÉ:** Fine-tuning section in project detail page with per-service config cards
- **NOVÉ:** Modal UI with labeled sliders, toggles, and select inputs for each parameter
- **AKTUALIZOVÁNO:** Project detail page includes fine-tuning section for locked and draft projects
- **AKTUALIZOVÁNO:** Service configs persist via `project_service_configs` table (from Phase 7.7.1 schema)

**Phase 7.7.2 - Context Upload UI**
- **NOVÉ:** `ProjectContextUpload` component for reference images and text documents
- **NOVÉ:** Reference image upload with grid preview (max 14, 10MB each)
- **NOVÉ:** Text document upload (.txt, .md, .pdf) with list view
- **NOVÉ:** Context persists in project `context_config` JSONB column
- **NOVÉ:** Context summary display when not editing
- **NOVÉ:** File validation (type + size) with error feedback
- **AKTUALIZOVÁNO:** Project PATCH endpoint accepts `context_config`
- **AKTUALIZOVÁNO:** Project detail page includes context upload in edit mode
- **AKTUALIZOVÁNO:** Auto-save includes context in both explicit save and generate-save flows
- **POZN:** MVP stores files as base64 data URLs in JSONB. Migration to Supabase Storage planned for scale.

**Phase 7.7.1 - Context & Fine-tuning Database Schema**
- **NOVÉ:** `context_config` JSONB column in projects table (reference images + text documents)
- **NOVÉ:** `project_service_configs` table for per-service fine-tuning
- **NOVÉ:** Support for reference images (up to 14 for Nano Banana Pro)
- **NOVÉ:** Support for text documents (.txt, .md, .pdf)
- **NOVÉ:** Per-service custom params: Flux (guidance, steps, interval), Nano Banana (temperature, topP, topK), DALL-E (quality, style)
- **NOVÉ:** TypeScript types: ProjectContext, ReferenceImage, TextDocument, FluxCustomParams, NanoBananaCustomParams, DallECustomParams, ProjectServiceConfig
- **NOVÉ:** Migration: `20260213000000_add_context_and_finetuning.sql`
- **AKTUALIZOVÁNO:** Nano Banana Pro API now sends imageSize and thinkingLevel parameters
- **AKTUALIZOVÁNO:** Parameter mapper returns imageSize and thinkingLevel for Nano Banana

---

### Version 2.3 (February 13, 2026) - Phase 7.5-7.6 Implementation Complete

**Phase 7.6 Completed - Parameter Optimization & UX Improvements**
- **IMPLEMENTOVÁNO:** quality_level, creativity_level, consistency_seed columns
- **IMPLEMENTOVÁNO:** Structured AI parameters (DALL-E quality/style, Flux guidance/steps/seed, Nano Banana temperature)
- **IMPLEMENTOVÁNO:** Parameter mapper utility (`lib/ai/parameter-mapper.ts`)
- **IMPLEMENTOVÁNO:** Prompt builder utility (`lib/ai/prompt-builder.ts`)
- **IMPLEMENTOVÁNO:** generated_images table for storing samples + bulk images
- **IMPLEMENTOVÁNO:** Save sample to project feature (Save to Project button)
- **IMPLEMENTOVÁNO:** Image preview modal (ESC, overlay click, body scroll lock)
- **IMPLEMENTOVÁNO:** Individual service timing measurement
- **IMPLEMENTOVÁNO:** Unlock project feature (revert locked → draft)
- **IMPLEMENTOVÁNO:** Auto-open edit mode for new projects (?new=true)
- **IMPLEMENTOVÁNO:** Pre-fill scene description from most recent sample
- **IMPLEMENTOVÁNO:** Regenerate Sample button rename when samples exist
- **ROZHODNUTO:** Q5 (Consistency) — Consistency seeds for Flux Pro at lock time
- **NOVÉ:** Generated Images table + migration
- **NOVÉ:** API endpoints: /unlock, /images (POST + GET)
- **NOVÉ:** Feature section G: AI Parameter Optimization
- **AKTUALIZOVÁNO:** Projects table schema (+ style, background, quality_level, creativity_level, consistency_seed)
- **AKTUALIZOVÁNO:** Samples table schema (+ generationTime, displayName in JSONB)
- **AKTUALIZOVÁNO:** API endpoints documentation
- **AKTUALIZOVÁNO:** Epic 3.5 acceptance criteria marked as completed

**Phase 7.5 Completed - Projects & Samples**
- **IMPLEMENTOVÁNO:** Simplified project creation (name only)
- **IMPLEMENTOVÁNO:** Editable project header (8 fields + auto-save before generation)
- **IMPLEMENTOVÁNO:** generation_mode, style, background columns
- **IMPLEMENTOVÁNO:** Sample generation with 1-3 AI services (parallel)
- **IMPLEMENTOVÁNO:** Unified lock style workflow with confirmation
- **IMPLEMENTOVÁNO:** Consistency seed generation for Flux Pro
- **IMPLEMENTOVÁNO:** Samples table with generated_images JSONB
- **IMPLEMENTOVÁNO:** Lock/unlock workflow
- **NOVÉ:** Epic 3.5 user stories (3.5.1-3.5.5)
- **NOVÉ:** Feature section F: Projects & Samples
- **NOVÉ:** DB schema: Projects table (extended), Samples table, Jobs.project_id
- **NOVÉ:** API endpoints: /api/projects, /api/projects/:id/samples, /samples/:id/lock
- **NOVÉ:** Phase 7.5 + 7.6 in roadmap

---

### Version 2.2 (Únor 2026) - Two-Stage Storage Strategy
- **ZMĚNA:** Storage Architecture přepracována na dvoustupňovou strategii: Supabase Storage (MVP) → Cloudflare R2 (scale)
- **ZMĚNA:** DB schema: `r2_original_url` → `storage_original_url`, `r2_thumbnail_url` → `storage_thumbnail_url` (provider-agnostic)
- **ZMĚNA:** Tech Stack, System Architecture, API endpointy aktualizovány pro Supabase Storage MVP
- **ROZHODNUTO:** Q21 (Storage provider) — Supabase Storage pro MVP, R2 pro scale
- **NOVÉ:** Q26 — Kritéria pro migraci ze Supabase Storage na R2 (egress > $50/měsíc nebo 200+ uživatelů)

---

### Version 2.1 (Únor 2026) - Storage & Bulk Upload Patch
- **NOVÉ:** Epic 8: Bulk Image Upload & Transformation (3 user stories)
- **NOVÉ:** Feature: Bulk Image Upload (P0 MVP must-have)
- **NOVÉ:** Storage Architecture & Retention Policy (presigned URLs, cleanup, kalkulace)
- **NOVÉ:** Uploaded_Files tabulka v DB schématu
- **NOVÉ:** API endpointy pro image upload (/api/upload/*)
- **ZMĚNA:** Bulk Generation rozdělen na dva režimy (text-only vs image-based)
- **ZMĚNA:** Projects a Images tabulky rozšířeny o nová pole (mode, expires_at, uploaded_file_id)
- **ZMĚNA:** Pricing tiers doplněny o upload limity a retenci souborů
- **NOVÉ:** 5 technických open questions (storage, resumable uploads, thumbnaily, expirace)

---

### Version 2.0 (Únor 2026) - MAJOR UPDATE
**Breaking Changes:**
- ❌ Removed subscription-based pricing model
- ✅ Implemented credit-based pricing system
- ✅ Added dual-mode: Enhancement + Generation
- ✅ Completely restructured product concept

**New Features:**
- Enhancement Mode for existing photos (background replacement, enhancement)
- Generation Mode for creating images from descriptions
- Multi-AI testing workflow (DALL-E, Flux, Nano Banana Pro) for BOTH modes
- Credit system with transparent pricing
- 20 free welcome credits
- Updated database schema (credits, transactions, dual-mode projects)
- New API endpoints for credit management
- Cost calculator before bulk jobs
- Refund system for cancelled jobs

**New Sections:**
- **Section 3: Use Cases & Examples** - Detailed real-world scenarios for Enhancement and Generation modes
  - 5 Enhancement use cases (Dropshipping, Reselling, POD, Catalog Refresh, Real Estate)
  - 6 Generation use cases (Affiliate, Social Media, Pitch Decks, E-learning, Game Dev, Marketing)
  - Comparison table Enhancement vs Generation
  - ROI calculations and time savings examples

**Updated Sections:**
- Problem Statement → divided into Enhancement vs Generation use cases
- Target Users → 4 detailed personas with mode preferences
- User Stories → separate epics for Enhancement, Generation, Credits
- Feature Requirements → dual-mode interface, credit features
- Technical Requirements → updated database schema, API endpoints
- Pricing Model → complete rewrite for credit packages
- Success Metrics → adapted for credit-based model
- Open Questions → 20 new questions for dual-mode decisions

**Removed:**
- Free/Starter/Pro/Business subscription tiers
- Monthly image limits
- Watermark considerations

**Reasoning:**
- Credit-based model aligns better with core value prop ("test & choose best price")
- Dual-mode addresses both e-commerce (enhancement) and content creation (generation) markets
- More flexible and transparent for users
- Use Cases section provides concrete examples for sales/marketing and user onboarding

---

### Version 1.0 (Únor 2026)
- Initial PRD creation
- Defined MVP scope (generation-only)
- Competitive analysis integrated
- User personas created (3)
- Technical architecture outlined
- Subscription-based pricing model

---

## 15. APPROVALS & SIGN-OFF

- [ ] Product Owner: [Jméno] - Datum: _______
- [ ] Tech Lead: [Jméno] - Datum: _______
- [ ] Designer: [Jméno] - Datum: _______

---

**KONEC DOKUMENTU**

*Tento dokument je živý - updatujte podle potřeby průběžně.*

