import {
  mockedAlgorithmProductGroup,
  mockedMarketProductGroups,
  mockedProductsOfProductGroup,
  mockedManuelProductGroup,
  mockedMarketProducts,
} from './index.mock.data';

const getMarketProductGroupUrl = '/marketProductGroup/getMarketProductGroup';
const updateMarketProductGroupUrl = '/marketProductGroup/updateMarketProductGroup';
const getMarketProductGroupsUrl = '/marketProductGroup/getMarketProductGroups';
const getProductsOfProductGroupUrl = '/marketProductGroup/getProductsOfProductGroup';
const getMarketProductsUrl = '/marketProduct/getMarketProducts';

export const getMarketAlgorithmProductGroupMock = {
  url: getMarketProductGroupUrl,
  successData: mockedAlgorithmProductGroup,
};

export const getMarketManuelProductGroupMock = {
  url: getMarketProductGroupUrl,
  successData: mockedManuelProductGroup,
};

export const getMarketProductGroupsMock = {
  url: getMarketProductGroupsUrl,
  successData: mockedMarketProductGroups,
};

export const getProductsOfProductGroupMock = {
  url: getProductsOfProductGroupUrl,
  successData: mockedProductsOfProductGroup,
};

export const updateMarketProductGroupAlreadyExistsMock = {
  url: updateMarketProductGroupUrl,
  errorData: {
    code: 32251,
    error: 'ProductGroupingExistsWithSameProperties',
    message: 'Active product grouping exists with same abTestValueId, countryCode, placement, order, and hierarchy.',
    data: '660552a1ee4a477ae9150db7',
  },
};

export const updateMarketProductGroupMock = {
  url: updateMarketProductGroupUrl,
  successData: mockedManuelProductGroup,
};

export const getMarketProductsMock = {
  url: getMarketProductsUrl,
  successData: mockedMarketProducts,
};

export default [
  getMarketAlgorithmProductGroupMock,
  updateMarketProductGroupAlreadyExistsMock,
  getMarketProductGroupsMock,
  getProductsOfProductGroupMock,
  getMarketManuelProductGroupMock,
  updateMarketProductGroupMock,
  getMarketProductsMock,
];
