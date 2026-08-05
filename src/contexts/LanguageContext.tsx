'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  getAppLanguage,
  setAppLanguage as persistLanguage,
  t,
  getChecklistCategoryName,
  getChecklistCategoryDesc,
  getChecklistItemText,
  getChecklistItemTooltip,
  getCountryName,
  clearChapterCache,
} from '@/src/utils/i18n';
import { clearAllTranslationCaches } from '@/src/hooks/useTranslatedData';

interface LanguageContextType {
  language: string;
  setLanguage: (code: string) => void;
  t: (key: string) => string;
  getChecklistCategoryName: (catId: string) => string;
  getChecklistCategoryDesc: (catId: string) => string;
  getChecklistItemText: (itemId: string) => string;
  getChecklistItemTooltip: (itemId: string) => string;
  getCountryName: (countryId: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'es',
  setLanguage: () => {},
  t: (key: string) => key,
  getChecklistCategoryName: (catId: string) => catId,
  getChecklistCategoryDesc: (catId: string) => '',
  getChecklistItemText: (itemId: string) => itemId,
  getChecklistItemTooltip: (itemId: string) => '',
  getCountryName: (countryId: string) => countryId,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<string>('es');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const lang = getAppLanguage();
    setLanguageState(lang);
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
    }
  }, []);

  const setLanguage = useCallback((code: string) => {
    setLanguageState(code);
    persistLanguage(code);
    clearChapterCache();
    clearAllTranslationCaches();
    if (typeof document !== 'undefined') {
      document.documentElement.lang = code;
    }
  }, []);

  const ctxT = useCallback((key: string) => t(key, language), [language]);
  const ctxGetChecklistCategoryName = useCallback((catId: string) => getChecklistCategoryName(catId, language), [language]);
  const ctxGetChecklistCategoryDesc = useCallback((catId: string) => getChecklistCategoryDesc(catId, language), [language]);
  const ctxGetChecklistItemText = useCallback((itemId: string) => getChecklistItemText(itemId, language), [language]);
  const ctxGetChecklistItemTooltip = useCallback((itemId: string) => getChecklistItemTooltip(itemId, language), [language]);
  const ctxGetCountryName = useCallback((countryId: string) => getCountryName(countryId, language), [language]);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <LanguageContext.Provider value={{
      language,
      setLanguage,
      t: ctxT,
      getChecklistCategoryName: ctxGetChecklistCategoryName,
      getChecklistCategoryDesc: ctxGetChecklistCategoryDesc,
      getChecklistItemText: ctxGetChecklistItemText,
      getChecklistItemTooltip: ctxGetChecklistItemTooltip,
      getCountryName: ctxGetCountryName,
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
