// One-off image optimization.
//   - hero PNG (if present) -> WebP
//   - brand + integration logos (brand-logos-src/) -> small square WebP in public/assets/logos/
//   - GuestChat mark + apple touch icon
// Run: node scripts/optimize-images.mjs
import sharp from 'sharp';
import { statSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = `${ROOT}/brand-logos-src`;
const OUT = `${ROOT}/public/assets/logos`;
const kb = (p) => (statSync(p).size / 1024).toFixed(1) + ' KB';

// Integration logos (square icons) -> 96px WebP, transparent-safe.
const logos = {
  whatsapp: 'whatsapp-logo.png',
  gmail: 'gmail-logo.png',
  instagram: 'instagram-logo.png',
  facebook: 'facebook-logo.png',
  line: 'line-logo.png',
  telegram: 'telegram-logo.png',
  booking: 'booking-com-logo.png',
  traveloka: 'traveloka-logo.png',
  tiket: 'tiket-logo.webp',
  expedia: 'expedia-logo.png',
  trip: 'trip-logo.png',
  airbnb: 'airbnb-logo.jpeg',
};

for (const [name, file] of Object.entries(logos)) {
  const out = `${OUT}/${name}.webp`;
  await sharp(`${SRC}/${file}`)
    .resize(96, 96, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .webp({ quality: 88, effort: 6 })
    .toFile(out);
  console.log(`logo ${name.padEnd(10)} -> ${kb(out)}`);
}

// GuestChat mark (green on transparent) -> 128px WebP for nav/footer.
const markOut = `${OUT}/guestchat.webp`;
await sharp(`${SRC}/guestchat.png`)
  .resize(128, 128, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .webp({ quality: 92, effort: 6 })
  .toFile(markOut);
console.log(`mark guestchat  -> ${kb(markOut)}`);

// Apple touch icon (opaque, from the lime app icon if available).
const appleSrc = existsSync(`${ROOT}/persiapan-web-development/project/assets/guestchat-logo-src.png`)
  ? `${ROOT}/persiapan-web-development/project/assets/guestchat-logo-src.png`
  : `${SRC}/guestchat.png`;
const appleOut = `${ROOT}/public/apple-touch-icon.png`;
await sharp(appleSrc).resize(180, 180, { fit: 'contain', background: '#8bc34a' }).png({ compressionLevel: 9 }).toFile(appleOut);
console.log(`apple-touch     -> ${kb(appleOut)}`);

// Hero (only if the source PNG is still around).
const heroSrc = `${ROOT}/public/assets/hero-product.png`;
if (existsSync(heroSrc)) {
  const heroOut = `${ROOT}/public/assets/hero-product.webp`;
  await sharp(heroSrc).webp({ quality: 78, effort: 6 }).toFile(heroOut);
  console.log(`hero            -> ${kb(heroOut)}`);
}
