const path = require('path');
const chalk = require('chalk');
const { upperFirst, snakeCase } = require('lodash');
const { execSync } = require('child_process');

const pageGenerator = require('./page/index');

module.exports = plop => {
  plop.setGenerator('page', pageGenerator);

  plop.setHelper('pascalPathCase', text => {
    const splitPaths = text.split('/');
    const modifiedPaths = splitPaths.map((x, index) => {
      // 'pages/PageName/..', so first one is 'pages' and it shouldn't be capitalized
      // we already validate, it must start with 'pages'
      if (index === 0) {
        return x;
      }
      return upperFirst(x);
    });
    return modifiedPaths.join('/');
  });

  plop.setHelper('upperSnakeCase', text => {
    return snakeCase(text).toUpperCase();
  });

  plop.setHelper('simpleActionNameCase', action => {
    let selectorName = action.trim();
    if (selectorName.indexOf('get') === 0) {
      const tempName = selectorName.substring(3);
      selectorName = `${tempName.charAt(0).toLowerCase()}${tempName.slice(1)}`;
    }
    return selectorName;
  });

  plop.setHelper('pascalCaseForSimpleActionName', action => {
    let selectorName = action.trim();
    if (selectorName.indexOf('get') === 0) {
      const tempName = selectorName.substring(3);
      selectorName = `${tempName.charAt(0).toUpperCase()}${tempName.slice(1)}`;
    }
    return selectorName;
  });

  plop.setActionType('chalk', (answers, action) => {
    // eslint-disable-next-line no-console
    console.log(`
      ${chalk.green('SUCCESS')}: ${action.title || '-'}
      ${chalk.yellow('WARNING')}: ${action.message || '-'}
    `);
  });

  plop.setActionType('eslintFix', (answers, config) => {
    const folderPath = `${path.join(
      __dirname,
      '/../../app/',
      config.pathPrefix ? config.pathPrefix : '',
      plop.getHelper('pascalPathCase')(answers.path),
      '**',
    )}`;

    // eslint-disable-next-line no-useless-catch
    try {
      execSync(`eslint --fix "${path.join(folderPath, '**.ts*')}" "${path.join(folderPath, '**.js*')}"`);
      return folderPath;
    }
    catch (err) {
      // Always returns error because there are some lines to be fixed in the auto generated codes (FIX IT's).
      // This error skipped in order not to mislead the developers
      return folderPath;
    }
  });

  plop.setActionType('promptMessage', (answers, config) => {
    const folderPath = `${path.join(
      __dirname,
      '/../../app/',
      config.pathPrefix ? config.pathPrefix : '',
      plop.getHelper('pascalPathCase')(answers.path),
      '**',
      '**.js',
    )}`;

    // eslint-disable-next-line no-useless-catch
    try {
      execSync(`eslint --fix "${folderPath}"`);
      return folderPath;
    }
    catch (err) {
      // Always returns error because there are some lines to be fixed in the auto generated codes (FIX IT's).
      // This error skipped in order not to mislead the developers
      return folderPath;
    }
  });
};
