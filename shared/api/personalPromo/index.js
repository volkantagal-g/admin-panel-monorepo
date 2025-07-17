import axios from '@shared/axios/common';

export const createPersonalPromo = data => {
  return axios({
    method: 'POST',
    url: '/personalPromo/create',
    data,
  }).then(response => {
    return response.data;
  });
};

export const getPersonalPromoById = id => {
  return axios({
    method: 'GET',
    url: `/personalPromo/${id}`,
  }).then(response => {
    return response.data;
  });
};
