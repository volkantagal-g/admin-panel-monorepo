import { createReducer } from 'reduxsauce';
import moment from 'moment';

import { Types } from './actions';

export const INITIAL_STATE = {
  isPageInitialized: false,
  permitsForCalendarFormData: {
    selectedMonth: moment().startOf('month'),
    validRanges: [moment().startOf('month'), moment().endOf('month')],
    selectedDepartment: {},
    selectedSupervisor: '',
    selectedEmployee: '',
    selectedTopManager: '',
  },
  permitsForCalendar: {
    isPending: false,
    data: [],
  },
  getPermitRequestsForSupervisor: {
    isPending: false,
    data: [],
    filters: {},
    pagination: {
      previousPageCursor: undefined,
      nextPageCursor: undefined,
      limit: 10,
    },
  },
  newPermitRequest: {
    isPending: false,
    isCreateSucceeded: false,
  },
  getPermitHistory: {
    data: [],
    isPending: false,
    filters: {},
    pagination: {
      previousPageCursor: undefined,
      nextPageCursor: undefined,
      limit: 10,
    },
  },
  uploadDocumentUrl: {
    isPending: false,
    data: null,
  },
  employeesForManager: {
    isPending: false,
    data: null,
  },
  actionButtonResult: {
    isSucceeded: false,
    isPending: false,
  },
  getUsedAndVestedPermitCounts: {
    data: {
      vested: 0,
      used: 0,
      shouldShowVestedDays: false,
    },
    isPending: false,
  },
  permitInfoOfManagersTeam: {
    data: null,
    isPending: false,
  },
};

const getPermitsForCalendarRequest = state => ({
  ...state,
  permitsForCalendar: {
    ...state.permitsForCalendar,
    isPending: true,
    data: [],
  },
});

const getPermitsForCalendarSuccess = (state, { data }) => ({
  ...state,
  permitsForCalendar: {
    ...state.permitsForCalendar,
    data,
    isPending: false,
  },
});

const getPermitsForCalendarFailure = state => ({
  ...state,
  permitsForCalendar: {
    ...state.permitsForCalendar,
    isPending: false,
  },
});

export const setPermitsForCalendarFormData = (state, { data }) => {
  return {
    ...state,
    permitsForCalendarFormData: { ...state.permitsForCalendarFormData, ...data },
  };
};

const getPermitRequestsForSupervisorRequest = state => ({
  ...state,
  getPermitRequestsForSupervisor: {
    ...state.getPermitRequestsForSupervisor,
    isPending: true,
    data: [],
  },
});

const getPermitRequestsForSupervisorSuccess = (state, { data, nextPageCursor, previousPageCursor }) => ({
  ...state,
  getPermitRequestsForSupervisor: {
    ...state.getPermitRequestsForSupervisor,
    data,
    pagination: {
      ...state.getPermitRequestsForSupervisor.pagination,
      nextPageCursor,
      previousPageCursor,
    },
    isPending: false,
  },
});

const getPermitRequestsForSupervisorFailure = state => ({
  ...state,
  getPermitRequestsForSupervisor: {
    ...state.getPermitRequestsForSupervisor,
    isPending: false,
  },
});

export const setPaginationForPermitRequestsForSupervisor = (state, { pagination }) => {
  return {
    ...state,
    getPermitRequestsForSupervisor: {
      ...state.getPermitRequestsForSupervisor,
      isPending: false,
      pagination: {
        ...state.getPermitRequestsForSupervisor.pagination,
        ...pagination,
      },
    },
  };
};

export const setFiltersForPermitRequestsForSupervisor = (state, { filters }) => {
  return {
    ...state,
    getPermitRequestsForSupervisor: {
      ...state.getPermitRequestsForSupervisor,
      isPending: false,
      filters: {
        ...state.getPermitRequestsForSupervisor.filters,
        ...filters,
      },
      pagination: {
        ...state.getPermitRequestsForSupervisor.pagination,
        previousPageCursor: undefined,
        nextPageCursor: undefined,
      },
    },
  };
};

export const resetFiltersForPermitRequestsForSupervisor = state => {
  return {
    ...state,
    getPermitRequestsForSupervisor: {
      ...state.getPermitRequestsForSupervisor,
      isPending: false,
      filters: {},
    },
  };
};

const newPermitRequestRequest = state => ({
  ...state,
  newPermitRequest: {
    ...state.newPermitRequest,
    isPending: true,
    isCreateSucceeded: false,
  },
});

const newPermitRequestSuccess = state => ({
  ...state,
  newPermitRequest: {
    ...state.newPermitRequest,
    isCreateSucceeded: true,
    isPending: false,
  },
});

const newPermitRequestFailure = state => ({
  ...state,
  newPermitRequest: {
    ...state.newPermitRequest,
    isPending: false,
    isCreateSucceeded: false,
  },
});

export const getPermitHistoryRequest = state => {
  return {
    ...state,
    getPermitHistory: {
      ...state.getPermitHistory,
      isPending: true,
    },
  };
};

export const getPermitHistorySuccess = (state, { data, nextPageCursor, previousPageCursor }) => {
  return {
    ...state,
    getPermitHistory: {
      ...state.getPermitHistory,
      data,
      pagination: {
        ...state.getPermitHistory.pagination,
        nextPageCursor,
        previousPageCursor,
      },
      isPending: false,
    },
  };
};

export const getPermitHistoryFailure = state => {
  return {
    ...state,
    getPermitHistory: {
      ...state.getPermitHistory,
      data: [],
      isPending: false,
    },
  };
};

export const setPaginationForPermitHistory = (state, { pagination }) => {
  return {
    ...state,
    getPermitHistory: {
      ...state.getPermitHistory,
      pagination: {
        ...state.getPermitHistory.pagination,
        ...pagination,
      },
      isPending: false,
    },
  };
};

export const setFiltersForPermitHistory = (state, { filters }) => {
  return {
    ...state,
    getPermitHistory: {
      ...state.getPermitHistory,
      isPending: false,
      filters: {
        ...state.getPermitHistory.filters,
        ...filters,
      },
      pagination: {
        ...state.getPermitHistory.pagination,
        previousPageCursor: undefined,
        nextPageCursor: undefined,
      },
    },
  };
};

export const resetFiltersForPermitHistory = state => {
  return {
    ...state,
    getPermitHistory: {
      ...state.getPermitHistory,
      isPending: false,
      filters: {},
    },
  };
};

const getUploadDocumentURLRequest = state => ({
  ...state,
  uploadDocumentUrl: {
    ...state.uploadDocumentUrl,
    isPending: true,
  },
});

const getUploadDocumentURLSuccess = (state, { data }) => ({
  ...state,
  uploadDocumentUrl: {
    ...state.uploadDocumentUrl,
    isPending: false,
    data,
  },
});

const getUploadDocumentURLFailure = state => ({
  ...state,
  uploadDocumentUrl: {
    ...state.uploadDocumentUrl,
    isPending: false,
  },
});

const resetUploadDocumentURL = state => ({
  ...state,
  uploadDocumentUrl: {
    isPending: false,
    data: null,
    file: null,
  },
});

const setUploadDocumentFile = (state, { file }) => ({
  ...state,
  uploadDocumentUrl: {
    isPending: false,
    data: null,
    file,
  },
});

const employeesOfManagerRequest = state => ({
  ...state,
  employeesForManager: {
    ...state.permitsForCalendar,
    isPending: true,
    data: [],
  },
});
const employeesOfManagerSuccess = (state, { data }) => ({
  ...state,
  employeesForManager: {
    ...state.employeesForManager,
    isPending: false,
    data,
  },
});
const employeesOfManagerFailure = state => ({
  ...state,
  employeesForManager: {
    ...state.employeesForManager,
    isPending: false,
  },
});

export const actionButtonResultRequest = state => {
  return {
    ...state,
    actionButtonResult: {
      ...state.actionButtonResult,
      isPending: true,
    },
  };
};

export const actionButtonResultSuccess = state => {
  return {
    ...state,
    actionButtonResult: {
      ...state.actionButtonResult,
      isSucceeded: true,
      isPending: false,
    },
  };
};

export const actionButtonResultFailure = state => {
  return {
    ...state,
    actionButtonResult: {
      ...state.actionButtonResult,
      isPending: false,
    },
  };
};

export const resetActionButton = state => {
  return {
    ...state,
    actionButtonResult: { ...INITIAL_STATE.actionButtonResult },
  };
};

export const getUsedAndVestedPermitCountsRequest = state => {
  return {
    ...state,
    getUsedAndVestedPermitCounts: {
      ...state.getUsedAndVestedPermitCounts,
      isPending: true,
    },
  };
};

export const getUsedAndVestedPermitCountsSuccess = (state, { data }) => {
  return {
    ...state,
    getUsedAndVestedPermitCounts: {
      ...state.getUsedAndVestedPermitCounts,
      data,
      isPending: false,
    },
  };
};

export const getUsedAndVestedPermitCountsFailure = state => {
  return {
    ...state,
    getUsedAndVestedPermitCounts: {
      ...state.getUsedAndVestedPermitCounts,
      data: {},
      isPending: false,
    },
  };
};

export const getPermitInfoOfManagersTeamRequest = state => {
  return {
    ...state,
    permitInfoOfManagersTeam: {
      ...state.permitInfoOfManagersTeam,
      isPending: true,
    },
  };
};

export const getPermitInfoOfManagersTeamSuccess = (state, { data }) => {
  return {
    ...state,
    permitInfoOfManagersTeam: {
      isPending: false,
      data,
    },
  };
};

export const getPermitInfoOfManagersTeamFailure = state => {
  return {
    ...state,
    permitInfoOfManagersTeam: {
      isPending: false,
      data: null,
    },
  };
};

const initPage = state => ({
  ...state,
  isPageInitialized: true,
});
const destroyPage = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.GET_PERMITS_FOR_CALENDAR_REQUEST]: getPermitsForCalendarRequest,
  [Types.GET_PERMITS_FOR_CALENDAR_SUCCESS]: getPermitsForCalendarSuccess,
  [Types.GET_PERMITS_FOR_CALENDAR_FAILURE]: getPermitsForCalendarFailure,
  [Types.SET_PERMITS_FOR_CALENDAR_FORM_DATA]: setPermitsForCalendarFormData,
  [Types.GET_PERMIT_REQUESTS_FOR_SUPERVISOR_REQUEST]: getPermitRequestsForSupervisorRequest,
  [Types.GET_PERMIT_REQUESTS_FOR_SUPERVISOR_SUCCESS]: getPermitRequestsForSupervisorSuccess,
  [Types.GET_PERMIT_REQUESTS_FOR_SUPERVISOR_FAILURE]: getPermitRequestsForSupervisorFailure,
  [Types.SET_PAGINATION_FOR_PERMIT_REQUESTS_FOR_SUPERVISOR]: setPaginationForPermitRequestsForSupervisor,
  [Types.SET_FILTERS_FOR_PERMIT_REQUESTS_FOR_SUPERVISOR]: setFiltersForPermitRequestsForSupervisor,
  [Types.RESET_FILTERS_FOR_PERMIT_REQUESTS_FOR_SUPERVISOR]: resetFiltersForPermitRequestsForSupervisor,
  [Types.SET_FILTERS_FOR_PERMIT_HISTORY]: setFiltersForPermitHistory,
  [Types.RESET_FILTERS_FOR_PERMIT_HISTORY]: resetFiltersForPermitHistory,
  [Types.NEW_PERMIT_REQUEST_REQUEST]: newPermitRequestRequest,
  [Types.NEW_PERMIT_REQUEST_SUCCESS]: newPermitRequestSuccess,
  [Types.NEW_PERMIT_REQUEST_FAILURE]: newPermitRequestFailure,
  [Types.GET_PERMIT_HISTORY_REQUEST]: getPermitHistoryRequest,
  [Types.GET_PERMIT_HISTORY_SUCCESS]: getPermitHistorySuccess,
  [Types.GET_PERMIT_HISTORY_FAILURE]: getPermitHistoryFailure,
  [Types.SET_PAGINATION_FOR_PERMIT_HISTORY]: setPaginationForPermitHistory,
  [Types.GET_UPLOAD_DOCUMENT_URL_REQUEST]: getUploadDocumentURLRequest,
  [Types.GET_UPLOAD_DOCUMENT_URL_SUCCESS]: getUploadDocumentURLSuccess,
  [Types.GET_UPLOAD_DOCUMENT_URL_FAILURE]: getUploadDocumentURLFailure,
  [Types.RESET_UPLOAD_DOCUMENT_URL]: resetUploadDocumentURL,
  [Types.SET_UPLOAD_DOCUMENT_FILE]: setUploadDocumentFile,
  [Types.GET_EMPLOYEES_OF_MANAGER_REQUEST]: employeesOfManagerRequest,
  [Types.GET_EMPLOYEES_OF_MANAGER_SUCCESS]: employeesOfManagerSuccess,
  [Types.GET_EMPLOYEES_OF_MANAGER_FAILURE]: employeesOfManagerFailure,
  [Types.APPROVE_PERMIT_REQUEST]: actionButtonResultRequest,
  [Types.REJECT_PERMIT_REQUEST]: actionButtonResultRequest,
  [Types.CANCEL_PERMIT_REQUEST]: actionButtonResultRequest,
  [Types.CANCEL_REQUESTED_PERMIT_REQUEST]: actionButtonResultRequest,
  [Types.ACTION_BUTTON_SUCCESS]: actionButtonResultSuccess,
  [Types.ACTION_BUTTON_FAILURE]: actionButtonResultFailure,
  [Types.RESET_ACTION_BUTTON]: resetActionButton,
  [Types.GET_USED_AND_VESTED_PERMIT_COUNTS_REQUEST]: getUsedAndVestedPermitCountsRequest,
  [Types.GET_USED_AND_VESTED_PERMIT_COUNTS_SUCCESS]: getUsedAndVestedPermitCountsSuccess,
  [Types.GET_USED_AND_VESTED_PERMIT_COUNTS_FAILURE]: getUsedAndVestedPermitCountsFailure,
  [Types.GET_PERMIT_INFO_OF_MANAGERS_TEAM_REQUEST]: getPermitInfoOfManagersTeamRequest,
  [Types.GET_PERMIT_INFO_OF_MANAGERS_TEAM_SUCCESS]: getPermitInfoOfManagersTeamSuccess,
  [Types.GET_PERMIT_INFO_OF_MANAGERS_TEAM_FAILURE]: getPermitInfoOfManagersTeamFailure,
  [Types.INIT_PAGE]: initPage,
  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
