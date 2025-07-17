import axios from '@shared/axios/common';

export const getDysConfigs = () => {
  return axios({
    method: 'GET',
    url: '/franchise-statistics/dys/weight',
  }).then(response => {
    return response.data;
  });
};

export const updateDysConfigs = ({ updateData }) => {
  return axios({
    method: 'POST',
    url: '/franchise-statistics/dys/weight',
    data: { ...updateData },
  }).then(response => {
    return response.data;
  });
};

export const getHighLevelDysResult = filters => {
  return axios({
    method: 'POST',
    url: '/franchise-statistics/dys/daily',
    data: { ...filters },
  }).then(response => {
    return response.data;
  });
};

export const getHighLevelDysPoints = filters => {
  return axios({
    method: 'POST',
    url: '/franchise-statistics/dys/period',
    data: { ...filters },
  }).then(response => {
    return response.data;
  });
};

export const exportHighLevelDysPoints = payload => {
  return axios({
    method: 'POST',
    url: '/franchise-statistics/dys/export',
    data: payload,
  }).then(response => {
    return response.data;
  });
};

export const getHighLevelLineChartPoints = payload => {
  return axios({
    method: 'POST',
    url: '/franchise-statistics/dys/graphChart',
    data: payload,
  }).then(response => {
    return response.data;
  });
};

export const getHighLevelBarChartPoints = payload => {
  return axios({
    method: 'POST',
    url: '/franchise-statistics/dys/barChart',
    data: payload,
  }).then(response => {
    return response.data;
  });
};
