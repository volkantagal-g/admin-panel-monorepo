import '@test/publicUtils/configureWithoutCleanup';
import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import {
  waitPageToRenderSomething,
  expectToHavePageHeaderText, waitForAntTableBodies, waitForAntTableHeaderTables,
} from '@test/publicUtils/assertions';
import PageComponent from '.';
import { mockedDailyReport, mockedDailyReportFilterValues, testDateRange } from '@shared/api/reconciliation/index.mock.data';
import { DEFAULT_DATE_FORMAT } from '@shared/shared/constants';
import { formatDate } from '@shared/utils/dateHelper';
import { Filter } from './components';
import renderComponent from '@test/publicUtils/renderComponent';
import { INIT_FILTERS } from './constants';

const initialUrl = '/payment/reconciliation/dailyReport';

describe('In Daily Report Page:', () => {
  describe('For daily report list', () => {
    it('should render successfully ', async () => {
      await renderPage({
        pagePermKey: permKey.PAGE_RECONCILIATION_DAILY_REPORT,
        pageUrl: initialUrl,
        pageComponent: PageComponent,

      });

      await waitPageToRenderSomething();
    });
    it('should have correct page header', () => {
      expectToHavePageHeaderText('Pos Bank File Status');
    });
    it('should show correct info in table', async () => {
      const [dailyReportTableColumns] = await waitForAntTableHeaderTables();
      const [dailyReportTable] = await waitForAntTableBodies();

      const submitButton = screen.getByRole('button', { name: /bring/i });

      await within(dailyReportTableColumns).findByText('Pos Bank');
      await within(dailyReportTableColumns).findByText('Domain');
      await within(dailyReportTableColumns).findByText('Report Check Date');
      await within(dailyReportTableColumns).findByText('Status');
      await waitFor(() => {
        expect(submitButton).toBeEnabled();
      });
      userEvent.click(submitButton);

      await within(dailyReportTable).findByText(mockedDailyReport.data[0].source);
      await within(dailyReportTable).findByText(mockedDailyReport.data[0].statementDataStatus);
      await within(dailyReportTable).findByText(mockedDailyReport.data[0].domain);
      await within(dailyReportTable).findByText(formatDate(mockedDailyReport.data[0].checkDate, DEFAULT_DATE_FORMAT));
    });
    describe('Filter features', () => {
      it('handleSubmit function when refundable and checkout date', async () => {
        const handleSubmit = jest.fn();
        await renderComponent({
          ui: <Filter
            pagination={{
              currentPage: INIT_FILTERS.page,
              rowsPerPage: INIT_FILTERS.pageSize,
            }}
            filters={INIT_FILTERS}
            handleSubmit={handleSubmit}
          />,
        });
        const reportCheckStartDate = testDateRange[0];
        const reportCheckEndDate = testDateRange[1];
        const submitButton = screen.getByRole('button', { name: /bring/i });
        const reportCheckDatePicker = screen.getByTestId('report-check-date');

        await waitFor(() => {
          expect(reportCheckDatePicker).toBeEnabled();
        });

        const checkoutStartDatePicker = within(reportCheckDatePicker).getByPlaceholderText(/Start date/i);
        const checkoutEndDatePicker = within(reportCheckDatePicker).getByPlaceholderText(/End date/i);

        userEvent.click(checkoutStartDatePicker);
        userEvent.clear(checkoutStartDatePicker);
        userEvent.type(checkoutStartDatePicker, `${reportCheckStartDate}{enter}`);

        userEvent.click(checkoutEndDatePicker);
        userEvent.clear(checkoutEndDatePicker);
        userEvent.type(checkoutEndDatePicker, `${reportCheckEndDate}{enter}`);
        expect(checkoutStartDatePicker).toHaveValue(reportCheckStartDate);
        expect(checkoutEndDatePicker).toHaveValue(reportCheckEndDate);

        await waitFor(() => {
          expect(submitButton).toBeEnabled();
        });
        userEvent.click(submitButton);
        await waitFor(() => expect(handleSubmit).toHaveBeenCalledWith({ ...mockedDailyReportFilterValues }));
      });
    });
  });
});
