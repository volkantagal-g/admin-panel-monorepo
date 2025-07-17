import * as MOCKS from './index.mock.data';

const getWeights = '/franchise-statistics/dys/weight';

const getSpsConfigMock = {
  url: getWeights,
  method: 'get',
  successData: MOCKS.mockedDysConfigs,
};

const getHighLevelDysConfigsByDay = '/franchise-statistics/dys/daily';

const getHighLevelDysConfigsByPeriod = '/franchise-statistics/dys/period';

const getHighLevelConfigsByDayMock = {
  url: getHighLevelDysConfigsByDay,
  successData: MOCKS.mockedHighLevelDysByDayConfig,
};

const getHighLevelConfigsByPeriodMock = {
  url: getHighLevelDysConfigsByPeriod,
  successData: MOCKS.mockedHighLevelDysByPeriodConfig,
};

export default [getSpsConfigMock, getHighLevelConfigsByDayMock, getHighLevelConfigsByPeriodMock];
