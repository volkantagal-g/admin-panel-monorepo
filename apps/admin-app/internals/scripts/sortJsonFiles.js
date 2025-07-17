const sortJson = require('sort-json');
const glob = require('glob');

const defaultGlob = './app/**/*.json';

// pass arguments like "npm run sort file1_path file2_path ..."
let inputFilePaths = process.argv.slice(2);

// no input, use all jsons in the app
if (!inputFilePaths.length) {
  inputFilePaths = glob.sync(defaultGlob);
}

sortJson.overwrite([...inputFilePaths]);
