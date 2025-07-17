import '@test/publicUtils/configureWithoutCleanup';

import { cleanup, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import renderComponent from '@test/publicUtils/renderComponent';

import { getMarketProductAllPriceSelector, updateMarketProductPricingSelector } from '@app/pages/MarketProduct/DetailV2/redux/selectors';
import { getSuppliersSelector } from '@shared/redux/selectors/common';
import { Manufacturer } from '@app/pages/MarketProduct/DetailV2/components/PricingInfo/components/Manufacturer/index';

describe('Market Product/Detail/Pricing Info/Manufacturer', () => {
  beforeAll(() => {
    const getMarketProductAllPricePending = jest.spyOn(getMarketProductAllPriceSelector, 'getIsPending');
    const getMarketProductAllPriceData = jest.spyOn(getMarketProductAllPriceSelector, 'getData');
    getMarketProductAllPricePending.mockReturnValue(false);
    getMarketProductAllPriceData.mockReturnValue([]);

    const updateMarketProductPricingPending = jest.spyOn(updateMarketProductPricingSelector, 'getIsPending');
    const updateMarketProductPricingError = jest.spyOn(updateMarketProductPricingSelector, 'getError');
    const updateMarketProductPricingData = jest.spyOn(updateMarketProductPricingSelector, 'getData');
    updateMarketProductPricingPending.mockReturnValue(false);
    updateMarketProductPricingError.mockReturnValue(false);
    updateMarketProductPricingData.mockReturnValue({});

    const getSuppliersPending = jest.spyOn(getSuppliersSelector, 'getIsPending');
    const getSuppliersData = jest.spyOn(getSuppliersSelector, 'getData');
    getSuppliersPending.mockReturnValue(false);
    getSuppliersData.mockReturnValue([]);
  });
  afterAll(cleanup);

  describe('Unit Price Info', () => {
    it('should render component without error', async () => {
      await renderComponent({
        ui: (
          <Manufacturer />
        ),
      });
    });
    it('should have correct form content', async () => {
      expect(screen.getByText('Manufacturer')).toBeInTheDocument();
    });
    // TODO: Fix the failing tests
    it.skip('should change disable/enable fields after click edit', async () => {
      const editButton = await screen.findByTestId('edit-button');
      userEvent.click(editButton);
      expect(screen.getByTestId('manufacturer')).toBeEnabled();
      expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
    });
  });
});
