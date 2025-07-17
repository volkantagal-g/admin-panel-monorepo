import '@test/publicUtils/configureWithoutCleanup';

import { screen, waitFor, within } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething, expectToHavePageHeaderText, waitForAntTableBodies } from '@test/publicUtils/assertions';
import PageComponent from '.';
import { mockedFailedTipPaybackId, mockedFailedTipPaybackSummaries, mockedFilterValuesForFailsPage } from '@shared/api/tipPayback/index.mock.data';
import renderComponent from '@test/publicUtils/renderComponent';
import Filter from './components/Filter';
import { INIT_FILTERS } from './constants';

const initialUrl = `/tip/payback/payout-summary/fail-reason/${mockedFailedTipPaybackId}`;

describe('In Tip Payback - Payout Summary Fail Reasons Page:', () => {
  describe('For app level features', () => {
    it('should render without an error', async () => {
      await renderPage({
        pagePermKey: permKey.PAGE_TIP_PAYBACK_PAYOUT_SUMMARY_FAIL_REASONS,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
    it('should have correct page header', () => {
      expectToHavePageHeaderText('Payout Fail Reasons');
    });
  });
  describe('Page features', () => {
    let failedSummaryTable;
    it('should show tip payback summaries in reports table', async () => {
      const tables = await waitForAntTableBodies();
      [failedSummaryTable] = tables;
      await within(failedSummaryTable).findByText(mockedFailedTipPaybackSummaries.content[0].id);
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
      const submitButton = screen.getByText('Bring');
      userEvent.click(submitButton);
      await waitFor(() => expect(handleSubmit).toHaveBeenCalledWith({ ...mockedFilterValuesForFailsPage }));
    });
  });
});
