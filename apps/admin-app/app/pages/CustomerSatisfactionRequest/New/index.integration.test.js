import '@test/publicUtils/configureWithoutCleanup';
import { screen, cleanup } from '@testing-library/react';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething } from '@test/publicUtils/assertions';

import PageComponent from '.';

const initialUrl = '/stock/blockedStock/customerSatisfaction/new';

describe('In Customer Satisfaction Create Page:', () => {
  afterAll(cleanup);
  describe('For app level features', () => {
    it('should render without an error', async () => {
      await renderPage({
        pagePermKey: permKey.PAGE_CUSTOMER_SATISFACTION_REQUEST_NEW,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
    it('should have correct page content', async () => {
      expect(screen.getByText('Select Warehouse')).toBeInTheDocument();
      expect(screen.getByText('Search')).toBeInTheDocument();
    });
  });
});
