import '@test/publicUtils/configureWithoutCleanup';
import { screen, waitFor, within } from '@testing-library/react';

import renderPage from '@test/publicUtils/renderPage';
import { waitPageToRenderSomething, expectToHavePageHeaderText, getAntTableBodies } from '@test/publicUtils/assertions';
import permKey from '@shared/shared/permKey.json';
import { mockedTransactions } from '@shared/api/payment/index.mock.data';
import PageComponent from '.';
import renderComponent from '@test/publicUtils/renderComponent';
import { Filter } from './components';
import { INIT_FILTERS } from './constants';
import { formatUTCDate } from '@shared/utils/dateHelper';
import { CUSTOM_DATE_FORMAT } from '../../constants';

const initialUrl = '/payment/transactions';

describe('In Transactions List Page:', () => {
  describe('For Page Listing', () => {
    it('should render without an error', async () => {
      await renderPage({
        pagePermKey: permKey.PAGE_PAYMENT_TRANSACTION_LIST,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
    it('should have correct page header text', () => {
      expectToHavePageHeaderText('Transactions');
    });
  });
  describe('For page features', () => {
    let transactionTable;
    it('should match mock data information in transaction table', async () => {
      let tables;

      await waitFor(() => {
        tables = getAntTableBodies();
        expect(tables.length).toBeTruthy();
      });

      [transactionTable] = tables;
      await within(transactionTable).findByText(mockedTransactions.data[0].transactionId);
      await within(transactionTable).findByText(mockedTransactions.data[0].data.events[0].status);
    });
    it('Filter area default values', async () => {
      await renderComponent({
        ui: (
          <Filter />
        ),
      });
      const createStartDatePicker = screen.getByPlaceholderText(/Start date/i);
      const createEndDatePicker = screen.getByPlaceholderText(/End date/i);

      expect(createStartDatePicker).toHaveValue(formatUTCDate(INIT_FILTERS.createdAt[0], CUSTOM_DATE_FORMAT));
      expect(createEndDatePicker).toHaveValue(formatUTCDate(INIT_FILTERS.createdAt[1], CUSTOM_DATE_FORMAT));
    });
  });
});
