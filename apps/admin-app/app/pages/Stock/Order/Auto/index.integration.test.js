import '@test/publicUtils/configureWithoutCleanup';
import { within, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import moment from 'moment';

import permKey from '@shared/shared/permKey.json';

import { waitPageToRenderSomething, expectToHavePageHeaderText } from '@test/publicUtils/assertions';
import renderPage from '@test/publicUtils/renderPage';
import PageComponent from '.';

export const mockedAuto = {
  PRODUCT: 'Product\\Store',
  BARCODE: 'Barcode',
  PARAM_ENABLED: 'Item Param Enabled',
  DEMAND_RANGE: 'Demand Range',
  MAIN_STOCK_DAY: 'Main Stock Day',
  MAIN_LEAD_DAY: 'Main Lead Day',
  STORE_STOCK_DAY: 'Store Stock Day',
  IGNORE_STOCK: 'Ignore Current Stock',
  STOCK_ORDER_DAY: 'Past Stock Order Day',
  STOCK_TRANSFER_DAY: 'Past Stock Transfer Day',
  DEMAND_MULTIPLIER: 'Demand Multiplier (%)',
};

const url = '/stock/order/auto';

const tableCellInDocument = (container, text) => {
  return Array.from(container).some(cell => within(cell).queryByText(text));
};

const checkInputsChange = async inputField => {
  userEvent.clear(inputField);
  userEvent.type(inputField, '20');
  await waitFor(() => {
    expect(inputField).toHaveValue('20');
  });
};

describe('Stock Order Auto Page', () => {
  it('should render stock order auto page without error', async () => {
    await renderPage({
      pagePermKey: permKey.PAGE_STOCK_ORDER_AUTO,
      pageUrl: url,
      pageComponent: PageComponent,
    });

    await waitPageToRenderSomething();
  });

  it('should render page header', async () => {
    expectToHavePageHeaderText('Auto Stock Order');
  });

  it('should render form inputs', () => {
    expect(screen.getByLabelText('Supplier')).toBeInTheDocument();
    expect(screen.getByLabelText('Demand Range')).toBeInTheDocument();
    expect(screen.getByLabelText('Main Stock Day')).toBeInTheDocument();
    expect(screen.getByLabelText('Main Lead Day')).toBeInTheDocument();
    expect(screen.getByLabelText('Store Stock Day')).toBeInTheDocument();
    expect(screen.getByLabelText('Ignore Current Stock')).toBeInTheDocument();
    expect(screen.getByLabelText('Past Stock Order Day')).toBeInTheDocument();
    expect(screen.getByLabelText('Past Stock Transfer Day')).toBeInTheDocument();
    expect(screen.getByLabelText('Demand Multiplier (%)')).toBeInTheDocument();
  });

  it('should render form inputs with true values', async () => {
    const ignoreCurrentStockField = screen.getByRole('checkbox', { name: 'Ignore Current Stock' });
    expect(ignoreCurrentStockField).not.toBeChecked();
    userEvent.click(ignoreCurrentStockField);
    await waitFor(() => {
      expect(ignoreCurrentStockField).toBeChecked();
    });

    const dateFormat = 'YYYY-MM-DD';

    const mainStockDayField = screen.getByLabelText('Main Stock Day');
    const mainLeadDayField = screen.getByLabelText('Main Lead Day');
    const storeStockDayField = screen.getByLabelText('Store Stock Day');
    const demandMultiplierField = screen.getByLabelText('Demand Multiplier (%)');
    const pastStockOrderDayField = screen.getByLabelText('Past Stock Order Day');
    const pastStockTransferDayField = screen.getByLabelText('Past Stock Transfer Day');

    expect(mainStockDayField).toHaveValue('14');
    expect(mainLeadDayField).toHaveValue('5');
    expect(storeStockDayField).toHaveValue('7');
    expect(demandMultiplierField).toHaveValue('7');
    expect(pastStockOrderDayField).toHaveValue(moment().subtract(7, 'days').startOf('day').format(dateFormat));
    expect(pastStockTransferDayField).toHaveValue(moment().subtract(7, 'days').startOf('day').format(dateFormat));
  });

  it('main stock day should work as expected', () => {
    const mainStockDayField = screen.getByLabelText('Main Stock Day');
    checkInputsChange(mainStockDayField);
  });

  it('main lead day should work as expected', () => {
    const mainLeadDayField = screen.getByLabelText('Main Lead Day');
    checkInputsChange(mainLeadDayField);
  });

  it('store stock day should work as expected', () => {
    const storeStockDayField = screen.getByLabelText('Store Stock Day');
    checkInputsChange(storeStockDayField);
  });

  it('demand multiplier should work as expected', () => {
    const demandMultiplierField = screen.getByLabelText('Demand Multiplier (%)');
    checkInputsChange(demandMultiplierField);
  });

  it('excel export buton should work as expected', async () => {
    const btnExcelExport = screen.getByRole('button', { name: 'Excel Export' });
    expect(btnExcelExport).toBeDisabled();
  });

  it('table inputs should works expected', () => {
    const table = screen.getByTestId('stock-order-auto-table');
    const noDataText = within(table).getByText('No Data');
    expect(table).toBeInTheDocument();
    expect(noDataText).toBeInTheDocument();
  });

  it('should render table columns header', async () => {
    // eslint-disable-next-line testing-library/no-node-access
    const tableCellContainer = document.querySelectorAll('.ant-table-cell');

    expect(tableCellInDocument(tableCellContainer, mockedAuto.PRODUCT)).toBeTruthy();
    expect(tableCellInDocument(tableCellContainer, mockedAuto.BARCODE)).toBeTruthy();
    expect(tableCellInDocument(tableCellContainer, mockedAuto.DEMAND_MULTIPLIER)).toBeTruthy();
    expect(tableCellInDocument(tableCellContainer, mockedAuto.DEMAND_RANGE)).toBeTruthy();
    expect(tableCellInDocument(tableCellContainer, mockedAuto.MAIN_LEAD_DAY)).toBeTruthy();
    expect(tableCellInDocument(tableCellContainer, mockedAuto.MAIN_STOCK_DAY)).toBeTruthy();
    expect(tableCellInDocument(tableCellContainer, mockedAuto.IGNORE_STOCK)).toBeTruthy();
    expect(tableCellInDocument(tableCellContainer, mockedAuto.PARAM_ENABLED)).toBeTruthy();
    expect(tableCellInDocument(tableCellContainer, mockedAuto.STOCK_ORDER_DAY)).toBeTruthy();
    expect(tableCellInDocument(tableCellContainer, mockedAuto.STOCK_TRANSFER_DAY)).toBeTruthy();
    expect(tableCellInDocument(tableCellContainer, mockedAuto.STORE_STOCK_DAY)).toBeTruthy();
  });
});
