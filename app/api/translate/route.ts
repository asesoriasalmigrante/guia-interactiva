import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

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

export async function POST(request: Request) {
  try {
    const { payload, targetLanguage } = await request.json();

    if (!payload || !targetLanguage) {
      return NextResponse.json(
        { error: 'Payload y targetLanguage son requeridos' },
        { status: 400 }
      );
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
    return NextResponse.json({ translated: translatedJson });
  } catch (error: any) {
    console.error('Error en /api/translate:', error);
    return NextResponse.json(
      { error: 'Error en la traducción de contenido.', details: error.message || String(error) },
      { status: 500 }
    );
  }
}
