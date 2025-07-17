import { createSelector } from 'reselect';

import { REDUX_KEY } from '@shared/shared/constants';
import { State } from './reducer';

const reducerKey = REDUX_KEY.ROLE.LIST;

export const userRoleRequestsSelector = {
  getData: createSelector(
    (state: {[reduxKey: string]: State}) => state[reducerKey].userRoleRequests,
    ({ data }) => data,
  ),
  getIsPending: createSelector(
    (state: {[reduxKey: string]: State}) => state[reducerKey].userRoleRequests,
    ({ isPending }) => isPending,
  ),
};

export const roleRequestsForApprovalByRoleOwnerSelector = {
  getData: createSelector(
    (state: {[reduxKey: string]: State}) => state[reducerKey].roleRequestsForApprovalByRoleOwner,
    ({ data }) => data,
  ),
  getIsPending: createSelector(
    (state: {[reduxKey: string]: State}) => state[reducerKey].roleRequestsForApprovalByRoleOwner,
    ({ isPending }) => isPending,
  ),
};

export const roleRequestByIdSelector = {
  getData: createSelector(
    (state: {[reduxKey: string]: State}) => state[reducerKey].roleRequestById,
    ({ data }) => data,
  ),
  getIsPending: createSelector(
    (state: {[reduxKey: string]: State}) => state[reducerKey].roleRequestById,
    ({ isPending }) => isPending,
  ),
};

export const extendedUserInfoSelector = {
  getData: createSelector(
    (state: {[reduxKey: string]: State}) => state[reducerKey].extendedUserInfo,
    ({ data }) => data,
  ),
  getIsPending: createSelector(
    (state: {[reduxKey: string]: State}) => state[reducerKey].extendedUserInfo,
    ({ isPending }) => isPending,
  ),
};

export const teammateRolesSelector = {
  getData: createSelector(
    (state: {[reduxKey: string]: State}) => state[reducerKey].teammateRoles,
    ({ data }) => data,
  ),
  getIsPending: createSelector(
    (state: {[reduxKey: string]: State}) => state[reducerKey].teammateRoles,
    ({ isPending }) => isPending,
  ),
};
