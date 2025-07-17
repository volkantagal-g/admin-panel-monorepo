import axios from '@shared/axios/common';

export const getMarketProductGroups = ({ limit, offset, queryText, filterOptions }) => {
  const data = {
    limit,
    offset,
    filterOptions,
    ...(queryText?.length ? { queryText } : undefined),
  };
  return axios({
    method: 'POST',
    url: '/marketProductGroup/getMarketProductGroups',
    data,
  }).then(response => {
    return response.data;
  });
};

export const getMarketProductGroup = ({ id }) => {
  return axios({
    method: 'POST',
    url: '/marketProductGroup/getMarketProductGroup',
    data: { id },
  }).then(response => {
    return response.data;
  });
};

export const createMarketProductGroup = ({ body: data }) => {
  return axios({
    method: 'POST',
    url: '/marketProductGroup/createMarketProductGroup',
    data,
  }).then(response => {
    return response.data;
  });
};

export const copyMarketProductGroup = ({ id }) => {
  return axios({
    method: 'POST',
    url: '/marketProductGroup/copyMarketProductGroup',
    data: { id },
  }).then(response => {
    return response.data;
  });
};

export const updateMarketProductGroup = ({ id, body: updateData }) => {
  return axios({
    method: 'POST',
    url: '/marketProductGroup/updateMarketProductGroup',
    data: { id, updateData },
  }).then(response => {
    return response.data;
  });
};

export const deleteMarketProductGroup = ({ id }) => {
  return axios({
    method: 'POST',
    url: '/marketProductGroup/deleteMarketProductGroup',
    data: { id },
  }).then(response => {
    return response.data;
  });
};

export const getProductsOfProductGroup = ({ id }) => {
  return axios({
    method: 'POST',
    url: '/marketProductGroup/getProductsOfProductGroup',
    data: { id },
  }).then(response => {
    return response.data;
  });
};

export const getSignedProductsOfProductGroupsImportUrl = () => {
  return axios({
    method: 'POST',
    url: '/marketProductGroup/getSignedProductsOfProductGroupsImportUrl',
  }).then(response => {
    return response.data;
  });
};

export const importProductsOfProductGroup = ({ fileName }) => {
  return axios({
    method: 'POST',
    url: '/marketProductGroup/importProductsOfProductGroup',
    data: { fileName },
  }).then(response => {
    return response.data;
  });
};

export const createMarketProductGroupImageUrl = ({ extension }) => {
  return axios({
    method: 'POST',
    url: '/marketProductGroup/createMarketProductGroupImageUrl',
    data: { extension },
  }).then(response => {
    return response.data;
  });
};
