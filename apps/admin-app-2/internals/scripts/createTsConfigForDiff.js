const { writeFileSync } = require('node:fs');

const cliArgsFilePaths = process.argv.slice(2);

const tempConfig = {
  extends: './tsconfig.json',
  files: cliArgsFilePaths,
};

const tempConfigString = JSON.stringify(tempConfig, null, 2);

const tempConfigPath = './tsconfig.diff.json';

writeFileSync(tempConfigPath, tempConfigString);
