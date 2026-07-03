# GuestChat Landing Page

Landing page GuestChat — inbox terpadu untuk hotel. Dibangun dengan **Astro** + **Tailwind CSS v4**, output statis.

## Stack

- [Astro](https://astro.build) 5 — static output
- Tailwind CSS v4 (via `@tailwindcss/vite`)
- TypeScript (strict)
- Vanilla JS untuk interaksi (mobile menu)

## Menjalankan

```bash
npm install
npm run dev        # dev server → http://localhost:4321
npm run build      # build statis ke dist/
npm run preview    # preview hasil build
```

## Struktur

```
src/
  data/site.ts            # config situs (WhatsApp, email, toggle section)
  styles/global.css       # Tailwind + design tokens (@theme)
  layouts/Layout.astro    # <head>, fonts, base HTML
  components/             # tiap section landing page
    Nav · Hero · LogoBar · ProblemSolution · Features
    AiAgent · Reputation · Mobile · Testimonials · FinalCta · Footer
  pages/index.astro       # merakit semua section
public/assets/            # gambar (hero-product.png)
```

## Konfigurasi

Edit `src/data/site.ts`:

- `whatsappNumber` — nomor WhatsApp (dipakai untuk semua tombol `wa.me`)
- `email`, `phoneDisplay`, `location` — info kontak footer
- `showLogoBar`, `showTestimonials` — tampilkan/sembunyikan section opsional

Design tokens (warna brand, font) ada di `src/styles/global.css` pada blok `@theme`.

## Aset gambar & optimasi

Logo brand mentah disimpan di `brand-logos-src/` (di luar `public/`, jadi tidak ikut ter-deploy). `scripts/optimize-images.mjs` meng-generate WebP kecil ke `public/assets/logos/` + hero WebP. Tambah/ganti logo → taruh di `brand-logos-src/`, daftarkan di skrip, lalu jalankan ulang:

```bash
node scripts/optimize-images.mjs
```

Daftar logo untuk trust bar & Reputation diatur di `src/data/logos.ts`.

## Font

**Plus Jakarta Sans** di-self-host. TTF sumber ada di `static/`; `scripts/convert-fonts.mjs` mengonversi weight yang dipakai (400/500/600/700/800) ke WOFF2 (~30 KB each) di `public/fonts/`, lalu didaftarkan via `@font-face` di `src/styles/global.css`.

```bash
node scripts/convert-fonts.mjs
```

**IBM Plex Mono** (teks eyebrow/mono) masih dari Google Fonts. Taruh TTF-nya di `static/` dan tambahkan ke skrip bila mau ikut di-self-host.

## Catatan

- **Testimoni** di `src/components/Testimonials.astro` masih **dummy** (nama & hotel fiktif) — ganti dengan kutipan pelanggan asli sebelum produksi.
- **Trust bar** (`LogoBar.astro`) menampilkan logo kanal (WhatsApp, Email, Instagram, Facebook, LINE, Telegram) + OTA (Booking, Traveloka, Tiket, Expedia, Trip, Airbnb) asli. **Agoda** sengaja belum disertakan (belum ada file logo).
- Folder `persiapan-web-development/` berisi file design asli dari Claude Design (sumber referensi). Aman untuk dihapus jika tidak diperlukan.
