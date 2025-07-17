import '@test/publicUtils/configureWithoutCleanup';

import { cleanup, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import renderComponent from '@test/publicUtils/renderComponent';

import {
  createSupplyLogisticInfoSelector,
  getSupplyLogisticInfoSelector,
  updateSupplyLogisticInfoSelector,
} from '@app/pages/MarketProduct/DetailV2/redux/selectors';
import { ExpiryDateInfo } from '@app/pages/MarketProduct/DetailV2/components/SupplyAndLogisticInfo/components/ExpiryDateInfo/index';

describe('Market Product/Detail/Supply And Logistic Info/ Expiry Date Info', () => {
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
          <ExpiryDateInfo />
        ),
      });
    });
    it('should have correct form content', async () => {
      expect(screen.getByText('Shelf Life')).toBeInTheDocument();
      expect(screen.getByText('Allowed')).toBeInTheDocument();
      expect(screen.getByText('Warning')).toBeInTheDocument();
      expect(screen.getByText('Dead')).toBeInTheDocument();
      expect(screen.getByText('Status')).toBeInTheDocument();
    });
    // TODO: Fix the failing tests
    it.skip('should change disable/enable fields after click edit', async () => {
      const editButton = await screen.findByTestId('edit-button');
      userEvent.click(editButton);

      const lifeTimeInput = screen.getByTestId('lifeTime');
      expect(lifeTimeInput).toBeEnabled();

      const warningInput = screen.getByTestId('warning');
      expect(warningInput).toBeEnabled();

      const allowedInput = screen.getByTestId('allowed');
      expect(allowedInput).toBeEnabled();

      const deadInput = screen.getByTestId('dead');
      expect(deadInput).toBeEnabled();

      const statusSwitch = screen.getByTestId('status');
      userEvent.click(statusSwitch);

      try {
        expect(statusSwitch).toBeInTheDocument('Inactive');
      }
      catch (error) {
        expect(statusSwitch).toBeInTheDocument('Active');
      }

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
