'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

const CACHE_VERSION = 1;
const CACHE_PREFIX = `migrante_translated_v${CACHE_VERSION}_`;
const CACHE_TTL_MS = 7 * 24 * 60 * 60 * 1000;
const BATCH_SIZE = 80;
const MAX_RETRIES = 1;

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

interface CacheEntry {
  data: any;
  timestamp: number;
}

function getCacheKey(dataId: string, lang: string): string {
  return `${CACHE_PREFIX}${dataId}_${lang}`;
}

function getCachedTranslation(dataId: string, lang: string): any | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(getCacheKey(dataId, lang));
    if (!raw) return null;
    const entry: CacheEntry = JSON.parse(raw);
    if (Date.now() - entry.timestamp > CACHE_TTL_MS) {
      localStorage.removeItem(getCacheKey(dataId, lang));
      return null;
    }
    return entry.data;
  } catch {
    return null;
  }
}

function setCachedTranslation(dataId: string, lang: string, data: any): void {
  if (typeof window === 'undefined') return;
  try {
    const entry: CacheEntry = { data, timestamp: Date.now() };
    localStorage.setItem(getCacheKey(dataId, lang), JSON.stringify(entry));
  } catch {}
}

export function clearAllTranslationCaches(): void {
  if (typeof window === 'undefined') return;
  try {
    const keys = Object.keys(localStorage);
    for (const key of keys) {
      if (key.startsWith(CACHE_PREFIX)) {
        localStorage.removeItem(key);
      }
    }
  } catch {}
}

async function translateBatch(
  batch: string[],
  targetLang: string,
  chapterId: string
): Promise<string[]> {
  const resp = await fetch('/api/translate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      strings: batch,
      targetLanguage: targetLang,
      chapterId,
    }),
  });

  if (!resp.ok) {
    const errorBody = await resp.text().catch(() => '');
    throw new Error(`[Translation] API error ${resp.status}: ${errorBody}`);
  }

  const result = await resp.json();
  const flat: any[] = Array.isArray(result.translated) ? result.translated : [];

  const translated: string[] = [];
  for (let j = 0; j < batch.length; j++) {
    const t = flat[j];
    if (typeof t === 'string' && t.trim().length > 0) {
      translated.push(t);
    } else {
      translated.push(batch[j]);
    }
  }
  return translated;
}

export function useTranslatedData<T>(
  dataId: string,
  originalData: T,
  language: string
): { data: T; loading: boolean } {
  const [data, setData] = useState<T>(originalData);
  const [loading, setLoading] = useState(false);
  const requestIdRef = useRef(0);

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

    const currentRequestId = ++requestIdRef.current;
    setLoading(true);

    try {
      const allStrings = extractStrings(originalData);
      if (allStrings.length === 0) {
        setData(originalData);
        setLoading(false);
        return;
      }

      let allTranslated: string[] = [];
      let failed = false;

      for (let i = 0; i < allStrings.length; i += BATCH_SIZE) {
        if (requestIdRef.current !== currentRequestId) return;

        const batch = allStrings.slice(i, i + BATCH_SIZE);
        const batchId = `${dataId}_${lang}_${i}`;
        let batchResult: string[] | null = null;

        for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
          try {
            const result = await translateBatch(batch, lang, batchId);
            if (result.length === batch.length) {
              batchResult = result;
              break;
            }
            console.warn(
              `[Translation] ${dataId}/${lang} batch ${i}: length mismatch ` +
              `expected ${batch.length}, got ${result.length}. ` +
              `${attempt < MAX_RETRIES ? 'Retrying...' : 'Using fallback.'}`
            );
          } catch (err) {
            console.warn(
              `[Translation] ${dataId}/${lang} batch ${i} attempt ${attempt + 1}:`,
              err
            );
          }
        }

        if (batchResult) {
          allTranslated.push(...batchResult);
        } else {
          failed = true;
          allTranslated.push(...batch);
        }
      }

      if (requestIdRef.current !== currentRequestId) return;

      if (failed) {
        console.warn(
          `[Translation] ${dataId}/${lang}: some batches failed. ` +
          `Partial translation applied.`
        );
      }

      const cursor = { pos: 0 };
      const translated = replaceStrings(originalData, allTranslated, cursor);
      setCachedTranslation(dataId, lang, translated);
      setData(translated);
    } catch (err) {
      console.error(`[Translation] ${dataId}/${lang}: unexpected error`, err);
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
