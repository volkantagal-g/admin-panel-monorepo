import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  reportTags: {
    data: [],
    isPending: false,
    error: null,
  },
};

const getReportTagsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    reportTags: {
      ...state.reportTags,
      isPending: true,
    },
  };
};

const getReportTagsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    reportTags: {
      data,
      isPending: false,
      error: null,
    },
  };
};

const getReportTagsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    reportTags: {
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
  [Types.GET_REPORT_TAGS_REQUEST]: getReportTagsRequest,
  [Types.GET_REPORT_TAGS_SUCCESS]: getReportTagsSuccess,
  [Types.GET_REPORT_TAGS_FAILURE]: getReportTagsFailure,
};

export default createReducer(INITIAL_STATE, HANDLERS);
