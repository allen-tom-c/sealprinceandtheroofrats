/**
 * compress-images.mjs
 * Run with: npm run compress
 * Converts all JPG/PNG in public/images/ to WebP at 80% quality.
 * Resizes anything wider than 1920px.
 * Updates .astro files to reference the new .webp filenames.
 */

import sharp from 'sharp';
import { readdir, readFile, writeFile } from 'fs/promises';
import { join, extname, basename } from 'path';

const INPUT_DIR = 'public/images';
const MAX_WIDTH = 1920;
const QUALITY = 80;

async function* walkDir(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walkDir(fullPath);
    } else {
      yield fullPath;
    }
  }
}

async function compressImages() {
  const renames = [];

  for await (const filePath of walkDir(INPUT_DIR)) {
    const ext = extname(filePath).toLowerCase();
    if (!['.jpg', '.jpeg', '.png'].includes(ext)) continue;

    const webpPath = filePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    const base = basename(filePath);
    const webpBase = basename(webpPath);

    console.log(`  Converting ${base} → ${webpBase}`);

    await sharp(filePath)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(webpPath);

    renames.push({ from: base, to: webpBase });
  }

  // Update .astro files
  const astroFiles = [];
  for await (const f of walkDir('src')) {
    if (f.endsWith('.astro')) astroFiles.push(f);
  }

  for (const astroFile of astroFiles) {
    let content = await readFile(astroFile, 'utf8');
    let changed = false;
    for (const { from, to } of renames) {
      if (content.includes(from)) {
        content = content.replaceAll(from, to);
        changed = true;
      }
    }
    if (changed) {
      await writeFile(astroFile, content);
      console.log(`  Updated references in ${astroFile}`);
    }
  }

  // Update photos.json
  try {
    const photosPath = 'src/data/photos.json';
    let photos = JSON.parse(await readFile(photosPath, 'utf8'));
    let changed = false;
    for (const { from, to } of renames) {
      photos = photos.map(p => {
        if (p.src && p.src.includes(from)) {
          changed = true;
          return { ...p, src: p.src.replace(from, to) };
        }
        return p;
      });
    }
    if (changed) {
      await writeFile(photosPath, JSON.stringify(photos, null, 2));
      console.log('  Updated references in src/data/photos.json');
    }
  } catch (e) {
    // photos.json may not exist yet
  }

  console.log(`\nDone. ${renames.length} image(s) converted.`);
}

compressImages().catch(console.error);
