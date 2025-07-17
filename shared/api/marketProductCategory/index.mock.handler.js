import * as MOCKS from './index.mock.data';
import { getMarketProductCategoriesUrl } from '.';

export const getMarketProductCategoriesMock = {
  url: getMarketProductCategoriesUrl,
  successData: MOCKS.mockedMarketProductCategories,
};

export const getMarketProductSubCategoriesMock = {
  url: getMarketProductCategoriesUrl,
  successData: MOCKS.mockedMarketProductSubCategories,
};

export default [
  getMarketProductCategoriesMock,
];
