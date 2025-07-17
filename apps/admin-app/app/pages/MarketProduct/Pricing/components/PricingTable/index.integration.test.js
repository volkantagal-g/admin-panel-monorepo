import '@test/publicUtils/configureWithoutCleanup';

import { cleanup } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';

import PricingTable from '@app/pages/MarketProduct/Pricing/components/PricingTable';
import { deletePriceSelector, getMarketProductsPriceListSelector } from '@app/pages/MarketProduct/Pricing/redux/selector';
import { getMarketProductsSelector, getWarehousesSelector } from '@shared/redux/selectors/common';

describe('Market Product/Detail/Pricing Info/Bonuses Component Table', () => {
  beforeAll(() => {
    const getMarketProductsPriceListPending = jest.spyOn(getMarketProductsPriceListSelector, 'getIsPending');
    const getMarketProductsPriceListData = jest.spyOn(getMarketProductsPriceListSelector, 'getData');
    getMarketProductsPriceListPending.mockReturnValue(false);
    getMarketProductsPriceListData.mockReturnValue([]);

    const getWarehousesPending = jest.spyOn(getWarehousesSelector, 'getIsPending');
    const getWarehousesData = jest.spyOn(getWarehousesSelector, 'getData');
    getWarehousesPending.mockReturnValue(false);
    getWarehousesData.mockReturnValue([]);

    const getMarketProductsPending = jest.spyOn(getMarketProductsSelector, 'getIsPending');
    const getMarketProductsData = jest.spyOn(getMarketProductsSelector, 'getData');
    getMarketProductsPending.mockReturnValue(false);
    getMarketProductsData.mockReturnValue([]);

    const deletePricePending = jest.spyOn(deletePriceSelector, 'getIsPending');
    const deletePriceData = jest.spyOn(deletePriceSelector, 'getData');
    deletePricePending.mockReturnValue(false);
    deletePriceData.mockReturnValue([]);
  });
  afterAll(cleanup);

  describe('SProductPriceList', () => {
    it('should render component without error', async () => {
      await renderComponent({
        ui: (
          <PricingTable />
        ),
      });
    });
  });
});
