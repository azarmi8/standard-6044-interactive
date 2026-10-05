#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
const r = spawnSync(process.execPath, ['tools/6044-qa.mjs'], { stdio: 'inherit' });
process.exit(r.status ?? 1);
