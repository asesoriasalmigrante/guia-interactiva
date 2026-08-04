import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { createAdminClient } from '@/lib/supabase/admin';

function getGenAIClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY environment variable is missing.');
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

async function computeHash(data: any): Promise<string> {
  const json = JSON.stringify(data);
  const encoder = new TextEncoder();
  const encoded = encoder.encode(json);
  const hashBuffer = await crypto.subtle.digest('SHA-256', encoded);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function flattenStrings(arr: any): string[] {
  const result: string[] = [];
  for (const item of arr) {
    if (typeof item === 'string') {
      result.push(item);
    } else if (Array.isArray(item)) {
      result.push(...flattenStrings(item));
    } else if (item && typeof item === 'object') {
      for (const val of Object.values(item)) {
        if (typeof val === 'string') result.push(val);
        else if (Array.isArray(val)) result.push(...flattenStrings(val));
      }
    }
  }
  return result;
}

const BATCH_SIZE = 60;

export async function POST(request: Request) {
  try {
    const { strings, targetLanguage, chapterId } = await request.json();

    if (!strings || !Array.isArray(strings) || strings.length === 0) {
      return NextResponse.json({ translated: [] });
    }

    const langCode = targetLanguage.split(' ')[0].toLowerCase();
    const contentHash = await computeHash(strings);

    if (chapterId && langCode) {
      const supabase = createAdminClient();
      const { data: existing } = await supabase
        .from('chapter_translations')
        .select('translated_content, content_hash')
        .eq('chapter_id', chapterId)
        .eq('language', langCode)
        .single();

      if (existing?.translated_content &&
          Array.isArray(existing.translated_content) &&
          existing.translated_content.length === strings.length &&
          existing.content_hash === contentHash) {
        return NextResponse.json({ translated: existing.translated_content });
      }
    }

    const ai = getGenAIClient();
    const allTranslated: string[] = [];

    for (let i = 0; i < strings.length; i += BATCH_SIZE) {
      const batch = strings.slice(i, i + BATCH_SIZE);

      const prompt = `Translate each string in this JSON array to ${targetLanguage}.
Rules:
- Return a JSON array with EXACTLY ${batch.length} strings, same order.
- Translate naturally and fluently.
- Keep URLs, emails, file paths unchanged.
- Keep **bold** markup, emojis, proper nouns unchanged.
- Every input string MUST have a corresponding output string.

Input array:
${JSON.stringify(batch)}`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: prompt,
        config: {
          temperature: 0.2,
          responseMimeType: 'application/json',
        },
      });

      let parsed: any;
      try {
        parsed = JSON.parse(response.text || '[]');
      } catch {
        parsed = [];
      }

      const flat = flattenStrings(parsed);

      for (let j = 0; j < batch.length; j++) {
        const translated = flat[j];
        if (typeof translated === 'string' && translated.trim().length > 0) {
          allTranslated.push(translated);
        } else {
          allTranslated.push(batch[j]);
        }
      }
    }

    const finalResult = allTranslated.slice(0, strings.length);
    while (finalResult.length < strings.length) {
      finalResult.push(strings[finalResult.length]);
    }

    if (chapterId && langCode) {
      try {
        const supabase = createAdminClient();
        await supabase.from('chapter_translations').upsert({
          chapter_id: chapterId,
          language: langCode,
          translated_content: finalResult,
          content_hash: contentHash,
        }, { onConflict: 'chapter_id,language' });
      } catch (err) {
        console.error('Error saving translation to Supabase:', err);
      }
    }

    return NextResponse.json({ translated: finalResult });
  } catch (error: any) {
    console.error('Error en /api/translate:', error);
    return NextResponse.json(
      { error: 'Error en la traducción de contenido.' },
      { status: 500 }
    );
  }
}
