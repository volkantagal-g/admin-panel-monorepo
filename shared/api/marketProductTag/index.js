import axios from '@shared/axios/common';

export const getMarketProductTags = () => {
  return axios({
    method: 'POST',
    url: '/marketProductTag/getMarketProductTags',
  }).then(response => {
    return response.data;
  });
};

export const createMarketProductTag = ({ marketProductTagData: data }) => {
  return axios({
    method: 'POST',
    url: '/marketProductTag/createMarketProductTag',
    data,
  }).then(response => {
    return response.data;
  });
};

export const updateMarketProductTag = ({ id, marketProductTagData: updateData }) => {
  return axios({
    method: 'POST',
    url: '/marketProductTag/updateMarketProductTag',
    data: { id, updateData },
  }).then(response => {
    return response.data;
  });
};

export const deleteMarketProductTag = ({ tagId }) => {
  return axios({
    method: 'DELETE',
    url: `/marketProductTag/${tagId}`,
  }).then(response => {
    return response.data;
  });
};

export const createMarketProductTagImageUrl = ({ extension }) => {
  return axios({
    method: 'POST',
    url: '/marketProductTag/createMarketProductTagImageUrl',
    data: { extension },
  }).then(response => {
    return response.data;
  });
};
