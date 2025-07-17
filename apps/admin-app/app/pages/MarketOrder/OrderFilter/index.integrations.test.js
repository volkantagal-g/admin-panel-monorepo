import '@test/publicUtils/configureWithoutCleanup';

import { cleanup } from '@testing-library/react';

import { ROUTE } from '@app/routes';
import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething } from '@test/publicUtils/assertions';
import renderPage from '@test/publicUtils/renderPage';
import PageComponent from '.';

describe('Order Filter', () => {
  afterAll(cleanup);

  describe('Order Filter Page', () => {
    it('should render page without error', async () => {
      const orderFilterPageUrl = ROUTE.GETIR_MARKET_ORDER_FILTER.path;
      await renderPage({
        pagePermKey: permKey.PAGE_GETIR_MARKET_ORDER_FILTER,
        pageUrl: orderFilterPageUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
  });
});
