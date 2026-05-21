import { writeFileSync } from "node:fs";
import { createRequire } from "node:module";

writeFileSync("spawn-result.txt", "started\n");

const require = createRequire(import.meta.url);

try {
  const version = require("next/package.json").version;
  writeFileSync("spawn-result.txt", `next version: ${version}\n`);
} catch (error) {
  writeFileSync("spawn-result.txt", `error: ${error}\n`);
}
