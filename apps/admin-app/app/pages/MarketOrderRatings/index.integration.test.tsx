import '@test/publicUtils/configureWithoutCleanup';

import { cleanup } from '@testing-library/react';

import { ROUTE } from '@app/routes';
import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething } from '@test/publicUtils/assertions';
import renderPage from '@test/publicUtils/renderPage';
import PageComponent from '.';

describe('MarketOrderRatings', () => {
  afterAll(cleanup);

  describe('MarketOrderRatings Page', () => {
    it('should render page without error', async () => {
      const bulkFeeUploadPageUrl = ROUTE.GETIR_MARKET_ORDER_RATINGS.path;
      await renderPage({
        pagePermKey: permKey.PAGE_GETIR_MARKET_ORDER_RATINGS,
        pageUrl: bulkFeeUploadPageUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
  });
});
