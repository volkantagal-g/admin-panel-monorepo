import '@test/publicUtils/configureWithoutCleanup';

import { cleanup } from '@testing-library/react';

import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething } from '@test/publicUtils/assertions';
import renderPage from '@test/publicUtils/renderPage';
import PageComponent from '.';

describe('delivery fee bulk upload Page', () => {
  afterAll(cleanup);
  describe('delivery fee bulk upload Page', () => {
    it('should render page without error', async () => {
      const deliveryFeeBulkUploadPageUrl = '/deliveryFee/bulkUpload';
      await renderPage({
        pagePermKey: permKey.PAGE_DELIVERY_FEE_BULK_UPLOAD,
        pageUrl: deliveryFeeBulkUploadPageUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
  });
});
