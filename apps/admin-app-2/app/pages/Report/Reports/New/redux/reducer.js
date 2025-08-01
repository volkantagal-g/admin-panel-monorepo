import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  reportType: {
    data: null,
    isPending: false,
    error: null,
  },
  createReport: {
    data: null,
    isPending: false,
    error: null,
  },
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

const createReportRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    createReport: {
      ...state.createReport,
      isPending: true,
    },
  };
};

const createReportSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    createReport: {
      data,
      isPending: false,
      error: null,
    },
  };
};

const createReportFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    createReport: {
      data: [],
      error,
      isPending: false,
    },
  };
};

const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.DESTROY_PAGE]: destroy,
  [Types.GET_REPORT_TYPE_BY_ID_REQUEST]: getReportTypeByIdRequest,
  [Types.GET_REPORT_TYPE_BY_ID_SUCCESS]: getReportTypeByIdSuccess,
  [Types.GET_REPORT_TYPE_BY_ID_FAILURE]: getReportTypeByIdFailure,
  [Types.CREATE_REPORT_REQUEST]: createReportRequest,
  [Types.CREATE_REPORT_SUCCESS]: createReportSuccess,
  [Types.CREATE_REPORT_FAILURE]: createReportFailure,
};

export default createReducer(INITIAL_STATE, HANDLERS);
