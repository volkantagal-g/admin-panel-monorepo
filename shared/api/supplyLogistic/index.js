import axios from '@shared/axios/common';

export const getSupplyLogisticInfo = ({ id }) => {
  return axios({
    method: 'GET',
    url: '/supplyLogistic/getSupplyLogisticInfo',
    params: { id },
  }).then(({ data }) => data);
};

export const updateSupplyLogisticInfo = ({ id, body }) => {
  return axios({
    method: 'PATCH',
    url: '/supplyLogistic/updateSupplyLogisticInfo/',
    data: { ...body, id },
  }).then(({ data }) => data);
};

export const createSupplyLogisticInfo = ({ body }) => {
  return axios({
    method: 'POST',
    url: '/supplyLogistic/createSupplyLogisticInfo',
    data: { ...body },
  }).then(({ data }) => data);
};

export const getSupplyBrands = ({ name, limit, offset }) => {
  return axios({
    method: 'POST',
    url: '/supplyLogistic/getSupplyBrands',
    data: { name, limit, offset },
  }).then(({ data }) => data);
};

export const getMasterCategoryV2 = ({ queryText, level, limit, offset, fields, status }) => {
  return axios({
    method: 'POST',
    url: '/supplyLogistic/getMasterCategoriesV2',
    data: { queryText, level, limit, offset, fields, status },
  }).then(({ data }) => data);
};

export const getSignedLogisticsImportUrl = () => {
  return axios({
    method: 'POST',
    url: '/supplyLogistic/getSignedLogisticsImportUrl',
  }).then(response => {
    return response.data;
  });
};

export const importCreateMasterCategory = ({ fileName }) => {
  return axios({
    method: 'POST',
    url: '/supplyLogistic/importCreateCategory',
    data: { fileName },
  }).then(response => {
    return response.data;
  });
};

export const importUpdateMasterCategory = ({ fileName }) => {
  return axios({
    method: 'POST',
    url: '/supplyLogistic/importUpdateCategory',
    data: { fileName },
  }).then(response => {
    return response.data;
  });
};

export const exportMasterCategory = ({ levels }) => {
  return axios({
    method: 'POST',
    url: '/supplyLogistic/exportMasterCategory',
    data: { levels },
  }).then(response => {
    return response.data;
  });
};

export const getAllChildrenOfMasterCategory = ({ baseCategoryId }) => {
  return axios({
    method: 'POST',
    url: '/supplyLogistic/getAllChildrenOfMasterCategory',
    data: { baseCategoryId },
  }).then(response => {
    return response.data;
  });
};
