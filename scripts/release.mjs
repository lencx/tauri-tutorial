import { createRequire } from 'module';
import { execSync } from 'child_process';
import fs from 'fs';

import { resolveUpdateLog } from './updatelog.mjs';

const require = createRequire(import.meta.url);

async function publish() {
  const flag = process.argv[2] ?? 'patch';
  const packageJson = require('../package.json');
  let [a, b, c] = packageJson.version.split('.').map(Number);

  if (flag === 'major') {
    a += 1;
    b = 0;
    c = 0;
  } else if (flag === 'minor') {
    b += 1;
    c = 0;
  } else if (flag === 'patch') {
    c += 1;
  } else {
    console.log(`Invalid flag "${flag}"`);
    process.exit(1);
  }

  const nextVersion = `${a}.${b}.${c}`;
  packageJson.version = nextVersion;

  const nextTag = `v${nextVersion}`;
  await resolveUpdateLog(nextTag);

  fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 2));

  execSync('git add ./package.json');
  execSync(`git commit -m "v${nextVersion}"`);
  execSync(`git tag -a v${nextVersion} -m "v${nextVersion}"`);
  execSync(`git push`);
  execSync(`git push origin v${nextVersion}`);
  console.log(`Publish Successfully...`);
}

publish().catch(console.error);
