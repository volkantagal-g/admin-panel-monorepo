import axios from '@shared/axios/common';

export const getBusyReasons = () => {
  return axios({
    method: 'GET',
    url: '/marketCourier/getBusyReasons',
  }).then(response => {
    return response.data;
  });
};

export const filterCouriers = data => {
  return axios({
    method: 'POST',
    url: '/marketCourier/filterCouriers',
    data,
  }).then(response => {
    return response.data;
  });
};