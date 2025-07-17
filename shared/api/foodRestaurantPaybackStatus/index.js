import axios from '@shared/axios/common';
import { getUser } from '@shared/redux/selectors/auth';

export const getCurrentStatus = ({ restaurantId }) => {
  return axios({
    method: 'POST',
    url: '/food/restaurant-payback-status/current',
    data: { restaurantId },
  }).then(response => {
    return response.data;
  });
};

export const changePaybackStatus = ({ data }) => {
  const userId = getUser()?._id;
  return axios({
    method: 'POST',
    url: '/food/restaurant-payback-status',
    data: { ...data, userId },
  }).then(response => {
    return response.data;
  });
};

export const changeAllRestaurantsPaybackStatus = ({ data }) => {
  return axios({
    method: 'POST',
    url: '/food/restaurant-payback-status/all',
    data,
  }).then(response => {
    return response.data;
  });
};

export const validatePartialRestaurantsPaybackStatus = ({ fileName }) => {
  return axios({
    method: 'POST',
    url: '/food/restaurant-payback-status/partial-validate',
    data: { fileName },
  }).then(response => {
    return response.data;
  });
};

export const changePartialRestaurantsPaybackStatus = ({ data }) => {
  return axios({
    method: 'POST',
    url: '/food/restaurant-payback-status/partial',
    data,
  }).then(response => {
    return response.data;
  });
};
