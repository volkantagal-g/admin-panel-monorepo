import axios from '@shared/axios/common';

export const getLiveMapAllCourierCountsAndCourierPlan = () => {
  return axios({
    method: 'GET',
    url: '/artisanLiveMap/allCourierCountsAndCourierPlan',
  }).then(response => {
    return response.data;
  });
};

export const getLiveMapArtisanCourierCountsAndCourierPlan = () => {
  return axios({
    method: 'GET',
    url: '/artisanLiveMap/artisanCourierCountsAndCourierPlan',
  }).then(response => {
    return response.data;
  });
};

export const getLiveMapOrderCountsAndFinancial = ({ selectedCity, selectedCountry }) => {
  return axios({
    method: 'POST',
    url: '/artisanLiveMap/orderCountsAndFinancial',
    data: { selectedCity, selectedCountry },
  }).then(response => {
    return response.data;
  });
};

export const getShopsStatistics = ({ cityId }) => {
  return axios({
    method: 'GET',
    url: '/artisanLiveMap/shop/statistics',
    params: { cityId },
  }).then(response => {
    return response.data;
  });
};
