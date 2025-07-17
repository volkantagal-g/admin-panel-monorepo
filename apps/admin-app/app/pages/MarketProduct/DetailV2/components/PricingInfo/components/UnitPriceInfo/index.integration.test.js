import '@test/publicUtils/configureWithoutCleanup';

import { cleanup, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import renderComponent from '@test/publicUtils/renderComponent';

import {
  getMarketProductAllPriceSelector,
  getMarketProductsPriceListSelector,
  updateMarketProductPricingSelector,
} from '@app/pages/MarketProduct/DetailV2/redux/selectors';
import { UnitPriceInfo } from '@app/pages/MarketProduct/DetailV2/components/PricingInfo/components/UnitPriceInfo/index';

describe('Market Product/Detail/Pricing Info/ Unit Price Info', () => {
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

    const getMarketProductPricePending = jest.spyOn(getMarketProductsPriceListSelector, 'getIsPending');
    const getMarketProductPriceData = jest.spyOn(getMarketProductsPriceListSelector, 'getData');
    getMarketProductPricePending.mockReturnValue(false);
    getMarketProductPriceData.mockReturnValue([]);
  });
  afterAll(cleanup);

  describe('Unit Price Info', () => {
    it('should render component without error', async () => {
      await renderComponent({
        ui: (
          <UnitPriceInfo />
        ),
      });
    });
    it('should have correct form content', async () => {
      expect(screen.getByText('Unit')).toBeInTheDocument();
      expect(screen.getByText('Unit Numeric Value')).toBeInTheDocument();
      expect(screen.getByText('Per Numeric Value')).toBeInTheDocument();
      expect(screen.getByText('Preview')).toBeInTheDocument();
    });
    it('should change disable/enable fields after click edit', async () => {
      const editButton = await screen.findByTestId('edit-button');
      userEvent.click(editButton);
      expect(screen.getByTestId('unit-select')).toBeEnabled();
      expect(screen.getByTestId('quantity')).toBeEnabled();
      expect(screen.getByTestId('perUnit')).toBeEnabled();
      expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
    });
  });
});
