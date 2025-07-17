import axios from '@shared/axios/common';

export const getMarketProductCategoryAvailableTimes = ({ warehouses, categories, subCategories, domainTypes }) => {
  return axios({
    method: 'POST',
    url: '/marketProductCategoryAvailableTime/getMarketProductCategoryAvailableTimes',
    data: {
      warehouses: warehouses?.length ? warehouses : undefined,
      categories: categories?.length ? categories : undefined,
      subCategories: subCategories?.length ? subCategories : undefined,
      domainTypes: domainTypes?.length ? domainTypes : undefined,
    },
  }).then(response => {
    return response.data;
  });
};

export const getMarketProductCategoryAvailableTime = ({ id }) => {
  return axios({
    method: 'POST',
    url: '/marketProductCategoryAvailableTime/getMarketProductCategoryAvailableTime',
    data: { id },
  }).then(response => {
    return response.data;
  });
};

export const createMarketProductCategoryAvailableTime = ({ body: data }) => {
  return axios({
    method: 'POST',
    url: '/marketProductCategoryAvailableTime/createMarketProductCategoryAvailableTime',
    data,
  }).then(response => {
    return response.data;
  });
};

export const updateMarketProductCategoryAvailableTime = ({ id, body: updateData }) => {
  return axios({
    method: 'POST',
    url: '/marketProductCategoryAvailableTime/updateMarketProductCategoryAvailableTime',
    data: { id, updateData },
  }).then(response => {
    return response.data;
  });
};

export const deleteMarketProductCategoryAvailableTimes = ({ ids }) => {
  return axios({
    method: 'POST',
    url: '/marketProductCategoryAvailableTime/deleteMarketProductCategoryAvailableTimes',
    data: { ids },
  }).then(response => {
    return response.data;
  });
};
