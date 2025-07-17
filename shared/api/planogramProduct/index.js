import axios from '@shared/axios/common';

export const getPlanogramProduct = ({ id }) => {
  return axios({
    method: 'GET',
    url: '/planogramProducts/getPlanogramProduct',
    params: { id },
  }).then(({ data }) => data);
};

export const updatePlanogramProduct = ({ id, body }) => {
  return axios({
    method: 'PATCH',
    url: `/planogramProducts/updatePlanogramProduct/${id}`,
    data: body,
  }).then(({ data }) => data);
};

export const listPlanogramProduct = ({
  page,
  limit,
  productIds,
  productName,
  domainTypes,
  masterCategoryV2s,
}) => {
  return axios({
    method: 'GET',
    url: '/planogramProducts/listPlanogramProduct',
    params: {
      page,
      limit,
      productIds,
      productName,
      domainTypes,
      masterCategoryV2s,
    },
  }).then(({ data }) => data);
};

export const searchPlanogramProduct = ({
  page,
  limit,
  productIds,
  productName,
  masterCategoryV2s,
}) => {
  return axios({
    method: 'GET',
    url: '/planogramProducts/searchPlanogramProduct',
    params: {
      page,
      limit,
      productIds,
      productName,
      masterCategoryV2s,
    },
  }).then(({ data }) => data);
};

export const createPlanogramProduct = ({ productId, demographyId, sizeIds }) => {
  return axios({
    method: 'POST',
    url: '/planogramProducts/createPlanogramProduct',
    data: { productId, demographyId, sizeIds },
  }).then(({ data }) => data);
};

export const getSignedPlanogramProductsImportUrl = () => {
  return axios({
    method: 'GET',
    url: '/planogramProducts/getSignedPlanogramProductsImportUrl',
  }).then(({ data }) => data);
};

export const importPlanogramProducts = ({ fileName }) => {
  return axios({
    method: 'POST',
    url: '/planogramProducts/importPlanogramProducts',
    data: { fileName },
  }).then(({ data }) => data);
};
