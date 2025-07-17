import '@test/publicUtils/configureWithoutCleanup';
import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething, expectToHavePageHeaderText, waitForAntTableBodies, waitForToastElementToAppear } from '@test/publicUtils/assertions';
import PageComponent from '.';
import { mockedFilterValuesForListingPage, mockedTipPaybackSummaries, testDateRange } from '@shared/api/tipPayback/index.mock.data';
import renderComponent from '@test/publicUtils/renderComponent';
import Filter from './components/Filter';
import { INIT_FILTERS } from './constants';

const initialUrl = '/tip/payback/payout-summary/list';

describe('In Tip Payback - Payout Summary Page:', () => {
  describe('For Page Listing', () => {
    it('should render without an error', async () => {
      await renderPage({
        pagePermKey: permKey.PAGE_TIP_PAYBACK_PAYOUT_SUMMARY_LIST,
        pageUrl: initialUrl,
        pageComponent: PageComponent,

      });
      await waitPageToRenderSomething();
    });
    it('should have correct page header', () => {
      expectToHavePageHeaderText('Payout Summary');
    });
    describe('Page features', () => {
      let summaryTable;
      it('should show tip payback summaries in reports table', async () => {
        const tables = await waitForAntTableBodies();
        [summaryTable] = tables;
        await within(summaryTable).findByText('Not Started');
        await within(summaryTable).findByText(mockedTipPaybackSummaries.content[0].id);
      });
      it('payout button should be disabled in NOT_STARTED status', async () => {
        const payoutButton = screen.getByRole('button', { name: /Payout/i });
        expect(payoutButton).toBeDisabled();
      });
      it('cancel button should be disabled in NOT_STARTED status', async () => {
        const cancelButton = screen.getByRole('button', { name: /Cancel/i });
        expect(cancelButton).toBeDisabled();
      });
      it('status update button should be disabled in NOT_STARTED status', async () => {
        const cancelButton = screen.getByRole('button', { name: /Status Update/i });
        expect(cancelButton).toBeDisabled();
      });
      it('send report button should be disabled in NOT_STARTED status', async () => {
        const cancelButton = screen.getByRole('button', { name: /Send Report/i });
        expect(cancelButton).toBeDisabled();
      });
      it('calculate modal', async () => {
        userEvent.click(screen.getByRole('button', { name: /Calculate/i }));
        expect(screen.getByText('Calculate Process')).toBeInTheDocument();
        const submitButton = screen.getByRole('button', { name: /OK/i });
        userEvent.click(submitButton);
        await waitForToastElementToAppear();
      });
    });
    describe('Filter features', () => {
      it('handleSubmit function', async () => {
        const handleSubmit = jest.fn();
        await renderComponent({
          ui: <Filter
            pagination={{
              currentPage: INIT_FILTERS.pageNo,
              rowsPerPage: INIT_FILTERS.pageSize,
            }}
            filters={INIT_FILTERS}
            handleSubmit={handleSubmit}
          />,
        });
        const startDate = testDateRange[0];
        const finishDate = testDateRange[1];
        const payoutSummaryDatePicker = screen.getByTestId('payout-summary-date');
        const submitButton = screen.getByText('Bring');

        await waitFor(() => {
          expect(payoutSummaryDatePicker).toBeEnabled();
        });
        const startDatePicker = within(payoutSummaryDatePicker).getByPlaceholderText(/Start date/i);
        const finishDatePicker = within(payoutSummaryDatePicker).getByPlaceholderText(/End date/i);

        userEvent.click(startDatePicker);
        userEvent.clear(startDatePicker);
        userEvent.type(startDatePicker, `${startDate}{enter}`);

        userEvent.click(finishDatePicker);
        userEvent.clear(finishDatePicker);
        userEvent.type(finishDatePicker, `${finishDate}{enter}`);

        expect(startDatePicker).toHaveValue(startDate);
        expect(finishDatePicker).toHaveValue(finishDate);

        await waitFor(() => {
          expect(submitButton).toBeEnabled();
        });
        userEvent.click(submitButton);
        await waitFor(() => expect(handleSubmit).toHaveBeenCalledWith({ ...mockedFilterValuesForListingPage }));
      });
    });
  });
});
