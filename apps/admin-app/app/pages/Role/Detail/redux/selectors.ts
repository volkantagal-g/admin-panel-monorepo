import { createSelector } from 'reselect';

import { REDUX_KEY } from '@shared/shared/constants';
import { State } from './reducer';

const reducerKey = REDUX_KEY.ROLE.DETAIL;

export const getRoleByIdSelector = {
  getData: (state: {[reduxKey: string]: State}) => state[reducerKey]?.getRoleById?.data,
  getIsPending: (state: {[reduxKey: string]: State}) => state[reducerKey]?.getRoleById?.isPending,
};

export const updateRoleSelector = {
  getData: (state: {[reduxKey: string]: State}) => state[reducerKey]?.updateRole?.data,
  getIsPending: (state: {[reduxKey: string]: State}) => state[reducerKey]?.updateRole?.isPending,
};

export const deleteRoleSelector = { getIsPending: (state: {[reduxKey: string]: State}) => state[reducerKey]?.deleteRole?.isPending };

export const getPageAndComponentPermissionsOfRoleSelector = {
  getData: createSelector(
    (state: {[reduxKey: string]: State}) => state[reducerKey]?.pageAndComponentPermissionsOfRole?.data,
    data => {
      return data.map(page => {
        const tempObj = { ...page };
        if (page.components.length > 0) {
          Object.assign(tempObj, page, { children: page.components });
        }
        return tempObj;
      });
    },
  ),
  getIsPending: (state: {[reduxKey: string]: State}) => state[reducerKey]?.pageAndComponentPermissionsOfRole?.isPending,
  getIsRequested: (state: {[reduxKey: string]: State}) => state[reducerKey]?.pageAndComponentPermissionsOfRole?.isRequested,

};

export const requestUserRoleSelector = {
  getData: (state: {[reduxKey: string]: State}) => state[reducerKey]?.requestUserRole?.data,
  getIsPending: (state: {[reduxKey: string]: State}) => state[reducerKey]?.requestUserRole?.isPending,
};

export const userRoleRequestsSelector = {
  getData: (state: {[reduxKey: string]: State}) => state[reducerKey]?.userRoleRequests?.data,
  getIsPending: (state: {[reduxKey: string]: State}) => state[reducerKey]?.userRoleRequests?.isPending,
};

export const reportTagsSelector = {
  getData: (state: {[reduxKey: string]: State}) => state[reducerKey]?.reportTagsByRoles?.data,
  getIsPending: (state: {[reduxKey: string]: State}) => state[reducerKey]?.reportTagsByRoles?.isPending,
  getIsRequested: (state: {[reduxKey: string]: State}) => state[reducerKey]?.reportTagsByRoles?.isRequested,
};

export const reportTagReportTypesMapSelector = { getData: (state: {[reduxKey: string]: State}) => state[reducerKey].reportTagReportTypesMap };

export const updateRoleMemberTypeSelector = {
  getData: (state: {[reduxKey: string]: State}) => state[reducerKey]?.updateRoleMemberType?.data,
  getIsPending: (state: {[reduxKey: string]: State}) => state[reducerKey]?.updateRoleMemberType?.isPending,
};

export const removeUsersFromRoleSelector = {
  getData: (state: {[reduxKey: string]: State}) => state[reducerKey]?.removeUsersFromRole?.data,
  getIsPending: (state: {[reduxKey: string]: State}) => state[reducerKey]?.removeUsersFromRole?.isPending,
};

export const roleHierchySelector = {
  getData: (state: {[reduxKey: string]: State}) => state[reducerKey]?.roleHierarchy?.data,
  getIsPending: (state: {[reduxKey: string]: State}) => state[reducerKey]?.roleHierarchy?.isPending,
};
