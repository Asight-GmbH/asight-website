// Generates the social/Open-Graph preview image (1200x630) used in link unfurls
// (Teams, LinkedIn, WhatsApp, Slack ...). Run: node scripts/generate-og.mjs
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const LOGO = path.join(root, 'public/assets/logos/ASIGHT Logo + Wordmark long final.png');
const OUT = path.join(root, 'public/assets/og/asight-og.png');

const W = 1200, H = 630;

// Brand background: light surface gradient + faint tech grid + soft teal glow + accent line.
const bg = Buffer.from(`
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffffff"/>
      <stop offset="1" stop-color="#eaf0f2"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.82" cy="0.85" r="0.6">
      <stop offset="0" stop-color="#3AA6B9" stop-opacity="0.18"/>
      <stop offset="1" stop-color="#3AA6B9" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow2" cx="0.12" cy="0.1" r="0.5">
      <stop offset="0" stop-color="#AFDDE9" stop-opacity="0.22"/>
      <stop offset="1" stop-color="#AFDDE9" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M48 0H0V48" fill="none" stroke="#11161d" stroke-opacity="0.035" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#grid)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <rect width="${W}" height="${H}" fill="url(#glow2)"/>
  <!-- top + bottom brand rules -->
  <rect x="0" y="0" width="${W}" height="6" fill="#3AA6B9"/>
  <rect x="0" y="${H - 6}" width="${W}" height="6" fill="#11161d"/>
  <!-- centered accent underline below the logo -->
  <rect x="${W / 2 - 70}" y="492" width="140" height="5" rx="2.5" fill="#3AA6B9"/>
</svg>`);

const logoW = 700;
const logo = await sharp(LOGO)
  .resize({ width: logoW })
  .toBuffer({ resolveWithObject: true });
const logoH = logo.info.height;

await sharp(bg)
  .composite([
    { input: logo.data, left: Math.round((W - logoW) / 2), top: Math.round((H - logoH) / 2) - 28 },
  ])
  .png()
  .toFile(OUT);

console.log('OG image written:', OUT, `(${W}x${H}, logo ${logoW}x${logoH})`);
