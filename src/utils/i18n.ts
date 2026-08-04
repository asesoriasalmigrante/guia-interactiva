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

export async function translateChapterWithAI(chapterObj: any, langCode: string): Promise<any> {
  if (langCode === 'es') return chapterObj;

  const cacheKey = `ch_${chapterObj.id}_${langCode}`;
  if (chapterTranslationCache.has(cacheKey)) {
    return chapterTranslationCache.get(cacheKey);
  }

  const langObj = WORLD_LANGUAGES.find((l) => l.code === langCode) || WORLD_LANGUAGES[0];

  try {
    const payloadToTranslate = {
      title: chapterObj.title,
      summary: chapterObj.summary,
      keyPoints: chapterObj.keyPoints,
      warningAlert: chapterObj.warningAlert,
      danielaTip: chapterObj.danielaTip,
      sections: chapterObj.sections.map((s: any) => ({
        heading: s.heading,
        content: s.content,
        bulletPoints: s.bulletPoints || [],
        imageCaption: s.imageCaption,
      })),
    };

    const response = await fetch('/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        payload: payloadToTranslate,
        targetLanguage: `${langObj.name} (${langObj.nativeName})`,
        chapterId: chapterObj.id,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    if (data.translated) {
      const trans = data.translated;
      const translatedChapter = {
        ...chapterObj,
        title: trans.title || chapterObj.title,
        summary: trans.summary || chapterObj.summary,
        keyPoints: Array.isArray(trans.keyPoints) && trans.keyPoints.length > 0 ? trans.keyPoints : chapterObj.keyPoints,
        warningAlert: trans.warningAlert || chapterObj.warningAlert,
        danielaTip: trans.danielaTip || chapterObj.danielaTip,
        sections: chapterObj.sections.map((origSec: any, idx: number) => {
          const transSec = trans.sections?.[idx] || {};
          return {
            ...origSec,
            heading: transSec.heading || origSec.heading,
            content: transSec.content || origSec.content,
            bulletPoints: Array.isArray(transSec.bulletPoints) && transSec.bulletPoints.length > 0 ? transSec.bulletPoints : origSec.bulletPoints,
            imageCaption: transSec.imageCaption || origSec.imageCaption,
          };
        }),
      };

      chapterTranslationCache.set(cacheKey, translatedChapter);
      return translatedChapter;
    }
  } catch (err) {
    console.error(`AI Translation error for chapter ${chapterObj.id} into ${langCode}:`, err);
  }

  return chapterObj;
}
