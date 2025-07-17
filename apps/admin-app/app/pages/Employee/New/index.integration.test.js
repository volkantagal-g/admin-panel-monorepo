import '@test/publicUtils/configureWithoutCleanup';
import { cleanup } from '@testing-library/react';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething } from '@test/publicUtils/assertions';
import PageComponent from '.';

// TODO: add some more test cases

const initialUrl = '/employee/new';

describe('In EmployeeNew Page:', () => {
  afterAll(cleanup);

  // eslint-disable-next-line no-unused-vars
  let renderResult;
  describe('For app level features', () => {
    it('should render without an error', async () => {
      renderResult = await renderPage({
        pagePermKey: permKey.PAGE_EMPLOYEE_NEW,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
  });
});
