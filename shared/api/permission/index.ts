import axios from '@shared/axios/common';

export const getMyPermissions = () => {
  return axios({
    method: 'POST',
    url: '/permission/getMyPermissions',
  }).then(response => {
    return response.data;
  });
};

export const getRolePermissions = ({ roleId: role }: { roleId: MongoIDType }) => {
  return axios({
    method: 'POST',
    url: '/permission/getRolePermissions',
    data: { role },
  }).then(response => {
    return response.data;
  });
};

export const getUserTotalPermissions = async ({ userId }: { userId: MongoIDType }): Promise<PageType> => {
  const { data } = await axios({
    method: 'POST',
    url: '/permission/getUserTotalPermissions',
    data: { userId },
  });

  return data;
};

export const getPageAndComponentPermissionsOfRole = async ({ roleId: role }: { roleId: MongoIDType }): Promise<PageType[]> => {
  const { data = [] } = await axios({
    method: 'POST',
    url: '/permission/getPageAndComponentPermissionsByRole',
    data: { role },
  });

  return data;
};

export const getPermittedRolesByPermKey = async ({ permKey, populateRoleOwners }: { permKey: string, populateRoleOwners: boolean }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/permission/getPermittedRolesByPermKey',
    data: {
      permKey,
      populateRoleOwners,
    },
  });

  return data;
};
