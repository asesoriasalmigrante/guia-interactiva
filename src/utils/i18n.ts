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
