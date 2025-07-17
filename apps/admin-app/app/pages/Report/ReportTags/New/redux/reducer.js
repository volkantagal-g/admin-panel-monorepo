import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  createReport: {
    data: [],
    isPending: false,
    error: null,
  },
};

const createReportTagRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    createReport: {
      ...state.createReport,
      isPending: true,
    },
  };
};

const createReportTagSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    createReport: {
      data,
      isPending: false,
      error: null,
    },
  };
};

const createReportTagFailure = (state = INITIAL_STATE, { error }) => {
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
  [Types.CREATE_REPORT_TAG_REQUEST]: createReportTagRequest,
  [Types.CREATE_REPORT_TAG_SUCCESS]: createReportTagSuccess,
  [Types.CREATE_REPORT_TAG_FAILURE]: createReportTagFailure,
};

export default createReducer(INITIAL_STATE, HANDLERS);
