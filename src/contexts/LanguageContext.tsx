'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getAppLanguage, setAppLanguage as persistLanguage } from '@/src/utils/i18n';

interface LanguageContextType {
  language: string;
  setLanguage: (code: string) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'es',
  setLanguage: () => {},
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
    if (typeof document !== 'undefined') {
      document.documentElement.lang = code;
    }
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
