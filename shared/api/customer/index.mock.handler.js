import * as MOCKS from './index.mock.data';

const getMockedOrderCancelSuccessResponse = {
  url: '/customer/order/12b98a12345e44c15fc1234f/cancel',
  method: 'post',
  successData: MOCKS.mockedCancelSuccess,
};

const getMockedOrderCancelErrorResponse = {
  url: '/customer/order/12b98a12345e44c15fc1234a/cancel',
  method: 'post',
  errorData: MOCKS.mockedCancelError,
};

const getMockedOrderCancelOptionsResponse = {
  url: '/customer/order/12b98a12345e44c15fc1234f/cancelOptions',
  method: 'get',
  successData: MOCKS.mockedCancelOptions,
};

const getMockedOrderPartiallyRefundedSuccessResponse = {
  url: '/customer/order/62c5233adde79729292c975e/refund/partial',
  method: 'get',
  successData: MOCKS.mockedPartialRefundSuccess,
};

const getMockedOrderPartiallyRefundedErrorResponse = {
  url: '/customer/order/62c5233adde79729292c975e/refund/partial',
  method: 'get',
  successData: MOCKS.mockedPartialRefundError,
};

const getMockedWholeRefundReasonsSuccessResponse = {
  url: '/customer/order/refund/whole/reasons',
  method: 'get',
  successData: MOCKS.mockedWholeRefundReasonsSuccess,
};

const getMockedWholeRefundReasonsErrorResponse = {
  url: '/customer/order/refund/whole/reasons',
  method: 'get',
  successData: MOCKS.mockedWholeRefundReasonsError,
};

const getMockedWholeRefundOrderSuccessResponse = {
  url: '/customer/order/12b98a12345e44c15fc1234a/refund/whole/',
  method: 'post',
  errorData: MOCKS.mockedWholeRefundSuccess,
};

const getMockedWholeRefundOrderErrorResponse = {
  url: '/customer/order/12b98a12345e44c15fc1234a/refund/whole/',
  method: 'post',
  errorData: MOCKS.mockedWholeRefundError,
};

const getMockedGetPromoByIdSuccess = {
  url: '/customer/promo/',
  method: 'get',
  successData: MOCKS.mockedPersonalPromoSuccess,
};

const getMockedUpdatePromoDatesSuccess = {
  url: '/customer/promo/_ACBIO15B',
  method: 'put',
  successData: MOCKS.SUCCESS_RESPONSE,
};

const getMockedUpdatePromoStatusSuccess = {
  url: '/customer/promo/_ACBIO15B',
  method: 'put',
  successData: MOCKS.SUCCESS_RESPONSE,
};

export default [
  getMockedOrderCancelSuccessResponse,
  getMockedOrderCancelErrorResponse,
  getMockedOrderCancelOptionsResponse,
  getMockedOrderPartiallyRefundedSuccessResponse,
  getMockedOrderPartiallyRefundedErrorResponse,
  getMockedWholeRefundReasonsSuccessResponse,
  getMockedWholeRefundReasonsErrorResponse,
  getMockedWholeRefundOrderSuccessResponse,
  getMockedWholeRefundOrderErrorResponse,
  getMockedGetPromoByIdSuccess,
  getMockedUpdatePromoDatesSuccess,
  getMockedUpdatePromoStatusSuccess,
];
