/**
 * Optimizes project thumbnail images for web delivery.
 * Run before build: npm run optimize-images
 * Uses Sharp for lossless PNG compression and resizing to max 800px width.
 */
import { readdir, stat } from "fs/promises";
import { join, extname } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PROJECTS_DIR = join(__dirname, "..", "public", "projects");
const MAX_WIDTH = 800; // Match ProjectCard display size

async function optimizeImages() {
  let sharp;
  try {
    sharp = (await import("sharp")).default;
  } catch {
    console.warn(
      "Sharp not installed. Run: npm install sharp --save-dev\nSkipping image optimization."
    );
    return;
  }

  const files = await readdir(PROJECTS_DIR);
  const images = files.filter(
    (f) => [".png", ".jpg", ".jpeg", ".webp"].includes(extname(f).toLowerCase())
  );

  if (images.length === 0) {
    console.log("No images to optimize in public/projects");
    return;
  }

  console.log(`Optimizing ${images.length} images...`);

  for (const file of images) {
    const inputPath = join(PROJECTS_DIR, file);
    const ext = extname(file).toLowerCase();
    const stats = await stat(inputPath);
    const beforeKb = (stats.size / 1024).toFixed(1);

    try {
      let pipeline = sharp(inputPath);
      const meta = await pipeline.metadata();
      const needsResize = meta.width > MAX_WIDTH;

      if (needsResize || ext === ".png") {
        pipeline = pipeline.resize(needsResize ? MAX_WIDTH : null, null, {
          fit: "inside",
          withoutEnlargement: true,
        });
      }

      if (ext === ".png") {
        pipeline = pipeline.png({
          compressionLevel: 9,
          adaptiveFiltering: true,
        });
      } else if ([".jpg", ".jpeg"].includes(ext)) {
        pipeline = pipeline.jpeg({ quality: 85, mozjpeg: true });
      } else if (ext === ".webp") {
        pipeline = pipeline.webp({ quality: 85 });
      }

      const buffer = await pipeline.toBuffer();
      const afterKb = (buffer.length / 1024).toFixed(1);
      const saved = ((1 - buffer.length / stats.size) * 100).toFixed(0);

      if (buffer.length < stats.size) {
        await import("fs/promises").then((fs) =>
          fs.writeFile(inputPath, buffer)
        );
        console.log(
          `  ${file}: ${beforeKb} KB → ${afterKb} KB (${saved}% saved)`
        );
      } else {
        console.log(`  ${file}: ${beforeKb} KB (no improvement)`);
      }
    } catch (err) {
      console.error(`  ${file}: ${err.message}`);
    }
  }
}

optimizeImages();
