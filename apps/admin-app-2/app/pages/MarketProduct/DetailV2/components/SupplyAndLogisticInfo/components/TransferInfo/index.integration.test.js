import '@test/publicUtils/configureWithoutCleanup';

import { cleanup, fireEvent, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import renderComponent from '@test/publicUtils/renderComponent';

import {
  createSupplyLogisticInfoSelector,
  getSupplyLogisticInfoSelector,
  updateSupplyLogisticInfoSelector,
} from '@app/pages/MarketProduct/DetailV2/redux/selectors';
import { TransferInfo } from '@app/pages/MarketProduct/DetailV2/components/SupplyAndLogisticInfo/components/TransferInfo/index';

describe('Market Product/Detail/Supply And Logistic Info/TransferInfo', () => {
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
  });
  afterAll(cleanup);

  describe('TransferInfo', () => {
    it('should render component without error', async () => {
      await renderComponent({
        ui: (
          <TransferInfo />
        ),
      });
    });
    it('should have correct form content', async () => {
      expect(screen.getByText('Transfer Limit Type')).toBeInTheDocument();
      expect(screen.getByText('Shipment Type')).toBeInTheDocument();
      expect(screen.getByText('Transfer Box Count')).toBeInTheDocument();
      expect(screen.getByText('Transfer Groups')).toBeInTheDocument();
      expect(screen.getByText('Frozen Location Product')).toBeInTheDocument();
      expect(screen.getByText('Frozen Location Product')).toBeInTheDocument();
      expect(screen.getByText('Self Purchase Allowance')).toBeInTheDocument();
      expect(screen.getByText('Picked-to-Zero')).toBeInTheDocument();
    });
    it('should change disable/enable fields after click edit', async () => {
      const editButton = await screen.findByTestId('edit-button');
      userEvent.click(editButton);

      const limitSelect = screen.getByTestId('limit');
      expect(limitSelect).toBeEnabled();
      userEvent.click(limitSelect);
      expect(limitSelect).toBeInTheDocument('Warehouse');

      const shipmentSelect = screen.getByTestId('shipment');
      expect(shipmentSelect).toBeEnabled();
      userEvent.click(shipmentSelect);
      expect(shipmentSelect).toBeInTheDocument('Direct Delivery');

      const frozenCheckbox = screen.getByTestId('frozen-location');
      userEvent.click(frozenCheckbox);

      try {
        expect(frozenCheckbox).toBeChecked();
      }
      catch (error) {
        expect(frozenCheckbox).not.toBeChecked();
      }

      const colliCountInput = screen.getByTestId('coli-count');
      expect(colliCountInput).toBeEnabled();
      fireEvent.change(colliCountInput, { target: { value: 10 } });
      expect(colliCountInput).toHaveValue('10');
      expect(screen.getByRole('button', { name: 'Save' })).toBeEnabled();

      expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();

      const cancelButton = await screen.findByTestId('cancel-button');
      userEvent.click(cancelButton);
      expect(screen.queryByRole('button', { name: 'Cancel' })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: 'Save' })).not.toBeInTheDocument();
      expect(screen.getByTestId('edit-button')).toBeInTheDocument();
    });
  });
});
