import axios from '@shared/axios/common';
import { getLangKey } from '@shared/i18n';

export const createCustomerSatisfactionRequest = requestBody => {
  return axios({
    method: 'POST',
    url: '/blockedStock/createBlockedStockRequest',
    data: requestBody,
  }).then(response => {
    return response.data;
  });
};

export const filterProductsRequest = ({ limit, offset, ...requestBody }) => {
  return axios({
    method: 'POST',
    url: '/marketProduct/filterMarketProductsByWarehouseId',
    data: requestBody,
    params: { offset, limit },
    headers: { 'Accept-Language': getLangKey() },
  }).then(response => {
    return response.data;
  });
};
