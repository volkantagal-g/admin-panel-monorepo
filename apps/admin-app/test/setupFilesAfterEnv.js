import '@testing-library/jest-dom';
import './utils/debugging';
import 'jest-canvas-mock';

import { i18nPromise, changeLanguage } from '@app/i18n';
import server from './server';
import wsServer from './server/wsServer';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

Object.defineProperty(window, 'prompt', {
  writable: true,
  value: jest.fn().mockImplementation(() => {}),
});

Object.defineProperty(window, 'open', {
  writable: true,
  value: jest.fn().mockImplementation(() => {}),
});

Object.defineProperty(window, 'ResizeObserver', {
  writable: true,
  value: jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  })),
});

Object.defineProperty(window, 'scrollTo', {
  writable: true,
  value: jest.fn().mockImplementation(() => {}),
});

// Some libraries print warnings for deprecated stuff, which breaks test report visually
const originalWarning = console.warn;

const SILENT_WARNINGS = true;

beforeAll(async () => {
  // Establish API mocking before all tests.
  server.listen();
  wsServer.listen();

  await i18nPromise;
  // initial language
  changeLanguage('en');

  if (SILENT_WARNINGS) {
    console.warn = jest.fn();
  }
});

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.

afterEach(() => {
  server.resetHandlers();
});

// Clean up after the tests are finished.

afterAll(() => {
  if (SILENT_WARNINGS) {
    console.warn = originalWarning;
  }
  server.close();
  wsServer.close();
});
