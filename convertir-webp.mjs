// convertir-webp.mjs
// ─────────────────────────────────────────────────────────────────
// Convierte JPG / JPEG / PNG / HEIC → WebP
// ✅ Preserva orientación EXIF (las HEIC del iPhone no se voltean)
// ✅ Elimina el original tras convertir
// ─────────────────────────────────────────────────────────────────
// Requisitos:
//   npm install sharp
//
// Para HEIC necesitas además:
//   npm install sharp   (versión reciente ya incluye soporte HEIC)
//   Si falla HEIC prueba: npm install heic-convert
//
// Ejecuta con:
//   node convertir-webp.mjs
// ─────────────────────────────────────────────────────────────────

import { readdir, unlink, readFile, writeFile } from 'fs/promises';
import { join, extname, basename, dirname }      from 'path';
import { existsSync }                             from 'fs';

// ── Carga sharp ──────────────────────────────────────────────────
let sharp;
try {
  const mod = await import('sharp');
  sharp = mod.default;
} catch {
  console.error('❌  Falta instalar sharp:  npm install sharp');
  process.exit(1);
}

// ── Carga heic-convert (opcional, como fallback para HEIC) ───────
let heicConvert;
try {
  const mod = await import('heic-convert');
  heicConvert = mod.default;
} catch {
  // No instalado — usaremos sharp directamente (funciona en la mayoría de casos)
}

// ── Configuración ────────────────────────────────────────────────
const BASE       = './src/assets/galeria';
const QUALITY    = 82;           // 0-100 — balance peso / nitidez
const KEEP_ORIG  = false;        // false = borra el original después de convertir

const EXTENSIONS = new Set([
  '.jpg', '.jpeg', '.png',
  '.heic', '.heif',
  // Variantes mayúsculas (frecuentes en iPhone / Android)
  '.JPG', '.JPEG', '.PNG', '.HEIC', '.HEIF',
]);

// ── Recorre directorios ──────────────────────────────────────────
async function getAllFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files   = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await getAllFiles(full));
    } else if (EXTENSIONS.has(extname(entry.name))) {
      files.push(full);
    }
  }
  return files;
}

// ── Convierte un archivo HEIC a buffer JPEG usando heic-convert ──
async function heicToJpegBuffer(filePath) {
  const inputBuffer = await readFile(filePath);
  const outputBuffer = await heicConvert({
    buffer:  inputBuffer,
    format:  'JPEG',
    quality: 1,          // máxima calidad — sharp lo recomprimirá a WebP
  });
  return Buffer.from(outputBuffer);
}

// ── Conversión principal ─────────────────────────────────────────
async function convertToWebp(filePath) {
  const ext      = extname(filePath).toLowerCase();
  const webpPath = join(dirname(filePath), basename(filePath, extname(filePath)) + '.webp');

  let pipeline;

  if ((ext === '.heic' || ext === '.heif') && heicConvert) {
    // Ruta A: heic-convert → buffer JPEG → sharp (más compatible)
    try {
      const jpegBuf = await heicToJpegBuffer(filePath);
      pipeline = sharp(jpegBuf);
    } catch {
      // Si heic-convert falla, intenta con sharp directamente
      pipeline = sharp(filePath);
    }
  } else {
    // Ruta B: sharp directo (JPG, PNG, y HEIC recientes con sharp ≥ 0.32)
    pipeline = sharp(filePath);
  }

  await pipeline
    // ✅ CLAVE: lee metadatos EXIF y aplica la rotación física antes de exportar
    // Sin esto las HEIC del iPhone se exportan volteadas o giradas
    .rotate()
    .webp({ quality: QUALITY })
    .toFile(webpPath);

  if (!KEEP_ORIG) {
    await unlink(filePath);
  }
}

// ── Main ─────────────────────────────────────────────────────────
(async () => {
  if (!existsSync(BASE)) {
    console.error(`❌  No existe la carpeta:  ${BASE}`);
    process.exit(1);
  }

  const files = await getAllFiles(BASE);

  if (files.length === 0) {
    console.log('✅  No hay imágenes para convertir.');
    process.exit(0);
  }

  const heicFiles = files.filter(f => {
    const e = extname(f).toLowerCase();
    return e === '.heic' || e === '.heif';
  });

  console.log(`\n🔄  ${files.length} imagen(es) encontradas`);
  if (heicFiles.length) {
    console.log(`    📱 ${heicFiles.length} archivo(s) HEIC/HEIF`);
    if (!heicConvert) {
      console.log(`    ⚠️  heic-convert no instalado → sharp manejará los HEIC directamente`);
      console.log(`       Si alguno falla: npm install heic-convert\n`);
    }
  }
  console.log('');

  let ok = 0, skipped = 0, errores = [];

  for (const filePath of files) {
    const rel = filePath.replace(BASE + '/', '');
    const out = basename(filePath, extname(filePath)) + '.webp';
    process.stdout.write(`  ${rel.padEnd(55)} → ${out} ... `);

    try {
      await convertToWebp(filePath);
      console.log('✅');
      ok++;
    } catch (e) {
      console.log(`❌  ${e.message}`);
      errores.push({ file: rel, msg: e.message });
    }
  }

  // ── Resumen ──────────────────────────────────────────────────
  console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅  Convertidos correctamente : ${ok}
❌  Con error                 : ${errores.length}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);

  if (errores.length) {
    console.log('\n  Archivos con error:');
    errores.forEach(({ file, msg }) => console.log(`  • ${file}\n    ${msg}`));
    console.log('');
  }

  if (ok > 0) {
    console.log(`\n  📁 Los .webp están en las mismas carpetas que los originales.`);
    if (!KEEP_ORIG) {
      console.log(`  🗑️  Los originales fueron eliminados.`);
    }
  }
  console.log('');
})();
