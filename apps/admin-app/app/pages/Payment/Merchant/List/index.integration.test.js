import '@test/publicUtils/configureWithoutCleanup';

import { within } from '@testing-library/react';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';

import { waitPageToRenderSomething, expectToHavePageHeaderText, waitForAntTableBodies } from '@test/publicUtils/assertions';
import { mockedMerchants } from '@shared/api/payment/index.mock.data';
import PageComponent from '.';

const initialUrl = '/payment/merchants';

describe('In Payments Merchants Page:', () => {
  describe('For Page Listing', () => {
    it('should render without an error', async () => {
      await renderPage({
        pagePermKey: permKey.PAGE_PAYMENT_MERCHANT_LIST,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
  });
  describe('Page features', () => {
    let merchantsTable;
    it('should have correct page header', () => {
      expectToHavePageHeaderText('Merchants');
    });
    it('should show merchant information in merchants table', async () => {
      const tables = await waitForAntTableBodies();
      [merchantsTable] = tables;
      await within(merchantsTable).findByText(mockedMerchants.data[0].id);
      await within(merchantsTable).findByText(mockedMerchants.data[0].key);
      await within(merchantsTable).findByText(mockedMerchants.data[0].settings.displayName);
    });
  });
});
