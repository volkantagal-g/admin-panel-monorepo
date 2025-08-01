# ADMIN PANEL FRONTEND E2E TESTS

## Technologies

- Playwright ([Playwright Docs](https://playwright.dev/docs/intro))

## How to run

- Install the dependencies. (Node.js 16+ is required)

  ```bash
    npm ci
  ```

- Playwright might ask for additional dependencies, this is needed once per machine. Run the commands when it is asked.

  ```bash
    # installing browsers
    npx playwright install
    # installing additional system dependencies (may not be needed)
    npx playwright install-deps
  ```

- Prepare credentials for the test user

  - Create an `auth.json` file in `./auth` directory, similar to `auth_example.json` file ( Copy some localStorage data from your browser's devtools in dev website)

  - Run the `generateAuth.mjs` script

    ```bash
      node ./e2e/auth/generateAuth.mjs
    ```

    to generate the `auth_*.json` files, playwright will use these files to login to the website

  - Remember that any change in `auth.json` file or `ADMIN_PANEL_E2E_BASE_URL` env change requires re-running the `generateAuth.mjs` script to be reflected in the tests.

  - Make sure you never commit those files, they are already in `.gitignore`, so only add secrets to those files that are ignored.

- You can either put the `ADMIN_PANEL_E2E_BASE_URL` env in .env file for existing live website or start local dev server.

  ```bash
    # start beforehand or let the test-e2e* commands start it
    npm start
    # put this in .env file and re-run e2e/auth/generateAuth.mjs
    ADMIN_PANEL_E2E_BASE_URL=<some_website_url>
  ```

- `npm run test-e2e` to run all tests.
- `npm run test-e2e -- 'pages/SomePage' 'pages/OtherPage'` to run a specific page/s test.
- `npm run test-e2e-headed` to run tests whit a browser window and shows the test steps running.
- `npm run test-e2e-ui` to open UI mode.
- `npm run test-e2e-record` to open an interactive mode browser to record live actions as test code. ( [Playwright Codegen](https://playwright.dev/docs/codegen-intro) )
- `npm run test-e2e -- 'myPageFolder/*'` to run tests in a specific folder.
- `npm run test-e2e -- 'myPageFolder/*' --repeat-each=3` to run tests 3 times (so that you can see if there are any flaky tests).

- If you are using VSCode, you can install the [Playwright Test](https://playwright.dev/docs/getting-started-vscode) extension to run tests from the editor

## How to write a test

- Create a new folder in `e2e/pages` folder for your team's page, make sure it's name is the same as the page's name in `app/pages` folder

- Create a page class in that folder, name it as `_page.ts` ( [PageObject Pattern](https://playwright.dev/docs/pom) )

- Create a fixture (named `_fixture.ts`) file under your page directory extending common fixture at `e2e/fixtures/Basic`. That common fixture includes login process, so you can start testing from your team's page, no login/country selection setup needed ( [Fixtures](https://playwright.dev/docs/test-fixtures) )

- Create a `<meaningful_name>.spec.ts` file under your page directory, import your page class and fixture, and write your tests. You don't need to put all your test cases into one file. Example: Warehouse List Page => filterWarehouses.spec.ts, tableSorting.spec.ts, bulkUploadFlow.spec.ts, etc.

- Use that fixture and that page object to interact with the page

- Page class should contain all the selectors and methods to interact with the page, no assertions should be done in the page class, assertions are done in the test files.

- Most of the setup and cleanup steps should be done in the fixture

- Every test() call should be independent from each other, meaning they should not depend on what happened before. ( [Test isolation](https://playwright.dev/docs/browser-contexts) )

- Use recommended locators for selecting dom elements ( [Locators](https://playwright.dev/docs/locators) )

- Write the UI code so you can target your elements with recommended locators, meaning write valid, semantic, accessible HTML. ([Semantic HTML](https://developer.mozilla.org/en-US/docs/Glossary/Semantics#semantics_in_html), [Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility) )

- Use the common locators and utilities in `e2e/common` folder

- Write the test cases as if a user is using the website.
