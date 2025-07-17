import * as MOCKS from './index.mock.data';

const getFoodReportUrl = '/payoutsForDomains/food-report';

const getFoodReportMockOptions = {
  url: getFoodReportUrl,
  method: 'post',
  successData: MOCKS.mockedFoodReport,
};

export default [getFoodReportMockOptions];
