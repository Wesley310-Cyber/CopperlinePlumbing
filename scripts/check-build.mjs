// Launch guard. Run before and after `astro build` (see package.json).
//
//   npm run build                      -> preview build: problems print as warnings, build passes
//   SITE_ENV=production npm run build  -> production build: any problem fails the build
//
// Production fails when:
//   - src/data/business.json has "demoMode": true
//   - any [BRACKET] placeholder text is left in business.json or the built pages
//   - the word "bonded" appears in the built pages (we say "Licensed & Insured")
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const strict = process.env.SITE_ENV === 'production';
const checkDist = process.argv.includes('--dist');
const root = new URL('..', import.meta.url).pathname;

// [PHONE], [LICENSE NUMBER], [BRACKET]: capitals in square brackets, at least one letter.
const BRACKET = /\[(?=[A-Z0-9 _/-]*[A-Z])[A-Z0-9 _/-]+\]/g;
const problems = [];

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

if (!checkDist) {
  const raw = readFileSync(join(root, 'src/data/business.json'), 'utf8');
  const data = JSON.parse(raw);
  if (data.demoMode === true) problems.push('business.json: "demoMode" is true. Set it to false and replace every demo value before launch.');
  for (const m of raw.match(BRACKET) ?? []) problems.push(`business.json: placeholder text ${m} is still there.`);
} else {
  const dist = join(root, 'dist');
  if (!existsSync(dist)) {
    console.error('check-build: dist/ not found. Run astro build first.');
    process.exit(1);
  }
  for (const file of walk(dist).filter((f) => f.endsWith('.html'))) {
    const text = readFileSync(file, 'utf8')
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<style[\s\S]*?<\/style>/gi, '');
    const rel = file.slice(dist.length + 1);
    for (const m of text.match(BRACKET) ?? []) problems.push(`${rel}: placeholder text ${m} is in the page.`);
    if (/\bbonded\b/i.test(text)) problems.push(`${rel}: uses the word "bonded". Say "Licensed & Insured".`);
  }
}

if (problems.length === 0) {
  console.log(`check-build: ok${strict ? ' (production)' : ' (preview)'}`);
} else if (strict) {
  console.error('\ncheck-build: production build blocked.\n' + problems.map((p) => `  - ${p}`).join('\n') + '\n');
  process.exit(1);
} else {
  console.warn('\ncheck-build: preview build, so these are warnings. SITE_ENV=production would fail on them.\n' + problems.map((p) => `  - ${p}`).join('\n') + '\n');
}
