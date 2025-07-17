import axios from '@shared/axios/common';

export const getAppOpenLocations = ({ requestBody }) => {
  return axios({
    method: 'POST',
    url: '/gis/heatmap/getAppOpenLocations',
    data: requestBody,
  }).then(response => {
    return response.data;
  });
};

export const getMissedOrderLocations = ({ requestBody }) => {
  return axios({
    method: 'POST',
    url: '/gis/heatmap/getMissedOrderLocations',
    data: requestBody,
  }).then(response => {
    return response.data;
  });
};

export const getDownloadLocations = ({ requestBody }) => {
  return axios({
    method: 'POST',
    url: '/gis/heatmap/getDownloadLocations',
    data: requestBody,
  }).then(response => {
    return response.data;
  });
};

export const getSuccessfulOrderLocations = ({ requestBody }) => {
  return axios({
    method: 'POST',
    url: '/gis/heatmap/getSuccessfulOrderLocations',
    data: requestBody,
  }).then(response => {
    return response.data;
  });
};
