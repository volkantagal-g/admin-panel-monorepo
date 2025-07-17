import '@test/publicUtils/configureWithoutCleanup';

import { cleanup } from '@testing-library/react';

import { ROUTE } from '@app/routes';
import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething } from '@test/publicUtils/assertions';
import renderPage from '@test/publicUtils/renderPage';
import PageComponent from '.';

describe('Missing Products', () => {
  afterAll(cleanup);

  describe('Missing Products Page', () => {
    it('should render page without error', async () => {
      const missingProductsPageUrl = ROUTE.MISSING_PRODUCT_ORDERS.path;
      await renderPage({
        pagePermKey: permKey.PAGE_MISSING_PRODUCT_ORDERS,
        pageUrl: missingProductsPageUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
  });
});
