import axios from '@shared/axios/common';

// TODO: add searchText field to endpoint when we implement backend search
// it is ready to be used in @shared/containers/App/AppLayout/Header/GeneralSearch component
export const getPages = ({ permKeys /* , searchText */ }) => {
  return axios({
    method: 'POST',
    url: '/page/getPages',
    data: { permKeys },
  }).then(response => {
    return response.data;
  });
};

export const getPagesRaw = ({ permKeys, cachedAt, populatePageOwners }) => {
  const data = { permKeys };
  if (cachedAt) data.cachedAt = cachedAt;

  return axios({
    method: 'POST',
    url: '/page/getPages',
    data: {
      ...data,
      populatePageOwners,
    },
  });
};

export const getUserOwnedPages = async ({ userId }) => {
  const response = await axios({
    method: 'POST',
    url: '/page/getUserOwnedPages',
    data: { userId },
  });
  return response.data;
};

export const getPageById = ({ id, isPopulatePageOwners }) => {
  return axios({
    method: 'POST',
    url: '/page/getPage',
    data: { id, isPopulatePageOwners },
  }).then(response => {
    return response.data;
  });
};

export const getPageRoles = ({ permKey, populateRoleOwners, populateComponentAccess }) => {
  return axios({
    method: 'POST',
    url: '/page/getPageRoles',
    data: {
      permKey,
      populateRoleOwners,
      populateComponentAccess,
    },
  }).then(response => {
    return response.data;
  });
};

export const createPage = ({ body: data }) => {
  return axios({
    method: 'POST',
    url: '/page/createPage',
    data,
  }).then(response => {
    return response.data;
  });
};

export const updatePage = ({ id, permKey, updateData }) => {
  return axios({
    method: 'POST',
    url: '/page/updatePage',
    data: { id, permKey, updateData },
  }).then(response => {
    return response.data;
  });
};

export const addPageOwners = ({ pageId, ownerIds }) => {
  return axios({
    method: 'POST',
    url: '/page/addPageOwners',
    data: { pageId, ownerIds },
  }).then(response => {
    return response.data;
  });
};

export const removePageOwners = ({ pageId, ownerIds }) => {
  return axios({
    method: 'POST',
    url: '/page/removePageOwners',
    data: { pageId, ownerIds },
  }).then(response => {
    return response.data;
  });
};
