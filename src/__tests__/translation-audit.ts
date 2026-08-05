/**
 * Translation Audit Script
 * 
 * Scans all .tsx/.ts component files for hardcoded Spanish text that should
 * be translated via the i18n system. Run with: npx tsx src/__tests__/translation-audit.ts
 * 
 * This script detects:
 * - Spanish words in JSX text content (not in t() calls)
 * - Hardcoded Spanish strings in props
 * - Missing translations for visible content
 */

import * as fs from 'fs';
import * as path from 'path';

const SRC_DIR = path.resolve(__dirname, '..');

// Common Spanish words that should never appear hardcoded in components
const SPANISH_INDICATORS = [
  // UI labels
  'Capítulo', 'capítulo', 'Día', 'día', 'Fase', 'fase',
  'Sección', 'sección', 'Semana', 'semana',
  // Common UI
  'Buscar', 'buscar', 'Filtrar', 'filtrar', 'Enviar', 'enviar',
  'Cancelar', 'cancelar', 'Guardar', 'guardar', 'Eliminar', 'eliminar',
  'Aceptar', 'aceptar', 'Cerrar', 'cerrar', 'Volver', 'volver',
  'Siguiente', 'siguiente', 'Anterior', 'anterior',
  // Quiz
  'Preguntas', 'preguntas', 'Resultado', 'resultado',
  'Respuesta', 'respuesta', 'Calificación', 'calificación',
  // Navigation
  'Inicio', 'inicio', 'Menú', 'menú', 'Contenido', 'contenido',
  'Leer', 'leer', 'Descargar', 'descargar',
  // Countries
  'País', 'país', 'Países', 'países', 'Costo de vida', 'costo de vida',
  'Profesiones', 'profesiones', 'Ventajas', 'ventajas', 'Desventajas', 'desventajas',
  // Plan
  'Plan', 'plan', 'Objetivo', 'objetivo', 'Tarea', 'tarea',
  // Kit
  'Manual', 'manual', 'Emergencia', 'emergencia',
  // Common
  'Idioma', 'idioma', 'Perfil', 'perfil', 'Cuenta', 'cuenta',
  'Cerrar sesión', 'Iniciar sesión', 'Registrarse', 'Olvidé mi contraseña',
  // Labels that appear in UI
  'Cargando', 'Error', 'Éxito', 'Advertencia',
  'Traduciendo', 'Traducción',
];

interface Finding {
  file: string;
  line: number;
  content: string;
  matchedWord: string;
}

function scanFile(filePath: string): Finding[] {
  const findings: Finding[] = [];
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineNum = i + 1;

    // Skip imports, comments, and t() calls
    if (line.trim().startsWith('import ') || 
        line.trim().startsWith('//') ||
        line.trim().startsWith('*') ||
        line.trim().startsWith('/*')) {
      continue;
    }

    // Skip translation files
    if (filePath.includes('/translations/')) continue;

    // Skip data files (they contain the Spanish source text)
    if (filePath.includes('/data/')) continue;

    // Skip type definitions
    if (filePath.includes('/types')) continue;

    for (const word of SPANISH_INDICATORS) {
      // Check if the word appears in the line but NOT inside a t() call
      if (line.includes(word)) {
        // Simple heuristic: if the word appears after > or inside { but not in t('...')
        const tCallRegex = new RegExp(`t\\(['"]\\w*['"]`, 'g');
        const lineWithoutTCalls = line.replace(tCallRegex, '');
        
        if (lineWithoutTCalls.includes(word)) {
          findings.push({
            file: path.relative(SRC_DIR, filePath),
            line: lineNum,
            content: line.trim().substring(0, 120),
            matchedWord: word,
          });
          break; // One finding per line is enough
        }
      }
    }
  }

  return findings;
}

function findComponentFiles(dir: string): string[] {
  const files: string[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules') {
      files.push(...findComponentFiles(fullPath));
    } else if (entry.isFile() && (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts'))) {
      files.push(fullPath);
    }
  }

  return files;
}

function main() {
  console.log('🔍 Translation Audit - Scanning for hardcoded Spanish...\n');

  const componentFiles = findComponentFiles(SRC_DIR);
  const allFindings: Finding[] = [];

  for (const file of componentFiles) {
    const findings = scanFile(file);
    allFindings.push(...findings);
  }

  if (allFindings.length === 0) {
    console.log('✅ No hardcoded Spanish text found in components.\n');
    process.exit(0);
  }

  console.log(`⚠️  Found ${allFindings.length} potential issues:\n`);

  const grouped: Record<string, Finding[]> = {};
  for (const f of allFindings) {
    if (!grouped[f.file]) grouped[f.file] = [];
    grouped[f.file].push(f);
  }

  for (const [file, findings] of Object.entries(grouped)) {
    console.log(`📄 ${file}`);
    for (const f of findings) {
      console.log(`   Line ${f.line}: [${f.matchedWord}] ${f.content}`);
    }
    console.log('');
  }

  console.log('Note: Some findings may be false positives (e.g., Spanish text in comments or type definitions).');
  console.log('Review each finding manually to determine if it needs translation.\n');

  process.exit(1);
}

main();
