import '@test/publicUtils/configureWithoutCleanup';
import { cleanup } from '@testing-library/react';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething } from '@test/publicUtils/assertions';
import PageComponent from '.';

const initialUrl = '/employee/list';

describe('In EmployeeListPage Page:', () => {
  afterAll(cleanup);

  // let renderResult;
  describe('For app level features', () => {
    it('should render without an error', async () => {
      // renderResult = await renderPage({
      await renderPage({
        pagePermKey: permKey.PAGE_EMPLOYEE_LIST,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
  });
});
