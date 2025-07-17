import axios from '@shared/axios/common';

export const getLiveMapAllCourierCountsAndCourierPlan = () => {
  return axios({
    method: 'GET',
    url: '/food/liveMap/allCourierCountsAndCourierPlan',
  }).then(response => {
    return response.data;
  });
};

export const getLiveMapFoodCourierCountsAndCourierPlan = () => {
  return axios({
    method: 'GET',
    url: '/food/liveMap/foodCourierCountsAndCourierPlan',
  }).then(response => {
    return response.data;
  });
};

export const getLiveMapOrderCountsAndFinancial = ({ selectedCity, selectedCountry }) => {
  return axios({
    method: 'POST',
    url: '/food/liveMap/orderCountsAndFinancial',
    data: { selectedCity, selectedCountry },
  }).then(response => {
    return response.data;
  });
};

export const getRestaurantsStatistics = ({ cityId }) => {
  return axios({
    method: 'GET',
    url: '/food/restaurant/statistics',
    params: { cityId },
  }).then(response => {
    return response.data;
  });
};

export const getActiveOrderCouriersAndWarehousesRequest = ({ cityId }) => {
  return axios({
    method: 'POST',
    url: '/food/liveMap/activeOrderCouriersAndWarehouses',
    data: { cityId },
  }).then(response => {
    return response.data;
  });
};
