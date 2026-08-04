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

async function computeHash(payload: any): Promise<string> {
  const json = JSON.stringify(payload);
  const encoder = new TextEncoder();
  const data = encoder.encode(json);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function POST(request: Request) {
  try {
    const { payload, targetLanguage, chapterId } = await request.json();

    if (!payload || !targetLanguage) {
      return NextResponse.json(
        { error: 'Payload y targetLanguage son requeridos' },
        { status: 400 }
      );
    }

    const langCode = targetLanguage.split(' ')[0].toLowerCase();
    const contentHash = await computeHash(payload);

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

    const prompt = `You are a professional native legal & migration translator. Translate the given JSON content into ${targetLanguage}.
CRITICAL INSTRUCTIONS:
1. Preserve all JSON keys, structure, and array lengths EXACTLY.
2. Preserve all formatting like **bold** words, numbers, country names, link URLs, and emojis.
3. Translate all descriptive and educational text naturally into fluent ${targetLanguage}.
4. Return ONLY valid raw JSON. Do not include markdown \`\`\`json wrappers.

JSON content to translate:
${JSON.stringify(payload)}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
      config: {
        temperature: 0.2,
        responseMimeType: 'application/json',
      },
    });

    const translatedJson = JSON.parse(response.text || '{}');

    if (chapterId && langCode) {
      try {
        const supabase = createAdminClient();
        await supabase.from('chapter_translations').upsert({
          chapter_id: chapterId,
          language: langCode,
          translated_content: translatedJson,
          content_hash: contentHash,
        }, { onConflict: 'chapter_id,language' });
      } catch (err) {
        console.error('Error saving translation to Supabase:', err);
      }
    }

    return NextResponse.json({ translated: translatedJson });
  } catch (error: any) {
    console.error('Error en /api/translate:', error);
    return NextResponse.json(
      { error: 'Error en la traducción de contenido.' },
      { status: 500 }
    );
  }
}
