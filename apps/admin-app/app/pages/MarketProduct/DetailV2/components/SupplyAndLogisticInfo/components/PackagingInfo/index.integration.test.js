import '@test/publicUtils/configureWithoutCleanup';

import { cleanup, fireEvent, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import renderComponent from '@test/publicUtils/renderComponent';

import {
  createSupplyLogisticInfoSelector, getMarketProductAllPriceSelector,
  getSupplyLogisticInfoSelector,
  updateSupplyLogisticInfoSelector,
} from '@app/pages/MarketProduct/DetailV2/redux/selectors';
import { PackagingInfo } from '@app/pages/MarketProduct/DetailV2/components/SupplyAndLogisticInfo/components/PackagingInfo/index';

describe('Market Product/Detail/Supply And Logistic Info/Packaging Info', () => {
  beforeAll(() => {
    const updateSupplyLogisticInfoPending = jest.spyOn(updateSupplyLogisticInfoSelector, 'getIsPending');
    const updateSupplyLogisticInfoError = jest.spyOn(updateSupplyLogisticInfoSelector, 'getError');
    const updateSupplyLogisticInfoData = jest.spyOn(updateSupplyLogisticInfoSelector, 'getData');
    updateSupplyLogisticInfoPending.mockReturnValue(false);
    updateSupplyLogisticInfoError.mockReturnValue(false);
    updateSupplyLogisticInfoData.mockReturnValue([]);

    const createSupplyLogisticInfoPending = jest.spyOn(createSupplyLogisticInfoSelector, 'getIsPending');
    createSupplyLogisticInfoPending.mockReturnValue(false);

    const getSupplyLogisticInfoSPending = jest.spyOn(getSupplyLogisticInfoSelector, 'getIsPending');
    const getSupplyLogisticInfoSData = jest.spyOn(getSupplyLogisticInfoSelector, 'getData');
    getSupplyLogisticInfoSPending.mockReturnValue(false);
    getSupplyLogisticInfoSData.mockReturnValue([]);

    const getMarketProductAllPricePending = jest.spyOn(getMarketProductAllPriceSelector, 'getIsPending');
    const getMarketProductAllPriceData = jest.spyOn(getMarketProductAllPriceSelector, 'getData');
    getMarketProductAllPricePending.mockReturnValue(false);
    getMarketProductAllPriceData.mockReturnValue([{ barcodes: ['123456789'] }]);
  });
  afterAll(cleanup);

  describe('Packaging Info', () => {
    it('should render component without error', async () => {
      await renderComponent({
        ui: (
          <PackagingInfo />
        ),
      });
    });
    it('should have correct form content', async () => {
      expect(screen.getAllByText('Unit')).toHaveLength(3);
      expect(screen.getAllByText('Box')).toHaveLength(2);
      expect(screen.getAllByText('Palet')).toHaveLength(2);
    });
    it('should have 2 option in Unit Selection', async () => {
      const unitSelect = await screen.findByTestId('unit-type');
      expect(unitSelect).toBeEnabled();
      userEvent.click(unitSelect);
      expect(unitSelect).toBeInTheDocument('Metric');
      expect(unitSelect).toBeInTheDocument('İmperial');
    });
    it('should have 4 input for every column in a row', async () => {
      expect(screen.getAllByTestId('inboxQuantity-test')).toHaveLength(4);
      expect(screen.getAllByTestId('width-test')).toHaveLength(4);
      expect(screen.getAllByTestId('depth-test')).toHaveLength(4);
      expect(screen.getAllByTestId('height-test')).toHaveLength(4);
    });
    // TODO: fix this test and remove .skip
    it.skip('should change disable/enable fields after click edit', async () => {
      const editButton = await screen.findByTestId('edit-button');
      userEvent.click(editButton);
      expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();

      const inboxQuantityUnitInput = screen.getAllByTestId('inboxQuantity-test')[0];
      expect(inboxQuantityUnitInput).toBeEnabled();
      fireEvent.change(inboxQuantityUnitInput, { target: { value: 10 } });
      expect(inboxQuantityUnitInput).toHaveValue('10');
      expect(screen.getByRole('button', { name: 'Save' })).toBeEnabled();

      const cancelButton = await screen.findByTestId('cancel-button');
      userEvent.click(cancelButton);
      expect(screen.queryByRole('button', { name: 'Cancel' })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: 'Save' })).not.toBeInTheDocument();
      expect(screen.getByTestId('edit-button')).toBeInTheDocument();
    });
    // TODO: fix this test and remove .skip
    it.skip('should have barcode in unit column with same', async () => {
      const editButton = await screen.findByTestId('edit-button');
      userEvent.click(editButton);
      const barcodesUnitInput = screen.getByTestId('1-barcode-test');
      expect(barcodesUnitInput).toBeInTheDocument('123456789');
    });
  });
});
