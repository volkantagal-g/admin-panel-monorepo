import axios from '@shared/axios/common';

export const getMarketFranchiseUserRoleList = async ({ limit, offset, key }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/franchiseRole/list',
    data: { limit, offset, key },
  });
  return data;
};

export const createMarketFranchiseUserRole = async ({ key, descriptions, permissions }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/franchiseRole/create',
    data: { key, descriptions, permissions },
  });
  return data;
};

export const getMarketFranchiseUserRoleDetail = async ({ id }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/franchiseRole/detail',
    params: { id },
  });
  return data;
};

export const updateMarketFranchiseUserRole = async ({ data: body, id }) => {
  const { data } = await axios({
    method: 'POST',
    url: `/franchiseRole/update?id=${id}`,
    data: body,
  });
  return data;
};

export const getMarketFranchiseUserRoleListAll = async () => {
  const { data } = await axios({
    method: 'POST',
    url: '/franchiseRole/listAll',
  });
  return data;
};
