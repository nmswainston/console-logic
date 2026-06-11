/**
 * Generates public/sitemap.xml from the route table and project data so the
 * sitemap never drifts out of sync with the case studies.
 * Run before build via the "prebuild" script.
 */
import { writeFile } from "fs/promises";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { projects } from "../src/data/projects.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SITE = "https://consolelogic.net";
const OUTPUT = join(__dirname, "..", "public", "sitemap.xml");

const lastmod = new Date().toISOString().slice(0, 10);

const staticPaths = ["/", "/projects", "/about"];
const projectPaths = projects.map((p) => `/projects/${p.slug}`);
const paths = [...staticPaths, ...projectPaths];

const urls = paths
  .map(
    (path) =>
      `  <url><loc>${SITE}${path}</loc><lastmod>${lastmod}</lastmod></url>`
  )
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

await writeFile(OUTPUT, xml, "utf8");
console.log(`Sitemap written with ${paths.length} URLs → public/sitemap.xml`);
