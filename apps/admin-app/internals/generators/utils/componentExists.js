/**
 * componentExists
 *
 * Check whether the given path exist in the pages directory
 */

const fs = require('node:fs');
const path = require('path');

function componentExists(comp) {
  let exists = true;
  const compIndexFilePath = path.resolve(__dirname, '../../../app/', comp, 'index.js');
  try {
    // Check if index file already exists
    fs.accessSync(compIndexFilePath, fs.constants.F_OK);
  }
  catch (error) {
    exists = false;
  }

  return exists;
}
module.exports = componentExists;
