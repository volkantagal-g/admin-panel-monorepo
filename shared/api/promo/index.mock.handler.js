import * as MOCKS from './index.mock.data';

const getPromoByIdUrl = '/promo/getPromoById';

export const getPromoByIdMockOptions = {
  url: getPromoByIdUrl,
  successData: MOCKS.mockedListingPromo,
};

export const getPromoByIdMockSingleBuyXAndGetYFree = {
  url: getPromoByIdUrl,
  successData: MOCKS.mockSingleBuyXAndGetYFreePromo,
};

export const getPromoByIdMockMasterBuyXAndGetYFree = {
  url: getPromoByIdUrl,
  successData: MOCKS.mockMasterBuyXAndGetYFreePromo,
};

export const getPromoByIdMockSingleStarDeals = {
  url: getPromoByIdUrl,
  successData: MOCKS.mockSingleStarDealsPromo,
};

export const getPromoByIdMockSingleBuyXAndGetYFreeP3Enabled = {
  url: getPromoByIdUrl,
  successData: { promo: { ...MOCKS.mockSingleBuyXAndGetYFreePromo.promo, isP3Enabled: true } },
};

export default [
  getPromoByIdMockOptions,
];
