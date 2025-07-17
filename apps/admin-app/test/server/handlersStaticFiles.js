const fs = require('node:fs');

const { createHandler } = require('./handlerUtils');

const { readFileSync } = fs;

// any url which has <baseUrl>/translations/
// Note that translations are not fetched from api-gw, it is fetched from origin

const TRANSLATIONS_URL_PATH_REGEX = /http:\/\/localhost\/translations\/*/;

const translationFilesHandler = createHandler({
  options: {
    url: TRANSLATIONS_URL_PATH_REGEX,
    method: 'get',
    // from request path, read corresponding translation file and return in response
    handler: req => {
      const rootPath = process.cwd();
      const fileRelativePath = req.url.pathname; // example: /translations/error.json
      const filePath = `${rootPath}/app${fileRelativePath}`;
      const jsonString = readFileSync(filePath, { encoding: 'utf8' });
      return { data: JSON.parse(jsonString) };
    },
  },
});

const staticFileHandlers = [translationFilesHandler];

module.exports = staticFileHandlers;
