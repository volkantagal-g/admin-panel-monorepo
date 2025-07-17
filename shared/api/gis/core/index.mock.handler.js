import * as MOCKS from './index.mock.data';

const availableStatsUrl = `/gis/core/getAvailableStats/${MOCKS.mockedGeouBoundaryType}`;
const getPolygonStatsUrl = '/gis/core/getPolygonStats';

const getAvailableStats = {
  url: availableStatsUrl,
  method: 'get',
  successData: MOCKS.availableStats,
};
const getPolygonStats = {
  url: getPolygonStatsUrl,
  method: 'post',
  successData: MOCKS.polygonWithStats,
};

export default [
  getPolygonStats,
  getAvailableStats,
];
