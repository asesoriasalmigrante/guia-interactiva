/**
 * Translation Algorithm Diagnostic
 * 
 * Verifies that extractStrings + replaceStrings handles 100% of strings
 * in every data structure. Run: npx tsx src/__tests__/translation-diagnostic.ts
 */

// ---- Copy the exact algorithms from useTranslatedData.ts ----

function isTranslatableString(val: any): boolean {
  if (typeof val !== 'string') return false;
  if (val.trim().length === 0) return false;
  if (/^https?:\/\//i.test(val)) return false;
  if (/^\/\//.test(val)) return false;
  if (/^[a-zA-Z0-9_-]+\.(jpg|jpeg|png|gif|svg|webp|pdf|ico)$/i.test(val)) return false;
  if (/^[a-z0-9_-]+$/i.test(val) && val.length < 30) return false;
  return true;
}

interface StringEntry {
  path: string;
  value: string;
}

function extractStringsDetailed(obj: any, prefix: string): StringEntry[] {
  const entries: StringEntry[] = [];
  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      entries.push(...extractStringsDetailed(obj[i], `${prefix}[${i}]`));
    }
  } else if (obj !== null && obj !== undefined && typeof obj === 'object') {
    for (const key of Object.keys(obj)) {
      const val = obj[key];
      const path = prefix ? `${prefix}.${key}` : key;
      if (isTranslatableString(val)) {
        entries.push({ path, value: val });
      } else if (val !== null && val !== undefined && typeof val === 'object') {
        entries.push(...extractStringsDetailed(val, path));
      }
    }
  }
  return entries;
}

function extractStrings(obj: any): string[] {
  const strings: string[] = [];
  if (Array.isArray(obj)) {
    for (const item of obj) {
      if (isTranslatableString(item)) {
        strings.push(item);
      } else {
        strings.push(...extractStrings(item));
      }
    }
  } else if (obj !== null && obj !== undefined && typeof obj === 'object') {
    for (const key of Object.keys(obj)) {
      const val = obj[key];
      if (isTranslatableString(val)) {
        strings.push(val);
      } else if (val !== null && val !== undefined && typeof val === 'object') {
        strings.push(...extractStrings(val));
      }
    }
  }
  return strings;
}

function replaceStrings(obj: any, translated: string[], cursor: { pos: number }): any {
  if (Array.isArray(obj)) {
    return obj.map(item => {
      if (isTranslatableString(item)) {
        if (cursor.pos < translated.length) {
          const t = translated[cursor.pos];
          cursor.pos++;
          return (typeof t === 'string' && t.trim().length > 0) ? t : item;
        }
        return item;
      }
      return replaceStrings(item, translated, cursor);
    });
  }
  if (obj !== null && obj !== undefined && typeof obj === 'object') {
    const result: any = {};
    for (const key of Object.keys(obj)) {
      const val = obj[key];
      if (isTranslatableString(val)) {
        if (cursor.pos < translated.length) {
          const t = translated[cursor.pos];
          result[key] = (typeof t === 'string' && t.trim().length > 0) ? t : val;
          cursor.pos++;
        } else {
          result[key] = val;
        }
      } else if (val !== null && val !== undefined && typeof val === 'object') {
        result[key] = replaceStrings(val, translated, cursor);
      } else {
        result[key] = val;
      }
    }
    return result;
  }
  return obj;
}

// ---- Import actual data ----

const { CHAPTERS } = require('../data/ebookData');
const { PLAN_90_DIAS_DATA } = require('../data/plan90DiasData');
const { KIT_EMERGENCIA_DATA } = require('../data/kitEmergenciaData');
const { COUNTRIES_DATA } = require('../data/countriesData');

// ---- Diagnostic function ----

function diagnose(name: string, data: any) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`DIAGNOSTIC: ${name}`);
  console.log(`${'='.repeat(60)}`);

  // Step 1: Extract with paths
  const entries = extractStringsDetailed(data, 'root');
  console.log(`\n[extractStringsDetailed] Found ${entries.length} translatable strings:\n`);
  
  for (const e of entries) {
    const preview = e.value.length > 60 ? e.value.substring(0, 57) + '...' : e.value;
    console.log(`  ${e.path}`);
    console.log(`    → "${preview}"`);
  }

  // Step 2: Extract with the actual algorithm
  const flatStrings = extractStrings(data);
  console.log(`\n[extractStrings] Found ${flatStrings.length} strings`);

  // Step 3: Verify 1:1 match
  if (entries.length !== flatStrings.length) {
    console.log(`\n❌ MISMATCH: extractStringsDetailed=${entries.length} vs extractStrings=${flatStrings.length}`);
  } else {
    console.log(`✅ extractStrings count matches: ${entries.length}`);
  }

  // Step 4: Simulate translation (uppercase + prefix)
  const simulatedTranslation = flatStrings.map((s, i) => `[TR_${i}] ${s.toUpperCase()}`);
  
  // Step 5: Reconstruct
  const cursor = { pos: 0 };
  const reconstructed = replaceStrings(data, simulatedTranslation, cursor);
  
  console.log(`\n[replaceStrings] Reconstructed. Cursor position: ${cursor.pos}`);
  
  if (cursor.pos !== flatStrings.length) {
    console.log(`❌ CURSOR MISMATCH: expected ${flatStrings.length}, got ${cursor.pos}`);
    console.log(`   Missing ${flatStrings.length - cursor.pos} strings!`);
  } else {
    console.log(`✅ All ${cursor.pos} strings were replaced`);
  }

  // Step 6: Verify reconstructed data has translated values
  const reconEntries = extractStringsDetailed(reconstructed, 'root');
  let translatedCount = 0;
  let untranslatedCount = 0;
  
  for (const e of reconEntries) {
    if (e.value.startsWith('[TR_')) {
      translatedCount++;
    } else {
      untranslatedCount++;
      console.log(`  ❌ NOT TRANSLATED: ${e.path} = "${e.value.substring(0, 50)}"`);
    }
  }

  console.log(`\n[verification] Translated: ${translatedCount}/${reconEntries.length}`);
  if (untranslatedCount > 0) {
    console.log(`❌ ${untranslatedCount} strings were NOT translated`);
  } else {
    console.log(`✅ 100% translation verified`);
  }

  return { total: entries.length, translated: translatedCount, untranslated: untranslatedCount };
}

// ---- Run diagnostics ----

console.log('TRANSLATION ALGORITHM DIAGNOSTIC');
console.log('This verifies that every string is extracted, translated, and reconstructed.\n');

const results: Record<string, { total: number; translated: number; untranslated: number }> = {};

// 1. eBook Chapter (pick chapter 3 - has most content variety)
const ch3 = CHAPTERS.find((c: any) => c.id === 3) || CHAPTERS[2];
results['eBook Chapter 3'] = diagnose('Interactive eBook - Chapter 3', ch3);

// 2. All chapters summary
let totalChapterStrings = 0;
for (const ch of CHAPTERS) {
  totalChapterStrings += extractStrings(ch).length;
}
console.log(`\n${'='.repeat(60)}`);
console.log(`TOTAL eBook strings across ${CHAPTERS.length} chapters: ${totalChapterStrings}`);

// 3. Plan 90 Dias
results['Plan 90 Días'] = diagnose('Plan 90 Días (3 phases, 12 weeks, 90 days)', PLAN_90_DIAS_DATA);

// 4. Kit Emergencia
results['Kit Emergencia'] = diagnose('Kit Emergencia (7 sections)', KIT_EMERGENCIA_DATA);

// 5. Country Data (first 5 countries as sample)
const sampleCountries = COUNTRIES_DATA.slice(0, 5);
results['Countries (sample 5)'] = diagnose('Country Comparator - First 5 countries', sampleCountries);

// Full country count
const totalCountryStrings = extractStrings(COUNTRIES_DATA).length;
console.log(`\n${'='.repeat(60)}`);
console.log(`TOTAL Country strings across ${COUNTRIES_DATA.length} countries: ${totalCountryStrings}`);

// ---- Summary ----
console.log(`\n${'='.repeat(60)}`);
console.log('SUMMARY');
console.log(`${'='.repeat(60)}`);
console.log(`Module                    | Strings | Translated | Status`);
console.log(`--------------------------|---------|------------|-------`);
for (const [name, r] of Object.entries(results)) {
  const status = r.untranslated === 0 ? '✅ PASS' : `❌ FAIL (${r.untranslated} missed)`;
  console.log(`${name.padEnd(25)} | ${String(r.total).padStart(7)} | ${String(r.translated).padStart(10)} | ${status}`);
}
console.log(`\neBook total (${CHAPTERS.length} chapters): ${totalChapterStrings} strings`);
console.log(`Countries total (${COUNTRIES_DATA.length} countries): ${totalCountryStrings} strings`);
