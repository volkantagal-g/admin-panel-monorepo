import '@test/publicUtils/configureWithoutCleanup';
import { cleanup, screen, within } from '@testing-library/react';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething } from '@test/publicUtils/assertions';
import PageComponent from '.';

const initialUrl = '/payment/reconciliation/payoutTransactionsForDomains';

describe('In Payouts Transactions for Domains Page:', () => {
  afterAll(cleanup);

  describe('For app level features', () => {
    it('should render without an error', async () => {
      await renderPage({
        pagePermKey: permKey.PAGE_PAYOUTS_TRANSACTIONS_FOR_DOMAINS,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
    it('should render domain tabs', () => {
      const main = screen.getByRole('main');
      within(main).getByText(/getirfood/i);
      within(main).getByText(/getirlocal/i);
      within(main).getByText(/tip/i);
    });
  });
});
