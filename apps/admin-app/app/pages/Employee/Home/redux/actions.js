import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.EMPLOYEE.HOME}_`;

export const { Types, Creators } = createActions({
  setPermitsForCalendarFormData: { data: {} },
  getPermitsForCalendarRequest: {},
  getPermitsForCalendarSuccess: { data: [] },
  getPermitsForCalendarFailure: { error: null },

  getPermitRequestsForSupervisorRequest: { filters: {}, limit: null, nextPageCursor: null, previousPageCursor: null },
  getPermitRequestsForSupervisorSuccess: { data: [], nextPageCursor: null, previousPageCursor: null },
  getPermitRequestsForSupervisorFailure: { error: null },

  setPaginationForPermitRequestsForSupervisor: { pagination: {} },
  setFiltersForPermitRequestsForSupervisor: { filters: {} },
  resetFiltersForPermitRequestsForSupervisor: {},

  setFiltersForPermitHistory: { filters: {} },
  resetFiltersForPermitHistory: {},

  newPermitRequestRequest: { permit: {} },
  newPermitRequestSuccess: { isCreateSucceeded: [] },
  newPermitRequestFailure: { error: null },

  getPermitHistoryRequest: { filters: {}, limit: null, nextPageCursor: null, previousPageCursor: null },
  getPermitHistorySuccess: { data: [], nextPageCursor: null, previousPageCursor: null },
  getPermitHistoryFailure: { error: null },

  setPaginationForPermitHistory: { pagination: {} },

  getUsedAndVestedPermitCountsRequest: {},
  getUsedAndVestedPermitCountsSuccess: { data: {} },
  getUsedAndVestedPermitCountsFailure: { error: null },

  getUploadDocumentURLRequest: { file: null, callback: null },
  getUploadDocumentURLSuccess: { data: null },
  getUploadDocumentURLFailure: { error: null },
  resetUploadDocumentURL: {},
  setUploadDocumentFile: { file: null },

  getEmployeesOfManagerRequest: { employeeId: null },
  getEmployeesOfManagerSuccess: { data: [] },
  getEmployeesOfManagerFailure: { error: null },

  getPermitInfoOfManagersTeamRequest: { },
  getPermitInfoOfManagersTeamSuccess: { data: [] },
  getPermitInfoOfManagersTeamFailure: { error: null },

  approvePermitRequest: { permitId: null },
  rejectPermitRequest: { permitId: null },
  cancelRequestedPermitRequest: { permitId: null },
  cancelPermitRequest: { permitId: null },

  actionButtonSuccess: {},
  actionButtonFailure: {},
  resetActionButton: {},

  initPage: null,
  destroyPage: null,
}, { prefix });
