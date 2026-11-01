import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

const MAX_LINES = 35;
const EMPHATIC = /\b(MUST|CRITICAL|IMPORTANT|ALWAYS|NEVER)\b/;

export function checkPrinciples(text) {
  const lines = text.split(/\r?\n/);
  const nonBlankLines = lines.filter((l) => l.trim() !== '').length;
  const warnings = [];
  if (nonBlankLines > MAX_LINES) {
    warnings.push(`${nonBlankLines} non-blank lines (recommended at most ${MAX_LINES})`);
  }
  lines.forEach((line, i) => {
    const m = line.match(EMPHATIC);
    if (m) {
      warnings.push(`line ${i + 1} uses emphatic keyword ${m[1]}; prefer plain wording`);
    }
  });
  return { nonBlankLines, warnings };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const file = process.argv[2];
  if (!file) {
    console.error('usage: node scripts/check-principles.mjs <file>');
  } else {
    const { warnings } = checkPrinciples(readFileSync(file, 'utf8'));
    for (const w of warnings) console.log(`::warning file=${file}::${w}`);
  }
}
