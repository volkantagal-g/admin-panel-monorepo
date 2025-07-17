import '@test/publicUtils/configureWithoutCleanup';
import { cleanup } from '@testing-library/react';

import { ROUTE } from '@app/routes';
import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething } from '@test/publicUtils/assertions';
import renderPage from '@test/publicUtils/renderPage';
import PageComponent from '.';

describe('Basket Configs Details', () => {
  afterAll(cleanup);
  describe('Basket Amounts Details Page', () => {
    it('should render page without error', async () => {
      const bulkFeeUploadPageUrl = ROUTE.GETIR_MARKET_BASKET_CONFIG_DETAILS.path;
      await renderPage({
        pagePermKey: permKey.PAGE_GETIR_MARKET_BASKET_CONFIG_DETAILS,
        pageUrl: bulkFeeUploadPageUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
  });
});
