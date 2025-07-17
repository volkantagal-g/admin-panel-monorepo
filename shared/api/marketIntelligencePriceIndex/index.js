import axios from '@shared/axios/common';

export const getCategories = () => {
  return axios({
    method: 'POST',
    url: 'marketIntelligencePriceIndex/getCategories',
    json: true,
  }).then(response => {
    return response.data;
  });
};

export const getSubCategories = () => {
  return axios({
    method: 'POST',
    url: 'marketIntelligencePriceIndex/getSubCategories',
    json: true,
  }).then(response => {
    return response.data;
  });
};

export const fetchCompetitorList = () => {
  return axios({
    method: 'GET',
    url: 'marketIntelligencePriceIndex/fetchCompetitorList',
    json: true,
  }).then(response => {
    return response.data;
  });
};

export const postIndexByData = ({ fetchData, indexBy }) => {
  return axios({
    method: 'POST',
    url: '/marketIntelligencePriceIndex/postIndexByData',
    data: { indexBy, fetchData },
    json: true,
  }).then(response => {
    return response.data;
  });
};
