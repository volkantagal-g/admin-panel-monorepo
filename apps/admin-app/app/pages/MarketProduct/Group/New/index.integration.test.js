import '@test/publicUtils/configureWithoutCleanup';
import { cleanup } from '@testing-library/react';

import { ROUTE } from '@app/routes';
import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething } from '@test/publicUtils/assertions';
import renderPage from '@test/publicUtils/renderPage';
import PageComponent from '.';

describe('MarketProductGroupNew', () => {
  afterAll(cleanup);
  describe('MarketProductGroupNew Page', () => {
    it('should render page without error', async () => {
      const marketProductGroupNewPageUrl = ROUTE.MARKET_PRODUCT_GROUP_NEW.path;
      await renderPage({
        pagePermKey: permKey.PAGE_MARKET_PRODUCT_GROUP_NEW,
        pageUrl: marketProductGroupNewPageUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
  });
});
