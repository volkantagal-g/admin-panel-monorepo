import axios from '@shared/axios/common';
import { getLangKey } from '@shared/i18n';

export const getPlanogramWarehouse = ({ id }) => {
  return axios({
    method: 'GET',
    url: '/planogramWarehouse/getPlanogramWarehouse/',
    params: { id },
  }).then(({ data }) => data);
};

export const updatePlanogramWarehouse = ({ id, body }) => {
  return axios({
    method: 'PATCH',
    url: `/planogramWarehouse/updatePlanogramWarehouse/${id}`,
    data: body,
  }).then(({ data }) => data);
};

export const listPlanogramWarehouse = ({
  limit,
  page,
  demographyId,
  sizeId,
  warehouseId,
  warehouseName,
  domainType,
  warehouseType,
  cityId,
  regionId,
  sortKey,
  sortDirection,
}) => {
  return axios({
    method: 'GET',
    url: '/planogramWarehouse/listPlanogramWarehouse',
    params: {
      limit,
      page,
      demographyId,
      sizeId,
      warehouseId,
      warehouseName,
      domainType,
      warehouseType,
      cityId,
      regionId,
      sortKey,
      sortDirection,
    },
  }).then(({ data }) => data);
};

export const createPlanogramWarehouse = ({ warehouseId, demographyConfiguration, sizeConfiguration, planogramConfigurations, additionalNote }) => {
  return axios({
    method: 'POST',
    url: '/planogramWarehouse/createPlanogramWarehouse',
    data: { warehouseId, demographyConfiguration, sizeConfiguration, planogramConfigurations, additionalNote },
  }).then(({ data }) => data);
};

export const searchPlanogramWarehouse = ({ warehouseName, warehouseId, page, limit }) => {
  return axios({
    method: 'GET',
    url: '/planogramWarehouse/searchPlanogramWarehouse',
    params: {
      warehouseId,
      warehouseName,
      page,
      limit,
    },
  }).then(({ data }) => data);
};

export const exportPlanogramWarehouse = () => {
  return axios({
    method: 'POST',
    url: '/planogramWarehouse/exportPlanogramWarehouse',
    data: { lang: getLangKey() },
  }).then(({ data }) => data);
};

export const getSignedPlanogramWarehousesImportUrl = () => {
  return axios({
    method: 'GET',
    url: '/planogramWarehouse/getSignedPlanogramWarehousesImportUrl',
  }).then(({ data }) => data);
};

export const importPlanogramWarehouses = ({ fileName }) => {
  return axios({
    method: 'POST',
    url: '/planogramWarehouse/importPlanogramWarehouses',
    data: { fileName },
  }).then(({ data }) => data);
};
