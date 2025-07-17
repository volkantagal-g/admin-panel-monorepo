import * as MOCKS from './index.mock.data';

const getMarketProductTagsURL = '/marketProductTag/getMarketProductTags';
export const getMarketProductTagsMock = {
  url: getMarketProductTagsURL,
  successData: MOCKS.mockedProductTags,
};

export default [
  getMarketProductTagsMock,
];
