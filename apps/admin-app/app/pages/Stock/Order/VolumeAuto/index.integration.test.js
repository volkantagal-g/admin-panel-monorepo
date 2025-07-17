import '@test/publicUtils/configureWithoutCleanup';
import { within, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import permKey from '@shared/shared/permKey.json';

import { waitPageToRenderSomething, expectToHavePageHeaderText } from '@test/publicUtils/assertions';
import renderPage from '@test/publicUtils/renderPage';
import PageComponent from '.';

export const mockedVolumeAuto = {
  PRODUCT: 'Product\\Store',
  BARCODE: 'Barcode',
  DEMAND_MULTIPLIER: 'Demand Multiplier (%)',
  DEMAND_RANGE: 'Demand Range',
  MAX_BOX_COUNT: 'Maximum Box Count',
  MAX_COLI_COUNT_EXIST: 'Maximum Coli Count Exists',
  MAX_STOCK_DAY: 'Maximum Stock Day',
  PARAM_ENABLED: 'Item Param Enabled',
  STOCK_ORDER_DAY: 'Past Stock Order Day',
  STOCK_TRANSFER_DAY: 'Past Stock Transfer Day',
  STORE_TRANSFER_DAY: 'Store Transfer Day',
};

const url = '/stock/order/volumeAuto';

const tableCellInDocument = (container, text) => {
  return Array.from(container).some(cell => within(cell).queryByText(text));
};

describe('Stock Order Volume Auto Page', () => {
  it('should render stock order volume auto page without error', async () => {
    await renderPage({
      pagePermKey: permKey.PAGE_STOCK_ORDER_VOLUME_AUTO,
      pageUrl: url,
      pageComponent: PageComponent,
    });

    await waitPageToRenderSomething();
  });

  it('should render page header', async () => {
    expectToHavePageHeaderText('V. Auto Stock Order');
  });

  it('should render form inputs', async () => {
    expect(screen.getByLabelText('Supplier')).toBeInTheDocument();
    expect(screen.getByLabelText('Demand Range')).toBeInTheDocument();
    expect(screen.getByLabelText('Store Transfer Day')).toBeInTheDocument();
    expect(screen.getByLabelText('Maximum Stock Day')).toBeInTheDocument();
    expect(screen.getByLabelText('Maximum Coli Count Exists')).toBeInTheDocument();
    expect(screen.getByLabelText('Past Stock Order Day')).toBeInTheDocument();
    expect(screen.getByLabelText('Past Stock Transfer Day')).toBeInTheDocument();
    expect(screen.getByLabelText('Demand Multiplier (%)')).toBeInTheDocument();
    expect(screen.queryByLabelText('Maximum Box Count')).not.toBeInTheDocument();

    const maxColiCountExistInput = screen.getByRole('checkbox', { name: 'Maximum Coli Count Exists' });
    userEvent.click(maxColiCountExistInput);
    await waitFor(() => {
      expect(screen.getByLabelText('Maximum Box Count')).toBeInTheDocument();
    });
    userEvent.click(maxColiCountExistInput);
    await waitFor(() => {
      expect(screen.queryByLabelText('Maximum Box Count')).not.toBeInTheDocument();
    });
  });

  it('should render table columns header', async () => {
    // eslint-disable-next-line testing-library/no-node-access
    const tableCellContainer = document.querySelectorAll('.ant-table-cell');

    expect(tableCellInDocument(tableCellContainer, mockedVolumeAuto.PRODUCT)).toBeTruthy();
    expect(tableCellInDocument(tableCellContainer, mockedVolumeAuto.BARCODE)).toBeTruthy();
    expect(tableCellInDocument(tableCellContainer, mockedVolumeAuto.DEMAND_MULTIPLIER)).toBeTruthy();
    expect(tableCellInDocument(tableCellContainer, mockedVolumeAuto.DEMAND_RANGE)).toBeTruthy();
    expect(tableCellInDocument(tableCellContainer, mockedVolumeAuto.MAX_BOX_COUNT)).toBeTruthy();
    expect(tableCellInDocument(tableCellContainer, mockedVolumeAuto.MAX_COLI_COUNT_EXIST)).toBeTruthy();
    expect(tableCellInDocument(tableCellContainer, mockedVolumeAuto.MAX_STOCK_DAY)).toBeTruthy();
    expect(tableCellInDocument(tableCellContainer, mockedVolumeAuto.PARAM_ENABLED)).toBeTruthy();
    expect(tableCellInDocument(tableCellContainer, mockedVolumeAuto.STOCK_ORDER_DAY)).toBeTruthy();
    expect(tableCellInDocument(tableCellContainer, mockedVolumeAuto.STOCK_TRANSFER_DAY)).toBeTruthy();
    expect(tableCellInDocument(tableCellContainer, mockedVolumeAuto.STORE_TRANSFER_DAY)).toBeTruthy();
  });

  it('table inputs should works expected', () => {
    const table = screen.getByTestId('stock-order-volumeAuto-table');
    const noDataText = within(table).getByText('No Data');
    expect(table).toBeInTheDocument();
    expect(noDataText).toBeInTheDocument();
  });
});
