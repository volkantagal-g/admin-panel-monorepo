import * as MOCKS from './index.mock.data';

const callCenterFinanceOrderFilterMockOptions = {
  url: '/finance/callCenterFinance/order/filter',
  method: 'post',
  successData: MOCKS.callCenterFinanceOrderFilterEmptyResultMock,
};

export default [
  callCenterFinanceOrderFilterMockOptions,
];
