import '@test/publicUtils/configureWithoutCleanup';
import { act, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import {
  waitPageToRenderSomething,
  expectToHavePageHeaderText, waitForAntTableBodies, waitForAntTableHeaderTables,
} from '@test/publicUtils/assertions';
import renderComponent from '@test/publicUtils/renderComponent';
import {
  mockedReconciliationReport,
  mockedReconciliationReportDetailItems, testDateRange, mockedTransactionReconciliationReport, transactionReconciliationReportId,
} from '@shared/api/reconciliation/index.mock.data';
import { formatUTCDate } from '@shared/utils/dateHelper';
import PageComponent from '.';
import RefundModal from './components/OrderTab/components/Table/components/RefundModal';
import DetailModal from './components/OrderTab/components/Table/components/DetailModal';
import Filter from './components/OrderTab/components/Filter';
import TransactionTabFilter from './components/TransactionTab/components/Filter';
import { DEFAULT_TIME_FORMAT } from '@shared/shared/constants';
import { selectedRowsSelector } from './redux/selectors';

const initialUrl = '/payment/reconciliation/reconciliationReport';

describe('In Bank Reconciliation Report Page:', () => {
  let renderResult;
  describe('For reconciliation list', () => {
    it('should render successfully ', async () => {
      renderResult = await renderPage({
        pagePermKey: permKey.PAGE_BANK_RECONCILIATION_REPORT,
        pageUrl: initialUrl,
        pageComponent: PageComponent,

      });

      await waitPageToRenderSomething();
    });
    it('should have correct page header', () => {
      expectToHavePageHeaderText('Bank Reconciliation Report');
    });
    it('should render tabs', () => {
      const tabList = screen.getByRole('tablist');
      const transactionTab = screen.getByRole('tab', { name: /transaction/i });
      const orderTab = screen.getByRole('tab', { name: /order/i });
      expect(tabList).toBeInTheDocument();
      expect(transactionTab).toBeInTheDocument();
      expect(orderTab).toBeInTheDocument();
    });
  });
  describe('Page features', () => {
    let transactionReportsTableColumns;
    let transactionReportsTable;
    describe('Transaction Tab pane features', () => {
      it('should render tabs component', () => {
        const tabList = screen.getByRole('tablist');
        const transactionTab = screen.getByRole('tab', { name: /transaction/i });
        const orderTab = screen.getByRole('tab', { name: /order/i });
        expect(tabList).toBeInTheDocument();
        expect(transactionTab).toBeInTheDocument();
        expect(orderTab).toBeInTheDocument();
        userEvent.click(transactionTab);
      });
      it('all page components should render', async () => {
        const reconciliationFilters = screen.getByTestId('transaction-reconciliation-filter');
        const reconciliationTable = screen.getByTestId('transaction-reconciliation-table');
        expect(reconciliationFilters).toBeInTheDocument();
        expect(reconciliationTable).toBeInTheDocument();
      });
      it('should show correct info in table', async () => {
        [, transactionReportsTableColumns] = await waitForAntTableHeaderTables();
        [, transactionReportsTable] = await waitForAntTableBodies();

        const submitButton = screen.getByTestId('transaction-filter-button');

        await within(transactionReportsTableColumns).findByText('Rent ID');
        await within(transactionReportsTableColumns).findByText('Transaction ID');
        await within(transactionReportsTableColumns).findByText('Transaction Type');
        await within(transactionReportsTableColumns).findByText('Bank Amount');
        await within(transactionReportsTableColumns).findByText('Domain Amount');
        await within(transactionReportsTableColumns).findByText('Transaction Date');
        await within(transactionReportsTableColumns).findByText('Reconciliation Date');
        await within(transactionReportsTableColumns).findByText('Pos Bank');
        await within(transactionReportsTableColumns).findByText('Payment Method');
        await waitFor(() => {
          expect(submitButton).toBeEnabled();
        });
        userEvent.click(submitButton);

        await within(transactionReportsTable).findByText(mockedTransactionReconciliationReport.data[0].rentId);
        await within(transactionReportsTable).findByText(mockedTransactionReconciliationReport.data[0].originalTransactionId);
        await within(transactionReportsTable).findByText(mockedTransactionReconciliationReport.data[0].refundAmountFromSource);
        await within(transactionReportsTable).findByText(mockedTransactionReconciliationReport.data[0].refundAmountFromDomain);
        await within(transactionReportsTable).findByText(formatUTCDate(mockedTransactionReconciliationReport.data[0].transactionDate, DEFAULT_TIME_FORMAT));
        await within(transactionReportsTable).findByText(formatUTCDate(mockedTransactionReconciliationReport.data[0].checkDate, DEFAULT_TIME_FORMAT));
        await within(transactionReportsTable).findByText(mockedTransactionReconciliationReport.data[0].sourceOfStatement);
        await within(transactionReportsTable).findByText(mockedTransactionReconciliationReport.data[0].paymentMethod);
      });
    });
    describe('Order Tab pane features', () => {
      let reportsTableColumns;
      let reportsTable;
      it('should show correct info in table', async () => {
        [reportsTableColumns] = await waitForAntTableHeaderTables();
        [reportsTable] = await waitForAntTableBodies();
        const submitButton = screen.getByTestId('order-filter-button');

        await within(reportsTableColumns).findByText('Order ID');
        await within(reportsTableColumns).findByText('Basket ID');
        await within(reportsTableColumns).findByText('Transaction ID');
        await within(reportsTableColumns).findByText('Domain');
        await within(reportsTableColumns).findByText('DOMAIN');
        await within(reportsTableColumns).findByText('GETIRMONEY');
        await within(reportsTableColumns).findByText('BANK');

        await waitFor(() => {
          expect(submitButton).toBeEnabled();
        });
        userEvent.click(submitButton);
        await within(reportsTable).findByText(mockedReconciliationReport.reconciliations[0].orderId);
        await within(reportsTable).findByText(formatUTCDate(mockedReconciliationReport.reconciliations[0].checkoutDate, DEFAULT_TIME_FORMAT));
        await within(reportsTable).findByText(formatUTCDate(mockedReconciliationReport.reconciliations[0].checkDate, DEFAULT_TIME_FORMAT));
        await within(reportsTable).findByText(mockedReconciliationReport.reconciliations[0].domainType);
        await within(reportsTable).findByText(mockedReconciliationReport.reconciliations[0].paymentMethod);
        await within(reportsTable).findByText(mockedReconciliationReport.reconciliations[0].status);
      });
      it('export button should be visible if the user has permission', async () => {
        act(() => {
          renderResult.addUserPermissions(
            [permKey.PAGE_BANK_RECONCILIATION_REPORT_COMPONENT_EXCEL_BUTTON],
          );
        });
        await waitFor(() => {
          const excelExportButton = within(renderResult.container).queryByText('Export Csv');
          expect(excelExportButton).toBeInTheDocument();
        });
      });
      it('export action', async () => {
        within(renderResult.container).queryByText('Export Csv');
        // TODO: it didn't reach to saga so that below function not worked
        /* await waitForToastElementToAppear(); */
      });
      it('refund button should be visible if the user has permission', async () => {
        act(() => {
          renderResult.addUserPermissions(
            [permKey.PAGE_BANK_RECONCILIATION_REPORT_COMPONENT_REFUND_BUTTON],
          );
        });
        await waitFor(() => {
          const refundButton = screen.getByTestId('reconciliation-refund-button');
          expect(refundButton).toBeInTheDocument();
        });
      });
      describe('Refund feature', () => {
        it('refund button component', async () => {
          const { addUserPermissions } = renderResult;
          act(() => {
            addUserPermissions([permKey.PAGE_BANK_RECONCILIATION_REPORT_COMPONENT_REFUND_BUTTON]);
          });

          const submitButton = screen.getByTestId('order-filter-button');
          await waitFor(() => {
            expect(submitButton).toBeEnabled();
          });
          userEvent.click(submitButton);

          const refundButton = screen.getByTestId('reconciliation-refund-button');

          const spySelectedOrderIds = jest.spyOn(selectedRowsSelector, 'getSelectedOrderIds');
          spySelectedOrderIds.mockReturnValue(mockedReconciliationReport.reconciliations[0].orderId);
          await waitFor(() => {
            expect(refundButton).toBeEnabled();
          });
        });
        it('refund modal component', async () => {
          const setModalVisible = jest.fn();
          const { addUserPermissions } = await renderComponent({
            ui: <RefundModal
              setModalVisible={setModalVisible}
              isModalVisible
            />,
          });
          addUserPermissions([permKey.PAGE_BANK_RECONCILIATION_REPORT_COMPONENT_REFUND_BUTTON]);
          const okButton = screen.getByText('OK');
          const cancelButton = screen.getByText('Cancel');

          expect(okButton).toBeEnabled();
          expect(cancelButton).toBeEnabled();

          userEvent.click(okButton);
          // TODO: it didn't reach to saga so that below function not worked
          /* await waitForToastElementToAppear(); */
        });
      });
      describe('Filter features', () => {
        it('handleSubmit function when refundable and checkout date', async () => {
          await renderComponent({ ui: <Filter /> });
          const reconciliationCheckStartDate = testDateRange[0];
          const reconciliationCheckEndDate = testDateRange[1];
          const submitButton = screen.getByRole('button', { name: /bring/i });
          const reconciliationCheckDatePicker = screen.getByTestId('reconciliation-check-date');

          await waitFor(() => {
            expect(reconciliationCheckDatePicker).toBeEnabled();
          });

          const checkoutStartDatePicker = within(reconciliationCheckDatePicker).getByPlaceholderText(/Start date/i);
          const checkoutEndDatePicker = within(reconciliationCheckDatePicker).getByPlaceholderText(/End date/i);

          userEvent.click(checkoutStartDatePicker);
          userEvent.type(checkoutStartDatePicker, `${reconciliationCheckStartDate}{enter}`);

          userEvent.click(checkoutEndDatePicker);
          userEvent.type(checkoutEndDatePicker, `${reconciliationCheckEndDate}{enter}`);
          expect(checkoutStartDatePicker).toHaveValue(reconciliationCheckStartDate);
          expect(checkoutEndDatePicker).toHaveValue(reconciliationCheckEndDate);

          await waitFor(() => {
            expect(submitButton).toBeEnabled();
          });
          userEvent.click(submitButton);
          /* await waitFor(() => expect(handleSubmit).toHaveBeenCalledWith({ ...mockedFilterValues })); */
        });
      });
      describe('DetailModal Component', () => {
        it('should render component without error', async () => {
          const setModalVisible = jest.fn();
          const spySelectedRows = jest.spyOn(selectedRowsSelector, 'getSelectedRows');
          spySelectedRows.mockReturnValue(mockedReconciliationReportDetailItems);
          const { addUserPermissions } = await renderComponent({
            ui: <DetailModal
              isModalVisible
              setModalVisible={setModalVisible}
            />,
          });
          addUserPermissions([permKey.PAGE_BANK_RECONCILIATION_REPORT_COMPONENT_RECONCILIATION_DETAIL_BUTTON]);
          await screen.findByText('General Info');
          await screen.findByText('Reconciliation Response');
          await screen.findByText('Transactions');
          await screen.findByText('Refund Response Detail');
          const orderId = screen.getByTestId('general-info-order-id');
          expect(orderId).toHaveTextContent(mockedReconciliationReportDetailItems[0].orderId);
        });
      });
      describe('TransactionTabFilter features', () => {
        it('handleSubmit function with rent id', async () => {
          await renderComponent({ ui: <TransactionTabFilter /> });
          const submitButton = screen.getByTestId('transaction-filter-button');
          const rentIdSearchInput = screen.getByPlaceholderText('Search by rent ID');
          userEvent.click(rentIdSearchInput);
          userEvent.type(rentIdSearchInput, transactionReconciliationReportId);
          await waitFor(() => {
            expect(submitButton).toBeEnabled();
          });
          userEvent.click(submitButton);
          /* await waitFor(() => expect(handleSubmit).toHaveBeenCalledWith({ ...mockedTransactionFilterValues })); */
        });
      });
    });
  });
});
