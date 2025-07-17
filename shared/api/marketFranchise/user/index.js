import axios from '@shared/axios/common';

export const createMarketFranchiseUser = async requestBody => {
  const { data } = await axios({
    method: 'POST',
    url: '/franchiseUser/create',
    data: { ...requestBody },
  });
  return data;
};

export const getMarketFranchiseUserList = ({
  limit,
  offset,
  active,
  filter,
}) => axios({
  method: 'POST',
  url: '/franchiseUser/filter',
  data: { limit, offset, active, filter },
}).then(response => response.data);

export const getMarketFranchiseUserDetail = ({ userId }) => axios({
  method: 'GET',
  url: `/franchiseUser/detail?userId=${userId}`,
}).then(response => response.data);

export const updateMarketFranchiseUser = ({ userId, updateData }) => axios({
  method: 'PUT',
  url: '/franchiseUser/update',
  data: { userId, ...updateData },
}).then(response => response.data);

export const updateMarketFranchiseUserRoleGroups = ({ userId, roleGroups }) => axios({
  method: 'PUT',
  url: '/franchiseUser/updateRoleGroups',
  data: { userId, roleGroups },
}).then(response => response.data);

export const updateMarketFranchiseUserFranchise = ({ userId, franchise }) => axios({
  method: 'PUT',
  url: '/franchiseUser/updateFranchise',
  data: { userId, franchise },
}).then(response => response.data);

export const updateMarketFranchiseUserRole = ({ userId, roles }) => axios({
  method: 'PUT',
  url: '/franchiseUser/updateRoles',
  data: { userId, roles },
}).then(response => response.data);

export const updateMarketFranchiseUserReports = ({ userId, reports }) => axios({
  method: 'PUT',
  url: '/franchiseUser/updateReports',
  data: { userId, reports },
}).then(response => response.data);

export const exportFranchiseUsers = () => axios({
  method: 'GET',
  url: '/franchiseUser/export',
}).then(response => response.data);
