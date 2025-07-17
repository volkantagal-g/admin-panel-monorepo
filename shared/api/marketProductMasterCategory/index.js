import axios from '@shared/axios/common';

// TODO: this will be removed after migration is done. Some of other teams still use old master category structure.
export const getMarketProductMasterCategoriesOld = ({ limit, offset, isSubCategory }) => {
  return axios({
    method: 'POST',
    url: '/marketProductMasterCategory/getMarketProductMasterCategoriesOld',
    data: { isSubCategory, limit, offset },
  }).then(response => {
    return response.data;
  });
};

export const getMarketProductMasterCategories = ({ queryText, level, limit, offset }) => {
  return axios({
    method: 'POST',
    url: '/marketProductMasterCategory/getMarketProductMasterCategories',
    data: { queryText, level, limit, offset },
  }).then(response => {
    return response.data;
  });
};

export const getMarketProductMasterCategory = ({ id: categoryId }) => {
  return axios({
    method: 'POST',
    url: '/marketProductMasterCategory/getMarketProductMasterCategory',
    data: { categoryId },
  }).then(response => {
    return response.data;
  });
};

export const createMarketProductMasterCategory = ({ body: data }) => {
  return axios({
    method: 'POST',
    url: '/supplyLogistic/createMasterCategory',
    data,
  }).then(response => {
    return response.data;
  });
};

export const updateMarketProductMasterCategory = ({ id: categoryId, body: updateData }) => {
  return axios({
    method: 'PATCH',
    url: '/supplyLogistic/updateMasterCategory',
    data: { categoryId, updateData },
  }).then(response => {
    return response.data;
  });
};

export const getChildrenOfMarketProductMasterCategory = ({ id: categoryId, limit = 10000, offset = 0 }) => {
  return axios({
    method: 'POST',
    url: '/marketProductMasterCategory/getChildrenOfMarketProductMasterCategory',
    data: { categoryId, limit, offset },
  }).then(response => {
    return response.data;
  });
};

export const bulkUpdateMarketProductMasterCategories = ({ categories }) => {
  return axios({
    method: 'POST',
    url: '/marketProductMasterCategory/bulkUpdateMarketProductMasterCategories',
    data: { categories },
  }).then(response => {
    return response.data;
  });
};

export const getMasterCategoriesByLevel = ({ level }) => {
  return axios({
    method: 'POST',
    url: '/marketProductMasterCategory/getMarketProductMasterCategories',
    data: { level },
  }).then(response => {
    return response.data;
  });
};
