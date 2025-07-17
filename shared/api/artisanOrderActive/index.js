import axios from '@shared/axios/common';

export const getActives = body => {
  return axios({
    method: 'POST',
    url: '/artisanOrder/active/getActives',
    data: body,
  }).then(response => {
    return response.data;
  });
};

export const getPaymentMethods = ({ includeOnline }) => {
  return axios({
    method: 'GET',
    url: '/artisanOrder/getPaymentMethods',
    params: { includeOnline },
  }).then(response => {
    return response.data;
  });
};

export const getShopsByName = ({ name, cityIds }) => {
  let queryCityIds;

  if (cityIds?.length) {
    if (Array.isArray(cityIds)) queryCityIds = cityIds.join(',');
    else queryCityIds = cityIds;
  }

  return axios({
    method: 'GET',
    url: '/artisanOrder/getShopsByName',
    params: { name, cityIds: queryCityIds },
  }).then(response => {
    return response.data;
  });
};
