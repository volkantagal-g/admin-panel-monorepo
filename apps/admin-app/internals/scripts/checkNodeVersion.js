const fs = require('node:fs');
const chalk = require('chalk');
const semver = require('semver');

const nodeVersion = process.version;
const requiredNodeVersion = fs.readFileSync('.nvmrc', 'utf8');

const nodeVersionOk = semver.satisfies(nodeVersion, requiredNodeVersion);

if (!nodeVersionOk) {
  console.error(`
    Your ${chalk.magenta('Node')} version: ${chalk.red(nodeVersion)}
    You should be using ${chalk.magenta('Node')} version which satisfies: ${chalk.green(`${requiredNodeVersion}`)}
    If you have ${chalk.magenta('nvm')} installed, you can run <${chalk.magenta('nvm use')}> to quickly switch to this project's node version.
    If you don't have nvm, follow "Quick Start" part of the README.md file
  `);
  process.exit(1);
}
