import * as MOCKS from './index.mock.data';

const getSummariesUrl = '/tipPayback/payout-summary';

const getSummariesMockOptions = {
  url: getSummariesUrl,
  method: 'post',
  successData: MOCKS.mockedTipPaybackSummaries,
};

const getFailedSummariesUrl = '/tipPayback/payout-summary-fail-reason';

const getFailedSummariesMockOptions = {
  url: getFailedSummariesUrl,
  method: 'post',
  successData: MOCKS.mockedFailedTipPaybackSummaries,
};

const getDetailsSummariesUrl = '/tipPayback/payout-summary-details';

const getDetailsSummariesMockOptions = {
  url: getDetailsSummariesUrl,
  method: 'post',
  successData: MOCKS.mockedDetailsTipPaybackSummaries,
};

const postCancelUrl = '/tipPayback/payout-summary/cancel';

const postCancelMockOptions = {
  url: postCancelUrl,
  method: 'post',
  errorData: MOCKS.mockedFailedCancel,
};

const calculateUrl = '/tipPayback/calculate';

const calculateMockOptions = {
  url: calculateUrl,
  method: 'post',
  successData: MOCKS.mockedCalculate,
};

export default [getSummariesMockOptions, getFailedSummariesMockOptions, getDetailsSummariesMockOptions, postCancelMockOptions, calculateMockOptions];
