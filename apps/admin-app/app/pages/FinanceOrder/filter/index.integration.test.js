import '@test/publicUtils/configureWithoutCleanup';
import { cleanup } from '@testing-library/react';

import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething } from '@test/publicUtils/assertions';
import renderPage from '@test/publicUtils/renderPage';
import PageComponent from '.';

const initialUrl = '/financeOrder/filter';

describe('In Finance Order Filter Page:', () => {
  afterAll(cleanup);

  describe('For app level features', () => {
    it('should render without an error', async () => {
      await renderPage({
        pagePermKey: permKey.PAGE_GETIR_FINANCE_ORDER_FILTER,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
  });
});
