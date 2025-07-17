// TESTING_PRACTICE_EXAMPLE PAGE_INTEGRATION_TEST
import '@test/publicUtils/configureWithoutCleanup';
import { fireEvent, screen, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import permKey from '@shared/shared/permKey.json';

import { waitPageToRenderSomething, expectToHavePageHeaderText } from '@test/publicUtils/assertions';
import renderPage from '@test/publicUtils/renderPage';
import PageComponent from '.';

const url = '/stock/transfer/auto';

export const mockedTransferAuto = {
  PRODUCT: 'Product\\Store',
  BARCODE: 'Barcode',
  PARAM_ENABLED: 'Item Param Enabled',
  DEMAND_RANGE: 'Demand Range',
  STORE_TRANSFER_DAY: 'Store Transfer Day',
  MAX_STOCK_DAY: 'Maximum Stock Day',
  COLI_COUNT_EXIST: 'Maximum Coli Count Exists',
  MAX_BOX_COUNT: 'Maximum Box Count',
  STOCK_ORDER_DAY: 'Past Stock Order Day',
  STOCK_TRANSFER_DAY: 'Past Stock Transfer Day',
  DEMAND_MULTIPLIER: 'Demand Multiplier (%)',
};

const tableCellInDocument = (container, text) => {
  return Array.from(container).some(cell => within(cell).queryByText(text));
};

const getSelectionItemField = testId => {
  // eslint-disable-next-line testing-library/no-node-access
  return document.querySelector(`div[data-testid="${testId}"] .ant-select-selection-item`);
};

const getSelectListElement = (form, testId) => {
  // eslint-disable-next-line testing-library/no-node-access
  return within(form).getByTestId(testId).firstChild;
};

describe('Stock Transfer Auto Page', () => {
  it('should render stock order auto page without error', async () => {
    await renderPage({
      pagePermKey: permKey.PAGE_STOCK_TRANSFER_AUTO,
      pageUrl: url,
      pageComponent: PageComponent,
    });

    await waitPageToRenderSomething();
  });

  it('should render page header', async () => {
    expectToHavePageHeaderText('Auto Transfer');
  });

  it('should render form inputs', async () => {
    expect(screen.getByLabelText('Service Type')).toBeInTheDocument();
    expect(screen.getByLabelText('Main Store')).toBeInTheDocument();
    expect(screen.getByLabelText('Warehouse Types')).toBeInTheDocument();
    expect(screen.getByLabelText('Demand Range')).toBeInTheDocument();
    expect(screen.getByLabelText('Stock Day')).toBeInTheDocument();
    expect(screen.getByLabelText('Ignore Current Stock')).toBeInTheDocument();
    expect(screen.getByLabelText('Past Stock Order Day')).toBeInTheDocument();
    expect(screen.getByLabelText('Past Stock Transfer Day')).toBeInTheDocument();
    expect(screen.getByLabelText('Demand Multiplier (%)')).toBeInTheDocument();
  });

  it('should render collapse title', async () => {
    expect(screen.getByText('Category')).toBeInTheDocument();
    expect(screen.getByText('Regular Warehouse')).toBeInTheDocument();
  });

  it('should product table render as expected', async () => {
    const serviceTypeId = 'service-type';
    const form = screen.getByTestId('stock-transfer-auto-form');
    const serviceTypeSelect = getSelectListElement(form, serviceTypeId);

    const serviceTypeValue = getSelectionItemField(serviceTypeId);
    expect(serviceTypeValue).toHaveTextContent('Default');

    fireEvent.mouseDown(serviceTypeSelect);

    await waitFor(() => expect(screen.getByText('Direct Dispatch')));
    const options = screen.getByText('Direct Dispatch');
    userEvent.click(options);

    await waitFor(() => {
      expect(within(form).getByLabelText('Supplier'));
    });

    // eslint-disable-next-line testing-library/no-node-access
    const tableCellContainer = document.querySelectorAll('.ant-table-cell');

    expect(tableCellInDocument(tableCellContainer, mockedTransferAuto.PRODUCT)).toBeTruthy();
    expect(tableCellInDocument(tableCellContainer, mockedTransferAuto.BARCODE)).toBeTruthy();
    expect(tableCellInDocument(tableCellContainer, mockedTransferAuto.PARAM_ENABLED)).toBeTruthy();
    expect(tableCellInDocument(tableCellContainer, mockedTransferAuto.DEMAND_RANGE)).toBeTruthy();
    expect(tableCellInDocument(tableCellContainer, mockedTransferAuto.STORE_TRANSFER_DAY)).toBeTruthy();
    expect(tableCellInDocument(tableCellContainer, mockedTransferAuto.MAX_STOCK_DAY)).toBeTruthy();
    expect(tableCellInDocument(tableCellContainer, mockedTransferAuto.COLI_COUNT_EXIST)).toBeTruthy();
    expect(tableCellInDocument(tableCellContainer, mockedTransferAuto.MAX_BOX_COUNT)).toBeTruthy();
    expect(tableCellInDocument(tableCellContainer, mockedTransferAuto.STOCK_ORDER_DAY)).toBeTruthy();
    expect(tableCellInDocument(tableCellContainer, mockedTransferAuto.STOCK_TRANSFER_DAY)).toBeTruthy();
    expect(tableCellInDocument(tableCellContainer, mockedTransferAuto.DEMAND_MULTIPLIER)).toBeTruthy();
  });

  it('table inputs should works expected', () => {
    const table = screen.getByTestId('stock-transfer-auto-product-table');
    const noDataText = within(table).getByText('No Data');
    expect(table).toBeInTheDocument();
    expect(noDataText).toBeInTheDocument();
  });
});
