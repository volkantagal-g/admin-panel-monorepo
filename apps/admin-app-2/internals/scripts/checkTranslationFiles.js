const fs = require('node:fs');
const glob = require('glob');
const path = require('path');
const { difference, isEmpty, isObject } = require('lodash');

const inputFilePaths = process.argv.slice(2);
const jsonFilesToCheck = new Set(inputFilePaths.map(p => path.basename(p)));

const languageDirectories = glob.sync('./app/translations/*');

let hasErrors = false;
languageDirectories.forEach(languageDirectory => {
  const language = path.basename(languageDirectory);
  const jsonFiles = glob.sync(`${languageDirectory}/*.json`);
  jsonFiles.forEach(jsonFile => {
    if (jsonFilesToCheck.size && !jsonFilesToCheck.has(path.basename(jsonFile))) return;

    const json = JSON.parse(fs.readFileSync(jsonFile, 'utf-8'));
    languageDirectories.forEach(otherLanguageDirectory => {
      const otherLanguage = path.basename(otherLanguageDirectory);
      if (otherLanguageDirectory === languageDirectory) return;

      const otherJsonPath = jsonFile.replace(languageDirectory, otherLanguageDirectory);
      if (!fs.existsSync(otherJsonPath)) {
        console.error(`'${jsonFile}' has no equivalent file for language '${otherLanguage}'`);
        hasErrors = true;
        return;
      }

      const otherJson = JSON.parse(fs.readFileSync(otherJsonPath, 'utf-8'));
      const filename = path.basename(otherJsonPath);
      const recursiveCheckObject = (lhs, rhs, currentPath) => {
        const leftKeys = Object.keys(lhs);
        const rightKeys = Object.keys(rhs);
        let diff = difference(leftKeys, rightKeys);
        const diffSet = new Set(diff);
        diff = diff.map(key => currentPath + key);

        leftKeys.forEach(k => {
          if (diffSet.has(k)) return; // error already logged above

          const leftIsObject = isObject(lhs[k]);
          const rightIsObject = isObject(rhs[k]);

          if (leftIsObject !== rightIsObject) {
            console.error(`'${filename}': the type of "${currentPath}${k}" is mismatched between '${language}' and '${otherLanguage}'`);
            hasErrors = true;
            return;
          }

          if (leftIsObject) diff = diff.concat(recursiveCheckObject(lhs[k], rhs[k], `${currentPath}${k}.`));
        });

        return diff;
      };

      const diff = recursiveCheckObject(json, otherJson, '');
      if (!isEmpty(diff)) {
        console.error(`'${filename}' contains the following translations in '${language}', but not in '${otherLanguage}': ${diff.join(' | ')}`);
        hasErrors = true;
      }
    });
  });
});

if (hasErrors) process.exit(1);
