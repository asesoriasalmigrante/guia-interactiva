import { commonTranslations } from '../translations/common';
import { headerTranslations } from '../translations/header';
import { loginTranslations } from '../translations/login';
import { chapterTranslations } from '../translations/chapter';
import { countriesTranslations } from '../translations/countries';
import { budgetTranslations } from '../translations/budget';
import { checklistTranslations } from '../translations/checklist';
import { quizTranslations } from '../translations/quiz';
import { jobplanTranslations } from '../translations/jobplan';
import { resourcesTranslations } from '../translations/resources';
import { footerTranslations } from '../translations/footer';
import { extraTranslations } from '../translations/extra';
import { quizDataTranslations } from '../translations/quizData';
import { adminTranslations } from '../translations/admin';
import { authTranslations } from '../translations/auth';
import { paymentTranslations } from '../translations/payment';
import { dataTranslations } from '../translations/data';
import { countryTranslations } from '../translations/countriesData';

export interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

export const WORLD_LANGUAGES: LanguageOption[] = [
  { code: 'es', name: 'Español', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'en', name: 'Inglés', nativeName: 'English', flag: '🇬🇧' },
  { code: 'zh', name: 'Chino Mandarín', nativeName: '中文 (简体)', flag: '🇨🇳' },
  { code: 'fr', name: 'Francés', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Alemán', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'pt', name: 'Portugués', nativeName: 'Português', flag: '🇵🇹' },
  { code: 'it', name: 'Italiano', nativeName: 'Italiano', flag: '🇮🇹' },
  { code: 'ru', name: 'Ruso', nativeName: 'Русский', flag: '🇷🇺' },
  { code: 'ar', name: 'Árabe', nativeName: 'العربية', flag: '🇸🇦' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'ja', name: 'Japonés', nativeName: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: 'Coreano', nativeName: '한국어', flag: '🇰🇷' },
  { code: 'id', name: 'Indonesio', nativeName: 'Bahasa Indonesia', flag: '🇮🇩' },
  { code: 'tr', name: 'Turco', nativeName: 'Türkçe', flag: '🇹🇷' },
  { code: 'vi', name: 'Vietnamita', nativeName: 'Tiếng Việt', flag: '🇻🇳' },
];

export const TRANSLATIONS: Record<string, Record<string, string>> = {
  ...commonTranslations,
  ...headerTranslations,
  ...loginTranslations,
  ...chapterTranslations,
  ...countriesTranslations,
  ...budgetTranslations,
  ...checklistTranslations,
  ...quizTranslations,
  ...jobplanTranslations,
  ...resourcesTranslations,
  ...footerTranslations,
  ...extraTranslations,
  ...quizDataTranslations,
  ...adminTranslations,
  ...authTranslations,
  ...paymentTranslations,
  ...dataTranslations,
  ...countryTranslations,
};

export function t(key: string, langCode?: string): string {
  const code = langCode || getAppLanguage();
  const keyMap = TRANSLATIONS[key];
  if (!keyMap) return key;
  return keyMap[code] || keyMap['es'] || key;
}

const CHECKLIST_CAT_MAP: Record<string, { nameKey: string; descKey: string }> = {
  identidad: { nameKey: 'catIdentidadName', descKey: 'catIdentidadDesc' },
  estado_civil: { nameKey: 'catEstadoCivilName', descKey: 'catEstadoCivilDesc' },
  academicos: { nameKey: 'catAcademicosName', descKey: 'catAcademicosDesc' },
  salud_penales: { nameKey: 'catSaludName', descKey: 'catSaludDesc' },
  respaldo_digital: { nameKey: 'catRespaldoName', descKey: 'catRespaldoDesc' },
  viaje_finanzas: { nameKey: 'catViajeName', descKey: 'catViajeDesc' },
};

export function getChecklistCategoryName(catId: string, langCode?: string): string {
  const mapping = CHECKLIST_CAT_MAP[catId];
  if (!mapping) return catId;
  return t(mapping.nameKey, langCode);
}

export function getChecklistCategoryDesc(catId: string, langCode?: string): string {
  const mapping = CHECKLIST_CAT_MAP[catId];
  if (!mapping) return '';
  return t(mapping.descKey, langCode);
}

const CHECKLIST_ITEM_MAP: Record<string, string> = {
  chk_1: 'chk1', chk_2: 'chk2', chk_3: 'chk3', chk_4: 'chk4',
  chk_5: 'chk5', chk_6: 'chk6', chk_7: 'chk7', chk_8: 'chk8',
  chk_9: 'chk9', chk_10: 'chk10', chk_11: 'chk11', chk_12: 'chk12',
  chk_13: 'chk13', chk_14: 'chk14', chk_15: 'chk15', chk_16: 'chk16',
  chk_17: 'chk17', chk_18: 'chk18', chk_19: 'chk19', chk_20: 'chk20',
  chk_21: 'chk21', chk_22: 'chk22', chk_23: 'chk23', chk_24: 'chk24',
};

const CHECKLIST_TIP_MAP: Record<string, string> = {
  chk_1: 'chk1Tip', chk_5: 'chk5Tip', chk_11: 'chk11Tip', chk_14: 'chk14Tip',
};

export function getChecklistItemText(itemId: string, langCode?: string): string {
  const key = CHECKLIST_ITEM_MAP[itemId];
  if (!key) return itemId;
  return t(key, langCode);
}

export function getChecklistItemTooltip(itemId: string, langCode?: string): string {
  const key = CHECKLIST_TIP_MAP[itemId];
  if (!key) return '';
  return t(key, langCode);
}

const COUNTRY_NAME_MAP: Record<string, string> = {
  espana: 'countryEspana', canada: 'countryCanada', alemania: 'countryAlemania',
  australia: 'countryAustralia', francia: 'countryFrancia', portugal: 'countryPortugal',
  italia: 'countryItalia', chile: 'countryChile', argentina: 'countryArgentina',
  brasil: 'countryBrasil', mexico: 'countryMexico', colombia: 'countryColombia',
  peru: 'countryPeru', ecuador: 'countryEcuador', costa_rica: 'countryCostaRica',
  panama: 'countryPanama', uruguay: 'countryUruguay', paraguay: 'countryParaguay',
  bolivia: 'countryBolivia', republica_dominicana: 'countryRepublicaDominicana',
  cuba: 'countryCuba', guatemala: 'countryGuatemala', honduras: 'countryHonduras',
  el_salvador: 'countryElSalvador', nicaragua: 'countryNicaragua', panamá: 'countryPanama',
  nueva_zelanda: 'countryNuevaZelanda', paises_bajos: 'countryPaisesBajos',
  belgica: 'countryBelgica', suecia: 'countrySuecia', noruega: 'countryNoruega',
  dinamarca: 'countryDinamarca', finlandia: 'countryFinlandia', irlanda: 'countryIrlanda',
  suiza: 'countrySuiza', austria: 'countryAustria', polonia: 'countryPolonia',
  chequia: 'countryChequia', hungría: 'countryHungria', grecia: 'countryGrecia',
  croacia: 'countryCroacia', eslovenia: 'countryEslovenia', eslovaquia: 'countryEslovaquia',
  rumania: 'countryRumania', bulgaria: 'countryBulgaria', chipre: 'countryChipre',
  malta: 'countryMalta', estonia: 'countryEstonia', letonia: 'countryLetonia',
  lituania: 'countryLituania', islandia: 'countryIslandia', luxemburgo: 'countryLuxemburgo',
  turquia: 'countryTurquia', rusia: 'countryRusia', china: 'countryChina',
  japon: 'countryJapon', corea_del_sur: 'countryCoreaDelSur', india: 'countryIndia',
  tailandia: 'countryTailandia', vietnam: 'countryVietnam', filipinas: 'countryFilipinas',
  indonesia: 'countryIndonesia', malasia: 'countryMalasia', singapur: 'countrySingapur',
  emiratos: 'countryEmiratos', qatar: 'countryQatar', arabia_saudita: 'countryArabiaSaudita',
  israel: 'countryIsrael', egipto: 'countryEgipto', sudafrica: 'countrySudafrica',
  marruecos: 'countryMarruecos', nigeria: 'countryNigeria', kenia: 'countryKenia',
  ghana: 'countryGhana', senegal: 'countrySenegal',
};

export function getCountryName(countryId: string, langCode?: string): string {
  const key = COUNTRY_NAME_MAP[countryId];
  if (!key) return countryId;
  return t(key, langCode);
}

export function setAppLanguage(langCode: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('migrante_lang', langCode);
    window.dispatchEvent(new Event('languagechange'));
  }
}

export function getAppLanguage(): string {
  if (typeof window === 'undefined') return 'es';
  return localStorage.getItem('migrante_lang') || 'es';
}

const chapterTranslationCache = new Map<string, any>();

export function clearChapterCache(): void {
  chapterTranslationCache.clear();
}

function isTranslatableString(val: any): boolean {
  if (typeof val !== 'string') return false;
  if (val.trim().length === 0) return false;
  if (/^https?:\/\//i.test(val)) return false;
  if (/^\/\//.test(val)) return false;
  if (/^[a-zA-Z0-9_-]+\.(jpg|jpeg|png|gif|svg|webp|pdf|ico)$/i.test(val)) return false;
  return true;
}

function extractStrings(obj: any): string[] {
  const strings: string[] = [];
  if (Array.isArray(obj)) {
    for (const item of obj) {
      strings.push(...extractStrings(item));
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
    return obj.map(item => replaceStrings(item, translated, cursor));
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

export async function translateChapterWithAI(chapterObj: any, langCode: string): Promise<any> {
  if (langCode === 'es') return chapterObj;

  const cacheKey = `ch_${chapterObj.id}_${langCode}`;
  if (chapterTranslationCache.has(cacheKey)) {
    return chapterTranslationCache.get(cacheKey);
  }

  const langObj = WORLD_LANGUAGES.find((l) => l.code === langCode) || WORLD_LANGUAGES[0];

  try {
    const allStrings = extractStrings(chapterObj);
    if (allStrings.length === 0) return chapterObj;

    const response = await fetch('/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        strings: allStrings,
        targetLanguage: `${langObj.name} (${langObj.nativeName})`,
        chapterId: chapterObj.id,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    const translatedStrings: string[] = data.translated;

    if (!Array.isArray(translatedStrings) || translatedStrings.length !== allStrings.length) {
      console.warn(`Translation length mismatch: expected ${allStrings.length}, got ${translatedStrings?.length}`);
      return chapterObj;
    }

    const cursor = { pos: 0 };
    const translatedChapter = replaceStrings(chapterObj, translatedStrings, cursor);

    chapterTranslationCache.set(cacheKey, translatedChapter);
    return translatedChapter;
  } catch (err) {
    console.error(`AI Translation error for chapter ${chapterObj.id} into ${langCode}:`, err);
  }

  return chapterObj;
}
