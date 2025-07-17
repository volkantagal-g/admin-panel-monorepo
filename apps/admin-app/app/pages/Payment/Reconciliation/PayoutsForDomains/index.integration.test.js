import '@test/publicUtils/configureWithoutCleanup';
import { cleanup, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import { expectSelectDate, expectToHavePageHeaderText, waitPageToRenderSomething } from '@test/publicUtils/assertions';
import PageComponent from '.';
import { testDateRange } from '@shared/api/payoutsForDomains/index.mock.data';

const initialUrl = '/payment/reconciliation/payoutForDomains';

describe('In Payouts Domains Page:', () => {
  afterAll(cleanup);

  describe('For app level features', () => {
    it('should render without an error', async () => {
      await renderPage({
        pagePermKey: permKey.PAGE_PAYOUTS_FOR_DOMAINS,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
    it('should have correct page header', () => {
      expectToHavePageHeaderText('Payouts For Domains (Summary)');
    });
    it('should render domain tabs', () => {
      const main = screen.getByRole('main');
      within(main).getByText(/getirfood/i);
      within(main).getByText(/getirlocal/i);
      within(main).getByText(/tip/i);
    });
  });
  describe('Filter features', () => {
    const filterData = async () => {
      const startTime = testDateRange[0];
      const endTime = testDateRange[1];
      const submitButton = screen.getByRole('button', { name: /bring/i });
      const datePicker = screen.getByTestId('payouts-date-filter');
      await waitFor(() => {
        expect(datePicker).toBeEnabled();
      });

      const checkoutStartDatePicker = within(datePicker).getByPlaceholderText(/Start date/i);
      const checkoutEndDatePicker = within(datePicker).getByPlaceholderText(/End date/i);
      expectSelectDate(checkoutStartDatePicker, startTime);
      expectSelectDate(checkoutEndDatePicker, endTime);

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
      screen.getByText(/garanti/i);
      screen.getByText(/general/i);
      screen.getByText(/successful/i);
      screen.getByText(/in progress/i);
      const generalInfoBox = screen.getByTestId('payouts-general-info-box');
      within(generalInfoBox).getByText('Vertical');
      within(generalInfoBox).getByText('Country');
      within(generalInfoBox).getByText('Bank ICA');
      within(generalInfoBox).getByText('Total Count');
      within(generalInfoBox).getByText('Total Amount');
    });
  });
});
