import '@test/publicUtils/configureWithoutCleanup';

import { cleanup } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import { FormItems } from '@app/pages/MarketProduct/DetailV2/components/PricingInfo/components/BuyingPriceFinancials/components/FormItems/index';
import {
  getMarketProductAllPriceSelector,
  getMarketProductByIdSelector,
} from '@app/pages/MarketProduct/DetailV2/redux/selectors';

describe('Market Product/DetailV2/Pricing Info/Buying Price Financial/FormItems', () => {
  beforeAll(() => {
    const getMarketProductAllPricePending = jest.spyOn(getMarketProductAllPriceSelector, 'getIsPending');
    const getMarketProductAllPriceData = jest.spyOn(getMarketProductAllPriceSelector, 'getData');
    getMarketProductAllPricePending.mockReturnValue(false);
    getMarketProductAllPriceData.mockReturnValue([]);

    const getMarketProductByIdPending = jest.spyOn(getMarketProductByIdSelector, 'getIsPending');
    const getMarketProductByIdData = jest.spyOn(getMarketProductByIdSelector, 'getData');
    getMarketProductByIdPending.mockReturnValue(false);
    getMarketProductByIdData.mockReturnValue([]);
  });
  afterAll(cleanup);
  describe('FormItems', () => {
    it('should render component without error', async () => {
      await renderComponent({
        ui: (
          <FormItems />
        ),
      });
    });
  });
});
