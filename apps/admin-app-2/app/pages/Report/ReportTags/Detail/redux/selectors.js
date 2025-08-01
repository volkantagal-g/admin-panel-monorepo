import { createSelector } from 'reselect';

import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.REPORTS.REPORT_TAGS_DETAIL;

export const getFormMode = createSelector(
  state => state[reducerKey],
  state => state.formMode,
);

export const getReportTag = {
  getData: createSelector(
    state => state[reducerKey],
    state => state.reportTag.data,
  ),
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state.reportTag.isPending,
  ),
};

export const getReportTagUpate = {
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state.updateReportTag.isPending,
  ),
};

export const getAddRolesToReportTag = {
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state.addRoles.isPending,
  ),
};

export const getRolesForTheReportTag = {
  getData: createSelector(
    state => state[reducerKey],
    state => state.reportTagRoleIds.data,
  ),
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state.reportTagRoleIds.isPending,
  ),
};

export const getRolesDetails = {
  getData: createSelector(
    state => state[reducerKey],
    state => state.reportTagRoles.data,
  ),
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state.reportTagRoles.isPending,
  ),
};

export const getRemoveRoleFromReportTag = {
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state.removeRole.isPending,
  ),
};

export const getReportTypes = {
  getData: state => state[reducerKey].reportTypes.data,
  getIsPending: state => state[reducerKey].reportTypes.isPending,
};
