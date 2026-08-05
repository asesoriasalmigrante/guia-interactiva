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
};

export function t(key: string, langCode?: string): string {
  const code = langCode || getAppLanguage();
  const keyMap = TRANSLATIONS[key];
  if (!keyMap) return key;
  return keyMap[code] || keyMap['es'] || key;
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
