import { createReducer } from 'reduxsauce';

import { Types } from './actions';
import { resetActionButton, setPaginationForPermitHistory } from '@app/pages/Employee/Home/redux/reducer';

export const INITIAL_STATE = {
  panelUserEmployeeSummary: {
    data: {},
    isPending: false,
    error: null,
  },
  employeeAssets: {
    data: [],
    isPending: false,
    error: null,
  },
  employeeVehicles: {
    data: [],
    isPending: false,
    count: 0,
  },
  activeSessions: {
    data: [],
    isPending: false,
    error: null,
  },
  employeeDetail: {
    data: {},
    isPending: false,
  },
  educations: {
    data: [],
    isPending: false,
  },
  addEducation: { isPending: false },
  removeEducation: { isPending: false },
  updateEducation: { isPending: false },
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
  employeesForManager: {
    isPending: false,
    data: null,
  },
  permitInfoOfManagersTeam: {
    data: null,
    isPending: false,
  },
};

const getActiveSessions = {
  request: (state = INITIAL_STATE) => ({
    ...state,
    activeSessions: {
      ...state.activeSessions,
      isPending: true,
    },
  }),
  success: (state = INITIAL_STATE, { activeSessions = [] }) => ({
    ...state,
    activeSessions: {
      ...state.activeSessions,
      data: activeSessions,
      isPending: false,
    },
  }),
  failure: (state = INITIAL_STATE, { error }) => ({
    ...state,
    activeSessions: {
      ...state.activeSessions,
      isPending: false,
      error,
    },
  }),
};

const getEmployeeAssetsForProfile = {
  request: state => ({
    ...state,
    employeeAssets: {
      ...state.employeeAssets,
      isPending: true,
    },
  }),
  success: (state, { employeeAssets }) => ({
    ...state,
    employeeAssets: {
      ...state.employeeAssets,
      isPending: false,
      data: employeeAssets,
    },
  }),
  failure: (state, { error }) => ({
    ...state,
    employeeAssets: {
      ...state.employeeAssets,
      isPending: false,
      error,
    },
  }),
};

const getEmployeeVehiclesForProfile = {
  request: state => ({
    ...state,
    employeeVehicles: {
      ...state.employeeVehicles,
      isPending: true,
      count: 0,
    },
  }),
  success: (state, { employeeVehicles, count }) => ({
    ...state,
    employeeVehicles: {
      ...state.employeeVehicles,
      isPending: false,
      data: employeeVehicles,
      count,
    },
  }),
  failure: (state, { error }) => ({
    ...state,
    employeeVehicles: {
      ...state.employeeVehicles,
      isPending: false,
      error,
      count: 0,
    },
  }),
};

const getEmployeeDetailsForProfile = {
  request: state => ({
    ...state,
    employeeDetail: {
      ...state.employeeDetail,
      isPending: true,
    },
  }),
  success: (state, { employeeDetail }) => ({
    ...state,
    employeeDetail: {
      ...state.employeeDetail,
      isPending: false,
      data: employeeDetail,
    },
  }),
  failure: state => ({
    ...state,
    employeeDetail: {
      ...state.employeeDetail,
      isPending: false,
    },
  }),
};

const getEmployeeEducations = {
  request: state => ({
    ...state,
    educations: {
      ...state.educations,
      isPending: true,
    },
  }),
  success: (state, { data }) => ({
    ...state,
    educations: {
      ...state.educations,
      isPending: false,
      data,
    },
  }),
  failure: state => ({
    ...state,
    educations: {
      ...state.educations,
      isPending: false,
    },
  }),
};

const addEducation = {
  request: state => ({
    ...state,
    addEducation: {
      ...state.addEducation,
      isPending: true,
    },
  }),
  success: state => ({
    ...state,
    addEducation: {
      ...state.addEducation,
      isPending: false,
    },
  }),
  failure: state => ({
    ...state,
    addEducation: {
      ...state.addEducation,
      isPending: false,
    },
  }),
};

const removeEducation = {
  request: state => ({
    ...state,
    removeEducation: {
      ...state.removeEducation,
      isPending: true,
    },
  }),
  success: state => ({
    ...state,
    removeEducation: {
      ...state.removeEducation,
      isPending: false,
    },
  }),
  failure: state => ({
    ...state,
    removeEducation: {
      ...state.removeEducation,
      isPending: false,
    },
  }),
};

const updateEducation = {
  request: state => ({
    ...state,
    updateEducation: {
      ...state.updateEducation,
      isPending: true,
    },
  }),
  success: state => ({
    ...state,
    updateEducation: {
      ...state.updateEducation,
      isPending: false,
    },
  }),
  failure: state => ({
    ...state,
    updateEducation: {
      ...state.updateEducation,
      isPending: false,
    },
  }),
};

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

const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {

  [Types.GET_ACTIVE_SESSIONS_REQUEST]: getActiveSessions.request,
  [Types.GET_ACTIVE_SESSIONS_SUCCESS]: getActiveSessions.success,
  [Types.GET_ACTIVE_SESSIONS_FAILURE]: getActiveSessions.failure,

  [Types.GET_EMPLOYEE_ASSETS_FOR_PROFILE_REQUEST]: getEmployeeAssetsForProfile.request,
  [Types.GET_EMPLOYEE_ASSETS_FOR_PROFILE_SUCCESS]: getEmployeeAssetsForProfile.success,
  [Types.GET_EMPLOYEE_ASSETS_FOR_PROFILE_FAILURE]: getEmployeeAssetsForProfile.failure,

  [Types.GET_EMPLOYEE_VEHICLES_FOR_PROFILE_REQUEST]: getEmployeeVehiclesForProfile.request,
  [Types.GET_EMPLOYEE_VEHICLES_FOR_PROFILE_SUCCESS]: getEmployeeVehiclesForProfile.success,
  [Types.GET_EMPLOYEE_VEHICLES_FOR_PROFILE_FAILURE]: getEmployeeVehiclesForProfile.failure,

  [Types.GET_EMPLOYEE_DETAILS_FOR_PROFILE_REQUEST]: getEmployeeDetailsForProfile.request,
  [Types.GET_EMPLOYEE_DETAILS_FOR_PROFILE_SUCCESS]: getEmployeeDetailsForProfile.success,
  [Types.GET_EMPLOYEE_DETAILS_FOR_PROFILE_FAILURE]: getEmployeeDetailsForProfile.failure,

  [Types.ADD_EDUCATION_REQUEST]: addEducation.request,
  [Types.ADD_EDUCATION_SUCCESS]: addEducation.success,
  [Types.ADD_EDUCATION_FAILURE]: addEducation.failure,

  [Types.REMOVE_EDUCATION_REQUEST]: removeEducation.request,
  [Types.REMOVE_EDUCATION_SUCCESS]: removeEducation.success,
  [Types.REMOVE_EDUCATION_FAILURE]: removeEducation.failure,

  [Types.UPDATE_EDUCATION_REQUEST]: updateEducation.request,
  [Types.UPDATE_EDUCATION_SUCCESS]: updateEducation.success,
  [Types.UPDATE_EDUCATION_FAILURE]: updateEducation.failure,

  [Types.GET_EMPLOYEE_EDUCATIONS_REQUEST]: getEmployeeEducations.request,
  [Types.GET_EMPLOYEE_EDUCATIONS_SUCCESS]: getEmployeeEducations.success,
  [Types.GET_EMPLOYEE_EDUCATIONS_FAILURE]: getEmployeeEducations.failure,

  [Types.GET_PERMIT_HISTORY_REQUEST]: getPermitHistoryRequest,
  [Types.GET_PERMIT_HISTORY_SUCCESS]: getPermitHistorySuccess,
  [Types.GET_PERMIT_HISTORY_FAILURE]: getPermitHistoryFailure,

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

  [Types.GET_PERMIT_REQUESTS_FOR_SUPERVISOR_REQUEST]: getPermitRequestsForSupervisorRequest,
  [Types.GET_PERMIT_REQUESTS_FOR_SUPERVISOR_SUCCESS]: getPermitRequestsForSupervisorSuccess,
  [Types.GET_PERMIT_REQUESTS_FOR_SUPERVISOR_FAILURE]: getPermitRequestsForSupervisorFailure,

  [Types.SET_PAGINATION_FOR_PERMIT_REQUESTS_FOR_SUPERVISOR]: setPaginationForPermitRequestsForSupervisor,
  [Types.SET_FILTERS_FOR_PERMIT_REQUESTS_FOR_SUPERVISOR]: setFiltersForPermitRequestsForSupervisor,
  [Types.RESET_FILTERS_FOR_PERMIT_REQUESTS_FOR_SUPERVISOR]: resetFiltersForPermitRequestsForSupervisor,

  [Types.GET_EMPLOYEES_OF_MANAGER_REQUEST]: employeesOfManagerRequest,
  [Types.GET_EMPLOYEES_OF_MANAGER_SUCCESS]: employeesOfManagerSuccess,
  [Types.GET_EMPLOYEES_OF_MANAGER_FAILURE]: employeesOfManagerFailure,

  [Types.GET_PERMIT_INFO_OF_MANAGERS_TEAM_REQUEST]: getPermitInfoOfManagersTeamRequest,
  [Types.GET_PERMIT_INFO_OF_MANAGERS_TEAM_SUCCESS]: getPermitInfoOfManagersTeamSuccess,
  [Types.GET_PERMIT_INFO_OF_MANAGERS_TEAM_FAILURE]: getPermitInfoOfManagersTeamFailure,

  [Types.SET_FILTERS_FOR_PERMIT_HISTORY]: setFiltersForPermitHistory,
  [Types.RESET_FILTERS_FOR_PERMIT_HISTORY]: resetFiltersForPermitHistory,

  [Types.SET_PAGINATION_FOR_PERMIT_HISTORY]: setPaginationForPermitHistory,

  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
