import axios from '@shared/axios/common';

export const getLiveMapData = data => {
  const config = {
    method: 'POST',
    url: '/dailyTracking/getCitiesMonitoringData',
    data,
  };

  if (data?.selectedDivision) {
    config.headers = { division: data.selectedDivision };
  }

  return axios(config).then(response => {
    return response.data;
  });
};

export const getOperationalStatsBySelectedCity = data => {
  return axios({
    method: 'POST',
    url: '/dailyTracking/getCitiesMonitoringDataBySelectedCity',
    data,
  }).then(response => {
    return response.data;
  });
};

export const getOperationStats = data => {
  return axios({
    method: 'POST',
    url: '/dailyTracking/getOperationStats',
    data,
  }).then(response => {
    return response.data;
  });
};

export const getCourierStatusCountsWithCourierPlan = data => {
  return axios({
    method: 'POST',
    url: '/dailyTracking/getCourierStatusCountsWithCourierPlan',
    data,
  }).then(response => {
    return response.data;
  });
};

export const getOperationStatsTimeSeries = data => {
  return axios({
    method: 'POST',
    url: '/dailyTracking/getOperationStatsTimeSeries',
    data,
  }).then(response => {
    return response.data;
  });
};

export const getOrderPromoDistributionBetweenDates = data => {
  const config = {
    method: 'POST',
    url: '/dailyTracking/getOrderPromoDistributionBetweenDates',
    data: { ...data, useNewDataAccess: true },
  };

  if (config?.data?.divisionCountries) {
    config.headers = { divisionCountries: config.data.divisionCountries };
    config.data = { ...config.data, divisionCountries: undefined };
  }

  return axios(config).then(response => {
    return response.data;
  });
};

export const getRedBasketCounts = data => {
  const config = {
    method: 'POST',
    url: '/dailyTracking/getRedBasketCounts',
    data,
  };

  if (config?.data?.divisionCountries) {
    config.headers = { divisionCountries: config.data.divisionCountries };
    config.data = { ...config.data, divisionCountries: undefined };
  }

  return axios(config).then(response => {
    return response.data;
  });
};
