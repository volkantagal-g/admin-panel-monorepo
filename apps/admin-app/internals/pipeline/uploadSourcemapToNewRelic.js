/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const fsPromise = require('fs/promises');
const path = require('path');

// https://docs.newrelic.com/docs/browser/new-relic-browser/browser-pro-features/upload-source-maps-api/
const {
  publishSourcemap,
  deleteSourcemap,
  listSourcemaps,
} = require('@newrelic/publish-sourcemap');
const recursive = require('recursive-readdir');

const IGNORE_FILES = ['*.js'];
const SRC_MAP_DIR = 'build/sourcemaps';
const STATIC_FILE_BASE_URL = process.env.REACT_APP_ADMIN_PANEL_BASE_URL ?? 'https://admin.getir.com';
const SRC_MAP_LIMIT_SIZE = 50;

// https://docs.newrelic.com/docs/apis/rest-api-v2/get-started/get-app-other-ids-new-relic-one/
// https://docs.newrelic.com/docs/apis/intro-apis/new-relic-api-keys/
const { NEW_RELIC_APP_ID, NEW_RELIC_API_KEY, BITBUCKET_TAG: NEW_RELIC_VERSION } = process.env;
console.log('uploadSourcemaptoNewRelic.js envs', { NEW_RELIC_APP_ID, NEW_RELIC_VERSION });

// Get all source maps on newrelic
const listSrcMap = async (list = [], offset = 0) => {
  const result = await new Promise((resolve, reject) => {
    listSourcemaps(
      {
        applicationId: NEW_RELIC_APP_ID,
        apiKey: NEW_RELIC_API_KEY,
        limit: SRC_MAP_LIMIT_SIZE,
        offset: offset * SRC_MAP_LIMIT_SIZE,
      },
      (err, res) => {
        if (err) return reject(err);
        return resolve(res);
      },
    );
  });

  const allMaps = [...list, ...(result?.sourcemaps ?? [])];

  // Exit if the number of retrieved items is less than the limit
  if (result?.sourcemaps?.length < SRC_MAP_LIMIT_SIZE) {
    return allMaps;
  }

  // Call this method recursively if it is equal to limit
  return listSrcMap(allMaps, offset + 1);
};

// Delete source map on newrelic
const deleteSrcMap = async srcMaps => {
  return Promise.allSettled(
    srcMaps.map(srcMap => {
      return new Promise((resolve, reject) => {
        deleteSourcemap(
          {
            sourcemapId: srcMap.id,
            applicationId: NEW_RELIC_APP_ID,
            apiKey: NEW_RELIC_API_KEY,
          },
          (err, res) => {
            if (err) {
              console.error(`\x1B[91mOld Sourcemap ${srcMap.javascriptUrl} delete failed: `, err);
              return reject(err);
            }

            console.log(`\x1b[94mOld Sourcemap ${srcMap.javascriptUrl} delete done.`);
            return resolve(res);
          },
        );
      });
    }),
  );
};

// Register source map on newrelic
const uploadSrcMap = async () => {
  const files = await recursive(SRC_MAP_DIR, IGNORE_FILES);
  // Ignore anything other than the map file
  const mapFiles = files?.filter(file => file.endsWith('.js.map'));
  console.log(`\x1b[94m${mapFiles.length} Sourcemap files found.`);
  let hasError = false;
  return Promise.allSettled(
    mapFiles.map(file => {
      return new Promise(() => {
        // js resource path set in the src attribute of the script tag
        const jsFileSrcUrl = `${STATIC_FILE_BASE_URL}/${path.relative(
          SRC_MAP_DIR,
          file,
        )}`.slice(0, -4);
        publishSourcemap(
          {
            sourcemapPath: file,
            javascriptUrl: jsFileSrcUrl,
            applicationId: NEW_RELIC_APP_ID,
            apiKey: NEW_RELIC_API_KEY,
            releaseName: NEW_RELIC_VERSION,
            releaseId: NEW_RELIC_VERSION,
          },
          err => {
            if (err) {
              console.error(`\x1B[91mSourcemap ${jsFileSrcUrl} upload failed: `, err.toString());
              hasError = true;
            }
            else {
              console.log(`\x1b[94mSourcemap ${jsFileSrcUrl} upload done.`);
            }
            // Delete the map file as it will not be published
            fsPromise.unlink(file);
          },
        );
      });
    }),
  ).then(() => Promise.resolve({ hasError }));
};

// lists all the old source map files and delete them, then upload new source map files.
async function deleteAndUploadSourceMapToNewrelic() {
  // const srcMaps = await listSrcMap();
  // console.log(`\x1b[94m${srcMaps.length} old Sourcemap files found.`);
  // await deleteSrcMap(srcMaps);
  // for now only upload sourcemaps to newrelic and monitor prod if we get any memory issues then we can include delete sourcemaps from newrelic.
  const { hasError } = await uploadSrcMap();
  console.log('uploadSrcMap result', { hasError });
  if (hasError) {
    process.exit(5);
  }
  console.log('🚀 \x1B[92mSourcemap files uploaded successfully!');
  process.exit(0);
}

try {
  deleteAndUploadSourceMapToNewrelic();
}
catch (ex) {
  console.error(ex);
  process.exit(5);
}
