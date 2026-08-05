'use client';

import { useState, useEffect, useCallback } from 'react';

const TRANSLATION_CACHE_PREFIX = 'migrante_translated_';

function isTranslatableString(val: any): boolean {
  if (typeof val !== 'string') return false;
  if (val.trim().length === 0) return false;
  if (/^https?:\/\//i.test(val)) return false;
  if (/^\/\//.test(val)) return false;
  if (/^[a-zA-Z0-9_-]+\.(jpg|jpeg|png|gif|svg|webp|pdf|ico)$/i.test(val)) return false;
  if (/^[a-z0-9_-]+$/i.test(val) && val.length < 30) return false;
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

function getCachedTranslation(id: string, lang: string): any | null {
  if (typeof window === 'undefined') return null;
  try {
    const key = `${TRANSLATION_CACHE_PREFIX}${id}_${lang}`;
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function setCachedTranslation(id: string, lang: string, data: any): void {
  if (typeof window === 'undefined') return;
  try {
    const key = `${TRANSLATION_CACHE_PREFIX}${id}_${lang}`;
    localStorage.setItem(key, JSON.stringify(data));
  } catch {}
}

export function useTranslatedData<T>(dataId: string, originalData: T, language: string): { data: T; loading: boolean } {
  const [data, setData] = useState<T>(originalData);
  const [loading, setLoading] = useState(false);

  const translate = useCallback(async (lang: string) => {
    if (lang === 'es') {
      setData(originalData);
      return;
    }

    const cached = getCachedTranslation(dataId, lang);
    if (cached) {
      setData(cached as T);
      return;
    }

    setLoading(true);
    try {
      const allStrings = extractStrings(originalData);
      if (allStrings.length === 0) {
        setData(originalData);
        setLoading(false);
        return;
      }

      const BATCH = 80;
      const allTranslated: string[] = [];

      for (let i = 0; i < allStrings.length; i += BATCH) {
        const batch = allStrings.slice(i, i + BATCH);
        const resp = await fetch('/api/translate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            strings: batch,
            targetLanguage: lang,
            chapterId: `${dataId}_${lang}_${i}`,
          }),
        });

        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        const result = await resp.json();
        const flat = Array.isArray(result.translated) ? result.translated : [];

        for (let j = 0; j < batch.length; j++) {
          allTranslated.push(typeof flat[j] === 'string' && flat[j].trim() ? flat[j] : batch[j]);
        }
      }

      while (allTranslated.length < allStrings.length) {
        allTranslated.push(allStrings[allTranslated.length]);
      }

      const cursor = { pos: 0 };
      const translated = replaceStrings(originalData, allTranslated, cursor);
      setCachedTranslation(dataId, lang, translated);
      setData(translated);
    } catch (err) {
      console.error(`Translation error for ${dataId}:`, err);
      setData(originalData);
    } finally {
      setLoading(false);
    }
  }, [dataId, originalData, language]);

  useEffect(() => {
    translate(language);
  }, [translate, language]);

  return { data, loading };
}
