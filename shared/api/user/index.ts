import { CancelTokenSource } from 'axios';

import axios from '@shared/axios/common';

export const refreshLoggedInUser = async () => {
  const respData = await axios({
    method: 'POST',
    url: '/user/refreshLoggedInUser',
    data: {},
  });
  return respData;
};

export const getUsers = ({
  limit,
  offset,
  queryText,
  userIds,
  isActive,
  sortOptions,
}: {
  limit?: number,
  offset?: number,
  queryText?: string,
  userIds?: MongoIDType[],
  isActive?: boolean,
  sortOptions?: {[key: string]: number}
}): Promise<UserType[]> => {
  return axios({
    method: 'POST',
    url: '/user/getUsers',
    data: { limit, offset, queryText, userIds, isActive, sortOptions },
  }).then(response => {
    return response.data;
  });
};

export const getFilteredUsersForWebhelpMatching = async ({
  limit,
  offset,
  searchTerm,
  webhelpId,
}: { limit: number, offset: number, searchTerm: string, webhelpId: MongoIDType }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/user/getFilteredUsersForWebhelpMatching',
    data: { limit, offset, searchTerm, webhelpId },
  });

  return data;
};

export const getFilteredUsersWithRestrictedData = async ({
  limit,
  offset,
  searchVal,
  cancelSource,
}: { limit: number, offset: number, searchVal: string, cancelSource: CancelTokenSource }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/user/getFilteredUsersWithRestrictedData',
    data: { limit, offset, searchVal },
    cancelToken: cancelSource.token,
  });

  return data;
};

export const getUserById = ({ id }: { id: MongoIDType }): Promise<UserType> => {
  return axios({
    method: 'POST',
    url: '/user/getUser',
    data: { id },
  }).then(response => {
    return response.data;
  });
};

export const createUser = ({ body: data }: { body: Partial<UserType> }): Promise<UserType> => {
  return axios({
    method: 'POST',
    url: '/user/createUser',
    data,
  }).then(response => {
    return response.data;
  });
};

export const updateUser = ({ id, updateData }: { id: MongoIDType, updateData: Partial<Omit<UserType, '_id'>> }): Promise<UserType> => {
  return axios({
    method: 'POST',
    url: '/user/updateUser',
    data: { id, updateData },
  }).then(response => {
    return response.data;
  });
};

export const activateUser = ({ id }: { id: MongoIDType }): Promise<UserType> => {
  return axios({
    method: 'POST',
    url: '/user/activateUser',
    data: { id },
  }).then(response => {
    return response.data;
  });
};

export const inactivateUser = ({ id }: { id: MongoIDType }): Promise<UserType> => {
  return axios({
    method: 'POST',
    url: '/user/inactivateUser',
    data: { id },
  }).then(response => {
    return response.data;
  });
};

export const updateUsersWebhelpIdByEmails = async ({ updateData }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/user/updateUsersWebhelpIdByEmails',
    data: { updateData },
  });

  return data;
};

export const removeWebhelpIdFromUser = async ({ id }: { id: MongoIDType }): Promise<Partial<UserType>> => {
  const { data } = await axios({
    method: 'POST',
    url: '/user/removeWebhelpIdFromUser',
    data: { id },
  });

  return data;
};

export const removeRoleFromUserByRoleOwner = async ({ userId, roleId }: { userId: MongoIDType, roleId: MongoIDType }): Promise<UserType> => {
  const { data } = await axios({
    method: 'POST',
    url: '/user/removeRoleFromUserByRoleOwner',
    data: { userId, roleId },
  });

  return data;
};
// TODO: implement backend
export const removeRoleFromUsers = async ({ userIds, roleId }: { userIds: MongoIDType[], roleId: MongoIDType }): Promise<{ success: boolean }> => {
  const { data } = await axios({
    method: 'POST',
    url: '/user/removeRoleFromUsers',
    data: { userIds, roleId },
  });

  return data;
};

export const addRoleToUsersByRoleOwner = async ({ userIds, roleId, expiryDate }: { userIds: MongoIDType[], roleId: MongoIDType, expiryDate: Date }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/user/addRoleToUsersByRoleOwner',
    data: { userIds, roleId, expiryDate },
  });

  return data;
};

export const addRolesToUser = async ({ userId, roleIds }: { userId: MongoIDType, roleIds: MongoIDType[] }): Promise<UserType> => {
  const { data } = await axios({
    method: 'POST',
    url: '/user/addRolesToUser',
    data: { userId, roleIds },
  });

  return data;
};

export const removeRoleFromUser = async ({ userId, roleId }: { roleId: MongoIDType, userId: MongoIDType }): Promise<RoleType> => {
  const { data } = await axios({
    method: 'POST',
    url: '/user/removeRoleFromUser',
    data: { userId, roleId },
  });

  return data;
};

export const updateUserRoleMembership = async ({
  userId,
  roleId,
  memberType,
  expiryDate,
}: { roleId: MongoIDType, userId: MongoIDType, memberType: number, expiryDate: Date }): Promise<UserType> => {
  const { data } = await axios({
    method: 'POST',
    url: '/user/updateUserRoleMembership',
    data: { userId, roleId, memberType, expiryDate },
  });

  return data;
};

export const getUserRoles = async ({ userId }: { userId: MongoIDType }): Promise<RoleType[]> => {
  const { data } = await axios({
    method: 'POST',
    url: '/user/getUserRoles',
    data: { userId },
  });
  return data;
};

export const bulkInactivateExternalCustomerServicesAccounts = async ({ mailAddressList }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/user/bulkInactivateExternalCustomerServicesAccounts',
    data: { mailAddressList },
  });

  return data;
};

export const bulkCreateTeleperformanceUsers = async ({ users }: { users: Partial<UserType[]> }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/user/bulkCreateTeleperformanceUsers',
    data: { users },
  });

  return data;
};

export const bulkCreateConcentrixUsersTurkey = async ({ users }: { users: Partial<UserType[]> }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/user/bulkCreateConcentrixUsersTurkey',
    data: { users },
  });

  return data;
};

export const bulkCreateAssisttUsers = async ({ users }: { users: Partial<UserType[]> }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/user/bulkCreateAssisttUsers',
    data: { users },
  });

  return data;
};

export const getFavoritePages = async () => {
  const { data } = await axios({
    method: 'POST',
    url: '/user/getFavoritePages',
  });

  return data;
};

export const updateFavoritePages = async ({ favoritePages }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/user/updateFavoritePages',
    data: { favoritePages },
  });

  return data;
};
