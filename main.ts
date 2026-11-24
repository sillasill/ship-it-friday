import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const MAX_CHARS = 159;
const LINE = "feat: Friday deploy to prod, all tests green (both of them) — shipping now, see you Monday";

function fail(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

const chars = [...LINE].length;
if (chars < 1 || chars > MAX_CHARS) {
  fail(`line must be 1-${MAX_CHARS} characters, got ${chars}`);
}
if (LINE.trim().length === 0) {
  fail("line must not be only whitespace");
}
if (LINE !== LINE.trim()) {
  fail("line must not have leading or trailing whitespace");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  fail("line must be a single line");
}

const outputPath = process.env.OUTPUT_PATH ?? "/output/entry.txt";
mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, LINE, "utf8");
console.log(`wrote ${chars} characters to ${outputPath}`);
