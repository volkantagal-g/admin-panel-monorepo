import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  createReportType: {
    data: [],
    isPending: false,
    error: null,
  },
  allReportTags: {
    data: [],
    isPending: false,
    error: null,
  },
  allEmployees: {
    data: [],
    isPending: false,
    error: null,
  },
};

const createReportTypeRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    createReportType: {
      ...state.createReportType,
      isPending: true,
    },
  };
};

const createReportTypeSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    createReportType: {
      data,
      isPending: false,
      error: null,
    },
  };
};

const createReportTypeFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    createReportType: {
      data: [],
      error,
      isPending: false,
    },
  };
};

const getAllReportTagsRequest = state => {
  return {
    ...state,
    allReportTags: {
      ...state.allReportTags,
      isPending: true,
    },
  };
};
const getAllReportTagsSuccess = (state, { data }) => {
  return {
    ...state,
    allReportTags: {
      ...state.allReportTags,
      isPending: false,
      data,
    },
  };
};
const getAllReportTagsFailure = (state, { error }) => {
  return {
    ...state,
    allReportTags: {
      ...state.allReportTags,
      isPending: false,
      error,
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
  [Types.CREATE_REPORT_TYPE_REQUEST]: createReportTypeRequest,
  [Types.CREATE_REPORT_TYPE_SUCCESS]: createReportTypeSuccess,
  [Types.CREATE_REPORT_TYPE_FAILURE]: createReportTypeFailure,

  [Types.GET_ALL_REPORT_TAGS_REQUEST]: getAllReportTagsRequest,
  [Types.GET_ALL_REPORT_TAGS_SUCCESS]: getAllReportTagsSuccess,
  [Types.GET_ALL_REPORT_TAGS_FAILURE]: getAllReportTagsFailure,

  [Types.GET_ALL_EMPLOYEES_REQUEST]: getAllEmployeesRequest,
  [Types.GET_ALL_EMPLOYEES_SUCCESS]: getAllEmployeesSuccess,
  [Types.GET_ALL_EMPLOYEES_FAILURE]: getAllEmployeesFailure,
};

export default createReducer(INITIAL_STATE, HANDLERS);
