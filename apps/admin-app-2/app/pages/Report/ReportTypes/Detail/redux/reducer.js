import { createReducer } from 'reduxsauce';

import { REPORT_TYPE_FORM_MODE } from '../../constants';

import { Types } from './actions';

export const INITIAL_STATE = {
  formMode: REPORT_TYPE_FORM_MODE.READONLY,
  reportType: {
    data: null,
    isPending: false,
    error: null,
  },
  // we refetch report type, no need for update data
  updateReportType: { isPending: false },
  allReportTags: {
    data: [],
    isPending: false,
    error: null,
  },
  reportTypeReportTags: {
    data: [],
    isPending: false,
    error: null,
  },
  deleteReportType: {
    data: null,
    isPending: false,
    error: null,
  },
  allEmployees: {
    data: [],
    isPending: false,
    error: null,
  },
};

const setFormMode = (state = INITIAL_STATE, { formMode }) => {
  return {
    ...state,
    formMode,
  };
};

const getReportTypeByIdRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    reportType: {
      ...state.reportType,
      isPending: true,
    },
  };
};

const getReportTypeByIdSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    reportType: {
      data,
      isPending: false,
      error: null,
    },
  };
};

const getReportTypeByIdFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    reportType: {
      ...state.reportType,
      error,
      isPending: false,
    },
  };
};

const updateReportTypeRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    updateReportType: { isPending: true },
  };
};

const updateReportTypeFailure = (state = INITIAL_STATE) => {
  return {
    ...state,
    updateReportType: { isPending: false },
  };
};

const setUpdateNotPending = (state = INITIAL_STATE) => {
  return {
    ...state,
    updateReportType: { isPending: false },
  };
};

const getAllReportTagsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    allReportTags: {
      ...state.allReportTags,
      isPending: true,
    },
  };
};
const getAllReportTagsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    allReportTags: {
      ...state.allReportTags,
      isPending: false,
      data,
    },
  };
};
const getAllReportTagsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    allReportTags: {
      ...state.allReportTags,
      isPending: false,
      error,
    },
  };
};

const getReportTypeReportTagsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    reportTypeReportTags: {
      ...state.reportTypeReportTags,
      isPending: true,
    },
  };
};

const getReportTypeReportTagsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    reportTypeReportTags: {
      data,
      isPending: false,
      error: null,
    },
  };
};

const getReportTypeReportTagsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    reportTypeReportTags: {
      ...state.reportTypeReportTags,
      error,
      isPending: false,
    },
  };
};

const deleteReportTypeRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    deleteReportType: {
      ...state.deleteReportType,
      isPending: true,
    },
  };
};

const deleteReportTypeSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    deleteReportType: {
      data,
      isPending: false,
      error: null,
    },
  };
};

const deleteReportTypeFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    deleteReportType: {
      ...state.deleteReportType,
      error,
      isPending: false,
    },
  };
};

const getAllEmployeesRequest = state => {
  return {
    ...state,
    allEmployees: {
      ...state.allEmployees,
      isPending: true,
    },
  };
};
const getAllEmployeesSuccess = (state, { data }) => {
  return {
    ...state,
    allEmployees: {
      ...state.allEmployees,
      isPending: false,
      data,
    },
  };
};
const getAllEmployeesFailure = (state, { error }) => {
  return {
    ...state,
    allEmployees: {
      ...state.allEmployees,
      isPending: false,
      error,
    },
  };
};

const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.DESTROY_PAGE]: destroy,
  [Types.SET_FORM_MODE]: setFormMode,
  [Types.GET_REPORT_TYPE_BY_ID_REQUEST]: getReportTypeByIdRequest,
  [Types.GET_REPORT_TYPE_BY_ID_SUCCESS]: getReportTypeByIdSuccess,
  [Types.GET_REPORT_TYPE_BY_ID_FAILURE]: getReportTypeByIdFailure,
  [Types.UPDATE_REPORT_TYPE_REQUEST]: updateReportTypeRequest,
  [Types.UPDATE_REPORT_TYPE_FAILURE]: updateReportTypeFailure,
  [Types.SET_UPDATE_REQUEST_NOT_PENDING]: setUpdateNotPending,

  [Types.GET_ALL_REPORT_TAGS_REQUEST]: getAllReportTagsRequest,
  [Types.GET_ALL_REPORT_TAGS_SUCCESS]: getAllReportTagsSuccess,
  [Types.GET_ALL_REPORT_TAGS_FAILURE]: getAllReportTagsFailure,

  [Types.GET_ALL_EMPLOYEES_REQUEST]: getAllEmployeesRequest,
  [Types.GET_ALL_EMPLOYEES_SUCCESS]: getAllEmployeesSuccess,
  [Types.GET_ALL_EMPLOYEES_FAILURE]: getAllEmployeesFailure,

  [Types.GET_REPORT_TYPE_REPORT_TAGS_REQUEST]: getReportTypeReportTagsRequest,
  [Types.GET_REPORT_TYPE_REPORT_TAGS_SUCCESS]: getReportTypeReportTagsSuccess,
  [Types.GET_REPORT_TYPE_REPORT_TAGS_FAILURE]: getReportTypeReportTagsFailure,
  [Types.DELETE_REPORT_TYPE_REQUEST]: deleteReportTypeRequest,
  [Types.DELETE_REPORT_TYPE_SUCCESS]: deleteReportTypeSuccess,
  [Types.DELETE_REPORT_TYPE_FAILURE]: deleteReportTypeFailure,
};

export default createReducer(INITIAL_STATE, HANDLERS);
