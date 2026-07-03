// Convert the local Plus Jakarta Sans TTFs (static/) to WOFF2 in public/fonts/.
// Only the weights actually used by the design are converted.
// Run: node scripts/convert-fonts.mjs
import { readFile, writeFile, mkdir, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import wawoff2 from 'wawoff2';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = `${ROOT}/static`;
const OUT = `${ROOT}/public/fonts`;
await mkdir(OUT, { recursive: true });

// weight name -> source TTF (upright only; italics unused)
const weights = {
  400: 'PlusJakartaSans-Regular.ttf',
  500: 'PlusJakartaSans-Medium.ttf',
  600: 'PlusJakartaSans-SemiBold.ttf',
  700: 'PlusJakartaSans-Bold.ttf',
  800: 'PlusJakartaSans-ExtraBold.ttf',
};

const kb = async (p) => ((await stat(p)).size / 1024).toFixed(1) + ' KB';

for (const [weight, file] of Object.entries(weights)) {
  const inPath = `${SRC}/${file}`;
  const outPath = `${OUT}/plus-jakarta-sans-${weight}.woff2`;
  const ttf = await readFile(inPath);
  const woff2 = await wawoff2.compress(ttf);
  await writeFile(outPath, woff2);
  console.log(`${weight}  ${await kb(inPath)}  ->  woff2 ${(woff2.length / 1024).toFixed(1)} KB`);
}
