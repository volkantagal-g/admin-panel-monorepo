import axios from '@shared/axios/common';
import { getUser } from '@shared/redux/selectors/auth';

export const createRestaurantExternalTransaction = ({ params }) => {
  const userId = getUser()?._id;
  return axios({
    method: 'POST',
    url: '/food/restaurant-external-transaction',
    data: { ...params, createdBy: userId },
  }).then(response => {
    return response.data;
  });
};

export const validateBulkExternalTransactionExcel = ({ fileName, manualType }) => {
  const userId = getUser()?._id;
  return axios({
    method: 'POST',
    url: '/food/restaurant-bulk-external-transaction-validation',
    data: {
      fileName,
      manualType,
      createdBy: userId,
    },
  }).then(response => {
    return response.data;
  });
};

export const importBulkExternalTransactionExcel = ({ fileName, manualType, selectedDeferredPaymentDateOption }) => {
  const { _id: createdBy, email } = getUser();
  return axios({
    method: 'POST',
    url: '/food/restaurant-bulk-external-transaction',
    data: {
      fileName,
      manualType,
      createdBy,
      email,
      selectedDeferredPaymentDateOption,
    },
  }).then(response => {
    return response.data;
  });
};

export const getS3SignedUrl = ({ fileName }) => axios({
  method: 'POST',
  url: '/food/restaurant-bulk-external-transaction/get-signed-url',
  data: { fileName },
}).then(response => {
  return response.data;
});

export const getExternalTransactionReport = ({ params }) => {
  const { email } = getUser();
  return axios({
    method: 'POST',
    url: '/food/restaurant-external-transaction/report',
    data: { ...params, email },
  }).then(response => {
    return response.data;
  });
};

export const getOrderFinancialsByOrderId = async ({ orderId }) => {
  const response = await axios({
    method: 'GET',
    url: `/food/order-financials/${orderId}`,
  });
  return response.data;
};

export const getDeferredPaymentDateOptionsByPartnerId = async ({ partnerId, vertical }) => {
  const response = await axios({
    method: 'GET',
    url: `/marketplaceFinance/v1/${vertical}/payback-action/get-deferred-payment-dates-by-partnerId`,
    params: { partnerId },
  });
  return response.data;
};
