import '@test/publicUtils/configureWithoutCleanup';
import { cleanup, screen, waitFor, within } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import {
  expectToHavePageHeaderText,
  waitPageToRenderSomething,
} from '@test/publicUtils/assertions';
import PageComponent from '.';
import { bankReconciliationSummaryDate } from '@shared/api/reconciliation/index.mock.data';

const initialUrl = '/payment/reconciliation/bankReconciliationSummary';

describe('In BankReconciliationSummary Page:', () => {
  afterAll(cleanup);

  describe('For app level features', () => {
    it('should render without an error', async () => {
      await renderPage({
        pagePermKey: permKey.PAGE_BANK_RECONCILIATION_SUMMARY,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
    it('should have correct page header', () => {
      expectToHavePageHeaderText('Bank Reconciliation (Summary)');
    });
  });
  describe('Filter features', () => {
    const filterData = async () => {
      const startTime = bankReconciliationSummaryDate[0];
      const endTime = bankReconciliationSummaryDate[1];
      const submitButton = screen.getByRole('button', { name: /bring/i });
      const datePicker = screen.getByTestId(
        'bank-reconciliation-summary-datepicker',
      );
      await waitFor(() => {
        expect(datePicker).toBeEnabled();
      });

      const startDatePicker =
        within(datePicker).getByPlaceholderText(/Start date/i);
      const endDatePicker =
        within(datePicker).getByPlaceholderText(/End date/i);
      userEvent.click(startDatePicker);
      userEvent.type(startDatePicker, `${startTime}{enter}`);

      userEvent.click(endDatePicker);
      userEvent.type(endDatePicker, `${endTime}{enter}`);
      expect(startDatePicker).toHaveValue(startTime);
      expect(endDatePicker).toHaveValue(endTime);

      await waitFor(() => {
        expect(submitButton).toBeEnabled();
      });
      userEvent.click(submitButton);
      await waitFor(() => {
        expect(submitButton).toBeEnabled();
      });
    };
    it('should show correct data', async () => {
      await filterData();

      expect(screen.getByText('GetirTest')).toBeInTheDocument();
    });
  });
});
