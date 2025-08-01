import '@test/publicUtils/configureWithoutCleanup';
import { cleanup } from '@testing-library/react';

import { ROUTE } from '@app/routes';
import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething } from '@test/publicUtils/assertions';
import renderPage from '@test/publicUtils/renderPage';
import PageComponent from '.';

describe('MarketProductCategoryNew', () => {
  afterAll(cleanup);
  describe('MarketProductCategoryNew Page', () => {
    it('should render page without error', async () => {
      const marketProductCategoryNewPageUrl = ROUTE.MARKET_PRODUCT_CATEGORY_NEW.path;
      await renderPage({
        pagePermKey: permKey.PAGE_MARKET_PRODUCT_CATEGORY_NEW,
        pageUrl: marketProductCategoryNewPageUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
  });
});
