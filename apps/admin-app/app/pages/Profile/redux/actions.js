import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  getActiveSessionsRequest: null,
  getActiveSessionsSuccess: { activeSessions: [] },
  getActiveSessionsFailure: { error: null },
  getEmployeeAssetsForProfileRequest: null,
  getEmployeeAssetsForProfileSuccess: { employeeAssets: [] },
  getEmployeeAssetsForProfileFailure: { error: null },

  getEmployeeVehiclesForProfileRequest: { limit: null, offset: null },
  getEmployeeVehiclesForProfileSuccess: { employeeVehicles: [], count: 0 },
  getEmployeeVehiclesForProfileFailure: {},

  getEmployeeDetailsForProfileRequest: null,
  getEmployeeDetailsForProfileSuccess: { employeeDetail: {} },
  getEmployeeDetailsForProfileFailure: { error: null },

  updateContactInfoRequest: { values: undefined, onSuccess: undefined },
  updateContactInfoSuccess: { data: null },
  updateContactInfoFailure: { error: null },

  addEducationRequest: { values: undefined, onSuccess: undefined },
  addEducationSuccess: { data: null },
  addEducationFailure: { error: null },
  removeEducationRequest: { educationId: undefined },
  removeEducationSuccess: { data: null },
  removeEducationFailure: { error: null },
  updateEducationRequest: { values: undefined, educationId: undefined, onSuccess: undefined },
  updateEducationSuccess: { data: null },
  updateEducationFailure: { error: null },
  getEmployeeEducationsRequest: {},
  getEmployeeEducationsSuccess: { data: null },
  getEmployeeEducationsFailure: { error: null },

  getPermitHistoryRequest: { filters: {}, limit: null, nextPageCursor: null, previousPageCursor: null },
  getPermitHistorySuccess: { data: [], nextPageCursor: null, previousPageCursor: null },
  getPermitHistoryFailure: { error: null },

  actionButtonSuccess: {},
  actionButtonFailure: {},
  resetActionButton: {},

  approvePermitRequest: { permitId: null },
  rejectPermitRequest: { permitId: null },
  cancelRequestedPermitRequest: { permitId: null },
  cancelPermitRequest: { permitId: null },

  getUsedAndVestedPermitCountsRequest: {},
  getUsedAndVestedPermitCountsSuccess: { data: {} },
  getUsedAndVestedPermitCountsFailure: { error: null },

  getPermitRequestsForSupervisorRequest: { filters: {}, limit: null, nextPageCursor: null, previousPageCursor: null },
  getPermitRequestsForSupervisorSuccess: { data: [], nextPageCursor: null, previousPageCursor: null },
  getPermitRequestsForSupervisorFailure: { error: null },

  setPaginationForPermitRequestsForSupervisor: { pagination: {} },
  setFiltersForPermitRequestsForSupervisor: { filters: {} },
  resetFiltersForPermitRequestsForSupervisor: {},

  getEmployeesOfManagerRequest: { employeeId: null },
  getEmployeesOfManagerSuccess: { data: [] },
  getEmployeesOfManagerFailure: { error: null },

  getPermitInfoOfManagersTeamRequest: { },
  getPermitInfoOfManagersTeamSuccess: { data: [] },
  getPermitInfoOfManagersTeamFailure: { error: null },

  setFiltersForPermitHistory: { filters: {} },
  resetFiltersForPermitHistory: {},

  setPaginationForPermitHistory: { pagination: {} },

  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.PROFILE}_` });
