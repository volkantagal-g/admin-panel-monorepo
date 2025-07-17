import { readFile } from 'fs/promises';
import path from 'path';

import { test as base } from './internal/Base';

export const test = base.extend({
  storageState: async ({}, use) => {
    const storage = await readFile(path.resolve(__dirname, '../auth/auth_logged_in.json'), 'utf8');
    await use(JSON.parse(storage));
  },
});

export { expect } from './internal/Base';
