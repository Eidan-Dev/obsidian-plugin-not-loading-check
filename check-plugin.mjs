// check-plugin.mjs
// Usage: node check-plugin.mjs ./path/to/plugin
import { existsSync, readFileSync } from "node:fs";
import { basename, join, resolve } from "node:path";

const pluginDir = resolve(process.argv[2] ?? ".");
const errors = [];

// 1. manifest.json must exist and be valid JSON
const manifestPath = join(pluginDir, "manifest.json");
let manifest = null;
if (!existsSync(manifestPath)) {
  errors.push("manifest.json is missing");
} else {
  try {
    manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  } catch (err) {
    errors.push(`manifest.json is not valid JSON: ${err.message}`);
  }
}

if (manifest) {
  // 2. Required fields Obsidian reads to load the plugin
  for (const field of ["id", "name", "version", "minAppVersion"]) {
    if (!manifest[field]) errors.push(`manifest.json is missing "${field}"`);
  }

  // 3. The folder name must match the id, or Obsidian skips it
  if (manifest.id && basename(pluginDir) !== manifest.id) {
    errors.push(`folder "${basename(pluginDir)}" must match id "${manifest.id}"`);
  }
}

// 4. main.js is the file Obsidian actually runs
if (!existsSync(join(pluginDir, "main.js"))) {
  errors.push("main.js is missing: did you run the build?");
}

if (errors.length) {
  console.error("❌ Plugin will NOT load:");
  errors.forEach((e) => console.error(`  - ${e}`));
  process.exit(1);
}
console.log(`✅ "${manifest.name}" looks good. Reload Obsidian.`);