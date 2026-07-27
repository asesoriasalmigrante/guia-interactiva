import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini client lazily
let aiClient: GoogleGenAI | null = null;
function getGenAIClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is missing.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

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
   - Ejemplos del Ebook:
     * España: Idioma Español/Catalán/Gallego/Euskera. Costo ~2500€/mes (individual). Facilidad Media. Bastante seguro.
     * EEUU: Inglés. Costo ~3000$/mes. Opciones de visados específicas. Gran potencia económica.
     * Canadá: Inglés/Francés. Costo ~5000$ CAD. Procesos exigentes pero con programas migratorios y buena seguridad.
     * Alemania: Alemán (inglés en algunos sectores). Costo ~3000€/mes. Abre puertas a profesionales y técnicos (salud, IT, oficios). Muy seguro y estable.
3. Evaluar el país según estudios:
   - La mayoría de profesiones requieren homologación o revalidación de título por medio de consulados u organismos oficiales (suele tardar aprox. 6 meses, ideal iniciar en país de origen).
   - Documentos para homologar: Título, Notas certificadas, Pensum académico, Contenido programático de cada materia.
   - Carreras en alta demanda: Enfermería/salud (Alemania, Canadá), Tecnología/Programación (Canadá, Australia, EE.UU.), Oficios técnicos como electricistas, soldadores, mecánicos (Europa).
4. Visas vs Residencias vs Ciudadanía:
   - Visa: Autorización temporal de ingreso bajo condiciones específicas (Estudiante, Trabajo/Empleo, Inversión, Reunificación familiar, Nómada Digital, Búsqueda de Empleo).
   - Residencia: Permiso legal para residir (Temporal p.ej. 2 años, o Permanente). Otorga mayor estabilidad y derechos.
   - Ciudadanía: Otorga pasaporte y derecho al voto (se solicita tras 2, 5 o 10 años de residencia continua, o por matrimonio/descendencia/nacimiento).
5. Documentos indispensables & Apostilla:
   - Documentos de Identidad (Pasaporte con >6 meses de vigencia, DNI).
   - Documentos de Estado Civil (Partida nacimiento, soltería, matrimonio, convivencia, divorcio).
   - Documentos Académicos (Títulos, notas, pensum).
   - Médicos (Certificado general, vacunas, seguro de salud).
   - Antecedentes Penales (Vigencia reciente, apostillados).
   - Documentos para Hijos (Partidas, permisos de viaje).
   - Apostilla de La Haya (Convenio 1961): OBLIGATORIA para validez internacional de documentos públicos.
   - Respaldo Digital OBLIGATORIO: Guardar escaneos en email, nube (Drive/Dropbox) y USB protegida por si roban o pierden equipaje.
6. Finanzas y Presupuesto:
   - No planificar solo con el escenario perfecto. Contar con fondo para 3 a 6 meses de gastos básicos + fondo de emergencia.
   - Gastos a calcular: Pasaporte/visas/apostillas/traducciones, pasajes, alojamiento inicial, alquiler adelantado + depósito de garantía, alimentación, transporte, seguro médico internacional.
7. Empleo desde el extranjero:
   - Buscar empleo antes de viajar reduce incertidumbre y permite visados de trabajo.
   - Adaptar el CV/Síntesis Curricular al formato y lenguaje del país de destino.
   - Optimizar perfil de LinkedIn (fotografía profesional, logros, certificaciones).
   - Portales: LinkedIn, Indeed, Glassdoor, InfoJobs, EURES (Europa), Job Bank (Canadá).
   - Cuidar con estafas: Desconfiar si piden dinero para contratarte, prometen visa "garantizada" o salarios irreales sin experiencia.
8. Adaptación Emocional y Salud Mental:
   - Duelo migratorio: Proceso natural de extrañar familia, comida, costumbres e idioma.
   - 4 Etapas: 1. Entusiasmo (luna de miel), 2. Choque cultural, 3. Adaptación, 4. Integración.
   - Las 5 Fases del Duelo: Negación, Ira, Negociación, Depresión, Aceptación.
   - Mantener red de apoyo, cuidar salud mental y buscar ayuda si es necesario.
9. Top Errores a Evitar:
   - Comprar boletos sin investigar requisitos legales.
   - Viajar sin ahorros o sin seguro médico.
   - No apostillar ni traducir títulos.
   - Guiarse por rumores de redes sociales en lugar de páginas oficiales.
   - Descuidar la salud mental o la preparación emocional.

Tus respuestas deben ser empáticas, claras, estructuradas en español, utilizando un tono profesional pero acogedor como el de Daniela Harrington de Asesorías al Migrante. Invita siempre al usuario a revisar las secciones interactivas de la aplicación (calculadora de presupuesto, checklist de documentos y comparador de países).
`;

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Chat endpoint with Gemini
app.post("/api/chat", async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;
    if (!message || typeof message !== "string") {
      res.status(400).json({ error: "Mensaje requerido" });
      return;
    }

    const ai = getGenAIClient();

    // Construct prompt with history
    const contents: any[] = [];
    
    // Add history if present
    for (const msg of conversationHistory) {
      if (msg.role && msg.text) {
        contents.push({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }]
        });
      }
    }

    // Add current message
    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: contents,
      config: {
        systemInstruction: EBOOK_CONTEXT,
        temperature: 0.7,
      },
    });

    const replyText = response.text || "No se pudo generar una respuesta en este momento.";
    res.json({ reply: replyText });
  } catch (error: any) {
    console.error("Error en /api/chat:", error);
    res.status(500).json({
      error: "Error procesando tu consulta migratoria.",
      details: error.message || String(error)
    });
  }
});

// Translation endpoint with Gemini for full guide translation
app.post("/api/translate", async (req, res) => {
  try {
    const { payload, targetLanguage } = req.body;
    if (!payload || !targetLanguage) {
      res.status(400).json({ error: "Payload y targetLanguage son requeridos" });
      return;
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
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        temperature: 0.2,
        responseMimeType: "application/json",
      },
    });

    const translatedJson = JSON.parse(response.text || "{}");
    res.json({ translated: translatedJson });
  } catch (error: any) {
    console.error("Error en /api/translate:", error);
    res.status(500).json({
      error: "Error en la traducción de contenido.",
      details: error.message || String(error)
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor de Asesorías al Migrante corriendo en http://localhost:${PORT}`);
  });
}

startServer();
