/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
const glob = require('glob');
const path = require('path');

const { createGlobalHandler } = require('./handlerUtils');

const HANDLER_REGEX = 'app/api/**/*.mock.handler.js';

const globalHandlers = [];

try {
  const handlerFiles = glob.sync(HANDLER_REGEX);
  if (Array.isArray(handlerFiles) && handlerFiles.length) {
    handlerFiles.forEach(handlerFile => {
      const resolvedPath = path.resolve('./', handlerFile);
      // default export from ESM modules
      const options = require(resolvedPath).default;
      // map mock options to create handlers
      if (options) {
        globalHandlers.push(...options.map(createGlobalHandler));
      }
      else {
        console.error(`No default exported handler options found for: ${handlerFile} \n Do not forget to export your handlers with default export as well`);
      }
    });
  }
}
catch (error) {
  console.error(error);
}

module.exports = globalHandlers;
