import * as MOCKS from './index.mock.data';

const getBadgesURL = '/marketProductBadge/getBadges';
const getBadgeURL = '/marketProductBadge/getBadge';
const getMarketProductBadgesURL = '/marketProductBadge/getMarketProductBadges';
const createBadgeImageUrlURL = '/marketProductBadge/createBadgeImageUrl';

export const getBadgesMock = {
  url: getBadgesURL,
  successData: MOCKS.mockedBadgeList,
};
export const getBadgeMock = {
  url: getBadgeURL,
  successData: MOCKS.mockedBadge,
};
export const getMarketProductBadgesMock = {
  url: getMarketProductBadgesURL,
  successData: MOCKS.mockedBadgeList,
};
export const createBadgeImageUrlMock = {
  url: createBadgeImageUrlURL,
  successData: MOCKS.mockedCreateMarketImageUrl,
};
export default [
  getBadgesMock,
  getBadgeMock,
  getMarketProductBadgesMock,
  createBadgeImageUrlMock,
];
