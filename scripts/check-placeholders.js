/**
 * Finds unfilled <Todo> placeholders in the Privacy Policy page.
 *
 * Runs before every build (see "prebuild"). By default it only warns, so
 * unrelated deploys are never blocked while the policy is still being filled
 * in. Once it is complete, set STRICT_PLACEHOLDERS=1 in the build environment
 * (Netlify: Site configuration > Environment variables) and any placeholder
 * that slips back in will fail the build instead of reaching the public site.
 */
import { readFile } from "fs/promises";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import process from "node:process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const FILE = join(__dirname, "..", "src", "pages", "Privacy.jsx");

const source = await readFile(FILE, "utf8");

// Matches the real usages, `<Todo>...</Todo>`, but not the component's own
// `function Todo(` definition or its doc comment.
const matches = [...source.matchAll(/<Todo>([\s\S]*?)<\/Todo>/g)].map((m) =>
  m[1].replace(/\s+/g, " ").trim(),
);

if (matches.length === 0) {
  console.log("Privacy placeholders: none left.");
  process.exit(0);
}

const strict = process.env.STRICT_PLACEHOLDERS === "1";
const label = strict ? "ERROR" : "WARNING";
console.warn(
  `[${label}] ${matches.length} unfilled placeholder(s) in src/pages/Privacy.jsx:`,
);
for (const text of matches) console.warn(`  - ${text}`);

if (strict) {
  console.error("STRICT_PLACEHOLDERS=1 is set, so the build is stopped.");
  process.exit(1);
}
