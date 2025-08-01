import '@test/publicUtils/configureWithoutCleanup';

import { cleanup, screen } from '@testing-library/react';

// import userEvent from '@testing-library/user-event';

import renderComponent from '@test/publicUtils/renderComponent';
import {
  getMarketProductAllPriceSelector,
  updateMarketProductPricingSelector,
} from '@app/pages/MarketProduct/DetailV2/redux/selectors';
import { SellingPriceVat } from '@app/pages/MarketProduct/DetailV2/components/PricingInfo/components/SellingPriceFinancials/SellingPriceVat/index';
import { mockedMarketProductAllPrice } from '@shared/api/marketProductPrice/index.mock.data';

describe('Market Product/Detail/Pricing Info/Selling Price Financial/Selling Price VAT', () => {
  beforeAll(() => {
    const getMarketProductAllPricePending = jest.spyOn(getMarketProductAllPriceSelector, 'getIsPending');
    const getMarketProductAllPriceData = jest.spyOn(getMarketProductAllPriceSelector, 'getData');
    getMarketProductAllPricePending.mockReturnValue(false);
    getMarketProductAllPriceData.mockReturnValue(mockedMarketProductAllPrice);

    const updateMarketProductPricingPending = jest.spyOn(updateMarketProductPricingSelector, 'getIsPending');
    const updateMarketProductPricingError = jest.spyOn(updateMarketProductPricingSelector, 'getError');
    const updateMarketProductPricingData = jest.spyOn(updateMarketProductPricingSelector, 'getData');
    updateMarketProductPricingPending.mockReturnValue(false);
    updateMarketProductPricingError.mockReturnValue(false);
    updateMarketProductPricingData.mockReturnValue({});
  });
  afterAll(cleanup);

  describe('Selling Price VAT component', () => {
    it('should render component without error', async () => {
      await renderComponent({
        ui: (
          <SellingPriceVat />
        ),
      });
    });
    it('should have correct form content', async () => {
      expect(screen.getByText('VAT')).toBeInTheDocument();
    });
    // it('should change disable/enable fields after click edit', async () => {
    //   const editButton = await screen.findByTestId('edit-button');
    //   userEvent.click(editButton);
    //   expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
    //   expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
    // });
  });
});
