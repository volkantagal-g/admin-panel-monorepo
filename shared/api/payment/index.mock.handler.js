import * as MOCKS from './index.mock.data';

const getMerchantsUrl = '/paymentBackOffice/getMerchants';

const getMerchantsMockOptions = {
  url: getMerchantsUrl,
  method: 'get',
  successData: MOCKS.mockedMerchants,
};

const getTransactionsUrl = '/paymentBackOffice/getTransactions';

const getTransactionsMockOptions = {
  url: getTransactionsUrl,
  method: 'post',
  successData: MOCKS.mockedTransactions,
};

const getTransactionDetail = `/paymentBackOffice/getTransaction/${MOCKS.transactionId}`;

const getTransactionDetailMockOptions = {
  url: getTransactionDetail,
  method: 'get',
  successData: MOCKS.mockedTransaction,
};

const getEventDetail = `/paymentBackOffice/getEvent/${MOCKS.eventId}`;

const getEventDetailOptions = {
  url: getEventDetail,
  method: 'get',
  successData: MOCKS.mockedEventDetail,
};
const getMerchantDetail = `/paymentBackOffice/getMerchant/${MOCKS.merchantId}`;

const getMerchantDetailMockOptions = {
  url: getMerchantDetail,
  method: 'get',
  successData: MOCKS.mockedMerchantDetail,
};

const getInstallments = '/paymentBackOffice/list-installments-options';

const getInstallmentsMockOptions = {
  url: getInstallments,
  method: 'post',
  successData: MOCKS.mockedInstallment,
};

export default [getTransactionsMockOptions, getMerchantsMockOptions, getTransactionDetailMockOptions, getEventDetailOptions,
  getMerchantDetailMockOptions, getInstallmentsMockOptions];
