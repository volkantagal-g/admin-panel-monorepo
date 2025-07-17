import '@test/publicUtils/configureWithoutCleanup';

import { cleanup, screen } from '@testing-library/react';

// import userEvent from '@testing-library/user-event';

import renderComponent from '@test/publicUtils/renderComponent';
import { getSuppliersSelector } from '@shared/redux/selectors/common';
import { getMarketProductAllPriceSelector, updateBuyingPriceFinancialsSelector } from '@app/pages/MarketProduct/DetailV2/redux/selectors';
import { Bonuses } from '@app/pages/MarketProduct/DetailV2/components/PricingInfo/components/Bonuses/index';

describe('Market Product/Detail/Pricing Info/Bonuses Component', () => {
  beforeAll(() => {
    const getMarketProductAllPricePending = jest.spyOn(getMarketProductAllPriceSelector, 'getIsPending');
    const getMarketProductAllPriceData = jest.spyOn(getMarketProductAllPriceSelector, 'getData');
    getMarketProductAllPricePending.mockReturnValue(false);
    getMarketProductAllPriceData.mockReturnValue([]);

    const getSuppliersPending = jest.spyOn(getSuppliersSelector, 'getIsPending');
    const getSuppliersData = jest.spyOn(getSuppliersSelector, 'getData');
    getSuppliersPending.mockReturnValue(false);
    getSuppliersData.mockReturnValue([{ _id: '1', name: 'Supplier 1' }]);

    const updateBuyingPriceFinancialsPending = jest.spyOn(updateBuyingPriceFinancialsSelector, 'getIsPending');
    const updateBuyingPriceFinancialsError = jest.spyOn(updateBuyingPriceFinancialsSelector, 'getError');
    const updateBuyingPriceFinancialsData = jest.spyOn(updateBuyingPriceFinancialsSelector, 'getData');
    updateBuyingPriceFinancialsPending.mockReturnValue(false);
    updateBuyingPriceFinancialsError.mockReturnValue(false);
    updateBuyingPriceFinancialsData.mockReturnValue([]);
  });
  afterAll(cleanup);

  describe('Bonuses', () => {
    it('should render component without error', async () => {
      await renderComponent({
        ui: (
          <Bonuses />
        ),
      });
    });
    it('should have correct form content', async () => {
      expect(screen.getByText('Supplier')).toBeInTheDocument();
      expect(screen.getByText('Type')).toBeInTheDocument();
      expect(screen.getByText('Amount')).toBeInTheDocument();
      expect(screen.getByText('Percent')).toBeInTheDocument();
    });
    // it('should change amount/percent fields after click radio button', async () => {
    //   const amountButton = await screen.findByRole('radio', { name: 'Amount' });
    //   userEvent.click(amountButton);
    //   expect(screen.queryByText('%')).not.toBeInTheDocument();

    //   const percentButton = await screen.findByRole('radio', { name: 'Percent' });
    //   userEvent.click(percentButton);
    //   expect(screen.getByText('%')).toBeInTheDocument();
    // });
    // it('should enable type field after select supplier', async () => {
    //   expect(screen.queryByText('Supplier 1')).not.toBeInTheDocument();
    //
    //   fireEvent.change(screen.getByTestId('supplier-test'), { target: { value: 1 } });
    //
    //   const options = screen.getAllByTestId('supplier-option');
    //
    //   expect(options[0].selected).toBeTruthy();
    //   expect(screen.getByTestId('type-test')).toBeEnabled();
    // });
  });
});
