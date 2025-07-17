import axios from '@shared/axios/common';

export const getActives = ({ body: updateData }) => {
  return axios({
    method: 'POST',
    url: '/foodOrder/active/getActives',
    data: { updateData },
  }).then(response => {
    return response;
  });
};

export const getPaymentMethods = ({ includeOnline }) => {
  return axios({
    method: 'GET',
    url: '/food/getPaymentMethods',
    params: { includeOnline },
  }).then(response => {
    return response.data;
  });
};
