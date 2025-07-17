import '@test/publicUtils/configureWithoutCleanup';

import { cleanup } from '@testing-library/react';

import { ROUTE } from '@app/routes';
import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething } from '@test/publicUtils/assertions';
import renderPage from '@test/publicUtils/renderPage';
import PageComponent from '.';

describe('FraudSuspicionOrders', () => {
  afterAll(cleanup);

  describe('FraudSuspicionOrders Page', () => {
    it('should render page without error', async () => {
      const fraudSuspicionOrdersUrl = ROUTE.GETIR_MARKET_FRAUD_SUSPICION_ORDERS.path;
      await renderPage({
        pagePermKey: permKey.PAGE_GETIR_MARKET_FRAUD_SUSPICION_ORDERS,
        pageUrl: fraudSuspicionOrdersUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
  });
});
