// TESTING_PRACTICE_EXAMPLE MOCK_HANDLER_OPTIONS
import * as MOCKS from './index.mock.data';

const url = '/peakHours/getPeakHours';

const getPeakHoursMock = {
  url,
  handler: () => {
    return { data: { ...MOCKS.peakHours } };
  },
};

export default [getPeakHoursMock];
