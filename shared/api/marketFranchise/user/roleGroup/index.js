import axios from '@shared/axios/common';

export const createMarketFranchiseUserRoleGroup = async ({ name, description, countries, hasGlobalAccess }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/franchiseUserRoleGroup/create',
    data: { name, description, countries, hasGlobalAccess },
  });
  return data;
};

export const getMarketFranchiseUserRoleGroupDetail = async ({ id }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/franchiseUserRoleGroup/detail',
    data: { id },
  });
  return data;
};

export const updateMarketFranchiseUserRoleGroup = async ({ updateOptions, id }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/franchiseUserRoleGroup/update',
    data: { updateOptions, id },
  });
  return data;
};
export const getMarketFranchiseUserRoleGroupList = async ({ limit, offset, name, isActive }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/franchiseUserRoleGroup/filter',
    data: { limit, offset, name, isActive },
  });
  return data;
};

export const getFranchiseGenericReports = async () => {
  const { data } = await axios({
    method: 'POST',
    url: '/franchiseUserRoleGroup/getFranchiseReports',
  });
  return data;
};
