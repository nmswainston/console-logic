/**
 * Generates the raster icons browsers ask for by fixed name, from the one
 * source of truth, public/favicon.svg:
 *
 *   public/favicon.ico              16, 32 and 48px in one file, requested at
 *                                   /favicon.ico by older browsers, feed readers
 *                                   and some crawlers no matter what the
 *                                   <link rel="icon"> tag says
 *   public/favicon-32x32.png        PNG fallback for browsers without SVG icons
 *   public/apple-touch-icon.png     180x180, used by iOS for home-screen bookmarks
 *   public/android-chrome-192x192.png and -512x512.png
 *                                   listed in site.webmanifest, used by Android
 *                                   for home-screen shortcuts
 *
 * Without these files the URLs fall through to the 404 page.
 *
 * Run manually with `npm run icons` after changing favicon.svg. The outputs are
 * committed, so the normal build does not depend on this script.
 */
import { readFile, writeFile } from "fs/promises";
// Explicit: the shared eslint config only declares browser globals.
import { Buffer } from "node:buffer";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC = join(__dirname, "..", "public");

const svg = await readFile(join(PUBLIC, "favicon.svg"));

// The artwork is drawn on a 512-unit grid. `density` tells sharp how finely to
// rasterise the SVG before resizing: render at least at full size, then scale
// down, so small icons are sharp downsamples rather than blurry upscales.
const SOURCE_SIZE = 512;
const renderPng = (size) =>
  sharp(svg, { density: 72 * Math.max(1, (size / SOURCE_SIZE) * 2) })
    .resize(size, size)
    .png()
    .toBuffer();

const write = (name, buffer) => writeFile(join(PUBLIC, name), buffer);

// iOS draws its own rounded mask and shows transparent pixels as black, so the
// touch icon is flattened onto the icon's background colour. The mask is
// rounder than our corners, so the flattened corners are never visible.
const touch = await sharp(await renderPng(180))
  .flatten({ background: "#070C17" })
  .png()
  .toBuffer();
await write("apple-touch-icon.png", touch);

await write("favicon-32x32.png", await renderPng(32));
await write("android-chrome-192x192.png", await renderPng(192));
await write("android-chrome-512x512.png", await renderPng(512));

// An .ico file is a small directory wrapped around one or more images, and
// since Windows Vista each image may simply be a PNG. So: a 6-byte header, one
// 16-byte directory entry per image, then the PNG bytes as they are. Windows
// picks the size that fits best (16 in a tab, 32 or 48 on the desktop).
const ICO_SIZES = [16, 32, 48];
const pngs = await Promise.all(ICO_SIZES.map(renderPng));

const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type 1 = icon
header.writeUInt16LE(pngs.length, 4); // number of images

let offset = header.length + 16 * pngs.length;
const entries = pngs.map((png, i) => {
  const entry = Buffer.alloc(16);
  entry.writeUInt8(ICO_SIZES[i], 0); // width
  entry.writeUInt8(ICO_SIZES[i], 1); // height
  entry.writeUInt8(0, 2); // palette size (none)
  entry.writeUInt8(0, 3); // reserved
  entry.writeUInt16LE(1, 4); // colour planes
  entry.writeUInt16LE(32, 6); // bits per pixel
  entry.writeUInt32LE(png.length, 8); // image byte length
  entry.writeUInt32LE(offset, 12); // where this image starts in the file
  offset += png.length;
  return entry;
});

await write("favicon.ico", Buffer.concat([header, ...entries, ...pngs]));

console.log(
  "Icons written: favicon.ico, favicon-32x32.png, apple-touch-icon.png, android-chrome-192x192.png, android-chrome-512x512.png",
);
