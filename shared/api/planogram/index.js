import axios from '@shared/axios/common';
import { getLangKey } from '@shared/i18n';

export const getSizeList = () => {
  return axios({
    method: 'GET',
    url: '/planogram/getSizeList',
  }).then(response => {
    return response.data;
  });
};

export const getDemographyList = () => {
  return axios({
    method: 'GET',
    url: '/planogram/getDemographyList',
  }).then(response => {
    return response.data;
  });
};

export const updatePlanogram = ({ id, body }) => {
  return axios({
    method: 'PATCH',
    url: `/planogram/updatePlanogram/${id}`,
    data: { ...body },
  }).then(({ data }) => data);
};

export const getPlanogram = ({ id }) => {
  return axios({
    method: 'GET',
    url: '/planogram/getPlanogram',
    params: { id },
  }).then(({ data }) => data);
};

export const listPlanogram = ({
  id,
  name,
  planogramCategoryIds,
  demographyIds,
  sizeIds,
  domainTypes,
  page,
  limit,
  productIds,
  isGroupByCatIdEnabled,
  sortKey,
  sortDirection,
  isStoreConversion,
}) => {
  return axios({
    method: 'GET',
    url: '/planogram/listPlanogram',
    params: {
      id,
      name,
      planogramCategoryIds,
      demographyIds,
      sizeIds,
      domainTypes,
      page,
      limit,
      productIds,
      isGroupByCatIdEnabled,
      sortKey,
      sortDirection,
      isStoreConversion,
    },
  }).then(({ data }) => data);
};

export const planogramBulkUpdate = ({ body }) => {
  return axios({
    method: 'POST',
    url: '/planogram/planogramBulkUpdate',
    data: { ...body },
  }).then(({ data }) => data);
};

export const getSignedPlanogramsImportUrl = () => {
  return axios({
    method: 'GET',
    url: '/planogram/getSignedPlanogramsImportUrl',
  }).then(({ data }) => data);
};

export const importPlanograms = ({ fileName }) => {
  return axios({
    method: 'POST',
    url: '/planogram/importPlanograms',
    data: { fileName },
  }).then(({ data }) => data);
};

export const exportPlanograms = () => {
  return axios({
    method: 'POST',
    url: '/planogram/exportPlanograms',
    data: { lang: getLangKey() },
  }).then(({ data }) => data);
};

export const listPlanogramProduct = ({ body }) => {
  return axios({
    method: 'POST',
    url: '/planogram/products',
    data: { ...body },
  }).then(({ data }) => data);
};

export const getSizes = () => {
  return axios({
    method: 'GET',
    url: '/planogram/sizes',
  }).then(({ data }) => data);
};

export const getDemographies = () => {
  return axios({
    method: 'GET',
    url: '/planogram/demographies',
  }).then(response => {
    return response.data;
  });
};

export const getPlanogramProductDetails = ({ id }) => {
  return axios({
    method: 'GET',
    url: `/planogram/products/${id}`,
  }).then(({ data }) => data);
};

export const filterPlanogramWarehouse = ({ body }) => {
  return axios({
    method: 'POST',
    url: '/planogram/warehouse/filter',
    data: { ...body },
  }).then(({ data }) => data);
};

export const getWarehouseTypes = () => {
  return axios({
    method: 'GET',
    url: '/planogram/warehouse/types',
  }).then(response => {
    return response.data;
  });
};

export const updatePlanogramProduct = ({ productId, body }) => {
  return axios({
    method: 'PUT',
    url: `/planogram/products/${productId}`,
    data: { ...body },
  }).then(response => {
    return response.data;
  });
};

export const getMainWarehousesAndCities = () => {
  return axios({
    method: 'GET',
    url: '/planogram//warehouse/mainwarehouses-and-cities',
  }).then(response => {
    return response.data;
  });
};

export const exportPlanogramProduct = () => {
  return axios({
    method: 'POST',
    url: '/planogram/exportPlanograms',
    data: { lang: getLangKey() },
  }).then(({ data }) => data);
};

export const listPlanogramWarehouses = ({ body }) => {
  return axios({
    method: 'POST',
    url: '/planogram/warehouses',
    data: { ...body },
  }).then(({ data }) => data);
};

export const getPlanogramWarehouseDetails = ({ body }) => {
  return axios({
    method: 'POST',
    url: '/planogram/warehouse/detail',
    data: { ...body },
  }).then(({ data }) => data);
};

export const updatePlanogramWarehouse = ({ warehouseId, body }) => {
  return axios({
    method: 'PUT',
    url: `/planogram/warehouse/${warehouseId}`,
    data: body,
  }).then(({ data }) => data);
};

export const importPlanogramProducts = ({ fileName }) => {
  return axios({
    method: 'POST',
    url: '/planogram/products/import',
    data: { fileName },
  }).then(({ data }) => data);
};

export const exportPlanogramProducts = () => {
  return axios({
    method: 'POST',
    url: '/planogram/products/export',
  }).then(({ data }) => data);
};

export const importPlanogramWarehouse = ({ fileName }) => {
  return axios({
    method: 'POST',
    url: '/planogram/warehouse/import',
    data: { fileName },
  }).then(({ data }) => data);
};

export const exportPlanogramWarehouses = () => {
  return axios({
    method: 'POST',
    url: '/planogram/warehouse/export',
  }).then(({ data }) => data);
};
