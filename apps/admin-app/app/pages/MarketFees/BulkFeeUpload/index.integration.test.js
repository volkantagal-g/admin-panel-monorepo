import '@test/publicUtils/configureWithoutCleanup';

import { cleanup } from '@testing-library/react';

import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething } from '@test/publicUtils/assertions';
import renderPage from '@test/publicUtils/renderPage';
import PageComponent from '.';

describe('Fee Bulk Upload', () => {
  afterAll(cleanup);

  describe('Fee Bulk Upload Page', () => {
    it('should render page without error', async () => {
      const bulkFeeUploadPageUrl = '/marketFees/bulkUpload';
      await renderPage({
        pagePermKey: permKey.PAGE_MARKET_FEES_BULK_UPLOAD,
        pageUrl: bulkFeeUploadPageUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
  });
});
