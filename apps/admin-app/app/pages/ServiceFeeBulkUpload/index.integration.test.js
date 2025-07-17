import '@test/publicUtils/configureWithoutCleanup';

import { cleanup } from '@testing-library/react';

import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething } from '@test/publicUtils/assertions';
import renderPage from '@test/publicUtils/renderPage';
import PageComponent from '.';

describe('Service Fee Bulk Upload', () => {
  afterAll(cleanup);

  describe('Service Fee Bulk Upload Page', () => {
    it('should render page without error', async () => {
      const serviceFeeBulkUploadPageUrl = '/serviceFee/bulkUpload';
      await renderPage({
        pagePermKey: permKey.PAGE_SERVICE_FEE_BULK_UPLOAD,
        pageUrl: serviceFeeBulkUploadPageUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
  });
});
