import axios from '@shared/axios/common';

export const getRoles = ({ limit, offset, queryText, roleIds, populateOwners, isActive, sortOptions }: {
  limit: number,
  offset?: number,
  queryText?: string,
  roleIds?: string[],
  populateOwners: boolean,
  isActive?: boolean,
  sortOptions?: { [key: string]: number },
}): Promise<RoleType[]> => {
  return axios({
    method: 'POST',
    url: '/role/getRoles',
    data: {
      limit,
      offset,
      queryText,
      isActive,
      roleIds: roleIds?.length ? roleIds : undefined,
      populateOwners,
      sortOptions,
    },
  }).then(response => {
    return response.data;
  });
};

export const getRoleUsers = ({
  roleId,
  isActive,
  populateEmployeeInfo,
}: {
  roleId: MongoIDType,
  isActive: boolean,
  populateEmployeeInfo?: boolean
}): Promise<UserType[]> => {
  return axios({
    method: 'POST',
    url: '/role/getUsers',
    data: { roleId, isActive, populateEmployeeInfo },
  }).then(response => {
    return response.data;
  });
};

export const getRoleById = ({ id, isPopulateRoleOwners }: { id: MongoIDType, isPopulateRoleOwners: boolean }): Promise<RoleType> => {
  return axios({
    method: 'POST',
    url: '/role/getRole',
    data: { id, isPopulateRoleOwners },
  }).then(response => {
    return response.data;
  });
};

export const createRole = ({ body: data }: { body: Partial<RoleType> }): Promise<RoleType> => {
  return axios({
    method: 'POST',
    url: '/role/createRole',
    data,
  }).then(response => {
    return response.data;
  });
};

export const updateRole = ({
  id,
  updateData,
  deleteParent,
}: {
  id: MongoIDType,
  updateData: Partial<Omit<RoleType, '_id'>>,
  deleteParent: boolean
}): Promise<RoleType> => {
  return axios({
    method: 'POST',
    url: '/role/updateRole',
    data: { id, updateData, deleteParent },
  }).then(response => {
    return response.data;
  });
};

export const deleteRole = ({ id }: { id: MongoIDType }): Promise<RoleType> => {
  return axios({
    method: 'POST',
    url: '/role/deleteRole',
    data: { id },
  }).then(response => {
    return response.data;
  });
};

export const updatePermissionOfRole = async ({
  roleId,
  permKeys,
  countryIds,
  hasGlobalAccess,
}: {
  roleId: MongoIDType,
  permKeys: string[],
  countryIds: MongoIDType[],
  hasGlobalAccess: boolean
}): Promise<RoleType> => {
  const response = await axios({
    method: 'POST',
    url: '/role/updatePermissionOfRole',
    data: { roleId, permKeys, countryIds, hasGlobalAccess },
  });
  return response.data;
};

export const removePermissionOfRole = async ({ role, permKey }: { role: MongoIDType, permKey: string }): Promise<RoleType> => {
  const response = await axios({
    method: 'POST',
    url: '/role/removePermissionOfRole',
    data: { role, permKey },
  });
  return response.data;
};

export const updateRolePages = async ({
  roleId,
  permKeys,
  countryIds,
  hasGlobalAccess,
}: {
  roleId: MongoIDType,
  permKeys: string[],
  countryIds: string[],
  hasGlobalAccess: boolean
}) => {
  const response = await axios({
    method: 'POST',
    url: '/role/updateRolePages',
    data: { roleId, permKeys, countryIds, hasGlobalAccess },
  });
  return response.data;
};

export const addPageToRolesByPageOwner = ({
  roleIds,
  countryIds,
  pageId,
  componentAccess,
  hasGlobalAccess,
}: {
  roleIds: MongoIDType[],
  countryIds: MongoIDType[],
  pageId: MongoIDType,
  componentAccess: ComponentType[],
  hasGlobalAccess: boolean,
}) => {
  return axios({
    method: 'POST',
    url: '/role/addPageToRolesByPageOwner',
    data: {
      roleIds,
      countryIds,
      pageId,
      componentAccess,
      hasGlobalAccess,
    },
  }).then(response => {
    return response.data;
  });
};

export const addComponentToRolesByPageOwner = ({
  roleIds,
  countryIds,
  componentId,
  pageId,
  hasGlobalAccess,
}: {
  roleIds: MongoIDType[],
  countryIds: MongoIDType[],
  componentId: MongoIDType,
  pageId: MongoIDType,
  hasGlobalAccess: boolean,
}) => {
  return axios({
    method: 'POST',
    url: '/role/addComponentToRolesByPageOwner',
    data: {
      roleIds,
      countryIds,
      pageId,
      componentId,
      hasGlobalAccess,
    },
  }).then(response => {
    return response.data;
  });
};

export const removePageFromRoleByPageOwner = ({
  role,
  componentId,
  pageId,
}: {
  role: RoleType,
  componentId: MongoIDType,
  pageId: MongoIDType
}) => {
  return axios({
    method: 'POST',
    url: '/role/removePageFromRoleByPageOwner',
    data: { role, componentId, pageId },
  }).then(response => {
    return response.data;
  });
};

export const updatePageCountriesOfRoleByPageOwner = ({
  role,
  countries,
  componentAccess,
  pageId,
  hasGlobalAccess,
}: {
  role: RoleType,
  countries: ICountry[],
  componentAccess: ComponentType[],
  pageId: MongoIDType,
  hasGlobalAccess: boolean,
}) => {
  return axios({
    method: 'POST',
    url: '/role/updatePageCountriesOfRoleByPageOwner',
    data: { role, countryIds: countries, componentAccess, pageId, hasGlobalAccess },
  }).then(response => {
    return response.data;
  });
};

export const updateComponentCountriesOfRoleByPageOwner = ({
  role,
  countries,
  componentId,
  pageId,
  hasGlobalAccess,
}: {
  role: RoleType,
  countries: ICountry[],
  componentId: MongoIDType[],
  pageId: MongoIDType,
  hasGlobalAccess: boolean,
}) => {
  return axios({
    method: 'POST',
    url: '/role/updateComponentCountriesOfRoleByPageOwner',
    data: { role, countryIds: countries, componentId, pageId, hasGlobalAccess },
  }).then(response => {
    return response.data;
  });
};

export const getUserOwnedRoles = async ({ userId }: { userId: MongoIDType }) => {
  const response = await axios({
    method: 'POST',
    url: '/role/getUserOwnedRoles',
    data: { userId },
  });
  return response.data;
};

export const getRolesOfTeammates = async ({ limit, offset, queryText, isActive, sortOptions }: {
  limit: number,
  offset: number,
  queryText: string,
  isActive: boolean,
  sortOptions?: { [key: string]: number },
}): Promise<RoleType[]> => {
  const response = await axios({
    method: 'POST',
    url: '/role/getRolesOfTeammates',
    data: { limit, offset, queryText, isActive, sortOptions },
  });
  return response.data;
};

export const getRoleHierarchy = async (params: { id: MongoIDType }): Promise<RoleType> => {
  const response = await axios({
    method: 'POST',
    url: '/role/getRoleHierarchy',
    data: params,
  });
  return response.data;
};
