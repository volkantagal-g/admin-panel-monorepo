import { createSelector } from 'reselect';

import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.USER.DETAIL;

export const getUserByIdSelector = {
  getData: state => state[reducerKey]?.getUserById?.data,
  getIsPending: state => state[reducerKey]?.getUserById?.isPending,
};

export const updateUserSelector = {
  getData: state => state[reducerKey]?.updateUser?.data,
  getIsPending: state => state[reducerKey]?.updateUser?.isPending,
};

export const activateUserSelector = {
  getData: state => state[reducerKey]?.activateUser?.data,
  getIsPending: state => state[reducerKey]?.activateUser?.isPending,
};

export const inActivateUserSelector = {
  getData: state => state[reducerKey]?.inActivateUser?.data,
  getIsPending: state => state[reducerKey]?.inActivateUser?.isPending,
};

export const addRolesToUserSelector = {
  getData: state => state[reducerKey]?.addRolesToUser?.data,
  getIsPending: state => state[reducerKey]?.addRolesToUser?.isPending,
};

export const updateRoleMemberTypeSelector = {
  getData: state => state[reducerKey]?.updateRoleMemberType?.data,
  getIsPending: state => state[reducerKey]?.updateRoleMemberType?.isPending,
};

export const deleteRoleMembershipSelector = {
  getData: state => state[reducerKey]?.deleteRoleMembership?.data,
  getIsPending: state => state[reducerKey]?.deleteRoleMembership?.isPending,
};

export const getUserTotalPermissionsSelector = {
  getData: state => state[reducerKey]?.userTotalPermissions?.data,
  getIsPending: state => state[reducerKey]?.userTotalPermissions?.isPending,
};

export const getMyPermissionsByPermKeySelector = createSelector(getUserTotalPermissionsSelector.getData, permissions => {
  const permissionsByPermKey = {};
  (permissions || []).forEach(permission => {
    if (permissionsByPermKey[permission.permKey]) {
      // add it to the array
      permissionsByPermKey[permission.permKey].push(permission);
    }
    else {
      permissionsByPermKey[permission.permKey] = [permission];
    }
  });
  return permissionsByPermKey;
});
