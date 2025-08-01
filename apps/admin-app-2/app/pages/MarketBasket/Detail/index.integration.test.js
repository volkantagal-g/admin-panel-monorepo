import '@test/publicUtils/configureWithoutCleanup';

import { cleanup } from '@testing-library/react';

import { ROUTE } from '@app/routes';
import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething } from '@test/publicUtils/assertions';
import renderPage from '@test/publicUtils/renderPage';
import PageComponent from '.';

describe('Market Basket', () => {
  afterAll(cleanup);

  describe('Market Basket Page', () => {
    it('should render page without error', async () => {
      const pageUrl = ROUTE.MARKET_BASKET_LIST.path;
      await renderPage({
        pagePermKey: permKey.PAGE_MARKET_BASKET_LIST,
        pageUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
  });
});
