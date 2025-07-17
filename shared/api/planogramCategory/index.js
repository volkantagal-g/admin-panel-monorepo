import axios from '@shared/axios/common';
import { getLangKey } from '@shared/i18n';

export const createPlanogramCategory = ({ body }) => {
  return axios({
    method: 'POST',
    url: '/planogramCategory/createPlanogramCategory',
    data: { ...body },
  }).then(({ data }) => data);
};

export const getPlanogramCategory = ({ id }) => {
  return axios({
    method: 'GET',
    url: '/planogramCategory/getPlanogramCategory',
    params: { id },
  }).then(({ data }) => data);
};

export const updatePlanogramCategory = ({ body }) => {
  return axios({
    method: 'PATCH',
    url: '/planogramCategory/updatePlanogramCategory',
    data: { ...body },
  }).then(({ data }) => data);
};

export const listPlanogramCategory = ({
  id,
  levelOneId,
  levelTwoId,
  levelThreeId,
  levelFourId,
  name,
  storageType,
  page,
  limit,
  sortKey,
  sortDirection,
}) => {
  return axios({
    method: 'GET',
    url: '/planogramCategory/listPlanogramCategory',
    params: {
      id,
      levelOneId,
      levelTwoId,
      levelThreeId,
      levelFourId,
      name,
      storageType,
      page,
      limit,
      sortKey,
      sortDirection,
    },
  }).then(({ data }) => data);
};
export const createPlanogram = ({ body }) => {
  return axios({
    method: 'POST',
    url: '/planogram/createPlanogram',
    data: { ...body },
  }).then(({ data }) => data);
};
export const getSignedPlanogramCategoriesImportUrl = () => {
  return axios({
    method: 'GET',
    url: '/planogramCategory/getSignedPlanogramCategoriesImportUrl',
  }).then(({ data }) => data);
};

export const importPlanogramCategories = ({ fileName }) => {
  return axios({
    method: 'POST',
    url: '/planogramCategory/importPlanogramCategories',
    data: { fileName },
  }).then(({ data }) => data);
};
export const exportPlanogramCategories = () => {
  return axios({
    method: 'POST',
    url: '/planogramCategory/exportPlanogramCategories',
    data: { lang: getLangKey() },
  }).then(({ data }) => data);
};
