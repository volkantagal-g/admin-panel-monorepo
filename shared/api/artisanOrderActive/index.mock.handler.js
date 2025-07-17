import * as MOCKS from './index.mock.data';

// getPaymentMethods

const getPaymentMethodsUrl = '/artisanOrder/getPaymentMethods';

const getPaymentMethodsMockOptions = {
  url: getPaymentMethodsUrl,
  method: 'get',
  successData: MOCKS.mockedPaymentMethods,
};

// getActiveOrders

const getActiveOrdersUrl = '/artisanOrder/active/getActives';

const getActiveOrdersMockOptions = {
  url: getActiveOrdersUrl,
  successData: MOCKS.mockedActiveOrders,
};

export default [getPaymentMethodsMockOptions, getActiveOrdersMockOptions];
