import '@test/publicUtils/configureWithoutCleanup';

import { cleanup } from '@testing-library/react';

import { ROUTE } from '@app/routes';
import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething } from '@test/publicUtils/assertions';
import renderPage from '@test/publicUtils/renderPage';
import PageComponent from '.';

describe('Fee Details', () => {
  afterAll(cleanup);

  describe('Fee Details Page', () => {
    it('should render page without error', async () => {
      const bulkFeeUploadPageUrl = ROUTE.MARKET_FEES_DETAILS.path;
      await renderPage({
        pagePermKey: permKey.PAGE_MARKET_FEES_DETAILS,
        pageUrl: bulkFeeUploadPageUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
  });
});
