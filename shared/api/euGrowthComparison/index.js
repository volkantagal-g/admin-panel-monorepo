import axios from '@shared/axios/common';

export const getCountries = () => {
  return axios({
    method: 'GET',
    url: '/euGrowthComparison/getCountries',
  }).then(response => {
    return response.data;
  });
};

export const getXWeekStats = ({ week }) => {
  return axios({
    method: 'POST',
    url: '/euGrowthComparison/getXWeekStats',
    data: { week },
  }).then(response => {
    return response.data;
  });
};

export const getStatsBetweenDates = ({ startDateL, endDateL }) => {
  return axios({
    method: 'POST',
    url: '/euGrowthComparison/getStatsBetweenDates',
    data: { startDateL, endDateL },
  }).then(response => {
    return response.data;
  });
};
