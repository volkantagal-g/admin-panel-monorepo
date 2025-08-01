import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config';

const DEFAULT_URL = 'http://localhost:9003';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './e2e',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: 1,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : (+(process.env.E2E_WORKERS || 0) || undefined),
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    // list stdout
    ['list'],
    // pretty html report, don't open it automatically on CI, otherwise open after failure
    ['html', {
      // pass env if you want to open an html report web server
      open: (process.env.CI || !process.env.E2E_REPORT_SERVER) ? 'never' : 'on-failure',
      outputFolder: 'e2e-report',
    }],
  ],
  outputDir: 'e2e-artifacts',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.ADMIN_PANEL_E2E_BASE_URL || DEFAULT_URL,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        locale: 'tr-TR',
        timezoneId: 'Europe/Istanbul',
        ...(process.env.E2E_SLOW_MO ? { slowMo: +process.env.E2E_SLOW_MO } : {}),
        // launchOptions: { slowMo: 300 },
      },
    },
    // too many browsers on CI can cause long running tests, use them on local where we can parallelize
    ...((process.env.CI || !process.env.E2E_ALL_BROWSERS) ? [] : [
      {
        name: 'firefox',
        use: {
          ...devices['Desktop Firefox'],
          locale: 'tr-TR',
          timezoneId: 'Europe/Istanbul',
        },
      },
      {
        name: 'webkit',
        use: {
          ...devices['Desktop Safari'],
          locale: 'tr-TR',
          timezoneId: 'Europe/Istanbul',
        },
      },
    ]),

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],
  // if we pass different base url, we need to start the server manually, npm scripts assumes the default url
  webServer: process.env.ADMIN_PANEL_E2E_BASE_URL ? undefined : {
    // on ci we serve the production minified/compiled build for maximum realistic testing
    // if you want to test production build on local, run `npm run build && npm run serve-build` first and then run the tests with `npm run test-e2e`
    command: process.env.CI ? 'npm run serve-build' : 'npm run start',
    url: DEFAULT_URL,
    // check if there is already a server serving on the port, if so, reuse it
    // useful when you already have dev server open
    reuseExistingServer: !process.env.CI,
  },
});
