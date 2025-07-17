import axios from '@shared/axios/common';

export const getShopsByName = (body = {}) => {
  return axios({
    method: 'GET',
    url: `/shop/search?name=${body.name}`,
    data: body,
  }).then(response => {
    return response.data;
  });
};

export const getPaymentMethods = body => {
  return axios({
    method: 'GET',
    url: `/shop/getPaymentMethods?includeOnline=${!!body.includeOnline}`,
    data: body,
  }).then(response => {
    return response.data;
  });
};
