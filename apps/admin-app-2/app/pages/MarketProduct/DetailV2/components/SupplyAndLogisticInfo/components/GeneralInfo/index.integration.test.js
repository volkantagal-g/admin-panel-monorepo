import '@test/publicUtils/configureWithoutCleanup';

import { cleanup, fireEvent, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import renderComponent from '@test/publicUtils/renderComponent';

import {
  createSupplyLogisticInfoSelector,
  getSupplyLogisticInfoSelector,
  updateSupplyLogisticInfoSelector,
} from '@app/pages/MarketProduct/DetailV2/redux/selectors';
import { GeneralInfo } from '@app/pages/MarketProduct/DetailV2/components/SupplyAndLogisticInfo/components/GeneralInfo/index';

describe('Market Product/Detail/Supply And Logistic Info/ General Info', () => {
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

  describe('General Info', () => {
    it('should render component without error', async () => {
      await renderComponent({
        ui: (
          <GeneralInfo />
        ),
      });
    });
    it('should have correct form content', async () => {
      expect(screen.getByText('Critical Amount (Store)')).toBeInTheDocument();
      expect(screen.getByText('Min Stock Amount')).toBeInTheDocument();
      expect(screen.getByText('Max Stock Amount')).toBeInTheDocument();
      expect(screen.getByText('Min Stock Day')).toBeInTheDocument();
      expect(screen.getByText('Max Stock Day')).toBeInTheDocument();
      expect(screen.getByText('Inventory Check Period')).toBeInTheDocument();
      expect(screen.getByText('Critical Stock Warning')).toBeInTheDocument();
      expect(screen.getByText('General Inventory Check')).toBeInTheDocument();
      expect(screen.getByText('Consumable Product')).toBeInTheDocument();
    });
    it('should change disable/enable fields after click edit', async () => {
      const editButton = await screen.findByTestId('edit-button');
      userEvent.click(editButton);

      const criticalStockStoreInput = screen.getByTestId('criticalStockStore');
      expect(criticalStockStoreInput).toBeEnabled();
      fireEvent.change(criticalStockStoreInput, { target: { value: 10 } });
      expect(criticalStockStoreInput).toHaveValue('10');
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
