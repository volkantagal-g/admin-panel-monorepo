import '@test/publicUtils/configureWithoutCleanup';

import { cleanup, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import renderComponent from '@test/publicUtils/renderComponent';

import {
  createSupplyLogisticInfoSelector,
  getSupplyLogisticInfoSelector,
  updateSupplyLogisticInfoSelector,
} from '@app/pages/MarketProduct/DetailV2/redux/selectors';
import { DemandAndStorageInfo } from '@app/pages/MarketProduct/DetailV2/components/SupplyAndLogisticInfo/components/DemandAndStorageInfo/index';

describe('Market Product/Detail/Supply And Logistic Info/ Demand and Storage Info', () => {
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

  describe('Demand and Storage Info', () => {
    it('should render component without error', async () => {
      await renderComponent({
        ui: (
          <DemandAndStorageInfo />
        ),
      });
    });
    it('should have correct form content', async () => {
      expect(screen.getByText('Demand Type')).toBeInTheDocument();
      expect(screen.getByText('Storage Type')).toBeInTheDocument();
      expect(screen.getByText('Refrigerator Temperature Range')).toBeInTheDocument();
    });
    it('should change disable/enable fields after click edit', async () => {
      const editButton = await screen.findByTestId('edit-button');
      userEvent.click(editButton);

      const demandSelect = screen.getByTestId('demandType');
      expect(demandSelect).toBeEnabled();
      userEvent.click(demandSelect);
      expect(demandSelect).toBeInTheDocument('Impulse');

      const storageSelect = screen.getByTestId('storageType');
      expect(storageSelect).toBeEnabled();
      userEvent.click(storageSelect);
      expect(storageSelect).toBeInTheDocument('Lockdown');

      const refrigeratorTemperatureSelect = screen.getByTestId('refrigeratorTemperature');
      expect(refrigeratorTemperatureSelect).toBeEnabled();
      userEvent.click(refrigeratorTemperatureSelect);
      expect(refrigeratorTemperatureSelect).toBeInTheDocument('-23/-18');

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
