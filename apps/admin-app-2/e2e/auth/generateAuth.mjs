import { readFileSync, writeFileSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';

const ORIGIN = process.env.ADMIN_PANEL_E2E_BASE_URL || 'http://localhost:9003';

const folderPath = dirname(fileURLToPath(import.meta.url));

// if CI is true, ../ci/auth.json is used, otherwise ./auth.json is used
const userInputAuthFilePath = process.env.CI ? resolve(folderPath, '../ci/auth.json') : resolve(folderPath, './auth.json');

// Read user input auth file
const authStr = readFileSync(userInputAuthFilePath);
const authObj = JSON.parse(authStr);
const userLocalStorage = authObj.localStorage;

const TEST_USER_TOKEN_ENV = process.env.ADMIN_PANEL_E2E_TEST_USER_TOKEN;
// if token is set in env, use it or override it with the one from auth.json
if (TEST_USER_TOKEN_ENV) {
  userLocalStorage.token = TEST_USER_TOKEN_ENV;
}

// Create storage states for playwright
generateAuthForLoggedInUser();
generateAuthForCountrySelectedUser();

function generateAuthForLoggedInUser() {
  const authForLoggedInFilePath = resolve(folderPath, './auth_logged_in.json');
  const storageTemplate = getStorageStateTemplate();

  const requiredLocalStorageKeys = ['user', 'token'];

  Object.entries(userLocalStorage).forEach(([key, value]) => {
    if (requiredLocalStorageKeys.includes(key)) {
      const localStorageItem = {
        name: key,
        value: typeof value !== 'string' ? JSON.stringify(value) : value,
      };
      storageTemplate.origins[0].localStorage.push(localStorageItem);
    }
  });

  writeFileSync(authForLoggedInFilePath, JSON.stringify(storageTemplate));
}

function generateAuthForCountrySelectedUser() {
  const authForCountrySelectedFilePath = resolve(folderPath, './auth_country_selected.json');
  const storageTemplate = getStorageStateTemplate();
  const requiredLocalStorageKeys = [
    'user',
    'token',
    'selectedCountry',
    'selectedCountryDivision',
  ];

  Object.entries(userLocalStorage).forEach(([key, value]) => {
    if (requiredLocalStorageKeys.includes(key)) {
      const localStorageItem = {
        name: key,
        value: typeof value !== 'string' ? JSON.stringify(value) : value,
      };
      storageTemplate.origins[0].localStorage.push(localStorageItem);
    }
  });

  writeFileSync(
    authForCountrySelectedFilePath,
    JSON.stringify(storageTemplate),
  );
}

function getStorageStateTemplate() {
  const storageStateTemplate = {
    cookies: [],
    origins: [
      {
        origin: ORIGIN,
        localStorage: [{
          name: 'selectedLanguage',
          value: '"en"',
        }],
      },
    ],
  };

  return storageStateTemplate;
}
