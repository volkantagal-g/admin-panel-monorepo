import '@test/publicUtils/configureWithoutCleanup';
import { screen, waitFor, within } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething, waitForAntTableBodies } from '@test/publicUtils/assertions';
import PageComponent from '.';
import { mockedDetailsTipPaybackId, mockedDetailsTipPaybackSummaries, mockedFilterValuesForDetailsPage } from '@shared/api/tipPayback/index.mock.data';
import { INIT_FILTERS } from './constants';
import renderComponent from '@test/publicUtils/renderComponent';
import Filter from './components/Filter';

const initialUrl = `/tip/payback/payout-summary/detail/${mockedDetailsTipPaybackId}`;

describe('In Tip Payback - Payout Summary Detail Page:', () => {
  describe('For app level features', () => {
    it('should render without an error', async () => {
      await renderPage({
        pagePermKey: permKey.PAGE_TIP_PAYBACK_PAYOUT_SUMMARY_DETAILS,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
  });
  describe('Page features', () => {
    let detailsSummaryTable;
    it('should show tip payback summaries in reports table', async () => {
      const tables = await waitForAntTableBodies();
      [detailsSummaryTable] = tables;
      await within(detailsSummaryTable).findByText(mockedDetailsTipPaybackSummaries.content[0].id);
      await within(detailsSummaryTable).findByText(mockedDetailsTipPaybackSummaries.content[0].payoutSummary);
      await within(detailsSummaryTable).findByText(mockedDetailsTipPaybackSummaries.content[0].person);
      await within(detailsSummaryTable).findByText(mockedDetailsTipPaybackSummaries.content[0].personName);
    });
    it('should show tip payback summaries payment values in cards', async () => {
      const payoutTotalAmount = screen.getByTestId('payout-total-amount');
      const payoutTotalPaidAmount = screen.getByTestId('payout-total-paid-amount');
      const payoutUnpaidAmount = screen.getByTestId('payout-unpaid-amount');

      await within(payoutTotalAmount).findByText(`${mockedDetailsTipPaybackSummaries.totalAmount}₺`);
      await within(payoutTotalPaidAmount).findByText(`${mockedDetailsTipPaybackSummaries.totalPaidAmount}₺`);
      await within(payoutUnpaidAmount).findByText(`${mockedDetailsTipPaybackSummaries.totalUnpaidAmount}₺`);
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
      const personNameSearch = screen.getByPlaceholderText('Search by person name');
      const personIDSearch = screen.getByPlaceholderText('Search by Person ID');
      const identityNumberSearch = screen.getByPlaceholderText('Search by identity number');
      const payoutStatusSearch = screen.getByText('Search by payout status');
      const submitButton = screen.getByText('Bring');

      expect(personNameSearch).toBeInTheDocument();
      expect(personIDSearch).toBeInTheDocument();
      expect(identityNumberSearch).toBeInTheDocument();
      expect(payoutStatusSearch).toBeInTheDocument();

      userEvent.click(personNameSearch);
      userEvent.type(personNameSearch, 'Test Person');
      userEvent.click(personIDSearch);
      userEvent.type(personIDSearch, '123456789');
      userEvent.click(identityNumberSearch);
      userEvent.type(identityNumberSearch, '987654321');

      await waitFor(() => {
        expect(submitButton).toBeEnabled();
      });
      userEvent.click(submitButton);
      await waitFor(() => expect(handleSubmit).toHaveBeenCalledWith({ ...mockedFilterValuesForDetailsPage }));
    });
  });
});
