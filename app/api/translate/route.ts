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

const BATCH_SIZE = 80;

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

      if (existing?.translated_content && existing.content_hash === contentHash) {
        return NextResponse.json({ translated: existing.translated_content });
      }
    }

    const ai = getGenAIClient();
    const allTranslated: string[] = [];

    for (let i = 0; i < strings.length; i += BATCH_SIZE) {
      const batch = strings.slice(i, i + BATCH_SIZE);

      const prompt = `Translate each string in this JSON array to ${targetLanguage}.
Return a JSON array with the same length, same order. Translate naturally, fluently.
Keep **bold**, links, URLs, emojis, proper nouns unchanged.
Do NOT translate: URLs, email addresses, file paths.
Return ONLY a raw JSON array of strings. No markdown, no explanations.

Input:
${JSON.stringify(batch)}`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: prompt,
        config: {
          temperature: 0.2,
          responseMimeType: 'application/json',
        },
      });

      const parsed = JSON.parse(response.text || '[]');
      if (Array.isArray(parsed)) {
        allTranslated.push(...parsed);
      } else {
        allTranslated.push(...batch);
      }
    }

    while (allTranslated.length < strings.length) {
      allTranslated.push(strings[allTranslated.length]);
    }

    if (chapterId && langCode) {
      try {
        const supabase = createAdminClient();
        await supabase.from('chapter_translations').upsert({
          chapter_id: chapterId,
          language: langCode,
          translated_content: allTranslated,
          content_hash: contentHash,
        }, { onConflict: 'chapter_id,language' });
      } catch (err) {
        console.error('Error saving translation to Supabase:', err);
      }
    }

    return NextResponse.json({ translated: allTranslated });
  } catch (error: any) {
    console.error('Error en /api/translate:', error);
    return NextResponse.json(
      { error: 'Error en la traducción de contenido.' },
      { status: 500 }
    );
  }
}
