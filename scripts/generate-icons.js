/**
 * Generates the raster icons browsers ask for by fixed name, from the one
 * source of truth, public/favicon.svg:
 *
 *   public/apple-touch-icon.png  180x180, used by iOS for home-screen bookmarks
 *   public/favicon.ico           32x32, requested at /favicon.ico by older
 *                                browsers, feed readers and some crawlers no
 *                                matter what the <link rel="icon"> tag says
 *
 * Without these files both URLs fall through to an HTML page.
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

// `density` tells sharp how finely to rasterise the SVG before resizing, so
// the 32-unit artwork stays crisp at 180px instead of being scaled up blurry.
const renderPng = (size) =>
  sharp(svg, { density: 72 * (size / 32) * 2 })
    .resize(size, size)
    .png()
    .toBuffer();

// iOS draws its own rounded mask and shows transparent pixels as black, so the
// touch icon is flattened onto the icon's own background colour.
const touch = await sharp(await renderPng(180))
  .flatten({ background: "#0a0a0a" })
  .png()
  .toBuffer();
await writeFile(join(PUBLIC, "apple-touch-icon.png"), touch);

// An .ico file is a small directory wrapped around one or more images, and
// since Windows Vista each image may simply be a PNG. So: a 6-byte header, one
// 16-byte directory entry, then the PNG bytes as they are.
const png32 = await renderPng(32);
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type 1 = icon
header.writeUInt16LE(1, 4); // number of images

const entry = Buffer.alloc(16);
entry.writeUInt8(32, 0); // width
entry.writeUInt8(32, 1); // height
entry.writeUInt8(0, 2); // palette size (none)
entry.writeUInt8(0, 3); // reserved
entry.writeUInt16LE(1, 4); // colour planes
entry.writeUInt16LE(32, 6); // bits per pixel
entry.writeUInt32LE(png32.length, 8); // image byte length
entry.writeUInt32LE(header.length + entry.length, 12); // image offset

await writeFile(join(PUBLIC, "favicon.ico"), Buffer.concat([header, entry, png32]));

console.log("Icons written: public/apple-touch-icon.png, public/favicon.ico");
