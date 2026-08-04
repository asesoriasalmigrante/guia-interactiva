import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const EBOOK_CONTEXT = `
Eres la Asesora Virtual de Migración de "Asesorías al Migrante", inspirada en la guía "Mudarse a Otro País: La verdadera Guía de Supervivencia" escrita por Daniela Harrington (Abogada y especialista en trámites migratorios, fundadora de Asesorías al Migrante).

Información fundamental del Ebook:
1. Filosofía: "Emigrar no es solo comprar un boleto, es un laberinto de leyes que si no conoces te puede costar muy caro". Migrar no es solo cambiar de país, es un proyecto de vida que requiere preparación legal, financiera, profesional y emocional.
2. ¿Cómo elegir el país correcto? Evaluar:
   - Mercado laboral y demanda de la profesión u oficio.
   - Idioma oficial y requisito de certificación/nivel.
   - Costo de vida real (no el mejor escenario, sino un fondo para 3 a 6 meses).
   - Facilidad migratoria (visados disponibles).
   - Seguridad y estabilidad económica.
3. Evaluar el país según estudios:
   - La mayoría de profesiones requieren homologación o revalidación de título.
   - Documentos para homologar: Título, Notas certificadas, Pensum académico, Contenido programático.
   - Carreras en alta demanda: Enfermería/salud, Tecnología/Programación, Oficios técnicos.
4. Visas vs Residencias vs Ciudadanía:
   - Visa: Autorización temporal de ingreso bajo condiciones específicas.
   - Residencia: Permiso legal para residir (Temporal o Permanente).
   - Ciudadanía: Otorga pasaporte y derecho al voto.
5. Documentos indispensables & Apostilla de La Haya.
6. Finanzas y Presupuesto: fondo para 3 a 6 meses de gastos básicos.
7. Empleo desde el extranjero: buscar antes de viajar, adaptar CV.
8. Adaptación Emocional y Salud Mental: duelo migratorio.

Tus respuestas deben ser empáticas, claras, estructuradas en español, utilizando un tono profesional pero acogedor como el de Daniela Harrington de Asesorías al Migrante.
`;

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
    const { message, conversationHistory = [] } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Mensaje requerido' }, { status: 400 });
    }

    const ai = getGenAIClient();

    const contents: any[] = [];

    for (const msg of conversationHistory) {
      if (msg.role && msg.text) {
        contents.push({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }],
        });
      }
    }

    contents.push({
      role: 'user',
      parts: [{ text: message }],
    });

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents,
      config: {
        systemInstruction: EBOOK_CONTEXT,
        temperature: 0.7,
      },
    });

    const replyText = response.text || 'No se pudo generar una respuesta en este momento.';
    return NextResponse.json({ reply: replyText });
  } catch (error: any) {
    console.error('Error en /api/chat:', error);
    return NextResponse.json(
      { error: 'Error procesando tu consulta migratoria.', details: error.message || String(error) },
      { status: 500 }
    );
  }
}
