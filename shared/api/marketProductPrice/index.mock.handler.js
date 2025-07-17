import * as MOCKS from './index.mock.data';

export const getMarketProductAllPriceHandler = {
  url: '/marketProductPrice/getMarketProductAllPrice',
  successData: MOCKS.mockedMarketProductAllPrice,
};
export const getMarketProductAllPriceMock = {
  url: '/marketProductPrice/getMarketProductAllPrice',
  successData: MOCKS.mockedGetMarketProductAllPrice,
};
export const updateMarketProductPricingHandler = {
  url: '/marketProductPrice/updateMarketProductPricing',
  successData: MOCKS.mockedUpdatingMarketProductPrice,
};

export default [getMarketProductAllPriceHandler, updateMarketProductPricingHandler, getMarketProductAllPriceMock];
